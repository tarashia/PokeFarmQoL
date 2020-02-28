let PublicFieldsPage = (function PublicFieldsPage() {
    const SETTINGS_SAVE_KEY = 'QoLPublicFields';
    const DEFAULT_SORT_SETTINGS = {
        fieldByBerry: false,
        fieldByMiddle: false,
        fieldByGrid: false,
        fieldClickCount: true,
    };
    const DEFAULT_SEARCH_SETTINGS = {
        fieldCustom: "",
        fieldType: "",
        fieldNature: "",
        fieldNewPokemon: true,
        fieldShiny: true,
        fieldAlbino: true,
        fieldMelanistic: true,
        fieldPrehistoric: true,
        fieldDelta: true,
        fieldMega: true,
        fieldStarter: true,
        fieldCustomSprite: true,
        fieldMale: true,
        fieldFemale: true,
        fieldNoGender: true,
        fieldCustomPokemon: true,
        fieldCustomPng: false,
        fieldItem: true,
        customItem: true,
    };
    const DEFAULT_SETTINGS = {
        sortSettings : DEFAULT_SORT_SETTINGS,
        searchSettings : DEFAULT_SEARCH_SETTINGS,
    };
    let settings = DEFAULT_SETTINGS;
    let customArray = [];
    let typeArray = [];
    let natureArray = [];
    let dexData = "";
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            API.customSearch();
        });
    });

    const API = {
	loadSettings() {
	    settings = Helpers.loadSettings(SETTINGS_SAVE_KEY, DEFAULT_SETTINGS, settings);
	},
	saveSettings() {
	    Helpers.saveSettings(SETTINGS_SAVE_KEY, settings)
	},
	getSettings() {
	    return settings;
	},
        populateSettings() {
            for (let key in settings.sortSettings) {
                if (!settings.sortSettings.hasOwnProperty(key)) {
                    continue;
                }
                let value = settings.sortSettings[key];
                if (typeof value === 'boolean') {
                    Helpers.toggleSetting(key, value, false);
                    continue;
                }

                if (typeof value === 'string') {
                    Helpers.toggleSetting(key, value, false);
                    continue;
                }
            }
            for (let key in settings.searchSettings) {
                if (!settings.searchSettings.hasOwnProperty(key)) {
                    continue;
                }
                let value = settings.searchSettings[key];
                if (typeof value === 'boolean') {
                    Helpers.toggleSetting(key, value, false);
                    continue;
                }
            }
        },
	settingsChange(element, textElement, customClass, typeClass) {
            if (JSON.stringify(settings.sortSettings).indexOf(element) >= 0) { // field sort settings
                if (settings.sortSettings[element] === false ) {
                    settings.sortSettings[element] = true;
                    if (element === "fieldByBerry") {
                        settings.sortSettings.fieldByMiddle = false;
                        settings.sortSettings.fieldByGrid = false;
                    } else if (element === "fieldByMiddle") {
                        settings.sortSettings.fieldByBerry = false;
                        settings.sortSettings.fieldByGrid = false;
                    } else if (element === "fieldByGrid") {
                        settings.sortSettings.fieldByBerry = false;
                        settings.sortSettings.fieldByMiddle = false;
                    }
                } else if (settings.sortSettings[element] === true ) {
                    settings.sortSettings[element] = false;
                } else if (typeof settings.sortSettings[element] === 'string') {
                    settings.sortSettings[element] = textElement;
                }
            }

            else if (JSON.stringify(settings.searchSettings).indexOf(element) >= 0) { // field search settings
                if (settings.searchSettings[element] === false ) {
                    settings.searchSettings[element] = true;
                } else if (settings.searchSettings[element] === true ) {
                    settings.searchSettings[element] = false;
                } else if (typeof settings.searchSettings[element] === 'string') {
                    if (element === 'fieldType') {
                        if (textElement === 'none') {
                            let tempIndex = typeClass - 1;
                            typeArray.splice(tempIndex, tempIndex);
                            settings.searchSettings.fieldType = typeArray.toString();
                        } else {
                            let tempIndex = typeClass - 1;
                            typeArray[tempIndex] = textElement;
                            settings.searchSettings.fieldType = typeArray.toString();
                        }
                    }
                    if (element === 'fieldNature') {
                        if (textElement === 'none') {
                            let tempIndex = typeClass - 1;
                            natureArray.splice(tempIndex, tempIndex);
                            settings.searchSettings.fieldNature = natureArray.toString();
                        } else {
                            let tempIndex = typeClass - 1;
                            natureArray[tempIndex] = textElement;
                            settings.searchSettings.fieldNature = natureArray.toString();
                        }
                    }
                    if (element === 'fieldCustom') {
                        let tempIndex = customClass - 1;
                        customArray[tempIndex] = textElement;
                        settings.searchSettings.fieldCustom = customArray.toString();
                    }
                }
            }
        },
        setupHTML() {
            document.querySelector('#field_field').insertAdjacentHTML('afterend', TEMPLATES.fieldSortHTML);
            document.querySelector('#field_field').insertAdjacentHTML('afterend', TEMPLATES.fieldSearchHTML);

            const theField = `<div class='numberDiv'><label><input type="text" class="qolsetting" data-key="fieldCustom"/></label><input type='button' value='Remove' id='removeFieldSearch'></div>`;
            const theType = `<div class='typeNumber'> <select name="types" class="qolsetting" data-key="fieldType"> ` + GLOBALS.TYPE_OPTIONS + ` </select> <input type='button' value='Remove' id='removeFieldTypeList'> </div>`;
            const theNature = `<div class='natureNumber'> <select name="natures" class="qolsetting" data-key="fieldNature"> ` + GLOBALS.NATURE_OPTIONS + ` </select> <input type='button' value='Remove' id='removeFieldNature'> </div>`;
            customArray = settings.searchSettings.fieldCustom.split(',');
            typeArray = settings.searchSettings.fieldType.split(',');
            natureArray = settings.searchSettings.fieldNature.split(',');
            Helpers.setupFieldArrayHTML(customArray, 'searchkeys', theField, 'numberDiv');
            Helpers.setupFieldArrayHTML(typeArray, 'fieldTypes', theType, 'typeNumber');
            Helpers.setupFieldArrayHTML(natureArray, 'natureTypes', theNature, 'natureNumber');

            dexData = GLOBALS.DEX_DATA.split(',');
        },
        setupCSS() {
            let fieldOrderCssColor = $('#field_field').css('background-color');
            let fieldOrderCssBorder = $('#field_field').css('border');
            $("#fieldorder").css("background-color", ""+fieldOrderCssColor+"");
            $("#fieldorder").css("border", ""+fieldOrderCssBorder+"");
            $("#fieldsearch").css("background-color", ""+fieldOrderCssColor+"");
            $("#fieldsearch").css("border", ""+fieldOrderCssBorder+"");
        },
        setupObserver() {
            observer.observe(document.querySelector('#field_field'), {
                childList: true,
                attributeFilter: ['class'],
            });
            observer.observe(document.querySelector('#fieldorder'), {
                childList: true,
            });
        },
        setupHandlers() {
            $(document).on('click input', '#fieldorder, #field_field, #field_berries, #field_nav', (function() { //field sort
                API.customSearch();
            }));

            $(window).on('load', (function() {
                API.customSearch();
            }));

            document.addEventListener("keydown", function(event) {
                API.customSearch();
            });

            $(document).on('click', '#addFieldSearch', (function() { //add field text field
                PFQoL.fieldAddTextField();
            }));

            $(document).on('click', '#removeFieldSearch', (function() { //remove field text field
                PFQoL.fieldRemoveTextField(this, $(this).parent().find('input').val());
            }));

            $(document).on('click', '#addFieldNatureSearch', (function() { //add field nature search
                PFQoL.fieldAddNatureSearch();
            }));

            $(document).on('click', '#removeFieldNature', (function() { //remove field nature search
                API.removeNatureSearch(this, $(this).parent().find('select').val());
            }));

            $(document).on('click', '#addFieldTypeList', (function() { //add field type list
                PFQoL.fieldAddTypeList();
            }));

            $(document).on('click', '#removeFieldTypeList', (function() { //remove field type list
                API.removeTypeList(this, $(this).parent().find('select').val());
            }));
        },
        // specific
        customSearch() {
            $('input.qolalone').on('change', function() { //only 1 textbox may be true
                $('input.qolalone').not(this).prop('checked', false);
            });

            if (settings.sortSettings.fieldByBerry === true) { //sort field by berries
                $('.fieldmon').removeClass("qolSortMiddle");
                $('.field').removeClass("qolGridField");
                $('.fieldmon').removeClass("qolGridPokeSize");
                $('.fieldmon>img').removeClass("qolGridPokeImg");

                if($('#field_field [data-flavour*="any-"]').length) {
                    $('#field_field [data-flavour*="any-"]').addClass("qolAnyBerry");
                }
                if($('#field_field [data-flavour*="sour-"]').length) {
                    $('#field_field [data-flavour*="sour-"]').addClass("qolSourBerry");
                }
                if($('#field_field [data-flavour*="spicy-"]').length) {
                    $('#field_field [data-flavour*="spicy-"]').addClass("qolSpicyBerry");
                }
                if($('#field_field [data-flavour*="dry-"]').length) {
                    $('#field_field [data-flavour*="dry-"]').addClass("qolDryBerry");
                }
                if($('#field_field [data-flavour*="sweet-"]').length) {
                    $('#field_field [data-flavour*="sweet-"]').addClass("qolSweetBerry");
                }
                if($('#field_field [data-flavour*="bitter-"]').length) {
                    $('#field_field [data-flavour*="bitter-"]').addClass("qolBitterBerry");
                }
            }
            else if (settings.sortSettings.fieldByMiddle === true) { //sort field in the middle
                $('#field_field [data-flavour*="any-"]').removeClass("qolAnyBerry");
                $('#field_field [data-flavour*="sour-"]').removeClass("qolSourBerry");
                $('#field_field [data-flavour*="spicy-"]').removeClass("qolSpicyBerry");
                $('#field_field [data-flavour*="dry-"]').removeClass("qolDryBerry");
                $('#field_field [data-flavour*="sweet-"]').removeClass("qolSweetBerry");
                $('#field_field [data-flavour*="bitter-"]').removeClass("qolBitterBerry");
                $('.field').removeClass("qolGridField");
                $('.fieldmon').removeClass("qolGridPokeSize");
                $('.fieldmon>img').removeClass("qolGridPokeImg");

                $('.fieldmon').addClass("qolSortMiddle");
            }
            else if (settings.sortSettings.fieldByGrid === true) { //sort field in a grid
                $('#field_field [data-flavour*="any-"]').removeClass("qolAnyBerry");
                $('#field_field [data-flavour*="sour-"]').removeClass("qolSourBerry");
                $('#field_field [data-flavour*="spicy-"]').removeClass("qolSpicyBerry");
                $('#field_field [data-flavour*="dry-"]').removeClass("qolDryBerry");
                $('#field_field [data-flavour*="sweet-"]').removeClass("qolSweetBerry");
                $('#field_field [data-flavour*="bitter-"]').removeClass("qolBitterBerry");
                $('.fieldmon').removeClass("qolSortMiddle");

                $('.field').addClass("qolGridField");
                $('.fieldmon').addClass("qolGridPokeSize");
                $('.fieldmon>img').addClass("qolGridPokeImg");
            }
            else {
                $('#field_field [data-flavour*="any-"]').removeClass("qolAnyBerry");
                $('#field_field [data-flavour*="sour-"]').removeClass("qolSourBerry");
                $('#field_field [data-flavour*="spicy-"]').removeClass("qolSpicyBerry");
                $('#field_field [data-flavour*="dry-"]').removeClass("qolDryBerry");
                $('#field_field [data-flavour*="sweet-"]').removeClass("qolSweetBerry");
                $('#field_field [data-flavour*="bitter-"]').removeClass("qolBitterBerry");
                $('.fieldmon').removeClass("qolSortMiddle");
                $('.field').removeClass("qolGridField");
                $('.fieldmon').removeClass("qolGridPokeSize");
                $('.fieldmon>img').removeClass("qolGridPokeImg");
            }

            //Pokémon click counter
            if (settings.sortSettings.fieldClickCount === false) {
                $('#pokemonclickcount').remove();
            } else if (settings.sortSettings.fieldClickCount === true) {
                let pokemonFed = $(".fieldmon").map(function(){return $(this).attr("data-fed");}).get();

                let pokemonClicked = 0;
                for (var i = 0; i < pokemonFed.length; i++) {
                    pokemonClicked += pokemonFed[i] << 0;
                }

                let pokemonInField = $('.fieldpkmncount').text();

                $('#pokemonclickcount').remove(); //make sure no duplicates are being produced
                document.querySelector('.fielddata').insertAdjacentHTML('beforeend','<div id="pokemonclickcount">'+pokemonClicked+' / '+pokemonInField+' Clicked</div>');
                if (JSON.stringify(pokemonClicked) === pokemonInField) {
                    $('#pokemonclickcount').css({"color" : "#059121"});
                }
                if (pokemonClicked !== JSON.parse(pokemonInField)) {
                    $('#pokemonclickcount').css({"color" : "#a30323"});
                }
            }

            console.log('search activated');
            
        }, // customSearch
        fieldAddTypeList() {
            API.addSelectSearch('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS, 'removeFieldTypeList', 'fieldTypes');
        },
        fieldAddNatureSearch() {
            API.addSelectSearch('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS, 'removeFieldNature', 'natureTypes');
        },
        removeTypeList(byebye, key) {
             //when textfield is removed, the value will be deleted from the localstorage
            typeArray = $.grep(typeArray, function(value) {
                return value != key;
            });
            settings.searchSettings.fieldType = typeArray.toString()

            API.saveSettings();
            $(byebye).parent().remove();

            let i;
            for(i = 0; i < $('#fieldTypes>div').length; i++) {
                let rightDiv = i + 1;
                $('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
            }
        },
        removeNatureSearch(byebye, key) {
            natureArray = $.grep(natureArray, function(value) { //when textfield is removed, the value will be deleted from the localstorage
                return value != key;
            });
            settings.searchSettings.fieldNature = natureArray.toString()

            API.saveSettings();
            $(byebye).parent().remove();

            let i;
            for(i = 0; i < $('#natureTypes>div').length; i++) {
                let rightDiv = i + 1;
                $('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
            }
        },

        fieldAddTextField() {
            let theField = `<div class='numberDiv'><label><input type="text" class="qolsetting" data-key="fieldCustom"/></label><input type='button' value='Remove' id='removeFieldSearch'></div>`;
            let numberDiv = $('#searchkeys>div').length;
            $('#searchkeys').append(theField);
            $('.numberDiv').removeClass('numberDiv').addClass(""+numberDiv+"");
        },
        fieldRemoveTextField(byebye, key) {
            customArray = $.grep(customArray, function(value) { //when textfield is removed, the value will be deleted from the localstorage
                return value != key;
            });
            settings.searchSettings.fieldCustom = customArray.toString()

            API.saveSettings();
            $(byebye).parent().remove();

            let i;
            for(i = 0; i < $('#searchkeys>div').length; i++) {
                let rightDiv = i + 1;
                $('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
            }
        },
    }; // API

    return API;
})();