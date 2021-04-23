//__mocks__/fetch.js:
const path = require('path');
const fs = require('fs');

const fetch = jest.fn((p) => {
    if(p === '/dex') {
        const obj = {
            text: function() {
                const htmlpath = path.join(__dirname, '../__tests__/data/', 'dex.html');
                const html = fs.readFileSync(htmlpath, 'utf8', 'r');
                return html;
            },
            ok: true
        };
        return Promise.resolve(obj);
    }
});

exports.fetch = fetch;
