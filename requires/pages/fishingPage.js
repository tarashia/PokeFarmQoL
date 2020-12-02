const FishingBase = Page;

class FishingPage extends FishingBase {
    constructor(jQuery) {
        super('QoLFishing', {}, 'fishing');
        this.jQuery = jQuery;
        // no observer
    }
    setupHTML(GLOBALS) {
        // fishing select all button on caught fishing
        document.querySelector('#caughtfishcontainer label').insertAdjacentHTML('beforeend', GLOBALS.TEMPLATES.massReleaseSelectHTML);
    }
    setupHandlers() {
        const obj = this;
        obj.jQuery("#selectallfishcheckbox").on('click', function () {
            obj.jQuery(this).parent().parent().next().find('input:checkbox').prop('checked', this.checked);
        });

        obj.jQuery('#movefishselectanycheckbox').on('click', function () {
            let selectAny = obj.jQuery('.icons:contains("Any")').prev().prev('input');
            obj.jQuery(selectAny).not(this).prop('checked', this.checked);
        });

        obj.jQuery('#movefishselectsourcheckbox').on('click', function () {
            let selectSour = obj.jQuery('.icons:contains("Sour")').prev().prev('input');
            obj.jQuery(selectSour).not(this).prop('checked', this.checked);
        });

        obj.jQuery('#movefishselectspicycheckbox').on('click', function () {
            let selectSpicy = obj.jQuery('.icons:contains("Spicy")').prev().prev('input');
            obj.jQuery(selectSpicy).not(this).prop('checked', this.checked);
        });

        obj.jQuery('#movefishselectdrycheckbox').on('click', function () {
            let selectDry = obj.jQuery('.icons:contains("Dry")').prev().prev('input');
            obj.jQuery(selectDry).not(this).prop('checked', this.checked);
        });

        obj.jQuery('#movefishselectsweetcheckbox').on('click', function () {
            let selectSweet = obj.jQuery('.icons:contains("Sweet")').prev().prev('input');
            obj.jQuery(selectSweet).not(this).prop('checked', this.checked);
        });

        obj.jQuery('#movefishselectbittercheckbox').on('click', function () {
            let selectBitter = obj.jQuery('.icons:contains("Bitter")').prev().prev('input');
            obj.jQuery(selectBitter).not(this).prop('checked', this.checked);
        });
    }
};