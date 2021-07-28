/* globals ShelterPageBase */
// eslint-disable-next-line no-unused-vars
class ShelterPage extends ShelterPageBase {
    constructor(jQuery, localStorageMgr, HELPERS, GLOBALS, SETTINGS) {
        super(jQuery, localStorageMgr, HELPERS, GLOBALS, SETTINGS);
        this.settings.findReadyToEvolve = false;
        this.settings.findNFE = false;

        // when the page is loaded, check to see if the data needed for finding eggs by type is loaded (if it's needed)
        if (this.onPage(window) &&
            this.settings.findTypeEgg &&
            !(GLOBALS.EGGS_PNG_TO_TYPES_LIST || JSON.parse(this.localStorageMgr.getItem(GLOBALS.POKEDEX_EGG_TYPES_MAP_KEY)))) {
            window.alert('Message from QoL script:\nUnable to load list of pokemon eggs and their types, ' +
                'which is used to distinguish eggs with the same name but different types (Vulpix and ' +
                'Alolan Vulpix).\n\nCan still find eggs by type, but there may be mistakes. ' +
                'Please clear and reload your pokedex data by clicking the "Clear Cached Dex" ' +
                'and then clicking the "Update Pokedex" button in the QoL Hub to load list of eggs and types.');
        }
    }
    searchForReadyToEvolveByLevel(GLOBALS) {
        const obj = this;
        const selected = this.jQuery('#shelterarea .tooltip_content');
        const readyBigImg = [];
        const cls = this.helpers.getPokemonImageClass();
        selected.each((idx, s) => {
            const text = s.textContent.split(' ');
            const name = text[0];
            const level = parseInt(text[1].substring(4));

            // get level that pokemon needs to be at to evolve
            let evolveLevel = undefined;
            if (GLOBALS.EVOLVE_BY_LEVEL_LIST[name] !== undefined) {
                evolveLevel = parseInt(GLOBALS.EVOLVE_BY_LEVEL_LIST[name].split(' ')[1]);
            }

            if (evolveLevel !== undefined && level >= evolveLevel) {
                const shelterBigImg = obj.jQuery(s).prev().children(`img.${cls}`);
                readyBigImg.push(shelterBigImg);
            }
        });

        for (let i = 0; i < readyBigImg.length; i++) {
            this.jQuery(readyBigImg[i]).addClass('shelterfoundme');
        }

        const imgResult = readyBigImg.length + ' ' + 'ready to evolve';
        this.insertShelterFoundDiv(readyBigImg.length, imgResult, '');
    }
    highlightByHowFullyEvolved(GLOBALS, pokemonElem) {
        const cls = this.helpers.getPokemonImageClass();
        /*
         * if a pokemon is clicked-and-dragged, the tooltip element after the pokemon
         * will not exist. If this occurs. don't try highlighting anything until the
         * pokemon is "put down"
         */
        if (!this.jQuery(pokemonElem).next().length) { return; }

        const tooltipElem = this.jQuery(pokemonElem).next()[0];
        const tooltip = {
            species: tooltipElem.textContent.split(' ')[0],
            forme: ''
        };
        let pokemon = tooltip['species'];

        if (GLOBALS.EVOLUTIONS_LEFT !== undefined && GLOBALS.EVOLUTIONS_LEFT !== null) {
            const evolutionData = GLOBALS.EVOLUTIONS_LEFT;
            // if can't find the pokemon directly, try looking for its form data
            if (!evolutionData[pokemon]) {
                if (tooltip['forme']) {
                    pokemon = pokemon + ' [' + tooltip['forme'] + ']';
                }
            }
            if (!evolutionData[pokemon]) {
                /*
                 * Do not log error here. Repeated errors can (will) slow down the page
                 * console.error(`Private Fields Page - Could not find evolution data for ${pokemon}`);
                 */
            } else {
                const evolutionsLeft = evolutionData[pokemon].remaining;

                if (evolutionsLeft === 1) {
                    this.jQuery(pokemonElem).children(`img.${cls}`).addClass('oneevolutionleft');
                } else if (evolutionsLeft === 2) {
                    this.jQuery(pokemonElem).children(`img.${cls}`).addClass('twoevolutionleft');
                }
            }
        } else {
            console.error('Unable to load evolution data. In QoL Hub, please clear cached dex and reload dex data');
        }
    }

