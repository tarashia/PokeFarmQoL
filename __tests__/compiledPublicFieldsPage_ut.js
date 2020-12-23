const $ = require('../__mocks__/jquery_files').jQuery;
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


/*
 * - Field sort controls
 *   - fieldByBerry (checkbox)
 *   - fieldByMiddle (checkbox)
 *   - fieldByGrid (checkbox)
 *   - fieldClickCount (checkbox)
 *   - Test: fieldByBerry - check that none of the other 2 are selected and that class is added
 *   - Test: fieldByMiddle - check that none of the other 2 are selected and that class is added
 *   - Test: fieldByGrid - check that none of the other 2 are selected and that class is added
 *   - Test: fieldClickCount - check that class is added
 * - Field search controls
 *   - fieldShiny (checkbox)
 *   - fieldAlbino (checkbox)
 *   - fieldMelanistic (checkbox)
 *   - fieldPrehistoric (checkbox)
 *   - fieldDelta (checkbox)
 *   - fieldMega (checkbox)
 *   - fieldStarter (checkbox)
 *   - fieldCustomSprite (checkbox)
 *   - fieldItem (checkbox)
 *   - #addFieldTypeSearch (button)
 *   - #fieldTypes[...] (select)
 *   - #removeFieldTypeSearch[...] (button)
 *   - #addFieldNatureSearch (button)
 *   - #natureTypes[...] (select)
 *   - #removeFieldNature[...] (button)
 *   - #addFieldEggGroupSearch (button)
 *   - #eggGroupTypes[...] (select)
 *   - #removeFieldEggGroup[...] (button)
 *   - fieldCustomEgg (checkbox)
 *   - fieldCustomPokemon (checkbox)
 *   - fieldCustomPng (checkbox)
 *   - fieldMale (checkbox)
 *   - fieldFemale (checkbox)
 *   - fieldNoGender (checkbox)
 *   - #addTextField (button)
 *   - #searchkeys[...] (textfield)
 *   - #removeTextField[...] (button)
*/

const expectTooltipsExist = function(numTooltipEnableMods,  numTooltipNoBerry, 
    numTooltipBerry,  tooltipEnableModsChecked, 
    tooltipNoBerryChecked,  tooltipNoBerryDisabled,
    tooltipBerryChecked, tooltipBerryDisabled) {
    expect($('[data-key=tooltipEnableMods]').length).toBe(numTooltipEnableMods);
    expect($('[data-key=tooltipNoBerry]').length).toBe(numTooltipNoBerry);
    expect($('[data-key=tooltipBerry]').length).toBe(numTooltipBerry);
    expect($('[data-key=tooltipEnableMods]').prop('checked')).toBe(tooltipEnableModsChecked);
    expect($('[data-key=tooltipNoBerry]').prop('checked')).toBe(tooltipNoBerryChecked);
    expect($('[data-key=tooltipNoBerry]').prop('disabled')).toBe(tooltipNoBerryDisabled);
    expect($('[data-key=tooltipBerry]').prop('checked')).toBe(tooltipBerryChecked);
    expect($('[data-key=tooltipBerry]').prop('disabled')).toBe(tooltipBerryDisabled);
}
const setupTooltipValues = function(tooltipEnableModsChecked, 
    tooltipNoBerryChecked,  tooltipNoBerryDisabled,
    tooltipBerryChecked, tooltipBerryDisabled) {
    if ($('[data-key=tooltipEnableMods]').prop('checked') === !tooltipEnableModsChecked)
        $('[data-key=tooltipEnableMods]').trigger('click');
    expect($('[data-key=tooltipEnableMods]').prop('checked')).toBe(tooltipEnableModsChecked);
    if ($('[data-key=tooltipNoBerry]').prop('checked') === !tooltipNoBerryChecked)
        $('[data-key=tooltipNoBerry]').trigger('click');
    expect($('[data-key=tooltipNoBerry]').prop('checked')).toBe(tooltipNoBerryChecked);
    expect($('[data-key=tooltipNoBerry]').prop('disabled')).toBe(tooltipNoBerryDisabled);
    if ($('[data-key=tooltipBerry]').prop('checked') === !tooltipBerryChecked)
        $('[data-key=tooltipBerry]').trigger('click');
    expect($('[data-key=tooltipBerry]').prop('checked')).toBe(tooltipBerryChecked);
    expect($('[data-key=tooltipBerry]').prop('disabled')).toBe(tooltipBerryDisabled);
}

