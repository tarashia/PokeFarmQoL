/* globals fail */
const DexUtilities = require('../requires/user/dexUtilities.js').DexUtilities;
const DexPageParser = require('../requires/user/dexPageParser.js').DexPageParser;
const EvolutionTreeParser = require('../requires/user/evolutionTreeParser.js').EvolutionTreeParser;
const jQuery = require('../__mocks__/jquery').jQuery;
const console = require('../__mocks__/console').console;
const testTools = require('./testTools');

const ownerDocument = document.implementation.createHTMLDocument('virtual');

describe('Load main dex page', () => {
    test('Should call jQuery.get to load main dex page', () => {
        DexUtilities.getMainDexPage(jQuery);
        expect(jQuery.get.mock.calls.length).toBe(1);
    });
});

describe('Load the dex pages for the pokemon whose dex numbers are in the dexNumbers input', () => {
    test('Loads dex pages for known pokemon and updates progressBar and progressSpan', () => {
        jQuery.get.mockClear();
        const dexNumbers = ['001', '002', '003', '003-M'];
        const progressBar = {
            'value': 0,
        };
        const progressSpan = {
            'textContent': '',
        };

        DexUtilities.loadDexPages(jQuery, dexNumbers, progressBar, progressSpan).then(() => {
            expect(progressBar.value).toBe(4);
            expect(progressSpan.textContent).toBe('Loaded 4 of 4 Pokemon');
            expect(jQuery.get.mock.calls.length).toBe(4);
        }, () => {
            fail();
        });
    });
    test('Handles unknown pokemon by updating progressBar and progressSpan without calling jQuery', () => {
        jQuery.get.mockClear();
        const dexNumbers = ['001', '002', '000', '003-M'];
        const progressBar = {
            'value': 0,
        };
        const progressSpan = {
            'textContent': '',
        };

        const prom = DexUtilities.loadDexPages(jQuery, dexNumbers, progressBar, progressSpan);
        prom.then(() => {
            expect(progressBar.value).toBe(4);
            expect(progressSpan.textContent).toBe('Loaded 4 of 4 Pokemon');
            expect(jQuery.get.mock.calls.length).toBe(3);
        }, () => {
            fail();
        });
    });
});

describe('Loads the dex pages for the forms of a pokemon', () => {
    test('Load pages for other forms', () => {
        jQuery.get.mockClear();
        const html1 = testTools.loadDexFile('003-M');
        const html2 = testTools.loadDexFile('003-M');
        const input = [html1, html2];
        const progressBar = {
            'value': 0,
            'max': 0
        };
        const progressSpan = {
            'textContent': '',
        };

        DexUtilities.loadFormPages(jQuery, ownerDocument, input, progressBar, progressSpan).then(() => {
            expect(progressBar.value).toBe(2);
            expect(progressSpan.textContent).toBe('Loaded 2 of 2 Pokemon');
            expect(jQuery.get.mock.calls.length).toBe(2);
        }, () => {
            fail();
        });
    });
});

describe('Parses HTML from pokedex pages', () => {
    test('Should Parse HTML', () => {
        const html = ['001', '002', '003', '003-M', '142'].map((v) => {
            return testTools.loadDexFile(v);
        });
        const input = html;
        const flatFamilyEntry = [
            {'source': 'Bulbasaur', 'target': 'Ivysaur', 'condition': [
                {'condition': 'Level', 'data': '16'}
            ]},
            {'source': 'Ivysaur'  , 'target': 'Venusaur', 'condition': [
                {'condition': 'Level', 'data': '32'}
            ]},
            {'source': 'Venusaur' , 'target': 'Venusaur [Mega Forme]', 'condition': 'Venusaurite'}
        ];
        const expectedFlatFamilies = {
            'Bulbasaur': flatFamilyEntry,
            'Ivysaur': flatFamilyEntry,
            'Venusaur': flatFamilyEntry,
            'Venusaur [Mega Forme]': flatFamilyEntry,
            'Ditto': []
        };
        const expectedDexIDMap = {
            'Bulbasaur': '001',
            'Ivysaur': '002',
            'Venusaur': '003',
            'Venusaur [Mega Forme]': '003-M',
            'Ditto': '142'
        };

        const [actualFlatFamilies, actualDexIDMap] = DexUtilities.parseEvolutionTrees(jQuery, ownerDocument, DexPageParser, EvolutionTreeParser, input);
        expect(actualFlatFamilies).toEqual(expectedFlatFamilies);
        expect(actualDexIDMap).toEqual(expectedDexIDMap);

    });
});

