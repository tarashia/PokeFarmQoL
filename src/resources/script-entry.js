$(function () {
  ('use strict');
  // script entry point
  if (typeof(module) !== 'undefined') {
    module.exports.pfqol = PFQoL;
  } else {
    new PFQoL();
  }
});