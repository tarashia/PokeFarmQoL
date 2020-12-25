// eslint-disable-next-line no-unused-vars
class DexUtilities {
    /* Load the main dex page.
     * Note: Testing this would essentially be testing jQuery, so no need to test
     * Inputs:
     * - $ - reference to jQuery
     * Outputs:
     * - (anonymous) - A Promise that will be resolved when the page is loaded
     */
    static getMainDexPage($) {
        return $.get('https://pokefarm.com/dex');
    }
    /* Load the dex page for a pokemon.
     * Inputs:
     * - $ - reference to jQuery
     * - id - dex ID number to load
     * Outputs:
     * - (anonymous) - A promise that will be resolved when the page is loaded
     */
    static getPokemonDexPage($, id) {
        return $.get('https://pokefarm.com/dex/' + id);
    }
    /* Loads the dex pages for the pokemon whose dex numbers are in the dexNumbers input
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
        let requests = [];
        progressBar.value = 0;
        progressSpan.textContent = 'Loading Pokedex info. Please wait until this is complete...';

        for(let d = 0; d < dexNumbers.length; d++) {
            // if the dex number is 000, the user has not seen the pokemon,
            // so just increment the progress bar value
            if(dexNumbers[d] === '000') {
                progressBar.value = progressBar['value'] + 1;
                progressSpan.textContent = `Loaded ${progressBar['value']} of ${dexNumbers.length} Pokemon`;
            } else {
                // eslint-disable-next-line no-unused-vars
                let r = DexUtilities.getPokemonDexPage($, dexNumbers[d]).done((data, status, jqXHR) => {
                    progressBar.value = progressBar.value + 1;
                    progressSpan.textContent = `Loaded ${progressBar['value']} of ${dexNumbers.length} Pokemon`;
                    return data;
                }).fail((error) => {
                    console.log(error);
                });
                requests.push(r);
            }
        }

        return $.when.apply(undefined, requests);
    } // loadDexPages
    /* Loads the dex pages for the forms of a pokemon
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
        let requests = [];
        for(let a = 0; a < firstFormHTML.length; a++) {
            let data = firstFormHTML[a];
            // load data from pages for other forms
            const form_links = $(data, ownerDocument).find('.formeregistration a');
            if(form_links.length) {
                progressBar['max'] = progressBar['max'] + form_links.length;
                for(let i = 0; i < form_links.length; i++) {
                    let link = form_links.eq(i).attr('href');
                    let r = DexUtilities.getPokemonDexPage($, link.substring('/dex/'.length))
                        .done((form_html) => {
                            progressBar.value = progressBar['value'] + 1;
                            progressSpan.textContent = `Loaded ${progressBar['value']} of ${progressBar['max']} Pokemon`;
                            return form_html;
                        }).fail((error) => {
                            console.log(error);
                        });
                    requests.push(r);
                }
            }
        } // for
        
        return $.when.apply(undefined, requests);
    } // loadFormPages
    /* Parses HTML from pokedex pages
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
        const flat_families = {};
        const dex_id_map = {};

        for(let a = 0; a < args.length; a++) {
            let data = $(args[a], ownerDocument);
            const rootName = dexPageParser.getInfoFromDexPageHeader(data).name;

            // the evolution tree won't have the dex ID for the form of the pokemon that we're currently using
            // use the footbar to get the full pokedex number for the current form
            const full_id_number = dexPageParser.getInfoFromDexPageFooter(data).shortlink_number;

            // if the root name is already in in the flat files, but the root of the tree is not in the dex_id_map
            if((!(rootName in flat_families)) || (!(rootName in dex_id_map))) {
                dex_id_map[rootName] = full_id_number;

                let flattened = dexPageParser.parseEvolutionTreeFromDexPage(evolutionTreeParser, data, dex_id_map);

                // copy the data into the global object to prevent loading data multiple times
                if(flattened.evolutions.length) {
                    for(let i = 0; i < flattened.members.length; i++) {
                        flat_families[flattened.members[i]] = flattened.evolutions;
                    }
                } else {
                    flat_families[rootName] = flattened.evolutions;
                }
            } // if not in flat_families
        } // for a

        return [flat_families, dex_id_map];
    } // parseEvolutionTrees
    
    static buildEvolutionTreeDepthsList(parsed_families, dex_ids, form_data, form_map) {
        // store the maximum depth of the evolution tree for each pokemon
        // for highlighting each pokemon based on how fully evolved they are
        // https://github.com/jpgualdarrama/PokeFarmQoL/issues/11
        let maxEvoTreeDepth = {};
        for(let pokemon in parsed_families) {
            let evolutions = parsed_families[pokemon];

            // filter out "evolutions" that are really changes between forms of the
            // same pokemon
            for(let i = evolutions.length - 1; i>= 0; i--) {
                if(form_map[evolutions[i].source] === undefined) {
                    console.error(`Could not find form data for ${evolutions[i].source}`);
                } else {
                    if(form_map[evolutions[i].target] === undefined) {
                        console.error(`Could not find form data for ${evolutions[i].target}`);
                    } else if(JSON.stringify(form_map[evolutions[i].source]) === JSON.stringify(form_map[evolutions[i].target])) {
                        evolutions.splice(i, 1);
                    }
                }
            }

            if(!(pokemon in maxEvoTreeDepth)) {
                if(evolutions.length) {
                    // initialize new entries in the structure
                    maxEvoTreeDepth[pokemon] = {'remaining': 0, 'total': 0};
                    maxEvoTreeDepth[dex_ids[pokemon]] = {'remaining': 0, 'total': 0};

                    let sources_list = evolutions.map( el => el.source );

                    // don't redo the processing if the root of the tree is already in the list
                    if(sources_list[0] in maxEvoTreeDepth && pokemon !== sources_list[0]) {
                        // data for all evolutions is added when the first pokemon is added
                        continue;
                    }

                    let evo_tree = {};

                    for(let i = evolutions.length - 1; i >= 0; i--) {
                        let evolution = evolutions[i];
                        let source = evolution.source;
                        let target = evolution.target;

                        if(sources_list.indexOf(target) == -1) {
                            evo_tree[target] = {[target]: []};
                        }

                        if(!(source in evo_tree)) {
                            evo_tree[source] = {[source]: [evo_tree[target]]};
                        } else {
                            evo_tree[source][source].push(evo_tree[target]);
                        }
                    }

                    let final_tree = evo_tree[sources_list[0]];
                    let createPaths = function(stack, tree, paths) {
                        let name = Object.keys(tree)[0];
                        let children = tree[name];
                        let num_children = children.length;

                        // append this node to the path array
                        stack.push(name);
                        if(num_children === 0) {
                            // append all of its children
                            paths.push(stack.reverse().join('|'));
                            stack.reverse();
                        } else {
                            // otherwise try subtrees
                            for(let i = 0; i < num_children; i++) {
                                createPaths(stack, children[i], paths);
                            }
                        }
                        stack.pop();
                    };
                    let parseEvolutionPaths = function(tree) {
                        let paths = [];
                        createPaths([], tree, paths);

                        // get remaining number of evolutions in each path and total number
                        // of evolutions along each path
                        let pokemon_path_data = {};
                        for(let p = 0; p < paths.length; p++) {
                            let mons = paths[p].split('|');
                            for(let m = 0; m < mons.length; m++) {
                                // first or only appearance
                                if(!(mons[m] in pokemon_path_data)) {
                                    pokemon_path_data[mons[m]] = {'remaining': m, 'total': mons.length - 1};
                                }
                                // pokemon has multiple evolution paths
                                else {
                                    const remaining = pokemon_path_data[mons[m]].remaining;
                                    const total = pokemon_path_data[mons[m]].total;
                                    pokemon_path_data[mons[m]].remaining = (remaining + m) / 2;
                                    pokemon_path_data[mons[m]].total = (total + mons.length - 1) / 2;
                                }
                            }
                        }

                        // return paths.map((p) => { return p.split('|').length })
                        return pokemon_path_data;
                    };
                    // - 1 because there is one less evolution then there are pokemon
                    let parsed_path_data = parseEvolutionPaths(final_tree);
                    for(let p in parsed_path_data) {
                        maxEvoTreeDepth[p] = parsed_path_data[p];
                        maxEvoTreeDepth[dex_ids[p]] = parsed_path_data[p];
                    }
                    // maxEvoTreeDepth[pokemon] = Math.max(...parseEvolutionPaths(final_tree)) - 1;
                    // maxEvoTreeDepth[dex_ids[pokemon]] = maxEvoTreeDepth[pokemon]
                } // if evolutions.length
                // add pokemon that don't evolve
                else {
                    maxEvoTreeDepth[pokemon] = {'remaining': 0, 'total': 0};
                    maxEvoTreeDepth[dex_ids[pokemon]] = maxEvoTreeDepth[pokemon];
                }
            } // if not in maxEvoTreeDepth
        } // for pokemon in parsed_families
        
        return maxEvoTreeDepth;

    } // buildEvolutionTreeDepthsList

    static parseFormData($, ownerDocument, dexPageParser, args) {
        const form_data = {};
        const form_map = {};

        // because the evolution tree for all the members of a single family will have the same text,
        // use the text as a key in families
        // use the ownerDocument parameter to jQuery to stop jQuery from loading images and audio files
        for(let a = 0; a < args.length; a++) {
            let data = $(args[a], ownerDocument);
            const header_info = dexPageParser.getInfoFromDexPageHeader(data);
            const footer_info = dexPageParser.getInfoFromDexPageFooter(data);

            // use the footbar to get the full pokedex number for the current form
            let current_number = footer_info.shortlink_number;

            (form_data[header_info.name] = form_data[header_info.name] || []).push({
                // dex number of the base pokemon
                base_number: header_info.base_number,
                // name of the base pokemon
                base_name: header_info.base_name,
                // dex number of the form
                number: current_number,
                // name of the form
                name: header_info.name
            });
        } // for a

        // reorganize forms to all be under the base
        for(let name in form_data) {
            for(let i = 0; i < form_data[name].length; i++) {
                (form_map[form_data[name][i].base_name] = form_map[form_data[name][i].base_name] || []).push({
                    name: form_data[name][i].name,
                    number: form_data[name][i].number
                });
            } // i
        } // name

        // duplicate data from base pokemon into entries for each form
        for(let name in form_data) {
            for(let i = 0; i < form_data[name].length; i++) {
                if(form_data[name][i].base_name !== form_data[name][i].name) {
                    // form_map[form_data[name][i].number] = form_map[form_data[name][i].base_name];
                    form_map[form_data[name][i].name] = form_map[form_data[name][i].base_name];
                }
            }
        }

        return [form_data, form_map];
    } // parseFormData

    /* base_names = {
       'Rattata' : 'Rattata',
       'Rattata [Alolan Forme]' : 'Rattata',
       'Raticate [Alolan Totem Forme]' : 'Raticate'
       }
    */
    static parseBaseNames($, ownerDocument, dexPageParser, args) {
        const list = {};
        for(let a = 0; a <args.length; a++) {
            let data = $(args[a], ownerDocument);
            const header_info = dexPageParser.getInfoFromDexPageHeader(data);
            list[header_info.name] = header_info.base_name;
        }
        return list;
    }

