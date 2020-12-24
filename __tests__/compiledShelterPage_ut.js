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

const verifyCheckbox = function(dataKey, localStorageKey, matchClass, matchCount) {
    $(`[data-key=${dataKey}]`).trigger('click');
    expect($(`[data-key=${dataKey}]`).prop('checked')).toBe(true);
    expect(JSON.parse(localStorage.getItem(localStorageKey))[dataKey]).toBe(true);
    expect($(`.${matchClass}`).length).toBe(matchCount);
    $(`[data-key=${dataKey}]`).trigger('click');
    expect($(`.${matchClass}`).length).toBe(0);
    expect($(`[data-key=${dataKey}]`).prop('checked')).toBe(false);
    expect(JSON.parse(localStorage.getItem(localStorageKey))[dataKey]).toBe(false);
}

const verifyAddType = function(dataKey, localStorageKey, addButtonID, removeButtonID) {
    $(`#${addButtonID}`).trigger('click');
    // check that the correct changes were applied
    expect($(`[data-key=${dataKey}]`).length).toBe(2);
    expect($(`[id=${removeButtonID}]`).length).toBe(2);
    expect(JSON.parse(localStorage.getItem(localStorageKey))[dataKey]).toBe("");
    // null because it was never set to anything
    expect($(`[data-key=${dataKey}]`).eq(0).val()).toBe(null);
    expect($(`[data-key=${dataKey}]`).eq(1).val()).toBe("none");
}

const verifySelectingType = function(dataKey, localStorageKey, matchClass) {
    $(`[data-key=${dataKey}]`).eq(0).prop('selectedIndex', 9); // Ground
    $(`[data-key=${dataKey}]`).eq(0).trigger('input');
    expect($(`.${matchClass}`).length).toBe(45); // just Ground
    expect(JSON.parse(localStorage.getItem(localStorageKey))[dataKey]).toBe("8");
    $(`[data-key=${dataKey}]`).eq(1).prop('selectedIndex', 5); // Grass
    $(`[data-key=${dataKey}]`).eq(1).trigger('input');
    expect($(`.${matchClass}`).length).toBe(55); // Ground or Grass
    expect(JSON.parse(localStorage.getItem(localStorageKey))[dataKey]).toBe("8,4");
}

const verifyRemoveType = function(dataKey, localStorageKey, removeButtonID, matchClass) {
    $(`#${removeButtonID}`).eq(0).trigger('click');
    // check that the correct changes were applied
    expect($(`[data-key=${dataKey}]`).length).toBe(1);
    expect($(`[id=${removeButtonID}]`).length).toBe(1);
    expect($(`[data-key=${dataKey}]`).eq(0).prop('selectedIndex')).toBe(5); // Grass
    expect($(`.${matchClass}`).length).toBe(10); // just Ground
    expect(JSON.parse(localStorage.getItem(localStorageKey))[dataKey]).toBe("4");
    // click remove again
    $(`#${removeButtonID}`).eq(0).trigger('click');
    expect($(`[data-key=${dataKey}]`).length).toBe(0);
    expect($(`[id=${removeButtonID}]`).length).toBe(0);
    expect($(`.${matchClass}`).length).toBe(0);
    expect(JSON.parse(localStorage.getItem(localStorageKey))[dataKey]).toBe("");
}

const verifyAddTextField = function(dataKey, localStorageKey, addButtonID, removeButtonID) {
    $(`#${addButtonID}`).trigger('click');
    // check that the correct changes were applied
    expect($(`[data-key=${dataKey}]`).length).toBe(2);
    expect($(`[id=${removeButtonID}]`).length).toBe(2);
    expect(JSON.parse(localStorage.getItem(localStorageKey))[dataKey]).toBe("");
    // null because it was never set to anything
    expect($(`[data-key=${dataKey}]`).eq(0).val()).toBe("");
    expect($(`[data-key=${dataKey}]`).eq(1).val()).toBe("");
}

const verifyRemoveTextField = function(dataKey, localStorageKey, removeButtonID) { 
    // test removing custom fields
    $(`#${removeButtonID}`).eq(0).trigger('click');
    // check that the correct changes were applied
    expect($(`[data-key=${dataKey}]`).length).toBe(1);
    expect($(`[id=${removeButtonID}]`).length).toBe(1);
    expect(JSON.parse(localStorage.getItem(localStorageKey))[dataKey]).toBe("1/g/g.png/t=1569852763");
    // click remove again
    $(`#${removeButtonID}`).eq(0).trigger('click');
    expect($(`[data-key=${dataKey}]`).length).toBe(0);
    expect($(`[id=${removeButtonID}]`).length).toBe(0);
    expect(JSON.parse(localStorage.getItem(localStorageKey))[dataKey]).toBe("");
}

