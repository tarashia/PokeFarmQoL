class PagesManager {
    // Lists the pages the QoL should activate on, and which features should be loaded
    // Each key should be a regex that can match everything after .com/ but before ? (window.location.pathname)
    // It should have an array of feature classes that load on that page
    // (many pages will only have a single feature)
    // The hub is not affected by these settings, and appears on all pages with the ribbon while logged in
    static PAGES = [
        {
            url: /^\/users\/.+$/,
            features: [
                MultiUser
            ]
        },
        {
            url: /^\/dex\/?$/,
            features: [
                DexPageFilters
            ]
        },
        {
            url: /^\/forge\/?$/,
            features: [
                Wishforge
            ]
        },
        {
            url: /^\/interactions\/?$/,
            features: [
                InteractionsLinks
            ]
        },
        {
            url: /^\/summary\/[a-zA-Z0-9_-]+\/?$/,
            features: [
                SummaryDisplayCodes
            ]
        },
        {
            url: /^\/fishing\/?$/,
            features: [
                Fishing
            ]
        },
        {
            url: /^\/daycare\/?$/,
            features: [
                DaycareMatches
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
                    new page.features[j]();
                }
            }
        }
        if(!onPage) {
            console.log('Not on QoL feature page')
        }
    }
}