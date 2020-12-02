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

describe("Test Shelter page", () => {
    test("Test that PFQoL compiles on Shelter page", () => {
        const htmlpath = path.join(__dirname, './data/', 'shelter.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = "https://pokefarm.com/shelter";
        document.documentElement.innerHTML = innerHTML;

        // add pokemon to custom search list
        // match Rattata, Bulbasaur, and Spiritomb Egg PNG
        localStorage.setItem('QoLShelter', 
               '{"findCustom":"Rattata,Bulbasaur,c/0/7.png/t=1478697860",'+
               '"findType":"0,4,7",'+
               '"findTypeEgg":true,'+
               '"findTypePokemon":true,'+
               '"findNewEgg":true,'+
               '"findNewPokemon":true,'+
               '"findShiny":true,'+
               '"findAlbino":true,'+
               '"findMelanistic":true,'+
               '"findPrehistoric":true,'+
               '"findDelta":true,'+
               '"findMega":true,'+
               '"findStarter":true,'+
               '"findCustomSprite":true,'+
               '"findReadyToEvolve":true,'+
               '"findMale":true,'+
               '"findFemale":true,'+
               '"findNoGender":true,'+
               '"findNFE":true,'+
               '"customEgg":true,'+
               '"customPokemon":true,'+
               '"customPng":true,'+
               '"shelterGrid":true}');
        
        pfqol.pfqol($);

        // trigger '#shelteroptionsqol input' change event
        // trigger '.qolsetting' change event
        // trigger '.qolsetting' input event
        $('[data-key="findMale"]').trigger('click');
        // trigger '.customSearchOnClick' click event
        $('.customSearchOnClick').eq(0).trigger('click');
        // trigger '#addShelterTextfield' click event
        $('#addShelterTextfield').trigger('click');
        // // trigger '#removeShelterTextfield' click event
        $('#removeShelterTextfield').trigger('click');
        // // trigger '#addShelterTypeList' click event
        $('#addShelterTypeList').trigger('click');
        // // trigger '#removeShelterTypeList' click event
        $('#removeShelterTypeList').trigger('click');
        // trigger 'keyup.qol_shelter_shortcuts' keyup event
        const keyevent = $.Event('keyup.qol_shelter_shortcuts');
        keyevent.keyCode = 78;
        $(window).trigger(keyevent);
        $(window).trigger(keyevent);

        // get coverage for findNFE = false branch in customSearch
        localStorage.setItem('QoLShelter', 
               '{"findCustom":"Rattata,Bulbasaur",'+
               '"findType":"0,4,7",'+
               '"findTypeEgg":true,'+
               '"findTypePokemon":true,'+
               '"findNewEgg":true,'+
               '"findNewPokemon":true,'+
               '"findShiny":true,'+
               '"findAlbino":true,'+
               '"findMelanistic":true,'+
               '"findPrehistoric":true,'+
               '"findDelta":true,'+
               '"findMega":true,'+
               '"findStarter":true,'+
               '"findCustomSprite":true,'+
               '"findReadyToEvolve":true,'+
               '"findMale":true,'+
               '"findFemale":true,'+
               '"findNoGender":true,'+
               '"findNFE":false,'+ // <-- false
               '"customEgg":true,'+
               '"customPokemon":true,'+
               '"customPng":true,'+
               '"shelterGrid":true}');
        $('[data-key="findNFE"]').trigger('click');

        // get coverage for no genders branch in custom pokemon part of customSearch
        localStorage.setItem('QoLShelter', 
               '{"findCustom":"Rattata,Bulbasaur",'+
               '"findType":"0,4,7",'+
               '"findTypeEgg":true,'+
               '"findTypePokemon":true,'+
               '"findNewEgg":true,'+
               '"findNewPokemon":true,'+
               '"findShiny":true,'+
               '"findAlbino":true,'+
               '"findMelanistic":true,'+
               '"findPrehistoric":true,'+
               '"findDelta":true,'+
               '"findMega":true,'+
               '"findStarter":true,'+
               '"findCustomSprite":true,'+
               '"findReadyToEvolve":true,'+
               '"findMale":false,'+ // <-- false
               '"findFemale":false,'+ // <-- false
               '"findNoGender":false,'+ // <-- false
               '"findNFE":false,'+ // <-- false
               '"customEgg":true,'+
               '"customPokemon":true,'+
               '"customPng":true,'+
               '"shelterGrid":true}');
        // use '.customSearchOnClick' click as a roundabout way to reload the settings
        $('.customSearchOnClick').eq(0).trigger('click');

        // trigger MutationObserver observe
        $('#shelterarea>div').eq(59).remove();
        $('#shelterarea>div').eq(58).remove();
    });
});