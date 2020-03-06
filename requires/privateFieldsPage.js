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
        releaseSelectAll : true,
    };
    let settings = DEFAULT_SETTINGS;
    let customArray = [];
    let typeArray = [];
    let natureArray = [];
    let eggGroupArray = [];
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
            } else if (typeof (settings[element]) === 'string') {
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
                API.customSearch();
            }));

            $(document).on('load', '.field', (function() {
                API.customSearch();
            }));

            $(document).on('click', '*[data-menu="release"]', (function() { //select all feature
                API.releaseEnableReleaseAll();
            }));

            $(document).on('click', '#addPrivateFieldNatureSearch', (function() { //add field nature search
                API.addSelectSearch('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS, 'removePrivateFieldNature', 'natureTypes')
                API.customSearch();
            }));

            $(document).on('click', '#removePrivateFieldNature', (function() { //remove field nature search
                natureArray = API.removeSelectSearch(typeArray, this, $(this).parent().find('select').val(), 'fieldNature', 'natureTypes')
                API.saveSettings();
                API.customSearch();
            }));

            $(document).on('click', '#addPrivateFieldTypeSearch', (function() { //add field type list
                API.addSelectSearch('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS, 'removePrivateFieldTypeSearch', 'fieldTypes');
                API.customSearch();
            }));

            $(document).on('click', '#removePrivateFieldTypeSearch', (function() { //remove field type list
                typeArray = API.removeSelectSearch(typeArray, this, $(this).parent().find('select').val(), 'fieldType', 'fieldTypes')
                API.saveSettings();
                API.customSearch();
            }));

            $(document).on('click', '#addPrivateFieldEggGroupSearch', (function() { //add egg group nature search
                API.addSelectSearch('eggGroupNumber', 'eggGroups', 'fieldEggGroup', GLOBALS.EGG_GROUP_OPTIONS, 'removePrivateFieldEggGroupSearch', 'eggGroupTypes')
                API.customSearch();
            }));

            $(document).on('click', '#removePrivateFieldEggGroup', (function() { //remove egg group nature search
                eggGroupArray = API.removeSelectSearch(typeArray, this, $(this).parent().find('select').val(), 'fieldEggGroup', 'eggGroupTypes')
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

            $(document).on('click', '*[data-menu="bulkmove"]', (function() { // select all feature
                API.moveEnableReleaseAll();
            }));

        },
        // specific
        customSearch() {
            let dexData = GLOBALS.DEX_DATA;
            let bigImgs = document.querySelectorAll('.privatefoundme')
            if(bigImgs !== null) {
                bigImgs.forEach((b) => {$(b).removeClass('privatefoundme')})
            }

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
        },
        addSelectSearch(cls, name, data_key, options, id, divParent) {
            let theList = `<div class='${cls}'> <select name='${name}' class="qolsetting" data-key='${data_key}'> ${options} </select> <input type='button' value='Remove' id='${id}'> </div>`;
            let number = (`#${divParent}>div`).length;
            $(`#${divParent}`).append(theList);
            $(`.${cls}`).removeClass(cls).addClass(""+number+"");
        },
        removeSelectSearch(arr, byebye, key, settingsKey, divParent) {
            arr = $.grep(arr, function(value) { return value != key; });
            settings[settingsKey] = arr.toString();

            $(byebye).parent().remove();

            for(let i = 0; i < $(`#${divParent}>div`).length; i++) {
                let rightDiv = i + 1;
                $('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
            }

            return arr;
        },
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
    };

    return API;
})(); // PrivateFieldsPage
