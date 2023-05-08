/*

    This build file performs the following operations:
    - Adds the appropriate userscript header (src/resources/header[-test].txt)
    - Concatenates all files in src/scripts
    - Replaces all resource placeholders "<% path %>" with the specified file's content
      (compiles and minimizes content like LESS/jsonc first)
    - Lints & saves result in the main user.js file
    - Outputs a checksum, which can be used in part to specify dev builds
    (place the partial checksum, usually last 6 chars, directly in .user.js file, not in header.txt)

*/

import exec from 'await-exec';
import fs from 'fs';
import crypto from 'crypto';
import path from 'path';
import less from 'less';
import jsonc from 'jsonc';
import postcss from 'postcss';
import cssnano from 'cssnano';
import htmlMinify from 'html-minifier';
import replaceAsync from 'string-replace-async';
import { ESLint } from 'eslint';

const outputPath = 'Poke-Farm-QoL.user.js';
const headerFile = 'src/resources/header.txt';
// Tell ESLint that jQuery's $ is defined elsewhere
const jqueryLint = `/* global $ */`;

// Unfortunately, order is important for some of these files,
//   so instead of just going over the whole directory, define 
//   all scripts to be included, and their order, here
// Library-type scripts (only static content) should go first
// <PAGES> is where all files in scripts/pages will be added, alphabetically
const scriptFiles = [
    // Static classes
    'errors.js',
    'helpers.js',
    'localStorageManager.js',
    'resources.js',
    // Non-static classes
    'modal.js',
    'userDataHandle.js',
    'userPokedex.js',
    'userSettings.js',
    'qolHub.js',
    'basePage.js',
    // Pages
    '<PAGES>',
    // Script entry point
    'pagesManager.js',
    'scriptEntry.js'
];


runBuild();

async function runBuild() {
    // ensure all dependencies are installed, and package-lock version is updated
    console.log('Updating node_modules...');
    await exec('npm i');

    await fs.promises.writeFile(outputPath, jqueryLint);
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
    await ESLint.outputFixes(results);
    const formatter = await eslint.loadFormatter("stylish");
    console.log(formatter.format(results));

    await addScriptHeader();
    const checksum = await getChecksum(outputPath, 'md5');
    console.log('Done! New checksum: '+checksum);
}

async function addScriptHeader() {
    let header = await fs.promises.readFile(headerFile, 'utf8');
    const formattedOutput = await fs.promises.readFile(outputPath, 'utf8');
    // add version number from package.json
    let version = process.env.npm_package_version;
    console.log('Adding script header for v'+version+'...');
    header = header.replace(/(@version\s+)VERSION/, (match, flag) => {
        return flag+version;
    });
    await fs.promises.writeFile(outputPath, header);
    await fs.promises.appendFile(outputPath, '\n\n'+formattedOutput);
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

// https://stackoverflow.com/a/65199864
function getChecksum(path, hashType='sha256') {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHash(hashType);
      const input = fs.createReadStream(path);
      input.on('error', reject);
      input.on('data', (chunk) => {
          hash.update(chunk);
      });
      input.on('close', () => {
          resolve(hash.digest('hex'));
      });
    });
}
