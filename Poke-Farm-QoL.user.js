// ==UserScript==
// @name         Poké Farm QoL
// @namespace    https://github.com/jpgualdarrama/
// @author       Bentomon
// @homepage	 https://github.com/jpgualdarrama/PokeFarmShelter
// @downloadURL  https://github.com/jpgualdarrama/PokeFarmShelter/raw/master/Poke-Farm-QoL.user.js
// @description  Quality of Life changes to Pokéfarm!
// @version      1.3.52
// @match        https://pokefarm.com/*
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @require      https://raw.githubusercontent.com/lodash/lodash/4.17.4/dist/lodash.min.js
// @require      https://cdn.rawgit.com/omichelsen/compare-versions/v3.1.0/index.js
// @resource     QolHubHTML	        https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/master/resources/templates/qolHubHTML.html
// @resource     shelterSettingsHTML    https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/master/resources/templates/shelterOptionsHTML.html
// @resource     evolveFastHTML         https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/master/resources/templates/evolveFastHTML.html
// @resource     labOptionsHTML         https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/master/resources/templates/labOptionsHTML.html
// @resource     fieldSearchHTML        https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/master/resources/templates/fieldSearchHTML.html
// @resource     privateFieldSearchHTML        https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/master/resources/templates/privateFieldSearchHTML.html
// @resource     QoLCSS                 https://raw.githubusercontent.com/jpgualdarrama/PokeFarmQoL/master/resources/css/pfqol.css
// @require      helpers.js
// @require      globals.js
// @require      shelterPage.js
// @require      privateFieldsPage.js
// @require      publicFieldsPage.js
// @updateURL    https://github.com/jpgualdarrama/PokeFarmQoL/raw/master/Poke-Farm-QoL.user.js
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
            variData : {
                dexData: GLOBALS.DEX_DATA
            },
            //userscript settings
            customCss: "",
            shelterEnable: true,
            releaseSelectAll: true,
            fieldSort: true,
            fieldSearch: true,
            privateFieldSearch: true,
            partyMod: true,
            easyEvolve: true,
            labNotifier: true,
            partyModSettings : {
                hideDislike: false,
                hideAll: false,
            },
            labNotiferSettings : {
                findLabEgg: "",
                findLabType: "",
            },
        };

        const SETTINGS_SAVE_KEY = GLOBALS.SETTINGS_SAVE_KEY;

        const VARIABLES = { // all the variables that are going to be used in fn
            userSettings : DEFAULT_USER_SETTINGS,
            shelterTypeSearch : GLOBALS.SHELTER_TYPE_TABLE,
            natureList : GLOBALS.NATURE_LIST,
            shelterSearch : GLOBALS.SHELTER_SEARCH_DATA,
            dexDataVar : "",
            evolveListCache : "",
            labSearchArray : [],
            labListArray : [],
        }

        const OBSERVERS = {
            partyClickObserver: new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    fn.API.partyModification();
                });
            }),
            labObserver: new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    fn.API.labCustomSearch();
                });
            }),
            evolveObserver: new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    fn.API.easyQuickEvolve();
                });
            }),
        }

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
                    if (VARIABLES.userSettings.shelterEnable === true && Helpers.onShelterPage()) {
                        ShelterPage.loadSettings();
                    } else if (VARIABLES.userSettings.privateFieldSearch === true && Helpers.onPrivateFieldsPage()) {
                        PrivateFieldsPage.loadSettings();
                    } else if (VARIABLES.userSettings.privateFieldSearch === true && Helpers.onPrivateFieldsPage()) {
                        PrivateFieldsPage.loadSettings();
                    } else if ((VARIABLES.userSettings.fieldSearch === true) || (
                        (VARIABLES.userSettings.fieldSort === true)) && Helpers.onPrivateFieldsPage()) {
                        PublicFieldsPage.loadSettings();
                    } else {
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
                    }
                }, // loadSettings
                saveSettings() { // Save changed settings
                    console.log('TODO - update PFQoL.saveSettings()')
                    if (VARIABLES.userSettings.shelterEnable === true && Helpers.onShelterPage()) {
                        ShelterPage.saveSettings();
                    } else if (VARIABLES.userSettings.privateFieldSearch === true && Helpers.onPrivateFieldsPage()) {
                        PrivateFieldsPage.saveSettings();
                    } else if ((VARIABLES.userSettings.fieldSearch === true) || (
                        (VARIABLES.userSettings.fieldSort === true)) && Helpers.onPrivateFieldsPage()) {
                        PublicFieldsPage.saveSettings();
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

                       if (typeof value === 'string') {
                            Helpers.toggleSetting(key, value, false);
                            continue;
                       }
                    }
                    if(VARIABLES.userSettings.shelterEnable === true && Helpers.onShelterPage()) {
                        ShelterPage.populateSettings();
                    }
                    else if ((VARIABLES.userSettings.fieldSearch === true) || (
                        (VARIABLES.userSettings.fieldSort === true)) && Helpers.onPrivateFieldsPage()) {
                        PublicFieldsPage.populateSettings();
                    }
                    else if(VARIABLES.userSettings.privateFieldSearch === true && Helpers.onPrivateFieldsPage()) {
                       PrivateFieldsPage.populateSettings();
                    }
                    for (let key in VARIABLES.userSettings.partyModSettings) {
                        if (!VARIABLES.userSettings.partyModSettings.hasOwnProperty(key)) {
                            continue;
                        }
                        let value = VARIABLES.userSettings.partyModSettings[key];
                        if (typeof value === 'boolean') {
                            Helpers.toggleSetting(key, value, false);
                            continue;
                        }

                       if (typeof value === 'string') {
                            Helpers.toggleSetting(key, value, false);
                            continue;
                       }
                    }
                },
                setupHTML() { // injects the HTML changes from TEMPLATES into the site
					// Header link to Userscript settings
                    document.querySelector("li[data-name*='Lucky Egg']").insertAdjacentHTML('afterend', TEMPLATES.qolHubLinkHTML);

                    // shelter Settings Menu
                    if (VARIABLES.userSettings.shelterEnable === true && Helpers.onShelterPage()) {
                        ShelterPage.setupHTML();
                        fn.backwork.populateSettingsPage(ShelterPage.getSettings());
                    }

                    // public fields search or sort
                    else if ((VARIABLES.userSettings.fieldSearch === true) || (
                        (VARIABLES.userSettings.fieldSort === true)) && Helpers.onPrivateFieldsPage()) {
                        PublicFieldsPage.setupHTML();
                        fn.backwork.populateSettingsPage(PublicFieldsPage.getSettings());
                    }
                    
                    // fishing select all button on caught fishing
                    else if (VARIABLES.userSettings.releaseSelectAll === true && Helpers.onFishingPage() && $('#caughtfishcontainer').length > 0) {
                        document.querySelector('#caughtfishcontainer label').insertAdjacentHTML('beforeend', TEMPLATES.massReleaseSelectHTML);
                    }

                    // private fields search
                    else if (VARIABLES.userSettings.privateFieldSearch === true && Helpers.onPrivateFieldsPage()) {
						PrivateFieldsPage.setupHTML();
                        fn.backwork.populateSettingsPage(PrivateFieldsPage.getSettings());
                    }


                    // party click mods
                    if (VARIABLES.userSettings.partyMod === true && Helpers.onMultiuserPage()) {
                        document.querySelector('#multiuser').insertAdjacentHTML('beforebegin', TEMPLATES.partyModHTML);
                        fn.backwork.populateSettingsPage();
                    }

                    // fast evolve list
                    if (VARIABLES.userSettings.easyEvolve === true && Helpers.onFarmPage()) {
                        $(document).ready(function() {
                            $('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
                            document.querySelector('#farm-evolve>h3').insertAdjacentHTML('afterend', '<label id="qolevolvenormal"><input type="button" class="qolsortnormal" value="Normal list"/></label><label id="qolchangesletype"><input type="button" class="qolsorttype" value="Sort on types"/></label><label id="qolsortevolvename"><input type="button" class="qolsortname" value="Sort on name"/></label><label id="qolevolvenew"><input type="button" class="qolsortnew" value="New dex entry"/>');
                        });
                    }

                    //lab notifier
                    if (VARIABLES.userSettings.labNotifier === true && Helpers.onLabPage()) {
                        document.querySelector('#eggsbox360>p.center').insertAdjacentHTML('afterend', TEMPLATES.labOptionsHTML);
                        document.querySelector('#egglist').insertAdjacentHTML('afterend', '<div id="labsuccess"></div>');

                        let theField = `<div class='numberDiv'><label><input type="text" class="qolsetting" data-key="findLabEgg"/></label><input type='button' value='Remove' id='removeLabSearch'></div>`;
                        VARIABLES.labSearchArray = VARIABLES.userSettings.labNotiferSettings.findLabEgg.split(',');
                        let numberOfValue = VARIABLES.labSearchArray.length;

                        let i;
                        for (i = 0; i < numberOfValue; i++) {
                            let rightDiv = i + 1;
                            let rightValue = VARIABLES.labSearchArray[i];
                            $('#searchkeys').append(theField);
                            $('.numberDiv').removeClass('numberDiv').addClass(""+rightDiv+"").find('.qolsetting').val(rightValue);
                        }

                        let theType = `<div class='typeNumber'> <select name="types" class="qolsetting" data-key="findLabType"> ` + GLOBALS.TYPE_OPTIONS + ` </select> <input type='button' value='Remove' id='removeLabTypeList'> </div>`;
                        VARIABLES.labListArray = VARIABLES.userSettings.labNotiferSettings.findLabType.split(',');
                        let numberOfType = VARIABLES.labListArray.length;

                        let o;
                        for (o = 0; o < numberOfType; o++) {
                            let rightDiv = o + 1;
                            let rightValue = VARIABLES.labListArray[o];
                            $('#labTypes').append(theType);
                            $('.typeNumber').removeClass('typeNumber').addClass(""+rightDiv+"").find('.qolsetting').val(rightValue);
                        }

                        fn.backwork.populateSettingsPage();
                        VARIABLES.dexDataVar = VARIABLES.userSettings.variData.dexData.split(',');
                    }
                },
                setupCSS() { // All the CSS changes are added here
                    GM_addStyle(GM_getResourceText('QoLCSS'));

                    if(VARIABLES.userSettings.shelterEnable === true && Helpers.onShelterPage()) {
                        ShelterPage.setupCSS();
                    }

                    //lab css
                    let labSuccessCss = $('#labpage>div').css('background-color');
                    $('#labsuccess').css('background-color', labSuccessCss);

                    //fields css
                    let fieldOrderCssColor = $('#field_field').css('background-color');
                    let fieldOrderCssBorder = $('#field_field').css('border');
                    $("#fieldorder").css("background-color", ""+fieldOrderCssColor+"");
                    $("#fieldorder").css("border", ""+fieldOrderCssBorder+"");
					
                    $("#fieldsearch").css("background-color", ""+fieldOrderCssColor+"");
                    $("#fieldsearch").css("border", ""+fieldOrderCssBorder+"");

                    if(VARIABLES.userSettings.privateFieldSearch === true && Helpers.onPrivateFieldsPage()) {
                        PrivateFieldsPage.setupCSS();
                    }

                    //mass party click css
                    let menuBackground = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('background-color');
                    $("#qolpartymod").css("background-color", ""+menuBackground+"");
                    let menuColor = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('color');
                    $("#qolpartymod").css("color", ""+menuColor+"");

                    //custom user css
                    let customUserCss = VARIABLES.userSettings.customCss;
                    let customUserCssInject = '<style type="text/css">'+customUserCss+'</style>'
                    //document.querySelector('head').append();
                    $('head').append('<style type="text/css">'+customUserCss+'</style>');
                },
                setupObservers() { // all the Observers that needs to run
                    if (VARIABLES.userSettings.shelterEnable === true && Helpers.onShelterPage()) { //observe changes on the shelter page
						ShelterPage.setupObserver();
                    }
                    else if (VARIABLES.userSettings.fieldSort === true && Helpers.onPublicFieldsPage()) { //observe pokemon changes on the fields page
                        OBSERVERS.fieldsObserver.observe(document.querySelector('#field_field'), {
                            childList: true,
                            attributeFilter: ['class'],
                        });
                    }
                    else if (VARIABLES.userSettings.fieldSearch === true && Helpers.onPublicFieldsPage()) { //observe settings changes on the fields page
                        OBSERVERS.fieldsObserver.observe(document.querySelector('#fieldorder'), {
                            childList: true,
                        });
                    }
                    else if (VARIABLES.userSettings.partyMod === true && Helpers.onMultiuserPage()) { //observe party click changes on the users page
                        OBSERVERS.partyClickObserver.observe(document.querySelector('#multiuser'), {
                            childList: true,
                        });
                    }
                    else if (VARIABLES.userSettings.labNotifier === true && Helpers.onLabPage()) { //observe lab changes on the lab page
                        OBSERVERS.labObserver.observe(document.querySelector('#labpage>div>div>div'), {
                            childList: true,
                            characterdata: true,
                            subtree: true,
                            characterDataOldValue: true,
                        });
                    }
                    else if (VARIABLES.userSettings.easyEvolve === true && Helpers.onFarmPage("tab=1")) {
                        OBSERVERS.evolveObserver.observe(document.querySelector('#farmnews-evolutions'), {
                            childList: true,
                            characterdata: true,
                            subtree: true,
                            characterDataOldValue: true,
                        });
                    }
                    else if (VARIABLES.userSettings.privateFieldSearch === true && Helpers.onPrivateFieldsPage()) {
                        PrivateFieldsPage.setupObserver();
                    }
                },
                setupHandlers() { // all the event handlers
					if (VARIABLES.userSettings.shelterEnable === true && Helpers.onShelterPage()) { //observe changes on the shelter page
						ShelterPage.setupHandlers();
                    }
					else if (VARIABLES.userSettings.privateFieldSearch === true && Helpers.onPrivateFieldsPage()) {
						PrivateFieldsPage.setupHandlers();
					}
				},
				startup() { // All the functions that are run to start the script on Pokéfarm
                    return {
                        'loading Settings'        : fn.backwork.loadSettings,
                        'checking for update'    : fn.backwork.checkForUpdate,
                        'setting up HTML'         : fn.backwork.setupHTML,
                        'setting up CSS'        : fn.backwork.setupCSS,
                        'setting up Observers'    : fn.backwork.setupObservers,
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
                    console.log('baguette')
                    if (JSON.stringify(VARIABLES.userSettings).indexOf(element) >= 0) { // userscript settings
                        if (VARIABLES.userSettings[element] === false ) {
                            VARIABLES.userSettings[element] = true;
                        } else if (VARIABLES.userSettings[element] === true ) {
                            VARIABLES.userSettings[element] = false;
                        } else if (typeof VARIABLES.userSettings[element] === 'string') {
                            VARIABLES.userSettings[element] = textElement;
                        }
                    }
                    else if (ShelterPage.settingsChange(element, textElement, customClass, typeClass)) {
                        console.log('baguette - after')
                        console.log(ShelterPage.getSettings());
                        ShelterPage.saveSettings();
                        console.log('baguette - after 2')
                        console.log(ShelterPage.getSettings());
                    }

                    else if (JSON.stringify(VARIABLES.userSettings.fieldSortSettings).indexOf(element) >= 0) { // field sort settings
                        if (VARIABLES.userSettings.fieldSortSettings[element] === false ) {
                            VARIABLES.userSettings.fieldSortSettings[element] = true;
                            if (element === "fieldByBerry") {
                                VARIABLES.userSettings.fieldSortSettings.fieldByMiddle = false;
                                VARIABLES.userSettings.fieldSortSettings.fieldByGrid = false;
                            } else if (element === "fieldByMiddle") {
                                VARIABLES.userSettings.fieldSortSettings.fieldByBerry = false;
                                VARIABLES.userSettings.fieldSortSettings.fieldByGrid = false;
                            } else if (element === "fieldByGrid") {
                                VARIABLES.userSettings.fieldSortSettings.fieldByBerry = false;
                                VARIABLES.userSettings.fieldSortSettings.fieldByMiddle = false;
                            }
                        } else if (VARIABLES.userSettings.fieldSortSettings[element] === true ) {
                            VARIABLES.userSettings.fieldSortSettings[element] = false;
                        } else if (typeof VARIABLES.userSettings.fieldSortSettings[element] === 'string') {
                            VARIABLES.userSettings.fieldSortSettings[element] = textElement;
                        }
                    }

                    else if (JSON.stringify(VARIABLES.userSettings.fieldSearchSettings).indexOf(element) >= 0) { // field search settings
                        if (VARIABLES.userSettings.fieldSearchSettings[element] === false ) {
                            VARIABLES.userSettings.fieldSearchSettings[element] = true;
                        } else if (VARIABLES.userSettings.fieldSearchSettings[element] === true ) {
                            VARIABLES.userSettings.fieldSearchSettings[element] = false;
                        } else if (typeof VARIABLES.userSettings.fieldSearchSettings[element] === 'string') {
                            if (element === 'fieldType') {
                                if (textElement === 'none') {
                                    let tempIndex = typeClass - 1;
                                    VARIABLES.fieldTypeArray.splice(tempIndex, tempIndex);
                                    VARIABLES.userSettings.fieldSearchSettings.fieldType = VARIABLES.fieldTypeArray.toString();
                                } else {
                                    let tempIndex = typeClass - 1;
                                    VARIABLES.fieldTypeArray[tempIndex] = textElement;
                                    VARIABLES.userSettings.fieldSearchSettings.fieldType = VARIABLES.fieldTypeArray.toString();
                                }
                            }
                            if (element === 'fieldNature') {
                                if (textElement === 'none') {
                                    let tempIndex = typeClass - 1;
                                    VARIABLES.fieldNatureArray.splice(tempIndex, tempIndex);
                                    VARIABLES.userSettings.fieldSearchSettings.fieldNature = VARIABLES.fieldNatureArray.toString();
                                } else {
                                    let tempIndex = typeClass - 1;
                                    VARIABLES.fieldNatureArray[tempIndex] = textElement;
                                    VARIABLES.userSettings.fieldSearchSettings.fieldNature = VARIABLES.fieldNatureArray.toString();
                                }
                            }
                            if (element === 'fieldCustom') {
                                let tempIndex = customClass - 1;
                                VARIABLES.fieldCustomArray[tempIndex] = textElement;
                                VARIABLES.userSettings.fieldSearchSettings.fieldCustom = VARIABLES.fieldCustomArray.toString();
                            }
                        }
                    }

                    else if (PrivateFieldsPage.settingsChange(element, textElement, customClass, typeClass)) {
						PrivateFieldsPage.saveSettings();
                    }

                    else if (JSON.stringify(VARIABLES.userSettings.partyModSettings).indexOf(element) >= 0) { // partymod settings
                        if (VARIABLES.userSettings.partyModSettings[element] === false ) {
                            VARIABLES.userSettings.partyModSettings[element] = true;
                            if (element === "hideAll") {
                                VARIABLES.userSettings.partyModSettings.hideDislike = false;
                                VARIABLES.userSettings.partyModSettings.niceTable = false;
                            } else if (element === "hideDislike") {
                                VARIABLES.userSettings.partyModSettings.hideAll = false;
                                VARIABLES.userSettings.partyModSettings.niceTable = false;
                            } else if (element === "niceTable") {
                                VARIABLES.userSettings.partyModSettings.hideDislike = false;
                                VARIABLES.userSettings.partyModSettings.hideAll = false;
                            }
                        } else if (VARIABLES.userSettings.partyModSettings[element] === true ) {
                            VARIABLES.userSettings.partyModSettings[element] = false;
                        } else if (typeof VARIABLES.userSettings.partyModSettings[element] === 'string') {
                            VARIABLES.userSettings.partyModSettings[element] = textElement;
                        }
                    }

                    if (JSON.stringify(VARIABLES.userSettings.labNotiferSettings).indexOf(element) >= 0) { // lab notifier settings
                        if (element === 'findLabEgg') {
                            let tempIndex = customClass - 1;
                            VARIABLES.labSearchArray[tempIndex] = textElement;
                            VARIABLES.userSettings.labNotiferSettings.findLabEgg = VARIABLES.labSearchArray.toString();
                        }
                        else if(element === 'findLabType') {
                            if (textElement === 'none') {
                                let tempIndex = typeClass - 1;
                                VARIABLES.labListArray.splice(tempIndex, tempIndex);
                                VARIABLES.userSettings.labNotiferSettings.findLabType = VARIABLES.labListArray.toString();
                            } else {
                                let tempIndex = typeClass - 1;
                                VARIABLES.labListArray[tempIndex] = textElement;
                                VARIABLES.userSettings.labNotiferSettings.findLabType = VARIABLES.labListArray.toString();
                            }
                        }
                    }

                    fn.backwork.saveSettings();
                },

                shelterCustomSearch() {
                    console.log('crumb')
                    ShelterPage.loadSettings();
                    ShelterPage.customSearch();
                    console.log('bmurc')
                    ShelterPage.saveSettings();
                },

                releaseFieldSelectAll() {
                    if (VARIABLES.userSettings.releaseSelectAll === true) {
                        document.querySelector('.dialog>div>div>div>div>button').insertAdjacentHTML('afterend', '<label id="selectallfield"><input id="selectallfieldcheckbox" type="checkbox">Select all  </label><label id="selectallfieldany"><input id="selectallfieldanycheckbox" type="checkbox">Select Any  </label><label id="selectallfieldsour"><input id="selectallfieldsourcheckbox" type="checkbox">Select Sour  </label><label id="selectallfieldspicy"><input id="selectallfieldspicycheckbox" type="checkbox">Select Spicy</label><label id="selectallfielddry"><input id="selectallfielddrycheckbox" type="checkbox">Select Dry  </label><label id="selectallfieldsweet"><input id="selectallfieldsweetcheckbox" type="checkbox">Select Sweet  </label><label id="selectallfieldbitter"><input id="selectallfieldbittercheckbox" type="checkbox">Select Bitter  </label>');
                        $('#selectallfieldcheckbox').click(function() {
                            $('#massreleaselist>ul>li>label>input').not(this).prop('checked', this.checked);
                        });

                        $('#selectallfieldanycheckbox').click(function() {
                            let selectAny = $('.icons:contains("Any")').prev().prev().prev('input');
                            $(selectAny).not(this).prop('checked', this.checked);
                        });

                        $('#selectallfieldsourcheckbox').click(function() {
                            let selectSour = $('.icons:contains("Sour")').prev().prev().prev('input');
                            $(selectSour).not(this).prop('checked', this.checked);
                        });

                        $('#selectallfieldspicycheckbox').click(function() {
                            let selectSpicy = $('.icons:contains("Spicy")').prev().prev().prev('input');
                            $(selectSpicy).not(this).prop('checked', this.checked);
                        });

                        $('#selectallfielddrycheckbox').click(function() {
                            let selectDry = $('.icons:contains("Dry")').prev().prev().prev('input');
                            $(selectDry).not(this).prop('checked', this.checked);
                        });

                        $('#selectallfieldsweetcheckbox').click(function() {
                            let selectSweet = $('.icons:contains("Sweet")').prev().prev().prev('input');
                            $(selectSweet).not(this).prop('checked', this.checked);
                        });

                        $('#selectallfieldbittercheckbox').click(function() {
                            let selectBitter = $('.icons:contains("Bitter")').prev().prev().prev('input');
                            $(selectBitter).not(this).prop('checked', this.checked);
                        });

                    }
                },
                moveFieldSelectAll() {
                    if (VARIABLES.userSettings.releaseSelectAll === true) {
                        document.querySelector('.dialog>div>div>div>div>button').insertAdjacentHTML('afterend', '<label id="movefieldselectall"><input id="movefieldselectallcheckbox" type="checkbox">Select all  </label><label id="movefieldselectany"><input id="movefieldselectanycheckbox" type="checkbox">Select Any  </label><label id="movefieldselectsour"><input id="movefieldselectsourcheckbox" type="checkbox">Select Sour  </label><label id="movefieldselectspicy"><input id="movefieldselectspicycheckbox" type="checkbox">Select Spicy</label><label id="movefieldselectdry"><input id="movefieldselectdrycheckbox" type="checkbox">Select Dry  </label><label id="movefieldselectsweet"><input id="movefieldselectsweetcheckbox" type="checkbox">Select Sweet  </label><label id="movefieldselectbitter"><input id="movefieldselectbittercheckbox" type="checkbox">Select Bitter  </label>');
                        $('#movefieldselectallcheckbox').click(function() {
                            $('#massmovelist>ul>li>label>input').not(this).prop('checked', this.checked);
                        });

                        $('#movefieldselectanycheckbox').click(function() {
                            let selectAny = $('.icons:contains("Any")').prev().prev().prev('input');
                            $(selectAny).not(this).prop('checked', this.checked);
                        });

                        $('#movefieldselectsourcheckbox').click(function() {
                            let selectSour = $('.icons:contains("Sour")').prev().prev().prev('input');
                            $(selectSour).not(this).prop('checked', this.checked);
                        });

                        $('#movefieldselectspicycheckbox').click(function() {
                            let selectSpicy = $('.icons:contains("Spicy")').prev().prev().prev('input');
                            $(selectSpicy).not(this).prop('checked', this.checked);
                        });

                        $('#movefieldselectdrycheckbox').click(function() {
                            let selectDry = $('.icons:contains("Dry")').prev().prev().prev('input');
                            $(selectDry).not(this).prop('checked', this.checked);
                        });

                        $('#movefieldselectsweetcheckbox').click(function() {
                            let selectSweet = $('.icons:contains("Sweet")').prev().prev().prev('input');
                            $(selectSweet).not(this).prop('checked', this.checked);
                        });

                        $('#movefieldselectbittercheckbox').click(function() {
                            let selectBitter = $('.icons:contains("Bitter")').prev().prev().prev('input');
                            $(selectBitter).not(this).prop('checked', this.checked);
                        });
                    }
                },
                releaseFishSelectAll() {
                    if (VARIABLES.userSettings.releaseSelectAll === true) {
                        $("#selectallfishcheckbox").click(function(){
                            $('input:checkbox').not(this).prop('checked', this.checked);
                        });

                        $('#movefishselectanycheckbox').click(function() {
                            let selectAny = $('.icons:contains("Any")').prev().prev('input');
                            $(selectAny).not(this).prop('checked', this.checked);
                        });

                        $('#movefishselectsourcheckbox').click(function() {
                            let selectSour = $('.icons:contains("Sour")').prev().prev('input');
                            $(selectSour).not(this).prop('checked', this.checked);
                        });

                        $('#movefishselectspicycheckbox').click(function() {
                            let selectSpicy = $('.icons:contains("Spicy")').prev().prev('input');
                            $(selectSpicy).not(this).prop('checked', this.checked);
                        });

                        $('#movefishselectdrycheckbox').click(function() {
                            let selectDry = $('.icons:contains("Dry")').prev().prev('input');
                            $(selectDry).not(this).prop('checked', this.checked);
                        });

                        $('#movefishselectsweetcheckbox').click(function() {
                            let selectSweet = $('.icons:contains("Sweet")').prev().prev('input');
                            $(selectSweet).not(this).prop('checked', this.checked);
                        });

                        $('#movefishselectbittercheckbox').click(function() {
                            let selectBitter = $('.icons:contains("Bitter")').prev().prev('input');
                            $(selectBitter).not(this).prop('checked', this.checked);
                        });
                    }
                },

                fieldSorter() {
                    if (VARIABLES.userSettings.fieldSort === true) {
                        $('input.qolalone').on('change', function() { //only 1 textbox may be true
                            $('input.qolalone').not(this).prop('checked', false);
                        });

                        if (VARIABLES.userSettings.fieldSortSettings.fieldByBerry === true) { //sort field by berries
                            $('.fieldmon').removeClass("qolSortMiddle");
                            $('.field').removeClass("qolGridField");
                            $('.fieldmon').removeClass("qolGridPokeSize");
                            $('.fieldmon>img').removeClass("qolGridPokeImg");

                            if($('#field_field [data-flavour*="any-"]').length) {
                                $('#field_field [data-flavour*="any-"]').addClass("qolAnyBerry");
                            }
                            if($('#field_field [data-flavour*="sour-"]').length) {
                                $('#field_field [data-flavour*="sour-"]').addClass("qolSourBerry");
                            }
                            if($('#field_field [data-flavour*="spicy-"]').length) {
                                $('#field_field [data-flavour*="spicy-"]').addClass("qolSpicyBerry");
                            }
                            if($('#field_field [data-flavour*="dry-"]').length) {
                                $('#field_field [data-flavour*="dry-"]').addClass("qolDryBerry");
                            }
                            if($('#field_field [data-flavour*="sweet-"]').length) {
                                $('#field_field [data-flavour*="sweet-"]').addClass("qolSweetBerry");
                            }
                            if($('#field_field [data-flavour*="bitter-"]').length) {
                                $('#field_field [data-flavour*="bitter-"]').addClass("qolBitterBerry");
                            }
                        }
                        if (VARIABLES.userSettings.fieldSortSettings.fieldByMiddle === true) { //sort field in the middle
                            $('#field_field [data-flavour*="any-"]').removeClass("qolAnyBerry");
                            $('#field_field [data-flavour*="sour-"]').removeClass("qolSourBerry");
                            $('#field_field [data-flavour*="spicy-"]').removeClass("qolSpicyBerry");
                            $('#field_field [data-flavour*="dry-"]').removeClass("qolDryBerry");
                            $('#field_field [data-flavour*="sweet-"]').removeClass("qolSweetBerry");
                            $('#field_field [data-flavour*="bitter-"]').removeClass("qolBitterBerry");
                            $('.field').removeClass("qolGridField");
                            $('.fieldmon').removeClass("qolGridPokeSize");
                            $('.fieldmon>img').removeClass("qolGridPokeImg");

                            $('.fieldmon').addClass("qolSortMiddle");
                        }

                        if (VARIABLES.userSettings.fieldSortSettings.fieldByGrid === true) { //sort field in a grid
                            $('#field_field [data-flavour*="any-"]').removeClass("qolAnyBerry");
                            $('#field_field [data-flavour*="sour-"]').removeClass("qolSourBerry");
                            $('#field_field [data-flavour*="spicy-"]').removeClass("qolSpicyBerry");
                            $('#field_field [data-flavour*="dry-"]').removeClass("qolDryBerry");
                            $('#field_field [data-flavour*="sweet-"]').removeClass("qolSweetBerry");
                            $('#field_field [data-flavour*="bitter-"]').removeClass("qolBitterBerry");
                            $('.fieldmon').removeClass("qolSortMiddle");

                            $('.field').addClass("qolGridField");
                            $('.fieldmon').addClass("qolGridPokeSize");
                            $('.fieldmon>img').addClass("qolGridPokeImg");
                        }

                        if (VARIABLES.userSettings.fieldSortSettings.fieldByBerry === false && VARIABLES.userSettings.fieldSortSettings.fieldByMiddle === false && VARIABLES.userSettings.fieldSortSettings.fieldByGrid === false) {
                            $('#field_field [data-flavour*="any-"]').removeClass("qolAnyBerry");
                            $('#field_field [data-flavour*="sour-"]').removeClass("qolSourBerry");
                            $('#field_field [data-flavour*="spicy-"]').removeClass("qolSpicyBerry");
                            $('#field_field [data-flavour*="dry-"]').removeClass("qolDryBerry");
                            $('#field_field [data-flavour*="sweet-"]').removeClass("qolSweetBerry");
                            $('#field_field [data-flavour*="bitter-"]').removeClass("qolBitterBerry");
                            $('.fieldmon').removeClass("qolSortMiddle");
                            $('.field').removeClass("qolGridField");
                            $('.fieldmon').removeClass("qolGridPokeSize");
                            $('.fieldmon>img').removeClass("qolGridPokeImg");
                        }

                        //Pokémon click counter
                        if (VARIABLES.userSettings.fieldSortSettings.fieldClickCount === false) {
                            $('#pokemonclickcount').remove();
                        } else if (VARIABLES.userSettings.fieldSortSettings.fieldClickCount === true) {
                            let pokemonFed = $(".fieldmon").map(function(){return $(this).attr("data-fed");}).get();

                            let pokemonClicked = 0;
                            for (var i = 0; i < pokemonFed.length; i++) {
                                pokemonClicked += pokemonFed[i] << 0;
                            }

                            let pokemonInField = $('.fieldpkmncount').text();

                            $('#pokemonclickcount').remove(); //make sure no duplicates are being produced
                            document.querySelector('.fielddata').insertAdjacentHTML('beforeend','<div id="pokemonclickcount">'+pokemonClicked+' / '+pokemonInField+' Clicked</div>');
                            if (JSON.stringify(pokemonClicked) === pokemonInField) {
                                $('#pokemonclickcount').css({"color" : "#059121"});
                            }
                            if (pokemonClicked !== JSON.parse(pokemonInField)) {
                                $('#pokemonclickcount').css({"color" : "#a30323"});
                            }
                        }
                    }
                },

                partyModification() {
                    if (VARIABLES.userSettings.partyMod === true) {
                        $('input.qolalone').on('change', function() { //only 1 textbox may be true
                            $('input.qolalone').not(this).prop('checked', false);
                        });

                        if (VARIABLES.userSettings.partyModSettings.hideDislike === false && VARIABLES.userSettings.partyModSettings.hideAll === false && VARIABLES.userSettings.partyModSettings.niceTable === false) {
                            $('#trainerimage').removeClass('qolpartyclickhide');
                            $('#profilebox').removeClass('qolpartyclickhide');
                            $('#multiuser .pkmn').removeClass('qolpartyclickhide');
                            $('#multiuser .name').removeClass('qolpartyclickhide');
                            $('#multiuser .expbar').removeClass('qolpartyclickhide');
                            $('#multiuser .taste').removeClass('qolpartyclickhide');
                            $('#partybox .party>div>.action.working').removeClass('qolpartyclickhide');
                            $(".party>div>.action>.berrybuttons:not([data-up='sour'])>[data-berry='aspear'], .party>div>.action>.berrybuttons:not([data-up='spicy'])>[data-berry='cheri'], .party>div>.action>.berrybuttons:not([data-up='dry'])>[data-berry='chesto'], .party>div>.action>.berrybuttons:not([data-up='sweet'])>[data-berry='pecha'], .party>div>.action>.berrybuttons:not([data-up='bitter'])>[data-berry='rawst']").removeClass('qolpartyclickhide');
                            $(".party>div>.action>.berrybuttons[data-up='sour']>[data-berry='aspear'], .party>div>.action>.berrybuttons[data-up='spicy']>[data-berry='cheri'], .party>div>.action>.berrybuttons[data-up='dry']>[data-berry='chesto'], .party>div>.action>.berrybuttons[data-up='sweet']>[data-berry='pecha'], .party>div>.action>.berrybuttons[data-up='bitter']>[data-berry='rawst']").removeClass('qolpartyclickwidth');
                            $(".party>div>.action>.berrybuttons[data-up='any']>[data-berry]").removeClass('qolpartyclickblock');
                            $('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');
                            $('#multiuser .party>div').removeClass('qolpartyclickalot');
                            $('#multiuser .party>div>.action a[data-berry]').removeClass('qolpartyclickz');
                            $('.mu_navlink.next').removeClass('qolpartyclicknav');
                            $('#multiuser .party').removeClass('qolpartyclickpartywidth');
                            $('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
                            $('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
                            $('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
                            $('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
                            $('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
                            $('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
                            $('#multiuser.tabbed_interface.horizontal>ul').removeClass('qolpartyclickul');
                            $('#multiuser.tabbed_interface>ul>li>label').removeClass('qolpartyclicklilabel');
                            $('#multiuser .pkmn').removeClass('qolpartyclickhide');
                            $('#multiuser .name').removeClass('qolpartyclickhide');
                            $('#multiuser .expbar').removeClass('qolpartyclickhide');
                            $('#multiuser .taste').removeClass('qolpartyclickhide');
                            $('#multiuser .party').removeClass('qolpartyclickpartywidth');
                            $('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
                            $('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
                            $('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
                            $('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
                            $('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
                            $('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
                            $('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');

                            $('.party>div>.action>.berrybuttons').removeClass('qolpartyclicktextalign');
                        }

                        if (VARIABLES.userSettings.partyModSettings.hideDislike === true) {
                            $('#trainerimage').removeClass('qolpartyclickhide');
                            $('#profilebox').removeClass('qolpartyclickhide');
                            $('#multiuser .pkmn').removeClass('qolpartyclickhide');
                            $('#multiuser .name').removeClass('qolpartyclickhide');
                            $('#multiuser .expbar').removeClass('qolpartyclickhide');
                            $('#multiuser .taste').removeClass('qolpartyclickhide');
                            $('#partybox .party>div>.action.working').removeClass('qolpartyclickhide');
                            $(".party>div>.action>.berrybuttons:not([data-up='sour'])>[data-berry='aspear'], .party>div>.action>.berrybuttons:not([data-up='spicy'])>[data-berry='cheri'], .party>div>.action>.berrybuttons:not([data-up='dry'])>[data-berry='chesto'], .party>div>.action>.berrybuttons:not([data-up='sweet'])>[data-berry='pecha'], .party>div>.action>.berrybuttons:not([data-up='bitter'])>[data-berry='rawst']").removeClass('qolpartyclickhide');
                            $(".party>div>.action>.berrybuttons[data-up='sour']>[data-berry='aspear'], .party>div>.action>.berrybuttons[data-up='spicy']>[data-berry='cheri'], .party>div>.action>.berrybuttons[data-up='dry']>[data-berry='chesto'], .party>div>.action>.berrybuttons[data-up='sweet']>[data-berry='pecha'], .party>div>.action>.berrybuttons[data-up='bitter']>[data-berry='rawst']").removeClass('qolpartyclickwidth');
                            $(".party>div>.action>.berrybuttons[data-up='any']>[data-berry]").removeClass('qolpartyclickblock');
                            $('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');
                            $('#multiuser .party>div').removeClass('qolpartyclickalot');
                            $('#multiuser .party>div>.action a[data-berry]').removeClass('qolpartyclickz');
                            $('.mu_navlink.next').removeClass('qolpartyclicknav');
                            $('#multiuser .party').removeClass('qolpartyclickpartywidth');
                            $('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
                            $('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
                            $('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
                            $('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
                            $('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
                            $('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
                            $('#multiuser.tabbed_interface.horizontal>ul').removeClass('qolpartyclickul');
                            $('#multiuser.tabbed_interface>ul>li>label').removeClass('qolpartyclicklilabel');
                            $('#multiuser .pkmn').removeClass('qolpartyclickhide');
                            $('#multiuser .name').removeClass('qolpartyclickhide');
                            $('#multiuser .expbar').removeClass('qolpartyclickhide');
                            $('#multiuser .taste').removeClass('qolpartyclickhide');
                            $('#multiuser .party').removeClass('qolpartyclickpartywidth');
                            $('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
                            $('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
                            $('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
                            $('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
                            $('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
                            $('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
                            $('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');

                            $('.party>div>.action>.berrybuttons').addClass('qolpartyclicktextalign');
                            $(".party>div>.action>.berrybuttons:not([data-up='sour'])>[data-berry='aspear'], .party>div>.action>.berrybuttons:not([data-up='spicy'])>[data-berry='cheri'], .party>div>.action>.berrybuttons:not([data-up='dry'])>[data-berry='chesto'], .party>div>.action>.berrybuttons:not([data-up='sweet'])>[data-berry='pecha'], .party>div>.action>.berrybuttons:not([data-up='bitter'])>[data-berry='rawst']").addClass('qolpartyclickhide');
                            $(".party>div>.action>.berrybuttons[data-up='sour']>[data-berry='aspear'], .party>div>.action>.berrybuttons[data-up='spicy']>[data-berry='cheri'], .party>div>.action>.berrybuttons[data-up='dry']>[data-berry='chesto'], .party>div>.action>.berrybuttons[data-up='sweet']>[data-berry='pecha'], .party>div>.action>.berrybuttons[data-up='bitter']>[data-berry='rawst']").addClass('qolpartyclickwidth');
                            $(".party>div>.action>.berrybuttons[data-up='any']>[data-berry]").addClass('qolpartyclickblock');
                        }

                        if (VARIABLES.userSettings.partyModSettings.niceTable === true) {
                            $('#trainerimage').removeClass('qolpartyclickhide');
                            $('#profilebox').removeClass('qolpartyclickhide');
                            $('#multiuser .pkmn').removeClass('qolpartyclickhide');
                            $('#multiuser .name').removeClass('qolpartyclickhide');
                            $('#multiuser .expbar').removeClass('qolpartyclickhide');
                            $('#multiuser .taste').removeClass('qolpartyclickhide');
                            $('#partybox .party>div>.action.working').removeClass('qolpartyclickhide');
                            $(".party>div>.action>.berrybuttons:not([data-up='sour'])>[data-berry='aspear'], .party>div>.action>.berrybuttons:not([data-up='spicy'])>[data-berry='cheri'], .party>div>.action>.berrybuttons:not([data-up='dry'])>[data-berry='chesto'], .party>div>.action>.berrybuttons:not([data-up='sweet'])>[data-berry='pecha'], .party>div>.action>.berrybuttons:not([data-up='bitter'])>[data-berry='rawst']").removeClass('qolpartyclickhide');
                            $(".party>div>.action>.berrybuttons[data-up='sour']>[data-berry='aspear'], .party>div>.action>.berrybuttons[data-up='spicy']>[data-berry='cheri'], .party>div>.action>.berrybuttons[data-up='dry']>[data-berry='chesto'], .party>div>.action>.berrybuttons[data-up='sweet']>[data-berry='pecha'], .party>div>.action>.berrybuttons[data-up='bitter']>[data-berry='rawst']").removeClass('qolpartyclickwidth');
                            $(".party>div>.action>.berrybuttons[data-up='any']>[data-berry]").removeClass('qolpartyclickblock');
                            $('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');
                            $('#multiuser .party>div').removeClass('qolpartyclickalot');
                            $('#multiuser .party>div>.action a[data-berry]').removeClass('qolpartyclickz');
                            $('.mu_navlink.next').removeClass('qolpartyclicknav');
                            $('#multiuser .party').removeClass('qolpartyclickpartywidth');
                            $('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
                            $('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
                            $('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
                            $('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
                            $('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
                            $('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
                            $('#multiuser.tabbed_interface.horizontal>ul').removeClass('qolpartyclickul');
                            $('#multiuser.tabbed_interface>ul>li>label').removeClass('qolpartyclicklilabel');
                            $('.party>div>.action>.berrybuttons').removeClass('qolpartyclicktextalign');

                            $('#multiuser .pkmn').addClass('qolpartyclickhide');
                            $('#multiuser .name').addClass('qolpartyclickhide');
                            $('#multiuser .expbar').addClass('qolpartyclickhide');
                            $('#multiuser .taste').addClass('qolpartyclickhide');
                            $('#multiuser .party').addClass('qolpartyclickpartywidth');
                            $('#multiuser .party>div').addClass('qolpartyclickpartydivwidth');
                            $('#multiuser .party>div:nth-child(1)').addClass('qolpartyclickborderone');
                            $('#multiuser .party>div:nth-child(2)').addClass('qolpartyclickbordertwo');
                            $('#multiuser .party>div:nth-child(5)').addClass('qolpartyclickborderthree');
                            $('#multiuser .party>div:nth-child(6)').addClass('qolpartyclickborderfour');
                            $('#multiuser .party>div:nth-child(2n+1)').addClass('qolpartyclickborderfive');
                            $('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').addClass('qolpartyclickhide');
                            $('.party>div>.action>.berrybuttons').addClass('qolpartyclicktextalign');
                            $(".party>div>.action>.berrybuttons:not([data-up='sour'])>[data-berry='aspear'], .party>div>.action>.berrybuttons:not([data-up='spicy'])>[data-berry='cheri'], .party>div>.action>.berrybuttons:not([data-up='dry'])>[data-berry='chesto'], .party>div>.action>.berrybuttons:not([data-up='sweet'])>[data-berry='pecha'], .party>div>.action>.berrybuttons:not([data-up='bitter'])>[data-berry='rawst']").addClass('qolpartyclickhide');
                            $(".party>div>.action>.berrybuttons[data-up='sour']>[data-berry='aspear'], .party>div>.action>.berrybuttons[data-up='spicy']>[data-berry='cheri'], .party>div>.action>.berrybuttons[data-up='dry']>[data-berry='chesto'], .party>div>.action>.berrybuttons[data-up='sweet']>[data-berry='pecha'], .party>div>.action>.berrybuttons[data-up='bitter']>[data-berry='rawst']").addClass('qolpartyclickwidth');
                            $(".party>div>.action>.berrybuttons[data-up='any']>[data-berry]").addClass('qolpartyclickblock');
                        }


                        if (VARIABLES.userSettings.partyModSettings.hideAll === true) {
                            $('.party>div>.action>.berrybuttons').removeClass('qolpartyclicktextalign');
                            $(".party>div>.action>.berrybuttons:not([data-up='sour'])>[data-berry='aspear'], .party>div>.action>.berrybuttons:not([data-up='spicy'])>[data-berry='cheri'], .party>div>.action>.berrybuttons:not([data-up='dry'])>[data-berry='chesto'], .party>div>.action>.berrybuttons:not([data-up='sweet'])>[data-berry='pecha'], .party>div>.action>.berrybuttons:not([data-up='bitter'])>[data-berry='rawst']").removeClass('qolpartyclickhide');
                            $(".party>div>.action>.berrybuttons[data-up='sour']>[data-berry='aspear'], .party>div>.action>.berrybuttons[data-up='spicy']>[data-berry='cheri'], .party>div>.action>.berrybuttons[data-up='dry']>[data-berry='chesto'], .party>div>.action>.berrybuttons[data-up='sweet']>[data-berry='pecha'], .party>div>.action>.berrybuttons[data-up='bitter']>[data-berry='rawst']").removeClass('qolpartyclickwidth');
                            $(".party>div>.action>.berrybuttons[data-up='any']>[data-berry]").removeClass('qolpartyclickblock');
                            $('#multiuser .pkmn').removeClass('qolpartyclickhide');
                            $('#multiuser .name').removeClass('qolpartyclickhide');
                            $('#multiuser .expbar').removeClass('qolpartyclickhide');
                            $('#multiuser .taste').removeClass('qolpartyclickhide');
                            $('#multiuser .party').removeClass('qolpartyclickpartywidth');
                            $('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
                            $('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
                            $('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
                            $('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
                            $('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
                            $('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
                            $('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');

                            $('#trainerimage').addClass('qolpartyclickhide');
                            $('#profilebox').addClass('qolpartyclickhide');
                            $('#multiuser .pkmn').addClass('qolpartyclickhide');
                            $('#multiuser .name').addClass('qolpartyclickhide');
                            $('#multiuser .expbar').addClass('qolpartyclickhide');
                            $('#multiuser .taste').addClass('qolpartyclickhide');
                            $('#partybox .party>div>.action.working').addClass('qolpartyclickhide');
                            $(".party>div>.action>.berrybuttons:not([data-up='sour'])>[data-berry='aspear'], .party>div>.action>.berrybuttons:not([data-up='spicy'])>[data-berry='cheri'], .party>div>.action>.berrybuttons:not([data-up='dry'])>[data-berry='chesto'], .party>div>.action>.berrybuttons:not([data-up='sweet'])>[data-berry='pecha'], .party>div>.action>.berrybuttons:not([data-up='bitter'])>[data-berry='rawst']").addClass('qolpartyclickhide');
                            $(".party>div>.action>.berrybuttons[data-up='sour']>[data-berry='aspear'], .party>div>.action>.berrybuttons[data-up='spicy']>[data-berry='cheri'], .party>div>.action>.berrybuttons[data-up='dry']>[data-berry='chesto'], .party>div>.action>.berrybuttons[data-up='sweet']>[data-berry='pecha'], .party>div>.action>.berrybuttons[data-up='bitter']>[data-berry='rawst']").addClass('qolpartyclickwidth');
                            $(".party>div>.action>.berrybuttons[data-up='any']>[data-berry]").addClass('qolpartyclickblock');
                            $('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').addClass('qolpartyclickhide');
                            $('#multiuser .party>div').addClass('qolpartyclickalot');
                            $('#multiuser .party>div>.action a[data-berry]').addClass('qolpartyclickz');
                            $('.mu_navlink.next').addClass('qolpartyclicknav');
                            $('#multiuser .party').addClass('qolpartyclickpartywidth');
                            $('#multiuser .party>div').addClass('qolpartyclickpartydivwidth');
                            $('#multiuser .party>div:nth-child(1)').addClass('qolpartyclickborderone');
                            $('#multiuser .party>div:nth-child(2)').addClass('qolpartyclickbordertwo');
                            $('#multiuser .party>div:nth-child(5)').addClass('qolpartyclickborderthree');
                            $('#multiuser .party>div:nth-child(6)').addClass('qolpartyclickborderfour');
                            $('#multiuser .party>div:nth-child(2n+1)').addClass('qolpartyclickborderfive');
                            $('#multiuser.tabbed_interface.horizontal>ul').addClass('qolpartyclickul');
                            $('#multiuser.tabbed_interface>ul>li>label').addClass('qolpartyclicklilabel');
                        }
                    }
                },

                savingDexData() {
                    fn.backwork.loadSettings();
                    let dexTempData = ($('#dexdata').html());
                    let dexTempArray = dexTempData.split(',');

                    //Experiment with Flabebe (It's better to just make the new data dex save function)
                    //let dexTempArrayFlabebe = dexTempArray.indexOf(Flab\u00e9b\u00e9)
                    //Flab\u00e9b\u00e9 > Flabébé

                    //let dexArray = dexTempArray.splice(0, 29);




                    if (VARIABLES.userSettings.variData.dexData != dexTempArray.toString()) {
                        VARIABLES.userSettings.variData.dexData = dexTempArray.toString();
                        fn.backwork.saveSettings();
                        console.log('your dexdata has been updated');
                    }
                },

                easyEvolveNormalList() {
                    if (VARIABLES.userSettings.easyEvolve === true) {
                        // first remove the sorted pokemon type list to avoid duplicates
                        $('.evolvepkmnlist').show();
                        try {
                            document.querySelector('.qolEvolveTypeList').remove();
                        }
                        catch(err){
                            let thisdoesnothing = true;
                        }
                        try {
                            document.querySelector('.qolEvolveNameList').remove();
                        }
                        catch(err){
                            let thisdoesnothing = true;
                        }
                        try {
                            document.querySelector('.qolEvolveNewList').remove();
                        }
                        catch(err){
                            let thisdoesnothing = true;
                        }
                    }
                },
                easyEvolveTypeList() {
                    if (VARIABLES.userSettings.easyEvolve === true) {
                        // first remove the sorted pokemon type list to avoid duplicates
                        $('.evolvepkmnlist').show();
                        try {
                            document.querySelector('.qolEvolveTypeList').remove();
                        }
                        catch(err){
                            let thisdoesnothing = true;
                        }
                        try {
                            document.querySelector('.qolEvolveNameList').remove();
                        }
                        catch(err){
                            let thisdoesnothing = true;
                        }
                        try {
                            document.querySelector('.qolEvolveNewList').remove();
                        }
                        catch(err){
                            let thisdoesnothing = true;
                        }

                        // turn the saved dexData in an array to search pokemons out of the evolve list
                        let searchDexData = VARIABLES.userSettings.variData.dexData.split(',');

                        $('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
                        document.querySelector('#farmnews-evolutions>.scrollable').insertAdjacentHTML('afterbegin', TEMPLATES.evolveFastHTML);
                        let typeBackground = $('.panel>h3').css('background-color');
                        let typeBorder = $('.panel>h3').css('border');
                        let typeColor = $('.panel>h3').css('color');
                        $(".expandlist").css("background-color", ""+typeBackground+"");
                        $(".expandlist").css("border", ""+typeBorder+"");
                        $(".expandlist").css("color", ""+typeColor+"");

                        let typeListBackground = $('.tabbed_interface>div').css('background-color');
                        let typeListColor = $('.tabbed_interface>div').css('color');
                        $(".qolChangeLogContent").css("background-color", ""+typeListBackground+"");
                        $(".qolChangeLogContent").css("color", ""+typeListColor+"");



                        $('#farmnews-evolutions>.scrollable>.evolvepkmnlist>Li').each(function (index, value) {
                            // getting the <li> element from the pokemon & the pokemon evolved name
                            let getEvolveString = $(this).html();
                            let evolvePokemon = getEvolveString.substr(getEvolveString.indexOf("into</span> ") + 12);

                            // first looks if you know the type out of your dexdata, if it's there then the <li> will be moved in it's corresponding type
                            if (searchDexData.indexOf('"'+evolvePokemon+'"') != -1 || evolvePokemon === 'Gastrodon [Orient]' || evolvePokemon === 'Gastrodon [Occident]' || evolvePokemon === 'Wormadam [Plant Cloak]' || evolvePokemon === 'Wormadam [Trash Cloak]' || evolvePokemon.includes('[Alolan Forme]')) {
                                let evolveTypeOne = searchDexData[searchDexData.indexOf('"'+evolvePokemon+'"') + 1];
                                let evolveTypeTwo = searchDexData[searchDexData.indexOf('"'+evolvePokemon+'"') + 2];
                                let evolveTypePrevOne = searchDexData[searchDexData.indexOf('"'+evolvePokemon+'"') - 10];
                                let evolveTypePrevTwo = searchDexData[searchDexData.indexOf('"'+evolvePokemon+'"') - 9];

                                if (getEvolveString.includes('title="[DELTA') || evolvePokemon === 'Vaporeon' || evolvePokemon === 'Jolteon' || evolvePokemon === 'Flareon' || evolvePokemon === 'Espeon' || evolvePokemon === 'Umbreon' || evolvePokemon === 'Leafeon' || evolvePokemon === 'Glaceon' || evolvePokemon === 'Sylveon' || evolvePokemon === 'Nidorino' || evolvePokemon === 'Gastrodon [Orient]' || evolvePokemon === 'Gastrodon [Occident]' || evolvePokemon === 'Wormadam [Plant Cloak]' || evolvePokemon === 'Wormadam [Trash Cloak]' || evolvePokemon.includes('[Alolan Forme]') || evolvePokemon.includes('Chilldoom')) {
                                    if (getEvolveString.includes('title="[DELTA')) {
                                        console.log(getEvolveString);
                                        let deltaType = getEvolveString.match('DELTA-(.*)]">');
                                        console.log(deltaType[1]);

                                        if (deltaType[1] === 'NORMAL') {
                                            $(this).clone().appendTo('.0');
                                        }

                                        if (deltaType[1] === 'FIRE') {
                                            $(this).clone().appendTo('.1');
                                        }

                                        if (deltaType[1] === 'WATER') {
                                            $(this).clone().appendTo('.2');
                                        }

                                        if (deltaType[1] === 'ELECTRIC') {
                                            $(this).clone().appendTo('.3');
                                        }

                                        if (deltaType[1] === 'GRASS') {
                                            $(this).clone().appendTo('.4');
                                        }

                                        if (deltaType[1] === 'ICE') {
                                            $(this).clone().appendTo('.5');
                                        }

                                        if (deltaType[1] === 'FIGHTING') {
                                            $(this).clone().appendTo('.6');
                                        }

                                        if (deltaType[1] === 'POISON') {
                                            $(this).clone().appendTo('.7');
                                        }

                                        if (deltaType[1] === 'GROUND') {
                                            $(this).clone().appendTo('.8');
                                        }

                                        if (deltaType[1] === 'FLYING') {
                                            $(this).clone().appendTo('.9');
                                        }

                                        if (deltaType[1] === 'PSYCHIC') {
                                            $(this).clone().appendTo('.10');
                                        }

                                        if (deltaType[1] === 'BUG') {
                                            $(this).clone().appendTo('.11');
                                        }

                                        if (deltaType[1] === 'ROCK') {
                                            $(this).clone().appendTo('.12');
                                        }

                                        if (deltaType[1] === 'GHOST') {
                                            $(this).clone().appendTo('.13');
                                        }

                                        if (deltaType[1] === 'DRAGON') {
                                            $(this).clone().appendTo('.14');
                                        }

                                        if (deltaType[1] === 'DARK') {
                                            $(this).clone().appendTo('.15');
                                        }

                                        if (deltaType[1] === 'STEEL') {
                                            $(this).clone().appendTo('.16');
                                        }

                                        if (deltaType[1] === 'FAIRY') {
                                            $(this).clone().appendTo('.17');
                                        }
                                    }

                                    if (evolvePokemon === 'Vaporeon' || evolvePokemon === 'Jolteon' || evolvePokemon === 'Flareon' || evolvePokemon === 'Espeon' || evolvePokemon === 'Umbreon' || evolvePokemon === 'Leafeon' || evolvePokemon === 'Glaceon' || evolvePokemon === 'Sylveon') {
                                        // normal type from eevee
                                        $(this).clone().appendTo('.0');
                                        // type one
                                        $(this).clone().appendTo('.'+evolveTypeOne+'');
                                        // type two
                                        if (evolveTypeTwo < 0) {
                                            let thisAlsoDoeSNothing = true;
                                        } else {
                                            $(this).clone().appendTo('.'+evolveTypeTwo+'');
                                        }
                                    }
                                    if (evolvePokemon === 'Nidorino') {
                                        // poison type from Nidoran
                                        $(this).clone().appendTo('.7');
                                    }

                                    if (evolvePokemon === 'Gastrodon [Orient]' || evolvePokemon === 'Gastrodon [Occident]') {
                                        // water type
                                        $(this).clone().appendTo('.2');
                                        // ground type
                                        $(this).clone().appendTo('.8');
                                    }

                                    if (evolvePokemon === 'Wormadam [Plant Cloak]') {
                                        // bug type
                                        $(this).clone().appendTo('.11');
                                        // grass type
                                        $(this).clone().appendTo('.4');
                                    }

                                    if (evolvePokemon === 'Wormadam [Trash Cloak]') {
                                        // bug type (burmy)
                                        $(this).clone().appendTo('.11');
                                        // steel type
                                        $(this).clone().appendTo('.16');
                                        // grass type
                                        $(this).clone().appendTo('.4');
                                    }

                                    if (evolvePokemon === 'Chilldoom') {
                                        // dark type
                                        $(this).clone().appendTo('.15');
                                        // ice type
                                        $(this).clone().appendTo('.5');
                                    }

                                    if (evolvePokemon.includes('[Alolan Forme]')) { //alolan formes
                                        // raticate
                                        if (evolvePokemon.includes('Raticate')) {
                                            // dark type
                                            $(this).clone().appendTo('.15');
                                            // normal type
                                            $(this).clone().appendTo('.0');
                                        }

                                        // ninetales
                                        if (evolvePokemon.includes('Ninetales')) {
                                            // ice type
                                            $(this).clone().appendTo('.5');
                                            // fairy type
                                            $(this).clone().appendTo('.17');
                                        }

                                        // exeggutor
                                        if (evolvePokemon.includes('Exeggutor')) {
                                            // grass type
                                            $(this).clone().appendTo('.4');
                                            // dragon type
                                            $(this).clone().appendTo('.14');
                                        }

                                        // marowak
                                        if (evolvePokemon.includes('Marowak')) {
                                            // fire type
                                            $(this).clone().appendTo('.1');
                                            // ghost type
                                            $(this).clone().appendTo('.13');
                                        }

                                        // dugtrio
                                        if (evolvePokemon.includes('Dugtrio')) {
                                            // ground type
                                            $(this).clone().appendTo('.8');
                                            // steel type
                                            $(this).clone().appendTo('.16');
                                        }

                                        // graveler
                                        if (evolvePokemon.includes('Graveler')) {
                                            // rock type
                                            $(this).clone().appendTo('.12');
                                            // electric type
                                            $(this).clone().appendTo('.3');
                                        }

                                        // golem
                                        if (evolvePokemon.includes('Golem')) {
                                            // rock type
                                            $(this).clone().appendTo('.12');
                                            // electric type
                                            $(this).clone().appendTo('.3');
                                        }

                                        // muk
                                        if (evolvePokemon.includes('Muk')) {
                                            // poison type
                                            $(this).clone().appendTo('.7');
                                            // dark type
                                            $(this).clone().appendTo('.15');
                                        }

                                        // raichu
                                        if (evolvePokemon.includes('Raichu')) {
                                            // electric type
                                            $(this).clone().appendTo('.3');
                                            // psychic type
                                            $(this).clone().appendTo('.10');
                                        }
                                    }

                                } else { //no exceptions
                                    // type one
                                    $(this).clone().appendTo('.'+evolveTypeOne+'');
                                    // type two
                                    if (evolveTypeTwo < 0) {
                                        let thisAlsoDoeSNothing = true;
                                    } else {
                                        $(this).clone().appendTo('.'+evolveTypeTwo+'');
                                    }
                                    // extra type from prev pokemon
                                    if([evolveTypeOne, evolveTypeTwo].indexOf(evolveTypePrevOne) == -1){
                                       $(this).clone().appendTo('.'+evolveTypePrevOne+'');
                                    }

                                    if([evolveTypeOne, evolveTypeTwo].indexOf(evolveTypePrevTwo) == -1){
                                       $(this).clone().appendTo('.'+evolveTypePrevTwo+'');
                                    }
                                }
                            } else {
                                $(this).clone().appendTo('.18');
                            }
                        });

                        $('#farmnews-evolutions>.scrollable>.qolEvolveTypeList>Li').each(function (index, value) {
                            let amountOfEvolves = $(this).children().children().length;
                            let evolveTypeName = $(this).children('.slidermenu').html();

                            $(this).children('.slidermenu').html(evolveTypeName+' ('+amountOfEvolves+')')
                        });

                        $('.evolvepkmnlist').hide();
                    }
                },
                easyEvolveNameList() {
                    if (VARIABLES.userSettings.easyEvolve === true) {
                        // first remove the sorted pokemon type list to avoid duplicates
                        $('.evolvepkmnlist').show();

                        try {
                            document.querySelector('.qolEvolveTypeList').remove();
                        }
                        catch(err){
                            let thisdoesnothing = true;
                        }
                        try {
                            document.querySelector('.qolEvolveNameList').remove();
                        }
                        catch(err){
                            let thisdoesnothing = true;
                        }
                        try {
                            document.querySelector('.qolEvolveNewList').remove();
                        }
                        catch(err){
                            let thisdoesnothing = true;
                        }

                        // turn the saved dexData in an array to search pokemons out of the evolve list
                        let searchDexData = VARIABLES.userSettings.variData.dexData.split(',');

                        $('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
                        document.querySelector('#farmnews-evolutions>.scrollable').insertAdjacentHTML('afterbegin', '<ul class="qolEvolveNameList">');


                        $('#farmnews-evolutions>.scrollable>.evolvepkmnlist>Li').each(function (index, value) {
                            // getting the <li> element from the pokemon & the pokemon evolved name
                            let getEvolveString = $(this).html();
                            let beforeEvolvePokemon = $(this).children().children().text().slice(0,-6);
                            let evolvePokemon = getEvolveString.substr(getEvolveString.indexOf("into</span> ") + 12);
                            let evolvePokemonChange = evolvePokemon.split(' ').join('').replace('[','').replace(']','');

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNameList>Li>Ul').hasClass(evolvePokemon.split(' ').join('')) === false) {
                                document.querySelector('.qolEvolveNameList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">'+beforeEvolvePokemon+' > '+evolvePokemon+'</h3><ul class="'+evolvePokemonChange+' qolChangeLogContent"></ul></li><br>');
                            }
                            $(this).clone().appendTo('.'+evolvePokemonChange+'');
                        });

                        $('#farmnews-evolutions>.scrollable>.qolEvolveNameList>Li').each(function (index, value) {
                            let amountOfEvolves = $(this).children().children().length;
                            let getEvolveString = $(this).children().children().html();
                            let beforeEvolvePokemon = $(this).children().children().children().children().first().text().split(' ').join('');
                            let evolvePokemon = getEvolveString.substr(getEvolveString.indexOf("into</span> ") + 12);

                            $(this).children('.slidermenu').html(beforeEvolvePokemon+' > '+evolvePokemon+' ('+amountOfEvolves+')')
                        });

                        $('.evolvepkmnlist').hide();

                        //layout of the created html
                        let typeBackground = $('.panel>h3').css('background-color');
                        let typeBorder = $('.panel>h3').css('border');
                        let typeColor = $('.panel>h3').css('color');
                        $(".expandlist").css("background-color", ""+typeBackground+"");
                        $(".expandlist").css("border", ""+typeBorder+"");
                        $(".expandlist").css("color", ""+typeColor+"");

                        let typeListBackground = $('.tabbed_interface>div').css('background-color');
                        let typeListColor = $('.tabbed_interface>div').css('color');
                        $(".qolChangeLogContent").css("background-color", ""+typeListBackground+"");
                        $(".qolChangeLogContent").css("color", ""+typeListColor+"");
                    }
                },
                easyEvolveNewList() {
                    if (VARIABLES.userSettings.easyEvolve === true) {
                        // first remove the sorted pokemon type list to avoid duplicates
                        $('.evolvepkmnlist').show();

                        try {
                            document.querySelector('.qolEvolveTypeList').remove();
                        }
                        catch(err){
                            let thisdoesnothing = true;
                        }
                        try {
                            document.querySelector('.qolEvolveNameList').remove();
                        }
                        catch(err){
                            let thisdoesnothing = true;
                        }
                        try {
                            document.querySelector('.qolEvolveNewList').remove();
                        }
                        catch(err){
                            let thisdoesnothing = true;
                        }

                        // turn the saved dexData in an array to search pokemons out of the evolve list
                        let searchDexData = VARIABLES.userSettings.variData.dexData.split(',');

                        // add a class to the original pokemon evolve list to be able to manipulate the element more easily and add the ul for the new dex search
                        $('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
                        document.querySelector('#farmnews-evolutions>.scrollable').insertAdjacentHTML('afterbegin', '<ul class="qolEvolveNewList">');

                        $('#farmnews-evolutions>.scrollable>.evolvepkmnlist>Li').each(function (index, value) { //the actual search
                            // getting the <li> element from the pokemon & the pokemon evolved name
                            let getEvolveString = $(this).html();

                            // every pokemon is a normal unless shiny, albino or melanistic pokemon is found
                            let pokemonIsNormal = true;
                            let pokemonIsShiny = false;
                            let pokemonIsAlbino = false;
                            let pokemonIsMelanistic = false;

                            if (getEvolveString.includes('title="[SHINY]')) {
                                pokemonIsShiny = true;
                                pokemonIsNormal = false;
                            }
                            if (getEvolveString.includes('title="[ALBINO]')) {
                                pokemonIsAlbino = true;
                                pokemonIsNormal = false;
                            }
                            if (getEvolveString.includes('title="[MELANISTIC]')) {
                                pokemonIsMelanistic = true;
                                pokemonIsNormal = false;
                            }

                            let evolvePokemonName = getEvolveString.substr(getEvolveString.indexOf("into</span> ") + 12);
                            var evolveNewCheck = searchDexData[searchDexData.indexOf('"'+evolvePokemonName+'"') + 6];
                            var evolveNewShinyCheck = searchDexData[searchDexData.indexOf('"'+evolvePokemonName+'"') + 7];
                            var evolveNewAlbinoCheck = searchDexData[searchDexData.indexOf('"'+evolvePokemonName+'"') + 8];
                            var evolveNewMelaCheck = searchDexData[searchDexData.indexOf('"'+evolvePokemonName+'"') + 9].replace(']','');
                            var evolveNewTotal = searchDexData[searchDexData.indexOf('"'+evolvePokemonName+'"') + 5];

                            try { //if a pokemon has a name like gligar [Vampire] it won't be found. This try tries to change the name as it's recorded in the pokedex data array
                                var pokemonDexKeepFirstName = evolvePokemonName.split(' ')[0];
                                var pokemonDexKeepSecondName = evolvePokemonName.split(' ')[1];
                                var pokemonDexKeepThirdName = evolvePokemonName.split(' ')[2];
                                var pokemonDexKeepFourthName = evolvePokemonName.split(' ')[3];
                                var pokemonDexKeepFifthName = evolvePokemonName.split(' ')[4];
                                var pokemonDexKeepSixthName = evolvePokemonName.split(' ')[5];

                                var evolvePokemonNameOne = pokemonDexKeepFirstName;
                                var evolveNewCheckOne = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameOne+'"') + 6];
                                var evolveNewShinyCheckOne = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameOne+'"') + 7];
                                var evolveNewAlbinoCheckOne = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameOne+'"') + 8];
                                var evolveNewMelaCheckOne = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameOne+'"') + 9].replace(']','');
                                var evolveNewTotalOne = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameOne+'"') + 5];

                                let evolvePokemonNameTwoBefore = pokemonDexKeepFirstName+'/'+pokemonDexKeepSecondName;
                                var evolvePokemonNameTwo = evolvePokemonNameTwoBefore.replace('[','').replace(']','');
                                var evolveNewCheckTwo = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameTwo+'"') + 6];
                                var evolveNewShinyCheckTwo = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameTwo+'"') + 7];
                                var evolveNewAlbinoCheckTwo = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameTwo+'"') + 8];
                                var evolveNewMelaCheckTwo = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameTwo+'"') + 9].replace(']','');
                                var evolveNewTotalTwo = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameTwo+'"') + 5];

                                let evolvePokemonNameThreeBefore = pokemonDexKeepFirstName+'/'+pokemonDexKeepSecondName+' '+pokemonDexKeepThirdName;
                                var evolvePokemonNameThree = evolvePokemonNameThreeBefore.replace('[','').replace(']','');
                                var evolveNewCheckThree = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameThree+'"') + 6];
                                var evolveNewShinyCheckThree = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameThree+'"') + 7];
                                var evolveNewAlbinoCheckThree = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameThree+'"') + 8];
                                var evolveNewMelaCheckThree = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameThree+'"') + 9].replace(']','');
                                var evolveNewTotalThree = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameThree+'"') + 5];

                                let evolvePokemonNameFourBefore = pokemonDexKeepFirstName+'/'+pokemonDexKeepSecondName+' '+pokemonDexKeepThirdName+' '+pokemonDexKeepFourthName;
                                var evolvePokemonNameFour = evolvePokemonNameFourBefore.replace('[','').replace(']','');
                                var evolveNewCheckFour = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameFour+'"') + 6];
                                var evolveNewShinyCheckFour = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameFour+'"') + 7];
                                var evolveNewAlbinoCheckFour = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameFour+'"') + 8];
                                var evolveNewMelaCheckFour = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameFour+'"') + 9].replace(']','');
                                var evolveNewTotalFour = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameFour+'"') + 5];

                                let evolvePokemonNameFiveBefore = pokemonDexKeepFirstName+'/'+pokemonDexKeepSecondName+' '+pokemonDexKeepThirdName+' '+pokemonDexKeepFourthName+' '+pokemonDexKeepFifthName;
                                var evolvePokemonNameFive = evolvePokemonNameFiveBefore.replace('[','').replace(']','');
                                var evolveNewCheckFive = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameFive+'"') + 6];
                                var evolveNewShinyCheckFive = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameFive+'"') + 7];
                                var evolveNewAlbinoCheckFive = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameFive+'"') + 8];
                                var evolveNewMelaCheckFive = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameFive+'"') + 9].replace(']','');
                                var evolveNewTotalFive = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameFive+'"') + 5];

                                let evolvePokemonNameSixBefore = pokemonDexKeepFirstName+'/'+pokemonDexKeepSecondName+' '+pokemonDexKeepThirdName+' '+pokemonDexKeepFourthName+' '+pokemonDexKeepFifthName+' '+pokemonDexKeepSixthName;
                                var evolvePokemonNameSix = evolvePokemonNameSixBefore.replace('[','').replace(']','');
                                var evolveNewCheckSix = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameSix+'"') + 6];
                                var evolveNewShinyCheckSix = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameSix+'"') + 7];
                                var evolveNewAlbinoCheckSix = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameSix+'"') + 8];
                                var evolveNewMelaCheckSix = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameSix+'"') + 9].replace(']','');
                                var evolveNewTotalSix = searchDexData[searchDexData.indexOf('"'+evolvePokemonNameSix+'"') + 5];

                            }
                            catch(err) {
                                console.log(err);
                            }

                            //prep done now the search
                            if (searchDexData.indexOf('"'+evolvePokemonName+'"') != -1) { //Looks for the Pokémon name in which it evolves to check if it's in your Pokédex
                                if (pokemonIsNormal == true) { //normal Pokémon search
                                    if (evolveNewCheckOne == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newpokedexentry') === false) {
                                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Pokédex entry</h3><ul class="newpokedexentry qolChangeLogContent"></ul></li><br>');
                                        }

                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newpokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                            $(this).clone().appendTo('.newpokedexentry');
                                        }

                                    } else if (evolveNewTotal > evolveNewCheck && evolveNewCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newpossiblepokedexentry') === false) {
                                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible Mega/Totem forme</h3><ul class="newpossiblepokedexentry qolChangeLogContent"></ul></li><br>');
                                        }
                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newpossiblepokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                            $(this).clone().appendTo('.newpossiblepokedexentry');
                                        }

                                    } else { // the rest of the pokemon that could be found by name that you already have in the dex
                                        //console.log('Normal '+evolvePokemonName+' already in dex');
                                    }
                                } else if (pokemonIsShiny == true) { //shiny Pokemon search
                                    if (evolveNewShinyCheck == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newshinypokedexentry') === false) {
                                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Shiny Pokédex entry</h3><ul class="newshinypokedexentry qolChangeLogContent"></ul></li><br>');
                                        }

                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newshinypokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                            $(this).clone().appendTo('.newshinypokedexentry');
                                        }

                                    } else if (evolveNewTotal > evolveNewShinyCheck && evolveNewShinyCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newpossibleshinypokedexentry') === false) {
                                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible Shiny Mega/Totem forme</h3><ul class="newpossibleshinypokedexentry qolChangeLogContent"></ul></li><br>');
                                        }
                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newpossibleshinypokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                            $(this).clone().appendTo('.newpossibleshinypokedexentry');
                                        }

                                    } else {
                                        //console.log('Shiny '+evolvePokemonName+' already in dex');
                                    }
                                } else if (pokemonIsAlbino == true) { //albino pokemon search
                                    if (evolveNewAlbinoCheck == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newalbinopokedexentry') === false) {
                                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Albino Pokédex entry</h3><ul class="newalbinopokedexentry qolChangeLogContent"></ul></li><br>');
                                        }

                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newalbinopokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                            $(this).clone().appendTo('.newalbinopokedexentry');
                                        }

                                    } else if (evolveNewTotal > evolveNewAlbinoCheck && evolveNewAlbinoCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newpossiblealbinopokedexentry') === false) {
                                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible Albino Mega/Totem forme</h3><ul class="newpossiblealbinopokedexentry qolChangeLogContent"></ul></li><br>');
                                        }

                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newalbinopokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                            $(this).clone().appendTo('.newpossiblealbinopokedexentry');
                                        }

                                    } else {
                                        //console.log('albino '+evolvePokemonName+' already in dex');
                                    }
                                } else if (pokemonIsMelanistic == true) { //melanistic pokemon search
                                    if (evolveNewMelaCheck == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newamelanisticpokedexentry') === false) {
                                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Melanistic Pokédex entry</h3><ul class="newamelanisticpokedexentry qolChangeLogContent"></ul></li><br>');
                                        }

                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newamelanisticpokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                            $(this).clone().appendTo('.newamelanisticpokedexentry');
                                        }

                                    } else if (evolveNewTotal > evolveNewMelaCheck && evolveNewMelaCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newpossiblemelanisticpokedexentry') === false) {
                                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible Melanistic Mega/Totem forme</h3><ul class="newpossiblemelanisticpokedexentry qolChangeLogContent"></ul></li><br>');
                                        }

                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newpossiblemelanisticpokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                            $(this).clone().appendTo('.newpossiblemelanisticpokedexentry');
                                        }

                                    } else {
                                        //console.log('Melanistic '+evolvePokemonName+' already in dex');
                                    }
                                }



                            } else if (searchDexData.indexOf('"'+evolvePokemonName+'"') == -1) { //Looks for the Pokémon name in which it evolves to check if it's in your Pokédex{
                                if (pokemonIsNormal == true) {
                                    if (evolveNewCheckTwo == 0 || evolveNewCheckThree == 0 || evolveNewCheckFour == 0 || evolveNewCheckFive == 0 || evolveNewCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newpokedexentry') === false) {
                                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Pokédex entry</h3><ul class="newpokedexentry qolChangeLogContent"></ul></li><br>');
                                        }

                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newpokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                            $(this).clone().appendTo('.newpokedexentry');
                                        }

                                    } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                                        if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possiblealolan') === false) {
                                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible new Alolan entry</h3><ul class="possiblealolan qolChangeLogContent"></ul></li><br>');
                                            }

                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possiblealolan>li:contains('+evolvePokemonName+')').length == 0) {
                                            $(this).clone().appendTo('.possiblealolan');
                                        }

                                        }
                                    } else if (evolvePokemonName.indexOf('[') >= 0) {
                                        if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && searchDexData.indexOf('"'+evolvePokemonNameOne+'"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possibledifferent') === false) {
                                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible new forme/cloak entry</h3><ul class="possibledifferent qolChangeLogContent"></ul></li><br>');
                                            }

                                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possibledifferent>li:contains('+evolvePokemonName+')').length == 0) {
                                                $(this).clone().appendTo('.possibledifferent');
                                            }

                                        } else if (searchDexData.indexOf('"'+evolvePokemonNameOne+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameTwo+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameThree+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameFour+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameFive+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameSix+'"') == -1) {
                                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newpokedexentry') === false) {
                                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Pokédex entry</h3><ul class="newpokedexentry qolChangeLogContent"></ul></li><br>');
                                            }

                                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newpokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                                $(this).clone().appendTo('.newpokedexentry');
                                            }
                                        }

                                    } else if (searchDexData.indexOf('"'+evolvePokemonNameOne+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameTwo+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameThree+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameFour+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameFive+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameSix+'"') == -1) {
                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newpokedexentry') === false) {
                                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Pokédex entry</h3><ul class="newpokedexentry qolChangeLogContent"></ul></li><br>');
                                        }

                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newpokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                            $(this).clone().appendTo('.newpokedexentry');
                                        }

                                    } else {
                                        //END
                                        //console.log(evolvePokemonName+' still needs to be searched');
                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('errornotfound') === false) {
                                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Error contact Bentomon!</h3><ul class="errornotfound qolChangeLogContent"></ul></li><br>');
                                        }

                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.errornotfound>li:contains('+evolvePokemonName+')').length == 0) {
                                            $(this).clone().appendTo('.errornotfound');
                                        }
                                    }


                                } else if (pokemonIsShiny == true) {
                                    if (evolveNewShinyCheckTwo == 0 || evolveNewShinyCheckThree == 0 || evolveNewShinyCheckFour == 0 || evolveNewShinyCheckFive == 0 || evolveNewShinyCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newshinypokedexentry') === false) {
                                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Shiny Pokédex entry</h3><ul class="newshinypokedexentry qolChangeLogContent"></ul></li><br>');
                                        }

                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newshinypokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                            $(this).clone().appendTo('.newshinypokedexentry');
                                        }
                                    } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                                        if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possibleshinyalolan') === false) {
                                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible new Shiny Alolan entry</h3><ul class="possibleshinyalolan qolChangeLogContent"></ul></li><br>');
                                            }

                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possibleshinyalolan>li:contains('+evolvePokemonName+')').length == 0) {
                                            $(this).clone().appendTo('.possibleshinyalolan');
                                        }

                                        }
                                    } else if (evolvePokemonName.indexOf('[') >= 0) {
                                        if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && searchDexData.indexOf('"'+evolvePokemonNameOne+'"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possibleshinydifferent') === false) {
                                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible new Shiny forme/cloak entry</h3><ul class="possibleshinydifferent qolChangeLogContent"></ul></li><br>');
                                            }

                                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possibleshinydifferent>li:contains('+evolvePokemonName+')').length == 0) {
                                                $(this).clone().appendTo('.possibleshinydifferent');
                                            }

                                        } else if (searchDexData.indexOf('"'+evolvePokemonNameOne+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameTwo+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameThree+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameFour+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameFive+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameSix+'"') == -1) {
                                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newshinypokedexentry') === false) {
                                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Shiny Pokédex entry</h3><ul class="newshinypokedexentry qolChangeLogContent"></ul></li><br>');
                                            }

                                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newshinypokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                                $(this).clone().appendTo('.newshinypokedexentry');
                                            }
                                        }

                                    } else if (searchDexData.indexOf('"'+evolvePokemonNameOne+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameTwo+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameThree+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameFour+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameFive+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameSix+'"') == -1) {
                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newshinypokedexentry') === false) {
                                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Shiny Pokédex entry</h3><ul class="newshinypokedexentry qolChangeLogContent"></ul></li><br>');
                                        }

                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newshinypokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                            $(this).clone().appendTo('.newshinypokedexentry');
                                        }

                                    } else {
                                        //END
                                        //console.log(evolvePokemonName+' still needs to be searched');
                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('errornotfound') === false) {
                                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Error contact Bentomon!</h3><ul class="errornotfound qolChangeLogContent"></ul></li><br>');
                                        }

                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.errornotfound>li:contains('+evolvePokemonName+')').length == 0) {
                                            $(this).clone().appendTo('.errornotfound');
                                        }
                                    }

                                } else if (pokemonIsAlbino == true) {
                                    if (evolveNewAlbinoCheckTwo == 0 || evolveNewAlbinoCheckThree == 0 || evolveNewAlbinoCheckFour == 0 || evolveNewAlbinoCheckFive == 0 || evolveNewAlbinoCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newalbinopokedexentry') === false) {
                                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Albino Pokédex entry</h3><ul class="newalbinopokedexentry qolChangeLogContent"></ul></li><br>');
                                        }

                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newalbinopokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                            $(this).clone().appendTo('.newalbinopokedexentry');
                                        }
                                    } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                                        if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possiblealbinoalolan') === false) {
                                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible new Albino Alolan entry</h3><ul class="possiblealbinoalolan qolChangeLogContent"></ul></li><br>');
                                            }

                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possiblealbinoalolan>li:contains('+evolvePokemonName+')').length == 0) {
                                            $(this).clone().appendTo('.possiblealbinoalolan');
                                        }

                                        }
                                    } else if (evolvePokemonName.indexOf('[') >= 0) {
                                        if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && searchDexData.indexOf('"'+evolvePokemonNameOne+'"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possiblealbinodifferent') === false) {
                                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible new Albino forme/cloak entry</h3><ul class="possiblealbinodifferent qolChangeLogContent"></ul></li><br>');
                                            }

                                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possiblealbinodifferent>li:contains('+evolvePokemonName+')').length == 0) {
                                                $(this).clone().appendTo('.possiblealbinodifferent');
                                            }

                                        } else if (searchDexData.indexOf('"'+evolvePokemonNameOne+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameTwo+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameThree+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameFour+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameFive+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameSix+'"') == -1) {
                                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newalbinopokedexentry') === false) {
                                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Albino Pokédex entry</h3><ul class="newalbinopokedexentry qolChangeLogContent"></ul></li><br>');
                                            }

                                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newalbinopokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                                $(this).clone().appendTo('.newalbinopokedexentry');
                                            }
                                        }

                                    } else if (searchDexData.indexOf('"'+evolvePokemonNameOne+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameTwo+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameThree+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameFour+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameFive+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameSix+'"') == -1) {
                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newalbinopokedexentry') === false) {
                                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Albino Pokédex entry</h3><ul class="newalbinopokedexentry qolChangeLogContent"></ul></li><br>');
                                        }

                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newalbinopokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                            $(this).clone().appendTo('.newalbinopokedexentry');
                                        }

                                    } else {
                                        //END
                                        //console.log(evolvePokemonName+' still needs to be searched');
                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('errornotfound') === false) {
                                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Error contact Bentomon!</h3><ul class="errornotfound qolChangeLogContent"></ul></li><br>');
                                        }

                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.errornotfound>li:contains('+evolvePokemonName+')').length == 0) {
                                            $(this).clone().appendTo('.errornotfound');
                                        }
                                    }

                                } else if (pokemonIsMelanistic == true) {
                                    if (evolveNewMelaCheckTwo == 0 || evolveNewMelaCheckThree == 0 || evolveNewMelaCheckFour == 0 || evolveNewMelaCheckFive == 0 || evolveNewMelaCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newamelanisticpokedexentry') === false) {
                                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Melanistic Pokédex entry</h3><ul class="newamelanisticpokedexentry qolChangeLogContent"></ul></li><br>');
                                        }

                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newamelanisticpokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                            $(this).clone().appendTo('.newamelanisticpokedexentry');
                                        }
                                    } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                                        if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possiblemelanalolan') === false) {
                                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible new Melanistic Alolan entry</h3><ul class="possiblemelanalolan qolChangeLogContent"></ul></li><br>');
                                            }

                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possiblemelanalolan>li:contains('+evolvePokemonName+')').length == 0) {
                                            $(this).clone().appendTo('.possiblemelanalolan');
                                        }

                                        }
                                    } else if (evolvePokemonName.indexOf('[') >= 0) {
                                        if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && searchDexData.indexOf('"'+evolvePokemonNameOne+'"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possiblemelandifferent') === false) {
                                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible new Melanistic forme/cloak entry</h3><ul class="possiblemelandifferent qolChangeLogContent"></ul></li><br>');
                                            }

                                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possiblemelandifferent>li:contains('+evolvePokemonName+')').length == 0) {
                                                $(this).clone().appendTo('.possiblemelandifferent');
                                            }

                                        } else if (searchDexData.indexOf('"'+evolvePokemonNameOne+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameTwo+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameThree+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameFour+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameFive+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameSix+'"') == -1) {
                                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possiblemelanalolan') === false) {
                                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Melanistic Pokédex entry</h3><ul class="possiblemelanalolan qolChangeLogContent"></ul></li><br>');
                                            }

                                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possiblemelanalolan>li:contains('+evolvePokemonName+')').length == 0) {
                                                $(this).clone().appendTo('.possiblemelanalolan');
                                            }
                                        }

                                    } else if (searchDexData.indexOf('"'+evolvePokemonNameOne+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameTwo+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameThree+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameFour+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameFive+'"') == -1 && searchDexData.indexOf('"'+evolvePokemonNameSix+'"') == -1) {
                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possiblemelanalolan') === false) {
                                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Melanistic Pokédex entry</h3><ul class="possiblemelanalolan qolChangeLogContent"></ul></li><br>');
                                        }

                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possiblemelanalolan>li:contains('+evolvePokemonName+')').length == 0) {
                                            $(this).clone().appendTo('.possiblemelanalolan');
                                        }

                                    } else {
                                        //END
                                        //console.log(evolvePokemonName+' still needs to be searched');
                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('errornotfound') === false) {
                                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Error contact Bentomon!</h3><ul class="errornotfound qolChangeLogContent"></ul></li><br>');
                                        }

                                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.errornotfound>li:contains('+evolvePokemonName+')').length == 0) {
                                            $(this).clone().appendTo('.errornotfound');
                                        }
                                    }
                                }
                            }
                        });

                        $('.evolvepkmnlist').hide();

                        //layout
                        let typeBackground = $('.panel>h3').css('background-color');
                        let typeBorder = $('.panel>h3').css('border');
                        let typeColor = $('.panel>h3').css('color');
                        $(".expandlist").css("background-color", ""+typeBackground+"");
                        $(".expandlist").css("border", ""+typeBorder+"");
                        $(".expandlist").css("color", ""+typeColor+"");

                        let typeListBackground = $('.tabbed_interface>div').css('background-color');
                        let typeListColor = $('.tabbed_interface>div').css('color');
                        $(".qolChangeLogContent").css("background-color", ""+typeListBackground+"");
                        $(".qolChangeLogContent").css("color", ""+typeListColor+"");
                    }
                },

                easyQuickEvolve() {
                    if ($('.canevolve:contains("evolved into")').parent().length != 0) {
                        $('.canevolve:contains("evolved into")').parent().remove();
                    }
                },
                labAddTypeList() {
                    let theList = `<div class='typeNumber'> <select name="types" class="qolsetting" data-key="findLabType"> ` + GLOBALS.TYPE_OPTIONS + `</select> <input type='button' value='Remove' id='removeLabTypeList'> </div>`;
                    let numberTypes = $('#labTypes>div').length;
                    $('#labTypes').append(theList);
                    $('.typeNumber').removeClass('typeNumber').addClass(""+numberTypes+"");
                },
                labRemoveTypeList(byebye, key) {
                    VARIABLES.labListArray = $.grep(VARIABLES.labListArray, function(value) { //when textfield is removed, the value will be deleted from the localstorage
                        return value != key;
                    });
                    VARIABLES.userSettings.labNotiferSettings.findLabType = VARIABLES.labListArray.toString()

                    fn.backwork.saveSettings();
                    $(byebye).parent().remove();

                    let i;
                    for(i = 0; i < $('#shelterTypes>div').length; i++) {
                        let rightDiv = i + 1;
                        $('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
                    }
                },

                labAddTextField() {
                    let theField = `<div class='numberDiv'><label><input type="text" class="qolsetting" data-key="findLabEgg"/></label><input type='button' value='Remove' id='removeLabSearch'></div>`;
                    let numberDiv = $('#searchkeys>div').length;
                    $('#searchkeys').append(theField);
                    $('.numberDiv').removeClass('numberDiv').addClass(""+numberDiv+"");

                },
                labRemoveTextfield(byebye, key) { //add a loop to change all the classes of divs (amount of divs) so it fits with the save keys
                    VARIABLES.labSearchArray = $.grep(VARIABLES.labSearchArray, function(value) { //when textfield is removed, the value will be deleted from the localstorage
                        return value != key;
                    });
                    VARIABLES.userSettings.labNotiferSettings.findLabEgg = VARIABLES.labSearchArray.toString()

                    fn.backwork.saveSettings();
                    $(byebye).parent().remove();

                    let i;
                    for(i = 0; i < $('#searchkeys>div').length; i++) {
                        let rightDiv = i + 1;
                        $('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
                    }

                },

                labCustomSearch() {
                    document.querySelector('#labsuccess').innerHTML="";
                    $('#egglist>div>img').removeClass('shelterfoundme');

                    if (VARIABLES.labListArray.length == 1 && VARIABLES.labListArray[0] == "") {
                        let iDontWork = true;
                    } else {
                        let typesArrayNoEmptySpace = VARIABLES.labListArray.filter(v=>v!='');
                        let typeSearchAmount = typesArrayNoEmptySpace.length;
                        let i;
                        for (i = 0; i < typeSearchAmount; i++) {
                            let value = typesArrayNoEmptySpace[i];
                            let amountOfTypesFound = [];
                            let typePokemonNames = [];

                            $('#egglist>div>h3').each(function() {
                                let searchPokemon = ($(this).text().split(' ')[0]);
                                let searchTypeOne = VARIABLES.dexDataVar[VARIABLES.dexDataVar.indexOf('"'+searchPokemon+'"') + 1];
                                let searchTypeTwo = VARIABLES.dexDataVar[VARIABLES.dexDataVar.indexOf('"'+searchPokemon+'"') + 2];
                                if (searchTypeOne === value) {
                                    amountOfTypesFound.push('found');
                                    typePokemonNames.push(searchPokemon);
                                }

                                if (searchTypeTwo === value) {
                                    amountOfTypesFound.push('found');
                                    typePokemonNames.push(searchPokemon);
                                }
                            })

                            let foundType = VARIABLES.shelterTypeSearch[VARIABLES.shelterTypeSearch.indexOf(value) + 2];

                            let typeImgStandOutLength = typePokemonNames.length;
                            let o;
                            for (o = 0; o < typeImgStandOutLength; o++) {
                                let value = typePokemonNames[o];
                                let shelterImgSearch = $("#egglist>div>h3:containsIN("+value+")")
                                let shelterBigImg = shelterImgSearch.next();
                                $(shelterBigImg).addClass('shelterfoundme');
                            }


                            if (amountOfTypesFound.length < 1) {
                                let iDontDoAnything = true;
                            } else if (amountOfTypesFound.length > 1) {
                                document.querySelector('#labsuccess').insertAdjacentHTML('beforeend','<div id="labfound">'+amountOfTypesFound.length+' '+foundType+' egg types found! ('+typePokemonNames.toString()+')</div>');
                            } else {
                                document.querySelector('#labsuccess').insertAdjacentHTML('beforeend','<div id="labfound">'+amountOfTypesFound.length+' '+foundType+' egg type found! ('+typePokemonNames.toString()+')</div>');
                            }
                        }
                    }

                    if (VARIABLES.labSearchArray.length == 1 && VARIABLES.labSearchArray[0] == "") {
                        let iDontDoAnything = true;
                    } else {
                        let customSearchAmount = VARIABLES.labSearchArray.length;
                        let i;
                        for (i = 0; i < customSearchAmount; i++) {
                        let value = VARIABLES.labSearchArray[i];
                            if ($("#egglist>div>h3:containsIN("+value+")").length) {
                                let searchResult = value;

                                let shelterImgSearch = $("#egglist>div>h3:containsIN("+value+")")
                                let shelterBigImg = shelterImgSearch.next();
                                $(shelterBigImg).addClass('shelterfoundme');

                                if ($("#egglist>div>h3:containsIN("+value+")").length > 1) {
                                    document.querySelector('#labsuccess').insertAdjacentHTML('beforeend','<div id="labfound">'+searchResult+' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                                } else {
                                    document.querySelector('#labsuccess').insertAdjacentHTML('beforeend','<div id="labfound">'+searchResult+' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                                }
                            }

                            if ($('#egglist>div img[src*="'+value+'"]').length) {
                                let searchResult = $('#egglist>div img[src*="'+value+'"]').prev().text();

                                let shelterImgSearch = $('#egglist>div img[src*="'+value+'"]')
                                $(shelterImgSearch).addClass('shelterfoundme');

                                if ($('#egglist>div img[src*="'+value+'"]').length > 1) {
                                    document.querySelector('#labsuccess').insertAdjacentHTML('beforeend','<div id="labfound">'+searchResult+' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                                } else {
                                    document.querySelector('#labsuccess').insertAdjacentHTML('beforeend','<div id="labfound">'+searchResult+' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                                }
                            }
                        }
                    }
                },
                fieldAddTypeList() {
                    fn.API.privateFieldAddSelectSearch('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS, 'removeFieldTypeList', 'fieldTypes');
                },
                fieldAddNatureSearch() {
                    fn.API.privateFieldAddSelectSearch('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS, 'removeFieldNature', 'natureTypes');
                },
                fieldRemoveTypeList(byebye, key) {
                    VARIABLES.fieldTypeArray = $.grep(VARIABLES.fieldTypeArray, function(value) { //when textfield is removed, the value will be deleted from the localstorage
                        return value != key;
                    });
                    VARIABLES.userSettings.fieldSearchSettings.fieldType = VARIABLES.fieldTypeArray.toString()

                    fn.backwork.saveSettings();
                    $(byebye).parent().remove();

                    let i;
                    for(i = 0; i < $('#fieldTypes>div').length; i++) {
                        let rightDiv = i + 1;
                        $('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
                    }
                },
                fieldRemoveNatureSearch(byebye, key) {
                    VARIABLES.fieldNatureArray = $.grep(VARIABLES.fieldNatureArray, function(value) { //when textfield is removed, the value will be deleted from the localstorage
                        return value != key;
                    });
                    VARIABLES.userSettings.fieldSearchSettings.fieldNature = VARIABLES.fieldNatureArray.toString()

                    fn.backwork.saveSettings();
                    $(byebye).parent().remove();

                    let i;
                    for(i = 0; i < $('#natureTypes>div').length; i++) {
                        let rightDiv = i + 1;
                        $('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
                    }
                },

                fieldAddTextField() {
                    let theField = `<div class='numberDiv'><label><input type="text" class="qolsetting" data-key="fieldCustom"/></label><input type='button' value='Remove' id='removeFieldSearch'></div>`;
                    let numberDiv = $('#searchkeys>div').length;
                    $('#searchkeys').append(theField);
                    $('.numberDiv').removeClass('numberDiv').addClass(""+numberDiv+"");
                },
                fieldRemoveTextField(byebye, key) {
                    VARIABLES.fieldCustomArray = $.grep(VARIABLES.fieldCustomArray, function(value) { //when textfield is removed, the value will be deleted from the localstorage
                        return value != key;
                    });
                    VARIABLES.userSettings.fieldSearchSettings.fieldCustom = VARIABLES.fieldCustomArray.toString()

                    fn.backwork.saveSettings();
                    $(byebye).parent().remove();

                    let i;
                    for(i = 0; i < $('#searchkeys>div').length; i++) {
                        let rightDiv = i + 1;
                        $('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
                    }
                },
                fieldCustomSearch() {
                    if (VARIABLES.userSettings.fieldSearch === true) {
                        console.log('search activated');
                    }
                },
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

    $(document).on('click', 'h3.slidermenu', (function() { //show hidden li in change log
        $(this).next().slideToggle();
    }));

    $(document).on('input', '.qolsetting', (function() { //Changes QoL settings
        console.log('naan - begin')
        PFQoL.settingsChange(this.getAttribute('data-key'), $(this).val(), $(this).parent().parent().attr('class'), $(this).parent().attr('class'));
        console.log('naan - end')
    }));

    if(Helpers.onFishingPage()) {
        $(document).on('mouseover', '#caughtfishcontainer', (function() { //select all feature
            PFQoL.releaseFishSelectAll();
        }));
    }

    if(Helpers.onMultiuserPage()) {
        $(window).on('load', (function() {
            PFQoL.partyModification();
        }));

        $(document).on('click input', '#qolpartymod', (function() { // partymods
            PFQoL.partyModification();
        }));

        $(document).on('click', '.tabbed_interface', (function() {
            PFQoL.partyModification();
        }));
    }

    if(Helpers.onDexPage()) {
        $(window).on('load', (function() {
            PFQoL.savingDexData();
        }));
    }

    if(Helpers.onFarmPage("tab=1")) {
        $(document).on('click', '#qolevolvenormal', (function() {
            PFQoL.easyEvolveNormalList();
        }));

        $(document).on('click', '#qolchangesletype', (function() {
            PFQoL.easyEvolveTypeList();
        }));

        $(document).on('click', '#qolsortevolvename', (function() {
            PFQoL.easyEvolveNameList();
        }));

        $(document).on('click', '#qolevolvenew', (function() {
            PFQoL.easyEvolveNewList();
        }));
    }

    if(Helpers.onLabPage()) {
        $(document).on('click', '#addLabSearch', (function() { //add lab text field
            PFQoL.labAddTextField();
        }));

        $(document).on('click', '#removeLabSearch', (function() { //remove lab text field
            PFQoL.labRemoveTextfield(this, $(this).parent().find('input').val());
        }));

        $(document).on('click', '#addLabTypeList', (function() { //add lab type list
            PFQoL.labAddTypeList();
        }));

        $(document).on('click', '#removeLabTypeList', (function() { //remove lab type list
            PFQoL.labRemoveTypeList(this, $(this).parent().find('select').val());
        }));

        $(document).on('change', '#labCustomSearch input', (function() { //lab search
            PFQoL.labCustomSearch();
        }));

        $(document).on('click', '#labpage', (function() { //shelter search
            PFQoL.labCustomSearch();
        }));

        $(window).on('load', (function() {
            PFQoL.labCustomSearch();
        }));
    }

    if(Helpers.onPublicFieldsPage()) {
        $(document).on('click', '*[data-menu="release"]', (function() { //select all feature
            PFQoL.releaseFieldSelectAll();
        }));

         $(document).on('click input', '#fieldorder, #field_field, #field_berries, #field_nav', (function() { //field sort
            PFQoL.fieldSorter();
            //PFQoL.fieldCustomSearch();
        }));

        $(window).on('load', (function() {
            PFQoL.fieldSorter();
            //PFQoL.fieldCustomSearch();
        }));

        document.addEventListener("keydown", function(event) {
            PFQoL.fieldSorter();
            //PFQoL.fieldCustomSearch();
        });

        $(document).on('click', '#addFieldSearch', (function() { //add field text field
            PFQoL.fieldAddTextField();
        }));

        $(document).on('click', '#removeFieldSearch', (function() { //remove field text field
            PFQoL.fieldRemoveTextField(this, $(this).parent().find('input').val());
        }));

        $(document).on('click', '#addFieldNatureSearch', (function() { //add field nature search
            PFQoL.fieldAddNatureSearch();
        }));

        $(document).on('click', '#removeFieldNature', (function() { //remove field nature search
            PFQoL.fieldRemoveNatureSearch(this, $(this).parent().find('select').val());
        }));

        $(document).on('click', '#addFieldTypeList', (function() { //add field type list
            PFQoL.fieldAddTypeList();
        }));

        $(document).on('click', '#removeFieldTypeList', (function() { //remove field type list
            PFQoL.fieldRemoveTypeList(this, $(this).parent().find('select').val());
        }));
    }
})(jQuery); //end of userscript
