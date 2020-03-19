class FarmPage extends Page {
    DEFAULT_SETTINGS() { 
        let d = {TYPE_APPEND : {}};
        // .TYPE_APPEND needs to be fully defined before it can be used in kNOWN_EXCEPTIONS
        for(let i = 0; i < GLOBALS.TYPE_LIST.length; i++) {
            let type = GLOBALS.TYPE_LIST[i];
            d.TYPE_APPEND[type.toUpperCase()] = '.' + i
        }
        d.TYPE_APPEND['NONE'] = GLOBALS.TYPE_LIST.length;
        d.KNOWN_EXCEPTIONS = {
            'Gastrodon [Orient]': [d.TYPE_APPEND['WATER'], d.TYPE_APPEND['GROUND']],
            'Gastrodon [Occident]': [d.TYPE_APPEND['WATER'], d.TYPE_APPEND['GROUND']],
            'Wormadam [Plant Cloak]': [d.TYPE_APPEND['BUG'], d.TYPE_APPEND['GRASS']],
            'Wormadam [Trash Cloak]': [d.TYPE_APPEND['BUG'], d.TYPE_APPEND['STEEL']],//, d.['GRASS']],
            'Chilldoom': [d.TYPE_APPEND['DARK'], d.TYPE_APPEND['ICE']],
            'Raticate [Alolan Forme]': [d.TYPE_APPEND['DARK'], d.TYPE_APPEND['NORMAL']],
            'Ninetales [Alolan Forme]': [d.TYPE_APPEND['ICE'], d.TYPE_APPEND['FAIRY']],
            'Exeggutor [Alolan Forme]': [d.TYPE_APPEND['GRASS'], d.TYPE_APPEND['DRAGON']],
            'Marowak [Alolan Forme]': [d.TYPE_APPEND['FIRE'], d.TYPE_APPEND['GHOST']],
            'Dugtrio [Alolan Forme]': [d.TYPE_APPEND['GROUND'], d.TYPE_APPEND['STEEL']],
            'Graveler [Alolan Forme]': [d.TYPE_APPEND['ROCK'], d.TYPE_APPEND['ELECTRIC']],
            'Golem [Alolan Forme]': [d.TYPE_APPEND['ROCK'], d.TYPE_APPEND['ELECTRIC']],
            'Muk [Alolan Forme]': [d.TYPE_APPEND['POISON'], d.TYPE_APPEND['DARK']],
            'Raichu [Alolan Forme]': [d.TYPE_APPEND['ELECTRIC'], d.TYPE_APPEND['PSYCHIC']],
        }
        return d;
    }

    constructor() {
	super('QoLFarm', {})
	this.defaultSettings = this.DEFAULT_SETTINGS();
	this.settings = this.defaultSettings;
	this.evolveListCache = "";
	const obj = this
	this.observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
		obj.easyQuickEvolve();
            });
	});
    }
    setupHTML() {
        $(document).ready(function() {
            $('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
            document.querySelector('#farm-evolve>h3').insertAdjacentHTML('afterend',
									 '<label id="qolevolvenormal"><input type="button" class="qolsortnormal" value="Normal list"/></label><label id="qolchangesletype"><input type="button" class="qolsorttype" value="Sort on types"/></label><label id="qolsortevolvename"><input type="button" class="qolsortname" value="Sort on name"/></label><label id="qolevolvenew"><input type="button" class="qolsortnew" value="New dex entry"/>');
            // use the evolve button
            $('#farmnews-evolutions>p>label>input').addClass('qolquickevo')
        });
    }
    setupObserver() {
        this.observer.observe(document.querySelector('#farmnews-evolutions'), {
            childList: true,
            characterdata: true,
            subtree: true,
            characterDataOldValue: true,
        });
    }
    setupHandlers() {
	const obj = this;
        $(document).on('click', '#qolevolvenormal', (function() {
            obj.easyEvolveNormalList();
        }));

        $(document).on('click', '#qolchangesletype', (function() {
            obj.easyEvolveTypeList();
        }));

        $(document).on('click', '#qolsortevolvename', (function() {
            obj.easyEvolveNameList();
        }));

        $(document).on('click', '#qolevolvenew', (function() {
            obj.easyEvolveNewList();
        }));
    }

    clearSortedEvolveLists() {
        // first remove the sorted pokemon type list to avoid duplicates
        $('.evolvepkmnlist').show();
        try {
            document.querySelector('.qolEvolveTypeList').remove();
        }
        catch(err){ /* empty */ }
        try {
            document.querySelector('.qolEvolveNameList').remove();
        }
        catch(err){ /* empty */ }
        try {
            document.querySelector('.qolEvolveNewList').remove();
        }
        catch(err){ /* empty */ }
    }
    easyEvolveNormalList() {
        this.clearSortedEvolveLists()
    }
    easyEvolveTypeList() {
        let dexData = GLOBALS.DEX_DATA;
        this.clearSortedEvolveLists()

        $('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
        document.querySelector('#farmnews-evolutions>.scrollable').insertAdjacentHTML('afterbegin', TEMPLATES.evolveFastHTML);

        let typeBackground = $('.panel>h3').css('background-color');
        let typeBorder = $('.panel>h3').css('border');
        let typeColor = $('.panel>h3').css('color');
        $(".expandlist").css("background-color", ""+typeBackground+"");
        $(".expandlist").css("border", ""+typeBorder+"");
        $(".expandlist").css("color", ""+typeColor+"");

        let typeListBackground = $('.tabbed_interface>div').css('background-color');
        let typeListColor = $('.tabbed_interface>div').css('color');
        $(".qolChangeLogContent").css("background-color", ""+typeListBackground+"");
        $(".qolChangeLogContent").css("color", ""+typeListColor+"");

        $('#farmnews-evolutions>.scrollable>.evolvepkmnlist>Li').each(function (index, value) {
            // getting the <li> element from the pokemon & the pokemon evolved name
            let getEvolveString = $(this).html();
            let previousPokemon = getEvolveString.substring(getEvolveString.indexOf('/summary/') + '/summary/'.length + 7, getEvolveString.indexOf('</a>'))
            let evolvePokemon = getEvolveString.substr(getEvolveString.indexOf("into</span> ") + 12);
            let previousInDex = dexData.indexOf('"' + previousPokemon + '"') != -1
            let evolveInDex = dexData.indexOf('"'+evolvePokemon+'"') != -1;

            // if the pokemon's name doens't match the species name, previousInDex will be false
            // load the pokemon's species and set the pokemon's name to the species name for the rest of this loop
            if (!previousInDex) {
                let url = getEvolveString.substr(getEvolveString.indexOf('href="')+'href="'.length, '/summary/AAAAA'.length);

                $.ajax({
                    type: "GET",
                    url: 'https://pokefarm.com' + url,
                    async: false,
                    success: function(data) {
                        let html = jQuery.parseHTML(data)
                        previousPokemon = html[25].querySelector('#pkmnspecdata>p>a').text
                    }
                });
            }

            // whether or not the pokemon already existed in the dex or was loaded from the dex, we can now load its types
            let evolveTypePrevOne = dexData[dexData.indexOf('"'+previousPokemon+'"') + 1];
            let evolveTypePrevTwo = dexData[dexData.indexOf('"'+previousPokemon+'"') + 2];

            let evolveTypeOne = "";
            let evolveTypeTwo = "";

            if (!evolveInDex) {
                if (evolvePokemon in this.settings.KNOWN_EXCEPTIONS) {
                    evolveTypeOne = this.settings.KNOWN_EXCEPTIONS[evolvePokemon][0]
                    if(this.settings.KNOWN_EXCEPTIONS[evolvePokemon].length > 1) {
                        evolveTypeTwo = this.settings.KNOWN_EXCEPTIONS[evolvePokemon][1]
                    }
                } else {
                    // Get the dex number for previousPokemon
                    let dexNumber = dexData[dexData.indexOf('"'+previousPokemon+'"') - 1].replace(/"/g,'').replace('[', '');
                    // Load the dex page for previousPokemon
                    let evolutions = {}
                    $.ajax({
                        type: "GET",
                        url: 'https://pokefarm.com/dex/' + dexNumber,
                        async: false,
                        success: function(data) {
                            let html = jQuery.parseHTML(data)
                            let evosSpans = html[9].querySelectorAll('.evolutiontree>ul>li>.name')
                            // Get the evolutions from the dex page
                            evosSpans.forEach((e) => {
                                let evoNumber = e.querySelector('a').attributes['href'].value.substr(5)
                                let evoName = e.innerText
                                evolutions[evoNumber] = evoName
                            })
                        }
                    });
                    // If evolvePokemon matches one of the evolutions
                    for(let k in evolutions) {
                        if (evolvePokemon === evolutions[k]) {
                            let types = [];
                            // Load dex page for the match
                            $.ajax({
                                type: "GET",
                                url: 'https://pokefarm.com/dex/' + k,
                                async: false,
                                success: function(data) {
                                    let html = jQuery.parseHTML(data)
                                    let typesLi = html[9].querySelector('.dexdetails>li')
                                    typesLi.querySelectorAll('img').forEach((i) => {
                                        let src = i.attributes.src.value
                                        // Get the types for the match
                                        types.push(src.substring(src.indexOf('types') + 'types'.length + 1,
                                                                 src.indexOf('.png')))
                                    });
                                }
                            });
                            // add the exception to the known exceptions list
                            evolveTypeOne = this.settings.TYPE_APPEND[types[0].toUpperCase()]
                            this.settings.KNOWN_EXCEPTIONS[evolvePokemon] = [evolveTypeOne]

                            if(types.length > 1) {
                                evolveTypeTwo = this.settings.TYPE_APPEND[types[1].toUpperCase()]
                                this.settings.KNOWN_EXCEPTIONS[evolvePokemon].push(evolveTypeTwo)
                            }

                            this.saveSettings();
                            break;
                        } // if
                    } // for
                }
            } else {
                evolveTypeOne = dexData[dexData.indexOf('"'+evolvePokemon+'"') + 1];
                evolveTypeTwo = dexData[dexData.indexOf('"'+evolvePokemon+'"') + 2];
            }

            if (getEvolveString.includes('title="[DELTA')) {
                let deltaType = getEvolveString.match('DELTA-(.*)]">');

                $(this).clone().appendTo(this.settings.TYPE_APPEND[deltaType[1]]);
            }

            // type one must exist for both the previous and evolve Pokemon
            // type two is optional
            if(evolveTypeOne !== "" && evolveTypePrevOne !== "") {
                // the evolveTypeOne/Two and evolveTypePrevOne/Two variables can begin with a '.'
                // in some cases. Just strip it off
                evolveTypeOne = evolveTypeOne.replace('.','')
                evolveTypeTwo = evolveTypeTwo.replace('.','')
                evolveTypePrevOne = evolveTypePrevOne.replace('.','')
                evolveTypePrevTwo = evolveTypePrevTwo.replace('.','')

                $(this).clone().appendTo('.'+evolveTypeOne+'');
                if (parseInt(evolveTypeTwo) >= 0) {
                    $(this).clone().appendTo('.'+evolveTypeTwo+'');
                }
                // extra type from prev pokemon
                if([evolveTypeOne, evolveTypeTwo].indexOf(evolveTypePrevOne) == -1) {
                    $(this).clone().appendTo('.'+evolveTypePrevOne+'');
                }
                if(evolveTypePrevTwo >= 0 && [evolveTypeOne, evolveTypeTwo].indexOf(evolveTypePrevTwo) == -1) {
                    $(this).clone().appendTo('.'+evolveTypePrevTwo+'');
                }
            } else { // pokemon is not in the dex (this should never happen)
                console.log(index, previousPokemon, evolvePokemon)
                if (!previousInDex) { console.log("ERROR: Could not resolve " + previousPokemon) }
                if (!evolveInDex)   { console.log("ERROR: Could not resolve " + evolvePokemon) }

                $(this).clone().appendTo(this.settings.TYPE_APPEND['NONE']);
            }
        }); // each

        $('#farmnews-evolutions>.scrollable>.qolEvolveTypeList>Li').each(function (index, value) {
            let amountOfEvolves = $(this).children().children().length;
            let evolveTypeName = $(this).children('.slidermenu').html();

            // hide the types with no evolutions
            if(amountOfEvolves === 0) {
                this.nextSibling.hidden = true
                this.hidden = true;
            } else {
                $(this).children('.slidermenu').html(evolveTypeName+' ('+amountOfEvolves+')')
            }
        });

        $('.evolvepkmnlist').hide();
    }
    easyEvolveNameList() {
        this.clearSortedEvolveLists();

        $('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
        document.querySelector('#farmnews-evolutions>.scrollable').insertAdjacentHTML('afterbegin', '<ul class="qolEvolveNameList">');

        $('#farmnews-evolutions>.scrollable>.evolvepkmnlist>Li').each(function (index, value) {
            // getting the <li> element from the pokemon & the pokemon evolved name
            let getEvolveString = $(this).html();
            let beforeEvolvePokemon = $(this).children().children().text().slice(0,-6);
            let evolvePokemon = getEvolveString.substr(getEvolveString.indexOf("into</span> ") + 12);
            let evolvePokemonChange = evolvePokemon.split(' ').join('').replace('[','').replace(']','');

            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNameList>Li>Ul').hasClass(evolvePokemon.split(' ').join('')) === false) {
                document.querySelector('.qolEvolveNameList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">'+beforeEvolvePokemon+' > '+evolvePokemon+'</h3><ul class="'+evolvePokemonChange+' qolChangeLogContent"></ul></li><br>');
            }
            $(this).clone().appendTo('.'+evolvePokemonChange+'');
        });

        $('#farmnews-evolutions>.scrollable>.qolEvolveNameList>Li').each(function (index, value) {
            let amountOfEvolves = $(this).children().children().length;
            let getEvolveString = $(this).children().children().html();
            let beforeEvolvePokemon = $(this).children().children().children().children().first().text().split(' ').join('');
            let evolvePokemon = getEvolveString.substr(getEvolveString.indexOf("into</span> ") + 12);

            $(this).children('.slidermenu').html(beforeEvolvePokemon+' > '+evolvePokemon+' ('+amountOfEvolves+')')
        });

        $('.evolvepkmnlist').hide();

        //layout of the created html
        let typeBackground = $('.panel>h3').css('background-color');
        let typeBorder = $('.panel>h3').css('border');
        let typeColor = $('.panel>h3').css('color');
        $(".expandlist").css("background-color", ""+typeBackground+"");
        $(".expandlist").css("border", ""+typeBorder+"");
        $(".expandlist").css("color", ""+typeColor+"");

        let typeListBackground = $('.tabbed_interface>div').css('background-color');
        let typeListColor = $('.tabbed_interface>div').css('color');
        $(".qolChangeLogContent").css("background-color", ""+typeListBackground+"");
        $(".qolChangeLogContent").css("color", ""+typeListColor+"");
    }
    easyEvolveNewList() {
        let dexData = GLOBALS.DEX_DATA;

        this.clearSortedEvolveLists()

        // add a class to the original pokemon evolve list to be able to manipulate the element more easily and add the ul for the new dex search
        $('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
        document.querySelector('#farmnews-evolutions>.scrollable').insertAdjacentHTML('afterbegin', '<ul class="qolEvolveNewList">');

        $('#farmnews-evolutions>.scrollable>.evolvepkmnlist>Li').each(function (index, value) { //the actual search
            // getting the <li> element from the pokemon & the pokemon evolved name
            let getEvolveString = $(this).html();

            // every pokemon is a normal unless shiny, albino or melanistic pokemon is found
            let pokemonIsNormal = true;
            let pokemonIsShiny = false;
            let pokemonIsAlbino = false;
            let pokemonIsMelanistic = false;

            if (getEvolveString.includes('title="[SHINY]')) {
                pokemonIsShiny = true;
                pokemonIsNormal = false;
            }
            if (getEvolveString.includes('title="[ALBINO]')) {
                pokemonIsAlbino = true;
                pokemonIsNormal = false;
            }
            if (getEvolveString.includes('title="[MELANISTIC]')) {
                pokemonIsMelanistic = true;
                pokemonIsNormal = false;
            }

            let evolvePokemonName = getEvolveString.substr(getEvolveString.indexOf("into</span> ") + 12);
            var evolveNewCheck = dexData[dexData.indexOf('"'+evolvePokemonName+'"') + 6];
            var evolveNewShinyCheck = dexData[dexData.indexOf('"'+evolvePokemonName+'"') + 7];
            var evolveNewAlbinoCheck = dexData[dexData.indexOf('"'+evolvePokemonName+'"') + 8];
            var evolveNewMelaCheck = dexData[dexData.indexOf('"'+evolvePokemonName+'"') + 9].replace(']','');
            var evolveNewTotal = dexData[dexData.indexOf('"'+evolvePokemonName+'"') + 5];

            try { //if a pokemon has a name like gligar [Vampire] it won't be found. This try tries to change the name as it's recorded in the pokedex data array
                var pokemonDexKeepFirstName = evolvePokemonName.split(' ')[0];
                var pokemonDexKeepSecondName = evolvePokemonName.split(' ')[1];
                var pokemonDexKeepThirdName = evolvePokemonName.split(' ')[2];
                var pokemonDexKeepFourthName = evolvePokemonName.split(' ')[3];
                var pokemonDexKeepFifthName = evolvePokemonName.split(' ')[4];
                var pokemonDexKeepSixthName = evolvePokemonName.split(' ')[5];

                var evolvePokemonNameOne = pokemonDexKeepFirstName;
                var evolveNewCheckOne = dexData[dexData.indexOf('"'+evolvePokemonNameOne+'"') + 6];
                var evolveNewShinyCheckOne = dexData[dexData.indexOf('"'+evolvePokemonNameOne+'"') + 7];
                var evolveNewAlbinoCheckOne = dexData[dexData.indexOf('"'+evolvePokemonNameOne+'"') + 8];
                var evolveNewMelaCheckOne = dexData[dexData.indexOf('"'+evolvePokemonNameOne+'"') + 9].replace(']','');
                var evolveNewTotalOne = dexData[dexData.indexOf('"'+evolvePokemonNameOne+'"') + 5];

                let evolvePokemonNameTwoBefore = pokemonDexKeepFirstName+'/'+pokemonDexKeepSecondName;
                var evolvePokemonNameTwo = evolvePokemonNameTwoBefore.replace('[','').replace(']','');
                var evolveNewCheckTwo = dexData[dexData.indexOf('"'+evolvePokemonNameTwo+'"') + 6];
                var evolveNewShinyCheckTwo = dexData[dexData.indexOf('"'+evolvePokemonNameTwo+'"') + 7];
                var evolveNewAlbinoCheckTwo = dexData[dexData.indexOf('"'+evolvePokemonNameTwo+'"') + 8];
                var evolveNewMelaCheckTwo = dexData[dexData.indexOf('"'+evolvePokemonNameTwo+'"') + 9].replace(']','');
                var evolveNewTotalTwo = dexData[dexData.indexOf('"'+evolvePokemonNameTwo+'"') + 5];

                let evolvePokemonNameThreeBefore = pokemonDexKeepFirstName+'/'+pokemonDexKeepSecondName+' '+pokemonDexKeepThirdName;
                var evolvePokemonNameThree = evolvePokemonNameThreeBefore.replace('[','').replace(']','');
                var evolveNewCheckThree = dexData[dexData.indexOf('"'+evolvePokemonNameThree+'"') + 6];
                var evolveNewShinyCheckThree = dexData[dexData.indexOf('"'+evolvePokemonNameThree+'"') + 7];
                var evolveNewAlbinoCheckThree = dexData[dexData.indexOf('"'+evolvePokemonNameThree+'"') + 8];
                var evolveNewMelaCheckThree = dexData[dexData.indexOf('"'+evolvePokemonNameThree+'"') + 9].replace(']','');
                var evolveNewTotalThree = dexData[dexData.indexOf('"'+evolvePokemonNameThree+'"') + 5];

                let evolvePokemonNameFourBefore = pokemonDexKeepFirstName+'/'+pokemonDexKeepSecondName+' '+pokemonDexKeepThirdName+' '+pokemonDexKeepFourthName;
                var evolvePokemonNameFour = evolvePokemonNameFourBefore.replace('[','').replace(']','');
                var evolveNewCheckFour = dexData[dexData.indexOf('"'+evolvePokemonNameFour+'"') + 6];
                var evolveNewShinyCheckFour = dexData[dexData.indexOf('"'+evolvePokemonNameFour+'"') + 7];
                var evolveNewAlbinoCheckFour = dexData[dexData.indexOf('"'+evolvePokemonNameFour+'"') + 8];
                var evolveNewMelaCheckFour = dexData[dexData.indexOf('"'+evolvePokemonNameFour+'"') + 9].replace(']','');
                var evolveNewTotalFour = dexData[dexData.indexOf('"'+evolvePokemonNameFour+'"') + 5];

                let evolvePokemonNameFiveBefore = pokemonDexKeepFirstName+'/'+pokemonDexKeepSecondName+' '+pokemonDexKeepThirdName+' '+pokemonDexKeepFourthName+' '+pokemonDexKeepFifthName;
                var evolvePokemonNameFive = evolvePokemonNameFiveBefore.replace('[','').replace(']','');
                var evolveNewCheckFive = dexData[dexData.indexOf('"'+evolvePokemonNameFive+'"') + 6];
                var evolveNewShinyCheckFive = dexData[dexData.indexOf('"'+evolvePokemonNameFive+'"') + 7];
                var evolveNewAlbinoCheckFive = dexData[dexData.indexOf('"'+evolvePokemonNameFive+'"') + 8];
                var evolveNewMelaCheckFive = dexData[dexData.indexOf('"'+evolvePokemonNameFive+'"') + 9].replace(']','');
                var evolveNewTotalFive = dexData[dexData.indexOf('"'+evolvePokemonNameFive+'"') + 5];

                let evolvePokemonNameSixBefore = pokemonDexKeepFirstName+'/'+pokemonDexKeepSecondName+' '+pokemonDexKeepThirdName+' '+pokemonDexKeepFourthName+' '+pokemonDexKeepFifthName+' '+pokemonDexKeepSixthName;
                var evolvePokemonNameSix = evolvePokemonNameSixBefore.replace('[','').replace(']','');
                var evolveNewCheckSix = dexData[dexData.indexOf('"'+evolvePokemonNameSix+'"') + 6];
                var evolveNewShinyCheckSix = dexData[dexData.indexOf('"'+evolvePokemonNameSix+'"') + 7];
                var evolveNewAlbinoCheckSix = dexData[dexData.indexOf('"'+evolvePokemonNameSix+'"') + 8];
                var evolveNewMelaCheckSix = dexData[dexData.indexOf('"'+evolvePokemonNameSix+'"') + 9].replace(']','');
                var evolveNewTotalSix = dexData[dexData.indexOf('"'+evolvePokemonNameSix+'"') + 5];

            }
            catch(err) {
                console.log(err);
            }

            //prep done now the search
            if (dexData.indexOf('"'+evolvePokemonName+'"') != -1) { //Looks for the Pokémon name in which it evolves to check if it's in your Pokédex
                if (pokemonIsNormal == true) { //normal Pokémon search
                    if (evolveNewCheckOne == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newpokedexentry') === false) {
                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Pokédex entry</h3><ul class="newpokedexentry qolChangeLogContent"></ul></li><br>');
                        }

                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newpokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                            $(this).clone().appendTo('.newpokedexentry');
                        }

                    } else if (evolveNewTotal > evolveNewCheck && evolveNewCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newpossiblepokedexentry') === false) {
                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible Mega/Totem forme</h3><ul class="newpossiblepokedexentry qolChangeLogContent"></ul></li><br>');
                        }
                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newpossiblepokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                            $(this).clone().appendTo('.newpossiblepokedexentry');
                        }

                    } else { // the rest of the pokemon that could be found by name that you already have in the dex
                        //console.log('Normal '+evolvePokemonName+' already in dex');
                    }
                } else if (pokemonIsShiny == true) { //shiny Pokemon search
                    if (evolveNewShinyCheck == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newshinypokedexentry') === false) {
                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Shiny Pokédex entry</h3><ul class="newshinypokedexentry qolChangeLogContent"></ul></li><br>');
                        }

                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newshinypokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                            $(this).clone().appendTo('.newshinypokedexentry');
                        }

                    } else if (evolveNewTotal > evolveNewShinyCheck && evolveNewShinyCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newpossibleshinypokedexentry') === false) {
                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible Shiny Mega/Totem forme</h3><ul class="newpossibleshinypokedexentry qolChangeLogContent"></ul></li><br>');
                        }
                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newpossibleshinypokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                            $(this).clone().appendTo('.newpossibleshinypokedexentry');
                        }

                    } else {
                        //console.log('Shiny '+evolvePokemonName+' already in dex');
                    }
                } else if (pokemonIsAlbino == true) { //albino pokemon search
                    if (evolveNewAlbinoCheck == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newalbinopokedexentry') === false) {
                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Albino Pokédex entry</h3><ul class="newalbinopokedexentry qolChangeLogContent"></ul></li><br>');
                        }

                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newalbinopokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                            $(this).clone().appendTo('.newalbinopokedexentry');
                        }

                    } else if (evolveNewTotal > evolveNewAlbinoCheck && evolveNewAlbinoCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newpossiblealbinopokedexentry') === false) {
                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible Albino Mega/Totem forme</h3><ul class="newpossiblealbinopokedexentry qolChangeLogContent"></ul></li><br>');
                        }

                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newalbinopokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                            $(this).clone().appendTo('.newpossiblealbinopokedexentry');
                        }

                    } else {
                        //console.log('albino '+evolvePokemonName+' already in dex');
                    }
                } else if (pokemonIsMelanistic == true) { //melanistic pokemon search
                    if (evolveNewMelaCheck == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newamelanisticpokedexentry') === false) {
                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Melanistic Pokédex entry</h3><ul class="newamelanisticpokedexentry qolChangeLogContent"></ul></li><br>');
                        }

                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newamelanisticpokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                            $(this).clone().appendTo('.newamelanisticpokedexentry');
                        }

                    } else if (evolveNewTotal > evolveNewMelaCheck && evolveNewMelaCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newpossiblemelanisticpokedexentry') === false) {
                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible Melanistic Mega/Totem forme</h3><ul class="newpossiblemelanisticpokedexentry qolChangeLogContent"></ul></li><br>');
                        }

                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newpossiblemelanisticpokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                            $(this).clone().appendTo('.newpossiblemelanisticpokedexentry');
                        }

                    } else {
                        //console.log('Melanistic '+evolvePokemonName+' already in dex');
                    }
                }



            } else if (dexData.indexOf('"'+evolvePokemonName+'"') == -1) { //Looks for the Pokémon name in which it evolves to check if it's in your Pokédex{
                if (pokemonIsNormal == true) {
                    if (evolveNewCheckTwo == 0 || evolveNewCheckThree == 0 || evolveNewCheckFour == 0 || evolveNewCheckFive == 0 || evolveNewCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newpokedexentry') === false) {
                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Pokédex entry</h3><ul class="newpokedexentry qolChangeLogContent"></ul></li><br>');
                        }

                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newpokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                            $(this).clone().appendTo('.newpokedexentry');
                        }

                    } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                        if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possiblealolan') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible new Alolan entry</h3><ul class="possiblealolan qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possiblealolan>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.possiblealolan');
                            }

                        }
                    } else if (evolvePokemonName.indexOf('[') >= 0) {
                        if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"'+evolvePokemonNameOne+'"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possibledifferent') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible new forme/cloak entry</h3><ul class="possibledifferent qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possibledifferent>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.possibledifferent');
                            }

                        } else if (dexData.indexOf('"'+evolvePokemonNameOne+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameTwo+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameThree+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFour+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFive+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameSix+'"') == -1) {
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newpokedexentry') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Pokédex entry</h3><ul class="newpokedexentry qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newpokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.newpokedexentry');
                            }
                        }

                    } else if (dexData.indexOf('"'+evolvePokemonNameOne+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameTwo+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameThree+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFour+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFive+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameSix+'"') == -1) {
                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newpokedexentry') === false) {
                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Pokédex entry</h3><ul class="newpokedexentry qolChangeLogContent"></ul></li><br>');
                        }

                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newpokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                            $(this).clone().appendTo('.newpokedexentry');
                        }

                    } else {
                        //END
                        //console.log(evolvePokemonName+' still needs to be searched');
                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('errornotfound') === false) {
                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Error contact Bentomon!</h3><ul class="errornotfound qolChangeLogContent"></ul></li><br>');
                        }

                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.errornotfound>li:contains('+evolvePokemonName+')').length == 0) {
                            $(this).clone().appendTo('.errornotfound');
                        }
                    }


                } else if (pokemonIsShiny == true) {
                    if (evolveNewShinyCheckTwo == 0 || evolveNewShinyCheckThree == 0 || evolveNewShinyCheckFour == 0 || evolveNewShinyCheckFive == 0 || evolveNewShinyCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newshinypokedexentry') === false) {
                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Shiny Pokédex entry</h3><ul class="newshinypokedexentry qolChangeLogContent"></ul></li><br>');
                        }

                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newshinypokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                            $(this).clone().appendTo('.newshinypokedexentry');
                        }
                    } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                        if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possibleshinyalolan') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible new Shiny Alolan entry</h3><ul class="possibleshinyalolan qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possibleshinyalolan>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.possibleshinyalolan');
                            }

                        }
                    } else if (evolvePokemonName.indexOf('[') >= 0) {
                        if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"'+evolvePokemonNameOne+'"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possibleshinydifferent') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible new Shiny forme/cloak entry</h3><ul class="possibleshinydifferent qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possibleshinydifferent>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.possibleshinydifferent');
                            }

                        } else if (dexData.indexOf('"'+evolvePokemonNameOne+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameTwo+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameThree+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFour+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFive+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameSix+'"') == -1) {
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newshinypokedexentry') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Shiny Pokédex entry</h3><ul class="newshinypokedexentry qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newshinypokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.newshinypokedexentry');
                            }
                        }

                    } else if (dexData.indexOf('"'+evolvePokemonNameOne+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameTwo+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameThree+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFour+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFive+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameSix+'"') == -1) {
                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newshinypokedexentry') === false) {
                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Shiny Pokédex entry</h3><ul class="newshinypokedexentry qolChangeLogContent"></ul></li><br>');
                        }

                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newshinypokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                            $(this).clone().appendTo('.newshinypokedexentry');
                        }

                    } else {
                        //END
                        //console.log(evolvePokemonName+' still needs to be searched');
                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('errornotfound') === false) {
                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Error contact Bentomon!</h3><ul class="errornotfound qolChangeLogContent"></ul></li><br>');
                        }

                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.errornotfound>li:contains('+evolvePokemonName+')').length == 0) {
                            $(this).clone().appendTo('.errornotfound');
                        }
                    }

                } else if (pokemonIsAlbino == true) {
                    if (evolveNewAlbinoCheckTwo == 0 || evolveNewAlbinoCheckThree == 0 || evolveNewAlbinoCheckFour == 0 || evolveNewAlbinoCheckFive == 0 || evolveNewAlbinoCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newalbinopokedexentry') === false) {
                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Albino Pokédex entry</h3><ul class="newalbinopokedexentry qolChangeLogContent"></ul></li><br>');
                        }

                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newalbinopokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                            $(this).clone().appendTo('.newalbinopokedexentry');
                        }
                    } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                        if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possiblealbinoalolan') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible new Albino Alolan entry</h3><ul class="possiblealbinoalolan qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possiblealbinoalolan>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.possiblealbinoalolan');
                            }

                        }
                    } else if (evolvePokemonName.indexOf('[') >= 0) {
                        if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"'+evolvePokemonNameOne+'"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possiblealbinodifferent') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible new Albino forme/cloak entry</h3><ul class="possiblealbinodifferent qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possiblealbinodifferent>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.possiblealbinodifferent');
                            }

                        } else if (dexData.indexOf('"'+evolvePokemonNameOne+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameTwo+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameThree+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFour+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFive+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameSix+'"') == -1) {
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newalbinopokedexentry') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Albino Pokédex entry</h3><ul class="newalbinopokedexentry qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newalbinopokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.newalbinopokedexentry');
                            }
                        }

                    } else if (dexData.indexOf('"'+evolvePokemonNameOne+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameTwo+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameThree+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFour+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFive+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameSix+'"') == -1) {
                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newalbinopokedexentry') === false) {
                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Albino Pokédex entry</h3><ul class="newalbinopokedexentry qolChangeLogContent"></ul></li><br>');
                        }

                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newalbinopokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                            $(this).clone().appendTo('.newalbinopokedexentry');
                        }

                    } else {
                        //END
                        //console.log(evolvePokemonName+' still needs to be searched');
                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('errornotfound') === false) {
                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Error contact Bentomon!</h3><ul class="errornotfound qolChangeLogContent"></ul></li><br>');
                        }

                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.errornotfound>li:contains('+evolvePokemonName+')').length == 0) {
                            $(this).clone().appendTo('.errornotfound');
                        }
                    }

                } else if (pokemonIsMelanistic == true) {
                    if (evolveNewMelaCheckTwo == 0 || evolveNewMelaCheckThree == 0 || evolveNewMelaCheckFour == 0 || evolveNewMelaCheckFive == 0 || evolveNewMelaCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newamelanisticpokedexentry') === false) {
                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Melanistic Pokédex entry</h3><ul class="newamelanisticpokedexentry qolChangeLogContent"></ul></li><br>');
                        }

                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newamelanisticpokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                            $(this).clone().appendTo('.newamelanisticpokedexentry');
                        }
                    } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                        if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possiblemelanalolan') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible new Melanistic Alolan entry</h3><ul class="possiblemelanalolan qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possiblemelanalolan>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.possiblemelanalolan');
                            }

                        }
                    } else if (evolvePokemonName.indexOf('[') >= 0) {
                        if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"'+evolvePokemonNameOne+'"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possiblemelandifferent') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible new Melanistic forme/cloak entry</h3><ul class="possiblemelandifferent qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possiblemelandifferent>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.possiblemelandifferent');
                            }

                        } else if (dexData.indexOf('"'+evolvePokemonNameOne+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameTwo+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameThree+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFour+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFive+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameSix+'"') == -1) {
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possiblemelanalolan') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Melanistic Pokédex entry</h3><ul class="possiblemelanalolan qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possiblemelanalolan>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.possiblemelanalolan');
                            }
                        }

                    } else if (dexData.indexOf('"'+evolvePokemonNameOne+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameTwo+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameThree+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFour+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFive+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameSix+'"') == -1) {
                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possiblemelanalolan') === false) {
                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Melanistic Pokédex entry</h3><ul class="possiblemelanalolan qolChangeLogContent"></ul></li><br>');
                        }

                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possiblemelanalolan>li:contains('+evolvePokemonName+')').length == 0) {
                            $(this).clone().appendTo('.possiblemelanalolan');
                        }

                    } else {
                        //END
                        //console.log(evolvePokemonName+' still needs to be searched');
                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('errornotfound') === false) {
                            document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Error contact Bentomon!</h3><ul class="errornotfound qolChangeLogContent"></ul></li><br>');
                        }

                        if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.errornotfound>li:contains('+evolvePokemonName+')').length == 0) {
                            $(this).clone().appendTo('.errornotfound');
                        }
                    }
                }
            }
        });

        $('.evolvepkmnlist').hide();

        //layout
        let typeBackground = $('.panel>h3').css('background-color');
        let typeBorder = $('.panel>h3').css('border');
        let typeColor = $('.panel>h3').css('color');
        $(".expandlist").css("background-color", ""+typeBackground+"");
        $(".expandlist").css("border", ""+typeBorder+"");
        $(".expandlist").css("color", ""+typeColor+"");

        let typeListBackground = $('.tabbed_interface>div').css('background-color');
        let typeListColor = $('.tabbed_interface>div').css('color');
        $(".qolChangeLogContent").css("background-color", ""+typeListBackground+"");
        $(".qolChangeLogContent").css("color", ""+typeListColor+"");
    }
    easyQuickEvolve() {
        if ($('.canevolve:contains("evolved into")').parent().length != 0) {
            $('.canevolve:contains("evolved into")').parent().remove();
        }
    }
}

const farmPage = new FarmPage();
