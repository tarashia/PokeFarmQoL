class LocalStorageManager {
    /**
     * This function helps users use the updated script without having to
     * clear their settings by looking for items in local storage that
     * start with 'QoL...' and moving the settings to the correct
     * translated local storage key
     */
    static migrateSettings() {
        const newItems = {};
        const keysToRemove = [];
        // find the items that need to be replaced
        for (let i = 0, len = localStorage.length; i < len; ++i) {
            const match = localStorage.key(i).match(/^QoL.*/);
            if(match) {
                const oldKey = match.input;
                const newKey = LocalStorageManager.translateKey(oldKey);
                newItems[newKey] = localStorage.getItem(oldKey);
                keysToRemove.push(oldKey);
            }
        }
        // remove the old style keys
        for(let j = 0; j < keysToRemove.length; j++) {
            localStorage.removeItem(keysToRemove[j]);
        }
        // add the new style keys
        for(const newKey in newItems) {
            localStorage.setItem(newKey, newItems[newKey]);
        }
    }
    static translateKey(key) {
        return `${$.USERID}.${key}`;
    }
    static saveSettings(key, obj) {
        Helpers.saveSettings(LocalStorageManager.translateKey(key), obj);
    }
    static loadSettings(KEY, DEFAULT, obj) {
        return Helpers.loadSettings(LocalStorageManager.translateKey(KEY), DEFAULT, obj);
    }
    static getItem(key) {
        return localStorage.getItem(LocalStorageManager.translateKey(key));
    }
    static setItem(key, value) {
        localStorage.setItem(LocalStorageManager.translateKey(key), value);
    }
    static removeItem(key) {
        localStorage.removeItem(LocalStorageManager.translateKey(key));
    }

    /*
     * Set DEX_DATA and DEX_UPDATE_DATE from the QoLPokedex data stored in localStorage
     */
    static loadDexIntoSettingsFromStorage(USER_SETTINGS) {
        const key = LocalStorageManager.translateKey(Globals.POKEDEX_DATA_KEY);
        if(localStorage.getItem(key) === null) {
            return false;
        }
        if(Object.keys(JSON.parse(localStorage.getItem(key))).length === 0) {
            return false;
        }

        const dateAndDex = JSON.parse(localStorage.getItem(key));
        // if QoLPokedex only contains date
        if((dateAndDex.length === 1) ||
           // or if the dex part of the array is empty
           (dateAndDex[1] === undefined) ||
            (dateAndDex[1] === null)) {
            return false;
        }

        USER_SETTINGS.DEX_UPDATE_DATE = dateAndDex[0];
        const dex = dateAndDex.slice(1);
        USER_SETTINGS.DEX_DATA = dex;
        return true;
    }

    static updateLocalStorageDex(document, updateDate, USER_SETTINGS) {
        let dateString = '';
        if(updateDate === undefined) {
            dateString = (new Date()).toUTCString();
        } else {
            dateString = updateDate;
        }
        const datePlusDex = [dateString].concat(USER_SETTINGS.DEX_DATA);
        localStorage.setItem(LocalStorageManager.translateKey(Globals.POKEDEX_DATA_KEY), JSON.stringify(datePlusDex));
        $('.qolDate', document).val(dateString);
    }
}
