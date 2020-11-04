// __tests__/testTools.js

const path = require('path');
const fs = require('fs');
const loadDexFile = function(dexID) {
    const file = path.join(__dirname, "./data/dex/", dexID + ".html");
    const html = fs.readFileSync(file, "utf8", 'r');
    return html;
}
const dexPageExists = function(dexID) {
    const file = path.join(__dirname, "./data/dex/", dexID + ".html");
    return fs.existsSync(file);
}
exports.loadDexFile = loadDexFile;
exports.dexPageExists = dexPageExists;
