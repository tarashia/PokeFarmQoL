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

describe("Test Private Fields Page", () => {
    test("Test Tooltip controls on Private Fields page", () => {
        ////////////////////////////////////////
        // setup
        const NUM_POKEMON = 29;
        const htmlpath = path.join(__dirname, './data/', 'privateFields.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = "https://pokefarm.com/fields";
        document.documentElement.innerHTML = innerHTML;
        localStorage.setItem('QoLPrivateFields',
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

        pfqol.pfqol($);

        $(window).trigger('load');

        // check that setup worked
        expect($('[data-key=tooltipEnableMods]').length).toBe(1);
        expect($('[data-key=tooltipEnableMods]').prop('checked')).toBe(true);
        expect($('[data-key=tooltipNoBerry]').length).toBe(1);
        expect($('[data-key=tooltipNoBerry]').prop('checked')).toBe(true);
        expect($('[data-key=tooltipNoBerry]').prop('disabled')).toBe(false);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // check "Enable QoL Tooltip Settings" button
        // click button to disable tooltip modifications
        $('[data-key=tooltipEnableMods]').trigger('click');
        expect($('[data-key=tooltipEnableMods]').prop('checked')).toBe(false);
        expect($('[data-key=tooltipNoBerry]').prop('disabled')).toBe(true);
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        expect(localStorage.getItem('QoLPrivateFields'))
            .toEqual(expect.stringContaining('"tooltipEnableMods":false'));
        expect(localStorage.getItem('QoLPrivateFields'))
            .toEqual(expect.stringContaining('"tooltipNoBerry":true'));

        // click again to enable tooltip modifications
        $('[data-key=tooltipEnableMods]').trigger('click');
        expect($('[data-key=tooltipEnableMods]').prop('checked')).toBe(true);
        expect($('[data-key=tooltipNoBerry]').prop('disabled')).toBe(false);
        expect($('.fieldmon[data-tooltip]').length).toBe(0);
        expect(localStorage.getItem('QoLPrivateFields'))
            .toEqual(expect.stringContaining('"tooltipEnableMods":true'));
        expect(localStorage.getItem('QoLPrivateFields'))
            .toEqual(expect.stringContaining('"tooltipNoBerry":true'));
        ////////////////////////////////////////

        ////////////////////////////////////////
        // check "Hide tooltip" button
        // click button to disable tooltip hiding
        $('[data-key=tooltipNoBerry]').trigger('click');
        expect($('[data-key=tooltipNoBerry]').prop('disabled')).toBe(false);
        expect($('[data-key=tooltipNoBerry]').prop('checked')).toBe(false);
        expect($('.fieldmon[data-tooltip]').length).toBe(NUM_POKEMON);
        expect(localStorage.getItem('QoLPrivateFields'))
            .toEqual(expect.stringContaining('"tooltipNoBerry":false'));

        // click again to enable tooltip hiding
        $('[data-key=tooltipNoBerry]').trigger('click');
        expect($('[data-key=tooltipNoBerry]').prop('disabled')).toBe(false);
        expect($('[data-key=tooltipNoBerry]').prop('checked')).toBe(true);
        expect($('.fieldmon[data-tooltip]').length).toBe(0);
        expect(localStorage.getItem('QoLPrivateFields'))
            .toEqual(expect.stringContaining('"tooltipNoBerry":true'));
        ////////////////////////////////////////
    });

    test("Test Search controls on Private Fields page", () => {
        ////////////////////////////////////////
        // setup
        /* HTML is setup to have the following:
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

        const htmlpath = path.join(__dirname, './data/', 'privateFieldsForSearchTests.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = "https://pokefarm.com/fields";
        document.documentElement.innerHTML = innerHTML;
        localStorage.setItem('QoLPrivateFields',
            '{"fieldCustom":"Yamask,g/s/d/2.png/t=1589312209",' +
            '"fieldType":"8,13,0",' +
            '"fieldNature":"8",' +
            '"fieldEggGroup":"12,9,1,2",' +
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

        pfqol.pfqol($);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // check that HTML was setup correctly
        expect($('[data-key=fieldShiny]').length).toBe(1);
        expect($('[data-key=fieldAlbino]').length).toBe(1);
        expect($('[data-key=fieldMelanistic]').length).toBe(1);
        expect($('[data-key=fieldPrehistoric]').length).toBe(1);
        expect($('[data-key=fieldDelta]').length).toBe(1);
        expect($('[data-key=fieldMega]').length).toBe(1);
        expect($('[data-key=fieldStarter]').length).toBe(1);
        expect($('[data-key=fieldCustomSprite]').length).toBe(1);
        expect($('[data-key=fieldItem]').length).toBe(1);
        expect($('[data-key=fieldNFE]').length).toBe(1);

        expect($('input').filter('#addPrivateFieldTypeSearch').length).toBe(1);
        expect($('[data-key=fieldType][array-name=typeArray]').length).toBe(3);
        expect($('input').filter('#removePrivateFieldTypeSearch').length).toBe(3);
        expect($('input').filter('#addPrivateFieldNatureSearch').length).toBe(1);
        expect($('[data-key=fieldNature][array-name=natureArray]').length).toBe(1);
        expect($('input').filter('#removePrivateFieldNature').length).toBe(1);
        expect($('input').filter('#addPrivateFieldEggGroupSearch').length).toBe(1);
        expect($('[data-key=fieldEggGroup][array-name=eggGroupArray]').length).toBe(4);
        expect($('input').filter('#removePrivateFieldEggGroup').length).toBe(4);

        expect($('[data-key=customEgg]').length).toBe(1);
        expect($('[data-key=customPokemon]').length).toBe(1);
        expect($('[data-key=customPng]').length).toBe(1);

        expect($('[data-key=fieldMale]').length).toBe(1);
        expect($('[data-key=fieldFemale]').length).toBe(1);
        expect($('[data-key=fieldNoGender]').length).toBe(1);

        expect($('input').filter('#addTextField').length).toBe(1);
        expect($('[data-key=fieldCustom][array-name=customArray]').length).toBe(2);
        expect($('input').filter('#removeTextField').length).toBe(2);
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // Execute load handlers
        $(window).trigger('load');
        $('.field', document).trigger('load');
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // $('[data-key=fieldShiny]').trigger('click');
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // $('[data-key=fieldAlbino]').trigger('click');
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // $('[data-key=fieldMelanistic]').trigger('click');
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // $('[data-key=fieldPrehistoric]').trigger('click');
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // $('[data-key=fieldDelta]').trigger('click');
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // $('[data-key=fieldMega]').trigger('click');
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // $('[data-key=fieldStarter]').trigger('click');
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // $('[data-key=fieldCustomSprite]').trigger('click');
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // $('[data-key=fieldItem]').trigger('click');
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // $('[data-key=fieldNFE]').trigger('click');
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // $('#addPrivateFieldTypeSearch').trigger('click');
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // $('[data-key=fieldType]').trigger('click');
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // $('#removePrivateFieldTypeSearch').trigger('click');
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // $('#addPrivateFieldNatureSearch').trigger('click');
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // $('#removePrivateFieldNature').trigger('click');
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // $('#addPrivateFieldEggGroupSearch').trigger('click');
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // $('#removePrivateFieldEggGroup').trigger('click');
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // $('#addTextField').trigger('click');
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // $('#removeTextField').trigger('click');
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // $('.collapsible').trigger('click');
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // $('.tooltipsetting[data-key=tooltipEnableMods]').trigger('click');
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // $('.tooltipsetting[data-key=tooltipNoBerry]').trigger('click');
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // // trigger MutationObserver observe
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // $('#field_field>.field>span').eq(-1).remove();
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // $('#field_field>.field>div').eq(-1).remove();
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // // trigger else portion of handleTooltipSettings()
        // $('.tooltipsetting[data-key=tooltipEnableMods]').trigger('click');
        // check that the correct elements were changed
        // check that the rest stayed the same
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // // get coverage for no genders branch in custom pokemon part of customSearch
        // localStorage.setItem('QoLPrivateFields',
        //     '{"fieldCustom":"Yamask",' +
        //     '"fieldType":"8,13",' +
        //     '"fieldNature":"8",' +
        //     '"fieldEggGroup":"12,9",' +
        //     '"fieldNewPokemon":true,' +
        //     '"fieldShiny":true,' +
        //     '"fieldAlbino":true,' +
        //     '"fieldMelanistic":true,' +
        //     '"fieldPrehistoric":true,' +
        //     '"fieldDelta":true,' +
        //     '"fieldMega":true,' +
        //     '"fieldStarter":true,' +
        //     '"fieldCustomSprite":true,' +
        //     '"fieldMale":false,' + // <-- false
        //     '"fieldFemale":false,' + // <-- false
        //     '"fieldNoGender":false,' + // <-- false
        //     '"fieldItem":true,' +
        //     '"fieldNFE":true,' +
        //     '"customItem":true,' +
        //     '"customEgg":true,' +
        //     '"customPokemon":true,' +
        //     '"customPng":true,' +
        //     '"releaseSelectAll":true,' +
        //     '"tooltipEnableMods":true,' +
        //     '"tooltipNoBerry":true,' +
        //     '"tooltipBerry":true}');
        // pfqol.pfqol($);

        // // use 'fieldShiny' click as a roundabout way to reload the settings
        // $('[data-key=fieldShiny]').trigger('click');

        // // get coverage for findNFE = false branch in customSearch
        // localStorage.setItem('QoLPrivateFields',
        //     '{"fieldCustom":"Yamask,g/s/d/2.png/t=1589312209",' +
        //     '"fieldType":"8,13",' +
        //     '"fieldNature":"8",' +
        //     '"fieldEggGroup":"12,9",' +
        //     '"fieldNewPokemon":true,' +
        //     '"fieldShiny":true,' +
        //     '"fieldAlbino":true,' +
        //     '"fieldMelanistic":true,' +
        //     '"fieldPrehistoric":true,' +
        //     '"fieldDelta":true,' +
        //     '"fieldMega":true,' +
        //     '"fieldStarter":true,' +
        //     '"fieldCustomSprite":true,' +
        //     '"fieldMale":true,' +
        //     '"fieldFemale":true,' +
        //     '"fieldNoGender":true,' +
        //     '"fieldItem":true,' +
        //     '"fieldNFE":false,' +// <-- false
        //     '"customItem":true,' +
        //     '"customEgg":true,' +
        //     '"customPokemon":true,' +
        //     '"customPng":true,' +
        //     '"releaseSelectAll":true,' +
        //     '"tooltipEnableMods":true,' +
        //     '"tooltipNoBerry":true,' +
        //     '"tooltipBerry":true}');
        // $('[data-key="fieldNFE"]').trigger('click');
    });

    test("Test Release controls on Private Fields Release dialog", () => {
        ////////////////////////////////////////
        // setup
        /* HTML is setup to have:
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
        const htmlpath = path.join(__dirname, './data/', 'privateFieldsWithReleaseDialog.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = "https://pokefarm.com/fields";
        document.documentElement.innerHTML = innerHTML;
        localStorage.setItem('QoLPrivateFields',
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

        pfqol.pfqol($);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // trigger dialog buttons
        $('*[data-menu="release"]').eq(0).trigger('click');
        ////////////////////////////////////////

        ////////////////////////////////////////
        // check that HTML was setup correctly
        // TODO: check why 2 is correct for this and check if the webpage works like this
        expect($('input').filter('#selectallfieldcheckbox').length).toBe(2);
        expect($('input').filter('#selectallfieldanycheckbox').length).toBe(2);
        expect($('input').filter('#selectallfieldsourcheckbox').length).toBe(2);
        expect($('input').filter('#selectallfieldspicycheckbox').length).toBe(2);
        expect($('input').filter('#selectallfielddrycheckbox').length).toBe(2);
        expect($('input').filter('#selectallfieldsweetcheckbox').length).toBe(2);
        expect($('input').filter('#selectallfieldbittercheckbox').length).toBe(2);
        // expected number from HTML
        expect($('#massreleaselist>ul>li>label>input').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // check that select all checkbox works
        $('#selectallfieldcheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(NUM_POKEMON);
        $('#selectallfieldcheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // check that select any checkbox works
        $('#selectallfieldanycheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(NUM_ANY);
        $('#selectallfieldanycheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // check that select sour checkbox works
        $('#selectallfieldsourcheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(NUM_SOUR);
        $('#selectallfieldsourcheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // check that select spicy checkbox works
        $('#selectallfieldspicycheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(NUM_SPICY);
        $('#selectallfieldspicycheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // check that select dry checkbox works
        $('#selectallfielddrycheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(NUM_DRY);
        $('#selectallfielddrycheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // check that select sweet checkbox works
        $('#selectallfieldsweetcheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(NUM_SWEET);
        $('#selectallfieldsweetcheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // check that select bitter checkbox works
        $('#selectallfieldbittercheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(NUM_BITTER);
        $('#selectallfieldbittercheckbox').trigger('click');
        expect($('#massreleaselist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

    });

    test("Test Move controls on Private Fields Bulk Move dialog", () => {
        ////////////////////////////////////////
        // setup
        /* HTML is setup to have:
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
        const htmlpath = path.join(__dirname, './data/', 'privateFieldsWithBulkMoveDialog.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = "https://pokefarm.com/fields";
        document.documentElement.innerHTML = innerHTML;
        localStorage.setItem('QoLPrivateFields',
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

        pfqol.pfqol($);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // trigger dialog buttons
        $('*[data-menu="bulkmove"]').eq(0).trigger('click');
        ////////////////////////////////////////

        ////////////////////////////////////////
        // check that HTML was setup correctly
        expect($('input').filter('#movefieldselectallcheckbox').length).toBe(2);
        expect($('input').filter('#movefieldselectanycheckbox').length).toBe(2);
        expect($('input').filter('#movefieldselectsourcheckbox').length).toBe(2);
        expect($('input').filter('#movefieldselectspicycheckbox').length).toBe(2);
        expect($('input').filter('#movefieldselectdrycheckbox').length).toBe(2);
        expect($('input').filter('#movefieldselectsweetcheckbox').length).toBe(2);
        expect($('input').filter('#movefieldselectbittercheckbox').length).toBe(2);
        // expected number from HTML
        expect($('#massmovelist>ul>li>label>input').length).toBe(NUM_POKEMON);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // check that select all checkbox works
        $('#movefieldselectallcheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(NUM_POKEMON);
        $('#movefieldselectallcheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // check that select any checkbox works
        $('#movefieldselectanycheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(NUM_ANY);
        $('#movefieldselectanycheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // check that select sour checkbox works
        $('#movefieldselectsourcheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(NUM_SOUR);
        $('#movefieldselectsourcheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // check that select spicy checkbox works
        $('#movefieldselectspicycheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(NUM_SPICY);
        $('#movefieldselectspicycheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // check that select dry checkbox works
        $('#movefieldselectdrycheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(NUM_DRY);
        $('#movefieldselectdrycheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // check that select sweet checkbox works
        $('#movefieldselectsweetcheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(NUM_SWEET);
        $('#movefieldselectsweetcheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // check that select bitter checkbox works
        $('#movefieldselectbittercheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(NUM_BITTER);
        $('#movefieldselectbittercheckbox').trigger('click');
        expect($('#massmovelist>ul>li>label>input:checked').length).toBe(0);
        ////////////////////////////////////////
    });
});
