// ==UserScript==
// @name         Poké Farm QoL
// @namespace    https://github.com/jpgualdarrama/
// @author       Bentomon
// @homepage     https://github.com/jpgualdarrama/PokeFarmShelter
// @downloadURL  https://github.com/jpgualdarrama/PokeFarmShelter/raw/class_ify/Poke-Farm-QoL.user.js
// @description  Quality of Life changes to Pokéfarm!
// @version      1.3.52
// @match        https://pokefarm.com/*
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @require      https://raw.githubusercontent.com/lodash/lodash/4.17.4/dist/lodash.min.js
// @require      https://cdn.rawgit.com/omichelsen/compare-versions/v3.1.0/index.js
// @resource     QolHubHTML            https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/class_ify/resources/templates/qolHubHTML.html
// @resource     shelterSettingsHTML    https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/class_ify/resources/templates/shelterOptionsHTML.html
// @resource     evolveFastHTML         https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/class_ify/resources/templates/evolveFastHTML.html
// @resource     labOptionsHTML         https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/class_ify/resources/templates/labOptionsHTML.html
// @resource     fieldSearchHTML        https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/class_ify/resources/templates/fieldSearchHTML.html
// @resource     privateFieldSearchHTML        https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/class_ify/resources/templates/privateFieldSearchHTML.html
// @resource     QoLCSS                 https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/class_ify/resources/css/pfqol.css
// @require      requires/helpers.js
// @require      requires/globals.js
// @require      requires/shelterPage.js
// @require      requires/privateFieldsPage.js
// @require      requires/publicFieldsPage.js
// @require      requires/labPage.js
// @require      requires/fishingPage.js
// @require      requires/multiuserPage.js
// @require      requires/farmPage.js
// @require      requires/daycarePage.js
// @updateURL    https://github.com/jpgualdarrama/PokeFarmQoL/raw/class_ify/Poke-Farm-QoL.user.js
// @connect      github.com
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_info
// ==/UserScript==

/*
  1. Modularize
  2. Commonize
*/

