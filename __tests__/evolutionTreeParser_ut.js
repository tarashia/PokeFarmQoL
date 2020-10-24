const EvolutionTreeParser = require("../requires/utils/evolutionTreeParser.js");
const jQuery = require("../node_modules/jquery/dist/jquery.min.js");
const fs = require("fs");
const path = require("path");

describe("Parse contents of an <li> element from the evolution tree div of a dex page", () => {
    test("Should parse <li> contents", () => {

        const background_image_url = "https://pfq-static.com/img/pkmn/g/z/w.png/t=1497523499";
        const li = jQuery(`<li>` +
                          `<span class="condition">Level 20</span>` +
                          `<span class="name">` +
                          `<span class="icon" style="background-image:url('${background_image_url}')">` +
                          `</span>` +
                          `<a href="/dex/020">Raticate</a>` +
                          `</span>` +
                          `</li>`);
        const dex_id_map = {
            'Rattata': '019',
            'Raticate': '020',
        };
        const output = {
            "Raticate": {
                "condition": jQuery('<span class="condition">Level 20</span>')[0],
                "evolutions": []
            }
        };

        expect(EvolutionTreeParser._parseEvolutionLi(li, dex_id_map)).toEqual(output);
    });
});

describe("Parses the contents of an <ul> element from the evolution tree div of a dex page", () => {
    test("Should parse <ul> contents with no nested evolutions", () => {
        const file = path.join(__dirname, "./", "ul_no_nested_evolutions.html");
        const html = fs.readFileSync(file, "utf8", 'r');
        const ul = jQuery(html);
        const dex_id_map = {
            'Rattata': '019',
            'Raticate': '020',
        };
        const output = {
            "Raticate": {
                "condition": jQuery('<span class="condition">Level 20</span>')[0],
                "evolutions": []
            }
        };

        expect(EvolutionTreeParser._parseEvolutionUl(ul, dex_id_map)).toEqual(output);        
    });
    test("Should parse <ul> contents with nested evolutions", () => {

        const file = path.join(__dirname, "./", "ul_nested_evolutions.html");
        const html = fs.readFileSync(file, "utf8", 'r');
        const ul = jQuery(html);
        const dex_id_map = {
            'Eevee': '143',
            'Vaporeon': '144',
            'Vaporeon [Mega Forme Q]': '144-Q',
        };
        const output = {
            "Vaporeon": {
                "condition": jQuery('<span class="condition">Water Stone</span>')[0],
                "evolutions": [
                    {
                        "Vaporeon [Mega Forme Q]": {
                            "condition": jQuery('<span class="condition">' +
                                                '<img src="https://pfq-static.com/img/pkmn/mega.png/t=1400179603"/>' +
                                                ' Vaporeonite Q</span>')[0],
                            "evolutions": []
                        }
                    }
                ]
            },
            "Jolteon": {
                "condition": jQuery('<span class="condition">ThunderStone</span>')[0],
                "evolutions": [
                    {
                        "Jolteon [Mega Forme Q]": {
                            "condition": jQuery('<span class="condition">' +
                                                '<img src="https://pfq-static.com/img/pkmn/mega.png/t=1400179603"/>' +
                                                ' Jolteonite Q</span>')[0],
                            "evolutions": []
                        }
                    }
                ]
            },            
            "Flareon": {
                "condition": jQuery('<span class="condition">Fire Stone</span>')[0],
                "evolutions": [
                    {
                        "Flareon [Mega Forme Q]": {
                            "condition": jQuery('<span class="condition">' +
                                                '<img src="https://pfq-static.com/img/pkmn/mega.png/t=1400179603"/>' +
                                                ' Flareonite Q</span>')[0],
                            "evolutions": []
                        }
                    }
                ]
            },            
            "Umbreon": {
                "condition": jQuery('<span class="condition">Happiness during Nighttime</span>')[0],
                "evolutions": [
                    {
                        "Umbreon [Mega Forme Q]": {
                            "condition": jQuery('<span class="condition">' +
                                                '<img src="https://pfq-static.com/img/pkmn/mega.png/t=1400179603"/>' +
                                                ' Umbreonite Q</span>')[0],
                            "evolutions": []
                        }
                    }
                ]
            },            
            "Espeon": {
                "condition": jQuery('<span class="condition">Happiness during Daytime</span>')[0],
                "evolutions": [
                    {
                        "Espeon [Mega Forme Q]": {
                            "condition": jQuery('<span class="condition">' +
                                                '<img src="https://pfq-static.com/img/pkmn/mega.png/t=1400179603"/>' +
                                                ' Espeonite Q</span>')[0],
                            "evolutions": []
                        }
                    }
                ]
            },            
            "Leafeon": {
                "condition": jQuery('<span class="condition">In Grass-type Field</span>')[0],
                "evolutions": [
                    {
                        "Leafeon [Mega Forme Q]": {
                            "condition": jQuery('<span class="condition">' +
                                                '<img src="https://pfq-static.com/img/pkmn/mega.png/t=1400179603"/>' +
                                                ' Leafeonite Q</span>')[0],
                            "evolutions": []
                        }
                    }
                ]
            },            
            "Glaceon": {
                "condition": jQuery('<span class="condition">In Ice-type Field</span>')[0],
                "evolutions": [
                    {
                        "Glaceon [Mega Forme Q]": {
                            "condition": jQuery('<span class="condition">' +
                                                '<img src="https://pfq-static.com/img/pkmn/mega.png/t=1400179603"/>' +
                                                ' Glaceonite Q</span>')[0],
                            "evolutions": []
                        }
                    }
                ]
            },            
            "Sylveon": {
                "condition": jQuery('<span class="condition">Affection</span>')[0],
                "evolutions": [
                    {
                        "Sylveon [Mega Forme Q]": {
                            "condition": jQuery('<span class="condition">' +
                                                '<img src="https://pfq-static.com/img/pkmn/mega.png/t=1400179603"/>' +
                                                ' Sylveonite Q</span>')[0],
                            "evolutions": []
                        }
                    }
                ]
            },            
        };

        expect(EvolutionTreeParser._parseEvolutionUl(ul, dex_id_map)).toEqual(output);        
    });
});

