/* globals Page */
// eslint-disable-next-line no-unused-vars
class FarmPageBase extends Page {
    DEFAULT_SETTINGS(GLOBALS) {
        const d = {
            TYPE_APPEND: {}
        };
        // .TYPE_APPEND needs to be fully defined before it can be used in kNOWN_EXCEPTIONS
        for (let i = 0; i < GLOBALS.TYPE_LIST.length; i++) {
            const type = GLOBALS.TYPE_LIST[i];
            d.TYPE_APPEND[type.toUpperCase()] = '' + i;
        }
        d.TYPE_APPEND['NONE'] = '.' + GLOBALS.TYPE_LIST.length;
        d.KNOWN_EXCEPTIONS = {
            'Gastrodon [Occident]': {
                'id': '442',
                'types': [
                    '2',
                    '8'
                ]
            },
            'Gastrodon [Orient]': {
                'id': '442b',
                'types': [
                    '2',
                    '8'
                ]
            },
            'Wormadam [Plant Cloak]': {
                'id': '432',
                'types': [
                    '11',
                    '4'
                ]
            },
            'Wormadam [Trash Cloak]': {
                'id': '432b',
                'types': [
                    '11',
                    '16'
                ]
            },
            'Wormadam [Sandy Cloak]': {
                'id': '432c',
                'types': [
                    '11',
                    '8'
                ]
            },
            // 'Chilldoom': [d.TYPE_APPEND['DARK'], d.TYPE_APPEND['ICE']],
            'Raticate [Alolan Forme]': {
                'id': '020r7',
                'types': [
                    '15',
                    '0'
                ]
            },

            'Ninetales [Alolan Forme]': {
                'id': '039r7',
                'types': [
                    '5',
                    '17'
                ]
            },
            'Exeggutor [Alolan Forme]': {
                'id': '111r7',
                'types': [
                    '4',
                    '14'
                ]
            },
            'Marowak [Alolan Forme]': {
                'id': '113r7',
                'types': [
                    '1',
                    '13'
                ]
            },
            'Dugtrio [Alolan Forme]': {
                'id': '055r7',
                'types': [
                    '8',
                    '16'
                ]
            },
            'Graveler [Alolan Forme]': {
                'id': '080r7',
                'types': [
                    '12',
                    '3'
                ]
            },
            'Golem [Alolan Forme]': {
                'id': '081r7',
                'types': [
                    '12',
                    '3'
                ]
            },
            'Muk [Alolan Forme]': {
                'id': '096r7',
                'types': [
                    '7',
                    '15'
                ]
            },
            'Raichu [Alolan Forme]': {
                'id': '027r7',
                'types': [
                    '3',
                    '10'
                ]
            },
            'Linoone [Galarian Forme]': {
                'id': '278r8',
                'types': [
                    '15',
                    '0'
                ]
            },
            'Gourgeist [Small Size]': {
                'id': '710',
                'types': [
                    '13',
                    '4'
                ]
            },
            'Gourgeist [Average Size]': {
                'id': '710s2',
                'types': [
                    '13',
                    '4'
                ]
            },
            'Gourgeist [Large Size]': {
                'id': '710s3',
                'types': [
                    '13',
                    '4'
                ]
            },
            'Gourgeist [Super Size]': {
                'id': '710s4',
                'types': [
                    '13',
                    '4'
                ]
            },
            'Persian [Alolan Forme]': {
                'id': '057r7',
                'types': [
                    '15'
                ]
            },
        };
        return d;
    }
    constructor(jQuery, localStorageMgr, helpers, GLOBALS) {
        super(jQuery, localStorageMgr, helpers, GLOBALS.FARM_PAGE_SETTINGS_KEY, {}, 'farm#tab=1');
        this.defaultSettings = this.DEFAULT_SETTINGS(GLOBALS);
        this.settings = this.defaultSettings;
        this.evolveListCache = '';
        const obj = this;
        this.observer = new MutationObserver(function (mutations) {
            // eslint-disable-next-line no-unused-vars
            mutations.forEach(function (mutation) {
                obj.easyQuickEvolve();
            });
        });
    }
    setupHTML() {
        const obj = this;
        this.jQuery(document).ready(function () {
            obj.jQuery('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
            document.querySelector('#farm-evolve>h3').insertAdjacentHTML('afterend',
                '<label id="qolevolvenormal"><input type="button" class="qolsortnormal" value="Normal list"/></label><label id="qolchangesletype"><input type="button" class="qolsorttype" value="Sort on types"/></label><label id="qolsortevolvename"><input type="button" class="qolsortname" value="Sort on name"/></label><label id="qolevolvenew"><input type="button" class="qolsortnew" value="New dex entry"/>');
            // use the evolve button
            obj.jQuery('#farmnews-evolutions>p>label>input').addClass('qolquickevo');
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
    setupHandlers(GLOBALS) {
        const obj = this;
        obj.jQuery(document).on('click', '#qolevolvenormal', (function () {
            obj.easyEvolveNormalList(GLOBALS);
        }));

        obj.jQuery(document).on('click', '#qolchangesletype', (function () {
            obj.easyEvolveTypeList(GLOBALS);
        }));

        obj.jQuery(document).on('click', '#qolsortevolvename', (function () {
            obj.easyEvolveNameList(GLOBALS);
        }));

        obj.jQuery(document).on('click', '#qolevolvenew', (function () {
            obj.easyEvolveNewList(GLOBALS);
        }));
    }
    clearSortedEvolveLists() {
        // first remove the sorted pokemon type list to avoid duplicates
        this.jQuery('.evolvepkmnlist').show();
        this.jQuery('.evolvepkmnlist').removeAttr('class');
        if (document.querySelector('.qolEvolveTypeList')) {
            document.querySelector('.qolEvolveTypeList').remove();
        }
        if (document.querySelector('.qolEvolveNameList')) {
            document.querySelector('.qolEvolveNameList').remove();
        }
        if (document.querySelector('.qolEvolveNewList')) {
            document.querySelector('.qolEvolveNewList').remove();
        }
    }
    easyEvolveNormalList() {
        this.clearSortedEvolveLists();
    }
    easyEvolveNameList() {
        const obj = this;
        this.clearSortedEvolveLists();

        this.jQuery('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
        document.querySelector('#farmnews-evolutions>.scrollable').insertAdjacentHTML('afterbegin', '<ul class="qolEvolveNameList">');

        let errorOccurred = false;
        this.jQuery('#farmnews-evolutions>.scrollable>.evolvepkmnlist>Li').each(function (index) {
            // getting the <li> element from the pokemon & the pokemon evolved name
            const getEvolveString = obj.jQuery(this).html();
            if (getEvolveString === undefined || getEvolveString === '') {
                console.error(`Unable to parse html from <li> at index ${index}`);
                errorOccurred = true;
            } else {
                let beforeEvolvePokemon = obj.jQuery(this).children().children().text().slice(0, -6);
                if (beforeEvolvePokemon === undefined || beforeEvolvePokemon === '') {
                    console.error(`Unable to parse pokemon-evolving-from from <li> at index ${index}`);
                    errorOccurred = true;
                } else {
                    // remove extraneous whitespace
                    beforeEvolvePokemon = beforeEvolvePokemon.trim();
                    // use a regex to find extra whitespace between words
                    let whitespace = beforeEvolvePokemon.match(/\s{2,}/g);
                    while (whitespace) {
                        for (let i = whitespace.length - 1; i >= 0; i--) {
                            const match = whitespace[i];
                            beforeEvolvePokemon = beforeEvolvePokemon.replace(match, ' ');
                        }
                        whitespace = beforeEvolvePokemon.match(/\s{2,}/g);
                    }
                    let evolvePokemon = getEvolveString.substr(getEvolveString.indexOf('into</span> ') + 12);
                    if (evolvePokemon === undefined || evolvePokemon === '') {
                        console.error(`Unable to parse pokemon-evolving-to from <li> at index ${index}`);
                        errorOccurred = true;
                    } else {
                        // remove extraneous whitespace
                        evolvePokemon = evolvePokemon.trim();
                        // use a regex to find extra whitespace between words
                        whitespace = evolvePokemon.match(/\s{2,}/g);
                        while (whitespace) {
                            for (let i = whitespace.length - 1; i >= 0; i--) {
                                const match = whitespace[i];
                                evolvePokemon = evolvePokemon.replace(match, ' ');
                            }
                            whitespace = evolvePokemon.match(/\s{2,}/g);
                        }
                        // Replace all spaces with a character that is not part of any Pokemon's name, but is valid in a CSS selector
                        const evolvePokemonClass = evolvePokemon.replace(/ /g, '_').replace('[', '').replace(']', '').replace(/\./g, '');
                        if (evolvePokemonClass === undefined || evolvePokemonClass === '') {
                            console.error(`Unable to create valid CSS class for pokemon-evolving-to from <li> at index ${index}`);
                            errorOccurred = true;
                        } else {
                            if (obj.jQuery('#farmnews-evolutions>.scrollable>.qolEvolveNameList>Li>Ul').hasClass(evolvePokemonClass) === false) {
                                document.querySelector('.qolEvolveNameList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">' +
                                    beforeEvolvePokemon + ' > ' + evolvePokemon +
                                    '</h3><ul class="' + evolvePokemonClass +
                                    ' qolChangeLogContent"></ul></li><br>');
                            } // class
                            obj.jQuery(this).clone().appendTo('.' + evolvePokemonClass + '');
                        } // evolvePokemonClass
                    } // evolvePokemon
                } // beforeEvolvePokemon
            } // getEvolveString
        });

        if (errorOccurred) {
            window.alert('Error occurred while sorting pokemon by name');
            return;
        }

        obj.jQuery('#farmnews-evolutions>.scrollable>.qolEvolveNameList>Li').each(function (index) {
            const amountOfEvolves = obj.jQuery(this).children().children().length;
            if (amountOfEvolves === 0) {
                console.error(`Found 0 evolutions for <li> at ${index} of evolve name list`);
                errorOccurred = true;
            } else {
                const getEvolveString = obj.jQuery(this).children().children().html();
                if (getEvolveString === undefined || getEvolveString === '') {
                    console.error(`Unable to parse evolve string from <li> at ${index} from evolve name list`);
                    errorOccurred = true;
                } else {
                    const beforeEvolvePokemon = obj.jQuery(this).children().children().children().children().first().text(); // .split(' ').join('');

                    if (beforeEvolvePokemon === undefined || beforeEvolvePokemon === '') {
                        console.error(`Unable to parse pokemon-evolving-from from <li> at ${index} from evolve name list`);
                        errorOccurred = true;
                    } else {
                        const evolvePokemon = getEvolveString.substr(getEvolveString.indexOf('into</span> ') + 'into</span> '.length);
                        if (evolvePokemon === undefined || evolvePokemon === '') {
                            console.error(`Unable to parse pokemon-evolving-to from <li> at ${index} from evolve name list`);
                            errorOccurred = true;
                        } else {
                            obj.jQuery(this).children('.slidermenu').html(beforeEvolvePokemon + ' > ' + evolvePokemon + ' (' + amountOfEvolves + ')');
                        }
                    }
                } // getEvolveString
            } // amountOfEvolves
        });

        obj.jQuery('.evolvepkmnlist').hide();

        if (errorOccurred) {
            window.alert('Error occurred while sorting pokemon by name');
            return;
        }

        //layout of the created html
        const typeBackground = obj.jQuery('.panel>h3').css('background-color');
        const typeBorder = obj.jQuery('.panel>h3').css('border');
        const typeColor = obj.jQuery('.panel>h3').css('color');
        obj.jQuery('.expandlist').css('background-color', '' + typeBackground + '');
        obj.jQuery('.expandlist').css('border', '' + typeBorder + '');
        obj.jQuery('.expandlist').css('color', '' + typeColor + '');

        const typeListBackground = obj.jQuery('.tabbed_interface>div').css('background-color');
        const typeListColor = obj.jQuery('.tabbed_interface>div').css('color');
        obj.jQuery('.qolChangeLogContent').css('background-color', '' + typeListBackground + '');
        obj.jQuery('.qolChangeLogContent').css('color', '' + typeListColor + '');
    }
    easyEvolveNewList(GLOBALS) {
        const obj = this;
        const dexData = GLOBALS.DEX_DATA;

        this.clearSortedEvolveLists();

        // add a class to the original pokemon evolve list to be able to manipulate the element more easily and add the ul for the new dex search
        this.jQuery('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
        document.querySelector('#farmnews-evolutions>.scrollable').insertAdjacentHTML('afterbegin', '<ul class="qolEvolveNewList">');

        const getNewCheckData = (name) => {
            const nameIndex = dexData.indexOf('"' + name + '"');
            const checkData = (nameIndex > -1 && dexData.length > nameIndex + 9) ?
                dexData.slice(nameIndex + 5, nameIndex + 10) :
                [undefined, undefined, undefined, undefined, undefined];
            if (checkData[4] !== undefined) {
                checkData[4] = checkData[4].replace(']', '');
            }
            return checkData;
        };

        const createListElements = (jQuery, cls, header, name, elem) => {
            if (jQuery('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass(cls) === false) {
                const html = '<li class="expandlist">' +
                    `<h3 class="slidermenu">${header}</h3>` +
                    `<ul class="${cls} qolChangeLogContent"></ul></li><br>`;
                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', html);
            }

            if (jQuery(`#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.${cls}>li:contains(${name})`).length == 0) {
                jQuery(elem).clone().appendTo(`.${cls}`);
            }
        };

        this.jQuery('#farmnews-evolutions>.scrollable>.evolvepkmnlist>Li').each(function () { //the actual search
            // getting the <li> element from the pokemon & the pokemon evolved name
            const getEvolveString = obj.jQuery(this).html();

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

            let evolvePokemonName = getEvolveString.substr(getEvolveString.indexOf('into</span> ') + 'into</span>'.length).trim();
            // use a regex to find extra whitespace between words
            let whitespace = evolvePokemonName.match(/\s{2,}/g);
            while (whitespace) {
                for (let i = whitespace.length - 1; i >= 0; i--) {
                    const match = whitespace[i];
                    evolvePokemonName = evolvePokemonName.replace(match, ' ');
                }
                whitespace = evolvePokemonName.match(/\s{2,}/g);
            }
            const evolvePokemonNameIndex = dexData.indexOf('"' + evolvePokemonName + '"');
            const evolvePokemonNameInDex = evolvePokemonNameIndex != -1;

            const [evolveNewTotal, evolveNewCheck,
                evolveNewShinyCheck, evolveNewAlbinoCheck,
                evolveNewMelaCheck] = getNewCheckData(evolvePokemonName);

            const [evolvePokemonNameOne, pokemonDexKeepSecondName,
                pokemonDexKeepThirdName, pokemonDexKeepFourthName,
                pokemonDexKeepFifthName, pokemonDexKeepSixthName] = evolvePokemonName.split(' ');
            const [evolveNewTotalOne, evolveNewCheckOne, /* ignore */, /* ignore */, /* ignore */] = getNewCheckData(evolvePokemonNameOne);
            /* if a pokemon has a name like gligar [Vampire] it won't be found. This tries to change the name as it's recorded in the pokedex data array
               The remaining checks are a (not great) way of checking for names with '/' in them.
               PFQ uses '/' in the names of PFQ variants and in PFQ exclusives with multiple forms
               Example of evolvePokemonNameTwoBefore: 'Gliscor/Vampire'
               Regex: \w+/\w+ */
            const evolvePokemonNameTwo = (evolvePokemonNameOne + '/' + pokemonDexKeepSecondName).replace('[', '').replace(']', '');
            const [evolveNewTotalTwo, evolveNewCheckTwo,
                evolveNewShinyCheckTwo, evolveNewAlbinoCheckTwo,
                evolveNewMelaCheckTwo] = getNewCheckData(evolvePokemonNameTwo);

            /* Example of evolvePokemonNameThreeBefore: 'Phasmaleef/Forest Forme\'
               Regex: \w+/\w+ \w+ */
            const evolvePokemonNameThree = (evolvePokemonNameOne + '/' +
                pokemonDexKeepSecondName + ' ' +
                pokemonDexKeepThirdName).replace('[', '').replace(']', '');
            const [evolveNewTotalThree, evolveNewCheckThree,
                evolveNewShinyCheckThree, evolveNewAlbinoCheckThree,
                evolveNewMelaCheckThree] = getNewCheckData(evolvePokemonNameThree);

            /* Example of evolvePokemonNameFourBefore: 'Butterfree/Mega Forme Q'
               Regex: \w+/\w+ \w+ \w+ */
            const evolvePokemonNameFour = (evolvePokemonNameOne + '/' +
                pokemonDexKeepSecondName + ' ' +
                pokemonDexKeepThirdName + ' ' +
                pokemonDexKeepFourthName).replace('[', '').replace(']', '');
            const [evolveNewTotalFour, evolveNewCheckFour,
                evolveNewShinyCheckFour, evolveNewAlbinoCheckFour,
                evolveNewMelaCheckFour] = getNewCheckData(evolvePokemonNameFour);

            /* Example of evolvePokemonNameFiveBefore: 'Marowak/Alolan Mega Forme Q'
               Regex: \w+/\w+ \w+ \w+ \w+ */
            const evolvePokemonNameFive = (evolvePokemonNameOne + '/' +
                pokemonDexKeepSecondName + ' ' +
                pokemonDexKeepThirdName + ' ' +
                pokemonDexKeepFourthName + ' ' +
                pokemonDexKeepFifthName).replace('[', '').replace(']', '');
            const [evolveNewTotalFive, evolveNewCheckFive,
                evolveNewShinyCheckFive, evolveNewAlbinoCheckFive,
                evolveNewMelaCheckFive] = getNewCheckData(evolvePokemonNameFive);

            /* Couldn't find any examples of pokemon that match evolvePokemonNameSixBefore
               Regex: \w+/\w+ \w+ \w+ \w+ \w+ */
            const evolvePokemonNameSix = (evolvePokemonNameOne + '/' +
                pokemonDexKeepSecondName + ' ' +
                pokemonDexKeepThirdName + ' ' +
                pokemonDexKeepFourthName + ' ' +
                pokemonDexKeepFifthName + ' ' +
                pokemonDexKeepSixthName).replace('[', '').replace(']', '');
            const [evolveNewTotalSix, evolveNewCheckSix,
                evolveNewShinyCheckSix, evolveNewAlbinoCheckSix,
                evolveNewMelaCheckSix] = getNewCheckData(evolvePokemonNameSix);

            //prep done now the search
            if (evolvePokemonNameInDex) { //Looks for the Pokémon name in which it evolves to check if it's in your Pokédex
                if (pokemonIsNormal == true) { //normal Pokémon search
                    if (evolveNewCheckOne == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements(obj.jQuery, 'newpokedexentry', 'New Pokédex entry', evolvePokemonName, this);
                    } else if (evolveNewTotal > evolveNewCheck && evolveNewCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                        createListElements(obj.jQuery, 'newpossiblepokedexentry', 'Possible Mega/Totem forme', evolvePokemonName, this);
                    }
                    // the rest of the pokemon that could be found by name are pokemon that you already have in the dex
                } else if (pokemonIsShiny == true) { //shiny Pokemon search
                    if (evolveNewShinyCheck == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements(obj.jQuery, 'newshinypokedexentry', 'New Shiny Pokédex entry', evolvePokemonName, this);
                    } else if (evolveNewTotal > evolveNewShinyCheck && evolveNewShinyCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                        createListElements(obj.jQuery, 'newpossibleshinypokedexentry', 'Possible Shiny Mega/Totem forme', evolvePokemonName, this);
                    }
                    // the rest of the pokemon that could be found by name are pokemon that you already have in the dex
                } else if (pokemonIsAlbino == true) { //albino pokemon search
                    if (evolveNewAlbinoCheck == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements(obj.jQuery, 'newalbinopokedexentry', 'New Albino Pokédex entry', evolvePokemonName, this);
                    } else if (evolveNewTotal > evolveNewAlbinoCheck && evolveNewAlbinoCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                        createListElements(obj.jQuery, 'newpossiblealbinopokedexentry', 'Possible Albino Mega/Totem forme', evolvePokemonName, this);
                    }
                    // the rest of the pokemon that could be found by name are pokemon that you already have in the dex
                } else if (pokemonIsMelanistic == true) { //melanistic pokemon search
                    if (evolveNewMelaCheck == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements(obj.jQuery, 'newmelanisticpokedexentry', 'New Melanistic Pokédex entry', evolvePokemonName, this);
                    } else if (evolveNewTotal > evolveNewMelaCheck && evolveNewMelaCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                        createListElements(obj.jQuery, 'newpossiblemelanisticpokedexentry', 'Possible Melanistic Mega/Totem forme', evolvePokemonName, this);
                    }
                    // the rest of the pokemon that could be found by name are pokemon that you already have in the dex
                }

                //Looks for the Pokémon name in which it evolves to check if it's in your Pokédex
            } else {
                if (pokemonIsNormal == true) {
                    if (evolveNewCheckTwo == 0 || evolveNewCheckThree == 0 || evolveNewCheckFour == 0 || evolveNewCheckFive == 0 || evolveNewCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements(obj.jQuery, 'newpokedexentry', 'New Pokédex entry', evolvePokemonName, this);
                    } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                        if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                            createListElements(obj.jQuery, 'possiblealolan', 'Possible new Alolan entry', evolvePokemonName, this);
                        }
                    } else if (evolvePokemonName.indexOf('[') >= 0) {
                        if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"' + evolvePokemonNameOne + '"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                            createListElements(obj.jQuery, 'possibledifferent', 'Possible new forme/cloak entry', evolvePokemonName, this);
                        } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                            createListElements(obj.jQuery, 'newpokedexentry', 'New Pokédex entry', evolvePokemonName, this);
                        }

                    } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                        createListElements(obj.jQuery, 'newpokedexentry', 'New Pokédex entry', evolvePokemonName, this);
                    } else {
                        createListElements(obj.jQuery, 'errornotfound', 'Error contact ECEInTheHole!', evolvePokemonName, this);
                    }
                } else if (pokemonIsShiny == true) {
                    if (evolveNewShinyCheckTwo == 0 || evolveNewShinyCheckThree == 0 || evolveNewShinyCheckFour == 0 || evolveNewShinyCheckFive == 0 || evolveNewShinyCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements(obj.jQuery, 'newshinypokedexentry', 'New Shiny Pokédex entry', evolvePokemonName, this);
                    } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                        if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                            createListElements(obj.jQuery, 'possibleshinyalolan', 'Possible new Shiny Alolan entry', evolvePokemonName, this);
                        }
                    } else if (evolvePokemonName.indexOf('[') >= 0) {
                        if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"' + evolvePokemonNameOne + '"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                            createListElements(obj.jQuery, 'possibleshinydifferent', 'Possible new Shiny forme/cloak entry', evolvePokemonName, this);
                        } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                            createListElements(obj.jQuery, 'newshinypokedexentry', 'New Shiny Pokédex entry', evolvePokemonName, this);
                        }
                    } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                        createListElements(obj.jQuery, 'newshinypokedexentry', 'New Shiny Pokédex entry', evolvePokemonName, this);
                    } else {
                        createListElements(obj.jQuery, 'errornotfound', 'Error contact ECEInTheHole!', evolvePokemonName, this);
                    }
                } else if (pokemonIsAlbino == true) {
                    if (evolveNewAlbinoCheckTwo == 0 || evolveNewAlbinoCheckThree == 0 || evolveNewAlbinoCheckFour == 0 || evolveNewAlbinoCheckFive == 0 || evolveNewAlbinoCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements(obj.jQuery, 'newalbinopokedexentry', 'New Albino Pokédex entry', evolvePokemonName, this);
                    } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                        if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                            createListElements(obj.jQuery, 'possiblealbinoalolan', 'Possible new Albino Alolan entry', evolvePokemonName, this);
                        }
                    } else if (evolvePokemonName.indexOf('[') >= 0) {
                        if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"' + evolvePokemonNameOne + '"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                            createListElements(obj.jQuery, 'possiblealbinodifferent', 'Possible new Albino forme/cloak entry', evolvePokemonName, this);
                        } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                            createListElements(obj.jQuery, 'newalbinopokedexentry', 'New Albino Pokédex entry', evolvePokemonName, this);
                        }
                    } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                        createListElements(obj.jQuery, 'newalbinopokedexentry', 'New Albino Pokédex entry', evolvePokemonName, this);
                    } else {
                        createListElements(obj.jQuery, 'errornotfound', 'Error contact ECEInTheHole!', evolvePokemonName, this);
                    }

                } else if (pokemonIsMelanistic == true) {
                    if (evolveNewMelaCheckTwo == 0 || evolveNewMelaCheckThree == 0 || evolveNewMelaCheckFour == 0 || evolveNewMelaCheckFive == 0 || evolveNewMelaCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements(obj.jQuery, 'newmelanisticpokedexentry', 'New Melanistic Pokédex entry', evolvePokemonName, this);
                    } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                        if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                            createListElements(obj.jQuery, 'possiblemelanalolan', 'Possible new Melanistic Alolan entry', evolvePokemonName, this);
                        }
                    } else if (evolvePokemonName.indexOf('[') >= 0) {
                        if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"' + evolvePokemonNameOne + '"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                            createListElements(obj.jQuery, 'possiblemelandifferent', 'Possible new Melanistic forme/cloak entry', evolvePokemonName, this);
                        } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                            createListElements(obj.jQuery, 'newmelanisticpokedexentry', 'New Melanistic Pokédex entry', evolvePokemonName, this);
                        }
                    } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                        createListElements(obj.jQuery, 'newmelanisticpokedexentry', 'New Melanistic Pokédex entry', evolvePokemonName, this);
                    } else {
                        createListElements(obj.jQuery, 'errornotfound', 'Error contact ECEInTheHole!', evolvePokemonName, this);
                    }
                }
            }
        });

        obj.jQuery('.evolvepkmnlist').hide();

        //layout
        const typeBackground = obj.jQuery('.panel>h3').css('background-color');
        const typeBorder = obj.jQuery('.panel>h3').css('border');
        const typeColor = obj.jQuery('.panel>h3').css('color');
        obj.jQuery('.expandlist').css('background-color', '' + typeBackground + '');
        obj.jQuery('.expandlist').css('border', '' + typeBorder + '');
        obj.jQuery('.expandlist').css('color', '' + typeColor + '');

        const typeListBackground = obj.jQuery('.tabbed_interface>div').css('background-color');
        const typeListColor = obj.jQuery('.tabbed_interface>div').css('color');
        obj.jQuery('.qolChangeLogContent').css('background-color', '' + typeListBackground + '');
        obj.jQuery('.qolChangeLogContent').css('color', '' + typeListColor + '');
    }
    easyQuickEvolve() {
        if (this.jQuery('.canevolve:contains("evolved into")').parent().length != 0) {
            this.jQuery('.canevolve:contains("evolved into")').parent().remove();
        }
    }
}