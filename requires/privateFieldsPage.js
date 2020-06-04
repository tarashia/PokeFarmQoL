class PrivateFieldsPage extends Page {
    constructor() {
	super('QoLPrivateFields', {
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
            fieldItem: true,
            customItem: true, // unused
            customEgg: true,
            customPokemon: true,
            customPng: false,
            releaseSelectAll : true,
	}, 'fields');
	this.customArray = [];
	this.typeArray = [];
	this.natureArray = [];
	this.eggGroupArray = [];
	const obj = this
	this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
		obj.customSearch();
            });
	});
    }

    onPage(w) {
	return w.location.href.indexOf("fields") != -1 &&
	    w.location.href.indexOf("fields/") == -1
    }

    setupHTML() {
        document.querySelector('#field_field').insertAdjacentHTML('afterend', TEMPLATES.privateFieldSearchHTML);

        const theField = Helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray')
        const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS,
                                             'removePrivateFieldTypeSearch', 'fieldTypes', 'typeArray');
        const theNature = Helpers.selectSearchDiv('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS,
                                               'removePrivateFieldNature', 'natureTypes', 'natureArray')
        const theEggGroup = Helpers.selectSearchDiv('eggGroupNumber', 'eggGroups', 'fieldEggGroup', GLOBALS.EGG_GROUP_OPTIONS,
                                                 'removePrivateFieldEggGroup', 'eggGroupTypes', 'eggGroupArray')
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
        // same as public fields
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
            characterdata: true,
            subtree: true,
            characterDataOldValue: true,
        });
    }
    setupHandlers() {
	const obj = this
        $(window).on('load', (() => {
            obj.customSearch();
        }));

        $(document).on('load', '.field', (function() {
            obj.customSearch();
        }));

        $(document).on('click', '*[data-menu="release"]', (function() { //select all feature
            obj.releaseEnableReleaseAll();
        }));

        $(document).on('click', '#addPrivateFieldTypeSearch', (function() { //add field type list
            obj.addSelectSearch('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS, 'removePrivateFieldTypeSearch', 'fieldTypes', 'typeArray');
            obj.customSearch();
        }));

        $(document).on('click', '#removePrivateFieldTypeSearch', (function() { //remove field type list
            obj.typeArray = obj.removeSelectSearch(obj.typeArray, this, $(this).parent().find('select').val(), 'fieldType', 'fieldTypes')
            obj.saveSettings();
            obj.customSearch();
        }));

        $(document).on('click', '#addPrivateFieldNatureSearch', (function() { //add field nature search
            obj.addSelectSearch('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS, 'removePrivateFieldNature', 'natureTypes', 'natureArray')
            obj.customSearch();
        }));

        $(document).on('click', '#removePrivateFieldNature', (function() { //remove field nature search
            obj.natureArray = obj.removeSelectSearch(obj.natureArray, this, $(this).parent().find('select').val(), 'fieldNature', 'natureTypes')
            obj.saveSettings();
            obj.customSearch();
        }));

        $(document).on('click', '#addPrivateFieldEggGroupSearch', (function() { //add egg group nature search
            obj.addSelectSearch('eggGroupNumber', 'eggGroups', 'fieldEggGroup', GLOBALS.EGG_GROUP_OPTIONS, 'removePrivateFieldEggGroup', 'eggGroupTypes', 'eggGroupArray')
            obj.customSearch();
        }));

        $(document).on('click', '#removePrivateFieldEggGroup', (function() { //remove egg group nature search
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

        $(document).on('click', '*[data-menu="bulkmove"]', (function() { // select all feature
            obj.moveEnableReleaseAll();
        }));
    }
    // specific
    /*
    insertFoundDiv(number, name, img) {
        document.querySelector('#sheltersuccess').
            insertAdjacentHTML('beforeend',
                               '<div id="shelterfound">' + name + ((number > 1) ? 's' : '') + ' found ' + img + '</div>')
    }
    */
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
            $(bigImg).addClass('privatefoundme');

            // this.insertFoundDiv(selected.length, imgResult, imgFitResult)
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
                    $(shelterBigImg).addClass('privatefoundme');
                }
            }
        }

        //No genders
        else {
            let selected = $('#field_field .tooltip_content:containsIN('+value+'):not(:containsIN("Egg"))')
            if (selected.length) {
                let shelterBigImg = selected.parent().parent().parent().parent().prev().children('img.big')
                $(shelterBigImg).addClass('privatefoundme');
            }
        }

    }
    searchForCustomEgg(value) {
        let selected = $('#field_field .tooltip_content:containsIN('+value+'):contains("Egg")');
        if (selected.length) {
            let shelterBigImg = selected.parent().parent().parent().parent().prev().children('img.big')
            $(shelterBigImg).addClass('privatefoundme');
        }
    }
    searchForCustomPng(value) {
        let selected = $('#field_field img[src*="'+value+'"]')
        if (selected.length) {
            let shelterImgSearch = selected
            $(shelterImgSearch).addClass('privatefoundme');
        }
    }
    customSearch() {
        let dexData = GLOBALS.DEX_DATA;
        let bigImgs = document.querySelectorAll('.privatefoundme')
        if(bigImgs !== null) {
            bigImgs.forEach((b) => {$(b).removeClass('privatefoundme')})
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
                $(itemBigImgs).addClass('privatefoundme');
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
                        $(searchPokemonBigImg).addClass('privatefoundme');
                    }
                }

                for (let i = 0; i < filteredNatureArray.length; i++) {
                    if(searchNature === GLOBALS.NATURE_LIST[filteredNatureArray[i]]) {
                        $(searchPokemonBigImg).addClass('privatefoundme');
                    }
                }

                for (let i = 0; i < filteredEggGroupArray.length; i++) {
                    let value = GLOBALS.EGG_GROUP_LIST[filteredEggGroupArray[i]];
                    if(searchEggGroup === value ||
                       searchEggGroup.indexOf(value + "/") > -1 ||
                       searchEggGroup.indexOf("/" + value) > -1) {
                        $(searchPokemonBigImg).addClass('privatefoundme');
                    }
                }
            }) // each
        } // end

        // custom search
        for (let i = 0; i < this.customArray.length; i++) {
            let value = this.customArray[i];
            if (value != "") {
                //custom pokemon search
                if (this.settings.customPokemon === true) {
                    this.searchForCustomPokemon(value, this.settings.fieldMale,
                                                this.settings.fieldFemale,
                                                this.settings.fieldNoGender);
                }

                //custom egg
                if (this.settings.customEgg === true) {
                    this.searchForCustomEgg(value);
                }

                //imgSearch with Pokémon
                if (this.settings.customPng === true) {
                    this.searchForCustomPng(value);
                }
            }
        }
    }
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
    releaseEnableReleaseAll() {
        if(this.settings.releaseSelectAll === true) {
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
    } // releaseAll
    moveEnableReleaseAll() {
        if(this.settings.releaseSelectAll === true) {
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
    } // moveEnableReleaseAll
}

const privateFieldsPage = new PrivateFieldsPage();
