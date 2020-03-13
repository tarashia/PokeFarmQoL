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
                API.fieldAddTextField();
            }));

            $(document).on('click', '#removeFieldSearch', (function() { //remove field text field
                API.fieldRemoveTextField(this, $(this).parent().find('input').val());
            }));

            $(document).on('click', '#addFieldNatureSearch', (function() { //add field nature search
                API.fieldAddNatureSearch();
            }));

            $(document).on('click', '#removeFieldNature', (function() { //remove field nature search
                natureArray = API.removeSelectSearch(typeArray, this, $(this).parent().find('select').val(), 'fieldNature', 'natureTypes')
                API.saveSettings();
                API.customSearch();
            }));

            $(document).on('click', '#addFieldTypeList', (function() { //add field type list
                API.fieldAddTypeList();
            }));

            $(document).on('click', '#removeFieldTypeList', (function() { //remove field type list
                typeArray = API.removeSelectSearch(typeArray, this, $(this).parent().find('select').val(), 'fieldType', 'fieldTypes')
                API.saveSettings();
                API.customSearch();
            }));

            $(document).on('change', '.qolsetting', (function() {
                API.loadSettings();
                API.customSearch();
                API.saveSettings();
            }));

            $(document).on('input', '.qolsetting', (function() { //Changes QoL settings
                API.settingsChange(this.getAttribute('data-key'), $(this).val(), $(this).parent().parent().attr('class'), $(this).parent().attr('class'));
                API.customSearch();
                API.saveSettings();
            }));
        },
        // specific
        customSearch() {

            /////////////////////////////////////////////////
            //////////////////// sorting ////////////////////
            /////////////////////////////////////////////////
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

            /////////////////////////////////////////////////
            /////////////////// searching ///////////////////
            /////////////////////////////////////////////////
            let dexData = GLOBALS.DEX_DATA;
            let bigImgs = document.querySelectorAll('.publicfoundme')
            if(bigImgs !== null) {
                bigImgs.forEach((b) => {$(b).removeClass('publicfoundme')})
            }

            // search whatever you want to find in the fields
            let lengthEggs = 0;

            //search values depending on settings
            const checkboxValueArray = [];

            //loop to find all search values for the top checkboxes
            for (let key in settings) {
                let value = settings[key];
                if (value === true && Helpers.publicFieldsKeyIsTopCheckbox(key)) {
                    let searchKey = GLOBALS.PUBLIC_FIELDS_SEARCH_DATA[GLOBALS.PUBLIC_FIELDS_SEARCH_DATA.indexOf(key) + 1];
                    checkboxValueArray.push(searchKey);
                }
            }

            //loop to find the top checkboxes
            for (let key in checkboxValueArray) {
                let value = checkboxValueArray[key];

                //img[TITLE] search. everything aside from new pokémon & new eggs || Image for Delta fails
                if (value.startsWith('[')) {
                    if ($('img[title*="'+value+'"]').length) {
                        let searchResult = GLOBALS.PUBLIC_FIELDS_SEARCH_DATA[GLOBALS.PUBLIC_FIELDS_SEARCH_DATA.indexOf(value) + 1]; //type of Pokémon found
                        let imgResult = $("img[title*='"+value+"']").length+" "+searchResult; //amount + type found
                        let imgFitResult = GLOBALS.PUBLIC_FIELDS_SEARCH_DATA[GLOBALS.PUBLIC_FIELDS_SEARCH_DATA.indexOf(value) + 2]; //image for type of Pokémon
                        let imgSearch = $('img[title*="'+value+'"]');
                        let bigImg = imgSearch.parent().prev().children('img.big');
                        $(bigImg).addClass('publicfoundme');
                    }
                }
                //new Pokémon search.
                if (value === 'Pokémon') {
                    if ($("#field .tooltip_content:contains("+value+")").length) {
                        let searchResult = GLOBALS.PUBLIC_FIELDS_SEARCH_DATA[GLOBALS.PUBLIC_FIELDS_SEARCH_DATA.indexOf(value) + 1];
                        let tooltipResult = $("#field .tooltip_content:contains("+value+")").length+" "+searchResult;
                        let imgFitResult = GLOBALS.PUBLIC_FIELDS_SEARCH_DATA[GLOBALS.PUBLIC_FIELDS_SEARCH_DATA.indexOf(value) + 2];
                        let imgSearch = $("#field .tooltip_content:contains("+value+")")
                        let bigImg = imgSearch.prev().children('img.big');
                        $(bigImg).addClass('publicfoundme');
                    }
                }
                //new egg search.
                if (value === "Egg") { //tooltip_content search. new egg.
                    if ($("#field .tooltip_content:contains("+value+")").length) {
                        eggNoDuplicateArray = settings.NewEggDuplicate.split(',');
                        eggNoDuplicateArray = eggNoDuplicateArray.filter(v=>v!='');

                        let eggList = eggNoDuplicateArray.length;
                        let i;
                        for (i = 0; i < eggList; i++) {
                            let value = eggNoDuplicateArray[i];
                            if ($('img[src*="//'+value+'"]').length) {
                                lengthEggs = $('img[src*="//'+value+'"]').length + lengthEggs;
                            }
                        }

                        let allEggFinds = $("#field .tooltip_content:contains("+value+")").length;
                        let allKnownEggFinds = $("#field .tooltip_content:contains( "+value+")").length;
                        let newEggDup = lengthEggs / 2;
                        let newEggFinds = allEggFinds - allKnownEggFinds - newEggDup;

                        let searchResult = GLOBALS.PUBLIC_FIELDS_SEARCH_DATA[GLOBALS.PUBLIC_FIELDS_SEARCH_DATA.indexOf(value) + 1];
                        let newEggResult = newEggFinds+" "+searchResult;
                        let imgFitResult = GLOBALS.PUBLIC_FIELDS_SEARCH_DATA[GLOBALS.PUBLIC_FIELDS_SEARCH_DATA.indexOf(value) + 2];

                        if (newEggFinds <1) {
                            let thisDoesNothing = 0;
                        } else {
                            let imgSearch = $("#field .tooltip_content:contains("+value+")");
                            let bigImg = imgSearch.prev().children('img.big');
                            $(bigImg).addClass('publicfoundme');
                            let shelterImgRemove = $("#field .tooltip_content:contains( "+value+")");
                            let bigImgRemove = shelterImgRemove.prev().children('img.big');
                            $(bigImgRemove).removeClass('publicfoundme');
                        }
                    }
                }

                //New egg no duplicates
                let newEggAdopt = '';
                if ($('#field .lock').next('.tooltip_content:contains("Egg")').length && $('#field .lock').next('.tooltip_content:not(:contains(" Egg")').length < 1) {
                    newEggAdopt = $('#field .lock').children('img').attr('src').substring(2);
                }

                if ($('div.panel:contains("Adoption successful!")').length) {
                    if ($('.egg').css('background-image') === 'url("https://'+newEggAdopt+'")') {
                        eggNoDuplicateArray = settings.NewEggDuplicate.split(',');
                        eggNoDuplicateArray.push(newEggAdopt);
                        settings.NewEggDuplicate = eggNoDuplicateArray.toString();
                        newEggAdopt = "";
                    }
                }
            }

            //loop to find all search genders for the custom
            const checkboxValueArrayCustom = [];
            for (let key in settings) {
                let value = settings[key];
                if (value === true) {
                    if(key === 'findMale' || key === 'findFemale' || key === 'findNoGender') {
                        let searchKey = GLOBALS.PUBLIC_FIELDS_SEARCH_DATA[GLOBALS.PUBLIC_FIELDS_SEARCH_DATA.indexOf(key) + 1];
                        checkboxValueArrayCustom.push(searchKey);
                    }
                }
            }

            //loop to find all the custom search parameters
            let customSearchAmount = customArray.length;
            for (let i = 0; i < customSearchAmount; i++) {
                let value = customArray[i];
                if (value != "") {
                    //custom pokemon search
                    if (settings.customPokemon === true) {
                        //Males
                        if (checkboxValueArrayCustom.indexOf("[M]") > -1) {
                            if ($("#field .tooltip_content:containsIN("+value+") img[title*='[M]']").length) {
                                let searchResult = value;
                                let imgGender = GLOBALS.PUBLIC_FIELDS_SEARCH_DATA[GLOBALS.PUBLIC_FIELDS_SEARCH_DATA.indexOf("[M]") +2];
                                let tooltipResult = $("#field .tooltip_content:containsIN("+value+") img[title*='[M]']").length+" Male "+imgGender+" "+searchResult;
                                let imgFitResult = `<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952">`;
                                let imgSearch = $("#field .tooltip_content:containsIN("+value+") img[title*='[M]']")
                                let bigImg = imgSearch.parent().prev().children('img.big');
                                $(bigImg).addClass('publicfoundme');
                            }
                        }
                        //Females
                        if (checkboxValueArrayCustom.indexOf("[F]") > -1) {
                            if ($("#field .tooltip_content:containsIN("+value+") img[title*='[F]']").length) {
                                let searchResult = value;
                                let imgGender = GLOBALS.PUBLIC_FIELDS_SEARCH_DATA[GLOBALS.PUBLIC_FIELDS_SEARCH_DATA.indexOf("[F]") +2];
                                let tooltipResult = $("#field .tooltip_content:containsIN("+value+") img[title*='[F]']").length+" Female "+imgGender+" "+searchResult;
                                let imgFitResult = `<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952">`;
                                let imgSearch = $("#field .tooltip_content:containsIN("+value+") img[title*='[F]']")
                                let bigImg = imgSearch.parent().prev().children('img.big');
                                $(bigImg).addClass('publicfoundme');
                            }
                        }
                        //Genderless
                        if (checkboxValueArrayCustom.indexOf("[N]") > -1) {
                            if ($("#field .tooltip_content:containsIN("+value+") img[title*='[N]']").length) {
                                let searchResult = value;
                                let imgGender = GLOBALS.PUBLIC_FIELDS_SEARCH_DATA[GLOBALS.PUBLIC_FIELDS_SEARCH_DATA.indexOf("[N]") +2];
                                let tooltipResult = $("#field .tooltip_content:containsIN("+value+") img[title*='[N]']").length+" Genderless "+imgGender+" "+searchResult;
                                let imgFitResult = `<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952">`;
                                let imgSearch = $("#field .tooltip_content:containsIN("+value+") img[title*='[N]']")
                                let bigImg = imgSearch.parent().prev().children('img.big');
                                $(bigImg).addClass('publicfoundme');
                            }
                        }
                        //No genders
                        if (checkboxValueArrayCustom.length === 0) {
                            if ($('#field .tooltip_content:containsIN('+value+'):not(:containsIN("Egg"))').length) {
                                let searchResult = value;
                                let tooltipResult = $('#field .tooltip_content:containsIN('+value+'):not(:containsIN("Egg"))').length+" "+searchResult;
                                let imgFitResult = `<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952">`;
                                let imgSearch = $('#field .tooltip_content:containsIN('+value+'):not(:containsIN("Egg"))')
                                let bigImg = imgSearch.parent().prev().children('img.big');
                                $(bigImg).addClass('publicfoundme');
                            }
                        }
                    }

                    //custom egg
                    if (settings.customEgg === true) {
                        let name_matches = $('#field .tooltip_content:containsIN('+value+'):contains("Egg")');
                        let num_matches = name_matches.length;

                        if (num_matches) {
                            let searchResult = value;
                            let tooltipResult = num_matches+" "+searchResult;
                            let imgFitResult = `<img src="//pfq-static.com/img/pkmn/egg.png/t=1451852195">`;
                            let imgSearch = name_matches;
                            let bigImg = imgSearch.prev().children('img.big');
                            $(bigImg).addClass('publicfoundme');
                        }
                    }

                    //imgSearch with Pokémon
                    if (settings.customPng === true) {
                        if ($('#field img[src*="'+value+'"]').length) {
                            let searchResult = $('#field img[src*="'+value+'"]').parent().next().text().split('(')[0]
                            let tooltipResult = $('#field img[src*="'+value+'"]').length+" "+searchResult+' (Custom img search)';
                            let imgFitResult = `<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952">`;
                            let imgSearch = $('#field img[src*="'+value+'"]');
                            $(imgSearch).addClass('publicfoundme');
                        }
                    }
                }
            }

            //loop to find all the types

            const filteredTypeArray = typeArray.filter(v=>v!='');

            if (filteredTypeArray.length > 0) {
                for (let i = 0; i < filteredTypeArray.length; i++) {
                    let value = filteredTypeArray[i];
                    let foundType = GLOBALS.SHELTER_TYPE_TABLE[GLOBALS.SHELTER_TYPE_TABLE.indexOf(value) + 2];

                    if (settings.findTypeEgg === true) {
                        let typePokemonNames = [];
                        $('#field>.tooltip_content:contains("Egg")').each(function() {
                            let searchPokemon = ($(this).text().split(' ')[0]);
                            let searchPokemonIndex = dexData.indexOf('"'+searchPokemon+'"');
                            let searchTypeOne = dexData[searchPokemonIndex + 1];
                            let searchTypeTwo = dexData[searchPokemonIndex + 2];

                            if ((searchTypeOne === value) || (searchTypeTwo === value)) {
                                typePokemonNames.push(searchPokemon);
                            }
                        })

                        for (let o = 0; o < typePokemonNames.length; o++) {
                            let imgSearch = $("#field .tooltip_content:containsIN('"+typePokemonNames[o]+" Egg')");
                            let bigImg = imgSearch.prev().children('img.big');
                            $(bigImg).addClass('publicfoundme');
                        }
                    }

                    if (settings.findTypePokemon === true) {
                        let typePokemonNames = [];

                        $('#field>.tooltip_content').not(':contains("Egg")').each(function() {
                            let searchPokemon = ($(this).text().split(' ')[0]);
                            let searchPokemonIndex = dexData.indexOf('"'+searchPokemon+'"');
                            let searchTypeOne = dexData[searchPokemonIndex + 1];
                            let searchTypeTwo = dexData[searchPokemonIndex + 2];
                            if ((searchTypeOne === value) || (searchTypeTwo === value)) {
                                typePokemonNames.push(searchPokemon);
                            }
                        })

                        let typeImgStandOutLength = typePokemonNames.length;
                        for (let o = 0; o < typeImgStandOutLength; o++) {
                            let imgSearch = $("#field .tooltip_content:containsIN('"+typePokemonNames[o]+" (')")
                            let bigImg = imgSearch.prev().children('img.big');
                            $(bigImg).addClass('publicfoundme');
                        }
                    }
                }
            }
            
        }, // customSearch
        fieldAddTypeList() {
            API.addSelectSearch('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS, 'removeFieldTypeList', 'fieldTypes');
        },
        fieldAddNatureSearch() {
            API.addSelectSearch('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS, 'removeFieldNature', 'natureTypes');
        },
        addSelectSearch(cls, name, data_key, options, id, divParent) {
            let theList = `<div class='${cls}'> <select name='${name}' class="qolsetting" data-key='${data_key}'> ${options} </select> <input type='button' value='Remove' id='${id}'> </div>`;
            let number = (`#${divParent}>div`).length;
            $(`#${divParent}`).append(theList);
            $(`.${cls}`).removeClass(cls).addClass(""+number+"");
        },
        removeSelectSearch(arr, byebye, key, settingsKey, divParent) {
            arr = $.grep(arr, function(value) { return value != key; });
            settings.searchSettings[settingsKey] = arr.toString();

            $(byebye).parent().remove();

            for(let i = 0; i < $(`#${divParent}>div`).length; i++) {
                let rightDiv = i + 1;
                $('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
            }

            return arr;
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
