const $ = require('../../__mocks__/jquery_files').jQuery;
$.USERID = '';
window.fetch = require('../../__mocks__/fetch').fetch;
const key = `${$.USERID}.QoLShelter`;
// eslint-disable-next-line no-unused-vars
const console = require('../../__mocks__/console_suppress').console;
const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path');
const pfqol = require(appRoot + '/Poke-Farm-QoL.sanctioned.test.user');
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
};

const verifyAddType = function(dataKey, localStorageKey, addButtonID, removeButtonID) {
    $(`#${addButtonID}`).trigger('click');
    // check that the correct changes were applied
    expect($(`[data-key=${dataKey}]`).length).toBe(2);
    expect($(`[id=${removeButtonID}]`).length).toBe(2);
    expect(JSON.parse(localStorage.getItem(localStorageKey))[dataKey]).toBe('');
    // null because it was never set to anything
    expect($(`[data-key=${dataKey}]`).eq(0).val()).toBe(null);
    expect($(`[data-key=${dataKey}]`).eq(1).val()).toBe('none');
};

const verifySelectingType = function(dataKey, localStorageKey, matchClass, typeToAdd, numMatches) {
    $(`[data-key=${dataKey}]`).eq(0).prop('selectedIndex', typeToAdd);
    $(`[data-key=${dataKey}]`).eq(0).trigger('input');
    expect($(`.${matchClass}`).length).toBe(numMatches);
    expect(JSON.parse(localStorage.getItem(localStorageKey))[dataKey]).toBe(`${typeToAdd-1}`);
};

const verifyRemoveType = function(dataKey, localStorageKey, removeButtonID, matchClass, expectedNumber) {
    $(`#${removeButtonID}`).eq(0).trigger('click');
    expect($(`[data-key=${dataKey}]`).length).toBe(expectedNumber);
    expect($(`[id=${removeButtonID}]`).length).toBe(expectedNumber);
    expect($(`.${matchClass}`).length).toBe(0);
    expect(JSON.parse(localStorage.getItem(localStorageKey))[dataKey]).toBe('');
};

const verifyAddTextField = function(dataKey, localStorageKey, addButtonID, removeButtonID) {
    $(`#${addButtonID}`).trigger('click');
    // check that the correct changes were applied
    expect($(`[data-key=${dataKey}]`).length).toBe(2);
    expect($(`[id=${removeButtonID}]`).length).toBe(2);
    expect(JSON.parse(localStorage.getItem(localStorageKey))[dataKey]).toBe('');
    // null because it was never set to anything
    expect($(`[data-key=${dataKey}]`).eq(0).val()).toBe('');
    expect($(`[data-key=${dataKey}]`).eq(1).val()).toBe('');
};

const verifyRemoveTextField = function(dataKey, localStorageKey, removeButtonID, expectedNumber, expectedValue) {
    // test removing custom fields
    $(`#${removeButtonID}`).eq(0).trigger('click');
    // check that the correct changes were applied
    expect($(`[data-key=${dataKey}]`).length).toBe(expectedNumber);
    expect($(`[id=${removeButtonID}]`).length).toBe(expectedNumber);
    expect(JSON.parse(localStorage.getItem(localStorageKey))[dataKey]).toBe(expectedValue);
};

