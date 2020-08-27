class ShelterPage extends Page {
    constructor() {
        super('QoLShelter', {
            findCustom: "",
            findType: "",
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
            findReadyToEvolve: false,
            findMale: true,
            findFemale: true,
            findNoGender: true,
            findNFE: false,
            customEgg: true,
            customPokemon: true,
            customPng: false,
            shelterGrid: true,
        }, '/shelter')
        this.customArray = [];
        this.typeArray = [];
        const obj = this
        this.observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                obj.customSearch();
            });
        });

        // when the page is loaded, check to see if the data needed for finding eggs by type is loaded (if it's needed)
        if(this.onPage(window) &&
           this.settings.findTypeEgg &&
           !(GLOBALS.EGGS_PNG_TO_TYPES_LIST || JSON.parse(localStorage.getItem('QoLEggTypesMap')))) {
            window.alert("Message from QoL script:\nUnable to load list of pokemon eggs and their types, " +
                         "which is used to distinguish eggs with the same name but different types (Vulpix and " +
                         "Alolan Vulpix).\n\nCan still find eggs by type, but there may be mistakes. " +
                         "Please clear and reload your pokedex data by clicking the \"Clear Cached Dex\" "+
                         "and then clicking the \"Update Pokedex\" button in the QoL Hub to load list of eggs and types.");
        }
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
    insertShelterFoundDiv(number, name, img) {
        document.querySelector('#sheltersuccess').
            insertAdjacentHTML('beforeend',
                               '<div id="shelterfound">' + name + ((number !== 1) ? 's' : '') + ' found ' + img + '</div>')
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
                               stageNoun + ' found!' + (names.length > 0 ? '(' + names.toString() + ')' : '') + '</div>')
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
            let shelterBigImg = selected.parent().prev().children('img.big');
            $(shelterBigImg).addClass('shelterfoundme');

            this.insertShelterFoundDiv(selected.length, imgResult, imgFitResult)
        }
    }

    searchForReadyToEvolveByLevel(dexData) {
        let selected = $("#shelterarea .tooltip_content")
        let readyBigImg = [];
        selected.each((idx, s) => {
            let text = s.textContent.split(' ')
            let name = text[0]
            let level = parseInt(text[1].substring(4))

            // get level that pokemon needs to be at to evolve
            let evolve_level = undefined
            if(GLOBALS.EVOLVE_BY_LEVEL_LIST[name] !== undefined) {
                evolve_level = parseInt(GLOBALS.EVOLVE_BY_LEVEL_LIST[name].split(' ')[1])
            }

            if(evolve_level !== undefined && level >= evolve_level) {
                let shelterBigImg = $(s).prev().children('img.big');
                readyBigImg.push(shelterBigImg)
            }
        })

        for(let i = 0; i < readyBigImg.length; i++) {
            $(readyBigImg[i]).addClass('shelterfoundme');
        }

        let imgResult = readyBigImg.length + " " + "ready to evolve"
        this.insertShelterFoundDiv(readyBigImg.length, imgResult, "")

    }

    highlightByHowFullyEvolved(pokemon_elem) {
        // if a pokemon is clicked-and-dragged, the tooltip element after the pokemon
        // will not exist. If this occurs. don't try highlighting anything until the
        // pokemon is "put down"
        if(!$(pokemon_elem).next().length) { return; }

        const tooltip_elem = $(pokemon_elem).next()[0];
        const tooltip = {
            species: tooltip_elem.textContent.split(' ')[0],
            forme: ''
        }
        let pokemon = tooltip['species'];

        if(GLOBALS.EVOLUTIONS_LEFT !== undefined) {
            const evolution_data = GLOBALS.EVOLUTIONS_LEFT;
            // if can't find the pokemon directly, try looking for its form data
            if(!evolution_data[pokemon]) {
                if(tooltip['forme']) {
                    pokemon = pokemon + ' [' + tooltip['forme'] + ']'
                }
            }
            if(!evolution_data[pokemon]) {
                // Do not log error here. Repeated errors can (will) slow down the page
                // console.error(`Private Fields Page - Could not find evolution data for ${pokemon}`);
            } else {
                const evolutions_left = evolution_data[pokemon].remaining
                const evolution_tree_depth = evolution_data[pokemon].total

                if(evolutions_left === 1) {
                    $(pokemon_elem).children('img.big').addClass('oneevolutionleft');
                } else if(evolutions_left === 2) {
                    $(pokemon_elem).children('img.big').addClass('twoevolutionleft');
                }
            }
        } else {
            console.error('Unable to load evolution data. In QoL Hub, please clear cached dex and reload dex data');
        }
    }

    customSearch() {
        const obj = this;
        const SEARCH_DATA = GLOBALS.SHELTER_SEARCH_DATA;
        
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

        if(this.settings.findShiny === true) {
            this.searchForImgTitle('findShiny')
        }
        if(this.settings.findAlbino === true) {
            this.searchForImgTitle('findAlbino')
        }
        if(this.settings.findMelanistic === true) {
            this.searchForImgTitle('findMelanistic')
        }
        if(this.settings.findPrehistoric === true) {
            this.searchForImgTitle('findPrehistoric')
        }
        if(this.settings.findDelta === true) {
            this.searchForImgTitle('findDelta')
        }
        if(this.settings.findMega === true) {
            this.searchForImgTitle('findMega')
        }
        if(this.settings.findStarter === true) {
            this.searchForImgTitle('findStarter')
        }
        if(this.settings.findCustomSprite === true) {
            this.searchForImgTitle('findCustomSprite')
        }
        if(this.settings.findNFE === true) {
            $('#shelterarea>[data-stage=pokemon]').each(function() {
                obj.highlightByHowFullyEvolved(this)
            })
        } else {
            $('.oneevolutionleft').each((k, v) => {
                $(v).removeClass('oneevolutionleft');
            });
            $('.twoevolutionleft').each((k, v) => {
                $(v).removeClass('twoevolutionleft');
            });
        }

        if(this.settings.findNewPokemon === true) {
            let key = 'findNewPokemon'
            let value = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 1]
            let selected = $("#shelterarea .tooltip_content:contains(" + value + ")")
            if (selected.length) {
                let searchResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 2];
                let imgFitResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 3];
                let tooltipResult = selected.length+" "+searchResult;
                let shelterImgSearch = selected
                let shelterBigImg = shelterImgSearch.prev().children('img.big');
                $(shelterBigImg).addClass('shelterfoundme');
                
                this.insertShelterFoundDiv(selected.length, tooltipResult, imgFitResult)
            }
        }

        if(this.settings.findNewEgg === true) {
            let key = 'findNewEgg'
            let value = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 1]
            let selected = $("#shelterarea .tooltip_content:contains(" + value + ")").filter(function(){
                // .text() will include the text in the View/Adopt and Hide buttons, so there will be a space
                return $(this).text().startsWith(value + " ");
            });

            if (selected.length) {
                let searchResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 2];
                let imgFitResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 3];
                let tooltipResult = selected.length + " " + searchResult;
                if (selected.length >= 1) {
                    let shelterImgSearch = selected
                    let shelterBigImg = shelterImgSearch.prev().children('img.big');
                    $(shelterBigImg).addClass('shelterfoundme');
                }
                this.insertShelterFoundDiv(selected.length, searchResult, imgFitResult)
            }
        }

        if(this.settings.findReadyToEvolve === true) {
            if(GLOBALS.EVOLVE_BY_LEVEL_LIST === null) {
                window.alert('Unable to load list of pokemon that can evolve by level. Please try updating dex ' +
                             'by clicking "Update Pokedex" in the QoL Hub. If the problem persists, please post in the thread.\n\n' +
                             'Disabling this function until the checkbox is clicked again');
                this.settings.findReadyToEvolve = false;
                // uncheck checkbox
                $('[data-key=findReadyToEvolve]')[0].checked = false
            } else {
                this.searchForReadyToEvolveByLevel(dexData)
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
        const heartPng = `<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952">`;
        const eggPng = `<img src="//pfq-static.com/img/pkmn/egg.png/t=1451852195">`;
        for (let i = 0; i < customSearchAmount; i++) {
            let value = this.customArray[i];
            if (value != "") {
                //custom pokemon search
                if (this.settings.customPokemon === true) {
                    let genderMatches = []
                    if (shelterValueArrayCustom.indexOf("[M]") > -1) {
                        genderMatches.push("[M]")
                    }
                    if(shelterValueArrayCustom.indexOf("[F]") > -1) {
                        genderMatches.push("[F]")
                    }
                    if(shelterValueArrayCustom.indexOf("[N]") > -1) {
                        genderMatches.push("[N]")
                    }

                    if(genderMatches.length > 0) {
                        for(let i = 0; i < genderMatches.length; i++) {
                            let genderMatch = genderMatches[i];
                            let selected = $("#shelterarea .tooltip_content:containsIN("+value+") img[title*='" + genderMatch + "']")
                            if (selected.length) {
                                let searchResult = value;
                                let genderName = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(genderMatch) + 1];
                                let imgGender = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(genderMatch) + 2];
                                let tooltipResult = selected.length + ' ' + genderName + imgGender + " " + searchResult;
                                let shelterImgSearch = selected
                                let shelterBigImg = shelterImgSearch.parent().prev().children('img.big');
                                $(shelterBigImg).addClass('shelterfoundme');

                                this.insertShelterFoundDiv(selected.length, tooltipResult, heartPng)
                            }
                        }
                    }

                    //No genders
                    else if (shelterValueArrayCustom.length === 0) {
                        let selected = $('#shelterarea .tooltip_content:containsIN('+value+'):not(:containsIN("Egg"))')
                        if (selected.length) {
                            let searchResult = value;
                            let tooltipResult = selected.length + " " + searchResult;
                            let shelterImgSearch = selected
                            let shelterBigImg = shelterImgSearch.parent().prev().children('img.big');
                            $(shelterBigImg).addClass('shelterfoundme');
                            this.insertShelterFoundDiv(selected.length, tooltipResult, heartPng)
                        }
                    }
                }

                //custom egg
                if (this.settings.customEgg === true) {
                    let selected = $('#shelterarea .tooltip_content:containsIN('+value+'):contains("Egg")');
                    if (selected.length) {
                        let searchResult = value;
                        let tooltipResult = selected.length + " " + searchResult;
                        let shelterImgSearch = selected;
                        let shelterBigImg = shelterImgSearch.prev().children('img.big');
                        $(shelterBigImg).addClass('shelterfoundme');
                        this.insertShelterFoundDiv(selected.length, tooltipResult, eggPng)
                    }
                }

                //imgSearch with Pokémon
                if (this.settings.customPng === true) {
                    let selected = $('#shelterarea img.big[src*="'+value+'"]')
                    if (selected.length) {
                        let searchResult = selected.parent().next().text().split('(')[0]
                        let tooltipResult = selected.length+" "+searchResult+' (Custom img search)';
                        let imgFitResult = `<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952">`;
                        let shelterImgSearch = selected
                        $(shelterImgSearch).addClass('shelterfoundme');
                        this.insertShelterFoundDiv(selected.length, tooltipResult, heartPng)
                    }
                }
            }
        }

        //loop to find all the types

        const filteredTypeArray = this.typeArray.filter(v=>v!='');

        if (filteredTypeArray.length > 0) {
            const egg_pngs_to_types = GLOBALS.EGGS_PNG_TO_TYPES_LIST ||
                  JSON.parse(localStorage.getItem('QoLEggTypesMap')) || undefined;
            for (let i = 0; i < filteredTypeArray.length; i++) {
                let value = filteredTypeArray[i];
                let foundType = GLOBALS.SHELTER_TYPE_TABLE[GLOBALS.SHELTER_TYPE_TABLE.indexOf(value) + 2];

                let selected = undefined;
                if (this.settings.findTypeEgg === true) {
                    let typePokemonNames = [];
                    let pokemonElems = [];
                    selected = $('#shelterarea>.tooltip_content:contains("Egg")');
                    selected.each(function() {
                        let searchPokemon = ($(this).text().split(' ')[0]);
                        let searchTypeOne = "";
                        let searchTypeTwo = "";
                        if(egg_pngs_to_types) {
                            let imgUrl = $($(this).prev().find('img')[0]).attr('src').replace('https://pfq-static.com/img/', '');
                            searchTypeOne = egg_pngs_to_types[searchPokemon] &&
                                egg_pngs_to_types[searchPokemon][imgUrl] &&
                                ("" + egg_pngs_to_types[searchPokemon][imgUrl][0]);
                            searchTypeTwo = egg_pngs_to_types[searchPokemon] &&
                                egg_pngs_to_types[searchPokemon][imgUrl] &&
                                ("" + (egg_pngs_to_types[searchPokemon][imgUrl][1] || -1));
                        } else {
                            let searchPokemonIndex = dexData.indexOf('"'+searchPokemon+'"');
                            searchTypeOne = dexData[searchPokemonIndex + 1];
                            searchTypeTwo = dexData[searchPokemonIndex + 2];
                        }
                        if ((searchTypeOne === value) || (searchTypeTwo === value)) {
                            typePokemonNames.push(searchPokemon);
                            pokemonElems.push(this);
                        }
                    })

                    for (let o = 0; o < pokemonElems.length; o++) {
                        let shelterImgSearch = $(pokemonElems[o]);
                        let shelterBigImg = shelterImgSearch.prev().children('img.big');
                        $(shelterBigImg).addClass('shelterfoundme');
                    }

                    this.insertShelterTypeFoundDiv(typePokemonNames.length, foundType, 'egg', typePokemonNames)
                }

                if (this.settings.findTypePokemon === true) {
                    let typePokemonNames = [];
                    selected = $('#shelterarea>.tooltip_content').not(':contains("Egg")')
                    selected.each(function() {
                        let searchPokemon = ($(this).text().split(' ')[0]);
                        let searchPokemonIndex = dexData.indexOf('"'+searchPokemon+'"');
                        let searchTypeOne = dexData[searchPokemonIndex + 1];
                        let searchTypeTwo = dexData[searchPokemonIndex + 2];
                        if ((searchTypeOne === value) || (searchTypeTwo === value)) {
                            typePokemonNames.push(searchPokemon);
                        }
                    })

                    for (let o = 0; o < typePokemonNames.length; o++) {
                        let shelterImgSearch = $("#shelterarea .tooltip_content:containsIN('"+typePokemonNames[o]+" (')")
                        let shelterBigImg = shelterImgSearch.prev().children('img.big');
                        $(shelterBigImg).addClass('shelterfoundme');
                    }

                    this.insertShelterTypeFoundDiv(typePokemonNames.length, foundType, 'Pokemon', typePokemonNames)
                }
            }
        } // filteredTypeArray
    } // customSearch
}

const shelterPage = new ShelterPage();
