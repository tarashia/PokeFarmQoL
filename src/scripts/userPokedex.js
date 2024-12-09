// Do not call this constructor directly to get or create a dex object
// Always call UserDataHandle.getDex();
// Note on DEX_LOADING: undefined if fetchUploadedDex is not called, or if resetDex is called
//                      true if loading is in progress, false if loading has completed
//                      use === to evaluate the value, to ensure false vs undefined
class UserPokedex {
    static DEX_DATA_KEY = 'QoLPokedex';

    constructor() {
        console.log('Initializing dex');
        this.loadDex();
    }
    loadDex() {
        // Attempt to load dex from local storage
        console.log('Requesting dex from storage');
        const dateAndDex = LocalStorageManager.getDexFromStorage();
        // If the load fails, or if the data is too old, try getting from uploaded version
        if(!dateAndDex || this.daysSinceUpdate()>7) {
            this.fetchUploadedDex();
        }
        else if(dateAndDex) {
            this.DEX_UPDATE_DATE = dateAndDex[0];
            this.DEX_DATA = dateAndDex[1];
        }
        else {
            this.resetDex();
        }
    }
    // Get the dex data from the updatable, uploaded version, and store it to local storage
    fetchUploadedDex() {
        console.log('Updating dex from from uploaded file');
        try {
            this.DEX_LOADING = true;
            const self = this;
            $.get("https://pokefarm.com/upload/:b7q/QoL/dex-data.jpg", function(data){
                self.DEX_DATA = JSON.parse(data);
                let dateString = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
                self.DEX_UPDATE_DATE = dateString;
                LocalStorageManager.updateLocalStorageDex(self.DEX_DATA, dateString);
                self.DEX_LOADING = false;
                console.log('Dex load complete');
            });
        } catch(e) {
            ErrorHandler.error('Failed to load dex data from uploaded file', e);
            this.resetDex();
        }
    }
    // Clears any locally stored dex data
    resetDex() {
        ErrorHandler.warn('Cleared dex data');
        LocalStorageManager.removeItem(UserPokedex.DEX_DATA_KEY);
        this.DEX_UPDATE_DATE = undefined;
        this.DEX_LOADING = undefined;
        this.DEX_DATA = undefined;
    }
    // Return the number of days since this.DEX_UPDATE_DATE
    daysSinceUpdate() {
        if(!this.DEX_UPDATE_DATE) {
            return -1;
        }
        try {
            return (new Date() - new Date(this.DEX_UPDATE_DATE)) / (1000 * 3600 * 24);
        } catch(e) {
            ErrorHandler.error('Failed to determine number of days since dex update',e);
            return -1;
        }
    }
    // Get the data for a specific Pokemon by ID/forme specifier
    // Ex: 038r7 for Alolan Vulpix
    getByDexID(dexID) {
        return this.DEX_DATA.filter(pkmn => {
            return pkmn.dexID==dexID;
        });
    }
    getBySpecies(name) {
        // if name contains a slash (/), we are doing an exact forme match, which will return a single
        if(name.includes('/')) {
            const splitForme = name.split('/');
            return this.DEX_DATA.filter(pkmn => { 
                return (pkmn.species==splitForme[0] && pkmn.forme==splitForme[1]);
            });
        }
        else {
            return this.DEX_DATA.filter(pkmn => { 
                return pkmn.species.includes(name);
            });
        }
    }
    // returns true if the given dex entry matches the given type values
    // type2 can be any number, or special values "any" or "none"
    static isTypeMatch(dexData, type1, type2) {
        // if either pkmn type matches the search type 1
        if(dexData['type1']==type1 || dexData['type2']==type1) {
            // search type 2 is any, always true
            // search type 2 is none, and pkmn type 2 is null
            // search type 2 is anything else, and pkmn type 1 or 2 matches
            if(type2=='any' || 
                (type2=='none' && dexData['type2']===null) ||
                (dexData['type1']==type2 || dexData['type2']==type2)
            ) {
                return true;
            }
        }
        return false;
    }
}