/* globals Page Helpers */
const LabBase = Page;

// eslint-disable-next-line no-unused-vars
class LabPage extends LabBase {
    constructor(jQuery, GLOBALS) {
        super(jQuery, 'QoLLab', {
            findLabEgg: '', // same as findCustom in shelter
            customEgg: true,
            findLabType: '', // same as findType in shelter
            findTypeEgg: true,
        }, '/lab');
        this.searchArray = [];
        this.listArray = [];
        const obj = this;
        this.observer = new MutationObserver(function (mutations) {
            // eslint-disable-next-line no-unused-vars
            mutations.forEach(function (mutation) {
                obj.customSearch(GLOBALS);
            });
        });

        // when the page is loaded, check to see if the data needed for finding eggs by type is loaded (if it's needed)
        if (this.onPage(window) &&
            this.settings.findTypeEgg &&
            !(GLOBALS.EGGS_PNG_TO_TYPES_LIST || JSON.parse(localStorage.getItem('QoLEggTypesMap')))) {
            window.alert('Message from QoL script:\nUnable to load list of pokemon eggs and their types, ' +
                'which is used to distinguish eggs with the same name but different types (Vulpix and ' +
                'Alolan Vulpix).\n\nCan still find eggs by type, but there may be mistakes. ' +
                'Please clear and reload your pokedex data by clicking the "Clear Cached Dex" ' +
                'and then clicking the "Update Pokedex" button in the QoL Hub to load list of eggs and types.');
        }
    }

    setupHTML(GLOBALS) {
        document.querySelector('#eggsbox360>p.center').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.labOptionsHTML);
        document.querySelector('#egglist').insertAdjacentHTML('afterend', '<div id="labsuccess"></div>');

