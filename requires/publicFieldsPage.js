class PublicFieldsPage extends Page {
    constructor() {
        super('QoLPublicFields', {
            fieldByBerry: false,
            fieldByMiddle: false,
            fieldByGrid: false,
            fieldClickCount: true,
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
        }, 'fields/');
        this.customArray = [];
        this.typeArray = [];
        this.natureArray = [];
        this.eggGroupArray = [];
        const obj = this
        this.observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                obj.customSearch();
            });
        });
    }

    settingsChange(element, textElement, customClass, typeClass, arrayName) {
        if (JSON.stringify(this.settings).indexOf(element) >= 0) {
            if (typeof this.settings[element] === 'boolean') {
                this.settings[element] = !this.settings[element]
            } else if (typeof this.settings[element] === 'string') {
                if (arrayName !== undefined && arrayName !== '') {
                    if (textElement === 'none') {
                        let tempIndex = typeClass - 1;
                        this[arrayName].splice(tempIndex, tempIndex);
                        this.settings[element] = this[arrayName].toString();
                    } else {
                        let tempIndex = typeClass - 1;
                        this[arrayName][tempIndex] = textElement;
                        this.settings[element] = this[arrayName].toString();
                    }
                }
                else {
                    this.settings[element] = textElement;
                }
            }
        }
        else { return false }

        if (element === "fieldByBerry" && this.settings[element] === true) {
            this.settings.fieldByMiddle = false;
            this.settings.fieldByGrid = false;
        } else if (element === "fieldByMiddle" && this.settings[element] === true) {
            this.settings.fieldByBerry = false;
            this.settings.fieldByGrid = false;
        } else if (element === "fieldByGrid" && this.settings[element] === true) {
            this.settings.fieldByBerry = false;
            this.settings.fieldByMiddle = false;
        }
        return true;
    }

    textSearchDiv(cls, data_key, id) {
        return `<div class='${cls}'><label><input type="text" class="qolsetting" data-key="${data_key}"/></label>` +
            `<input type='button' value='Remove' id='${id}'></div>`;
    }

    selectSearchDiv(cls, name, data_key, options, id, divParent, array_name) {
        return `<div class='${cls}'> <select name='${name}' class="qolsetting" data-key='${data_key}' ` +
            `array-name='${array_name}'> ${options} </select> <input type='button' value='Remove' id='${id}'> </div>`;
    }

    setupHTML() {
        document.querySelector('#field_field').insertAdjacentHTML('beforebegin', TEMPLATES.fieldSortHTML);
        document.querySelector('#field_field').insertAdjacentHTML('afterend', TEMPLATES.fieldSearchHTML);

        const theField = this.textSearchDiv('numberDiv', 'fieldCustom', 'removeFieldSearch')
        const theType = this.selectSearchDiv('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS,
                                             'removeFieldTypeSearch', 'fieldTypes', 'typeArray');
        const theNature = this.selectSearchDiv('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS,
                                               'removeFieldNature', 'natureTypes', 'natureArray')
        const theEggGroup = this.selectSearchDiv('eggGroupNumber', 'eggGroups', 'fieldEggGroup', GLOBALS.EGG_GROUP_OPTIONS,
                                                 'removeFieldEggGroup', 'eggGroupTypes', 'eggGroupArray')
        this.customArray = this.settings.fieldCustom.split(',');
        this.typeArray = this.settings.fieldType.split(',');
        this.natureArray = this.settings.fieldNature.split(',');
        this.eggGroupArray = this.settings.fieldEggGroup.split(',');
        Helpers.setupFieldArrayHTML(this.customArray, 'searchkeys', theField, 'numberDiv');
        Helpers.setupFieldArrayHTML(this.typeArray, 'fieldTypes', theType, 'typeNumber');
        Helpers.setupFieldArrayHTML(this.natureArray, 'natureTypes', theNature, 'natureNumber');
        Helpers.setupFieldArrayHTML(this.eggGroupArray, 'eggGroupTypes', theEggGroup, 'eggGroupNumber');
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
        this.observer.observe(document.querySelector('#field_field'), {
            childList: true,
            attributeFilter: ['class'],
        });
        this.observer.observe(document.querySelector('#fieldorder'), {
            childList: true,
        });
    }
    setupHandlers() {
        const obj = this
        $(window).on('load', (function() {
            obj.customSearch();
        }));

        $(document).on('click input', '#fieldorder, #field_field, #field_berries, #field_nav', (function() { //field sort
            obj.customSearch();
        }));

        document.addEventListener("keydown", function() {
            obj.customSearch();
        });

        $(document).on('click', '#addFieldSearch', (function() { //add field text field
            obj.fieldAddTextField();
        }));

        $(document).on('click', '#removeFieldSearch', (function() { //remove field text field
            obj.fieldRemoveTextField(this, $(this).parent().find('input').val());
        }));

        $(document).on('click', '#addFieldTypeSearch', (function() { //add field type list
            obj.addSelectSearch('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS, 'removeFieldTypeSearch', 'fieldTypes', 'typeArray');
            obj.customSearch();
        }));

        $(document).on('click', '#removeFieldTypeSearch', (function() { //remove field type list
            obj.typeArray = obj.removeSelectSearch(obj.typeArray, this, $(this).parent().find('select').val(), 'fieldType', 'fieldTypes')
            obj.saveSettings();
            obj.customSearch();
        }));

        $(document).on('click', '#addFieldNatureSearch', (function() { //add field nature search
            obj.addSelectSearch('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS, 'removeFieldNature', 'natureTypes', 'natureArray')
            obj.customSearch();
        }));

        $(document).on('click', '#removeFieldNature', (function() { //remove field nature search
            obj.natureArray = obj.removeSelectSearch(obj.natureArray, this, $(this).parent().find('select').val(), 'fieldNature', 'natureTypes')
            obj.saveSettings();
            obj.customSearch();
        }));

        $(document).on('click', '#addFieldEggGroupSearch', (function() { //add egg group nature search
            obj.addSelectSearch('eggGroupNumber', 'eggGroups', 'fieldEggGroup', GLOBALS.EGG_GROUP_OPTIONS, 'removeFieldEggGroup', 'eggGroupTypes', 'eggGroupArray')
            obj.customSearch();
        }));

        $(document).on('click', '#removeFieldEggGroup', (function() { //remove egg group nature search
            obj.eggGroupArray = obj.removeSelectSearch(obj.eggGroupArray, this, $(this).parent().find('select').val(), 'fieldEggGroup', 'eggGroupTypes')
            obj.saveSettings();
            obj.customSearch();
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

        $('input.qolalone').on('change', function() { //only 1 textbox may be true
            $('input.qolalone').not(this).prop('checked', false);
        });
    }
    // specific
    customSearch() {
        let dexData = GLOBALS.DEX_DATA;

        /////////////////////////////////////////////////
        //////////////////// sorting ////////////////////
        /////////////////////////////////////////////////
        if (this.settings.fieldByBerry === true) { //sort field by berries
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
        else if (this.settings.fieldByMiddle === true) { //sort field in the middle
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
        else if (this.settings.fieldByGrid === true) { //sort field in a grid
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
        if (this.settings.fieldClickCount === false) {
            $('#pokemonclickcount').remove();
        } else if (this.settings.fieldClickCount === true) {
            let pokemonFed = $(".fieldmon").map(function() { return $(this).attr("data-fed"); }).get();

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

        const filteredTypeArray = this.typeArray.filter(v=>v!='');
        const filteredNatureArray = this.natureArray.filter(v=>v!='');
        const filteredEggGroupArray = this.eggGroupArray.filter(v=>v!='');

        //loop to find all the types
        if (filteredTypeArray.length > 0 || filteredNatureArray.length > 0 || filteredEggGroupArray.length > 0) {
            $('.fieldmon').each(function() {
                let searchPokemonBigImg = $(this)[0].childNodes[0];
                let searchPokemon = searchPokemonBigImg.alt;
                let searchPokemonIndex = dexData.indexOf('"'+searchPokemon+'"');
                let searchTypeOne = dexData[searchPokemonIndex + 1];
                let searchTypeTwo = dexData[searchPokemonIndex + 2];

                let searchNature = $($(this).next()[0].querySelector('.fieldmontip')).children(':contains(Nature)')[0].innerText.split(" ")[1];
                if (searchNature.indexOf("(") > -1) { searchNature = searchNature.slice(0, -1); }

                let searchEggGroup = $($(this).next()[0].querySelector('.fieldmontip')).
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
    addSelectSearch(cls, name, data_key, options, id, divParent, array_name) {
        const theList = this.selectSearchDiv(cls, name, data_key, options, id, divParent, array_name)
        let number = (`#${divParent}>div`).length;
        $(`#${divParent}`).append(theList);
        $(`.${cls}`).removeClass(cls).addClass(""+number+"");
    }
    removeSelectSearch(arr, byebye, key, settingsKey, divParent) {
        arr = $.grep(arr, function(value) { return value != key; });
        this.settings[settingsKey] = arr.toString();

        $(byebye).parent().remove();

        for(let i = 0; i < $(`#${divParent}>div`).length; i++) {
            let rightDiv = i + 1;
            $('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
        }

        return arr;
    }
    fieldAddTextField() {
        const theField = this.textSearchDiv('numberDiv', 'fieldCustom', 'removeFieldSearch')
        let numberDiv = $('#searchkeys>div').length;
        $('#searchkeys').append(theField);
        $('.numberDiv').removeClass('numberDiv').addClass(""+numberDiv+"");
    }
    fieldRemoveTextField(byebye, key) {
        this.customArray = $.grep(this.customArray, function(value) { //when textfield is removed, the value will be deleted from the localstorage
            return value != key;
        });
        this.settings.fieldCustom = this.customArray.toString()

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
