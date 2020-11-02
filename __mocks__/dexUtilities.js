//__mocks__/dexUtilities.js:
const fs = require('fs');
const path = require("path");
const testTools = require('../__tests__/testTools');

const du = jest.requireActual("../requires/utils/dexUtilities");

const getMainDexPage = jest.fn(($) => {
    const file = path.join(__dirname, "../__tests__/data/", "dex.html");
    const html = fs.readFileSync(file, "utf8", 'r');
    // return Promise.resolve(html);
    return $.Deferred().resolve(html);
});

const getPokemonDexPage = jest.fn(($, id) => {
    if(testTools.dexPageExists(id)) {
        const html = testTools.loadDexFile(id);
        // return Promise.resolve(html);
        return $.Deferred().resolve(html);
    } else if(id == "214|") { 
        const html = testTools.loadDexFile("214%7C");
        return $.Deferred().resolve(html);
    } else if(id == "214~") {
        const html = testTools.loadDexFile("214_");
        return $.Deferred().resolve(html);
    } else {
        // return Promise.resolve(true);
        return $.Deferred().resolve('');
    }
});

const dexUtilities = du;
dexUtilities.getMainDexPage = getMainDexPage;
dexUtilities.getPokemonDexPage = getPokemonDexPage;
exports.dexUtilities = dexUtilities;