(function($) {
    'use strict';
    // :contains to case insensitive
    $.extend($.expr[":"], {
        "containsIN": function(elem, i, match, array) {
            return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
        }
    });

    let PFQoL = (function PFQoL() {

        const DEFAULT_USER_SETTINGS = { // default settings when the script gets loaded the first time
            //variables
            customCss: "",
            enableDaycare: true,
            shelterEnable: true,
            fishingEnable: true,
            publicFieldEnable: true,
            privateFieldEnable: true,
            partyMod: true,
            easyEvolve: true,
            labNotifier: true,
        };

        const SETTINGS_SAVE_KEY = GLOBALS.SETTINGS_SAVE_KEY;

        const VARIABLES = { // all the variables that are going to be used in fn
            userSettings : DEFAULT_USER_SETTINGS,
            shelterTypeSearch : GLOBALS.SHELTER_TYPE_TABLE,
            natureList : GLOBALS.NATURE_LIST,
            shelterSearch : GLOBALS.SHELTER_SEARCH_DATA,
        }

        const PAGES = {
            'Daycare': [DaycarePage, 'enableDaycare', Helpers.onDaycarePage],
            'Farm' : [FarmPage, 'easyEvolve', Helpers.onFarmTab1],
            'Fishing' : [FishingPage, 'fishingEnable', Helpers.onFishingPage],
            'Lab' : [LabPage, 'labNotifier', Helpers.onLabPage],
            'Multiuser' : [MultiuserPage, 'partyMod', Helpers.onMultiuserPage],
            'PrivateFields' : [PrivateFieldsPage, 'privateFieldEnable', Helpers.onPrivateFieldsPage],
            'PublicFields' : [PublicFieldsPage, 'publicFieldEnable', Helpers.onPublicFieldsPage],
            'Shelter' : [ShelterPage, 'shelterEnable', Helpers.onShelterPage],
        }
        const PAGE_OBJ_INDEX = 0;
        const PAGE_VAR_INDEX = 1;
        const PAGE_FUN_INDEX = 2;

        const fn = { // all the functions for the script
            /** background stuff */
            backwork : { // backgrounds stuff
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
                loadSettings() { // initial settings on first run and setting the variable settings key
                    for(const key of Object.keys(PAGES)) {
                        let pg = PAGES[key]
                        if(VARIABLES.userSettings[pg[PAGE_VAR_INDEX]] === true && pg[PAGE_FUN_INDEX]()) {
                            pg[PAGE_OBJ_INDEX].loadSettings();
                        }
                    }
                    if (localStorage.getItem(SETTINGS_SAVE_KEY) === null) {
                        fn.backwork.saveSettings();
                    } else {
                        try {
                            let countScriptSettings = Object.keys(VARIABLES.userSettings).length;
                            let localStorageString = JSON.parse(localStorage.getItem(SETTINGS_SAVE_KEY));
                            let countLocalStorageSettings = Object.keys(localStorageString).length;
                            // adds new objects (settings) to the local storage
                            if (countLocalStorageSettings < countScriptSettings) {
                                let defaultsSetting = VARIABLES.userSettings;
                                let userSetting = JSON.parse(localStorage.getItem(SETTINGS_SAVE_KEY));
                                let newSetting = $.extend(true,{}, defaultsSetting, userSetting);

                                VARIABLES.userSettings = newSetting;
                                fn.backwork.saveSettings();
                            }
                            // removes objects from the local storage if they don't exist anymore. Not yet possible..
                            if (countLocalStorageSettings > countScriptSettings) {
                                //let defaultsSetting = VARIABLES.userSettings;
                                //let userSetting = JSON.parse(localStorage.getItem(SETTINGS_SAVE_KEY));
                                fn.backwork.saveSettings();
                            }
                        }
                        catch(err) {
                            fn.backwork.saveSettings();
                        }
                        if (localStorage.getItem(SETTINGS_SAVE_KEY) != VARIABLES.userSettings) {
                            VARIABLES.userSettings = JSON.parse(localStorage.getItem(SETTINGS_SAVE_KEY));
                        }
                    }
                }, // loadSettings
                saveSettings() { // Save changed settings
                    for(const key of Object.keys(PAGES)) {
                        let pg = PAGES[key]
                        if(VARIABLES.userSettings[pg[PAGE_VAR_INDEX]] === true && pg[PAGE_FUN_INDEX]()) {
                            pg[PAGE_OBJ_INDEX].saveSettings();
                        }
                    }
                    localStorage.setItem(SETTINGS_SAVE_KEY, JSON.stringify(VARIABLES.userSettings));
                }, // saveSettings
                populateSettingsPage() { // checks all settings checkboxes that are true in the settings
                    for (let key in VARIABLES.userSettings) {
                        if (!VARIABLES.userSettings.hasOwnProperty(key)) {
                            continue;
                        }
                        let value = VARIABLES.userSettings[key];
                        if (typeof value === 'boolean') {
                            Helpers.toggleSetting(key, value, false);
                            continue;
                        }
                        else if (typeof value === 'string') {
                            Helpers.toggleSetting(key, value, false);
                            continue;
                        }
                    }
                    for(const key of Object.keys(PAGES)) {
                        let pg = PAGES[key]
                        if(VARIABLES.userSettings[pg[PAGE_VAR_INDEX]] === true && pg[PAGE_FUN_INDEX]()) {
                            pg[PAGE_OBJ_INDEX].populateSettings();
                        }
                    }
                },
                setupHTML() { // injects the HTML changes from TEMPLATES into the site
                    // Header link to Userscript settings
                    document.querySelector("li[data-name*='Lucky Egg']").insertAdjacentHTML('afterend', TEMPLATES.qolHubLinkHTML);

                    for(const key of Object.keys(PAGES)) {
                        let pg = PAGES[key]
                        if(VARIABLES.userSettings[pg[PAGE_VAR_INDEX]] === true && pg[PAGE_FUN_INDEX]()) {
                            pg[PAGE_OBJ_INDEX].setupHTML();
                            fn.backwork.populateSettingsPage(pg[PAGE_OBJ_INDEX].getSettings());
                        }
                    }
                },
                setupCSS() { // All the CSS changes are added here
                    GM_addStyle(GM_getResourceText('QoLCSS'));

                    for(const key of Object.keys(PAGES)) {
                        let pg = PAGES[key]
                        if(VARIABLES.userSettings[pg[PAGE_VAR_INDEX]] === true && pg[PAGE_FUN_INDEX]()) {
                            pg[PAGE_OBJ_INDEX].setupCSS();
                        }
                    }

                    //custom user css
                    let customUserCss = VARIABLES.userSettings.customCss;
                    let customUserCssInject = '<style type="text/css">'+customUserCss+'</style>'
                    //document.querySelector('head').append();
                    $('head').append('<style type="text/css">'+customUserCss+'</style>');
                },
                setupObservers() { // all the Observers that needs to run
                    for(const key of Object.keys(PAGES)) {
                        let pg = PAGES[key]
                        if(VARIABLES.userSettings[pg[PAGE_VAR_INDEX]] === true && pg[PAGE_FUN_INDEX]()) {
                            pg[PAGE_OBJ_INDEX].setupObserver();
                        }
                    }
                },
                setupHandlers() { // all the event handlers
                    for(const key of Object.keys(PAGES)) {
                        let pg = PAGES[key]
                        if(VARIABLES.userSettings[pg[PAGE_VAR_INDEX]] === true && pg[PAGE_FUN_INDEX]()) {
                            pg[PAGE_OBJ_INDEX].setupHandlers();
                        }
                    }

                    $(document).on('change', '.qolsetting', (function() {
                        fn.backwork.loadSettings();
                        fn.API.settingsChange(this.getAttribute('data-key'), $(this).val(), $(this).parent().parent().attr('class'), $(this).parent().attr('class'));
                        fn.backwork.saveSettings();
                    }));
                },
                startup() { // All the functions that are run to start the script on Pokéfarm
                    return {
                        'loading Settings'    : fn.backwork.loadSettings,
                        'checking for update' : fn.backwork.checkForUpdate,
                        'setting up HTML'     : fn.backwork.setupHTML,
                        'setting up CSS'      : fn.backwork.setupCSS,
                        'setting up Observers': fn.backwork.setupObservers,
                        'setting up Handlers' : fn.backwork.setupHandlers,
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
                qolHubBuild() {
                    document.querySelector('body').insertAdjacentHTML('beforeend', TEMPLATES.qolHubHTML);
                    $('#core').addClass('scrolllock');
                    let qolHubCssBackgroundHead = $('.qolHubHead.qolHubSuperHead').css('background-color');
                    let qolHubCssTextColorHead = $('.qolHubHead.qolHubSuperHead').css('color');
                    let qolHubCssBackground = $('.qolHubTable').css('background-color');
                    let qolHubCssTextColor = $('.qolHubTable').css('color');
                    $('.qolHubHead').css({"backgroundColor":""+qolHubCssBackgroundHead+"","color":""+qolHubCssTextColorHead+""});
                    $('.qolChangeLogHead').css({"backgroundColor":""+qolHubCssBackgroundHead+"","color":""+qolHubCssTextColorHead+""});
                    $('.qolopencloselist.qolChangeLogContent').css({"backgroundColor":""+qolHubCssBackground+"","color":""+qolHubCssTextColor+""});
                    $('.qolDate').text(GLOBALS.DEX_UPDATE_DATE);

                    fn.backwork.populateSettingsPage();
                    let customCss = VARIABLES.userSettings.customCss;

                    $('.textareahub').append('<textarea id="qolcustomcss" rows="15" cols="60" class="qolsetting" data-key="customCss"/></textarea>');
                    if (VARIABLES.userSettings.customCss === "") {
                        $('.textareahub textarea').val(`#thisisanexample {\n    color: yellow;\n}\n\n.thisisalsoanexample {\n    background-color: blue!important;\n}\n\nhappycssing {\n    display: absolute;\n}`);
                    } else {
                        $('.textareahub textarea').val(customCss);
                    }

                    $('#qolcustomcss').on('keydown', function(e) {
                        if (e.keyCode == 9 || e.which == 9) {
                            e.preventDefault();
                            var s = this.selectionStart;
                            $(this).val(function(i, v) {
                                return v.substring(0, s) + "\t" + v.substring(this.selectionEnd)
                            });
                            this.selectionEnd = s + 1;
                        }
                    });

                },
                qolHubClose() {
                    $('.dialog').remove();
                    $('#core').removeClass('scrolllock');
                },

                settingsChange(element, textElement, customClass, typeClass) {
                    if (JSON.stringify(VARIABLES.userSettings).indexOf(element) >= 0) { // userscript settings
                        if (VARIABLES.userSettings[element] === false ) {
                            VARIABLES.userSettings[element] = true;
                        } else if (VARIABLES.userSettings[element] === true ) {
                            VARIABLES.userSettings[element] = false;
                        } else if (typeof VARIABLES.userSettings[element] === 'string') {
                            VARIABLES.userSettings[element] = textElement;
                        }
                        fn.backwork.saveSettings();
                    } else {
                        for(const key of Object.keys(PAGES)) {
                            let pg = PAGES[key]
                            if(VARIABLES.userSettings[pg[PAGE_VAR_INDEX]] === true && pg[PAGE_FUN_INDEX]()) {
                                pg[PAGE_OBJ_INDEX].settingsChange();
                            }
                        }
                    }
                }
            }, // end of API
        }; // end of fn

        fn.backwork.init();

        return fn.API;
    })(); // end of PFQoL function

    $(document).on('click', 'li[data-name*="QoL"]', (function() { //open QoL hub
        PFQoL.qolHubBuild();
    }));

    $(document).on('click', '.closeHub', (function() { //close QoL hub
        PFQoL.qolHubClose();
    }));

    $(document).on('click', '#updateDex', (function() {
        // GLOBALS.DEX_DATA will contain the latest info as is read from local storage
        // this handler updates the local storage
        console.log('Clicked!')
        let date = (new Date()).toUTCString();
        GLOBALS.DEX_UPDATE_DATE = date;
        $('.qolDate').text(GLOBALS.DEX_UPDATE_DATE);
        updateLocalStorageDex(date);
    }));

    $(document).on('click', 'h3.slidermenu', (function() { //show hidden li in change log
        $(this).next().slideToggle();
    }));

})(jQuery); //end of userscript
