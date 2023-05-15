class PrivateFields {
    static SETTING_KEY = 'QoLPrivateField';
    static SETTING_ENABLE = 'privateFieldEnable';
    static SUB_SETTINGS = 'QoLPrivateFieldFeatures';

    constructor() {
        if(UserDataHandle.getSettings().QoLSettings[PrivateFields.SETTING_ENABLE]) {
            console.log('TODO: PrivateFields features');
        }
        else {
            console.log('PrivateFields features disabled');
        }
    }
}