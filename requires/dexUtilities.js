class DexUtilities {
    static loadDexPage() {
        return $.get('https://pokefarm.com/dex')
    }
    /*
    static loadAllEvolutionTrees() {
        const pokemon = $('.region-entries .ecnt')
        for(let i = 0; i < pokemon.length; i++) {
            const ref = pokemon[i]['href']
            const urlSuffix = ref.substring("https://pokefarm.com/".length)
            const dexNumber = urlSuffix.substring("dex/".length)

            // create a dummy div to put data in
            const div = `<div id="${dexNumber}" class="dexevodata"></div>`
            if($(`#${dexNumber}`).length === 0) {
                pokemon[i].insertAdjacentHTML('afterend', div)
            }
        }
    }
    */
    static parseEvolutionLi(li) {
        let condition = $(li).children('.condition')
        // let target = $(li).find('.name>a')[0]['href'].substring("https://pokefarm.com/dex/".length)
        let target = $(li).find('.name')[0].textContent

        let ret = {}
        ret[target] = {
            'condition': condition[0]
        }
        ret[target]['evolutions'] = []
        if($(li).children('ul').length) {
            $(li).children('ul').each((i, ul) => {
                let nest = DexUtilities.parseEvolutionUl(ul)
                ret[target]['evolutions'].push(nest)
            })
            return ret
        } else {
            return ret
        }
    }

    static parseEvolutionUl(ul) {
        const lis = $(ul).children('li')
        const num_parallel_evolutions = lis.length

        let ret = {}
        for(let i = 0; i < num_parallel_evolutions; i++) {
            let nest = DexUtilities.parseEvolutionLi(lis[i])
            for(let d in nest) {
                ret[d] = nest[d]
            }
        }
        return ret
    }
    static parseEvolutionTree(root, evotree) {
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

        tree[root] = []
        $(uls).each((i, ul) => {
            tree[root].push(DexUtilities.parseEvolutionUl(ul))
        })
        return tree
    }

    static loadEvolutionTrees(dexNumbers) {
        return $.when(
            for(let d = 0; d < dexNumbers.length; d++) {
                $.get('https://pokefarm.com/dex/' + dexNumbers[d])
            } // for
        } // return
    } // loadEvolutionTrees

    static parseEvolutionTrees(args) {
        const families = {}
        const flat_families = {}
        localStorage.setItem('QoLEvolveByLevel', "{}");
        console.log('args')
        console.log(args)
        /*
        // because the evolution tree for all the members of a single family will have the same text,
        // use the text as a key in families
        let tree = $(data).find('.evolutiontree')[0]
        
        // if the current pokemon is the root of it's evolution tree,
        // there will be no link in the span with the pokemon's name
        let rootName = $(tree).children()[0].textContent
        
        if(!(rootName in flat_families)) {
        // parseEvolutionTree returns a tree
        families[tree.textContent] = DexUtilities.parseEvolutionTree(rootName, tree)
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
        
        // right now, only interested in pokemon that evolve by level
        // so, this just builds a list of pokemon that evolve by level
        for(let i = 0; i < flattened.evolutions.length; i++) {
        if(Array.isArray(flattened.evolutions[i].condition)) {
        for(let j = 0; j < flattened.evolutions[i].condition.length; j++) {
        if(flattened.evolutions[i].condition[j].condition === "Level") {
        console.log(flattened.evolutions[i].source)
        let json = JSON.parse(localStorage.getItem('QoLEvolveByLevel'))
        json[flattened.evolutions[i].source] = flattened.evolutions[i].condition[j].condition + " " +
        flattened.evolutions[i].condition[j].data
        localStorage.setItem('QoLEvolveByLevel', JSON.stringify(json));
        } // if
        } // for
        } // if
        } // for
        } // if not in flat_families
        */
    }

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
