const $ = require('../../__mocks__/jquery_files').jQuery;
$.USERID = '';
const key = `${$.USERID}.QoLDaycare`;
// eslint-disable-next-line no-unused-vars
const console = require('../../__mocks__/console_suppress').console;
const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path');
const pfqol = require(appRoot + '/Poke-Farm-QoL.test.user');
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
    test.skip('Test controls on Daycare page', () => {
        /*
         * Test HTML is crafted to have different amounts of pokemon for the cases listed below
         * - Ditto: Match everything that is not Undiscovered and not Ditto (12 should be matched)
         * - Undiscovered: Match nothing (2 Undiscovered in the HTML, 0 should be matched)
         * - Male w/ 2 Egg Group: Match Females in either Egg Group (2 Mineral, 3 Amorphous)
         * - Female w/ 1 Egg Groups: Match Males in same Egg Group (4 Field)
         * - Genderless: Match only Ditto (1 Ditto)
         */
        const htmlpath = path.join(__dirname, '../data/', 'daycare_with_dialog.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/daycare';
        document.documentElement.innerHTML = innerHTML;

        localStorage.setItem(key, '{}');

        // test Ditto in Daycare
        $('#pkmnadd').attr('data-gender', 'd');
        $('#pkmnadd').attr('data-egggroup', '15');
        new pfqol.pfqol($);
        /*
         * pfqol.pfqol($);
         * add a dummy element to trigger customSearch
         */
        $('#fs_pokemon').children().eq(0).append('<p>Test</p>');
        /*
         * this expect won't work, because the MutationObserver is triggered asynchronously,
         * and based on research online, there is no way to test MutationObserver's reliably with jest
         * expect($('.daycarefoundme').length).toBe(12);
         */

        // test Undiscovered in Daycare
        $('#pkmnadd').attr('data-gender', 'f');
        $('#pkmnadd').attr('data-egggroup', '0');
        new pfqol.pfqol($);
        // add a dummy element to trigger customSearch
        $('#fs_pokemon').children().eq(0).append('<p>Test</p>');
        // expect($('.daycarefoundme').length).toBe(0);

        /*
         * test Male non-Undiscovered in Daycare
         * test pokemon with 2 egg groups
         */
        $('#pkmnadd').attr('data-gender', 'm');
        $('#pkmnadd').attr('data-egggroup', '201'); // Mineral+Amorphous
        new pfqol.pfqol($);
        // add a dummy element to trigger customSearch
        $('#fs_pokemon').children().eq(0).append('<p>Test</p>');
        // expect($('.daycarefoundme').length).toBe(5);

        /*
         * test Female non-Undiscovered in Daycare
         * test pokemon with 1 egg group
         */
        $('#pkmnadd').attr('data-gender', 'f');
        $('#pkmnadd').attr('data-egggroup', '3'); // Field
        new pfqol.pfqol($);
        // add a dummy element to trigger customSearch
        $('#fs_pokemon').children().eq(0).append('<p>Test</p>');
        // expect($('.daycarefoundme').length).toBe(4);

        // test Genderless non_Undiscovered in Daycare
        $('#pkmnadd').attr('data-gender', 'n');
        $('#pkmnadd').attr('data-egggroup', '3'); // Field
        new pfqol.pfqol($);
        // add a dummy element to trigger customSearch
        $('#fs_pokemon').children().eq(0).append('<p>Test</p>');
        // expect($('.daycarefoundme').length).toBe(1);

    });
});
