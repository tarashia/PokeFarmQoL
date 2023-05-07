class LocalStorageManager {
    // Look for settings that contain QoL and return them as an array of keys
    // Uses the same basic code as the migrateSettings function
    static getAllQoLSettings(includeDex=false) {
        const qolSettings = {};
        for (let i = 0, len = localStorage.length; i < len; ++i) {
            const key = localStorage.key(i);
            // the dex is the largest data element by far; allow excluding it
            if(key && key.match(/QoL/) && (includeDex || !key.match(/QoLPokedex/))) {
                qolSettings[key] = localStorage.getItem(key);
            }
        }
        return qolSettings;
    }
    // delete ALL QoL keys in storage
    static clearAllQoLKeys() {
        for (let i = 0, len = localStorage.length; i < len; ++i) {
            const key = localStorage.key(i);
            if(key && key.match(/QoL/)) {
                localStorage.removeItem(key);
            }
        }
    }
    /**
     * This function helps users use the updated script without having to
     * clear their settings by looking for items in local storage that
     * start with 'QoL...' and moving the settings to the correct
     * translated local storage key
     */
    static migrateSettings() {
        const newItems = {};
        const newKeys = [];
        const keysToRemove = [];
        // find the items that need to be replaced
        for (let i = 0, len = localStorage.length; i < len; ++i) {
            let match = localStorage.key(i).match(/^QoL/);
            if(!match) {
                // the user ID feature was just returning undefined - convert these too
                match = localStorage.key(i).match(/^undefined\.QoL/);
            }
            if(match) {
                const oldKey = match.input;
                const newKey = LocalStorageManager.translateKey(oldKey);
                newItems[newKey] = localStorage.getItem(oldKey);
                keysToRemove.push(oldKey);
            }
            match = localStorage.key(i).match(/^undefined\.undefined\.QoL/);
            if(match) {
                keysToRemove.push(match.input);
            }
        }
        // remove the old style keys
        for(let j = 0; j < keysToRemove.length; j++) {
            localStorage.removeItem(keysToRemove[j]);
        }
        // add the new style keys
        for(const newKey in newItems) {
            localStorage.setItem(newKey, newItems[newKey]);
            newKeys.push(newKey);
        }
        if(keysToRemove.length>0 || newKeys.length>0) {
            console.log('Migrated keys (old, new):');
            console.log(keysToRemove);
            console.log(newKeys);
        }
    }
    static translateKey(key) {
        let pos = key.indexOf('QoL');
        if(pos<0) {
            throw 'Bad key format';
        }
        key = key.substring(pos);
        let userID = $('#core').attr('data-user');
        if(!userID) {
            userID = 'unknown';
        }
        return userID+'.'+key;
    }
    static saveSettings(key, obj) {
        if (key == null){ return; }
        localStorage.setItem(LocalStorageManager.translateKey(key), JSON.stringify(obj));
    }
    static loadSettings(KEY, DEFAULT, obj) {
        if (KEY == null){ return; }
        KEY = LocalStorageManager.translateKey(KEY);
        if (localStorage.getItem(KEY) === null) {
            this.saveSettings(KEY);
        } else {
            try {
                const countScriptSettings = Object.keys(obj).length;
                const localStorageString = JSON.parse(localStorage.getItem(KEY));
                const countLocalStorageSettings = Object.keys(localStorageString).length;
                if (countLocalStorageSettings < countScriptSettings) { // adds new objects (settings) to the local storage
                    const defaultsSetting = DEFAULT;
                    const userSetting = JSON.parse(localStorage.getItem(KEY));
                    const newSetting = $.extend(true, {}, defaultsSetting, userSetting);

                    obj = newSetting;
                    this.saveSettings(KEY, obj);
                }
                if (countLocalStorageSettings > countScriptSettings) {
                    this.saveSettings(KEY, obj);
                }
            }
            catch (err) {
                this.saveSettings(KEY, obj);
            }
            if (localStorage.getItem(KEY) != JSON.stringify(obj)) {
                obj = JSON.parse(localStorage.getItem(KEY));
            }
        }

        return obj;
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

    static getDexFromStorage() {
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
        return dateAndDex;
    }

    static updateLocalStorageDex(DEX_DATA, dateString) {
        const datePlusDex = [dateString, DEX_DATA];
        localStorage.setItem(LocalStorageManager.translateKey(Globals.POKEDEX_DATA_KEY), JSON.stringify(datePlusDex));
    }
}
