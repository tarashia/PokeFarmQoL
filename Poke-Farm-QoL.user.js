// ==UserScript==
// @name         Poké Farm QoL
// @namespace    https://github.com/jpgualdarrama/
// @author       Bentomon
// @homepage     https://github.com/jpgualdarrama/PokeFarmQoL
// @downloadURL  https://github.com/jpgualdarrama/PokeFarmQoL/raw/issue_48/Poke-Farm-QoL.user.js
// @description  Quality of Life changes to Pokéfarm!
// @version      1.6.4
// @match        https://pokefarm.com/*
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @require      https://raw.githubusercontent.com/lodash/lodash/4.17.4/dist/lodash.min.js
// @require      https://cdn.rawgit.com/omichelsen/compare-versions/v3.1.0/index.js
// @resource     QolHubHTML            https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/resources/templates/qolHubHTML.html
// @resource     shelterSettingsHTML    https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/resources/templates/shelterOptionsHTML.html
// @resource     evolveFastHTML         https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/resources/templates/evolveFastHTML.html
// @resource     labOptionsHTML         https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/resources/templates/labOptionsHTML.html
// @resource     fieldSortHTML        https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/resources/templates/fieldSortHTML.html
// @resource     publicFieldTooltipModHTML  https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/resources/templates/publicFieldTooltipModHTML.html
// @resource     privateFieldTooltipModHTML  https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/resources/templates/privateFieldTooltipModHTML.html
// @resource     fieldSearchHTML        https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/resources/templates/fieldSearchHTML.html
// @resource     privateFieldSearchHTML        https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/resources/templates/privateFieldSearchHTML.html
// @resource     QoLCSS                 https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/resources/css/pfqol.css
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/requires/utils/helpers.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/requires/utils/globals.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/requires/utils/evolutionTreeParser.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/requires/utils/dexPageParser.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/requires/utils/localStorageManager.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/requires/utils/dexUtilities.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/requires/utils/qolHub.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/requires/pages/basePage.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/requires/pages/shelterPage.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/requires/pages/privateFieldsPage.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/requires/pages/publicFieldsPage.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/requires/pages/labPage.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/requires/pages/fishingPage.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/requires/pages/multiuserPage.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/requires/pages/farmPage.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/requires/pages/daycarePage.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/requires/pages/dexPage.js
// @require      https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/issue_48/requires/pages/wishforgePage.js
// @updateURL    https://github.com/jpgualdarrama/PokeFarmQoL/raw/issue_48/Poke-Farm-QoL.user.js
// @connect      github.com
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_info
// ==/UserScript==

