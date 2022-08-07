// ==UserScript==
// @name         Poké Farm QoL
// @namespace    https://github.com/tarashia/
// @author       Bentomon, ECEInTheHole, Tarashia (Mirzam)
// @homepageURL  https://github.com/tarashia/PokeFarmQoL
// @downloadURL  https://github.com/tarashia/PokeFarmQoL/raw/master/Poke-Farm-QoL.user.js
// @updateURL    https://github.com/tarashia/PokeFarmQoL/raw/master/Poke-Farm-QoL.user.js
// @description  Quality of Life changes to Pokéfarm!
// @version      1.7.3
// @match        https://pokefarm.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js
// ==/UserScript==

// Tell ESLint that jQuery's $ is defined elsewhere
/* global $ */
class Page {
    constructor(localStorageMgr, helpers, ssk, ds, url, globalSettings) {
        this.localStorageMgr = localStorageMgr;
        this.helpers = helpers;
        this.settingsSaveKey = ssk;
        this.defaultSettings = ds;
        this.url = url;
        this.settings = this.defaultSettings;
        this.globalSettings = globalSettings;
    }

    onPage(w) {
        return w.location.href.indexOf(`pokefarm.com/${this.url}`) != -1;
    }

    loadSettings() {
        this.settings = this.localStorageMgr.loadSettings(
            this.settingsSaveKey,
            this.defaultSettings,
            this.settings);
    }

    saveSettings() {
        this.localStorageMgr.saveSettings(this.settingsSaveKey, this.settings);
    }

    populateSettings(obj) {
        if(obj === undefined) {
            obj = this.settings;
        }
        for (const key in obj) {
            if (!Object.prototype.hasOwnProperty.call(obj, key)) {
                continue;
            }
            const value = obj[key];
            if (typeof value === 'object') {
                this.populateSettings(obj[key]);
            }
            else if (typeof value === 'boolean') {
                Helpers.toggleSetting(key, value);//, false);
            }
            else if (typeof value === 'string') {
                console.log('TODO - split and populate');
            }
        }
    }

    resetSettings() {
        this.settings = JSON.parse(JSON.stringify(this.defaultSettings));
        this.saveSettings();
    }

    settingsChange(element, textElement, customClass, typeClass, arrayName) {
        if (JSON.stringify(this.settings).indexOf(element) >= 0) {
            if (typeof this.settings[element] === 'boolean') {
                this.settings[element] = !this.settings[element];
            }
            else if (typeof this.settings[element] === 'string') {
                if (arrayName !== undefined && arrayName !== '') {
                    if (textElement === 'none') {
                        const tempIndex = typeClass - 1;
                        this[arrayName].splice(tempIndex, tempIndex);
                        this.settings[element] = this[arrayName].toString();
                    } else {
                        let tempIndex = -1;
                        if(typeClass !== undefined) {
                            tempIndex = typeClass - 1; // select array
                        } else if(customClass !== undefined) {
                            tempIndex = customClass - 1; // textfield array
                        }
                        this[arrayName][tempIndex] = textElement;
                        this.settings[element] = this[arrayName].toString();
                    }
                }
                else {
                    this.settings[element] = textElement;
                }
            }
            return true;
        }
        else { return false; }
    }

    setupHTML() { /* empty */ }
    setupCSS() { /* empty */ }
    setupObserver() { /* empty */ }
    setupHandlers() { /* empty */ }
} // Page

class DaycarePage extends Page {
    constructor(localStorageMgr, helpers, GLOBALS) {
        super(localStorageMgr, helpers, GLOBALS.DAYCARE_PAGE_SETTINGS_KEY, {}, 'daycare');
        const obj = this;
        this.observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                // const fsPokemon = document.querySelector('#fs_pokemon');
                const fsPokemon = $('#fs_pokemon');
                if (fsPokemon.length > 0 &&
                    $.contains(fsPokemon[0], mutation.target)) {
                    obj.customSearch(GLOBALS);
                }
            });
        });
    } // constructor

    setupObserver() {
        this.observer.observe(document.querySelector('body'), {
            childList: true,
            subtree: true
        });
    }
    customSearch(GLOBALS) {
        const button = document.querySelector('#pkmnadd');

        let gender = null;
        let eggGroup1 = null, eggGroup2 = null;

        if (button !== null) {
            if (button.attributes['data-gender'] !== undefined) {
                gender = button.attributes['data-gender'].value;
            }
            /*
             * the egg group is binary coded decimal
             * if a pokemon has two egg groups, the leftmost 4 bits of the number returned
             * are the first egg group and the rightmost 4 bits are the second egg group
             */
            if (button.attributes['data-egggroup'] !== undefined) {
                eggGroup1 = parseInt(button.attributes['data-egggroup'].value);
                if (eggGroup1 > 15) { // two egg groups
                    eggGroup2 = eggGroup1 & 15;
                    eggGroup1 = eggGroup1 >> 4;
                }
            }
        }

        const EGG_ID_TO_NAME = GLOBALS.EGG_GROUP_LIST;
        if (eggGroup1 !== null) { eggGroup1 = EGG_ID_TO_NAME[eggGroup1]; }
        if (eggGroup2 !== null) { eggGroup2 = EGG_ID_TO_NAME[eggGroup2]; }

        // clear matches
        $('.daycarefoundme').removeClass('daycarefoundme');

        if (gender !== null && eggGroup1 !== null) {
            const fieldmons = document.querySelectorAll('.fieldmon');
            if (fieldmons !== null) {
                for (let m = 0; m < fieldmons.length; m++) {
                    const mon = fieldmons[m];
                    const searchPokemonBigImg = $(mon)[0].childNodes[0];
                    const searchPokemon = searchPokemonBigImg.alt;

                    const tooltip = $(mon).next();
                    const fieldmontip = tooltip[0].querySelector('.fieldmontip');
                    const speciesDiv = $(fieldmontip).children(':contains(Species)')[0];
                    const eggGroupDiv = $(fieldmontip).children(':contains(Egg Group)')[0];
                    const searchIcons = speciesDiv.querySelector('span').querySelectorAll('img');

                    /*
                     * There can be other icons if the Pokemon is CS/Delta/Shiny/Albino/Melan
                     * The gender title can be "[M], [F], [N]"
                     */
                    const searchGender = searchIcons[0].title.toLowerCase().substring(1, 2);
                    const searchEggGroups = $(eggGroupDiv).text().slice('Egg Group: '.length).split('/');

                    // Match Ditto in Daycare to anything that can breed
                    if (gender === 'd' && eggGroup1 === 'Ditto' &&
                        searchPokemon !== 'Ditto' && searchEggGroups[0] !== 'Undiscovered') {
                        $(mon).addClass('daycarefoundme');
                    }
                    // Match Ditto in field to anything that can breed
                    else if (eggGroup1 !== 'Ditto' && searchPokemon === 'Ditto' && eggGroup1 !== 'Undiscovered') {
                        $(mon).addClass('daycarefoundme');
                    }
                    // Match correct gender
                    else {
                        const genderCorrect = (gender === 'f' && searchGender === 'm') ||
                            (gender === 'm' && searchGender === 'f');
                        const group1Correct = searchEggGroups.reduce((res, curr) => { res = res || (eggGroup1 === curr); return res; }, false);
                        let group2Correct = false;
                        if (eggGroup2 !== null) {
                            group2Correct = searchEggGroups.reduce((res, curr) => { res = res || (eggGroup2 === curr); return res; }, false);
                        }

                        if (genderCorrect && (group1Correct || group2Correct)) {
                            $(mon).addClass('daycarefoundme');
                        }
                    }

                } // for
            }
        } // if
    } // customSearch
}

class DexPage extends Page {
    constructor(localStorageMgr, helpers, GLOBALS) {
        super(localStorageMgr, helpers, GLOBALS.DEX_PAGE_SETTINGS_KEY, {}, 'dex');
        const obj = this;
        this.observer = new MutationObserver(function (mutations) {
            // eslint-disable-next-line no-unused-vars
            mutations.forEach(function (mutation) {
                obj.applyTypeFilters();
            });
        });
        this.typeArray = [];

        /*
         * when entering the dex page, update the local storage QoLPokedex
         * so the user can update their information
         */
        if ($('script#dexdata') && $('script#dexdata').text()) {
            const text = $('script#dexdata').text();
            GLOBALS.DEX_DATA = text.split(',');
            this.localStorageMgr.updateLocalStorageDex(document, undefined, GLOBALS);
        }
    }
    setupObserver() {
        this.observer.observe(document.querySelector('#regionslist'), {
            childList: true,
            subtree: true,
        });
    }
    setupHTML() {
        const elem = document.querySelector('.filter-type');
        const clone = elem.cloneNode(true);
        elem.parentNode.appendChild(clone);
        /*
         * can't remove filter-type class or else the filtering
         * won't look right
         */
        $(clone).addClass('filter-type-2');
    }

    setupHandlers() {
        const obj = this;
        let h = $.parseJSON($('#dexdata').html());
        const type2 = $('.filter-type-2');
        const l = $('.filter-type-2 .types');
        const c = l.children();

        const typesSpan = $('.filter-type-2 .types');

        type2.on('mousedown.dextfilter touchstart.dextfilter', function (event) {
            event.preventDefault();
            const leftedge = typesSpan.offset().left;
            const width = typesSpan.width();
            const rightedge = leftedge + width;
            let xLocation = (event.originalEvent.touches ? event.originalEvent.touches[0] : event).pageX;
            if (xLocation >= leftedge & xLocation < rightedge) {
                xLocation -= leftedge;
                xLocation = Math.floor(xLocation / width * c.length);
                xLocation = c.eq(xLocation);
                if (xLocation.data('type') == h) {
                    h = null;
                    obj.toggleSelectedTypes();
                    obj.applyTypeFilters();
                } else {
                    h = xLocation.data('type');
                    obj.toggleSelectedTypes(xLocation);
                    obj.applyTypeFilters();
                }
            } else {
                obj.toggleSelectedTypes();
                obj.applyTypeFilters();
            }
        });
    }

    toggleSelectedTypes(b) {
        const g = $('.filter-type-2 .name i');
        const l = $('.filter-type-2 .types');
        const c = l.children();

        l.addClass('selected');
        c.removeClass('selected');
        if (b && b.length && !b.hasClass('selected')) {
            b.addClass('selected');
            g.text(b.data('type').charAt(0).toUpperCase() + b.data('type').slice(1));
        } else {
            l.removeClass('selected');
            g.text('');
        }
    }

    applyTypeFilters() {
        const l1 = $('.entry.filter-type:not(.filter-type-2) .types');
        const l = $('.entry.filter-type-2 .types');
        const c1 = l1.children();
        const c = l.children();

        // get the first filter type
        const a1 = c1.filter('.selected').data('type');
        const a = c.filter('.selected').data('type');

        let selector = '.region-entries>li.entry';
        if (a1 !== undefined) {
            selector += '.t-' + a1;
        }
        if (a !== undefined) {
            selector += '.t-' + a;
        }
        if (a1 || a) {
            // Set "display" to "none" for all elements
            $('.region-entries>li.entry').css('display', 'none');
            // Set "display" to "inline-block" for elements matching selector
            $(selector).css('display', 'inline-block');
        } else {
            $(selector).css('display', 'inline-block');
        }
    }
}

class FarmPage extends Page {
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
        d.KNOWN_EXCEPTIONS = {"Gastrodon [Occident]":["2","8"],"Gastrodon [Orient]":["2","8"],"Wormadam [Plant Cloak]":["11","4"],"Wormadam [Trash Cloak]":["11","16"],"Wormadam [Sandy Cloak]":["11","8"],"Raticate [Alolan Forme]":["15","0"],"Ninetales [Alolan Forme]":["5","17"],"Exeggutor [Alolan Forme]":["4","14"],"Marowak [Alolan Forme]":["1","13"],"Dugtrio [Alolan Forme]":["8","16"],"Graveler [Alolan Forme]":["12","3"],"Golem [Alolan Forme]":["12","3"],"Muk [Alolan Forme]":["7","15"],"Raichu [Alolan Forme]":["3","10"],"Linoone [Galarian Forme]":["15","0"],"Gourgeist [Small Size]":["13","4"],"Gourgeist [Average Size]":["13","4"],"Gourgeist [Large Size]":["13","4"],"Gourgeist [Super Size]":["13","4"],"Persian [Alolan Forme]":["15"]};
        return d;
    }
    constructor(localStorageMgr, helpers, GLOBALS) {
        super(localStorageMgr, helpers, GLOBALS.FARM_PAGE_SETTINGS_KEY, {}, 'farm#tab=1');
        this.defaultSettings = this.DEFAULT_SETTINGS(GLOBALS);
        this.settings = this.defaultSettings;
        this.evolveListCache = '';
        const obj = this;
        function observeFunc(mutations) {
            // eslint-disable-next-line no-unused-vars
            mutations.forEach(function (mutation) {
                obj.easyQuickEvolve();
            });
        }
        this.observer = new MutationObserver(observeFunc);
    }
    setupHTML() {
        $(document).ready(function () {
            $('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
            document.querySelector('#farm-evolve>h3').insertAdjacentHTML('afterend',`<label id="qolevolvenormal"><input type="button" class="qolsortnormal" value="Normal list"></label> <label id="qolchangesletype"><input type="button" class="qolsorttype" value="Sort on types"></label> <label id="qolsortevolvename"><input type="button" class="qolsortname" value="Sort on name"></label> <label id="qolevolvenew"><input type="button" class="qolsortnew" value="New dex entry"></label>`);
            // use the evolve button
            $('#farmnews-evolutions>p>label>input').addClass('qolquickevo');
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
        $(document).on('click', '#qolevolvenormal', (function () {
            obj.easyEvolveNormalList(GLOBALS);
        }));

        $(document).on('click', '#qolchangesletype', (function () {
            obj.easyEvolveTypeList(GLOBALS);
        }));

        $(document).on('click', '#qolsortevolvename', (function () {
            obj.easyEvolveNameList(GLOBALS);
        }));

        $(document).on('click', '#qolevolvenew', (function () {
            obj.easyEvolveNewList(GLOBALS);
        }));
    }
    clearSortedEvolveLists() {
        // first remove the sorted pokemon type list to avoid duplicates
        const evoList = $('.evolvepkmnlist');
        evoList.show();
        evoList.removeAttr('class');
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
        this.clearSortedEvolveLists();

        $('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
        document.querySelector('#farmnews-evolutions>.scrollable').insertAdjacentHTML('afterbegin', '<ul class="qolEvolveNameList">');

        let errorOccurred = false;
        $('#farmnews-evolutions>.scrollable>.evolvepkmnlist>Li').each(function (index) {
            // getting the <li> element from the pokemon & the pokemon evolved name
            const getEvolveString = $(this).html();
            if (getEvolveString === undefined || getEvolveString === '') {
                console.error(`Unable to parse html from <li> at index ${index}`);
                errorOccurred = true;
            } else {
                let beforeEvolvePokemon = $(this).children().children().text().slice(0, -6);
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
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNameList>Li>Ul').hasClass(evolvePokemonClass) === false) {
                                document.querySelector('.qolEvolveNameList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">' +
                                    beforeEvolvePokemon + ' > ' + evolvePokemon +
                                    '</h3><ul class="' + evolvePokemonClass +
                                    ' qolChangeLogContent"></ul></li><br>');
                            } // class
                            $(this).clone().appendTo('.' + evolvePokemonClass + '');
                        } // evolvePokemonClass
                    } // evolvePokemon
                } // beforeEvolvePokemon
            } // getEvolveString
        });

        if (errorOccurred) {
            window.alert('Error occurred while sorting pokemon by name');
            return;
        }

        $('#farmnews-evolutions>.scrollable>.qolEvolveNameList>Li').each(function (index) {
            const amountOfEvolves = $(this).children().children().length;
            if (amountOfEvolves === 0) {
                console.error(`Found 0 evolutions for <li> at ${index} of evolve name list`);
                errorOccurred = true;
            } else {
                const getEvolveString = $(this).children().children().html();
                if (getEvolveString === undefined || getEvolveString === '') {
                    console.error(`Unable to parse evolve string from <li> at ${index} from evolve name list`);
                    errorOccurred = true;
                } else {
                    const beforeEvolvePokemon = $(this).children().children().children().children().first().text(); // .split(' ').join('');

                    if (beforeEvolvePokemon === undefined || beforeEvolvePokemon === '') {
                        console.error(`Unable to parse pokemon-evolving-from from <li> at ${index} from evolve name list`);
                        errorOccurred = true;
                    } else {
                        const evolvePokemon = getEvolveString.substr(getEvolveString.indexOf('into</span> ') + 'into</span> '.length);
                        if (evolvePokemon === undefined || evolvePokemon === '') {
                            console.error(`Unable to parse pokemon-evolving-to from <li> at ${index} from evolve name list`);
                            errorOccurred = true;
                        } else {
                            $(this).children('.slidermenu').html(beforeEvolvePokemon + ' > ' + evolvePokemon + ' (' + amountOfEvolves + ')');
                        }
                    }
                } // getEvolveString
            } // amountOfEvolves
        });

        $('.evolvepkmnlist').hide();

        if (errorOccurred) {
            window.alert('Error occurred while sorting pokemon by name');
            return;
        }

        //layout of the created html
        const typeBackground = $('.panel>h3').css('background-color');
        const typeBorder = $('.panel>h3').css('border');
        const typeColor = $('.panel>h3').css('color');
        $('.expandlist').css('background-color', '' + typeBackground + '');
        $('.expandlist').css('border', '' + typeBorder + '');
        $('.expandlist').css('color', '' + typeColor + '');

        const typeListBackground = $('.tabbed_interface>div').css('background-color');
        const typeListColor = $('.tabbed_interface>div').css('color');
        $('.qolChangeLogContent').css('background-color', '' + typeListBackground + '');
        $('.qolChangeLogContent').css('color', '' + typeListColor + '');
    }
    easyEvolveNewList(GLOBALS) {
        const dexData = GLOBALS.DEX_DATA;

        this.clearSortedEvolveLists();

        // add a class to the original pokemon evolve list to be able to manipulate the element more easily and add the ul for the new dex search
        $('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
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

        const createListElements = (cls, header, name, elem) => {
            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass(cls) === false) {
                const html = '<li class="expandlist">' +
                    `<h3 class="slidermenu">${header}</h3>` +
                    `<ul class="${cls} qolChangeLogContent"></ul></li><br>`;
                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', html);
            }

            if ($(`#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.${cls}>li:contains(${name})`).length == 0) {
                $(elem).clone().appendTo(`.${cls}`);
            }
        };

        $('#farmnews-evolutions>.scrollable>.evolvepkmnlist>Li').each(function () { //the actual search
            // getting the <li> element from the pokemon & the pokemon evolved name
            const getEvolveString = $(this).html();

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
            /*
             * if a pokemon has a name like gligar [Vampire] it won't be found. This tries to change the name as it's recorded in the pokedex data array
             * The remaining checks are a (not great) way of checking for names with '/' in them.
             * PFQ uses '/' in the names of PFQ variants and in PFQ exclusives with multiple forms
             * Example of evolvePokemonNameTwoBefore: 'Gliscor/Vampire'
             * Regex: \w+/\w+
             */
            const evolvePokemonNameTwo = (evolvePokemonNameOne + '/' + pokemonDexKeepSecondName).replace('[', '').replace(']', '');
            const [evolveNewTotalTwo, evolveNewCheckTwo,
                evolveNewShinyCheckTwo, evolveNewAlbinoCheckTwo,
                evolveNewMelaCheckTwo] = getNewCheckData(evolvePokemonNameTwo);

            /*
             * Example of evolvePokemonNameThreeBefore: 'Phasmaleef/Forest Forme\'
             * Regex: \w+/\w+ \w+
             */
            const evolvePokemonNameThree = (evolvePokemonNameOne + '/' +
                pokemonDexKeepSecondName + ' ' +
                pokemonDexKeepThirdName).replace('[', '').replace(']', '');
            const [evolveNewTotalThree, evolveNewCheckThree,
                evolveNewShinyCheckThree, evolveNewAlbinoCheckThree,
                evolveNewMelaCheckThree] = getNewCheckData(evolvePokemonNameThree);

            /*
             * Example of evolvePokemonNameFourBefore: 'Butterfree/Mega Forme Q'
             * Regex: \w+/\w+ \w+ \w+
             */
            const evolvePokemonNameFour = (evolvePokemonNameOne + '/' +
                pokemonDexKeepSecondName + ' ' +
                pokemonDexKeepThirdName + ' ' +
                pokemonDexKeepFourthName).replace('[', '').replace(']', '');
            const [evolveNewTotalFour, evolveNewCheckFour,
                evolveNewShinyCheckFour, evolveNewAlbinoCheckFour,
                evolveNewMelaCheckFour] = getNewCheckData(evolvePokemonNameFour);

            /*
             * Example of evolvePokemonNameFiveBefore: 'Marowak/Alolan Mega Forme Q'
             * Regex: \w+/\w+ \w+ \w+ \w+
             */
            const evolvePokemonNameFive = (evolvePokemonNameOne + '/' +
                pokemonDexKeepSecondName + ' ' +
                pokemonDexKeepThirdName + ' ' +
                pokemonDexKeepFourthName + ' ' +
                pokemonDexKeepFifthName).replace('[', '').replace(']', '');
            const [evolveNewTotalFive, evolveNewCheckFive,
                evolveNewShinyCheckFive, evolveNewAlbinoCheckFive,
                evolveNewMelaCheckFive] = getNewCheckData(evolvePokemonNameFive);

            /*
             * Couldn't find any examples of pokemon that match evolvePokemonNameSixBefore
             * Regex: \w+/\w+ \w+ \w+ \w+ \w+
             */
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
                        createListElements('newpokedexentry', 'New Pokédex entry', evolvePokemonName, this);
                    } else if (evolveNewTotal > evolveNewCheck && evolveNewCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                        createListElements('newpossiblepokedexentry', 'Possible Mega/Totem forme', evolvePokemonName, this);
                    }
                    // the rest of the pokemon that could be found by name are pokemon that you already have in the dex
                } else if (pokemonIsShiny == true) { //shiny Pokemon search
                    if (evolveNewShinyCheck == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements('newshinypokedexentry', 'New Shiny Pokédex entry', evolvePokemonName, this);
                    } else if (evolveNewTotal > evolveNewShinyCheck && evolveNewShinyCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                        createListElements('newpossibleshinypokedexentry', 'Possible Shiny Mega/Totem forme', evolvePokemonName, this);
                    }
                    // the rest of the pokemon that could be found by name are pokemon that you already have in the dex
                } else if (pokemonIsAlbino == true) { //albino pokemon search
                    if (evolveNewAlbinoCheck == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements('newalbinopokedexentry', 'New Albino Pokédex entry', evolvePokemonName, this);
                    } else if (evolveNewTotal > evolveNewAlbinoCheck && evolveNewAlbinoCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                        createListElements('newpossiblealbinopokedexentry', 'Possible Albino Mega/Totem forme', evolvePokemonName, this);
                    }
                    // the rest of the pokemon that could be found by name are pokemon that you already have in the dex
                } else if (pokemonIsMelanistic == true) { //melanistic pokemon search
                    if (evolveNewMelaCheck == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements('newmelanisticpokedexentry', 'New Melanistic Pokédex entry', evolvePokemonName, this);
                    } else if (evolveNewTotal > evolveNewMelaCheck && evolveNewMelaCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                        createListElements('newpossiblemelanisticpokedexentry', 'Possible Melanistic Mega/Totem forme', evolvePokemonName, this);
                    }
                    // the rest of the pokemon that could be found by name are pokemon that you already have in the dex
                }

                //Looks for the Pokémon name in which it evolves to check if it's in your Pokédex
            } else {
                if (pokemonIsNormal == true) {
                    if (evolveNewCheckTwo == 0 || evolveNewCheckThree == 0 || evolveNewCheckFour == 0 || evolveNewCheckFive == 0 || evolveNewCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements('newpokedexentry', 'New Pokédex entry', evolvePokemonName, this);
                    } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                        if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                            createListElements('possiblealolan', 'Possible new Alolan entry', evolvePokemonName, this);
                        }
                    } else if (evolvePokemonName.indexOf('[') >= 0) {
                        if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"' + evolvePokemonNameOne + '"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                            createListElements('possibledifferent', 'Possible new forme/cloak entry', evolvePokemonName, this);
                        } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                            createListElements('newpokedexentry', 'New Pokédex entry', evolvePokemonName, this);
                        }

                    } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                        createListElements('newpokedexentry', 'New Pokédex entry', evolvePokemonName, this);
                    } else {
                        createListElements('errornotfound', 'Error: not found', evolvePokemonName, this);
                    }
                } else if (pokemonIsShiny == true) {
                    if (evolveNewShinyCheckTwo == 0 || evolveNewShinyCheckThree == 0 || evolveNewShinyCheckFour == 0 || evolveNewShinyCheckFive == 0 || evolveNewShinyCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements('newshinypokedexentry', 'New Shiny Pokédex entry', evolvePokemonName, this);
                    } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                        if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                            createListElements('possibleshinyalolan', 'Possible new Shiny Alolan entry', evolvePokemonName, this);
                        }
                    } else if (evolvePokemonName.indexOf('[') >= 0) {
                        if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"' + evolvePokemonNameOne + '"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                            createListElements('possibleshinydifferent', 'Possible new Shiny forme/cloak entry', evolvePokemonName, this);
                        } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                            createListElements('newshinypokedexentry', 'New Shiny Pokédex entry', evolvePokemonName, this);
                        }
                    } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                        createListElements('newshinypokedexentry', 'New Shiny Pokédex entry', evolvePokemonName, this);
                    } else {
                        createListElements('errornotfound', 'Error: not found', evolvePokemonName, this);
                    }
                } else if (pokemonIsAlbino == true) {
                    if (evolveNewAlbinoCheckTwo == 0 || evolveNewAlbinoCheckThree == 0 || evolveNewAlbinoCheckFour == 0 || evolveNewAlbinoCheckFive == 0 || evolveNewAlbinoCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements('newalbinopokedexentry', 'New Albino Pokédex entry', evolvePokemonName, this);
                    } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                        if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                            createListElements('possiblealbinoalolan', 'Possible new Albino Alolan entry', evolvePokemonName, this);
                        }
                    } else if (evolvePokemonName.indexOf('[') >= 0) {
                        if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"' + evolvePokemonNameOne + '"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                            createListElements('possiblealbinodifferent', 'Possible new Albino forme/cloak entry', evolvePokemonName, this);
                        } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                            createListElements('newalbinopokedexentry', 'New Albino Pokédex entry', evolvePokemonName, this);
                        }
                    } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                        createListElements('newalbinopokedexentry', 'New Albino Pokédex entry', evolvePokemonName, this);
                    } else {
                        createListElements('errornotfound', 'Error: not found', evolvePokemonName, this);
                    }

                } else if (pokemonIsMelanistic == true) {
                    if (evolveNewMelaCheckTwo == 0 || evolveNewMelaCheckThree == 0 || evolveNewMelaCheckFour == 0 || evolveNewMelaCheckFive == 0 || evolveNewMelaCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements('newmelanisticpokedexentry', 'New Melanistic Pokédex entry', evolvePokemonName, this);
                    } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                        if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                            createListElements('possiblemelanalolan', 'Possible new Melanistic Alolan entry', evolvePokemonName, this);
                        }
                    } else if (evolvePokemonName.indexOf('[') >= 0) {
                        if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"' + evolvePokemonNameOne + '"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                            createListElements('possiblemelandifferent', 'Possible new Melanistic forme/cloak entry', evolvePokemonName, this);
                        } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                            createListElements('newmelanisticpokedexentry', 'New Melanistic Pokédex entry', evolvePokemonName, this);
                        }
                    } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                        createListElements('newmelanisticpokedexentry', 'New Melanistic Pokédex entry', evolvePokemonName, this);
                    } else {
                        createListElements('errornotfound', 'Error: not found', evolvePokemonName, this);
                    }
                }
            }
        });

        $('.evolvepkmnlist').hide();

        //layout
        const typeBackground = $('.panel>h3').css('background-color');
        const typeBorder = $('.panel>h3').css('border');
        const typeColor = $('.panel>h3').css('color');
        $('.expandlist').css('background-color', '' + typeBackground + '');
        $('.expandlist').css('border', '' + typeBorder + '');
        $('.expandlist').css('color', '' + typeColor + '');

        const typeListBackground = $('.tabbed_interface>div').css('background-color');
        const typeListColor = $('.tabbed_interface>div').css('color');
        $('.qolChangeLogContent').css('background-color', '' + typeListBackground + '');
        $('.qolChangeLogContent').css('color', '' + typeListColor + '');
    }
    easyQuickEvolve() {
        const parent = $('.canevolve:contains("evolved into")').parent();
        if (parent.length != 0) {
            parent.remove();
        }
    }
    easyEvolveTypeList(GLOBALS) {
        const obj = this;
        const dexData = GLOBALS.DEX_DATA;

        this.clearSortedEvolveLists();

        const typeBackground = $('.panel>h3').css('background-color');
        $('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
        document.querySelector('#farmnews-evolutions>.scrollable').insertAdjacentHTML('afterbegin', GLOBALS.TEMPLATES.evolveFastHTML);

        const typeBorder = $('.panel>h3').css('border');
        const typeColor = $('.panel>h3').css('color');
        $('.expandlist').css('background-color', '' + typeBackground + '');
        $('.expandlist').css('border', '' + typeBorder + '');
        $('.expandlist').css('color', '' + typeColor + '');

        const typeListBackground = $('.tabbed_interface>div').css('background-color');
        const typeListColor = $('.tabbed_interface>div').css('color');
        $('.qolChangeLogContent').css('background-color', '' + typeListBackground + '');
        $('.qolChangeLogContent').css('color', '' + typeListColor + '');

        /* Nested helper function */
        const getEvolutionOrigin = function (evoString) {
            const summary = '/summary/';
            const originStart = evoString.indexOf(summary) + summary.length + 7;
            const originEnd = evoString.indexOf('</a>');
            return evoString.substring(originStart, originEnd);
        };

        const getEvolutionDestination = function (evoString) {
            const destStart = evoString.indexOf('into</span>') + 'into</span>'.length;
            return evoString.substr(destStart).trim();
        };

        const appendDeltaTypeIfDelta = function (evoString, elemToAppendTo) {
            if (evoString.includes('title="[DELTA')) {
                const deltaType = evoString.match('DELTA-(.*)]">');
                $(elemToAppendTo).clone().appendTo(obj.settings.TYPE_APPEND[deltaType[1]]);
            }
        };

        $('#farmnews-evolutions>.scrollable>.evolvepkmnlist>Li').each(function () {
            // getting the <li> element from the pokemon & the pokemon evolved name
            const getEvolveString = $(this).html();
            let previousPokemon = getEvolutionOrigin(getEvolveString);
            const evolvePokemon = getEvolutionDestination(getEvolveString);

            // Handle unicode characters
            previousPokemon = previousPokemon
                .replace(/é/g, '\\u00e9')
                .replace(/í/g, '\\u00ed')
                .replace(/ñ/g, '\\u00f1');

            // Handle evolvePokemon name formatting
            let evolveFormatted = evolvePokemon.replace(' [', '/');
            evolveFormatted = evolveFormatted.replace(']', '');

            const previousIndex = dexData.indexOf('"' + previousPokemon + '"');
            const evolveIndex = dexData.indexOf('"' + evolveFormatted + '"');

            const previousInDex = previousIndex != -1;
            const evolveInDex = evolveIndex != -1;
            const evolveInExceptions = evolvePokemon in obj.settings.KNOWN_EXCEPTIONS;
            let evolveTypesPrevious = [];
            let evolveTypes = [];

            /*
             * Procedure
             * 1. If the evolution destination is in the known exceptions list
             *    a. Load the types from KNOWN_EXCEPTIONS
             * 2. Else:
             *    a. If the evolution origin is in the dex, load the types from the dex
             *    b. If the evolution origin is not in the dex, mark the type as '18' (not a valid type)
             *    c. If the destination pokemon is in the dex, load the types from the dex
             *    d. Else, mark the type as '18' (not a valid type)
             * 3. Use types to apply HTML classes to the list item that contains the current evolution
             *    a. Use the evolution origin's and destination's types as HTML classes
             *    b. If the origin pokemon is a Delta mon, use the delta type as an HTML class as well
             */

            if(evolveInExceptions) {
                evolveTypes = obj.settings.KNOWN_EXCEPTIONS[evolvePokemon].map((t) => '' + t);
                // short circuit the previous pokemon's types, since the KNOWN_EXCEPTIONS table will have everything
                evolveTypesPrevious = evolveTypes;
            }
            else {
                if (previousInDex) {
                    evolveTypesPrevious = [1, 2].map((i) => dexData[previousIndex + i]);
                }
                else {
                    evolveTypesPrevious = ['18', '-1'];
                }

                if (evolveInDex) {
                    evolveTypes = [1, 2].map((i) => dexData[evolveIndex + i]);
                }
                else {
                    evolveTypes = ['18', '-1'];
                }
            }

            /*
             * the evolveTypes and evolveTypesPrevious entries can begin with a '.'
             * in some cases. Just strip it off
             */
            evolveTypesPrevious = evolveTypesPrevious.map((t) => t.replace('.', ''));
            evolveTypes = evolveTypes.map((t) => t.replace('.', ''));

            // filter out invalid 2nd types (will be -1)
            evolveTypesPrevious = evolveTypesPrevious.filter((t) => t !== '-1');
            evolveTypes = evolveTypes.filter((t) => t !== '-1');

            // append types to DOM
            const elem = this;
            // add unknown source types
            if(evolveTypesPrevious   .includes('18')) {
                $(elem).clone().appendTo('.18source');
            }
            // add unknown target types
            if(evolveTypes.includes('18')) {
                $(elem).clone().appendTo('.18target');
            }
            const combinedValidTypes = [...evolveTypesPrevious, ...evolveTypes]
                .filter((t, i, self) => t != '18' && self.indexOf(t) === i);
            combinedValidTypes.map((t) => {
                $(elem).clone().appendTo(`.${t}`);
            });

            appendDeltaTypeIfDelta(getEvolveString, this);
        }); // each

        $('#farmnews-evolutions>.scrollable>.qolEvolveTypeList>Li').each(function () {
            const amountOfEvolves = $(this).children().children().length;
            const evolveTypeName = $(this).children('.slidermenu').html();

            // hide the types with no evolutions
            if (amountOfEvolves === 0) {
                this.nextSibling.hidden = true;
                this.hidden = true;
            } else {
                $(this).children('.slidermenu').html(evolveTypeName + ' (' + amountOfEvolves + ')');
            }
        });

        $('.evolvepkmnlist').hide();
    }
}

