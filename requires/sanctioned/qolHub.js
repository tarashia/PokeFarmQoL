/* This class handles creating, removing, and handling the DOM object actions
 * for the QoL Hub.
 */
/* globals QoLHubBase */
// eslint-disable-next-line no-unused-vars
class QoLHub extends QoLHubBase {
    constructor(jQuery, localStorageMgr, GLOBALS, PAGES, SETTINGS) {
        super(jQuery, localStorageMgr, GLOBALS, PAGES, SETTINGS);
    }
    build(document) {
        super.build(document);

        const dexUpdateRowContents = `<span>Notice that you can't find the newly added Eggs or Pokemon in shelter?
          You may have to update your pokedex. Please visit the Dex page, and the Userscript will update itself with
          the newest pokemon.</span>
          <span>Date last updated:<span class="qolDate">""</span></span>`;
        this.jQuery('#qolDexUpdateRow').append(dexUpdateRowContents);

        this.jQuery('.qolDate', document).text(this.GLOBALS.DEX_UPDATE_DATE);

    }
} // QoLHub