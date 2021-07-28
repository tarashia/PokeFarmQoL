const $ = require('../../__mocks__/jquery_files').jQuery;
$.USERID = '';
const key = `${$.USERID}.QoLPublicFields`;
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

const expectTooltipsExist = function (numTooltipEnableMods, numTooltipNoBerry,
    numTooltipBerry, tooltipEnableModsChecked,
    tooltipNoBerryChecked, tooltipNoBerryDisabled,
    tooltipBerryChecked, tooltipBerryDisabled) {
    expect($('[data-key=tooltipEnableMods]').length).toBe(numTooltipEnableMods);
    expect($('[data-key=tooltipNoBerry]').length).toBe(numTooltipNoBerry);
    expect($('[data-key=tooltipBerry]').length).toBe(numTooltipBerry);
    expect($('[data-key=tooltipEnableMods]').prop('checked')).toBe(tooltipEnableModsChecked);
    expect($('[data-key=tooltipNoBerry]').prop('checked')).toBe(tooltipNoBerryChecked);
    expect($('[data-key=tooltipNoBerry]').prop('disabled')).toBe(tooltipNoBerryDisabled);
    expect($('[data-key=tooltipBerry]').prop('checked')).toBe(tooltipBerryChecked);
    expect($('[data-key=tooltipBerry]').prop('disabled')).toBe(tooltipBerryDisabled);
};
const setupTooltipValues = function (tooltipEnableModsChecked,
    tooltipNoBerryChecked, tooltipNoBerryDisabled,
    tooltipBerryChecked, tooltipBerryDisabled) {
    if ($('[data-key=tooltipEnableMods]').prop('checked') === !tooltipEnableModsChecked) {
        $('[data-key=tooltipEnableMods]').trigger('click');
    }
    expect($('[data-key=tooltipEnableMods]').prop('checked')).toBe(tooltipEnableModsChecked);
    if ($('[data-key=tooltipNoBerry]').prop('checked') === !tooltipNoBerryChecked) {
        $('[data-key=tooltipNoBerry]').trigger('click');
    }
    expect($('[data-key=tooltipNoBerry]').prop('checked')).toBe(tooltipNoBerryChecked);
    expect($('[data-key=tooltipNoBerry]').prop('disabled')).toBe(tooltipNoBerryDisabled);
    if ($('[data-key=tooltipBerry]').prop('checked') === !tooltipBerryChecked) {
        $('[data-key=tooltipBerry]').trigger('click');
    }
    expect($('[data-key=tooltipBerry]').prop('checked')).toBe(tooltipBerryChecked);
    expect($('[data-key=tooltipBerry]').prop('disabled')).toBe(tooltipBerryDisabled);
};

const checkLocalSettings = function (tooltipEnableModsChecked,
    tooltipNoBerryChecked, tooltipBerryChecked) {
    expect(localStorage.getItem(key))
        .toEqual(expect.stringContaining(`"tooltipEnableMods":${tooltipEnableModsChecked}`));
    expect(localStorage.getItem(key))
        .toEqual(expect.stringContaining(`"tooltipNoBerry":${tooltipNoBerryChecked}`));
    expect(localStorage.getItem(key))
        .toEqual(expect.stringContaining(`"tooltipBerry":${tooltipBerryChecked}`));
};

const checkFieldmonClasses = function (numCormyr, numNotHungry, numGoAway) {
    expect($('.cormyr').length).toBe(numCormyr);
    expect($('.nothungry').length).toBe(numNotHungry);
    expect($('.goaway').length).toBe(numGoAway);
};