class FishingPage extends Page {
    constructor(localStorageMgr, helpers, GLOBALS) {
        super(localStorageMgr, helpers, GLOBALS.FISHING_PAGE_SETTINGS_KEY, {}, 'fishing');
        // no observer
    }
    setupHTML(GLOBALS) {
        // fishing select all button on caught fishing
        document.querySelector('#caughtfishcontainer label').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.massReleaseSelectHTML);
    }
    setupHandlers() {
        $('#selectallfishcheckbox').on('click', function () {
            $('li[data-flavour]>label>input').prop('checked', this.checked);
        });

        $('#movefishselectanycheckbox').on('click', function () {
            $('li[data-flavour=Any]>label>input').prop('checked', this.checked);
        });

        $('#movefishselectsourcheckbox').on('click', function () {
            $('li[data-flavour=Sour]>label>input').prop('checked', this.checked);
        });

        $('#movefishselectspicycheckbox').on('click', function () {
            $('li[data-flavour=Spicy]>label>input').prop('checked', this.checked);
        });

        $('#movefishselectdrycheckbox').on('click', function () {
            $('li[data-flavour=Dry]>label>input').prop('checked', this.checked);
        });

        $('#movefishselectsweetcheckbox').on('click', function () {
            $('li[data-flavour=Sweet]>label>input').prop('checked', this.checked);
        });

        $('#movefishselectbittercheckbox').on('click', function () {
            $('li[data-flavour=Bitter]>label>input').prop('checked', this.checked);
        });
    }
}

