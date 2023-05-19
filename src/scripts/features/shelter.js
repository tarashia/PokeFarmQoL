class Shelter {
    static SETTING_KEY = 'QoLShelter';
    static SETTING_ENABLE = 'shelterEnable';
    static SUB_SETTINGS = 'QoLShelterFeatures';
    static NEXT_MATCH_KEY = 78; // 'n'

    constructor() {
        let settings = UserDataHandle.getSettings();
        if(settings.QoLSettings[Shelter.SETTING_ENABLE]) {
            Helpers.addGlobalStyle(Resources.SHELTER_CSS);
            Helpers.addGlobalStyle(Resources.SEARCH_CSS);
            // if specific features are enabled, run them
            if(settings[Shelter.SUB_SETTINGS].sort) {
                this.setupSort(settings);
            }
            if(settings[Shelter.SUB_SETTINGS].search) {
                this.setupSearch(settings);
            }
            settings.addSettingsListeners();
        }
        else {
            console.log('Shelter features disabled');
        }
    }

    setupSearch(settings) {
        // listen for next match hotkey
        $(window).on('keyup', function (e) {
            if (0 == $(e.target).closest('input, textarea').length) {
                if(e.keyCode == Shelter.NEXT_MATCH_KEY) {
                    console.log('TODO: next key pressed');
                }
            }
        });
        Helpers.addObserver(document.querySelector('#shelterarea'), {
            childList: true
        }, function(mutations) {
            console.log('mutation observed');
            console.log(mutations);
            //this.runSearch(); //TODO
        });
        console.log('TODO: search enabled');
    }
    runSearch() {
        console.warn('TODO: field search');
    }

    setupSort(settings) {
        // add sort tab
        document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterbegin', '<li class=""><label>Sort</label></li>');
        document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterend', Resources.SHELTER_SORT_HTML);

        // add settings change listener
        settings.registerChangeListener(function(changeDetails) {
            if(changeDetails.settingName == 'shelterGrid' || changeDetails.settingName == 'shelterSpriteSize') {
                Shelter.handleSortSettings();
            }
        });

        // run initially
        Shelter.handleSortSettings();
    }
    static handleSortSettings() {
        const shelterSettings = UserDataHandle.getSettings()[Shelter.SETTING_KEY];

        // sort in grid
        $('#shelterarea').removeClass('qolshelterareagrid');
        if (shelterSettings.shelterGrid === true) { //shelter grid
            $('#shelterarea').addClass('qolshelterareagrid');
        }

        // sprite size mode
        $('#shelterarea').removeClass('qolshelterarealarge');
        $('#shelterarea').removeClass('qolshelterareasmall');
        if(shelterSettings.shelterSpriteSize == 'large') {
            $('#shelterarea').addClass('qolshelterarealarge');
        }
        else if(shelterSettings.shelterSpriteSize == 'small') {
            $('#shelterarea').addClass('qolshelterareasmall');
        }
    }
}