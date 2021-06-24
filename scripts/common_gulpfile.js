const path = require('path');

const root = path.join(__dirname, '..');

exports.commonSources = [
    path.join(root, 'requires', 'common', 'polyfill.js'),
    path.join(root, 'requires', 'common', 'resources.js'),
    path.join(root, 'requires', 'common', 'helpers.js'),
    path.join(root, 'requires', 'common', 'globals.js'),
    path.join(root, 'requires', 'common', 'userSettings.js'),
    path.join(root, 'requires', 'common', 'localStorageManager.js'),
    path.join(root, 'requires', 'common', 'qolHub.js'),
    path.join(root, 'requires', 'common', 'basePage.js'),
    path.join(root, 'requires', 'common', 'daycarePage.js'),
    path.join(root, 'requires', 'common', 'dexPage.js'),
    path.join(root, 'requires', 'common', 'farmPage.js'),
    path.join(root, 'requires', 'common', 'fishingPage.js'),
    path.join(root, 'requires', 'common', 'labPage.js'),
    path.join(root, 'requires', 'common', 'multiuserPage.js'),
    path.join(root, 'requires', 'common', 'privateFieldsPage.js'),
    path.join(root, 'requires', 'common', 'publicFieldsPage.js'),
    path.join(root, 'requires', 'common', 'shelterPage.js'),
    path.join(root, 'requires', 'common', 'wishforgePage.js'),
    path.join(root, 'requires', 'common', 'pagesManager.js'),
    path.join(root, 'requires', 'common', 'pfqol.js'),
];

exports.sanctionedSources = [
    path.join(root, 'requires', 'sanctioned', 'resources.js'),
    path.join(root, 'requires', 'sanctioned', 'globals.js'),
    path.join(root, 'requires', 'sanctioned', 'localStorageManager.js'),
    path.join(root, 'requires', 'sanctioned', 'qolHub.js'),
    path.join(root, 'requires', 'sanctioned', 'shelterPage.js'),
    path.join(root, 'requires', 'sanctioned', 'privateFieldsPage.js'),
    path.join(root, 'requires', 'sanctioned', 'labPage.js'),
    path.join(root, 'requires', 'sanctioned', 'farmPage.js'),
    path.join(root, 'requires', 'sanctioned', 'dexPage.js'),
    path.join(root, 'requires', 'sanctioned', 'pfqol.js'),
];

exports.userSources = [
    path.join(root, 'requires', 'user', 'resources.js'),
    path.join(root, 'requires', 'user', 'globals.js'),
    path.join(root, 'requires', 'user', 'evolutionTreeParser.js'),
    path.join(root, 'requires', 'user', 'dexPageParser.js'),
    path.join(root, 'requires', 'user', 'localStorageManager.js'),
    path.join(root, 'requires', 'user', 'dexUtilities.js'),
    path.join(root, 'requires', 'user', 'qolHub.js'),
    path.join(root, 'requires', 'user', 'shelterPage.js'),
    path.join(root, 'requires', 'user', 'privateFieldsPage.js'),
    path.join(root, 'requires', 'user', 'labPage.js'),
    path.join(root, 'requires', 'user', 'farmPage.js'),
    path.join(root, 'requires', 'user', 'dexPage.js'),
    path.join(root, 'requires', 'user', 'pfqol.js'),
];

exports.sanctionedHeaderPath = path.join(__dirname, '..', 'requires', 'sanctioned', 'header.txt');
exports.userHeaderPath = path.join(__dirname, '..', 'requires', 'user', 'header.txt');

exports.releaseBuildFunctionHeader =[
    '// eslint-disable-next-line no-undef',
    '$(function () {',
    '(\'use strict\');\n'
].join('\n');
exports.releaseBuildFunctionFooter =  [
    '});'
].join('\n');