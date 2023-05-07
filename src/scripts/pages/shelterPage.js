class ShelterPage extends Page {
    constructor() {
        const defaultPageSettings = {
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
            findTotem: false,
            findLegendary: false,
            shelterGrid: true,
            shelterSpriteSize: 'auto',
            quickTypeSearch: [],
            fullOptionSearch: {},
            quickPkmnSearch: [],
            fullPkmnSearch: {}
        };
        super(Globals.SHELTER_PAGE_SETTINGS_KEY, defaultPageSettings, 'shelter');
        this.customArray = [];
        this.typeArray = [];
        const obj = this;
        this.observer = new MutationObserver(function (event) {
            console.log('mutation observed');
            console.log(event);
            obj.customSearch();
        });

        /*
         * used to keep track of the currently selected match
         * matches can be selected via a shortcut key
         */
        this.selectNextMatchKey = 78; // 'n'
        this.currentlySelectedMatch = undefined;
    }

    setupHTML() {
        if(this.USER_SETTINGS.shelterFeatureEnables.search) {
            $('.tabbed_interface.horizontal>div').removeClass('tab-active');
            $('.tabbed_interface.horizontal>ul>li').removeClass('tab-active');
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterbegin', '<li class="tab-active"><label>Search</label></li>');
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterend', Resources.shelterOptionsHTML());
            $('#shelteroptionsqol').addClass('tab-active');
            //this.showSearchSettings();
        }
        if(this.USER_SETTINGS.shelterFeatureEnables.sort) {
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterbegin', '<li class=""><label>Sort</label></li>');
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterend', Resources.shelterSortHTML());
            this.handleSortSettings();
        }
    }
    setupCSS() {
        if(this.USER_SETTINGS.shelterFeatureEnables.search ||
            this.USER_SETTINGS.shelterFeatureEnables.sort) {
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
    setupHandlers() {
        const obj = this;

        this.addSettingChangeListener(function() {
            obj.customSearch();
            obj.handleSortSettings();
        });

        $('#qolQuickTextBtn').on('click',function() {
        });
        $('#qolQuickTypeBtn').on('click',function() {
        });

        // listen for next match hotkey
        $(window).on('keyup', function (a) {
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
    customSearch() {
        console.log('TODO: custom search trigger');
    }
    handleSortSettings() {
        //sort in grid
        $('#shelterarea').removeClass('qolshelterareagrid');

        if (this.settings.shelterGrid === true) { //shelter grid
            $('#shelterarea').addClass('qolshelterareagrid');
        }

        // sprite size mode
        $('#shelterarea').removeClass('qolshelterarealarge');
        $('#shelterarea').removeClass('qolshelterareasmall');
        $('input[name="shelterSpriteSize"]').prop('checked',false);
        if(this.settings.shelterSpriteSize == 'large') {
            $('#shelterarea').addClass('qolshelterarealarge');
            $('#spriteSizeLarge').prop('checked',true);
        }
        else if(this.settings.shelterSpriteSize == 'small') {
            $('#shelterarea').addClass('qolshelterareasmall');
            $('#spriteSizeSmall').prop('checked',true);
        }
        else {
            $('#spriteSizeAuto').prop('checked',true);
        }
    }
}
