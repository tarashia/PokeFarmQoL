/*

    This build file performs the following operations:
    - Adds the appropriate userscript header (src/resources/header[-test].txt)
    - Concatenates all files in src/scripts
    - Replaces all resource placeholders "<% path %>" with the specified file's content
      (compiles and minimizes content like LESS/jsonc first)
    - Lints & saves result in the main user.js file

*/

import fs from 'fs';
import path from 'path';
import less from 'less';
import jsonc from 'jsonc';
import postcss from 'postcss';
import cssnano from 'cssnano';
import htmlMinify from 'html-minifier';
import replaceAsync from 'string-replace-async';
import { ESLint } from 'eslint';

// Unfortunately, order is important for some of these files,
//   so instead of just going over the whole directory, define 
//   all scripts to be included, and their order, here
// Library-type scripts (only static content) should go first
// <PAGES> is where all files in scripts/pages will be added, alphabetically
const scriptFiles = [
    // Static classes
    'helpers.js',
    'globals.js',
    'localStorageManager.js',
    'resources.js',
    'sharedFieldsLib.js',
    // Non-static classes
    'userSettings.js',
    'pagesManager.js',
    'qolHub.js',
    'pfqol.js',
    '<PAGES>',
    // Script entry point
    'scriptEntry.js'
];

runBuild();

async function runBuild() {
    const outputPath = 'Poke-Farm-QoL.user.js';

    var initContent = await fs.promises.readFile('src/resources/header.txt', 'utf8');
    await fs.promises.writeFile(outputPath, initContent);
    console.log('Initialized '+outputPath);

    for(let i=0; i<scriptFiles.length; i++) {
        if(scriptFiles[i]=='<PAGES>') {
            await concatFiles('src/scripts/pages',outputPath);
        }
        else {
            await addFileContent('src/scripts/'+scriptFiles[i],outputPath);
        }
    }

    console.log('Linting...');
    // https://eslint.org/docs/latest/developer-guide/nodejs-api
    const eslint = new ESLint({ fix: true });
    const results = await eslint.lintFiles([outputPath]);
    const formatter = await eslint.loadFormatter("stylish");
    console.log(formatter.format(results));

    console.log('Done!');
}

async function addFileContent(inputPath, outputPath) {
    var content = await fs.promises.readFile(inputPath, 'utf8');
    console.log('Processing '+inputPath);
    content = await loadResources(content);
    fs.promises.appendFile(outputPath, '\n'+content+'\n');
}

// Based on https://stackoverflow.com/a/53960687
async function concatFiles(directory, outputPath) {
    const files = await fs.promises.readdir(directory);
    for(var i=0;i<files.length;i++) {
        const filePath = path.join(directory, files[i]);
        await addFileContent(filePath, outputPath);
    }
}

// Replace "<% path %>" tokens with specified file content
// Based on https://stackoverflow.com/a/34498610
async function loadResources(content) {
    return replaceAsync(content, /"?<%([^"<>%]+)%>"?/g, async function(match, replacePath) {
        replacePath = replacePath.trim();
        const replaceContent = fs.readFileSync(replacePath, 'utf8');
        // https://stackoverflow.com/a/4695156
        const fileExt = replacePath.split('.').pop();
        console.log('  Adding '+replacePath);
        switch (fileExt) {
            case 'html':
                return processContent(replaceContent);
            case 'less':
            case 'css':
                return await processStyle(replaceContent);
            case 'json':
            case 'jsonc':
                return processObject(replaceContent);
            default:    
                return match;
        }
    });
}

// Pre-process HTML content
export function processContent(content) {
    return htmlMinify.minify(content, {
        collapseWhitespace: true
    });
}

// Pre-process style content
export async function processStyle(content) {
    const css = await less.render(content);
    const nano = await postcss([cssnano()]).process(css.css, {from: undefined});
    return nano.css;
}

// Pre-process object content to remove comments
export function processObject (content) {
    return jsonc.uglify(jsonc.stripComments(content));
}
