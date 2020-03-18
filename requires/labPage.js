class LabPage {
    SETTINGS_SAVE_KEY() { return 'QoLLab'; }
     DEFAULT_SETTINGS() { return {
        findLabEgg: "",
        findLabType: "",
    }};
    constructor() {
        this.settings = this.DEFAULT_SETTINGS();
        this.searchArray = [];
        this.listArray = [];
	const obj = this;
        this.observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                obj.customSearch();
            });
        });
    }
    
    settingsChange(element, textElement, customClass, typeClass) {
        if (element === 'findLabEgg') {
            let tempIndex = customClass - 1;
            this.searchArray[tempIndex] = textElement;
            this.settings.findLabEgg = this.searchArray.toString();
            return true;
        }
        else if(element === 'findLabType') {
            if (textElement === 'none') {
                let tempIndex = typeClass - 1;
                this.listArray.splice(tempIndex, tempIndex);
                this.settings.findLabType = this.listArray.toString();
            } else {
                let tempIndex = typeClass - 1;
                this.listArray[tempIndex] = textElement;
                this.settings.findLabType = this.listArray.toString();
            }
            return true;
        }
        else { return false; }
    }
    setupHTML() {
        document.querySelector('#eggsbox360>p.center').insertAdjacentHTML('afterend', TEMPLATES.labOptionsHTML);
        document.querySelector('#egglist').insertAdjacentHTML('afterend', '<div id="labsuccess"></div>');

        let theField = `<div class='numberDiv'><label><input type="text" class="qolsetting" data-key="findLabEgg"/></label><input type='button' value='Remove' id='removeLabSearch'></div>`;
        this.searchArray = this.settings.findLabEgg.split(',');
        let numberOfValue = this.searchArray.length;

        for (let i = 0; i < numberOfValue; i++) {
            let rightDiv = i + 1;
            let rightValue = this.searchArray[i];
            $('#searchkeys').append(theField);
            $('.numberDiv').removeClass('numberDiv').addClass(""+rightDiv+"").find('.qolsetting').val(rightValue);
        }

        let theType = `<div class='typeNumber'> <select name="types" class="qolsetting" data-key="findLabType"> ` + GLOBALS.TYPE_OPTIONS + ` </select> <input type='button' value='Remove' id='removeLabTypeList'> </div>`;
        this.listArray = this.settings.findLabType.split(',');
        let numberOfType = this.listArray.length;

        for (let o = 0; o < numberOfType; o++) {
            let rightDiv = o + 1;
            let rightValue = this.listArray[o];
            $('#labTypes').append(theType);
            $('.typeNumber').removeClass('typeNumber').addClass(""+rightDiv+"").find('.qolsetting').val(rightValue);
        }
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
            obj.settingsChange(this.getAttribute('data-key'), $(this).val(), $(this).parent().parent().attr('class'), $(this).parent().attr('class'));
            obj.customSearch();
            obj.saveSettings();
        }));

        $(window).on('load', (function(e) {
            obj.customSearch();
        }));
    }
    addTextField() {
        let theField = `<div class='numberDiv'><label><input type="text" class="qolsetting" data-key="findLabEgg"/></label><input type='button' value='Remove' id='removeLabSearch'></div>`;
        let numberDiv = $('#searchkeys>div').length;
        $('#searchkeys').append(theField);
        $('.numberDiv').removeClass('numberDiv').addClass(""+numberDiv+"");
    }
    removeTextField(byebye, key) {
        // when textfield is removed, the value will be deleted from the localstorage
        thisx.searchArray = $.grep(this.searchArray, function(value) {
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
        let theList = `<div class='typeNumber'> <select name="types" class="qolsetting" data-key="findLabType"> ` + GLOBALS.TYPE_OPTIONS + `</select> <input type='button' value='Remove' id='removeLabTypeList'> </div>`;
        let numberTypes = $('#labTypes>div').length;
        $('#labTypes').append(theList);
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
            let typesArrayNoEmptySpace = this.listArray.filter(v=>v!='');
            let typeSearchAmount = typesArrayNoEmptySpace.length;
            for (let i = 0; i < typeSearchAmount; i++) {
                let value = typesArrayNoEmptySpace[i];
                let amountOfTypesFound = [];
                let typePokemonNames = [];

                $('#egglist>div>h3').each(function() {
                    let searchPokemon = ($(this).text().split(' ')[0]);
                    let searchTypeOne = dexData[dexData.indexOf('"'+searchPokemon+'"') + 1];
                    let searchTypeTwo = dexData[dexData.indexOf('"'+searchPokemon+'"') + 2];
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
            }
        } // else

        if (this.searchArray.length == 1 && this.searchArray[0] == "") {
            let iDontDoAnything = true;
        } else {
            let customSearchAmount = this.searchArray.length;
        
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
        } // else
    } // customSearch
}

const labPage = new LabPage()
