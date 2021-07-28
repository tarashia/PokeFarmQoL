/* globals PrivateFieldsPageBase */
// eslint-disable-next-line no-unused-vars
class PrivateFieldsPage extends PrivateFieldsPageBase {
    constructor(jQuery, localStorageMgr, HELPERS, GLOBALS, settings) {
        super(jQuery, localStorageMgr, HELPERS, GLOBALS, settings);
        this.settings.fieldNFE = false;
    }
    highlightByHowFullyEvolved(GLOBALS, pokemonElem) {
        /*
         * if a pokemon is clicked-and-dragged, the tooltip element after the pokemon
         * will not exist. If this occurs. don't try highlighting anything until the
         * pokemon is "put down"
         */
        if (!this.jQuery(pokemonElem).next().length) { return; }

        const tooltip = this.helpers.parseFieldPokemonTooltip(this.jQuery, GLOBALS, this.jQuery(pokemonElem).next()[0]);
        const cls = this.helpers.getPokemonImageClass();
        let pokemon = tooltip['species'];

        const key = GLOBALS.POKEDEX_EVOLUTION_TREE_DEPTH_KEY;
        if (this.localStorageMgr.getItem(key) !== null) {
            const evolutionData = JSON.parse(this.localStorageMgr.getItem(key));
            if (Object.keys(evolutionData).length > 0) {
                // if can't find the pokemon directly, try looking for its form data
                if (!evolutionData[pokemon]) {
                    if (tooltip['forme']) {
                        pokemon = pokemon + ' [' + tooltip['forme'] + ']';
                    }
                }
                if (!evolutionData[pokemon]) {
                    console.error(`Private Fields Page - Could not find evolution data for ${pokemon}`);
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
        } else {
            console.error('Unable to load evolution data. In QoL Hub, please clear cached dex and reload dex data');
        }
    }
    customSearch(GLOBALS) {
        super.customSearch(GLOBALS);
        const obj = this;
        if(this.globalSettings.privateFieldFeatureEnables.search) {
            if (this.settings.fieldNFE === true) {
                obj.jQuery('.fieldmon').each(function () {
                    obj.highlightByHowFullyEvolved(GLOBALS, this);
                });
            } else {
                obj.jQuery('.oneevolutionleft').each((k, v) => {
                    obj.jQuery(v).removeClass('oneevolutionleft');
                });
                obj.jQuery('.twoevolutionleft').each((k, v) => {
                    obj.jQuery(v).removeClass('twoevolutionleft');
                });
            }
        }
    }
}