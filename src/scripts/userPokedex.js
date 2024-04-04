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
    // Clears any locally stored dex data, and loads the static dex data instead.
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
    // type 1 and 2 should be the object key of the relevant type
    // ex: '4' for grass, not the actual string 'grass'
    // set type2 to 'none' to find single-typed
    getByType(type1,type2=null) {
        if(!type2) {
            return this.DEX_DATA.filter(pkmn => { 
                return (pkmn.type1==type1 || pkmn.type2==type1)
            });
        }
        else if(type2=='none') {
            return this.DEX_DATA.filter(pkmn => { 
                return (pkmn.type1==type1 && pkmn.type2===null)
            });
        }
        return this.DEX_DATA.filter(pkmn => { 
            return ((pkmn.type1==type1 && pkmn.type2==type2) || (pkmn.type1==type2 && pkmn.type2==type1)) 
        });
    }
    getBySpecies(name) {
        // if name contains a slash (/), we are doing an exact forme match, which will return a single
        if(name.includes('/')) {
            const splitSpecies = name.split('/');
            return this.DEX_DATA.filter(pkmn => { 
                return (pkmn.species==splitSpecies[0] && pkmn.forme==splitSpecies[1]);
            });
        }
        else {
            return this.DEX_DATA.filter(pkmn => { 
                return pkmn.species.includes(name);
            });
        }
    }
}