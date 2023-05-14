class ShelterPage extends Page {
    static SETTING_KEY = 'QoLShelter';
    static NEXT_MATCH_KEY = 78; // 'n'

    constructor() {
        super();
        this.setupHTML();
        this.setupObservers();
        this.setupHandlers();
    }

    setupObservers() {
        this.addObserver(document.querySelector('#shelterarea'), {
            childList: true
        }, function(mutations) {
            console.log('mutation observed');
            console.log(mutations);
            //this.customSearch();
        });
    }

    setupHTML() {
        const QoLSettings = UserDataHandle.getSettings().QoLSettings;
        if(QoLSettings.shelterFeatureEnables.search) {
            $('.tabbed_interface.horizontal>div').removeClass('tab-active');
            $('.tabbed_interface.horizontal>ul>li').removeClass('tab-active');
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterbegin', '<li class="tab-active"><label>Search</label></li>');
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterend', Resources.shelterOptionsHTML());
            $('#shelteroptionsqol').addClass('tab-active');
            //this.showSearchSettings();
        }
        if(QoLSettings.shelterFeatureEnables.sort) {
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterbegin', '<li class=""><label>Sort</label></li>');
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterend', Resources.shelterSortHTML());
            this.handleSortSettings();
        }
        if(QoLSettings.shelterFeatureEnables.search || QoLSettings.shelterFeatureEnables.sort) {
            const shelterSuccessCss = $('#sheltercommands').css('background-color');
            $('#sheltersuccess').css('background-color', shelterSuccessCss);
            $('.tooltiptext').css('background-color', $('.tooltip_content').eq(0).css('background-color'));
            const background = $('#shelterpage>.panel').eq(0).css('border');
            $('.tooltiptext').css('border', '' + background + '');
        }
    }

    setupHandlers() {
        $('#qolQuickTextBtn').on('click',function() {
            console.log('add quick text');
        });
        $('#qolQuickTypeBtn').on('click',function() {
            console.log('add quick type');
        });

        // listen for next match hotkey
        $(window).on('keyup', function (e) {
            if (0 == $(e.target).closest('input, textarea').length) {
                if(e.keyCode == ShelterPage.NEXT_MATCH_KEY) {
                    console.log('TODO: next key pressed');
                }
            }
        });
    }

    handleSortSettings() {
        const shelterSettings = UserDataHandle.getSettings()[ShelterPage.SETTING_KEY];
        //sort in grid
        $('#shelterarea').removeClass('qolshelterareagrid');

        if (shelterSettings.shelterGrid === true) { //shelter grid
            $('#shelterarea').addClass('qolshelterareagrid');
        }

        // sprite size mode
        $('#shelterarea').removeClass('qolshelterarealarge');
        $('#shelterarea').removeClass('qolshelterareasmall');
        $('input[name="shelterSpriteSize"]').prop('checked',false);
        if(shelterSettings.shelterSpriteSize == 'large') {
            $('#shelterarea').addClass('qolshelterarealarge');
            $('#spriteSizeLarge').prop('checked',true);
        }
        else if(shelterSettings.shelterSpriteSize == 'small') {
            $('#shelterarea').addClass('qolshelterareasmall');
            $('#spriteSizeSmall').prop('checked',true);
        }
        else {
            $('#spriteSizeAuto').prop('checked',true);
        }
    }
}
