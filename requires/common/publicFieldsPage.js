/* globals Page */
// eslint-disable-next-line no-unused-vars
class PublicFieldsPage extends Page {
    constructor(jQuery, localStorageMgr, helpers, GLOBALS, settings) {
        super(jQuery, localStorageMgr, helpers, GLOBALS.PUBLIC_FIELDS_PAGE_SETTINGS_KEY, {
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
            const theField = this.helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray');
            const theType = this.helpers.selectSearchDiv('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS,
                'removeFieldTypeSearch', 'fieldTypes', 'typeArray');
            const theNature = this.helpers.selectSearchDiv('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS,
                'removeFieldNature', 'natureTypes', 'natureArray');
            const theEggGroup = this.helpers.selectSearchDiv('eggGroupNumber', 'eggGroups', 'fieldEggGroup', GLOBALS.EGG_GROUP_OPTIONS,
                'removeFieldEggGroup', 'eggGroupTypes', 'eggGroupArray');
            this.customArray = this.settings.fieldCustom.split(',');
            this.typeArray = this.settings.fieldType.split(',');
            this.natureArray = this.settings.fieldNature.split(',');
            this.eggGroupArray = this.settings.fieldEggGroup.split(',');
            this.helpers.setupFieldArrayHTML(this.jQuery, this.customArray, 'searchkeys', theField, 'numberDiv');
            this.helpers.setupFieldArrayHTML(this.jQuery, this.typeArray, 'fieldTypes', theType, 'typeNumber');
            this.helpers.setupFieldArrayHTML(this.jQuery, this.natureArray, 'natureTypes', theNature, 'natureNumber');
            this.helpers.setupFieldArrayHTML(this.jQuery, this.eggGroupArray, 'eggGroupTypes', theEggGroup, 'eggGroupNumber');
        }
        if(this.globalSettings.publicFieldFeatureEnables.sort) {
            document.querySelector('#field_field').insertAdjacentHTML('beforebegin', GLOBALS.TEMPLATES.fieldSortHTML);
        }
        if(this.globalSettings.publicFieldFeatureEnables.tooltip) {
            document.querySelector('#field_field').insertAdjacentHTML('beforebegin', GLOBALS.TEMPLATES.publicFieldTooltipModHTML);
            this.handleTooltipSettings();
        }
    }
    setupCSS() {
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
        obj.jQuery(window).on('load', (function() {
            obj.loadSettings();
            obj.customSearch(GLOBALS);
            if(obj.globalSettings.publicFieldFeatureEnables.tooltip) {
                obj.handleTooltipSettings();
            }
            obj.saveSettings();
        }));

        obj.jQuery(document).on('click input', '#fieldorder, #field_field, #field_berries, #field_nav', (function() { //field sort
            obj.customSearch(GLOBALS);
        }));

        document.addEventListener('keydown', function() {
            obj.customSearch(GLOBALS);
        });

        obj.jQuery(document).on('change', '.qolsetting', (function() {
            obj.loadSettings();
            obj.customSearch(GLOBALS);
            obj.saveSettings();
        }));

        obj.jQuery(document).on('input', '.qolsetting', (function() { //Changes QoL settings
            obj.settingsChange(this.getAttribute('data-key'),
                obj.jQuery(this).val(),
                obj.jQuery(this).parent().parent().attr('class'),
                obj.jQuery(this).parent().attr('class'),
                (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
            obj.customSearch(GLOBALS);
            obj.saveSettings();
        }));

        if(this.globalSettings.publicFieldFeatureEnables.search) {
            obj.jQuery(document).on('click', '#addFieldTypeSearch', (function() { //add field type list
                obj.addSelectSearch('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS, 'removeFieldTypeSearch', 'fieldTypes', 'typeArray');
                obj.customSearch(GLOBALS);
            }));

            obj.jQuery(document).on('click', '#removeFieldTypeSearch', (function() { //remove field type list
                obj.typeArray = obj.removeSelectSearch(obj.typeArray, this, obj.jQuery(this).parent().find('select').val(), 'fieldType', 'fieldTypes');
                obj.saveSettings();
                obj.customSearch(GLOBALS);
            }));

            obj.jQuery(document).on('click', '#addFieldNatureSearch', (function() { //add field nature search
                obj.addSelectSearch('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS, 'removeFieldNature', 'natureTypes', 'natureArray');
                obj.customSearch(GLOBALS);
            }));

            obj.jQuery(document).on('click', '#removeFieldNature', (function() { //remove field nature search
                obj.natureArray = obj.removeSelectSearch(obj.natureArray, this, obj.jQuery(this).parent().find('select').val(), 'fieldNature', 'natureTypes');
                obj.saveSettings();
                obj.customSearch(GLOBALS);
            }));

            obj.jQuery(document).on('click', '#addFieldEggGroupSearch', (function() { //add egg group nature search
                obj.addSelectSearch('eggGroupNumber', 'eggGroups', 'fieldEggGroup', GLOBALS.EGG_GROUP_OPTIONS, 'removeFieldEggGroup', 'eggGroupTypes', 'eggGroupArray');
                obj.customSearch(GLOBALS);
            }));

            obj.jQuery(document).on('click', '#removeFieldEggGroup', (function() { //remove egg group nature search
                obj.eggGroupArray = obj.removeSelectSearch(obj.eggGroupArray, this, obj.jQuery(this).parent().find('select').val(), 'fieldEggGroup', 'eggGroupTypes');
                obj.saveSettings();
                obj.customSearch(GLOBALS);
            }));

            obj.jQuery(document).on('click', '#addTextField', (function() {
                obj.addTextField();
                obj.saveSettings();
            }));

            obj.jQuery(document).on('click', '#removeTextField', (function() {
                obj.removeTextField(this, obj.jQuery(this).parent().find('input').val());
                obj.saveSettings();
                obj.customSearch(GLOBALS);
            }));
        }

        if(this.globalSettings.publicFieldFeatureEnables.sort) {
            obj.jQuery('input.qolalone').on('change', function() { //only 1 textbox may be true
                obj.jQuery('input.qolalone').not(this).prop('checked', false);
            });
        }

        if(this.globalSettings.publicFieldFeatureEnables.tooltip) {
            obj.jQuery('.collapsible').on('click', function() {
                this.classList.toggle('active');
                const content = this.nextElementSibling;
                if(content.style.display === 'block') {
                    content.style.display = 'none';
                } else {
                    content.style.display = 'block';
                }
            });

            obj.jQuery('#field_berries').on('click', function() {
                obj.loadSettings();
                obj.handleTooltipSettings();
            });

            obj.jQuery('.tooltipsetting[data-key=tooltipEnableMods]').on('click', function() {
                obj.loadSettings();
                obj.handleTooltipSettings();
                obj.saveSettings();
            });

            obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').on('click', function() {
                obj.loadSettings();
                obj.handleTooltipSettings();
                obj.saveSettings();
            });

            obj.jQuery('.tooltipsetting[data-key=tooltipBerry]').on('click', function() {
                obj.loadSettings();
                obj.handleTooltipSettings();
                obj.saveSettings();
            });
        }

        // based on PFQ's code in fields_public.min.js
        obj.jQuery(window).on('keyup.field_shortcuts', function (a) {
            const k = obj.jQuery('#field_berries');
            if (0 == obj.jQuery(a.target).closest('input, textarea').length) {
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
        if(obj.jQuery('.tooltipsetting[data-key=tooltipEnableMods]').prop('checked')) {
            // make sure checkboxes are enabled
            obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').prop('disabled', false);
            obj.jQuery('.tooltipsetting[data-key=tooltipBerry]').prop('disabled', false);

            // use the correct setting to turn on the tooltips based on the berries
            if(obj.jQuery('#field_berries').hasClass('selected')) {
                if(obj.jQuery('.tooltipsetting[data-key=tooltipBerry]').prop('checked')) { obj.disableTooltips(); }
                else { obj.enableTooltips(); }
            } else {
                if(obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').prop('checked')) { obj.disableTooltips(); }
                else { obj.enableTooltips(); }
            }
        } else {
            obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').prop('disabled', true);
            obj.jQuery('.tooltipsetting[data-key=tooltipBerry]').prop('disabled', true);
            // if tooltipNoBerry was checked before the mods were disabled, reenable the tooltips
            if(obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').prop('checked')) {
                obj.enableTooltips();
            }
            // same for tooltipBerry
            if(obj.jQuery('.tooltipsetting[data-key=tooltipBerry]').prop('checked')) {
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
        const selected = this.jQuery('img[title*="'+value+'"]');
        const cls = this.helpers.getPokemonImageClass();
        if (selected.length) {
            // next line different from shelter
            const bigImg = selected.parent().parent().parent().parent().prev().children(`img.${cls}`);
            this.jQuery(bigImg).addClass('publicfoundme');
        }
    }
    searchForCustomPokemon(value, male, female, nogender) {
        const genderMatches = [];
        if (male) { genderMatches.push('[M]'); }
        if(female) { genderMatches.push('[F]'); }
        if(nogender) { genderMatches.push('[N]'); }
        const cls = this.helpers.getPokemonImageClass();

        if(genderMatches.length > 0) {
            for(let i = 0; i < genderMatches.length; i++) {
                const genderMatch = genderMatches[i];
                const selected = this.jQuery('#field_field .tooltip_content:containsIN('+value+') img[title*=\'' + genderMatch + '\']');
                if (selected.length) {
                    const shelterBigImg = selected.parent().parent().parent().parent().prev().children(`img.${cls}`);
                    this.jQuery(shelterBigImg).addClass('publicfoundme');
                }
            }
        }

        //No genders
        else {
            const selected = this.jQuery('#field_field .tooltip_content:containsIN('+value+'):not(:containsIN("Egg"))');
            if (selected.length) {
                const shelterBigImg = selected.parent().parent().parent().parent().prev().children(`img.${cls}`);
                this.jQuery(shelterBigImg).addClass('publicfoundme');
            }
        }

    }
    searchForCustomEgg(value) {
        const selected = this.jQuery('#field_field .tooltip_content:containsIN('+value+'):contains("Egg")');
        const cls = this.helpers.getPokemonImageClass();
        if (selected.length) {
            const shelterBigImg = selected.parent().parent().parent().parent().prev().children(`img.${cls}`);
            this.jQuery(shelterBigImg).addClass('publicfoundme');
        }
    }
    searchForCustomPng(value) {
        const selected = this.jQuery('#field_field img[src*="'+value+'"]');
        if (selected.length) {
            const shelterImgSearch = selected;
            this.jQuery(shelterImgSearch).addClass('publicfoundme');
        }
    }
    customSearch(GLOBALS) {
        const obj = this;
        const cls = this.helpers.getPokemonImageClass();

        if(obj.globalSettings.publicFieldFeatureEnables.sort) {

            //////////////////// sorting ////////////////////
            if (this.settings.fieldByBerry === true) { //sort field by berries
                this.jQuery('.fieldmon').removeClass('qolSortMiddle');
                this.jQuery('.field').removeClass('qolGridField');
                this.jQuery('.fieldmon').removeClass('qolGridPokeSize');
                this.jQuery('.fieldmon>img').removeClass('qolGridPokeImg');

                if(this.jQuery('#field_field [data-flavour*="any-"]').length) {
                    this.jQuery('#field_field [data-flavour*="any-"]').addClass('qolAnyBerry');
                }
                if(this.jQuery('#field_field [data-flavour*="sour-"]').length) {
                    this.jQuery('#field_field [data-flavour*="sour-"]').addClass('qolSourBerry');
                }
                if(this.jQuery('#field_field [data-flavour*="spicy-"]').length) {
                    this.jQuery('#field_field [data-flavour*="spicy-"]').addClass('qolSpicyBerry');
                }
                if(this.jQuery('#field_field [data-flavour*="dry-"]').length) {
                    this.jQuery('#field_field [data-flavour*="dry-"]').addClass('qolDryBerry');
                }
                if(this.jQuery('#field_field [data-flavour*="sweet-"]').length) {
                    this.jQuery('#field_field [data-flavour*="sweet-"]').addClass('qolSweetBerry');
                }
                if(this.jQuery('#field_field [data-flavour*="bitter-"]').length) {
                    this.jQuery('#field_field [data-flavour*="bitter-"]').addClass('qolBitterBerry');
                }
            }
            else if (this.settings.fieldByMiddle === true) { //sort field in the middle
                this.jQuery('#field_field [data-flavour*="any-"]').removeClass('qolAnyBerry');
                this.jQuery('#field_field [data-flavour*="sour-"]').removeClass('qolSourBerry');
                this.jQuery('#field_field [data-flavour*="spicy-"]').removeClass('qolSpicyBerry');
                this.jQuery('#field_field [data-flavour*="dry-"]').removeClass('qolDryBerry');
                this.jQuery('#field_field [data-flavour*="sweet-"]').removeClass('qolSweetBerry');
                this.jQuery('#field_field [data-flavour*="bitter-"]').removeClass('qolBitterBerry');
                this.jQuery('.field').removeClass('qolGridField');
                this.jQuery('.fieldmon').removeClass('qolGridPokeSize');
                this.jQuery('.fieldmon>img').removeClass('qolGridPokeImg');

                this.jQuery('.fieldmon').addClass('qolSortMiddle');
            }
            else if (this.settings.fieldByGrid === true) { //sort field in a grid
                this.jQuery('#field_field [data-flavour*="any-"]').removeClass('qolAnyBerry');
                this.jQuery('#field_field [data-flavour*="sour-"]').removeClass('qolSourBerry');
                this.jQuery('#field_field [data-flavour*="spicy-"]').removeClass('qolSpicyBerry');
                this.jQuery('#field_field [data-flavour*="dry-"]').removeClass('qolDryBerry');
                this.jQuery('#field_field [data-flavour*="sweet-"]').removeClass('qolSweetBerry');
                this.jQuery('#field_field [data-flavour*="bitter-"]').removeClass('qolBitterBerry');
                this.jQuery('.fieldmon').removeClass('qolSortMiddle');

                this.jQuery('.field').addClass('qolGridField');
                this.jQuery('.fieldmon').addClass('qolGridPokeSize');
                this.jQuery('.fieldmon>img').addClass('qolGridPokeImg');
            }
            else {
                this.jQuery('#field_field [data-flavour*="any-"]').removeClass('qolAnyBerry');
                this.jQuery('#field_field [data-flavour*="sour-"]').removeClass('qolSourBerry');
                this.jQuery('#field_field [data-flavour*="spicy-"]').removeClass('qolSpicyBerry');
                this.jQuery('#field_field [data-flavour*="dry-"]').removeClass('qolDryBerry');
                this.jQuery('#field_field [data-flavour*="sweet-"]').removeClass('qolSweetBerry');
                this.jQuery('#field_field [data-flavour*="bitter-"]').removeClass('qolBitterBerry');
                this.jQuery('.fieldmon').removeClass('qolSortMiddle');
                this.jQuery('.field').removeClass('qolGridField');
                this.jQuery('.fieldmon').removeClass('qolGridPokeSize');
                this.jQuery('.fieldmon>img').removeClass('qolGridPokeImg');
            }

            //Pokémon click counter
            if (this.settings.fieldClickCount === false) {
                this.jQuery('#pokemonclickcount').remove();
            } else if (this.settings.fieldClickCount === true) {
                const pokemonFed = this.jQuery('.fieldmon').map(function() { return obj.jQuery(this).attr('data-fed'); }).get();

                let pokemonClicked = 0;
                for (let i = 0; i < pokemonFed.length; i++) {
                    pokemonClicked += pokemonFed[i] << 0;
                }

                const pokemonInField = this.jQuery('.fieldpkmncount').text();

                if (this.jQuery('#pokemonclickcount').length === 0) {
                    document.querySelector('.fielddata').insertAdjacentHTML('beforeend','<div id="pokemonclickcount">'+pokemonClicked+' / '+pokemonInField+' Clicked</div>');
                } else if(this.jQuery('#pokemonclickcount').text() !== (pokemonClicked+' / '+pokemonInField+' Clicked')) {
                    this.jQuery('#pokemonclickcount').text(pokemonClicked+' / '+pokemonInField+' Clicked');
                }

                if(pokemonInField !== '') {
                    if (JSON.stringify(pokemonClicked) === pokemonInField) {
                        this.jQuery('#pokemonclickcount').css({
                            'color' : '#059121'
                        });
                    }
                    if (pokemonClicked !== JSON.parse(pokemonInField)) {
                        this.jQuery('#pokemonclickcount').css({
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
                bigImgs.forEach((b) => {obj.jQuery(b).removeClass('publicfoundme');});
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
                const items = this.jQuery('.tooltip_content .item>div>.tooltip_item');
                if(items.length) {
                    const itemBigImgs = items.parent().parent().parent().parent().prev().children(`img.${cls}`);
                    this.jQuery(itemBigImgs).addClass('publicfoundme');
                }
            }

            const filteredTypeArray = this.typeArray.filter(v=>v!='');
            const filteredNatureArray = this.natureArray.filter(v=>v!='');
            const filteredEggGroupArray = this.eggGroupArray.filter(v=>v!='');

            //loop to find all the types
            if (filteredTypeArray.length > 0 || filteredNatureArray.length > 0 || filteredEggGroupArray.length > 0) {
                this.jQuery('.fieldmon').each(function() {
                    const searchPokemonBigImg = obj.jQuery(this)[0].childNodes[0];
                    const tooltipData = obj.helpers.parseFieldPokemonTooltip(obj.jQuery, GLOBALS, obj.jQuery(searchPokemonBigImg).parent().next()[0]);

                    const searchTypeOne = tooltipData.types[0] + '';
                    const searchTypeTwo = (tooltipData.types.length > 1) ? tooltipData.types[1] + '': '';

                    const searchNature = GLOBALS.NATURE_LIST[tooltipData.nature];

                    const searchEggGroup = obj.jQuery(this).next().find('.fieldmontip').
                        children(':contains(Egg Group)').eq(0).text().slice('Egg Group: '.length);

                    for (let i = 0; i < filteredTypeArray.length; i++) {
                        if ((searchTypeOne === filteredTypeArray[i]) || (searchTypeTwo === filteredTypeArray[i])) {
                            obj.jQuery(searchPokemonBigImg).addClass('publicfoundme');
                        }
                    }

                    for (let i = 0; i < filteredNatureArray.length; i++) {
                        if(searchNature === GLOBALS.NATURE_LIST[filteredNatureArray[i]]) {
                            obj.jQuery(searchPokemonBigImg).addClass('publicfoundme');
                        }
                    }

                    for (let i = 0; i < filteredEggGroupArray.length; i++) {
                        const value = GLOBALS.EGG_GROUP_LIST[filteredEggGroupArray[i]];
                        if(searchEggGroup === value ||
                       searchEggGroup.indexOf(value + '/') > -1 ||
                       searchEggGroup.indexOf('/' + value) > -1) {
                            obj.jQuery(searchPokemonBigImg).addClass('publicfoundme');
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
        const theList = this.helpers.selectSearchDiv(cls, name, dataKey, options, id, divParent, arrayName);
        const number = this.jQuery(`#${divParent}>div`).length;
        this.jQuery(`#${divParent}`).append(theList);
        this.jQuery(`.${cls}`).removeClass(cls).addClass(''+number+'');
    }
    removeSelectSearch(arr, byebye, key, settingsKey, divParent) {
        arr = this.jQuery.grep(arr, function(value) { return value != key; });
        this.settings[settingsKey] = arr.toString();

        this.jQuery(byebye).parent().remove();

        for(let i = 0; i < this.jQuery(`#${divParent}>div`).length; i++) {
            const rightDiv = i + 1;
            this.jQuery('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
        }

        return arr;
    }
    addTextField() {
        const theField = this.helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray');
        const numberDiv = this.jQuery('#searchkeys>div').length;
        this.jQuery('#searchkeys').append(theField);
        this.jQuery('.numberDiv').removeClass('numberDiv').addClass(''+numberDiv+'');
    }
    removeTextField(byebye, key) {
        this.customArray = this.jQuery.grep(this.customArray, function(value) {
            return value != key;
        });
        this.settings.fieldCustom = this.customArray.toString();

        this.jQuery(byebye).parent().remove();

        let i;
        for(i = 0; i < this.jQuery('#searchkeys>div').length; i++) {
            const rightDiv = i + 1;
            this.jQuery('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
        }
    }
}