describe('Parse form data from dex HTML', () => {
    test('Should parse ', () => {
        const html = ['001', '002', '003', '003-M', '142'].map((v) => {
            return testTools.loadDexFile(v);
        });
        const input = html;
        const expectedFormData = {
            'Bulbasaur': [{
                'base_number': '001',
                'base_name': 'Bulbasaur',
                'number': '001',
                'name': 'Bulbasaur'
            }],
            'Ivysaur': [{
                'base_number': '002',
                'base_name': 'Ivysaur',
                'number': '002',
                'name': 'Ivysaur'
            }],
            'Venusaur': [{
                'base_number': '003',
                'base_name': 'Venusaur',
                'number': '003',
                'name': 'Venusaur'
            }],
            'Venusaur [Mega Forme]': [{
                'base_number': '003',
                'base_name': 'Venusaur',
                'number': '003-M',
                'name': 'Venusaur [Mega Forme]'
            }],
            'Ditto': [{
                'base_number': '142',
                'base_name': 'Ditto',
                'number': '142',
                'name': 'Ditto'
            }],
        };
        const expectedFormMap = {
            'Bulbasaur': [{ 'name': 'Bulbasaur', 'number': '001'}],
            'Ivysaur': [{ 'name': 'Ivysaur', 'number': '002'}],
            'Venusaur': [
                {'name': 'Venusaur', 'number': '003'},
                {'name': 'Venusaur [Mega Forme]', 'number': '003-M'}
            ],
            'Venusaur [Mega Forme]': [
                {'name': 'Venusaur', 'number': '003'},
                {'name': 'Venusaur [Mega Forme]', 'number': '003-M'}
            ],
            'Ditto': [{ 'name': 'Ditto', 'number': '142' }],
        };

        const [actualFormData, actualFormMap] = DexUtilities.parseFormData(jQuery, ownerDocument, DexPageParser, input);

        expect(actualFormData).toStrictEqual(expectedFormData);
        expect(actualFormMap).toStrictEqual(expectedFormMap);
    });
});

describe('Parse base names from dex html', () => {
    test('Should parse base names correctly', () => {
        const html = ['001', '002', '003', '003-M', '142'].map((v) => {
            return testTools.loadDexFile(v);
        });
        const input = html;
        const expectedBaseNames = {
            'Bulbasaur': 'Bulbasaur',
            'Ivysaur': 'Ivysaur',
            'Venusaur': 'Venusaur',
            'Venusaur [Mega Forme]': 'Venusaur',
            'Ditto': 'Ditto'
        };
        const actualBaseNames = DexUtilities.parseBaseNames(jQuery, ownerDocument, DexPageParser, input);
        expect(actualBaseNames).toStrictEqual(expectedBaseNames);
    });
});

describe('Parse egg pngs from dex html', () => {
    test('Should parse egg pngs list correctly', () => {
        const html = ['001', '002', '003', '003-M', '142'].map((v) => {
            return testTools.loadDexFile(v);
        });
        const input = html;
        const expected = {
            'Bulbasaur': 'pkmn/c/0/7.png/t=1478697860',
            'Ditto': 'pkmn/e/h/x.png/t=1478697860'
        };
        const actual = DexUtilities.parseEggsPngsList(jQuery, ownerDocument, DexPageParser, input);

        expect(actual).toStrictEqual(expected);
    });
});

describe('Parse types list from dex html', () => {
    test('Should parse types list correctly', () => {
        const html = ['001', '002', '003', '003-M', '142'].map((v) => {
            return testTools.loadDexFile(v);
        });
        const globals = {
            TYPE_LIST : ['Normal', 'Fire', 'Water', 'Electric',
                'Grass', 'Ice', 'Fighting', 'Poison',
                'Ground', 'Flying', 'Psychic', 'Bug',
                'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy']
        };
        const input = html;
        const expected = {
            'Bulbasaur': [4, 7],
            'Ivysaur': [4, 7],
            'Venusaur': [4, 7],
            'Venusaur [Mega Forme]': [4, 7],
            'Ditto': [0]
        };
        const actual = DexUtilities.parseTypesList(jQuery, ownerDocument, DexPageParser, globals, input);
        expect(actual).toStrictEqual(expected);
    });
});