    searchForTypes(GLOBALS, types) {
        const obj = this;
        const dexData = GLOBALS.DEX_DATA;
        const cls = this.helpers.getPokemonImageClass();
        if (types.length > 0) {
            const eggPngsToTypes = GLOBALS.EGGS_PNG_TO_TYPES_LIST ||
                JSON.parse(this.localStorageMgr.getItem(GLOBALS.POKEDEX_EGG_TYPES_MAP_KEY)) || undefined;
            for (let i = 0; i < types.length; i++) {
                const value = types[i];
                const foundType = GLOBALS.SHELTER_TYPE_TABLE[GLOBALS.SHELTER_TYPE_TABLE.indexOf(value) + 2];

                let typePokemonNames = [];
                let selected = undefined;
                if (this.settings.findTypeEgg === true) {
                    const pokemonElems = [];
                    typePokemonNames = [];
                    selected = this.jQuery('#shelterarea>.tooltip_content:contains("Egg")');
                    selected.each(function () {
                        const searchPokemon = (obj.jQuery(this).text().split(' ')[0]);
                        let searchTypeOne = '';
                        let searchTypeTwo = '';
                        if (eggPngsToTypes) {
                            const imgUrl = obj.jQuery(obj.jQuery(this).prev().find('img')[0]).attr('src').replace('https://pfq-static.com/img/', '');
                            searchTypeOne = eggPngsToTypes[searchPokemon] &&
                                eggPngsToTypes[searchPokemon][imgUrl] &&
                                ('' + eggPngsToTypes[searchPokemon][imgUrl][0]);
                            searchTypeTwo = eggPngsToTypes[searchPokemon] &&
                                eggPngsToTypes[searchPokemon][imgUrl] &&
                                ('' + (eggPngsToTypes[searchPokemon][imgUrl][1] || -1));
                        } else {
                            const searchPokemonIndex = dexData.indexOf('"' + searchPokemon + '"');
                            searchTypeOne = dexData[searchPokemonIndex + 1];
                            searchTypeTwo = dexData[searchPokemonIndex + 2];
                        }
                        if ((searchTypeOne === value) || (searchTypeTwo === value)) {
                            typePokemonNames.push(searchPokemon);
                            pokemonElems.push(this);
                        }
                    });

                    for (let o = 0; o < pokemonElems.length; o++) {
                        const shelterImgSearch = this.jQuery(pokemonElems[o]);
                        const shelterBigImg = shelterImgSearch.prev().children(`img.${cls}`);
                        this.jQuery(shelterBigImg).addClass('shelterfoundme');
                    }

                    this.insertShelterTypeFoundDiv(typePokemonNames.length, foundType, 'egg', typePokemonNames);
                }

                if (this.settings.findTypePokemon === true) {
                    typePokemonNames = [];
                    selected = this.jQuery('#shelterarea>.tooltip_content').not(':contains("Egg")');
                    selected.each(function () {
                        const searchPokemon = (obj.jQuery(this).text().split(' ')[0]);
                        const searchPokemonIndex = dexData.indexOf('"' + searchPokemon + '"');
                        const searchTypeOne = dexData[searchPokemonIndex + 1];
                        const searchTypeTwo = dexData[searchPokemonIndex + 2];
                        if ((searchTypeOne === value) || (searchTypeTwo === value)) {
                            typePokemonNames.push(searchPokemon);
                        }
                    });

                    for (let o = 0; o < typePokemonNames.length; o++) {
                        const shelterImgSearch = this.jQuery('#shelterarea .tooltip_content:containsIN(\'' + typePokemonNames[o] + ' (\')');
                        const shelterBigImg = shelterImgSearch.prev().children(`img.${cls}`);
                        this.jQuery(shelterBigImg).addClass('shelterfoundme');
                    }

                    this.insertShelterTypeFoundDiv(typePokemonNames.length, foundType, 'Pokemon', typePokemonNames);
                }
            }
        }
    }

    customSearch(GLOBALS) {
        super.customSearch(GLOBALS);
        const obj = this;
        // search whatever you want to find in the shelter & grid

        if (this.settings.findNFE === true) {
            this.jQuery('#shelterarea>[data-stage=pokemon]').each(function () {
                obj.highlightByHowFullyEvolved(GLOBALS, this);
            });
        } else {
            this.jQuery('.oneevolutionleft').each((k, v) => {
                obj.jQuery(v).removeClass('oneevolutionleft');
            });
            this.jQuery('.twoevolutionleft').each((k, v) => {
                obj.jQuery(v).removeClass('twoevolutionleft');
            });
        }

        if (this.settings.findReadyToEvolve === true) {
            if (GLOBALS.EVOLVE_BY_LEVEL_LIST === null) {
                window.alert('Unable to load list of pokemon that can evolve by level. Please try updating dex ' +
                    'by clicking "Update Pokedex" in the QoL Hub. If the problem persists, please post in the thread.\n\n' +
                    'Disabling this function until the checkbox is clicked again');
                this.settings.findReadyToEvolve = false;
                // uncheck checkbox
                this.jQuery('[data-key=findReadyToEvolve]')[0].checked = false;
            } else {
                this.searchForReadyToEvolveByLevel(GLOBALS);
            }
        }
    } // customSearch
}