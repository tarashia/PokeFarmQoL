/* globals DexPageBase */
// eslint-disable-next-line no-unused-vars
class DexPage extends DexPageBase {
    constructor(jQuery, localStorageMgr, GLOBALS) {
        super(jQuery, localStorageMgr, GLOBALS);

        // when entering the dex page, update the local storage QoLPokedex
        // so the user can update their information
        if(this.localStorageMgr.getItem(GLOBALS.POKEDEX_DATA_KEY) !== null) {
            if(jQuery('script#dexdata') && jQuery('script#dexdata').text()) {
                const text = jQuery('script#dexdata').text();
                this.localStorageMgr.setItem(GLOBALS.POKEDEX_DATA_KEY, text);
            }
        }
    }
}