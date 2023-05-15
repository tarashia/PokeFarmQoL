class PrivateFields {
    static SETTING_KEY = 'QoLPrivateFieldFeatures';
    static SETTING_ENABLE = 'privateFieldEnable';

    constructor() {
        if(UserDataHandle.getSettings().QoLSettings[PrivateFields.SETTING_ENABLE]) {
            console.log('TODO: PrivateFields features');
        }
        else {
            console.log('PrivateFields features disabled');
        }
    }
}