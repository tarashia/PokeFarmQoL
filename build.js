/*

    This build file performs the following operations:
    - Adds the appropriate userscript header (src/resources/header[-test].txt)
    - Concatenates all files in src/scripts
    - Replaces all resource placeholders "<% path %>" with the specified file's content
      (pre-process file content like LESS/jsonc, minimize if release?)
    - Remove comments? lint? minimize if release?
    - Saves result in index[-test].js

*/

const usage = 'Usage: node index.js [--test/--release]';

import fs from 'fs';
import path from 'path';
import less from 'less';
import jsonc from 'jsonc';
import postcss from 'postcss';
import cssnano from 'cssnano';
import htmlMinify from 'html-minifier';
import replaceAsync from 'string-replace-async';
import { ESLint } from 'eslint';
import UglifyJS from 'uglify-js';

runBuild();

async function runBuild() {
    const output = 'Poke-Farm-QoL.user.js';
    const minOutput = 'Poke-Farm-QoL.min.user.js';

    await fs.promises.truncate(output,0);
    console.log('Initialized '+output);
    await concatFiles('src/scripts', output);

    console.log('Adding entry point');
    const entry = await fs.promises.readFile('src/resources/script-entry.js', 'utf8');
    fs.promises.appendFile(output, '\n'+entry+'\n');

    console.log('Linting...');
    // https://eslint.org/docs/latest/developer-guide/nodejs-api
    const eslint = new ESLint({ fix: true });
    const results = await eslint.lintFiles([output]);
    const formatter = await eslint.loadFormatter("stylish");
    console.log(formatter.format(results));

    console.log('Creating minified version');
    const lintContent = await fs.promises.readFile(output, 'utf8');
    const minified = UglifyJS.minify(lintContent);

    console.log('Adding headers');
    const headerContent = await fs.promises.readFile('src/resources/header.txt', 'utf8');
    fs.promises.writeFile(output, headerContent+'\n'+lintContent);
    fs.promises.writeFile(minOutput, headerContent+'\n'+minified.code);
    console.log('Done!');
}

// Based on https://stackoverflow.com/a/53960687
async function concatFiles(directory, destination) {
    const files = await fs.promises.readdir(directory);
    for(var i=0;i<files.length;i++) {
        const filePath = path.join(directory, files[i]);
        var content = await fs.promises.readFile(filePath, 'utf8');
        console.log('Processing '+filePath);
        content = await loadResources(content);
        fs.promises.appendFile(destination, '\n'+content+'\n');
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
