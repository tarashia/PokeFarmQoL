/* globals Page */
// eslint-disable-next-line no-unused-vars
class ShelterPageBase extends Page {
    constructor(jQuery, localStorageMgr, helpers, GLOBALS, SETTINGS) {
        super(jQuery, localStorageMgr, helpers, GLOBALS.SHELTER_PAGE_SETTINGS_KEY, {
            findCustom: '',
            findType: '',
            findTypeEgg: true,
            findTypePokemon: false,
            findNewEgg: true,
            findNewPokemon: true,
            findShiny: true,
            findAlbino: true,
            findMelanistic: true,
            findPrehistoric: true,
            findDelta: true,
            findMega: true,
            findStarter: true,
            findCustomSprite: true,
            findLegendary: false,
            findMale: true,
            findFemale: true,
            findNoGender: true,
            customEgg: true,
            customPokemon: true,
            customPng: false,
            shelterGrid: true,
        }, 'shelter', SETTINGS);
        this.customArray = [];
        this.typeArray = [];
        const obj = this;
        this.observer = new MutationObserver(function (mutations) {
            // eslint-disable-next-line no-unused-vars
            mutations.forEach(function (mutation) {
                obj.customSearch(GLOBALS);
            });
        });

        /*
         * used to keep track of the currently selected match
         * matches can be selected via a shortcut key, specified via this.selectNextMatchKey
         */
        this.selectNextMatchKey = 78; // 'n'
        this.currentlySelectedMatch = undefined;
    }

