class PagesManager {
    constructor() {
        this.USER_SETTINGS = UserSettingsHandle.getSettings();
        this.pages = {
            'Daycare': {
                class: DaycarePage,
                object: undefined,
                setting: 'enableDaycare'
            },
            'Farm': {
                class: FarmPage,
                object: undefined,
                setting: 'easyEvolve'
            },
            'Fishing': {
                class: FishingPage,
                object: undefined,
                setting: 'fishingEnable'
            },
            'Lab': {
                class: LabPage,
                object: undefined,
                setting: 'labNotifier'
            },
            'Multiuser': {
                class: MultiuserPage,
                object: undefined,
                setting: 'partyMod'
            },
            'PrivateFields': {
                class: PrivateFieldsPage,
                object: undefined,
                setting: 'privateFieldEnable'
            },
            'PublicFields': {
                class: PublicFieldsPage,
                object: undefined,
                setting: 'publicFieldEnable'
            },
            'Shelter': {
                class: ShelterPage,
                object: undefined,
                setting: 'shelterEnable'
            },
            'Dex': {
                class: DexPage,
                object: undefined,
                setting: 'dexFilterEnable'
            },
            'Wishforge': {
                class: WishforgePage,
                object: undefined,
                setting: 'condenseWishforge'
            },
            'Interactions': {
                class: InteractionsPage,
                object: undefined,
                setting: 'interactionsEnable'
            },
            'Summary': {
                class: SummaryPage,
                object: undefined,
                setting: 'summaryEnable'
            }
        };
    }
    instantiatePages() {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (this.USER_SETTINGS[pg.setting] === true) {
                pg.object = new pg.class(this.USER_SETTINGS);
            }
        }
    }
    loadSettings() {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (this.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.loadSettings();
            }
        }
    }
    saveSettings() {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (this.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.saveSettings();
            }
        }
    }
    populateSettings() {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (this.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.populateSettings();
            }
        }
    }
    clearPageSettings(pageName) {
        if (!(pageName in this.pages)) {
            console.error(`Could not proceed with clearing page settings. Page ${pageName} not found in list of pages`);
        } else if (this.pages[pageName].object) {
            this.pages[pageName].object.resetSettings();
        }
    }
    clearAllPageSettings() {
        for(var pageName in this.pages) {
            this.clearPageSettings(pageName);
        }
    }
    setupHTML() {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (this.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.setupHTML();
            }
        }
    }
    setupCSS() {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (this.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.setupCSS();
            }
        }
    }
    setupObservers() {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (this.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.setupObserver();
            }
        }
    }
    setupHandlers() {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (this.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.setupHandlers();
            }
        }
    }
}