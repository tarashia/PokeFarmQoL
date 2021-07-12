/* globals
   DaycarePage FarmPage LabPage PublicFieldsPage PrivateFieldsPage
   ShelterPage FishingPage MultiuserPage DexPage WishforgePage
 */
// eslint-disable-next-line no-unused-vars
class PagesManager {
    constructor(jQuery, localStorageMgr, globals, HELPERS, SETTINGS) {
        this.jQuery = jQuery;
        this.localStorageMgr = localStorageMgr;
        this.GLOBALS = globals;
        this.HELPERS = HELPERS;
        this.SETTINGS = SETTINGS;
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
        };
    }
    instantiatePages(QOLHUB) {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (QOLHUB.USER_SETTINGS[pg.setting] === true) {
                this.pages[key].object = new this.pages[key].class(this.jQuery, this.localStorageMgr, this.HELPERS, this.GLOBALS, this.SETTINGS);
            }
        }
    }
    loadSettings(QOLHUB) {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (QOLHUB.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.loadSettings();
            }
        }
    }
    saveSettings(QOLHUB) {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (QOLHUB.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.saveSettings();
            }
        }
    }
    populateSettings(QOLHUB) {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (QOLHUB.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
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
    setupHTML(GLOBALS, QOLHUB) {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (QOLHUB.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.setupHTML(GLOBALS);
            }
        }
    }
    setupCSS(QOLHUB) {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (QOLHUB.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.setupCSS();
            }
        }
    }
    setupObservers(QOLHUB) {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (QOLHUB.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.setupObserver();
            }
        }
    }
    setupHandlers(GLOBALS, QOLHUB) {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (QOLHUB.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.setupHandlers(GLOBALS);
            }
        }
    }
}