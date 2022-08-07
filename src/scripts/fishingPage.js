class FishingPage extends Page {
    constructor(localStorageMgr, helpers, GLOBALS) {
        super(localStorageMgr, helpers, GLOBALS.FISHING_PAGE_SETTINGS_KEY, {}, 'fishing');
        // no observer
    }
    setupHTML(GLOBALS) {
        // fishing select all button on caught fishing
        document.querySelector('#caughtfishcontainer label').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.massReleaseSelectHTML);
    }
    setupHandlers() {
        $('#selectallfishcheckbox').on('click', function () {
            $('li[data-flavour]>label>input').prop('checked', this.checked);
        });

        $('#movefishselectanycheckbox').on('click', function () {
            $('li[data-flavour=Any]>label>input').prop('checked', this.checked);
        });

        $('#movefishselectsourcheckbox').on('click', function () {
            $('li[data-flavour=Sour]>label>input').prop('checked', this.checked);
        });

        $('#movefishselectspicycheckbox').on('click', function () {
            $('li[data-flavour=Spicy]>label>input').prop('checked', this.checked);
        });

        $('#movefishselectdrycheckbox').on('click', function () {
            $('li[data-flavour=Dry]>label>input').prop('checked', this.checked);
        });

        $('#movefishselectsweetcheckbox').on('click', function () {
            $('li[data-flavour=Sweet]>label>input').prop('checked', this.checked);
        });

        $('#movefishselectbittercheckbox').on('click', function () {
            $('li[data-flavour=Bitter]>label>input').prop('checked', this.checked);
        });
    }
}