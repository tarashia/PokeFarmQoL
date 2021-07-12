/*
 * This class handles creating, removing, and handling the DOM object actions
 * for the QoL Hub.
 */
// eslint-disable-next-line no-unused-vars
class QoLHubBase {
    constructor(jQuery, localStorageMgr, HELPERS, GLOBALS, PAGES, DEFAULT_SETTINGS, SETTINGS) {
        this.jQuery = jQuery;
        this.localStorageMgr = localStorageMgr;
        this.HELPERS = HELPERS;
        this.GLOBALS = GLOBALS;
        this.PAGES = PAGES;
        this.SETTINGS_SAVE_KEY = GLOBALS.SETTINGS_SAVE_KEY;
        this.DEFAULT_USER_SETTINGS = DEFAULT_SETTINGS;
        if (SETTINGS) {
            this.USER_SETTINGS = SETTINGS;
        }
        else {
            this.USER_SETTINGS = this.DEFAULT_USER_SETTINGS;
        }
        this.LINKED_SETTINGS = this.USER_SETTINGS.LINKED_SETTINGS;
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

        obj.jQuery(document).on('input', '.qolhubsetting', (function () { //Changes QoL settings
            const dataKey = this.getAttribute('data-key');
            obj.settingsChange(this.getAttribute('data-key'),
                obj.jQuery(this).val(),
                obj.jQuery(this).parent().parent().attr('class'),
                obj.jQuery(this).parent().attr('class'),
                (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
            obj.handleLinkedSetting(dataKey);
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

        // Issue #61 - Item 6 - Remove the 'Cleared!' message so the user knows they can click it again
        obj.jQuery(document).on('mouseover', '#clearCachedDex', (function () {
            obj.jQuery('#clearCachedDex').next().remove();
        }));

        // Issue #61 - Item 6 - Add a 'Cleared!' message so the user knows that the clearing works
        obj.jQuery(document).on('click', '#clearCachedDex', (function () {
            obj.resetDex();
        }));
    }
    loadSettings() {
        if (this.localStorageMgr.getItem(this.SETTINGS_SAVE_KEY) === null) {
            this.saveSettings();
        } else {
            if(this.USER_SETTINGS.load(JSON.parse(this.localStorageMgr.getItem(this.SETTINGS_SAVE_KEY)))) {
                this.saveSettings();
            }
        }
    }
    saveSettings() {
        this.localStorageMgr.setItem(this.SETTINGS_SAVE_KEY, JSON.stringify(this.USER_SETTINGS));
    }
    populateSettings() {
        function populateSetting(object, key, self, oldKeys) {
            oldKeys = oldKeys || [];
            const _object = object[key];
            const newKeys = [...oldKeys, key];
            if (typeof _object === 'boolean') {
                const _key = newKeys.join('.');
                self.HELPERS.toggleSetting(_key, _object, 'qolhubsetting');
            }
            else if (typeof _object === 'string') {
                const _key = newKeys.join('.');
                self.HELPERS.toggleSetting(_key, _object, 'qolhubsetting');
            } else if (typeof _object === 'object') {
                for (const _key in _object) {
                    populateSetting(_object, _key, self, newKeys);
                }
            }
        }
        for (const key in this.USER_SETTINGS) {
            if (Object.hasOwnProperty.call(this.USER_SETTINGS, key)) {
                populateSetting(this.USER_SETTINGS, key, this);
            }
            this.handleLinkedSetting(key);
        }
    }
    settingsChange(element, textElement) {
        function getProperty( propertyName, object ) {
            const parts = propertyName.split( '.' );
            const length = parts.length;
            let property = object || this;

            for (let i = 0; i < length; i++ ) {
                if ( ! Object.hasOwnProperty.call(property, parts[i])) {
                    return null;
                }
                property = property[parts[i]];
            }
            return property;
        }

        function setProperty( propertyName, object, newValue) {
            const parts = propertyName.split('.');
            const first = parts[0];
            const rest = parts.slice(1);

            if ( !Object.hasOwnProperty.call(object, first)) {
                return false;
            }
            else if (rest.length == 0) {
                object[first] = newValue;
                return true;
            } else {
                return setProperty(rest.join('.'), object[first], newValue);
            }
        }

        const oldValue = getProperty(element, this.USER_SETTINGS);
        let newValue;
        if (oldValue !== undefined) { // userscript settings
            if (oldValue === false) {
                newValue = true;
            } else if (oldValue === true) {
                newValue = false;
            } else if (typeof oldValue === 'string') {
                newValue = textElement;
            }
            if(!setProperty(element, this.USER_SETTINGS, newValue)) {
                return false;
            } else {
                this.saveSettings();
                return true;
            }
        }
        return false;
    }
    clearPageSettings(pageName) {
        if (pageName !== 'None') { // "None" matches option in HTML
            this.PAGES.clearPageSettings(pageName);
        }
    }
    handleLinkedSetting(possibleManager) {
        const linkedSettingIndex = this.LINKED_SETTINGS.findIndex(ls => ls.manager === possibleManager);
        if(linkedSettingIndex > -1) {
            const managed = this.LINKED_SETTINGS[linkedSettingIndex].managed;
            const userSettings = this.USER_SETTINGS[managed];
            if(this.jQuery(`[data-key=${possibleManager}]`).prop('checked') === false) {
                for(const setting in userSettings) {
                    this.jQuery(`[data-key="${managed}.${setting}"]`).prop('disabled', true);
                }
            } else {
                for(const setting in userSettings) {
                    this.jQuery(`[data-key="${managed}.${setting}"]`).prop('disabled', false);
                }
            }
        }
    }
    build(document) {
        this.jQuery('body', document).append(this.GLOBALS.TEMPLATES.qolHubHTML);
        this.jQuery('#core', document).addClass('scrolllock');
        const qolHubCssBackgroundHead = this.jQuery('.qolHubHead.qolHubSuperHead').css('background-color');
        const qolHubCssTextColorHead = this.jQuery('.qolHubHead.qolHubSuperHead').css('color');
        const qolHubCssBackground = this.jQuery('.qolHubTable').css('background-color');
        const qolHubCssTextColor = this.jQuery('.qolHubTable').css('color');
        const qolHubDialogBorder = this.jQuery('.dialog>div>div>div').css('border');
        this.jQuery('.qolHubHead').css('background-color', qolHubCssBackgroundHead);
        this.jQuery('.qolHubHead').css('color', qolHubCssTextColorHead);
        this.jQuery('.qolChangeLogHead').css('background-color', qolHubCssBackgroundHead);
        this.jQuery('.qolChangeLogHead').css('color', qolHubCssTextColorHead);
        this.jQuery('.qolChangeLogHead').css('border', qolHubDialogBorder);
        this.jQuery('.qolopencloselist.qolChangeLogContent').css('background-color', qolHubCssBackground);
        this.jQuery('.qolopencloselist.qolChangeLogContent').css('color', qolHubCssTextColor);

        this.jQuery('.qolAllSettings').css('border', qolHubDialogBorder);

        const customCss = this.USER_SETTINGS.customCss;

        this.jQuery('.textareahub', document).append('<textarea id="qolcustomcss" rows="15" cols="60" class="qolhubsetting" data-key="customCss"/></textarea>');
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