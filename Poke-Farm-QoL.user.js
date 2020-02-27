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
// @require      labPage.js
// @require      fishingPage.js
// @require      multiuserPage.js
// @require      farmPage.js
// @require      dexPage.js
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
            //userscript settings
            customCss: "",
            shelterEnable: true,
            fishingEnable: true,
            fieldSort: true,
            fieldSearch: true,
            privateFieldSearch: true,
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
                    } else if ((VARIABLES.userSettings.fieldSearch === true) || (
                        (VARIABLES.userSettings.fieldSort === true)) && Helpers.onPublicFieldsPage()) {
                        PublicFieldsPage.loadSettings();
                    } else if (VARIABLES.userSettings.labNotifier === true && Helpers.onLabPage()) {
                        LabPage.loadSettings();
					} else if (VARIABLES.userSettings.fishingEnable === true && Helpers.onFishingPage()) {
						FishingPage.loadSettings();
                    } else if (VARIABLES.userSettings.partyMod === true && Helpers.onMultiuserPage()) {
						MultiuserPage.loadSettings();
				    } else if(VARIABLES.userSettings.easyEvolve === true && Helpers.onFarmPage("tab=1")) {
						FarmPage.loadSettings();
				    } else { // local user settings
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
                        (VARIABLES.userSettings.fieldSort === true)) && Helpers.onPublicFieldsPage()) {
                        PublicFieldsPage.saveSettings();
                    } else if (VARIABLES.userSettings.labNotifier === true && Helpers.onLabPage()) {
                        LabPage.saveSettings();
					} else if (VARIABLES.userSettings.fishingEnable === true && Helpers.onFishingPage()) {
						FishingPage.saveSettings();
					} else if (VARIABLES.userSettings.partyMod === true && Helpers.onMultiuserPage()) {
						MultiuserPage.saveSettings();
					} else if(VARIABLES.userSettings.easyEvolve === true && Helpers.onFarmPage("tab=1")) {
						FarmPage.saveSettings();
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
                        (VARIABLES.userSettings.fieldSort === true)) && Helpers.onPublicFieldsPage()) {
                        PublicFieldsPage.populateSettings();
                    }
                    else if(VARIABLES.userSettings.privateFieldSearch === true && Helpers.onPrivateFieldsPage()) {
                       PrivateFieldsPage.populateSettings();
                    }
                    else if(VARIABLES.userSettings.labNotifier === true && Helpers.onLabPage()) {
                       LabPage.populateSettings();
                    }
					else if(VARIABLES.userSettings.fishingEnable === true && Helpers.onFishingPage()) {
						FishingPage.populateSettings();
					}
					else if(VARIABLES.userSettings.partyMod === true && Helpers.onMultiuserPage()) {
						MultiuserPage.populateSettings();
					} else if(VARIABLES.userSettings.easyEvolve === true && Helpers.onFarmPage("tab=1")) {
						FarmPage.populateSettings();
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
                        (VARIABLES.userSettings.fieldSort === true)) && Helpers.onPublicFieldsPage()) {
                        PublicFieldsPage.setupHTML();
                        fn.backwork.populateSettingsPage(PublicFieldsPage.getSettings());
                    }
                    else if(VARIABLES.userSettings.labNotifier === true && Helpers.onLabPage()) {
                       LabPage.setupHTML();
					   fn.backwork.populateSettingsPage(LabPage.getSettings());
                    }
					else if (VARIABLES.userSettings.fishingEnable === true && Helpers.onFishingPage() && $('#caughtfishcontainer').length > 0) {
                        FishingPage.setupHTML();
						fn.backwork.populateSettingsPage(FishingPage.getSettings());
                    }
                    // private fields search
                    else if (VARIABLES.userSettings.privateFieldSearch === true && Helpers.onPrivateFieldsPage()) {
						PrivateFieldsPage.setupHTML();
                        fn.backwork.populateSettingsPage(PrivateFieldsPage.getSettings());
                    }
                    // party click mods
                    else if (VARIABLES.userSettings.partyMod === true && Helpers.onMultiuserPage()) {
                        MultiuserPage.setupHTML();
                        fn.backwork.populateSettingsPage(MultiuserPage.getSettings());
                    }
                    // fast evolve list
                    else if (VARIABLES.userSettings.easyEvolve === true && Helpers.onFarmPage("tab=1")) {
                        FarmPage.setupHTML();
						fn.backwork.populateSettingsPage(FarmPage.getSettings());
                    }
                },
                setupCSS() { // All the CSS changes are added here
                    GM_addStyle(GM_getResourceText('QoLCSS'));

                    if(VARIABLES.userSettings.shelterEnable === true && Helpers.onShelterPage()) {
                        ShelterPage.setupCSS();
                    }
                    else if (VARIABLES.userSettings.privateFieldSearch === true && Helpers.onPrivateFieldsPage()) {
						PrivateFieldsPage.setupCSS();
                    }
					else if ((VARIABLES.userSettings.fieldSearch === true) || (
						(VARIABLES.userSettings.fieldSort === true)) && Helpers.onPublicFieldsPage()) {
						PrivateFieldsPage.setupCSS();
                    }
					else if (VARIABLES.userSettings.labNotifier === true && Helpers.onLabPage()) {
						LabPage.setupCSS();
					}
					else if (VARIABLES.userSettings.fishingEnable === true && Helpers.onFishingPage() && $('#caughtfishcontainer').length > 0) {
						FishingPage.setupCSS();
					}
					else if (VARIABLES.userSettings.partyMod === true && Helpers.onMultiuserPage()) {
						MultiuserPage.setupCSS();
					}
					else if (VARIABLES.userSetings.easyEvolve === true && Helpers.onFarmPage("tab=1")) {
						FarmPage.setupCSS();
					}
					
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
                    else if (VARIABLES.userSettings.privateFieldSearch === true && Helpers.onPrivateFieldsPage()) {
                        PrivateFieldsPage.setupObserver();
                    }
                    else if ((VARIABLES.userSettings.fieldSearch === true) || (
                        (VARIABLES.userSettings.fieldSort === true)) && Helpers.onPublicFieldsPage()) {
                        PublicFieldsPage.setupObserver();
                    }
                    else if (VARIABLES.userSettings.partyMod === true && Helpers.onMultiuserPage()) { //observe party click changes on the users page
                        MultiuserPage.setupObserver();
                    }
                    else if (VARIABLES.userSettings.labNotifier === true && Helpers.onLabPage()) {
                        LabPage.setupObserver();
                    }
					else if (VARIABLES.userSettings.fishingEnable === true && Helpers.onFishingPage()) {
						FishingPage.setupObserver();
					}
                    else if (VARIABLES.userSettings.easyEvolve === true && Helpers.onFarmPage("tab=1")) {
                        FarmPage.setupObserver();
                    }
                },
                setupHandlers() { // all the event handlers
					if (VARIABLES.userSettings.shelterEnable === true && Helpers.onShelterPage()) { //observe changes on the shelter page
						ShelterPage.setupHandlers();
                    }
					else if (VARIABLES.userSettings.privateFieldSearch === true && Helpers.onPrivateFieldsPage()) {
						PrivateFieldsPage.setupHandlers();
					}
                    else if ((VARIABLES.userSettings.fieldSearch === true) || (
                        (VARIABLES.userSettings.fieldSort === true)) && Helpers.onPublicFieldsPage()) {
                        PublicFieldsPage.setupHandlers();
                    }
					else if (VARIABLES.userSettings.labNotifier === true && Helpers.onLabPage()) {
						LabPage.setupHandlers();
					}
					else if (VARIABLES.userSettings.fishingEnable === true && Helpers.onFishingPage()) {
						FishingPage.setupHandlers();
					}
					else if(VARIABLES.userSettings.partyMod === true && Helpers.onMultiuserPage()) {
						MultiuserPage.setupHandlers();
					}
					else if (VARIABLES.userSettings.easyEvolve === true && Helpers.onFarmPage("tab=1")) {
						FarmPage.setupHandlers();
					}
					else if (Helpers.onDexPage()) {
						PokedexPage.setupHandlers();
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
                        ShelterPage.saveSettings();
                    }
                    else if (PrivateFieldsPage.settingsChange(element, textElement, customClass, typeClass)) {
						PrivateFieldsPage.saveSettings();
                    }
                    else if (PublicFieldsPage.settingsChange(element, textElement, customClass, typeClass)) {
                        PublicFieldsPage.saveSettings();
                    }
					else if (LabPage.settingsChange(element, textElement, customClass, typeClass)) {
						LabPage.saveSettings();
					}
					else if (FishingPage.settingsChange(element, textElement, customClass, typeClass)) {
						FishingPage.saveSettings();
					}
                    else if (MultiuserPage.settingsChange(element, textElement, customClass, typeClass)) {
						MultiuserPage.saveSettings();
                    }
                    fn.backwork.saveSettings();
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

})(jQuery); //end of userscript
