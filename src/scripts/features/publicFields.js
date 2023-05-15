class PublicFields {
    static SETTING_KEY = 'QoLPublicFieldFeatures';
    static SETTING_ENABLE = 'publicFieldEnable';

    constructor() {
        if(UserDataHandle.getSettings().QoLSettings[PublicFields.SETTING_ENABLE]) {
            console.log('TODO: PublicFields features');
        }
        else {
            console.log('PublicFields features disabled');
        }
    }
}