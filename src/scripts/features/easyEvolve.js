class EasyEvolve {
    static SETTING_ENABLE = 'easyEvolve';

    constructor() {
        if(UserDataHandle.getSettings().QoLSettings[EasyEvolve.SETTING_ENABLE]) {
            console.log('TODO: EasyEvolve features');
        }
        else {
            console.log('EasyEvolve features disabled');
        }
    }
}