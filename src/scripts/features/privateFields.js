class PrivateFields {
    static SETTING_KEY = 'QoLPrivateField';
    static SETTING_ENABLE = 'privateFieldEnable';
    static SUB_SETTINGS = 'QoLPrivateFieldFeatures';

    constructor() {
        let settings = UserDataHandle.getSettings();
        if(settings.QoLSettings[PrivateFields.SETTING_ENABLE]) {
            // if specific features are enabled, run them
            if(settings[PrivateFields.SUB_SETTINGS].release) {
                $(document).on('click', '*[data-menu="release"]', (function (e) { //select all feature
                    e.stopPropagation();
                    PrivateFields.enableMoveReleaseControls();
                }));
                $(document).on('click', '*[data-menu="bulkmove"]', (function () { // select all feature
                    PrivateFields.enableMoveReleaseControls();
                }));
            }
        }
        else {
            console.log('PrivateFields features disabled');
        }
    }
    
    static showBulkNatures(enable) {
        console.log('show bulk natures');
        let pkmn = $('input[name="masspkmn"]');
        for(let i=0; i<pkmn.length; i++) {
            let pkmnDetails = $(pkmn[i]).next().next().html();
            if(enable) {
                let natureRegex = /<b>Nature:<\/b> ([a-zA-Zï]+)/;
                let results = pkmnDetails.match(natureRegex);
                if(results.length>1) { // this should always be true, but just in case
                    $(pkmn[i]).next().next().next().html(results[1]);
                }
            }
            else {
                let genderRegex = /<span class="icons">(<img src=".+">)<\/span>/;
                let results = pkmnDetails.match(genderRegex);
                if(results.length>1) { // this should always be true, but just in case
                    $(pkmn[i]).next().next().next().html(results[1]);
                }
            }
        }
    }
    static enableMoveReleaseControls() {
        // find flavour checkbox, add show nature checkbox
        let flavourCheckbox =  $('.bulkpokemonlist>label:first-child>input');
        let natureCheckbox = $('<input type="checkbox"> Show Pokemon natures');
        let natureLabel = $('<label></label>').append(natureCheckbox).append(' Show Pokemon natures');
        flavourCheckbox.parent().after('<br>');
        flavourCheckbox.parent().after(natureLabel);
        flavourCheckbox.parent().after('<br>');

        // add flavour/nature listeners
        flavourCheckbox.on('change',function() {
            // disable show natures
            $('.bulkpokemonlist').removeClass('qolNatureShown');
            natureCheckbox.prop('checked',false);

            if($(this).prop('checked')) {
                $('.bulkpokemonlist').addClass('qolFlavourShown');
            }
            else {
                $('.bulkpokemonlist').removeClass('qolFlavourShown');
            }
        });
        natureCheckbox.on('change',function() {
            // disable show flavours
            $('.bulkpokemonlist').removeClass('qolFlavourShown');
            flavourCheckbox.prop('checked',false);

            if($(this).prop('checked')) {
                $('.bulkpokemonlist').addClass('qolNatureShown');
                PrivateFields.showBulkNatures(true);
            }
            else {
                $('.bulkpokemonlist').removeClass('qolNatureShown');
                PrivateFields.showBulkNatures(false);
            }
        });

        // add selection checkboxes
        $('.bulkpokemonlist').after(Resources.MASS_SELECT_HTML);

        // checkbox listeners
        $('#selectallcheckbox').click(function () {
            $('.bulkpokemonlist>ul>li>label>input').not(this).prop('checked', this.checked);
        });
        $('#selectallmalecheckbox').click(function () {
            const selectAny = $('.icons img[title="[M]"]').parent().prev().prev().prev('input');
            $(selectAny).not(this).prop('checked', this.checked);
        });
        $('#selectallfemalecheckbox').click(function () {
            const selectAny = $('.icons img[title="[F]"]').parent().prev().prev().prev('input');
            $(selectAny).not(this).prop('checked', this.checked);
        });
        $('#selectallgenderlesscheckbox').click(function () {
            const selectAny = $('.icons img[title="[N]"]').parent().prev().prev().prev('input');
            $(selectAny).not(this).prop('checked', this.checked);
        });
        $('#selectallanycheckbox').click(function () {
            const selectAny = $('.icons:contains("Any")').prev().prev().prev('input');
            $(selectAny).not(this).prop('checked', this.checked);
        });
        $('#selectallsourcheckbox').click(function () {
            const selectSour = $('.icons:contains("Sour")').prev().prev().prev('input');
            $(selectSour).not(this).prop('checked', this.checked);
        });
        $('#selectallspicycheckbox').click(function () {
            const selectSpicy = $('.icons:contains("Spicy")').prev().prev().prev('input');
            $(selectSpicy).not(this).prop('checked', this.checked);
        });
        $('#selectalldrycheckbox').click(function () {
            const selectDry = $('.icons:contains("Dry")').prev().prev().prev('input');
            $(selectDry).not(this).prop('checked', this.checked);
        });
        $('#selectallsweetcheckbox').click(function () {
            const selectSweet = $('.icons:contains("Sweet")').prev().prev().prev('input');
            $(selectSweet).not(this).prop('checked', this.checked);
        });
        $('#selectallbittercheckbox').click(function () {
            const selectBitter = $('.icons:contains("Bitter")').prev().prev().prev('input');
            $(selectBitter).not(this).prop('checked', this.checked);
        });
    }
}