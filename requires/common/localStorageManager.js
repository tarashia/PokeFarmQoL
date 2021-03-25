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
        Helpers.loadSettings($, this.translateKey(KEY), DEFAULT, obj);
    }
}