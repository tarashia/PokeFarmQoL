/*
 * This class handles creating, removing, and handling the DOM object actions
 * for the QoL Hub.
 */
/* globals QoLHubBase DexUtilities DexPageParser EvolutionTreeParser */
// eslint-disable-next-line no-unused-vars
class QoLHub extends QoLHubBase {
    constructor(jQuery, localStorageMgr, HELPERS, GLOBALS, PAGES, DEFAULT_SETTINGS, SETTINGS) {
        super(jQuery, localStorageMgr, HELPERS, GLOBALS, PAGES, DEFAULT_SETTINGS, SETTINGS);
    }
    setupHandlers() {
        super.setupHandlers();
        const obj = this;

        obj.jQuery(document).on('click', '#updateDex', (function () {
            obj.handleUpdateDexClick(document);
        }));
    }
    resetDex() {
        this.jQuery('#clearCachedDex').next().remove();
        this.localStorageMgr.removeItem(this.GLOBALS.POKEDEX_EVOLVE_BY_LEVEL_KEY);
        this.localStorageMgr.removeItem(this.GLOBALS.POKEDEX_DEX_IDS_KEY);
        this.localStorageMgr.removeItem(this.GLOBALS.POKEDEX_EVOLUTION_TREE_DEPTH_KEY);
        this.localStorageMgr.removeItem(this.GLOBALS.POKEDEX_REGIONAL_FORMS_KEY);
        this.jQuery('#clearCachedDex').after('<span> Cleared!</span>');
    }
    build(document) {
        super.build(document);

        const dexUpdateRowContents = `<td colspan="2" class="qolDexUpdate">
            <table><tr><td>
            <input type='button' value="Update Pokedex" id="updateDex">
            <span>Date last updated:<span class="qolDate">""</span></span>
          </td></tr>
          <tr><td colspan="2" class="qolDexUpdate">
            <progress class="qolDexUpdateProgress" value="100" max="100"> 100% </progress>
            <span class="qolDexUpdateProgress">Complete!</span>
          </td></tr></table>
          </td>`;
        this.jQuery('#qolDexUpdateRow').append(dexUpdateRowContents);

        const debuggingCornerRowAppend = `<br><br>
            <span>
                Having issues with the "Update Pokedex" button or the Ready-to-Evolve feature in the Shelter?
                Use this button to erase the cached pokedex info, then use the <b>Update Pokedex</b> button to reload the pokedex.
            </span>`;
        this.jQuery('#qolDebuggingCornerRow>td').append(debuggingCornerRowAppend);

        this.jQuery('.qolDate', document).text(this.GLOBALS.DEX_UPDATE_DATE);
    }
    handleUpdateDexClick(document) {
        const obj = this;
        const localStorageManager = this.localStorageMgr;
        // Manually update GLOBALS.DEX_DATA
        localStorageManager.loadDexIntoGlobalsFromWeb(obj.jQuery, document, DexUtilities, obj.GLOBALS);

        /*
         * obj.GLOBALS.DEX_DATA will contain the latest info as is read from local storage
         * this handler updates the local storage
         */
        const progressSpan = obj.jQuery('span.qolDexUpdateProgress', document)[0];
        progressSpan.textContent = 'Loading...';

        const date = (new Date()).toUTCString();
        obj.GLOBALS.DEX_UPDATE_DATE = date;
        obj.jQuery('.qolDate', document).text(obj.GLOBALS.DEX_UPDATE_DATE);
        localStorageManager.updateLocalStorageDex(obj.jQuery, document, date, obj.GLOBALS);

        /*
         * this will update the obj.GLOBALS.EVOLVE_BY_LEVEL_LIST
         * and local storage
         */
        const virtualDocument = document.implementation.createHTMLDocument('virtual');
        DexUtilities.getMainDexPage(obj.jQuery).then((data) => {
            const html = obj.jQuery.parseHTML(data);
            const dex = obj.jQuery(html[html.length - 1], virtualDocument).find('#dexdata').html();
            const dexNumbers = localStorageManager.parseAndStoreDexNumbers(obj.GLOBALS, dex);

            if (dexNumbers.length > 0) {
                // update the progress bar in the hub
                const limit = dexNumbers.length;
                const progressBar = obj.jQuery('progress.qolDexUpdateProgress', document)[0];
                progressBar['max'] = limit;
                DexUtilities.loadDexPages(obj.jQuery, dexNumbers, progressBar, progressSpan).then((data) => {
                    const dexPagesHTML = data.map(d => (Array.isArray(d) ? d[0] : d));
                    DexUtilities.loadFormPages(obj.jQuery, virtualDocument, dexPagesHTML, progressBar, progressSpan).then((data) => {
                        const formPagesHTML = data.map(d => (Array.isArray(d) ? d[0] : d));

                        // Combine the arrays of HTML into one array
                        const allPagesHTML = dexPagesHTML.concat(formPagesHTML);

                        // Parse evolution data
                        const [parsedFamilies, dexIDs] = DexUtilities.parseEvolutionTrees(obj.jQuery, virtualDocument, DexPageParser, EvolutionTreeParser, allPagesHTML);

                        // Parse form data
                        const [formData, formMap] = DexUtilities.parseFormData(obj.jQuery, virtualDocument, DexPageParser, allPagesHTML);

                        // Build evolution tree depths
                        const evolutionTreeDepthList = DexUtilities.buildEvolutionTreeDepthsList(parsedFamilies, dexIDs, formData, formMap);

                        // Collect list of base names to make it easier down the line
                        const baseNames = DexUtilities.parseBaseNames(obj.jQuery, virtualDocument, DexPageParser, allPagesHTML);
                        // Collect list of egg pngs
                        const eggPngs = DexUtilities.parseEggsPngsList(obj.jQuery, virtualDocument, DexPageParser, allPagesHTML);
                        // Collect list of types
                        const types = DexUtilities.parseTypesList(obj.jQuery, virtualDocument, DexPageParser, obj.GLOBALS, allPagesHTML);
                        const eggPngsTypeMap = DexUtilities.buildEggPngsTypesMap(baseNames, eggPngs, types);

                        localStorageManager.saveEvolveByLevelList(obj.GLOBALS, parsedFamilies, dexIDs);
                        localStorageManager.saveEvolutionTreeDepths(obj.GLOBALS, evolutionTreeDepthList);
                        localStorageManager.saveRegionalFormsList(obj.GLOBALS, parsedFamilies, dexIDs, formMap);
                        localStorageManager.saveEggTypesMap(obj.GLOBALS, eggPngsTypeMap);
                        progressSpan.textContent = 'Complete!';
                    }, (error) => {
                        console.log(error);
                    }); // loadFormPages
                }, (error) => {
                    console.log(error);
                }); // loadDexData
            } // if dexNumbers.length > 0
            else {
                progressSpan.textContent = 'Complete!';
            }
        }, (error) => {
            console.log(error);
        });// getMainDexPage
    }
} // QoLHub