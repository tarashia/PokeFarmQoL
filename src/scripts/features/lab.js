class Lab {
    static SETTING_KEY = 'QoLLab';
    static SETTING_ENABLE = 'labNotifier';

    constructor() {
        if(UserDataHandle.getSettings().QoLSettings[Lab.SETTING_ENABLE]) {
            console.log('TODO: Lab features');
        }
        else {
            console.log('Lab features disabled');
        }
    }
}