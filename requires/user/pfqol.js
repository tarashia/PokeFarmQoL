/* globals jQuery PFQoLBase LocalStorageManager DexUtilities */
// eslint-disable-next-line no-unused-vars
class PFQoL extends PFQoLBase {
    constructor($) {
        super($);
        // manage GLOBALS.DEX_DATA and GLOBALS.DEX_UPDATE_DATE
        // GLOBALS.DEX_DATA is the data loaded directly from the script contained in
        // the pokefarm.com/dex HTML. It contains the list of pokemon, and for each:
        // - their types
        // - if they hatch from an egg,
        // - if you have the eggdex, and
        // - if you have the regular, shiny, albino, and melanistic pokedex entries
        this.LOCAL_STORAGE = new LocalStorageManager(localStorage);
        if (!this.LOCAL_STORAGE.loadDexIntoGlobalsFromStorage(this.GLOBALS)) { // can't load it from storage
            this.LOCAL_STORAGE.loadDexIntoGlobalsFromWeb($, document, DexUtilities, this.GLOBALS); // so load it from the web
        } else { // can load it from storage
            this.LOCAL_STORAGE.loadDexIntoGlobalsFromWebIfOld($, document, DexUtilities, this.GLOBALS); // reload it from web if it's old
        }
        this.LOCAL_STORAGE.loadEvolveByLevelList(this.GLOBALS);
        this.LOCAL_STORAGE.loadEvolutionTreeDepthList(this.GLOBALS);
    }
}

if (module) {
    module.exports.pfqol = PFQoL;
} else {
    new PFQoL(jQuery);
}