class Globals {
    constructor(localStorageMgr, helpers) {
        this.localStorageMgr = localStorageMgr;
        this.HELPERS = helpers;
        this.TEMPLATES = { // all the new/changed HTML for the userscript
            qolHubLinkHTML: `<li data-name="QoL"><a title="QoL Settings"><img src="https://i.imgur.com/L6KRli5.png" alt="QoL Settings">QoL </a><!-- The QoL hub doesn't exist until opened; store custom errors here initially instead --><ul style="display: none;" id="qolConsoleHolder"></ul></li>`,
            massReleaseSelectHTML: `<label id="selectallfish"><input class="qolsetting" id="selectallfishcheckbox" type="checkbox">Select all</label> <label id="movefishselectany"><input class="qolsetting" id="movefishselectanycheckbox" type="checkbox">Select Any</label> <label id="movefishselectsour"><input class="qolsetting" id="movefishselectsourcheckbox" type="checkbox">Select Sour</label> <label id="movefishselectspicy"><input class="qolsetting" id="movefishselectspicycheckbox" type="checkbox">Select Spicy</label> <label id="movefishselectdry"><input class="qolsetting" id="movefishselectdrycheckbox" type="checkbox">Select Dry</label> <label id="movefishselectsweet"><input class="qolsetting" id="movefishselectsweetcheckbox" type="checkbox">Select Sweet</label> <label id="movefishselectbitter"><input class="qolsetting" id="movefishselectbittercheckbox" type="checkbox">Select Bitter</label>`,
            partyModHTML: `<div id="qolpartymod"><label><input type="checkbox" class="qolsetting qolalone" data-key="hideDislike">Hide disliked berries</label> <label><input type="checkbox" class="qolsetting qolalone" data-key="niceTable">Show in table</label> <label><input type="checkbox" class="qolsetting qolalone" data-key="hideAll">Hide all click fast</label></div>`,
            // filled in by fillTemplates
            shelterOptionsHTML: null,
            fieldSortHTML: null,
            fieldSearchHTML: null,
            privateFieldSearchHTML: null,
            qolHubHTML: null,
            evolveFastHTML: null,
            labOptionsHTML: null,
            publicFieldTooltipModHTML: null,
            privateFieldTooltipModHTML: null
        };

        this.SETTINGS_SAVE_KEY = 'QoLSettings';
        this.DAYCARE_PAGE_SETTINGS_KEY = 'QoLDaycare';
        this.DEX_PAGE_SETTINGS_KEY = 'QoLDexPage';
        this.FARM_PAGE_SETTINGS_KEY = 'QoLFarm';
        this.FISHING_PAGE_SETTINGS_KEY = 'QoLFishing';
        this.LAB_PAGE_SETTINGS_KEY = 'QoLLab';
        this.MULTIUSER_PAGE_SETTINGS_KEY = 'QoLMultiuser';
        this.PRIVATE_FIELDS_PAGE_SETTINGS_KEY = 'QoLPrivateFields';
        this.PUBLIC_FIELDS_PAGE_SETTINGS_KEY = 'QoLPublicFields';
        this.SHELTER_PAGE_SETTINGS_KEY = 'QoLShelter';
        this.WISHFORGE_PAGE_SETTINGS_KEY = 'QoLWishforge';
        this.POKEDEX_DATA_KEY = 'QoLPokedex';
        this.POKEDEX_DEX_IDS_KEY = 'QoLDexIDsCache';
        this.POKEDEX_REGIONAL_FORMS_KEY = 'QoLRegionalFormsList';
        this.POKEDEX_EGG_TYPES_MAP_KEY = 'QoLEggTypesMap';
        this.POKEDEX_EVOLVE_BY_LEVEL_KEY = 'QoLEvolveByLevel';
        this.POKEDEX_EVOLUTION_TREE_DEPTH_KEY = 'QoLEvolutionTreeDepth';
        this.INTERACTIONS_PAGE_SETTINGS_KEY = 'QoLInteractions';
        this.SUMMARY_PAGE_SETTINGS_KEY = 'QoLSummary';
        /*
         * Note - the order of TYPE_LIST is important. It looks like PFQ uses an array in this order in its code
         * Don't change the order without looking for where this array is used
         */
        this.TYPE_LIST = ["Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison","Ground","Flying","Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy"];
        this.NATURE_LIST = ["Lonely","Mild","Hasty","Gentle","Bold","Modest","Timid","Calm","Impish","Adamant","Jolly","Careful","Relaxed","Brave","Quiet","Sassy","Lax","Naughty","Rash","Naïve","Hardy","Docile","Serious","Bashful","Quirky"];
        this.EGG_GROUP_LIST = {"0":"Undiscovered","1":"Monster","2":"Dragon","3":"Field","4":"Bug","5":"Grass","6":"Water 1","7":"Water 2","8":"Water 3","9":"Amorphous","10":"Fairy","11":"Human-Like","12":"Mineral","13":"Flying","15":"Ditto"};
        this.SHELTER_TYPE_TABLE = ["0","Normal","<img src='//pfq-static.com/img/types/normal.png/t=1262702646'>","1","Fire","<img src='//pfq-static.com/img/types/fire.png/t=1262702645'>","2","Water","<img src='//pfq-static.com/img/types/water.png/t=1262702646'>","3","Electric","<img src='//pfq-static.com/img/types/electric.png/t=1262702645'>","4","Grass","<img src='//pfq-static.com/img/types/grass.png/t=1262702645'>","5","Ice","<img src='//pfq-static.com/img/types/ice.png/t=1262702646'>","6","fighting","<img src='//pfq-static.com/img/types/fighting.png/t=1262702645'>","7","Poison","<img src='//pfq-static.com/img/types/poison.png/t=1262702646'>","8","Ground","<img src='//pfq-static.com/img/types/ground.png/t=1262702646'>","9","Flying","<img src='//pfq-static.com/img/types/flying.png/t=1262702645'>","10","Psychic","<img src='//pfq-static.com/img/types/psychic.png/t=1262702646'>","11","Bug","<img src='//pfq-static.com/img/types/bug.png/t=1262702645'>","12","Rock","<img src='//pfq-static.com/img/types/rock.png/t=1262702646'>","13","Ghost","<img src='//pfq-static.com/img/types/ghost.png/t=1262702645'>","14","Dragon","<img src='//pfq-static.com/img/types/dragon.png/t=1263605747'>","15","Dark","<img src='//pfq-static.com/img/types/dark.png/t=1262702645'>","16","Steel","<img src='//pfq-static.com/img/types/steel.png/t=1262702646'>","17","Fairy","<img src='//pfq-static.com/img/types/fairy.png/t=1374419124'>"];
        this.SHELTER_SEARCH_DATA = ["findNewEgg","Egg","new egg","<img src='//pfq-static.com/img/pkmn/egg.png/t=1451852195'>","findNewPokemon","Pokémon","new Pokémon","<img src='//pfq-static.com/img/pkmn/pkmn.png/t=1451852507'>","findShiny","SHINY","Shiny","<img src='//pfq-static.com/img/pkmn/shiny.png/t=1400179603'>","findAlbino","ALBINO","Albino","<img src='//pfq-static.com/img/pkmn/albino.png/t=1414662094'>","findMelanistic","MELANISTIC","Melanistic","<img src='//pfq-static.com/img/pkmn/melanistic.png/t=1435353274'>","findPrehistoric","PREHISTORIC","Prehistoric","<img src='//pfq-static.com/img/pkmn/prehistoric.png/t=1465558964'>","findDelta","DELTA","Delta","<img src='//pfq-static.com/img/pkmn/_delta/dark.png/t=1501325214'>","findMega","MEGA","Mega","<img src='//pfq-static.com/img/pkmn/mega.png/t=1400179603'>","findStarter","STARTER","Starter","<img src='//pfq-static.com/img/pkmn/starter.png/t=1484919510'>","findCustomSprite","CUSTOM SPRITE","Custom Sprite","<img src='//pfq-static.com/img/pkmn/cs.png/t=1405806997'>","findMale","[M]","Male","<img src='//pfq-static.com/img/pkmn/gender_m.png/t=1401213006'>","findFemale","[F]","Female","<img src='//pfq-static.com/img/pkmn/gender_f.png/t=1401213007'>","findNoGender","[N]","Genderless","<img src='//pfq-static.com/img/pkmn/gender_n.png/t=1401213004'>","findLegendary","","Legendary","<img src='//pfq-static.com/img/pkmn/pkmn.png/t=1451852507'>"];
        this.SHELTER_SEARCH_LISTS = {"findLegendary":["Articuno","Zapdos","Moltres","Mewtwo","Mew","Raikou","Entei","Suicune","Lugia","Ho-oh","Celebi","Regirock","Regice","Registeel","Latias","Latios","Kyogre","Groudon","Rayquaza","Deoxys","Jirachi","Uxie","Mesprit","Azelf","Dialga","Palkia","Heatran","Regigigas","Giratina","Cresselia","Manaphy","Darkrai","Shaymin","Arceus","Cobalion","Terrakion","Virizion","Tornadus","Thundurus","Reshiram","Zekrom","Landorus","Kyurem","Keldeo","Meloetta","Genesect","Xerneas","Yveltal","Zygarde","Diancie","Hoopa","Volcanion","Type: Null","Silvally","Tapu Koko","Tapu Lele","Tapu Bulu","Tapu Fini","Cosmog","Cosmoem","Solgaleo","Lunala","Necrozma","Zacian","Zamazenta","Eternatus"]};

        // filled in by fillOptionsLists
        this.TYPE_OPTIONS = null;
        this.NATURE_OPTIONS = null;
        this.EGG_GROUP_OPTIONS = null;

        // filled in by LocalStorageManager
        this.DEX_UPDATE_DATE = null;

        /*
         * a static copy of the <script id="dexdata"> tag from Feb 16, 2021
         * this is updated every time the user visits the dex page
         */
        this.DEX_DATA = (`{"columns":["id","name","type1","type2","eggs","eggdex","pkmn","pokedex","shinydex","albidex","melandex"],"types":["normal","fire","water","electric","grass","ice","fighting","poison","ground","flying","psychic","bug","rock","ghost","dragon","dark","steel","fairy"],"regions":{"1":[["001","Bulbasaur",4,7,1,1,1,1,0,0,0],["002","Ivysaur",4,7,0,0,1,1,0,0,0],["003","Venusaur",4,7,0,0,2,2,1,0,0],["004","Charmander",1,-1,1,1,1,1,1,0,0],["005","Charmeleon",1,-1,0,0,1,1,1,0,0],["006","Charizard",1,9,0,0,3,3,3,0,1],["007","Squirtle",2,-1,1,1,1,1,1,1,0],["008","Wartortle",2,-1,0,0,1,1,1,1,0],["009","Blastoise",2,-1,0,0,2,2,2,1,0],["010","Caterpie",11,-1,1,1,1,1,1,0,0],["011","Metapod",11,-1,0,0,1,1,1,0,0],["012","Butterfree",11,9,0,0,1,1,1,0,0],["013","Weedle",11,7,1,1,1,1,1,0,0],["014","Kakuna",11,7,0,0,1,1,1,0,0],["015","Beedrill",11,7,0,0,2,2,1,1,0],["016","Pidgey",0,9,1,1,1,1,0,0,0],["017","Pidgeotto",0,9,0,0,1,1,0,0,0],["018","Pidgeot",0,9,0,0,2,2,0,0,0],["019","Rattata",0,-1,2,2,2,2,1,0,0],["020","Raticate",0,-1,0,0,3,3,2,0,0],["021","Spearow",0,9,1,1,1,1,0,0,0],["022","Fearow",0,9,0,0,1,1,0,0,0],["023","Ekans",7,-1,1,1,1,1,1,0,0],["024","Arbok",7,-1,0,0,1,1,1,0,0],["025","Pichu",3,-1,1,1,1,1,1,1,0],["026","Pikachu",3,-1,0,0,1,1,1,0,0],["027","Raichu",3,-1,0,0,2,2,2,0,0],["028","Sandshrew",8,-1,2,2,2,2,0,1,0],["029","Sandslash",8,-1,0,0,2,2,0,0,0],["030","Nidoran",7,-1,1,1,1,1,1,1,0],["031","Nidorina",7,-1,0,0,1,1,1,0,0],["032","Nidoqueen",7,8,0,0,1,1,1,0,0],["033","Nidorino",7,-1,0,0,1,1,1,0,0],["034","Nidoking",7,8,0,0,1,1,1,0,0],["035","Cleffa",17,-1,1,1,1,1,1,0,0],["036","Clefairy",17,-1,0,0,1,1,0,0,0],["037","Clefable",17,-1,0,0,1,1,0,0,0],["038","Vulpix",1,-1,2,2,2,2,2,2,2],["039","Ninetales",1,-1,0,0,2,2,2,2,0],["040","Igglybuff",0,17,1,1,1,1,1,0,0],["041","Jigglypuff",0,17,0,0,1,1,1,0,0],["042","Wigglytuff",0,17,0,0,1,1,1,0,0],["043","Zubat",7,9,1,1,1,1,0,0,0],["044","Golbat",7,9,0,0,1,1,0,0,0],["045","Crobat",7,9,0,0,1,1,0,0,0],["046","Oddish",4,7,1,1,1,1,1,0,0],["047","Gloom",4,7,0,0,1,1,1,0,0],["048","Vileplume",4,7,0,0,1,1,1,0,0],["049","Bellossom",4,-1,0,0,1,1,0,0,0],["050","Paras",11,4,1,1,1,1,0,0,0],["051","Parasect",11,4,0,0,1,1,0,0,0],["052","Venonat",11,7,1,1,1,1,1,0,0],["053","Venomoth",11,7,0,0,1,1,1,0,0],["054","Diglett",8,-1,2,2,2,2,0,0,0],["055","Dugtrio",8,-1,0,0,2,2,0,0,0],["056","Meowth",0,-1,3,3,3,3,0,1,0],["057","Persian",0,-1,0,0,2,2,0,0,0],["058","Psyduck",2,-1,1,1,1,1,0,0,0],["059","Golduck",2,-1,0,0,1,1,0,0,0],["060","Mankey",6,-1,1,1,1,1,0,0,0],["061","Primeape",6,-1,0,0,1,1,0,0,0],["062","Growlithe",1,-1,1,1,1,1,1,1,1],["063","Arcanine",1,-1,0,0,1,1,1,0,0],["064","Poliwag",2,-1,1,1,1,1,0,0,0],["065","Poliwhirl",2,-1,0,0,1,1,0,0,0],["066","Poliwrath",2,6,0,0,1,1,0,0,0],["067","Politoed",2,-1,0,0,1,1,0,0,0],["068","Abra",10,-1,1,1,1,1,1,0,0],["069","Kadabra",10,-1,0,0,1,1,0,1,0],["070","Alakazam",10,-1,0,0,2,2,0,0,0],["071","Machop",6,-1,1,1,1,1,0,0,0],["072","Machoke",6,-1,0,0,1,1,0,0,0],["073","Machamp",6,-1,0,0,1,1,0,0,0],["074","Bellsprout",4,7,1,1,1,1,0,0,0],["075","Weepinbell",4,7,0,0,1,1,0,0,0],["076","Victreebell",4,7,0,0,1,1,0,0,0],["077","Tentacool",2,7,1,1,1,1,1,0,0],["078","Tentacruel",2,7,0,0,1,1,1,0,0],["079","Geodude",12,8,2,2,2,2,1,0,0],["080","Graveler",12,8,0,0,2,2,0,0,0],["081","Golem",12,8,0,0,2,2,0,0,0],["082","Ponyta",1,-1,2,2,2,2,1,2,0],["083","Rapidash",1,-1,0,0,2,2,0,1,0],["084","Slowpoke",2,10,2,2,2,2,0,0,0],["085","Slowbro",2,10,0,0,3,3,1,0,0],["086","Slowking",2,10,0,0,2,2,1,0,0],["087","Magnemite",3,16,1,1,1,1,1,0,0],["088","Magneton",3,16,0,0,1,1,0,0,0],["089","Magnezone",3,16,0,0,1,1,0,0,0],["090","Farfetch'd",0,9,2,2,2,2,0,0,0],["091","Doduo",0,9,1,1,1,1,1,0,0],["092","Dodrio",0,9,0,0,1,1,0,0,0],["093","Seel",2,-1,1,1,1,1,0,0,0],["094","Dewgong",2,5,0,0,1,1,0,0,0],["095","Grimer",7,-1,2,2,2,2,0,0,0],["096","Muk",7,-1,0,0,2,2,0,0,0],["097","Shellder",2,-1,1,1,1,1,0,0,0],["098","Cloyster",2,5,0,0,1,1,0,0,0],["099","Gastly",13,7,1,1,1,1,1,1,0],["100","Haunter",13,7,0,0,1,1,1,0,0],["101","Gengar",13,7,0,0,2,2,2,0,0],["102","Onix",12,8,1,1,1,1,0,0,0],["103","Steelix",16,8,0,0,2,2,1,0,0],["104","Drowzee",10,-1,1,1,1,1,0,0,0],["105","Hypno",10,-1,0,0,1,1,0,0,0],["106","Krabby",2,-1,1,1,1,1,0,0,0],["107","Kingler",2,-1,0,0,1,1,0,0,0],["108","Voltorb",3,-1,1,1,1,1,0,0,0],["109","Electrode",3,-1,0,0,1,1,0,0,0],["110","Exeggcute",4,10,1,1,1,1,0,0,0],["111","Exeggutor",4,10,0,0,2,2,0,0,0],["112","Cubone",8,-1,1,1,1,1,1,0,0],["113","Marowak",8,-1,0,0,3,3,2,0,0],["114","Lickitung",0,-1,1,1,1,1,0,0,0],["115","Lickilicky",0,-1,0,0,1,1,0,0,0],["116","Koffing",7,-1,1,1,1,1,0,0,0],["117","Weezing",7,-1,0,0,2,2,0,0,0],["118","Rhyhorn",8,12,1,1,1,1,0,0,0],["119","Rhydon",8,12,0,0,1,1,0,0,0],["120","Rhyperior",8,12,0,0,1,1,0,0,0],["121","Tangela",4,-1,1,1,1,1,0,0,0],["122","Tangrowth",4,-1,0,0,1,1,1,0,0],["123","Kangaskhan",0,-1,1,1,2,2,0,0,0],["124","Horsea",2,-1,1,1,1,1,0,1,0],["125","Seadra",2,-1,0,0,1,1,0,0,0],["126","Kingdra",2,14,0,0,1,1,0,0,0],["127","Goldeen",2,-1,1,1,1,1,1,0,0],["128","Seaking",2,-1,0,0,1,1,1,0,0],["129","Staryu",2,-1,1,1,1,1,0,0,0],["130","Starmie",2,10,0,0,1,1,0,0,0],["131","Mime Jr.",10,17,1,1,1,1,0,0,0],["132","Mr. Mime",10,17,2,2,2,2,0,0,0],["133","Scyther",11,9,1,1,1,1,1,0,0],["134","Scizor",11,16,0,0,2,2,0,0,0],["135","Smoochum",5,10,1,1,1,1,0,0,0],["136","Jynx",5,10,0,0,1,1,0,0,0],["137","Pinsir",11,-1,1,1,2,2,0,0,0],["138","Tauros",0,-1,1,1,1,1,0,0,0],["139","Magikarp",2,-1,1,1,1,1,1,0,0],["140","Gyarados",2,9,0,0,2,2,1,0,0],["141","Lapras",2,5,1,1,1,1,0,1,0],["142","Ditto",0,-1,1,1,1,1,0,0,0],["143","Eevee",0,-1,1,1,1,1,1,1,0],["144","Vaporeon",2,-1,0,0,1,1,1,0,0],["145","Jolteon",3,-1,0,0,1,1,1,0,0],["146","Flareon",1,-1,0,0,1,1,1,1,0],["147","Espeon",10,-1,0,0,1,1,1,0,0],["148","Umbreon",15,-1,0,0,1,1,1,0,0],["149","Leafeon",4,-1,0,0,1,1,1,1,0],["150","Glaceon",5,-1,0,0,1,1,1,1,0],["151","Sylveon",17,-1,0,0,1,1,1,0,0],["152","Omanyte",12,2,1,1,1,1,1,0,0],["153","Omastar",12,2,0,0,1,1,0,0,0],["154","Kabuto",12,2,1,1,1,1,0,0,0],["155","Kabutops",12,2,0,0,1,1,0,0,0],["156","Aerodactyl",12,9,1,1,2,2,2,1,0],["157","Munchlax",0,-1,1,1,1,1,0,0,0],["158","Snorlax",0,-1,1,1,1,1,0,0,0],["159","Articuno",5,9,2,2,2,2,0,0,0],["160","Zapdos",3,9,2,2,2,2,0,0,0],["161","Moltres",1,9,2,2,2,2,0,0,0],["162","Dratini",14,-1,1,1,1,1,1,1,1],["163","Dragonair",14,-1,0,0,1,1,1,1,0],["164","Dragonite",14,9,0,0,1,1,1,0,0],["165","Mewtwo",10,-1,1,1,3,3,0,0,0],["166","Mew",10,-1,1,1,1,1,0,0,0]],"2":[["167","Chikorita",4,-1,1,1,1,1,0,0,0],["168","Bayleef",4,-1,0,0,1,1,0,0,0],["169","Meganium",4,-1,0,0,1,1,1,0,0],["170","Cyndaquil",1,-1,1,1,1,1,1,0,0],["171","Quilava",1,-1,0,0,1,1,1,0,0],["172","Typhlosion",1,-1,0,0,2,2,1,0,0],["173","Totodile",2,-1,1,1,1,1,0,0,0],["174","Croconaw",2,-1,0,0,1,1,0,0,0],["175","Feraligator",2,-1,0,0,1,1,0,0,0],["176","Sentret",0,-1,1,1,1,1,1,0,0],["177","Furret",0,-1,0,0,1,1,1,0,0],["178","Hoothoot",0,9,1,1,1,1,0,0,0],["179","Noctowl",0,9,0,0,1,1,0,0,0],["180","Ledyba",11,9,1,1,1,1,0,0,0],["181","Ledian",11,9,0,0,1,1,0,0,0],["182","Spinarak",11,7,1,1,1,1,0,0,0],["183","Ariados",11,7,0,0,1,1,0,0,0],["184","Chinchou",2,3,1,1,1,1,0,0,0],["185","Lanturn",2,3,0,0,1,1,0,0,0],["186","Togepi",17,-1,1,1,1,1,1,0,0],["187","Togetic",17,9,0,0,1,1,1,0,0],["188","Togekiss",17,9,0,0,1,1,1,0,0],["189","Natu",10,9,1,1,1,1,0,0,0],["190","Xatu",10,9,0,0,1,1,0,0,0],["191","Mareep",3,-1,1,1,1,1,1,1,0],["192","Flaaffy",3,-1,0,0,1,1,0,0,0],["193","Ampharos",3,-1,0,0,2,2,1,0,0],["194","Azurill",0,17,1,1,1,1,1,0,0],["195","Marill",2,17,1,1,1,1,1,0,0],["196","Azumarill",2,17,0,0,1,1,1,0,0],["197","Bonsly",12,-1,1,1,1,1,0,0,0],["198","Sudowoodo",12,-1,1,1,1,1,0,0,0],["199","Hoppip",4,9,1,1,1,1,1,0,0],["200","Skiploom",4,9,0,0,1,1,0,0,0],["201","Jumpluff",4,9,0,0,1,1,0,0,0],["202","Aipom",0,-1,1,1,1,1,0,0,0],["203","Ambipom",0,-1,0,0,1,1,0,0,0],["204","Sunkern",4,-1,1,1,1,1,0,1,0],["205","Sunflora",4,-1,0,0,1,1,0,0,0],["206","Yanma",11,9,1,1,1,1,0,0,0],["207","Yanmega",11,9,0,0,1,1,0,0,0],["208","Wooper",2,8,1,1,1,1,0,0,0],["209","Quagsire",2,8,0,0,1,1,0,0,0],["210","Murkrow",15,9,1,1,1,1,0,0,0],["211","Honchkrow",15,9,0,0,1,1,0,0,0],["212","Misdreavus",13,-1,1,1,1,1,0,0,0],["213","Mismagius",13,-1,0,0,1,1,0,0,0],["214a","Unown",10,-1,28,28,28,28,0,0,0],["215","Girafarig",0,10,1,1,1,1,0,0,0],["216","Pineco",11,-1,1,1,1,1,0,0,0],["217","Forretress",11,16,0,0,1,1,0,0,0],["218","Dunsparce",0,-1,1,1,1,1,0,0,0],["219","Gligar",8,9,1,1,1,1,1,0,0],["220","Gliscor",8,9,0,0,1,1,1,0,0],["221","Snubbull",17,-1,1,1,1,1,0,0,0],["222","Granbull",17,-1,0,0,1,1,0,0,0],["223","Qwilfish",2,7,2,2,2,2,0,0,0],["224","Shuckle",11,12,1,1,1,1,0,0,0],["225","Heracross",11,6,1,1,2,2,0,0,0],["226","Sneasel",15,5,1,1,1,1,0,0,0],["227","Weavile",15,5,0,0,1,1,1,0,0],["228","Teddiursa",0,-1,1,1,1,1,0,0,0],["229","Ursaring",0,-1,0,0,1,1,0,0,0],["230","Slugma",1,-1,1,1,1,1,0,0,0],["231","Magcargo",1,12,0,0,1,1,0,0,0],["232","Swinub",5,8,1,1,1,1,1,0,0],["233","Piloswine",5,8,0,0,1,1,1,0,0],["234","Mamoswine",5,8,0,0,1,1,1,0,0],["235","Corsola",2,12,2,2,2,2,1,0,0],["236","Remoraid",2,-1,1,1,1,1,0,0,0],["237","Octillery",2,-1,0,0,1,1,0,0,0],["238","Delibird",5,9,1,1,1,1,0,0,0],["239","Skarmory",16,9,1,1,1,1,1,1,0],["240","Houndour",15,1,1,1,1,1,1,1,1],["241","Houndoom",15,1,0,0,2,2,1,0,1],["242","Phanpy",8,-1,1,1,1,1,0,0,0],["243","Donphan",8,-1,0,0,1,1,0,0,0],["244","Stantler",0,-1,1,1,1,1,0,0,0],["245","Smeargle",0,-1,1,1,1,1,0,0,0],["246","Tyrogue",6,-1,1,1,1,1,0,0,0],["247","Hitmonlee",6,-1,0,0,1,1,0,0,0],["248","Hitmonchan",6,-1,0,0,1,1,0,0,0],["249","Hitmontop",6,-1,0,0,1,1,0,0,0],["250","Elekid",3,-1,1,1,1,1,0,0,0],["251","Electabuzz",3,-1,0,0,1,1,0,0,0],["252","Electivire",3,-1,0,0,1,1,1,0,0],["253","Magby",1,-1,1,1,1,1,0,0,0],["254","Magmar",1,-1,0,0,1,1,1,0,0],["255","Magmortar",1,-1,0,0,1,1,0,0,0],["256","Miltank",0,-1,1,1,1,1,1,0,0],["257","Raikou",3,-1,1,1,1,1,1,0,0],["258","Entei",1,-1,1,1,1,1,0,0,0],["259","Suicune",2,-1,1,1,1,1,0,0,0],["260","Larvitar",12,8,1,1,1,1,1,1,0],["261","Pupitar",12,8,0,0,1,1,0,0,0],["262","Tyranitar",12,15,0,0,2,2,1,0,0],["263","Lugia",10,9,1,1,1,1,0,0,0],["264","Ho-oh",1,9,1,1,1,1,0,0,0],["265","Celebi",10,4,1,1,1,1,0,0,0]],"3":[["266","Treecko",4,-1,1,1,1,1,0,0,0],["267","Grovyle",4,-1,0,0,1,1,0,0,0],["268","Sceptile",4,-1,0,0,2,2,1,0,0],["269","Torchic",1,-1,1,1,1,1,0,0,0],["270","Combusken",1,6,0,0,1,1,0,0,0],["271","Blaziken",1,6,0,0,2,2,1,0,0],["272","Mudkip",2,-1,1,1,1,1,0,0,0],["273","Marshtomp",2,8,0,0,1,1,0,0,0],["274","Swampert",2,8,0,0,2,2,0,0,0],["275","Poochyena",15,-1,1,1,1,1,0,0,0],["276","Mightyena",15,-1,0,0,1,1,1,0,0],["277","Zigzagoon",0,-1,2,2,2,2,0,0,0],["278","Linoone",0,-1,0,0,2,2,0,0,0],["279","Wurmple",11,-1,1,1,1,1,1,1,0],["280","Silcoon",11,-1,0,0,1,1,0,1,0],["281","Beautifly",11,9,0,0,1,1,1,1,0],["282","Cascoon",11,-1,0,0,1,1,0,0,0],["283","Dustox",11,7,0,0,1,1,0,0,0],["284","Lotad",2,4,1,1,1,1,1,0,0],["285","Lombre",2,4,0,0,1,1,1,0,0],["286","Ludicolo",2,4,0,0,1,1,1,0,0],["287","Seedot",4,-1,1,1,1,1,0,0,0],["288","Nuzleaf",4,15,0,0,1,1,0,0,0],["289","Shiftry",4,15,0,0,1,1,0,0,0],["290","Taillow",0,9,1,1,1,1,0,0,0],["291","Swellow",0,9,0,0,1,1,0,0,0],["292","Wingull",2,9,1,1,1,1,0,0,0],["293","Pelipper",2,9,0,0,1,1,1,0,0],["294","Ralts",10,17,1,1,1,1,1,1,0],["295","Kirlia",10,17,0,0,1,1,1,0,0],["296","Gardevoir",10,17,0,0,2,2,1,0,0],["297","Gallade",10,6,0,0,2,2,2,0,0],["298","Surskit",11,2,1,1,1,1,0,0,0],["299","Masquerain",11,9,0,0,1,1,0,0,0],["300","Shroomish",4,-1,1,1,1,1,1,1,0],["301","Breloom",4,6,0,0,1,1,1,1,0],["302","Slakoth",0,-1,1,1,1,1,0,0,0],["303","Vigoroth",0,-1,0,0,1,1,0,0,0],["304","Slaking",0,-1,0,0,1,1,0,0,0],["305","Nincada",11,8,1,1,1,1,0,0,0],["306","Ninjask",11,9,0,0,1,1,0,0,0],["307","Shedinja",11,13,0,0,1,1,0,0,0],["308","Whismur",0,-1,1,1,1,1,0,0,0],["309","Loudred",0,-1,0,0,1,1,0,0,0],["310","Exploud",0,-1,0,0,1,1,0,0,0],["311","Makuhita",6,-1,1,1,1,1,0,0,0],["312","Hariyama",6,-1,0,0,1,1,0,0,0],["313","Nosepass",12,-1,1,1,1,1,1,0,0],["314","Probopass",12,16,0,0,1,1,0,0,0],["315","Skitty",0,-1,1,1,1,1,1,1,0],["316","Delcatty",0,-1,0,0,1,1,1,0,0],["317","Sableye",15,13,1,1,2,2,1,0,0],["318","Mawile",16,17,1,1,2,2,2,1,0],["319","Aron",16,12,1,1,1,1,1,1,0],["320","Lairon",16,12,0,0,1,1,0,0,0],["321","Aggron",16,12,0,0,2,2,0,0,0],["322","Meditite",6,10,1,1,1,1,1,0,0],["323","Medicham",6,10,0,0,2,2,1,0,0],["324","Electrike",3,-1,1,1,1,1,1,1,0],["325","Manectric",3,-1,0,0,2,2,1,0,0],["326","Plusle",3,-1,1,1,1,1,1,0,0],["327","Minun",3,-1,1,1,1,1,1,0,0],["328","Volbeat",11,-1,1,1,1,1,0,0,0],["329","Illumise",11,-1,1,1,1,1,0,0,0],["330","Gulpin",7,-1,1,1,1,1,1,0,0],["331","Swalot",7,-1,0,0,1,1,1,0,0],["332","Carvanha",2,15,1,1,1,1,1,0,0],["333","Sharpedo",2,15,0,0,2,2,0,0,0],["334","Wailmer",2,-1,1,1,1,1,0,0,0],["335","Wailord",2,-1,0,0,1,1,0,0,0],["336","Numel",1,8,1,1,1,1,0,0,0],["337","Camerupt",1,8,0,0,2,2,0,0,0],["338","Torkoal",1,-1,1,1,1,1,0,0,0],["339","Spoink",10,-1,1,1,1,1,1,0,0],["340","Grumpig",10,-1,0,0,1,1,1,0,0],["341","Spinda",0,-1,1,1,1,1,0,0,0],["342","Trapinch",8,-1,1,1,1,1,1,1,0],["343","Vibrava",8,14,0,0,1,1,0,0,0],["344","Flygon",8,14,0,0,1,1,1,0,0],["345","Cacnea",4,-1,1,1,1,1,0,0,0],["346","Cacturne",4,15,0,0,1,1,0,0,0],["347","Swablu",0,9,1,1,1,1,0,0,0],["348","Altaria",14,9,0,0,2,2,1,0,0],["349","Zangoose",0,-1,1,1,1,1,0,0,0],["350","Seviper",7,-1,1,1,1,1,1,0,0],["351","Lunatone",12,10,1,1,1,1,0,0,0],["352","Solrock",12,10,1,1,1,1,0,0,0],["353","Barboach",2,8,1,1,1,1,0,0,0],["354","Whiscash",2,8,0,0,1,1,0,0,0],["355","Corphish",2,-1,1,1,1,1,0,0,0],["356","Crawdaunt",2,15,0,0,1,1,0,0,0],["357","Baltoy",8,10,1,1,1,1,0,0,0],["358","Claydol",8,10,0,0,1,1,0,0,0],["359","Lileep",12,4,1,1,1,1,1,1,0],["360","Cradily",12,4,0,0,1,1,0,0,0],["361","Anorith",12,11,1,1,1,1,0,0,0],["362","Armaldo",12,11,0,0,1,1,0,0,0],["363","Feebas",2,-1,1,1,1,1,0,0,0],["364","Milotic",2,-1,0,0,1,1,0,0,0],["365","Castform",0,-1,1,1,4,4,4,0,0],["366","Kecleon",0,-1,1,1,1,1,0,0,0],["367","Shuppet",13,-1,1,1,1,1,0,0,0],["368","Banette",13,-1,0,0,2,2,1,0,0],["369","Duskull",13,-1,1,1,1,1,1,0,0],["370","Dusclops",13,-1,0,0,1,1,0,0,0],["371","Dusknoir",13,-1,0,0,1,1,0,0,0],["372","Tropius",4,9,1,1,1,1,1,0,0],["373","Chingling",10,-1,1,1,1,1,0,0,0],["374","Chimecho",10,-1,1,1,1,1,0,0,0],["375","Absol",15,-1,1,1,2,2,1,1,0],["376","Wynaut",10,-1,1,1,1,1,0,0,0],["377","Wobbuffet",10,-1,1,1,1,1,0,0,0],["378","Snorunt",5,-1,1,1,1,1,1,0,0],["379","Glalie",5,-1,0,0,2,2,1,0,0],["380","Froslass",5,13,0,0,1,1,0,0,0],["381","Spheal",5,2,1,1,1,1,0,1,0],["382","Sealeo",5,2,0,0,1,1,0,0,0],["383","Walrein",5,2,0,0,1,1,0,0,0],["384","Clamperl",2,-1,1,1,1,1,0,0,0],["385","Huntail",2,-1,0,0,1,1,0,0,0],["386","Gorebyss",2,-1,0,0,1,1,0,0,0],["387","Relicanth",2,12,1,1,1,1,0,0,0],["388","Luvdisc",2,-1,1,1,1,1,0,0,0],["389","Bagon",14,-1,1,1,1,1,1,0,0],["390","Shelgon",14,-1,0,0,1,1,1,0,0],["391","Salamence",14,9,0,0,2,2,0,0,0],["392","Beldum",16,10,1,1,1,1,0,0,0],["393","Metang",16,10,0,0,1,1,0,0,0],["394","Metagross",16,10,0,0,2,2,0,0,0],["395","Regirock",12,-1,1,1,1,1,0,0,0],["396","Regice",5,-1,1,1,1,1,0,0,0],["397","Registeel",16,-1,1,1,1,1,0,0,0],["398","Latias",14,10,1,1,2,2,0,0,0],["399","Latios",14,10,1,1,2,2,0,0,0],["400","Kyogre",2,-1,1,1,2,2,0,0,0],["401","Groudon",8,-1,1,1,2,2,0,0,0],["402","Rayquaza",14,9,1,1,2,2,0,0,0],["403","Jirachi",16,10,1,1,1,1,0,0,0],["404","Deoxys",10,-1,1,1,4,4,0,0,0]],"4":[["405","Turtwig",4,-1,1,1,1,1,0,0,0],["406","Grotle",4,-1,0,0,1,1,0,0,0],["407","Torterra",4,8,0,0,1,1,0,0,0],["408","Chimchar",1,-1,1,1,1,1,0,0,0],["409","Monferno",1,6,0,0,1,1,0,0,0],["410","Infernape",1,6,0,0,1,1,0,0,0],["411","Piplup",2,-1,1,1,1,1,0,0,0],["412","Prinplup",2,-1,0,0,1,1,0,0,0],["413","Empoleon",2,16,0,0,1,1,0,0,0],["414","Starly",0,9,1,1,1,1,1,0,0],["415","Staravia",0,9,0,0,1,1,1,0,0],["416","Staraptor",0,9,0,0,1,1,1,0,0],["417","Bidoof",0,-1,1,1,1,1,1,0,0],["418","Bibarel",0,2,0,0,1,1,0,0,0],["419","Kricketot",11,-1,1,1,1,1,0,0,0],["420","Kricketune",11,-1,0,0,1,1,0,0,0],["421","Shinx",3,-1,1,1,1,1,1,1,0],["422","Luxio",3,-1,0,0,1,1,0,0,0],["423","Luxray",3,-1,0,0,1,1,0,0,0],["424","Budew",4,7,1,1,1,1,1,0,0],["425","Roselia",4,7,1,1,1,1,0,0,0],["426","Roserade",4,7,0,0,1,1,0,0,0],["427","Cranidos",12,-1,1,1,1,1,0,0,0],["428","Rampardos",12,-1,0,0,1,1,0,0,0],["429","Shieldon",12,16,1,1,1,1,1,0,0],["430","Bastiodon",12,16,0,0,1,1,0,0,0],["431","Burmy",11,-1,1,1,3,3,0,0,0],["432","Wormadam",11,4,0,0,3,3,3,0,0],["433","Mothim",11,9,0,0,1,1,0,0,0],["434","Combee",11,9,1,1,1,1,1,0,0],["435","Vespiquen",11,9,0,0,1,1,0,0,0],["436","Pachirisu",3,-1,1,1,1,1,1,1,0],["437","Buizel",2,-1,1,1,1,1,1,0,0],["438","Floatzel",2,-1,0,0,1,1,0,0,0],["439","Cherubi",4,-1,1,1,1,1,1,0,0],["440s","Cherrim",4,-1,0,0,2,2,2,0,0],["441","Shellos",2,-1,1,1,2,2,0,1,0],["442","Gastrodon",2,8,0,0,2,2,0,0,0],["443","Drifloon",13,9,1,1,1,1,0,0,0],["444","Drifblim",13,9,0,0,1,1,1,0,0],["445","Buneary",0,-1,1,1,1,1,0,0,0],["446","Lopunny",0,-1,0,0,2,2,2,0,0],["447","Glameow",0,-1,1,1,1,1,0,0,0],["448","Purugly",0,-1,0,0,1,1,0,0,0],["449","Stunky",7,15,1,1,1,1,1,1,0],["450","Skuntank",7,15,0,0,1,1,1,0,0],["451","Bronzor",16,10,1,1,1,1,0,0,0],["452","Bronzong",16,10,0,0,1,1,0,0,0],["453","Happiny",0,-1,1,1,1,1,0,0,0],["454","Chansey",0,-1,1,1,1,1,0,0,0],["455","Blissey",0,-1,0,0,1,1,0,0,0],["456","Chatot",0,9,1,1,1,1,0,0,0],["457","Spiritomb",13,15,1,1,1,1,1,1,0],["458","Gible",14,8,1,1,1,1,0,0,0],["459","Gabite",14,8,0,0,1,1,1,0,0],["460","Garchomp",14,8,0,0,2,2,0,0,0],["461","Riolu",6,-1,1,1,1,1,1,1,0],["462","Lucario",6,16,0,0,2,2,1,1,0],["463","Hippopotas",8,-1,1,1,1,1,0,0,0],["464","Hippowdon",8,-1,0,0,1,1,0,0,0],["465","Skorupi",7,11,1,1,1,1,1,0,0],["466","Drapion",7,15,0,0,1,1,1,1,0],["467","Croagunk",7,6,1,1,1,1,0,0,0],["468","Toxicroak",7,6,0,0,1,1,0,0,0],["469","Carnivine",4,-1,1,1,1,1,0,0,0],["470","Finneon",2,-1,1,1,1,1,0,0,0],["471","Lumineon",2,-1,0,0,1,1,0,0,0],["472","Mantyke",2,9,1,1,1,1,0,1,0],["473","Mantine",2,9,1,1,1,1,0,1,0],["474","Snover",5,4,1,1,1,1,0,0,0],["475","Abomasnow",5,4,0,0,2,2,0,0,0],["476","Porygon",0,-1,1,1,1,1,0,1,0],["477","Porygon2",0,-1,0,0,1,1,1,1,1],["478","Porygon-Z",0,-1,0,0,1,1,1,1,0],["479","Rotom",3,13,1,1,6,6,6,0,0],["480","Uxie",10,-1,1,1,1,1,0,0,0],["481","Mesprit",10,-1,1,1,1,1,0,0,0],["482","Azelf",10,-1,1,1,1,1,0,0,0],["483","Dialga",16,14,1,1,1,1,0,0,0],["484","Palkia",2,14,1,1,1,1,0,0,0],["485","Heatran",1,16,1,1,1,1,0,0,0],["486","Regigigas",0,-1,1,1,1,1,0,0,0],["487","Giratina",13,14,1,1,2,2,0,0,0],["488","Cresselia",10,-1,1,1,1,1,0,0,0],["489","Phione",2,-1,1,1,1,1,0,0,0],["490","Manaphy",2,-1,1,1,1,1,0,0,0],["491","Darkrai",15,-1,1,1,1,1,0,0,0],["492","Shaymin",4,-1,1,1,2,2,0,0,0],["493","Arceus",0,-1,1,1,18,18,18,0,0],["898","Wyrdeer",0,10,0,0,1,1,0,0,0],["899","Kleavor",11,12,0,0,1,1,0,1,0],["903","Overqwil",15,7,0,0,1,1,0,1,0]],"5":[["494","Victini",10,1,1,1,1,1,0,0,0],["495","Snivy",4,-1,1,1,1,1,0,0,0],["496","Servine",4,-1,0,0,1,1,0,0,0],["497","Serperior",4,-1,0,0,1,1,1,0,0],["498","Tepig",1,-1,1,1,1,1,0,0,0],["499","Pignite",1,6,0,0,1,1,0,0,0],["500","Emboar",1,6,0,0,1,1,0,0,0],["501","Oshawott",2,-1,1,1,1,1,0,0,0],["502","Dewott",2,-1,0,0,1,1,0,0,0],["503","Samurott",2,-1,0,0,2,2,1,0,0],["504","Patrat",0,-1,1,1,1,1,0,0,0],["505","Watchog",0,-1,0,0,1,1,0,0,0],["506","Lillipup",0,-1,1,1,1,1,0,0,0],["507","Herdier",0,-1,0,0,1,1,0,0,0],["508","Stoutland",0,-1,0,0,1,1,0,0,0],["509","Purrloin",15,-1,1,1,1,1,0,0,0],["510","Liepard",15,-1,0,0,1,1,1,0,0],["511","Pansage",4,-1,1,1,1,1,0,0,0],["512","Simisage",4,-1,0,0,1,1,0,0,0],["513","Pansear",1,-1,1,1,1,1,0,0,0],["514","Simisear",1,-1,0,0,1,1,0,0,0],["515","Panpour",2,-1,1,1,1,1,0,0,0],["516","Simipour",2,-1,0,0,1,1,0,0,0],["517","Munna",10,-1,1,1,1,1,1,0,0],["518","Musharna",10,-1,0,0,1,1,0,0,0],["519","Pidove",0,9,1,1,1,1,0,0,0],["520","Tranquill",0,9,0,0,1,1,0,0,0],["521","Unfezant",0,9,0,0,1,1,1,0,0],["522","Blitzle",3,-1,1,1,1,1,0,0,0],["523","Zebstrika",3,-1,0,0,1,1,0,0,0],["524","Roggenrola",12,-1,1,1,1,1,1,1,0],["525","Boldore",12,-1,0,0,1,1,0,0,0],["526","Gigalith",12,-1,0,0,1,1,0,0,0],["527","Woobat",10,9,1,1,1,1,0,1,0],["528","Swoobat",10,9,0,0,1,1,0,0,0],["529","Drilbur",8,-1,1,1,1,1,0,0,0],["530","Excadrill",8,16,0,0,1,1,0,0,0],["531","Audino",0,-1,1,1,2,2,0,0,0],["532","Timburr",6,-1,1,1,1,1,0,0,0],["533","Gurdurr",6,-1,0,0,1,1,0,0,0],["534","Conkeldurr",6,-1,0,0,1,1,0,0,0],["535","Tympole",2,-1,1,1,1,1,0,0,0],["536","Palpitoad",2,8,0,0,1,1,0,0,0],["537","Seismitoad",2,8,0,0,1,1,0,0,0],["538","Throh",6,-1,1,1,1,1,0,0,0],["539","Sawk",6,-1,1,1,1,1,0,0,0],["540","Sewaddle",11,4,1,1,1,1,0,0,0],["541","Swadloon",11,4,0,0,1,1,0,0,0],["542","Leavanny",11,4,0,0,1,1,0,0,0],["543","Venipede",11,7,1,1,1,1,1,1,0],["544","Whirlipede",11,7,0,0,1,1,0,1,0],["545","Scolipede",11,7,0,0,1,1,1,1,0],["546","Cottonee",4,17,1,1,1,1,0,0,0],["547","Whimsicott",4,17,0,0,1,1,0,0,0],["548","Petilil",4,-1,1,1,1,1,0,0,0],["549","Lilligant",4,-1,0,0,1,1,1,0,0],["550","Basculin",2,-1,1,1,2,2,0,0,0],["551","Sandile",8,15,1,1,1,1,0,0,0],["552","Krokorok",8,15,0,0,1,1,0,0,0],["553","Krookodile",8,15,0,0,1,1,1,0,0],["554","Darumaka",1,-1,2,2,2,2,1,0,0],["555","Darmanitan",1,-1,0,0,4,4,2,0,0],["556","Maractus",4,-1,1,1,1,1,0,0,0],["557","Dwebble",11,12,1,1,1,1,0,0,0],["558","Crustle",11,12,0,0,1,1,0,0,0],["559","Scraggy",15,6,1,1,1,1,1,0,0],["560","Scrafty",15,6,0,0,1,1,1,0,0],["561","Sigilyph",10,9,1,1,1,1,1,0,0],["562","Yamask",13,-1,2,2,2,2,0,0,0],["563","Cofagrigus",13,-1,0,0,1,1,0,0,0],["564","Tirtouga",2,12,1,1,1,1,0,0,0],["565","Carracosta",2,12,0,0,1,1,0,0,0],["566","Archen",12,9,1,1,1,1,0,0,0],["567","Archeops",12,9,0,0,1,1,1,0,0],["568","Trubbish",7,-1,1,1,1,1,0,0,0],["569","Garbodor",7,-1,0,0,1,1,0,0,0],["570","Zorua",15,-1,1,1,1,1,0,1,0],["571","Zoroark",15,-1,0,0,1,1,1,0,0],["572","Minccino",0,-1,1,1,1,1,0,0,0],["573","Cinccino",0,-1,0,0,1,1,0,0,0],["574","Gothita",10,-1,1,1,1,1,0,0,0],["575","Gothorita",10,-1,0,0,1,1,0,0,0],["576","Gothitelle",10,-1,0,0,1,1,0,0,0],["577","Solosis",10,-1,1,1,1,1,1,0,0],["578","Duosion",10,-1,0,0,1,1,0,0,0],["579","Reuniclus",10,-1,0,0,1,1,0,0,0],["580","Ducklett",2,9,1,1,1,1,1,0,0],["581","Swanna",2,9,0,0,1,1,1,0,0],["582","Vanillite",5,-1,1,1,1,1,1,0,0],["583","Vanillish",5,-1,0,0,1,1,0,0,0],["584","Vanilluxe",5,-1,0,0,1,1,0,0,0],["585","Deerling",0,4,1,1,1,1,1,0,0],["586","Sawsbuck",0,4,0,0,1,1,1,0,0],["587","Emolga",3,9,1,1,1,1,1,0,0],["588","Karrablast",11,-1,1,1,1,1,0,0,0],["589","Escavalier",11,16,0,0,1,1,0,0,0],["590","Foongus",4,7,1,1,1,1,0,0,0],["591","Amoonguss",4,7,0,0,1,1,0,0,0],["592","Frillish",2,13,1,1,1,1,0,0,0],["593","Jellicent",2,13,0,0,1,1,0,0,0],["594","Alomomola",2,-1,1,1,1,1,0,0,0],["595","Joltik",11,3,1,1,1,1,1,1,0],["596","Galvantula",11,3,0,0,1,1,1,0,0],["597","Ferroseed",4,16,1,1,1,1,0,0,0],["598","Ferrothorn",4,16,0,0,1,1,0,0,0],["599","Klink",16,-1,1,1,1,1,1,0,0],["600","Klang",16,-1,0,0,1,1,0,0,0],["601","Klinklang",16,-1,0,0,1,1,0,0,0],["602","Tynamo",3,-1,1,1,1,1,1,0,0],["603","Eelektrik",3,-1,0,0,1,1,1,0,0],["604","Eelektross",3,-1,0,0,1,1,1,0,0],["605","Elgyem",10,-1,1,1,1,1,0,0,0],["606","Beheeyem",10,-1,0,0,1,1,0,0,0],["607","Litwick",13,1,1,1,1,1,1,1,0],["608","Lampent",13,1,0,0,1,1,1,0,0],["609","Chandelure",13,1,0,0,1,1,1,0,0],["610","Axew",14,-1,1,1,1,1,0,0,0],["611","Fraxure",14,-1,0,0,1,1,0,0,0],["612","Haxorus",14,-1,0,0,1,1,0,0,0],["613","Cubchoo",5,-1,1,1,1,1,0,0,0],["614","Beartic",5,-1,0,0,1,1,0,0,0],["615","Cryogonal",5,-1,1,1,1,1,0,0,0],["616","Shelmet",11,-1,1,1,1,1,0,0,0],["617","Accelgor",11,-1,0,0,1,1,0,0,0],["618","Stunfisk",8,3,2,2,2,2,0,0,0],["619","Mienfoo",6,-1,1,1,1,1,0,0,0],["620","Mienshao",6,-1,0,0,1,1,0,0,0],["621","Druddigon",14,-1,1,1,1,1,0,0,0],["622","Golett",8,13,1,1,1,1,0,0,0],["623","Golurk",8,13,0,0,1,1,0,0,0],["624","Pawniard",15,16,1,1,1,1,0,0,0],["625","Bisharp",15,16,0,0,1,1,0,0,0],["626","Bouffalant",0,-1,1,1,1,1,0,0,0],["627","Rufflet",0,9,1,1,1,1,0,0,0],["628","Braviary",0,9,0,0,1,1,1,0,0],["629","Vullaby",15,9,1,1,1,1,0,0,0],["630","Mandibuzz",15,9,0,0,1,1,0,0,0],["631","Heatmor",1,-1,1,1,1,1,0,0,0],["632","Durant",11,16,1,1,1,1,0,0,0],["633","Deino",15,14,1,1,1,1,0,1,0],["634","Zweilous",15,14,0,0,1,1,0,0,0],["635","Hydreigon",15,14,0,0,1,1,0,0,0],["636","Larvesta",11,1,1,1,1,1,1,1,0],["637","Volcarona",11,1,0,0,1,1,0,0,0],["638","Cobalion",16,6,1,1,1,1,0,0,0],["639","Terrakion",12,6,1,1,1,1,0,0,0],["640","Virizion",4,6,1,1,1,1,0,0,0],["641","Tornadus",9,-1,1,1,2,2,0,0,0],["642","Thundurus",3,9,1,1,2,2,0,0,0],["643","Reshiram",14,1,1,1,1,1,0,0,0],["644","Zekrom",14,3,1,1,1,1,0,0,0],["645","Landorus",8,9,1,1,2,2,0,0,0],["646","Kyurem",14,5,1,1,3,3,0,0,0],["647","Keldeo",2,6,1,1,2,2,0,0,0],["648","Meloetta",0,10,1,1,2,2,0,0,0],["649","Genesect",11,16,1,1,5,5,0,0,0]],"6":[["650","Chespin",4,-1,1,1,1,1,0,0,0],["651","Quilladin",4,-1,0,0,1,1,0,0,0],["652","Chesnaught",4,6,0,0,1,1,0,0,0],["653","Fennekin",1,-1,1,1,1,1,1,1,0],["654","Braixen",1,-1,0,0,1,1,1,0,0],["655","Delphox",1,10,0,0,1,1,1,0,0],["656","Froakie",2,-1,1,1,1,1,0,0,0],["657","Frogadier",2,-1,0,0,1,1,0,0,0],["658","Greninja",2,15,0,0,1,1,0,0,0],["659","Bunnelby",0,-1,1,1,1,1,0,0,0],["660","Diggersby",0,8,0,0,1,1,0,0,0],["661","Fletchling",0,9,1,1,1,1,0,0,0],["662","Fletchinder",1,9,0,0,1,1,0,0,0],["663","Talonflame",1,9,0,0,1,1,0,0,0],["664","Scatterbug",11,-1,1,1,1,1,0,0,0],["665","Spewpa",11,-1,0,0,1,1,0,0,0],["666","Vivillon",11,9,0,0,1,1,1,0,0],["667","Litleo",1,0,1,1,1,1,0,0,0],["668","Pyroar",1,0,0,0,1,1,0,0,0],["669","Flabébé",17,-1,1,1,1,1,0,0,0],["670","Floette",17,-1,0,0,1,1,0,0,0],["671","Florges",17,-1,0,0,1,1,0,0,0],["672","Skiddo",4,-1,1,1,1,1,0,0,0],["673","Gogoat",4,-1,0,0,1,1,0,0,0],["674","Pancham",6,-1,1,1,1,1,0,1,0],["675","Pangoro",6,15,0,0,1,1,0,0,0],["676","Furfrou",0,-1,1,1,1,1,1,0,0],["677","Espurr",10,-1,1,1,1,1,0,0,0],["678","Meowstic",10,-1,0,0,1,1,1,0,0],["679","Honedge",16,13,1,1,1,1,0,1,0],["680","Doublade",16,13,0,0,1,1,0,0,0],["681","Aegislash",16,13,0,0,2,2,0,2,0],["682","Spritzee",17,-1,1,1,1,1,0,0,0],["683","Aromatisse",17,-1,0,0,1,1,0,0,0],["684","Swirlix",17,-1,1,1,1,1,0,0,0],["685","Slurpuff",17,-1,0,0,1,1,0,0,0],["686","Inkay",15,10,1,1,1,1,0,0,0],["687","Malamar",15,10,0,0,1,1,0,0,0],["688","Binacle",12,2,1,1,1,1,0,0,0],["689","Barbaracle",12,2,0,0,1,1,0,0,0],["690","Skrelp",7,2,1,1,1,1,0,0,0],["691","Dragalge",7,14,0,0,1,1,1,0,0],["692","Clauncher",2,-1,1,1,1,1,1,0,0],["693","Clawitzer",2,-1,0,0,1,1,0,0,0],["694","Helioptile",3,0,1,1,1,1,0,0,0],["695","Heliolisk",3,0,0,0,1,1,0,0,0],["696","Tyrunt",12,14,1,1,1,1,0,0,0],["697","Tyrantrum",12,14,0,0,1,1,0,0,0],["698","Amaura",12,5,1,1,1,1,1,0,0],["699","Aurorus",12,5,0,0,1,1,0,0,0],["700","Hawlucha",6,9,1,1,1,1,1,0,0],["701","Dedenne",3,17,1,1,1,1,0,0,0],["702","Carbink",12,17,1,1,1,1,0,0,0],["703","Goomy",14,-1,1,1,1,1,1,1,0],["704","Sliggoo",14,-1,0,0,1,1,1,1,0],["705","Goodra",14,-1,0,0,1,1,1,1,0],["706","Klefki",16,17,1,1,1,1,1,0,0],["707","Phantump",13,4,1,1,1,1,0,0,0],["708","Trevenant",13,4,0,0,1,1,1,0,0],["709","Pumpkaboo",13,4,1,1,4,4,3,0,0],["710","Gourgeist",13,4,0,0,4,4,1,0,0],["711","Bergmite",5,-1,1,1,1,1,0,0,0],["712","Avalugg",5,-1,0,0,1,1,0,0,0],["713","Noibat",9,14,1,1,1,1,1,1,0],["714","Noivern",9,14,0,0,1,1,1,0,0],["715","Xerneas",17,-1,1,1,1,1,0,0,0],["716","Yveltal",15,9,1,1,1,1,0,0,0],["717","Zygarde",14,8,1,1,4,4,0,0,0],["718","Diancie",12,17,1,1,2,2,0,0,0],["719","Hoopa",10,13,1,1,2,2,0,0,0],["720","Volcanion",1,2,1,1,1,1,0,0,0]],"7":[["721","Rowlet",4,9,1,1,1,1,0,0,0],["722","Dartrix",4,9,0,0,1,1,0,0,0],["723","Decidueye",4,13,0,0,2,2,2,0,0],["724","Litten",1,-1,1,1,1,1,1,0,0],["725","Torracat",1,-1,0,0,1,1,0,0,0],["726","Incineroar",1,15,0,0,1,1,0,0,0],["727","Popplio",2,-1,1,1,1,1,0,0,0],["728","Brionne",2,-1,0,0,1,1,0,0,0],["729","Primarina",2,17,0,0,1,1,0,0,0],["730","Pikipek",0,9,1,1,1,1,0,0,0],["731","Trumbeak",0,9,0,0,1,1,0,0,0],["732","Toucannon",0,9,0,0,1,1,0,0,0],["733","Yungoos",0,-1,1,1,1,1,0,0,0],["734","Gumshoos",0,-1,0,0,2,2,0,0,0],["735","Grubbin",11,-1,1,1,1,1,0,0,0],["736","Charjabug",11,3,0,0,1,1,0,0,0],["737","Vikavolt",11,3,0,0,2,2,1,0,0],["738","Crabrawler",6,-1,1,1,1,1,0,0,0],["739","Crabominable",6,5,0,0,1,1,0,0,0],["740","Oricorio",1,9,1,1,4,4,3,0,0],["741","Cutiefly",11,17,1,1,1,1,1,0,0],["742","Ribombee",11,17,0,0,2,2,2,0,0],["743","Rockruff",12,-1,1,1,1,1,1,1,0],["744","Lycanroc",12,-1,0,0,3,3,3,1,0],["745","Wishiwashi",2,-1,1,1,3,3,1,0,0],["746","Mareanie",7,2,1,1,1,1,0,0,0],["747","Toxapex",7,2,0,0,1,1,0,0,0],["748","Mudbray",8,-1,1,1,1,1,0,0,0],["749","Mudsdale",8,-1,0,0,1,1,0,0,0],["750","Dewpider",2,11,1,1,1,1,0,0,0],["751","Araquanid",2,11,0,0,2,2,2,0,0],["752","Fomantis",4,-1,1,1,1,1,0,0,0],["753t","Lurantis",4,-1,0,0,2,2,2,0,0],["754","Morelull",4,17,1,1,1,1,0,0,0],["755","Shiinotic",4,17,0,0,1,1,0,0,0],["756","Salandit",7,1,1,1,1,1,1,0,0],["757","Salazzle",7,1,0,0,2,2,2,0,0],["758","Stufful",0,6,1,1,1,1,1,0,0],["759","Bewear",0,6,0,0,1,1,0,0,0],["760","Bounsweet",4,-1,1,1,1,1,0,0,0],["761","Steenee",4,-1,0,0,1,1,0,0,0],["762","Tsareena",4,-1,0,0,1,1,0,0,0],["763","Comfey",17,-1,1,1,1,1,1,0,0],["764","Oranguru",0,10,1,1,1,1,0,0,0],["765","Passimian",6,-1,1,1,1,1,0,0,0],["766","Wimpod",11,2,1,1,1,1,0,0,0],["767","Golisopod",11,2,0,0,1,1,0,0,0],["768","Sandygast",13,8,1,1,1,1,1,1,0],["769","Palossand",13,8,0,0,1,1,1,0,0],["770","Pyukumuku",2,-1,1,1,1,1,0,0,0],["771","Type: Null",0,-1,1,1,1,1,0,0,0],["772","Silvally",0,-1,0,0,18,18,0,0,0],["773","Minior",12,9,1,1,2,2,0,0,0],["774","Komala",0,-1,1,1,1,1,1,0,0],["775","Turtonator",1,14,1,1,1,1,0,0,0],["776","Togedemaru",3,16,1,1,2,2,1,1,0],["777","Mimikyu",13,17,1,1,2,2,2,0,0],["778","Bruxish",2,10,1,1,1,1,0,0,0],["779","Drampa",0,14,1,1,1,1,1,0,0],["780","Dhelmise",13,4,1,1,1,1,0,0,0],["781","Jangmo-o",14,-1,1,1,1,1,1,1,0],["782","Hakamo-o",14,6,0,0,1,1,0,0,0],["783","Kommo-o",14,6,0,0,2,2,1,0,0],["784","Tapu Koko",3,17,1,1,1,1,0,0,0],["785","Tapu Lele",10,17,1,1,1,1,0,0,0],["786","Tapu Bulu",4,17,1,1,1,1,0,0,0],["787","Tapu Fini",2,17,1,1,1,1,0,0,0],["788","Cosmog",10,-1,1,1,1,1,0,0,0],["789","Cosmoem",10,-1,0,0,1,1,0,0,0],["790","Solgaleo",10,16,0,0,1,1,0,0,0],["791","Lunala",10,13,0,0,1,1,0,0,0],["792","Nihilego",12,7,1,1,1,1,0,0,0],["793","Buzzwole",11,6,1,1,1,1,0,0,0],["794","Pheromosa",11,6,1,1,1,1,0,0,0],["795","Xurkitree",3,-1,1,1,1,1,0,0,0],["796","Celesteela",16,9,1,1,1,1,0,0,0],["797","Kartana",4,16,1,1,1,1,0,0,0],["798","Guzzlord",15,14,1,1,1,1,0,0,0],["799","Poipole",7,-1,1,1,1,1,0,0,0],["800","Naganadel",7,14,0,0,1,1,0,0,0],["801","Stakataka",12,16,1,1,1,1,0,0,0],["802","Blacephalon",1,13,1,1,1,1,0,0,0],["803","Necrozma",10,-1,1,1,4,4,0,0,0],["804","Magearna",16,17,1,1,1,1,0,0,0],["805","Marshadow",6,13,1,1,1,1,0,0,0],["806","Zeraora",3,-1,1,1,1,1,0,0,0],["807","Meltan",16,-1,1,1,1,1,0,0,0],["808","Melmetal",16,-1,0,0,1,1,0,0,0]],"8":[["809","Grookey",4,-1,1,1,1,1,0,0,0],["810","Thwackey",4,-1,0,0,1,1,0,0,0],["811","Rillaboom",4,-1,0,0,1,1,0,0,0],["812","Scorbunny",1,-1,1,1,1,1,0,0,0],["813","Raboot",1,-1,0,0,1,1,0,0,0],["814","Cinderace",1,-1,0,0,1,1,0,0,0],["815","Sobble",2,-1,1,1,1,1,0,0,0],["816","Drizzile",2,-1,0,0,1,1,0,0,0],["817","Inteleon",2,-1,0,0,1,1,0,0,0],["818","Skwovet",0,-1,1,1,1,1,0,0,0],["819","Greedent",0,-1,0,0,1,1,0,0,0],["820","Rookidee",9,-1,1,1,1,1,1,1,0],["821","Corvisquire",9,-1,0,0,1,1,1,1,0],["822","Corviknight",9,16,0,0,1,1,1,1,0],["823","Blipbug",11,-1,1,1,1,1,0,0,0],["824","Dottler",11,10,0,0,1,1,0,0,0],["825","Orbeetle",11,10,0,0,1,1,0,0,0],["826","Nickit",15,-1,1,1,1,1,1,1,0],["827","Thievul",15,-1,0,0,1,1,0,0,0],["828","Gossifleur",4,-1,1,1,1,1,0,0,0],["829","Eldegoss",4,-1,0,0,1,1,0,0,0],["830","Wooloo",0,-1,1,1,1,1,0,0,0],["831","Dubwool",0,-1,0,0,1,1,0,0,0],["832","Chewtle",2,-1,1,1,1,1,0,0,0],["833","Drednaw",2,12,0,0,1,1,0,0,0],["834","Yamper",3,-1,1,1,1,1,0,0,0],["835","Boltund",3,-1,0,0,1,1,0,0,0],["836","Rolycoly",12,-1,1,1,1,1,0,0,0],["837","Carkol",12,1,0,0,1,1,0,0,0],["838","Coalossal",12,1,0,0,1,1,0,0,0],["839","Applin",4,14,1,1,1,1,1,0,0],["840","Flapple",4,14,0,0,1,1,1,0,0],["841","Appletun",4,14,0,0,1,1,0,0,0],["842","Silicobra",8,-1,1,1,1,1,0,0,0],["843","Sandaconda",8,-1,0,0,1,1,0,0,0],["844","Cramorant",9,2,1,1,3,3,0,0,0],["845","Arrokuda",2,-1,1,1,1,1,0,0,0],["846","Barraskewda",2,-1,0,0,1,1,0,0,0],["847","Toxel",3,7,1,1,1,1,1,0,0],["848","Toxtricity",3,7,0,0,2,2,2,0,0],["849","Sizzlipede",1,11,1,1,1,1,0,0,0],["850","Centiskorch",1,11,0,0,1,1,0,0,0],["851","Clobbopus",6,-1,1,1,1,1,0,0,0],["852","Grapploct",6,-1,0,0,1,1,0,0,0],["853","Sinistea",13,-1,1,1,1,1,1,1,0],["854","Polteageist",13,-1,0,0,1,1,0,0,0],["855","Hatenna",10,-1,1,1,1,1,0,0,0],["856","Hattrem",10,-1,0,0,1,1,0,0,0],["857","Hatterene",10,17,0,0,1,1,0,0,0],["858","Impidimp",15,17,1,1,1,1,0,0,0],["859","Morgrem",15,17,0,0,1,1,0,0,0],["860","Grimmsnarl",15,17,0,0,1,1,0,0,0],["861","Obstagoon",15,0,0,0,1,1,0,0,0],["862","Perrserker",16,-1,0,0,1,1,0,0,0],["863","Cursola",13,-1,0,0,1,1,1,0,0],["864","Sirfetch'd",6,-1,0,0,1,1,0,0,0],["865","Mr. Rime",5,10,0,0,1,1,0,0,0],["866","Runerigus",8,13,0,0,1,1,0,0,0],["867","Milcery",17,-1,1,1,1,1,1,0,0],["868","Alcremie",17,-1,0,0,1,1,0,0,0],["869","Falinks",6,-1,1,1,1,1,0,0,0],["870","Pincurchin",3,-1,1,1,1,1,0,0,0],["871","Snom",5,11,1,1,1,1,1,1,0],["872","Frosmoth",5,11,0,0,1,1,0,0,0],["873","Stonjourner",12,-1,1,1,1,1,0,0,0],["874","Eiscue",5,-1,1,1,2,2,0,0,0],["875","Indeedee",10,0,1,1,2,2,1,0,0],["876","Morpeko",3,15,1,1,2,2,0,0,0],["877","Cufant",16,-1,1,1,1,1,0,0,0],["878","Copperajah",16,-1,0,0,1,1,0,0,0],["879","Dracozolt",3,14,1,1,1,1,0,0,0],["880","Arctozolt",3,5,1,1,1,1,0,0,0],["881","Dracovish",2,14,1,1,1,1,0,0,0],["882","Arctovish",2,5,1,1,1,1,0,0,0],["883","Duraludon",16,14,1,1,1,1,0,0,0],["884","Dreepy",14,13,1,1,1,1,0,0,0],["885","Drakloak",14,13,0,0,1,1,0,0,0],["886","Dragapult",14,13,0,0,1,1,0,0,0],["887","Zacian",17,-1,1,1,2,2,0,0,0],["888","Zamazenta",6,-1,1,1,2,2,0,0,0],["889","Eternatus",7,14,1,1,1,1,0,0,0],["890","Kubfu",6,-1,1,1,1,1,0,0,0],["891","Urshifu",6,15,0,0,2,2,0,0,0],["892","Zarude",15,4,1,1,1,1,0,0,0],["893","Regieleki",3,-1,1,1,1,1,0,0,0],["894","Regidrago",14,-1,1,1,1,1,0,0,0],["895","Glastrier",5,-1,1,1,1,1,0,0,0],["896","Spectrier",13,-1,1,1,1,1,0,0,0],["897","Calyrex",10,4,1,1,3,3,0,0,0]],"97":[["000a1","Lunupine",15,-1,1,1,1,1,0,0,0],["000-L","Lunupine/Mega Forme Q",15,17,0,0,1,1,0,0,0],["000a2","Blophin",2,-1,1,1,1,1,0,0,0],["000a3","Inflale",2,-1,0,0,1,1,0,0,0],["000a4","Orkit",2,-1,1,1,1,1,0,0,0],["000a6","Orcalot",2,16,0,0,1,1,0,0,0],["000a7","Faemueño",17,9,1,1,1,1,0,0,0],["000a8","Faemilarín",17,9,0,0,1,1,0,0,0],["000a9","Faemísimo",17,9,0,0,1,1,0,0,0],["000aa","Wagell",7,17,1,1,1,1,0,0,0],["000ab","Wanamangora",7,17,0,0,1,1,0,0,0],["000-W","Wanamangora/Mega Forme Q",7,17,0,0,1,1,0,0,0],["000ac","Gosold",0,9,1,1,1,1,0,0,0],["000ad","Goldesem",10,9,0,0,1,1,0,0,0],["000ae","Impyre",15,-1,1,1,1,1,1,0,0],["000af","Baflammet",15,1,0,0,1,1,1,0,0],["000ag","Searene",14,2,1,1,1,1,0,0,0],["000ah","Solynx",1,-1,1,1,1,1,0,0,0],["000-S","Solynx/Mega Forme Q",1,3,0,0,1,1,0,0,0],["000ai","Ardik",5,-1,1,1,1,1,0,0,0],["000aj","Sibex",5,-1,0,0,1,1,0,0,0],["000ak","Boxaby",12,6,1,1,1,1,0,0,0],["000al","Kangspar",12,6,0,0,1,1,0,0,0],["000-X","Kangspar/Mega Forme Q",12,6,0,0,1,1,0,1,0],["000am","Bunbori",5,17,1,1,1,1,1,0,0],["000-B","Bunbori/Mega Forme Q",5,17,0,0,1,1,1,0,0],["000an","Taiveret",4,-1,1,1,1,1,0,0,0],["000ao","Taipaeus",4,-1,0,0,1,1,0,0,0],["000ap","Taimorpha",4,6,0,0,1,1,1,0,0],["000aq","Flarbat",1,9,1,1,1,1,0,0,0],["000ar","Flarotis",1,17,0,0,1,1,0,0,0],["000as","Flaroptera",1,17,0,0,1,1,0,0,0],["000at","Hydrark",2,-1,1,1,1,1,0,0,0],["000au","Hydrinus",2,-1,0,0,1,1,0,0,0],["000av","Hydrinifor",2,16,0,0,1,1,0,0,0],["000aw","Gragon",13,14,1,1,1,1,0,0,0],["000ay","Greegon",13,14,0,0,1,1,0,0,0],["000az","Avaragon",13,14,0,0,1,1,0,0,0],["000b0","Kinaster",15,1,1,1,1,1,0,0,0],["000b1","Luckoo",4,9,1,1,1,1,0,0,0],["000b2","Peckoo",4,9,0,0,1,1,0,0,0],["000b3","Peekoo",4,10,0,0,1,1,0,0,0],["000b4","Arasprit",8,-1,1,1,1,1,0,0,0],["000b5","Arthreux",8,11,0,0,1,1,0,0,0],["000b6","Quetzephyr",3,9,1,1,1,1,0,0,0],["000b7","Quetzaptyl",3,9,0,0,1,1,0,0,0],["000b8","Pixrine",12,17,1,1,1,1,0,0,0],["000b9","Kitsunari",10,-1,1,1,1,1,0,0,0],["000ba","Kitsubuki",10,13,0,0,1,1,0,0,0],["000bb","Kryptik",12,13,1,1,1,1,0,0,0],["000bc","Bandicoon",0,15,1,1,1,1,0,0,0],["000bd","Phastix",11,-1,1,1,1,1,0,0,0],["000be","Phasmaleef/Forest Forme",11,-1,0,0,1,1,0,0,0],["000bf","Phasmaleef/Desert Forme",11,-1,0,0,1,1,0,0,0],["000bg","Pasovan",0,-1,1,1,1,1,0,0,0],["000bh","Glaquine",5,-1,1,1,1,1,1,0,0],["000bi","Cavallost",5,-1,0,0,1,1,0,0,0],["000bk","Minibbit",16,-1,1,1,1,1,1,0,0],["000bl","Metabbit",16,-1,0,0,1,1,0,0,0],["000bm","Terabbit",16,-1,0,0,1,1,0,0,0],["000-T","Terabbit/Mega Forme Q",16,-1,0,0,1,1,0,0,0],["000bn","Tillink",8,-1,1,1,1,1,0,0,0],["000bo","Terrink",8,-1,0,0,1,1,0,0,0],["000bp","Bezerell",2,15,1,1,1,1,0,0,0],["000bq","Bezermuur",2,15,0,0,1,1,0,0,0],["000br","Bezermuut",2,15,0,0,1,1,0,0,0],["000bt","Ayeren",0,10,1,1,1,1,0,0,0],["000bu","Aytheraye",0,13,0,0,1,1,0,0,0],["000bv","Skeleco",2,13,1,1,1,1,0,0,0],["000bw","Phantiidae",2,13,0,0,1,1,0,0,0],["000bx","Klaatupillar",11,-1,1,1,1,1,0,0,0],["000by","Charaxalis",11,-1,0,0,1,1,0,0,0],["000bz","Incantasius",11,10,0,0,1,1,0,0,0],["000c0","Maravol",11,7,1,1,1,1,0,0,0],["000cm","Kyutopi",10,17,1,1,1,1,0,0,0],["000cn","Konatus",10,17,0,0,1,1,0,0,0],["000co","Kenyip",8,-1,1,1,1,1,0,0,0],["000cp","Arfrica",8,6,0,0,1,1,0,0,0],["000cq","Kalahowli",8,6,0,0,1,1,0,0,0],["000cr","Petripeep",12,-1,1,1,1,1,0,0,0],["000cs","Chirock",12,14,0,0,1,1,0,0,0],["000ct","Toxitrice",12,14,0,0,1,1,0,0,0],["000cu","Serpetone",12,7,0,0,1,1,0,0,0],["000cv","Toxilisk",12,7,0,0,1,1,0,0,0],["000cw","Gumairy",4,17,1,1,1,1,0,0,0],["000cx","Eucylph",4,17,0,0,1,1,0,0,0],["000cy","Puppod",7,0,1,1,1,1,1,0,0],["000cz","Slugdog",7,0,0,0,1,1,1,0,0],["000d0","Rokiwi",4,-1,1,1,1,1,0,0,0],["000d1","Brushiwi",4,15,0,0,1,1,0,0,0],["000d2","Alicalf",5,12,1,1,1,1,0,0,0],["000d3","Cetacorn",5,12,0,0,1,1,0,0,0],["000d4","Valkind",17,6,1,1,1,1,0,0,0],["000d5","Frayja",17,6,0,0,1,1,0,0,0],["000d6","Croaket",15,-1,1,1,1,1,0,0,0],["000d7","Quibbit/Toxic Forme",15,7,0,0,1,1,0,0,0],["000d8","Quibbit/Charged Forme",15,3,0,0,1,1,0,0,0],["000d9","Quibbit/Herbal Forme",15,4,0,0,1,1,0,0,0],["000da","Quibbit/Magma Forme",15,1,0,0,1,1,0,0,0],["000db","Quibbit/Fae Forme",15,17,0,0,1,1,0,0,0],["000de","Slypin",10,15,1,1,1,1,0,0,0],["000df","Haredini",10,15,0,0,1,1,0,0,0],["000dg","Selkrub",11,7,1,1,1,1,0,0,0],["000dh","Aqrabion",11,7,0,0,1,1,0,0,0],["000di","Skargas",11,7,0,0,1,1,0,0,0],["000dj","Kawotor",2,0,1,1,1,1,0,0,0],["000dk","Lutriva",2,6,0,0,1,1,0,0,0],["000dl","Selutian",2,5,0,0,1,1,0,0,0],["000dm","Kitwurm",11,-1,1,1,1,1,0,0,0],["000dn","Purrpa",11,-1,0,0,1,1,0,0,0],["000do","Moffkat",11,17,0,0,1,1,0,0,0],["000dp","Pepyre",4,1,1,1,1,1,0,0,0],["000dq","Skarasear",4,1,0,0,1,1,0,0,0],["000dr","Aphreyd",11,-1,1,1,1,1,0,0,0],["000ds","Scavady",11,-1,0,0,1,1,0,0,0],["000dt","Mantidra",11,14,0,0,1,1,0,0,0],["000du","Caimaw",16,-1,1,1,1,1,0,0,0],["000dv","Caimangle",16,-1,0,0,1,1,0,0,0],["000dw","Valimp",17,15,1,1,1,1,0,0,0],["000dx","Valladox",17,15,0,0,1,1,0,0,0],["000dy","Valenoir",17,15,0,0,1,1,0,0,0],["000dz","Frusky",5,-1,1,1,1,1,0,0,0],["000f0","Glacifur",5,-1,0,0,1,1,0,0,0],["000f1","Skyrie",9,-1,1,1,1,1,0,0,0],["000f2","Grymphony",9,-1,0,0,1,1,0,0,0],["000f3","Shinorin",14,6,1,1,1,1,0,0,0],["000f4","Shinorin/Incandescent",14,1,0,0,1,1,0,0,0],["000f5","Sikannos",0,1,1,1,1,1,0,0,0],["000f6","Sikannos/Unfettered",13,1,0,0,1,1,0,0,0],["000f7","Goschief",17,-1,1,1,1,1,0,0,0],["000f8","Havonk",17,15,0,0,1,1,0,0,0],["000f9","Mocknock",13,16,1,1,1,1,0,0,0],["000fa","Portalgeist",13,16,0,0,1,1,0,0,0],["000fb","Flurrawr/Boreal",5,-1,1,1,1,1,0,0,0],["000fc","Flurrawr/Austral",5,-1,0,0,1,1,0,0,0],["000fd","Tundrasail/Boreal",5,8,0,0,1,1,0,0,0],["000fe","Tundrasail/Austral",5,8,0,0,1,1,0,0,0],["000ff","Parapod",4,-1,1,1,1,1,0,0,0],["000fg","Craysprout",4,-1,0,0,1,1,0,0,0],["000fh","Strelitzgon",4,14,0,0,1,1,0,0,0],["000fi","Caprikid",6,-1,1,1,1,1,0,0,0],["000fj","Saytaries",6,16,0,0,1,1,0,0,0],["000fk","Taurminos",6,15,0,0,1,1,0,0,0],["000fl","Sagidamas",6,17,0,0,1,1,0,1,0],["000fm","Tenrekki",3,8,1,1,1,1,0,0,0],["000fn","Possmol",0,-1,1,1,1,1,0,0,0],["000fo","Opposham",0,7,0,0,1,1,0,0,0],["000fp","Opposkull",13,7,0,0,1,1,0,0,0],["000fq","Lunamor",17,-1,1,1,1,1,0,0,0],["000fr","Astrolochi",17,12,0,0,1,1,0,0,0],["000fs","Exilant",16,13,1,1,1,1,0,0,0],["000ft","Scorupt",16,13,0,0,1,1,0,0,0],["000fu","Lyruse",16,17,1,1,1,1,0,0,0],["000fv","Musharp",16,17,0,0,1,1,0,0,0],["000fw","Smokackle",1,0,1,1,1,1,0,0,0],["000fx","Hycano",1,12,0,0,1,1,0,0,0],["000fy","Inferial",14,-1,1,1,1,1,0,0,0],["000fz","Gargodyle",14,9,0,0,1,1,0,0,0],["000g0","Mirrasma",13,14,1,1,1,1,0,0,0],["000g1","Mirrarch",13,14,0,0,1,1,0,0,0],["000g2","Slithugi",13,8,1,1,1,1,0,0,0],["000g3","Sugikobra",13,8,0,0,1,1,0,0,0]],"98":[["012-Q","Butterfree/Mega Forme Q",11,10,0,0,1,1,1,0,0],["024-Q","Arbok/Mega Forme Q",7,15,0,0,1,1,0,0,0],["027-Q","Raichu/Mega Forme Q",3,6,0,0,1,1,1,0,0],["039-Q","Ninetales/Mega Forme Q",1,10,0,0,1,1,1,0,0],["057-Q","Persian/Mega Forme Q",0,13,0,0,1,1,0,0,0],["063-Q","Arcanine/Mega Forme Q",1,14,0,0,1,1,1,0,0],["083-Q","Rapidash/Mega Forme Q",1,9,0,0,1,1,1,0,0],["090-Q","Farfetch'd/Mega Forme Q",0,9,0,0,1,1,1,0,0],["094-Q","Dewgong/Mega Forme Q",2,5,0,0,1,1,1,0,0],["113-Q","Marowak/Alolan Mega Forme Q",1,13,0,0,1,1,0,0,0],["136-Q","Jynx/Mega Forme Q",5,10,0,0,1,1,0,0,0],["141-Q","Lapras/Mega Forme Q",2,5,0,0,1,1,0,0,0],["144-Q","Vaporeon/Mega Forme Q",2,-1,0,0,1,1,0,0,0],["145-Q","Jolteon/Mega Forme Q",3,-1,0,0,1,1,0,0,0],["146-Q","Flareon/Mega Forme Q",1,-1,0,0,1,1,1,0,0],["147-Q","Espeon/Mega Forme Q",10,-1,0,0,1,1,0,0,0],["148-Q","Umbreon/Mega Forme Q",15,-1,0,0,1,1,0,0,0],["149-Q","Leafeon/Mega Forme Q",4,-1,0,0,1,1,0,0,0],["150-Q","Glaceon/Mega Forme Q",5,-1,0,0,1,1,1,0,0],["151-Q","Sylveon/Mega Forme Q",17,-1,0,0,1,1,0,0,0],["164-Q","Dragonite/Mega Forme Q",14,9,0,0,1,1,0,0,0],["166-Q","Mew/Mega Forme Q",10,-1,0,0,1,1,1,0,0],["177-Q","Furret/Mega Forme Q",0,14,0,0,1,1,0,0,0],["201-Q","Jumpluff/Mega Forme Q",4,17,0,0,1,1,1,0,0],["215-Q","Girafarig/Mega Forme Q",0,10,0,0,1,1,0,0,0],["218-Q","Dunsparce/Mega Forme Q",0,14,0,0,1,1,1,0,0],["227-Q","Weavile/Mega Forme Q",15,5,0,0,1,1,1,0,0],["239-Q","Skarmory/Mega Forme Q",16,14,0,0,1,1,0,0,0],["263-Q","Lugia/Mega Forme Q",10,9,0,0,1,1,0,0,0],["264-Q","Ho-oh/Mega Forme Q",1,9,0,0,1,1,0,0,0],["265-Q","Celebi/Mega Forme Q",10,4,0,0,1,1,0,1,0],["276-Q","Mightyena/Mega Forme Q",15,-1,0,0,1,1,1,0,0],["301-Q","Breloom/Mega Forme Q",4,6,0,0,1,1,0,0,0],["325-Q","Manectric/Mega Forme Q",3,1,0,0,1,1,0,1,0],["335-Q","Wailord/Mega Forme Q",2,9,0,0,1,1,0,0,0],["344-Q","Flygon/Mega Forme Q",8,14,0,0,1,1,0,0,0],["349-Q","Zangoose/Mega Forme Q",0,15,0,0,1,1,0,1,0],["350-Q","Seviper/Mega Forme Q",7,2,0,0,1,1,0,0,0],["364-Q","Milotic/Mega Forme Q",2,17,0,0,1,1,1,0,0],["380-Q","Froslass/Mega Forme Q",5,13,0,0,1,1,1,0,0],["403-Q","Jirachi/Mega Forme Q",16,10,0,0,1,1,0,0,0],["423-Q","Luxray/Mega Forme Q",3,15,0,0,1,1,0,0,0],["438-Q","Floatzel/Mega Forme Q",2,-1,0,0,1,1,0,0,0],["471-Q","Lumineon/Mega Forme Q",2,17,0,0,1,1,0,0,0],["487-Q","Giratina/Mega Forme Q",13,14,0,0,1,1,0,0,0],["490-Q","Manaphy/Mega Forme Q",2,17,0,0,1,1,0,0,0],["494-Q","Victini/Mega Forme Q",10,1,0,0,1,1,0,0,0],["510-Q","Liepard/Mega Forme Q",15,-1,0,0,1,1,1,0,0],["545-Q","Scolipede/Mega Forme Q",11,7,0,0,1,1,0,0,0],["560-Q","Scrafty/Mega Forme Q",15,6,0,0,1,1,0,1,0],["571-Q","Zoroark/Mega Forme Q",15,-1,0,0,1,1,0,0,0],["586-Q","Sawsbuck/Mega Forme Q",17,4,0,0,1,1,0,0,0],["609-Q","Chandelure/Mega Forme Q",13,1,0,0,1,1,0,1,0],["612-Q","Haxorus/Mega Forme Q",14,16,0,0,1,1,1,0,0],["614-Q","Beartic/Mega Forme Q",5,-1,0,0,1,1,1,0,0],["621-Q","Druddigon/Mega Forme Q",14,12,0,0,1,1,0,0,0],["668-Q","Pyroar/Mega Forme Q",1,0,0,0,1,1,1,0,0],["673-Q","Gogoat/Mega Forme Q",4,-1,0,0,1,1,1,0,0],["695-Q","Heliolisk/Mega Forme Q",3,1,0,0,1,1,0,0,0],["700-Q","Hawlucha/Mega Forme Q",6,9,0,0,1,1,0,0,0],["705-Q","Goodra/Mega Forme Q",14,7,0,0,1,1,0,1,0],["714-Q","Noivern/Mega Forme Q",9,14,0,0,1,1,0,1,0],["762-Q","Tsareena/Mega Forme Q",4,6,0,0,1,1,1,0,0]],"99":[["019s1","Saiyan Rattata",0,6,1,1,1,1,1,1,0],["019s2","Super-Saiyan Rattata",0,6,0,0,1,1,1,1,0],["020s1","Super-Saiyan Raticate",0,6,0,0,1,1,0,0,0],["020s2","Super-Saiyan 2 Raticate",0,6,0,0,1,1,0,0,0],["020-S","Super-Saiyan 3 Raticate",0,6,0,0,1,1,1,0,0],["020-T","Super-Saiyan 4 Raticate",0,6,0,0,1,1,1,0,0],["025f","Flying Pichu",3,-1,1,1,1,1,0,0,0],["025s","Surfing Pichu",3,-1,1,1,1,1,0,0,0],["026f","Flying Pikachu",3,-1,0,0,1,1,0,0,0],["026s","Surfing Pikachu",3,-1,0,0,1,1,0,0,0],["026w","Snowboarding Pikachu",3,-1,0,0,1,1,0,0,0],["027f","Flying Raichu",3,9,0,0,1,1,0,0,0],["027s","Surfing Raichu",3,2,0,0,1,1,0,0,0],["027w","Snowboarding Raichu",3,5,0,0,1,1,0,0,0],["029t","Sandslash/Totem Forme Q",8,-1,0,0,1,1,0,0,0],["035s","Shooting Star Cleffa",17,-1,1,1,1,1,1,0,0],["036s","Shooting Star Clefairy",17,-1,0,0,1,1,1,0,0],["037s","Shooting Star Clefable",17,-1,0,0,1,1,0,0,0],["038a","Koroku",1,5,1,1,1,1,0,0,0],["039-A","Kyukori",1,5,0,0,1,1,0,0,0],["040g","Guild Igglybuff",0,17,1,1,1,1,0,0,0],["041g","Guild Jigglypuff",0,17,0,0,1,1,0,0,0],["042g","Guild Wigglytuff",0,17,0,0,1,1,0,0,0],["062x","Apocalyptic Growlithe",1,-1,1,1,1,1,0,0,0],["063x","Apocalyptic Arcanine",1,1,0,0,1,1,0,0,0],["084s","Snowpoke",5,10,1,1,1,1,0,0,0],["085s","Snowbro",5,10,0,0,1,1,0,0,0],["086s","Snowking",5,10,0,0,1,1,0,0,0],["108ds","Death Star Voltorb",3,-1,1,1,1,1,0,0,0],["109ds","Death Star Electrode",3,-1,0,0,1,1,0,0,0],["189e","Early Bird Natu",10,9,1,1,1,1,0,0,0],["190e","Early Bird Xatu",10,9,0,0,1,1,0,0,0],["198t","Sudowoodo/Totem Forme Q",12,-1,0,0,1,1,0,0,0],["208e","Wooper/Galvanic",3,-1,1,1,1,1,0,0,0],["209e","Quagsire/Galvanic",3,-1,0,0,1,1,0,0,0],["219v","Gligar/Vampire",8,9,1,1,1,1,0,0,0],["220v","Gliscor/Vampire",8,9,0,0,1,1,0,0,0],["225s","Scaracross",11,13,1,1,1,1,0,0,0],["226p","Snichu",15,3,1,1,1,1,0,0,0],["227p","Vilechu",15,3,0,0,1,1,0,0,0],["230bm","Blue Moon Slugma",2,-1,1,1,1,1,0,0,0],["231bm","Blue Moon Magcargo",2,12,0,0,1,1,0,0,0],["240c","Houndour/Orthrus",1,14,1,1,1,1,1,0,0],["240i","Frosdour",15,5,1,1,1,1,0,0,0],["241c","Houndoom/Cerberus",1,14,0,0,1,1,0,0,0],["241i","Chilldoom",15,5,0,0,1,1,1,0,0],["243t","Donphan/Totem Forme Q",8,-1,0,0,1,1,0,0,0],["263xd","XD001",10,9,1,1,1,1,1,0,0],["275x","Apocalyptic Poochyena",15,13,1,1,1,1,1,0,0],["276x","Apocalyptic Mightyena",15,13,0,0,1,1,0,0,0],["294b","Snoralts",5,17,1,1,1,1,0,0,0],["295b","Snolia",5,17,0,0,1,1,0,0,0],["296b","Frosvoir",5,13,0,0,1,1,0,1,0],["297b","Glaillade",5,6,0,0,1,1,0,0,0],["300x","Apocalyptic Shroomish",4,7,1,1,1,1,0,0,0],["301x","Apocalyptic Breloom",4,7,0,0,1,1,0,0,0],["336i","Numel/Arctic",5,8,1,1,1,1,0,0,0],["337i","Camerupt/Arctic",5,8,0,0,1,1,0,0,0],["354t","Whiscash/Totem Forme Q",2,8,0,0,1,1,0,0,0],["383t","Walrein/Totem Forme Q",5,2,0,0,1,1,0,0,0],["402f","Ryukuza",14,9,1,1,1,1,0,0,0],["402m","Magquaza",14,13,1,1,1,1,0,0,0],["405s","Seasonal Turtwig",4,-1,1,1,1,1,1,0,0],["406s","Seasonal Grotle",4,-1,0,0,1,1,0,0,0],["407s","Seasonal Torterra",4,-1,0,0,1,1,0,0,0],["417b","Bidoof/Igneous",1,-1,1,1,1,1,0,0,0],["418b","Bibarel/Igneous",1,12,0,0,1,1,0,0,0],["421f","Shinxel",3,2,1,1,1,1,0,0,0],["422f","Fluxio",3,2,0,0,1,1,0,0,0],["423f","Fluxray",3,2,0,0,1,1,0,0,0],["423-F","Fluxray/Mega Forme Q",3,2,0,0,1,1,0,0,0],["434s","Snow Combee",11,5,1,1,1,1,0,0,0],["435s","Snow Vespiquen",11,5,0,0,1,1,0,0,0],["435t","Snow Vespiquen/Totem Forme Q",11,5,0,0,1,1,0,0,0],["447i","Glameow/Siberian",0,5,1,1,1,1,0,0,0],["448i","Purugly/Siberian",0,5,0,0,1,1,0,0,0],["450t","Skuntank/Totem Forme Q",7,15,0,0,1,1,1,1,0],["457t","Spiritomb/Totem Forme Q",13,15,0,0,1,1,1,0,0],["458a","Gibolu",14,6,1,1,1,1,0,0,0],["459a","Gabolu",14,6,0,0,1,1,0,0,0],["460a","Garcario",14,6,0,0,1,1,0,0,0],["478t","Porygon-Z/Totem Forme Q",0,-1,0,0,1,1,0,1,0],["483p","Dialga/Primal Forme Q",16,14,0,0,1,1,0,0,0],["484p","Palkia/Primal Forme Q",2,14,0,0,1,1,0,0,0],["509h","Purrloin/Hallowe'en Witch",15,-1,1,1,1,1,0,0,0],["510h","Liepard/Hallowe'en Witch",15,-1,0,0,1,1,1,0,0],["542t","Leavanny/Totem Forme Q",11,4,0,0,1,1,0,0,0],["556t","Maractus/Totem Forme Q",4,-1,0,0,1,1,0,0,0],["622x","Apocalyptic Golett",12,16,1,1,1,1,0,0,0],["623x","Apocalyptic Golurk",12,16,0,0,1,1,0,0,0],["628t","Braviary/Totem Forme Q",0,9,0,0,1,1,1,0,0],["630t","Mandibuzz/Totem Forme Q",15,9,0,0,1,1,1,0,0],["667g","Glileo",1,7,1,1,1,1,0,0,0],["668g","Pyriscor",1,7,0,0,1,1,0,0,0],["682p","Spritzkrow",17,15,1,1,1,1,0,0,0],["683p","Aromakrow",17,15,0,0,1,1,0,0,0],["708t","Trevenant/Totem Forme Q",13,4,0,0,1,1,0,1,0],["713b","Noismog",10,14,1,1,1,1,0,0,0],["713c","Noismoem",10,14,0,0,1,1,0,0,0],["714b","Solgavern",16,14,0,0,1,1,0,0,0],["714c","Lunavern",13,14,0,0,1,1,0,0,0],["726b","Incineroar/Feral",1,3,0,0,1,1,0,0,0],["740q","Oricorio/Pointe Style",4,9,0,0,1,1,1,0,0]]}}`).split(',');
    }
    // eslint-disable-next-line camelcase
    fillTemplates() {
        this.TEMPLATES.shelterOptionsHTML = Resources.shelterOptionsHTML();
        this.TEMPLATES.fieldSortHTML = Resources.fieldSortHTML();
        this.TEMPLATES.fieldSearchHTML = Resources.fieldSearchHTML();
        this.TEMPLATES.privateFieldSearchHTML = Resources.privateFieldSearchHTML();
        this.TEMPLATES.qolHubHTML = Resources.qolHubHTML();
        this.TEMPLATES.evolveFastHTML = Resources.evolveFastHTML();
        this.TEMPLATES.labOptionsHTML = Resources.labOptionsHTML();
        this.TEMPLATES.publicFieldTooltipModHTML = Resources.publicFieldTooltipModHTML();
        this.TEMPLATES.privateFieldTooltipModHTML = Resources.privateFieldTooltipModHTML();
    }
    fillOptionsLists() {
        this.TYPE_OPTIONS = Helpers.buildOptionsString(this.TYPE_LIST);
        this.NATURE_OPTIONS = Helpers.buildOptionsString(this.NATURE_LIST);
        this.EGG_GROUP_OPTIONS = Helpers.buildOptionsString(this.EGG_GROUP_LIST);
    }
}

