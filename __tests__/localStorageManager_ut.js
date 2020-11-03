const fs = require('fs');
const path = require('path');
const LocalStorageManager = require("../requires/utils/localStorageManager.js");
const DexUtilities = require("../__mocks__/dexUtilities").dexUtilities;
const jQuery = require('jquery').jQuery;

const localStorageManager = new LocalStorageManager(localStorage);
const ownerDocument = document.implementation.createHTMLDocument('virtual');

describe("Test loadDexIntoGlobalsFromStorage", () => {
    test("Should return false if dex not in storage", () => {
        // loadDexIntoGlobalsFromStorage
        localStorage.removeItem('QoLPokedex');
        const globals = {};
        expect(localStorageManager.loadDexIntoGlobalsFromStorage(globals)).toBe(false);
    });
    test("Should return false if dex is in storage but is empty", () => {
        localStorage.setItem("QoLPokedex", JSON.stringify([]));
        const globals = {};
        expect(localStorageManager.loadDexIntoGlobalsFromStorage(globals)).toBe(false);
    });
    test("Should return false if dex is of length 1", () => {
        localStorage.setItem("QoLPokedex", JSON.stringify(["1/1/1111"]));
        const globals = {};
        expect(localStorageManager.loadDexIntoGlobalsFromStorage(globals)).toBe(false);
    });
    test("Should return false if dex index 1 is invalid", () => {
        localStorage.setItem("QoLPokedex", JSON.stringify(["1/1/1111", undefined]));
        const globals = {};
        expect(localStorageManager.loadDexIntoGlobalsFromStorage(globals)).toBe(false);
    });
    test("Should set globals.DEX_UPDATE_DATE and globals.DEX_DATA when dex storage is valid", () => {
        const filepath = path.join(__dirname, "./data", "dex.json");
        const json = fs.readFileSync(filepath, 'utf8', 'r');
        const parsed = JSON.parse(json);
        const date = parsed[0];
        const dex = parsed.slice(1);
        localStorage.setItem("QoLPokedex", json);
        const globals = {};
        expect(localStorageManager.loadDexIntoGlobalsFromStorage(globals)).toBe(true);
        expect(globals.DEX_UPDATE_DATE).toBe(date);
        expect(globals.DEX_DATA).toStrictEqual(dex);
    });
});

describe("Test loadDexIntoGlobalsFromWeb", () => {
    test("Should set globals.DEX_UPDATE_DATE and globals.DEX_DATA", () => {
        const filepath = path.join(__dirname, "./data", "dex.json");
        const json = fs.readFileSync(filepath, 'utf8', 'r');
        const parsed = JSON.parse(json);
        const date = (new Date()).toUTCString();
        const dex = parsed.slice(1);
        const globals = {};
        localStorageManager.loadDexIntoGlobalsFromWeb(jQuery, ownerDocument, DexUtilities, globals);
        expect(globals.DEX_UPDATE_DATE).toBe(date);
        expect(globals.DEX_DATA).toStrictEqual(dex);
    });
});

describe("Test loadDexIntoGlobalsFromWebIfOld", () => {
    test("Should set globals.DEX_UPDATE_DATE and globals.DEX_DATA when current dex is too old", () => {
        const filepath = path.join(__dirname, "./data", "dex.json");
        const json = fs.readFileSync(filepath, 'utf8', 'r');
        let parsed = JSON.parse(json);
        const date = (new Date(1111, 1, 1)).toUTCString();
        const dex = parsed.slice(1);
        const globals = {};
        parsed[0] = date;
        localStorage.setItem("QoLPokedex", JSON.stringify(parsed));
        const result = localStorageManager.loadDexIntoGlobalsFromWebIfOld(jQuery, ownerDocument, DexUtilities, globals);
        expect(result).toBe(true);
        expect(globals.DEX_UPDATE_DATE).toBe((new Date()).toUTCString());
        expect(globals.DEX_DATA).toStrictEqual(dex);
    });
    test("Should not update globals.DEX_UPDATE_DATE and globals.DEX_DATA when current dex is new enough", () => {
        const filepath = path.join(__dirname, "./data", "dex.json");
        const json = fs.readFileSync(filepath, 'utf8', 'r');
        let parsed = JSON.parse(json);
        const now = new Date();
        // get date that is less than 30 days ago
        let date = new Date();
        date.setDate(date.getDate() - 1);
        const dex = parsed.slice(1);
        const globals = {
            DEX_UPDATE_DATE: date.toUTCString(),
            DEX_DATA: parsed.slice(1)
        };
        parsed[0] = date.toUTCString();
        localStorage.setItem("QoLPokedex", JSON.stringify(parsed));
        const result = localStorageManager.loadDexIntoGlobalsFromWebIfOld(jQuery, ownerDocument, DexUtilities, globals);
        expect(result).toBe(false);
    });
});

describe("Test loadEvolveByLevelList", () => {
    test("Should load evolve by level list into globals", () => {
        const evolveByLevel = {
            "001": "Level 16",
            "002": "Level 32",
            "Bulbasaur": "Level 16",
            "Ivysaur": "Level 32"
        };
        const json = JSON.stringify(evolveByLevel);
        localStorage.setItem('QoLEvolveByLevel', json);
        const globals = {};
        localStorageManager.loadEvolveByLevelList(globals);
        expect(globals.EVOLVE_BY_LEVEL_LIST).toStrictEqual(evolveByLevel);
    });
});

