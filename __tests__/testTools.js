const join = require('path').join;
const { readFileSync, existsSync } = require('fs');

const loadDexFile = function (dexID) {
    const file = join(__dirname, './data/dex/', dexID + '.html');
    if(!existsSync(file)) {
        console.error(`Can't load file that doesn't exist: ${file}`);
    }
    const html = readFileSync(file, 'utf8', 'r');
    return html;
};
const dexPageExists = function (dexID) {
    const file = join(__dirname, './data/dex/', dexID + '.html');
    return existsSync(file);
};
module.exports = {
    loadDexFile: loadDexFile,
    dexPageExists: dexPageExists
};
