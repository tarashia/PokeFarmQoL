class ShelterPage extends Page {
    constructor() {
        super('QoLShelter', {
            findCustom: "",
            findType: "",
            findTypeEgg: true,
            findTypePokemon: false,
            findNewEgg: true,
            NewEggDuplicate: "",
            findNewPokemon: true,
            findShiny: true,
            findAlbino: true,
            findMelanistic: true,
            findPrehistoric: true,
            findDelta: true,
            findMega: true,
            findStarter: true,
            findCustomSprite: true,
            findMale: true,
            findFemale: true,
            findNoGender: true,
            customEgg: true,
            customPokemon: true,
            customPng: false,
            shelterGrid: true,
        }, '/shelter')
        this.customArray = [];
        this.typeArray = [];
        this.eggNoDuplicateArray = [];
        const obj = this
        this.observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                obj.customSearch();
            });
        });
    }

    setupHTML() {
        $('.tabbed_interface.horizontal>div').removeClass('tab-active');
        $('.tabbed_interface.horizontal>ul>li').removeClass('tab-active');
        document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterbegin', '<li class="tab-active"><label>Search</label></li>');
        document.querySelector('.tabbed_interface.horizontal>ul>li').insertAdjacentHTML('afterend', '<li class=""><label>Sort</label></li>');
        document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterend', TEMPLATES.shelterSettingsHTML);
        document.querySelector('#shelteroptionsqol').insertAdjacentHTML('afterend', '<div id="qolsheltersort"><label><input type="checkbox" class="qolsetting" data-key="shelterGrid"/><span>Sort by Grid</span></label>');
        $('#shelteroptionsqol').addClass('tab-active');

        document.querySelector('#sheltercommands').insertAdjacentHTML('beforebegin', '<div id="sheltersuccess"></div>');

        const theField = Helpers.textSearchDiv('numberDiv', 'findCustom', 'removeShelterTextfield', 'customArray')
        const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'findType', GLOBALS.TYPE_OPTIONS,
                                             'removeShelterTypeList', 'fieldTypes', 'typeArray');

        this.customArray = this.settings.findCustom.split(',');
        this.typeArray = this.settings.findType.split(',');

        Helpers.setupFieldArrayHTML(this.customArray, 'searchkeys', theField, 'numberDiv')
        Helpers.setupFieldArrayHTML(this.typeArray, 'shelterTypes', theType, 'typeNumber')

        $('[data-shelter=reload]').addClass('customSearchOnClick');
        $('[data-shelter=whiteflute]').addClass('customSearchOnClick');
        $('[data-shelter=blackflute]').addClass('customSearchOnClick');
    }
    setupCSS() {
        let shelterSuccessCss = $('#sheltercommands').css('background-color');
        $('#sheltersuccess').css('background-color', shelterSuccessCss);
    }
    setupObserver() {
        this.observer.observe(document.querySelector('#shelterarea'), {
            childList: true,
        });
    }
    setupHandlers() {
        const obj = this
        $(document).on('change', '#shelteroptionsqol input', (function() { //shelter search
            obj.loadSettings();
            obj.customSearch();
            obj.saveSettings();
        }));

        $(document).on('change', '.qolsetting', (function() {
            obj.loadSettings();
            obj.customSearch();
            obj.saveSettings();
        }));

        $(document).on('input', '.qolsetting', (function() { //Changes QoL settings
            obj.settingsChange(this.getAttribute('data-key'),
                               $(this).val(),
                               $(this).parent().parent().attr('class'),
                               $(this).parent().attr('class'),
                               (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
            obj.customSearch();
            obj.saveSettings();
        }));

        $('.customSearchOnClick').on('click', (function() {
            obj.loadSettings();
            obj.customSearch();
            obj.saveSettings();
        }));

        $('*[data-hatch]').on('click', (function() {
            obj.loadSettings();
            obj.removeEgg($(this).parent().prev().prev().prev().children().css('background-image'));
            obj.saveSettings();
        }));

        $(document).on('click', '#addShelterTextfield', (function() { //add shelter text field
            obj.addTextField();
            obj.saveSettings();
        }));

        $(document).on('click', '#removeShelterTextfield', (function() { //remove shelter text field
            obj.removeTextField(this, $(this).parent().find('input').val());
            obj.saveSettings();
            obj.customSearch();
        }));

        $(document).on('click', '#addShelterTypeList', (function() { //add shelter type list
            obj.addTypeList();
            obj.customSearch();
        }));

        $(document).on('click', '#removeShelterTypeList', (function() { //remove shelter type list
            obj.removeTypeList(this, $(this).parent().find('select').val());
            obj.saveSettings();
            obj.customSearch();
        }));
    }
    addTextField() {
        const theField = Helpers.textSearchDiv('numberDiv', 'findCustom', 'removeShelterTextfield', 'customArray')
        let numberDiv = $('#searchkeys>div').length;
        $('#searchkeys').append(theField);
        $('.numberDiv').removeClass('numberDiv').addClass(""+numberDiv+"");
    }
    removeTextField(byebye, key) {
        this.customArray = $.grep(this.customArray, function(value) { //when textfield is removed, the value will be deleted from the localstorage
            return value != key;
        });
        this.settings.findCustom = this.customArray.toString()

        $(byebye).parent().remove();

        let i;
        for(i = 0; i < $('#searchkeys>div').length; i++) {
            let rightDiv = i + 1;
            $('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
        }
    }
    addTypeList() {
        const theList = Helpers.selectSearchDiv('typeNumber', 'types', 'findType', GLOBALS.TYPE_OPTIONS,
                                             'removeShelterTypeList', 'fieldTypes', 'typeArray');
        let numberTypes = $('#shelterTypes>div').length;
        $('#shelterTypes').append(theList);
        $('.typeNumber').removeClass('typeNumber').addClass(""+numberTypes+"");
    }
    removeTypeList(byebye, key) {
        this.typeArray = $.grep(this.typeArray, function(value) {
            return value != key;
        });
        this.settings.findType = this.typeArray.toString()

        $(byebye).parent().remove();

        let i;
        for(i = 0; i < $('#shelterTypes>div').length; i++) {
            let rightDiv = i + 1;
            $('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
        }
    }
    customSearch() {
        let dexData = GLOBALS.DEX_DATA;
        // search whatever you want to find in the shelter & grid
        let lengthEggs = 0;

        //sort in grid
        $('#shelterarea').removeClass('qolshelterareagrid');
        $('.mq2 #shelterarea').removeClass('qolshelterareagridmq2');
        $('#shelterarea .tooltip_content').removeClass('qoltooltipgrid');
        $('#shelterpage #shelter #shelterarea > .pokemon').removeClass('qolpokemongrid');
        $('#sheltergridthingy').remove();

        if (this.settings.shelterGrid === true) { //shelter grid
            $('#shelterarea').addClass('qolshelterareagrid');
            $('.mq2 #shelterarea').addClass('qolshelterareagridmq2');
            $('#shelterarea .tooltip_content').addClass('qoltooltipgrid');
            $('#shelterpage #shelter #shelterarea > .pokemon').addClass('qolpokemongrid');
            $('#shelterpage #shelter #shelterarea:before').css({'display' : 'none!important'});
            $('<pseudo:before>').attr('style', 'display: none!important');
            $('head').append('<style id="sheltergridthingy">#shelterarea:before{display:none !important;}</style>');
        }

        //search values depending on settings
        const shelterValueArray = [];
        //emptying the sheltersuccess div to avoid duplicates
        document.querySelector('#sheltersuccess').innerHTML="";
        $('#shelterarea>div>img').removeClass('shelterfoundme');

        //loop to find all search values for the top checkboxes
        for (let key in this.settings) {
            let value = this.settings[key];
            if (value === true && Helpers.shelterKeyIsTopCheckbox(key)) {
                let searchKey = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(key) + 1];
                shelterValueArray.push(searchKey);
            }
        }

        //loop to find the top checkboxes in the shelter
        for (let key in shelterValueArray) {
            let value = shelterValueArray[key];

            //img[TITLE] search. everything aside from new pokémon & new eggs || Image for Delta fails
            if (value.startsWith('[')) {
                if ($('img[title*="'+value+'"]').length) {
                    let searchResult = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(value) + 1]; //type of Pokémon found
                    let imgResult = $("img[title*='"+value+"']").length+" "+searchResult; //amount + type found
                    let imgFitResult = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(value) + 2]; //image for type of Pokémon
                    let shelterImgSearch = $('img[title*="'+value+'"]');
                    let shelterBigImg = shelterImgSearch.parent().prev().children('img.big');
                    $(shelterBigImg).addClass('shelterfoundme');

                    if ($("img[title*='"+value+"']").length > 1) {
                        document.querySelector('#sheltersuccess').insertAdjacentHTML('beforeend','<div id="shelterfound">'+imgResult+'s found '+imgFitResult+'</div>');
                    } else {
                        document.querySelector('#sheltersuccess').insertAdjacentHTML('beforeend','<div id="shelterfound">'+imgResult+' found '+imgFitResult+'</div>');
                    }
                }
            }
            //new Pokémon search.
            if (value === 'Pokémon') {
                if ($("#shelterarea .tooltip_content:contains("+value+")").length) {
                    let searchResult = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(value) + 1];
                    let tooltipResult = $("#shelterarea .tooltip_content:contains("+value+")").length+" "+searchResult;
                    let imgFitResult = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(value) + 2];
                    let shelterImgSearch = $("#shelterarea .tooltip_content:contains("+value+")")
                    let shelterBigImg = shelterImgSearch.prev().children('img.big');
                    $(shelterBigImg).addClass('shelterfoundme');

                    if ($("#shelterarea .tooltip_content:contains("+value+")").length > 1) {
                        document.querySelector('#sheltersuccess').insertAdjacentHTML('beforeend','<div id="shelterfound">'+tooltipResult+'s found '+imgFitResult+'</div>');
                    } else {
                        document.querySelector('#sheltersuccess').insertAdjacentHTML('beforeend','<div id="shelterfound">'+tooltipResult+' found '+imgFitResult+'</div>');
                    }
                }
            }
            //new egg search.
            if (value === "Egg") { //tooltip_content search. new egg.
                if ($("#shelterarea .tooltip_content:contains("+value+")").length) {
                    this.eggNoDuplicateArray = this.settings.NewEggDuplicate.split(',');
                    this.eggNoDuplicateArray = this.eggNoDuplicateArray.filter(v=>v!='');

                    let eggList = this.eggNoDuplicateArray.length;
                    let i;
                    for (i = 0; i < eggList; i++) {
                        let value = this.eggNoDuplicateArray[i];
                        if ($('img[src*="//'+value+'"]').length) {
                            lengthEggs = $('img[src*="//'+value+'"]').length + lengthEggs;
                        }
                    }

                    let allEggFinds = $("#shelterarea .tooltip_content:contains("+value+")").length;
                    let allKnownEggFinds = $("#shelterarea .tooltip_content:contains( "+value+")").length;
                    let newEggDup = lengthEggs / 2;
                    let newEggFinds = allEggFinds - allKnownEggFinds - newEggDup;

                    let searchResult = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(value) + 1];
                    let newEggResult = newEggFinds+" "+searchResult;
                    let imgFitResult = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(value) + 2];

                    if (newEggFinds <1) {
                        let thisDoesNothing = 0;
                    } else {
                        let shelterImgSearch = $("#shelterarea .tooltip_content:contains("+value+")");
                        let shelterBigImg = shelterImgSearch.prev().children('img.big');
                        $(shelterBigImg).addClass('shelterfoundme');
                        let shelterImgRemove = $("#shelterarea .tooltip_content:contains( "+value+")");
                        let shelterBigImgRemove = shelterImgRemove.prev().children('img.big');
                        $(shelterBigImgRemove).removeClass('shelterfoundme');

                        if (newEggFinds > 1) {
                            document.querySelector('#sheltersuccess').insertAdjacentHTML('beforeend','<div id="shelterfound">'+newEggResult+'s found '+imgFitResult+'</div>');
                        } else if (newEggFinds === 1) {
                            document.querySelector('#sheltersuccess').insertAdjacentHTML('beforeend','<div id="shelterfound">'+newEggResult+' found '+imgFitResult+'</div>');
                        }
                    }
                }
            }

            //New egg no duplicates
            let newEggAdopt = '';
            if ($('#shelterarea .lock').next('.tooltip_content:contains("Egg")').length && $('#shelterarea .lock').next('.tooltip_content:not(:contains(" Egg")').length < 1) {
                newEggAdopt = $('#shelterarea .lock').children('img').attr('src').substring(2);
            }

            if ($('div.panel:contains("Adoption successful!")').length) {
                if ($('.egg').css('background-image') === 'url("https://'+newEggAdopt+'")') {
                    this.eggNoDuplicateArray = this.settings.NewEggDuplicate.split(',');
                    this.eggNoDuplicateArray.push(newEggAdopt);
                    this.settings.NewEggDuplicate = this.eggNoDuplicateArray.toString();
                    newEggAdopt = "";
                }
            }
        }

        //loop to find all search genders for the custom
        const shelterValueArrayCustom = [];
        for (let key in this.settings) {
            let value = this.settings[key];
            if (value === true) {
                if(key === 'findMale' || key === 'findFemale' || key === 'findNoGender') {
                    let searchKey = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(key) + 1];
                    shelterValueArrayCustom.push(searchKey);
                }
            }
        }

        //loop to find all the custom search parameters
        let customSearchAmount = this.customArray.length;
        for (let i = 0; i < customSearchAmount; i++) {
            let value = this.customArray[i];
            if (value != "") {
                //custom pokemon search
                if (this.settings.customPokemon === true) {
                    //Males
                    if (shelterValueArrayCustom.indexOf("[M]") > -1) {
                        if ($("#shelterarea .tooltip_content:containsIN("+value+") img[title*='[M]']").length) {
                            let searchResult = value;
                            let imgGender = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf("[M]") +2];
                            let tooltipResult = $("#shelterarea .tooltip_content:containsIN("+value+") img[title*='[M]']").length+" Male "+imgGender+" "+searchResult;
                            let imgFitResult = `<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952">`;
                            let shelterImgSearch = $("#shelterarea .tooltip_content:containsIN("+value+") img[title*='[M]']")
                            let shelterBigImg = shelterImgSearch.parent().prev().children('img.big');
                            $(shelterBigImg).addClass('shelterfoundme');

                            if ($("#shelterarea .tooltip_content:containsIN("+value+") img[title*='[M]']").length > 1) {
                                document.querySelector('#sheltersuccess').insertAdjacentHTML('beforeend','<div id="shelterfound">'+tooltipResult+'s found '+imgFitResult+'</div>');
                            } else {
                                document.querySelector('#sheltersuccess').insertAdjacentHTML('beforeend','<div id="shelterfound">'+tooltipResult+' found '+imgFitResult+'</div>');
                            }
                        }
                    }
                    //Females
                    if (shelterValueArrayCustom.indexOf("[F]") > -1) {
                        if ($("#shelterarea .tooltip_content:containsIN("+value+") img[title*='[F]']").length) {
                            let searchResult = value;
                            let imgGender = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf("[F]") +2];
                            let tooltipResult = $("#shelterarea .tooltip_content:containsIN("+value+") img[title*='[F]']").length+" Female "+imgGender+" "+searchResult;
                            let imgFitResult = `<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952">`;
                            let shelterImgSearch = $("#shelterarea .tooltip_content:containsIN("+value+") img[title*='[F]']")
                            let shelterBigImg = shelterImgSearch.parent().prev().children('img.big');
                            $(shelterBigImg).addClass('shelterfoundme');

                            if ($("#shelterarea .tooltip_content:containsIN("+value+") img[title*='[F]']").length > 1) {
                                document.querySelector('#sheltersuccess').insertAdjacentHTML('beforeend','<div id="shelterfound">'+tooltipResult+'s found '+imgFitResult+'</div>');
                            } else {
                                document.querySelector('#sheltersuccess').insertAdjacentHTML('beforeend','<div id="shelterfound">'+tooltipResult+' found '+imgFitResult+'</div>');
                            }
                        }
                    }
                    //Genderless
                    if (shelterValueArrayCustom.indexOf("[N]") > -1) {
                        if ($("#shelterarea .tooltip_content:containsIN("+value+") img[title*='[N]']").length) {
                            let searchResult = value;
                            let imgGender = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf("[N]") +2];
                            let tooltipResult = $("#shelterarea .tooltip_content:containsIN("+value+") img[title*='[N]']").length+" Genderless "+imgGender+" "+searchResult;
                            let imgFitResult = `<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952">`;
                            let shelterImgSearch = $("#shelterarea .tooltip_content:containsIN("+value+") img[title*='[N]']")
                            let shelterBigImg = shelterImgSearch.parent().prev().children('img.big');
                            $(shelterBigImg).addClass('shelterfoundme');

                            if ($("#shelterarea .tooltip_content:containsIN("+value+") img[title*='[N]']").length > 1) {
                                document.querySelector('#sheltersuccess').insertAdjacentHTML('beforeend','<div id="shelterfound">'+tooltipResult+'s found '+imgFitResult+'</div>');
                            } else {
                                document.querySelector('#sheltersuccess').insertAdjacentHTML('beforeend','<div id="shelterfound">'+tooltipResult+' found '+imgFitResult+'</div>');
                            }
                        }
                    }
                    //No genders
                    if (shelterValueArrayCustom.length === 0) {
                        if ($('#shelterarea .tooltip_content:containsIN('+value+'):not(:containsIN("Egg"))').length) {
                            let searchResult = value;
                            let tooltipResult = $('#shelterarea .tooltip_content:containsIN('+value+'):not(:containsIN("Egg"))').length+" "+searchResult;
                            let imgFitResult = `<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952">`;
                            let shelterImgSearch = $('#shelterarea .tooltip_content:containsIN('+value+'):not(:containsIN("Egg"))')
                            let shelterBigImg = shelterImgSearch.parent().prev().children('img.big');
                            $(shelterBigImg).addClass('shelterfoundme');

                            if ($("#shelterarea .tooltip_content:containsIN("+value+") img[title*='[N]']").length > 1) {
                                document.querySelector('#sheltersuccess').insertAdjacentHTML('beforeend','<div id="shelterfound">'+tooltipResult+'s found '+imgFitResult+'</div>');
                            } else {
                                document.querySelector('#sheltersuccess').insertAdjacentHTML('beforeend','<div id="shelterfound">'+tooltipResult+' found '+imgFitResult+'</div>');
                            }
                        }
                    }
                }

                //custom egg
                if (this.settings.customEgg === true) {
                    let name_matches = $('#shelterarea .tooltip_content:containsIN('+value+'):contains("Egg")');
                    let num_matches = name_matches.length;

                    if (num_matches) {
                        let searchResult = value;
                        let tooltipResult = num_matches+" "+searchResult;
                        let imgFitResult = `<img src="//pfq-static.com/img/pkmn/egg.png/t=1451852195">`;
                        let shelterImgSearch = name_matches;
                        let shelterBigImg = shelterImgSearch.prev().children('img.big');
                        $(shelterBigImg).addClass('shelterfoundme');

                        if (num_matches > 1) {
                            document.querySelector('#sheltersuccess').insertAdjacentHTML('beforeend','<div id="shelterfound">'+tooltipResult+' Eggs found '+imgFitResult+'</div>');
                        } else {
                            document.querySelector('#sheltersuccess').insertAdjacentHTML('beforeend','<div id="shelterfound">'+tooltipResult+' egg found '+imgFitResult+'</div>');
                        }
                    }
                }

                //imgSearch with Pokémon
                if (this.settings.customPng === true) {
                    if ($('#shelterarea img[src*="'+value+'"]').length) {
                        let searchResult = $('#shelterarea img[src*="'+value+'"]').parent().next().text().split('(')[0]
                        let tooltipResult = $('#shelterarea img[src*="'+value+'"]').length+" "+searchResult+' (Custom img search)';
                        let imgFitResult = `<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952">`;
                        let shelterImgSearch = $('#shelterarea img[src*="'+value+'"]');
                        $(shelterImgSearch).addClass('shelterfoundme');

                        if ($('#shelterarea img[src*="'+value+'"]').length > 1) {
                            document.querySelector('#sheltersuccess').insertAdjacentHTML('beforeend','<div id="shelterfound">'+tooltipResult+' found '+imgFitResult+'</div>');
                        } else {
                            document.querySelector('#sheltersuccess').insertAdjacentHTML('beforeend','<div id="shelterfound">'+tooltipResult+' found '+imgFitResult+'</div>');
                        }
                    }
                }
            }
        }

        //loop to find all the types

        const filteredTypeArray = this.typeArray.filter(v=>v!='');

        if (filteredTypeArray.length > 0) {
            for (let i = 0; i < filteredTypeArray.length; i++) {
                let value = filteredTypeArray[i];
                let foundType = GLOBALS.SHELTER_TYPE_TABLE[GLOBALS.SHELTER_TYPE_TABLE.indexOf(value) + 2];

                if (this.settings.findTypeEgg === true) {
                    let typePokemonNames = [];
                    $('#shelterarea>.tooltip_content:contains("Egg")').each(function() {
                        let searchPokemon = ($(this).text().split(' ')[0]);
                        let searchPokemonIndex = dexData.indexOf('"'+searchPokemon+'"');
                        let searchTypeOne = dexData[searchPokemonIndex + 1];
                        let searchTypeTwo = dexData[searchPokemonIndex + 2];

                        if ((searchTypeOne === value) || (searchTypeTwo === value)) {
                            typePokemonNames.push(searchPokemon);
                        }
                    })

                    for (let o = 0; o < typePokemonNames.length; o++) {
                        let shelterImgSearch = $("#shelterarea .tooltip_content:containsIN('"+typePokemonNames[o]+" Egg')");
                        let shelterBigImg = shelterImgSearch.prev().children('img.big');
                        $(shelterBigImg).addClass('shelterfoundme');
                    }

                    if (typePokemonNames.length == 1) {
                        document.querySelector('#sheltersuccess').insertAdjacentHTML('beforeend','<div id="shelterfound">'+typePokemonNames.length+' '+foundType+' egg type found! ('+typePokemonNames.toString()+')</div>');
                    } else if (typePokemonNames.length > 1) {
                        document.querySelector('#sheltersuccess').insertAdjacentHTML('beforeend','<div id="shelterfound">'+typePokemonNames.length+' '+foundType+' egg types found! ('+typePokemonNames.toString()+')</div>');
                    }
                }

                if (this.settings.findTypePokemon === true) {
                    let typePokemonNames = [];

                    $('#shelterarea>.tooltip_content').not(':contains("Egg")').each(function() {
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
                        let shelterImgSearch = $("#shelterarea .tooltip_content:containsIN('"+typePokemonNames[o]+" (')")
                        let shelterBigImg = shelterImgSearch.prev().children('img.big');
                        $(shelterBigImg).addClass('shelterfoundme');
                    }

                    if (typePokemonNames.length == 1) {
                        document.querySelector('#sheltersuccess').insertAdjacentHTML('beforeend','<div id="shelterfound">'+typePokemonNames.length+' '+foundType+' Pokémon type found! ('+typePokemonNames.toString()+')</div>');
                    } else if (typePokemonNames.length > 1) {
                        document.querySelector('#sheltersuccess').insertAdjacentHTML('beforeend','<div id="shelterfound">'+typePokemonNames.length+' '+foundType+' Pokémon types found! ('+typePokemonNames.toString()+')</div>');
                    }
                }
            }
        }
    }
    removeEgg(element) {
        this.eggNoDuplicateArray = this.settings.NewEggDuplicate.split(',');
        let eggList = this.eggNoDuplicateArray.length;
        let i;
        for (i = 0; i < eggList; i++) {
            let value = this.eggNoDuplicateArray[i];
            if (element === 'url("https://'+value+'")') {
                let index = this.eggNoDuplicateArray.indexOf(value);
                if (index > -1) {
                    this.eggNoDuplicateArray.splice(index, 1);
                    this.settings.NewEggDuplicate = this.eggNoDuplicateArray.toString();
                }
            }
        }
    }
}

const shelterPage = new ShelterPage();