    /* egg_pngs = {
       'Rattata' : '... .png',
       'Rattata [Alolan Forme]' : '... .png'
       }
    */
    static parseEggsPngsList($, ownerDocument, dexPageParser, args) {
        const list = {};
        for(let a = 0; a <args.length; a++) {
            let data = $(args[a], ownerDocument);
            const header_info = dexPageParser.getInfoFromDexPageHeader(data);
            const name = header_info.name;
            const egg_url = dexPageParser.parseEggPngFromDexPage(data);

            if(egg_url) {
                list[name] = egg_url;
            }
        }
        return list;
    }

    /* types = {
       'Rattata' : [Normal],
       'Raticate' : [Normal],
       'Rattata [Alolan Forme]' : [Normal, Dark],
       'Raticate [Alolan Forme]' : [Normal, Dark]
       }
    */
    static parseTypesList($, ownerDocument, dexPageParser, globals, args) {
        const list = {};
        for(let a = 0; a < args.length; a++) {
            let data = $(args[a], ownerDocument);
            const header_info = dexPageParser.getInfoFromDexPageHeader(data);
            const name = header_info.name;
            const types = dexPageParser.parseTypesFromDexPage(data, globals.TYPE_LIST);

            list[name] = types;
        }
        return list;
    }

    static buildRegionalFormsMap(form_map) {
        const regional_form_data = {};

        const REGIONAL_NAME_MARKERS = ['Kantonian',
            'Johtoian', // unused
            'Hoennian', // unused
            'Sinnohian', // unused
            'Unovan',
            'Kalosian', // unused
            'Alolan',
            'Galarian'];

        const all_species = Object.keys(form_map);
        let checked_species = {};
        for(let i = 0; i < all_species.length; i++) {
            let current = all_species[i];
            let base = (current.indexOf('[') > -1) ? current.substring(0, current.indexOf('[')).trim() : current;
            if(!Object.prototype.hasOwnProperty.call(checked_species, base)) {
                checked_species[base] = true;

                let form_names = form_map[base].map((e) => e.name);

                // if any of the names have one of the regional markers,
                // add the regional names to the list
                let forms_with_markers = form_names.filter((n) => {
                    return REGIONAL_NAME_MARKERS.filter((r) => n.indexOf(`${r}`) > -1).length > 0;
                });

                // filter out megas/totems
                // these are filtered out this way to allow for Galarian Zen Mode Darmanitan
                forms_with_markers = forms_with_markers.filter((n) => n.indexOf('Mega Forme') == -1);
                forms_with_markers = forms_with_markers.filter((n) => n.indexOf('Totem Forme') == -1);

                if(forms_with_markers && forms_with_markers.length) {
                    (regional_form_data[base] = regional_form_data[base] || []).push(base);
                    regional_form_data[base] = regional_form_data[base].concat(forms_with_markers);
                }
            }
        }

        return regional_form_data;
    }

    /* egg_pngs_types_map = {
       'Rattata' : {
             <kantonian.png> : [Normal],
             <alolan.png> : [Normal, Dark],
          }
       }
    */
    static buildEggPngsTypesMap(base_names_list, egg_pngs_list, types_list) {
        const map = {};
        for(let name in egg_pngs_list) {
            const base = base_names_list[name];
            const png = egg_pngs_list[name];
            const types = types_list[name];
            (map[base] = map[base] || {})[png] = types;
        }

        return map;
    }

} // DexUtilities