class PagesManager {
    // Lists the pages the QoL should activate on, and which features should be loaded
    // Each key should be a regex that can match everything after .com/ but before ? (window.location.pathname)
    // It should have an array of feature classes that load on that page
    // (many pages will only have a single feature)
    // The hub is not affected by these settings, and appears on all pages with the ribbon while logged in
    // Name is a friendly name that can be read by classes that may be called from multiple locations
    static PAGES = [
        {
            url: /^\/users\/.+$/,
            name: 'users',
            features: [
                MultiUser
            ]
        },
        {
            url: /^\/dex\/?$/,
            name: 'dex',
            features: [
                DexPageFilters
            ]
        },
        {
            url: /^\/dojo\/?$/,
            name: 'dojo',
            features: [
                Dojo
            ]
        },
        {
            url: /^\/forge\/?$/,
            name: 'forge',
            features: [
                Wishforge
            ]
        },
        {
            url: /^\/interactions\/?$/,
            name: 'interactions',
            features: [
                InteractionsLinks
            ]
        },
        {
            url: /^\/summary\/[a-zA-Z0-9_-]+\/?$/,
            name: 'summary',
            features: [
                SummaryDisplayCodes
            ]
        },
        {
            url: /^\/fishing\/?$/,
            name: 'fishing',
            features: [
                Fishing
            ]
        },
        {
            url: /^\/daycare\/?$/,
            name: 'daycare',
            features: [
                DaycareMatches
            ]
        },
        {
            url: /^\/lab\/?$/,
            name: 'lab',
            features: [
                Lab
            ]
        },
        {
            url: /^\/fields\/?$/,
            name: 'privateFields',
            features: [
                Fields,
                PrivateFields
            ]
        },
        {
            url: /^\/fields\/.+$/,
            name: 'publicFields',
            features: [
                Fields,
                PublicFields
            ]
        },
        {
            url: /^\/farm\/?$/,
            name: 'farm',
            features: [
                EasyEvolve
            ]
        },
        {
            url: /^\/shelter\/?$/,
            name: 'shelter',
            features: [
                Shelter
            ]
        },
    ];

    static instantiatePage() {
        const path = window.location.pathname;
        let onPage = false;
        for(let i=0; i<PagesManager.PAGES.length; i++) {
            const page = PagesManager.PAGES[i];
            if(page.url.test(path)) {
                console.log('On QoL feature page');
                onPage = true;
                for(let j=0; j<page.features.length; j++) {
                    new page.features[j](page);
                }
            }
        }
        if(!onPage) {
            console.log('Not on QoL feature page')
        }
    }
}