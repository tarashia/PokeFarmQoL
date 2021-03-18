/* globals GlobalsBase */
// eslint-disable-next-line no-unused-vars
class Globals extends GlobalsBase {
    constructor() {
        super();

        // load the dex from local storage if it exists
        const dex = localStorage.getItem('QoLPokedex');
        if(dex !== null) {
            this.DEX_DATA = JSON.parse(localStorage.getItem('QoLPokedex'));
        }
    }
}