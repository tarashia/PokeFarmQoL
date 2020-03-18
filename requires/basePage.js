class Page = {
    SETTINGS_SAVE_KEY() { return this.settingsSaveKey }
    DEFAULT_SETTINGS() { return this.defaultSettings }

    constructor(ssk, ds) {
	this.settingsSaveKey = ssk;
	this.defaultSettings = ds;
	this.settings = this.defaultSettings;
    }

    loadSettings() {
        this.settings = Helpers.loadSettings(this.settingsSaveKey,
					     this.defaultSettings,
					     this.settings);
    }

    saveSettings() {
        Helpers.saveSettings(this.settingsSaveKey, this.settings)
    }

    getSettings() {
        return this.settings;
    }
    
    populateSettings() { /* empty */ }

    settingsChange(element, textElement, customClass, typeClass) {
	/* empty */
    }

    setupHTML() { /* empty */ }
    setupCSS() { /* empty */ }
    setupObserver() { /* empty */ }
    setupHandlers() { /* empty */ }
} // Page
