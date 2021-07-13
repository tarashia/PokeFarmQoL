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

describe('Test Multiuser Page', () => {
    test.skip('Test PFQoL controls on Multiuser page', () => {
        /*
         * HTML has the following pokemon for testing:
         * - 1 that likes Any berry
         * - 1 that likes Spicy berries
         * - 1 that has already been fed
         * - 1 that is an Egg
         * - 2 other eggs to make it a full party
         */
        const htmlpath = path.join(__dirname, '../data/', 'multiuser.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/users/A,A,A,A,A,A,A,A,A,A';
        document.documentElement.innerHTML = innerHTML;

        const key = `${$.USERID}.QoLMultiuser`;
        localStorage.setItem(key,
            '{"hideDislike":false,' +
            '"hideAll":false,' +
            '"niceTable":false}');
        new pfqol.pfqol($);

        // trigger 'window' load handler
        $(window).trigger('load');

        // check that HTML was setup correctly
        expect($('[data-key=hideDislike]').length).toBe(1);
        expect($('[data-key=niceTable]').length).toBe(1);
        expect($('[data-key=hideAll]').length).toBe(1);

        // trigger MutationObserver observe
        $('#multiuser>div').eq(-1).remove();

        /*
         * trigger mutually exclusive settings
         * get Egg's action div HTML to check it later
         */
        const eggActionDiv = $('[data-pid]').eq(3).find('.action').html();
        $('[data-key=hideDislike]').trigger('click');
        expect($('[data-key=hideDislike]').prop('checked')).toBe(true);
        expect($('[data-key=niceTable]').prop('checked')).toBe(false);
        expect($('[data-key=hideAll]').prop('checked')).toBe(false);
        expect(localStorage.getItem(key))
            .toBe('{"hideDislike":true,"hideAll":false,"niceTable":false}');
        // Any berry (check that all berries have the same class)
        expect($('[data-pid]').eq(0)
            .find('.action>.berrybuttons>[data-berry]').attr('class'))
            .toEqual(expect.stringContaining('qolpartyclickblock'));
        // Spicy berry (check that only Spicy [cheri] berry has the right class)
        expect($('[data-pid]').eq(1)
            .find('.action>.berrybuttons>[data-berry=aspear]').attr('class'))
            .toEqual(expect.stringContaining('qolpartyclickhide'));
        expect($('[data-pid]').eq(1)
            .find('.action>.berrybuttons>[data-berry=cheri]').attr('class'))
            .toEqual(expect.stringContaining('qolpartyclickwidth'));
        expect($('[data-pid]').eq(1)
            .find('.action>.berrybuttons>[data-berry=chesto]').attr('class'))
            .toEqual(expect.stringContaining('qolpartyclickhide'));
        expect($('[data-pid]').eq(1)
            .find('.action>.berrybuttons>[data-berry=pecha]').attr('class'))
            .toEqual(expect.stringContaining('qolpartyclickhide'));
        expect($('[data-pid]').eq(1)
            .find('.action>.berrybuttons>[data-berry=rawst]').attr('class'))
            .toEqual(expect.stringContaining('qolpartyclickhide'));
        // Fed (check that <div class="action"> is still empty)
        expect($('[data-pid]').eq(2).children('.action').html()).toBe('');
        // Egg (check that nothing in the <div class="action"> element has changed)
        expect($('[data-pid]').eq(3)
            .find('.action').html()).toBe(eggActionDiv);

        // trigger .tabbed_interface click
        $('.tabbed_interface>.tab-active').find('[data-berry=aspear]').trigger('click');

        // trigger niceTable section of partyModification
        $('[data-key=niceTable]').trigger('click');
        expect($('[data-key=hideDislike]').prop('checked')).toBe(false);
        expect($('[data-key=niceTable]').prop('checked')).toBe(true);
        expect($('[data-key=hideAll]').prop('checked')).toBe(false);
        expect(localStorage.getItem(key))
            .toBe('{"hideDislike":false,"hideAll":false,"niceTable":true}');

        // trigger hideAll section of partyModification
        $('[data-key=hideAll]').trigger('click');
        expect($('[data-key=hideDislike]').prop('checked')).toBe(false);
        expect($('[data-key=niceTable]').prop('checked')).toBe(false);
        expect($('[data-key=hideAll]').prop('checked')).toBe(true);
        expect(localStorage.getItem(key))
            .toBe('{"hideDislike":false,"hideAll":true,"niceTable":false}');
    });
});
