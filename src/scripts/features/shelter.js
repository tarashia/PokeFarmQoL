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
            if(settings[Shelter.SUB_SETTINGS].search) {
                this.setupSearch(settings);
            }
            // putting this second will actually make its tab first
            if(settings[Shelter.SUB_SETTINGS].sort) {
                this.setupSort(settings);
            }
            settings.addSettingsListeners();
        }
        else {
            console.log('Shelter features disabled');
        }
    }

    setupSort(settings) {
        // add sort tab
        document.querySelector('#shelterupgrades .tabbed_interface>ul').insertAdjacentHTML('afterbegin', '<li><label>Sort</label></li>');
        document.querySelector('#shelterupgrades .tabbed_interface>ul').insertAdjacentHTML('afterend', '<div>'+Resources.SHELTER_SORT_HTML+'</div>');

        // listen for sort settings changes
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

    setupSearch(settings) {
        // add search tab & results box
        $('#shelterupgrades .tabbed_interface>div').removeClass('tab-active');
        $('#shelterupgrades .tabbed_interface>ul>li').removeClass('tab-active');
        document.querySelector('#shelterupgrades .tabbed_interface>ul').insertAdjacentHTML('afterbegin', '<li class="tab-active"><label>Search</label></li>');
        document.querySelector('#shelterupgrades .tabbed_interface>ul').insertAdjacentHTML('afterend', '<div class="tab-active">'+Resources.SHELTER_SEARCH_HTML+'</div>');
        document.querySelector('#sheltercommands').insertAdjacentHTML('beforebegin', '<div id="sheltersuccess"></div>');

        // listen for next match hotkey
        $(window).on('keyup', function (e) {
            if (0 == $(e.target).closest('input, textarea').length) {
                if(e.keyCode == Shelter.NEXT_MATCH_KEY) {
                    console.log('TODO: next key pressed');
                }
            }
        });

        // watch for shelter page refreshes (and initial load)
        Helpers.addObserver(document.querySelector('#shelterarea'), {
            childList: true
        }, function(mutations) {
            console.log('mutation observed');
            console.log(mutations);
            Shelter.runSearch();
        });

        // listen for seach settings changes
        settings.registerChangeListener(function(changeDetails) {
            if(changeDetails.settingGroup == Shelter.SETTING_KEY) {
                Shelter.runSearch();
            }
        });
        console.log('TODO: search enabled');
    }
    static runSearch() {
        console.warn('TODO: field search');
    }
}