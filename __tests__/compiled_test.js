const jQuery = require('../__mocks__/jquery_files').jQuery;
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

describe("Test that PFQoL compiles", () => {
    test("Test QoL Hub controls", () => {
        const htmlpath = path.join(__dirname, './data/', 'party.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        document.documentElement.innerHTML = innerHTML;
        global.location.href = "https://pokefarm.com/party";
        pfqol.pfqol(jQuery);
        jQuery('li[data-name="QoL"]').eq(0).trigger('click');
        jQuery('#updateDex').eq(0).trigger('click');
        jQuery('#resetPageSettings').eq(0).trigger('click');
        jQuery('#clearCachedDex').eq(0).trigger('click');
        jQuery('h3.slidermenu').trigger('click');
        jQuery('.closeHub').eq(0).trigger('click');
    });
});