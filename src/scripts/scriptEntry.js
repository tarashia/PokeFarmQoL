$(function () {
  ('use strict');
  // script entry point
  if (typeof(module) !== 'undefined') {
    module.exports.pfqol = PFQoL;
  } else {
    try {
      new PFQoL();
    } catch(err) {
      // prevent showing the fatal error output while logged out, and on non-core pages like direct image links
      if(err!='#announcements missing') {
        let message = 'Fatal error initializing QoL'
        console.error(message);
        console.error(err);
        let errorMsg = Helpers.errorToString(message, 'error', err);
        $('body').append('<div class="panel" style="padding:0.5rem;word-wrap:break-word;user-select:all;">'+errorMsg+'</div>');
      }
    }
  }
});