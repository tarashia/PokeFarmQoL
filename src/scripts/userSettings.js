// Do not call this constructor directly to get or create a settings object
// Always call UserDataHandle.getSettings();
class UserSettings {

    /*
     * used to tie "global" enable settings in USER_SETTINGS to the more
     * granular settings that are related to the same page
     */
    static LINKED_SETTINGS = {
        'shelterEnable': 'shelterFeatureEnables',
        'publicFieldEnable': 'publicFieldFeatureEnables',
        'privateFieldEnable': 'privateFieldFeatureEnables'
    };

    mainSettings = {};
    pageSettings = {};

    constructor() {
        console.log('Initializing settings');
        this.setDefaults();
        this.loadSettings();
    }
    // Set the default settings values (does not save to storage)
    setDefaults() {
        // default settings when the script gets loaded the first time
        this.mainSettings = {
            customCss : '',
            enableDaycare : true,
            shelterEnable : true,
            fishingEnable : true,
            publicFieldEnable : true,
            privateFieldEnable : true,
            partyMod : true,
            easyEvolve : true,
            labNotifier : true,
            dexFilterEnable : true,
            condenseWishforge : true,
            interactionsEnable : true,
            summaryEnable : true,
            shelterFeatureEnables : {
                search: true,
                sort: true,
            },
            publicFieldFeatureEnables : {
                search: true,
                sort: true,
                release: true,
                tooltip: true,
                pkmnlinks: true
            },
            privateFieldFeatureEnables : {
                search: true,
                release: true,
                tooltip: true,
                pkmnlinks: true
            }
        }
        this.setPageDefaults('ALL');
    }
    // Page should be a valid local storage key, starting with QoL
    // When "ALL", all page defaults are set
    setPageDefaults(page) {
        let pageList = [];
        if(page==='ALL') {
            pageList = LocalStorageManager.PAGE_SETTINGS_KEYS;
        }
        else {
            pageList.push(page);
        }
        for(let i=0; i<pageList.length; i++) {
            switch(pageList[i]) {
                case 'QoLLab':
                    this.pageSettings.QoLLab = {
                        findLabEgg: '',
                        customEgg: true,
                        findLabType: '',
                        findTypeEgg: true,
                    };
                    break;
                case 'QoLMultiuser':
                    this.pageSettings.QoLMultiuser ={
                        hideDislike: false,
                        hideAll: false,
                        niceTable: false,
                        customParty: false,
                        stackNextButton: true,
                        stackMoreButton: true,
                        showPokemon: true,
                        compactPokemon: true,
                        clickablePokemon: false,
                        showTrainerCard: true,
                        showFieldButton: false,
                        showModeChecks: false,
                        showUserName: true
                    };
                    break;
                case 'QoLPrivateFields':
                    this.pageSettings.QoLPrivateFields = this.fieldDefaults(false);
                    break;
                case 'QoLPublicFields':
                    this.pageSettings.QoLPublicFields = this.fieldDefaults(true);
                    break;
                case 'QoLShelter':
                    this.pageSettings.QoLShelter = {
                        findNewEgg: true,
                        findNewPokemon: true,
                        findShiny: true,
                        findAlbino: true,
                        findMelanistic: true,
                        findPrehistoric: true,
                        findDelta: true,
                        findMega: true,
                        findStarter: true,
                        findCustomSprite: true,
                        findTotem: false,
                        findLegendary: false,
                        shelterGrid: true,
                        shelterSpriteSize: 'auto',
                        quickTypeSearch: [],
                        fullOptionSearch: {},
                        quickPkmnSearch: [],
                        fullPkmnSearch: {}
                    }
                    break;
                default:
                    ErrorHandler.warn('Cannot set page defaults for unknown page: '+pageList[i]);
            }
        }
    }
    // Most field settings are shared, build defaults here
    fieldDefaults(isPublic) {
        let fieldSettings = {
            fieldNewPokemon: true,
            fieldShiny: false,
            fieldAlbino: false,
            fieldMelanistic: false,
            fieldPrehistoric: false,
            fieldDelta: false,
            fieldMega: false,
            fieldStarter: false,
            fieldCustomSprite: false,
            fieldItem: false,
            fieldMale: true,
            fieldFemale: true,
            fieldNoGender: true,
            fieldCustomItem: true, // unused
            fieldCustomPokemon: true,
            fieldCustomEgg: true,
            fieldCustomPng: false,
            tooltipEnableMods: false,
            fieldCustom: '',
            fieldType: '',
            fieldNature: '',
            fieldEggGroup: ''
        };
        // Additional public-only settings
        if(isPublic) {
            fieldSettings.tooltipNoBerry = false;
            fieldSettings.tooltipBerry = false;
            fieldSettings.fieldByBerry = false;
            fieldSettings.fieldByMiddle = false;
            fieldSettings.fieldByGrid = false;
            fieldSettings.fieldClickCount = true;
        }
    }
    // Saves all settings in the UserSettings object to local storage
    saveSettings() {
        // Main settings
        LocalStorageManager.setItem(LocalStorageManager.MAIN_SETTINGS_KEY, this.mainSettings);
        // Page settings
        for(const pageKey in this.pageSettings) {
            LocalStorageManager.setItem(pageKey, this.pageSettings[pageKey]);
        }
    }
    // Loads all settings in storage into the UserSettings object
    loadSettings() {
        const storedSettings = LocalStorageManager.getAllQoLSettings();
        for(const settingKey in storedSettings) {
            // remove user ID from setting
            let settingName = settingKey.split('.');
            if(settingName.length == 2) {
                let loadedSettings = {}; 
                try {
                    loadedSettings = JSON.parse(storedSettings[settingKey]);
                } catch(e) {
                    ErrorHandler.error('Could not parse stored settings for key '+settingKey+': '+storedSettings[settingKey],e);
                }
                // Check if this is the main settings object
                if(settingName[1] == LocalStorageManager.MAIN_SETTINGS_KEY) {
                    // don't just replace the whole settings object, don't want to overwrite missing setting defaults
                    // TODO: do sub-options work?
                    for(const key in loadedSettings) {
                        this.mainSettings[settingName[1]] = loadedSettings[key];
                    }
                }
                // Otherwise it's a page's settings
                else {
                    // don't just replace the whole settings object, don't want to overwrite missing setting defaults
                    for(const key in loadedSettings) {
                        this.pageSettings[settingName[1]] = loadedSettings[key];
                    }
                }
            }
            else {
                ErrorHandler.warn('Invalid setting: '+settingKey);
            }
        }
    }

