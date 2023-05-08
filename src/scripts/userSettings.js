// Do not call this constructor directly to get or create a settings object
// Always call UserSettingsHandle.getSettings();
class UserSettings {

    /*
     * used to tie "global" enable settings in USER_SETTINGS to the more
     * granular settings that are related to the same page
     */
    static LINKED_SETTINGS = [
        {
            'manager': 'shelterEnable',
            'managed': 'shelterFeatureEnables'
        },
        {
            'manager': 'publicFieldEnable',
            'managed': 'publicFieldFeatureEnables'
        },
        {
            'manager': 'privateFieldEnable',
            'managed': 'privateFieldFeatureEnables'
        },
    ];

    constructor() {
        console.log('Initializing settings');
        this.setDefaults();
        this.loadSettings();
    }
    // Set the default settings value (does not save to storage)
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
        // These keys should be valid local storage keys 
        // (begin with "QoL", describe what they store)
        this.pageSettings = {
            'QoLLab': {
                findLabEgg: '', // same as findCustom in shelter
                customEgg: true,
                findLabType: '', // same as findType in shelter
                findTypeEgg: true,
            },
            'QoLMultiuser': {
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
            },
            'QoLPrivateFields': {
                fieldCustom: '',
                fieldType: '',
                fieldNature: '',
                fieldEggGroup: '',
                fieldNewPokemon: true,
                fieldShiny: true,
                fieldAlbino: true,
                fieldMelanistic: true,
                fieldPrehistoric: true,
                fieldDelta: true,
                fieldMega: true,
                fieldStarter: true,
                fieldCustomSprite: true,
                fieldMale: true,
                fieldFemale: true,
                fieldNoGender: true,
                fieldItem: true,
                customItem: true, // unused
                customEgg: true,
                customPokemon: true,
                customPng: false,
                /* tooltip settings */
                tooltipEnableMods: false,
                tooltipNoBerry: false,
                tooltipBerry: false,
            },
            'QoLPublicFields': {
                fieldByBerry: false,
                fieldByMiddle: false,
                fieldByGrid: false,
                fieldClickCount: true,
                fieldCustom: '',
                fieldType: '',
                fieldNature: '',
                fieldEggGroup: '',
                fieldNewPokemon: true,
                fieldShiny: true,
                fieldAlbino: true,
                fieldMelanistic: true,
                fieldPrehistoric: true,
                fieldDelta: true,
                fieldMega: true,
                fieldStarter: true,
                fieldCustomSprite: true,
                fieldMale: true,
                fieldFemale: true,
                fieldNoGender: true,
                fieldCustomItem: true, // unused
                fieldCustomPokemon: true,
                fieldCustomEgg: true,
                fieldCustomPng: false,
                fieldItem: true,
                /* tooltip settings */
                tooltipEnableMods: false,
                tooltipNoBerry: false,
                tooltipBerry: false,
            },
            'QoLShelter': {
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
        };
    }
    // Saves all settings in the UserSettings object to local storage
    saveSettings() {
        // Main settings
        LocalStorageManager.setItem(LocalStorageManager.MAIN_SETTINGS_KEY, this.mainSettings);
        // Page settings
        for(pageKey in this.pageSettings) {
            LocalStorageManager.setItem(pageKey, this.pageSettings[pageKey]);
        }
    }
    // Loads all settings in storage into the UserSettings object
    loadSettings() {
        const storedSettings = LocalStorageManager.getAllQoLSettings();
        for(settingKey in storedSettings) {
            // remove user ID from setting
            let settingName = settingKey.split('.');
            if(settingName.length == 2) {
                let foundKey = false;
                settingName = settingName[1];
                // Check if this is the main settings object
                if(settingName == LocalStorageManager.MAIN_SETTINGS_KEY) {
                    const mainSettings = JSON.parse(storedSettings[settingKey]);
                    // only load settings that are known about in this class
                    for(mainKey in mainSettings) {
                        if(mainKey in this) {
                            this.mainSettings[mainKey] = mainSettings[mainKey];
                        }
                    }
                    foundKey = true;
                }
                // Otherwise check for a page settings
                for(pageKey in this.pageSettings) {
                    if(settingName == pageKey) {
                        // get the matching key for the user setting's object's pageSettings property
                        const pageSettings = JSON.parse(storedSettings[settingKey]);
                        // only load page settings that are known about in this class
                        for(pageSettingKey in pageSettings) {
                            if(pageSettingKey in this.pageSettings[pageKey]) {
                                this.pageSettings[pageKey] = pageSettings[pageSettingKey];
                            }
                        }
                        foundKey = true;
                    }
                }
                if(!foundKey) {
                    console.warn('Unknown setting: '+settingKey);
                }
            }
            else {
                console.warn('Invalid setting: '+settingKey);
            }
        }
    }
    // Listens for changes to settings inputs
    static addSettingsListeners() {
        $(document).on('change', '.qolsetting', (function () {
            // TODO: handle setting change
            // will there be a problem for items added after the init cycle? can that even happen?
            // Make sure it can handle radios too (party style, shelter sprite size)
        }));
    }
}