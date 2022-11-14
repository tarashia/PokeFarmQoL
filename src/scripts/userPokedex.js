// Do not call this constructor directly to get or create a dex object
// Always call UserSettingsHandle.getDex();
class UserPokedex {
    constructor() {
        this.loadDexFromStorage();
    }
    loadDexFromStorage() {
        console.log('Requesting dex from storage');
        const dateAndDex = LocalStorageManager.getDexFromStorage();
        if(!dateAndDex) {
            console.log('No cached dex data found, loading static data');
            this.DEX_UPDATE_DATE = undefined;
            this.DEX_DATA = (`<% src/resources/dex-data.jsonc %>`).split(',');
        }
        else {
            this.DEX_UPDATE_DATE = dateAndDex[0];
            const dex = dateAndDex.slice(1);
            this.DEX_DATA = dex;
        }
    }
    updateDexFromPage(dexText) {
        console.log('Updating dex from site');
        let dateString = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
        this.DEX_DATA = dexText.split(',');
        LocalStorageManager.updateLocalStorageDex(this.DEX_DATA, dateString);
        $('.qolDate').val(dateString);
    }
    resetDex() {
        this.DEX_UPDATE_DATE = undefined;
        this.DEX_DATA = undefined;
        LocalStorageManager.removeItem(Globals.POKEDEX_DATA_KEY);
    }
}