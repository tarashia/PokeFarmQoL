const $ = require('../../__mocks__/jquery_files').jQuery;
$.USERID = '';
const settingsKey = `${$.USERID}.QoLSettings`;
const shelterKey = `${$.USERID}.QoLShelter`;
const evolveByLevelKey = `${$.USERID}.QoLEvolveByLevel`;
const dexIDsKey = `${$.USERID}.QoLDexIDsCache`;
const evolutionTreeDepthKey = `${$.USERID}.QoLEvolutionTreeDepth`;
const regionalFormsKey = `${$.USERID}.QoLRegionalFormsList`;
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

describe('Test that PFQoL compiles', () => {
    test.skip('Test QoL Hub controls', () => {
        const htmlpath = path.join(__dirname, '../data/', 'party.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        document.documentElement.innerHTML = innerHTML;
        global.location.href = 'https://pokefarm.com/party';

        // set non-default Shelter settings to facilitate the resetPageSettings test
        localStorage.setItem(shelterKey, JSON.stringify({
            findCustom: '',
            findType: '',
            findTypeEgg: false, // non-default
            findTypePokemon: true, // non-default
            findNewEgg: false, // non-default
            findNewPokemon: true,
            findShiny: true,
            findAlbino: true,
            findMelanistic: true,
            findPrehistoric: true,
            findDelta: true,
            findMega: true,
            findStarter: true,
            findCustomSprite: true,
            findReadyToEvolve: false,
            findMale: true,
            findFemale: true,
            findNoGender: true,
            findNFE: false,
            customEgg: true,
            customPokemon: true,
            customPng: false,
            shelterGrid: true,
        }));

        new pfqol.pfqol($);

        /*
         * //////////////////////////////////////
         *  TEST 1
         *  check that a div is added to the HTML when the QoL button in the
         *  timerse bar is clicked
         */
        $('li[data-name="QoL"]').eq(0).trigger('click');
        let lastChild = $('body').children().eq(-1);
        expect(lastChild && lastChild.attr('class')).toBe('dialog');
        ////////////////////////////////////////

        /*
         * //////////////////////////////////////
         *  TEST 2
         *  check that clicking a checkbox changes a setting
         */
        const settingsList = ['enableDaycare'];
        let expectedSettingValue;
        let settings;
        for (let i = 0; i < settingsList.length; i++) {
            const key = settingsList[i];
            settings = JSON.parse(localStorage.getItem(settingsKey));
            if (settings[key] === true) {
                expectedSettingValue = false;
            } else {
                expectedSettingValue = true;
            }
            $(`[data-key=${key}]`).trigger('click');
            settings = JSON.parse(localStorage.getItem(settingsKey));
            expect(settings[key]).toEqual(expectedSettingValue);
        }
        ////////////////////////////////////////

        /*
         * //////////////////////////////////////
         *  TEST 3
         *  check that clicking resetPageSettings will
         */
        const defaultShelterSettings = {
            findCustom: '',
            findType: '',
            findTypeEgg: true,
            findTypePokemon: false,
            findNewEgg: true,
            findNewPokemon: true,
            findShiny: true,
            findAlbino: true,
            findMelanistic: true,
            findPrehistoric: true,
            findDelta: true,
            findMega: true,
            findStarter: true,
            findCustomSprite: true,
            findReadyToEvolve: false,
            findMale: true,
            findFemale: true,
            findLegendary: false,
            findNoGender: true,
            findNFE: false,
            customEgg: true,
            customPokemon: true,
            customPng: false,
            shelterGrid: true,
        };
        $('select[data-key=resetPageSettings]>option:eq(8)').prop('selected', true);
        $('input#resetPageSettings').trigger('click');
        const newSettings = JSON.parse(localStorage.getItem(shelterKey));
        expect(newSettings).toEqual(defaultShelterSettings);
        ////////////////////////////////////////

        /*
         * //////////////////////////////////////
         *  this doesn't need any expects; it's not important enough
         */
        $('h3.slidermenu').trigger('click');
        ////////////////////////////////////////

        /*
         * //////////////////////////////////////
         *  test keydown handler for #qolcustomcss
         */
        let keyevent = $.Event('keydown');
        keyevent.keyCode = 9; // tab
        $('#qolcustomcss').trigger(keyevent);
        keyevent = $.Event('keydown');
        keyevent.keyCode = 0;
        keyevent.which = 9; // tab
        $('#qolcustomcss').trigger(keyevent);
        ////////////////////////////////////////

        ////////////////////////////////////////
        $('#updateDex').eq(0).trigger('click');
        ////////////////////////////////////////

        /*
         * //////////////////////////////////////
         *  TEST
         *  check that clicking clear dex clears local storage
         */
        localStorage.setItem(evolveByLevelKey, 'fdsa');
        localStorage.setItem(dexIDsKey, 'fdsa');
        localStorage.setItem(evolutionTreeDepthKey, 'fdsa');
        localStorage.setItem(regionalFormsKey, 'fdsa');
        $('#clearCachedDex').eq(0).trigger('click');
        expect(localStorage.getItem(evolveByLevelKey)).toBeNull();
        expect(localStorage.getItem(dexIDsKey)).toBeNull();
        expect(localStorage.getItem(evolutionTreeDepthKey)).toBeNull();
        expect(localStorage.getItem(regionalFormsKey)).toBeNull();
        ////////////////////////////////////////

        /*
         * //////////////////////////////////////
         *  TEST
         *  check that clicking the close button removes the HTML for the dialog
         */
        $('.closeHub').eq(0).trigger('click');
        lastChild = $('body').children().eq(-1);
        expect(lastChild && lastChild.attr('class')).not.toBe('dialog');
        ////////////////////////////////////////
    });
    test.skip('Test Local Storage Migration', () => {
        const htmlpath = path.join(__dirname, '../data/', 'party.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        document.documentElement.innerHTML = innerHTML;
        global.location.href = 'https://pokefarm.com/party';

        localStorage.removeItem(settingsKey);
        localStorage.removeItem(shelterKey);

        // set non-default Shelter settings to facilitate the resetPageSettings test
        const oldSettingsKey = 'QoLSettings';
        const oldShelterKey = 'QoLShelter';
        const qolSettings = {
            example1: 'foo1'
        };
        const qolShelter = {
            example2: 'foo2'
        };
        localStorage.setItem(oldSettingsKey, JSON.stringify(qolSettings));
        localStorage.setItem(oldShelterKey, JSON.stringify(qolShelter));

        new pfqol.pfqol($);

        /*
         * the corrected settings end up getting modified by the code because
         * the examples here are not full settings, so just check that the
         * new settings are not null and that the old settings are null
         */
        expect(localStorage.getItem(oldSettingsKey)).toBeNull();
        expect(localStorage.getItem(settingsKey)).not.toBeNull();
        expect(localStorage.getItem(oldShelterKey)).toBeNull();
        expect(localStorage.getItem(shelterKey)).not.toBeNull();
    });
});