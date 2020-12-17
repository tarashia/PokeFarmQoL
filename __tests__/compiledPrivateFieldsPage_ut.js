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

    // test("Test Search controls on Private Fields page", () => {
    //     const htmlpath = path.join(__dirname, './data/', 'privateFields.html');
    //     const html = fs.readFileSync(htmlpath, 'utf8', 'r');
    //     const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
    //     global.location.href = "https://pokefarm.com/fields";
    //     document.documentElement.innerHTML = innerHTML;
    //     localStorage.setItem('QoLPrivateFields',
    //         '{"fieldCustom":"Yamask,g/s/d/2.png/t=1589312209",' +
    //         '"fieldType":"8,13",' +
    //         '"fieldNature":"8",' +
    //         '"fieldEggGroup":"12,9",' +
    //         '"fieldNewPokemon":true,' +
    //         '"fieldShiny":true,' +
    //         '"fieldAlbino":true,' +
    //         '"fieldMelanistic":true,' +
    //         '"fieldPrehistoric":true,' +
    //         '"fieldDelta":true,' +
    //         '"fieldMega":true,' +
    //         '"fieldStarter":true,' +
    //         '"fieldCustomSprite":true,' +
    //         '"fieldMale":true,' +
    //         '"fieldFemale":true,' +
    //         '"fieldNoGender":true,' +
    //         '"fieldItem":true,' +
    //         '"fieldNFE":true,' +
    //         '"customItem":true,' +
    //         '"customEgg":true,' +
    //         '"customPokemon":true,' +
    //         '"customPng":true,' +
    //         '"releaseSelectAll":true,' +
    //         '"tooltipEnableMods":true,' +
    //         '"tooltipNoBerry":true,' +
    //         '"tooltipBerry":true}');

    //     pfqol.pfqol($);

    //     $(window).trigger('load');
    //     $('.field', document).trigger('load');
    //     $('#addPrivateFieldTypeSearch').trigger('click');
    //     $('#removePrivateFieldTypeSearch').trigger('click');
    //     $('#addPrivateFieldNatureSearch').trigger('click');
    //     $('#removePrivateFieldNature').trigger('click');
    //     $('#addPrivateFieldEggGroupSearch').trigger('click');
    //     $('#removePrivateFieldEggGroup').trigger('click');
    //     $('#addTextField').trigger('click');
    //     $('#removeTextField').trigger('click');
    //     // trigger '.qolsetting' change and input events
    //     $('[data-key=fieldShiny]').trigger('click');
    //     $('.collapsible').trigger('click');
    //     $('.tooltipsetting[data-key=tooltipEnableMods]').trigger('click');
    //     $('.tooltipsetting[data-key=tooltipNoBerry]').trigger('click');

    //     // trigger MutationObserver observe
    //     $('#field_field>.field>span').eq(-1).remove();
    //     $('#field_field>.field>div').eq(-1).remove();

    //     // trigger else portion of handleTooltipSettings()
    //     $('.tooltipsetting[data-key=tooltipEnableMods]').trigger('click');

    //     // get coverage for no genders branch in custom pokemon part of customSearch
    //     localStorage.setItem('QoLPrivateFields',
    //         '{"fieldCustom":"Yamask",' +
    //         '"fieldType":"8,13",' +
    //         '"fieldNature":"8",' +
    //         '"fieldEggGroup":"12,9",' +
    //         '"fieldNewPokemon":true,' +
    //         '"fieldShiny":true,' +
    //         '"fieldAlbino":true,' +
    //         '"fieldMelanistic":true,' +
    //         '"fieldPrehistoric":true,' +
    //         '"fieldDelta":true,' +
    //         '"fieldMega":true,' +
    //         '"fieldStarter":true,' +
    //         '"fieldCustomSprite":true,' +
    //         '"fieldMale":false,' + // <-- false
    //         '"fieldFemale":false,' + // <-- false
    //         '"fieldNoGender":false,' + // <-- false
    //         '"fieldItem":true,' +
    //         '"fieldNFE":true,' +
    //         '"customItem":true,' +
    //         '"customEgg":true,' +
    //         '"customPokemon":true,' +
    //         '"customPng":true,' +
    //         '"releaseSelectAll":true,' +
    //         '"tooltipEnableMods":true,' +
    //         '"tooltipNoBerry":true,' +
    //         '"tooltipBerry":true}');
    //     pfqol.pfqol($);

    //     // use 'fieldShiny' click as a roundabout way to reload the settings
    //     $('[data-key=fieldShiny]').trigger('click');

    //     // get coverage for findNFE = false branch in customSearch
    //     localStorage.setItem('QoLPrivateFields',
    //         '{"fieldCustom":"Yamask,g/s/d/2.png/t=1589312209",' +
    //         '"fieldType":"8,13",' +
    //         '"fieldNature":"8",' +
    //         '"fieldEggGroup":"12,9",' +
    //         '"fieldNewPokemon":true,' +
    //         '"fieldShiny":true,' +
    //         '"fieldAlbino":true,' +
    //         '"fieldMelanistic":true,' +
    //         '"fieldPrehistoric":true,' +
    //         '"fieldDelta":true,' +
    //         '"fieldMega":true,' +
    //         '"fieldStarter":true,' +
    //         '"fieldCustomSprite":true,' +
    //         '"fieldMale":true,' +
    //         '"fieldFemale":true,' +
    //         '"fieldNoGender":true,' +
    //         '"fieldItem":true,' +
    //         '"fieldNFE":false,' +// <-- false
    //         '"customItem":true,' +
    //         '"customEgg":true,' +
    //         '"customPokemon":true,' +
    //         '"customPng":true,' +
    //         '"releaseSelectAll":true,' +
    //         '"tooltipEnableMods":true,' +
    //         '"tooltipNoBerry":true,' +
    //         '"tooltipBerry":true}');
    //     $('[data-key="fieldNFE"]').trigger('click');
    // });

    // test("Test Release controls on Private Fields Release dialog", () => {
    //     ////////////////////////////////////////
    //     // setup
    //     /* HTML is setup to have:
    //      * - 2 mons that like Any berry
    //      * - 3 mons that like Sour berry
    //      * - 4 mons that like Spicy berry
    //      * - 5 mons that like Dry berry
    //      * - 6 mons that like Sweet berry
    //      * - 9 mons that like Bitter berry
    //      * - 29 pokemon in total
    //      */
    //     const NUM_ANY = 2;
    //     const NUM_SOUR = 3;
    //     const NUM_SPICY = 4;
    //     const NUM_DRY = 5;
    //     const NUM_SWEET = 6;
    //     const NUM_BITTER = 9;
    //     const NUM_POKEMON = 29;
    //     const htmlpath = path.join(__dirname, './data/', 'privateFieldsWithReleaseDialog.html');
    //     const html = fs.readFileSync(htmlpath, 'utf8', 'r');
    //     const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
    //     global.location.href = "https://pokefarm.com/fields";
    //     document.documentElement.innerHTML = innerHTML;
    //     localStorage.setItem('QoLPrivateFields',
    //         '{"fieldCustom":"Yamask,g/s/d/2.png/t=1589312209",' +
    //         '"fieldType":"8,13",' +
    //         '"fieldNature":"8",' +
    //         '"fieldEggGroup":"12,9",' +
    //         '"fieldNewPokemon":true,' +
    //         '"fieldShiny":true,' +
    //         '"fieldAlbino":true,' +
    //         '"fieldMelanistic":true,' +
    //         '"fieldPrehistoric":true,' +
    //         '"fieldDelta":true,' +
    //         '"fieldMega":true,' +
    //         '"fieldStarter":true,' +
    //         '"fieldCustomSprite":true,' +
    //         '"fieldMale":true,' +
    //         '"fieldFemale":true,' +
    //         '"fieldNoGender":true,' +
    //         '"fieldItem":true,' +
    //         '"fieldNFE":true,' +
    //         '"customItem":true,' +
    //         '"customEgg":true,' +
    //         '"customPokemon":true,' +
    //         '"customPng":true,' +
    //         '"releaseSelectAll":true,' +
    //         '"tooltipEnableMods":true,' +
    //         '"tooltipNoBerry":true,' +
    //         '"tooltipBerry":true}');

    //     pfqol.pfqol($);
    //     ////////////////////////////////////////

    //     ////////////////////////////////////////
    //     // check that HTML was setup correctly
    //     expect($('#selectallfieldcheckbox').length).toBe(1);
    //     expect($('selectallfieldanycheckbox').length).toBe(1);
    //     expect($('selectallfieldsourcheckbox').length).toBe(1);
    //     expect($('selectallfieldspicycheckbox').length).toBe(1);
    //     expect($('selectallfielddrycheckbox').length).toBe(1);
    //     expect($('selectallfieldsweetcheckbox').length).toBe(1);
    //     expect($('selectallfieldbittercheckbox').length).toBe(1);
    //     ////////////////////////////////////////

    //     ////////////////////////////////////////
    //     // trigger dialog buttons
    //     $('*[data-menu="release"]').trigger('click');
    //     ////////////////////////////////////////

    //     ////////////////////////////////////////
    //     // check that select all checkbox works
    //     $('#selectallfieldcheckbox').trigger('click');
    //     expect($('#massreleaselist>ul>li>label>input').length).toBe(NUM_POKEMON);
    //     $('#selectallfieldcheckbox').trigger('click');
    //     expect($('#massreleaselist>ul>li>label>input').length).toBe(0);
    //     ////////////////////////////////////////

    //     ////////////////////////////////////////
    //     // check that select any checkbox works
    //     $('#selectallfieldanycheckbox').trigger('click');
    //     expect($('#massreleaselist>ul>li>label>input').length).toBe(NUM_ANY);
    //     $('#selectallfieldanycheckbox').trigger('click');
    //     expect($('#massreleaselist>ul>li>label>input').length).toBe(0);
    //     ////////////////////////////////////////

    //     ////////////////////////////////////////
    //     // check that select sour checkbox works
    //     $('#selectallfieldsourcheckbox').trigger('click');
    //     expect($('#massreleaselist>ul>li>label>input').length).toBe(NUM_SOUR);
    //     $('#selectallfieldsourcheckbox').trigger('click');
    //     expect($('#massreleaselist>ul>li>label>input').length).toBe(0);
    //     ////////////////////////////////////////

    //     ////////////////////////////////////////
    //     // check that select spicy checkbox works
    //     $('#selectallfieldspicycheckbox').trigger('click');
    //     expect($('#massreleaselist>ul>li>label>input').length).toBe(NUM_SPICY);
    //     $('#selectallfieldspicycheckbox').trigger('click');
    //     expect($('#massreleaselist>ul>li>label>input').length).toBe(0);
    //     ////////////////////////////////////////

    //     ////////////////////////////////////////
    //     // check that select dry checkbox works
    //     $('#selectallfielddrycheckbox').trigger('click');
    //     expect($('#massreleaselist>ul>li>label>input').length).toBe(NUM_DRY);
    //     $('#selectallfielddrycheckbox').trigger('click');
    //     expect($('#massreleaselist>ul>li>label>input').length).toBe(0);
    //     ////////////////////////////////////////

    //     ////////////////////////////////////////
    //     // check that select sweet checkbox works
    //     $('#selectallfieldsweetcheckbox').trigger('click');
    //     expect($('#massreleaselist>ul>li>label>input').length).toBe(NUM_SWEET);
    //     $('#selectallfieldsweetcheckbox').trigger('click');
    //     expect($('#massreleaselist>ul>li>label>input').length).toBe(0);
    //     ////////////////////////////////////////

    //     ////////////////////////////////////////
    //     // check that select bitter checkbox works
    //     $('#selectallfieldbittercheckbox').trigger('click');
    //     expect($('#massreleaselist>ul>li>label>input').length).toBe(NUM_BITTER);
    //     $('#selectallfieldbittercheckbox').trigger('click');
    //     expect($('#massreleaselist>ul>li>label>input').length).toBe(0);
    //     ////////////////////////////////////////

    // });

    // test("Test Move controls on Private Fields Bulk Move dialog", () => {
    //     const htmlpath = path.join(__dirname, './data/', 'privateFieldsWithBulkMoveDialog.html');
    //     const html = fs.readFileSync(htmlpath, 'utf8', 'r');
    //     const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
    //     global.location.href = "https://pokefarm.com/fields";
    //     document.documentElement.innerHTML = innerHTML;
    //     localStorage.setItem('QoLPrivateFields',
    //         '{"fieldCustom":"Yamask,g/s/d/2.png/t=1589312209",' +
    //         '"fieldType":"8,13",' +
    //         '"fieldNature":"8",' +
    //         '"fieldEggGroup":"12,9",' +
    //         '"fieldNewPokemon":true,' +
    //         '"fieldShiny":true,' +
    //         '"fieldAlbino":true,' +
    //         '"fieldMelanistic":true,' +
    //         '"fieldPrehistoric":true,' +
    //         '"fieldDelta":true,' +
    //         '"fieldMega":true,' +
    //         '"fieldStarter":true,' +
    //         '"fieldCustomSprite":true,' +
    //         '"fieldMale":true,' +
    //         '"fieldFemale":true,' +
    //         '"fieldNoGender":true,' +
    //         '"fieldItem":true,' +
    //         '"fieldNFE":true,' +
    //         '"customItem":true,' +
    //         '"customEgg":true,' +
    //         '"customPokemon":true,' +
    //         '"customPng":true,' +
    //         '"releaseSelectAll":true,' +
    //         '"tooltipEnableMods":true,' +
    //         '"tooltipNoBerry":true,' +
    //         '"tooltipBerry":true}');

    //     pfqol.pfqol($);

    //     // check that HTML was setup correctly
    //     expect($('#movefieldselectallcheckbox').length).toBe(1);
    //     expect($('movefieldselectanycheckbox').length).toBe(1);
    //     expect($('movefieldselectsourcheckbox').length).toBe(1);
    //     expect($('movefieldselectspicycheckbox').length).toBe(1);
    //     expect($('movefieldselectdrycheckbox').length).toBe(1);
    //     expect($('movefieldselectsweetcheckbox').length).toBe(1);
    //     expect($('movefieldselectbittercheckbox').length).toBe(1);

    //     // trigger dialog buttons
    //     $('*[data-menu="bulkmove"]').trigger('click');
    //     $('#movefieldselectallcheckbox').trigger('click');
    //     $('#movefieldselectanycheckbox').trigger('click');
    //     $('#movefieldselectsourcheckbox').trigger('click');
    //     $('#movefieldselectspicycheckbox').trigger('click');
    //     $('#movefieldselectdrycheckbox').trigger('click');
    //     $('#movefieldselectsweetcheckbox').trigger('click');
    //     $('#movefieldselectbittercheckbox').trigger('click');
    // });
});