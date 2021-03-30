/* globals Helpers */

// eslint-disable-next-line no-unused-vars
class LocalStorageManagerBase {
    constructor(keyPrefix, storage) {
        this.keyPrefix = keyPrefix;
        this.storage = storage;
    }
    translateKey(key) {
        return `${this.keyPrefix}.${key}`;
    }
    saveSettings(key, obj) {
        Helpers.saveSettings(this.translateKey(key), obj);
    }
    loadSettings($, KEY, DEFAULT, obj) {
        return Helpers.loadSettings($, this.translateKey(KEY), DEFAULT, obj);
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
}