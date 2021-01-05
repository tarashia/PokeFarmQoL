const DexPageParser = require('../requires/utils/dexPageParser.js');
const EvolutionTreeParser = require('../requires/utils/evolutionTreeParser.js');
const jQuery = require('../node_modules/jquery/dist/jquery.min.js');
const testTools = require('./testTools');

const ownerDocument = document.implementation.createHTMLDocument('virtual');

describe('Parse the header from a dex page', () => {
    test('Should parse the header successfully when a pokemon has a form', () => {
        const html = testTools.loadDexFile('003-M');
        const input = jQuery(html, ownerDocument);

        const output = {
            // eslint-disable-next-line camelcase
            base_number: '003',
            // eslint-disable-next-line camelcase
            base_name: 'Venusaur',
            name: 'Venusaur [Mega Forme]'
        };

        expect(DexPageParser.getInfoFromDexPageHeader(input)).toEqual(output);
    });
    test('Should parse the header successfully when a pokemon does not have a form', () => {
        const html = testTools.loadDexFile('004');
        const input = jQuery(html, ownerDocument);
        
        const output = {
            // eslint-disable-next-line camelcase
            base_number: '004',
            // eslint-disable-next-line camelcase
            base_name: 'Charmander',
            name: 'Charmander'
        };

        expect(DexPageParser.getInfoFromDexPageHeader(input)).toEqual(output);
    });
});

describe('Parse the footer from a dex page', () => {
    test('Should parse the footer successfully', () => {
        const html = testTools.loadDexFile('003-M');
        const input = jQuery(html, ownerDocument);

        const output = {
            shortlink: '/shortlinks/save/dex/003-M',
            // eslint-disable-next-line camelcase
            shortlink_number: '003-M'
        };

        expect(DexPageParser.getInfoFromDexPageFooter(input)).toEqual(output);

    });
});

describe('Parse the types of a pokemon from a dex page', () => {
    const typeList =['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];
    test('Should parse the list of types when a pokemon has two types', () => {
        const html = testTools.loadDexFile('003-M');
        const input = jQuery(html, ownerDocument);
        const output = [4, 7];

        expect(DexPageParser.parseTypesFromDexPage(input, typeList)).toEqual(output);

    });
    test('Should parse the list of types when a pokemon has one type', () => {
        const html = testTools.loadDexFile('004');
        const input = jQuery(html, ownerDocument);
        const output = [1];

        expect(DexPageParser.parseTypesFromDexPage(input, typeList)).toEqual(output);

    });
});

describe('Parse egg png link from dex page', () => {
    test('Should successfully parse the egg PNG for a pokemon that has an egg', () => {
        const html = testTools.loadDexFile('004');
        const input = jQuery(html, ownerDocument);
        const output = 'pkmn/f/d/w.png/t=1478697860';

        expect(DexPageParser.parseEggPngFromDexPage(input)).toEqual(output);
    });
    test('Should return empty string for a pokemon that has does not hatch from an egg', () => {
        const html = testTools.loadDexFile('003-M');
        const input = jQuery(html, ownerDocument);
        const output = '';

        expect(DexPageParser.parseEggPngFromDexPage(input)).toEqual(output);
        
    });
});

describe('Parse the evolution tree from a dex page', () => {
    test('Should extract the evolution tree from the dex page', () => {
        const html = testTools.loadDexFile('004');
        const input = jQuery(html, ownerDocument);
        const dexIDMap = {};
        const output = {
            'members': [
                'Charmander',
                'Charmeleon',
                'Charizard',
                'Charizard [Mega Forme X]',
                'Charizard [Mega Forme Y]'
            ],
            'evolutions': [
                {'source': 'Charmander', 'target': 'Charmeleon', 'condition': [{'condition': 'Level', 'data': '16'}]},
                {'source': 'Charmeleon', 'target': 'Charizard', 'condition': [{'condition': 'Level', 'data': '36'}]},
                {'source': 'Charizard', 'target': 'Charizard [Mega Forme X]', 'condition': 'Charizardite X'},
                {'source': 'Charizard', 'target': 'Charizard [Mega Forme Y]', 'condition': 'Charizardite Y'},
            ]
        };
        const actualOutput = DexPageParser.parseEvolutionTreeFromDexPage(EvolutionTreeParser, input, dexIDMap);

        expect(actualOutput).toEqual(output);

    });
});