class Helpers {
    // Custom error handler to output in the QoL error console
    // Level should be info, warn, or error; default is info
    // Message is also written to the JavaScript console
    static writeCustomError(message,level='info') {
        const logElement = document.getElementById('qolConsoleHolder');
        let prefix = undefined;
        if(level=='warn') {
            prefix = 'WARN: ';
            console.warn('QoL: '+message);
        }
        else if(level=='error') {
            prefix = 'ERROR: ';
            console.error('QoL: '+message);
        }
        else {
            prefix = 'INFO: ';
            console.log('QoL: '+message);
        }
        if(logElement) {
            logElement.innerHTML += '<li>' + prefix + message + '</li>';
        }
        else {
            console.error('Could not add custom log to log element');
        }
    }
    /** TamperMonkey polyfill to replace GM_addStyle function */
    static addGlobalStyle(css) {
        try {
            const head = document.getElementsByTagName('head')[0];
            const style = document.createElement('style');
            style.innerHTML = css;
            head.appendChild(style);
        } catch(err) {
            Helpers.writeCustomError('Error while applying global styling: '+err,'error');
            console.log(err);
        }
    }
    static buildOptionsString(arr) {
        let str = '<option value="none">None</option> ';
        for (let i = 0; i < arr.length; i++) {
            str += `<option value="${i}">${arr[i]}</option> `;
        }
        return str;
    }
    static toggleSetting(key, set, cls) {
        // provide default value for cls
        cls = cls || 'qolsetting';
        // update values for checkboxes
        if (typeof set === 'boolean') {
            const element = document.querySelector(`.${cls}[data-key="${key}"]`);
            if (element && element.type === 'checkbox') {
                element.checked = set;
            }
        }
    } // toggleSetting
    static setupFieldArrayHTML(arr, id, div, cls) {
        const n = arr.length;
        for (let i = 0; i < n; i++) {
            const rightDiv = i + 1;
            const rightValue = arr[i];
            $(`#${id}`).append(div);
            $(`.${cls}`).removeClass(cls).addClass('' + rightDiv + '').find('.qolsetting').val(rightValue);
        }
    }
    loadSettings(KEY, DEFAULT, obj) {
        if (localStorage.getItem(KEY) === null) {
            this.saveSettings(KEY);
        } else {
            try {
                const countScriptSettings = Object.keys(obj).length;
                const localStorageString = JSON.parse(localStorage.getItem(KEY));
                const countLocalStorageSettings = Object.keys(localStorageString).length;
                if (countLocalStorageSettings < countScriptSettings) { // adds new objects (settings) to the local storage
                    const defaultsSetting = DEFAULT;
                    const userSetting = JSON.parse(localStorage.getItem(KEY));
                    const newSetting = $.extend(true, {}, defaultsSetting, userSetting);

                    obj = newSetting;
                    this.saveSettings(KEY, obj);
                }
                if (countLocalStorageSettings > countScriptSettings) {
                    this.saveSettings(KEY, obj);
                }
            }
            catch (err) {
                this.saveSettings(KEY, obj);
            }
            if (localStorage.getItem(KEY) != JSON.stringify(obj)) {
                obj = JSON.parse(localStorage.getItem(KEY));
            }
        }

        return obj;
    }
    saveSettings(key, obj) {
        localStorage.setItem(key, JSON.stringify(obj));
    }
    static textSearchDiv(cls, dataKey, id, arrayName) {
        return `<div class='${cls}'><label><input type="text" class="qolsetting" data-key="${dataKey}" ` +
            `array-name='${arrayName}'` +
            `/></label><input type='button' value='Remove' id='${id}'></div>`;
    }
    static selectSearchDiv(cls, name, dataKey, options, id, divParent, arrayName) {
        return `<div class='${cls}'> <select name='${name}' class="qolsetting" data-key='${dataKey}' ` +
            `array-name='${arrayName}'> ${options} </select> <input type='button' value='Remove' id='${id}'> </div>`;
    }
    static parseFieldPokemonTooltip(GLOBALS, tooltip) {
        const dataElements = $(tooltip).children(0).children();
        let index = 1;
        // nickname
        const nickname = dataElements[index].textContent;
        if (!nickname) {
            console.error(`Helpers.parseFieldPokemonTooltip - nickname '${nickname}' (is not a valid name)`);
        }
        index++;

        /*
         * Issue #59 - Pokefarm added a new h3 element after the nickname
         * that contains no data
         */
        index++;

        // species
        let species = '';
        if (dataElements[index].textContent) {
            const tc = dataElements[index].textContent;
            const tcSplit = tc.trim().split(':  ');
            if (tcSplit.length == 1) {
                console.error('Helpers.parseFieldPokemonTooltip - species text does not contain \':  \'');
            }
            else {
                species = tcSplit[1];
            }
        }
        index++;

        // dataElements[3] will be a forme if the pokemon has a forme
        let forme = '';
        if (dataElements[index].textContent &&
            dataElements[index].textContent.startsWith('Forme')) {
            forme = dataElements[index].textContent.substr('Forme: '.length);
            index++;
        }

        // types
        const typeElements = $(dataElements[index]).children().slice(1);
        const typeUrls = typeElements.map(idx => typeElements[idx]['src']);
        let types = typeUrls.map(idx =>
            typeUrls[idx].substring(typeUrls[idx].indexOf('types/') + 'types/'.length,
                typeUrls[idx].indexOf('.png')));
        types = types.map(idx => types[idx].charAt(0).toUpperCase() + types[idx].substring(1));
        types = types.map(idx => GLOBALS.TYPE_LIST.indexOf(types[idx]));
        index++;

        // level
        let level = -1;
        if (dataElements[index].textContent) {
            const tcSplit = dataElements[index].textContent.split(' ');
            if (tcSplit.length > 1) {
                level = parseInt(tcSplit[1]);
            }
        } else {
            console.error('Helpers.parseFieldPokemonToolTip - could not load level because text was empty');
        }
        index++;

        // if the pokemon's happiness is less than max, skip the next index, since it will be a progress bar
        if (!dataElements[index].textContent ||
            !dataElements[index].textContent.startsWith('Happiness')) {
            index++;
        }

        // happiness
        let happiness = -1;
        if (dataElements[index].textContent) {
            const tcSplit = dataElements[index].textContent.split(' ');
            if (tcSplit.length > 1) {
                happiness = tcSplit[1].trim();
                happiness = (happiness == 'MAX') ? 100 : parseInt(happiness.substring(0, happiness.length - 1));
            }
        } else {
            console.error('Helpers.parseFieldPokemonToolTip - could not load happiness because text was empty');
        }
        index++;

        // nature
        let nature = -1;
        if (dataElements[index].textContent) {
            const tcSplit = dataElements[index].textContent.split(' ');
            if (tcSplit.length > 1) {
                nature = tcSplit[1].replace('(', '').trim();
                nature = GLOBALS.NATURE_LIST.indexOf(nature); // .substring(0, nature.length-1))
            }
        } else {
            console.error('Helpers.parseFieldPokemonToolTip - could not load nature because text was empty');
        }
        index++;

        // held item
        let item = '';
        if (dataElements[index].textContent !== 'Item: None') {
            item = dataElements[index].textContent.substring(dataElements[8].textContent.indexOf(' ') + 1);
        } else {
            item = 'None';
        }
        index++;

        // egg groups
        let eggGroups = [];
        if (dataElements[index].textContent) {
            eggGroups = dataElements[index].textContent.substring('Egg Group: '.length).split('/');
        }
        else {
            console.error('Helpers.parseFieldPokemonToolTip - could not load egg groups because text was empty');
        }
        index++;

        const ret = {
            'nickname': nickname,
            'species': species,
            'types': types,
            'level': level,
            'happiness_percent': happiness,
            'nature': nature,
            'item': item,
            'eggGroups': eggGroups,
        };
        if (forme !== '') {
            ret.forme = forme;
        }
        return ret;
    } // parseFieldPokemonToolTip
    static getPokemonImageClass() {
        // this seems like PFQ's threshold based on my experimentation
        if (window.innerWidth >= 650 && window.innerHeight >= 650) {
            return 'big';
        } else {
            return 'small';
        }
    }
    // returns true if the page is equal to or smaller to the given size class
    // mobile cutoff (point when header changes): "mq2"
    static detectPageSize(size) {
        return $('html').hasClass(size);
    }
}

