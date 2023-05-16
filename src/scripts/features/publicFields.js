class PublicFields {
    static SETTING_KEY = 'QoLPublicField';
    static SETTING_ENABLE = 'publicFieldEnable';
    static SUB_SETTINGS = 'QoLPublicFieldFeatures';

    constructor() {
        let settings = UserDataHandle.getSettings();
        if(settings.QoLSettings[PublicFields.SETTING_ENABLE]) {
            // if specific features are enabled, run them
            if(settings[PublicFields.SUB_SETTINGS].sort) {
                PublicFields.setupFieldSort(settings);
            }
            this.setupObservers(settings);
        }
        else {
            console.log('PublicFields features disabled');
        }
    }
  
    setupObservers(settings) {
        Helpers.addObserver(document.querySelector('#field_field'), {
            childList: true,
            subtree: true,
        }, function(mutations) {
            console.warn(mutations);
            PublicFields.addClickCounter(settings);
        });
    }

    static addClickCounter(settings) {
        //Pokémon click counter
        if (settings[PublicFields.SETTING_KEY].fieldClickCount === true) {
            const pokemonFed = $('.fieldmon').map(function() { return $(this).attr('data-fed'); }).get();

            let pokemonClicked = 0;
            for (let i = 0; i < pokemonFed.length; i++) {
                pokemonClicked += pokemonFed[i] << 0;
            }

            const pokemonInField = $('.fieldpkmncount').text();

            if ($('#pokemonclickcount').length === 0) {
                document.querySelector('.fielddata').insertAdjacentHTML('beforeend','<div id="pokemonclickcount">'+pokemonClicked+' / '+pokemonInField+' Clicked</div>');
            } else if($('#pokemonclickcount').text() !== (pokemonClicked+' / '+pokemonInField+' Clicked')) {
                $('#pokemonclickcount').text(pokemonClicked+' / '+pokemonInField+' Clicked');
            }

            if(pokemonInField !== '') {
                if (JSON.stringify(pokemonClicked) === pokemonInField) {
                    $('#pokemonclickcount').removeClass('unclicked');
                    $('#pokemonclickcount').addClass('clicked');
                }
                if (pokemonClicked !== JSON.parse(pokemonInField)) {
                    $('#pokemonclickcount').removeClass('clicked');
                    $('#pokemonclickcount').addClass('unclicked');
                }
            }
        }
        else {
            $('#pokemonclickcount').remove();
        }
    }
    static setupFieldSort(settings) {
        // add sort menu items
        document.querySelector('#field_nav').insertAdjacentHTML('beforebegin', Resources.FIELD_SORT_HTML);
        const menuBackground = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('background-color');
        const menuColor = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('color');
        $('#fieldorder').css('background-color', '' + menuBackground + '');
        $('#fieldorder').css('color', '' + menuColor + '');
        // enable setting listeners
        settings.addSettingsListeners();
        settings.registerChangeListener(function(changeDetails) {
            if(changeDetails.settingGroup==PublicFields.SETTING_KEY) {
                PublicFields.applyFieldSort(settings);
            }
        });
        // run at page load too
        PublicFields.applyFieldSort(settings);
        PublicFields.addClickCounter(settings);
    }
    static applyFieldSort(settings) {
        const fieldSettings = settings[PublicFields.SETTING_KEY];
        /*
            Sort-related settings, and their default values
            fieldSettings.fieldSort = 'none';
            fieldSettings.fieldClickCount = true;
            fieldSettings.maxStack = false;
        */
        // first, remove any existing selection (all qol classes)
        let classList = document.getElementById('field_field').className.split(/\s+/);
        for (let i = 0; i < classList.length; i++) {
            if (classList[i].match(/^qol/)) {
                $('#field_field').removeClass(classList[i]);
            }
        }
        // add the desired sort class
        switch(fieldSettings.fieldSort) {
            case 'grid':
                $('#field_field').addClass('qolFieldGrid');
                break;
            case 'berry':
                $('#field_field').addClass('qolFieldBerrySort');
                break;
            case 'stack':
                if(fieldSettings.maxStack===true) {
                    $('#field_field').addClass('qolFieldStackMax');
                }
                else {
                    $('#field_field').addClass('qolFieldStack');
                }
                break;
            case 'none':
            default:
                break;
        }
    }
}