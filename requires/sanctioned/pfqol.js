/* globals jQuery PFQoLBase */
// eslint-disable-next-line no-unused-vars
class PFQoL extends PFQoLBase {
    constructor($) {
        super($);
        /*
         * set GLOBALS.DEX_DATA and GLOBALS.DEX_UPDATE_DATE
         * GLOBALS.DEX_DATA is the data loaded directly from the script contained in
         * the pokefarm.com/dex HTML. It contains the list of pokemon, and for each:
         * - their types
         * - if they hatch from an egg,
         * - if you have the eggdex, and
         * - if you have the regular, shiny, albino, and melanistic pokedex entries
         */
        this.LOCAL_STORAGE_MANAGER.loadDexIntoGlobalsFromStorage(this.GLOBALS);
    }
}

if (typeof(module) !== 'undefined') {
    module.exports.pfqol = PFQoL;
} else {
    // eslint-disable-next-line no-undef
    new PFQoL(jQuery);
}