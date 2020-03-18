class PublicFieldsPage {
    SETTINGS_SAVE_KEY() { return 'QoLPublicFields'; }
    DEFAULT_SORT_SETTINGS() { return {
        fieldByBerry: false,
        fieldByMiddle: false,
        fieldByGrid: false,
        fieldClickCount: true,
    }}
    DEFAULT_SEARCH_SETTINGS() { return {
        fieldCustom: "",
        fieldType: "",
        fieldNature: "",
        fieldEggGroup: "",
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
    }}
    DEFAULT_SETTINGS() { return {
        sortSettings : this.DEFAULT_SORT_SETTINGS(),
        searchSettings : this.DEFAULT_SEARCH_SETTINGS(),
    }}
    constructor() {
	this.settings = this.DEFAULT_SETTINGS();
	this.customArray = [];
	this.typeArray = [];
	this.natureArray = [];
	this.eggGroupArray = [];
	this.observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
		this.customSearch();
            });
	});
    }

    loadSettings() {
        this.settings = Helpers.loadSettings(this.SETTINGS_SAVE_KEY(), this.DEFAULT_SETTINGS(), this.settings);
    }
    saveSettings() {
        Helpers.saveSettings(this.SETTINGS_SAVE_KEY(), this.settings)
    }
    getSettings() {
        return this.settings;
    }
    populateSettings() {
        for (let key in this.settings.sortSettings) {
            if (!this.settings.sortSettings.hasOwnProperty(key)) {
                continue;
            }
            let value = this.settings.sortSettings[key];
            if (typeof value === 'boolean') {
                Helpers.toggleSetting(key, value, false);
                continue;
            }

            if (typeof value === 'string') {
                Helpers.toggleSetting(key, value, false);
                continue;
            }
        }
        for (let key in this.settings.searchSettings) {
            if (!this.settings.searchSettings.hasOwnProperty(key)) {
                continue;
            }
            let value = this.settings.searchSettings[key];
            if (typeof value === 'boolean') {
                Helpers.toggleSetting(key, value, false);
                continue;
            }
        }
    }
    settingsChange(element, textElement, customClass, typeClass) {
        if (JSON.stringify(this.settings.sortSettings).indexOf(element) >= 0) { // field sort settings
            if (this.settings.sortSettings[element] === false ) {
                this.settings.sortSettings[element] = true;
                if (element === "fieldByBerry") {
                    this.settings.sortSettings.fieldByMiddle = false;
                    this.settings.sortSettings.fieldByGrid = false;
                } else if (element === "fieldByMiddle") {
                    this.settings.sortSettings.fieldByBerry = false;
                    this.settings.sortSettings.fieldByGrid = false;
                } else if (element === "fieldByGrid") {
                    this.settings.sortSettings.fieldByBerry = false;
                    this.settings.sortSettings.fieldByMiddle = false;
                }
            } else if (this.settings.sortSettings[element] === true ) {
                this.settings.sortSettings[element] = false;
            } else if (typeof this.settings.sortSettings[element] === 'string') {
                this.settings.sortSettings[element] = textElement;
            }
            return true;
        }

        else if (JSON.stringify(this.settings.searchSettings).indexOf(element) >= 0) { // field search settings
            if (this.settings.searchSettings[element] === false ) {
                this.settings.searchSettings[element] = true;
            } else if (this.settings.searchSettings[element] === true ) {
                this.settings.searchSettings[element] = false;
            } else if (typeof this.settings.searchSettings[element] === 'string') {
                if (element === 'fieldType') {
                    if (textElement === 'none') {
                        let tempIndex = typeClass - 1;
                        typeArray.splice(tempIndex, tempIndex);
                        this.settings.searchSettings.fieldType = typeArray.toString();
                    } else {
                        let tempIndex = typeClass - 1;
                        typeArray[tempIndex] = textElement;
                        this.settings.searchSettings.fieldType = typeArray.toString();
                    }
                }
                else if (element === 'fieldNature') {
                    if (textElement === 'none') {
                        let tempIndex = typeClass - 1;
                        natureArray.splice(tempIndex, tempIndex);
                        this.settings.searchSettings.fieldNature = natureArray.toString();
                    } else {
                        let tempIndex = typeClass - 1;
                        natureArray[tempIndex] = textElement;
                        this.settings.searchSettings.fieldNature = natureArray.toString();
                    }
                }
                else if (element === 'fieldEggGroup') {
                    if (textElement === 'none') {
                        let tempIndex = typeClass - 1;
                        eggGroupArray.splice(tempIndex, tempIndex);
                        this.settings.fieldEggGroup = eggGroupArray.toString();
                    } else {
                        let tempIndex = typeClass - 1;
                        eggGroupArray[tempIndex] = textElement;
                        this.settings.fieldEggGroup = eggGroupArray.toString();
                    }
                }
                else if (element === 'fieldCustom') {
                    let tempIndex = customClass - 1;
                    customArray[tempIndex] = textElement;
                    this.settings.searchSettings.fieldCustom = customArray.toString();
                }
            }
            return true;
        }
        else { return false }
    }
    setupHTML() {
        document.querySelector('#field_field').insertAdjacentHTML('beforebegin', TEMPLATES.fieldSortHTML);
        document.querySelector('#field_field').insertAdjacentHTML('afterend', TEMPLATES.fieldSearchHTML);

        const theField = `<div class='numberDiv'><label><input type="text" class="qolsetting" data-key="fieldCustom"/></label><input type='button' value='Remove' id='removeFieldSearch'></div>`;
        const theType = `<div class='typeNumber'> <select name="types" class="qolsetting" data-key="fieldType"> ` + GLOBALS.TYPE_OPTIONS + ` </select> <input type='button' value='Remove' id='removeFieldTypeSearch'> </div>`;
        const theNature = `<div class='natureNumber'> <select name="natures" class="qolsetting" data-key="fieldNature"> ` + GLOBALS.NATURE_OPTIONS + ` </select> <input type='button' value='Remove' id='removeFieldNature'> </div>`;
        const theEggGroup = `<div class='eggGroupNumber'> <select name="eggGroups" class="qolsetting" data-key="fieldEggGroup"> ` + GLOBALS.EGG_GROUP_OPTIONS + ` </select> <input type='button' value='Remove' id='removeFieldEggGroup'> </div>`;
        customArray = this.settings.searchSettings.fieldCustom.split(',');
        typeArray = this.settings.searchSettings.fieldType.split(',');
        natureArray = this.settings.searchSettings.fieldNature.split(',');
        eggGroupArray = this.settings.searchSettings.fieldEggGroup.split(',');
        Helpers.setupFieldArrayHTML(customArray, 'searchkeys', theField, 'numberDiv');
        Helpers.setupFieldArrayHTML(typeArray, 'fieldTypes', theType, 'typeNumber');
        Helpers.setupFieldArrayHTML(natureArray, 'natureTypes', theNature, 'natureNumber');
        Helpers.setupFieldArrayHTML(eggGroupArray, 'eggGroupTypes', theEggGroup, 'eggGroupNumber');
    }
    setupCSS() {
        let fieldOrderCssColor = $('#field_field').css('background-color');
        let fieldOrderCssBorder = $('#field_field').css('border');
        $("#fieldorder").css("background-color", ""+fieldOrderCssColor+"");
        $("#fieldorder").css("border", ""+fieldOrderCssBorder+"");
        $("#fieldsearch").css("background-color", ""+fieldOrderCssColor+"");
        $("#fieldsearch").css("border", ""+fieldOrderCssBorder+"");
    }
    setupObserver() {
        observer.observe(document.querySelector('#field_field'), {
            childList: true,
            attributeFilter: ['class'],
        });
        observer.observe(document.querySelector('#fieldorder'), {
            childList: true,
        });
    }
    setupHandlers() {
        $(window).on('load', (function(e) {
            this.customSearch();
        }));

        $(document).on('click input', '#fieldorder, #field_field, #field_berries, #field_nav', (function(e) { //field sort
            this.customSearch();
        }));

        document.addEventListener("keydown", function(event) {
            this.customSearch();
        });

        $(document).on('click', '#addFieldSearch', (function(e) { //add field text field
            this.fieldAddTextField();
        }));

        $(document).on('click', '#removeFieldSearch', (function(e) { //remove field text field
            this.fieldRemoveTextField(e, $(e).parent().find('input').val());
        }));

        $(document).on('click', '#addFieldTypeSearch', (function(e) { //add field type list
            this.addSelectSearch('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS, 'removeFieldTypeSearch', 'fieldTypes');
            this.customSearch();
        }));

        $(document).on('click', '#removeFieldTypeSearch', (function(e) { //remove field type list
            typeArray = this.removeSelectSearch(typeArray, e, $(e).parent().find('select').val(), 'fieldType', 'fieldTypes')
            this.saveSettings();
            this.customSearch();
        }));

        $(document).on('click', '#addFieldNatureSearch', (function(e) { //add field nature search
            this.addSelectSearch('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS, 'removeFieldNature', 'natureTypes')
            this.customSearch();
        }));

        $(document).on('click', '#removeFieldNature', (function(e) { //remove field nature search
            natureArray = this.removeSelectSearch(typeArray, e, $(e).parent().find('select').val(), 'fieldNature', 'natureTypes')
            this.saveSettings();
            this.customSearch();
        }));

        $(document).on('click', '#addFieldEggGroupSearch', (function(e) { //add egg group nature search
            this.addSelectSearch('eggGroupNumber', 'eggGroups', 'fieldEggGroup', GLOBALS.EGG_GROUP_OPTIONS, 'removeFieldEggGroup', 'eggGroupTypes')
            this.customSearch();
        }));

        $(document).on('click', '#removeFieldEggGroup', (function(e) { //remove egg group nature search
            eggGroupArray = this.removeSelectSearch(eggGroupArray, e, $(e).parent().find('select').val(), 'fieldEggGroup', 'eggGroupTypes')
            this.saveSettings();
            this.customSearch();
        }));

        $(document).on('change', '.qolsetting', (function(e) {
            this.loadSettings();
            this.customSearch();
            this.saveSettings();
        }));

        $(document).on('input', '.qolsetting', (function(e) { //Changes QoL settings
            this.settingsChange(this.getAttribute('data-key'), $(e).val(), $(e).parent().parent().attr('class'), $(this).parent().attr('class'));
            this.customSearch();
            this.saveSettings();
        }));
    }
    // specific
    customSearch() {
        let dexData = GLOBALS.DEX_DATA;

        /////////////////////////////////////////////////
        //////////////////// sorting ////////////////////
        /////////////////////////////////////////////////
        $('input.qolalone').on('change', function(e) { //only 1 textbox may be true
            $('input.qolalone').not(e).prop('checked', false);
        });

        if (this.settings.sortSettings.fieldByBerry === true) { //sort field by berries
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
        else if (this.settings.sortSettings.fieldByMiddle === true) { //sort field in the middle
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
        else if (this.settings.sortSettings.fieldByGrid === true) { //sort field in a grid
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
        if (this.settings.sortSettings.fieldClickCount === false) {
            $('#pokemonclickcount').remove();
        } else if (this.settings.sortSettings.fieldClickCount === true) {
            let pokemonFed = $(".fieldmon").map(function(e){return $(e).attr("data-fed");}).get();

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
        let bigImgs = document.querySelectorAll('.publicfoundme')
        if(bigImgs !== null) {
            bigImgs.forEach((b) => {$(b).removeClass('publicfoundme')})
        }

        const filteredTypeArray = typeArray.filter(v=>v!='');
        const filteredNatureArray = natureArray.filter(v=>v!='');
        const filteredEggGroupArray = eggGroupArray.filter(v=>v!='');

        //loop to find all the types
        if (filteredTypeArray.length > 0 || filteredNatureArray.length > 0 || filteredEggGroupArray.length > 0) {
            $('.fieldmon').each(function(e) {
                let searchPokemonBigImg = $(e)[0].childNodes[0];
                let searchPokemon = searchPokemonBigImg.alt;
                let searchPokemonIndex = dexData.indexOf('"'+searchPokemon+'"');
                let searchTypeOne = dexData[searchPokemonIndex + 1];
                let searchTypeTwo = dexData[searchPokemonIndex + 2];

                let searchNature = $($(e).next()[0].querySelector('.fieldmontip')).children(':contains(Nature)')[0].innerText.split(" ")[1];
                if (searchNature.indexOf("(") > -1) { searchNature = searchNature.slice(0, -1); }

                let searchEggGroup = $($(e).next()[0].querySelector('.fieldmontip')).
                    children(':contains(Egg Group)')[0].innerText.slice("Egg Group: ".length)

                for (let i = 0; i < filteredTypeArray.length; i++) {
                    if ((searchTypeOne === filteredTypeArray[i]) || (searchTypeTwo === filteredTypeArray[i])) {
                        $(searchPokemonBigImg).addClass('publicfoundme');
                    }
                }

                for (let i = 0; i < filteredNatureArray.length; i++) {
                    if(searchNature === GLOBALS.NATURE_LIST[filteredNatureArray[i]]) {
                        $(searchPokemonBigImg).addClass('publicfoundme');
                    }
                }

                for (let i = 0; i < filteredEggGroupArray.length; i++) {
                    let value = GLOBALS.EGG_GROUP_LIST[filteredEggGroupArray[i]];
                    if(searchEggGroup === value ||
                       searchEggGroup.indexOf(value + "/") > -1 ||
                       searchEggGroup.indexOf("/" + value) > -1) {
                        $(searchPokemonBigImg).addClass('publicfoundme');
                    }
                }
            }) // each
        } // end            
    } // customSearch
    addSelectSearch(cls, name, data_key, options, id, divParent) {
        let theList = `<div class='${cls}'> <select name='${name}' class="qolsetting" data-key='${data_key}'> ${options} </select> <input type='button' value='Remove' id='${id}'> </div>`;
        let number = (`#${divParent}>div`).length;
        $(`#${divParent}`).append(theList);
        $(`.${cls}`).removeClass(cls).addClass(""+number+"");
    }
    removeSelectSearch(arr, byebye, key, settingsKey, divParent) {
        arr = $.grep(arr, function(value) { return value != key; });
        this.settings.searchSettings[settingsKey] = arr.toString();

        $(byebye).parent().remove();

        for(let i = 0; i < $(`#${divParent}>div`).length; i++) {
            let rightDiv = i + 1;
            $('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
        }

        return arr;
    }
    fieldAddTextField() {
        let theField = `<div class='numberDiv'><label><input type="text" class="qolsetting" data-key="fieldCustom"/></label><input type='button' value='Remove' id='removeFieldSearch'></div>`;
        let numberDiv = $('#searchkeys>div').length;
        $('#searchkeys').append(theField);
        $('.numberDiv').removeClass('numberDiv').addClass(""+numberDiv+"");
    }
    fieldRemoveTextField(byebye, key) {
        customArray = $.grep(customArray, function(value) { //when textfield is removed, the value will be deleted from the localstorage
            return value != key;
        });
        this.settings.searchSettings.fieldCustom = customArray.toString()

        this.saveSettings();
        $(byebye).parent().remove();

        let i;
        for(i = 0; i < $('#searchkeys>div').length; i++) {
            let rightDiv = i + 1;
            $('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
        }
    }
}

const publicFieldsPage = new PublicFieldsPage();