describe("Test Shelter page", () => {
    test.skip("Test that PFQoL compiles on Shelter page", () => {
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

    test("Test Search controls on Shelter Page", () => {
        ////////////////////////////////////////
        // remove handlers that linger from the previous test
        $(document).off('click', '#addShelterTypeList');
        $(document).off('click', '#removeShelterTypeList');
        $(document).off('click', '#addShelterTextfield');
        $(document).off('click', '#removeShelterTextfield');

        ////////////////////////////////////////
        // setup
        const QUANTITIES = {
            'findNewEgg': 1,
            'findNewPokemon': 2,
            'findShiny': 1,
            'findAlbino': 2,
            'findMelanistic': 3,
            'findPrehistoric': 4,
            'findDelta': 5,
            'findMega': 6,
            'findStarter': 7,
            'findCustomSprite': 8,
            'findReadyToEvolve': 1,
            'findNFE': 2,
            'findTypeEgg': 1,
            'findTypePokemon': 2,
            'customEgg': 1,
            'customPokemon': 2,
            'customPng': 3,
            'findMale': 8,
            'findFemale': 41,
            'findNoGender': 2
        };
        const htmlpath = path.join(__dirname, './data/', 'shelter.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = "https://pokefarm.com/shelter";
        document.documentElement.innerHTML = innerHTML;

        localStorage.setItem('QoLShelter', 
               '{"findCustom":"",'+
               '"findType":"",'+
               '"findTypeEgg":false,'+
               '"findTypePokemon":false,'+
               '"findNewEgg":false,'+
               '"findNewPokemon":false,'+
               '"findShiny":false,'+
               '"findAlbino":false,'+
               '"findMelanistic":false,'+
               '"findPrehistoric":false,'+
               '"findDelta":false,'+
               '"findMega":false,'+
               '"findStarter":false,'+
               '"findCustomSprite":false,'+
               '"findReadyToEvolve":false,'+
               '"findMale":false,'+
               '"findFemale":false,'+
               '"findNoGender":false,'+
               '"findNFE":false,'+
               '"customEgg":false,'+
               '"customPokemon":false,'+
               '"customPng":false,'+
               '"shelterGrid":false}');
        
        pfqol.pfqol($);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // check that settings were loaded correctly
        const checkboxDataKeys = ['findNewEgg', 'findNewPokemon', 'findShiny', 'findAlbino',
            'findMelanistic', 'findPrehistoric', 'findDelta', 'findMega', 
            'findStarter', 'findCustomSprite', 
            // @TODO Need to setup the dex data to be able to use these
            // 'findReadyToEvolve',  'findNFE',
            // Handled later
            // 'findTypeEgg', 'findTypePokemon',
            // Also handled later
            // 'customEgg', 'customPokemon', 'customPng',
            // 'findMale', 'findFemale', 'findNoGender'
        ];
        const loadedSettings = JSON.parse(localStorage.getItem('QoLShelter'));
        const listSearchFields = [
            {
                'addButtonID': 'addShelterTypeList',
                'dataKey': 'findType',
                'listName': 'typeArray',
                'removeButtonID': 'removeShelterTypeList'
            },
            {
                'addButtonID': 'addShelterTextfield',
                'dataKey': 'findCustom',
                'listName': 'customArray',
                'removeButtonID': 'removeShelterTextfield',
            }
        ];

        // check that all checkboxes were setup correctly
        for(let i = 0; i < checkboxDataKeys.length; i++) {
            expect($(`[data-key=${checkboxDataKeys[i]}]`).length).toBe(1);
            expect($(`[data-key=${checkboxDataKeys[i]}]`).prop('checked')).toBe(false);
            expect(loadedSettings[checkboxDataKeys[i]]).toBe(false);
        }

        // check that list search fields were setup correctly
        for(let i = 0; i < listSearchFields.length; i++) {
            expect($('input').filter(`#${listSearchFields[i].addButtonID}`).length).toBe(1);
            expect($(`[data-key=${listSearchFields[i].dataKey}][array-name=${listSearchFields[i].listName}]`).length).toBe(1);
            expect($('input').filter(`#${listSearchFields[i].removeButtonID}`).length).toBe(1);    
        }
        ////////////////////////////////////////

        ////////////////////////////////////////
        // verify that all checkboxes work
        for(let i = 0; i < checkboxDataKeys.length; i++) {
            verifyCheckbox(checkboxDataKeys[i], 'QoLShelter', 'shelterfoundme', QUANTITIES[checkboxDataKeys[i]]);
        }
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // test adding type
        verifyAddType( 'findType', 'QoLShelter', 'addShelterTypeList', 'removeShelterTypeList');
        verifyCheckbox('findTypeEgg', 'QoLShelter', 'shelterfoundme', QUANTITIES['findTypeEgg']);
        verifyCheckbox('findTypePokemon', 'QoLShelter', 'shelterfoundme', QUANTITIES['findTypePokemon']);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // test selecting a type from the list
        verifySelectingType('findType', 'QoLShelter', 'shelterfoundme');
        ////////////////////////////////////////

        ////////////////////////////////////////
        // test removing type
        verifyRemoveType('findType', 'QoLShelter', 'removeShelterTypeList', 'shelterfoundme');
        ////////////////////////////////////////

        ////////////////////////////////////////
        // test adding a custom search field
        verifyAddTextField('findCustom', 'QoLShelter', 'addShelterTextfield', 'removeShelterTextfield');
        ////////////////////////////////////////

        ////////////////////////////////////////
        // test changing a custom search field
        // setup - enable the findCustomEgg, findCustomPokemon and gender
        //         buttons so we can see the selected pokemon
        $('[data-key=findCustomEgg]').trigger('click');
        $('[data-key=findCustomPokemon]').trigger('click');
        $('[data-key=findMale]').trigger('click');
        $('[data-key=findFemale]').trigger('click');
        $('[data-key=findNoGender]').trigger('click');
        // check search by name
        $('[data-key=findCustom]').eq(0).val('Cofagrigus');
        $('[data-key=findCustom]').eq(0).trigger('input');
        expect($('.shelterfoundme').length).toBe(45); // just text
        expect(JSON.parse(localStorage.getItem('QoLShelter')).fieldCustom).toBe("Cofagrigus");
        // setup - disable buttons one by one
        $('[data-key=findCustomEgg]').trigger('click');
        expect($('.shelterfoundme').length).toBe(0);
        $('[data-key=findCustomPokemon]').trigger('click');
        expect($('.shelterfoundme').length).toBe(0);
        $('[data-key=findMale]').trigger('click');
        expect($('.shelterfoundme').length).toBe(0);
        $('[data-key=findFemale]').trigger('click');
        expect($('.shelterfoundme').length).toBe(0);
        $('[data-key=findNoGender]').trigger('click');
        expect($('.shelterfoundme').length).toBe(0);
        ////////////////////////////////////////
        
        ////////////////////////////////////////
        // test removing a custom search field
        verifyRemoveTextField('findCustom', 'QoLShelter', 'removeShelterTextfield');
        ////////////////////////////////////////
    });

    test("Test Sort controls on Shelter Page", () => {
        ////////////////////////////////////////
        // setup
        const htmlpath = path.join(__dirname, './data/', 'shelter.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = "https://pokefarm.com/shelter";
        document.documentElement.innerHTML = innerHTML;

        localStorage.setItem('QoLShelter', 
               '{"findCustom":"",'+
               '"findType":"",'+
               '"findTypeEgg":false,'+
               '"findTypePokemon":false,'+
               '"findNewEgg":false,'+
               '"findNewPokemon":false,'+
               '"findShiny":false,'+
               '"findAlbino":false,'+
               '"findMelanistic":false,'+
               '"findPrehistoric":false,'+
               '"findDelta":false,'+
               '"findMega":false,'+
               '"findStarter":false,'+
               '"findCustomSprite":false,'+
               '"findReadyToEvolve":false,'+
               '"findMale":false,'+
               '"findFemale":false,'+
               '"findNoGender":false,'+
               '"findNFE":false,'+
               '"customEgg":false,'+
               '"customPokemon":false,'+
               '"customPng":false,'+
               '"shelterGrid":false}');
        
        pfqol.pfqol($);
        ////////////////////////////////////////
               
        ////////////////////////////////////////
        // check that data is setup correctly
        expect($('[data-key=shelterGrid]').length).toBe(1);
        expect($('[data-key=shelterGrid]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem('QoLShelter')).shelterGrid).toBe(false);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // enable
        $('[data-key=shelterGrid]').trigger('click');
        expect($('#shelterarea').hasClass('qolshelterareagrid')).toBe(true);
        expect($('[data-key=shelterGrid]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem('QoLShelter')).shelterGrid).toBe(true);
        ////////////////////////////////////////

        ////////////////////////////////////////
        // disable
        $('[data-key=shelterGrid]').trigger('click');
        expect($('#shelterarea').hasClass('qolshelterareagrid')).toBe(false);
        expect($('[data-key=shelterGrid]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem('QoLShelter')).shelterGrid).toBe(false);
        ////////////////////////////////////////
    });
});