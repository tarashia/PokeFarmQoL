class Fields {
    constructor(page) {
        let settings = UserDataHandle.getSettings();
        // determine if this is public vs private so the correct settings can be used
        if(page.name=='privateFields') {
            this.SETTING_ENABLE = PrivateFields.SETTING_ENABLE;
            this.SETTING_KEY = PrivateFields.SETTING_KEY;
            this.SUB_SETTINGS = PrivateFields.SUB_SETTINGS;
            $('#content').addClass('qolPrivateField');
        }
        else if(page.name=='publicFields') {
            this.SETTING_ENABLE = PublicFields.SETTING_ENABLE;
            this.SETTING_KEY = PublicFields.SETTING_KEY;
            this.SUB_SETTINGS = PublicFields.SUB_SETTINGS;
            $('#content').addClass('qolPublicField');
        }
        else {
            console.error('Unknown field page');
            ErrorHandler.error('Unknown field page: '+page.name);
            return;
        }
        // check if the master setting is enabled
        if(settings.QoLSettings[this.SETTING_ENABLE]) {
            Helpers.addGlobalStyle(Resources.FIELDS_CSS);
            Helpers.addGlobalStyle(Resources.SEARCH_CSS);
            // if specific features are enabled, run them
            if(settings[this.SUB_SETTINGS].pkmnlinks) {
                this.pkmnLinks();
            }
            if(settings[this.SUB_SETTINGS].tooltip) {
                this.setupTooltips(settings);
            }
            if(settings[this.SUB_SETTINGS].search) {
                this.setupSearch(settings);
                this.runSearch();
                const self = this;
                Helpers.addObserver(document.querySelector('#field_field'), {
                    childList: true,
                    subtree: true,
                }, function(mutations) {
                    // TODO: does this need to detect what's in mutations? 
                    // if so, consider also PublicFields.setupObservers
                    console.warn(mutations);
                    self.runSearch();
                });
            }
            Helpers.activateCollapses();
            // set data-group based on public vs private
            $('input.qolfieldsetting').attr('data-group',this.SETTING_KEY);
            settings.addSettingsListeners();
        }
        // don't log when disabled here, leave that to the unique classes
    }

    pkmnLinks() {
        // add modal button next to farm name
        let header = document.getElementsByTagName('h1')[0];
        let newBtn = document.createElement('button');
        header.appendChild(newBtn);
        newBtn.innerText = 'View links';
        newBtn.style= 'vertical-align:middle;margin-left: 10px;';

        let self = this;
        newBtn.onclick = function(){
            let content = '<table style="border-collapse:collapse;">';
            let fieldmon = document.getElementsByClassName('fieldmon');
            for(let i=0; i<fieldmon.length; i++){
              if(i%4==0) {
                  content += '<tr>';
              }
              let pkmnID = fieldmon[i].getAttribute('data-id');
              let small = fieldmon[i].children[1];
              let imgSRC = small.getAttribute('src');
              let pkmnName = small.getAttribute('alt');
              content += '<td style="padding:5px;border:1px solid;">' +
                          '<img style="vertical-align:middle;" src="'+imgSRC+'"> ' +
                          '<a href="/summary/'+pkmnID+'">'+pkmnName+'</a></td>';
              if(i%4==3) {
                  content += '</tr>';
              }
            }
            content += '</table>';
            self.pkmnLinksModal = new Modal('Pokemon links', content);
            self.pkmnLinksModal.open();
        }
    }

    // enable the tooltip collapse, and enable the input/setting listeners
    setupTooltips(settings) {
        $('#content').append(Resources.FIELD_TOOLTIP_HTML);
        let self = this;
        settings.registerChangeListener(function(changeDetails) {
            if(changeDetails.settingName == 'fieldHideHoverTooltips') {
                self.hideTooltips(settings);
            }
        });
        this.hideTooltips(settings);
    }
    // add & remove the class that hides hover tooltips based on the current setting
    hideTooltips(settings) {
        if(settings[this.SETTING_KEY].fieldHideHoverTooltips) {
            $('#field_field').addClass('qolHideTooltips');
        }
        else {
            $('#field_field').removeClass('qolHideTooltips');
        }
    }

    setupSearch(settings) {
        let self = this;
        $('#content').append(Resources.FIELD_SEARCH_HTML);
        // if any related settings change, re-run the search
        settings.registerChangeListener(function(changeDetails) {
            if(changeDetails.settingGroup==self.SETTING_KEY) {
                self.runSearch();
            }
        });

        // TODO: display existing search values
        // TODO: search term buttons & resulting box listeners
        
        // handlers to add/remove search options
        $(document).on('click', '#addFieldTypeSearch', (function() { 
            console.log('add type');
            console.log(this);
        }));
        $(document).on('click', '#removeFieldTypeSearch', (function() { 
            console.log('remove type');
            console.log(this);
        }));
        $(document).on('click', '#addFieldNatureSearch', (function() { 
            console.log('add nature');
            console.log(this);
        }));
        $(document).on('click', '#removeFieldNature', (function() { 
            console.log('remove nature');
            console.log(this);
        }));
        $(document).on('click', '#addFieldEggGroupSearch', (function() { 
            console.log('add egg group');
            console.log(this);
        }));
        $(document).on('click', '#removeFieldEggGroup', (function() { 
            console.log('remove egg group');
            console.log(this);
        }));
        $(document).on('click', '#addTextField', (function() {
            console.log('add text field');
            console.log(this);
        }));
        $(document).on('click', '#removeTextField', (function() {
            console.log('remove text field');
            console.log(this);
        }));
    }

    runSearch() {
        console.warn('TODO: field search');
        // something like... read current settings, iterate over pkmn, call tooltip parser, decide if highlight?
    }
    
    static parseFieldPokemonTooltip(tooltip) {
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
        //types = types.map(idx => Globals.TYPE_LIST.indexOf(types[idx]));
        types = types.map(idx => Object.values(Resources.TYPE_LIST).indexOf(types[idx]));
        // TODO: this is very hacky, consider cleaning up this whole builder
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
                //nature = Resources.NATURE_LIST.indexOf(nature); // .substring(0, nature.length-1))
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

        const tooltipData = {
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
            tooltipData.forme = forme;
        }
        return tooltipData;
    } 
}