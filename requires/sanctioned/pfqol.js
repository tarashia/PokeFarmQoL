/* globals jQuery PFQoLBase */
// eslint-disable-next-line no-unused-vars
class PFQoL extends PFQoLBase {
    constructor($) {
        super($);
    }
}

if (typeof(module) !== 'undefined') {
    module.exports.pfqol = PFQoL;
} else {
    new PFQoL(jQuery);
}