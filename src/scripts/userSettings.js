// Do not call this constructor directly to get or create a settings object
// Always call UserSettingsHandle.getSettings();
class UserSettings {
    constructor() {
        this.setDefaults();

        /*
         * used to tie "global" enable settings in USER_SETTINGS to the more
         * granular settings that are related to the same page
         */
        this.LINKED_SETTINGS = [
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
    }
    setDefaults() {
        // default settings when the script gets loaded the first time
        this.customCss = '';
        this.enableDaycare = true;
        this.shelterEnable = true;
        this.fishingEnable = true;
        this.publicFieldEnable = true;
        this.privateFieldEnable = true;
        this.partyMod = true;
        this.easyEvolve = true;
        this.labNotifier = true;
        this.dexFilterEnable = true;
        this.condenseWishforge = true;
        this.interactionsEnable = true;
        this.summaryEnable = true;
        this.shelterFeatureEnables = {
            search: true,
            sort: true,
        };
        this.publicFieldFeatureEnables = {
            search: true,
            sort: true,
            release: true,
            tooltip: true,
            pkmnlinks: true
        };
        this.privateFieldFeatureEnables = {
            search: true,
            release: true,
            tooltip: true,
            pkmnlinks: true
        };
    }
    /// load settings from an object that is not of type UserSettings
    load(settingsObj) {
        try {
            const countScriptSettings = Object.keys(this).length;
            const localStorageString = settingsObj;
            const countLocalStorageSettings = Object.keys(localStorageString).length;
            // adds new settings to this class
            if (countLocalStorageSettings < countScriptSettings) {
                const newSettings = $.extend(true, this, settingsObj);
                this.copyFields(newSettings);
            }
            // removes objects from the local storage if they don't exist anymore. Not yet possible..
            if (countLocalStorageSettings > countScriptSettings) {
                /* do nothing at the moment */
            }
        }
        catch (err) {
            Helpers.writeCustomError('Error while loading settings object: '+err,'error',err);
        }
        if (settingsObj != this) {
            this.copyFields(settingsObj);
            // this = JSON.parse(LocalStorageManager.getItem(this.SETTINGS_SAVE_KEY));
        }
    }
    copyFields(settingsObj) {
        const recursiveCopy = (object, key, value) => {
            // typeof null returns "object" - disclude it explicitly
            if (value !== null && typeof value === 'object') {
                for (const [_key, _value] of Object.entries(value)) {
                    recursiveCopy(object[key], _key, _value);
                }
            } else {
                object[key] = value;
            }
        };
        for (const [key, value] of Object.entries(settingsObj)) {
            recursiveCopy(this, key, value);
        }
    }
}