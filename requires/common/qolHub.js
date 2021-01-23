/* This class handles creating, removing, and handling the DOM object actions
 * for the QoL Hub.
 */

// eslint-disable-next-line no-unused-vars
class QoLHub {
    DEFAULT_USER_SETTINGS = { // default settings when the script gets loaded the first time
        customCss: '',
        enableDaycare: true,
        shelterEnable: true,
        fishingEnable: true,
        publicFieldEnable: true,
        privateFieldEnable: true,
        partyMod: true,
        easyEvolve: true,
        labNotifier: true,
        dexFilterEnable: true,
        condenseWishforge: true
    };
    USER_SETTINGS = QoLHub.DEFAULT_USER_SETTINGS;
    constructor(jQuery, GLOBALS, PAGES) {
        this.jQuery = jQuery;
        this.GLOBALS = GLOBALS;
        this.PAGES = PAGES;
        this.SETTINGS_SAVE_KEY = GLOBALS.SETTINGS_SAVE_KEY;
    }
    setupCSS() {
        //custom user css
        const customUserCss = this.USER_SETTINGS.customCss;
        //document.querySelector('head').append();
        this.jQuery('head').append('<style type="text/css">' + customUserCss + '</style>');
    }
    setupHandlers() {
        const obj = this;
        obj.jQuery('#qolcustomcss', document).on('keydown', function (e) {
            if (e.keyCode == 9 || e.which == 9) {
                e.preventDefault();
                const s = this.selectionStart;
                obj.jQuery(this).val(function (i, v) {
                    return v.substring(0, s) + '\t' + v.substring(this.selectionEnd);
                });
                this.selectionEnd = s + 1;
            }
        });

        obj.jQuery(document).on('input', '.qolsetting', (function () { //Changes QoL settings
            obj.settingsChange(this.getAttribute('data-key'),
                obj.jQuery(this).val(),
                obj.jQuery(this).parent().parent().attr('class'),
                obj.jQuery(this).parent().attr('class'),
                (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
        }));

        obj.jQuery(document).on('click', '.closeHub', (function () { //close QoL hub
            QoLHub.close(document);
        }));

        obj.jQuery(document).on('click', '#resetPageSettings', (function () {
            const page = obj.jQuery(this).parent().find('select').val();
            obj.clearPageSettings(page);
        }));

        obj.jQuery(document).on('click', '#updateDex', (function () {
            obj.handleUpdateDexClick(document);
        }));

        // Issue #61 - Item 6 - Remove the 'Cleared!' message so the user knows they can click it again
        obj.jQuery(document).on('mouseover', '#clearCachedDex', (function () {
            obj.jQuery('#clearCachedDex').next().remove();
        }));

        // Issue #61 - Item 6 - Add a 'Cleared!' message so the user knows that the clearing works
        obj.jQuery(document).on('click', '#clearCachedDex', (function () {
            obj.jQuery('#clearCachedDex').next().remove();
            localStorage.removeItem('QoLEvolveByLevel');
            localStorage.removeItem('QoLDexIDsCache');
            localStorage.removeItem('QoLEvolutionTreeDepth');
            localStorage.removeItem('QoLRegionalFormsList');
            obj.jQuery('#clearCachedDex').after('<span> Cleared!</span>');
        }));

        obj.jQuery(document).on('click', 'h3.slidermenu', (function () { //show hidden li in change log
            obj.jQuery(this).next().slideToggle();
        }));
    }
    loadSettings() {
        if (localStorage.getItem(this.SETTINGS_SAVE_KEY) === null) {
            this.saveSettings();
        } else {
            try {
                const countScriptSettings = Object.keys(this.USER_SETTINGS).length;
                const localStorageString = JSON.parse(localStorage.getItem(this.SETTINGS_SAVE_KEY));
                const countLocalStorageSettings = Object.keys(localStorageString).length;
                // adds new objects (settings) to the local storage
                if (countLocalStorageSettings < countScriptSettings) {
                    const defaultsSetting = this.USER_SETTINGS;
                    const userSetting = JSON.parse(localStorage.getItem(this.SETTINGS_SAVE_KEY));
                    const newSetting = this.jQuery.extend(true, {}, defaultsSetting, userSetting);

                    this.USER_SETTINGS = newSetting;
                    this.saveSettings();
                }
                // removes objects from the local storage if they don't exist anymore. Not yet possible..
                if (countLocalStorageSettings > countScriptSettings) {
                    //let defaultsSetting = QOLHUB.USER_SETTINGS;
                    //let userSetting = JSON.parse(localStorage.getItem(QOLHUB.SETTINGS_SAVE_KEY));
                    this.saveSettings();
                }
            }
            catch (err) {
                this.saveSettings();
            }
            if (localStorage.getItem(this.SETTINGS_SAVE_KEY) != this.USER_SETTINGS) {
                this.USER_SETTINGS = JSON.parse(localStorage.getItem(this.SETTINGS_SAVE_KEY));
            }
        }
    }
    saveSettings() {
        localStorage.setItem(this.SETTINGS_SAVE_KEY, JSON.stringify(this.USER_SETTINGS));
    }
    populateSettings(HELPERS) {
        for (const key in this.USER_SETTINGS) {
            if (Object.hasOwnProperty.call(this.USER_SETTINGS, key)) {
                const value = this.USER_SETTINGS[key];
                if (typeof value === 'boolean') {
                    HELPERS.toggleSetting(key, value);
                }
                else if (typeof value === 'string') {
                    HELPERS.toggleSetting(key, value);
                }
            }
        }
    }
    settingsChange(element, textElement) {
        if (JSON.stringify(this.USER_SETTINGS).indexOf(element) >= 0) { // userscript settings
            if (this.USER_SETTINGS[element] === false) {
                this.USER_SETTINGS[element] = true;
            } else if (this.USER_SETTINGS[element] === true) {
                this.USER_SETTINGS[element] = false;
            } else if (typeof this.USER_SETTINGS[element] === 'string') {
                this.USER_SETTINGS[element] = textElement;
            }
            this.saveSettings();
            return true;
        }
        return false;
    }
    clearPageSettings(pageName) {
        if (pageName !== 'None') { // "None" matches option in HTML
            this.PAGES.clearPageSettings(pageName);
        }
    }
    build(document) {
        this.jQuery('body', document).append(this.GLOBALS.TEMPLATES.qolHubHTML);
        this.jQuery('#core', document).addClass('scrolllock');
        const qolHubCssBackgroundHead = document.querySelector('.qolHubHead.qolHubSuperHead').style.backgroundColor;
        const qolHubCssTextColorHead = document.querySelector('.qolHubHead.qolHubSuperHead').style.color;
        const qolHubCssBackground = document.querySelector('.qolHubTable').style.backgroundColor;
        const qolHubCssTextColor = document.querySelector('.qolHubTable').style.color;
        document.querySelector('.qolHubHead').style.backgroundColor = '' + qolHubCssBackgroundHead + '';
        document.querySelector('.qolHubHead').style.color = '' + qolHubCssTextColorHead + '';
        document.querySelector('.qolChangeLogHead').style.backgroundColor = '' + qolHubCssBackgroundHead + '';
        document.querySelector('.qolChangeLogHead').style.color = '' + qolHubCssTextColorHead + '';
        document.querySelector('.qolopencloselist.qolChangeLogContent').style.backgroundColor = '' + qolHubCssBackground + '';
        document.querySelector('.qolopencloselist.qolChangeLogContent').style.color = '' + qolHubCssTextColor + '';
        this.jQuery('.qolDate', document).text(this.GLOBALS.DEX_UPDATE_DATE);

        const customCss = this.USER_SETTINGS.customCss;

        this.jQuery('.textareahub', document).append('<textarea id="qolcustomcss" rows="15" cols="60" class="qolsetting" data-key="customCss"/></textarea>');
        if (customCss === '') {
            this.jQuery('.textareahub textarea', document).val('#thisisanexample {\n    color: yellow;\n}\n\n.thisisalsoanexample {\n    background-color: blue!important;\n}\n\nhappycssing {\n    display: absolute;\n}');
        } else {
            this.jQuery('.textareahub textarea', document).val(customCss);
        }
    }
    close(document) {
        this.jQuery('.dialog', document).remove();
        this.jQuery('#core', document).removeClass('scrolllock');
    }
    handleUpdateDexClick(document, dexUtilities, localStorageManager, dexPageParser, evolutionTreeParser, globals) {
        const obj = this;
        // Manually update GLOBALS.DEX_DATA
        localStorageManager.loadDexIntoGlobalsFromWeb(obj.jQuery, document, dexUtilities, globals);

        // globals.DEX_DATA will contain the latest info as is read from local storage
        // this handler updates the local storage
        const progressSpan = obj.jQuery('span.qolDexUpdateProgress', document)[0];
        progressSpan.textContent = 'Loading...';

        const date = (new Date()).toUTCString();
        globals.DEX_UPDATE_DATE = date;
        obj.jQuery('.qolDate', document).text(globals.DEX_UPDATE_DATE);
        localStorageManager.updateLocalStorageDex(obj.jQuery, document, date, globals);

        // this will update the globals.EVOLVE_BY_LEVEL_LIST
        // and local storage
        const virtualDocument = document.implementation.createHTMLDocument('virtual');
        dexUtilities.getMainDexPage(obj.jQuery).then((data) => {
            const html = obj.jQuery.parseHTML(data);
            const dex = obj.jQuery(html[html.length - 1], virtualDocument).find('#dexdata').html();
            const dexNumbers = localStorageManager.parseAndStoreDexNumbers(dex);

            if (dexNumbers.length > 0) {
                // update the progress bar in the hub
                const limit = dexNumbers.length;
                const progressBar = obj.jQuery('progress.qolDexUpdateProgress', document)[0];
                progressBar['max'] = limit;
                dexUtilities.loadDexPages(obj.jQuery, dexNumbers, progressBar, progressSpan).then((data) => {
                    const dexPagesHTML = data.map(d => (Array.isArray(d) ? d[0] : d));
                    dexUtilities.loadFormPages(obj.jQuery, virtualDocument, dexPagesHTML, progressBar, progressSpan).then((data) => {
                        const formPagesHTML = data.map(d => (Array.isArray(d) ? d[0] : d));

                        // Combine the arrays of HTML into one array
                        const allPagesHTML = dexPagesHTML.concat(formPagesHTML);

                        // Parse evolution data
                        const [parsedFamilies, dexIDs] = dexUtilities.parseEvolutionTrees(obj.jQuery, virtualDocument, dexPageParser, evolutionTreeParser, allPagesHTML);

                        // Parse form data
                        const [formData, formMap] = dexUtilities.parseFormData(obj.jQuery, virtualDocument, dexPageParser, allPagesHTML);

                        // Build evolution tree depths
                        const evolutionTreeDepthList = dexUtilities.buildEvolutionTreeDepthsList(parsedFamilies, dexIDs, formData, formMap);

                        // Collect regional form data
                        const regionalFormMap = dexUtilities.buildRegionalFormsMap(formMap);

                        // Collect list of base names to make it easier down the line
                        const baseNames = dexUtilities.parseBaseNames(obj.jQuery, virtualDocument, dexPageParser, allPagesHTML);
                        // Collect list of egg pngs
                        const eggPngs = dexUtilities.parseEggsPngsList(obj.jQuery, virtualDocument, dexPageParser, allPagesHTML);
                        // Collect list of types
                        const types = dexUtilities.parseTypesList(obj.jQuery, virtualDocument, dexPageParser, globals, allPagesHTML);
                        const eggPngsTypeMap = dexUtilities.buildEggPngsTypesMap(baseNames, eggPngs, types);

                        localStorageManager.saveEvolveByLevelList(globals, parsedFamilies, dexIDs);
                        localStorageManager.saveEvolutionTreeDepths(globals, evolutionTreeDepthList);
                        localStorageManager.saveRegionalFormsList(globals, parsedFamilies, dexIDs, regionalFormMap);
                        localStorageManager.saveEggTypesMap(globals, eggPngsTypeMap);
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