/* globals GlobalsBase */
// eslint-disable-next-line no-unused-vars
class Globals extends GlobalsBase {
    constructor(jQuery, localStorageMgr, helpers) {
        super(helpers);
        this.jQuery = jQuery;
        this.localStorageMgr = localStorageMgr;

        // filled in by LocalStorageManager
        this.EVOLVE_BY_LEVEL_LIST = null;
        this.EVOLUTIONS_LEFT = null;
    }
}