(function($) {
    'use strict';
    // :contains to case insensitive
    $.extend($.expr[":"], {
        "containsIN": function(elem, i, match, array) {
            return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
        }
    });

    const DEFAULT_USER_SETTINGS = { // default settings when the script gets loaded the first time
        customCss: "",
        enableDaycare: true,
        shelterEnable: true,
        fishingEnable: true,
        publicFieldEnable: true,
        privateFieldEnable: true,
        partyMod: true,
        easyEvolve: true,
        labNotifier: true,
        dexFilterEnable: true,
        condenseWishforge: true
    };
    let USER_SETTINGS = DEFAULT_USER_SETTINGS;

    // manage GLOBALS.DEX_DATA and GLOBALS.DEX_UPDATE_DATE
    // GLOBALS.DEX_DATA is the data loaded directly from the script contained in
    // the pokefarm.com/dex HTML. It contains the list of pokemon, and for each:
    // - their types
    // - if they hatch from an egg,
    // - if you have the eggdex, and
    // - if you have the regular, shiny, albino, and melanistic pokedex entries
    const LOCAL_STORAGE = new LocalStorageManager(localStorage);
    if(!LOCAL_STORAGE.loadDexIntoGlobalsFromStorage(GLOBALS)) { // can't load it from storage
        LOCAL_STORAGE.loadDexIntoGlobalsFromWeb($, document, DexUtilities, GLOBALS); // so load it from the web
    } else { // can load it from storage
        LOCAL_STORAGE.loadDexIntoGlobalsFromWebIfOld($); // reload it from web if it's old
    }
    LOCAL_STORAGE.loadEvolveByLevelList(GLOBALS);
    LOCAL_STORAGE.loadEvolutionTreeDepthList(GLOBALS);

    const PFQoL = (function PFQoL() {
        
        const SETTINGS_SAVE_KEY = GLOBALS.SETTINGS_SAVE_KEY;

        const PAGES = {
            instantiatePages: function() {
                for(const key of Object.keys(PAGES.pages)) {
                    let pg = PAGES.pages[key]
                    if(USER_SETTINGS[pg.setting] === true) {
                        PAGES.pages[key].object = new PAGES.pages[key].class();
                    }
                }
            },
            loadSettings: function() {
                for(const key of Object.keys(PAGES.pages)) {
                    let pg = PAGES.pages[key];
                    if(USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                        pg.object.loadSettings();
                    }
                }
            },
            saveSettings: function() {
                for(const key of Object.keys(PAGES.pages)) {
                    let pg = PAGES.pages[key];
                    if(USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                        pg.object.saveSettings();
                    }
                }
            },
            populateSettings: function() {
                for(const key of Object.keys(PAGES.pages)) {
                    let pg = PAGES.pages[key];
                    if(USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                        pg.object.populateSettings();
                    }
                }
            },
            clearPageSettings: function(pageName) {
                if(! (pageName in PAGES.pages) ) {
                    console.error(`Could not proceed with clearing page settings. Page ${pageName} not found in list of pages`)
                } else if(PAGES.pages[pageName].object) {
                    PAGES.pages[pageName].object.resetSettings();
                }
            },
            setupHTML: function() {
                for(const key of Object.keys(PAGES.pages)) {
                    let pg = PAGES.pages[key];
                    if(USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                        pg.object.setupHTML();
                        fn.backwork.populateSettingsPage()
                    }
                }
            },
            setupCSS: function() {
                for(const key of Object.keys(PAGES.pages)) {
                    let pg = PAGES.pages[key];
                    if(USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                        pg.object.setupCSS();
                    }
                }
            },
            setupObservers: function() {
                for(const key of Object.keys(PAGES.pages)) {
                    let pg = PAGES.pages[key];
                    if(USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                        pg.object.setupObserver();
                    }
                }
            },
            setupHandlers: function() {
                for(const key of Object.keys(PAGES.pages)) {
                    let pg = PAGES.pages[key];
                    if(USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                        pg.object.setupHandlers();
                    }
                }
            },
            settingsPage: function() {
                for(const key of Object.keys(PAGES.pages)) {
                    let pg = PAGES.pages[key];
                    if(USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                        pg.object.settingsChange();
                    }
                }
            },
            pages: {
                'Daycare': {
                    class: DaycarePage,
                    object: undefined,
                    setting: 'enableDaycare'
                },
                'Farm' : {
                    class: FarmPage,
                    object: undefined,
                    setting: 'easyEvolve'
                },
                'Fishing' : {
                    class: FishingPage,
                    object: undefined,
                    setting: 'fishingEnable'
                },
                'Lab' : {
                    class: LabPage,
                    object: undefined,
                    setting: 'labNotifier'
                },
                'Multiuser' : {
                    class: MultiuserPage,
                    object: undefined,
                    setting: 'partyMod'
                },
                'PrivateFields' : {
                    class: PrivateFieldsPage,
                    object: undefined,
                    setting: 'privateFieldEnable'
                },
                'PublicFields' : {
                    class: PublicFieldsPage,
                    object: undefined,
                    setting: 'publicFieldEnable'
                },
                'Shelter' : {
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
            }
        }
        
        const fn = { // all the functions for the script
            /** background stuff */
            backwork : { // background stuff
                checkForUpdate() {
                    let version ="";
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: 'https://api.github.com/repos/jpgualdarrama/PokeFarmQoL/contents/Poke-Farm-QoL.user.js',
                        responseType: 'json',
                        onload: function(data) {
                            let match = atob(data.response.content).match(/\/\/\s+@version\s+([^\n]+)/);
                            version = match[1];
                            if (compareVersions(GM_info.script.version, version) < 0) {
                                document.querySelector("li[data-name*='QoL']").insertAdjacentHTML('afterend', TEMPLATES.qolHubUpdateLinkHTML);
                            }
                        }
                    });
                },
                instantiatePages() {
                    PAGES.instantiatePages();
                },
                loadSettings() { // initial settings on first run and setting the variable settings key
                    PAGES.loadSettings();
                    if (localStorage.getItem(SETTINGS_SAVE_KEY) === null) {
                        fn.backwork.saveSettings();
                    } else {
                        try {
                            let countScriptSettings = Object.keys(USER_SETTINGS).length;
                            let localStorageString = JSON.parse(localStorage.getItem(SETTINGS_SAVE_KEY));
                            let countLocalStorageSettings = Object.keys(localStorageString).length;
                            // adds new objects (settings) to the local storage
                            if (countLocalStorageSettings < countScriptSettings) {
                                let defaultsSetting = USER_SETTINGS;
                                let userSetting = JSON.parse(localStorage.getItem(SETTINGS_SAVE_KEY));
                                let newSetting = $.extend(true,{}, defaultsSetting, userSetting);

                                USER_SETTINGS = newSetting;
                                fn.backwork.saveSettings();
                            }
                            // removes objects from the local storage if they don't exist anymore. Not yet possible..
                            if (countLocalStorageSettings > countScriptSettings) {
                                //let defaultsSetting = USER_SETTINGS;
                                //let userSetting = JSON.parse(localStorage.getItem(SETTINGS_SAVE_KEY));
                                fn.backwork.saveSettings();
                            }
                        }
                        catch(err) {
                            fn.backwork.saveSettings();
                        }
                        if (localStorage.getItem(SETTINGS_SAVE_KEY) != USER_SETTINGS) {
                            USER_SETTINGS = JSON.parse(localStorage.getItem(SETTINGS_SAVE_KEY));
                        }
                    }
                }, // loadSettings
                saveSettings() { // Save changed settings
                    PAGES.saveSettings();
                    localStorage.setItem(SETTINGS_SAVE_KEY, JSON.stringify(USER_SETTINGS));
                }, // saveSettings
                populateSettingsPage() { // checks all settings checkboxes that are true in the settings
                    for (let key in USER_SETTINGS) {
                        if (!USER_SETTINGS.hasOwnProperty(key)) {
                            continue;
                        }
                        let value = USER_SETTINGS[key];
                        if (typeof value === 'boolean') {
                            Helpers.toggleSetting(key, value, false);
                            continue;
                        }
                        else if (typeof value === 'string') {
                            Helpers.toggleSetting(key, value, false);
                            continue;
                        }
                    }
                    PAGES.populateSettings();
                },
                clearPageSettings(pageName) {
                    PAGES.clearPageSetting(pageName);
                },
                setupHTML() { // injects the HTML changes from TEMPLATES into the site
                    // Header link to Userscript settings
                    document.querySelector("li[data-name*='Lucky Egg']").insertAdjacentHTML('afterend', TEMPLATES.qolHubLinkHTML);

                    PAGES.setupHTML();
                },
                setupCSS() { // All the CSS changes are added here
                    GM_addStyle(GM_getResourceText('QoLCSS'));
                    PAGES.setupCSS();

                    //custom user css
                    let customUserCss = USER_SETTINGS.customCss;
                    let customUserCssInject = '<style type="text/css">'+customUserCss+'</style>'
                    //document.querySelector('head').append();
                    $('head').append('<style type="text/css">'+customUserCss+'</style>');
                },
                setupObservers() { // all the Observers that needs to run
                    PAGES.setupObservers();
                },
                setupHandlers() { // all the event handlers
                    PAGES.setupHandlers();

                    $(document).on('change', '.qolsetting', (function() {
                        fn.backwork.loadSettings();
                        fn.API.settingsChange(this.getAttribute('data-key'), $(this).val(), $(this).parent().parent().attr('class'), $(this).parent().attr('class'));
                        fn.backwork.saveSettings();
                    }));
                },
                startup() { // All the functions that are run to start the script on Pokéfarm
                    return {
                        'creating Page handlers': fn.backwork.instantiatePages,
                        'loading Settings'      : fn.backwork.loadSettings,
                        'checking for update'   : fn.backwork.checkForUpdate,
                        'setting up HTML'       : fn.backwork.setupHTML,
                        'populating Settings'   : fn.backwork.populateSettingsPage,
                        'setting up CSS'        : fn.backwork.setupCSS,
                        'setting up Observers'  : fn.backwork.setupObservers,
                        'setting up Handlers'   : fn.backwork.setupHandlers,
                    }
                },
                init() { // Starts all the functions.
                    console.log('Starting up ..');
                    let startup = fn.backwork.startup();
                    for (let message in startup) {
                        if (!startup.hasOwnProperty(message)) {
                            continue;
                        }
                        console.log(message);
                        startup[message]();
                    }
                },
            }, // end of backwork

            /** public stuff */
            API : { // the actual seeable and interactable part of the userscript
                settingsChange(element, textElement, customClass, typeClass) {
                    if (JSON.stringify(USER_SETTINGS).indexOf(element) >= 0) { // userscript settings
                        if (USER_SETTINGS[element] === false ) {
                            USER_SETTINGS[element] = true;
                        } else if (USER_SETTINGS[element] === true ) {
                            USER_SETTINGS[element] = false;
                        } else if (typeof USER_SETTINGS[element] === 'string') {
                            USER_SETTINGS[element] = textElement;
                        }
                        fn.backwork.saveSettings();
                    } else {
                        PAGES.settingsChange();
                    }
                }, // settingsChange

                clearPageSettings(pageName) {
                    if(pageName !== "None") { // "None" matches option in HTML
                        fn.backwork.clearPageSettings(pageName)
                    }
                }, // clearPageSettings
                populateSettingsPage() {
                    fn.backwork.populateSettingsPage();
                } // populateSettingsPage
            }, // end of API
        }; // end of fn

        fn.backwork.init();

        return fn.API;
    })(); // end of PFQoL function

    $(document).on('click', 'li[data-name*="QoL"]', (function() { //open QoL hub
        PFQoL.populateSettingsPage();
        QoLHub.build($, document, TEMPLATES, GLOBALS, USER_SETTINGS);
    }));

    $(document).on('click', '.closeHub', (function() { //close QoL hub
        QoLHub.close($, document);
    }));

    $(document).on('click', '#updateDex', (function() {
        QoLHub.handleUpdateDexClick($, document, DexUtilities, LOCAL_STORAGE, DexPageParser, EvolutionTreeParser, GLOBALS);
    }));

    $(document).on('click', '#resetPageSettings', (function() {
        const page = $(this).parent().find('select').val()
        PFQoL.clearPageSettings(page)
    }));

    $(document).on('click', '#clearCachedDex', (function() {
        localStorage.removeItem('QoLEvolveByLevel');
        localStorage.removeItem('QoLDexIDsCache');
        localStorage.removeItem("QoLEvolutionTreeDepth");
        localStorage.removeItem('QoLRegionalFormsList');
    }));

    $(document).on('click', 'h3.slidermenu', (function() { //show hidden li in change log
        $(this).next().slideToggle();
    }));

})(jQuery); //end of userscript
