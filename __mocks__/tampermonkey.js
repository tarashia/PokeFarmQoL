const fs = require('fs');
const path = require('path');

const GM_getResourceText = jest.fn((resourceName) => {
    let filepath = "";
    if(resourceName === 'QoLCSS')
        filepath = path.join(__dirname, "../__tests__/data/", "pfqol.css");
    else
        filepath = path.join(__dirname, "../__tests__/data/", resourceName + ".html");
    const text = fs.readFileSync(filepath, 'utf8', 'r');
    return text;
});

const GM_xmlhttpRequest = jest.fn((details) => {

});

const GM_addStyle = jest.fn(() => {

});

const GM_info = jest.fn(() => {

});

exports.GM_getResourceText = GM_getResourceText;
exports.GM_xmlhttpRequest = GM_xmlhttpRequest;
exports.GM_addStyle = GM_addStyle;
exports.GM_info = GM_info;