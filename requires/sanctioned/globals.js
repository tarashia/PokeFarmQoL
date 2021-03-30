/* globals GlobalsBase */
// eslint-disable-next-line no-unused-vars
class Globals extends GlobalsBase {
    constructor(localStorageMgr) {
        super();
        this.localStorageMgr = localStorageMgr;

        // load the dex from local storage if it exists
        const dex = this.localStorageMgr.getItem(this.POKEDEX_DATA_KEY);
        if(dex !== null) {
            this.DEX_DATA = JSON.parse(dex);
        }
    }
}