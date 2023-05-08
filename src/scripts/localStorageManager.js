class LocalStorageManager {
    
    static MAIN_SETTINGS_KEY = 'QoLSettings';
    static PAGE_SETTINGS_KEYS  = [
        'QoLLab',
        'QoLMultiuser',
        'QoLPrivateFields',
        'QoLPublicFields',
        'QoLShelter'
    ];
    static DEX_DATA_KEY = 'QoLPokedex';
    // see keys in UserSettings.pageSettings for page-specific storage keys

    // Look for settings that contain QoL and return them as an array of keys
    static getAllQoLSettings(includeDex=false) {
        const qolSettings = {};
        for (let i = 0, len = localStorage.length; i < len; ++i) {
            const key = localStorage.key(i);
            // the dex is the largest data element by far; allow excluding it
            if(key && key.includes('QoL') && (includeDex || !key.includes(LocalStorageManager.DEX_DATA_KEY))) {
                qolSettings[key] = localStorage.getItem(key);
            }
        }
        return qolSettings;
    }
    // delete ALL QoL keys in storage
    static clearAllQoLKeys() {
        for (let i = 0, len = localStorage.length; i < len; ++i) {
            const key = localStorage.key(i);
            if(key && key.includes('QoL')) {
                localStorage.removeItem(key);
            }
        }
    }

    // validates key is in QoL format, and appends the current user ID to the key
    // returns null if the key is in a bad format (use === to evaluate)
    static translateKey(key) {
        if(!key.startsWith('QoL')) {
            ErrorHandler.error('Bad key format: '+ key);
            return null;
        }
        let userID = $('#core').attr('data-user');
        if(!userID) {
            userID = 'unknown';
        }
        return userID+'.'+key;
    }

    static getItem(key) {
        const tKey = LocalStorageManager.translateKey(key);
        if(tKey) {
            return localStorage.getItem(tKey);
        }
    }
    static setItem(key, value) {
        const tKey = LocalStorageManager.translateKey(key);
        if(tKey) {
            localStorage.setItem(tKey, JSON.stringify(value));
        }
    }
    static removeItem(key) {
        const tKey = LocalStorageManager.translateKey(key);
        if(tKey) {
            localStorage.removeItem(tKey);
        }
    }

    static getDexFromStorage() {
        const tKey = LocalStorageManager.translateKey(LocalStorageManager.DEX_DATA_KEY);
        if(!tKey) {
            return false;
        }
        const storedData = localStorage.getItem(tKey);
        if(localStorage.getItem(tKey) === null || Object.keys(JSON.parse(storedData)).length === 0) {
            return false;
        }
        const dateAndDex = JSON.parse(localStorage.getItem(tKey));
        // if QoLPokedex only contains date
        if((dateAndDex.length === 1) ||
           // or if the dex part of the array is empty
           (dateAndDex[1] === undefined) || (dateAndDex[1] === null)) {
            return false;
        }
        return dateAndDex;
    }

    static updateLocalStorageDex(DEX_DATA, dateString) {
        LocalStorageManager.setItem(LocalStorageManager.DEX_DATA_KEY, [dateString, DEX_DATA]);
    }
}
