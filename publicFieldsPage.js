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
        releaseSelectAll : true,
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
            $(document).on('click', '*[data-menu="release"]', (function() { //select all feature
                API.releaseEnableReleaseAll();
            }));

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
                PFQoL.fieldRemoveNatureSearch(this, $(this).parent().find('select').val());
            }));

            $(document).on('click', '#addFieldTypeList', (function() { //add field type list
                PFQoL.fieldAddTypeList();
            }));

            $(document).on('click', '#removeFieldTypeList', (function() { //remove field type list
                PFQoL.fieldRemoveTypeList(this, $(this).parent().find('select').val());
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
        }, // customSearch
        moveEnableReleaseAll() {
            if(settings.releaseSelectAll === true) {
                document.querySelector('.dialog>div>div>div>div>button').insertAdjacentHTML('afterend', '<label id="movefieldselectall"><input id="movefieldselectallcheckbox" type="checkbox">Select all  </label><label id="movefieldselectany"><input id="movefieldselectanycheckbox" type="checkbox">Select Any  </label><label id="movefieldselectsour"><input id="movefieldselectsourcheckbox" type="checkbox">Select Sour  </label><label id="movefieldselectspicy"><input id="movefieldselectspicycheckbox" type="checkbox">Select Spicy</label><label id="movefieldselectdry"><input id="movefieldselectdrycheckbox" type="checkbox">Select Dry  </label><label id="movefieldselectsweet"><input id="movefieldselectsweetcheckbox" type="checkbox">Select Sweet  </label><label id="movefieldselectbitter"><input id="movefieldselectbittercheckbox" type="checkbox">Select Bitter  </label>');
                $('#movefieldselectallcheckbox').click(function() {
                    $('#massmovelist>ul>li>label>input').not(this).prop('checked', this.checked);
                });

                $('#movefieldselectanycheckbox').click(function() {
                    let selectAny = $('.icons:contains("Any")').prev().prev().prev('input');
                    $(selectAny).not(this).prop('checked', this.checked);
                });

                $('#movefieldselectsourcheckbox').click(function() {
                    let selectSour = $('.icons:contains("Sour")').prev().prev().prev('input');
                    $(selectSour).not(this).prop('checked', this.checked);
                });

                $('#movefieldselectspicycheckbox').click(function() {
                    let selectSpicy = $('.icons:contains("Spicy")').prev().prev().prev('input');
                    $(selectSpicy).not(this).prop('checked', this.checked);
                });

                $('#movefieldselectdrycheckbox').click(function() {
                    let selectDry = $('.icons:contains("Dry")').prev().prev().prev('input');
                    $(selectDry).not(this).prop('checked', this.checked);
                });

                $('#movefieldselectsweetcheckbox').click(function() {
                    let selectSweet = $('.icons:contains("Sweet")').prev().prev().prev('input');
                    $(selectSweet).not(this).prop('checked', this.checked);
                });

                $('#movefieldselectbittercheckbox').click(function() {
                    let selectBitter = $('.icons:contains("Bitter")').prev().prev().prev('input');
                    $(selectBitter).not(this).prop('checked', this.checked);
                });
            } // if
        }, // moveEnableReleaseAll
        releaseEnableReleaseAll() {
            if(settings.releaseSelectAll === true) {
                document.querySelector('.dialog>div>div>div>div>button').insertAdjacentHTML('afterend', '<label id="selectallfield"><input id="selectallfieldcheckbox" type="checkbox">Select all  </label><label id="selectallfieldany"><input id="selectallfieldanycheckbox" type="checkbox">Select Any  </label><label id="selectallfieldsour"><input id="selectallfieldsourcheckbox" type="checkbox">Select Sour  </label><label id="selectallfieldspicy"><input id="selectallfieldspicycheckbox" type="checkbox">Select Spicy</label><label id="selectallfielddry"><input id="selectallfielddrycheckbox" type="checkbox">Select Dry  </label><label id="selectallfieldsweet"><input id="selectallfieldsweetcheckbox" type="checkbox">Select Sweet  </label><label id="selectallfieldbitter"><input id="selectallfieldbittercheckbox" type="checkbox">Select Bitter  </label>');
                $('#selectallfieldcheckbox').click(function() {
                    $('#massreleaselist>ul>li>label>input').not(this).prop('checked', this.checked);
                });

                $('#selectallfieldanycheckbox').click(function() {
                    let selectAny = $('.icons:contains("Any")').prev().prev().prev('input');
                    $(selectAny).not(this).prop('checked', this.checked);
                });

                $('#selectallfieldsourcheckbox').click(function() {
                    let selectSour = $('.icons:contains("Sour")').prev().prev().prev('input');
                    $(selectSour).not(this).prop('checked', this.checked);
                });

                $('#selectallfieldspicycheckbox').click(function() {
                    let selectSpicy = $('.icons:contains("Spicy")').prev().prev().prev('input');
                    $(selectSpicy).not(this).prop('checked', this.checked);
                });

                $('#selectallfielddrycheckbox').click(function() {
                    let selectDry = $('.icons:contains("Dry")').prev().prev().prev('input');
                    $(selectDry).not(this).prop('checked', this.checked);
                });

                $('#selectallfieldsweetcheckbox').click(function() {
                    let selectSweet = $('.icons:contains("Sweet")').prev().prev().prev('input');
                    $(selectSweet).not(this).prop('checked', this.checked);
                });

                $('#selectallfieldbittercheckbox').click(function() {
                    let selectBitter = $('.icons:contains("Bitter")').prev().prev().prev('input');
                    $(selectBitter).not(this).prop('checked', this.checked);
                });
            } // if
        }, // releaseAll
    };
    

    return API;
})();

        
