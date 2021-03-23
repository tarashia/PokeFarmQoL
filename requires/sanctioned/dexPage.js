/* globals DexPageBase */
// eslint-disable-next-line no-unused-vars
class DexPage extends DexPageBase {
    constructor(jQuery) {
        super(jQuery);

        // when entering the dex page, update the local storage QoLPokedex
        // so the user can update their information
        if(localStorage.getItem('QoLPokedex') !== null) {
            if(jQuery('script#dexdata') && jQuery('script#dexdata').text()) {
                const text = jQuery('script#dexdata').text();
                localStorage.setItem('QoLPokedex', text);
            }
        }
    }
}