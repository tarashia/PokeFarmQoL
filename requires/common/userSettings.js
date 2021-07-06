// eslint-disable-next-line no-unused-vars
class UserSettings {
    constructor() {
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
        this.shelterFeatureEnables = {
            search: true,
            sort: true,
        };
        this.publicFieldFeatureEnables = {
            search: true,
            sort: true,
            release: true,
            tooltip: true
        };
        this.privateFieldFeatureEnables = {
            search: true,
            release: true,
            tooltip: true
        };

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
    /// load settings from an object that is not of type UserSettings
    load(settingsObj) {
        try {
            const countScriptSettings = Object.keys(this).length;
            const localStorageString = settingsObj;
            const countLocalStorageSettings = Object.keys(localStorageString).length;
            // adds new settings to this class
            if (countLocalStorageSettings < countScriptSettings) {
                const newSettings = this.jQuery.extend(true, this, settingsObj);
                this.copyFields(newSettings);
            }
            // removes objects from the local storage if they don't exist anymore. Not yet possible..
            if (countLocalStorageSettings > countScriptSettings) {
                /* do nothing at the moment */
            }
        }
        catch (err) {
            /* do nothing at the moment */
        }
        if (settingsObj != this) {
            this.copyFields(settingsObj);
            // this = JSON.parse(this.localStorageMgr.getItem(this.SETTINGS_SAVE_KEY));
        }
    }
    copyFields(settingsObj) {
        const recursiveCopy = (object, key, value) => {
            if (typeof value === 'object') {
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