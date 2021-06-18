// eslint-disable-next-line no-unused-vars
class DexUtilities {
    /*
     * Load the main dex page.
     * Note: Testing this would essentially be testing jQuery, so no need to test
     * Inputs:
     * - $ - reference to jQuery
     * Outputs:
     * - (anonymous) - A Promise that will be resolved when the page is loaded
     */
    static getMainDexPage($) {
        return $.get('https://pokefarm.com/dex');
    }
    /*
     * Load the dex page for a pokemon.
     * Inputs:
     * - $ - reference to jQuery
     * - id - dex ID number to load
     * Outputs:
     * - (anonymous) - A promise that will be resolved when the page is loaded
     */
    static getPokemonDexPage($, id) {
        return $.get('https://pokefarm.com/dex/' + id);
    }
    /*
     * Loads the dex pages for the pokemon whose dex numbers are in the dexNumbers input
     * Inputs:
     * - $ - reference to jQuery
     * - dexNumbers - an array containing dex IDs
     *                Example: ["001", "002", "003", "004"];
     * - progressBar - a <progress> tag that will show how many of the IDs in
     *                 'dexNumbers' have been loaded
     * - progressSpan - a <span> tag that will contain text about the progress
     *                  of loading the dex pages
     * Outputs:
     * - (anonymous) - A Promise that will be resolved when all the dex pages
     *                 have been loaded
     */
    static loadDexPages($, dexNumbers, progressBar, progressSpan) {
        const requests = [];
        progressBar.value = 0;
        progressSpan.textContent = 'Loading Pokedex info. Please wait until this is complete...';

        for(let d = 0; d < dexNumbers.length; d++) {
            /*
             * if the dex number is 000, the user has not seen the pokemon,
             * so just increment the progress bar value
             */
            if(dexNumbers[d] === '000') {
                progressBar.value = progressBar['value'] + 1;
                progressSpan.textContent = `Loaded ${progressBar['value']} of ${dexNumbers.length} Pokemon`;
            } else {
                // eslint-disable-next-line no-unused-vars
                const r = DexUtilities.getPokemonDexPage($, dexNumbers[d]).then((data, status, jqXHR) => {
                    progressBar.value = progressBar.value + 1;
                    progressSpan.textContent = `Loaded ${progressBar['value']} of ${dexNumbers.length} Pokemon`;
                    return data;
                }, (error) => {
                    console.log(error);
                });
                requests.push(r);
            }
        }

        // return $.when.apply(undefined, requests);
        return Promise.all(requests);
    } // loadDexPages
    /*
     * Loads the dex pages for the forms of a pokemon
     * Inputs:
     * - $ - reference to jQuery
     * - firstFormHTML - An array containing the HTML for the dex pages for a set of pokemon.
     *                   The HTML in this array will be parsed to find the forms of a pokemon
     * - progressBar - a <progress> tag that will show how many of the IDs in
     *                 'dexNumbers' have been loaded
     * - progressSpan - a <span> tag that will contain text about the progress
     *                  of loading the dex pages
     * Outputs:
     * - (anonymous) - A Promise that will be resolved when all the forms' dex pages
     *                 have been loaded
     */
    static loadFormPages($, ownerDocument, firstFormHTML, progressBar, progressSpan) {
        const requests = [];
        for(let a = 0; a < firstFormHTML.length; a++) {
            const data = firstFormHTML[a];
            // load data from pages for other forms
            const formLinks = $(data, ownerDocument).find('.formeregistration a');
            if(formLinks.length) {
                progressBar['max'] = progressBar['max'] + formLinks.length;
                for(let i = 0; i < formLinks.length; i++) {
                    const link = formLinks.eq(i).attr('href');
                    const r = DexUtilities.getPokemonDexPage($, link.substring('/dex/'.length))
                        .then((formHTML) => {
                            progressBar.value = progressBar['value'] + 1;
                            progressSpan.textContent = `Loaded ${progressBar['value']} of ${progressBar['max']} Pokemon`;
                            return formHTML;
                        }, (error) => {
                            console.log(error);
                        });
                    requests.push(r);
                }
            }
        } // for

        return Promise.all(requests);
    } // loadFormPages
    /*
     * Parses HTML from pokedex pages
     * Inputs:
     * - $ - reference to jQuery
     * - ownerDocument - reference to virtual document to load HTML into
     * - args - an array of HTML from pokedex pages
     * Outputs:
     * - flat_families - See DexPageParser.parseEvolutionTreeFromDexPage for details
     * - dex_id_map - object mapping dex IDs to pokemon's names. Used to track which
     *                pokemon's dex pages have been processed
     */
    static parseEvolutionTrees($, ownerDocument, dexPageParser, evolutionTreeParser, args) {
        const flatFamilies = {};
        const dexIDMap = {};

        for(let a = 0; a < args.length; a++) {
            const data = $(args[a], ownerDocument);
            const rootName = dexPageParser.getInfoFromDexPageHeader(data).name;

            /*
             * the evolution tree won't have the dex ID for the form of the pokemon that we're currently using
             * use the footbar to get the full pokedex number for the current form
             */
            const fullIDNumber = dexPageParser.getInfoFromDexPageFooter(data).shortlinkNumber;

            // if the root name is already in in the flat files, but the root of the tree is not in the dexIDMap
            if((!(rootName in flatFamilies)) || (!(rootName in dexIDMap))) {
                dexIDMap[rootName] = fullIDNumber;

                const flattened = dexPageParser.parseEvolutionTreeFromDexPage(evolutionTreeParser, data, dexIDMap);

                // copy the data into the global object to prevent loading data multiple times
                if(flattened.evolutions.length) {
                    for(let i = 0; i < flattened.members.length; i++) {
                        flatFamilies[flattened.members[i]] = flattened.evolutions;
                    }
                } else {
                    flatFamilies[rootName] = flattened.evolutions;
                }
            } // if not in flatFamilies
        } // for a

        return [flatFamilies, dexIDMap];
    } // parseEvolutionTrees

