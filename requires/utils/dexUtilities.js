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

} // DexUtilities
