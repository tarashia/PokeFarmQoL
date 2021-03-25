// eslint-disable-next-line no-undef
const FishingBase = Page;

// eslint-disable-next-line no-unused-vars
class FishingPage extends FishingBase {
    constructor(jQuery, localStorageMgr, GLOBALS) {
        super(jQuery, localStorageMgr, GLOBALS.FISHING_PAGE_SETTINGS_KEY, {}, 'fishing');
        // no observer
    }
    setupHTML(GLOBALS) {
        // fishing select all button on caught fishing
        document.querySelector('#caughtfishcontainer label').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.massReleaseSelectHTML);
    }
    setupHandlers() {
        const obj = this;
        obj.jQuery('#selectallfishcheckbox').on('click', function () {
            obj.jQuery('li[data-flavour]>label>input').prop('checked', this.checked);
        });

        obj.jQuery('#movefishselectanycheckbox').on('click', function () {
            obj.jQuery('li[data-flavour=Any]>label>input').prop('checked', this.checked);
        });

        obj.jQuery('#movefishselectsourcheckbox').on('click', function () {
            obj.jQuery('li[data-flavour=Sour]>label>input').prop('checked', this.checked);
        });

        obj.jQuery('#movefishselectspicycheckbox').on('click', function () {
            obj.jQuery('li[data-flavour=Spicy]>label>input').prop('checked', this.checked);
        });

        obj.jQuery('#movefishselectdrycheckbox').on('click', function () {
            obj.jQuery('li[data-flavour=Dry]>label>input').prop('checked', this.checked);
        });

        obj.jQuery('#movefishselectsweetcheckbox').on('click', function () {
            obj.jQuery('li[data-flavour=Sweet]>label>input').prop('checked', this.checked);
        });

        obj.jQuery('#movefishselectbittercheckbox').on('click', function () {
            obj.jQuery('li[data-flavour=Bitter]>label>input').prop('checked', this.checked);
        });
    }
}