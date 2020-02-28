let LabPage = (function LabPage() {
    const SETTINGS_SAVE_KEY = 'QoLLab';
    const DEFAULT_SETTINGS = {
        findLabEgg: "",
        findLabType: "",
    };
    let settings = DEFAULT_SETTINGS;
    let searchArray = [];
    let listArray = [];
	let dexData = "";
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            API.customSearch();
        });
    });
    const API = {
        loadSettings() { // initial settings on first run and setting the variable settings key
            settings = Helpers.loadSettings(SETTINGS_SAVE_KEY, DEFAULT_SETTINGS, settings);
        },
        saveSettings() { // Save changed settings
            Helpers.saveSettings(SETTINGS_SAVE_KEY, settings)
        },
        getSettings() {
            return settings;
        },
        populateSettings() {
            for(let key in settings) {
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
			if (element === 'findLabEgg') {
				let tempIndex = customClass - 1;
				searchArray[tempIndex] = textElement;
				settings.findLabEgg = searchArray.toString();
				return true;
			}
			else if(element === 'findLabType') {
				if (textElement === 'none') {
					let tempIndex = typeClass - 1;
					listArray.splice(tempIndex, tempIndex);
					settings.findLabType = listArray.toString();
				} else {
					let tempIndex = typeClass - 1;
					listArray[tempIndex] = textElement;
					settings.findLabType = listArray.toString();
				}
				return true;
			}
			else { return false; }
        },
        setupHTML() {
            document.querySelector('#eggsbox360>p.center').insertAdjacentHTML('afterend', TEMPLATES.labOptionsHTML);
			document.querySelector('#egglist').insertAdjacentHTML('afterend', '<div id="labsuccess"></div>');

			let theField = `<div class='numberDiv'><label><input type="text" class="qolsetting" data-key="findLabEgg"/></label><input type='button' value='Remove' id='removeLabSearch'></div>`;
			searchArray = settings.findLabEgg.split(',');
			let numberOfValue = searchArray.length;

			let i;
			for (i = 0; i < numberOfValue; i++) {
				let rightDiv = i + 1;
				let rightValue = searchArray[i];
				$('#searchkeys').append(theField);
				$('.numberDiv').removeClass('numberDiv').addClass(""+rightDiv+"").find('.qolsetting').val(rightValue);
			}

			let theType = `<div class='typeNumber'> <select name="types" class="qolsetting" data-key="findLabType"> ` + GLOBALS.TYPE_OPTIONS + ` </select> <input type='button' value='Remove' id='removeLabTypeList'> </div>`;
			listArray = settings.findLabType.split(',');
			let numberOfType = listArray.length;

			let o;
			for (o = 0; o < numberOfType; o++) {
				let rightDiv = o + 1;
				let rightValue = listArray[o];
				$('#labTypes').append(theType);
				$('.typeNumber').removeClass('typeNumber').addClass(""+rightDiv+"").find('.qolsetting').val(rightValue);
			}

			dexData = GLOBALS.DEX_DATA.split(',');
        },
        setupCSS() {
            //lab css
			let labSuccessCss = $('#labpage>div').css('background-color');
			$('#labsuccess').css('background-color', labSuccessCss);
        },
        setupObserver() {
            observer.observe(document.querySelector('#labpage>div>div>div'), {
				childList: true,
				characterdata: true,
				subtree: true,
				characterDataOldValue: true,
			});
        },
        setupHandlers() {
            $(document).on('click', '#addLabSearch', (function() { //add lab text field
				API.addTextField();
			}));

			$(document).on('click', '#removeLabSearch', (function() { //remove lab text field
				API.removeTextField(this, $(this).parent().find('input').val());
                API.saveSettings();
			}));

			$(document).on('click', '#addLabTypeList', (function() { //add lab type list
				API.addTypeList();
			}));

			$(document).on('click', '#removeLabTypeList', (function() { //remove lab type list
				API.removeTypeList(this, $(this).parent().find('select').val());
                API.saveSettings();
			}));

			$(document).on('change', '#labCustomSearch input', (function() { //lab search
				API.customSearch();
			}));

			$(document).on('click', '#labpage', (function() { //shelter search
				API.customSearch();
			}));

            $(document).on('input', '.qolsetting', (function() { //Changes QoL settings
                API.settingsChange(this.getAttribute('data-key'), $(this).val(), $(this).parent().parent().attr('class'), $(this).parent().attr('class'));
                API.customSearch();
                API.saveSettings();
            }));

			$(window).on('load', (function() {
				API.customSearch();
			}));
        },
        addTextField() {
            let theField = `<div class='numberDiv'><label><input type="text" class="qolsetting" data-key="findLabEgg"/></label><input type='button' value='Remove' id='removeLabSearch'></div>`;
            let numberDiv = $('#searchkeys>div').length;
            $('#searchkeys').append(theField);
            $('.numberDiv').removeClass('numberDiv').addClass(""+numberDiv+"");
        },
        removeTextField(byebye, key) {
            searchArray = $.grep(searchArray, function(value) { //when textfield is removed, the value will be deleted from the localstorage
                return value != key;
            });
            settings.findCustom = searchArray.toString()

            $(byebye).parent().remove();

            let i;
            for(i = 0; i < $('#searchkeys>div').length; i++) {
                let rightDiv = i + 1;
                $('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
            }
        },
        addTypeList() {
            let theList = `<div class='typeNumber'> <select name="types" class="qolsetting" data-key="findLabType"> ` + GLOBALS.TYPE_OPTIONS + `</select> <input type='button' value='Remove' id='removeLabTypeList'> </div>`;
			let numberTypes = $('#labTypes>div').length;
			$('#labTypes').append(theList);
			$('.typeNumber').removeClass('typeNumber').addClass(""+numberTypes+"");
        },
        removeTypeList(byebye, key) {
            listArray = $.grep(listArray, function(value) {
                return value != key;
            });
            settings.findType = listArray.toString()

            $(byebye).parent().remove();

            for(let i = 0; i < $('#shelterTypes>div').length; i++) {
                let rightDiv = i + 1;
                $('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
            }
        },
        customSearch() {
            document.querySelector('#labsuccess').innerHTML="";
			$('#egglist>div>img').removeClass('shelterfoundme');

			if (listArray.length == 1 && listArray[0] == "") {
				let iDontWork = true;
			} else {
				let typesArrayNoEmptySpace = listArray.filter(v=>v!='');
				let typeSearchAmount = typesArrayNoEmptySpace.length;
				let i;
				for (i = 0; i < typeSearchAmount; i++) {
					let value = typesArrayNoEmptySpace[i];
					let amountOfTypesFound = [];
					let typePokemonNames = [];

					$('#egglist>div>h3').each(function() {
						let searchPokemon = ($(this).text().split(' ')[0]);
						let searchTypeOne = dexData[dexData.indexOf('"'+searchPokemon+'"') + 1];
						let searchTypeTwo = dexData[dexData.indexOf('"'+searchPokemon+'"') + 2];
						if (searchTypeOne === value) {
							amountOfTypesFound.push('found');
							typePokemonNames.push(searchPokemon);
						}

						if (searchTypeTwo === value) {
							amountOfTypesFound.push('found');
							typePokemonNames.push(searchPokemon);
						}
					})

					let foundType = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(value) + 2];

					let typeImgStandOutLength = typePokemonNames.length;
					let o;
					for (o = 0; o < typeImgStandOutLength; o++) {
						let value = typePokemonNames[o];
						let shelterImgSearch = $("#egglist>div>h3:containsIN("+value+")")
						let shelterBigImg = shelterImgSearch.next();
						$(shelterBigImg).addClass('shelterfoundme');
					}

					if (amountOfTypesFound.length < 1) {
						let iDontDoAnything = true;
					} else if (amountOfTypesFound.length > 1) {
						document.querySelector('#labsuccess').insertAdjacentHTML('beforeend','<div id="labfound">'+amountOfTypesFound.length+' '+foundType+' egg types found! ('+typePokemonNames.toString()+')</div>');
					} else {
						document.querySelector('#labsuccess').insertAdjacentHTML('beforeend','<div id="labfound">'+amountOfTypesFound.length+' '+foundType+' egg type found! ('+typePokemonNames.toString()+')</div>');
					}
				}
			}

			if (searchArray.length == 1 && searchArray[0] == "") {
				let iDontDoAnything = true;
			} else {
				let customSearchAmount = searchArray.length;
				let i;
				for (i = 0; i < customSearchAmount; i++) {
				let value = searchArray[i];
					if ($("#egglist>div>h3:containsIN("+value+")").length) {
						let searchResult = value;

						let shelterImgSearch = $("#egglist>div>h3:containsIN("+value+")")
						let shelterBigImg = shelterImgSearch.next();
						$(shelterBigImg).addClass('shelterfoundme');

						if ($("#egglist>div>h3:containsIN("+value+")").length > 1) {
							document.querySelector('#labsuccess').insertAdjacentHTML('beforeend','<div id="labfound">'+searchResult+' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
						} else {
							document.querySelector('#labsuccess').insertAdjacentHTML('beforeend','<div id="labfound">'+searchResult+' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
						}
					}

					if ($('#egglist>div img[src*="'+value+'"]').length) {
						let searchResult = $('#egglist>div img[src*="'+value+'"]').prev().text();

						let shelterImgSearch = $('#egglist>div img[src*="'+value+'"]')
						$(shelterImgSearch).addClass('shelterfoundme');

						if ($('#egglist>div img[src*="'+value+'"]').length > 1) {
							document.querySelector('#labsuccess').insertAdjacentHTML('beforeend','<div id="labfound">'+searchResult+' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
						} else {
							document.querySelector('#labsuccess').insertAdjacentHTML('beforeend','<div id="labfound">'+searchResult+' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
						}
					}
				}
			}
        },
//             eggNoDuplicateArray = settings.NewEggDuplicate.split(',');
//             let eggList = eggNoDuplicateArray.length;
//             let i;
//             for (i = 0; i < eggList; i++) {
//                 let value = eggNoDuplicateArray[i];
//                 if (element === 'url("https://'+value+'")') {
//                     let index = eggNoDuplicateArray.indexOf(value);
//                     if (index > -1) {
//                         eggNoDuplicateArray.splice(index, 1);
//                         settings.NewEggDuplicate = eggNoDuplicateArray.toString();
//                     }
//                 }
//             }
//         },
    };

    return API;
})(); // LabPage