    static buildEvolutionTreeDepthsList(parsedFamilies, dexIDs, formData, formMap) {
        /*
         * store the maximum depth of the evolution tree for each pokemon
         * for highlighting each pokemon based on how fully evolved they are
         * https://github.com/jpgualdarrama/PokeFarmQoL/issues/11
         */
        const maxEvoTreeDepth = {};
        for(const pokemon in parsedFamilies) {
            const evolutions = parsedFamilies[pokemon];

            /*
             * filter out "evolutions" that are really changes between forms of the
             * same pokemon
             */
            for(let i = evolutions.length - 1; i>= 0; i--) {
                if(formMap[evolutions[i].source] === undefined) {
                    console.error(`Could not find form data for ${evolutions[i].source}`);
                } else {
                    if(formMap[evolutions[i].target] === undefined) {
                        console.error(`Could not find form data for ${evolutions[i].target}`);
                    } else if(JSON.stringify(formMap[evolutions[i].source]) === JSON.stringify(formMap[evolutions[i].target])) {
                        evolutions.splice(i, 1);
                    }
                }
            }

            if(!(pokemon in maxEvoTreeDepth)) {
                if(evolutions.length) {
                    // initialize new entries in the structure
                    maxEvoTreeDepth[pokemon] = {
                        'remaining': 0, 'total': 0
                    };
                    maxEvoTreeDepth[dexIDs[pokemon]] = {
                        'remaining': 0, 'total': 0
                    };

                    const sourcesList = evolutions.map( el => el.source );

                    // don't redo the processing if the root of the tree is already in the list
                    if(sourcesList[0] in maxEvoTreeDepth && pokemon !== sourcesList[0]) {
                        // data for all evolutions is added when the first pokemon is added
                        continue;
                    }

                    const evoTree = {};

                    for(let i = evolutions.length - 1; i >= 0; i--) {
                        const evolution = evolutions[i];
                        const source = evolution.source;
                        const target = evolution.target;

                        if(sourcesList.indexOf(target) == -1) {
                            evoTree[target] = {
                                [target]: []
                            };
                        }

                        if(!(source in evoTree)) {
                            evoTree[source] = {
                                [source]: [evoTree[target]]
                            };
                        } else {
                            evoTree[source][source].push(evoTree[target]);
                        }
                    }

                    const finalTree = evoTree[sourcesList[0]];
                    const createPaths = function(stack, tree, paths) {
                        const name = Object.keys(tree)[0];
                        const children = tree[name];
                        const numChildren = children.length;

                        // append this node to the path array
                        stack.push(name);
                        if(numChildren === 0) {
                            // append all of its children
                            paths.push(stack.reverse().join('|'));
                            stack.reverse();
                        } else {
                            // otherwise try subtrees
                            for(let i = 0; i < numChildren; i++) {
                                createPaths(stack, children[i], paths);
                            }
                        }
                        stack.pop();
                    };
                    const parseEvolutionPaths = function(tree) {
                        const paths = [];
                        createPaths([], tree, paths);

                        /*
                         * get remaining number of evolutions in each path and total number
                         * of evolutions along each path
                         */
                        const pokemonPathData = {};
                        for(let p = 0; p < paths.length; p++) {
                            const mons = paths[p].split('|');
                            for(let m = 0; m < mons.length; m++) {
                                // first or only appearance
                                if(!(mons[m] in pokemonPathData)) {
                                    pokemonPathData[mons[m]] = {
                                        'remaining': m, 'total': mons.length - 1
                                    };
                                }
                                // pokemon has multiple evolution paths
                                else {
                                    const remaining = pokemonPathData[mons[m]].remaining;
                                    const total = pokemonPathData[mons[m]].total;
                                    pokemonPathData[mons[m]].remaining = (remaining + m) / 2;
                                    pokemonPathData[mons[m]].total = (total + mons.length - 1) / 2;
                                }
                            }
                        }

                        // return paths.map((p) => { return p.split('|').length })
                        return pokemonPathData;
                    };
                    // - 1 because there is one less evolution then there are pokemon
                    const parsedPathData = parseEvolutionPaths(finalTree);
                    for(const p in parsedPathData) {
                        maxEvoTreeDepth[p] = parsedPathData[p];
                        maxEvoTreeDepth[dexIDs[p]] = parsedPathData[p];
                    }
                    /*
                     * maxEvoTreeDepth[pokemon] = Math.max(...parseEvolutionPaths(finalTree)) - 1;
                     * maxEvoTreeDepth[dexIDs[pokemon]] = maxEvoTreeDepth[pokemon]
                     */
                } // if evolutions.length
                // add pokemon that don't evolve
                else {
                    maxEvoTreeDepth[pokemon] = {
                        'remaining': 0, 'total': 0
                    };
                    maxEvoTreeDepth[dexIDs[pokemon]] = maxEvoTreeDepth[pokemon];
                }
            } // if not in maxEvoTreeDepth
        } // for pokemon in parsedFamilies

        return maxEvoTreeDepth;

    } // buildEvolutionTreeDepthsList

