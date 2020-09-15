class EvolutionTreeParser {
    static parseEvolutionLi(li, dex_id_map) {
        let condition = $(li).children('.condition')
        let targetElem = $(li).find('.name')[0]
        let target = targetElem.textContent

        // if the targetElem has a link as a child, store the dex ID in the link
        if($(targetElem).find('a').length) {
            let link = $(targetElem).find('a')[0]['href']
            let id = link.substring("https://pokefarm.com/dex/".length)
            dex_id_map[target] = id
        }

        let ret = {}
        ret[target] = {
            'condition': condition[0]
        }
        ret[target]['evolutions'] = []
        if($(li).children('ul').length) {
            $(li).children('ul').each((i, ul) => {
                let nest = EvolutionTreeParser.parseEvolutionUl(ul, dex_id_map)
                ret[target]['evolutions'].push(nest)
            })
            return ret
        } else {
            return ret
        }
    }

    static parseEvolutionUl(ul, dex_id_map) {
        const lis = $(ul).children('li')
        const num_parallel_evolutions = lis.length

        let ret = {}
        for(let i = 0; i < num_parallel_evolutions; i++) {
            let nest = EvolutionTreeParser.parseEvolutionLi(lis[i], dex_id_map)
            for(let d in nest) {
                ret[d] = nest[d]
            }
        }
        return ret
    }
    static parseEvolutionTree(root, evotree, dex_id_map) {
        const uls = $(evotree).children('ul')
        const tree = {}
        const textContent = evotree.textContent

        const doesNotEvolveMarker = " is not known to evolve"
        const markerIndex = textContent.indexOf(doesNotEvolveMarker)
        if(markerIndex > -1) {
            let name = textContent.substring(0, markerIndex)
            tree[name] = []
            return tree
        }

        if($(evotree).children('span').length) {
            let linkElem = $(evotree).children('span').children('a')
            if(linkElem.length) {
                let link = linkElem[0]['href']
                let dex_id = link.substring("https://pokefarm.com/dex/".length)
                dex_id_map[root] = dex_id
            }
        }

        tree[root] = []
        $(uls).each((i, ul) => {
            tree[root].push(EvolutionTreeParser.parseEvolutionUl(ul, dex_id_map))
        })
        return tree
    }
} // EvolutionTreeParser

class DexPageParser {
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

    static getInfoFromDexPageHeader(html) {
        // Note - I thought this wouldn't work for exclusives because they're pokedex numbers all start with "000",
        // but when exclusives have multiple forms, each form has its dex entry, and the forms are not grouped
        // into the panel of a single pokemon. See Lunupine and Lunupine [Mega Forme Q] as an example, contrasted with
        // Venusaur and Venusaur [Mega Forme]. This means that exclusives will never have any links in the form panel
        // and thus will never get into this if statement
        let ownerDocument = document.implementation.createHTMLDocument('virtual');
        const name_header = $(html, ownerDocument).find('#dexinfo>h3')[0]
        const form_i = $(name_header).children('i.small')

        // https://stackoverflow.com/questions/3442394/using-text-to-retrieve-only-text-not-nested-in-child-tags
        // get text but not children's text
        let name_text = $(name_header).clone().children().remove().end().text()
        let name_splits = name_text.split(' ')
        let base_pokemon_number = name_splits[0].replace('#','').replace(':','')
        // just in case the name is more than one word, join the remaining elements back together
        name_splits.splice(0, 1)
        let base_pokemon_name = name_splits.join(' ').trim()
        let pokemon_name = (form_i.length) ? base_pokemon_name + ' ' + form_i.text() : base_pokemon_name

        return {
            // dex number of the base pokemon
            base_number: base_pokemon_number,
            // name of the base pokemon
            base_name: base_pokemon_name,
            // name of the form
            name: pokemon_name
        }
    }

    static getInfoFromDexPageFooter(html) {
        let ownerDocument = document.implementation.createHTMLDocument('virtual');
        let current_link = $(html, ownerDocument).find('#footbar>span>a[href^="/shortlinks"]').attr('href');
        let current_number = current_link.substr(current_link.indexOf('/dex/')+5);

        return {
            shortlink: current_link,
            shortlink_number: current_number
        };
    }

        static parseTypesFromDexPage(html) {
        let ownerDocument = document.implementation.createHTMLDocument('virtual');
        let typeImgs = $(html, ownerDocument).find('.dexdetails>li>img');
        let typeUrls = typeImgs.map((idx, img) => img.src);
        let types = typeUrls.map((idx, url) =>
                                 url.substring(url.indexOf("types/")+"types/".length,
                                               url.indexOf(".png")));
        types = types.map((idx, type) => type.charAt(0).toUpperCase() + type.substring(1));
        types = types.map((idx, type) => GLOBALS.TYPE_LIST.indexOf(type));
        return types.toArray();
    }

    static parseEggPngFromDexPage(html) {
        let ownerDocument = document.implementation.createHTMLDocument('virtual');
        let egg_url = ($(html, ownerDocument).find('.eggspr').find('img')
                       .attr('src') || "")
            .replace('https://pfq-static.com/img/', '');
        return egg_url;
    }
    