class InteractionsPage extends Page {
  constructor(localStorageMgr, helpers, GLOBALS) {
      super(localStorageMgr, helpers, GLOBALS.INTERACTIONS_PAGE_SETTINGS_KEY, {}, 'interactions');
  } // constructor

  setupHTML() {
    // add 50 clickback link to sent interactions section
    let names = "";
    let lists = document.getElementsByClassName('userlist');
    let lastList = lists[lists.length-1];
    if(lastList.parentElement.previousElementSibling.innerText == "Sent"){
      let nameElements = lastList.childNodes;
      let overFifty = false;
      for(let i=0; i<nameElements.length; i++){
        if(i>=50){
          overFifty = true;
          break;
        }
        if(i!=0){
          names+=",";
        }
        let userUrl = nameElements[i].lastChild.href;
        let name = userUrl.split("/user/")[1];
        names+=name;
      }
      let url = "https://pokefarm.com/users/"+names;
      let newP = document.createElement("p");
      let newLink = document.createElement("a");
      newLink.href = url;
      if(overFifty){
        newLink.innerText = "Open top 50 users";
      }
      else{
        newLink.innerText = "Open all users";
      }
      newP.appendChild(newLink);
      lastList.parentNode.insertBefore(newP,lastList);
    }
  }
}


class LabPage extends Page {
    constructor(localStorageMgr, helpers, GLOBALS) {
        super(localStorageMgr, helpers, GLOBALS.LAB_PAGE_SETTINGS_KEY, {
            findLabEgg: '', // same as findCustom in shelter
            customEgg: true,
            findLabType: '', // same as findType in shelter
            findTypeEgg: true,
        }, 'lab');
        this.searchArray = [];
        this.typeArray = [];
        this.globals = GLOBALS;
        const obj = this;
        this.observer = new MutationObserver(function (mutations) {
            // eslint-disable-next-line no-unused-vars
            mutations.forEach(function (mutation) {
                obj.customSearch();
            });
        });
    }

    setupHTML(GLOBALS) {
        document.querySelector('#eggsbox360>p.center').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.labOptionsHTML);
        document.querySelector('#egglist').insertAdjacentHTML('afterend', '<div id="labsuccess"></div>');

        const theField = Helpers.textSearchDiv('numberDiv', 'findLabEgg', 'removeLabSearch', 'searchArray');
        const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'findLabType', GLOBALS.TYPE_OPTIONS,
            'removeLabTypeList', 'labTypes', 'typeArray');

        this.searchArray = this.settings.findLabEgg.split(',');
        this.typeArray = this.settings.findLabType.split(',');

        Helpers.setupFieldArrayHTML(this.searchArray, 'searchkeys', theField, 'numberDiv');
        Helpers.setupFieldArrayHTML(this.typeArray, 'labTypes', theType, 'typeNumber');
    }
    setupCSS() {
        //lab css
        const labSuccessCss = $('#labpage>div').css('background-color');
        $('#labsuccess').css('background-color', labSuccessCss);
    }
    setupObserver() {
        this.observer.observe(document.querySelector('#labpage>div>div>div'), {
            childList: true,
            characterdata: true,
            subtree: true,
            characterDataOldValue: true,
        });
    }
    setupHandlers(GLOBALS) {
        const obj = this;
        $(document).on('click', '#addLabSearch', (function () { //add lab text field
            obj.addTextField();
        }));

        $(document).on('click', '#removeLabSearch', (function () { //remove lab text field
            obj.removeTextField(this, $(this).parent().find('input').val());
            obj.saveSettings();
        }));

        $(document).on('click', '#addLabTypeList', (function () { //add lab type list
            obj.addTypeList(GLOBALS);
        }));

        $(document).on('click', '#removeLabTypeList', (function () { //remove lab type list
            obj.removeTypeList(this, $(this).parent().find('select').val());
            obj.saveSettings();
        }));

        $(document).on('change', '#labCustomSearch input', (function () { //lab search
            obj.customSearch(GLOBALS);
        }));

        $(document).on('click', '#labpage', (function () { //shelter search
            obj.customSearch(GLOBALS);
        }));

        $(document).on('input', '.qolsetting', (function () { //Changes QoL settings
            obj.settingsChange(this.getAttribute('data-key'),
                $(this).val(),
                $(this).parent().parent().attr('class'),
                $(this).parent().attr('class'),
                (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
            obj.customSearch(GLOBALS);
            obj.saveSettings();
        }));

        $(window).on('load', (function () {
            obj.loadSettings();
            obj.customSearch(GLOBALS);
        }));
    }
    addTextField() {
        const theField = Helpers.textSearchDiv('numberDiv', 'findLabEgg', 'removeLabSearch', 'searchArray');
        const numberDiv = $('#searchkeys>div').length;
        $('#searchkeys').append(theField);
        $('.numberDiv').removeClass('numberDiv').addClass('' + numberDiv + '');
    }
    removeTextField(byebye, key) {
        // when textfield is removed, the value will be deleted from the localstorage
        this.searchArray = $.grep(this.searchArray, function (value) {
            return value != key;
        });
        this.settings.findCustom = this.searchArray.toString();

        $(byebye).parent().remove();

        for (let i = 0; i < $('#searchkeys>div').length; i++) {
            const rightDiv = i + 1;
            $('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }
    }
    addTypeList(GLOBALS) {
        const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'findLabType', GLOBALS.TYPE_OPTIONS,
            'removeLabTypeList', 'labTypes', 'typeArray');
        const numberTypes = $('#labTypes>div').length;
        $('#labTypes').append(theType);
        $('.typeNumber').removeClass('typeNumber').addClass('' + numberTypes + '');
    }
    removeTypeList(byebye, key) {
        this.typeArray = $.grep(this.typeArray, function (value) {
            return value != key;
        });
        this.settings.findType = this.typeArray.toString();

        $(byebye).parent().remove();

        for (let i = 0; i < $('#labTypes>div').length; i++) {
            const rightDiv = i + 1;
            $('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }
    }
    getTypesForEgg(searchPokemon) {
        const dexData = this.globals.DEX_DATA;
        const searchPokemonIndex = dexData.indexOf('"' + searchPokemon + '"');
        return [dexData[searchPokemonIndex + 1], dexData[searchPokemonIndex + 2]];
    }
    searchForEggsMatchingTypes() {
        const GLOBALS = this.globals;
        const obj = this;
        const enabled = ((this.settings.findTypeEgg === true) &&
            (!(this.typeArray.length == 1 && this.typeArray[0] == '')));
        if (enabled) {
            const typesArrayNoEmptySpace = this.typeArray.filter(v => v != '');
            for (let i = 0; i < typesArrayNoEmptySpace.length; i++) {
                const value = typesArrayNoEmptySpace[i];
                const amountOfTypesFound = [];
                const typePokemonNames = [];

                $('#egglist>div>h3').each(function () {
                    const searchPokemon = $(this).text().split(' ')[0];
                    const [searchTypeOne, searchTypeTwo] = obj.getTypesForEgg(searchPokemon);
                    if (searchTypeOne === value) {
                        amountOfTypesFound.push('found');
                        typePokemonNames.push(searchPokemon);
                    }

                    if (searchTypeTwo === value) {
                        amountOfTypesFound.push('found');
                        typePokemonNames.push(searchPokemon);
                    }
                }); // each

                const foundType = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(value) + 2];

                const typeImgStandOutLength = typePokemonNames.length;
                for (let o = 0; o < typeImgStandOutLength; o++) {
                    const value = typePokemonNames[o];
                    const shelterImgSearch = $('#egglist>div>h3:containsIN(' + value + ')');
                    const shelterBigImg = shelterImgSearch.next();
                    $(shelterBigImg).addClass('labfoundme');
                }

                if (amountOfTypesFound.length > 1) {
                    document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + amountOfTypesFound.length + ' ' + foundType + ' egg types found! (' + typePokemonNames.toString() + ')</div>');
                } else if (amountOfTypesFound.length == 1) {
                    document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + amountOfTypesFound.length + ' ' + foundType + ' egg type found! (' + typePokemonNames.toString() + ')</div>');
                }
            } // for
        } // if
    }
    searchForEggsMatchingCustom() {
        if (!(this.searchArray.length == 1 && this.searchArray[0] == '')) {
            if (this.settings.customEgg === true) {
                const searchArrayNoEmptySpace = this.searchArray.filter(v => v != '');
                for (let i = 0; i < searchArrayNoEmptySpace.length; i++) {
                    const value = searchArrayNoEmptySpace[i];
                    if ($('#egglist>div>h3:containsIN(' + value + ')').length) {
                        const searchResult = value;

                        const shelterImgSearch = $('#egglist>div>h3:containsIN(' + value + ')');
                        const shelterBigImg = shelterImgSearch.next();
                        $(shelterBigImg).addClass('labfoundme');

                        if ($('#egglist>div>h3:containsIN(' + value + ')').length > 1) {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                        } else {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                        }
                    } // if

                    if ($('#egglist>div img[src*="' + value + '"]').length) {
                        const searchResult = $('#egglist>div img[src*="' + value + '"]').prev().text();

                        const shelterImgSearch = $('#egglist>div img[src*="' + value + '"]');
                        $(shelterImgSearch).addClass('labfoundme');

                        if ($('#egglist>div img[src*="' + value + '"]').length > 1) {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                        } else {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                        }
                    } // if
                } // for
            } // if
        } // else
    }
    customSearch() {
        document.querySelector('#labsuccess').innerHTML = '';
        $('#egglist>div>img').removeClass('labfoundme');

        this.searchForEggsMatchingTypes();
        this.searchForEggsMatchingCustom();
    }
}

class LocalStorageManager {
    constructor(keyPrefix, storage, helpers) {
        this.keyPrefix = keyPrefix;
        this.storage = storage;
        this.helpers = helpers;
    }
    /**
     * This function helps users use the updated script without having to
     * clear their settings by looking for items in local storage that
     * start with 'QoL...' and moving the settings to the correct
     * translated local storage key
     */
    migrateSettings() {
        const newItems = {};
        const keysToRemove = [];
        // find the items that need to be replaced
        for (let i = 0, len = this.storage.length; i < len; ++i) {
            const match = this.storage.key(i).match(/^QoL.*/);
            if(match) {
                const oldKey = match.input;
                const newKey = this.translateKey(oldKey);
                newItems[newKey] = this.storage.getItem(oldKey);
                keysToRemove.push(oldKey);
            }
        }
        // remove the old style keys
        for(let j = 0; j < keysToRemove.length; j++) {
            this.storage.removeItem(keysToRemove[j]);
        }
        // add the new style keys
        for(const newKey in newItems) {
            this.storage.setItem(newKey, newItems[newKey]);
        }
    }
    translateKey(key) {
        return `${this.keyPrefix}.${key}`;
    }
    saveSettings(key, obj) {
        this.helpers.saveSettings(this.translateKey(key), obj);
    }
    loadSettings(KEY, DEFAULT, obj) {
        return this.helpers.loadSettings(this.translateKey(KEY), DEFAULT, obj);
    }
    getItem(key) {
        return this.storage.getItem(this.translateKey(key));
    }
    setItem(key, value) {
        this.storage.setItem(this.translateKey(key), value);
    }
    removeItem(key) {
        this.storage.removeItem(this.translateKey(key));
    }

    /*
     * Set GLOBALS.DEX_DATA and GLOBALS.DEX_UPDATE_DATE from the QoLPokedex data stored in localStorage
     * Inputs:
     * - globals - reference to the GLOBALS settings object
     */
    loadDexIntoGlobalsFromStorage(globals) {
        const key = this.translateKey(globals.POKEDEX_DATA_KEY);
        if(this.storage.getItem(key) === null) {
            return false;
        }
        if(Object.keys(JSON.parse(this.storage.getItem(key))).length === 0) {
            return false;
        }

        const dateAndDex = JSON.parse(this.storage.getItem(key));
        // if QoLPokedex only contains date
        if((dateAndDex.length === 1) ||
           // or if the dex part of the array is empty
           (dateAndDex[1] === undefined) ||
            (dateAndDex[1] === null)) {
            return false;
        }

        globals.DEX_UPDATE_DATE = dateAndDex[0];
        const dex = dateAndDex.slice(1);
        globals.DEX_DATA = dex;
        return true;
    }

    updateLocalStorageDex(document, updateDate, globals) {
        let dateString = '';
        if(updateDate === undefined) {
            dateString = (new Date()).toUTCString();
        } else {
            dateString = updateDate;
        }
        const datePlusDex = [dateString].concat(globals.DEX_DATA);
        this.storage.setItem(this.translateKey(globals.POKEDEX_DATA_KEY), JSON.stringify(datePlusDex));
        $('.qolDate', document).val(dateString);
    }
}


class MultiuserPage extends Page {
    constructor(localStorageMgr, helpers, GLOBALS) {
        super(localStorageMgr, helpers, GLOBALS.MULTIUSER_PAGE_SETTINGS_KEY, {
            hideDislike: false,
            hideAll: false,
            niceTable: false,
        }, 'users/');
        const obj = this;
        this.observer = new MutationObserver(function (mutations) {
            // eslint-disable-next-line no-unused-vars
            mutations.forEach(function (mutation) {
                obj.partyModification();
            });
        });
    }

    settingsChange(element, textElement, customClass, typeClass, arrayName) {
        if (super.settingsChange(element, textElement, customClass, typeClass, arrayName) === false) {
            return false;
        }

        const mutuallyExclusive = ['hideAll', 'hideDislike', 'niceTable'];
        const idx = mutuallyExclusive.indexOf(element);
        if (idx > -1) {
            for (let i = 0; i < mutuallyExclusive.length; i++) {
                if (i !== idx) {
                    this.settings[mutuallyExclusive[i]] = false;
                }
            }
            return true;
        }
        else { return false; }
    }
    setupHTML(GLOBALS) {
        document.querySelector('#multiuser').insertAdjacentHTML('beforebegin', GLOBALS.TEMPLATES.partyModHTML);
    }
    setupCSS() {
        const menuBackground = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('background-color');
        $('#qolpartymod').css('background-color', '' + menuBackground + '');
        const menuColor = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('color');
        $('#qolpartymod').css('color', '' + menuColor + '');
    }
    setupObserver() {
        this.observer.observe(document.querySelector('#multiuser'), {
            childList: true,
            subtree: true,
        });
    }
    setupHandlers() {
        const obj = this;
        $(window).on('load', (function () {
            obj.loadSettings();
            obj.partyModification();
        }));

        let resizeTimer;
        $(window).resize(function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                obj.loadSettings();
                obj.partyModification();
            }, 100);
        });

        $(document).on('click input', '#qolpartymod', (function () {
            // the hide all option needs a delay like the resize timer to work when first clicked
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                obj.partyModification();
            }, 100);
        }));

        $(document).on('click', '.tabbed_interface', (function () {
            obj.partyModification();
        }));

        $(document).on('change', '.qolsetting', (function () {
            obj.loadSettings();
            obj.settingsChange(this.getAttribute('data-key'),
                $(this).val(),
                $(this).parent().parent().attr('class'),
                $(this).parent().attr('class'));
            obj.partyModification();
            obj.saveSettings();
        }));

        $('input.qolalone').on('change', function () { //only 1 checkbox may be true
            $('input.qolalone').not(this).prop('checked', false);
        });

    }
    partyModification() {
        // first, remove any existing selection
        const btns = '#multiuser .party>div .action a';
        $('#multiuser').removeClass('qolPartyHideDislike');
        $('#multiuser').removeClass('qolPartyNiceTable');
        $('#multiuser').removeClass('qolPartyHideAll');
        $(btns).css({"top":0,"left":0});;

        if (this.settings.hideDislike === true) {
            $('#multiuser').addClass('qolPartyHideDislike');
        }

        if (this.settings.niceTable === true) {
            $('#multiuser').addClass('qolPartyNiceTable');
        }

        if (this.settings.hideAll === true) {
            $('#multiuser').addClass('qolPartyHideAll');
            $(btns).css($('.mu_navlink.next').position());
        }
    }
}


class PagesManager {
    constructor(localStorageMgr, globals, HELPERS, SETTINGS) {
        this.localStorageMgr = localStorageMgr;
        this.GLOBALS = globals;
        this.HELPERS = HELPERS;
        this.SETTINGS = SETTINGS;
        this.pages = {
            'Daycare': {
                class: DaycarePage,
                object: undefined,
                setting: 'enableDaycare'
            },
            'Farm': {
                class: FarmPage,
                object: undefined,
                setting: 'easyEvolve'
            },
            'Fishing': {
                class: FishingPage,
                object: undefined,
                setting: 'fishingEnable'
            },
            'Lab': {
                class: LabPage,
                object: undefined,
                setting: 'labNotifier'
            },
            'Multiuser': {
                class: MultiuserPage,
                object: undefined,
                setting: 'partyMod'
            },
            'PrivateFields': {
                class: PrivateFieldsPage,
                object: undefined,
                setting: 'privateFieldEnable'
            },
            'PublicFields': {
                class: PublicFieldsPage,
                object: undefined,
                setting: 'publicFieldEnable'
            },
            'Shelter': {
                class: ShelterPage,
                object: undefined,
                setting: 'shelterEnable'
            },
            'Dex': {
                class: DexPage,
                object: undefined,
                setting: 'dexFilterEnable'
            },
            'Wishforge': {
                class: WishforgePage,
                object: undefined,
                setting: 'condenseWishforge'
            },
            'Interactions': {
                class: InteractionsPage,
                object: undefined,
                setting: 'interactionsEnable'
            },
            'Summary': {
                class: SummaryPage,
                object: undefined,
                setting: 'summaryEnable'
            }
        };
    }
    instantiatePages(QOLHUB) {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (QOLHUB.USER_SETTINGS[pg.setting] === true) {
                this.pages[key].object = new this.pages[key].class(this.localStorageMgr, this.HELPERS, this.GLOBALS, this.SETTINGS);
            }
        }
    }
    loadSettings(QOLHUB) {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (QOLHUB.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.loadSettings();
            }
        }
    }
    saveSettings(QOLHUB) {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (QOLHUB.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.saveSettings();
            }
        }
    }
    populateSettings(QOLHUB) {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (QOLHUB.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.populateSettings();
            }
        }
    }
    clearPageSettings(pageName) {
        if (!(pageName in this.pages)) {
            console.error(`Could not proceed with clearing page settings. Page ${pageName} not found in list of pages`);
        } else if (this.pages[pageName].object) {
            this.pages[pageName].object.resetSettings();
        }
    }
    clearAllPageSettings() {
        for(var pageName in this.pages) {
            this.clearPageSettings(pageName);
        }
    }
    setupHTML(GLOBALS, QOLHUB) {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (QOLHUB.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.setupHTML(GLOBALS);
            }
        }
    }
    setupCSS(QOLHUB) {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (QOLHUB.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.setupCSS();
            }
        }
    }
    setupObservers(QOLHUB) {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (QOLHUB.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.setupObserver();
            }
        }
    }
    setupHandlers(GLOBALS, QOLHUB) {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (QOLHUB.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.setupHandlers(GLOBALS);
            }
        }
    }
}

// eslint-disable-next-line no-unused-vars
class PFQoL {
  constructor() {
      // :contains to case insensitive
      $.extend($.expr[':'], {
          // eslint-disable-next-line no-unused-vars
          'containsIN': function (elem, i, match, array) {
              return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || '').toLowerCase()) >= 0;
          }
      });

      this.HELPERS = new Helpers();
      this.LOCAL_STORAGE_MANAGER = new LocalStorageManager($.USERID, localStorage, this.HELPERS);
      this.LOCAL_STORAGE_MANAGER.migrateSettings();

      this.SETTINGS = new UserSettings();
      this.GLOBALS = new Globals(this.LOCAL_STORAGE_MANAGER, this.HELPERS);
      this.PAGES = new PagesManager(this.LOCAL_STORAGE_MANAGER, this.GLOBALS, this.HELPERS, this.SETTINGS);
      this.QOLHUB = new QoLHub(this.LOCAL_STORAGE_MANAGER, this.HELPERS, this.GLOBALS, this.PAGES, this.SETTINGS);
      this.GLOBALS.fillTemplates();
      this.GLOBALS.fillOptionsLists();
      this.LOCAL_STORAGE_MANAGER.loadDexIntoGlobalsFromStorage(this.GLOBALS);

      this.init();
  }
  instantiatePages(obj) {
      obj.PAGES.instantiatePages(obj.QOLHUB);
  }
  loadSettings(obj) { // initial settings on first run and setting the variable settings key
      obj.QOLHUB.loadSettings();
      obj.PAGES.loadSettings(obj.QOLHUB);
  } // loadSettings
  saveSettings() { // Save changed settings
      this.QOLHUB.saveSettings();
      this.PAGES.saveSettings(this.QOLHUB);
  } // saveSettings
  populateSettingsPage(obj) { // checks all settings checkboxes that are true in the settings
      obj.QOLHUB.populateSettings();
      obj.PAGES.populateSettings(obj.QOLHUB);
  }
  addIcon(obj) { // inject the QoL icon into the icon bar
    // this is done separately from the main HTML to ensure it's always added first,
    // as there's a custom error handler that relies on it existing
    document.querySelector('#announcements li.spacer')
          .insertAdjacentHTML('beforebegin', obj.GLOBALS.TEMPLATES.qolHubLinkHTML);
  }
  setupHTML(obj) { // injects the HTML changes from GLOBALS.TEMPLATES into the site
      obj.PAGES.setupHTML(obj.GLOBALS, obj.QOLHUB);
  }
  setupCSS(obj) { // All the CSS changes are added here
      Helpers.addGlobalStyle(Resources.css());
      obj.PAGES.setupCSS(obj.QOLHUB);
      obj.QOLHUB.setupCSS();
  }
  setupObservers(obj) { // all the Observers that needs to run
      obj.PAGES.setupObservers(obj.QOLHUB);
  }
  setupHandlers(obj) { // all the event handlers
      $(document).on('click', 'li[data-name="QoL"]', (function () { //open QoL hub
          obj.QOLHUB.build(document);
          obj.populateSettingsPage(obj);
      }));
      obj.QOLHUB.setupHandlers();
      obj.PAGES.setupHandlers(obj.GLOBALS, obj.QOLHUB);
  }
  startup() { // All the functions that are run to start the script on Pokéfarm
      return {
          'adding QoL icon': this.addIcon,
          'creating Page handlers': this.instantiatePages,
          'loading Settings': this.loadSettings,
          'setting up HTML': this.setupHTML,
          'populating Settings': this.populateSettingsPage,
          'setting up CSS': this.setupCSS,
          'setting up Observers': this.setupObservers,
          'setting up Handlers': this.setupHandlers,
      };
  }
  init() { // Starts all the functions.
      console.log('Starting up ..');
      const startup = this.startup();
      for (const message in startup) {
          if (Object.hasOwnProperty.call(startup, message)) {
              console.log(message);
              startup[message](this, this.GLOBALS);
          }
      }
  }
}

class PrivateFieldsPage extends Page {
    constructor(localStorageMgr, helpers, GLOBALS, settings) {
        super(localStorageMgr, helpers, GLOBALS.PRIVATE_FIELDS_PAGE_SETTINGS_KEY, {
            fieldCustom: '',
            fieldType: '',
            fieldNature: '',
            fieldEggGroup: '',
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
            releaseSelectAll: true,
            /* tooltip settings */
            tooltipEnableMods: false,
            tooltipNoBerry: false,
            tooltipBerry: false,
        }, 'fields', settings);
        this.customArray = [];
        this.typeArray = [];
        this.natureArray = [];
        this.eggGroupArray = [];
        const obj = this;
        this.observer = new MutationObserver((mutations) => {
            // eslint-disable-next-line no-unused-vars
            mutations.forEach((mutation) => {
                obj.customSearch(GLOBALS);
                if(obj.globalSettings.privateFieldFeatureEnables.tooltip) {
                    obj.handleTooltipSettings();
                }
            });
        });
    }

    onPage(w) {
        return w.location.href.indexOf('fields') != -1 &&
            w.location.href.indexOf('fields/') == -1;
    }