describe('Build list of evolution tree depths', () => {
    const bulbasaurFamilyEntry = [
        {'source': 'Bulbasaur', 'target': 'Ivysaur', 'condition': [
            {'condition': 'Level', 'data': '16'}
        ]},
        {'source': 'Ivysaur'  , 'target': 'Venusaur', 'condition': [
            {'condition': 'Level', 'data': '32'}
        ]},
        {'source': 'Venusaur' , 'target': 'Venusaur [Mega Forme]', 'condition': 'Venusaurite'}
    ];
    const pikachuFamilyEntry = [
        {'source': 'Pikachu', 'target': 'Raichu', 'condition': 'ThunderStone'},
        {'source': 'Raichu', 'target': 'Raichu [Mega Forme Q]', 'condition': 'Raichunite Q'},
        {'source': 'Pikachu', 'target': 'Raichu [Alolan Forme]', 'condition': 'ThunderStone near Tapu Koko'},
    ];
    const parsedFamilies = {
        'Bulbasaur': bulbasaurFamilyEntry,
        'Ivysaur': bulbasaurFamilyEntry,
        'Venusaur': bulbasaurFamilyEntry,
        'Venusaur [Mega Forme]': bulbasaurFamilyEntry,
        'Pikachu': pikachuFamilyEntry,
        'Raichu': pikachuFamilyEntry,
        'Raichu [Alolan Forme]': pikachuFamilyEntry,
        'Raichu [Mega Forme Q]': pikachuFamilyEntry,
        'Ditto': []
    };
    const dexIDs = {
        'Bulbasaur': '001',
        'Ivysaur': '002',
        'Venusaur': '003',
        'Venusaur [Mega Forme]': '003-M',
        'Pikachu': '026',
        'Raichu': '027',
        'Raichu [Alolan Forme]': '027r7',
        'Raichu [Mega Forme Q]': '027-Q',
        'Ditto': '142',
    };
    const formData = {
        'Bulbasaur': [{
            'base_number': '001',
            'base_name': 'Bulbasaur',
            'number': '001',
            'name': 'Bulbasaur'
        }],
        'Ivysaur': [{
            'base_number': '002',
            'base_name': 'Ivysaur',
            'number': '002',
            'name': 'Ivysaur'
        }],
        'Venusaur': [{
            'base_number': '003',
            'base_name': 'Venusaur',
            'number': '003',
            'name': 'Venusaur'
        }],
        'Venusaur [Mega Forme]': [{
            'base_number': '003',
            'base_name': 'Venusaur',
            'number': '003-M',
            'name': 'Venusaur [Mega Forme]'
        }],
        'Pikachu': [{
            'base_number': '026',
            'base_name': 'Pikachu',
            'number': '026',
            'name': 'Pikachu',
        }],
        'Raichu': [{
            'base_number': '027',
            'base_name': 'Raichu',
            'number': '027',
            'name': 'Raichu',
        }],
        'Raichu [Alolan Forme]': [{
            'base_number': '027',
            'base_name': 'Raichu',
            'number': '027r7',
            'name': 'Raichu [Alolan Forme]'
        }],
        'Raichu [Mega Forme Q]': [{
            'base_number': '027',
            'base_name': 'Raichu',
            'number': '027-Q',
            'name': 'Raichu [Mega Forme Q]'
        }],
        'Ditto': [{
            'base_number': '142',
            'base_name': 'Ditto',
            'number': '142',
            'name': 'Ditto'
        }],
    };
    test('Should build list of evolution tree depths', () => {
        const formMap = {
            'Bulbasaur': [{ 'name': 'Bulbasaur', 'number': '001'}],
            'Ivysaur': [{ 'name': 'Ivysaur', 'number': '002'}],
            'Venusaur': [
                {'name': 'Venusaur', 'number': '003'},
                {'name': 'Venusaur [Mega Forme]', 'number': '003-M'}
            ],
            'Venusaur [Mega Forme]': [
                {'name': 'Venusaur', 'number': '003'},
                {'name': 'Venusaur [Mega Forme]', 'number': '003-M'}
            ],
            'Pikachu': [{'name': 'Pikachu', 'number': '026'}],
            'Raichu': [
                {'name': 'Raichu', 'number': '027'},
                {'name': 'Raichu [Alolan Forme]', 'number': '027r7'},
                {'name': 'Raichu [Mega Forme Q]', 'number': '027-Q'}
            ],
            'Raichu [Alolan Forme]': [
                {'name': 'Raichu', 'number': '027'},
                {'name': 'Raichu [Alolan Forme]', 'number': '027r7'},
                {'name': 'Raichu [Mega Forme Q]', 'number': '027-Q'}
            ],
            'Raichu [Mega Forme Q]': [
                {'name': 'Raichu', 'number': '027'},
                {'name': 'Raichu [Alolan Forme]', 'number': '027r7'},
                {'name': 'Raichu [Mega Forme Q]', 'number': '027-Q'}
            ],
            'Ditto': [{ 'name': 'Ditto', 'number': '142' }],
        };
        const expected = {
            '001': { remaining: 2, total: 2},
            '002': { remaining: 1, total: 2},
            '003':  { remaining: 0, total: 2},
            '142': { remaining: 0, total: 0},
            '026': { remaining: 1, total: 1},
            '027': { remaining: 0, total: 1},
            '027r7': { remaining: 0, total: 1},
            '027-Q': { remaining: 0, total: 0},
            'Bulbasaur': { remaining: 2, total: 2},
            'Ivysaur': { remaining: 1, total: 2},
            'Venusaur':  { remaining: 0, total: 2},
            'Ditto': { remaining: 0, total: 0},
            '003-M': {remaining: 0, total: 0},
            'Venusaur [Mega Forme]': {remaining: 0, total: 0},
            'Pikachu': { remaining: 1, total: 1},
            'Raichu': { remaining: 0, total: 1},
            'Raichu [Alolan Forme]': { remaining: 0, total: 1},
            'Raichu [Mega Forme Q]': { remaining: 0, total: 0}
        };

        const actual = DexUtilities.buildEvolutionTreeDepthsList(parsedFamilies, dexIDs, formData, formMap);

        expect(actual).toStrictEqual(expected);
    });
    test('Should log an error when evolution source is missing from map', () => {
        console.error.mockClear();
        const formMap = {
            // 'Bulbasaur': [{ 'name': 'Bulbasaur', 'number': '001'}],
            'Ivysaur': [{ 'name': 'Ivysaur', 'number': '002'}],
            'Venusaur': [
                {'name': 'Venusaur', 'number': '003'},
                {'name': 'Venusaur [Mega Forme]', 'number': '003-M'}
            ],
            'Venusaur [Mega Forme]': [
                {'name': 'Venusaur', 'number': '003'},
                {'name': 'Venusaur [Mega Forme]', 'number': '003-M'}
            ],

            'Pikachu': [{'name': 'Pikachu', 'number': '026'}],
            'Raichu': [
                {'name': 'Raichu', 'number': '027'},
                {'name': 'Raichu [Alolan Forme]', 'number': '027r7'},
                {'name': 'Raichu [Mega Forme Q]', 'number': '027-Q'}
            ],
            'Raichu [Alolan Forme]': [
                {'name': 'Raichu', 'number': '027'},
                {'name': 'Raichu [Alolan Forme]', 'number': '027r7'},
                {'name': 'Raichu [Mega Forme Q]', 'number': '027-Q'}
            ],
            'Raichu [Mega Forme Q]': [
                {'name': 'Raichu', 'number': '027'},
                {'name': 'Raichu [Alolan Forme]', 'number': '027r7'},
                {'name': 'Raichu [Mega Forme Q]', 'number': '027-Q'}
            ],
            'Ditto': [{ 'name': 'Ditto', 'number': '142' }],
        };

        DexUtilities.buildEvolutionTreeDepthsList(parsedFamilies, dexIDs, formData, formMap);
        expect(console.error.mock.calls.length).toBe(4); // once for each Bulbasaur family member in parsedFamilies
    });
    test('Should log an error when evolution target is missing from map', () => {
        console.error.mockClear();
        const formMap = {
            'Bulbasaur': [{ 'name': 'Bulbasaur', 'number': '001'}],
            'Ivysaur': [{ 'name': 'Ivysaur', 'number': '002'}],
            // 'Venusaur': [
            //     {'name': 'Venusaur', 'number': '003'},
            //     {'name': 'Venusaur [Mega Forme]', 'number': '003-M'}
            // ],
            // 'Venusaur [Mega Forme]': [
            //     {'name': 'Venusaur', 'number': '003'},
            //     {'name': 'Venusaur [Mega Forme]', 'number': '003-M'}
            // ],

            'Pikachu': [{'name': 'Pikachu', 'number': '026'}],
            'Raichu': [
                {'name': 'Raichu', 'number': '027'},
                {'name': 'Raichu [Alolan Forme]', 'number': '027r7'},
                {'name': 'Raichu [Mega Forme Q]', 'number': '027-Q'}
            ],
            'Raichu [Alolan Forme]': [
                {'name': 'Raichu', 'number': '027'},
                {'name': 'Raichu [Alolan Forme]', 'number': '027r7'},
                {'name': 'Raichu [Mega Forme Q]', 'number': '027-Q'}
            ],
            'Raichu [Mega Forme Q]': [
                {'name': 'Raichu', 'number': '027'},
                {'name': 'Raichu [Alolan Forme]', 'number': '027r7'},
                {'name': 'Raichu [Mega Forme Q]', 'number': '027-Q'}
            ],
            'Ditto': [{ 'name': 'Ditto', 'number': '142' }],
        };

        DexUtilities.buildEvolutionTreeDepthsList(parsedFamilies, dexIDs, formData, formMap);
        expect(console.error.mock.calls.length).toBe(4); // once for each Bulbasaur family member in parsedFamilies
    });
});

