class Fields {
    constructor(page) {
        // determine if this is public vs private so the correct settings can be used
        this.page = page;
        if(page.name=='privateFields') {
            this.page.SETTING_ENABLE = PrivateFields.SETTING_ENABLE;
            this.page.SETTING_KEY = PrivateFields.SETTING_KEY;
        }
        else if(page.name=='publicFields') {
            this.page.SETTING_ENABLE = PublicFields.SETTING_ENABLE;
            this.page.SETTING_KEY = PublicFields.SETTING_KEY;
        }
        else {
            console.error('Unknown field page');
        }
        if(UserDataHandle.getSettings().QoLSettings[this.page.SETTING_ENABLE]) {
            console.log('TODO: Fields features');
        }
        // don't log when disabled here, leave that to the unique classes
    }
}