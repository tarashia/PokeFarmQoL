const FishingBase = (module) ? require('./basePage').Page : Page;

class FishingPage extends FishingBase {
    constructor() {
        super('QoLFishing', {}, 'fishing')
        // no observer
    }
    setupHTML(GLOBALS) {
        // fishing select all button on caught fishing
        document.querySelector('#caughtfishcontainer label').insertAdjacentHTML('beforeend', GLOBALS.TEMPLATES.massReleaseSelectHTML);
    }
    setupHandlers() {
        const obj = this;
        $("#selectallfishcheckbox").on('click', function () {
            $(this).parent().parent().next().find('input:checkbox').prop('checked', this.checked);
        });

        $('#movefishselectanycheckbox').on('click', function () {
            let selectAny = $('.icons:contains("Any")').prev().prev('input');
            $(selectAny).not(this).prop('checked', this.checked);
        });

        $('#movefishselectsourcheckbox').on('click', function () {
            let selectSour = $('.icons:contains("Sour")').prev().prev('input');
            $(selectSour).not(this).prop('checked', this.checked);
        });

        $('#movefishselectspicycheckbox').on('click', function () {
            let selectSpicy = $('.icons:contains("Spicy")').prev().prev('input');
            $(selectSpicy).not(this).prop('checked', this.checked);
        });

        $('#movefishselectdrycheckbox').on('click', function () {
            let selectDry = $('.icons:contains("Dry")').prev().prev('input');
            $(selectDry).not(this).prop('checked', this.checked);
        });

        $('#movefishselectsweetcheckbox').on('click', function () {
            let selectSweet = $('.icons:contains("Sweet")').prev().prev('input');
            $(selectSweet).not(this).prop('checked', this.checked);
        });

        $('#movefishselectbittercheckbox').on('click', function () {
            let selectBitter = $('.icons:contains("Bitter")').prev().prev('input');
            $(selectBitter).not(this).prop('checked', this.checked);
        });
    }
};