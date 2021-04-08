/* This class handles creating, removing, and handling the DOM object actions
 * for the QoL Hub.
 */
/* globals Helpers */
// eslint-disable-next-line no-unused-vars
class QoLHubBase {
    static DEFAULT_USER_SETTINGS = { // default settings when the script gets loaded the first time
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
    constructor(jQuery, localStorageMgr, GLOBALS, PAGES, SETTINGS) {
        this.jQuery = jQuery;
        this.localStorageMgr = localStorageMgr;
        this.GLOBALS = GLOBALS;
        this.PAGES = PAGES;
        this.SETTINGS_SAVE_KEY = GLOBALS.SETTINGS_SAVE_KEY;
        if(SETTINGS) {
            this.USER_SETTINGS = SETTINGS;
        }
        else {
            this.USER_SETTINGS = QoLHubBase.DEFAULT_USER_SETTINGS;
        }
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
            obj.close(document);
        }));

        obj.jQuery(document).on('click', '#resetPageSettings', (function () {
            const page = obj.jQuery(this).parent().find('select').val();
            obj.clearPageSettings(page);
        }));

        obj.jQuery(document).on('click', 'h3.slidermenu', (function () { //show hidden li in change log
            obj.jQuery(this).next().slideToggle();
        }));
    }
    loadSettings() {
        if (this.localStorageMgr.getItem(this.SETTINGS_SAVE_KEY) === null) {
            this.saveSettings();
        } else {
            try {
                const countScriptSettings = Object.keys(this.USER_SETTINGS).length;
                const localStorageString = JSON.parse(this.localStorageMgr.getItem(this.SETTINGS_SAVE_KEY));
                const countLocalStorageSettings = Object.keys(localStorageString).length;
                // adds new objects (settings) to the local storage
                if (countLocalStorageSettings < countScriptSettings) {
                    const defaultsSetting = this.USER_SETTINGS;
                    const userSetting = JSON.parse(this.localStorageMgr.getItem(this.SETTINGS_SAVE_KEY));
                    const newSetting = this.jQuery.extend(true, {}, defaultsSetting, userSetting);

                    this.USER_SETTINGS = newSetting;
                    this.saveSettings();
                }
                // removes objects from the local storage if they don't exist anymore. Not yet possible..
                if (countLocalStorageSettings > countScriptSettings) {
                    //let defaultsSetting = QOLHUB.USER_SETTINGS;
                    //let userSetting = JSON.parse(this.localStorageMgr.getItem(QOLHUB.SETTINGS_SAVE_KEY));
                    this.saveSettings();
                }
            }
            catch (err) {
                this.saveSettings();
            }
            if (this.localStorageMgr.getItem(this.SETTINGS_SAVE_KEY) != this.USER_SETTINGS) {
                this.USER_SETTINGS = JSON.parse(this.localStorageMgr.getItem(this.SETTINGS_SAVE_KEY));
            }
        }
    }
    saveSettings() {
        this.localStorageMgr.setItem(this.SETTINGS_SAVE_KEY, JSON.stringify(this.USER_SETTINGS));
    }
    populateSettings() {
        for (const key in this.USER_SETTINGS) {
            if (Object.hasOwnProperty.call(this.USER_SETTINGS, key)) {
                const value = this.USER_SETTINGS[key];
                if (typeof value === 'boolean') {
                    Helpers.toggleSetting(key, value);
                }
                else if (typeof value === 'string') {
                    Helpers.toggleSetting(key, value);
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
} // QoLHubBase