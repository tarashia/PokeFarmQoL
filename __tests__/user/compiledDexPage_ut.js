const $ = require('../../__mocks__/jquery_files').jQuery;
$.USERID = '';
const key = `${$.USERID}.QoLDex`;
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

describe('Test Dex Page', () => {
    test.skip('Test mousedown event handler on Dex page', () => {
        const htmlpath = path.join(__dirname, '../data/', 'dex.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/dex';
        document.documentElement.innerHTML = innerHTML;

        localStorage.setItem(key, '{}');

        new pfqol.pfqol($);

        // trigger MutationObserver
        $('#regionslist .region-entries li.entry').eq(0).remove();

        // mimic click outside the types list
        const types2Span = $('.filter-type-2 .types');
        const type2 = $('.filter-type-2');
        let event = $.Event('mousedown.dextfilter');
        event.originalEvent = {
            preventDefault: () => { return true; }
        };
        types2Span.offset({
            top: 0,
            left: 462.5
        });
        types2Span.width(162);
        event.pageX = 511;
        type2.trigger(event);

        // mimic click inside the types list to enable 2nd type search
        event = $.Event('mousedown.dextfilter');
        event.originalEvent = {
            preventDefault: () => { return true; }
        };
        types2Span.offset({
            top: 0,
            left: 462.5
        });
        types2Span.width(162);
        event.pageX = 160;
        type2.trigger(event);
        expect($('.type.selected').length).toBe(1);

        // mimic second click inside the types list to disable 2nd type search
        event = $.Event('mousedown.dextfilter');
        event.originalEvent = {
            preventDefault: () => { return true; }
        };
        types2Span.offset({
            top: 0,
            left: 462.5
        });
        types2Span.width(162);
        event.pageX = 160;
        type2.trigger(event);
        expect($('.type.selected').length).toBe(0);

        /*
         * mimic click inside the types list to enable 2nd type search when
         * a type is selected from the first 1 type search
         * select a type in the first type list
         */
        const types1Span = $('.filter-type:not(.filter-type-2) .types');
        const normal = types1Span.children().eq(0);
        normal.addClass('selected');
        event = $.Event('mousedown.dextfilter');
        event.originalEvent = {
            preventDefault: () => { return true; }
        };
        types2Span.offset({
            top: 0,
            left: 462.5
        });
        types2Span.width(162);
        event.pageX = 160;
        type2.trigger(event);
        expect($('.type.selected').length).toBe(2);

    });

    test.skip('Test touch event handler on Dex page', () => {
        const htmlpath = path.join(__dirname, '../data/', 'dex.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/dex';
        document.documentElement.innerHTML = innerHTML;
        localStorage.setItem(key, '{}');

        new pfqol.pfqol($);

        const types2Span = $('.filter-type-2 .types');
        const type2 = $('.filter-type-2');

        // mimic touch event
        const event = $.Event('touchstart.dextfilter');
        event.originalEvent = {
            touches: [{
                pageX: 160
            }],
            preventDefault: () => { return true; }
        };
        types2Span.offset({
            top: 0,
            left: 462.5
        });
        types2Span.width(162);
        event.pageX = 160;
        type2.trigger(event);
        expect($('.type.selected').length).toBe(1);

    });

});
