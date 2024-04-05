// Do not call this constructor directly to get or create a settings object
// Always call UserDataHandle.getSettings();
// Most setting keys are located in the feature class they go with
class UserSettings {
    // Default values for global settins
    static GLOBAL_DEFAULTS = {
        customCss: '',
        searchGlowColour: '#d5e265'
    }
    // All main setting enablers, and their default values
    static SETTING_ENABLERS = [
        {
            'name': DaycareMatches.SETTING_ENABLE,
            'default': true
        },
        {
            'name': DexPageFilters.SETTING_ENABLE,
            'default': true
        },
        {
            'name': EasyEvolve.SETTING_ENABLE,
            'default': true
        },
        {
            'name': Fishing.SETTING_ENABLE,
            'default': true
        },
        {
            'name': InteractionsLinks.SETTING_ENABLE,
            'default': true
        },
        {
            'name': Lab.SETTING_ENABLE,
            'default': true
        },
        {
            'name': MultiUser.SETTING_ENABLE,
            'default': true
        },
        {
            'name': PrivateFields.SETTING_ENABLE,
            'default': true
        },
        {
            'name': PublicFields.SETTING_ENABLE,
            'default': true
        },
        {
            'name': Shelter.SETTING_ENABLE,
            'default': true
        },
        {
            'name': SummaryDisplayCodes.SETTING_ENABLE,
            'default': true
        },
        {
            'name': Wishforge.SETTING_ENABLE,
            'default': true
        },
        {
            'name': Dojo.SETTING_ENABLE,
            'default': true
        }
    ];
    static SUB_ENABLERS = [
        {
            'name': Shelter.SUB_SETTINGS,
            'default': {
                search: true,
                sort: true,
            }
        },
        {
            'name': PrivateFields.SUB_SETTINGS,
            'default': UserSettings.fieldDefaults('private').sub
        },
        {
            'name': PublicFields.SUB_SETTINGS,
            'default': UserSettings.fieldDefaults('public').sub
        }
    ];
    // list of features with their own settings group
    // (typically ones that appear on the specific feature page, vs in the hub)
    // Display value is shown on the hub's page reset feature
    static FEATURE_SPECIFIC_SETTINGS = [        
        {
            'name': Lab.SETTING_KEY,
            'display': 'Lab',
            'default': {
                findLabEgg: '',
                customEgg: true,
                findLabType: '',
                findTypeEgg: true,
            }
        },
        {
            'name': MultiUser.SETTING_KEY,
            'display': 'Multi-user clickback',
            'default': {
                partyModType: 'none',
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
                showUserName: true,
                includeShowcase: true,
                hideShowcase: true
            }
        },
        {
            'name': PrivateFields.SETTING_KEY,
            'display': 'Private fields',
            'default': UserSettings.fieldDefaults('private').main
        },
        {
            'name': PublicFields.SETTING_KEY,
            'display': 'Public fields',
            'default': UserSettings.fieldDefaults('public').main
        },
        {
            'name': Shelter.SETTING_KEY,
            'display': 'Shelter',
            'default': {
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
                lastSearchID: 0,
                quickPkmnSearch: [],
                quickTypeSearch: [],
                quickNatureSearch: []
            }
        }
    ];
    // Most field settings are shared, build defaults here
    static fieldDefaults(mode) {
        let mainSettings = {
            fieldNewPokemon: true,
            fieldShiny: false,
            fieldAlbino: false,
            fieldMelanistic: false,
            fieldPrehistoric: false,
            fieldDelta: false,
            fieldMega: false,
            fieldLegend: false,
            fieldStarter: false,
            fieldCustomSprite: false,
            fieldItem: true,
            fieldMale: true,
            fieldFemale: true,
            fieldNoGender: true,
            fieldName: true,
            fieldSpecies: true,
            fieldSearchItem: false,
            fieldHideHoverTooltips: false,
            fieldCustom: '',
            fieldType: '',
            fieldNature: '',
            fieldEggGroup: ''
        };
        let subSettings = {
            search: true,
            tooltip: true,
            pkmnlinks: true
        }
        // Additional page-specific settings
        if(mode=='public') {
            mainSettings.fieldSort = 'none';
            mainSettings.fieldClickCount = true;
            mainSettings.maxStack = false;
            subSettings.sort = true;
        }
        else if(mode=='private') {
            subSettings.release = true;
        }
        else {
            ErrorHandler.error('Unknown field page specifier: '+mode);
            return null;
        }

        return {main: mainSettings, sub: subSettings};
    }

