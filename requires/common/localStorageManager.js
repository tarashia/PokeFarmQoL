// eslint-disable-next-line no-unused-vars
class LocalStorageManagerBase {
    constructor(keyPrefix, storage, helpers) {
        this.keyPrefix = keyPrefix;
        this.storage = storage;
        this.helpers = helpers;
    }
    /**
     * This function helps users use the updated script without having to
     * clear their settings by looking for items in local storage that
     * start with 'QoL...' and moving the settings to the correct
     * translated local storage key
     */
    migrateSettings() {
        const newItems = {};
        const keysToRemove = [];
        // find the items that need to be replaced
        for (let i = 0, len = this.storage.length; i < len; ++i) {
            const match = this.storage.key(i).match(/^QoL.*/);
            if(match) {
                const oldKey = match.input;
                const newKey = this.translateKey(oldKey);
                newItems[newKey] = this.storage.getItem(oldKey);
                keysToRemove.push(oldKey);
            }
        }
        // remove the old style keys
        for(let j = 0; j < keysToRemove.length; j++) {
            this.storage.removeItem(keysToRemove[j]);
        }
        // add the new style keys
        for(const newKey in newItems) {
            this.storage.setItem(newKey, newItems[newKey]);
        }
    }
    translateKey(key) {
        return `${this.keyPrefix}.${key}`;
    }
    saveSettings(key, obj) {
        this.helpers.saveSettings(this.translateKey(key), obj);
    }
    loadSettings($, KEY, DEFAULT, obj) {
        return this.helpers.loadSettings($, this.translateKey(KEY), DEFAULT, obj);
    }
    getItem(key) {
        return this.storage.getItem(this.translateKey(key));
    }
    setItem(key, value) {
        this.storage.setItem(this.translateKey(key), value);
    }
    removeItem(key) {
        this.storage.removeItem(this.translateKey(key));
    }

    /*
     * Set GLOBALS.DEX_DATA and GLOBALS.DEX_UPDATE_DATE from the QoLPokedex data stored in localStorage
     * Inputs:
     * - globals - reference to the GLOBALS settings object
     */
    loadDexIntoGlobalsFromStorage(globals) {
        const key = this.translateKey(globals.POKEDEX_DATA_KEY);
        if(this.storage.getItem(key) === null) {
            return false;
        }
        if(Object.keys(JSON.parse(this.storage.getItem(key))).length === 0) {
            return false;
        }

        const dateAndDex = JSON.parse(this.storage.getItem(key));
        // if QoLPokedex only contains date
        if((dateAndDex.length === 1) ||
           // or if the dex part of the array is empty
           (dateAndDex[1] === undefined) ||
            (dateAndDex[1] === null)) {
            return false;
        }

        globals.DEX_UPDATE_DATE = dateAndDex[0];
        const dex = dateAndDex.slice(1);
        globals.DEX_DATA = dex;
        return true;
    }

    updateLocalStorageDex($, document, updateDate, globals) {
        let dateString = '';
        if(updateDate === undefined) {
            dateString = (new Date()).toUTCString();
        } else {
            dateString = updateDate;
        }
        const datePlusDex = [dateString].concat(globals.DEX_DATA);
        this.storage.setItem(this.translateKey(globals.POKEDEX_DATA_KEY), JSON.stringify(datePlusDex));
        $('.qolDate', document).val(dateString);
    }
}
