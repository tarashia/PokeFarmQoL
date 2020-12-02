const $ = require('../__mocks__/jquery_files').jQuery;
const console = require('../__mocks__/console_suppress').console;
const fs = require('fs')
const path = require('path')

const pfqol = require('./compiled');

const oldWindowLocation = window.location;

beforeAll(() => {
    delete window.location;

    window.location = Object.defineProperties(
        {},
        {
            ...Object.getOwnPropertyDescriptors(oldWindowLocation),
            href: {
                writable: true,
                value: 'fdsa'
            },
            assign: {
                configurable: true,
                value: jest.fn(),
            },
        },
    );
});

describe("Test Daycare Page", () => {
    test("Test controls on Daycare page", () => {
        const htmlpath = path.join(__dirname, './data/', 'daycare_with_dialog.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = "https://pokefarm.com/daycare";
        document.documentElement.innerHTML = innerHTML;

        localStorage.setItem('QoLDaycare', '{}');

        pfqol.pfqol($);

        // trigger MutationObserver
        $('#fs_pokemon .fieldmon').eq(0).remove();
        $('#fs_pokemon .tooltip_content').eq(0).remove();
    });
});
