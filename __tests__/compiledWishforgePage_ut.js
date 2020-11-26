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

describe("Test Wishforge Page", () => {
    test("Test PFQoL controls on Wishforge page", () => {
        const htmlpath = path.join(__dirname, './data/', 'wishforge_no_table.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = "https://pokefarm.com/forge";
        document.documentElement.innerHTML = innerHTML;

        // grab the crafted badges HTML before it's changed so we can use it to mimic a mutation
        const craftedBadgesDiv = $('#badges').next("div").clone();
        const craftedBadgesUl = craftedBadgesDiv.children().eq(0);

        pfqol.pfqol(jQuery);

        // // trigger MutationObserver by adding an element in the div with the badge list
        // $('#badges').next("div").append('<p>Test</p>');

        // trigger MutationObserver
        // the real mutation that will trigger the observer will be when PFQ remakes the crafted
        // badges list, so let's mimic that
        $('#badges').next("div").children().eq(0).remove();
        $('#badges').next("div").prepend(`<ul class="badgelist"> ${craftedBadgesUl.html()} </ul>`);
    });
});