    static parseFormData($, ownerDocument, dexPageParser, args) {
        const formData = {};
        const formMap = {};

        /*
         * because the evolution tree for all the members of a single family will have the same text,
         * use the text as a key in families
         * use the ownerDocument parameter to jQuery to stop jQuery from loading images and audio files
         */
        for(let a = 0; a < args.length; a++) {
            const data = $(args[a], ownerDocument);
            const headerInfo = dexPageParser.getInfoFromDexPageHeader(data);
            const footerInfo = dexPageParser.getInfoFromDexPageFooter(data);

            // use the footbar to get the full pokedex number for the current form
            const currentNumber = footerInfo.shortlinkNumber;

            (formData[headerInfo.name] = formData[headerInfo.name] || []).push({
                // dex number of the base pokemon
                // eslint-disable-next-line camelcase
                base_number: headerInfo.base_number,
                // name of the base pokemon
                // eslint-disable-next-line camelcase
                base_name: headerInfo.base_name,
                // dex number of the form
                number: currentNumber,
                // name of the form
                name: headerInfo.name
            });
        } // for a

        // reorganize forms to all be under the base
        for(const name in formData) {
            for(let i = 0; i < formData[name].length; i++) {
                (formMap[formData[name][i].base_name] = formMap[formData[name][i].base_name] || []).push({
                    name: formData[name][i].name,
                    number: formData[name][i].number
                });
            } // i
        } // name

        // duplicate data from base pokemon into entries for each form
        for(const name in formData) {
            for(let i = 0; i < formData[name].length; i++) {
                if(formData[name][i].base_name !== formData[name][i].name) {
                    // formMap[formData[name][i].number] = formMap[formData[name][i].base_name];
                    formMap[formData[name][i].name] = formMap[formData[name][i].base_name];
                }
            }
        }

        return [formData, formMap];
    } // parseFormData