    // ** Everything below here is for interfacing with the DOM (show current values, handle changes, etc) ** //

    // Listens for changes to settings inputs
    // Should be called after input elements are added (ex: after html builder, or after modal open, etc)
    //
    // All settings inputs should have either the qolsetting class, as well as the following attributes:
    // data-page: indicator of which set of settings (ex: "QoLHub" for main settings, valid pageSettings key otherwise)
    // data-key: the actual setting name/key
    // For example, "hide disliked" party setting should be data-page="QoLMultiuser" data-key="hideDislike"
    addSettingsListeners() {
        const self = this;
        this.displaySettingsValues();
        $('.qolsetting').on('change', (function (event) {
            let settingDetails = self.getSettingDetailsFromTarget(event.target);
            if(settingDetails) {
                if(event.target.type=='radio' || event.target.type=='checkbox') {
                    if(event.target.checked===true || event.target.checked===false) {
                        settingDetails.settingGroup[settingDetails.settingKey] = event.target.checked;
                    }
                    else {
                        ErrorHandler.error('Invalid radio/checkbox value for '+settingDetails.settingKey+': '+event.target.checked);
                        console.error(event.target);
                        return;
                    }
                }
                else {
                    settingDetails.settingGroup[settingDetails.settingKey] = event.target.value;
                }
                self.saveSettings();
            }
        }));
    }
    // helper for addSettingsListeners, this ensures that inputs have the existing value shown
    displaySettingsValues() {
        const self = this;
        $('.qolsetting').each(function(){
            let settingDetails = self.getSettingDetailsFromTarget(this);
            if(settingDetails) {
                if(this.type=='radio' ||this.type=='checkbox') {
                    this.checked = settingDetails.settingGroup[settingDetails.settingKey];
                }
                else {
                    this.value = settingDetails.settingGroup[settingDetails.settingKey];
                }
            }
            // special case for custom css
            if(this.id=='qolcustomcss' && this.value.trim()=='') {
                this.value = Resources.DEMO_CSS;
            }
        });
    }
    // get the specific setting a given input is targetting
    // return value: null if error, [setting name, setting group] otherwise
    getSettingDetailsFromTarget(target) {
        const page = target.getAttribute('data-page');
        const settingKey = target.getAttribute('data-key');
        const manager = target.getAttribute('data-manager');
        if(page && settingKey) {
            let settingGroup;
            // this is a main setting
            if(page=='QoLHub') {
                settingGroup = this.mainSettings;
                if(manager) {
                    // if this is a managed setting, map it to the sub-setting group
                    if(manager in UserSettings.LINKED_SETTINGS) {
                        settingGroup = this.mainSettings[UserSettings.LINKED_SETTINGS[manager]];
                    }
                    else {
                        ErrorHandler.error('Unknown QoL setting manager: '+manager);
                        return null;
                    }
                }
            }
            // this is a page-specific setting
            else if(page in self.pageSettings) {
                settingGroup = this.pageSettings[page];
            }
            else {
                ErrorHandler.error('Unknown QoL page setting key: '+page);
                return null;
            }
            // ensure this is a known setting, and call the appropriate handler
            if(settingKey in settingGroup) {
                return {
                    settingKey: settingKey,
                    settingGroup: settingGroup
                };
            }
            else {
                ErrorHandler.error('Unknown QoL setting key: '+settingKey);
                return null;
            }
        }
        else {
            ErrorHandler.error('QoL setting could not be identified.');
            console.error(target);
            return null;
        }
    }
}