const checkLocalSettings = function(tooltipEnableModsChecked, 
    tooltipNoBerryChecked, tooltipBerryChecked) {
    expect(localStorage.getItem('QoLPublicFields'))
        .toEqual(expect.stringContaining(`"tooltipEnableMods":${tooltipEnableModsChecked}`));
    expect(localStorage.getItem('QoLPublicFields'))
        .toEqual(expect.stringContaining(`"tooltipNoBerry":${tooltipNoBerryChecked}`));
    expect(localStorage.getItem('QoLPublicFields'))
        .toEqual(expect.stringContaining(`"tooltipBerry":${tooltipBerryChecked}`));
}

const checkFieldmonClasses = function(numCormyr, numNotHungry, numGoAway) {
    expect($('.cormyr').length).toBe(numCormyr);
    expect($('.nothungry').length).toBe(numNotHungry);
    expect($('.goaway').length).toBe(numGoAway);
}

describe("Test Public Fields Page", () => {
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
    test("Test Tooltip controls on Public Fields page when no Berry is Selected", () => {
        ////////////////////////////////////////
        // setup
        const NUM_POKEMON = 28;
        const htmlpath = path.join(__dirname, './data/', 'publicFieldsForTooltipTestsNoBerrySelected.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = "https://pokefarm.com/fields/ECEInTheHole";
        document.documentElement.innerHTML = innerHTML;
        localStorage.setItem('QoLPublicFields',
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

        pfqol.pfqol($);

        $(window).trigger('load');

        // check that setup worked
        expectTooltipsExist(1, 1, 1, true, true, false, true, false);
        checkLocalSettings(true, true, true);
        // check that no berry is selected by showing that the cormyr, nothungry, and goaway classes
        // are not present
        checkFieldmonClasses(0, 0, 0);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // get coverage for '.collapsible' click handler
        $('.collapsible').trigger('click');
        ////////////////////////////////////////

        ////////////////////////////////////////
        // 1. tooltipEnableMods = true , tooltipNoBerry = true , tooltipBerry = true , no berry selected
        setupTooltipValues(true, true, false, true, false);
        checkLocalSettings(true, true, true);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(0);
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        //  3. tooltipEnableMods = true , tooltipNoBerry = true , tooltipBerry = false, no berry selected
        setupTooltipValues(true, true, false, false, false);
        checkLocalSettings(true, true, false);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(0);
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        //  5. tooltipEnableMods = true , tooltipNoBerry = false, tooltipBerry = true , no berry selected
        setupTooltipValues(true, false, false, true, false);
        checkLocalSettings(true, false, true);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////

        ////////////////////////////////////////
        //  7. tooltipEnableMods = true , tooltipNoBerry = false, tooltipBerry = false, no berry selected
        setupTooltipValues(true, false, false, false, false);
        checkLocalSettings(true, false, false);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        //  9. tooltipEnableMods = false, tooltipNoBerry = true , tooltipBerry = true , no berry selected
        setupTooltipValues(false, true, true, true, true);
        checkLocalSettings(false, true, true);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // 11. tooltipEnableMods = false, tooltipNoBerry = true , tooltipBerry = false, no berry selected
        setupTooltipValues(false, true, true, false, true);
        checkLocalSettings(false, true, false);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // 13. tooltipEnableMods = false, tooltipNoBerry = false, tooltipBerry = true , no berry selected
        setupTooltipValues(false, false, true, true, true);
        checkLocalSettings(false, false, true);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////
    
        ////////////////////////////////////////
        // 15. tooltipEnableMods = false, tooltipNoBerry = false, tooltipBerry = false, no berry selected
        setupTooltipValues(false, false, true, false, true);
        checkLocalSettings(false, false, false);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // // trigger else portion of handleTooltipSettings()
        // $('.tooltipsetting[data-key=tooltipEnableMods]').trigger('click');
        // check that the correct changes were applied
        // check that the rest stayed the same
        ////////////////////////////////////////
    });

    test("Test Tooltip controls on Public Fields page when a Berry is Selected", () => {
        ////////////////////////////////////////
        // setup
        /*
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
        const htmlpath = path.join(__dirname, './data/', 'publicFieldsForTooltipTestsBerrySelected.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = "https://pokefarm.com/fields/ECEInTheHole";
        document.documentElement.innerHTML = innerHTML;
        localStorage.setItem('QoLPublicFields',
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

        pfqol.pfqol($);

        $(window).trigger('load');

        // check that setup worked
        expectTooltipsExist(1, 1, 1, true, true, false, true, false);
        // check that the correct number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(0);
        // check that a berry is selected by showing that the following exist
        checkFieldmonClasses(NUM_CORMYR, NUM_NOT_HUNGRY, NUM_GO_AWAY);
        expect($('#field_berries').hasClass('selected')).toBe(true);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // get coverage for '.collapsible' click handler
        $('.collapsible').trigger('click');
        ////////////////////////////////////////

        ////////////////////////////////////////
        //  2. tooltipEnableMods = true , tooltipNoBerry = true , tooltipBerry = true ,    berry selected
        setupTooltipValues(true, true, false, true, false);
        checkLocalSettings(true, true, true);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(0);
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        //  4. tooltipEnableMods = true , tooltipNoBerry = true , tooltipBerry = false,    berry selected
        setupTooltipValues(true, true, false, false, false);
        checkLocalSettings(true, true, false);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        //  6. tooltipEnableMods = true , tooltipNoBerry = false, tooltipBerry = true ,    berry selected
        setupTooltipValues(true, false, false, true, false);
        checkLocalSettings(true, false, true);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(0);
        ////////////////////////////////////////

        ////////////////////////////////////////
        //  8. tooltipEnableMods = true , tooltipNoBerry = false, tooltipBerry = false,    berry selected
        setupTooltipValues(true, false, false, false, false);
        checkLocalSettings(true, false, false);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // 10. tooltipEnableMods = false, tooltipNoBerry = true , tooltipBerry = true ,    berry selected
        setupTooltipValues(true, true, false, true, false);
        setupTooltipValues(false, true, true, true, true);
        checkLocalSettings(false, true, true);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // 12. tooltipEnableMods = false, tooltipNoBerry = true , tooltipBerry = false,    berry selected
        setupTooltipValues(true, true, false, false, false);
        setupTooltipValues(false, true, true, false, true);
        checkLocalSettings(false, true, false);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // 14. tooltipEnableMods = false, tooltipNoBerry = false, tooltipBerry = true ,    berry selected
        setupTooltipValues(true, false, false, true, false);
        setupTooltipValues(false, false, true, true, true);
        checkLocalSettings(false, false, true);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////
    
        ////////////////////////////////////////
        // 16. tooltipEnableMods = false, tooltipNoBerry = false, tooltipBerry = false,    berry selected
        setupTooltipValues(true, false, false, false, false);
        setupTooltipValues(false, false, true, false, true);
        checkLocalSettings(false, false, false);
        // check that the right number of tooltips exist
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // // trigger else portion of handleTooltipSettings()
        // $('.tooltipsetting[data-key=tooltipEnableMods]').trigger('click');
        // check that the correct changes were applied
        // check that the rest stayed the same
        ////////////////////////////////////////
    });

    test("Test PFQoL controls on Public Fields page", () => {
        const htmlpath = path.join(__dirname, './data/', 'publicFields.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = "https://pokefarm.com/fields/ECEInTheHole";
        document.documentElement.innerHTML = innerHTML;

        localStorage.setItem('QoLPublicFields',
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
            '"tooltipBerry":true}');
        pfqol.pfqol($);

        $(window).trigger('load');
        $('.field', document).trigger('load');
        $('#addFieldTypeSearch').trigger('click');
        $('#removeFieldTypeSearch').trigger('click');
        $('#addFieldNatureSearch').trigger('click');
        $('#removeFieldNature').trigger('click');
        $('#addFieldEggGroupSearch').trigger('click');
        $('#removeFieldEggGroup').trigger('click');
        $('#addTextField').trigger('click');
        $('#removeTextField').trigger('click');
        // trigger '.qolsetting' change and input events
        $('[data-key=fieldShiny]').trigger('click');
        $('.collapsible').trigger('click');
        $('.tooltipsetting[data-key=tooltipEnableMods]').trigger('click');
        $('.tooltipsetting[data-key=tooltipNoBerry]').trigger('click');
        $('.tooltipsetting[data-key=tooltipBerry]').trigger('click');

        // trigger MutationObserver observe
        $('#field_field>.field>span').eq(-1).remove();
        $('#field_field>.field>div').eq(-1).remove();

        // trigger else portion of handleTooltipSettings()
        $('.tooltipsetting[data-key=tooltipEnableMods]').trigger('click');

        // trigger mutually exclusive settings
        $('[data-key=fieldByBerry]').trigger('click');

        // trigger '#field-berries' click
        $('[data-berry=aspear]').trigger('mousedown');

        // trigger if berry selected portion of handleTooltipSettings()
        $('[data-berry=aspear]').trigger('mousedown');

        // trigger field sorting
        $('[data-key=fieldByBerry]').trigger('click');
        $('[data-key=fieldByMiddle]').trigger('click');
        $('[data-key=fieldByGrid]').trigger('click');

        // trigger pokemonclickcount removal/adding
        $('[data-key=fieldClickCount]').trigger('click');
        $('#pokemonclickcount').remove();
        $('[data-key=fieldClickCount]').trigger('click');

        // trigger keydown handler
        let keyevent = $.Event('keydown');
        keyevent.keyCode = 78;
        $(window).trigger(keyevent);

        // trigger 'keyup.field_shortcuts' handlers
        const keys = [49, 97, 50, 98, 51, 99, 52, 100, 53, 101];
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            keyevent = $.Event('keyup.field_shortcuts');
            keyevent.keyCode = key;
            $(window).trigger(keyevent);
        }

        // get coverage for no genders branch in custom pokemon part of customSearch
        localStorage.setItem('QoLPublicFields',
            '{"fieldByBerry":false,' +
            '"fieldByMiddle":false,' +
            '"fieldByGrid":false,' +
            '"fieldClickCount":true,' +
            '"fieldCustom":"Mawile",' +
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
            '"fieldMale":false,' + // <-- false
            '"fieldFemale":false,' + // <-- false
            '"fieldNoGender":false,' + // <-- false
            '"fieldCustomItem":true,' +
            '"fieldCustomPokemon":true,' +
            '"fieldCustomEgg":true,' +
            '"fieldCustomPng":true,' +
            '"fieldItem":true,' +
            '"tooltipEnableMods":true,' +
            '"tooltipNoBerry":true,' +
            '"tooltipBerry":true}');
        pfqol.pfqol($);

        // use 'fieldShiny' click as a roundabout way to reload the settings
        $('[data-key=fieldShiny]').trigger('click');
    });

    test("Test loadSettings when local storage has less settings", () => {
        const htmlpath = path.join(__dirname, './data/', 'publicFields.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = "https://pokefarm.com/fields/ECEInTheHole";
        document.documentElement.innerHTML = innerHTML;

        localStorage.setItem('QoLPublicFields',
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
            '"tooltipNoBerry":true,'/*+
                             '"tooltipBerry":true}'*/);
        pfqol.pfqol($);

    });

    test("Test loadSettings when local storage has more settings", () => {
        const htmlpath = path.join(__dirname, './data/', 'publicFields.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = "https://pokefarm.com/fields/ECEInTheHole";
        document.documentElement.innerHTML = innerHTML;

        localStorage.setItem('QoLPublicFields',
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
            '"fdsa":true');
        pfqol.pfqol($);

    });
});
