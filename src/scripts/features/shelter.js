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
                this.matches = [];
                this.setupSearch();
            }
            // putting this second will actually make its tab first
            if(settings[Shelter.SUB_SETTINGS].sort) {
                Shelter.setupSort();
            }
            settings.addSettingsListeners();
        }
        else {
            console.log('Shelter features disabled');
        }
    }

    static setupSort() {
        // add sort tab
        document.querySelector('#shelterupgrades .tabbed_interface>ul').insertAdjacentHTML('afterbegin', '<li><label>Sort</label></li>');
        document.querySelector('#shelterupgrades .tabbed_interface>ul').insertAdjacentHTML('afterend', '<div>'+Resources.SHELTER_SORT_HTML+'</div>');

        // listen for sort settings changes
        UserDataHandle.getSettings().registerChangeListener(function(changeDetails) {
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

    static createQuickSearchKey(baseObject) {
        baseObject.egg = true;
        baseObject.pkmn = true;
        baseObject.male = true;
        baseObject.female = true;
        baseObject.genderless = true;
        return baseObject;
    }

    drawQuickSearch(searchKey) {
        let self = this;
        let element;
        if(searchKey && 'name' in searchKey) {
            let output = '<div class="qolQuickSearchBlock qolQuickSearchName"><div class="qolQuickSearchInputs">';
            output += '<input type="text" name="qolQsName" /><button type="button" class="qolQuickSearchRemove">X</button></div>';
            output += Resources.QUICK_SEARCH_ICONS
            output += '</div>';
            element = $(output).appendTo($('#qolQuickNameContainer'));
            element.find('input[name="qolQsName"]').val(searchKey.name);
        }
        else if(searchKey && 'type1' in searchKey) {
            let output = '<div class="qolQuickSearchBlock qolQuickSearchType"><div class="qolQuickSearchInputs">';
            output += '<select name="qolQsType1">'+Helpers.generateSelectOptions(Resources.TYPE_LIST,{'select': 'Select'})+'</select>';
            output += '<select name="qolQsType2">'+Helpers.generateSelectOptions(Resources.TYPE_LIST,{'any': 'Any', 'none': 'None'})+'</select>';
            output += '<button type="button" class="qolQuickSearchRemove">X</button>';
            output += '</div>';
            output += Resources.QUICK_SEARCH_ICONS
            output += '</div>';
            element = $(output).appendTo($('#qolQuickTypeContainer'));
            element.find('select[name="qolQsType1"]').val(searchKey.type1);
            element.find('select[name="qolQsType2"]').val(searchKey.type2);
        }
        else if(searchKey && 'nature' in searchKey) {
            let output = '<div class="qolQuickSearchBlock qolQuickSearchNature"><div class="qolQuickSearchInputs">';
            output += '<select name="qolQsNature">'+Helpers.generateSelectOptions(Resources.NATURE_LIST,{'select': 'Select'})+'</select>';
            output += '<button type="button" class="qolQuickSearchRemove">X</button>';
            output += '</div>';
            output += Resources.QUICK_SEARCH_ICONS
            output += '</div>';
            element = $(output).appendTo($('#qolQuickNatureContainer'));
            element.find('select[name="qolQsNature"]').val(searchKey.nature);
        }
        else {
            ErrorHandler.warn('Unknown quick search key format');
            console.log(searchKey);
            return;
        }
        element.find('button.qolQuickSearchRemove').on('click', function() {
            // TODO: remove search
            console.log('remove search');
            self.runSearch();
        });
        element.find('input.qolQsEgg').prop('checked', searchKey.egg);
        element.find('input.qolQsPkmn').prop('checked', searchKey.pkmn);
        element.find('input.qolQsMale').prop('checked', searchKey.male);
        element.find('input.qolQsFemale').prop('checked', searchKey.female);
        element.find('input.qolQsGenderless').prop('checked', searchKey.genderless);
        element.find('input, select').on('change', function() {
            // TODO: save changes
            console.log('save search change');
            self.runSearch();
        });
    }

    setupSearch() {
        const shelterSettings = UserDataHandle.getSettings()[Shelter.SETTING_KEY];

        // add search tab & results box
        $('#shelterupgrades .tabbed_interface>div').removeClass('tab-active');
        $('#shelterupgrades .tabbed_interface>ul>li').removeClass('tab-active');
        document.querySelector('#shelterupgrades .tabbed_interface>ul').insertAdjacentHTML('afterbegin', '<li class="tab-active"><label>Search</label></li>');
        document.querySelector('#shelterupgrades .tabbed_interface>ul').insertAdjacentHTML('afterend', '<div class="tab-active">'+Resources.SHELTER_SEARCH_HTML+'</div>');
        document.querySelector('#sheltercommands').insertAdjacentHTML('beforebegin', '<div id="sheltersuccess"></div>');
        
        let self = this;

        for(const searchKey in shelterSettings.quickPkmnSearch) {
            this.drawQuickSearch(searchKey);
        }
        for(const searchKey in shelterSettings.quickTypeSearch) {
            this.drawQuickSearch(searchKey);
        }
        for(const searchKey in shelterSettings.quickNatureSearch) {
            this.drawQuickSearch(searchKey);
        }

        // listeners to add new search terms
        $('#qolQuickNameBtn').on('click', function() {
            self.drawQuickSearch(Shelter.createQuickSearchKey({'name':''}));
        });
        $('#qolQuickTypeBtn').on('click', function() {
            self.drawQuickSearch(Shelter.createQuickSearchKey({'type1':'select','type2':'any'}));
        });
        $('#qolQuickNatureBtn').on('click', function() {
            self.drawQuickSearch(Shelter.createQuickSearchKey({'nature':'select'}));
        });

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
            self.runSearch();
        });

        // listen for seach settings changes
        UserDataHandle.getSettings().registerChangeListener(function(changeDetails) {
            if(changeDetails.settingGroup == Shelter.SETTING_KEY) {
                self.runSearch();
            }
        });
        console.log('TODO: search enabled');
    }

    runSearch() {
        console.warn('TODO: shelter search');
    }
}