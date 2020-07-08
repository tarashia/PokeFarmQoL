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
            fieldCustomItem: true, // unused
            fieldCustomPokemon: true,
            fieldCustomEgg: true,
            fieldCustomPng: false,
            fieldItem: true,
            /* tooltip settings */
            tooltipEnableMods: false,
            tooltipNoBerry: false,
            tooltipBerry: false,
        }, 'fields/');
        this.customArray = [];
        this.typeArray = [];
        this.natureArray = [];
        this.eggGroupArray = [];
        const obj = this
        this.observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                obj.customSearch();
                obj.handleTooltipSettings();
            });
        });
    }

    settingsChange(element, textElement, customClass, typeClass, arrayName) {
        if(super.settingsChange(element, textElement, customClass, typeClass, arrayName) === false) {
            return false;
        }

        const mutuallyExclusive = ["fieldByBerry", "fieldByMiddle", "fieldByGrid"]
        const idx = mutuallyExclusive.indexOf(element)
        if(idx > -1) {
            for(let i = 0; i < mutuallyExclusive.length; i++) {
                if(i !== idx) {
                    this.settings[mutuallyExclusive[i]] = false;
                }
            }
            return true;
        }
        else { return false; }
    }

    setupHTML() {
        document.querySelector('#field_field').insertAdjacentHTML('beforebegin', TEMPLATES.publicFieldTooltipModHTML);
        document.querySelector('#field_field').insertAdjacentHTML('beforebegin', TEMPLATES.fieldSortHTML);
        document.querySelector('#field_field').insertAdjacentHTML('afterend', TEMPLATES.fieldSearchHTML);

        const theField = Helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray')
        const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS,
                                             'removeFieldTypeSearch', 'fieldTypes', 'typeArray');
        const theNature = Helpers.selectSearchDiv('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS,
                                               'removeFieldNature', 'natureTypes', 'natureArray')
        const theEggGroup = Helpers.selectSearchDiv('eggGroupNumber', 'eggGroups', 'fieldEggGroup', GLOBALS.EGG_GROUP_OPTIONS,
                                                 'removeFieldEggGroup', 'eggGroupTypes', 'eggGroupArray')
        this.customArray = this.settings.fieldCustom.split(',');
        this.typeArray = this.settings.fieldType.split(',');
        this.natureArray = this.settings.fieldNature.split(',');
        this.eggGroupArray = this.settings.fieldEggGroup.split(',');
        Helpers.setupFieldArrayHTML(this.customArray, 'searchkeys', theField, 'numberDiv');
        Helpers.setupFieldArrayHTML(this.typeArray, 'fieldTypes', theType, 'typeNumber');
        Helpers.setupFieldArrayHTML(this.natureArray, 'natureTypes', theNature, 'natureNumber');
        Helpers.setupFieldArrayHTML(this.eggGroupArray, 'eggGroupTypes', theEggGroup, 'eggGroupNumber');

        this.handleTooltipSettings()
    }
    setupCSS() {
        let fieldOrderCssColor = $('#field_field').css('background-color');
        let fieldOrderCssBorder = $('#field_field').css('border');
        $("#fieldorder").css("background-color", ""+fieldOrderCssColor+"");
        $("#fieldorder").css("border", ""+fieldOrderCssBorder+"");
        $("#tooltipenable").css("background-color", ""+fieldOrderCssColor+"");
        $("#tooltipenable").css("border", ""+fieldOrderCssBorder+"");
        $("#tooltipenable").css("max-width", "600px");
        $("#tooltipenable").css("position", "relative");
        $("#tooltipenable").css("margin", "16px auto");
        $("#fieldsearch").css("background-color", ""+fieldOrderCssColor+"");
        $("#fieldsearch").css("border", ""+fieldOrderCssBorder+"");
        $(".collapsible").css("background-color", ""+fieldOrderCssColor+"");
        $(".collapsible").css("border", ""+fieldOrderCssBorder+"");
        $(".collapsible_content").css("background-color", ""+fieldOrderCssColor+"");
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
            obj.loadSettings()
            obj.customSearch();
            obj.handleTooltipSettings()
            obj.saveSettings()
        }));

        $(document).on('click input', '#fieldorder, #field_field, #field_berries, #field_nav', (function() { //field sort
            obj.customSearch();
        }));

        document.addEventListener("keydown", function() {
            obj.customSearch();
        });

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

        $(document).on('click', '#addTextField', (function() {
            obj.addTextField();
            obj.saveSettings();
        }));

        $(document).on('click', '#removeTextField', (function() {
            obj.removeTextField(this, $(this).parent().find('input').val());
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

        $('.collapsible').on('click', function() {
            this.classList.toggle('active');
            var content = this.nextElementSibling;
            if(content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block"
            }
        });

        $('#field_berries').on('click', function() {
            obj.loadSettings();
            obj.handleTooltipSettings()
        });

        $('.tooltipsetting[data-key=tooltipEnableMods]').on('click', function() {
            obj.loadSettings();
            obj.handleTooltipSettings();
            obj.saveSettings();
        })

        $('.tooltipsetting[data-key=tooltipNoBerry]').on('click', function() {
            obj.loadSettings();
            obj.handleTooltipSettings();
            obj.saveSettings();
        });

        $('.tooltipsetting[data-key=tooltipBerry]').on('click', function() {
            obj.loadSettings();
            obj.handleTooltipSettings();
            obj.saveSettings();
        });
    }
    // specific
    handleTooltipSettings() {
        const obj = this
        if($('.tooltipsetting[data-key=tooltipEnableMods]').prop('checked')) {
            // make sure checkboxes are enabled
            $('.tooltipsetting[data-key=tooltipNoBerry]').prop('disabled', false)
            $('.tooltipsetting[data-key=tooltipBerry]').prop('disabled', false)

            // use the correct setting to turn on the tooltips based on the berries
            if($('#field_berries').hasClass('selected')) {
                if($('.tooltipsetting[data-key=tooltipBerry]').prop('checked')) { obj.disableTooltips(); }
                else { obj.enableTooltips(); }
            } else {
                if($('.tooltipsetting[data-key=tooltipNoBerry]').prop('checked')) { obj.disableTooltips(); }
                else { obj.enableTooltips(); }
            }
        } else {
            $('.tooltipsetting[data-key=tooltipNoBerry]').prop('disabled', true)
            $('.tooltipsetting[data-key=tooltipBerry]').prop('disabled', true)
            // if tooltipNoBerry was checked before the mods were disabled, reenable the tooltips
            if($('.tooltipsetting[data-key=tooltipNoBerry]').prop('checked')) {
                obj.enableTooltips();
            }
        }
    }
    disableTooltips() {
        $('#field_field>div.field>.fieldmon').removeAttr('data-tooltip').removeClass('tooltip_trigger')
    }
    enableTooltips() {
        $('#field_field>div.field>.fieldmon').attr('data-tooltip', "")
    }
    searchForImgTitle(key) {
        const SEARCH_DATA = GLOBALS.SHELTER_SEARCH_DATA;
        const key_index = SEARCH_DATA.indexOf(key)
        const value = SEARCH_DATA[key_index + 1]
        const selected = $('img[title*="'+value+'"]')
        if (selected.length) {
            let searchResult = SEARCH_DATA[key_index + 2]; //type of Pokémon found
            let imgResult = selected.length + " " + searchResult; //amount + type found
            let imgFitResult = SEARCH_DATA[key_index + 3]; //image for type of Pokémon
            // next line different from shelter
            let bigImg = selected.parent().parent().parent().parent().prev().children('img.big')
            $(bigImg).addClass('publicfoundme');
        }
    }
    searchForCustomPokemon(value, male, female, nogender) {
        let genderMatches = []
        if (male) { genderMatches.push("[M]") }
        if(female) { genderMatches.push("[F]") }
        if(nogender) { genderMatches.push("[N]") }

        if(genderMatches.length > 0) {
            for(let i = 0; i < genderMatches.length; i++) {
                let genderMatch = genderMatches[i];
                let selected = $("#field_field .tooltip_content:containsIN("+value+") img[title*='" + genderMatch + "']")
                if (selected.length) {
                    let shelterBigImg = selected.parent().parent().parent().parent().prev().children('img.big')
                    $(shelterBigImg).addClass('publicfoundme');
                }
            }
        }

        //No genders
        else {
            let selected = $('#field_field .tooltip_content:containsIN('+value+'):not(:containsIN("Egg"))')
            if (selected.length) {
                let shelterBigImg = selected.parent().parent().parent().parent().prev().children('img.big')
                $(shelterBigImg).addClass('publicfoundme');
            }
        }

    }
    searchForCustomEgg(value) {
        let selected = $('#field_field .tooltip_content:containsIN('+value+'):contains("Egg")');
        if (selected.length) {
            let shelterBigImg = selected.parent().parent().parent().parent().prev().children('img.big')
            $(shelterBigImg).addClass('publicfoundme');
        }
    }
    searchForCustomPng(value) {
        let selected = $('#field_field img[src*="'+value+'"]')
        if (selected.length) {
            let shelterImgSearch = selected
            $(shelterImgSearch).addClass('publicfoundme');
        }
    }
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

            if(pokemonInField !== "") {
                if (JSON.stringify(pokemonClicked) === pokemonInField) {
                    $('#pokemonclickcount').css({"color" : "#059121"});
                }
                if (pokemonClicked !== JSON.parse(pokemonInField)) {
                    $('#pokemonclickcount').css({"color" : "#a30323"});
                }
            }
        }

        /////////////////////////////////////////////////
        /////////////////// searching ///////////////////
        /////////////////////////////////////////////////
        let bigImgs = document.querySelectorAll('.publicfoundme')
        if(bigImgs !== null) {
            bigImgs.forEach((b) => {$(b).removeClass('publicfoundme')})
        }

        if(this.settings.fieldShiny === true) {
            this.searchForImgTitle('findShiny')
        }
        if(this.settings.fieldAlbino === true) {
            this.searchForImgTitle('findAlbino')
        }
        if(this.settings.fieldMelanistic === true) {
            this.searchForImgTitle('findMelanistic')
        }
        if(this.settings.fieldPrehistoric === true) {
            this.searchForImgTitle('findPrehistoric')
        }
        if(this.settings.fieldDelta === true) {
            this.searchForImgTitle('findDelta')
        }
        if(this.settings.fieldMega === true) {
            this.searchForImgTitle('findMega')
        }
        if(this.settings.fieldStarter === true) {
            this.searchForImgTitle('findStarter')
        }
        if(this.settings.fieldCustomSprite === true) {
            this.searchForImgTitle('findCustomSprite')
        }
        if(this.settings.fieldItem === true) {
            // pokemon that hold items will have HTML that matches the following selector
            let items = $('.tooltip_content .item>div>.tooltip_item')
            if(items.length) {
                let itemBigImgs = items.parent().parent().parent().parent().prev().children('img.big')
                $(itemBigImgs).addClass('publicfoundme');
            }
        }

        const filteredTypeArray = this.typeArray.filter(v=>v!='');
        const filteredNatureArray = this.natureArray.filter(v=>v!='');
        const filteredEggGroupArray = this.eggGroupArray.filter(v=>v!='');

        //loop to find all the types
        if (filteredTypeArray.length > 0 || filteredNatureArray.length > 0 || filteredEggGroupArray.length > 0) {
            $('.fieldmon').each(function() {
                let searchPokemonBigImg = $(this)[0].childNodes[0];
                const tooltip_data = Helpers.parseFieldPokemonTooltip($(searchPokemonBigImg).parent().next()[0])

                let searchPokemon = tooltip_data.species;
                let searchPokemonIndex = dexData.indexOf('"'+searchPokemon+'"');
                let searchTypeOne = tooltip_data.types[0] + ""
                let searchTypeTwo = (tooltip_data.types.length > 1) ? tooltip_data.types[1] + "": ""

                let searchNature = GLOBALS.NATURE_LIST[tooltip_data.nature];

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

        // custom search
        for (let i = 0; i < this.customArray.length; i++) {
            let value = this.customArray[i];
            if (value != "") {
                //custom pokemon search
                if (this.settings.fieldCustomPokemon === true) {
                    this.searchForCustomPokemon(value, this.settings.fieldMale,
                                                this.settings.fieldFemale,
                                                this.settings.fieldNoGender);
                }

                //custom egg
                if (this.settings.fieldCustomEgg === true) {
                    this.searchForCustomEgg(value);
                }

                //imgSearch with Pokémon
                if (this.settings.fieldCustomPng === true) {
                    this.searchForCustomPng(value);
                }
            }
        }
    } // customSearch
    addSelectSearch(cls, name, data_key, options, id, divParent, array_name) {
        const theList = Helpers.selectSearchDiv(cls, name, data_key, options, id, divParent, array_name)
        let number = $(`#${divParent}>div`).length;
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
    addTextField() {
        const theField = Helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray')
        let numberDiv = $('#searchkeys>div').length;
        $('#searchkeys').append(theField);
        $('.numberDiv').removeClass('numberDiv').addClass(""+numberDiv+"");
    }
    removeTextField(byebye, key) {
        this.customArray = $.grep(this.customArray, function(value) {
            return value != key;
        });
        this.settings.fieldCustom = this.customArray.toString()

        $(byebye).parent().remove();

        let i;
        for(i = 0; i < $('#searchkeys>div').length; i++) {
            let rightDiv = i + 1;
            $('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
        }
    }
}

const publicFieldsPage = new PublicFieldsPage();
