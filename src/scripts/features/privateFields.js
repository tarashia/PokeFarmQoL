class PrivateFields {
    static SETTING_KEY = 'QoLPrivateField';
    static SETTING_ENABLE = 'privateFieldEnable';
    static SUB_SETTINGS = 'QoLPrivateFieldFeatures';

    constructor() {
        let settings = UserDataHandle.getSettings();
        if(settings.QoLSettings[PrivateFields.SETTING_ENABLE]) {
            // if specific features are enabled, run them
            if(settings[PrivateFields.SUB_SETTINGS].release) {
            }
        }
        else {
            console.log('PrivateFields features disabled');
        }
    }
}