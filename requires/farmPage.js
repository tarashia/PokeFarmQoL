let FarmPage = (function FarmPage() {
    const SETTINGS_SAVE_KEY = 'QoLFarm';
    const DEFAULT_SETTINGS = { /* empty */ };
    let settings = DEFAULT_SETTINGS;
    let evolveListCache = "";
    // more data
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            API.easyQuickEvolve();
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
        populateSettings() { /* empty */ },
        settingsChange(element, textElement, customClass, typeClass) { /* empty */ },
        setupHTML() {
            $(document).ready(function() {
                $('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
                document.querySelector('#farm-evolve>h3').insertAdjacentHTML('afterend', '<label id="qolevolvenormal"><input type="button" class="qolsortnormal" value="Normal list"/></label><label id="qolchangesletype"><input type="button" class="qolsorttype" value="Sort on types"/></label><label id="qolsortevolvename"><input type="button" class="qolsortname" value="Sort on name"/></label><label id="qolevolvenew"><input type="button" class="qolsortnew" value="New dex entry"/>');
            });
        },
        setupCSS() { /* empty */ },
        setupObserver() {
            observer.observe(document.querySelector('#farmnews-evolutions'), {
                childList: true,
                characterdata: true,
                subtree: true,
                characterDataOldValue: true,
            });
        },
        setupHandlers() {
            $(document).on('click', '#qolevolvenormal', (function() {
                API.easyEvolveNormalList();
            }));

            $(document).on('click', '#qolchangesletype', (function() {
                API.easyEvolveTypeList();
            }));

            $(document).on('click', '#qolsortevolvename', (function() {
                API.easyEvolveNameList();
            }));

            $(document).on('click', '#qolevolvenew', (function() {
                API.easyEvolveNewList();
            }));
        },

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
        },
        easyEvolveNormalList() {
            clearSortedEvolveLists()
        },
        easyEvolveTypeList() {
            let dexData = GLOBALS.DEX_DATA;
            clearSortedEvolveLists()

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

            const TYPE_APPEND = {
                'NORMAL': '.0',
                'FIRE': '.1',
                'WATER': '.2',
                'ELECTRIC': '.3',
                'GRASS': '.4',
                'ICE': '.5',
                'FIGHTING': '.6',
                'POISON': '.7',
                'GROUND': '.8',
                'FLYING': '.9',
                'PSYCHIC': '.10',
                'BUG': '.11',
                'ROCK': '.12',
                'GHOST': '.13',
                'DRAGON': '.14',
                'DARK': '.15',
                'STEEL': '.16',
                'FAIRY': '.17',
                'NONE': '.18'
            }

            $('#farmnews-evolutions>.scrollable>.evolvepkmnlist>Li').each(function (index, value) {
                // getting the <li> element from the pokemon & the pokemon evolved name
                let getEvolveString = $(this).html();
                let evolvePokemon = getEvolveString.substr(getEvolveString.indexOf("into</span> ") + 12);

                // first looks if you know the type out of your dexdata, if it's there then the <li> will be moved in it's corresponding type
                if (dexData.indexOf('"'+evolvePokemon+'"') != -1 ||
                    evolvePokemon === 'Gastrodon [Orient]' ||
                    evolvePokemon === 'Gastrodon [Occident]' ||
                    evolvePokemon === 'Wormadam [Plant Cloak]' ||
                    evolvePokemon === 'Wormadam [Trash Cloak]' ||
                    evolvePokemon.includes('[Alolan Forme]')) {
                    let evolveTypeOne = dexData[dexData.indexOf('"'+evolvePokemon+'"') + 1];
                    let evolveTypeTwo = dexData[dexData.indexOf('"'+evolvePokemon+'"') + 2];
                    let evolveTypePrevOne = dexData[dexData.indexOf('"'+evolvePokemon+'"') - 10];
                    let evolveTypePrevTwo = dexData[dexData.indexOf('"'+evolvePokemon+'"') - 9];

                    if (getEvolveString.includes('title="[DELTA') ||
                        evolvePokemon === 'Vaporeon' ||
                        evolvePokemon === 'Jolteon' ||
                        evolvePokemon === 'Flareon' ||
                        evolvePokemon === 'Espeon' ||
                        evolvePokemon === 'Umbreon' ||
                        evolvePokemon === 'Leafeon' ||
                        evolvePokemon === 'Glaceon' ||
                        evolvePokemon === 'Sylveon' ||
                        evolvePokemon === 'Nidorino' ||
                        evolvePokemon === 'Gastrodon [Orient]' ||
                        evolvePokemon === 'Gastrodon [Occident]' ||
                        evolvePokemon === 'Wormadam [Plant Cloak]' ||
                        evolvePokemon === 'Wormadam [Trash Cloak]' ||
                        evolvePokemon.includes('[Alolan Forme]') ||
                        evolvePokemon.includes('Chilldoom')) {
                        if (getEvolveString.includes('title="[DELTA')) {
                            console.log(getEvolveString);
                            let deltaType = getEvolveString.match('DELTA-(.*)]">');
                            console.log(deltaType[1]);

                            $(this).clone().appendTo(TYPE_APPEND[deltaType[1]]);
                        }

                        if (evolvePokemon === 'Vaporeon' ||
                            evolvePokemon === 'Jolteon' ||
                            evolvePokemon === 'Flareon' ||
                            evolvePokemon === 'Espeon' ||
                            evolvePokemon === 'Umbreon' ||
                            evolvePokemon === 'Leafeon' ||
                            evolvePokemon === 'Glaceon' ||
                            evolvePokemon === 'Sylveon') {
                            // normal type from eevee
                            $(this).clone().appendTo(TYPE_APPEND['NORMAL'])
                            // type one
                            $(this).clone().appendTo('.'+evolveTypeOne+'');
                            // type two
                            if (evolveTypeTwo >= 0) {
                                $(this).clone().appendTo('.'+evolveTypeTwo+'');
                            }
                        }
                        else if (evolvePokemon === 'Nidorino') {
                            $(this).clone().appendTo(TYPE_APPEND['POISON']); // from Nidoran
                        }
                        else if (evolvePokemon === 'Gastrodon [Orient]' || evolvePokemon === 'Gastrodon [Occident]') {
                            $(this).clone().appendTo(TYPE_APPEND['WATER']);
                            $(this).clone().appendTo(TYPE_APPEND['GROUND']);
                        }
                        else if (evolvePokemon === 'Wormadam [Plant Cloak]') {
                            $(this).clone().appendTo(TYPE_APPEND['BUG'])
                            $(this).clone().appendTo(TYPE_APPEND['GRASS'])
                        }
                        else if (evolvePokemon === 'Wormadam [Trash Cloak]') {
                            $(this).clone().appendTo(TYPE_APPEND['BUG'])
                            $(this).clone().appendTo(TYPE_APPEND['STEEL'])
                            $(this).clone().appendTo(TYPE_APPEND['GRASS'])
                        }
                        else if (evolvePokemon === 'Chilldoom') {
                            $(this).clone().appendTo(TYPE_APPEND['DARK'])
                            $(this).clone().appendTo(TYPE_APPEND['ICE'])
                        }
                        else if (evolvePokemon.includes('[Alolan Forme]')) { //alolan formes
                            if (evolvePokemon.includes('Raticate')) {
                                $(this).clone().appendTo(TYPE_APPEND['DARK'])
                                $(this).clone().appendTo(TYPE_APPEND['NORMAL'])
                            }
                            else if (evolvePokemon.includes('Ninetales')) {
                                $(this).clone().appendTo(TYPE_APPEND['ICE'])
                                $(this).clone().appendTo(TYPE_APPEND['FAIRY'])
                            }
                            else if (evolvePokemon.includes('Exeggutor')) {
                                $(this).clone().appendTo(TYPE_APPEND['GRASS'])
                                $(this).clone().appendTo(TYPE_APPEND['DRAGON'])
                            }
                            else if (evolvePokemon.includes('Marowak')) {
                                $(this).clone().appendTo(TYPE_APPEND['FIRE'])
                                $(this).clone().appendTo(TYPE_APPEND['GHOST'])
                            }
                            else if (evolvePokemon.includes('Dugtrio')) {
                                $(this).clone().appendTo(TYPE_APPEND['GROUND'])
                                $(this).clone().appendTo(TYPE_APPEND['STEEL'])
                            }
                            else if (evolvePokemon.includes('Graveler')) {
                                $(this).clone().appendTo(TYPE_APPEND['ROCK'])
                                $(this).clone().appendTo(TYPE_APPEND['ELECTRIC'])
                            }
                            else if (evolvePokemon.includes('Golem')) {
                                $(this).clone().appendTo(TYPE_APPEND['ROCK'])
                                $(this).clone().appendTo(TYPE_APPEND['ELECTRIC'])
                            }
                            else if (evolvePokemon.includes('Muk')) {
                                $(this).clone().appendTo(TYPE_APPEND['POISON'])
                                $(this).clone().appendTo(TYPE_APPEND['DARK'])
                            }
                            else if (evolvePokemon.includes('Raichu')) {
                                $(this).clone().appendTo(TYPE_APPEND['ELECTRIC'])
                                $(this).clone().appendTo(TYPE_APPEND['PSYCHIC'])
                            }
                        }
                    } else { //no exceptions
                        // type one
                        $(this).clone().appendTo('.'+evolveTypeOne+'');
                        // type two
                        if (evolveTypeTwo >= 0) {
                            $(this).clone().appendTo('.'+evolveTypeTwo+'');
                        }
                        // extra type from prev pokemon
                        if([evolveTypeOne, evolveTypeTwo].indexOf(evolveTypePrevOne) == -1){
                            $(this).clone().appendTo('.'+evolveTypePrevOne+'');
                        }

                        if([evolveTypeOne, evolveTypeTwo].indexOf(evolveTypePrevTwo) == -1){
                            $(this).clone().appendTo('.'+evolveTypePrevTwo+'');
                        }
                    }
                } else {
                    $(this).clone().appendTo(TYPE_APPEND['NONE']);
                }
            }); // each

            $('#farmnews-evolutions>.scrollable>.qolEvolveTypeList>Li').each(function (index, value) {
                let amountOfEvolves = $(this).children().children().length;
                let evolveTypeName = $(this).children('.slidermenu').html();

                $(this).children('.slidermenu').html(evolveTypeName+' ('+amountOfEvolves+')')
            });

            $('.evolvepkmnlist').hide();
        },
        easyEvolveNameList() {
            clearSortedEvolveLists();

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
        },
        easyEvolveNewList() {
            let dexData = GLOBALS.DEX_DATA;

            clearSortedEvolveLists()

            // add a class to the original pokemon evolve list to be able to manipulate the element more easily and add the ul for the new dex search
            $('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
            document.querySelector('#farmnews-evolutions>.scrollable').insertAdjacentHTML('afterbegin', '<ul class="qolEvolveNewList">');

            function getNewTotal(name) { return dexData[dexData.indexOf('"'+name+'"') + 5]; }
            function getNewCheck(name) { return dexData[dexData.indexOf('"'+name+'"') + 6]; }
            function getNewShinyCheck(name) { return dexData[dexData.indexOf('"'+name+'"') + 7]; }
            function getNewAlbinoCheck(name) { return dexData[dexData.indexOf('"'+name+'"') + 8]; }
            function getNewMelanCheck(name) { return dexData[dexData.indexOf('"'+name+'"') + 9].replace(']', ''); }

            function evolutionListItem(text, cls) {
                return '<li class="expandlist"><h3 class="slidermenu">' + text + '</h3><ul class="' + cls + ' qolChangeLogContent"></ul></li><br>'
            }

            function insertHTMLIfClassDoesNotExist(elem, cls, location, html) {
                if(elem.hasClass(cls) === false) {
                    document.querySelector('.qolEvolveNewList').insertAdjacentHTML(location, html)
                }
            }

            function appendToIfContains(elem, pokemonName, cls) {
                if (elem.querySelector('.' + cls + '>li:contains('+pokemonName+')').length == 0) {
                    $(this).clone().appendTo('.' + cls);
                }
            }

            function extendedNameNew() {
                for(let i = 1; i < evolveNewChecks.length; i++) {
                    if(evolveNewChecks[i] == 0) { return true; }
                }
                return false;
            }

            function newTotalsGreaterThanChecks() {
                for(let i = 0; i < evolveNewTotals.length; i++) {
                    if(evolveNewTotals[i] > evolveNewChecks[i] && evolveNewChecks[i] > 0) { return true; }
                }
                return false;
            }

            function isAlolan(name) {
                return (name.indexOf('[Alolan Forme]') > -1);
            }

            function isInDex(name) {
                return (dexData.indexOf('"' + name + '"') > -1);
            }

            function newTotalGreaterThanCheck(index) {
                return (evolveNewTotals[i] > evolveNewChecks[i]);
            }

            function noNamesInDex() {
                let res = true;
                for(let i = 0; i < evolvePokemonNames.length; i++) {
                    res = res && (!isInDex(evolvePokemonNames[i]))
                }
                return res;
            }

            function insertEvolutionListItemForExistingMons(ulElem, liElem, pokemonName, pokemonIsFlag, pokemonNewCheck, pokemonNewText, newEntryClass, colorNewCheck, colorNewText, possibleNewEntryClass) {
                if (pokemonIsFlag == true) {
                    if (pokemonNewCheck == 0) { // looks for Pokémon that you have 0 from. Those are always new.
                        insertHTMLIfClassDoesNotExist(ulElem, newEntryClass, 'beforeend', evolutionListItem(pokemonNewText, newEntryClass))
                        appendToIfContains(liElem, pokemonName, newEntryClass)

                    } else if (evolveNewTotal > colorNewCheck && colorNewCheck > 0) { //looks for Pokémon that you have at least 1 from
                        insertHTMLIfClassDoesNotExist(ulElem, possibleNewEntryClass, 'beforeend', evolutionListItem(colorNewText, possibleNewEntryClass))
                        appendToIfContains(liElem, pokemonName, newEntryClass)

                    } else {} // the rest of the pokemon that could be found by name that you already have in the dex
                }
            }

            function insertEvolutionListItemForNewMons(ulElem, liElem, pokemonName, pokemonIsFlag, pokemonNewText, newEntryClass, alolanText, alolanClass, formeText, formeClass) {
                if (pokemonIsFlag == true) {
                    //looks for Pokémon that you have 0 from. Those are always new.
                    if(extendedNameNew()) {
                        insertHTMLIfClassDoesNotExist(ulElem, newEntryClass, 'beforeend', evolutionListItem(pokemonNewText, newEntryClass))
                        appendToIfContains(liElem, pokemonName, newEntryClass)
                    } else if (isAlolan(pokemonName) && newTotalsGreaterThanChecks()) {
                        insertHTMLIfClassDoesNotExist(ulElem, alolanClass, 'beforeend', evolutionListItem(alolanText, alolanClass))
                        appendToIfContains(liElem, pokemonName, alolanEntryClass)
                    }
                } else if (pokemonName.indexOf('[') >= 0 && isInDex(pokemonName) && newTotalGreaterThanCheck(0)) {
                    insertHTMLIfClassDoesNotExist(ulElem, formeClass, 'beforeend', evolutionListItem(formeText, formeClass))
                    appendToIfContains(liElem, pokemonName, formeClass)
                } else if (noNamesInDex()) {
                    insertHTMLIfClassDoesNotExist(ulElem, newEntryClass, 'beforeend', evolutionListItem("New Pokédex entry", newEntryClass))
                    appendToIfContains(liElem, pokemonName, newEntryClass)
                } else {
                    insertHTMLIfClassDoesNotExist(ulElem, 'errornotfound', 'beforeend', evolutionListItem("Error contact Bentomon", "errornotfound"))
                    appendToIfContains(liElem, pokemonName, 'errornotfound')
                }
            }

            $('#farmnews-evolutions>.scrollable>.evolvepkmnlist>Li').each(function (index, value) { //the actual search
                // getting the <li> element from the pokemon & the pokemon evolved name
                let getEvolveString = $(this).html();

                // every pokemon is a normal unless shiny, albino or melanistic pokemon is found
                let pokemonIsShiny = getEvolveString.includes('title="[SHINY]');
                let pokemonIsAlbino = getEvolveString.includes('title="[ALBINO]');
                let pokemonIsMelanistic = getEvolveString.includes('title="[MELANISTIC]');
                let pokemonIsNormal = !pokemonIsShiny && !pokemonIsAlbino && !pokemonIsMelanistic

                let evolvePokemonName = getEvolveString.substr(getEvolveString.indexOf("into</span> ") + 12);
                var evolveNewTotal = getNewTotal(evolvePokemonName);
                var evolveNewCheck = getNewCheck(evolvePokemonName);
                var evolveNewShinyCheck = getNewShinyCheck(evolvePokemonName);
                var evolveNewAlbinoCheck = getNewAlbinoCheck(evolvePokemonName);
                var evolveNewMelanCheck = getNewMelanCheck(evolvePokemonName)

                const pokemonDexKeepNames = evolvePokemonName.split(' ');
                const delimiters = ['/', ' ', ' ', ' ', ' '];

                let evolvePokemonNames = []
                let evolveNewTotals = []
                let evolveNewChecks = []
                let evolveNewShinyChecks = []
                let evolveNewAlbinoChecks = []
                let evolveNewMelanChecks = []

                for(let i = 0; i < pokemonDexKeepNames.length; i++) {
                    evolvePokemonNames.push(pokemonDexKeepNames[i] + ((i > 0) ? delimiters[i-1] : ""))
                    evolvePokemonNames[i] = evolvePokemonNames[i].replace('[','').replace(']','');
                    evolveNewTotals.push(getNewTotal(evolvePokemonNames[i]))
                    evolveNewChecks.push(getNewCheck(evolvePokemonNames[i]))
                    evolveNewShinyChecks.push(getNewShinyCheck(evolvePokemonNames[i]))
                    evolveNewAlbinoChecks.push(getNewAlbinoCheck(evolvePokemonNames[i]))
                    evolveNewMelanChecks.push(getNewMelanCheck(evolvePokemonNames[i]))
                }

                const newListLi = $('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li')
                const newListUl = newListLi.querySelector('Ul')
                //prep done now the search
                if (isInDex(evolvePokemonName)) {
                    insertEvolutionListItemForExistingMons(newListUl, newListLi, evolvePokemonName, pokemonIsNormal,
                                                           evolveNewChecks[0], 'newpokedexentry', "New Pokédex entry",
                                                           evolveNewCheck, 'newpossiblepokedexentry', "Possible Mega/Totem forme");
                    insertEvolutionListItemForExistingMons(newListUl, newListLi, evolvePokemonName, pokemonIsAlbino,
                                                           evolveNewAlbinoCheck, 'newalbinopokedexentry', "New Albino Pokédex entry",
                                                           evolveNewAlbinoCheck, 'newpossiblealbinopokedexentry', "Possible Albino Mega/Totem forme");
                    insertEvolutionListItemForExistingMons(newListUl, newListLi, evolvePokemonName, pokemonIsShiny,
                                                           evolveNewShinyCheck, 'newshinypokedexentry', "New Shiny Pokédex entry",
                                                           evolveNewShinyCheck, 'newpossibleshinypokedexentry', "Possible Shiny Mega/Totem forme");
                    insertEvolutionListItemForExistingMons(newListUl, newListLi, evolvePokemonName, pokemonIsMelan,
                                                           evolveNewMelanCheck, 'newmelanisticpokedexentry', "New Melanistic Pokédex entry",
                                                           evolveNewMelanCheck, 'newpossiblemelanisticpokedexentry', "Possible Melanistic Mega/Totem forme");
                } else {
                    insertEvolutionListItemForNewMons(newListUl, newListLi, evolvePokemonName, pokemonIsNormal,
                                                      "New Pokédex entry", 'newpokedexentry',
                                                      "Possible new Alolan entry", 'possiblealolan',
                                                      'Possible new forme', 'possibledifferent'           )
                    insertEvolutionListItemForNewMons(newListUl, newListLi, evolvePokemonName, pokemonIsAlbino,
                                                      "New Albino Pokédex entry", 'newalbinopokedexentry',
                                                      "New Albino Pokédex entry", 'possiblealbinoalolan',
                                                      "Possible new Albino forme", "possiblealbinodifferent")
                    insertEvolutionListItemForNewMons(newListUl, newListLi, evolvePokemonName, pokemonIsShiny,
                                                      "New Shiny Pokédex entry", 'newshinypokedexentry',
                                                      "Possible new Shiny Alolan entry", 'possibleshinyalolan',
                                                      "Possible new Shiny forme", "possibleshinydifferent")
                    insertEvolutionListItemForNewMons(newListUl, newListLi, evolvePokemonName, pokemonIsMelan,
                                                      "New Melanistic Pokédex entry", 'newmelanlisticpokedexentry',
                                                      "Possible new Melanistic Alolan entry", 'possiblemelanisticalolan',
                                                      "Possible new Melanistic forme/cloak entry", "possiblemelandifferent")
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
        },
        easyQuickEvolve() {
            if ($('.canevolve:contains("evolved into")').parent().length != 0) {
                $('.canevolve:contains("evolved into")').parent().remove();
            }
        },
    };

    return API;
})(); // LabPage
