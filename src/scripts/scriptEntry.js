$(function () {
  ('use strict');
  // script entry point
  if (typeof(module) !== 'undefined') {
    module.exports.pfqol = PFQoL;
  } else {
    // detect user login status - use to hide init error when logged out
    let loggedIn = true;
    try {
      if($('#core')[0].getAttribute('data-user')=='') {
        loggedIn = false;
      }
    } catch(err) {
      console.error('Could not determine user login status');
      console.error(err);
    }
    if(loggedIn) {
      try {
        new PFQoL();
      } catch(err) {
        let message = 'Fatal error initializing QoL'
        console.error(message);
        console.error(err);
        let errorMsg = Helpers.errorToString(message, 'error', err);
        $('body').append('<div class="panel" style="padding:0.5rem;word-wrap:break-word;user-select:all;">'+errorMsg+'</div>');
      }
    }
    else {
      console.log('Not logged in - did not init QoL script');
    }
  }
});