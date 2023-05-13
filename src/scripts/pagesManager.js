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
            class: PrivateFieldsPage,
            setting: 'privateFieldEnable',
            'public': {
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
        let pageName = urlComponents[1]; // this should generally never be null/undefined
        if(pageName in PagesManager.PAGES) {
            let page = PagesManager.PAGES[pageName];
            // check for public fields (shares base URL with private fields)
            if(pageName=='fields') {
                if(urlComponents.length>2) {
                    page = PagesManager.PAGES.fields.public;
                    pageName = 'fields (public)';
                }
                else {
                    pageName = 'fields (private)';
                }
            }
            // initialize the page if this is a supported page, and the user has enabled its main setting
            const settings = UserDataHandle.getSettings();
            if(page && 'setting' in page && settings.QoLSettings[page.setting] === true) {
                console.log('QoL features enabled for page: '+pageName);
                return new page.class();
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