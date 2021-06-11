const { series, src, dest } = require('gulp');
const concat = require('gulp-concat');
const header = require('gulp-header');
const replace = require('gulp-replace');
const eslint = require('gulp-eslint');
const fs = require('fs');
const path = require('path');

const output = 'Poke-Farm-QoL.test.user.js';
const outputDir = path.join(__dirname, '..');
const outputFullPath = path.join(outputDir, output);

/* declare -a INPUT=("${ROOT}/requires/user/resources.js"
                     "${ROOT}/requires/user/globals.js"
                     "${ROOT}/requires/user/evolutionTreeParser.js"
                     "${ROOT}/requires/user/dexPageParser.js"
                     "${ROOT}/requires/user/localStorageManager.js"
                     "${ROOT}/requires/user/dexUtilities.js"
                     "${ROOT}/requires/user/qolHub.js"
                     "${ROOT}/requires/user/shelterPage.js"
                     "${ROOT}/requires/user/privateFieldsPage.js"
                     "${ROOT}/requires/user/labPage.js"
                     "${ROOT}/requires/user/farmPage.js"
                     "${ROOT}/requires/user/dexPage.js"
                     "${ROOT}/requires/user/pfqol.js"
                     ) */
const commonSources = [
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/common/polyfill.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/common/resources.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/common/helpers.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/common/globals.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/common/localStorageManager.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/common/qolHub.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/common/basePage.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/common/daycarePage.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/common/dexPage.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/common/farmPage.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/common/fishingPage.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/common/labPage.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/common/multiuserPage.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/common/privateFieldsPage.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/common/publicFieldsPage.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/common/shelterPage.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/common/wishforgePage.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/common/pagesManager.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/common/pfqol.js',
];
const userSources = [
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/user/resources.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/user/globals.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/user/evolutionTreeParser.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/user/dexPageParser.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/user/localStorageManager.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/user/dexUtilities.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/user/qolHub.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/user/shelterPage.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/user/privateFieldsPage.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/user/labPage.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/user/farmPage.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/user/dexPage.js',
    '/home/jonpaul/code/javascript/PokeFarmQoL/requires/user/pfqol.js',
];

function concatenate() {
    return src(
        [...commonSources, ...userSources]
    )
        .pipe(concat(output))
        .pipe(dest(outputDir));
}

function removeComments() {
    return src(outputFullPath)
        .pipe(replace(/\/\* global[s]?.*?\*\//gs, ''))
        .pipe(dest(outputDir));
}

function addHeader() {
    return src(outputFullPath)
        .pipe(header(fs.readFileSync(path.join(__dirname, '..', 'requires', 'user', 'header.txt'), 'utf8')))
        .pipe(dest(outputDir));
}

function runEslint() {
    return src(outputFullPath)
        .pipe(eslint({
            configFile: path.join(__dirname, '..', '.eslintrc.json'),
            fix: true
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(dest(outputDir));
}

exports.default = series(concatenate, removeComments, addHeader, runEslint);