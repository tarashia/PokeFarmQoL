let PrivateFieldsPage = (function PrivateFieldsPage() {
    const SETTINGS_SAVE_KEY = 'QoLPrivateFields';
    const DEFAULT_SETTINGS = {
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
	customItem: true,
    };
    let settings = DEFAULT_SETTINGS;
    let customArray = [];
    let typeArray = [];
    let natureArray = [];
    let eggGroupArray = [];
    let dexData = "";
    const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
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
	    for (let key in settings) {
		if (!settings.hasOwnProperty(key)) {
		    continue;
		}
		let value = settings[key];
		if (typeof value === 'boolean') {
		    Helpers.toggleSetting(key, value, false);
		    continue;
		}
	    }
	},
	settingsChange(element, textElement, customClass, typeClass) {
	    if (typeof (settings[element]) === 'boolean') {
                settings[element] = !settings[element];
		return true;
	    } else if (settings[element] === 'string') {
		if (element === 'fieldType') {
		    if (textElement === 'none') {
			let tempIndex = typeClass - 1;
			typeArray.splice(tempIndex, tempIndex);
			settings.fieldType = typeArray.toString();
		    } else {
			let tempIndex = typeClass - 1;
			typeArray[tempIndex] = textElement;
			settings.fieldType = typeArray.toString();
		    }
		}
		else if (element === 'fieldNature') {
		    if (textElement === 'none') {
			let tempIndex = typeClass - 1;
			natureArray.splice(tempIndex, tempIndex);
			settings.fieldNature = natureArray.toString();
		    } else {
			let tempIndex = typeClass - 1;
			natureArray[tempIndex] = textElement;
			settings.fieldNature = natureArray.toString();
		    }
		}
		else if (element === 'fieldEggGroup') {
		    if (textElement === 'none') {
			let tempIndex = typeClass - 1;
			eggGroupArray.splice(tempIndex, tempIndex);
			settings.fieldEggGroup = eggGroupArray.toString();
		    } else {
			let tempIndex = typeClass - 1;
			eggGroupArray[tempIndex] = textElement;
			settings.fieldEggGroup = eggGroupArray.toString();
		    }
		}
		else if (element === 'fieldCustom') {
		    let tempIndex = customClass - 1;
		    customArray[tempIndex] = textElement;
		    settings.fieldCustom = customArray.toString();
		}
		return true;
	    }
	    else { return false; }
	},
	setupHTML() {
	    document.querySelector('#field_field').insertAdjacentHTML('afterend', TEMPLATES.privateFieldSearchHTML);
	    const theField = `<div class='numberDiv'><label><input type="text" class="qolsetting" data-key="fieldCustom"/></label><input type='button' value='Remove' id='removePrivateFieldSearch'></div>`;
	    const theType = `<div class='typeNumber'> <select name="types" class="qolsetting" data-key="fieldType"> ` + GLOBALS.TYPE_OPTIONS + ` </select> <input type='button' value='Remove' id='removePrivateFieldTypeSearch'> </div>`;
	    const theNature = `<div class='natureNumber'> <select name="natures" class="qolsetting" data-key="fieldNature"> ` + GLOBALS.NATURE_OPTIONS + ` </select> <input type='button' value='Remove' id='removePrivateFieldNature'> </div>`;
	    const theEggGroup = `<div class='eggGroupNumber'> <select name="eggGroups" class="qolsetting" data-key="fieldEggGroup"> ` + GLOBALS.EGG_GROUP_OPTIONS + ` </select> <input type='button' value='Remove' id='removePrivateFieldEggGroup'> </div>`;
	    customArray = settings.fieldCustom.split(',');
	    typeArray = settings.fieldType.split(',');
	    natureArray = settings.fieldNature.split(',');
	    eggGroupArray = settings.fieldEggGroup.split(',');
	    Helpers.setupFieldArrayHTML(customArray, 'searchkeys', theField, 'numberDiv');
	    Helpers.setupFieldArrayHTML(typeArray, 'fieldTypes', theType, 'typeNumber');
	    Helpers.setupFieldArrayHTML(natureArray, 'natureTypes', theNature, 'natureNumber');
	    Helpers.setupFieldArrayHTML(eggGroupArray, 'eggGroupTypes', theEggGroup, 'eggGroupNumber');

            dexData = GLOBALS.DEX_DATA.split(',');
	},
	setupCSS() {
	    // same as public fields
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
		characterdata: true,
		subtree: true,
		characterDataOldValue: true,
	    });
	},
	setupHandlers() {
	    $(window).on('load', (() => {
		PFQoL.privateFieldCustomSearch();
	    }));

	    $(document).on('load', '.field', (function() {
		PFQoL.privateFieldCustomSearch();
	    }));

	    $(document).on('click', '#addPrivateFieldNatureSearch', (function() { //add field nature search
		PFQoL.privateFieldAddNatureSearch();
		PFQoL.privateFieldCustomSearch();
	    }));

	    $(document).on('click', '#removePrivateFieldNature', (function() { //remove field nature search
		PFQoL.privateFieldRemoveNatureSearch(this, $(this).parent().find('select').val());
		PFQoL.privateFieldCustomSearch();
	    }));

	    $(document).on('click', '#addPrivateFieldTypeSearch', (function() { //add field type list
		PFQoL.privateFieldAddTypeSearch();
		PFQoL.privateFieldCustomSearch();
	    }));

	    $(document).on('click', '#removePrivateFieldTypeSearch', (function() { //remove field type list
		PFQoL.privateFieldRemoveTypeSearch(this, $(this).parent().find('select').val());
		PFQoL.privateFieldCustomSearch();
	    }));

	    $(document).on('click', '#addPrivateFieldEggGroupSearch', (function() { //add egg group nature search
		PFQoL.privateFieldAddEggGroupSearch();
		PFQoL.privateFieldCustomSearch();
	    }));

	    $(document).on('click', '#removePrivateFieldEggGroup', (function() { //remove egg group nature search
		PFQoL.privateFieldRemoveEggGroupSearch(this, $(this).parent().find('select').val());
		PFQoL.privateFieldCustomSearch();
	    }));

	    $(document).on('change', '.qolsetting', (function() {
                console.log('private calzones')
		PFQoL.privateFieldCustomSearch();
	    }));

	    $(document).on('click', '*[data-menu="bulkmove"]', (function() { // select all feature
		PFQoL.moveFieldSelectAll();
	    }));

	},
	// specific
	customSearch() {
            let bigImgs = document.querySelectorAll('.privatefoundme')
            if(bigImgs !== null) {
                bigImgs.forEach((b) => {$(b).removeClass('privatefoundme')})
            }

            console.log('pie')
            console.log(typeArray, natureArray, eggGroupArray)
            const filteredTypeArray = typeArray.filter(v=>v!='');
            const filteredNatureArray = natureArray.filter(v=>v!='');
            const filteredEggGroupArray = eggGroupArray.filter(v=>v!='');

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

                    let searchEggGroup = $($(this).next()[0].querySelector('.fieldmontip')).children(':contains(Egg Group)')[0].innerText.slice("Egg Group: ".length)

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
        },
        addSelectSearch(cls, name, data_key, options, id, divParent) {
            console.log('panko')
            let theList = `<div class='${cls}'> <select name='${name}' class="qolsetting" data-key='${data_key}'> ${options} </select> <input type='button' value='Remove' id='${id}'> </div>`;
            let number = (`#${divParent}>div`).length;
            $(`#${divParent}`).append(theList);
            $(`.${cls}`).removeClass(cls).addClass(""+number+"");
        },
    };

    return API;
})(); // PrivateFieldsPage