        const theField = Helpers.textSearchDiv('numberDiv', 'findLabEgg', 'removeLabSearch', 'searchArray');
        const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'findLabType', GLOBALS.TYPE_OPTIONS,
            'removeLabTypeList', 'labTypes', 'listArray');

        this.searchArray = this.settings.findLabEgg.split(',');
        this.listArray = this.settings.findLabType.split(',');

        Helpers.setupFieldArrayHTML(this.jQuery, this.searchArray, 'searchkeys', theField, 'numberDiv');
        Helpers.setupFieldArrayHTML(this.jQuery, this.listArray, 'labTypes', theType, 'typeNumber');
    }
    setupCSS() {
        //lab css
        let labSuccessCss = this.jQuery('#labpage>div').css('background-color');
        this.jQuery('#labsuccess').css('background-color', labSuccessCss);
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
        obj.jQuery(document).on('click', '#addLabSearch', (function () { //add lab text field
            obj.addTextField();
        }));

        obj.jQuery(document).on('click', '#removeLabSearch', (function () { //remove lab text field
            obj.removeTextField(this, obj.jQuery(this).parent().find('input').val());
            obj.saveSettings();
        }));

        obj.jQuery(document).on('click', '#addLabTypeList', (function () { //add lab type list
            obj.addTypeList(GLOBALS);
        }));

        obj.jQuery(document).on('click', '#removeLabTypeList', (function () { //remove lab type list
            obj.removeTypeList(this, obj.jQuery(this).parent().find('select').val());
            obj.saveSettings();
        }));

        obj.jQuery(document).on('change', '#labCustomSearch input', (function () { //lab search
            obj.customSearch(GLOBALS);
        }));

        obj.jQuery(document).on('click', '#labpage', (function () { //shelter search
            obj.customSearch(GLOBALS);
        }));

        obj.jQuery(document).on('input', '.qolsetting', (function () { //Changes QoL settings
            obj.settingsChange(this.getAttribute('data-key'),
                obj.jQuery(this).val(),
                obj.jQuery(this).parent().parent().attr('class'),
                obj.jQuery(this).parent().attr('class'),
                (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
            obj.customSearch(GLOBALS);
            obj.saveSettings();
        }));

        obj.jQuery(window).on('load', (function () {
            obj.loadSettings();
            obj.customSearch(GLOBALS);
        }));
    }
    addTextField() {
        const theField = Helpers.textSearchDiv('numberDiv', 'findLabEgg', 'removeLabSearch', 'searchArray');
        let numberDiv = this.jQuery('#searchkeys>div').length;
        this.jQuery('#searchkeys').append(theField);
        this.jQuery('.numberDiv').removeClass('numberDiv').addClass('' + numberDiv + '');
    }
    removeTextField(byebye, key) {
        // when textfield is removed, the value will be deleted from the localstorage
        this.searchArray = this.jQuery.grep(this.searchArray, function (value) {
            return value != key;
        });
        this.settings.findCustom = this.searchArray.toString();

        this.jQuery(byebye).parent().remove();

        for (let i = 0; i < this.jQuery('#searchkeys>div').length; i++) {
            let rightDiv = i + 1;
            this.jQuery('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }
    }
    addTypeList(GLOBALS) {
        const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'findLabType', GLOBALS.TYPE_OPTIONS,
            'removeLabTypeList', 'labTypes', 'listArray');
        let numberTypes = this.jQuery('#labTypes>div').length;
        this.jQuery('#labTypes').append(theType);
        this.jQuery('.typeNumber').removeClass('typeNumber').addClass('' + numberTypes + '');
    }
    removeTypeList(byebye, key) {
        this.listArray = this.jQuery.grep(this.listArray, function (value) {
            return value != key;
        });
        this.settings.findType = this.listArray.toString();

        this.jQuery(byebye).parent().remove();

        for (let i = 0; i < this.jQuery('#labTypes>div').length; i++) {
            let rightDiv = i + 1;
            this.jQuery('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }
    }
    customSearch(GLOBALS) {
        const obj = this;
        let dexData = GLOBALS.DEX_DATA;
        document.querySelector('#labsuccess').innerHTML = '';
        obj.jQuery('#egglist>div>img').removeClass('labfoundme');

        if (!(this.listArray.length == 1 && this.listArray[0] == '')) {
            if (this.settings.findTypeEgg === true) {
                const eggPngsToTypes = GLOBALS.EGGS_PNG_TO_TYPES_LIST ||
                    JSON.parse(localStorage.getItem('QoLEggTypesMap')) || undefined;
                let typesArrayNoEmptySpace = this.listArray.filter(v => v != '');
                let typeSearchAmount = typesArrayNoEmptySpace.length;
                for (let i = 0; i < typeSearchAmount; i++) {
                    let value = typesArrayNoEmptySpace[i];
                    let amountOfTypesFound = [];
                    let typePokemonNames = [];

                    obj.jQuery('#egglist>div>h3').each(function () {
                        let searchPokemon = (obj.jQuery(this).text().split(' ')[0]);
                        let searchTypeOne = '';
                        let searchTypeTwo = '';

                        if (eggPngsToTypes) {
                            let imgUrl = obj.jQuery(this).next().attr('src').replace('https://pfq-static.com/img/', '');
                            searchTypeOne = eggPngsToTypes[searchPokemon] &&
                                eggPngsToTypes[searchPokemon][imgUrl] &&
                                ('' + eggPngsToTypes[searchPokemon][imgUrl][0]);
                            searchTypeTwo = eggPngsToTypes[searchPokemon] &&
                                eggPngsToTypes[searchPokemon][imgUrl] &&
                                ('' + (eggPngsToTypes[searchPokemon][imgUrl][1] || -1));
                        } else {
                            let searchPokemonIndex = dexData.indexOf('"' + searchPokemon + '"');
                            searchTypeOne = dexData[searchPokemonIndex + 1];
                            searchTypeTwo = dexData[searchPokemonIndex + 2];
                        }
                        if (searchTypeOne === value) {
                            amountOfTypesFound.push('found');
                            typePokemonNames.push(searchPokemon);
                        }

                        if (searchTypeTwo === value) {
                            amountOfTypesFound.push('found');
                            typePokemonNames.push(searchPokemon);
                        }
                    }); // each

                    let foundType = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(value) + 2];

                    let typeImgStandOutLength = typePokemonNames.length;
                    for (let o = 0; o < typeImgStandOutLength; o++) {
                        let value = typePokemonNames[o];
                        let shelterImgSearch = this.jQuery('#egglist>div>h3:containsIN(' + value + ')');
                        let shelterBigImg = shelterImgSearch.next();
                        obj.jQuery(shelterBigImg).addClass('labfoundme');
                    }

                    if (amountOfTypesFound.length > 1) {
                        document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + amountOfTypesFound.length + ' ' + foundType + ' egg types found! (' + typePokemonNames.toString() + ')</div>');
                    } else if (amountOfTypesFound.length == 1) {
                        document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + amountOfTypesFound.length + ' ' + foundType + ' egg type found! (' + typePokemonNames.toString() + ')</div>');
                    }
                } // for
            } // if
        } // else

        if (!(this.searchArray.length == 1 && this.searchArray[0] == '')) {
            let customSearchAmount = this.searchArray.length;

            if (this.settings.customEgg === true) {
                for (let i = 0; i < customSearchAmount; i++) {
                    let value = this.searchArray[i];
                    // skip falsy values (including empty strings)
                    if(!value) { 
                        continue; 
                    }

                    if (this.jQuery('#egglist>div>h3:containsIN(' + value + ')').length) {
                        let searchResult = value;

                        let shelterImgSearch = this.jQuery('#egglist>div>h3:containsIN(' + value + ')');
                        let shelterBigImg = shelterImgSearch.next();
                        obj.jQuery(shelterBigImg).addClass('labfoundme');

                        if (this.jQuery('#egglist>div>h3:containsIN(' + value + ')').length > 1) {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                        } else {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                        }
                    } // if

                    if (obj.jQuery('#egglist>div img[src*="' + value + '"]').length) {
                        let searchResult = obj.jQuery('#egglist>div img[src*="' + value + '"]').prev().text();

                        let shelterImgSearch = obj.jQuery('#egglist>div img[src*="' + value + '"]');
                        obj.jQuery(shelterImgSearch).addClass('labfoundme');

                        if (obj.jQuery('#egglist>div img[src*="' + value + '"]').length > 1) {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                        } else {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                        }
                    } // if
                } // for
            } // if
        } // else
    } // customSearch
}