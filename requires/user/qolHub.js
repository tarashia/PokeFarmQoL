/* This class handles creating, removing, and handling the DOM object actions
 * for the QoL Hub.
 */
/* globals QoLHubBase DexUtilities DexPageParser EvolutionTreeParser */
// eslint-disable-next-line no-unused-vars
class QoLHub extends QoLHubBase {
    constructor(jQuery, GLOBALS, PAGES, SETTINGS, localStorageManager) {
        super(jQuery, GLOBALS, PAGES, SETTINGS);
        this.LOCAL_STORAGE = localStorageManager;
    }
    build(document) {
        super.build(document);
        this.jQuery('.qolDate', document).text(this.GLOBALS.DEX_UPDATE_DATE);
    }
    handleUpdateDexClick(document) {
        const obj = this;
        // Manually update GLOBALS.DEX_DATA
        obj.localStorageManager.loadDexIntoGlobalsFromWeb(obj.jQuery, document, DexUtilities, obj.globals);

        // obj.globals.DEX_DATA will contain the latest info as is read from local storage
        // this handler updates the local storage
        const progressSpan = obj.jQuery('span.qolDexUpdateProgress', document)[0];
        progressSpan.textContent = 'Loading...';

        const date = (new Date()).toUTCString();
        obj.globals.DEX_UPDATE_DATE = date;
        obj.jQuery('.qolDate', document).text(obj.globals.DEX_UPDATE_DATE);
        obj.localStorageManager.updateLocalStorageDex(obj.jQuery, document, date, obj.globals);

        // this will update the obj.globals.EVOLVE_BY_LEVEL_LIST
        // and local storage
        const virtualDocument = document.implementation.createHTMLDocument('virtual');
        DexUtilities.getMainDexPage(obj.jQuery).then((data) => {
            const html = obj.jQuery.parseHTML(data);
            const dex = obj.jQuery(html[html.length - 1], virtualDocument).find('#dexdata').html();
            const dexNumbers = obj.localStorageManager.parseAndStoreDexNumbers(dex);

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

                        // Collect regional form data
                        const regionalFormMap = DexUtilities.buildRegionalFormsMap(formMap);

                        // Collect list of base names to make it easier down the line
                        const baseNames = DexUtilities.parseBaseNames(obj.jQuery, virtualDocument, DexPageParser, allPagesHTML);
                        // Collect list of egg pngs
                        const eggPngs = DexUtilities.parseEggsPngsList(obj.jQuery, virtualDocument, DexPageParser, allPagesHTML);
                        // Collect list of types
                        const types = DexUtilities.parseTypesList(obj.jQuery, virtualDocument, DexPageParser, obj.globals, allPagesHTML);
                        const eggPngsTypeMap = DexUtilities.buildEggPngsTypesMap(baseNames, eggPngs, types);

                        obj.localStorageManager.saveEvolveByLevelList(obj.globals, parsedFamilies, dexIDs);
                        obj.localStorageManager.saveEvolutionTreeDepths(obj.globals, evolutionTreeDepthList);
                        obj.localStorageManager.saveRegionalFormsList(obj.globals, parsedFamilies, dexIDs, regionalFormMap);
                        obj.localStorageManager.saveEggTypesMap(obj.globals, eggPngsTypeMap);
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

if (module) {
    module.exports.QoLHub = QoLHub;
}