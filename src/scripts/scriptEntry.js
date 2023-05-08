$(function () {
  ('use strict');
  // script entry point
  try {
    let settings = UserDataHandle.getSettings();
    Helpers.addGlobalStyle(Resources.CORE_CSS);
    Helpers.addGlobalStyle(Resources.MODAL_CSS);
    if(settings && 'mainSettings' in settings && 'customCss' in settings.mainSettings) {
      Helpers.addGlobalStyle(settings.mainSettings.customCss);
    }
    else {
      ErrorHandler.warn("Could not add user's custom CSS");
    }
    PagesManager.instantiatePage();
    new QoLHub();
  } catch(err) {
    ErrorHandler.fatalErrorHandler(err);
  }
});