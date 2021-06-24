/*
 * This class handles creating, removing, and handling the DOM object actions
 * for the QoL Hub.
 */
/* globals QoLHubBase */
// eslint-disable-next-line no-unused-vars
class QoLHub extends QoLHubBase {
    constructor(jQuery, localStorageMgr, HELPERS, GLOBALS, PAGES, DEFAULT_SETTINGS, SETTINGS) {
        super(jQuery, localStorageMgr, HELPERS, GLOBALS, PAGES, DEFAULT_SETTINGS, SETTINGS);
    }
    resetDex() {
        this.jQuery('#clearCachedDex').next().remove();
        this.GLOBALS.DEX_UPDATE_DATE = null;
        this.GLOBALS.DEX_DATA = null;
        this.localStorageMgr.removeItem(this.GLOBALS.POKEDEX_DATA_KEY);
        this.jQuery('#clearCachedDex').after('<span> Cleared!</span>');
    }
    build(document) {
        super.build(document);

        const dexUpdateRowContents = `<td colspan="2" class="qolAllSettings">
          <span>Notice that you can't find the newly added Eggs or Pokemon in shelter?
          You may have to update your pokedex. Please visit the Dex page, and the Userscript will update itself with
          the newest pokemon. Then, in order to use the update, refresh the page where you are using the script's search features.</span><br>
          <span>Date last updated:<span class="qolDate">""</span></span>
          </td>`;
        this.jQuery('#qolDexUpdateRow').append(dexUpdateRowContents);

        const dexUpdateDate = (this.GLOBALS.DEX_UPDATE_DATE === null) ?
            'Not updated since installation' :
            this.GLOBALS.DEX_UPDATE_DATE;
        this.jQuery('.qolDate', document).text(dexUpdateDate);

    }
} // QoLHub