$(function () {
  ('use strict');
  // script entry point
  try {
    console.log('Loading QoL settings & core CSS');
    let settings = UserDataHandle.getSettings();
    UserDataHandle.getDex(); //pre-load dex
    Helpers.addGlobalStyle(Resources.CORE_CSS);
    Helpers.addGlobalStyle(Resources.MODAL_CSS);
    console.log('Adding QoL user CSS');
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