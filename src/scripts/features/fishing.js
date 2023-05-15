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
            caughtFishLabel.insertAdjacentHTML('afterend', Resources.MASS_RELEASE_FISHING_HTML);
        }
        
        // TODO: update this to do male/female when flavors not shown like new field release menu
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