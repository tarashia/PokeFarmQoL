class PagesManager {
    static PAGES = {
        'daycare': {
            class: DaycarePage,
            setting: 'enableDaycare'
        },
        'farm': {
            class: FarmPage,
            setting: 'easyEvolve'
        },
        'fishing': {
            class: FishingPage,
            setting: 'fishingEnable'
        },
        'lab': {
            class: LabPage,
            setting: 'labNotifier'
        },
        'users': {
            class: MultiuserPage,
            setting: 'partyMod'
        },
        'fields': {
            'base': {
                class: PrivateFieldsPage,
                setting: 'privateFieldEnable'
            },
            'alt': {
                class: PublicFieldsPage,
                setting: 'publicFieldEnable'
            }
        },
        'shelter': {
            class: ShelterPage,
            setting: 'shelterEnable'
        },
        'dex': {
            class: DexPage,
            setting: 'dexFilterEnable'
        },
        'forge': {
            class: WishforgePage,
            setting: 'condenseWishforge'
        },
        'interactions': {
            class: InteractionsPage,
            setting: 'interactionsEnable'
        },
        'summary': {
            class: SummaryPage,
            setting: 'summaryEnable'
        }
    };
    static instantiatePage() {
        const urlComponents = window.location.pathname.split('/');
        const pageName = urlComponents[1]; // this should generally never be null/undefined
        if(pageName in PagesManager.PAGES) {
            let page;
            if('class' in PagesManager.PAGES[pageName]) {
                page = PagesManager.PAGES[pageName];
            }
            // we're in a special case like fields, do more URL checking
            else if(urlComponents.length>2) {
                page = PagesManager.PAGES[pageName]['alt'];
            }
            else {
                page = PagesManager.PAGES[pageName]['base'];
            }
            // init the page object & return it
            const settings = UserDataHandle.getSettings();
            if(page && 'setting' in page && settings.mainSettings[page.setting] === true) {
                console.log('QoL features enabled for page: '+pageName);
                // if init exists and is a function, run it (all pages that extend base page should have this)
                if (typeof page.class['init'] == 'function') {
                    page.class['init']();
                }
                else {
                    ErrorHandler.error('Init function not found for page: '+pageName);
                }
            }
            else {
                console.log('QoL features disabled for page: '+pageName);
            }
        }
        else {
            console.log('Not a QoL page: '+pageName);
        }
    }
}