const $ = require('../../__mocks__/jquery_files').jQuery;
$.USERID = '';
const key = `${$.USERID}.QoLPrivateFields`;
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

describe('Test Private Fields Page', () => {
    test.skip('Test Tooltip controls on Private Fields page', () => {
        /*
         * ////////////////////////////////////////
         * // setup
         */
        const NUM_POKEMON = 29;
        const htmlpath = path.join(__dirname, '../data/', 'privateFields.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/fields';
        document.documentElement.innerHTML = innerHTML;
        localStorage.setItem(key,
            '{"fieldCustom":"Yamask,g/s/d/2.png/t=1589312209",' +
            '"fieldType":"8,13",' +
            '"fieldNature":"8",' +
            '"fieldEggGroup":"12,9",' +
            '"fieldNewPokemon":true,' +
            '"fieldShiny":true,' +
            '"fieldAlbino":true,' +
            '"fieldMelanistic":true,' +
            '"fieldPrehistoric":true,' +
            '"fieldDelta":true,' +
            '"fieldMega":true,' +
            '"fieldStarter":true,' +
            '"fieldCustomSprite":true,' +
            '"fieldMale":true,' +
            '"fieldFemale":true,' +
            '"fieldNoGender":true,' +
            '"fieldItem":true,' +
            '"fieldNFE":true,' +
            '"customItem":true,' +
            '"customEgg":true,' +
            '"customPokemon":true,' +
            '"customPng":true,' +
            '"releaseSelectAll":true,' +
            '"tooltipEnableMods":true,' +
            '"tooltipNoBerry":true,' +
            '"tooltipBerry":true}');

        new pfqol.pfqol($);

        $(window).trigger('load');

        // check that setup worked
        expect($('[data-key=tooltipEnableMods]').length).toBe(1);
        expect($('[data-key=tooltipEnableMods]').prop('checked')).toBe(true);
        expect($('[data-key=tooltipNoBerry]').length).toBe(1);
        expect($('[data-key=tooltipNoBerry]').prop('checked')).toBe(true);
        expect($('[data-key=tooltipNoBerry]').prop('disabled')).toBe(false);
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('.collapsible').trigger('click');
        /*
         * // check that the correct changes were applied
         * // check that the rest stayed the same
         */

        /*
         * ////////////////////////////////////////
         * // check "Enable QoL Tooltip Settings" button
         * // click button to disable tooltip modifications
         */
        $('[data-key=tooltipEnableMods]').trigger('click');
        expect($('[data-key=tooltipEnableMods]').prop('checked')).toBe(false);
        expect($('[data-key=tooltipNoBerry]').prop('disabled')).toBe(true);
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        expect(localStorage.getItem(key))
            .toEqual(expect.stringContaining('"tooltipEnableMods":false'));
        expect(localStorage.getItem(key))
            .toEqual(expect.stringContaining('"tooltipNoBerry":true'));

        // click again to enable tooltip modifications
        $('[data-key=tooltipEnableMods]').trigger('click');
        expect($('[data-key=tooltipEnableMods]').prop('checked')).toBe(true);
        expect($('[data-key=tooltipNoBerry]').prop('disabled')).toBe(false);
        expect($('.fieldmon[data-tooltip]').length).toBe(0);
        expect(localStorage.getItem(key))
            .toEqual(expect.stringContaining('"tooltipEnableMods":true'));
        expect(localStorage.getItem(key))
            .toEqual(expect.stringContaining('"tooltipNoBerry":true'));
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // check "Hide tooltip" button
         * // click button to disable tooltip hiding
         */
        $('[data-key=tooltipNoBerry]').trigger('click');
        expect($('[data-key=tooltipNoBerry]').prop('disabled')).toBe(false);
        expect($('[data-key=tooltipNoBerry]').prop('checked')).toBe(false);
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        expect(localStorage.getItem(key))
            .toEqual(expect.stringContaining('"tooltipNoBerry":false'));

        // click again to enable tooltip hiding
        $('[data-key=tooltipNoBerry]').trigger('click');
        expect($('[data-key=tooltipNoBerry]').prop('disabled')).toBe(false);
        expect($('[data-key=tooltipNoBerry]').prop('checked')).toBe(true);
        expect($('.fieldmon[data-tooltip]').length).toBe(0);
        expect(localStorage.getItem(key))
            .toEqual(expect.stringContaining('"tooltipNoBerry":true'));
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // // trigger else portion of handleTooltipSettings()
         * // $('.tooltipsetting[data-key=tooltipEnableMods]').trigger('click');
         * // check that the correct changes were applied
         * // check that the rest stayed the same
         * ////////////////////////////////////////
         */
    });

    test.skip('Test Search controls on Private Fields page', () => {
        /*
         * ////////////////////////////////////////
         * // remove handlers that linger from the previous test
         */
        $(document).off('click', '#addPrivateFieldTypeSearch');
        $(document).off('click', '#removePrivateFieldTypeSearch');
        $(document).off('click', '#addPrivateFieldNatureSearch');
        $(document).off('click', '#removePrivateFieldNature');
        $(document).off('click', '#addPrivateFieldEggGroupSearch');
        $(document).off('click', '#removePrivateFieldEggGroup');
        $(document).off('click', '#addTextField');
        $(document).off('click', '#removeTextField');

        // setup HTML
        /*
         * HTML is setup to have the following:
         * - 1 Shinys
         * - 2 Albinos
         * - 3 Melanistics
         * - 4 Prehistorics
         * - 5 Deltas
         * - 6 Megas
         * - 7 Starters
         * - 8 Custom Sprites
         * - 9 Holding an Item
         * - 10 Not Fully Evolved
         */
        const NUM_SHINY = 1;
        const NUM_ALBINO = 2;
        const NUM_MELANISTIC = 3;
        const NUM_PREHISTORIC = 4;
        const NUM_DELTA = 5;
        const NUM_MEGA = 6;
        const NUM_STARTER = 7;
        const NUM_CS = 8;
        const NUM_HOLDING_ITEM = 9;
        // eslint-disable-next-line no-unused-vars
        const NUM_NFE = 10;
        /*
         * For testing natures, HTML has:
         * - 7 Mild nature
         * - 1 Bold nature
         */
        const NUM_MILD = 7;
        const NUM_BOLD = 1;
        /*
         * For testing egg groups, HTML has:
         * - 45 Amorphous
         * - 10 Monster
         */
        const NUM_AMORPHOUS = 45;
        const NUM_MONSTER = 10;

        const htmlpath = path.join(__dirname, '../data/', 'privateFieldsForSearchTests.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/fields';
        document.documentElement.innerHTML = innerHTML;
        localStorage.setItem(key,
            /*
             * '{"fieldCustom":"Yamask,g/s/d/2.png/t=1589312209",' +
             * '"fieldType":"8,13,0",' +
             * '"fieldNature":"8",' +
             * '"fieldEggGroup":"12,9,1,2",' +
             */
            '{"fieldCustom":"",' +
            '"fieldType":"",' +
            '"fieldNature":"",' +
            '"fieldEggGroup":"",' +
            '"fieldNewPokemon":false,' +
            '"fieldShiny":false,' +
            '"fieldAlbino":false,' +
            '"fieldMelanistic":false,' +
            '"fieldPrehistoric":false,' +
            '"fieldDelta":false,' +
            '"fieldMega":false,' +
            '"fieldStarter":false,' +
            '"fieldCustomSprite":false,' +
            '"fieldMale":false,' +
            '"fieldFemale":false,' +
            '"fieldNoGender":false,' +
            '"fieldItem":false,' +
            '"fieldNFE":false,' +
            '"customItem":false,' +
            '"customEgg":false,' +
            '"customPokemon":false,' +
            '"customPng":false,' +
            '"releaseSelectAll":false,' +
            '"tooltipEnableMods":false,' +
            '"tooltipNoBerry":false,' +
            '"tooltipBerry":false}');

        new pfqol.pfqol($);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // check that settings were loaded correctly
         */
        const loadedSettings = JSON.parse(localStorage.getItem(key));
        expect($('[data-key=fieldShiny]').length).toBe(1);
        expect($('[data-key=fieldShiny]').prop('checked')).toBe(false);
        expect(loadedSettings.fieldShiny).toBe(false);

        expect($('[data-key=fieldAlbino]').length).toBe(1);
        expect($('[data-key=fieldAlbino]').prop('checked')).toBe(false);
        expect(loadedSettings.fieldAlbino).toBe(false);

        expect($('[data-key=fieldMelanistic]').length).toBe(1);
        expect($('[data-key=fieldMelanistic]').prop('checked')).toBe(false);
        expect(loadedSettings.fieldMelanistic).toBe(false);

        expect($('[data-key=fieldPrehistoric]').length).toBe(1);
        expect($('[data-key=fieldPrehistoric]').prop('checked')).toBe(false);
        expect(loadedSettings.fieldPrehistoric).toBe(false);

        expect($('[data-key=fieldDelta]').length).toBe(1);
        expect($('[data-key=fieldDelta]').prop('checked')).toBe(false);
        expect(loadedSettings.fieldDelta).toBe(false);

        expect($('[data-key=fieldMega]').length).toBe(1);
        expect($('[data-key=fieldMega]').prop('checked')).toBe(false);
        expect(loadedSettings.fieldMega).toBe(false);

        expect($('[data-key=fieldStarter]').length).toBe(1);
        expect($('[data-key=fieldStarter]').prop('checked')).toBe(false);
        expect(loadedSettings.fieldStarter).toBe(false);

        expect($('[data-key=fieldCustomSprite]').length).toBe(1);
        expect($('[data-key=fieldCustomSprite]').prop('checked')).toBe(false);
        expect(loadedSettings.fieldCustomSprite).toBe(false);

        expect($('[data-key=fieldItem]').length).toBe(1);
        expect($('[data-key=fieldItem]').prop('checked')).toBe(false);
        expect(loadedSettings.fieldItem).toBe(false);

        expect($('[data-key=fieldNFE]').length).toBe(1);
        expect($('[data-key=fieldNFE]').prop('checked')).toBe(false);
        expect(loadedSettings.fieldNFE).toBe(false);

        // check that HTML was setup correctly
        expect($('input').filter('#addPrivateFieldTypeSearch').length).toBe(1);
        expect($('[data-key=fieldType][array-name=typeArray]').length).toBe(1);
        expect($('input').filter('#removePrivateFieldTypeSearch').length).toBe(1);
        expect($('input').filter('#addPrivateFieldNatureSearch').length).toBe(1);
        expect($('[data-key=fieldNature][array-name=natureArray]').length).toBe(1);
        expect($('input').filter('#removePrivateFieldNature').length).toBe(1);
        expect($('input').filter('#addPrivateFieldEggGroupSearch').length).toBe(1);
        expect($('[data-key=fieldEggGroup][array-name=eggGroupArray]').length).toBe(1);
        expect($('input').filter('#removePrivateFieldEggGroup').length).toBe(1);

        expect($('[data-key=customEgg]').length).toBe(1);
        expect($('[data-key=customPokemon]').length).toBe(1);
        expect($('[data-key=customPng]').length).toBe(1);

        expect($('[data-key=fieldMale]').length).toBe(1);
        expect($('[data-key=fieldFemale]').length).toBe(1);
        expect($('[data-key=fieldNoGender]').length).toBe(1);

        expect($('input').filter('#addTextField').length).toBe(1);
        expect($('[data-key=fieldCustom][array-name=customArray]').length).toBe(1);
        expect($('input').filter('#removeTextField').length).toBe(1);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // Execute load handlers
         */
        $(window).trigger('load');
        $('.field', document).trigger('load');
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // test selecting shiny pokemon
         */
        $('[data-key=fieldShiny]').trigger('click');
        expect($('[data-key=fieldShiny]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem(key)).fieldShiny).toBe(true);
        expect($('.privatefoundme').length).toBe(NUM_SHINY);
        $('[data-key=fieldShiny]').trigger('click');
        expect($('.privatefoundme').length).toBe(0);
        expect($('[data-key=fieldShiny]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).fieldShiny).toBe(false);
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('[data-key=fieldAlbino]').trigger('click');
        expect($('[data-key=fieldAlbino]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem(key)).fieldAlbino).toBe(true);
        expect($('.privatefoundme').length).toBe(NUM_ALBINO);
        $('[data-key=fieldAlbino]').trigger('click');
        expect($('.privatefoundme').length).toBe(0);
        expect($('[data-key=fieldAlbino]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).fieldAlbino).toBe(false);
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('[data-key=fieldMelanistic]').trigger('click');
        expect($('[data-key=fieldMelanistic]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem(key)).fieldMelanistic).toBe(true);
        expect($('.privatefoundme').length).toBe(NUM_MELANISTIC);
        $('[data-key=fieldMelanistic]').trigger('click');
        expect($('.privatefoundme').length).toBe(0);
        expect($('[data-key=fieldMelanistic]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).fieldMelanistic).toBe(false);
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('[data-key=fieldPrehistoric]').trigger('click');
        expect($('[data-key=fieldPrehistoric]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem(key)).fieldPrehistoric).toBe(true);
        expect($('.privatefoundme').length).toBe(NUM_PREHISTORIC);
        $('[data-key=fieldPrehistoric]').trigger('click');
        expect($('.privatefoundme').length).toBe(0);
        expect($('[data-key=fieldPrehistoric]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).fieldPrehistoric).toBe(false);
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('[data-key=fieldDelta]').trigger('click');
        expect($('[data-key=fieldDelta]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem(key)).fieldDelta).toBe(true);
        expect($('.privatefoundme').length).toBe(NUM_DELTA);
        $('[data-key=fieldDelta]').trigger('click');
        expect($('.privatefoundme').length).toBe(0);
        expect($('[data-key=fieldDelta]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).fieldDelta).toBe(false);
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('[data-key=fieldMega]').trigger('click');
        expect($('[data-key=fieldMega]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem(key)).fieldMega).toBe(true);
        expect($('.privatefoundme').length).toBe(NUM_MEGA);
        $('[data-key=fieldMega]').trigger('click');
        expect($('.privatefoundme').length).toBe(0);
        expect($('[data-key=fieldMega]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).fieldMega).toBe(false);
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('[data-key=fieldStarter]').trigger('click');
        expect($('[data-key=fieldStarter]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem(key)).fieldStarter).toBe(true);
        expect($('.privatefoundme').length).toBe(NUM_STARTER);
        $('[data-key=fieldStarter]').trigger('click');
        expect($('.privatefoundme').length).toBe(0);
        expect($('[data-key=fieldStarter]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).fieldStarter).toBe(false);
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('[data-key=fieldCustomSprite]').trigger('click');
        expect($('[data-key=fieldCustomSprite]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem(key)).fieldCustomSprite).toBe(true);
        expect($('.privatefoundme').length).toBe(NUM_CS);
        $('[data-key=fieldCustomSprite]').trigger('click');
        expect($('.privatefoundme').length).toBe(0);
        expect($('[data-key=fieldCustomSprite]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).fieldCustomSprite).toBe(false);
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('[data-key=fieldItem]').trigger('click');
        expect($('[data-key=fieldItem]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem(key)).fieldItem).toBe(true);
        expect($('.privatefoundme').length).toBe(NUM_HOLDING_ITEM);
        $('[data-key=fieldItem]').trigger('click');
        expect($('.privatefoundme').length).toBe(0);
        expect($('[data-key=fieldItem]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).fieldItem).toBe(false);
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('[data-key=fieldNFE]').trigger('click');
        expect($('[data-key=fieldNFE]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem(key)).fieldNFE).toBe(true);
        /*
         * @TODO: Setup the data to to be able to look for NFE pokemon
         * expect($('.privatefoundme').length).toBe(NUM_NFE);
         */
        $('[data-key=fieldNFE]').trigger('click');
        expect($('.privatefoundme').length).toBe(0);
        expect($('[data-key=fieldNFE]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).fieldNFE).toBe(false);
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('#addPrivateFieldTypeSearch').trigger('click');
        // check that the correct changes were applied
        expect($('[data-key=fieldType]').length).toBe(2);
        expect($('[id=removePrivateFieldTypeSearch]').length).toBe(2);
        expect(JSON.parse(localStorage.getItem(key)).fieldType).toBe('');
        // null because it was never set to anything
        expect($('[data-key=fieldType]').eq(0).val()).toBe(null);
        expect($('[data-key=fieldType]').eq(1).val()).toBe('none');
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // test selecting a type from the list
         */
        $('[data-key=fieldType]').eq(0).prop('selectedIndex', 9); // Ground
        $('[data-key=fieldType]').eq(0).trigger('input');
        expect($('.privatefoundme').length).toBe(45); // just Ground
        expect(JSON.parse(localStorage.getItem(key)).fieldType).toBe('8');
        $('[data-key=fieldType]').eq(1).prop('selectedIndex', 5); // Grass
        $('[data-key=fieldType]').eq(1).trigger('input');
        expect($('.privatefoundme').length).toBe(55); // Ground or Grass
        expect(JSON.parse(localStorage.getItem(key)).fieldType).toBe('8,4');
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('#removePrivateFieldTypeSearch').eq(0).trigger('click');
        // check that the correct changes were applied
        expect($('[data-key=fieldType]').length).toBe(1);
        expect($('[id=removePrivateFieldTypeSearch]').length).toBe(1);
        expect($('[data-key=fieldType]').eq(0).prop('selectedIndex')).toBe(5); // Grass
        expect($('.privatefoundme').length).toBe(10); // just Ground
        expect(JSON.parse(localStorage.getItem(key)).fieldType).toBe('4');
        // click remove again
        $('#removePrivateFieldTypeSearch').eq(0).trigger('click');
        expect($('[data-key=fieldType]').length).toBe(0);
        expect($('[id=removePrivateFieldTypeSearch]').length).toBe(0);
        expect($('.privatefoundme').length).toBe(0);
        expect(JSON.parse(localStorage.getItem(key)).fieldType).toBe('');
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('#addPrivateFieldNatureSearch').trigger('click');
        // check that the correct changes were applied
        expect($('[data-key=fieldNature]').length).toBe(2);
        expect($('[id=removePrivateFieldNature]').length).toBe(2);
        // null because it was never set to anything
        expect($('[data-key=fieldNature]').eq(0).val()).toBe(null);
        expect($('[data-key=fieldNature]').eq(1).val()).toBe('none');
        expect(JSON.parse(localStorage.getItem(key)).fieldNature).toBe('');
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // test selecting a nature from the list
         */
        $('[data-key=fieldNature]').eq(0).prop('selectedIndex', 2); // Mild
        $('[data-key=fieldNature]').eq(0).trigger('input');
        expect($('.privatefoundme').length).toBe(NUM_MILD); // just Mild
        expect(JSON.parse(localStorage.getItem(key)).fieldNature).toBe('1');
        $('[data-key=fieldNature]').eq(1).prop('selectedIndex', 5); // Bold
        $('[data-key=fieldNature]').eq(1).trigger('input');
        expect($('.privatefoundme').length).toBe(NUM_MILD+NUM_BOLD); // Mild or Bold
        expect(JSON.parse(localStorage.getItem(key)).fieldNature).toBe('1,4');
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('#removePrivateFieldNature').eq(0).trigger('click');
        // check that the correct changes were applied
        expect($('[data-key=fieldNature]').length).toBe(1);
        expect($('[id=removePrivateFieldNature]').length).toBe(1);
        expect($('[data-key=fieldNature]').eq(0).prop('selectedIndex')).toBe(5); // Bold
        expect(JSON.parse(localStorage.getItem(key)).fieldNature).toBe('4');
        expect($('.privatefoundme').length).toBe(NUM_BOLD); // just Bold
        // click remove again
        $('#removePrivateFieldNature').eq(0).trigger('click');
        expect($('[data-key=fieldNature]').length).toBe(0);
        expect($('[id=removePrivateFieldNature]').length).toBe(0);
        expect($('.privatefoundme').length).toBe(0);
        expect(JSON.parse(localStorage.getItem(key)).fieldNature).toBe('');
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('#addPrivateFieldEggGroupSearch').trigger('click');
        // check that the correct changes were applied
        expect($('[data-key=fieldEggGroup]').length).toBe(2);
        expect($('[id=removePrivateFieldEggGroup]').length).toBe(2);
        // null because it was never set to anything
        expect($('[data-key=fieldEggGroup]').eq(0).val()).toBe(null);
        expect($('[data-key=fieldEggGroup]').eq(1).val()).toBe('none');
        expect(JSON.parse(localStorage.getItem(key)).fieldEggGroup).toBe('');
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // test selecting an egg group from the list
         */
        $('[data-key=fieldEggGroup]').eq(0).prop('selectedIndex', 10); // Amorphous
        $('[data-key=fieldEggGroup]').eq(0).trigger('input');
        expect($('.privatefoundme').length).toBe(NUM_AMORPHOUS); // just Amorphous
        expect(JSON.parse(localStorage.getItem(key)).fieldEggGroup).toBe('9');
        $('[data-key=fieldEggGroup]').eq(1).prop('selectedIndex', 2); // Monster
        $('[data-key=fieldEggGroup]').eq(1).trigger('input');
        expect($('.privatefoundme').length).toBe(NUM_AMORPHOUS+NUM_MONSTER); // Amorphous or Monster
        expect(JSON.parse(localStorage.getItem(key)).fieldEggGroup).toBe('9,1');
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('#removePrivateFieldEggGroup').trigger('click');
        // check that the correct changes were applied
        expect($('[data-key=fieldEggGroup]').length).toBe(1);
        expect($('[id=removePrivateFieldEggGroup]').length).toBe(1);
        expect($('[data-key=fieldEggGroup]').eq(0).prop('selectedIndex')).toBe(2); // Monster
        expect($('.privatefoundme').length).toBe(NUM_MONSTER); // just Monster
        expect(JSON.parse(localStorage.getItem(key)).fieldEggGroup).toBe('1');
        // click remove again
        $('#removePrivateFieldEggGroup').eq(0).trigger('click');
        expect($('[data-key=fieldEggGroup]').length).toBe(0);
        expect($('[id=removePrivateFieldEggGroup]').length).toBe(0);
        expect($('.privatefoundme').length).toBe(0);
        expect(JSON.parse(localStorage.getItem(key)).fieldEggGroup).toBe('');
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // testing adding custom search fields
         */
        $('#addTextField').trigger('click');
        expect($('[data-key=fieldCustom]').length).toBe(2);
        expect($('[id=removeTextField]').length).toBe(2);
        expect($('[data-key=fieldCustom]').eq(0).val()).toBe('');
        expect($('[data-key=fieldCustom]').eq(1).val()).toBe('');
        expect(JSON.parse(localStorage.getItem(key)).fieldCustom).toBe('');
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // test custom pokemon search by text
         * // enable the customPokemon button
         */
        $('[data-key=customPokemon]').trigger('click');
        expect($('[data-key=customPokemon]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem(key)).customPokemon).toBe(true);
        // enable the gender buttons so all matches will be found
        $('[data-key=fieldMale]').trigger('click');
        expect($('[data-key=fieldMale]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem(key)).fieldMale).toBe(true);
        $('[data-key=fieldFemale]').trigger('click');
        expect($('[data-key=fieldFemale]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem(key)).fieldFemale).toBe(true);
        // check search by name
        $('[data-key=fieldCustom]').eq(0).val('Cofagrigus');
        $('[data-key=fieldCustom]').eq(0).trigger('input');
        expect($('.privatefoundme').length).toBe(45); // just text
        expect(JSON.parse(localStorage.getItem(key)).fieldCustom).toBe('Cofagrigus');
        // disable the customPokemon button
        $('[data-key=customPokemon]').trigger('click');
        expect($('[data-key=customPokemon]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).customPokemon).toBe(false);
        expect($('.privatefoundme').length).toBe(0);
        // disable the gender buttons so all matches will be found
        $('[data-key=fieldMale]').trigger('click');
        expect($('[data-key=fieldMale]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).fieldMale).toBe(false);
        $('[data-key=fieldFemale]').trigger('click');
        expect($('[data-key=fieldFemale]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).fieldFemale).toBe(false);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // test custom search by PNG URL
         * // enable the customPng button
         */
        $('[data-key=customPng]').trigger('click');
        expect($('[data-key=customPng]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem(key)).customPng).toBe(true);
        // check search by URL
        $('[data-key=fieldCustom]').eq(1).val('1/g/g.png/t=1569852763');
        $('[data-key=fieldCustom]').eq(1).trigger('input');
        expect($('.privatefoundme').length).toBe(10); // just PNG URL
        expect(JSON.parse(localStorage.getItem(key)).fieldCustom).toBe('Cofagrigus,1/g/g.png/t=1569852763');
        // disable the customPng button
        $('[data-key=customPng]').trigger('click');
        expect($('[data-key=customPng]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).customPng).toBe(false);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // test removing custom fields
         */
        $('#removeTextField').eq(0).trigger('click');
        // check that the correct changes were applied
        expect($('[data-key=fieldCustom]').length).toBe(1);
        expect($('[id=removeTextField]').length).toBe(1);
        expect(JSON.parse(localStorage.getItem(key)).fieldCustom).toBe('1/g/g.png/t=1569852763');
        // click remove again
        $('#removeTextField').eq(0).trigger('click');
        expect($('[data-key=fieldCustom]').length).toBe(0);
        expect($('[id=removeTextField]').length).toBe(0);
        expect(JSON.parse(localStorage.getItem(key)).fieldCustom).toBe('');
        ////////////////////////////////////////
    });

    test.skip('Test Release controls on Private Fields Release dialog', () => {
        /*
         * ////////////////////////////////////////
         * // setup
         * HTML is setup to have:
         * - 2 mons that like Any berry
         * - 3 mons that like Sour berry
         * - 4 mons that like Spicy berry
         * - 5 mons that like Dry berry
         * - 6 mons that like Sweet berry
         * - 9 mons that like Bitter berry
         * - 29 pokemon in total
         */
        const NUM_ANY = 2;
        const NUM_SOUR = 3;
        const NUM_SPICY = 4;
        const NUM_DRY = 5;
        const NUM_SWEET = 6;
        const NUM_BITTER = 9;
        const NUM_POKEMON = 29;
        const htmlpath = path.join(__dirname, '../data/', 'privateFieldsWithReleaseDialog.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/fields';
        document.documentElement.innerHTML = innerHTML;
        localStorage.setItem(key,
            '{"fieldCustom":"Yamask,g/s/d/2.png/t=1589312209",' +
            '"fieldType":"8,13",' +
            '"fieldNature":"8",' +
            '"fieldEggGroup":"12,9",' +
            '"fieldNewPokemon":true,' +
            '"fieldShiny":true,' +
            '"fieldAlbino":true,' +
            '"fieldMelanistic":true,' +
            '"fieldPrehistoric":true,' +
            '"fieldDelta":true,' +
            '"fieldMega":true,' +
            '"fieldStarter":true,' +
            '"fieldCustomSprite":true,' +
            '"fieldMale":true,' +
            '"fieldFemale":true,' +
            '"fieldNoGender":true,' +
            '"fieldItem":true,' +
            '"fieldNFE":true,' +
            '"customItem":true,' +
            '"customEgg":true,' +
            '"customPokemon":true,' +
            '"customPng":true,' +
            '"releaseSelectAll":true,' +
            '"tooltipEnableMods":true,' +
            '"tooltipNoBerry":true,' +
            '"tooltipBerry":true}');

        new pfqol.pfqol($);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // trigger dialog buttons
         */
        $('*[data-menu="release"]').eq(0).trigger('click');
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // check that HTML was setup correctly
         */
        expect($('input').filter('#selectallfieldcheckbox').length).toBe(1);
        expect($('input').filter('#selectallfieldanycheckbox').length).toBe(1);
        expect($('input').filter('#selectallfieldsourcheckbox').length).toBe(1);
        expect($('input').filter('#selectallfieldspicycheckbox').length).toBe(1);
        expect($('input').filter('#selectallfielddrycheckbox').length).toBe(1);
        expect($('input').filter('#selectallfieldsweetcheckbox').length).toBe(1);
        expect($('input').filter('#selectallfieldbittercheckbox').length).toBe(1);
        // expected number from HTML
        expect($('#massreleaselist>ul>li>label>input').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // check that select all checkbox works
         */
        $('#selectallfieldcheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(NUM_POKEMON);
        $('#selectallfieldcheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // check that select any checkbox works
         */
        $('#selectallfieldanycheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(NUM_ANY);
        $('#selectallfieldanycheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // check that select sour checkbox works
         */
        $('#selectallfieldsourcheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(NUM_SOUR);
        $('#selectallfieldsourcheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // check that select spicy checkbox works
         */
        $('#selectallfieldspicycheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(NUM_SPICY);
        $('#selectallfieldspicycheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // check that select dry checkbox works
         */
        $('#selectallfielddrycheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(NUM_DRY);
        $('#selectallfielddrycheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // check that select sweet checkbox works
         */
        $('#selectallfieldsweetcheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(NUM_SWEET);
        $('#selectallfieldsweetcheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // check that select bitter checkbox works
         */
        $('#selectallfieldbittercheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(NUM_BITTER);
        $('#selectallfieldbittercheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

    });

    test.skip('Test Move controls on Private Fields Bulk Move dialog', () => {
        /*
         * ////////////////////////////////////////
         * // setup
         * HTML is setup to have:
         * - 2 mons that like Any berry
         * - 3 mons that like Sour berry
         * - 4 mons that like Spicy berry
         * - 5 mons that like Dry berry
         * - 6 mons that like Sweet berry
         * - 9 mons that like Bitter berry
         * - 29 pokemon in total
         */
        const NUM_ANY = 2;
        const NUM_SOUR = 3;
        const NUM_SPICY = 4;
        const NUM_DRY = 5;
        const NUM_SWEET = 6;
        const NUM_BITTER = 9;
        const NUM_POKEMON = 29;
        const htmlpath = path.join(__dirname, '../data/', 'privateFieldsWithBulkMoveDialog.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/fields';
        document.documentElement.innerHTML = innerHTML;
        localStorage.setItem(key,
            '{"fieldCustom":"Yamask,g/s/d/2.png/t=1589312209",' +
            '"fieldType":"8,13",' +
            '"fieldNature":"8",' +
            '"fieldEggGroup":"12,9",' +
            '"fieldNewPokemon":true,' +
            '"fieldShiny":true,' +
            '"fieldAlbino":true,' +
            '"fieldMelanistic":true,' +
            '"fieldPrehistoric":true,' +
            '"fieldDelta":true,' +
            '"fieldMega":true,' +
            '"fieldStarter":true,' +
            '"fieldCustomSprite":true,' +
            '"fieldMale":true,' +
            '"fieldFemale":true,' +
            '"fieldNoGender":true,' +
            '"fieldItem":true,' +
            '"fieldNFE":true,' +
            '"customItem":true,' +
            '"customEgg":true,' +
            '"customPokemon":true,' +
            '"customPng":true,' +
            '"releaseSelectAll":true,' +
            '"tooltipEnableMods":true,' +
            '"tooltipNoBerry":true,' +
            '"tooltipBerry":true}');

        new pfqol.pfqol($);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // trigger dialog buttons
         */
        $('*[data-menu="bulkmove"]').eq(0).trigger('click');
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // check that HTML was setup correctly
         */
        expect($('input').filter('#movefieldselectallcheckbox').length).toBe(1);
        expect($('input').filter('#movefieldselectanycheckbox').length).toBe(1);
        expect($('input').filter('#movefieldselectsourcheckbox').length).toBe(1);
        expect($('input').filter('#movefieldselectspicycheckbox').length).toBe(1);
        expect($('input').filter('#movefieldselectdrycheckbox').length).toBe(1);
        expect($('input').filter('#movefieldselectsweetcheckbox').length).toBe(1);
        expect($('input').filter('#movefieldselectbittercheckbox').length).toBe(1);
        // expected number from HTML
        expect($('#massmovelist>ul>li>label>input').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // check that select all checkbox works
         */
        $('#movefieldselectallcheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(NUM_POKEMON);
        $('#movefieldselectallcheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // check that select any checkbox works
         */
        $('#movefieldselectanycheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(NUM_ANY);
        $('#movefieldselectanycheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // check that select sour checkbox works
         */
        $('#movefieldselectsourcheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(NUM_SOUR);
        $('#movefieldselectsourcheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // check that select spicy checkbox works
         */
        $('#movefieldselectspicycheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(NUM_SPICY);
        $('#movefieldselectspicycheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // check that select dry checkbox works
         */
        $('#movefieldselectdrycheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(NUM_DRY);
        $('#movefieldselectdrycheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // check that select sweet checkbox works
         */
        $('#movefieldselectsweetcheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(NUM_SWEET);
        $('#movefieldselectsweetcheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // check that select bitter checkbox works
         */
        $('#movefieldselectbittercheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(NUM_BITTER);
        $('#movefieldselectbittercheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////
    });

    test.skip('Corner case test cases for coverage', () => {
        const htmlpath = path.join(__dirname, '../data/', 'privateFieldsForSearchTests.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/fields';
        document.documentElement.innerHTML = innerHTML;
        localStorage.setItem(key,
            /*
             * '{"fieldCustom":"Yamask,g/s/d/2.png/t=1589312209",' +
             * '"fieldType":"8,13,0",' +
             * '"fieldNature":"8",' +
             * '"fieldEggGroup":"12,9,1,2",' +
             */
            '{"fieldCustom":"",' +
            '"fieldType":"",' +
            '"fieldNature":"",' +
            '"fieldEggGroup":"",' +
            '"fieldNewPokemon":false,' +
            '"fieldShiny":false,' +
            '"fieldAlbino":false,' +
            '"fieldMelanistic":false,' +
            '"fieldPrehistoric":false,' +
            '"fieldDelta":false,' +
            '"fieldMega":false,' +
            '"fieldStarter":false,' +
            '"fieldCustomSprite":false,' +
            '"fieldMale":false,' +
            '"fieldFemale":false,' +
            '"fieldNoGender":false,' +
            '"fieldItem":false,' +
            '"fieldNFE":false,' +
            '"customItem":false,' +
            '"customEgg":false,' +
            '"customPokemon":false,' +
            '"customPng":false,' +
            '"releaseSelectAll":false,' +
            '"tooltipEnableMods":false,' +
            '"tooltipNoBerry":false,' +
            '"tooltipBerry":false}');

        new pfqol.pfqol($);

        /*
         * ////////////////////////////////////////
         * // trigger MutationObserver observe
         * $('#field_field>.field>span').eq(-1).remove();
         * $('#field_field>.field>div').eq(-1).remove();
         * ////////////////////////////////////////
         */

        /*
         * ////////////////////////////////////////
         * // get coverage for no genders branch in custom pokemon part of customSearch
         */
        localStorage.setItem(key,
            '{"fieldCustom":"Yamask",' +
            '"fieldType":"8,13",' +
            '"fieldNature":"8",' +
            '"fieldEggGroup":"12,9",' +
            '"fieldNewPokemon":true,' +
            '"fieldShiny":true,' +
            '"fieldAlbino":true,' +
            '"fieldMelanistic":true,' +
            '"fieldPrehistoric":true,' +
            '"fieldDelta":true,' +
            '"fieldMega":true,' +
            '"fieldStarter":true,' +
            '"fieldCustomSprite":true,' +
            '"fieldMale":false,' + // <-- false
            '"fieldFemale":false,' + // <-- false
            '"fieldNoGender":false,' + // <-- false
            '"fieldItem":true,' +
            '"fieldNFE":true,' +
            '"customItem":true,' +
            '"customEgg":true,' +
            '"customPokemon":true,' +
            '"customPng":true,' +
            '"releaseSelectAll":true,' +
            '"tooltipEnableMods":true,' +
            '"tooltipNoBerry":true,' +
            '"tooltipBerry":true}');
        new pfqol.pfqol($);

        // use 'fieldShiny' click as a roundabout way to reload the settings
        $('[data-key=fieldShiny]').trigger('click');

        // get coverage for findNFE = false branch in customSearch
        localStorage.setItem(key,
            '{"fieldCustom":"Yamask,g/s/d/2.png/t=1589312209",' +
            '"fieldType":"8,13",' +
            '"fieldNature":"8",' +
            '"fieldEggGroup":"12,9",' +
            '"fieldNewPokemon":true,' +
            '"fieldShiny":true,' +
            '"fieldAlbino":true,' +
            '"fieldMelanistic":true,' +
            '"fieldPrehistoric":true,' +
            '"fieldDelta":true,' +
            '"fieldMega":true,' +
            '"fieldStarter":true,' +
            '"fieldCustomSprite":true,' +
            '"fieldMale":true,' +
            '"fieldFemale":true,' +
            '"fieldNoGender":true,' +
            '"fieldItem":true,' +
            '"fieldNFE":false,' +// <-- false
            '"customItem":true,' +
            '"customEgg":true,' +
            '"customPokemon":true,' +
            '"customPng":true,' +
            '"releaseSelectAll":true,' +
            '"tooltipEnableMods":true,' +
            '"tooltipNoBerry":true,' +
            '"tooltipBerry":true}');
        $('[data-key="fieldNFE"]').trigger('click');
    });
});