describe('Test Shelter page', () => {
    test('Test Search controls on Shelter Page', () => {
        //////////////////////////////////////

        // remove handlers that linger from the previous test
        $(document).off('click', '#addShelterTypeList');
        $(document).off('click', '#removeShelterTypeList');
        $(document).off('click', '#addShelterTextfield');
        $(document).off('click', '#removeShelterTextfield');

        //////////////////////////////////////

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
            'findTypeEgg': 1,
            'findTypePokemon': 2,
            'customEgg': 1,
            'customPokemon': 2,
            'customPng': 3,
            'findMale': 8,
            'findFemale': 41,
            'findNoGender': 2
        };
        const htmlpath = path.join(__dirname, '../data/', 'shelter.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/shelter';
        document.documentElement.innerHTML = innerHTML;

        localStorage.setItem(key,
            '{"findCustom":"",' +
            '"findType":"",' +
            '"findTypeEgg":false,' +
            '"findTypePokemon":false,' +
            '"findNewEgg":false,' +
            '"findNewPokemon":false,' +
            '"findShiny":false,' +
            '"findAlbino":false,' +
            '"findMelanistic":false,' +
            '"findPrehistoric":false,' +
            '"findDelta":false,' +
            '"findMega":false,' +
            '"findStarter":false,' +
            '"findCustomSprite":false,' +
            '"findLegendary":false,' +
            '"findMale":false,' +
            '"findFemale":false,' +
            '"findNoGender":false,' +
            '"customEgg":false,' +
            '"customPokemon":false,' +
            '"customPng":false,' +
            '"shelterGrid":false}');

        new pfqol.pfqol($);

        ////////////////////////////////////////

        // check that settings were loaded correctly
        const checkboxDataKeys = ['findNewEgg', 'findNewPokemon', 'findShiny', 'findAlbino',
            'findMelanistic', 'findPrehistoric', 'findDelta', 'findMega',
            'findStarter', 'findCustomSprite',
            /*
             * Handled later
             * 'findTypeEgg', 'findTypePokemon',
             * Also handled later
             * 'customEgg', 'customPokemon', 'customPng',
             * 'findMale', 'findFemale', 'findNoGender'
             */
        ];
        const loadedSettings = JSON.parse(localStorage.getItem(key));
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

        // verify that all checkboxes work
        for(let i = 0; i < checkboxDataKeys.length; i++) {
            verifyCheckbox(checkboxDataKeys[i], key, 'shelterfoundme', QUANTITIES[checkboxDataKeys[i]]);
        }

        ////////////////////////////////////////

        // test adding type
        verifyAddType( 'findType', key, 'addShelterTypeList', 'removeShelterTypeList');

        ////////////////////////////////////////

        // test selecting a type from the list
        $('[data-key=findTypeEgg]').trigger('click');
        $('[data-key=findTypePokemon]').trigger('click');
        // add type 4 -> Grass
        verifySelectingType('findType', key, 'shelterfoundme', 5, 3);
        $('[data-key=findTypeEgg]').trigger('click');
        $('[data-key=findTypePokemon]').trigger('click');
        verifyCheckbox('findTypeEgg', key, 'shelterfoundme', QUANTITIES['findTypeEgg']);
        verifyCheckbox('findTypePokemon', key, 'shelterfoundme', QUANTITIES['findTypePokemon']);
        ////////////////////////////////////////

        // test removing type
        verifyRemoveType('findType', key, 'removeShelterTypeList', 'shelterfoundme', 1);

        ////////////////////////////////////////

        // test adding a custom search field
        verifyAddTextField('findCustom', key, 'addShelterTextfield', 'removeShelterTextfield');
        ////////////////////////////////////////

        /*
         *  test changing a custom search field
         *  setup - enable the customEgg, customPokemon and gender
         *          buttons so we can see the selected pokemon
         */
        $('[data-key=customEgg]').trigger('click');
        $('[data-key=customPokemon]').trigger('click');
        $('[data-key=findMale]').trigger('click');
        $('[data-key=findFemale]').trigger('click');
        $('[data-key=findNoGender]').trigger('click');
        // check search by name
        const NAME_TO_FIND = 'Bulbasaur';
        $('[data-key=findCustom]').eq(0).val(NAME_TO_FIND);
        $('[data-key=findCustom]').eq(0).trigger('input');
        expect($('.shelterfoundme').length).toBe(3); // just text
        expect(JSON.parse(localStorage.getItem(key)).findCustom).toBe(NAME_TO_FIND);
        // check buttons work individually
        $('[data-key=customEgg]').trigger('click'); // disable
        expect($('.shelterfoundme').length).toBe(2);
        $('[data-key=customPokemon]').trigger('click'); // disable
        expect($('.shelterfoundme').length).toBe(0);
        $('[data-key=customPokemon]').trigger('click'); // enable
        $('[data-key=findMale]').trigger('click'); // disable
        expect($('.shelterfoundme').length).toBe(1); // just females
        $('[data-key=findFemale]').trigger('click'); // disable
        expect($('.shelterfoundme').length).toBe(0);
        $('[data-key=findMale]').trigger('click'); // enable
        expect($('.shelterfoundme').length).toBe(1); // just males
        $('[data-key=findMale]').trigger('click'); // disable
        // check genderless
        $('[data-key=findCustom]').eq(0).val('Pokémon');
        $('[data-key=findCustom]').eq(0).trigger('input');
        expect($('.shelterfoundme').length).toBe(2);
        $('[data-key=findNoGender]').trigger('click'); // disable
        expect($('.shelterfoundme').length).toBe(0);

        //////////////////////////////////////

        // test removing a custom search field
        verifyRemoveTextField('findCustom', key, 'removeShelterTextfield', 1, '');
        ////////////////////////////////////////
    });

    test('Test Search for Legendaries on Shelter Page', () => {
        //////////////////////////////////////

        // remove handlers that linger from the previous test
        $(document).off('click', '#addShelterTypeList');
        $(document).off('click', '#removeShelterTypeList');
        $(document).off('click', '#addShelterTextfield');
        $(document).off('click', '#removeShelterTextfield');

        //////////////////////////////////////

        // setup
        const htmlpath = path.join(__dirname, '../data/', 'shelter.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/shelter';
        document.documentElement.innerHTML = innerHTML;

        // add legendary elements
        const legendaryHTML = `<div class="pokemon tooltip_trigger" style="left: 30.9963%; top: 20.6878%;"
                data-stage="pokemon"><img src="https://pfq-static.com/img/pkmn/i/4/o/7.png/t=00000000"
                class="big"><img src="https://pfq-static.com/img/pkmn/x/b/q/w.png/t=1496995713"
                class="small">
            </div>
            <div class="tooltip_content" data-adopt="hLpL_">Mew (Lv.4
                    <img src="https://pfq-static.com/img/pkmn/gender_f.png/t=1401213007" title="[F]">
                    <img src="https://pfq-static.com/img/pkmn/cs.png/t=1405806997" title="[CUSTOM SPRITE]">
                )
                <span class="buttons">
                    <button data-shelter="adopt">View / Adopt</button>
                    <button data-shelter="hide">Hide</button>
                </span>
            </div>`;
        document.querySelector('#shelterarea').insertAdjacentHTML('beforeend', legendaryHTML);
        $('#shelterarea').children().eq(-2).attr('id', 'legendary1pokemon');
        $('#shelterarea').children().eq(-1).attr('id', 'legendary1tooltip');

        localStorage.setItem(key,
            '{"findCustom":"",' +
            '"findType":"",' +
            '"findTypeEgg":false,' +
            '"findTypePokemon":false,' +
            '"findNewEgg":false,' +
            '"findNewPokemon":false,' +
            '"findShiny":false,' +
            '"findAlbino":false,' +
            '"findMelanistic":false,' +
            '"findPrehistoric":false,' +
            '"findDelta":false,' +
            '"findMega":false,' +
            '"findStarter":false,' +
            '"findCustomSprite":false,' +
            '"findLegendary":false,' +
            '"findMale":false,' +
            '"findFemale":false,' +
            '"findNoGender":false,' +
            '"customEgg":false,' +
            '"customPokemon":false,' +
            '"customPng":false,' +
            '"shelterGrid":false}');

        new pfqol.pfqol($);

        //////////////////////////////////////

        // check that settings were loaded correctly
        const checkboxDataKeys = ['findLegendary'];
        const loadedSettings = JSON.parse(localStorage.getItem(key));
        // check that all checkboxes were setup correctly
        for (let i = 0; i < checkboxDataKeys.length; i++) {
            expect($(`[data-key=${checkboxDataKeys[i]}]`).length).toBe(1);
            expect($(`[data-key=${checkboxDataKeys[i]}]`).prop('checked')).toBe(false);
            expect(loadedSettings[checkboxDataKeys[i]]).toBe(false);
        }

        ////////////////////////////////////////

        // verify that the script sees the 1 Mew + 7 Manaphy
        verifyCheckbox(checkboxDataKeys[0], key, 'shelterfoundme', 8);

        // add another legendary
        document.querySelector('#shelterarea').insertAdjacentHTML('beforeend', legendaryHTML);
        $('#shelterarea').children().eq(-2).attr('id', 'legendary2pokemon');
        $('#shelterarea').children().eq(-1).attr('id', 'legendary2tooltip');

        // verify that the script sees both legendaries
        verifyCheckbox(checkboxDataKeys[0], key, 'shelterfoundme', 9);

        // remove the first legendary
        document.getElementById('legendary1pokemon').remove();
        document.getElementById('legendary1tooltip').remove();

        // verify that the script can see the 1 legendary
        verifyCheckbox(checkboxDataKeys[0], key, 'shelterfoundme', 8);

        // remove the second legendary
        document.getElementById('legendary2pokemon').remove();
        document.getElementById('legendary2tooltip').remove();

        verifyCheckbox(checkboxDataKeys[0], key, 'shelterfoundme', 7);
    });

    test('Test Sort controls on Shelter Page', () => {
        //////////////////////////////////////

        // setup
        const htmlpath = path.join(__dirname, '../data/', 'shelter.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/shelter';
        document.documentElement.innerHTML = innerHTML;

        localStorage.setItem(key,
            '{"findCustom":"",'+
               '"findType":"",'+
               '"findLegendary":false,'+
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
               '"findMale":false,'+
               '"findFemale":false,'+
               '"findNoGender":false,'+
               '"customEgg":false,'+
               '"customPokemon":false,'+
               '"customPng":false,'+
               '"shelterGrid":false}');

        new pfqol.pfqol($);

        //////////////////////////////////////

        // check that data is setup correctly
        expect($('[data-key=shelterGrid]').length).toBe(1);
        expect($('[data-key=shelterGrid]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).shelterGrid).toBe(false);

        //////////////////////////////////////

        // enable
        $('[data-key=shelterGrid]').trigger('click');
        expect($('#shelterarea').hasClass('qolshelterareagrid')).toBe(true);
        expect($('[data-key=shelterGrid]').prop('checked')).toBe(true);
        expect(JSON.parse(localStorage.getItem(key)).shelterGrid).toBe(true);

        //////////////////////////////////////

        // disable
        $('[data-key=shelterGrid]').trigger('click');
        expect($('#shelterarea').hasClass('qolshelterareagrid')).toBe(false);
        expect($('[data-key=shelterGrid]').prop('checked')).toBe(false);
        expect(JSON.parse(localStorage.getItem(key)).shelterGrid).toBe(false);
        ////////////////////////////////////////
    });
});