/* globals GlobalsBase */
// eslint-disable-next-line no-unused-vars
class Globals extends GlobalsBase {
    constructor(jQuery, localStorageMgr) {
        super();
        this.jQuery = jQuery;
        this.localStorageMgr = localStorageMgr;
    }
}
