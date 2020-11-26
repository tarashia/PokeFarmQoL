const jQuery = require('../__mocks__/jquery_files').jQuery;
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

describe("Test Public Fields Page", () => {
    test("Test PFQoL controls on Public Fields page", () => {
        const htmlpath = path.join(__dirname, './data/', 'publicFields.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = "https://pokefarm.com/fields/ECEInTheHole";
        document.documentElement.innerHTML = innerHTML;

        localStorage.setItem('QoLPublicFields', 
                             '{"fieldByBerry":false,'+
                             '"fieldByMiddle":false,'+
                             '"fieldByGrid":false,'+
                             '"fieldClickCount":true,'+
                             '"fieldCustom":"Mawile,c/3/6.png/t=1507192849",'+
                             '"fieldType":"1, 2",'+
                             '"fieldNature":"1,2",'+
                             '"fieldEggGroup":"1,2",'+
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
                             '"fieldCustomItem":true,'+
                             '"fieldCustomPokemon":true,'+
                             '"fieldCustomEgg":true,'+
                             '"fieldCustomPng":true,'+
                             '"fieldItem":true,'+
                             '"tooltipEnableMods":true,'+
                             '"tooltipNoBerry":true,'+
                             '"tooltipBerry":true}');
        pfqol.pfqol(jQuery);

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
        let keyevent = jQuery.Event('keydown');
        keyevent.keyCode = 78;
        $(window).trigger(keyevent);

        // trigger 'keyup.field_shortcuts' handlers
        const keys = [49, 97, 50, 98, 51, 99, 52, 100, 53, 101];
        for(let i = 0; i < keys.length; i++) {
            let key = keys[i];
            keyevent = jQuery.Event('keyup.field_shortcuts');
            keyevent.keyCode = key;
            $(window).trigger(keyevent);
        }

        // get coverage for no genders branch in custom pokemon part of customSearch
        localStorage.setItem('QoLPublicFields', 
                             '{"fieldByBerry":false,'+
                             '"fieldByMiddle":false,'+
                             '"fieldByGrid":false,'+
                             '"fieldClickCount":true,'+
                             '"fieldCustom":"Mawile",'+
                             '"fieldType":"1, 2",'+
                             '"fieldNature":"1,2",'+
                             '"fieldEggGroup":"1,2",'+
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
                             '"fieldCustomItem":true,'+
                             '"fieldCustomPokemon":true,'+
                             '"fieldCustomEgg":true,'+
                             '"fieldCustomPng":true,'+
                             '"fieldItem":true,'+
                             '"tooltipEnableMods":true,'+
                             '"tooltipNoBerry":true,'+
                             '"tooltipBerry":true}');
        pfqol.pfqol(jQuery);
        // use 'fieldShiny' click as a roundabout way to reload the settings
        $('[data-key=fieldShiny]').trigger('click');
    });
});
