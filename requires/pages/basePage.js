class Page {
    SETTINGS_SAVE_KEY() { return this.settingsSaveKey }
    DEFAULT_SETTINGS() { return this.defaultSettings }

    constructor(ssk, ds, url) {
        this.settingsSaveKey = ssk;
        this.defaultSettings = ds;
        this.url = url
        this.settings = this.defaultSettings;
    }

    onPage(w) {
        return w.location.href.indexOf(this.url) != -1
    }

    loadSettings() {
        this.settings =
            Helpers.loadSettings(this.settingsSaveKey,
                                 this.defaultSettings,
                                 this.settings);
    }

    saveSettings() {
        Helpers.saveSettings(this.settingsSaveKey, this.settings)
    }

    populateSettings(obj) {
        if(obj === undefined) {
            obj = this.settings
        }
        for (let key in obj) {
            if (!obj.hasOwnProperty(key)) {
                continue;
            }
            let value = obj[key];
            if (typeof value === 'object') {
                this.populateSettings(obj[key])
            }
            else if (typeof value === 'boolean') {
                Helpers.toggleSetting(key, value, false);
            }
            else if (typeof value === 'string') {
                console.log("TODO - split and populate")
                // Helpers.toggleSetting(key, value, false);
            }
        }
    }

    resetSettings() {
        this.settings = JSON.parse(JSON.stringify(this.defaultSettings));
        this.saveSettings()
    }

    settingsChange(element, textElement, customClass, typeClass, arrayName) {
        if (JSON.stringify(this.settings).indexOf(element) >= 0) {
            if (typeof this.settings[element] === 'boolean') {
                this.settings[element] = !this.settings[element]
            } else if (typeof this.settings[element] === 'string') {
                if (arrayName !== undefined && arrayName !== '') {
                    if (textElement === 'none') {
                        let tempIndex = typeClass - 1;
                        this[arrayName].splice(tempIndex, tempIndex);
                        this.settings[element] = this[arrayName].toString();
                    } else {
                        let tempIndex = -1;
                        if(typeClass !== undefined) {
                            tempIndex = typeClass - 1 // select array
                        } else if(customClass !== undefined) {
                            tempIndex = customClass - 1 // textfield array
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
        else { return false }
    }

    setupHTML() { /* empty */ }
    setupCSS() { /* empty */ }
    setupObserver() { /* empty */ }
    setupHandlers() { /* empty */ }
} // Page
