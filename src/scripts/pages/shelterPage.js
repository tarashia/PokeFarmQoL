class ShelterPage extends Page {
    static NEXT_MATCH_KEY = 78; // 'n'

    static init() {
        ShelterPage.setupHTMLCSS();
        ShelterPage.setupObservers();
        ShelterPage.setupHandlers();
    }

    static setupObservers() {
        Page.addObserver(document.querySelector('#shelterarea'), {
            childList: true
        }, function(mutations) {
            console.log('mutation observed');
            console.log(mutations);
            //ShelterPage.customSearch();
        });
    }

    static setupHTMLCSS() {
        const mainSettings = UserSettingsHandle.getSettings().mainSettings;
        if(mainSettings.shelterFeatureEnables.search) {
            $('.tabbed_interface.horizontal>div').removeClass('tab-active');
            $('.tabbed_interface.horizontal>ul>li').removeClass('tab-active');
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterbegin', '<li class="tab-active"><label>Search</label></li>');
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterend', Resources.shelterOptionsHTML());
            $('#shelteroptionsqol').addClass('tab-active');
            //ShelterPage.showSearchSettings();
        }
        if(mainSettings.shelterFeatureEnables.sort) {
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterbegin', '<li class=""><label>Sort</label></li>');
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterend', Resources.shelterSortHTML());
            ShelterPage.handleSortSettings();
        }
        if(mainSettings.shelterFeatureEnables.search || mainSettings.shelterFeatureEnables.sort) {
            const shelterSuccessCss = $('#sheltercommands').css('background-color');
            $('#sheltersuccess').css('background-color', shelterSuccessCss);
            $('.tooltiptext').css('background-color', $('.tooltip_content').eq(0).css('background-color'));
            const background = $('#shelterpage>.panel').eq(0).css('border');
            $('.tooltiptext').css('border', '' + background + '');
        }
    }

    static setupHandlers() {

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

    static handleSortSettings() {
        const shelterSettings = UserSettingsHandle.getSettings().pageSettings['QoLShelter'];
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