describe('Build regional forms list', () => {
    test('Should build empty regional forms list', () => {
        const formMap = {
            'Bulbasaur': [{ 'name': 'Bulbasaur', 'number': '001'}],
            'Ivysaur': [{ 'name': 'Ivysaur', 'number': '002'}],
            'Venusaur': [
                {'name': 'Venusaur', 'number': '003'},
                {'name': 'Venusaur [Mega Forme]', 'number': '003-M'}
            ],
            'Venusaur [Mega Forme]': [
                {'name': 'Venusaur', 'number': '003'},
                {'name': 'Venusaur [Mega Forme]', 'number': '003-M'}
            ],
            'Ditto': [{ 'name': 'Ditto', 'number': '142' }],
        };
        const expected = {};

        const actual = DexUtilities.buildRegionalFormsMap(formMap);

        expect(actual).toStrictEqual(expected);
    });
    test('Should build regional forms list', () => {
        const formMap = {
            'Rattata': [
                {'name': 'Rattata', 'number': '019'},
                {'name': 'Rattata [Alolan Forme]', 'number': '019r7'}
            ],
            'Raticate': [
                {'name': 'Raticate', 'number': '020'},
                {'name': 'Raticate [Alolan Forme]', 'number': '020r7'}
            ],
            'Rattata [Alolan Forme]': [
                {'name': 'Rattata', 'number': '019'},
                {'name': 'Rattata [Alolan Forme]', 'number': '019r7'}
            ],
            'Raticate [Alolan Forme]': [
                {'name': 'Raticate', 'number': '020'},
                {'name': 'Raticate [Alolan Forme]', 'number': '020r7'}
            ],
        };
        const expected = {
            'Rattata': ['Rattata', 'Rattata [Alolan Forme]'],
            'Raticate': ['Raticate', 'Raticate [Alolan Forme]']
        };

        const actual = DexUtilities.buildRegionalFormsMap(formMap);

        expect(actual).toStrictEqual(expected);
    });
});