    static parseEvolutionTrees(args) {
        const families = {}
        const flat_families = {}
        const dex_id_map = {}

        for(let a = 0; a < args.length; a++) {
            let data = args[a]
            // because the evolution tree for all the members of a single family will have the same text,
            // use the text as a key in families
            // use the ownerDocument parameter to jQuery to stop jQuery from loading images and audio files
            let ownerDocument = document.implementation.createHTMLDocument('virtual');
            let tree = $(data, ownerDocument).find('.evolutiontree')[0]

            const header_info = DexUtilities.getInfoFromDexPageHeader(data);
            let rootName = header_info.name;

            // if the root name is already in in the flat files, but the root of the tree is not in the dex_id_map
            if((!(rootName in flat_families)) || (!(rootName in dex_id_map))) {
                // parseEvolutionTree returns a tree
                families[tree.textContent] = EvolutionTreeParser.parseEvolutionTree(rootName, tree, dex_id_map)
                // flattenFamily returns an object containing:
                // - a list of the dex numbers of the family members
                // - a list of evolutions in the family formatted like:
                //   - {'source': <beginning pokemon>,
                //   -  'condition': <condition html>,
                //      'target': <ending pokemon>}

                // the evolution tree won't have the dex ID for the form of the pokemon that we're currently using
                // use the footbar to get the full pokedex number for the current form
                const footer_info = DexUtilities.getInfoFromDexPageFooter(data);
                dex_id_map[rootName] = footer_info.shortlink_number;
                
                let flattened = DexUtilities.flattenFamily(families[tree.textContent])

                // parse the evolution conditions
                DexUtilities.parseEvolutionConditions(flattened)

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

    static parseFormData(args) {
        const form_data = {};
        const form_map = {};

        // because the evolution tree for all the members of a single family will have the same text,
        // use the text as a key in families
        // use the ownerDocument parameter to jQuery to stop jQuery from loading images and audio files
        for(let a = 0; a < args.length; a++) {
            let data = args[a]
            const header_info = DexUtilities.getInfoFromDexPageHeader(data);
            const footer_info = DexUtilities.getInfoFromDexPageFooter(data);

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
            const header_info = DexUtilities.getInfoFromDexPageHeader(data);
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
            const header_info = DexUtilities.getInfoFromDexPageHeader(data);
            const name = header_info.name;
            const egg_url = DexUtilities.parseEggPngFromDexPage(data);

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
            const header_info = DexUtilities.getInfoFromDexPageHeader(data);
            const name = header_info.name;
            const types = DexUtilities.parseTypesFromDexPage(data);

            list[name] = types;
        }
        return list;
    }

    static extractRegionalForms(form_map) {
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

} // DexPageParser

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
        DexUtilities.loadDexPage().then((data) => {
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
    
    static flattenFamily(family_obj, ret_obj, evo_src) {
        if(ret_obj === undefined) {
            ret_obj = {
                'members': [],
                'evolutions': []
            }
        }

        if(Array.isArray(family_obj)) {
            for(let i = 0; i < family_obj.length; i++) {
                for(let key in family_obj[i]) {
                    ret_obj.members.push(key)
                    ret_obj.evolutions.push({
                        'source': evo_src,
                        'target': key,
                        'condition': family_obj[i][key]['condition']
                    })
                    this.flattenFamily(family_obj[i][key]['evolutions'], ret_obj, key);
                }
            }
        } else if(typeof family_obj === 'object') {
            for(let key in family_obj) {
                ret_obj.members.push(key)
                this.flattenFamily(family_obj[key], ret_obj, key)
            }
        }

        return ret_obj
    }

    static parseEvolutionConditions(flattened) {
        for(let e = 0; e < flattened.evolutions.length; e++) {
            let source = flattened.evolutions[e].source
            let target = flattened.evolutions[e].target
            let condition = flattened.evolutions[e].condition
            let condText = condition.textContent
            // for now, let's just parse for pokemon that evolve by level
            // TODO: Non-Level conditions
            if(condText.indexOf("Level ") > -1) {
                // console.log(condition)
                flattened.evolutions[e].condition = [];
                let words = condText.split(" ")
                let cond = "", clearCurrentCondition = false;

                for(let w = 0; w < words.length; w++) {
                    clearCurrentCondition = false
                    if(words[w] === "Level") {
                        clearCurrentCondition = true
                        flattened.evolutions[e].condition.push({'condition': words[w], 'data': words[w+1]})
                        w++;
                    } else if(words[w] === "Happiness") {
                        clearCurrentCondition = true
                        flattened.evolutions[e].condition.push({'condition': words[w], 'data': ""})
                    } else if(words[w].endsWith("ite")) { // Megas
                        clearCurrentCondition = true
                        // check for PFQ exclusive Megas
                        if(w < words.length - 1 && words[w+1] === "Q") {
                            flattened.evolutions[e].condition.push({'condition': "Mega", 'data': words[w] + " " + words[w+1]})
                            w++;
                        } else {
                            flattened.evolutions[e].condition.push({'condition': "Mega", 'data': words[w]})
                        }
                    } else { // catch-all for now
                        clearCurrentCondition = false
                        cond = cond + words[w]
                    }

                    if(clearCurrentCondition) {
                        if(cond !== "") {
                            flattened.evolutions[e].condition.push({'condition': cond, 'data': ""})
                        }
                        cond = ""
                    }
                } // for

                // if there's any leftover conditions, add it into the list
                if(cond !== "") {
                    flattened.evolutions[e].condition.push({'condition': cond, 'data': ""})
                }
            } // if level
            else {
                flattened.evolutions[e].condition = condition.textContent;
            }
        }
    }

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

    static saveEvolutionTreeDepths(parsed_families, dex_ids, form_data, form_map) {
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

} // DexUtilities
