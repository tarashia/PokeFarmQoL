$(function () {
  ('use strict');
  // script entry point
  try {
    // add this first, so custom errors have a place to go
    console.log('Adding QoL icon');
    document.querySelector('#announcements li.spacer').insertAdjacentHTML('beforebegin', Resources.QOL_HUB_ICON_HTML);

    console.log('Loading QoL settings & core CSS');
    let settings = UserDataHandle.getSettings();
    UserDataHandle.getDex(); //pre-load dex

    console.log('Adding QoL CSS');
    Helpers.addGlobalStyle(Resources.CORE_CSS);
    Helpers.addGlobalStyle(Resources.MODAL_CSS);
    if(settings && 'mainSettings' in settings && 'customCss' in settings.mainSettings) {
      Helpers.addGlobalStyle(settings.mainSettings.customCss);
    }
    else {
      ErrorHandler.warn("Could not add user's custom CSS");
    }

    console.log('Initializing QoL hub');
    new QoLHub();
    console.log('Initializing QoL page features');
    PagesManager.instantiatePage();
  
    console.log('QoL Running');
  } catch(err) {
    ErrorHandler.fatalErrorHandler(err);
  }
});