    constructor() {
        console.log('Initializing QoL settings');
        this.setDefaults();
        this.loadSettings();
        this.changeListeners = [];
    }
    // Set the default settings values (does not save to storage)
    // These are used when someone first enables the script, when settings are reset,
    // or when a new setting is added that the user doesn't have already in storage
    setDefaults() {
        this.QoLSettings = UserSettings.GLOBAL_DEFAULTS;
        // main feature enablers
        for(let i=0; i<UserSettings.SETTING_ENABLERS.length; i++) {
            this.QoLSettings[UserSettings.SETTING_ENABLERS[i].name] = UserSettings.SETTING_ENABLERS[i].default;
        }
        // sub feature enablers
        for(let i=0; i<UserSettings.SUB_ENABLERS.length; i++) {
            this[UserSettings.SUB_ENABLERS[i].name] = UserSettings.SUB_ENABLERS[i].default;
        }
        // feature/page-specific settings
        for(let i=0; i<UserSettings.FEATURE_SPECIFIC_SETTINGS.length; i++) {
            this[UserSettings.FEATURE_SPECIFIC_SETTINGS[i].name] = UserSettings.FEATURE_SPECIFIC_SETTINGS[i].default;
        }
    }
    // Resets the feature-specific settings, and saves the defaults to local storage
    // Feature should be one of the names in FEATURE_SPECIFIC_SETTINGS
    resetFeatureDefaults(feature) {
        let foundSetting = false;
        // there aren't many items in this list, so let's just brute force it
        for(let i=0; i<UserSettings.FEATURE_SPECIFIC_SETTINGS.length; i++) {
            let featureSettings = UserSettings.FEATURE_SPECIFIC_SETTINGS[i];
            if(featureSettings.name == feature) {
                foundSetting = true;
                this[featureSettings.name] = featureSettings.default;
                LocalStorageManager.setItem(featureSettings.name, this[featureSettings.default]);
            }
        }
        if(!foundSetting) {
            ErrorHandler.error('Unknown feature setting group: '+feature);
        }
    }
    // Change a single setting, and save it in local storage
    // Note: this effectively re-stores the whole group, due to how settings are stored
    // But it does NOT re-store all settings in all groups
    // When done, calls any registered listeners, and provides them the change details
    changeSetting(settingGroup, settingName, newValue) {
        console.log('Changing QoL setting: '+settingGroup+'.'+settingName+' = '+newValue);
        if(this[settingGroup]) {
            this[settingGroup][settingName] = newValue;
            LocalStorageManager.setItem(settingGroup, this[settingGroup]);
            const changeDetails = {
                settingGroup: settingGroup,
                settingName: settingName,
                newValue: newValue
            };
            for(let i=0; i<this.changeListeners.length; i++) {
                if(typeof this.changeListeners[i] == 'function') {
                    this.changeListeners[i](changeDetails);
                }
            }
        }
        else {
            ErrorHandler.error('Cannot change setting in unknown group: '+settingGroup+'.'+settingName);
        }
    }
    // Loads all settings in storage into the UserSettings object
    loadSettings() {
        console.log('Loading QoL settings from storage');
        const storedSettings = LocalStorageManager.getAllQoLSettings();
        for(const settingKey in storedSettings) {
            // remove user ID from setting
            let settingGroup = settingKey.split('.');
            if(settingGroup.length == 2) {
                // Try to read the JSON recieved from storage (use full key with user id, not just name)
                let loadedSettings = {}; 
                try {
                    loadedSettings = JSON.parse(storedSettings[settingKey]);
                } catch(e) {
                    ErrorHandler.error('Could not parse stored settings for '+settingGroup+': '+storedSettings[settingKey],e);
                }
                // For convenience, replace with the setting name string
                settingGroup = settingGroup[1];
                if(this[settingGroup] != undefined) {
                    for(const settingName in loadedSettings) {
                        this[settingGroup][settingName] = loadedSettings[settingName];
                    }
                }
                else {
                    ErrorHandler.warn('Loaded unknown setting group: '+settingGroup);
                }
            }
            else {
                ErrorHandler.warn('Invalid setting key: '+settingKey);
            }
        }
    }