describe("Parses the content of an evolution tree of a dex page", () => {
    test("Should parse evolution tree containing no evolutions", () => {
        const root = 'Ditto';

        const file = path.join(__dirname, "./", "parseEvolutionTree_noEvolutions.html");
        const html = fs.readFileSync(file, "utf8", 'r');
        const evotree = jQuery(html);
        const dex_id_map = {};

        const output = {
            "members": ["Ditto"],
            "evolutions": []
        };
        expect(EvolutionTreeParser.parseEvolutionTree(root, evotree, dex_id_map)).toEqual(output);
    });
    test("Should parse evolution tree containing evolutions from one of the evolution's pages", () => {
        const root = "Bulbasaur";
        const file = path.join(__dirname, "./", "parseEvolutionTree_evolutionsNotFromRoot.html");
        const html = fs.readFileSync(file, "utf8", 'r');
        const evotree = jQuery(html);
        const dex_id_map = {};

        const output = {
            'members': [
                'Bulbasaur',
                'Ivysaur',
                'Venusaur',
                'Venusaur [Mega Forme]'
            ],
            'evolutions': [
                {'source': 'Bulbasaur', 'target': 'Ivysaur', 'condition': [{'condition': 'Level', 'data': '16'}]},
                {'source': 'Ivysaur', 'target': 'Venusaur', 'condition': [{'condition': 'Level', 'data': '32'}]},
                {'source': 'Venusaur', 'target': 'Venusaur [Mega Forme]', 'condition': 'Venusaurite'}
            ]
        };
        expect(EvolutionTreeParser.parseEvolutionTree(root, evotree, dex_id_map)).toEqual(output);
    });
    test("Should parse evolution tree containing evolutions from the base pokemon's page", () => {
        const root = 'Eevee';
        const file = path.join(__dirname, "./", "parseEvolutionTree_evolutions.html");
        const html = fs.readFileSync(file, "utf8", 'r');
        const evotree = jQuery(html);
        const dex_id_map = {};

        const output = {
            'members': ['Eevee',
                        'Vaporeon', 'Vaporeon [Mega Forme Q]',
                        'Jolteon', 'Jolteon [Mega Forme Q]',
                        'Flareon', 'Flareon [Mega Forme Q]',
                        'Umbreon', 'Umbreon [Mega Forme Q]',
                        'Espeon', 'Espeon [Mega Forme Q]',
                        'Glaceon', 'Glaceon [Mega Forme Q]',
                        'Leafeon', 'Leafeon [Mega Forme Q]',
                        'Sylveon', 'Sylveon [Mega Forme Q]'
                       ],
            'evolutions': [
                {'source': 'Eevee', 'target': 'Vaporeon', 'condition': 'Water Stone'},
                {'source': 'Eevee', 'target': 'Jolteon', 'condition': 'ThunderStone'},
                {'source': 'Eevee', 'target': 'Flareon', 'condition': 'Fire Stone'},
                {'source': 'Eevee', 'target': 'Umbreon', 'condition': 'Happiness during Nighttime'},
                {'source': 'Eevee', 'target': 'Espeon', 'condition': 'Happiness during Daytime'},
                {'source': 'Eevee', 'target': 'Glaceon', 'condition': 'In Ice-type Field'},
                {'source': 'Eevee', 'target': 'Leafeon', 'condition': 'In Grass-type Field'},
                {'source': 'Eevee',  'target': 'Sylveon', 'condition': 'Affection'},
                {'source': 'Vaporeon','target': 'Vaporeon [Mega Forme Q]','condition': 'Vaporeonite Q'},
                {'source': 'Jolteon', 'target':  'Jolteon [Mega Forme Q]', 'condition': 'Jolteonite Q'},
                {'source': 'Flareon', 'target':  'Flareon [Mega Forme Q]', 'condition': 'Flareonite Q'},
                {'source': 'Umbreon', 'target':  'Umbreon [Mega Forme Q]', 'condition': 'Umbreonite Q'},
                {'source': 'Espeon',  'target':   'Espeon [Mega Forme Q]',  'condition': 'Espeonite Q'},
                {'source': 'Glaceon', 'target':  'Glaceon [Mega Forme Q]', 'condition': 'Glaceonite Q'},
                {'source': 'Leafeon', 'target':  'Leafeon [Mega Forme Q]', 'condition': 'Leafeonite Q'},
                {'source': 'Sylveon', 'target':  'Sylveon [Mega Forme Q]', 'condition': 'Sylveonite Q'},
            ]
        };

        // sort the result and output so the order doesn't matter
        const output_members = output.members.sort();
        const output_evolutions = output.evolutions.sort((a,b) => {
            const a_key = a.target.toUpperCase() + "_" + a.condition.toUpperCase();
            const b_key = b.target.toUpperCase() + "_" + b.condition.toUpperCase();
            return (a_key < b_key) ? 1 : ((a_key > b_key) ? -1 : 0);
        });

        const result = EvolutionTreeParser.parseEvolutionTree(root, evotree, dex_id_map);
        const result_members = result.members.sort();
        const result_evolutions = result.evolutions.sort((a,b) => {
            const a_key = a.target.toUpperCase() + "_" + a.condition.toUpperCase();
            const b_key = b.target.toUpperCase() + "_" + b.condition.toUpperCase();
            return (a_key < b_key) ? 1 : ((a_key > b_key) ? -1 : 0);
        });
        expect(result_members).toEqual(output_members);
        expect(result_evolutions).toEqual(output_evolutions);
    });
});