describe('Build map of egg PNGs to types', () => {
    test('Should build egg PNGs to types map', () => {
        const baseNamesList = {
            'Bulbasaur': 'Bulbasaur',
            'Ditto': 'Ditto',
            'Rattata': 'Rattata',
            'Rattata [Alolan Forme]': 'Rattata'
        };
        const eggPngsList = {
            'Bulbasaur': 'pkmn/c/0/7.png/t=1478697860',
            'Ditto': 'pkmn/e/h/x.png/t=1478697860',
            'Rattata': 'pkmn/5/j/w.png/t=1478697860',
            'Rattata [Alolan Forme]': 'pkmn/s/y/w/b.png/t=1485174869'
        };
        const typesList = {
            'Bulbasaur': [4, 7],
            'Ditto': [0],
            'Rattata': [0],
            'Rattata [Alolan Forme]': [0, 15]
        };
        const expected = {
            'Bulbasaur': {
                'pkmn/c/0/7.png/t=1478697860': [4,7]
            },
            'Ditto': {
                'pkmn/e/h/x.png/t=1478697860': [0]
            },
            'Rattata': {
                'pkmn/5/j/w.png/t=1478697860': [0],
                'pkmn/s/y/w/b.png/t=1485174869': [0, 15]
            }
        };

        const actual = DexUtilities.buildEggPngsTypesMap(baseNamesList, eggPngsList, typesList);

        expect(actual).toStrictEqual(expected);
    });
});