    setupHTML(GLOBALS) {
        if(this.globalSettings.shelterFeatureEnables.search) {
            this.jQuery('.tabbed_interface.horizontal>div').removeClass('tab-active');
            this.jQuery('.tabbed_interface.horizontal>ul>li').removeClass('tab-active');
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterbegin', '<li class="tab-active"><label>Search</label></li>');
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.shelterOptionsHTML);
            this.jQuery('#shelteroptionsqol').addClass('tab-active');

            document.querySelector('#sheltercommands').insertAdjacentHTML('beforebegin', '<div id="sheltersuccess"></div>');

            const theField = this.helpers.textSearchDiv('numberDiv', 'findCustom', 'removeShelterTextfield', 'customArray');
            const theType = this.helpers.selectSearchDiv('typeNumber', 'types', 'findType', GLOBALS.TYPE_OPTIONS,
                'removeShelterTypeList', 'fieldTypes', 'typeArray');

            this.customArray = this.settings.findCustom.split(',');
            this.typeArray = this.settings.findType.split(',');

            this.helpers.setupFieldArrayHTML(this.jQuery, this.customArray, 'searchkeys', theField, 'numberDiv');
            this.helpers.setupFieldArrayHTML(this.jQuery, this.typeArray, 'shelterTypes', theType, 'typeNumber');

            this.jQuery('[data-shelter=reload]').addClass('customSearchOnClick');
            this.jQuery('[data-shelter=whiteflute]').addClass('customSearchOnClick');
            this.jQuery('[data-shelter=blackflute]').addClass('customSearchOnClick');
        }
        if(this.globalSettings.shelterFeatureEnables.sort) {
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterbegin', '<li class=""><label>Sort</label></li>');
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterend', '<div id="qolsheltersort"><label><input type="checkbox" class="qolsetting" data-key="shelterGrid"/><span>Sort by Grid</span></label>');
        }
    }
    setupCSS() {
        if(this.globalSettings.shelterFeatureEnables.search ||
            this.globalSettings.shelterFeatureEnables.sort) {
            const shelterSuccessCss = this.jQuery('#sheltercommands').css('background-color');
            this.jQuery('#sheltersuccess').css('background-color', shelterSuccessCss);
            this.jQuery('.tooltiptext').css('background-color', this.jQuery('.tooltip_content').eq(0).css('background-color'));
            const background = this.jQuery('#shelterpage>.panel').eq(0).css('border');
            this.jQuery('.tooltiptext').css('border', '' + background + '');
        }
    }
    setupObserver() {
        this.observer.observe(document.querySelector('#shelterarea'), {
            childList: true,
        });
    }
    setupHandlers(GLOBALS) {
        const obj = this;
        this.jQuery(document).on('change', '#shelteroptionsqol input', (function () { //shelter search
            obj.loadSettings();
            obj.customSearch(GLOBALS);
            obj.saveSettings();
        }));

        this.jQuery(document).on('change', '.qolsetting', (function () {
            obj.loadSettings();
            obj.customSearch(GLOBALS);
            obj.saveSettings();
        }));

        this.jQuery(document).on('input', '.qolsetting', (function () { //Changes QoL settings
            obj.settingsChange(this.getAttribute('data-key'),
                obj.jQuery(this).val(),
                obj.jQuery(this).parent().parent().attr('class'),
                obj.jQuery(this).parent().attr('class'),
                (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
            obj.customSearch(GLOBALS);
            obj.saveSettings();
        }));

        this.jQuery('.customSearchOnClick').on('click', (function () {
            obj.loadSettings();
            obj.customSearch(GLOBALS);
            obj.saveSettings();
        }));

        this.jQuery(document).on('click', '#addShelterTextfield', (function () { //add shelter text field
            obj.addTextField();
            obj.saveSettings();
        }));

        this.jQuery(document).on('click', '#removeShelterTextfield', (function () { //remove shelter text field
            obj.removeTextField(this, obj.jQuery(this).parent().find('input').val());
            obj.saveSettings();
            obj.customSearch(GLOBALS);
        }));

        this.jQuery(document).on('click', '#addShelterTypeList', (function () { //add shelter type list
            obj.addTypeList(GLOBALS);
            obj.customSearch(GLOBALS);
        }));

        this.jQuery(document).on('click', '#removeShelterTypeList', (function () { //remove shelter type list
            obj.removeTypeList(this, obj.jQuery(this).parent().find('select').val());
            obj.saveSettings();
            obj.customSearch(GLOBALS);
        }));

        this.jQuery(window).on('keyup.qol_shelter_shortcuts', function (a) {
            if (0 == obj.jQuery(a.target).closest('input, textarea').length) {
                switch (a.keyCode) {
                case obj.selectNextMatchKey: {
                    const numMatches = obj.jQuery('#shelterarea').find('.pokemon').find('.shelterfoundme').length;

                    // remove all existing locks
                    obj.jQuery('#shelterarea').find('.pokemon').removeClass('lock').removeClass('dismiss');

                    // default is undefined, so set the value to either 0 or 1+current
                    obj.currentlySelectedMatch = (obj.currentlySelectedMatch + 1) || 0;

                    if (numMatches) {
                        const modIndex = (numMatches == 1) ? 0 : (obj.currentlySelectedMatch + 1) % numMatches - 1;
                        const selected = obj.jQuery('#shelterarea').find('.pokemon').find('.shelterfoundme').parent().eq(modIndex);
                        // these steps mimic clicking on the pokemon/egg
                        selected.parent().addClass('selected');
                        selected.addClass('tooltip_trigger').addClass('lock').removeClass('dismiss');
                        selected.next().find('[data-shelter=adopt]').focus();
                    } else {
                        obj.currentlySelectedMatch = undefined;
                    }
                }
                }
            }
        });
    }
    addTextField() {
        const theField = this.helpers.textSearchDiv('numberDiv', 'findCustom', 'removeShelterTextfield', 'customArray');
        const numberDiv = this.jQuery('#searchkeys>div').length;
        this.jQuery('#searchkeys').append(theField);
        this.jQuery('.numberDiv').removeClass('numberDiv').addClass('' + numberDiv + '');
    }
    removeTextField(byebye, key) {
        this.customArray = this.jQuery.grep(this.customArray, function (value) { //when textfield is removed, the value will be deleted from the localstorage
            return value != key;
        });
        this.settings.findCustom = this.customArray.toString();

        this.jQuery(byebye).parent().remove();

        let i;
        for (i = 0; i < this.jQuery('#searchkeys>div').length; i++) {
            const rightDiv = i + 1;
            this.jQuery('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }
    }
    addTypeList(GLOBALS) {
        const theList = this.helpers.selectSearchDiv('typeNumber', 'types', 'findType', GLOBALS.TYPE_OPTIONS,
            'removeShelterTypeList', 'fieldTypes', 'typeArray');
        const numberTypes = this.jQuery('#shelterTypes>div').length;
        this.jQuery('#shelterTypes').append(theList);
        this.jQuery('.typeNumber').removeClass('typeNumber').addClass('' + numberTypes + '');
    }
    removeTypeList(byebye, key) {
        this.typeArray = this.jQuery.grep(this.typeArray, function (value) {
            return value != key;
        });
        this.settings.findType = this.typeArray.toString();

        this.jQuery(byebye).parent().remove();

        let i;
        for (i = 0; i < this.jQuery('#shelterTypes>div').length; i++) {
            const rightDiv = i + 1;
            this.jQuery('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }
    }
    insertShelterFoundDiv(number, name, img) {
        document.querySelector('#sheltersuccess').
            insertAdjacentHTML('beforeend',
                '<div id="shelterfound">' + name + ((number !== 1) ? 's' : '') + ' found ' + img + '</div>');
    }
    insertShelterTypeFoundDiv(number, type, stage, names) {
        let stageNoun = '';
        if (stage === 'egg') {
            stageNoun = stage + (number !== 1 ? 's' : '');
        } else { // i.e. stage === 'Pokemon'
            stageNoun = stage;
        }
        document.querySelector('#sheltersuccess').
            insertAdjacentHTML('beforeend',
                '<div id="shelterfound">' + number + ' ' + type + ' type ' +
                stageNoun + ' found!' + (names.length > 0 ? '(' + names.toString() + ')' : '') + '</div>');
    }

    searchForImgTitle(GLOBALS, key) {
        const SEARCH_DATA = GLOBALS.SHELTER_SEARCH_DATA;
        const keyIndex = SEARCH_DATA.indexOf(key);
        const value = SEARCH_DATA[keyIndex + 1];
        const selected = this.jQuery('img[title*="' + value + '"]');
        const cls = this.helpers.getPokemonImageClass();
        if (selected.length) {
            const searchResult = SEARCH_DATA[keyIndex + 2]; //type of Pokémon found
            const imgResult = selected.length + ' ' + searchResult; //amount + type found
            const imgFitResult = SEARCH_DATA[keyIndex + 3]; //image for type of Pokémon
            const shelterBigImg = selected.parent().prev().children(`img.${cls}`);
            this.jQuery(shelterBigImg).addClass('shelterfoundme');

            this.insertShelterFoundDiv(selected.length, imgResult, imgFitResult);
        }
    }

    searchForTooltipText(GLOBALS, key) {
        const LIST = GLOBALS.SHELTER_SEARCH_LISTS[key];
        const SEARCH_DATA = GLOBALS.SHELTER_SEARCH_DATA;
        const keyIndex = SEARCH_DATA.indexOf(key);
        for (let i = 0; i < LIST.length; i++) {
            const entry = LIST[i];
            const selected = this.jQuery(`div.pokemon+div.tooltip_content:contains('${entry}')`);
            if (selected.length) {
                const searchResult = SEARCH_DATA[keyIndex + 2]; //type of Pokémon found
                const imgResult = selected.length + ' ' + searchResult; //amount + type found
                const imgFitResult = SEARCH_DATA[keyIndex + 3]; //image for type of Pokémon
                const shelterBigImg = selected.prev().children('img.big');
                shelterBigImg.addClass('shelterfoundme');

                this.insertShelterFoundDiv(selected.length, imgResult, imgFitResult);
            }
        }
    }

    searchForTypes(GLOBALS, types) {
        const obj = this;
        const dexData = GLOBALS.DEX_DATA;
        const cls = this.helpers.getPokemonImageClass();
        for (let i = 0; i < types.length; i++) {
            const value = types[i];
            const foundType = GLOBALS.SHELTER_TYPE_TABLE[GLOBALS.SHELTER_TYPE_TABLE.indexOf(value) + 2];

            let typePokemonNames = [];
            let selected = undefined;
            if (this.settings.findTypeEgg === true) {
                const pokemonElems = [];
                typePokemonNames = [];
                selected = this.jQuery('#shelterarea>.tooltip_content:contains("Egg")');
                selected.each(function () {
                    const searchPokemon = (obj.jQuery(this).text().split(' ')[0]);
                    let searchTypeOne = '';
                    let searchTypeTwo = '';

                    const searchPokemonIndex = dexData.indexOf('"' + searchPokemon + '"');
                    searchTypeOne = dexData[searchPokemonIndex + 1];
                    searchTypeTwo = dexData[searchPokemonIndex + 2];

                    if ((searchTypeOne === value) || (searchTypeTwo === value)) {
                        typePokemonNames.push(searchPokemon);
                        pokemonElems.push(this);
                    }
                });

                for (let o = 0; o < pokemonElems.length; o++) {
                    const shelterImgSearch = this.jQuery(pokemonElems[o]);
                    const shelterBigImg = shelterImgSearch.prev().children(`img.${cls}`);
                    this.jQuery(shelterBigImg).addClass('shelterfoundme');
                }

                this.insertShelterTypeFoundDiv(typePokemonNames.length, foundType, 'egg', typePokemonNames);
            }

            if (this.settings.findTypePokemon === true) {
                typePokemonNames = [];
                selected = this.jQuery('#shelterarea>.tooltip_content').not(':contains("Egg")');
                selected.each(function () {
                    const searchPokemon = (obj.jQuery(this).text().split(' ')[0]);
                    const searchPokemonIndex = dexData.indexOf('"' + searchPokemon + '"');
                    const searchTypeOne = dexData[searchPokemonIndex + 1];
                    const searchTypeTwo = dexData[searchPokemonIndex + 2];
                    if ((searchTypeOne === value) || (searchTypeTwo === value)) {
                        typePokemonNames.push(searchPokemon);
                    }
                });

                for (let o = 0; o < typePokemonNames.length; o++) {
                    const shelterImgSearch = this.jQuery('#shelterarea .tooltip_content:containsIN(\'' + typePokemonNames[o] + ' (\')');
                    const shelterBigImg = shelterImgSearch.prev().children(`img.${cls}`);
                    this.jQuery(shelterBigImg).addClass('shelterfoundme');
                }

                this.insertShelterTypeFoundDiv(typePokemonNames.length, foundType, 'Pokemon', typePokemonNames);
            }
        }

    }

    customSearch(GLOBALS) {
        const obj = this;
        const SEARCH_DATA = GLOBALS.SHELTER_SEARCH_DATA;
        const cls = this.helpers.getPokemonImageClass();

        // search whatever you want to find in the shelter & grid

        if(this.globalSettings.shelterFeatureEnables.sort) {
            //sort in grid
            this.jQuery('#shelterarea').removeClass('qolshelterareagrid');
            this.jQuery('.mq2 #shelterarea').removeClass('qolshelterareagridmq2');
            this.jQuery('#shelterarea .tooltip_content').removeClass('qoltooltipgrid');
            this.jQuery('#shelterpage #shelter #shelterarea > .pokemon').removeClass('qolpokemongrid');
            this.jQuery('#sheltergridthingy').remove();

            if (this.settings.shelterGrid === true) { //shelter grid
                this.jQuery('#shelterarea').addClass('qolshelterareagrid');
                this.jQuery('.mq2 #shelterarea').addClass('qolshelterareagridmq2');
                this.jQuery('#shelterarea .tooltip_content').addClass('qoltooltipgrid');
                this.jQuery('#shelterpage #shelter #shelterarea > .pokemon').addClass('qolpokemongrid');
                this.jQuery('head').append('<style id="sheltergridthingy">#shelterarea:before{display:none !important;}</style>');
            }
        }

        if(this.globalSettings.shelterFeatureEnables.search) {
        /*
         * search values depending on settings
         * emptying the sheltersuccess div to avoid duplicates
         */
            document.querySelector('#sheltersuccess').innerHTML = '';
            this.jQuery('#shelterarea>div>img').removeClass('shelterfoundme');

            if (this.settings.findShiny === true) {
                this.searchForImgTitle(GLOBALS, 'findShiny');
            }
            if (this.settings.findAlbino === true) {
                this.searchForImgTitle(GLOBALS, 'findAlbino');
            }
            if (this.settings.findMelanistic === true) {
                this.searchForImgTitle(GLOBALS, 'findMelanistic');
            }
            if (this.settings.findPrehistoric === true) {
                this.searchForImgTitle(GLOBALS, 'findPrehistoric');
            }
            if (this.settings.findDelta === true) {
                this.searchForImgTitle(GLOBALS, 'findDelta');
            }
            if (this.settings.findMega === true) {
                this.searchForImgTitle(GLOBALS, 'findMega');
            }
            if (this.settings.findStarter === true) {
                this.searchForImgTitle(GLOBALS, 'findStarter');
            }
            if (this.settings.findCustomSprite === true) {
                this.searchForImgTitle(GLOBALS, 'findCustomSprite');
            }
            if (this.settings.findLegendary === true) {
                this.searchForTooltipText(GLOBALS, 'findLegendary');
            }

            if (this.settings.findNewPokemon === true) {
                const key = 'findNewPokemon';
                const value = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 1];
                const selected = this.jQuery('#shelterarea .tooltip_content:contains(' + value + ')');
                if (selected.length) {
                    const searchResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 2];
                    const imgFitResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 3];
                    const tooltipResult = selected.length + ' ' + searchResult;
                    const shelterImgSearch = selected;
                    const shelterBigImg = shelterImgSearch.prev().children(`img.${cls}`);
                    this.jQuery(shelterBigImg).addClass('shelterfoundme');

                    this.insertShelterFoundDiv(selected.length, tooltipResult, imgFitResult);
                }
            }

            if (this.settings.findNewEgg === true) {
                const key = 'findNewEgg';
                const value = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 1];
                const selected = this.jQuery('#shelterarea .tooltip_content:contains(' + value + ')').filter(function () {
                // .text() will include the text in the View/Adopt and Hide buttons, so there will be a space
                    return obj.jQuery(this).text().startsWith(value + ' ');
                });

                if (selected.length) {
                    const searchResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 2];
                    const imgFitResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 3];
                    if (selected.length >= 1) {
                        const shelterImgSearch = selected;
                        const shelterBigImg = shelterImgSearch.prev().children(`img.${cls}`);
                        this.jQuery(shelterBigImg).addClass('shelterfoundme');
                    }
                    this.insertShelterFoundDiv(selected.length, searchResult, imgFitResult);
                }
            }

            //loop to find all search genders for the custom
            const shelterValueArrayCustom = [];
            for (const key in this.settings) {
                const value = this.settings[key];
                if (value === true) {
                    if (key === 'findMale' || key === 'findFemale' || key === 'findNoGender') {
                        const searchKey = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(key) + 1];
                        shelterValueArrayCustom.push(searchKey);
                    }
                }
            }

            //loop to find all the custom search parameters
            const customSearchAmount = this.customArray.length;
            const heartPng = '<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952">';
            const eggPng = '<img src="//pfq-static.com/img/pkmn/egg.png/t=1451852195">';
            for (let i = 0; i < customSearchAmount; i++) {
                const customValue = this.customArray[i];
                if (customValue != '') {
                //custom pokemon search
                    if (this.settings.customPokemon === true) {
                        const genderMatches = [];
                        if (shelterValueArrayCustom.indexOf('[M]') > -1) {
                            genderMatches.push('[M]');
                        }
                        if (shelterValueArrayCustom.indexOf('[F]') > -1) {
                            genderMatches.push('[F]');
                        }
                        if (shelterValueArrayCustom.indexOf('[N]') > -1) {
                            genderMatches.push('[N]');
                        }

                        if (genderMatches.length > 0) {
                            for (let i = 0; i < genderMatches.length; i++) {
                                const genderMatch = genderMatches[i];
                                const selected = this.jQuery('#shelterarea .tooltip_content:containsIN(' + customValue + ') img[title*=\'' + genderMatch + '\']');
                                if (selected.length) {
                                    const searchResult = customValue;
                                    const genderName = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(genderMatch) + 1];
                                    const imgGender = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(genderMatch) + 2];
                                    const tooltipResult = selected.length + ' ' + genderName + imgGender + ' ' + searchResult;
                                    const shelterImgSearch = selected;
                                    const shelterBigImg = shelterImgSearch.parent().prev().children(`img.${cls}`);
                                    this.jQuery(shelterBigImg).addClass('shelterfoundme');

                                    this.insertShelterFoundDiv(selected.length, tooltipResult, heartPng);
                                }
                            }
                        }

                        //No genders
                        else if (shelterValueArrayCustom.length === 0) {
                            const selected = this.jQuery('#shelterarea .tooltip_content:containsIN(' + customValue + '):not(:containsIN("Egg"))');
                            if (selected.length) {
                                const searchResult = customValue;
                                const tooltipResult = selected.length + ' ' + searchResult;
                                const shelterImgSearch = selected;
                                const shelterBigImg = shelterImgSearch.parent().prev().children(`img.${cls}`);
                                this.jQuery(shelterBigImg).addClass('shelterfoundme');
                                this.insertShelterFoundDiv(selected.length, tooltipResult, heartPng);
                            }
                        }
                    }

                    //custom egg
                    if (this.settings.customEgg === true) {
                        const selected = this.jQuery('#shelterarea .tooltip_content:containsIN(' + customValue + '):contains("Egg")');
                        if (selected.length) {
                            const searchResult = customValue;
                            const tooltipResult = selected.length + ' ' + searchResult;
                            const shelterImgSearch = selected;
                            const shelterBigImg = shelterImgSearch.prev().children(`img.${cls}`);
                            this.jQuery(shelterBigImg).addClass('shelterfoundme');
                            this.insertShelterFoundDiv(selected.length, tooltipResult, eggPng);
                        }
                    }

                    //imgSearch with Pokémon
                    if (this.settings.customPng === true) {
                        const selected = this.jQuery(`#shelterarea img.${cls}[src*="${customValue}"]`);
                        if (selected.length) {
                            const searchResult = selected.parent().next().text().split('(')[0];
                            const tooltipResult = selected.length + ' ' + searchResult + ' (Custom img search)';
                            const shelterImgSearch = selected;
                            this.jQuery(shelterImgSearch).addClass('shelterfoundme');
                            this.insertShelterFoundDiv(selected.length, tooltipResult, heartPng);
                        }
                    }
                }
            }

            //loop to find all the types

            const filteredTypeArray = this.typeArray.filter(v => v != '');

            if (filteredTypeArray.length > 0) {
                obj.searchForTypes(GLOBALS, filteredTypeArray);
            }
        }
    } // customSearch
}
