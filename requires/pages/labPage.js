const LabBase = (module) ? require('./basePage').Page : Page;
    
class LabPage extends LabBase {
    constructor() {
	    super('QoLLab', {
            findLabEgg: "", // same as findCustom in shelter
            customEgg: true,
            findLabType: "", // same as findType in shelter
            findTypeEgg: true,
    	}, '/lab')
        this.searchArray = [];
        this.listArray = [];
    	const obj = this;
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
        document.querySelector('#eggsbox360>p.center').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.labOptionsHTML);
        document.querySelector('#egglist').insertAdjacentHTML('afterend', '<div id="labsuccess"></div>');

        const theField = Helpers.textSearchDiv('numberDiv', 'findLabEgg', 'removeLabSearch', 'searchArray')
        const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'findLabType', GLOBALS.TYPE_OPTIONS,
                                             'removeLabTypeList', 'labTypes', 'listArray');

        this.searchArray = this.settings.findLabEgg.split(',');
        this.listArray = this.settings.findLabType.split(',');

	Helpers.setupFieldArrayHTML(this.searchArray, 'searchkeys', theField, 'numberDiv')
	Helpers.setupFieldArrayHTML(this.listArray, 'labTypes', theType, 'typeNumber')
    }
    setupCSS() {
        //lab css
        let labSuccessCss = $('#labpage>div').css('background-color');
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
    setupHandlers() {
	const obj = this;
        $(document).on('click', '#addLabSearch', (function() { //add lab text field
            obj.addTextField();
        }));

        $(document).on('click', '#removeLabSearch', (function() { //remove lab text field
            obj.removeTextField(this, $(this).parent().find('input').val());
            obj.saveSettings();
        }));

        $(document).on('click', '#addLabTypeList', (function() { //add lab type list
            obj.addTypeList();
        }));

        $(document).on('click', '#removeLabTypeList', (function() { //remove lab type list
            obj.removeTypeList(this, $(this).parent().find('select').val());
            obj.saveSettings();
        }));

        $(document).on('change', '#labCustomSearch input', (function() { //lab search
            obj.customSearch();
        }));

        $(document).on('click', '#labpage', (function() { //shelter search
            obj.customSearch();
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

        $(window).on('load', (function(e) {
            obj.customSearch();
        }));
    }
    addTextField() {
        const theField = Helpers.textSearchDiv('numberDiv', 'findLabEgg', 'removeLabSearch', 'searchArray')
        let numberDiv = $('#searchkeys>div').length;
        $('#searchkeys').append(theField);
        $('.numberDiv').removeClass('numberDiv').addClass(""+numberDiv+"");
    }
    removeTextField(byebye, key) {
        // when textfield is removed, the value will be deleted from the localstorage
        this.searchArray = $.grep(this.searchArray, function(value) {
            return value != key;
        });
        this.settings.findCustom = this.searchArray.toString()

        $(byebye).parent().remove();

        for(let i = 0; i < $('#searchkeys>div').length; i++) {
            let rightDiv = i + 1;
            $('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
        }
    }
    addTypeList() {
        const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'findLabType', GLOBALS.TYPE_OPTIONS,
                                             'removeLabTypeList', 'labTypes', 'listArray');	
        let numberTypes = $('#labTypes>div').length;
        $('#labTypes').append(theType);
        $('.typeNumber').removeClass('typeNumber').addClass(""+numberTypes+"");
    }
    removeTypeList(byebye, key) {
        this.listArray = $.grep(this.listArray, function(value) {
            return value != key;
        });
        this.settings.findType = this.listArray.toString()

        $(byebye).parent().remove();

        for(let i = 0; i < $('#shelterTypes>div').length; i++) {
            let rightDiv = i + 1;
            $('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
        }
    }
    customSearch() {
        let dexData = GLOBALS.DEX_DATA;
        document.querySelector('#labsuccess').innerHTML="";
        $('#egglist>div>img').removeClass('shelterfoundme');

        if (this.listArray.length == 1 && this.listArray[0] == "") {
            let iDontWork = true;
        } else {
            if (this.settings.findTypeEgg === true) {
                const egg_pngs_to_types = GLOBALS.EGGS_PNG_TO_TYPES_LIST ||
                    JSON.parse(localStorage.getItem('QoLEggTypesMap')) || undefined;
                let typesArrayNoEmptySpace = this.listArray.filter(v=>v!='');
                let typeSearchAmount = typesArrayNoEmptySpace.length;
                for (let i = 0; i < typeSearchAmount; i++) {
                    let value = typesArrayNoEmptySpace[i];
                    let amountOfTypesFound = [];
                    let typePokemonNames = [];

                    $('#egglist>div>h3').each(function() {
                        let searchPokemon = ($(this).text().split(' ')[0]);
                        let searchTypeOne = "";
                        let searchTypeTwo = "";
                        
                        if(egg_pngs_to_types) {
                            let imgUrl = $(this).next().attr('src').replace('https://pfq-static.com/img/', '');
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
                        if (searchTypeOne === value) {
                            amountOfTypesFound.push('found');
                            typePokemonNames.push(searchPokemon);
                        }

                        if (searchTypeTwo === value) {
                            amountOfTypesFound.push('found');
                            typePokemonNames.push(searchPokemon);
                        }
                    }) // each

                    let foundType = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(value) + 2];

                    let typeImgStandOutLength = typePokemonNames.length;
                    for (let o = 0; o < typeImgStandOutLength; o++) {
                        let value = typePokemonNames[o];
                        let shelterImgSearch = $("#egglist>div>h3:containsIN("+value+")")
                        let shelterBigImg = shelterImgSearch.next();
                        $(shelterBigImg).addClass('shelterfoundme');
                    }

                    if (amountOfTypesFound.length < 1) {
                        let iDontDoAnything = true;
                    } else if (amountOfTypesFound.length > 1) {
                        document.querySelector('#labsuccess').insertAdjacentHTML('beforeend','<div id="labfound">'+amountOfTypesFound.length+' '+foundType+' egg types found! ('+typePokemonNames.toString()+')</div>');
                    } else {
                        document.querySelector('#labsuccess').insertAdjacentHTML('beforeend','<div id="labfound">'+amountOfTypesFound.length+' '+foundType+' egg type found! ('+typePokemonNames.toString()+')</div>');
                    }
                } // for
            } // if
        } // else

        if (this.searchArray.length == 1 && this.searchArray[0] == "") {
            let iDontDoAnything = true;
        } else {
            let customSearchAmount = this.searchArray.length;
            
            if (this.settings.customEgg === true) {
                for (let i = 0; i < customSearchAmount; i++) {
                    let value = this.searchArray[i];
                    if ($("#egglist>div>h3:containsIN("+value+")").length) {
                        let searchResult = value;

                        let shelterImgSearch = $("#egglist>div>h3:containsIN("+value+")")
                        let shelterBigImg = shelterImgSearch.next();
                        $(shelterBigImg).addClass('shelterfoundme');

                        if ($("#egglist>div>h3:containsIN("+value+")").length > 1) {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend','<div id="labfound">'+searchResult+' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                        } else {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend','<div id="labfound">'+searchResult+' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                        }
                    } // if

                    if ($('#egglist>div img[src*="'+value+'"]').length) {
                        let searchResult = $('#egglist>div img[src*="'+value+'"]').prev().text();

                        let shelterImgSearch = $('#egglist>div img[src*="'+value+'"]')
                        $(shelterImgSearch).addClass('shelterfoundme');

                        if ($('#egglist>div img[src*="'+value+'"]').length > 1) {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend','<div id="labfound">'+searchResult+' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                        } else {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend','<div id="labfound">'+searchResult+' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                        }
                    } // if
                } // for
            } // if
        } // else
    } // customSearch
}