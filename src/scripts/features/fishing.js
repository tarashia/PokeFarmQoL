class Fishing {
    static SETTING_ENABLE = 'fishingEnable';

    constructor() {
        if(UserDataHandle.getSettings().QoLSettings[Fishing.SETTING_ENABLE]) {
            // add CSS always
            Helpers.addGlobalStyle(Resources.FISHING_CSS);
            if(document.getElementById('caughtfishcontainer')) {
                this.multiSelectControls();
            }
        }
        else {
            console.log('Fishing features disabled');
        }
    }
    
    multiSelectControls() {
        const caughtFishLabel = document.querySelector('#caughtfishcontainer label');
        if(caughtFishLabel) {
            caughtFishLabel.insertAdjacentHTML('afterend', Resources.MASS_SELECT_HTML);
        }
        
        $('#selectallcheckbox').on('click', function () {
            $('li[data-flavour]>label>input').prop('checked', this.checked);
        });

        $('#selectallanycheckbox').on('click', function () {
            $('li[data-flavour=Any]>label>input').prop('checked', this.checked);
        });

        $('#selectallsourcheckbox').on('click', function () {
            $('li[data-flavour=Sour]>label>input').prop('checked', this.checked);
        });

        $('#selectallspicycheckbox').on('click', function () {
            $('li[data-flavour=Spicy]>label>input').prop('checked', this.checked);
        });

        $('#selectalldrycheckbox').on('click', function () {
            $('li[data-flavour=Dry]>label>input').prop('checked', this.checked);
        });

        $('#selectallsweetcheckbox').on('click', function () {
            $('li[data-flavour=Sweet]>label>input').prop('checked', this.checked);
        });

        $('#selectallbittercheckbox').on('click', function () {
            $('li[data-flavour=Bitter]>label>input').prop('checked', this.checked);
        });
    }

}