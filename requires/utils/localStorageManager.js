class LocalStorageManager {
    constructor(storage) {
        self.storage = storage;
    }

    /* Set GLOBALS.DEX_DATA and GLOBALS.DEX_UPDATE_DATE from the QoLPokedex data stored in localStorage
     * Inputs:
     * - globals - reference to the GLOBALS settings object
     */
    loadDexIntoGlobalsFromStorage(globals) {
        if(self.storage.getItem('QoLPokedex') === null) {
            return false;
        }
        if(Object.keys(JSON.parse(self.storage.getItem('QoLPokedex'))).length === 0) {
            return false;
        }

        let dateAndDex = JSON.parse(self.storage.getItem('QoLPokedex'));
        // if QoLPokedex only contains date
        if((dateAndDex.length === 1) ||
           // or if the dex part of the array is empty
           (dateAndDex[1] === undefined) ||
            (dateAndDex[1] === null)) {
            return false;
        }

        globals.DEX_UPDATE_DATE = dateAndDex[0];
        let dex = dateAndDex.slice(1);
        globals.DEX_DATA = dex;
        return true;
    }
    /* Set globals.DEX_DATA and globals.DEX_UPDATE_DATE by loading the main dex page from the web
     * Inputs:
     * - $ - reference to jQuery
     * - globals - reference to the GLOBALS settings object
     */
    loadDexIntoGlobalsFromWeb($, document, dexUtilities, globals) {
        dexUtilities.getMainDexPage($).done((data) => {
            globals.DEX_UPDATE_DATE = (new Date()).toUTCString();
            let html = $.parseHTML(data);
            console.log('Changing this to 11 while testing; idk if this is a permanent change')
            // let dex = $(html[10].querySelector('#dexdata', document)).html();
            // let dex = html.eq(10).find('#dexdata').html();
            let dex = $(html[11].querySelector('#dexdata'), document).html();
            globals.DEX_DATA = dex.split(',');
            this.updateLocalStorageDex($, document, globals.DEX_UPDATE_DATE, globals);
        }).catch((error) => {
            console.error("Error occurred in loadDexIntoGlobalsFromWeb. " + 
                          "Error message: " + error);
        });
    }
    /* Call loadDexIntoGlobalsFromWeb if more than 30 days have passed since it was last loaded
     * Inputs:
     * - $ - reference to jQuery
     * - globals - reference to the GLOBALS settings object
     */
    loadDexIntoGlobalsFromWebIfOld($, document, dexUtilities, globals) {
        // If it's more than 30 days old, update the dex
        const THIRTY_DAYS_IN_MS = 30*24*3600*1000
        let dateAndDex = JSON.parse(self.storage.getItem('QoLPokedex'));
        if ((Date.now() - Date.parse(dateAndDex[0])) > THIRTY_DAYS_IN_MS) {
            this.loadDexIntoGlobalsFromWeb($, document, dexUtilities, globals)
            return true;
        }
        return false;
    }
    updateLocalStorageDex($, document, updateDate, globals) {
        let dateString = "";
        if(updateDate === undefined) {
            dateString = (new Date()).toUTCString();
        } else {
            dateString = updateDate;
        }
        const datePlusDex = [dateString].concat(globals.DEX_DATA)
        self.storage.setItem('QoLPokedex', JSON.stringify(datePlusDex))
        $('.qolDate', document).val(dateString)
    }

    saveEvolveByLevelList(globals, parsed_families, dex_ids) {
        // load current evolve by level list
        let evolveByLevelList = {}
        if(self.storage.getItem('QoLEvolveByLevel') !== null) {
            evolveByLevelList = JSON.parse(self.storage.getItem('QoLEvolveByLevel'))
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

        globals.EVOLVE_BY_LEVEL_LIST = evolveByLevelList
        self.storage.setItem('QoLEvolveByLevel', JSON.stringify(evolveByLevelList))
    } // saveEvolveByLevelList

    saveEvolutionTreeDepths(globals, maxEvoTreeDepth) {
        // GLOBALS.EVOLUTIONS_LEFT stores the number of remaining evolutions and the total number of evolutions
        // for a pokemon and it's family
        // e.g. - GLOBALS.EVOLUTIONS_LEFT["019s2"] = { remaining: 4, total: 5 } // 019s2 = Super Saiyan Rattata
        
        self.storage.setItem("QoLEvolutionTreeDepth", JSON.stringify(maxEvoTreeDepth));
        globals.EVOLUTIONS_LEFT = maxEvoTreeDepth;

    } // saveEvolutionTreeDepths

    saveRegionalFormsList(globals, parsed_families, dex_ids, regional_form_map) {
        // GLOBALS.REGIONAL_FORMS_LIST maps base pokemon species names to the list
        // of regional forms, including the base name.
        // e.g. - GLOBALS.REGIONAL_FORMS_LIST[Rattata] = ["Rattata", "Rattata [Alolan Forme]"]
        const key = 'QoLRegionalFormsList';
        const list = regional_form_map;

        self.storage.setItem(key, JSON.stringify(list));
        globals.REGIONAL_FORMS_LIST = list;

    } // saveRegionalFormsList

    saveEggTypesMap(globals, map) {
        // GLOBALS.EGGS_PNG_TO_TYPES_LIST will map a pokemon's base name to all the egg pngs that
        // will appear in the shelter with that name, and map each of those pngs to the type(s)
        // of that egg
        // e.g. GLOBALS.EGGS_PNG_TO_TYPES_LIST[Rattata] = {
        //           <kantonian.png> : [Normal],
        //           <alolan.png> : [Normal, Dark]
        // }
        const key = 'QoLEggTypesMap';
        self.storage.setItem(key, JSON.stringify(map));
        globals.EGGS_PNG_TO_TYPES_LIST = map;
    }

    /* parseAndStoreDexNumbers
     * 
     */
    parseAndStoreDexNumbers(dex) {
        let json = JSON.parse(dex)
        // load current list of processed dex IDs
        let dexIDsCache = []
        if(self.storage.getItem('QoLDexIDsCache') !== null) {
            dexIDsCache = JSON.parse(self.storage.getItem('QoLDexIDsCache'))
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
        self.storage.setItem('QoLDexIDsCache', JSON.stringify(dexIDsCache))
        return dexNumbers;
    }
}

const storageManager = new LocalStorageManager(localStorage);

if(module)
    module.exports = storageManager;
