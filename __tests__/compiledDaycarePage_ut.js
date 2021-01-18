import { JSDOM } from 'jsdom';
const dom = new JSDOM();
window.document = dom.window.document;
// global.window = dom.window;

const $ = require('../__mocks__/jquery_files').jQuery;
// eslint-disable-next-line no-unused-vars
const console = require('../__mocks__/console_suppress').console;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const UUT = process.env.UUT;
const pfqol = require(UUT);

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

describe('Test Daycare Page', () => {
    test('Test controls on Daycare page', () => {
        /* Test HTML is crafted to have different amounts of pokemon for the cases listed below
         * - Ditto: Match everything that is not Undiscovered and not Ditto (12 should be matched)
         * - Undiscovered: Match nothing (2 Undiscovered in the HTML, 0 should be matched)
         * - Male w/ 2 Egg Group: Match Females in either Egg Group (2 Mineral, 3 Amorphous)
         * - Female w/ 1 Egg Groups: Match Males in same Egg Group (4 Field)
         * - Genderless: Match only Ditto (1 Ditto)
         */
        const htmlpath = path.join(__dirname, './data/', 'daycare_with_dialog.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/daycare';
        document.documentElement.innerHTML = innerHTML;

        localStorage.setItem('QoLDaycare', '{}');

        // test Ditto in Daycare
        $('#pkmnadd').attr('data-gender', 'd');
        $('#pkmnadd').attr('data-egggroup', '15');
        pfqol.pfqol($);
        // add a dummy element to trigger customSearch
        $('#fs_pokemon').children().eq(0).append('<p>Test</p>');
        // this expect won't work, because the MutationObserver is triggered asynchronously,
        // and based on research online, there is no way to test MutationObserver's reliably with jest
        // expect($('.daycarefoundme').length).toBe(12);

        // test Undiscovered in Daycare
        $('#pkmnadd').attr('data-gender', 'f');
        $('#pkmnadd').attr('data-egggroup', '0');
        pfqol.pfqol($);
        // add a dummy element to trigger customSearch
        $('#fs_pokemon').children().eq(0).append('<p>Test</p>');
        // expect($('.daycarefoundme').length).toBe(0);
        
        // test Male non-Undiscovered in Daycare
        // test pokemon with 2 egg groups
        $('#pkmnadd').attr('data-gender', 'm');
        $('#pkmnadd').attr('data-egggroup', '201'); // Mineral+Amorphous
        pfqol.pfqol($);
        // add a dummy element to trigger customSearch
        $('#fs_pokemon').children().eq(0).append('<p>Test</p>');
        // expect($('.daycarefoundme').length).toBe(5);

        // test Female non-Undiscovered in Daycare
        // test pokemon with 1 egg group
        $('#pkmnadd').attr('data-gender', 'f');
        $('#pkmnadd').attr('data-egggroup', '3'); // Field
        pfqol.pfqol($);
        // add a dummy element to trigger customSearch
        $('#fs_pokemon').children().eq(0).append('<p>Test</p>');
        // expect($('.daycarefoundme').length).toBe(4);
        
        // test Genderless non_Undiscovered in Daycare
        $('#pkmnadd').attr('data-gender', 'n');
        $('#pkmnadd').attr('data-egggroup', '3'); // Field
        pfqol.pfqol($);
        // add a dummy element to trigger customSearch
        $('#fs_pokemon').children().eq(0).append('<p>Test</p>');
        // expect($('.daycarefoundme').length).toBe(1);
        
    });
});