describe('Test Public Fields Page', () => {
    /*
     * Tooltip Controls Test
     * - Tooltip mods
     *   - tooltipEnableMods (checkbox)
     *   - tooltipNoBerry (checkbox)
     *   - tooltipBerry (checkbox)
     * - Tests
     *    1. tooltipEnableMods = true , tooltipNoBerry = true , tooltipBerry = true , no berry selected
     *    2. tooltipEnableMods = true , tooltipNoBerry = true , tooltipBerry = true ,    berry selected
     *    3. tooltipEnableMods = true , tooltipNoBerry = true , tooltipBerry = false, no berry selected
     *    4. tooltipEnableMods = true , tooltipNoBerry = true , tooltipBerry = false,    berry selected
     *    5. tooltipEnableMods = true , tooltipNoBerry = false, tooltipBerry = true , no berry selected
     *    6. tooltipEnableMods = true , tooltipNoBerry = false, tooltipBerry = true ,    berry selected
     *    7. tooltipEnableMods = true , tooltipNoBerry = false, tooltipBerry = false, no berry selected
     *    8. tooltipEnableMods = true , tooltipNoBerry = false, tooltipBerry = false,    berry selected
     *    9. tooltipEnableMods = false, tooltipNoBerry = true , tooltipBerry = true , no berry selected
     *   10. tooltipEnableMods = false, tooltipNoBerry = true , tooltipBerry = true ,    berry selected
     *   11. tooltipEnableMods = false, tooltipNoBerry = true , tooltipBerry = false, no berry selected
     *   12. tooltipEnableMods = false, tooltipNoBerry = true , tooltipBerry = false,    berry selected
     *   13. tooltipEnableMods = false, tooltipNoBerry = false, tooltipBerry = true , no berry selected
     *   14. tooltipEnableMods = false, tooltipNoBerry = false, tooltipBerry = true ,    berry selected
     *   15. tooltipEnableMods = false, tooltipNoBerry = false, tooltipBerry = false, no berry selected
     *   16. tooltipEnableMods = false, tooltipNoBerry = false, tooltipBerry = false,    berry selected
     */
    test.skip('Test Tooltip controls on Public Fields page when no Berry is Selected', () => {
        /*
         * ////////////////////////////////////////
         * // setup
         */
        const NUM_POKEMON = 28;
        const htmlpath = path.join(__dirname, '../data/', 'publicFieldsForTooltipTestsNoBerrySelected.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/fields/ECEInTheHole';
        document.documentElement.innerHTML = innerHTML;
        localStorage.setItem(key,
            '{"fieldByBerry":false,' +
            '"fieldByMiddle":false,' +
            '"fieldByGrid":false,' +
            '"fieldClickCount":false,' +
            '"fieldCustom":"Yamask,g/s/d/2.png/t=1589312209",' +
            '"fieldType":"8,13",' +
            '"fieldNature":"8",' +
            '"fieldEggGroup":"12,9",' +
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
            '"fieldCustomItem":false,' +
            '"fieldCustomPokemon":false,' +
            '"fieldCustomEgg":false,' +
            '"fieldCustomPng":false,' +
            '"fieldItem":false,' +
            '"tooltipEnableMods":true,' +
            '"tooltipNoBerry":true,' +
            '"tooltipBerry":true}');

        new pfqol.pfqol($);

        $(window).trigger('load');

        // check that setup worked
        expectTooltipsExist(1, 1, 1, true, true, false, true, false);
        checkLocalSettings(true, true, true);
        /*
         * check that no berry is selected by showing that the cormyr, nothungry, and goaway classes
         * are not present
         */
        checkFieldmonClasses(0, 0, 0);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // get coverage for '.collapsible' click handler
         */
        $('.collapsible').trigger('click');
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // 1. tooltipEnableMods = true , tooltipNoBerry = true , tooltipBerry = true , no berry selected
         */
        setupTooltipValues(true, true, false, true, false);
        checkLocalSettings(true, true, true);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(0);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * //  3. tooltipEnableMods = true , tooltipNoBerry = true , tooltipBerry = false, no berry selected
         */
        setupTooltipValues(true, true, false, false, false);
        checkLocalSettings(true, true, false);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(0);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * //  5. tooltipEnableMods = true , tooltipNoBerry = false, tooltipBerry = true , no berry selected
         */
        setupTooltipValues(true, false, false, true, false);
        checkLocalSettings(true, false, true);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * //  7. tooltipEnableMods = true , tooltipNoBerry = false, tooltipBerry = false, no berry selected
         */
        setupTooltipValues(true, false, false, false, false);
        checkLocalSettings(true, false, false);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * //  9. tooltipEnableMods = false, tooltipNoBerry = true , tooltipBerry = true , no berry selected
         */
        setupTooltipValues(true, true, false, true, false);
        setupTooltipValues(false, true, true, true, true);
        checkLocalSettings(false, true, true);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // 11. tooltipEnableMods = false, tooltipNoBerry = true , tooltipBerry = false, no berry selected
         */
        setupTooltipValues(true, true, false, false, false);
        setupTooltipValues(false, true, true, false, true);
        checkLocalSettings(false, true, false);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // 13. tooltipEnableMods = false, tooltipNoBerry = false, tooltipBerry = true , no berry selected
         */
        setupTooltipValues(true, false, false, true, false);
        setupTooltipValues(false, false, true, true, true);
        checkLocalSettings(false, false, true);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // 15. tooltipEnableMods = false, tooltipNoBerry = false, tooltipBerry = false, no berry selected
         */
        setupTooltipValues(true, false, false, false, false);
        setupTooltipValues(false, false, true, false, true);
        checkLocalSettings(false, false, false);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
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

    test.skip('Test Tooltip controls on Public Fields page when a Berry is Selected', () => {
        /*
         * ////////////////////////////////////////
         * // setup
         * HTML is setup to simulate the Aspear berry (Sour) being selected.
         * The following quantities of pokemon are relevant:
         * - 4 pokemon like Sour
         * - 3 pokemon like Any
         * - 3 pokemon dislike Sour
         */
        const NUM_POKEMON = 28;
        const NUM_CORMYR = 7; // like Sour + Any
        const NUM_NOT_HUNGRY = 0;
        const NUM_GO_AWAY = 3; // dislike Sour
        const htmlpath = path.join(__dirname, '../data/', 'publicFieldsForTooltipTestsBerrySelected.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/fields/ECEInTheHole';
        document.documentElement.innerHTML = innerHTML;
        localStorage.setItem(key,
            '{"fieldByBerry":false,' +
            '"fieldByMiddle":false,' +
            '"fieldByGrid":false,' +
            '"fieldClickCount":false,' +
            '"fieldCustom":"Yamask,g/s/d/2.png/t=1589312209",' +
            '"fieldType":"8,13",' +
            '"fieldNature":"8",' +
            '"fieldEggGroup":"12,9",' +
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
            '"fieldCustomItem":false,' +
            '"fieldCustomPokemon":false,' +
            '"fieldCustomEgg":false,' +
            '"fieldCustomPng":false,' +
            '"fieldItem":false,' +
            '"tooltipEnableMods":true,' +
            '"tooltipNoBerry":true,' +
            '"tooltipBerry":true}');

        new pfqol.pfqol($);

        $(window).trigger('load');

        // check that setup worked
        expectTooltipsExist(1, 1, 1, true, true, false, true, false);
        // check that the correct number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(0);
        // check that a berry is selected by showing that the following exist
        checkFieldmonClasses(NUM_CORMYR, NUM_NOT_HUNGRY, NUM_GO_AWAY);
        expect($('#field_berries').hasClass('selected')).toBe(true);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // get coverage for '.collapsible' click handler
         */
        $('.collapsible').trigger('click');
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * //  2. tooltipEnableMods = true , tooltipNoBerry = true , tooltipBerry = true ,    berry selected
         */
        setupTooltipValues(true, true, false, true, false);
        checkLocalSettings(true, true, true);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(0);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * //  4. tooltipEnableMods = true , tooltipNoBerry = true , tooltipBerry = false,    berry selected
         */
        setupTooltipValues(true, true, false, false, false);
        checkLocalSettings(true, true, false);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * //  6. tooltipEnableMods = true , tooltipNoBerry = false, tooltipBerry = true ,    berry selected
         */
        setupTooltipValues(true, false, false, true, false);
        checkLocalSettings(true, false, true);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(0);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * //  8. tooltipEnableMods = true , tooltipNoBerry = false, tooltipBerry = false,    berry selected
         */
        setupTooltipValues(true, false, false, false, false);
        checkLocalSettings(true, false, false);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // 10. tooltipEnableMods = false, tooltipNoBerry = true , tooltipBerry = true ,    berry selected
         */
        setupTooltipValues(true, true, false, true, false);
        setupTooltipValues(false, true, true, true, true);
        checkLocalSettings(false, true, true);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // 12. tooltipEnableMods = false, tooltipNoBerry = true , tooltipBerry = false,    berry selected
         */
        setupTooltipValues(true, true, false, false, false);
        setupTooltipValues(false, true, true, false, true);
        checkLocalSettings(false, true, false);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // 14. tooltipEnableMods = false, tooltipNoBerry = false, tooltipBerry = true ,    berry selected
         */
        setupTooltipValues(true, false, false, true, false);
        setupTooltipValues(false, false, true, true, true);
        checkLocalSettings(false, false, true);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////

        /*
         * ////////////////////////////////////////
         * // 16. tooltipEnableMods = false, tooltipNoBerry = false, tooltipBerry = false,    berry selected
         */
        setupTooltipValues(true, false, false, false, false);
        setupTooltipValues(false, false, true, false, true);
        checkLocalSettings(false, false, false);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
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

    test.skip('Test Search controls on Public Fields page', () => {
        /*
         * ////////////////////////////////////////
         * // remove handlers that linger from the previous test
         */
        $(document).off('click', '#addFieldTypeSearch');
        $(document).off('click', '#removeFieldTypeSearch');
        $(document).off('click', '#addFieldNatureSearch');
        $(document).off('click', '#removeFieldNature');
        $(document).off('click', '#addFieldEggGroupSearch');
        $(document).off('click', '#removeFieldEggGroup');
        $(document).off('click', '#addTextField');
        $(document).off('click', '#removeTextField');

        /*
         * // setup HTML
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
        const htmlpath = path.join(__dirname, '../data/', 'publicFieldsForSearchTests.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/fields/ECEInTheHole';
        document.documentElement.innerHTML = innerHTML;

        localStorage.setItem(key,
            '{"fieldByBerry":false,' +
            '"fieldByMiddle":false,' +
            '"fieldByGrid":false,' +
            '"fieldClickCount":true,' +
            '"fieldCustom":"",' +
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
            '"fieldCustomItem":false,' +
            '"fieldCustomEgg":false,' +
            '"fieldCustomPokemon":false,' +
            '"fieldCustomPng":false,' +
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

        // check that HTML was setup correctly
        expect($('input').filter('#addFieldTypeSearch').length).toBe(1);
        expect($('[data-key=fieldType][array-name=typeArray]').length).toBe(1);
        expect($('input').filter('#removeFieldTypeSearch').length).toBe(1);
        expect($('input').filter('#addFieldNatureSearch').length).toBe(1);
        expect($('[data-key=fieldNature][array-name=natureArray]').length).toBe(1);
        expect($('input').filter('#removeFieldNature').length).toBe(1);
        expect($('input').filter('#addFieldEggGroupSearch').length).toBe(1);
        expect($('[data-key=fieldEggGroup][array-name=eggGroupArray]').length).toBe(1);
        expect($('input').filter('#removeFieldEggGroup').length).toBe(1);

        expect($('[data-key=fieldCustomEgg]').length).toBe(1);
        expect($('[data-key=fieldCustomPokemon]').length).toBe(1);
        expect($('[data-key=fieldCustomPng]').length).toBe(1);

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
        expect($('.publicfoundme').length).toBe(NUM_SHINY);
        $('[data-key=fieldShiny]').trigger('click');
        expect($('.publicfoundme').length).toBe(0);
        expect($('[data-key=fieldShiny]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).fieldShiny).toBe(false);
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('[data-key=fieldAlbino]').trigger('click');
        expect($('[data-key=fieldAlbino]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem(key)).fieldAlbino).toBe(true);
        expect($('.publicfoundme').length).toBe(NUM_ALBINO);
        $('[data-key=fieldAlbino]').trigger('click');
        expect($('.publicfoundme').length).toBe(0);
        expect($('[data-key=fieldAlbino]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).fieldAlbino).toBe(false);
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('[data-key=fieldMelanistic]').trigger('click');
        expect($('[data-key=fieldMelanistic]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem(key)).fieldMelanistic).toBe(true);
        expect($('.publicfoundme').length).toBe(NUM_MELANISTIC);
        $('[data-key=fieldMelanistic]').trigger('click');
        expect($('.publicfoundme').length).toBe(0);
        expect($('[data-key=fieldMelanistic]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).fieldMelanistic).toBe(false);
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('[data-key=fieldPrehistoric]').trigger('click');
        expect($('[data-key=fieldPrehistoric]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem(key)).fieldPrehistoric).toBe(true);
        expect($('.publicfoundme').length).toBe(NUM_PREHISTORIC);
        $('[data-key=fieldPrehistoric]').trigger('click');
        expect($('.publicfoundme').length).toBe(0);
        expect($('[data-key=fieldPrehistoric]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).fieldPrehistoric).toBe(false);
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('[data-key=fieldDelta]').trigger('click');
        expect($('[data-key=fieldDelta]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem(key)).fieldDelta).toBe(true);
        expect($('.publicfoundme').length).toBe(NUM_DELTA);
        $('[data-key=fieldDelta]').trigger('click');
        expect($('.publicfoundme').length).toBe(0);
        expect($('[data-key=fieldDelta]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).fieldDelta).toBe(false);
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('[data-key=fieldMega]').trigger('click');
        expect($('[data-key=fieldMega]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem(key)).fieldMega).toBe(true);
        expect($('.publicfoundme').length).toBe(NUM_MEGA);
        $('[data-key=fieldMega]').trigger('click');
        expect($('.publicfoundme').length).toBe(0);
        expect($('[data-key=fieldMega]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).fieldMega).toBe(false);
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('[data-key=fieldStarter]').trigger('click');
        expect($('[data-key=fieldStarter]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem(key)).fieldStarter).toBe(true);
        expect($('.publicfoundme').length).toBe(NUM_STARTER);
        $('[data-key=fieldStarter]').trigger('click');
        expect($('.publicfoundme').length).toBe(0);
        expect($('[data-key=fieldStarter]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).fieldStarter).toBe(false);
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('[data-key=fieldCustomSprite]').trigger('click');
        expect($('[data-key=fieldCustomSprite]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem(key)).fieldCustomSprite).toBe(true);
        expect($('.publicfoundme').length).toBe(NUM_CS);
        $('[data-key=fieldCustomSprite]').trigger('click');
        expect($('.publicfoundme').length).toBe(0);
        expect($('[data-key=fieldCustomSprite]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).fieldCustomSprite).toBe(false);
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('[data-key=fieldItem]').trigger('click');
        expect($('[data-key=fieldItem]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem(key)).fieldItem).toBe(true);
        expect($('.publicfoundme').length).toBe(NUM_HOLDING_ITEM);
        $('[data-key=fieldItem]').trigger('click');
        expect($('.publicofundme').length).toBe(0);
        expect($('[data-key=fieldItem]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).fieldItem).toBe(false);
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('#addFieldTypeSearch').trigger('click');
        // check that the correct changes were applied
        expect($('[data-key=fieldType]').length).toBe(2);
        expect($('[id=removeFieldTypeSearch]').length).toBe(2);
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
        expect($('.publicfoundme').length).toBe(45); // just Ground
        expect(JSON.parse(localStorage.getItem(key)).fieldType).toBe('8');
        $('[data-key=fieldType]').eq(1).prop('selectedIndex', 5); // Grass
        $('[data-key=fieldType]').eq(1).trigger('input');
        expect($('.publicfoundme').length).toBe(55); // Ground or Grass
        expect(JSON.parse(localStorage.getItem(key)).fieldType).toBe('8,4');
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('#removeFieldTypeSearch').eq(0).trigger('click');
        // check that the correct changes were applied
        expect($('[data-key=fieldType]').length).toBe(1);
        expect($('[id=removeFieldTypeSearch]').length).toBe(1);
        expect($('[data-key=fieldType]').eq(0).prop('selectedIndex')).toBe(5); // Grass
        expect($('.publicfoundme').length).toBe(10); // just Ground
        expect(JSON.parse(localStorage.getItem(key)).fieldType).toBe('4');
        // click remove again
        $('#removeFieldTypeSearch').eq(0).trigger('click');
        expect($('[data-key=fieldType]').length).toBe(0);
        expect($('[id=removeFieldTypeSearch]').length).toBe(0);
        expect($('.publicfoundme').length).toBe(0);
        expect(JSON.parse(localStorage.getItem(key)).fieldType).toBe('');
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('#addFieldNatureSearch').trigger('click');
        // check that the correct changes were applied
        expect($('[data-key=fieldNature]').length).toBe(2);
        expect($('[id=removeFieldNature]').length).toBe(2);
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
        expect($('.publicfoundme').length).toBe(NUM_MILD); // just Mild
        expect(JSON.parse(localStorage.getItem(key)).fieldNature).toBe('1');
        $('[data-key=fieldNature]').eq(1).prop('selectedIndex', 5); // Bold
        $('[data-key=fieldNature]').eq(1).trigger('input');
        expect($('.publicfoundme').length).toBe(NUM_MILD + NUM_BOLD); // Mild or Bold
        expect(JSON.parse(localStorage.getItem(key)).fieldNature).toBe('1,4');
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('#removeFieldNature').eq(0).trigger('click');
        // check that the correct changes were applied
        expect($('[data-key=fieldNature]').length).toBe(1);
        expect($('[id=removeFieldNature]').length).toBe(1);
        expect($('[data-key=fieldNature]').eq(0).prop('selectedIndex')).toBe(5); // Bold
        expect(JSON.parse(localStorage.getItem(key)).fieldNature).toBe('4');
        expect($('.publicfoundme').length).toBe(NUM_BOLD); // just Bold
        // click remove again
        $('#removeFieldNature').eq(0).trigger('click');
        expect($('[data-key=fieldNature]').length).toBe(0);
        expect($('[id=removeFieldNature]').length).toBe(0);
        expect($('.publicfoundme').length).toBe(0);
        expect(JSON.parse(localStorage.getItem(key)).fieldNature).toBe('');
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('#addFieldEggGroupSearch').trigger('click');
        // check that the correct changes were applied
        expect($('[data-key=fieldEggGroup]').length).toBe(2);
        expect($('[id=removeFieldEggGroup]').length).toBe(2);
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
        expect($('.publicfoundme').length).toBe(NUM_AMORPHOUS); // just Amorphous
        expect(JSON.parse(localStorage.getItem(key)).fieldEggGroup).toBe('9');
        $('[data-key=fieldEggGroup]').eq(1).prop('selectedIndex', 2); // Monster
        $('[data-key=fieldEggGroup]').eq(1).trigger('input');
        expect($('.publicfoundme').length).toBe(NUM_AMORPHOUS + NUM_MONSTER); // Amorphous or Monster
        expect(JSON.parse(localStorage.getItem(key)).fieldEggGroup).toBe('9,1');
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('#removeFieldEggGroup').trigger('click');
        // check that the correct changes were applied
        expect($('[data-key=fieldEggGroup]').length).toBe(1);
        expect($('[id=removeFieldEggGroup]').length).toBe(1);
        expect($('[data-key=fieldEggGroup]').eq(0).prop('selectedIndex')).toBe(2); // Monster
        expect($('.publicfoundme').length).toBe(NUM_MONSTER); // just Monster
        expect(JSON.parse(localStorage.getItem(key)).fieldEggGroup).toBe('1');
        // click remove again
        $('#removeFieldEggGroup').eq(0).trigger('click');
        expect($('[data-key=fieldEggGroup]').length).toBe(0);
        expect($('[id=removeFieldEggGroup]').length).toBe(0);
        expect($('.publicfoundme').length).toBe(0);
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
         * // enable the fieldCustomPokemon button
         */
        $('[data-key=fieldCustomPokemon]').trigger('click');
        expect($('[data-key=fieldCustomPokemon]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem(key)).fieldCustomPokemon).toBe(true);
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
        expect($('.publicfoundme').length).toBe(45); // just text
        expect(JSON.parse(localStorage.getItem(key)).fieldCustom).toBe('Cofagrigus');
        // disable the fieldCustomPokemon button
        $('[data-key=fieldCustomPokemon]').trigger('click');
        expect($('[data-key=fieldCustomPokemon]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).fieldCustomPokemon).toBe(false);
        expect($('.publicfoundme').length).toBe(0);
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
         * // enable the fieldCustomPng button
         */
        $('[data-key=fieldCustomPng]').trigger('click');
        expect($('[data-key=fieldCustomPng]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem(key)).fieldCustomPng).toBe(true);
        // check search by URL
        $('[data-key=fieldCustom]').eq(1).val('1/g/g.png/t=1569852763');
        $('[data-key=fieldCustom]').eq(1).trigger('input');
        expect($('.publicfoundme').length).toBe(10); // just PNG URL
        expect(JSON.parse(localStorage.getItem(key)).fieldCustom).toBe('Cofagrigus,1/g/g.png/t=1569852763');
        // disable the fieldCustomPng button
        $('[data-key=fieldCustomPng]').trigger('click');
        expect($('[data-key=fieldCustomPng]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).fieldCustomPng).toBe(false);
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

    test.skip('Test loadSettings when local storage has less settings', () => {
        const htmlpath = path.join(__dirname, '../data/', 'publicFields.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/fields/ECEInTheHole';
        document.documentElement.innerHTML = innerHTML;

        localStorage.setItem(key,
            '{"fieldByBerry":false,' +
            '"fieldByMiddle":false,' +
            '"fieldByGrid":false,' +
            '"fieldClickCount":true,' +
            '"fieldCustom":"Mawile,c/3/6.png/t=1507192849",' +
            '"fieldType":"1, 2",' +
            '"fieldNature":"1,2",' +
            '"fieldEggGroup":"1,2",' +
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
            '"fieldCustomItem":true,' +
            '"fieldCustomPokemon":true,' +
            '"fieldCustomEgg":true,' +
            '"fieldCustomPng":true,' +
            '"fieldItem":true,' +
            '"tooltipEnableMods":true,' +
            '"tooltipNoBerry":true}');
        new pfqol.pfqol($);

    });

    test.skip('Test loadSettings when local storage has more settings', () => {
        const htmlpath = path.join(__dirname, '../data/', 'publicFields.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/fields/ECEInTheHole';
        document.documentElement.innerHTML = innerHTML;

        localStorage.setItem(key,
            '{"fieldByBerry":false,' +
            '"fieldByMiddle":false,' +
            '"fieldByGrid":false,' +
            '"fieldClickCount":true,' +
            '"fieldCustom":"Mawile,c/3/6.png/t=1507192849",' +
            '"fieldType":"1, 2",' +
            '"fieldNature":"1,2",' +
            '"fieldEggGroup":"1,2",' +
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
            '"fieldCustomItem":true,' +
            '"fieldCustomPokemon":true,' +
            '"fieldCustomEgg":true,' +
            '"fieldCustomPng":true,' +
            '"fieldItem":true,' +
            '"tooltipEnableMods":true,' +
            '"tooltipNoBerry":true,' +
            '"tooltipBerry":true,' +
            '"fdsa":true}');
        new pfqol.pfqol($);

    });
});
