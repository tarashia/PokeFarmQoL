class DexUtilities {
    static getDexPage() {
        return $.get('https://pokefarm.com/dex')
    }
    static loadDexIntoGlobalsFromStorage() {
        if(localStorage.getItem('QoLPokedex') === null) {
            return false;
        }
        if(Object.keys(JSON.parse(localStorage.getItem('QoLPokedex'))).length === 0) {
            return false;
        }

        let dateAndDex = JSON.parse(localStorage.getItem('QoLPokedex'));
        // if QoLPokedex only contains date
        if((dateAndDex.length === 1) ||
           // or if the dex part of the array is empty
           (dateAndDex[1] === undefined) ||
            (dateAndDex[1] === null)) {
            return false;
        }

        GLOBALS.DEX_UPDATE_DATE = dateAndDex[0];
        let dex = dateAndDex.slice(1);
        GLOBALS.DEX_DATA = dex;
        return true;
    }
    static loadDexIntoGlobalsFromWeb() {
        DexUtilities.getDexPage().then((data) => {
            GLOBALS.DEX_UPDATE_DATE = (new Date()).toUTCString();
            let html = jQuery.parseHTML(data);
            let dex = $(html[10].querySelector('#dexdata')).html();
            GLOBALS.DEX_DATA = dex.split(',');
            DexUtilities.updateLocalStorageDex();
        });
    }
    static loadDexIntoGlobalsFromWebIfOld() {
        // If it's more than 30 days old, update the dex
        const THIRTY_DAYS_IN_MS = 30*24*3600*1000
        let dateAndDex = JSON.parse(localStorage.getItem('QoLPokedex'));
        if ((Date.now() - Date.parse(dateAndDex[0])) > THIRTY_DAYS_IN_MS) {
            DexUtilities.loadDexIntoGlobalsFromWeb()
            return true;
        }
        return false;
    }
    static updateLocalStorageDex(updateDate) {
        let dateString = "";
        if(updateDate === undefined) {
            dateString = (new Date()).toUTCString();
        } else {
            dateString = updateDate;
        }
        const datePlusDex = [dateString].concat(GLOBALS.DEX_DATA)
        localStorage.setItem('QoLPokedex', JSON.stringify(datePlusDex))
        $('.qolDate').val(dateString)
    }
    
    static loadDexPages(dexNumbers, progressBar, progressSpan) {
        let requests = []
        progressBar.value = 0
        progressSpan.textContent = "Loading Pokedex info. Please wait until this is complete..."

        for(let d = 0; d < dexNumbers.length; d++) {
            // if the dex number is 000, the user has not seen the pokemon,
            // so just increment the progress bar value
            if(dexNumbers[d] === "000") {
                progressBar.value = progressBar['value'] + 1
                progressSpan.textContent = `Loaded ${progressBar['value']} of ${dexNumbers.length} Pokemon`
            } else {
                let r = $.get('https://pokefarm.com/dex/' + dexNumbers[d]).then((data) => {
                    progressBar.value = progressBar['value'] + 1
                    progressSpan.textContent = `Loaded ${progressBar['value']} of ${dexNumbers.length} Pokemon`
                    return data
                })
                requests.push(r)
            }
        }

        return $.when.apply(undefined, requests)
    } // loadDexPages

    static loadFormPages(firstFormHTML, progressBar, progressSpan) {
        let requests = []
        for(let a = 0; a < firstFormHTML.length; a++) {
            let data = firstFormHTML[a]
            // because the evolution tree for all the members of a single family will have the same text,
            // use the text as a key in families
            // use the ownerDocument parameter to jQuery to stop jQuery from loading images and audio files
            let ownerDocument = document.implementation.createHTMLDocument('virtual');
            
            // load data from pages for other forms
            const form_links = $(data, ownerDocument).find('.formeregistration a')
            if(form_links.length) {
                progressBar['max'] = progressBar['max'] + form_links.length
                form_links.each((k, v) => {
                    let link = $(v).attr('href');
                    let r = $.get('https://pokefarm.com/' + link).then((form_html) => {
                        progressBar.value = progressBar['value'] + 1
                        progressSpan.textContent = `Loaded ${progressBar['value']} of ${progressBar['max']} Pokemon`
                        return form_html;
                    })
                    requests.push(r)
                });
                
                /*
                // make a promise for the current form so the list of forms for each pokemon will be complete
                requests.push(Promise.resolve('Success').then(() => {
                return data;
                }));
                */
            }
        } // for
        
        return $.when.apply(undefined, requests)
    } // loadFormPages

    static saveEvolveByLevelList(parsed_families, dex_ids) {
        // load current evolve by level list
        let evolveByLevelList = {}
        if(localStorage.getItem('QoLEvolveByLevel') !== null) {
            evolveByLevelList = JSON.parse(localStorage.getItem('QoLEvolveByLevel'))
        }

        for(let pokemon in parsed_families) {
            let evolutions = parsed_families[pokemon]
            for(let i = 0; i < evolutions.length; i++) {
                let evo = evolutions[i]
                if(!(evo.source in evolveByLevelList) && Array.isArray(evo.condition)) {
                    for(let j = 0; j < evo.condition.length; j++) {
                        let cond = evo.condition[j]
                        if(cond.condition === "Level") {
                            evolveByLevelList[evo.source] = cond.condition + " " + cond.data
                            evolveByLevelList[dex_ids[evo.source]] = cond.condition + " " + cond.data
                        } // if
                    } // for
                } // if
            } // for
        } // for pokemon

        GLOBALS.EVOLVE_BY_LEVEL_LIST = evolveByLevelList
        localStorage.setItem('QoLEvolveByLevel', JSON.stringify(evolveByLevelList))
    } // saveEvolveByLevelList

    static saveEvolutionTreeDepths(maxEvoTreeDepth) {
        // GLOBALS.EVOLUTIONS_LEFT stores the number of remaining evolutions and the total number of evolutions
        // for a pokemon and it's family
        // e.g. - GLOBALS.EVOLUTIONS_LEFT["019s2"] = { remaining: 4, total: 5 } // 019s2 = Super Saiyan Rattata
        
        localStorage.setItem("QoLEvolutionTreeDepth", JSON.stringify(maxEvoTreeDepth));
        GLOBALS.EVOLUTIONS_LEFT = maxEvoTreeDepth;

    } // saveEvolutionTreeDepths

    static saveRegionalFormsList(parsed_families, dex_ids, regional_form_map) {
        // GLOBALS.REGIONAL_FORMS_LIST maps base pokemon species names to the list
        // of regional forms, including the base name.
        // e.g. - GLOBALS.REGIONAL_FORMS_LIST[Rattata] = ["Rattata", "Rattata [Alolan Forme]"]
        const key = 'QoLRegionalFormsList';
        const list = regional_form_map;

        localStorage.setItem(key, JSON.stringify(list));
        GLOBALS.REGIONAL_FORMS_LIST = list;

    } // saveRegionalFormsList

    static saveEggTypesMap(map) {
        // GLOBALS.EGGS_PNG_TO_TYPES_LIST will map a pokemon's base name to all the egg pngs that
        // will appear in the shelter with that name, and map each of those pngs to the type(s)
        // of that egg
        // e.g. GLOBALS.EGGS_PNG_TO_TYPES_LIST[Rattata] = {
        //           <kantonian.png> : [Normal],
        //           <alolan.png> : [Normal, Dark]
        // }
        const key = 'QoLEggTypesMap';
        localStorage.setItem(key, JSON.stringify(map));
        GLOBALS.EGGS_PNG_TO_TYPES_LIST = map;
    }

        static parseEvolutionTrees(args) {
        const flat_families = {}
        const dex_id_map = {}

        for(let a = 0; a < args.length; a++) {
            let data = args[a];
            const tree = DexPageParser.parseEvolutionTreeFromDexPage(data);
            const rootName = DexPageParser.getInfoFromDexPageHeader(data).name;

            // the evolution tree won't have the dex ID for the form of the pokemon that we're currently using
            // use the footbar to get the full pokedex number for the current form
            const full_id_number = DexPageParser.getInfoFromDexPageFooter(data).shortlink_number;

            // if the root name is already in in the flat files, but the root of the tree is not in the dex_id_map
            if((!(rootName in flat_families)) || (!(rootName in dex_id_map))) {
                dex_id_map[rootName] = full_id_number;

                // parseEvolutionTree returns an object containing:
                // - a list of the dex numbers of the family members
                // - a list of evolutions in the family formatted like:
                //   - {'source': <beginning pokemon>,
                //   -  'condition': <condition html>,
                //      'target': <ending pokemon>}
                let flattened = EvolutionTreeParser.parseEvolutionTree(rootName, tree, dex_id_map);

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

        return [flat_families, dex_id_map]
    } // parseEvolutionTrees
    
    static buildEvolutionTreeDepthsList(parsed_families, dex_ids, form_data, form_map) {
        // store the maximum depth of the evolution tree for each pokemon
        // for highlighting each pokemon based on how fully evolved they are
        // https://github.com/jpgualdarrama/PokeFarmQoL/issues/11
        let maxEvoTreeDepth = {}
        for(let pokemon in parsed_families) {
            let evolutions = parsed_families[pokemon]

            // filter out "evolutions" that are really changes between forms of the
            // same pokemon
            for(let i = evolutions.length - 1; i>= 0; i--) {
                if(form_map[evolutions[i].source] === undefined) {
                    console.error(`Could not find form data for ${evolutions[i].source}`);
                } else {
                    if(form_map[evolutions[i].target] === undefined) {
                        console.error(`Could not find form data for ${evolutions[i].target}`);
                    } else if(form_map[evolutions[i].source] === form_map[evolutions[i].target]) {
                        evolutions.splice(i, 1);
                    }
                }
            }

            if(!(pokemon in maxEvoTreeDepth)) {
                if(evolutions.length) {
                    // initialize new entries in the structure
                    maxEvoTreeDepth[pokemon] = {'remaining': 0, 'total': 0}
                    maxEvoTreeDepth[dex_ids[pokemon]] = {'remaining': 0, 'total': 0}

                    let sources_list = evolutions.map( el => el.source )

                    // don't redo the processing if the root of the tree is already in the list
                    if(sources_list[0] in maxEvoTreeDepth && pokemon !== sources_list[0]) {
                        // data for all evolutions is added when the first pokemon is added
                        continue;
                    }

                    let evo_tree = {}
                    let last_target = evolutions[evolutions.length-1].target

                    for(let i = evolutions.length - 1; i >= 0; i--) {
                        let evolution = evolutions[i];
                        let source = evolution.source;
                        let target = evolution.target;

                        if(sources_list.indexOf(target) == -1) {
                            evo_tree[target] = {}
                            evo_tree[target][target] = []
                        }

                        if(!(source in evo_tree)) {
                            evo_tree[source] = {}
                            evo_tree[source][source] = [evo_tree[target]];
                        } else {
                            evo_tree[source][source].push(evo_tree[target]);
                        }
                    }

                    let final_tree = evo_tree[sources_list[0]]
                    let createPaths = function(stack, tree, paths) {
                        if (tree === null) {
                            return
                        }
                        let name = Object.keys(tree)[0];
                        let children = tree[name];
                        let num_children = children.length;

                        // append this node to the path array
                        stack.push(name)
                        if(num_children === 0) {
                            // append all of its children
                            paths.push(stack.reverse().join('|'));
                            stack.reverse()
                        } else {
                            // otherwise try subtrees
                            for(let i = 0; i < num_children; i++) {
                                createPaths(stack, children[i], paths)
                            }
                        }
                        stack.pop()
                    }
                    let parseEvolutionPaths = function(tree) {
                        let paths = []
                        createPaths([], tree, paths)

                        // get remaining number of evolutions in each path and total number
                        // of evolutions along each path
                        let pokemon_path_data = {}
                        for(let p = 0; p < paths.length; p++) {
                            let mons = paths[p].split('|')
                            for(let m = 0; m < mons.length; m++) {
                                // first or only appearance
                                if(!(mons[m] in pokemon_path_data)) {
                                    pokemon_path_data[mons[m]] = {'remaining': m, 'total': mons.length - 1}
                                }
                                // pokemon has multiple evolution paths
                                else {
                                    const remaining = pokemon_path_data[mons[m]].remaining
                                    const total = pokemon_path_data[mons[m]].total
                                    pokemon_path_data[mons[m]].remaining = (remaining + m) / 2
                                    pokemon_path_data[mons[m]].total = (total + mons.length - 1) / 2
                                }
                            }
                        }

                        // return paths.map((p) => { return p.split('|').length })
                        return pokemon_path_data;
                    }
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
                    maxEvoTreeDepth[pokemon] = {'remaining': 0, 'total': 0}
                    maxEvoTreeDepth[dex_ids[pokemon]] = maxEvoTreeDepth[pokemon]
                }
            } // if not in maxEvoTreeDepth
        } // for pokemon in parsed_families
        
        return maxEvoTreeDepth;

    } // buildEvolutionTreeDepthsList

    static parseFormData(args) {
        const form_data = {};
        const form_map = {};

        // because the evolution tree for all the members of a single family will have the same text,
        // use the text as a key in families
        // use the ownerDocument parameter to jQuery to stop jQuery from loading images and audio files
        for(let a = 0; a < args.length; a++) {
            let data = args[a]
            const header_info = DexPageParser.getInfoFromDexPageHeader(data);
            const footer_info = DexPageParser.getInfoFromDexPageFooter(data);

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
    static parseBaseNames(args) {
        const list = {};
        for(let a = 0; a <args.length; a++) {
            let data = args[a];
            const header_info = DexPageParser.getInfoFromDexPageHeader(data);
            list[header_info.name] = header_info.base_name;
        }
        return list;
    }

    /* egg_pngs = {
       'Rattata' : '... .png',
       'Rattata [Alolan Forme]' : '... .png'
       }
    */
    static parseEggsPngsList(args) {
        const list = {};
        for(let a = 0; a <args.length; a++) {
            let data = args[a];
            const header_info = DexPageParser.getInfoFromDexPageHeader(data);
            const name = header_info.name;
            const egg_url = DexPageParser.parseEggPngFromDexPage(data);

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
    static parseTypesList(args) {
        const list = {};
        for(let a = 0; a < args.length; a++) {
            let data = args[a];
            const header_info = DexPageParser.getInfoFromDexPageHeader(data);
            const name = header_info.name;
            const types = DexPageParser.parseTypesFromDexPage(data);

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
            if(!checked_species.hasOwnProperty(base)) {
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

    /* parseAndStoreDexNumbers
     * 
     */
    static parseAndStoreDexNumbers(dex) {
        let json = JSON.parse(dex)
        // load current list of processed dex IDs
        let dexIDsCache = []
        if(localStorage.getItem('QoLDexIDsCache') !== null) {
            dexIDsCache = JSON.parse(localStorage.getItem('QoLDexIDsCache'))
        }
        
        let dexNumbers = [];
        // get the list of pokedex numbers that haven't been processed before
        for(let r in json.regions) {
            for(let i = 0; i < json.regions[r].length; i++) {
                if(dexIDsCache.indexOf(json.regions[r][i][0]) == -1) {
                    dexNumbers.push(json.regions[r][i][0])
                }
            }
        }
        
        // Add the list of dexNumbers to the cache and write it back to local storage
        dexIDsCache = dexIDsCache.concat(dexNumbers)
        localStorage.setItem('QoLDexIDsCache', JSON.stringify(dexIDsCache))
        return dexNumbers;
    }

} // DexUtilities
