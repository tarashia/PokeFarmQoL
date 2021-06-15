/* globals Page */
// eslint-disable-next-line no-unused-vars
class LabPageBase extends Page {
    constructor(jQuery, localStorageMgr, helpers, GLOBALS) {
        super(jQuery, localStorageMgr, helpers, GLOBALS.LAB_PAGE_SETTINGS_KEY, {
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

        const theField = this.helpers.textSearchDiv('numberDiv', 'findLabEgg', 'removeLabSearch', 'searchArray');
        const theType = this.helpers.selectSearchDiv('typeNumber', 'types', 'findLabType', GLOBALS.TYPE_OPTIONS,
            'removeLabTypeList', 'labTypes', 'typeArray');

        this.searchArray = this.settings.findLabEgg.split(',');
        this.typeArray = this.settings.findLabType.split(',');

        this.helpers.setupFieldArrayHTML(this.jQuery, this.searchArray, 'searchkeys', theField, 'numberDiv');
        this.helpers.setupFieldArrayHTML(this.jQuery, this.typeArray, 'labTypes', theType, 'typeNumber');
    }
    setupCSS() {
        //lab css
        const labSuccessCss = this.jQuery('#labpage>div').css('background-color');
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
        const theField = this.helpers.textSearchDiv('numberDiv', 'findLabEgg', 'removeLabSearch', 'searchArray');
        const numberDiv = this.jQuery('#searchkeys>div').length;
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
            const rightDiv = i + 1;
            this.jQuery('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }
    }
    addTypeList(GLOBALS) {
        const theType = this.helpers.selectSearchDiv('typeNumber', 'types', 'findLabType', GLOBALS.TYPE_OPTIONS,
            'removeLabTypeList', 'labTypes', 'typeArray');
        const numberTypes = this.jQuery('#labTypes>div').length;
        this.jQuery('#labTypes').append(theType);
        this.jQuery('.typeNumber').removeClass('typeNumber').addClass('' + numberTypes + '');
    }
    removeTypeList(byebye, key) {
        this.typeArray = this.jQuery.grep(this.typeArray, function (value) {
            return value != key;
        });
        this.settings.findType = this.typeArray.toString();

        this.jQuery(byebye).parent().remove();

        for (let i = 0; i < this.jQuery('#labTypes>div').length; i++) {
            const rightDiv = i + 1;
            this.jQuery('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }
    }
    getTypesForEgg(searchPokemon) {
        const data = this.globals.DEX_DATA;
        const searchPokemonIndex = data.indexOf('"' + searchPokemon + '"');
        return [data[searchPokemonIndex + 1], data[searchPokemonIndex + 2]];
    }
    searchForEggsMatchingTypes() {
        const GLOBALS = this.globals;
        const jQuery = this.jQuery;
        const obj = this;
        const enabled = ((this.settings.findTypeEgg === true) &&
            (!(this.typeArray.length == 1 && this.typeArray[0] == '')));
        if (enabled) {
            const typesArrayNoEmptySpace = this.typeArray.filter(v => v != '');
            for (let i = 0; i < typesArrayNoEmptySpace.length; i++) {
                const value = typesArrayNoEmptySpace[i];
                const amountOfTypesFound = [];
                const typePokemonNames = [];

                jQuery('#egglist>div>h3').each(function () {
                    const searchPokemon = jQuery(this).text().split(' ')[0];
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
                    const shelterImgSearch = this.jQuery('#egglist>div>h3:containsIN(' + value + ')');
                    const shelterBigImg = shelterImgSearch.next();
                    jQuery(shelterBigImg).addClass('labfoundme');
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
        const jQuery = this.jQuery;
        if (!(this.searchArray.length == 1 && this.searchArray[0] == '')) {
            if (this.settings.customEgg === true) {
                const searchArrayNoEmptySpace = this.searchArray.filter(v => v != '');
                for (let i = 0; i < searchArrayNoEmptySpace.length; i++) {
                    const value = searchArrayNoEmptySpace[i];
                    if (jQuery('#egglist>div>h3:containsIN(' + value + ')').length) {
                        const searchResult = value;

                        const shelterImgSearch = jQuery('#egglist>div>h3:containsIN(' + value + ')');
                        const shelterBigImg = shelterImgSearch.next();
                        jQuery(shelterBigImg).addClass('labfoundme');

                        if (jQuery('#egglist>div>h3:containsIN(' + value + ')').length > 1) {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                        } else {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                        }
                    } // if

                    if (jQuery('#egglist>div img[src*="' + value + '"]').length) {
                        const searchResult = jQuery('#egglist>div img[src*="' + value + '"]').prev().text();

                        const shelterImgSearch = jQuery('#egglist>div img[src*="' + value + '"]');
                        jQuery(shelterImgSearch).addClass('labfoundme');

                        if (jQuery('#egglist>div img[src*="' + value + '"]').length > 1) {
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
        this.jQuery('#egglist>div>img').removeClass('labfoundme');

        this.searchForEggsMatchingTypes();
        this.searchForEggsMatchingCustom();
    }
}