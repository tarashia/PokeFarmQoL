class PublicFields {
    static SETTING_KEY = 'QoLPublicField';
    static SETTING_ENABLE = 'publicFieldEnable';
    static SUB_SETTINGS = 'QoLPublicFieldFeatures';

    constructor() {
        let settings = UserDataHandle.getSettings();
        if(settings.QoLSettings[PublicFields.SETTING_ENABLE]) {
            // if specific features are enabled, run them
            if(settings[PrivateFields.SUB_SETTINGS].sort) {
            }
        }
        else {
            console.log('PublicFields features disabled');
        }
    }
}