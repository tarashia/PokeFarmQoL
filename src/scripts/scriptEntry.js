$(function () {
  ('use strict');
  // script entry point
  try {
    PagesManager.instantiatePage();
    //QoLHub
    UserSettingsHandle.addSettingsListeners();
  } catch(err) {
    ErrorHandler.fatalErrorHandler(err);
  }
});