    // Allows pages to take actions when settings change, without watching inputs directly
    // (inputs should not be watched directly, since those events may get cleared in addSettingsListeners())
    // callbacks may include change details as their parameter - see changeSetting
    registerChangeListener(callback) {
        this.changeListeners.push(callback);
    }

    // ** Everything below here is for interfacing with the DOM (show current values, handle changes, etc) ** //

    // Get details about a setting from a DOM setting input
    // All settings inputs should have the qolsetting class, as well as the following attributes:
    // data-group: indicator of which set of settings (ex: "QoLSettings" for main settings)
    // name: the actual setting name/key
    // For example, "hide disliked" party setting should be data-group="QoLMultiuser" name="hideDislike"
    getSettingDetailsFromTarget(target) {
        const settingGroup = target.getAttribute('data-group');
        const settingName = target.getAttribute('name');
        if(settingGroup && settingName) {
            // try to read the setting from the active settings object
            let settingValue;
            if(this[settingGroup] && settingName in this[settingGroup]) {
                settingValue = this[settingGroup][settingName];
            }
            else {
                ErrorHandler.warn('Unrecognized setting input: '+settingGroup+'.'+settingName);
                console.warn(target);
            }
            // try to read the value of the DOM input
            let inputValue;
            if(target.type=='radio') {
                let element = document.querySelector('input[name="'+target.getAttribute('name')+'"]:checked');
                // there may not be a checked radio yet, especially when this is being used in displaySettingsValues
                if(element) {
                    inputValue = element.value;
                }
            }
            else if(target.type=='checkbox') {
                inputValue = target.checked;
            }
            else { // textbox dropdown etc
                inputValue = target.value;
            }
            return {
                settingGroup: settingGroup,
                settingName: settingName,
                settingValue: settingValue,
                inputValue: inputValue
            };
        }
        else {
            ErrorHandler.error('QoL setting could not be identified.');
            console.error(target);
            console.error(settingGroup);
            console.error(settingName);
            return null;
        }
    }
    // Listens for changes to settings inputs
    // Should be called after input elements are added (ex: after html builder, or after modal open, etc)
    // the parent lets you start at a given element, to avoid resetting all listeners on the page
    addSettingsListeners(parent='') {
        const self = this;
        this.displaySettingsValues();
        // add a space after the parent selector
        if(parent) {
            parent = parent.trim()+' ';
        }
        // remove any existing listeners
        $(parent+'.qolsetting').off('change');
        $(parent+'.qolsetting').on('change', (function (event) {
            let settingDetails = self.getSettingDetailsFromTarget(event.target);
            if(settingDetails) {
                self.changeSetting(settingDetails.settingGroup, settingDetails.settingName, settingDetails.inputValue);
            }
        }));
    }
    // helper for addSettingsListeners, this ensures that inputs have the existing value shown
    displaySettingsValues() {
        const self = this;
        $('.qolsetting').each(function(){
            let settingDetails = self.getSettingDetailsFromTarget(this);
            if(settingDetails) {
                if(this.type=='radio') {
                    // if the value matches, this is the currently selected radio
                    this.checked = this.value==settingDetails.settingValue;
                }
                else if(this.type=='checkbox') {
                    this.checked = settingDetails.settingValue;
                }
                else {
                    this.value = settingDetails.settingValue;
                }
            }
            // special case for custom css textbox demo value
            if(this.id=='qolcustomcss' && this.value.trim()=='') {
                this.value = Resources.DEMO_CSS;
            }
        });
    }
}