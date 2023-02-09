class ShelterPage extends Page {
    constructor() {
        const defaultPageSettings = {
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
        };
        super(Globals.SHELTER_PAGE_SETTINGS_KEY, defaultPageSettings, 'shelter');
        this.customArray = [];
        this.typeArray = [];
        const obj = this;
        this.observer = new MutationObserver(function () {
            obj.customSearch();
        });

        /*
         * used to keep track of the currently selected match
         * matches can be selected via a shortcut key, specified via this.selectNextMatchKey
         */
        this.selectNextMatchKey = 78; // 'n'
        this.currentlySelectedMatch = undefined;
    }

    setupHTML() {
        if(this.USER_SETTINGS.shelterFeatureEnables.search) {
            $('.tabbed_interface.horizontal>div').removeClass('tab-active');
            $('.tabbed_interface.horizontal>ul>li').removeClass('tab-active');
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterbegin', '<li class="tab-active"><label>Search</label></li>');
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterend', Resources.shelterOptionsHTML());
            $('#shelteroptionsqol').addClass('tab-active');

            document.querySelector('#sheltercommands').insertAdjacentHTML('beforebegin', '<div id="sheltersuccess"></div>');

            const theField = Helpers.textSearchDiv('numberDiv', 'findCustom', 'removeShelterTextfield', 'customArray');
            const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'findType', Globals.TYPE_OPTIONS,
                'removeShelterTypeList', 'fieldTypes', 'typeArray');

            this.customArray = this.settings.findCustom.split(',');
            this.typeArray = this.settings.findType.split(',');

            Helpers.setupFieldArrayHTML(this.customArray, 'searchkeys', theField, 'numberDiv');
            Helpers.setupFieldArrayHTML(this.typeArray, 'shelterTypes', theType, 'typeNumber');

            $('[data-shelter=reload]').addClass('customSearchOnClick');
            $('[data-shelter=whiteflute]').addClass('customSearchOnClick');
            $('[data-shelter=blackflute]').addClass('customSearchOnClick');
        }
        if(this.USER_SETTINGS.shelterFeatureEnables.sort) {
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterbegin', '<li class=""><label>Sort</label></li>');
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterend', '<div id="qolsheltersort"><label><input type="checkbox" class="qolsetting" data-key="shelterGrid"/><span>Sort by Grid</span></label>');
        }
    }
    setupCSS() {
        if(this.USER_SETTINGS.shelterFeatureEnables.search ||
            this.USER_SETTINGS.shelterFeatureEnables.sort) {
            const shelterSuccessCss = $('#sheltercommands').css('background-color');
            $('#sheltersuccess').css('background-color', shelterSuccessCss);
            $('.tooltiptext').css('background-color', $('.tooltip_content').eq(0).css('background-color'));
            const background = $('#shelterpage>.panel').eq(0).css('border');
            $('.tooltiptext').css('border', '' + background + '');
        }
    }
    setupObserver() {
        this.observer.observe(document.querySelector('#shelterarea'), {
            childList: true,
        });
    }
    setupHandlers() {
        const obj = this;
        $(document).on('change', '#shelteroptionsqol input', (function () { //shelter search
            obj.loadSettings();
            obj.customSearch();
            obj.saveSettings();
        }));

        $(document).on('change', '.qolsetting', (function () {
            obj.loadSettings();
            obj.customSearch();
            obj.saveSettings();
        }));

        $(document).on('input', '.qolsetting', (function () { //Changes QoL settings
            obj.settingsChange(this.getAttribute('data-key'),
                $(this).val(),
                $(this).parent().parent().attr('class'),
                $(this).parent().attr('class'),
                (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
            obj.customSearch();
            obj.saveSettings();
        }));

        $('.customSearchOnClick').on('click', (function () {
            obj.loadSettings();
            obj.customSearch();
            obj.saveSettings();
        }));

        $(document).on('click', '#addShelterTextfield', (function () { //add shelter text field
            obj.addTextField();
            obj.saveSettings();
        }));

        $(document).on('click', '#removeShelterTextfield', (function () { //remove shelter text field
            obj.removeTextField(this, $(this).parent().find('input').val());
            obj.saveSettings();
            obj.customSearch();
        }));

        $(document).on('click', '#addShelterTypeList', (function () { //add shelter type list
            obj.addTypeList();
            obj.customSearch();
        }));

        $(document).on('click', '#removeShelterTypeList', (function () { //remove shelter type list
            obj.removeTypeList(this, $(this).parent().find('select').val());
            obj.saveSettings();
            obj.customSearch();
        }));

        $(window).on('keyup.qol_shelter_shortcuts', function (a) {
            if (0 == $(a.target).closest('input, textarea').length) {
                switch (a.keyCode) {
                case obj.selectNextMatchKey: {
                    const numMatches = $('#shelterarea').find('.pokemon').find('.shelterfoundme').length;

                    // remove all existing locks
                    $('#shelterarea').find('.pokemon').removeClass('lock').removeClass('dismiss');

                    // default is undefined, so set the value to either 0 or 1+current
                    obj.currentlySelectedMatch = (obj.currentlySelectedMatch + 1) || 0;

                    if (numMatches) {
                        const modIndex = (numMatches == 1) ? 0 : (obj.currentlySelectedMatch + 1) % numMatches - 1;
                        const selected = $('#shelterarea').find('.pokemon').find('.shelterfoundme').parent().eq(modIndex);
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
        const theField = Helpers.textSearchDiv('numberDiv', 'findCustom', 'removeShelterTextfield', 'customArray');
        const numberDiv = $('#searchkeys>div').length;
        $('#searchkeys').append(theField);
        $('.numberDiv').removeClass('numberDiv').addClass('' + numberDiv + '');
    }
    removeTextField(byebye, key) {
        this.customArray = $.grep(this.customArray, function (value) { //when textfield is removed, the value will be deleted from the localstorage
            return value != key;
        });
        this.settings.findCustom = this.customArray.toString();

        $(byebye).parent().remove();

        let i;
        for (i = 0; i < $('#searchkeys>div').length; i++) {
            const rightDiv = i + 1;
            $('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }
    }
    addTypeList() {
        const theList = Helpers.selectSearchDiv('typeNumber', 'types', 'findType', Globals.TYPE_OPTIONS,
            'removeShelterTypeList', 'fieldTypes', 'typeArray');
        const numberTypes = $('#shelterTypes>div').length;
        $('#shelterTypes').append(theList);
        $('.typeNumber').removeClass('typeNumber').addClass('' + numberTypes + '');
    }
    removeTypeList(byebye, key) {
        this.typeArray = $.grep(this.typeArray, function (value) {
            return value != key;
        });
        this.settings.findType = this.typeArray.toString();

        $(byebye).parent().remove();

        let i;
        for (i = 0; i < $('#shelterTypes>div').length; i++) {
            const rightDiv = i + 1;
            $('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }
    }
    insertShelterFoundDiv(name, img) {
        document.querySelector('#sheltersuccess').
            insertAdjacentHTML('beforeend',
                '<div id="shelterfound">' + name + ' found ' + img + '</div>');
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
                stageNoun + ' found!' + (names.length > 0 ? '(' + names.join(', ') + ')' : '') + '</div>');
    }

    searchForImgTitle(key) {
        const SEARCH_DATA = Globals.SHELTER_SEARCH_DATA;
        const keyIndex = SEARCH_DATA.indexOf(key);
        const value = SEARCH_DATA[keyIndex + 1];
        const selected = $('img[title*="' + value + '"]');
        if (selected.length) {
            const searchResult = SEARCH_DATA[keyIndex + 2]; //type of Pokémon found
            const imgResult = selected.length + ' ' + searchResult; //amount + type found
            const imgFitResult = SEARCH_DATA[keyIndex + 3]; //image for type of Pokémon
            const shelterBigImg = selected.parent().prev().children('img');
            $(shelterBigImg).addClass('shelterfoundme');

            this.insertShelterFoundDiv(imgResult, imgFitResult);
        }
    }

    searchForTooltipText(key) {
        const LIST = Globals.SHELTER_SEARCH_LISTS[key];
        const SEARCH_DATA = Globals.SHELTER_SEARCH_DATA;
        const keyIndex = SEARCH_DATA.indexOf(key);
        for (let i = 0; i < LIST.length; i++) {
            const entry = LIST[i];
            const selected = $(`div.pokemon+div.tooltip_content:contains('${entry}')`);
            if (selected.length) {
                const searchResult = SEARCH_DATA[keyIndex + 2]; //type of Pokémon found
                const imgResult = selected.length + ' ' + searchResult; //amount + type found
                const imgFitResult = SEARCH_DATA[keyIndex + 3]; //image for type of Pokémon
                const shelterBigImg = selected.prev().children('img.big');
                shelterBigImg.addClass('shelterfoundme');

                this.insertShelterFoundDiv(imgResult, imgFitResult);
            }
        }
    }

    searchForTypes(types) {
        const dexData = this.POKEDEX.DEX_DATA;
        for (let i = 0; i < types.length; i++) {
            const value = types[i];
            const foundType = Globals.SHELTER_TYPE_TABLE[Globals.SHELTER_TYPE_TABLE.indexOf(value) + 2];

            let typePokemonNames = [];
            let selected = undefined;
            if (this.settings.findTypeEgg === true) {
                const pokemonElems = [];
                typePokemonNames = [];
                selected = $('#shelterarea>.tooltip_content:contains("Egg")');
                selected.each((i, e) => {
                    const allText = $(e).text();
                    const justParentText = allText.replace($(e).children().text(), '').trim();
                    const searchPokemon = justParentText.replace('Egg', '').trim();
                    const dexifiedPokemon = searchPokemon
                        .replace(/é/g, '\\u00e9')
                        .replace(/í/g, '\\u00ed')
                        .replace(/ñ/g, '\\u00f1');
                    let searchTypeOne = '';
                    let searchTypeTwo = '';

                    const searchPokemonIndex = dexData.indexOf('"' + dexifiedPokemon + '"');
                    searchTypeOne = dexData[searchPokemonIndex + 1];
                    searchTypeTwo = dexData[searchPokemonIndex + 2];

                    if ((searchTypeOne === value) || (searchTypeTwo === value)) {
                        typePokemonNames.push(searchPokemon);
                        pokemonElems.push(e);
                    }
                });

                for (let o = 0; o < pokemonElems.length; o++) {
                    const shelterImgSearch = $(pokemonElems[o]);
                    const shelterBigImg = shelterImgSearch.prev().children('img');
                    $(shelterBigImg).addClass('shelterfoundme');
                }

                this.insertShelterTypeFoundDiv(typePokemonNames.length, foundType, 'egg', typePokemonNames);
            }

            if (this.settings.findTypePokemon === true) {
                typePokemonNames = [];
                selected = $('#shelterarea>.tooltip_content').not(':contains("Egg")');
                selected.each((i, e) => {
                    const allText = $(e).text();
                    const justParentText = allText.replace($(e).children().text(), '').trim()
                        .replace(/\n/g, '');
                    const searchPokemon = justParentText.replace(/\(Lv\..*/g, '').trim();
                    const dexifiedPokemon = searchPokemon
                        .replace(/é/g, '\\u00e9')
                        .replace(/í/g, '\\u00ed')
                        .replace(/ñ/g, '\\u00f1');
                    const searchPokemonIndex = dexData.indexOf('"' + dexifiedPokemon + '"');
                    const searchTypeOne = dexData[searchPokemonIndex + 1];
                    const searchTypeTwo = dexData[searchPokemonIndex + 2];
                    if ((searchTypeOne === value) || (searchTypeTwo === value)) {
                        typePokemonNames.push(searchPokemon);
                    }
                });

                for (let o = 0; o < typePokemonNames.length; o++) {
                    const name = typePokemonNames[o];
                    const shelterImgSearch = $(
                        `#shelterarea .tooltip_content:containsIN("${name} (")`
                    );
                    const shelterBigImg = shelterImgSearch.prev().children('img');
                    $(shelterBigImg).addClass('shelterfoundme');
                }

                this.insertShelterTypeFoundDiv(typePokemonNames.length, foundType, 'Pokemon', typePokemonNames);
            }
        }

    }

    customSearch() {
        const obj = this;
        const SEARCH_DATA = Globals.SHELTER_SEARCH_DATA;

        // search whatever you want to find in the shelter & grid

        if(this.USER_SETTINGS.shelterFeatureEnables.sort) {
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
                $('head').append('<style id="sheltergridthingy">#shelterarea:before{display:none !important;}</style>');
            }
        }

        if(this.USER_SETTINGS.shelterFeatureEnables.search) {
        /*
         * search values depending on settings
         * emptying the sheltersuccess div to avoid duplicates
         */
            document.querySelector('#sheltersuccess').innerHTML = '';
            $('#shelterarea>div>img').removeClass('shelterfoundme');

            if (this.settings.findShiny === true) {
                this.searchForImgTitle('findShiny');
            }
            if (this.settings.findAlbino === true) {
                this.searchForImgTitle('findAlbino');
            }
            if (this.settings.findMelanistic === true) {
                this.searchForImgTitle('findMelanistic');
            }
            if (this.settings.findPrehistoric === true) {
                this.searchForImgTitle('findPrehistoric');
            }
            if (this.settings.findDelta === true) {
                this.searchForImgTitle('findDelta');
            }
            if (this.settings.findMega === true) {
                this.searchForImgTitle('findMega');
            }
            if (this.settings.findStarter === true) {
                this.searchForImgTitle('findStarter');
            }
            if (this.settings.findCustomSprite === true) {
                this.searchForImgTitle('findCustomSprite');
            }
            if (this.settings.findLegendary === true) {
                this.searchForTooltipText('findLegendary');
            }

            if (this.settings.findNewPokemon === true) {
                const key = 'findNewPokemon';
                const value = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 1];
                const selected = $('#shelterarea .tooltip_content:contains(' + value + ')');
                if (selected.length) {
                    const searchResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 2];
                    const imgFitResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 3];
                    const tooltipResult = selected.length + ' ' + searchResult;
                    const shelterImgSearch = selected;
                    const shelterBigImg = shelterImgSearch.prev().children('img');
                    $(shelterBigImg).addClass('shelterfoundme');

                    this.insertShelterFoundDiv(tooltipResult, imgFitResult);
                }
            }

            if (this.settings.findNewEgg === true) {
                const key = 'findNewEgg';
                const value = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 1];
                const selected = $('#shelterarea .tooltip_content:contains(' + value + ')').filter(function () {
                // .text() will include the text in the View/Adopt and Hide buttons, so there will be a space
                    return $(this).text().startsWith(value + ' ');
                });

                if (selected.length) {
                    const searchResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 2];
                    const imgFitResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 3];
                    if (selected.length >= 1) {
                        const shelterImgSearch = selected;
                        const shelterBigImg = shelterImgSearch.prev().children('img');
                        $(shelterBigImg).addClass('shelterfoundme');
                    }
                    this.insertShelterFoundDiv(searchResult, imgFitResult);
                }
            }

            //loop to find all search genders for the custom
            const shelterValueArrayCustom = [];
            for (const key in this.settings) {
                const value = this.settings[key];
                if (value === true) {
                    if (key === 'findMale' || key === 'findFemale' || key === 'findNoGender') {
                        const searchKey = Globals.SHELTER_SEARCH_DATA[Globals.SHELTER_SEARCH_DATA.indexOf(key) + 1];
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
                                const selected = $('#shelterarea .tooltip_content:containsIN(' + customValue + ') img[title*=\'' + genderMatch + '\']');
                                if (selected.length) {
                                    const searchResult = customValue;
                                    const genderName = Globals.SHELTER_SEARCH_DATA[Globals.SHELTER_SEARCH_DATA.indexOf(genderMatch) + 1];
                                    const imgGender = Globals.SHELTER_SEARCH_DATA[Globals.SHELTER_SEARCH_DATA.indexOf(genderMatch) + 2];
                                    const tooltipResult = selected.length + ' ' + genderName + imgGender + ' ' + searchResult;
                                    const shelterImgSearch = selected;
                                    const shelterBigImg = shelterImgSearch.parent().prev().children('img');
                                    $(shelterBigImg).addClass('shelterfoundme');

                                    this.insertShelterFoundDiv(tooltipResult, heartPng);
                                }
                            }
                        }

                        //No genders
                        else if (shelterValueArrayCustom.length === 0) {
                            const selected = $('#shelterarea .tooltip_content:containsIN(' + customValue + '):not(:containsIN("Egg"))');
                            if (selected.length) {
                                const searchResult = customValue;
                                const tooltipResult = selected.length + ' ' + searchResult;
                                const shelterImgSearch = selected;
                                const shelterBigImg = shelterImgSearch.parent().prev().children('img');
                                $(shelterBigImg).addClass('shelterfoundme');
                                this.insertShelterFoundDiv(tooltipResult, heartPng);
                            }
                        }
                    }

                    //custom egg
                    if (this.settings.customEgg === true) {
                        const selected = $('#shelterarea .tooltip_content:containsIN(' + customValue + '):contains("Egg")');
                        if (selected.length) {
                            const searchResult = customValue;
                            const tooltipResult = selected.length + ' ' + searchResult;
                            const shelterImgSearch = selected;
                            const shelterBigImg = shelterImgSearch.prev().children('img');
                            $(shelterBigImg).addClass('shelterfoundme');
                            this.insertShelterFoundDiv(tooltipResult, eggPng);
                        }
                    }

                    //imgSearch with Pokémon
                    if (this.settings.customPng === true) {
                        const selected = $(`#shelterarea img[src*="${customValue}"]`);
                        if (selected.length) {
                            let searchResult = $(selected[0]).parent().next().text().split('(')[0];
                            // eggs do not have ( ) since they do not have a level/gender
                            searchResult = searchResult.split(' View')[0];
                            // eggs will match twice, since their small/big sprites are the same
                            let searchCount = selected.length;
                            if(selected.parent().attr('data-stage')=='egg') {
                                searchCount = searchCount/2;
                            }
                            const tooltipResult = searchCount + ' ' + searchResult + ' (img search)';
                            const shelterImgSearch = selected;
                            $(shelterImgSearch).addClass('shelterfoundme');
                            this.insertShelterFoundDiv(tooltipResult, heartPng);
                        }
                    }
                }
            }

            //loop to find all the types

            const filteredTypeArray = this.typeArray.filter(v => v != '');

            if (filteredTypeArray.length > 0) {
                obj.searchForTypes(filteredTypeArray);
            }
        }
    } // customSearch
}
