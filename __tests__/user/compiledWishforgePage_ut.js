const $ = require('../../__mocks__/jquery_files').jQuery;
$.USERID = '';
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

describe('Test Wishforge Page', () => {
    test.skip('Test PFQoL controls on Wishforge page with no ongoing constructions', () => {
        const htmlpath = path.join(__dirname, '../data/', 'wishforge_no_ongoing_constructions.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/forge';
        document.documentElement.innerHTML = innerHTML;

        // grab the crafted badges HTML before it's changed so we can use it to mimic a mutation
        const craftedBadgesDiv = $('#badges').next('div').clone();
        const craftedBadgesUl = craftedBadgesDiv.children().eq(0);

        new pfqol.pfqol($);
        expect($('#badges').next('div').children().eq(0).children().length).toBe(1);

        /*
         * trigger MutationObserver
         * the real mutation that will trigger the observer will be when PFQ remakes the crafted
         * badges list, so let's mimic that
         */
        $('#badges').next('div').children().eq(0).remove();
        $('#badges').next('div').prepend(`<ul class="badgelist"> ${craftedBadgesUl.html()} </ul>`);
        /*
         * Testing MutationObservers doesn't work, so can't check it again
         * expect($('#badges').next("div").children().eq(0).children().length).toBe(1);
         */
    });
    test.skip('Test PFQoL controls on Wishforge page with ongoing constructions', () => {
        const htmlpath = path.join(__dirname, '../data/', 'wishforge_with_ongoing_constructions.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/forge';
        document.documentElement.innerHTML = innerHTML;

        // grab the crafted badges HTML before it's changed so we can use it to mimic a mutation
        const craftedBadgesDiv = $('#badges').next('div').clone();
        const craftedBadgesUl = craftedBadgesDiv.children().eq(0);

        new pfqol.pfqol($);
        expect($('#badges').next('div').children().eq(0).children().length).toBe(1);

        /*
         * trigger MutationObserver
         * the real mutation that will trigger the observer will be when PFQ remakes the crafted
         * badges list, so let's mimic that
         */
        $('#badges').next('div').children().eq(0).remove();
        $('#badges').next('div').prepend(`<ul class="badgelist"> ${craftedBadgesUl.html()} </ul>`);
        /*
         * Testing MutationObservers doesn't work, so can't check it again
         * expect($('#badges').next("div").children().eq(0).children().length).toBe(1);
         */
    });
});
