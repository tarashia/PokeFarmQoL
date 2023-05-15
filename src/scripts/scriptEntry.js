$(function () {
    ('use strict');
    // script entry point
    let settings;
    try {
        // add this first, so custom errors have a place to go
        console.log('Adding QoL icon');
        document.querySelector('#announcements li.spacer').insertAdjacentHTML('beforebegin', Resources.QOL_HUB_ICON_HTML);

        console.log('Loading QoL settings & core CSS');
        settings = UserDataHandle.getSettings();
        UserDataHandle.getDex(); //pre-load dex
        console.log('Initializing QoL hub');
        new QoLHub();
    } catch(err) {
        ErrorHandler.fatalErrorHandler(err);
        return;
    }

    console.log('Adding QoL CSS');
    Helpers.addGlobalStyle(Resources.CORE_CSS);
    try {
        Helpers.addGlobalStyle(settings.QoLSettings.customCss);
    } catch(e) {
        ErrorHandler.error("Could not add user's custom QoL CSS",e);
    }

    try {
        console.log('Initializing QoL page features');
        PagesManager.instantiatePage();
    } catch(e) {
        ErrorHandler.error("Could not init page-specific QoL features",e);
    }
    
    console.log('QoL Running');
});