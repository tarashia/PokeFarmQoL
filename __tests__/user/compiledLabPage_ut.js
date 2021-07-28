const $ = require('../../__mocks__/jquery_files').jQuery;
$.USERID = '';
const key = `${$.USERID}.QoLLab`;
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

describe('Test Lab Page', () => {
    test.skip('Test PFQoL controls on Lab page', () => {
        const htmlpath = path.join(__dirname, '../data/', 'lab.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/lab';
        document.documentElement.innerHTML = innerHTML;

        const CUSTOM_SEARCH_1 = 'G'; // Match Gastly
        const CUSTOM_SEARCH_2 = 'b/v/d.png/t=1478697860'; // Drowzee
        const CUSTOM_SEARCH_SETTING = true;
        const TYPE_SEARCH_1 = '13'; // Ghost - Match Gastly and Spiritomb
        const TYPE_SEARCH_2 = '9';  // Flying - Match Sprearow
        const TYPE_SEARCH_SETTING = true;
        const settings = `{"findLabEgg":"${CUSTOM_SEARCH_1},${CUSTOM_SEARCH_2}",` +
            `"customEgg":${CUSTOM_SEARCH_SETTING},` +
            `"findLabType":"${TYPE_SEARCH_1},${TYPE_SEARCH_2}",` +
            `"findTypeEgg":${TYPE_SEARCH_SETTING}}`;
        localStorage.setItem(key, settings);

        new pfqol.pfqol($);
        // trigger 'window' load handler
        $(window).trigger('load');

        // check that settings were applied correctly
        expect(localStorage.getItem(key)).toBe(settings);

        // check that values were added to the test correctly was setup correctly
        expect($('[data-key=findTypeEgg]').length).toBe(1);
        expect($('[data-key=findTypeEgg]').prop('checked')).toBe(TYPE_SEARCH_SETTING);
        expect($('[data-key=customEgg]').length).toBe(1);
        expect($('[data-key=customEgg]').prop('checked')).toBe(CUSTOM_SEARCH_SETTING);
        expect($('[data-key=findLabEgg]').length).toBe(2);
        expect($('[data-key=findLabEgg]').eq(0).val()).toBe(CUSTOM_SEARCH_1);
        expect($('[data-key=findLabEgg]').eq(1).val()).toBe(CUSTOM_SEARCH_2);
        expect($('[id=removeLabSearch]').length).toBe(2);
        expect($('[data-key=findLabType]').length).toBe(2);
        expect($('[data-key=findLabType]').eq(0).val()).toBe(TYPE_SEARCH_1);
        expect($('[data-key=findLabType]').eq(1).val()).toBe(TYPE_SEARCH_2);
        expect($('[id=removeLabTypeList]').length).toBe(2);
        expect($('.labfoundme').length).toBe(4);

        /*
         * ////////////////////////////////////////////////////
         * // trigger '#addLabSearch' click handler
         */
        $('#addLabSearch').trigger('click');
        // check that the correct elements were changed
        expect($('[data-key=findLabEgg]').length).toBe(3);
        expect($('[data-key=findLabEgg]').eq(0).val()).toBe(CUSTOM_SEARCH_1);
        expect($('[data-key=findLabEgg]').eq(1).val()).toBe(CUSTOM_SEARCH_2);
        expect($('[data-key=findLabEgg]').eq(2).val()).toBe('');
        expect($('[id=removeLabSearch]').length).toBe(3);
        expect($('.labfoundme').length).toBe(4);
        // check that the rest stayed the same
        expect($('[data-key=findTypeEgg]').length).toBe(1);
        expect($('[data-key=findTypeEgg]').prop('checked')).toBe(TYPE_SEARCH_SETTING);
        expect($('[data-key=customEgg]').length).toBe(1);
        expect($('[data-key=customEgg]').prop('checked')).toBe(CUSTOM_SEARCH_SETTING);
        expect($('[data-key=findLabType]').length).toBe(2);
        expect($('[data-key=findLabType]').eq(0).val()).toBe(TYPE_SEARCH_1);
        expect($('[data-key=findLabType]').eq(1).val()).toBe(TYPE_SEARCH_2);
        expect($('[id=removeLabTypeList]').length).toBe(2);
        ////////////////////////////////////////////////////

        /*
         * ////////////////////////////////////////////////////
         * // trigger '#removeLabSearch' click handler
         */
        $('[id=removeLabSearch]').eq(1).trigger('click'); // should remove egg png URL
        // check that the correct elements were changed
        expect($('[data-key=findLabEgg]').length).toBe(2);
        expect($('[data-key=findLabEgg]').eq(0).val()).toBe(CUSTOM_SEARCH_1);
        expect($('[data-key=findLabEgg]').eq(1).val()).toBe('');
        expect($('[id=removeLabSearch]').length).toBe(2);
        expect($('.labfoundme').length).toBe(3);
        // check that the rest stayed the same
        expect($('[data-key=findTypeEgg]').length).toBe(1);
        expect($('[data-key=findTypeEgg]').prop('checked')).toBe(TYPE_SEARCH_SETTING);
        expect($('[data-key=customEgg]').length).toBe(1);
        expect($('[data-key=customEgg]').prop('checked')).toBe(CUSTOM_SEARCH_SETTING);
        expect($('[data-key=findLabType]').length).toBe(2);
        expect($('[data-key=findLabType]').eq(0).val()).toBe(TYPE_SEARCH_1);
        expect($('[data-key=findLabType]').eq(1).val()).toBe(TYPE_SEARCH_2);
        expect($('[id=removeLabTypeList]').length).toBe(2);
        ////////////////////////////////////////////////////

        /*
         * ////////////////////////////////////////////////////
         * // trigger '#addLabTypeList' click handler
         */
        $('#addLabTypeList').trigger('click');
        // check that the correct elements were changed
        expect($('[data-key=findLabType]').length).toBe(3);
        expect($('[data-key=findLabType]').eq(0).val()).toBe(TYPE_SEARCH_1);
        expect($('[data-key=findLabType]').eq(1).val()).toBe(TYPE_SEARCH_2);
        expect($('[data-key=findLabType]').eq(2).val()).toBe('none');
        expect($('[id=removeLabTypeList]').length).toBe(3);
        expect($('.labfoundme').length).toBe(3);
        // check that the rest stayed the same
        expect($('[data-key=findTypeEgg]').length).toBe(1);
        expect($('[data-key=findTypeEgg]').prop('checked')).toBe(TYPE_SEARCH_SETTING);
        expect($('[data-key=customEgg]').length).toBe(1);
        expect($('[data-key=customEgg]').prop('checked')).toBe(CUSTOM_SEARCH_SETTING);
        expect($('[data-key=findLabEgg]').length).toBe(2);
        expect($('[data-key=findLabEgg]').eq(0).val()).toBe(CUSTOM_SEARCH_1);
        expect($('[data-key=findLabEgg]').eq(1).val()).toBe('');
        expect($('[id=removeLabSearch]').length).toBe(2);
        ////////////////////////////////////////////////////

        /*
         * ////////////////////////////////////////////////////
         * // click it again so that clicking #removeLabTypeList will execute the for loop
         */
        $('#addLabTypeList').trigger('click');
        // check that the correct elements were changed
        expect($('[data-key=findLabType]').length).toBe(4);
        expect($('[data-key=findLabType]').eq(0).val()).toBe(TYPE_SEARCH_1);
        expect($('[data-key=findLabType]').eq(1).val()).toBe(TYPE_SEARCH_2);
        expect($('[data-key=findLabType]').eq(2).val()).toBe('none');
        expect($('[data-key=findLabType]').eq(3).val()).toBe('none');
        expect($('[id=removeLabTypeList]').length).toBe(4);
        expect($('.labfoundme').length).toBe(3);
        // check that the rest stayed the same
        expect($('[data-key=findTypeEgg]').length).toBe(1);
        expect($('[data-key=findTypeEgg]').prop('checked')).toBe(TYPE_SEARCH_SETTING);
        expect($('[data-key=customEgg]').length).toBe(1);
        expect($('[data-key=customEgg]').prop('checked')).toBe(CUSTOM_SEARCH_SETTING);
        expect($('[data-key=findLabEgg]').length).toBe(2);
        expect($('[data-key=findLabEgg]').eq(0).val()).toBe(CUSTOM_SEARCH_1);
        expect($('[data-key=findLabEgg]').eq(1).val()).toBe('');
        expect($('[id=removeLabSearch]').length).toBe(2);
        ////////////////////////////////////////////////////

        /*
         * ////////////////////////////////////////////////////
         * // trigger '#removeLabTypeList' click handler
         */
        $('[id=removeLabTypeList]').eq(1).trigger('click'); // Should remove Flying
        // check that the correct elements were changed
        expect($('[data-key=findLabType]').length).toBe(3);
        expect($('[data-key=findLabType]').eq(0).val()).toBe(TYPE_SEARCH_1);
        expect($('[data-key=findLabType]').eq(1).val()).toBe('none');
        expect($('[data-key=findLabType]').eq(2).val()).toBe('none');
        expect($('[id=removeLabTypeList]').length).toBe(3);
        expect($('.labfoundme').length).toBe(2);
        // check that the rest stayed the same
        expect($('[data-key=findTypeEgg]').length).toBe(1);
        expect($('[data-key=findTypeEgg]').prop('checked')).toBe(TYPE_SEARCH_SETTING);
        expect($('[data-key=customEgg]').length).toBe(1);
        expect($('[data-key=customEgg]').prop('checked')).toBe(CUSTOM_SEARCH_SETTING);
        expect($('[data-key=findLabEgg]').length).toBe(2);
        expect($('[data-key=findLabEgg]').eq(0).val()).toBe(CUSTOM_SEARCH_1);
        expect($('[data-key=findLabEgg]').eq(1).val()).toBe('');
        expect($('[id=removeLabSearch]').length).toBe(2);
        ////////////////////////////////////////////////////

        /*
         * ////////////////////////////////////////////////////
         * // trigger '#labCustomSearch input' change handler
         */
        $('[data-key=findTypeEgg]').trigger('click'); // Should disable Ghost
        expect($('[data-key=findTypeEgg]').prop('checked')).toBe(false);
        expect($('.labfoundme').length).toBe(1);
        // check that the rest stayed the same
        expect($('[data-key=customEgg]').length).toBe(1);
        expect($('[data-key=customEgg]').prop('checked')).toBe(CUSTOM_SEARCH_SETTING);
        expect($('[data-key=findLabEgg]').length).toBe(2);
        expect($('[data-key=findLabEgg]').eq(0).val()).toBe(CUSTOM_SEARCH_1);
        expect($('[data-key=findLabEgg]').eq(1).val()).toBe('');
        expect($('[id=removeLabSearch]').length).toBe(2);
        ////////////////////////////////////////////////////

        /*
         * ////////////////////////////////////////////////////
         * // test that changing custom search works
         */
        $('[data-key=findLabEgg]').eq(0).val('test');
        $('[data-key=findLabEgg]').trigger('input'); // Should disable 'G'
        expect($('.labfoundme').length).toBe(0);
        $('[data-key=findLabEgg]').eq(0).val('G');
        $('[data-key=findLabEgg]').trigger('input'); // Should re-enable 'G'
        expect($('.labfoundme').length).toBe(1);
        // check that the rest stayed the same
        expect($('[data-key=findTypeEgg]').length).toBe(1);
        expect($('[data-key=findTypeEgg]').prop('checked')).toBe(false);
        expect($('[data-key=customEgg]').length).toBe(1);
        expect($('[data-key=customEgg]').prop('checked')).toBe(CUSTOM_SEARCH_SETTING);
        expect($('[id=removeLabSearch]').length).toBe(2);
        ////////////////////////////////////////////////////

        /*
         * ////////////////////////////////////////////////////
         * // test that re-enabling type search works
         */
        $('[data-key=findTypeEgg]').trigger('click'); // Should re-enable Ghost back in
        expect($('[data-key=findTypeEgg]').prop('checked')).toBe(true);
        expect($('[data-key=findTypeEgg]').length).toBe(1);
        expect($('.labfoundme').length).toBe(2);
        // check that the rest stayed the same
        expect($('[data-key=customEgg]').length).toBe(1);
        expect($('[data-key=customEgg]').prop('checked')).toBe(CUSTOM_SEARCH_SETTING);
        expect($('[data-key=findLabEgg]').length).toBe(2);
        expect($('[data-key=findLabEgg]').eq(0).val()).toBe(CUSTOM_SEARCH_1);
        expect($('[data-key=findLabEgg]').eq(1).val()).toBe('');
        expect($('[id=removeLabSearch]').length).toBe(2);
        ////////////////////////////////////////////////////

        /*
         * ////////////////////////////////////////////////////
         * // trigger MutationObserver observe
         */
        $('#labpage>div>div>div').children().eq(0).remove();
        ////////////////////////////////////////////////////
    });
});
