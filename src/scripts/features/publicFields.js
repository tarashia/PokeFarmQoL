class PublicFields {
    static SETTING_KEY = 'QoLPublicField';
    static SETTING_ENABLE = 'publicFieldEnable';
    static SUB_SETTINGS = 'QoLPublicFieldFeatures';

    constructor() {
        if(UserDataHandle.getSettings().QoLSettings[PublicFields.SETTING_ENABLE]) {
            console.log('TODO: PublicFields features');
        }
        else {
            console.log('PublicFields features disabled');
        }
    }
}