describe("Parse the HTML in the conditions list from the flattened object.", () => {
    test("Parse evolution conditions containing Happiness in the condition", () => {
        const input = {
            "members": ["MockPokemon1", "MockPokemon2", "MockPokemon3"],
            "evolutions": [
                {"source": 'MockPokemon1', "target": 'MockPokemon2', 
                 'condition': jQuery('<span class="condition">Level 20 Happiness</span>')[0]},
                {"source": 'MockPokemon2', "target": 'MockPokemon3', 
                 'condition': jQuery('<span class="condition">Happiness</span>')[0]},
            ]
        };
        const output = {
            "members": ["MockPokemon1", "MockPokemon2", "MockPokemon3"],
            "evolutions": [
                {"source": 'MockPokemon1', "target": 'MockPokemon2', 'condition':
                 [
                     {'condition': 'Level', 'data': '20'},
                     {'condition': 'Happiness', 'data': ''},
                 ]
                },
                {"source": 'MockPokemon2', "target": 'MockPokemon3', 'condition': 'Happiness'}
            ]
        };

        EvolutionTreeParser._parseEvolutionConditions(input);
        expect(input).toEqual(output);
    });
    test("Parse evolution conditions containing Level evolution with another condition", () => {
        const input = {
            'members': [
                'MockPokemon1',
                'MockPokemon2',
                'MockPokemon3'
            ],
            'evolutions': [
                {'source': 'MockPokemon1', 'target': 'MockPokemon2', 'condition':
                 jQuery('<span class="condition">Unhappiness Level 16</span>')[0]
                },
                {'source': 'MockPokemon2', 'target': 'MockPokemon3', 'condition':
                 jQuery('<span class="condition">Level 20 on Females</span>')[0]
                }
            ]
        };
            
        const output = {
            'members': [
                'MockPokemon1',
                'MockPokemon2',
                'MockPokemon3'
            ],
            'evolutions': [
                {'source': 'MockPokemon1', 'target': 'MockPokemon2', 'condition':
                 [
                     {'condition': 'Level', 'data': '16'},
                     {'condition': 'Unhappiness', 'data': ''},
                 ]
                },
                {'source': 'MockPokemon2', 'target': 'MockPokemon3', 'condition':
                 [
                     {'condition': 'Level', 'data': '20'},
                     {'condition': 'on Females', 'data': ''}
                 ]
                },
            ]
        };

        EvolutionTreeParser._parseEvolutionConditions(input);
        expect(input).toEqual(output);
    });
});
