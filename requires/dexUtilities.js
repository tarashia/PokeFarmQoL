class DexUtilities {
    static loadDexPage() {
        return $.get('https://pokefarm.com/dex')
    }
    static parseDexPage(data) {
        let html = jQuery.parseHTML(data)
        let dex = $(html[10].querySelector('#dexdata')).html()
        return dex.split(',');
    }
    static loadDexIntoGlobalsFromStorage() {
        if(localStorage.getItem('QoLPokedex') === null) {
            return false;
        }
        if(Object.keys(JSON.parse(localStorage.getItem('QoLPokedex'))).length === 0) {
            return false;
        }
        let dateAndDex = JSON.parse(localStorage.getItem('QoLPokedex'));
        GLOBALS.DEX_UPDATE_DATE = dateAndDex[0];
        let dex = dateAndDex.slice(1);
        GLOBALS.DEX_DATA = dex;
        return true;
    }
    static loadDexIntoGlobalsFromWeb() {
        DexUtilities.loadDexPage().then((data) => {
            GLOBALS.DEX_UPDATE_DATE = (new Date()).toUTCString();
            GLOBALS.DEX_DATA = DexUtilities.parseDexPage(data)
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
                let nest = DexUtilities.parseEvolutionUl(ul, dex_id_map)
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
            let nest = DexUtilities.parseEvolutionLi(lis[i], dex_id_map)
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
            tree[root].push(DexUtilities.parseEvolutionUl(ul, dex_id_map))
        })
        return tree
    }

    static loadEvolutionTrees(dexNumbers, progressBar, progressSpan) {
        let requests = []
        progressBar.value = 0
        progressSpan.textContent = "Loading Pokedex info. Please wait until this is complete..."

        for(let d = 0; d < dexNumbers.length; d++) {
            let r = $.get('https://pokefarm.com/dex/' + dexNumbers[d]).then((data) => {
                progressBar.value = progressBar['value'] + 1
                progressSpan.textContent = `Loaded ${progressBar['value']} of ${dexNumbers.length} Pokemon`
                return data
            })
            requests.push(r)
        }

        return $.when.apply(undefined, requests)
    } // loadEvolutionTrees

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

            // if the current pokemon is the root of its evolution tree,
            // there will be no link in the span with the pokemon's name
            let rootName = $(tree).children()[0].textContent

            // if the root name is already in in the flat files, but the root of the tree is not in the dex_id_map
            if((!(rootName in flat_families)) || (!(rootName in dex_id_map))) {
                // parseEvolutionTree returns a tree
                families[tree.textContent] = DexUtilities.parseEvolutionTree(rootName, tree, dex_id_map)
                // flattenFamily returns an object containing:
                // - a list of the dex numbers of the family members
                // - a list of evolutions in the family formatted like:
                //   - {'source': <beginning pokemon>,
                //   -  'condition': <condition html>,
                //      'target': <ending pokemon>}
                let flattened = DexUtilities.flattenFamily(families[tree.textContent])

                // parse the evolution conditions
                DexUtilities.parseEvolutionConditions(flattened)

                // copy the data into the global object to prevent loading data
                // multiple times
                for(let i = 0; i < flattened.members.length; i++) {
                    flat_families[flattened.members[i]] = flattened.evolutions;
                }
            } // if not in flat_families
        } // for a

        return [flat_families, dex_id_map]
    } // parseEvolutionTrees

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
}
