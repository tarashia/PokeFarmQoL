$(function () {
  ('use strict');
  // script entry point
  if (typeof(module) !== 'undefined') {
    module.exports.pfqol = PFQoL;
  } else {
    // eslint-disable-next-line no-undef
    new PFQoL(jQuery);
  }
});