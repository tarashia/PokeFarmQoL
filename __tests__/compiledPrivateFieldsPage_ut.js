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
    test("Test PFQoL controls on Private Fields page", () => {
        const htmlpath = path.join(__dirname, './data/', 'privateFields.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = "https://pokefarm.com/fields";
        document.documentElement.innerHTML = innerHTML;
        localStorage.setItem('QoLPrivateFields',
                            '{"fieldCustom":"Yamask,g/s/d/2.png/t=1589312209",'+
                            '"fieldType":"8,13",'+
                            '"fieldNature":"8",'+
                            '"fieldEggGroup":"12,9",'+
                            '"fieldNewPokemon":true,'+
                            '"fieldShiny":true,'+
                            '"fieldAlbino":true,'+
                            '"fieldMelanistic":true,'+
                            '"fieldPrehistoric":true,'+
                            '"fieldDelta":true,'+
                            '"fieldMega":true,'+
                            '"fieldStarter":true,'+
                            '"fieldCustomSprite":true,'+
                            '"fieldMale":true,'+
                            '"fieldFemale":true,'+
                            '"fieldNoGender":true,'+
                            '"fieldItem":true,'+
                            '"fieldNFE":true,'+
                            '"customItem":true,'+
                            '"customEgg":true,'+
                            '"customPokemon":true,'+
                            '"customPng":true,'+
                            '"releaseSelectAll":true,'+
                            '"tooltipEnableMods":true,'+
                            '"tooltipNoBerry":true,'+
                            '"tooltipBerry":true}');

        pfqol.pfqol($);

        $(window).trigger('load');
        $('.field', document).trigger('load');
        $('#addPrivateFieldTypeSearch').trigger('click');
        $('#removePrivateFieldTypeSearch').trigger('click');
        $('#addPrivateFieldNatureSearch').trigger('click');
        $('#removePrivateFieldNature').trigger('click');
        $('#addPrivateFieldEggGroupSearch').trigger('click');
        $('#removePrivateFieldEggGroup').trigger('click');
        $('#addTextField').trigger('click');
        $('#removeTextField').trigger('click');
        // trigger '.qolsetting' change and input events
        $('[data-key=fieldShiny]').trigger('click');
        $('.collapsible').trigger('click');
        $('.tooltipsetting[data-key=tooltipEnableMods]').trigger('click');
        $('.tooltipsetting[data-key=tooltipNoBerry]').trigger('click');

        // trigger MutationObserver observe
        $('#field_field>.field>span').eq(-1).remove();
        $('#field_field>.field>div').eq(-1).remove();

        // trigger else portion of handleTooltipSettings()
        $('.tooltipsetting[data-key=tooltipEnableMods]').trigger('click');

        // get coverage for no genders branch in custom pokemon part of customSearch
        localStorage.setItem('QoLPrivateFields',
                            '{"fieldCustom":"Yamask",'+
                            '"fieldType":"8,13",'+
                            '"fieldNature":"8",'+
                            '"fieldEggGroup":"12,9",'+
                            '"fieldNewPokemon":true,'+
                            '"fieldShiny":true,'+
                            '"fieldAlbino":true,'+
                            '"fieldMelanistic":true,'+
                            '"fieldPrehistoric":true,'+
                            '"fieldDelta":true,'+
                            '"fieldMega":true,'+
                            '"fieldStarter":true,'+
                            '"fieldCustomSprite":true,'+
                            '"fieldMale":false,'+ // <-- false
                            '"fieldFemale":false,'+ // <-- false
                            '"fieldNoGender":false,'+ // <-- false
                            '"fieldItem":true,'+
                            '"fieldNFE":true,'+
                            '"customItem":true,'+
                            '"customEgg":true,'+
                            '"customPokemon":true,'+
                            '"customPng":true,'+
                            '"releaseSelectAll":true,'+
                            '"tooltipEnableMods":true,'+
                            '"tooltipNoBerry":true,'+
                            '"tooltipBerry":true}');
        pfqol.pfqol($);

        // use 'fieldShiny' click as a roundabout way to reload the settings
        $('[data-key=fieldShiny]').trigger('click');

        // get coverage for findNFE = false branch in customSearch
        localStorage.setItem('QoLPrivateFields',
                            '{"fieldCustom":"Yamask,g/s/d/2.png/t=1589312209",'+
                            '"fieldType":"8,13",'+
                            '"fieldNature":"8",'+
                            '"fieldEggGroup":"12,9",'+
                            '"fieldNewPokemon":true,'+
                            '"fieldShiny":true,'+
                            '"fieldAlbino":true,'+
                            '"fieldMelanistic":true,'+
                            '"fieldPrehistoric":true,'+
                            '"fieldDelta":true,'+
                            '"fieldMega":true,'+
                            '"fieldStarter":true,'+
                            '"fieldCustomSprite":true,'+
                            '"fieldMale":true,'+
                            '"fieldFemale":true,'+
                            '"fieldNoGender":true,'+
                            '"fieldItem":true,'+
                            '"fieldNFE":false,'+// <-- false
                            '"customItem":true,'+
                            '"customEgg":true,'+
                            '"customPokemon":true,'+
                            '"customPng":true,'+
                            '"releaseSelectAll":true,'+
                            '"tooltipEnableMods":true,'+
                            '"tooltipNoBerry":true,'+
                            '"tooltipBerry":true}');
        $('[data-key="fieldNFE"]').trigger('click');
    });
    test("Test PFQoL controls on Private Fields Release dialog", () => {
        const htmlpath = path.join(__dirname, './data/', 'privateFieldsWithReleaseDialog.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = "https://pokefarm.com/fields";
        document.documentElement.innerHTML = innerHTML;
        localStorage.setItem('QoLPrivateFields',
                            '{"fieldCustom":"Yamask,g/s/d/2.png/t=1589312209",'+
                            '"fieldType":"8,13",'+
                            '"fieldNature":"8",'+
                            '"fieldEggGroup":"12,9",'+
                            '"fieldNewPokemon":true,'+
                            '"fieldShiny":true,'+
                            '"fieldAlbino":true,'+
                            '"fieldMelanistic":true,'+
                            '"fieldPrehistoric":true,'+
                            '"fieldDelta":true,'+
                            '"fieldMega":true,'+
                            '"fieldStarter":true,'+
                            '"fieldCustomSprite":true,'+
                            '"fieldMale":true,'+
                            '"fieldFemale":true,'+
                            '"fieldNoGender":true,'+
                            '"fieldItem":true,'+
                            '"fieldNFE":true,'+
                            '"customItem":true,'+
                            '"customEgg":true,'+
                            '"customPokemon":true,'+
                            '"customPng":true,'+
                            '"releaseSelectAll":true,'+
                            '"tooltipEnableMods":true,'+
                            '"tooltipNoBerry":true,'+
                            '"tooltipBerry":true}');

        pfqol.pfqol($);

        // trigger dialog buttons
        $('*[data-menu="release"]').trigger('click');
        $('#selectallfieldcheckbox').trigger('click');
        $('#selectallfieldanycheckbox').trigger('click');
        $('#selectallfieldsourcheckbox').trigger('click');
        $('#selectallfieldspicycheckbox').trigger('click');
        $('#selectallfielddrycheckbox').trigger('click');
        $('#selectallfieldsweetcheckbox').trigger('click');
        $('#selectallfieldbittercheckbox').trigger('click');
    });
    test("Test PFQoL controls on Private Fields Bulk Move dialog", () => {
        const htmlpath = path.join(__dirname, './data/', 'privateFieldsWithBulkMoveDialog.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = "https://pokefarm.com/fields";
        document.documentElement.innerHTML = innerHTML;
        localStorage.setItem('QoLPrivateFields',
                            '{"fieldCustom":"Yamask,g/s/d/2.png/t=1589312209",'+
                            '"fieldType":"8,13",'+
                            '"fieldNature":"8",'+
                            '"fieldEggGroup":"12,9",'+
                            '"fieldNewPokemon":true,'+
                            '"fieldShiny":true,'+
                            '"fieldAlbino":true,'+
                            '"fieldMelanistic":true,'+
                            '"fieldPrehistoric":true,'+
                            '"fieldDelta":true,'+
                            '"fieldMega":true,'+
                            '"fieldStarter":true,'+
                            '"fieldCustomSprite":true,'+
                            '"fieldMale":true,'+
                            '"fieldFemale":true,'+
                            '"fieldNoGender":true,'+
                            '"fieldItem":true,'+
                            '"fieldNFE":true,'+
                            '"customItem":true,'+
                            '"customEgg":true,'+
                            '"customPokemon":true,'+
                            '"customPng":true,'+
                            '"releaseSelectAll":true,'+
                            '"tooltipEnableMods":true,'+
                            '"tooltipNoBerry":true,'+
                            '"tooltipBerry":true}');

        pfqol.pfqol($);

        // trigger dialog buttons
        $('*[data-menu="bulkmove"]').trigger('click');
        $('#movefieldselectallcheckbox').trigger('click');
        $('#movefieldselectanycheckbox').trigger('click');
        $('#movefieldselectsourcheckbox').trigger('click');
        $('#movefieldselectspicycheckbox').trigger('click');
        $('#movefieldselectdrycheckbox').trigger('click');
        $('#movefieldselectsweetcheckbox').trigger('click');
        $('#movefieldselectbittercheckbox').trigger('click');
    });
});