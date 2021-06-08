//__mocks__/jquery_files.js:

const fs = require('fs');
const path = require('path');
const jQ = jest.requireActual('jquery');
const testTools = require('../__tests__/testTools');

const get = jest.fn((url) => {
    let data = '';
    if (url === 'https://pokefarm.com/dex') {
        const filepath = path.join(__dirname, '../__tests__/data/', 'dex.html');
        data = fs.readFileSync(filepath, 'utf8', 'r');
    } else {
        const match = url.match(/https:\/\/pokefarm\.com\/dex\/(.*)/);
        if (match) {
            const id = match[1];
            if (id == '214|') {
                data = testTools.loadDexFile('214%7C');
            }
            else if (id == '214~') {
                data = testTools.loadDexFile('214_');
            }
            else {
                data = testTools.loadDexFile(id);
            }
        } else {
            console.log(url);
        }
    }
    return jQ.Deferred().resolve(data);
});

const ajax = jest.fn((settings) => {
    let data;
    console.log(settings);
    if (settings.url) {
        const summaryMatch = settings.url.match('https://pokefarm.com/summary/(.....)');
        const dexMatch = settings.url.match('https://pokefarm.com/dex/(.+)');
        if (summaryMatch && summaryMatch.length > 1) {
            data = fs.readFileSync(path.join(__dirname, '../__tests__/data/farm_sort_on_types/', summaryMatch[1] + '.html'), 'utf8', 'r');
        } else if (dexMatch && dexMatch.length > 1) {
            data = testTools.loadDexFile(dexMatch[1]);
        }
    }
    if (data && settings.success) { settings.success(data); }
});

const jQuery = jQ;
jQuery.get = get;
jQuery.ajax = ajax;
// jQuery.when = when;
exports.jQuery = jQuery;
