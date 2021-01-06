/* istanbul ignore file */
// __tests__/testTools.js

import { join } from 'path';
import { readFileSync, existsSync } from 'fs';
const loadDexFile = function(dexID) {
    const file = join(__dirname, './data/dex/', dexID + '.html');
    const html = readFileSync(file, 'utf8', 'r');
    return html;
};
const dexPageExists = function(dexID) {
    const file = join(__dirname, './data/dex/', dexID + '.html');
    return existsSync(file);
};
const _loadDexFile = loadDexFile;
export { _loadDexFile as loadDexFile };
const _dexPageExists = dexPageExists;
export { _dexPageExists as dexPageExists };