describe("Test loadEvolutionTreeDepthList", () => {
    test("Should load evolution tree depth list into globals", () => {
        globals = {};
        const expected = {
            '001': { remaining: 2, total: 2},
            '002': { remaining: 1, total: 2},
            '003':  { remaining: 0, total: 2}
        };
        const json = JSON.stringify(expected);
        localStorage.setItem('QoLEvolutionTreeDepth', json);
        localStorageManager.loadEvolutionTreeDepthList(globals);
        expect(globals.EVOLUTIONS_LEFT).toStrictEqual(expected);
    });
});

describe("Test updateLocalStorageDex", () => {
    test("Should update local storage with dex and specified date", () => {
        const filepath = path.join(__dirname, "./data", "dex.json");
        const json = fs.readFileSync(filepath, 'utf8', 'r');
        let parsed = JSON.parse(json);
        let date = new Date();
        date.setDate(date.getDate() - 1);
        const dex = parsed.slice(1)
        const globals = {
            DEX_DATA: dex
        };
        localStorageManager.updateLocalStorageDex(jQuery, ownerDocument, date, globals);
        const qolDateAndDex = JSON.parse(localStorage.getItem('QoLPokedex'));
        const qolDate = new Date(Date.parse(qolDateAndDex[0]));
        const qolDex = qolDateAndDex.slice(1);
        expect(qolDate.toUTCString()).toBe(date.toUTCString());
        expect(qolDex).toStrictEqual(dex);
    });
    test("Should update local storage with dex and current date", () => {
        // updateLocalStorageDex($, document, updateDate, globals)
        const filepath = path.join(__dirname, "./data", "dex.json");
        const json = fs.readFileSync(filepath, 'utf8', 'r');
        let parsed = JSON.parse(json);
        const dex = parsed.slice(1)
        const globals = {
            DEX_DATA: dex
        };
        const now = new Date();
        localStorageManager.updateLocalStorageDex(jQuery, ownerDocument, undefined, globals);
        const qolDateAndDex = JSON.parse(localStorage.getItem('QoLPokedex'));
        const qolDate = qolDateAndDex[0];
        const qolDex = qolDateAndDex.slice(1);
        expect(qolDate).toBe(now.toUTCString());
        expect(qolDex).toStrictEqual(dex);
    });
});

describe("Test saveEvolveByLevelList", () => {
    // The case where parsed_families and dex_ids are non-empty is handled by testin qoLHub.js
    test("Should load existing evolve by level exists when it exists", () => {
        const globals = {};
        const evolveByLevel = {
            "001": "Level 16",
            "002": "Level 32",
            "Bulbasaur": "Level 16",
            "Ivysaur": "Level 32"
        };
        const charmander_family = [
            {'source': 'Charmander', 'target': 'Charmeleon', 'condition': [
                {'condition': "Level", 'data': "16"},
            ]},
            {'source': 'Charmeleon', 'target': 'Charizard', 'condition':  [
                {'condition': "Level", 'data': "36"},
            ]},
            {'source': 'Charizard', 'target': 'Charizard [Mega Forme X]', 'condition': 'Charizardite X'},
            {'source': 'Charizard', 'target': 'Charizard [Mega Forme Y]', 'condition': 'Charizardite Y'},
        ];
        const parsed_families = {
            'Charmander': charmander_family,
            'Charmeleon': charmander_family,
            'Charizard': charmander_family,
            'Charizard [Mega Forme X]': charmander_family,
            'Charizard [Mega Forme Y]': charmander_family,
        };
        const dex_ids = {
            'Charmander': "004",
            'Charmeleon': "005",
            'Charizard': "006",
            'Charizard [Mega Forme X]': "006-X",
            'Charizard [Mega Forme Y]': "006-Y",
        };
        localStorage.setItem('QoLEvolveByLevel', JSON.stringify(evolveByLevel));
        localStorageManager.saveEvolveByLevelList(globals, parsed_families, dex_ids);
        const newEvolveByLevel = JSON.parse(localStorage.getItem('QoLEvolveByLevel'));
        const expectedNewEvolveByLevel = {
            "001": "Level 16",
            "002": "Level 32",
            "004": "Level 16",
            "005": "Level 36",
            "Bulbasaur": "Level 16",
            "Ivysaur": "Level 32",
            "Charmander": "Level 16",
            "Charmeleon": "Level 36"
        };
        expect(newEvolveByLevel).toStrictEqual(expectedNewEvolveByLevel);
        expect(globals.EVOLVE_BY_LEVEL_LIST).toStrictEqual(expectedNewEvolveByLevel);
    });
});

describe("Test parseAndStoreDexNumbers", () => {
    test("Should load existing dex IDs list when it exists", () => {
        const dexIDsCache = ["001", "002", "004"];
        localStorage.setItem('QoLDexIDsCache', JSON.stringify(dexIDsCache));
        const file = path.join(__dirname, "../__tests__/data/", "dex.html");
        const data = fs.readFileSync(file, "utf8", 'r');
        const html = jQuery.parseHTML(data);
        const dex = jQuery(html[11].querySelector('#dexdata', ownerDocument)).html();
        const dexNumbers = localStorageManager.parseAndStoreDexNumbers(dex);
        // there are too many dex IDs to check, so let's just show that the length changed
        const newDexIDsCache = JSON.parse(localStorage.getItem('QoLDexIDsCache'));
        expect(dexIDsCache.length + dexNumbers.length).toBe(newDexIDsCache.length);
    });
});