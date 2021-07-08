/* globals Page */
// eslint-disable-next-line no-unused-vars
class PrivateFieldsPageBase extends Page {
    constructor(jQuery, localStorageMgr, helpers, GLOBALS, settings) {
        super(jQuery, localStorageMgr, helpers, GLOBALS.PRIVATE_FIELDS_PAGE_SETTINGS_KEY, {
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
            const theField = this.helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray');
            const theType = this.helpers.selectSearchDiv('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS,
                'removePrivateFieldTypeSearch', 'fieldTypes', 'typeArray');
            const theNature = this.helpers.selectSearchDiv('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS,
                'removePrivateFieldNature', 'natureTypes', 'natureArray');
            const theEggGroup = this.helpers.selectSearchDiv('eggGroupNumber', 'eggGroups', 'fieldEggGroup', GLOBALS.EGG_GROUP_OPTIONS,
                'removePrivateFieldEggGroup', 'eggGroupTypes', 'eggGroupArray');
            this.customArray = this.settings.fieldCustom.split(',');
            this.typeArray = this.settings.fieldType.split(',');
            this.natureArray = this.settings.fieldNature.split(',');
            this.eggGroupArray = this.settings.fieldEggGroup.split(',');
            this.helpers.setupFieldArrayHTML(this.jQuery, this.customArray, 'searchkeys', theField, 'numberDiv');
            this.helpers.setupFieldArrayHTML(this.jQuery, this.typeArray, 'fieldTypes', theType, 'typeNumber');
            this.helpers.setupFieldArrayHTML(this.jQuery, this.natureArray, 'natureTypes', theNature, 'natureNumber');
            this.helpers.setupFieldArrayHTML(this.jQuery, this.eggGroupArray, 'eggGroupTypes', theEggGroup, 'eggGroupNumber');
        }

        if(this.globalSettings.privateFieldFeatureEnables.release) {
            /* nothing here */
        }

        if(this.globalSettings.privateFieldFeatureEnables.tooltip) {
            document.querySelector('#field_field').insertAdjacentHTML('beforebegin', GLOBALS.TEMPLATES.privateFieldTooltipModHTML);
            this.handleTooltipSettings();
        }
    }
    setupCSS() {
        // same as public fields
        const fieldOrderCssColor = this.jQuery('#field_field').css('background-color');
        const fieldOrderCssBorder = this.jQuery('#field_field').css('border');
        this.jQuery('#fieldorder').css('background-color', '' + fieldOrderCssColor + '');
        this.jQuery('#fieldorder').css('border', '' + fieldOrderCssBorder + '');
        this.jQuery('#fieldsearch').css('background-color', '' + fieldOrderCssColor + '');
        this.jQuery('#tooltipenable').css('max-width', '600px');
        this.jQuery('#tooltipenable').css('position', 'relative');
        this.jQuery('#tooltipenable').css('margin', '16px auto');
        this.jQuery('.collapsible').css('background-color', '' + fieldOrderCssColor + '');
        this.jQuery('.collapsible').css('border', '' + fieldOrderCssBorder + '');
        this.jQuery('.collapsible_content').css('background-color', '' + fieldOrderCssColor + '');

        this.jQuery('.tooltiptext').css('background-color', this.jQuery('.tooltip_content').eq(0).css('background-color'));
        this.jQuery('.tooltiptext').css('border', '' + fieldOrderCssBorder + '');

        /*
         * Issue #47 - Since the default Pokefarm CSS for buttons does not use the same color
         * settings as most of the text on the site, manually set the text color for
         * '.collapsible' to match the text around it
         */
        this.jQuery('.collapsible').css('color', this.jQuery('#content').find('h1').eq(0).css('color'));
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
        this.jQuery(window).on('load', (() => {
            obj.loadSettings();
            obj.customSearch(GLOBALS);
            if(obj.globalSettings.privateFieldFeatureEnables.tooltip) {
                obj.handleTooltipSettings();
            }
            obj.saveSettings();
        }));

        this.jQuery(document).on('load', '.field', (function () {
            obj.customSearch(GLOBALS);
        }));

        if(obj.globalSettings.privateFieldFeatureEnables.release) {
            this.jQuery(document).on('click', '*[data-menu="release"]', (function (e) { //select all feature
                e.stopPropagation();
                obj.releaseEnableReleaseAll();
            }));
            this.jQuery(document).on('click', '*[data-menu="bulkmove"]', (function () { // select all feature
                obj.moveEnableReleaseAll();
            }));
        }

        if(obj.globalSettings.privateFieldFeatureEnables.search) {
            this.jQuery(document).on('click', '#addPrivateFieldTypeSearch', (function (e) { //add field type list
                e.stopPropagation();
                obj.addSelectSearch('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS, 'removePrivateFieldTypeSearch', 'fieldTypes', 'typeArray');
                obj.customSearch(GLOBALS);
            }));

            this.jQuery(document).on('click', '#removePrivateFieldTypeSearch', (function (e) { //remove field type list
                e.stopPropagation();
                obj.typeArray = obj.removeSelectSearch(obj.typeArray, this, obj.jQuery(this).parent().find('select').val(), 'fieldType', 'fieldTypes');
                obj.saveSettings();
                obj.customSearch(GLOBALS);
            }));

            this.jQuery(document).on('click', '#addPrivateFieldNatureSearch', (function (e) { //add field nature search
                e.stopPropagation();
                obj.addSelectSearch('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS, 'removePrivateFieldNature', 'natureTypes', 'natureArray');
                obj.customSearch(GLOBALS);
            }));

            this.jQuery(document).on('click', '#removePrivateFieldNature', (function (e) { //remove field nature search
                e.stopPropagation();
                obj.natureArray = obj.removeSelectSearch(obj.natureArray, this, obj.jQuery(this).parent().find('select').val(), 'fieldNature', 'natureTypes');
                obj.saveSettings();
                obj.customSearch(GLOBALS);
            }));

            this.jQuery(document).on('click', '#addPrivateFieldEggGroupSearch', (function (e) { //add egg group nature search
                e.stopPropagation();
                obj.addSelectSearch('eggGroupNumber', 'eggGroups', 'fieldEggGroup', GLOBALS.EGG_GROUP_OPTIONS, 'removePrivateFieldEggGroup', 'eggGroupTypes', 'eggGroupArray');
                obj.customSearch(GLOBALS);
            }));

            this.jQuery(document).on('click', '#removePrivateFieldEggGroup', (function (e) { //remove egg group nature search
                e.stopPropagation();
                obj.eggGroupArray = obj.removeSelectSearch(obj.eggGroupArray, this, obj.jQuery(this).parent().find('select').val(), 'fieldEggGroup', 'eggGroupTypes');
                obj.saveSettings();
                obj.customSearch(GLOBALS);
            }));

            this.jQuery(document).on('click', '#addTextField', (function (e) {
                e.stopPropagation();
                obj.addTextField();
                obj.saveSettings();
            }));

            this.jQuery(document).on('click', '#removeTextField', (function (e) {
                e.stopPropagation();
                obj.removeTextField(this, obj.jQuery(this).parent().find('input').val());
                obj.saveSettings();
                obj.customSearch(GLOBALS);
            }));
        }

        if(obj.globalSettings.privateFieldFeatureEnables.tooltip) {
            this.jQuery('.tooltipsetting[data-key=tooltipEnableMods]').on('click', function () {
                obj.loadSettings();
                obj.handleTooltipSettings();
                obj.saveSettings();
            });

            this.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').on('click', function () {
                obj.loadSettings();
                obj.handleTooltipSettings();
                obj.saveSettings();
            });
        }

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

        this.jQuery('.collapsible').on('click', function () {
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
        if (obj.jQuery('.tooltipsetting[data-key=tooltipEnableMods]').prop('checked')) {
            // make sure checkboxes are enabled
            obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').prop('disabled', false);

            // use the correct setting to turn on the tooltips based on the berries
            if (obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').prop('checked')) { obj.disableTooltips(); }
            else { obj.enableTooltips(); }
        } else {
            obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').prop('disabled', true);
            // if tooltipNoBerry was checked before the mods were disabled, reenable the tooltips
            if (obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').prop('checked')) {
                obj.enableTooltips();
            }
        }
    }
    disableTooltips() {
        this.jQuery('#field_field>div.field>.fieldmon').removeAttr('data-tooltip').removeClass('tooltip_trigger');
    }
    enableTooltips() {
        this.jQuery('#field_field>div.field>.fieldmon').attr('data-tooltip', '');
    }
    searchForImgTitle(GLOBALS, key) {
        const SEARCH_DATA = GLOBALS.SHELTER_SEARCH_DATA;
        const keyIndex = SEARCH_DATA.indexOf(key);
        const value = SEARCH_DATA[keyIndex + 1];
        const selected = this.jQuery('img[title*="' + value + '"]');
        const cls = this.helpers.getPokemonImageClass();
        if (selected.length) {
            // next line different from shelter
            const bigImg = selected.parent().parent().parent().parent().prev().children(`img.${cls}`);
            this.jQuery(bigImg).addClass('privatefoundme');
        }
    }
    searchForCustomPokemon(value, male, female, nogender) {
        const genderMatches = [];
        if (male) { genderMatches.push('[M]'); }
        if (female) { genderMatches.push('[F]'); }
        if (nogender) { genderMatches.push('[N]'); }
        const cls = this.helpers.getPokemonImageClass();

        if (genderMatches.length > 0) {
            for (let i = 0; i < genderMatches.length; i++) {
                const genderMatch = genderMatches[i];
                const selected = this.jQuery('#field_field .tooltip_content:containsIN(' + value + ') img[title*=\'' + genderMatch + '\']');
                if (selected.length) {
                    const shelterBigImg = selected.parent().parent().parent().parent().prev().children(`img.${cls}`);
                    this.jQuery(shelterBigImg).addClass('privatefoundme');
                }
            }
        }

        //No genders
        else {
            const selected = this.jQuery('#field_field .tooltip_content:containsIN(' + value + ')');
            if (selected.length) {
                const shelterBigImg = selected.parent().parent().parent().parent().prev().children(`img.${cls}`);
                this.jQuery(shelterBigImg).addClass('privatefoundme');
            }
        }

    }
    searchForCustomEgg(value) {
        const cls = this.helpers.getPokemonImageClass();
        const selected = this.jQuery('#field_field .tooltip_content:containsIN(' + value + '):contains("Egg")');
        if (selected.length) {
            const shelterBigImg = selected.parent().parent().parent().parent().prev().children(`img.${cls}`);
            this.jQuery(shelterBigImg).addClass('privatefoundme');
        }
    }
    searchForCustomPng(value) {
        const selected = this.jQuery('#field_field img[src*="' + value + '"]');
        if (selected.length) {
            const shelterImgSearch = selected;
            this.jQuery(shelterImgSearch).addClass('privatefoundme');
        }
    }
    customSearch(GLOBALS) {
        if(this.globalSettings.privateFieldFeatureEnables.search) {
            const obj = this;
            const cls = this.helpers.getPokemonImageClass();
            const bigImgs = document.querySelectorAll('.privatefoundme');
            if (bigImgs !== null) {
                bigImgs.forEach((b) => { obj.jQuery(b).removeClass('privatefoundme'); });
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
                const items = obj.jQuery('.tooltip_content .item>div>.tooltip_item');
                if (items.length) {
                    const itemBigImgs = items.parent().parent().parent().parent().prev().children(`img.${cls}`);
                    obj.jQuery(itemBigImgs).addClass('privatefoundme');
                }
            }
            const filteredTypeArray = this.typeArray.filter(v => v != '');
            const filteredNatureArray = this.natureArray.filter(v => v != '');
            const filteredEggGroupArray = this.eggGroupArray.filter(v => v != '');

            //loop to find all the types
            if (filteredTypeArray.length > 0 || filteredNatureArray.length > 0 || filteredEggGroupArray.length > 0) {
                obj.jQuery('.fieldmon').each(function () {
                    const searchPokemonBigImg = obj.jQuery(this)[0].childNodes[0];
                    const tooltipData = obj.helpers.parseFieldPokemonTooltip(obj.jQuery, GLOBALS, obj.jQuery(searchPokemonBigImg).parent().next()[0]);

                    const searchTypeOne = tooltipData.types[0] + '';
                    const searchTypeTwo = (tooltipData.types.length > 1) ? tooltipData.types[1] + '' : '';

                    const searchNature = GLOBALS.NATURE_LIST[tooltipData.nature];

                    const searchEggGroup = obj.jQuery(this).next().find('.fieldmontip').
                        children(':contains(Egg Group)').eq(0).text().slice('Egg Group: '.length);

                    for (let i = 0; i < filteredTypeArray.length; i++) {
                        if ((searchTypeOne === filteredTypeArray[i]) || (searchTypeTwo === filteredTypeArray[i])) {
                            obj.jQuery(searchPokemonBigImg).addClass('privatefoundme');
                        }
                    }

                    for (let i = 0; i < filteredNatureArray.length; i++) {
                        if (searchNature === GLOBALS.NATURE_LIST[filteredNatureArray[i]]) {
                            obj.jQuery(searchPokemonBigImg).addClass('privatefoundme');
                        }
                    }

                    for (let i = 0; i < filteredEggGroupArray.length; i++) {
                        const value = GLOBALS.EGG_GROUP_LIST[filteredEggGroupArray[i]];
                        if (searchEggGroup === value ||
                        searchEggGroup.indexOf(value + '/') > -1 ||
                        searchEggGroup.indexOf('/' + value) > -1) {
                            obj.jQuery(searchPokemonBigImg).addClass('privatefoundme');
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
        const theList = this.helpers.selectSearchDiv(cls, name, dataKey, options, id, divParent, arrayName);
        const number = this.jQuery(`#${divParent}>div`).length;
        this.jQuery(`#${divParent}`).append(theList);
        this.jQuery(`.${cls}`).removeClass(cls).addClass('' + number + '');
    }
    removeSelectSearch(arr, byebye, key, settingsKey, divParent) {
        arr = this.jQuery.grep(arr, function (value) { return value != key; });
        this.settings[settingsKey] = arr.toString();

        this.jQuery(byebye).parent().remove();

        for (let i = 0; i < this.jQuery(`#${divParent}>div`).length; i++) {
            const rightDiv = i + 1;
            this.jQuery('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }

        return arr;
    }
    addTextField() {
        const theField = this.helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray');
        const numberDiv = this.jQuery('#searchkeys>div').length;
        this.jQuery('#searchkeys').append(theField);
        this.jQuery('.numberDiv').removeClass('numberDiv').addClass('' + numberDiv + '');
    }
    removeTextField(byebye, key) {
        this.customArray = this.jQuery.grep(this.customArray, function (value) {
            return value != key;
        });
        this.settings.fieldCustom = this.customArray.toString();

        this.jQuery(byebye).parent().remove();

        let i;
        for (i = 0; i < this.jQuery('#searchkeys>div').length; i++) {
            const rightDiv = i + 1;
            this.jQuery('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }
    }
    releaseEnableReleaseAll() {
        const obj = this;
        if (this.settings.releaseSelectAll === true &&
            !this.jQuery('#selectallfield').length) {
            const checkboxes = '<label id="selectallfield"><input id="selectallfieldcheckbox" type="checkbox">Select all  </label><label id="selectallfieldany"><input id="selectallfieldanycheckbox" type="checkbox">Select Any  </label><label id="selectallfieldsour"><input id="selectallfieldsourcheckbox" type="checkbox">Select Sour  </label><label id="selectallfieldspicy"><input id="selectallfieldspicycheckbox" type="checkbox">Select Spicy</label><label id="selectallfielddry"><input id="selectallfielddrycheckbox" type="checkbox">Select Dry  </label><label id="selectallfieldsweet"><input id="selectallfieldsweetcheckbox" type="checkbox">Select Sweet  </label><label id="selectallfieldbitter"><input id="selectallfieldbittercheckbox" type="checkbox">Select Bitter  </label>';
            this.jQuery('.dialog>div>div>div>div>button').eq(0).after(checkboxes);
            this.jQuery('#selectallfieldcheckbox').click(function () {
                obj.jQuery('#massreleaselist>ul>li>label>input').not(this).prop('checked', this.checked);
            });

            this.jQuery('#selectallfieldanycheckbox').click(function () {
                const selectAny = obj.jQuery('.icons:contains("Any")').prev().prev().prev('input');
                obj.jQuery(selectAny).not(this).prop('checked', this.checked);
            });

            this.jQuery('#selectallfieldsourcheckbox').click(function () {
                const selectSour = obj.jQuery('.icons:contains("Sour")').prev().prev().prev('input');
                obj.jQuery(selectSour).not(this).prop('checked', this.checked);
            });

            this.jQuery('#selectallfieldspicycheckbox').click(function () {
                const selectSpicy = obj.jQuery('.icons:contains("Spicy")').prev().prev().prev('input');
                obj.jQuery(selectSpicy).not(this).prop('checked', this.checked);
            });

            this.jQuery('#selectallfielddrycheckbox').click(function () {
                const selectDry = obj.jQuery('.icons:contains("Dry")').prev().prev().prev('input');
                obj.jQuery(selectDry).not(this).prop('checked', this.checked);
            });

            this.jQuery('#selectallfieldsweetcheckbox').click(function () {
                const selectSweet = obj.jQuery('.icons:contains("Sweet")').prev().prev().prev('input');
                obj.jQuery(selectSweet).not(this).prop('checked', this.checked);
            });

            this.jQuery('#selectallfieldbittercheckbox').click(function () {
                const selectBitter = obj.jQuery('.icons:contains("Bitter")').prev().prev().prev('input');
                obj.jQuery(selectBitter).not(this).prop('checked', this.checked);
            });
        } // if
    } // releaseAll
    moveEnableReleaseAll() {
        const obj = this;
        if (this.settings.releaseSelectAll === true &&
            !this.jQuery('#movefieldselectall').length) {
            const checkboxes = '<label id="movefieldselectall"><input id="movefieldselectallcheckbox" type="checkbox">Select all  </label><label id="movefieldselectany"><input id="movefieldselectanycheckbox" type="checkbox">Select Any  </label><label id="movefieldselectsour"><input id="movefieldselectsourcheckbox" type="checkbox">Select Sour  </label><label id="movefieldselectspicy"><input id="movefieldselectspicycheckbox" type="checkbox">Select Spicy</label><label id="movefieldselectdry"><input id="movefieldselectdrycheckbox" type="checkbox">Select Dry  </label><label id="movefieldselectsweet"><input id="movefieldselectsweetcheckbox" type="checkbox">Select Sweet  </label><label id="movefieldselectbitter"><input id="movefieldselectbittercheckbox" type="checkbox">Select Bitter  </label>';
            obj.jQuery('.dialog>div>div>div>div>button').eq(0).after(checkboxes);
            obj.jQuery('#movefieldselectallcheckbox').click(function () {
                obj.jQuery('#massmovelist>ul>li>label>input').not(this).prop('checked', this.checked);
            });

            obj.jQuery('#movefieldselectanycheckbox').click(function () {
                const selectAny = obj.jQuery('.icons:contains("Any")').prev().prev().prev('input');
                obj.jQuery(selectAny).not(this).prop('checked', this.checked);
            });

            obj.jQuery('#movefieldselectsourcheckbox').click(function () {
                const selectSour = obj.jQuery('.icons:contains("Sour")').prev().prev().prev('input');
                obj.jQuery(selectSour).not(this).prop('checked', this.checked);
            });

            obj.jQuery('#movefieldselectspicycheckbox').click(function () {
                const selectSpicy = obj.jQuery('.icons:contains("Spicy")').prev().prev().prev('input');
                obj.jQuery(selectSpicy).not(this).prop('checked', this.checked);
            });

            obj.jQuery('#movefieldselectdrycheckbox').click(function () {
                const selectDry = obj.jQuery('.icons:contains("Dry")').prev().prev().prev('input');
                obj.jQuery(selectDry).not(this).prop('checked', this.checked);
            });

            obj.jQuery('#movefieldselectsweetcheckbox').click(function () {
                const selectSweet = obj.jQuery('.icons:contains("Sweet")').prev().prev().prev('input');
                obj.jQuery(selectSweet).not(this).prop('checked', this.checked);
            });

            obj.jQuery('#movefieldselectbittercheckbox').click(function () {
                const selectBitter = obj.jQuery('.icons:contains("Bitter")').prev().prev().prev('input');
                obj.jQuery(selectBitter).not(this).prop('checked', this.checked);
            });
        } // if
    } // moveEnableReleaseAll
}