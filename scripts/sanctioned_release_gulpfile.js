const { series, src, dest } = require('gulp');
const concat = require('gulp-concat');
const header = require('gulp-header');
const replace = require('gulp-replace');
const eslint = require('gulp-eslint');
const fs = require('fs');
const path = require('path');
const sources = require('./sources');

const output = 'Poke-Farm-QoL.sanctioned.user.js';
const outputDir = path.join(__dirname, '..');
const outputFullPath = path.join(outputDir, output);

const commonSources = sources.commonSources;
const sanctionedSources = sources.sanctionedSources;

function concatenate() {
    return src(
        [...commonSources, ...sanctionedSources]
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