    /*
     * base_names = {
     * 'Rattata' : 'Rattata',
     * 'Rattata [Alolan Forme]' : 'Rattata',
     * 'Raticate [Alolan Totem Forme]' : 'Raticate'
     * }
     */
    static parseBaseNames($, ownerDocument, dexPageParser, args) {
        const list = {};
        for(let a = 0; a <args.length; a++) {
            const data = $(args[a], ownerDocument);
            const headerInfo = dexPageParser.getInfoFromDexPageHeader(data);
            list[headerInfo.name] = headerInfo.base_name;
        }
        return list;
    }

    /*
     * egg_pngs = {
     * 'Rattata' : '... .png',
     * 'Rattata [Alolan Forme]' : '... .png'
     * }
     */
    static parseEggsPngsList($, ownerDocument, dexPageParser, args) {
        const list = {};
        for(let a = 0; a <args.length; a++) {
            const data = $(args[a], ownerDocument);
            const headerInfo = dexPageParser.getInfoFromDexPageHeader(data);
            const name = headerInfo.name;
            const eggUrl = dexPageParser.parseEggPngFromDexPage(data);

            if(eggUrl) {
                list[name] = eggUrl;
            }
        }
        return list;
    }

    /*
     * types = {
     * 'Rattata' : [Normal],
     * 'Raticate' : [Normal],
     * 'Rattata [Alolan Forme]' : [Normal, Dark],
     * 'Raticate [Alolan Forme]' : [Normal, Dark]
     * }
     */
    static parseTypesList($, ownerDocument, dexPageParser, globals, args) {
        const list = {};
        for(let a = 0; a < args.length; a++) {
            const data = $(args[a], ownerDocument);
            const headerInfo = dexPageParser.getInfoFromDexPageHeader(data);
            const name = headerInfo.name;
            const types = dexPageParser.parseTypesFromDexPage(data, globals.TYPE_LIST);

            list[name] = types;
        }
        return list;
    }

    static buildRegionalFormsMap(formMap) {
        const regionalFormData = {};

        const REGIONAL_NAME_MARKERS = ['Kantonian',
            'Johtoian', // unused
            'Hoennian', // unused
            'Sinnohian', // unused
            'Unovan',
            'Kalosian', // unused
            'Alolan',
            'Galarian'];

        const allSpecies = Object.keys(formMap);
        const checkedSpecies = {};
        for(let i = 0; i < allSpecies.length; i++) {
            const current = allSpecies[i];
            const base = (current.indexOf('[') > -1) ? current.substring(0, current.indexOf('[')).trim() : current;
            if(!Object.prototype.hasOwnProperty.call(checkedSpecies, base)) {
                checkedSpecies[base] = true;

                const formNames = formMap[base].map((e) => e.name);

                /*
                 * if any of the names have one of the regional markers,
                 * add the regional names to the list
                 */
                let formWithMarkers = formNames.filter((n) => {
                    return REGIONAL_NAME_MARKERS.filter((r) => n.indexOf(`${r}`) > -1).length > 0;
                });

                /*
                 * filter out megas/totems
                 * these are filtered out this way to allow for Galarian Zen Mode Darmanitan
                 */
                formWithMarkers = formWithMarkers.filter((n) => n.indexOf('Mega Forme') == -1);
                formWithMarkers = formWithMarkers.filter((n) => n.indexOf('Totem Forme') == -1);

                if(formWithMarkers && formWithMarkers.length) {
                    (regionalFormData[base] = regionalFormData[base] || []).push(base);
                    regionalFormData[base] = regionalFormData[base].concat(formWithMarkers);
                }
            }
        }

        return regionalFormData;
    }

    /*
     * egg_pngs_types_map = {
     * 'Rattata' : {
     *       <kantonian.png> : [Normal],
     *       <alolan.png> : [Normal, Dark],
     *    }
     * }
     */
    static buildEggPngsTypesMap(baseNamesList, eggPngsList, typesList) {
        const map = {};
        for(const name in eggPngsList) {
            const base = baseNamesList[name];
            const png = eggPngsList[name];
            const types = typesList[name];
            (map[base] = map[base] || {})[png] = types;
        }

        return map;
    }

} // DexUtilities