    setupHTML(GLOBALS) {
        if(this.globalSettings.privateFieldFeatureEnables.search) {
            document.querySelector('#field_field').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.privateFieldSearchHTML);
            const theField = Helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray');
            const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS,
                'removePrivateFieldTypeSearch', 'fieldTypes', 'typeArray');
            const theNature = Helpers.selectSearchDiv('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS,
                'removePrivateFieldNature', 'natureTypes', 'natureArray');
            const theEggGroup = Helpers.selectSearchDiv('eggGroupNumber', 'eggGroups', 'fieldEggGroup', GLOBALS.EGG_GROUP_OPTIONS,
                'removePrivateFieldEggGroup', 'eggGroupTypes', 'eggGroupArray');
            this.customArray = this.settings.fieldCustom.split(',');
            this.typeArray = this.settings.fieldType.split(',');
            this.natureArray = this.settings.fieldNature.split(',');
            this.eggGroupArray = this.settings.fieldEggGroup.split(',');
            Helpers.setupFieldArrayHTML(this.customArray, 'searchkeys', theField, 'numberDiv');
            Helpers.setupFieldArrayHTML(this.typeArray, 'fieldTypes', theType, 'typeNumber');
            Helpers.setupFieldArrayHTML(this.natureArray, 'natureTypes', theNature, 'natureNumber');
            Helpers.setupFieldArrayHTML(this.eggGroupArray, 'eggGroupTypes', theEggGroup, 'eggGroupNumber');
        }

        if(this.globalSettings.privateFieldFeatureEnables.release) {
            /* nothing here */
        }

        if(this.globalSettings.privateFieldFeatureEnables.tooltip) {
            document.querySelector('#field_field').insertAdjacentHTML('beforebegin', GLOBALS.TEMPLATES.privateFieldTooltipModHTML);
            this.handleTooltipSettings();
        }

        if(this.globalSettings.privateFieldFeatureEnables.pkmnlinks) {
            SharedFieldsLib.addPkmnLinksPopup();
        }
    }
    setupCSS() {
        // same as public fields
        const fieldOrderCssColor = $('#field_field').css('background-color');
        const fieldOrderCssBorder = $('#field_field').css('border');
        $('#fieldorder').css('background-color', '' + fieldOrderCssColor + '');
        $('#fieldorder').css('border', '' + fieldOrderCssBorder + '');
        $('#fieldsearch').css('background-color', '' + fieldOrderCssColor + '');
        $('#tooltipenable').css('max-width', '600px');
        $('#tooltipenable').css('position', 'relative');
        $('#tooltipenable').css('margin', '16px auto');
        $('.collapsible').css('background-color', '' + fieldOrderCssColor + '');
        $('.collapsible').css('border', '' + fieldOrderCssBorder + '');
        $('.collapsible_content').css('background-color', '' + fieldOrderCssColor + '');

        $('.tooltiptext').css('background-color', $('.tooltip_content').eq(0).css('background-color'));
        $('.tooltiptext').css('border', '' + fieldOrderCssBorder + '');

        /*
         * Issue #47 - Since the default Pokefarm CSS for buttons does not use the same color
         * settings as most of the text on the site, manually set the text color for
         * '.collapsible' to match the text around it
         */
        $('.collapsible').css('color', $('#content').find('h1').eq(0).css('color'));
    }
    setupObserver() {
        this.observer.observe(document.querySelector('#field_field'), {
            childList: true,
            characterdata: true,
            subtree: true,
            characterDataOldValue: true,
        });
    }
    setupHandlers(GLOBALS) {
        const obj = this;
        $(window).on('load', (() => {
            obj.loadSettings();
            obj.customSearch(GLOBALS);
            if(obj.globalSettings.privateFieldFeatureEnables.tooltip) {
                obj.handleTooltipSettings();
            }
            obj.saveSettings();
        }));

        $(document).on('load', '.field', (function () {
            obj.customSearch(GLOBALS);
        }));

        if(obj.globalSettings.privateFieldFeatureEnables.release) {
            $(document).on('click', '*[data-menu="release"]', (function (e) { //select all feature
                e.stopPropagation();
                obj.releaseEnableReleaseAll();
            }));
            $(document).on('click', '*[data-menu="bulkmove"]', (function () { // select all feature
                obj.moveEnableReleaseAll();
            }));
        }

        if(obj.globalSettings.privateFieldFeatureEnables.search) {
            $(document).on('click', '#addPrivateFieldTypeSearch', (function (e) { //add field type list
                e.stopPropagation();
                obj.addSelectSearch('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS, 'removePrivateFieldTypeSearch', 'fieldTypes', 'typeArray');
                obj.customSearch(GLOBALS);
            }));

            $(document).on('click', '#removePrivateFieldTypeSearch', (function (e) { //remove field type list
                e.stopPropagation();
                obj.typeArray = obj.removeSelectSearch(obj.typeArray, this, $(this).parent().find('select').val(), 'fieldType', 'fieldTypes');
                obj.saveSettings();
                obj.customSearch(GLOBALS);
            }));

            $(document).on('click', '#addPrivateFieldNatureSearch', (function (e) { //add field nature search
                e.stopPropagation();
                obj.addSelectSearch('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS, 'removePrivateFieldNature', 'natureTypes', 'natureArray');
                obj.customSearch(GLOBALS);
            }));

            $(document).on('click', '#removePrivateFieldNature', (function (e) { //remove field nature search
                e.stopPropagation();
                obj.natureArray = obj.removeSelectSearch(obj.natureArray, this, $(this).parent().find('select').val(), 'fieldNature', 'natureTypes');
                obj.saveSettings();
                obj.customSearch(GLOBALS);
            }));

            $(document).on('click', '#addPrivateFieldEggGroupSearch', (function (e) { //add egg group nature search
                e.stopPropagation();
                obj.addSelectSearch('eggGroupNumber', 'eggGroups', 'fieldEggGroup', GLOBALS.EGG_GROUP_OPTIONS, 'removePrivateFieldEggGroup', 'eggGroupTypes', 'eggGroupArray');
                obj.customSearch(GLOBALS);
            }));

            $(document).on('click', '#removePrivateFieldEggGroup', (function (e) { //remove egg group nature search
                e.stopPropagation();
                obj.eggGroupArray = obj.removeSelectSearch(obj.eggGroupArray, this, $(this).parent().find('select').val(), 'fieldEggGroup', 'eggGroupTypes');
                obj.saveSettings();
                obj.customSearch(GLOBALS);
            }));

            $(document).on('click', '#addTextField', (function (e) {
                e.stopPropagation();
                obj.addTextField();
                obj.saveSettings();
            }));

            $(document).on('click', '#removeTextField', (function (e) {
                e.stopPropagation();
                obj.removeTextField(this, $(this).parent().find('input').val());
                obj.saveSettings();
                obj.customSearch(GLOBALS);
            }));
        }

        if(obj.globalSettings.privateFieldFeatureEnables.tooltip) {
            $('.tooltipsetting[data-key=tooltipEnableMods]').on('click', function () {
                obj.loadSettings();
                obj.handleTooltipSettings();
                obj.saveSettings();
            });

            $('.tooltipsetting[data-key=tooltipNoBerry]').on('click', function () {
                obj.loadSettings();
                obj.handleTooltipSettings();
                obj.saveSettings();
            });
        }

        $(document).on('change', '.qolsetting', (function () {
            obj.loadSettings();
            obj.customSearch(GLOBALS);
            obj.saveSettings();
        }));

        $(document).on('input', '.qolsetting', (function () { //Changes QoL settings
            obj.settingsChange(this.getAttribute('data-key'),
                $(this).val(),
                $(this).parent().parent().attr('class'),
                $(this).parent().attr('class'),
                (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
            obj.customSearch(GLOBALS);
            obj.saveSettings();
        }));

        $('.collapsible').on('click', function () {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    }
    handleTooltipSettings() {
        const obj = this;
        if ($('.tooltipsetting[data-key=tooltipEnableMods]').prop('checked')) {
            // make sure checkboxes are enabled
            $('.tooltipsetting[data-key=tooltipNoBerry]').prop('disabled', false);

            // use the correct setting to turn on the tooltips based on the berries
            if ($('.tooltipsetting[data-key=tooltipNoBerry]').prop('checked')) { obj.disableTooltips(); }
            else { obj.enableTooltips(); }
        } else {
            $('.tooltipsetting[data-key=tooltipNoBerry]').prop('disabled', true);
            // if tooltipNoBerry was checked before the mods were disabled, reenable the tooltips
            if ($('.tooltipsetting[data-key=tooltipNoBerry]').prop('checked')) {
                obj.enableTooltips();
            }
        }
    }
    disableTooltips() {
        $('#field_field>div.field>.fieldmon').removeAttr('data-tooltip').removeClass('tooltip_trigger');
    }
    enableTooltips() {
        $('#field_field>div.field>.fieldmon').attr('data-tooltip', '');
    }
    searchForImgTitle(GLOBALS, key) {
        const SEARCH_DATA = GLOBALS.SHELTER_SEARCH_DATA;
        const keyIndex = SEARCH_DATA.indexOf(key);
        const value = SEARCH_DATA[keyIndex + 1];
        const selected = $('img[title*="' + value + '"]');
        const cls = Helpers.getPokemonImageClass();
        if (selected.length) {
            // next line different from shelter
            const bigImg = selected.parent().parent().parent().parent().prev().children(`img.${cls}`);
            $(bigImg).addClass('privatefoundme');
        }
    }
    searchForCustomPokemon(value, male, female, nogender) {
        const genderMatches = [];
        if (male) { genderMatches.push('[M]'); }
        if (female) { genderMatches.push('[F]'); }
        if (nogender) { genderMatches.push('[N]'); }
        const cls = Helpers.getPokemonImageClass();

        if (genderMatches.length > 0) {
            for (let i = 0; i < genderMatches.length; i++) {
                const genderMatch = genderMatches[i];
                const selected = $('#field_field .tooltip_content:containsIN(' + value + ') img[title*=\'' + genderMatch + '\']');
                if (selected.length) {
                    const shelterBigImg = selected.parent().parent().parent().parent().prev().children(`img.${cls}`);
                    $(shelterBigImg).addClass('privatefoundme');
                }
            }
        }

        //No genders
        else {
            const selected = $('#field_field .tooltip_content:containsIN(' + value + ')');
            if (selected.length) {
                const shelterBigImg = selected.parent().parent().parent().parent().prev().children(`img.${cls}`);
                $(shelterBigImg).addClass('privatefoundme');
            }
        }

    }
    searchForCustomEgg(value) {
        const cls = Helpers.getPokemonImageClass();
        const selected = $('#field_field .tooltip_content:containsIN(' + value + '):contains("Egg")');
        if (selected.length) {
            const shelterBigImg = selected.parent().parent().parent().parent().prev().children(`img.${cls}`);
            $(shelterBigImg).addClass('privatefoundme');
        }
    }
    searchForCustomPng(value) {
        const selected = $('#field_field img[src*="' + value + '"]');
        if (selected.length) {
            const shelterImgSearch = selected;
            $(shelterImgSearch).addClass('privatefoundme');
        }
    }
    customSearch(GLOBALS) {
        if(this.globalSettings.privateFieldFeatureEnables.search) {
            const cls = Helpers.getPokemonImageClass();
            const bigImgs = document.querySelectorAll('.privatefoundme');
            if (bigImgs !== null) {
                bigImgs.forEach((b) => { $(b).removeClass('privatefoundme'); });
            }

            if (this.settings.fieldShiny === true) {
                this.searchForImgTitle(GLOBALS, 'findShiny');
            }
            if (this.settings.fieldAlbino === true) {
                this.searchForImgTitle(GLOBALS, 'findAlbino');
            }
            if (this.settings.fieldMelanistic === true) {
                this.searchForImgTitle(GLOBALS, 'findMelanistic');
            }
            if (this.settings.fieldPrehistoric === true) {
                this.searchForImgTitle(GLOBALS, 'findPrehistoric');
            }
            if (this.settings.fieldDelta === true) {
                this.searchForImgTitle(GLOBALS, 'findDelta');
            }
            if (this.settings.fieldMega === true) {
                this.searchForImgTitle(GLOBALS, 'findMega');
            }
            if (this.settings.fieldStarter === true) {
                this.searchForImgTitle(GLOBALS, 'findStarter');
            }
            if (this.settings.fieldCustomSprite === true) {
                this.searchForImgTitle(GLOBALS, 'findCustomSprite');
            }
            if (this.settings.fieldItem === true) {
            // pokemon that hold items will have HTML that matches the following selector
                const items = $('.tooltip_content .item>div>.tooltip_item');
                if (items.length) {
                    const itemBigImgs = items.parent().parent().parent().parent().prev().children(`img.${cls}`);
                    $(itemBigImgs).addClass('privatefoundme');
                }
            }
            const filteredTypeArray = this.typeArray.filter(v => v != '');
            const filteredNatureArray = this.natureArray.filter(v => v != '');
            const filteredEggGroupArray = this.eggGroupArray.filter(v => v != '');

            //loop to find all the types
            if (filteredTypeArray.length > 0 || filteredNatureArray.length > 0 || filteredEggGroupArray.length > 0) {
                $('.fieldmon').each(function () {
                    const searchPokemonBigImg = $(this)[0].childNodes[0];
                    const tooltipData = Helpers.parseFieldPokemonTooltip(GLOBALS, $(searchPokemonBigImg).parent().next()[0]);

                    const searchTypeOne = tooltipData.types[0] + '';
                    const searchTypeTwo = (tooltipData.types.length > 1) ? tooltipData.types[1] + '' : '';

                    const searchNature = GLOBALS.NATURE_LIST[tooltipData.nature];

                    const searchEggGroup = $(this).next().find('.fieldmontip').
                        children(':contains(Egg Group)').eq(0).text().slice('Egg Group: '.length);

                    for (let i = 0; i < filteredTypeArray.length; i++) {
                        if ((searchTypeOne === filteredTypeArray[i]) || (searchTypeTwo === filteredTypeArray[i])) {
                            $(searchPokemonBigImg).addClass('privatefoundme');
                        }
                    }

                    for (let i = 0; i < filteredNatureArray.length; i++) {
                        if (searchNature === GLOBALS.NATURE_LIST[filteredNatureArray[i]]) {
                            $(searchPokemonBigImg).addClass('privatefoundme');
                        }
                    }

                    for (let i = 0; i < filteredEggGroupArray.length; i++) {
                        const value = GLOBALS.EGG_GROUP_LIST[filteredEggGroupArray[i]];
                        if (searchEggGroup === value ||
                        searchEggGroup.indexOf(value + '/') > -1 ||
                        searchEggGroup.indexOf('/' + value) > -1) {
                            $(searchPokemonBigImg).addClass('privatefoundme');
                        }
                    }
                }); // each
            } // end

            // custom search
            for (let i = 0; i < this.customArray.length; i++) {
                const value = this.customArray[i];
                if (value != '') {
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
    }
    addSelectSearch(cls, name, dataKey, options, id, divParent, arrayName) {
        const theList = Helpers.selectSearchDiv(cls, name, dataKey, options, id, divParent, arrayName);
        const number = $(`#${divParent}>div`).length;
        $(`#${divParent}`).append(theList);
        $(`.${cls}`).removeClass(cls).addClass('' + number + '');
    }
    removeSelectSearch(arr, byebye, key, settingsKey, divParent) {
        arr = $.grep(arr, function (value) { return value != key; });
        this.settings[settingsKey] = arr.toString();

        $(byebye).parent().remove();

        for (let i = 0; i < $(`#${divParent}>div`).length; i++) {
            const rightDiv = i + 1;
            $('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }

        return arr;
    }
    addTextField() {
        const theField = Helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray');
        const numberDiv = $('#searchkeys>div').length;
        $('#searchkeys').append(theField);
        $('.numberDiv').removeClass('numberDiv').addClass('' + numberDiv + '');
    }
    removeTextField(byebye, key) {
        this.customArray = $.grep(this.customArray, function (value) {
            return value != key;
        });
        this.settings.fieldCustom = this.customArray.toString();

        $(byebye).parent().remove();

        let i;
        for (i = 0; i < $('#searchkeys>div').length; i++) {
            const rightDiv = i + 1;
            $('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }
    }
    releaseEnableReleaseAll() {
        if (this.settings.releaseSelectAll === true &&
            !$('#selectallfield').length) {
            const checkboxes = `<label id="selectallfield"><input id="selectallfieldcheckbox" type="checkbox">Select all</label> <label id="selectallfieldany"><input id="selectallfieldanycheckbox" type="checkbox">Select Any</label> <label id="selectallfieldsour"><input id="selectallfieldsourcheckbox" type="checkbox">Select Sour</label> <label id="selectallfieldspicy"><input id="selectallfieldspicycheckbox" type="checkbox">Select Spicy</label> <label id="selectallfielddry"><input id="selectallfielddrycheckbox" type="checkbox">Select Dry</label> <label id="selectallfieldsweet"><input id="selectallfieldsweetcheckbox" type="checkbox">Select Sweet</label> <label id="selectallfieldbitter"><input id="selectallfieldbittercheckbox" type="checkbox">Select Bitter</label>`;
            $('.dialog>div>div>div>div>button').eq(0).after(checkboxes);
            $('#selectallfieldcheckbox').click(function () {
                $('#massreleaselist>ul>li>label>input').not(this).prop('checked', this.checked);
            });

            $('#selectallfieldanycheckbox').click(function () {
                const selectAny = $('.icons:contains("Any")').prev().prev().prev('input');
                $(selectAny).not(this).prop('checked', this.checked);
            });

            $('#selectallfieldsourcheckbox').click(function () {
                const selectSour = $('.icons:contains("Sour")').prev().prev().prev('input');
                $(selectSour).not(this).prop('checked', this.checked);
            });

            $('#selectallfieldspicycheckbox').click(function () {
                const selectSpicy = $('.icons:contains("Spicy")').prev().prev().prev('input');
                $(selectSpicy).not(this).prop('checked', this.checked);
            });

            $('#selectallfielddrycheckbox').click(function () {
                const selectDry = $('.icons:contains("Dry")').prev().prev().prev('input');
                $(selectDry).not(this).prop('checked', this.checked);
            });

            $('#selectallfieldsweetcheckbox').click(function () {
                const selectSweet = $('.icons:contains("Sweet")').prev().prev().prev('input');
                $(selectSweet).not(this).prop('checked', this.checked);
            });

            $('#selectallfieldbittercheckbox').click(function () {
                const selectBitter = $('.icons:contains("Bitter")').prev().prev().prev('input');
                $(selectBitter).not(this).prop('checked', this.checked);
            });
        } // if
    } // releaseAll
    moveEnableReleaseAll() {
        if (this.settings.releaseSelectAll === true &&
            !$('#movefieldselectall').length) {
            const checkboxes = `<label id="movefieldselectall"><input id="movefieldselectallcheckbox" type="checkbox">Select all</label> <label id="movefieldselectany"><input id="movefieldselectanycheckbox" type="checkbox">Select Any</label> <label id="movefieldselectsour"><input id="movefieldselectsourcheckbox" type="checkbox">Select Sour</label> <label id="movefieldselectspicy"><input id="movefieldselectspicycheckbox" type="checkbox">Select Spicy</label> <label id="movefieldselectdry"><input id="movefieldselectdrycheckbox" type="checkbox">Select Dry</label> <label id="movefieldselectsweet"><input id="movefieldselectsweetcheckbox" type="checkbox">Select Sweet</label> <label id="movefieldselectbitter"><input id="movefieldselectbittercheckbox" type="checkbox">Select Bitter</label>`;
            $('.dialog>div>div>div>div>button').eq(0).after(checkboxes);
            $('#movefieldselectallcheckbox').click(function () {
                $('#massmovelist>ul>li>label>input').not(this).prop('checked', this.checked);
            });

            $('#movefieldselectanycheckbox').click(function () {
                const selectAny = $('.icons:contains("Any")').prev().prev().prev('input');
                $(selectAny).not(this).prop('checked', this.checked);
            });

            $('#movefieldselectsourcheckbox').click(function () {
                const selectSour = $('.icons:contains("Sour")').prev().prev().prev('input');
                $(selectSour).not(this).prop('checked', this.checked);
            });

            $('#movefieldselectspicycheckbox').click(function () {
                const selectSpicy = $('.icons:contains("Spicy")').prev().prev().prev('input');
                $(selectSpicy).not(this).prop('checked', this.checked);
            });

            $('#movefieldselectdrycheckbox').click(function () {
                const selectDry = $('.icons:contains("Dry")').prev().prev().prev('input');
                $(selectDry).not(this).prop('checked', this.checked);
            });

            $('#movefieldselectsweetcheckbox').click(function () {
                const selectSweet = $('.icons:contains("Sweet")').prev().prev().prev('input');
                $(selectSweet).not(this).prop('checked', this.checked);
            });

            $('#movefieldselectbittercheckbox').click(function () {
                const selectBitter = $('.icons:contains("Bitter")').prev().prev().prev('input');
                $(selectBitter).not(this).prop('checked', this.checked);
            });
        } // if
    } // moveEnableReleaseAll
}

class PublicFieldsPage extends Page {
    constructor(localStorageMgr, helpers, GLOBALS, settings) {
        super(localStorageMgr, helpers, GLOBALS.PUBLIC_FIELDS_PAGE_SETTINGS_KEY, {
            fieldByBerry: false,
            fieldByMiddle: false,
            fieldByGrid: false,
            fieldClickCount: true,
            fieldCustom: '',
            fieldType: '',
            fieldNature: '',
            fieldEggGroup: '',
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
            fieldCustomItem: true, // unused
            fieldCustomPokemon: true,
            fieldCustomEgg: true,
            fieldCustomPng: false,
            fieldItem: true,
            /* tooltip settings */
            tooltipEnableMods: false,
            tooltipNoBerry: false,
            tooltipBerry: false,
        }, 'fields/', settings);
        this.customArray = [];
        this.typeArray = [];
        this.natureArray = [];
        this.eggGroupArray = [];
        const obj = this;
        this.observer = new MutationObserver(function(mutations) {
            // eslint-disable-next-line no-unused-vars
            mutations.forEach(function(mutation) {
                obj.customSearch(GLOBALS);
                if(obj.globalSettings.publicFieldFeatureEnables.tooltip) {
                    obj.handleTooltipSettings();
                }
            });
        });
    }

    settingsChange(element, textElement, customClass, typeClass, arrayName) {
        if(super.settingsChange(element, textElement, customClass, typeClass, arrayName) === false) {
            return false;
        }

        const mutuallyExclusive = ['fieldByBerry', 'fieldByMiddle', 'fieldByGrid'];
        const idx = mutuallyExclusive.indexOf(element);
        if(idx > -1) {
            for(let i = 0; i < mutuallyExclusive.length; i++) {
                if(i !== idx) {
                    this.settings[mutuallyExclusive[i]] = false;
                }
            }
            return true;
        }
        else { return false; }
    }

    setupHTML(GLOBALS) {
        if(this.globalSettings.publicFieldFeatureEnables.search) {
            document.querySelector('#field_field').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.fieldSearchHTML);
            const theField = Helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray');
            const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS,
                'removeFieldTypeSearch', 'fieldTypes', 'typeArray');
            const theNature = Helpers.selectSearchDiv('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS,
                'removeFieldNature', 'natureTypes', 'natureArray');
            const theEggGroup = Helpers.selectSearchDiv('eggGroupNumber', 'eggGroups', 'fieldEggGroup', GLOBALS.EGG_GROUP_OPTIONS,
                'removeFieldEggGroup', 'eggGroupTypes', 'eggGroupArray');
            this.customArray = this.settings.fieldCustom.split(',');
            this.typeArray = this.settings.fieldType.split(',');
            this.natureArray = this.settings.fieldNature.split(',');
            this.eggGroupArray = this.settings.fieldEggGroup.split(',');
            Helpers.setupFieldArrayHTML(this.customArray, 'searchkeys', theField, 'numberDiv');
            Helpers.setupFieldArrayHTML(this.typeArray, 'fieldTypes', theType, 'typeNumber');
            Helpers.setupFieldArrayHTML(this.natureArray, 'natureTypes', theNature, 'natureNumber');
            Helpers.setupFieldArrayHTML(this.eggGroupArray, 'eggGroupTypes', theEggGroup, 'eggGroupNumber');
        }
        if(this.globalSettings.publicFieldFeatureEnables.sort) {
            document.querySelector('#field_field').insertAdjacentHTML('beforebegin', GLOBALS.TEMPLATES.fieldSortHTML);
        }
        if(this.globalSettings.publicFieldFeatureEnables.tooltip) {
            document.querySelector('#field_field').insertAdjacentHTML('beforebegin', GLOBALS.TEMPLATES.publicFieldTooltipModHTML);
            this.handleTooltipSettings();
        }

        if(this.globalSettings.publicFieldFeatureEnables.pkmnlinks) {
            SharedFieldsLib.addPkmnLinksPopup();
        }
    }
    setupCSS() {
        const fieldOrderCssColor = $('#field_field').css('background-color');
        const fieldOrderCssBorder = $('#field_field').css('border');
        $('#fieldorder').css('background-color', '' + fieldOrderCssColor + '');
        $('#fieldorder').css('border', '' + fieldOrderCssBorder + '');
        $('#fieldsearch').css('background-color', '' + fieldOrderCssColor + '');
        $('#tooltipenable').css('max-width', '600px');
        $('#tooltipenable').css('position', 'relative');
        $('#tooltipenable').css('margin', '16px auto');
        $('.collapsible').css('background-color', '' + fieldOrderCssColor + '');
        $('.collapsible').css('border', '' + fieldOrderCssBorder + '');
        $('.collapsible_content').css('background-color', '' + fieldOrderCssColor + '');

        $('.tooltiptext').css('background-color', $('.tooltip_content').eq(0).css('background-color'));
        $('.tooltiptext').css('border', '' + fieldOrderCssBorder + '');

        /*
         * Issue #47 - Since the default Pokefarm CSS for buttons does not use the same color
         * settings as most of the text on the site, manually set the text color for
         * '.collapsible' to match the text around it
         */
        $('.collapsible').css('color', $('#content').find('h1').eq(0).css('color'));
    }
    setupObserver() {
        this.observer.observe(document.querySelector('#field_field'), {
            childList: true,
            characterdata: true,
            subtree: true,
            characterDataOldValue: true,
        });
    }
    setupHandlers(GLOBALS) {
        const obj = this;
        $(window).on('load', (function() {
            obj.loadSettings();
            obj.customSearch(GLOBALS);
            if(obj.globalSettings.publicFieldFeatureEnables.tooltip) {
                obj.handleTooltipSettings();
            }
            obj.saveSettings();
        }));

        $(document).on('click input', '#fieldorder, #field_field, #field_berries, #field_nav', (function() { //field sort
            obj.customSearch(GLOBALS);
        }));

        document.addEventListener('keydown', function() {
            obj.customSearch(GLOBALS);
        });

        $(document).on('change', '.qolsetting', (function() {
            obj.loadSettings();
            obj.customSearch(GLOBALS);
            obj.saveSettings();
        }));

        $(document).on('input', '.qolsetting', (function() { //Changes QoL settings
            obj.settingsChange(this.getAttribute('data-key'),
                $(this).val(),
                $(this).parent().parent().attr('class'),
                $(this).parent().attr('class'),
                (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
            obj.customSearch(GLOBALS);
            obj.saveSettings();
        }));

        if(this.globalSettings.publicFieldFeatureEnables.search) {
            $(document).on('click', '#addFieldTypeSearch', (function() { //add field type list
                obj.addSelectSearch('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS, 'removeFieldTypeSearch', 'fieldTypes', 'typeArray');
                obj.customSearch(GLOBALS);
            }));

            $(document).on('click', '#removeFieldTypeSearch', (function() { //remove field type list
                obj.typeArray = obj.removeSelectSearch(obj.typeArray, this, $(this).parent().find('select').val(), 'fieldType', 'fieldTypes');
                obj.saveSettings();
                obj.customSearch(GLOBALS);
            }));

            $(document).on('click', '#addFieldNatureSearch', (function() { //add field nature search
                obj.addSelectSearch('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS, 'removeFieldNature', 'natureTypes', 'natureArray');
                obj.customSearch(GLOBALS);
            }));

            $(document).on('click', '#removeFieldNature', (function() { //remove field nature search
                obj.natureArray = obj.removeSelectSearch(obj.natureArray, this, $(this).parent().find('select').val(), 'fieldNature', 'natureTypes');
                obj.saveSettings();
                obj.customSearch(GLOBALS);
            }));

            $(document).on('click', '#addFieldEggGroupSearch', (function() { //add egg group nature search
                obj.addSelectSearch('eggGroupNumber', 'eggGroups', 'fieldEggGroup', GLOBALS.EGG_GROUP_OPTIONS, 'removeFieldEggGroup', 'eggGroupTypes', 'eggGroupArray');
                obj.customSearch(GLOBALS);
            }));

            $(document).on('click', '#removeFieldEggGroup', (function() { //remove egg group nature search
                obj.eggGroupArray = obj.removeSelectSearch(obj.eggGroupArray, this, $(this).parent().find('select').val(), 'fieldEggGroup', 'eggGroupTypes');
                obj.saveSettings();
                obj.customSearch(GLOBALS);
            }));

            $(document).on('click', '#addTextField', (function() {
                obj.addTextField();
                obj.saveSettings();
            }));

            $(document).on('click', '#removeTextField', (function() {
                obj.removeTextField(this, $(this).parent().find('input').val());
                obj.saveSettings();
                obj.customSearch(GLOBALS);
            }));
        }

        if(this.globalSettings.publicFieldFeatureEnables.sort) {
            $('input.qolalone').on('change', function() { //only 1 textbox may be true
                $('input.qolalone').not(this).prop('checked', false);
            });
        }

        if(this.globalSettings.publicFieldFeatureEnables.tooltip) {
            $('.collapsible').on('click', function() {
                this.classList.toggle('active');
                const content = this.nextElementSibling;
                if(content.style.display === 'block') {
                    content.style.display = 'none';
                } else {
                    content.style.display = 'block';
                }
            });

            $('#field_berries').on('click', function() {
                obj.loadSettings();
                obj.handleTooltipSettings();
            });

            $('.tooltipsetting[data-key=tooltipEnableMods]').on('click', function() {
                obj.loadSettings();
                obj.handleTooltipSettings();
                obj.saveSettings();
            });

            $('.tooltipsetting[data-key=tooltipNoBerry]').on('click', function() {
                obj.loadSettings();
                obj.handleTooltipSettings();
                obj.saveSettings();
            });

            $('.tooltipsetting[data-key=tooltipBerry]').on('click', function() {
                obj.loadSettings();
                obj.handleTooltipSettings();
                obj.saveSettings();
            });
        }

        // based on PFQ's code in fields_public.min.js
        $(window).on('keyup.field_shortcuts', function (a) {
            const k = $('#field_berries');
            if (0 == $(a.target).closest('input, textarea').length) {
                switch (a.keyCode) {
                case 49: // 1
                case 97: // Num-1
                    k.find('a').eq(0).trigger('click');
                    break;
                case 50: // 2
                case 98: // Num-2
                    k.find('a').eq(1).trigger('click');
                    break;
                case 51: // 3
                case 99: // Num-3
                    k.find('a').eq(2).trigger('click');
                    break;
                case 52: // 4
                case 100: // Num-4
                    k.find('a').eq(3).trigger('click');
                    break;
                case 53: // 5
                case 101: // Num-5
                    k.find('a').eq(4).trigger('click');
                }
            }
        });
    }
    // specific
    handleTooltipSettings() {
        const obj = this;
        if($('.tooltipsetting[data-key=tooltipEnableMods]').prop('checked')) {
            // make sure checkboxes are enabled
            $('.tooltipsetting[data-key=tooltipNoBerry]').prop('disabled', false);
            $('.tooltipsetting[data-key=tooltipBerry]').prop('disabled', false);

            // use the correct setting to turn on the tooltips based on the berries
            if($('#field_berries').hasClass('selected')) {
                if($('.tooltipsetting[data-key=tooltipBerry]').prop('checked')) { obj.disableTooltips(); }
                else { obj.enableTooltips(); }
            } else {
                if($('.tooltipsetting[data-key=tooltipNoBerry]').prop('checked')) { obj.disableTooltips(); }
                else { obj.enableTooltips(); }
            }
        } else {
            $('.tooltipsetting[data-key=tooltipNoBerry]').prop('disabled', true);
            $('.tooltipsetting[data-key=tooltipBerry]').prop('disabled', true);
            // if tooltipNoBerry was checked before the mods were disabled, reenable the tooltips
            if($('.tooltipsetting[data-key=tooltipNoBerry]').prop('checked')) {
                obj.enableTooltips();
            }
            // same for tooltipBerry
            if($('.tooltipsetting[data-key=tooltipBerry]').prop('checked')) {
                obj.enableTooltips();
            }
        }
    }
    disableTooltips() {
        $('#field_field>div.field>.fieldmon').removeAttr('data-tooltip').removeClass('tooltip_trigger');
    }
    enableTooltips() {
        $('#field_field>div.field>.fieldmon').attr('data-tooltip', '');
    }
    searchForImgTitle(GLOBALS, key) {
        const SEARCH_DATA = GLOBALS.SHELTER_SEARCH_DATA;
        const keyIndex = SEARCH_DATA.indexOf(key);
        const value = SEARCH_DATA[keyIndex + 1];
        const selected = $('img[title*="'+value+'"]');
        const cls = Helpers.getPokemonImageClass();
        if (selected.length) {
            // next line different from shelter
            const bigImg = selected.parent().parent().parent().parent().prev().children(`img.${cls}`);
            $(bigImg).addClass('publicfoundme');
        }
    }
    searchForCustomPokemon(value, male, female, nogender) {
        const genderMatches = [];
        if (male) { genderMatches.push('[M]'); }
        if(female) { genderMatches.push('[F]'); }
        if(nogender) { genderMatches.push('[N]'); }
        const cls = Helpers.getPokemonImageClass();

        if(genderMatches.length > 0) {
            for(let i = 0; i < genderMatches.length; i++) {
                const genderMatch = genderMatches[i];
                const selected = $('#field_field .tooltip_content:containsIN('+value+') img[title*=\'' + genderMatch + '\']');
                if (selected.length) {
                    const shelterBigImg = selected.parent().parent().parent().parent().prev().children(`img.${cls}`);
                    $(shelterBigImg).addClass('publicfoundme');
                }
            }
        }

        //No genders
        else {
            const selected = $('#field_field .tooltip_content:containsIN('+value+'):not(:containsIN("Egg"))');
            if (selected.length) {
                const shelterBigImg = selected.parent().parent().parent().parent().prev().children(`img.${cls}`);
                $(shelterBigImg).addClass('publicfoundme');
            }
        }

    }
    searchForCustomEgg(value) {
        const selected = $('#field_field .tooltip_content:containsIN('+value+'):contains("Egg")');
        const cls = Helpers.getPokemonImageClass();
        if (selected.length) {
            const shelterBigImg = selected.parent().parent().parent().parent().prev().children(`img.${cls}`);
            $(shelterBigImg).addClass('publicfoundme');
        }
    }
    searchForCustomPng(value) {
        const selected = $('#field_field img[src*="'+value+'"]');
        if (selected.length) {
            const shelterImgSearch = selected;
            $(shelterImgSearch).addClass('publicfoundme');
        }
    }
    customSearch(GLOBALS) {
        const obj = this;
        const cls = Helpers.getPokemonImageClass();

        $('.fieldmon').removeClass('qolSortBerry');
        $('.fieldmon').removeClass('qolSortMiddle');
        $('.field').removeClass('qolGridField');
        $('.fieldmon').removeClass('qolGridPokeSize');
        $('.fieldmon>img').removeClass('qolGridPokeImg');

        if(obj.globalSettings.publicFieldFeatureEnables.sort) {

            //////////////////// sorting ////////////////////
            if (this.settings.fieldByBerry === true) { //sort field by berries
                $('.fieldmon').removeClass('qolSortMiddle');
                $('.field').removeClass('qolGridField');
                $('.fieldmon').removeClass('qolGridPokeSize');
                $('.fieldmon>img').removeClass('qolGridPokeImg');

                $('.fieldmon').addClass('qolSortBerry');
                if($('#field_field [data-flavour*="any-"]').length) {
                    $('#field_field [data-flavour*="any-"]').addClass('qolAnyBerry');
                }
                if($('#field_field [data-flavour*="sour-"]').length) {
                    $('#field_field [data-flavour*="sour-"]').addClass('qolSourBerry');
                }
                if($('#field_field [data-flavour*="spicy-"]').length) {
                    $('#field_field [data-flavour*="spicy-"]').addClass('qolSpicyBerry');
                }
                if($('#field_field [data-flavour*="dry-"]').length) {
                    $('#field_field [data-flavour*="dry-"]').addClass('qolDryBerry');
                }
                if($('#field_field [data-flavour*="sweet-"]').length) {
                    $('#field_field [data-flavour*="sweet-"]').addClass('qolSweetBerry');
                }
                if($('#field_field [data-flavour*="bitter-"]').length) {
                    $('#field_field [data-flavour*="bitter-"]').addClass('qolBitterBerry');
                }
            }
            else if (this.settings.fieldByMiddle === true) { //sort field in the middle
                $('.fieldmon').addClass('qolSortMiddle');
            }
            else if (this.settings.fieldByGrid === true) { //sort field in a grid
                $('.field').addClass('qolGridField');
                $('.fieldmon').addClass('qolGridPokeSize');
                $('.fieldmon>img').addClass('qolGridPokeImg');
            }

            //Pokémon click counter
            if (this.settings.fieldClickCount === false) {
                $('#pokemonclickcount').remove();
            } else if (this.settings.fieldClickCount === true) {
                const pokemonFed = $('.fieldmon').map(function() { return $(this).attr('data-fed'); }).get();

                let pokemonClicked = 0;
                for (let i = 0; i < pokemonFed.length; i++) {
                    pokemonClicked += pokemonFed[i] << 0;
                }

                const pokemonInField = $('.fieldpkmncount').text();

                if ($('#pokemonclickcount').length === 0) {
                    document.querySelector('.fielddata').insertAdjacentHTML('beforeend','<div id="pokemonclickcount">'+pokemonClicked+' / '+pokemonInField+' Clicked</div>');
                } else if($('#pokemonclickcount').text() !== (pokemonClicked+' / '+pokemonInField+' Clicked')) {
                    $('#pokemonclickcount').text(pokemonClicked+' / '+pokemonInField+' Clicked');
                }

                if(pokemonInField !== '') {
                    if (JSON.stringify(pokemonClicked) === pokemonInField) {
                        $('#pokemonclickcount').css({
                            'color' : '#059121'
                        });
                    }
                    if (pokemonClicked !== JSON.parse(pokemonInField)) {
                        $('#pokemonclickcount').css({
                            'color' : '#a30323'
                        });
                    }
                }
            }
        }

        if(obj.globalSettings.publicFieldFeatureEnables.search) {
        /////////////////// searching ///////////////////
            const bigImgs = document.querySelectorAll('.publicfoundme');
            if(bigImgs !== null) {
                bigImgs.forEach((b) => {$(b).removeClass('publicfoundme');});
            }

            if(this.settings.fieldShiny === true) {
                this.searchForImgTitle(GLOBALS, 'findShiny');
            }
            if(this.settings.fieldAlbino === true) {
                this.searchForImgTitle(GLOBALS, 'findAlbino');
            }
            if(this.settings.fieldMelanistic === true) {
                this.searchForImgTitle(GLOBALS, 'findMelanistic');
            }
            if(this.settings.fieldPrehistoric === true) {
                this.searchForImgTitle(GLOBALS, 'findPrehistoric');
            }
            if(this.settings.fieldDelta === true) {
                this.searchForImgTitle(GLOBALS, 'findDelta');
            }
            if(this.settings.fieldMega === true) {
                this.searchForImgTitle(GLOBALS, 'findMega');
            }
            if(this.settings.fieldStarter === true) {
                this.searchForImgTitle(GLOBALS, 'findStarter');
            }
            if(this.settings.fieldCustomSprite === true) {
                this.searchForImgTitle(GLOBALS, 'findCustomSprite');
            }
            if(this.settings.fieldItem === true) {
            // pokemon that hold items will have HTML that matches the following selector
                const items = $('.tooltip_content .item>div>.tooltip_item');
                if(items.length) {
                    const itemBigImgs = items.parent().parent().parent().parent().prev().children(`img.${cls}`);
                    $(itemBigImgs).addClass('publicfoundme');
                }
            }

            const filteredTypeArray = this.typeArray.filter(v=>v!='');
            const filteredNatureArray = this.natureArray.filter(v=>v!='');
            const filteredEggGroupArray = this.eggGroupArray.filter(v=>v!='');

            //loop to find all the types
            if (filteredTypeArray.length > 0 || filteredNatureArray.length > 0 || filteredEggGroupArray.length > 0) {
                $('.fieldmon').each(function() {
                    const searchPokemonBigImg = $(this)[0].childNodes[0];
                    const tooltipData = Helpers.parseFieldPokemonTooltip(GLOBALS, $(searchPokemonBigImg).parent().next()[0]);

                    const searchTypeOne = tooltipData.types[0] + '';
                    const searchTypeTwo = (tooltipData.types.length > 1) ? tooltipData.types[1] + '': '';

                    const searchNature = GLOBALS.NATURE_LIST[tooltipData.nature];

                    const searchEggGroup = $(this).next().find('.fieldmontip').
                        children(':contains(Egg Group)').eq(0).text().slice('Egg Group: '.length);

                    for (let i = 0; i < filteredTypeArray.length; i++) {
                        if ((searchTypeOne === filteredTypeArray[i]) || (searchTypeTwo === filteredTypeArray[i])) {
                            $(searchPokemonBigImg).addClass('publicfoundme');
                        }
                    }

                    for (let i = 0; i < filteredNatureArray.length; i++) {
                        if(searchNature === GLOBALS.NATURE_LIST[filteredNatureArray[i]]) {
                            $(searchPokemonBigImg).addClass('publicfoundme');
                        }
                    }

                    for (let i = 0; i < filteredEggGroupArray.length; i++) {
                        const value = GLOBALS.EGG_GROUP_LIST[filteredEggGroupArray[i]];
                        if(searchEggGroup === value ||
                       searchEggGroup.indexOf(value + '/') > -1 ||
                       searchEggGroup.indexOf('/' + value) > -1) {
                            $(searchPokemonBigImg).addClass('publicfoundme');
                        }
                    }
                }); // each
            } // end

            // custom search
            for (let i = 0; i < this.customArray.length; i++) {
                const value = this.customArray[i];
                if (value != '') {
                //custom pokemon search
                    if (this.settings.fieldCustomPokemon === true) {
                        this.searchForCustomPokemon(value, this.settings.fieldMale,
                            this.settings.fieldFemale,
                            this.settings.fieldNoGender);
                    }

                    //custom egg
                    if (this.settings.fieldCustomEgg === true) {
                        this.searchForCustomEgg(value);
                    }

                    //imgSearch with Pokémon
                    if (this.settings.fieldCustomPng === true) {
                        this.searchForCustomPng(value);
                    }
                }
            }
        }
    } // customSearch
    addSelectSearch(cls, name, dataKey, options, id, divParent, arrayName) {
        const theList = Helpers.selectSearchDiv(cls, name, dataKey, options, id, divParent, arrayName);
        const number = $(`#${divParent}>div`).length;
        $(`#${divParent}`).append(theList);
        $(`.${cls}`).removeClass(cls).addClass(''+number+'');
    }
    removeSelectSearch(arr, byebye, key, settingsKey, divParent) {
        arr = $.grep(arr, function(value) { return value != key; });
        this.settings[settingsKey] = arr.toString();

        $(byebye).parent().remove();

        for(let i = 0; i < $(`#${divParent}>div`).length; i++) {
            const rightDiv = i + 1;
            $('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
        }

        return arr;
    }
    addTextField() {
        const theField = Helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray');
        const numberDiv = $('#searchkeys>div').length;
        $('#searchkeys').append(theField);
        $('.numberDiv').removeClass('numberDiv').addClass(''+numberDiv+'');
    }
    removeTextField(byebye, key) {
        this.customArray = $.grep(this.customArray, function(value) {
            return value != key;
        });
        this.settings.fieldCustom = this.customArray.toString();

        $(byebye).parent().remove();

        let i;
        for(i = 0; i < $('#searchkeys>div').length; i++) {
            const rightDiv = i + 1;
            $('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
        }
    }
}

/*
 * This class handles creating, removing, and handling the DOM object actions
 * for the QoL Hub.
 */
class QoLHub {
    constructor(localStorageMgr, HELPERS, GLOBALS, PAGES, SETTINGS) {
        this.localStorageMgr = localStorageMgr;
        this.HELPERS = HELPERS;
        this.GLOBALS = GLOBALS;
        this.PAGES = PAGES;
        this.SETTINGS_SAVE_KEY = GLOBALS.SETTINGS_SAVE_KEY;
        this.USER_SETTINGS = SETTINGS;
        this.LINKED_SETTINGS = this.USER_SETTINGS.LINKED_SETTINGS;
    }
    setupCSS() {
        //custom user css
        $('head').append('<style type="text/css">' + this.USER_SETTINGS.customCss + '</style>');
    }
    setupHandlers() {
        const obj = this;
        $('#qolcustomcss', document).on('keydown', function (e) {
            if (e.keyCode == 9 || e.which == 9) {
                e.preventDefault();
                const s = this.selectionStart;
                $(this).val(function (i, v) {
                    return v.substring(0, s) + '\t' + v.substring(this.selectionEnd);
                });
                this.selectionEnd = s + 1;
            }
        });

        $(document).on('input', '.qolhubsetting', (function () { //Changes QoL settings
            const dataKey = this.getAttribute('data-key');
            obj.settingsChange(this.getAttribute('data-key'),
                $(this).val(),
                $(this).parent().parent().attr('class'),
                $(this).parent().attr('class'),
                (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
            obj.handleLinkedSetting(dataKey);
        }));

        $(document).on('click', '.closeHub', (function () { //close QoL hub
            obj.close(document);
        }));

        $(document).on('click', '#resetPageSettings', (function () {
            const page = $(this).parent().find('select').val();
            obj.clearPageSettings(page);
        }));

        $(document).on('click', '#resetAllSettings', (function () {
            if(window.confirm('Are you sure? All settings, including your custom CSS, will be reset.')) {
                obj.clearAllSettings();
            }
        }))

        $(document).on('click', 'h3.slidermenu', (function () { //show hidden li in change log
            $(this).next().slideToggle();
        }));

        // Issue #61 - Item 6 - Remove the 'Cleared!' message so the user knows they can click it again
        $(document).on('mouseover', '#clearCachedDex', (function () {
            $('#clearCachedDex').next().remove();
        }));

        // Issue #61 - Item 6 - Add a 'Cleared!' message so the user knows that the clearing works
        $(document).on('click', '#clearCachedDex', (function () {
            obj.resetDex();
        }));

        $(document).on('click', '#qolErrorConsole', (function() {
            let consoleContent = $('#qolConsoleHolder').html();
            if(consoleContent.trim() == '') {
                consoleContent = '[ No errors to display ]';
            }
            $('#qolConsoleContent').html(consoleContent);
        }));
    }
    loadSettings() {
        if (this.localStorageMgr.getItem(this.SETTINGS_SAVE_KEY) === null) {
            this.saveSettings();
        } else {
            if(this.USER_SETTINGS.load(JSON.parse(this.localStorageMgr.getItem(this.SETTINGS_SAVE_KEY)))) {
                this.saveSettings();
            }
        }
    }
    clearAllSettings() {
        this.PAGES.clearAllPageSettings();
        this.USER_SETTINGS.setDefaults();
        this.saveSettings();
        location.reload(); 
    }
    saveSettings() {
        this.localStorageMgr.setItem(this.SETTINGS_SAVE_KEY, JSON.stringify(this.USER_SETTINGS));
    }
    populateSettings() {
        function populateSetting(object, key, self, oldKeys) {
            oldKeys = oldKeys || [];
            const _object = object[key];
            const newKeys = [...oldKeys, key];
            if (typeof _object === 'boolean') {
                const _key = newKeys.join('.');
                Helpers.toggleSetting(_key, _object, 'qolhubsetting');
            }
            else if (typeof _object === 'string') {
                const _key = newKeys.join('.');
                Helpers.toggleSetting(_key, _object, 'qolhubsetting');
            } else if (typeof _object === 'object') {
                for (const _key in _object) {
                    populateSetting(_object, _key, self, newKeys);
                }
            }
        }
        for (const key in this.USER_SETTINGS) {
            if (Object.hasOwnProperty.call(this.USER_SETTINGS, key)) {
                populateSetting(this.USER_SETTINGS, key, this);
            }
            this.handleLinkedSetting(key);
        }
    }
    settingsChange(element, textElement) {
        function getProperty( propertyName, object ) {
            const parts = propertyName.split( '.' );
            const length = parts.length;
            let property = object || this;

            for (let i = 0; i < length; i++ ) {
                if ( ! Object.hasOwnProperty.call(property, parts[i])) {
                    return null;
                }
                property = property[parts[i]];
            }
            return property;
        }

        function setProperty( propertyName, object, newValue) {
            const parts = propertyName.split('.');
            const first = parts[0];
            const rest = parts.slice(1);

            if ( !Object.hasOwnProperty.call(object, first)) {
                return false;
            }
            else if (rest.length == 0) {
                object[first] = newValue;
                return true;
            } else {
                return setProperty(rest.join('.'), object[first], newValue);
            }
        }

        const oldValue = getProperty(element, this.USER_SETTINGS);
        let newValue;
        if (oldValue !== undefined) { // userscript settings
            if (oldValue === false) {
                newValue = true;
            } else if (oldValue === true) {
                newValue = false;
            } else if (typeof oldValue === 'string') {
                newValue = textElement;
            }
            if(!setProperty(element, this.USER_SETTINGS, newValue)) {
                return false;
            } else {
                this.saveSettings();
                return true;
            }
        }
        return false;
    }
    clearPageSettings(pageName) {
        if (pageName !== 'None') { // "None" matches option in HTML
            this.PAGES.clearPageSettings(pageName);
        }
    }
    handleLinkedSetting(possibleManager) {
        const linkedSettingIndex = this.LINKED_SETTINGS.findIndex(ls => ls.manager === possibleManager);
        if(linkedSettingIndex > -1) {
            const managed = this.LINKED_SETTINGS[linkedSettingIndex].managed;
            const userSettings = this.USER_SETTINGS[managed];
            if($(`[data-key=${possibleManager}]`).prop('checked') === false) {
                for(const setting in userSettings) {
                    $(`[data-key="${managed}.${setting}"]`).prop('disabled', true);
                }
            } else {
                for(const setting in userSettings) {
                    $(`[data-key="${managed}.${setting}"]`).prop('disabled', false);
                }
            }
        }
    }
    build(document) {
        $('body', document).append(this.GLOBALS.TEMPLATES.qolHubHTML);
        $('#core', document).addClass('scrolllock');
        const qolHubCssBackgroundHead = $('.qolHubHead.qolHubSuperHead').css('background-color');
        const qolHubCssTextColorHead = $('.qolHubHead.qolHubSuperHead').css('color');
        const qolHubCssBackground = $('.qolHubTable').css('background-color');
        const qolHubCssTextColor = $('.qolHubTable').css('color');
        const qolHubDialogBorder = $('.dialog>div>div>div').css('border');
        $('.qolHubHead').css('background-color', qolHubCssBackgroundHead);
        $('.qolHubHead').css('color', qolHubCssTextColorHead);
        $('.qolChangeLogHead').css('background-color', qolHubCssBackgroundHead);
        $('.qolChangeLogHead').css('color', qolHubCssTextColorHead);
        $('.qolChangeLogHead').css('border', qolHubDialogBorder);
        $('.qolopencloselist.qolChangeLogContent').css('background-color', qolHubCssBackground);
        $('.qolopencloselist.qolChangeLogContent').css('color', qolHubCssTextColor);

        $('.qolAllSettings').css('border', qolHubDialogBorder);

        const customCss = this.USER_SETTINGS.customCss;

        if (customCss === '') {
            $('.textareahub textarea', document).val('#thisisanexample {\n    color: yellow;\n}\n\n.thisisalsoanexample {\n    background-color: blue!important;\n}\n\nhappycssing {\n    display: absolute;\n}');
        } else {
            $('.textareahub textarea', document).val(customCss);
        }

        const dexUpdateDate = (this.GLOBALS.DEX_UPDATE_DATE === null) ?
            'Not updated since installation' :
            this.GLOBALS.DEX_UPDATE_DATE;
        $('.qolDate', document).text(dexUpdateDate);
    }
    close(document) {
        $('.dialog', document).remove();
        $('#core', document).removeClass('scrolllock');
    }
    resetDex() {
        $('#clearCachedDex').next().remove();
        this.GLOBALS.DEX_UPDATE_DATE = null;
        this.GLOBALS.DEX_DATA = null;
        this.localStorageMgr.removeItem(this.GLOBALS.POKEDEX_DATA_KEY);
        $('#clearCachedDex').after('<span> Cleared!</span>');
    }
} // QoLHub

/**
 * This class is used to store CSS and HTML snippets that were previously loaded via Tampermonkey's '@resource' tool
 */
class Resources {
    static css() {
        return `#announcements li[data-name=QoL]{cursor:pointer}#labsuccess{text-align:center}#labfound{padding-top:20px}.boldp{font-weight:700}.collapsible{border-radius:6px;cursor:pointer;max-width:600px;padding:4px;position:relative;text-align:left;width:100%}.collapsible_content{display:none;overflow:hidden;padding:0 18px}.oneevolutionleft{background-color:#f36971;border-radius:100%;box-shadow:0 0 25px 15px #f36971}.twoevolutionleft{background-color:#6a6df2;border-radius:100%;box-shadow:0 0 25px 15px #6a6df2} `+
               `.qoltooltip_trigger{border-bottom:1px dotted #000;display:inline-block;position:relative}.tooltip .tooltiptext{border-radius:6px;bottom:125%;left:50%;margin-left:0;opacity:0;padding:5px 0;position:absolute;text-align:center;transition:opacity .3s;visibility:hidden;width:500px;z-index:1}.tooltip .tooltiptext:after{border-style:solid;border-width:5px;content:"";left:50%;margin-left:-5px;position:absolute;top:100%}.tooltip:hover .tooltiptext{opacity:1;visibility:visible}.customsearchtooltip{width:400px}#sheltersuccess{text-align:center}#shelterfound{padding-top:20px}.daycarefoundme,.labfoundme,.privatefoundme,.publicfoundme,.shelterfoundme{background-color:#d5e265;border-radius:100%;box-shadow:0 0 25px 15px #d5e265}.qolshelterareagrid{display:flex!important;display:grid!important;flex-direction:row;flex-flow:row wrap;grid-template-columns:repeat(6,1fr);grid-template-rows:repeat(5,70px);min-height:350px}.qolshelterareagridmq2{grid-template-rows:repeat(5,35px);min-height:175px}.qoltooltipgrid{bottom:0;position:absolute!important;transform:translateY(100%)}.qolpokemongrid{align-items:center;display:inline-block!important;display:inline-flex!important;flex:1 1 16%;justify-content:center;position:static!important} `+
               `#fieldorder{border-radius:4px;padding:4px}#fieldorder,#fieldsearch{margin:16px auto;max-width:600px;position:relative}.qolSortBerry{margin:-10px!important;top:45%!important;transition:none!important}.qolSortBerry>img.big{animation:none!important;padding:25px!important}.qolSortBerry.qolAnyBerry,.qolSortBerry.qolSourBerry{left:0!important}.qolSortBerry.qolSpicyBerry{left:20%!important}.qolSortBerry.qolDryBerry{left:40%!important}.qolSortBerry.qolSweetBerry{left:60%!important}.qolSortBerry.qolBitterBerry{left:80%!important}.mq2 .qolSortBerry{margin:-10px 2%!important;overflow:hidden;top:45%!important;transition:none!important;width:16%}.mq2 .qolSortBerry>img.small{animation:none!important;margin-left:-13px!important;padding:50%!important}.qolSortMiddle{left:40%!important;margin:-10px!important;top:35%!important;transition:none!important}.qolSortMiddle>img{animation:none!important;padding:40px!important}.qolGridField{display:flex!important;display:grid;flex-flow:row wrap;grid-template-columns:repeat(8,12.5%);grid-template-rows:repeat(5,69px);min-height:345px;padding-top:0!important}.mq25 .qolGridField{grid-template-rows:repeat(5,36px);min-height:180px}.qolGridPokeSize{align-items:center;display:inline-flex;flex:1 1 12.5%;justify-content:center;margin:0!important;position:static!important}.qolGridPokeImg{animation:none!important;max-height:70px;max-width:75px} `+
               `.qolHubSuperHead:first-child{border-top-left-radius:5px;border-top-right-radius:5px}.qolHubHead{margin:0;padding:4px;text-align:center}.qolAllSettings{vertical-align:top}.qolAllSettings,.qolChangeLog{border-top:none;height:100%;width:315px}.qolAllSettings>ul{list-style-type:none;padding:0;vertical-align:top}.qolHubTable{border-collapse:collapse;border-spacing:0;width:100%}.qolChangeLogList{margin:0;padding:4px;text-align:left;text-align:center}.qolChangeLogContent{display:none;list-style-type:disc}.expandlist{font-size:16px;list-style-type:none;text-align:center}.slidermenu{cursor:pointer}.qolChangeLogHead{margin:0}.closeHub{cursor:pointer;font-size:20px;margin:0 10px 0 0;text-align:right}.textareahub textarea{box-sizing:border-box;width:100%} `+
               `#qolpartymod{text-align:center}.qolPartyHideAll #partybox .party .action a,.qolPartyHideDislike #partybox .party .action a,.qolPartyNiceTable #partybox .party .action a{position:absolute;width:100%}.qolPartyHideAll #partybox .party .action .berrybuttons[data-up=bitter]>[data-berry=rawst],.qolPartyHideAll #partybox .party .action .berrybuttons[data-up=dry]>[data-berry=chesto],.qolPartyHideAll #partybox .party .action .berrybuttons[data-up=sour]>[data-berry=aspear],.qolPartyHideAll #partybox .party .action .berrybuttons[data-up=spicy]>[data-berry=cheri],.qolPartyHideAll #partybox .party .action .berrybuttons[data-up=sweet]>[data-berry=pecha],.qolPartyHideDislike #partybox .party .action .berrybuttons[data-up=bitter]>[data-berry=rawst],.qolPartyHideDislike #partybox .party .action .berrybuttons[data-up=dry]>[data-berry=chesto],.qolPartyHideDislike #partybox .party .action .berrybuttons[data-up=sour]>[data-berry=aspear],.qolPartyHideDislike #partybox .party .action .berrybuttons[data-up=spicy]>[data-berry=cheri],.qolPartyHideDislike #partybox .party .action .berrybuttons[data-up=sweet]>[data-berry=pecha],.qolPartyNiceTable #partybox .party .action .berrybuttons[data-up=bitter]>[data-berry=rawst],.qolPartyNiceTable #partybox .party .action .berrybuttons[data-up=dry]>[data-berry=chesto],.qolPartyNiceTable #partybox .party .action .berrybuttons[data-up=sour]>[data-berry=aspear],.qolPartyNiceTable #partybox .party .action .berrybuttons[data-up=spicy]>[data-berry=cheri],.qolPartyNiceTable #partybox .party .action .berrybuttons[data-up=sweet]>[data-berry=pecha]{z-index:99!important}.qolPartyHideAll #partybox .party>div>:not(.action),.qolPartyNiceTable #partybox .party>div>:not(.action){display:none}.qolPartyNiceTable #profilepage #partybox .party{box-shadow:none;width:250px}.qolPartyNiceTable #profilepage #partybox .party>div{border-radius:0;border-width:1px 1px 0;width:210px}.qolPartyNiceTable #profilepage #partybox .party>div:first-child{border-radius:6px 6px 0 0}.qolPartyNiceTable #profilepage #partybox .party>div:nth-child(6){border-bottom-width:1px;border-radius:0 0 6px 6px}.qolPartyHideAll #profilepage #partybox .party{box-shadow:none}.qolPartyHideAll #profilepage #partybox .party>div{background:transparent;border:none;height:0;padding:0;position:unset;width:0}.qolPartyHideAll #profilepage #partybox .party>div .action,.qolPartyHideAll #profilepage #partybox .party>div .action .berrybuttons{height:0;position:unset!important}.qolPartyHideAll #profilepage #partybox .party>div .action a{margin-left:10px;overflow:hidden;padding:3px;position:absolute;width:112px;z-index:1}.qolPartyHideAll #profilepage #partybox .party>div .action .berrybuttons a{border-radius:8px;padding:5px}.qolPartyHideAll #profilepage #partybox .party>div .action table{display:none}.qolPartyHideAll .compact-view-toggle+label{display:inline-block;margin:0 4px 8px}.qolPartyHideAll #profilebox,.qolPartyHideAll #trainerimage,.qolPartyHideAll .fieldslink,.qolPartyHideAll .tooltip_content,.qolPartyHideAll .working{display:none!important} `+
               `.badgelist>table>tbody>tr>td>.itemtooltip{margin-top:-28px;position:relative}.badgelist>table>tbody>tr>td>p{margin-block-end:0;margin-block-start:0}.qolBadges{border-collapse:collapse}.qolBadgesTop td{border-top:1px solid}.qolBadgesBot td:first-of-type img{margin-right:5px;vertical-align:middle} `;
    }

    static fieldSearchHTML() {
        return `<div id="fieldsearch"><button type="button" class="collapsible"><b>Advanced Field search</b></button><div class="collapsible_content"><p>Check the boxes of Pokemon you wish to find in this field! You can select multiple checkboxes at once and it will notify you whenever it will find the types of Pokemons you selected!</p><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldShiny">Shiny</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldAlbino">Albino</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldMelanistic">Melanistic</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldPrehistoric">Prehistoric</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldDelta">Delta</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldMega">Mega</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldStarter">Starter</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldCustomSprite">Custom Sprite</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldItem">Holds Item</label></td></tr></tbody></table><h4>Search on type</h4><p>Select which types of Pokemon you wish to find</p><input type="button" value="Add type" id="addFieldTypeSearch"><div id="fieldTypes"><div class="0"></div></div><h4>Search on nature</h4><p>Select which natures of Pokemon you wish to find</p><input type="button" value="Add nature" id="addFieldNatureSearch"><div id="natureTypes"><div class="0"></div></div><h4>Search on egg group</h4><p>Select which egg groups you wish to find</p><input type="button" value="Add egg group" id="addFieldEggGroupSearch"><div id="eggGroupTypes"><div class="0"></div></div><h4>Custom Search</h4><p>Here you can custom find any Pokemon you want! Hover over "Custom Search Help" for more info.</p><div class="tooltip_trigger qoltooltip_trigger">Custom Search Help</div><div class="tooltip_content customsearchtooltip"><span class="tooltiptext">Custom search by Pokemon name<br><br>Select Custom Egg and/or Custom Pokemon and type the name of the Pokemon you wish to find to find that Pokemon or the egg of that Pokemon. If you want to find a Pokemon with a specific gender, select the gender you wish to find.<br><br>Custom search by image code<br><br>Select By img code (and de-select Custom Egg & Custom Pokemon checkboxes) to find a Pokemon or egg by img code. For example you wish to find a Bulbasaur. When the URL for its image is this:<br>//pfq-static.com/img/pkmn/1/g/g.png/t=1474027727<br>paste only '1/g/g' (without the quotes), and now it will show you when a Bulbasaur is found! You may also copy the complete link.<br><a href="https://docs.google.com/spreadsheets/d/1rD1VZNTQRYXMOVKvGasjmMdMJu-iheE-ajsFkfs4QXA/edit?usp=sharing">List of Eggs Image Codes</a><br><br>More info on finding Pokemon with their img code:<br><br><a href="https://pokefarm.com/forum/thread/127552/Site-Skins-How-To-and-Helpful-CSS">"Pokemon Modifications - Make Shelter Pokemon Stand Out"</a></span></div><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldCustomEgg">Custom Egg</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldCustomPokemon">Custom Pokemon</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldCustomPng">By img code</label></td></tr></tbody></table><h4>Search on gender</h4><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldMale">Male</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldFemale">Female</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldNoGender">Genderless</label></td></tr></tbody></table><h4>Search Keys</h4><input type="button" value="Add searchfield" id="addTextField"><div id="searchkeys"><div class="0"></div></div></div></div>`;
    }

    static fieldSortHTML() {
        return `<div id="fieldorder"><label><input type="checkbox" class="qolsetting qolalone" data-key="fieldByBerry"> Sort by berries</label> <label><input type="checkbox" class="qolsetting qolalone" data-key="fieldByMiddle"> Sort in the middle</label> <label><input type="checkbox" class="qolsetting qolalone" data-key="fieldByGrid"> Align to grid</label> <label><input type="checkbox" class="qolsetting" data-key="fieldClickCount"> Click counter</label></div>`;
    }

    static labOptionsHTML() {
        return `<div id="labCustomSearch" class="center"><p class="boldp">Egg type search</p><p>Select which egg types you would like to find in the lab. You can select multiple!</p><input type="checkbox" class="qolsetting" data-key="findTypeEgg">Egg types <input type="button" value="Add typesearch" id="addLabTypeList"><div id="labTypes"><div class="0"></div></div><p class="boldp">Egg custom search</p><p>Add the pokemon name or Img code (complete link starting from //pfq..) that you would like to find in the lab in a searchfield. You can select multiple!</p><input type="checkbox" class="qolsetting" data-key="customEgg">Custom Egg <input type="button" value="Add searchfield" id="addLabSearch"><div id="searchkeys"><div class="0"></div></div></div>`;
    }

    static evolveFastHTML() {
        return `<ul class="qolEvolveTypeList"><li class="expandlist"><h3 class="slidermenu">Normal</h3><ul class="normal 0 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Fire</h3><ul class="Fire 1 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Water</h3><ul class="Water 2 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Electric</h3><ul class="Electric 3 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Grass</h3><ul class="Grass 4 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Ice</h3><ul class="Ice 5 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Fighting</h3><ul class="Fighting 6 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Poison</h3><ul class="Poison 7 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Ground</h3><ul class="Ground 8 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Flying</h3><ul class="Flying 9 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Psychic</h3><ul class="Psychic 10 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Bug</h3><ul class="Bug 11 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Rock</h3><ul class="Rock 12 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Ghost</h3><ul class="Ghost 13 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Dragon</h3><ul class="Dragon 14 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Dark</h3><ul class="Dark 15 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Steel</h3><ul class="Steel 16 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Fairy</h3><ul class="Fairy 17 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Unknown Types</h3><ul class="Unknown 18 qolChangeLogContent"></ul></li></ul>`;
    }

    static privateFieldSearchHTML() {
        return `<div id="fieldsearch"><button type="button" class="collapsible"><b>Advanced Field search</b></button><div class="collapsible_content"><p>Check the boxes of Pokemon you wish to find in this field! You can select multiple checkboxes at once and it will notify you whenever it will find the types of Pokemons you selected!</p><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldShiny">Shiny</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldAlbino">Albino</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldMelanistic">Melanistic</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldPrehistoric">Prehistoric</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldDelta">Delta</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldMega">Mega</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldStarter">Starter</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldCustomSprite">Custom Sprite</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldItem">Holds Item</label></td></tr></tbody></table><h4>Search on type</h4><p>Select which types of Pokemon you wish to find</p><input type="button" value="Add type" id="addPrivateFieldTypeSearch"><div id="fieldTypes"><div class="0"></div></div><h4>Search on nature</h4><p>Select which natures of Pokemon you wish to find</p><input type="button" value="Add nature" id="addPrivateFieldNatureSearch"><div id="natureTypes"><div class="0"></div></div><h4>Search on egg group</h4><p>Select which egg groups you wish to find</p><input type="button" value="Add egg group" id="addPrivateFieldEggGroupSearch"><div id="eggGroupTypes"><div class="0"></div></div><h4>Custom Search</h4><p>Here you can custom find any Pokemon you want! Hover over "Custom Search Help" for more info.</p><div class="tooltip_trigger qoltooltip_trigger">Custom Search Help</div><div class="tooltip_content customsearchtooltip"><span class="tooltiptext">Custom search by Pokemon name<br><br>Select Custom Egg and/or Custom Pokemon and type the name of the Pokemon you wish to find to find that Pokemon or the egg of that Pokemon. If you want to find a Pokemon with a specific gender, select the gender you wish to find.<br><br>Custom search by image code<br><br>Select By img code (and de-select Custom Egg & Custom Pokemon checkboxes) to find a Pokemon or egg by img code. For example you wish to find a Bulbasaur. You paste it's Img code in the search bar:<br>//pfq-static.com/img/pkmn/1/g/g.png/t=1474027727<br>and now it will show you when a Bulbasaur is found! Copy paste the complete link (starting from //) or you won't find anything.<br><br><a href="https://docs.google.com/spreadsheets/d/1rD1VZNTQRYXMOVKvGasjmMdMJu-iheE-ajsFkfs4QXA/edit?usp=sharing">List of Eggs Image Codes</a><br><br>More info on finding Pokemon with their img code:<br><br><a href="https://pokefarm.com/forum/thread/127552/Site-Skins-How-To-and-Helpful-CSS">"Pokemon Modifications - Make Shelter Pokemon Stand Out"</a></span></div><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="customEgg">Custom Egg</label></td><td><label><input type="checkbox" class="qolsetting" data-key="customPokemon">Custom Pokemon</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="customPng">By img code</label></td></tr></tbody></table><h4>Search on gender</h4><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldMale">Male</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldFemale">Female</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldNoGender">Genderless</label></td></tr></tbody></table><h4>Search Keys</h4><input type="button" value="Add searchfield" id="addTextField"><div id="searchkeys"><div class="0"></div></div></div></div>`;
    }

    static shelterOptionsHTML() {
        return `<div id="shelteroptionsqol"><p>Check the boxes of Pokemon you wish to find in the shelter! You can select multiple checkboxes at once and it will notify you whenever it will find the types of Pokemon you selected! Use the letter 'n' key to select and cycle through the Pokemon matched by the script.</p><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="findNewEgg">New Egg</label></td><td><label><input type="checkbox" class="qolsetting" data-key="findNewPokemon">New Pokemon</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="findShiny">Shiny</label></td><td><label><input type="checkbox" class="qolsetting" data-key="findAlbino">Albino</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="findMelanistic">Melanistic</label></td><td><label><input type="checkbox" class="qolsetting" data-key="findPrehistoric">Prehistoric</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="findDelta">Delta</label></td><td><label><input type="checkbox" class="qolsetting" data-key="findMega">Mega</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="findStarter">Starter</label></td><td><label><input type="checkbox" class="qolsetting" data-key="findCustomSprite">Custom Sprite</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="findLegendary">Legendary</label></td></tr></tbody></table><h4>Search on type</h4><p>Select which types of Pokemon and/or eggs you wish to find</p><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="findTypeEgg">Egg types</label></td><td><label><input type="checkbox" class="qolsetting" data-key="findTypePokemon">Pokemon types</label></td></tr></tbody></table><input type="button" value="Add typesearch" id="addShelterTypeList"><div id="shelterTypes"><div class="0"></div></div><h4>Custom Search</h4><p>Here you can custom find any Pokemon you want! Hover over "Custom Search Help" for more info.</p><div class="tooltip_trigger qoltooltip_trigger">Custom Search Help</div><div class="tooltip_content customsearchtooltip"><span class="tooltiptext">Custom search by Pokemon name<br><br>Select Custom Egg and/or Custom Pokemon and type the name of the Pokemon you wish to find to find that Pokemon or the egg of that Pokemon. If you want to find a Pokemon with a specific gender, select the gender you wish to find.<br><br>Custom search by image code<br><br>Select By img code (and de-select Custom Egg & Custom Pokemon checkboxes) to find a Pokemon or egg by img code. For example you wish to find a Bulbasaur. You paste it's Img code in the search bar:<br>//pfq-static.com/img/pkmn/1/g/g.png/t=1474027727<br>and now it will show you when a Bulbasaur is found! Copy paste the complete link (starting from //) or you won't find anything.<br><br><a href="https://docs.google.com/spreadsheets/d/1rD1VZNTQRYXMOVKvGasjmMdMJu-iheE-ajsFkfs4QXA/edit?usp=sharing">List of Eggs Image Codes</a><br><br>More info on finding Pokemon with their img code:<br><br><a href="https://pokefarm.com/forum/thread/127552/Site-Skins-How-To-and-Helpful-CSS">"Pokemon Modifications - Make Shelter Pokemon Stand Out"</a></span></div><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="customEgg">Custom Egg</label></td><td><label><input type="checkbox" class="qolsetting" data-key="customPokemon">Custom Pokemon</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="customPng">By img code</label></td></tr></tbody></table><h4>Search on Gender</h4><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="findMale">Male</label></td><td><label><input type="checkbox" class="qolsetting" data-key="findFemale">Female</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="findNoGender">Genderless</label></td></tr></tbody></table><h4>Search Keys</h4><input type="button" value="Add searchfield" id="addShelterTextfield"><div id="searchkeys"><div class="0"></div></div></div>`;
    }

    static qolHubHTML() {
        return `<div class="dialog"><div><div><div><h3 class="qolHubHead qolHubSuperHead">Quality of Life userscript Hub</h3><div><p>Welcome to the user hub of the QoL userscript! Here you can adjust the script settings and view the latest changes to the script.</p><div><table class="qolHubTable"><tbody><tr><td><h3 class="qolHubHead">Settings</h3></td></tr><tr><td class="qolAllSettings"><ul><li><label><input type="checkbox" class="qolhubsetting" data-key="enableDaycare"> <span>Highlight Breeding Matches</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="shelterEnable"> <span>Enable All Shelter QoL Features</span></label><ul><li><label><input type="checkbox" class="qolhubsetting" data-key="shelterFeatureEnables.search"> <span>Advanced Searching</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="shelterFeatureEnables.sort"> <span>Advanced Sorting</span></label></li></ul></li><li><label><input type="checkbox" class="qolhubsetting" data-key="fishingEnable"> <span>Fishing Multi-Select Controls</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="publicFieldEnable"> <span>Enable All Public Fields QoL Features</span></label><ul><li><label><input type="checkbox" class="qolhubsetting" data-key="publicFieldFeatureEnables.search"> <span>Advanced Searching</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="publicFieldFeatureEnables.sort"> <span>Advanced Sorting</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="publicFieldFeatureEnables.tooltip"> <span>Tooltips Enable/Disable</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="publicFieldFeatureEnables.pkmnlinks"> <span>Pokemon Link List</span></label></li></ul></li><li><label><input type="checkbox" class="qolhubsetting" data-key="privateFieldEnable"> <span>Enable All Private Fields QoL Features</span></label><ul><li><label><input type="checkbox" class="qolhubsetting" data-key="privateFieldFeatureEnables.search"> <span>Advanced Searching</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="privateFieldFeatureEnables.release"> <span>Multi-Select Controls (Move & Release)</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="privateFieldFeatureEnables.tooltip"> <span>Tooltips Enable/Disable</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="privateFieldFeatureEnables.pkmnlinks"> <span>Pokemon Link List</span></label></li></ul></li><li><label><input type="checkbox" class="qolhubsetting" data-key="partyMod"> <span>Party click mod</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="easyEvolve"> <span>Easy evolving</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="labNotifier"> <span>Lab Notifier</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="dexFilterEnable"> <span>Multiple Types Filtering</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="condenseWishforge"> <span>Smaller Crafted Badges List</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="interactionsEnable"> <span>Interactions page (sent multi-link)</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="summaryEnable"> <span>Summary page (pkmnpanel code)</span></label></li></ul><span><b>Note</b>: Please refresh the page to see any changes made to these settings take effect.</span></td></tr><tr><td><h3 class="qolHubHead">Change log</h3></td></tr><tr><td class="qolChangeLog"><ul class="qolChangeLogList"><li class="expandlist"><span>Change log was removed as of April 2021. Visit <a href="https://github.com/tarashia/PokeFarmQoL" target="_blank">GitHub</a> for the latest list of features</span></li></ul></td></tr><tr><td colspan="2" class="qolDexUpdate"><h3 class="qolHubHead">Pokedex Settings</h3></td></tr><tr id="qolDexUpdateRow"><td colspan="2" class="qolAllSettings"><span>Notice that you can't find the newly added Eggs or Pokemon in shelter? You may have to update your pokedex. Please visit the Dex page, and the Userscript will update itself with the newest pokemon. Then, in order to use the update, refresh the page where you are using the script's search features.</span><br><span>Date last updated:<span class="qolDate"></span></span></td></tr><tr id="qolDexClearRow"><td colspan="2"><input type="button" value="Clear Cached Dex" id="clearCachedDex"></td></tr><tr><td colspan="2" class="qolAllSettings"><h3 class="qolHubHead">Css Settings</h3></td></tr><tr><td colspan="2"><span>Add your custom CSS! If you have an error in your CSS you won't get notified, so read your code carefully. Still doesn't work? Try: '!important'. The custom CSS is being loaded after the page loads, so it's possible that there will be a short delay before your CSS changes apply. Note: LESS formatting is not supported; if you're copying LESS-formatted code from a guide, you should <a href="https://lesscss.org/less-preview/" target="_blank">convert it to plain CSS first.</a></span></td></tr><tr><td colspan="2" class="qolAllSettings"><div class="textareahub"><textarea id="qolcustomcss" rows="15" class="qolhubsetting" data-key="customCss"></textarea></div></td></tr><tr><td colspan="2" class="qolAllSettings"><h3 class="qolHubHead">Debugging Corner</h3></td></tr><tr id="qolDebuggingCornerRow"><td colspan="2" class="qolAllSettings"><span>Use these controls to reset the settings for a particular page back to its defaults</span><br><span><b>Page Select</b></span><!-- Option values correspond to keys in the PAGES object in the main script --> <select name="Page Select" class="qolHubResetSettingsSelect" data-key="resetPageSettings"><option value="None">None</option><option value="Daycare">Daycare</option><option value="Farm">Farm</option><option value="Fishing">Fishing</option><option value="Lab">Lab</option><option value="Multiuser">Multiuser</option><option value="PrivateFields">Private Fields</option><option value="PublicFields">Public Fields</option><option value="Shelter">Shelter</option></select> <input type="button" value="Reset Page Settings" id="resetPageSettings"> <input type="button" value="Reset ALL Settings" id="resetAllSettings"></td></tr><tr><td>Some QoL features may log problems or errors here. You may be asked about this when reporting bugs. <input type="button" value="View errors" id="qolErrorConsole"><ul id="qolConsoleContent"></ul></td></tr></tbody></table></div></div><p class="closeHub">Close</p></div></div></div></div>`;
    }

    static publicFieldTooltipModHTML() {
        return `<div id="tooltipenable"><button type="button" class="collapsible"><b>Tooltip Settings</b></button><div class="collapsible_content"><span>The "Enable tooltip" settings force the tooltip on or off. To revert back to Pokefarm's default tooltip settings, uncheck "Enable QoL Tooltip Changes" and refresh the page.</span><hr><table><tr><td><label><input type="checkbox" class="qolsetting tooltipsetting" data-key="tooltipEnableMods"> Enable QoL Tooltip Settings</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting tooltipsetting" data-key="tooltipNoBerry"> Hide tooltip<br>(No berry selected)</label></td><td><label><input type="checkbox" class="qolsetting tooltipsetting" data-key="tooltipBerry"> Hide tooltip<br>(Berry selected)</label></td></tr></table></div></div>`;
    }

    static privateFieldTooltipModHTML() {
        return `<div id="tooltipenable"><button type="button" class="collapsible"><b>Tooltip Settings</b></button><div class="collapsible_content"><span>The "Enable tooltip" settings force the tooltip on or off. To revert back to Pokefarm's default tooltip settings, uncheck "Enable QoL Tooltip Changes" and refresh the page.</span><hr><table><tr><td><label><input type="checkbox" class="qolsetting tooltipsetting" data-key="tooltipEnableMods"> Enable QoL Tooltip Settings</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting tooltipsetting" data-key="tooltipNoBerry"> Hide tooltip</label></td></tr></table></div></div>`;
    }
}

// Shared functions for the publicFieldsPage/privateFieldsPage
class SharedFieldsLib {
  static addPkmnLinksPopup() {
    var body = document.getElementsByTagName('body')[0];
    var header = document.getElementsByTagName('h1')[0];
    var core = document.getElementById('core');
    var newBtn = document.createElement('button');
    header.appendChild(newBtn);
    newBtn.innerText = 'View links';
    newBtn.style= 'vertical-align:middle;margin-left: 10px;';
    newBtn.onclick = function(){

        var content = '<h3>Pokemon links</h3><table style="border-collapse:collapse;">';
        var fieldmon = document.getElementsByClassName('fieldmon');
        for(var i=0; i<fieldmon.length; i++){
        if(i%4==0) {
            content += '<tr>';
        }
        var pkmnID = fieldmon[i].getAttribute('data-id');
            var small = fieldmon[i].children[1];
        var imgSRC = small.getAttribute('src');
        var pkmnName = small.getAttribute('alt');
        content += '<td style="padding:5px;border:1px solid;">' +
                   '<img style="vertical-align:middle;" src="'+imgSRC+'"> ' +
                   '<a href="/summary/'+pkmnID+'">'+pkmnName+'</a></td>';
        if(i%4==3) {
            content += '</tr>';
        }
        }
        content += '</table>';

        var dialog = document.createElement('div');
        var dialogDiv1 = document.createElement('div');
        var dialogDiv2 = document.createElement('div');
        var dialogDiv3 = document.createElement('div');
        var closeBtn = document.createElement('button');
        closeBtn.setAttribute('type','button');
        closeBtn.style = 'float:right;margin:8px;';
        closeBtn.innerText = 'Close';
        closeBtn.onclick = function() {
        dialog.remove();
        core.classList.remove('scrolllock');
        }
        dialog.classList.add('dialog');
        dialog.appendChild(dialogDiv1);
        dialogDiv1.appendChild(dialogDiv2);
        dialogDiv2.appendChild(dialogDiv3);
        dialogDiv3.innerHTML = content;
        dialogDiv3.appendChild(closeBtn);
        body.prepend(dialog);
        core.classList.add('scrolllock');
    };
  }
}


class ShelterPage extends Page {
    constructor(localStorageMgr, helpers, GLOBALS, SETTINGS) {
        super(localStorageMgr, helpers, GLOBALS.SHELTER_PAGE_SETTINGS_KEY, {
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
            $('.tabbed_interface.horizontal>div').removeClass('tab-active');
            $('.tabbed_interface.horizontal>ul>li').removeClass('tab-active');
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterbegin', '<li class="tab-active"><label>Search</label></li>');
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.shelterOptionsHTML);
            $('#shelteroptionsqol').addClass('tab-active');

            document.querySelector('#sheltercommands').insertAdjacentHTML('beforebegin', '<div id="sheltersuccess"></div>');

            const theField = Helpers.textSearchDiv('numberDiv', 'findCustom', 'removeShelterTextfield', 'customArray');
            const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'findType', GLOBALS.TYPE_OPTIONS,
                'removeShelterTypeList', 'fieldTypes', 'typeArray');

            this.customArray = this.settings.findCustom.split(',');
            this.typeArray = this.settings.findType.split(',');

            Helpers.setupFieldArrayHTML(this.customArray, 'searchkeys', theField, 'numberDiv');
            Helpers.setupFieldArrayHTML(this.typeArray, 'shelterTypes', theType, 'typeNumber');

            $('[data-shelter=reload]').addClass('customSearchOnClick');
            $('[data-shelter=whiteflute]').addClass('customSearchOnClick');
            $('[data-shelter=blackflute]').addClass('customSearchOnClick');
        }
        if(this.globalSettings.shelterFeatureEnables.sort) {
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterbegin', '<li class=""><label>Sort</label></li>');
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterend', '<div id="qolsheltersort"><label><input type="checkbox" class="qolsetting" data-key="shelterGrid"/><span>Sort by Grid</span></label>');
        }
    }
    setupCSS() {
        if(this.globalSettings.shelterFeatureEnables.search ||
            this.globalSettings.shelterFeatureEnables.sort) {
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
    setupHandlers(GLOBALS) {
        const obj = this;
        $(document).on('change', '#shelteroptionsqol input', (function () { //shelter search
            obj.loadSettings();
            obj.customSearch(GLOBALS);
            obj.saveSettings();
        }));

        $(document).on('change', '.qolsetting', (function () {
            obj.loadSettings();
            obj.customSearch(GLOBALS);
            obj.saveSettings();
        }));

        $(document).on('input', '.qolsetting', (function () { //Changes QoL settings
            obj.settingsChange(this.getAttribute('data-key'),
                $(this).val(),
                $(this).parent().parent().attr('class'),
                $(this).parent().attr('class'),
                (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
            obj.customSearch(GLOBALS);
            obj.saveSettings();
        }));

        $('.customSearchOnClick').on('click', (function () {
            obj.loadSettings();
            obj.customSearch(GLOBALS);
            obj.saveSettings();
        }));

        $(document).on('click', '#addShelterTextfield', (function () { //add shelter text field
            obj.addTextField();
            obj.saveSettings();
        }));

        $(document).on('click', '#removeShelterTextfield', (function () { //remove shelter text field
            obj.removeTextField(this, $(this).parent().find('input').val());
            obj.saveSettings();
            obj.customSearch(GLOBALS);
        }));

        $(document).on('click', '#addShelterTypeList', (function () { //add shelter type list
            obj.addTypeList(GLOBALS);
            obj.customSearch(GLOBALS);
        }));

        $(document).on('click', '#removeShelterTypeList', (function () { //remove shelter type list
            obj.removeTypeList(this, $(this).parent().find('select').val());
            obj.saveSettings();
            obj.customSearch(GLOBALS);
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
    addTypeList(GLOBALS) {
        const theList = Helpers.selectSearchDiv('typeNumber', 'types', 'findType', GLOBALS.TYPE_OPTIONS,
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
        const selected = $('img[title*="' + value + '"]');
        const cls = Helpers.getPokemonImageClass();
        if (selected.length) {
            const searchResult = SEARCH_DATA[keyIndex + 2]; //type of Pokémon found
            const imgResult = selected.length + ' ' + searchResult; //amount + type found
            const imgFitResult = SEARCH_DATA[keyIndex + 3]; //image for type of Pokémon
            const shelterBigImg = selected.parent().prev().children(`img.${cls}`);
            $(shelterBigImg).addClass('shelterfoundme');

            this.insertShelterFoundDiv(selected.length, imgResult, imgFitResult);
        }
    }

    searchForTooltipText(GLOBALS, key) {
        const LIST = GLOBALS.SHELTER_SEARCH_LISTS[key];
        const SEARCH_DATA = GLOBALS.SHELTER_SEARCH_DATA;
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

                this.insertShelterFoundDiv(selected.length, imgResult, imgFitResult);
            }
        }
    }

    searchForTypes(GLOBALS, types) {
        const dexData = GLOBALS.DEX_DATA;
        const cls = Helpers.getPokemonImageClass();
        for (let i = 0; i < types.length; i++) {
            const value = types[i];
            const foundType = GLOBALS.SHELTER_TYPE_TABLE[GLOBALS.SHELTER_TYPE_TABLE.indexOf(value) + 2];

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
                    const shelterBigImg = shelterImgSearch.prev().children(`img.${cls}`);
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
                    const shelterBigImg = shelterImgSearch.prev().children(`img.${cls}`);
                    $(shelterBigImg).addClass('shelterfoundme');
                }

                this.insertShelterTypeFoundDiv(typePokemonNames.length, foundType, 'Pokemon', typePokemonNames);
            }
        }

    }

    customSearch(GLOBALS) {
        const obj = this;
        const SEARCH_DATA = GLOBALS.SHELTER_SEARCH_DATA;
        const cls = Helpers.getPokemonImageClass();

        // search whatever you want to find in the shelter & grid

        if(this.globalSettings.shelterFeatureEnables.sort) {
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

        if(this.globalSettings.shelterFeatureEnables.search) {
        /*
         * search values depending on settings
         * emptying the sheltersuccess div to avoid duplicates
         */
            document.querySelector('#sheltersuccess').innerHTML = '';
            $('#shelterarea>div>img').removeClass('shelterfoundme');

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
                const selected = $('#shelterarea .tooltip_content:contains(' + value + ')');
                if (selected.length) {
                    const searchResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 2];
                    const imgFitResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 3];
                    const tooltipResult = selected.length + ' ' + searchResult;
                    const shelterImgSearch = selected;
                    const shelterBigImg = shelterImgSearch.prev().children(`img.${cls}`);
                    $(shelterBigImg).addClass('shelterfoundme');

                    this.insertShelterFoundDiv(selected.length, tooltipResult, imgFitResult);
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
                        const shelterBigImg = shelterImgSearch.prev().children(`img.${cls}`);
                        $(shelterBigImg).addClass('shelterfoundme');
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
                                const selected = $('#shelterarea .tooltip_content:containsIN(' + customValue + ') img[title*=\'' + genderMatch + '\']');
                                if (selected.length) {
                                    const searchResult = customValue;
                                    const genderName = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(genderMatch) + 1];
                                    const imgGender = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(genderMatch) + 2];
                                    const tooltipResult = selected.length + ' ' + genderName + imgGender + ' ' + searchResult;
                                    const shelterImgSearch = selected;
                                    const shelterBigImg = shelterImgSearch.parent().prev().children(`img.${cls}`);
                                    $(shelterBigImg).addClass('shelterfoundme');

                                    this.insertShelterFoundDiv(selected.length, tooltipResult, heartPng);
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
                                const shelterBigImg = shelterImgSearch.parent().prev().children(`img.${cls}`);
                                $(shelterBigImg).addClass('shelterfoundme');
                                this.insertShelterFoundDiv(selected.length, tooltipResult, heartPng);
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
                            const shelterBigImg = shelterImgSearch.prev().children(`img.${cls}`);
                            $(shelterBigImg).addClass('shelterfoundme');
                            this.insertShelterFoundDiv(selected.length, tooltipResult, eggPng);
                        }
                    }

                    //imgSearch with Pokémon
                    if (this.settings.customPng === true) {
                        const selected = $(`#shelterarea img.${cls}[src*="${customValue}"]`);
                        if (selected.length) {
                            const searchResult = selected.parent().next().text().split('(')[0];
                            const tooltipResult = selected.length + ' ' + searchResult + ' (Custom img search)';
                            const shelterImgSearch = selected;
                            $(shelterImgSearch).addClass('shelterfoundme');
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


class SummaryPage extends Page {
  constructor(localStorageMgr, helpers, GLOBALS) {
      super(localStorageMgr, helpers, GLOBALS.SUMMARY_PAGE_SETTINGS_KEY, {}, 'summary');
  } // constructor

  setupHTML() {
    const pkmnID = $('.party div')[0].getAttribute('data-pid');
    const displayAccordion = $('#displaycodelist').parent();
    const newHTML = 
      "<p>Display an interactive panel in Pokefarm's forums!</p>"+
      '<p class="displaycode" style="user-select:all";>[pkmnpanel='+pkmnID+']</p>'+
      '<div style="border-bottom: 1px solid;margin-top: 1rem;"></div>';
    displayAccordion.prepend(newHTML);
  }
}


class UserSettings {
    constructor() {
        this.setDefaults();

        /*
         * used to tie "global" enable settings in USER_SETTINGS to the more
         * granular settings that are related to the same page
         */
        this.LINKED_SETTINGS = [
            {
                'manager': 'shelterEnable',
                'managed': 'shelterFeatureEnables'
            },
            {
                'manager': 'publicFieldEnable',
                'managed': 'publicFieldFeatureEnables'
            },
            {
                'manager': 'privateFieldEnable',
                'managed': 'privateFieldFeatureEnables'
            },
        ];
    }
    setDefaults() {
        // default settings when the script gets loaded the first time
        this.customCss = '';
        this.enableDaycare = true;
        this.shelterEnable = true;
        this.fishingEnable = true;
        this.publicFieldEnable = true;
        this.privateFieldEnable = true;
        this.partyMod = true;
        this.easyEvolve = true;
        this.labNotifier = true;
        this.dexFilterEnable = true;
        this.condenseWishforge = true;
        this.interactionsEnable = true;
        this.summaryEnable = true;
        this.shelterFeatureEnables = {
            search: true,
            sort: true,
        };
        this.publicFieldFeatureEnables = {
            search: true,
            sort: true,
            release: true,
            tooltip: true,
            pkmnlinks: true
        };
        this.privateFieldFeatureEnables = {
            search: true,
            release: true,
            tooltip: true,
            pkmnlinks: true
        };
    }
    /// load settings from an object that is not of type UserSettings
    load(settingsObj) {
        try {
            const countScriptSettings = Object.keys(this).length;
            const localStorageString = settingsObj;
            const countLocalStorageSettings = Object.keys(localStorageString).length;
            // adds new settings to this class
            if (countLocalStorageSettings < countScriptSettings) {
                const newSettings = $.extend(true, this, settingsObj);
                this.copyFields(newSettings);
            }
            // removes objects from the local storage if they don't exist anymore. Not yet possible..
            if (countLocalStorageSettings > countScriptSettings) {
                /* do nothing at the moment */
            }
        }
        catch (err) {
            /* do nothing at the moment */
        }
        if (settingsObj != this) {
            this.copyFields(settingsObj);
            // this = JSON.parse(this.localStorageMgr.getItem(this.SETTINGS_SAVE_KEY));
        }
    }
    copyFields(settingsObj) {
        const recursiveCopy = (object, key, value) => {
            if (typeof value === 'object') {
                for (const [_key, _value] of Object.entries(value)) {
                    recursiveCopy(object[key], _key, _value);
                }
            } else {
                object[key] = value;
            }
        };
        for (const [key, value] of Object.entries(settingsObj)) {
            recursiveCopy(this, key, value);
        }
    }
}

class WishforgePage extends Page {
    constructor(localStorageMgr, helpers, GLOBALS) {
        super(localStorageMgr, helpers, GLOBALS.WISHFORGE_PAGE_SETTINGS_KEY, {}, 'forge');
        const obj = this;
        this.observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if(mutation.type === 'childList' && mutation.addedNodes.length) {
                    obj.setupHTML(GLOBALS);
                }
            });
        });
    } // constructor

    setupHTML(GLOBALS) {
        const isMobile = Helpers.detectPageSize('mq2');
        // setup table format
        let header = '<th>Type</th> <th>Level</th> <th>Gem Progress</th> <th>Item</th> <th>Upgrade</th> <th>Notify</th>';
        let columns = 
            '<col style="width: 10%;">' +
            '<col style="width: 20%;">' +
            '<col style="width: 20%;">' +
            '<col style="width: 20%;">' +
            '<col style="width: 10%;">' +
            '<col style="width: 10%;">';
        if(isMobile) {
            header = '<th>Type</th> <th>Gem Progress</th> <th>Item</th>';
            columns = 
                '<col style="width: 34%;">' +
                '<col style="width: 33%;">' +
                '<col style="width: 33%;">';
        }

        // use GLOBALS.TYPE_LIST to get list of types
        const types = GLOBALS.TYPE_LIST;

        // build HTML table
        let rows = {};
        for (let i = 0; i < types.length; i++) {
            if(!isMobile) {
                rows[types[i]] = `<tr id=${types[i]}> <td>${types[i]}</td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>`;
            }
            else {
                rows[types[i]] = `<tr id="${types[i]}-top" class="qolBadgesTop"> <td>${types[i]}</td> <td></td> <td></td> </tr>`
                               + `<tr id="${types[i]}-bot" class="qolBadgesBot"> <td></td> <td></td> <td></td> </tr>`;
            }
        }
        let table = '<table style="width: 100%" class="qolBadges">' +
            `<colgroup> ${columns} </colgroup>` +
            `<tr id="head"> ${header} </tr>`;
        for (let i = 0; i < types.length; i++) {
            table += rows[types[i]];
        }
        table += '</table>';

        // add table to page
        const craftedBadgesList = $('#badges').next().find('ul.badgelist');
        craftedBadgesList.prepend(table);

        // define column aliases to make the movements more logical
        let LEVEL_COL = 2;
        let GEM_COL = 3;
        let ITEM_COL = 4;
        let UPDATE_COL = 5;
        let NOTIFY_COL = 6;
        let MOB_TOP = '';
        let MOB_BOT = '';
        if(isMobile) {
            LEVEL_COL = 1;
            GEM_COL = 2;
            ITEM_COL = 3;
            UPDATE_COL = 2;
            NOTIFY_COL = 3;
            // row specifiers for mobile
            MOB_TOP = '-top';
            MOB_BOT = '-bot';
        }

        // move elements from original elements to table
        for (let j = 0; j < types.length; j++) {
            const type = types[j];
            const index = j + 1;
            const li = $(craftedBadgesList.children()[index]);

            // get badge image
            const badgeImg = $($(li.children()[0]).children()[0]);
            badgeImg.appendTo(`tr#${type}${MOB_BOT}>td:nth-child(${LEVEL_COL})`);

            // get badge name
            const badgeName = $(li.children()[0]);
            badgeName.text(' ' + badgeName.text().replace(` ${type} Badge`, ''));
            badgeName.css('display', 'inline-block');
            badgeName.appendTo(`tr#${type}${MOB_BOT}>td:nth-child(${LEVEL_COL})`);

            // get gem progress bar
            const gemProgress = $(li.children()[0]);
            gemProgress.appendTo(`tr#${type}${MOB_TOP}>td:nth-child(${GEM_COL})`);

            // if the badge is under construction, the tooltip will not be there
            if($(li.children()[0]).hasClass('itemtooltip')) {
                const gemTooltip = $(li.children()[0]);
                gemTooltip.appendTo(`tr#${type}${MOB_TOP}>td:nth-child(${GEM_COL})`);
            }

            // get item progress bar
            const itemProgress = $(li.children()[0]);
            itemProgress.appendTo(`tr#${type}${MOB_TOP}>td:nth-child(${ITEM_COL})`);

            // if the badge is under construction, the tooltip will not be there
            if($(li.children()[0]).hasClass('itemtooltip')) {
                const itemTooltip = $(li.children()[0]);
                itemTooltip.appendTo(`tr#${type}${MOB_TOP}>td:nth-child(${ITEM_COL})`);
            }

            // get notify button
            const notifyBtn = $(li.children()[0]);
            notifyBtn.appendTo(`tr#${type}${MOB_BOT}>td:nth-child(${NOTIFY_COL})`);

            // get upgrade button
            const updateBtn = $(li.children()[0]);
            updateBtn.appendTo(`tr#${type}${MOB_BOT}>td:nth-child(${UPDATE_COL})`);
        }

        // remove the li's left over
        const children = craftedBadgesList.children();
        for (let i = types.length; i >= 1; i--) {
            $(children[i]).remove();
        }
    }

    setupObserver() {
        const target = $('#badges').next('div')[0];
        this.observer.observe(target, {
            childList: true
        });
    }
}

$(function () {
  ('use strict');
  // script entry point
  if (typeof(module) !== 'undefined') {
    module.exports.pfqol = PFQoL;
  } else {
    new PFQoL();
  }
});
