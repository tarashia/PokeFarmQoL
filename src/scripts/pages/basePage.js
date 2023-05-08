class Page {
    /* ssk should be a value from Globals indicating the storage key name
        this is only set when the page has page-specific settings
        if the page does not have settings, pass undefined instead */
    constructor(ssk, ds, url) {
        this.settingsSaveKey = ssk;
        this.defaultSettings = ds;
        this.url = url;
        this.settings = this.defaultSettings;
        this.USER_SETTINGS = UserSettingsHandle.getSettings();
        this.POKEDEX = UserSettingsHandle.getDex();
    }

    onPage(w) {
        return w.location.href.indexOf(`pokefarm.com/${this.url}`) != -1;
    }

    loadSettings() {
        this.settings = LocalStorageManager.loadSettings(
            this.settingsSaveKey,
            this.defaultSettings,
            this.settings);
    }

    saveSettings() {
        LocalStorageManager.saveSettings(this.settingsSaveKey, this.settings);
    }

    populateSettings(obj) {
        if(obj === undefined) {
            obj = this.settings;
        }
        for (const key in obj) {
            if (!Object.prototype.hasOwnProperty.call(obj, key)) {
                continue;
            }
            const value = obj[key];
            if (typeof value === 'object') {
                this.populateSettings(obj[key]);
            }
            else if (typeof value === 'boolean') {
                Helpers.toggleSetting(key, value);//, false);
            }
            else if (typeof value === 'string') {
                console.log('TODO - split and populate');
            }
        }
    }

    resetSettings() {
        this.settings = JSON.parse(JSON.stringify(this.defaultSettings));
        this.saveSettings();
    }

    addSettingChangeListener(callback) {
        const obj = this;
        $(document).on('input', '.qolsetting', (function () { //Changes QoL settings
            obj.settingsChange(this.getAttribute('data-key'),
                $(this).val(),
                $(this).parent().parent().attr('class'),
                $(this).parent().attr('class'),
                (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
            obj.saveSettings();
            callback();
        }));
    }

    settingsChange(element, textElement, customClass, typeClass, arrayName) {
        if (JSON.stringify(this.settings).indexOf(element) >= 0) {
            if (typeof this.settings[element] === 'boolean') {
                this.settings[element] = !this.settings[element];
            }
            else if (typeof this.settings[element] === 'string') {
                if (arrayName !== undefined && arrayName !== '') {
                    if (textElement === 'none') {
                        const tempIndex = typeClass - 1;
                        this[arrayName].splice(tempIndex, tempIndex);
                        this.settings[element] = this[arrayName].toString();
                    } else {
                        let tempIndex = -1;
                        if(typeClass !== undefined) {
                            tempIndex = typeClass - 1; // select array
                        } else if(customClass !== undefined) {
                            tempIndex = customClass - 1; // textfield array
                        }
                        this[arrayName][tempIndex] = textElement;
                        this.settings[element] = this[arrayName].toString();
                    }
                }
                else {
                    this.settings[element] = textElement;
                }
            }
            return true;
        }
        else { return false; }
    }

    setupHTML() { /* empty */ }
    setupCSS() { /* empty */ }
    setupObserver() { /* empty */ }
    setupHandlers() { 
        $('input.qolalone').on('change', function () { //only 1 checkbox may be true
            $('input.qolalone').not(this).prop('checked', false);
        });
    }
} // Page