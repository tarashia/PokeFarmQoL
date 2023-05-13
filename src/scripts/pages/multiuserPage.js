class MultiuserPage extends Page {
    constructor() {
        super();
        this.setupHTML();
        this.setupObservers();
        this.setupHandlers();
    }
    
    setupObservers() {
        const self = this;
        // don't observe the whole party area as it may cause excess firing
        this.addObserver(document.querySelector('#multiuser'), {
            childList: true,
            subtree: true,
        }, function(mutations) {
            let doMod = false;
            mutations.forEach(function (mutation) {
                if($(mutation.target).attr('id') == 'partybox'){
                    // many mutations fire, so limit calls to party mod to prevent excess and looping calls
                    // #partybox is when the next button is added, making it a convenient time to run the mods
                    doMod = true;
                }
            });
            if(doMod) {
                // TODO: when going very fast, the get more class may not get added properly
                // figure out a time to re-detect, and fix the classes accordingly
                self.partyModification();
            }
        });
    }

    setupHTML() {
        Helpers.addGlobalStyle(Resources.PARTY_CSS);
        document.querySelector('#multiuser').insertAdjacentHTML('beforebegin', Resources.PARTY_MOD_HTML);
        const menuBackground = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('background-color');
        $('#qolpartymod').css('background-color', '' + menuBackground + '');
        const menuColor = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('color');
        $('#qolpartymod').css('color', '' + menuColor + '');
    }

    setupHandlers() {
        const self = this;
        $(window).resize(function() {
            setTimeout(() => {
                // the hide all alignment works better with the timeout
                self.partyModification();
            }, 100);
        });
        // listener for the custom accordion (TODO: use existing accordion handlers if they exist?)
        $('#qolpartymodcustom h3 a').on('click', function() {
            if($('#qolpartymodcustom h3').hasClass('active')) {
                $('#qolpartymodcustom h3').removeClass('active');
                $('#qolpartymodcustom > div').css('display','none');
            }
            else {
                $('#qolpartymodcustom h3').addClass('active');
                $('#qolpartymodcustom > div').css('display','block');
            }
        });
        const settings = UserDataHandle.getSettings();
        settings.addSettingsListeners();
        settings.registerChangeListener(function() {
            self.partyModification();
        });
    }

    // changes that all available mods make
    sharedPartyMods() {
        $('#multiuser').addClass('qolPartyModded');
        // change any berry to sour so it gets a bg color
        $('.berrybuttons[data-up="any"]').attr('data-up','sour'); 
    }

    partyModification() {
        console.log('running party mod');
        // get page-specific settings
        const partySettings = UserDataHandle.getSettings().QoLMultiuser;

        // first, remove any existing selection (all qol classes)
        let classList = document.getElementById('multiuser').className.split(/\s+/);
        for (let i = 0; i < classList.length; i++) {
            if (classList[i].match(/^qol/)) {
                $('#multiuser').removeClass(classList[i]);
            }
        }
        $('#qolpartymodcustom').css('display','none');
        $('.party .pkmn a.qolCompactLink').remove();

        const btns = $('#multiuser .party>div .action a');
        if(btns) {
            btns.css({"top":0,"left":0});
        }

        if (partySettings.partyModType == 'hideDislike') {
            console.log('party mod: hide dislike');
            $('#multiuser').addClass('qolPartyHideDislike');
            this.sharedPartyMods();
        }

        else if (partySettings.partyModType == 'niceTable') {
            console.log('party mod: nice table');
            $('#multiuser').addClass('qolPartyNiceTable');
            this.sharedPartyMods();
        }

        else if (partySettings.partyModType == 'hideAll') {
            console.log('party mod: hide all');
            $('#multiuser').addClass('qolPartyHideAll');
            this.sharedPartyMods();
            const nextLink = $('.mu_navlink.next');
            // on chrome, sometimes .position() is undefined on load
            if(btns && nextLink && nextLink.position()) {
                btns.css(nextLink.position());
            }
        }

        else if (partySettings.partyModType == 'customParty') {
            console.log('party mod: customize');
            $('#multiuser').addClass('qolPartyCustomParty');
            this.sharedPartyMods();
            $('#qolpartymodcustom').css('display','block');

            // differentiate next and more buttons
            let next = $('.mu_navlink.next');
            if(next.text() == 'Get more +') {
                next.addClass('qolGetMore');
            }
            else {
                next.addClass('qolGoNext');
            }

            // hide classes are inverted
            this.partymodHelper('qolStackNext',partySettings.stackNextButton === true);
            this.partymodHelper('qolStackMore',partySettings.stackMoreButton === true);
            this.partymodHelper('qolHideParty',partySettings.showPokemon === false);
            this.partymodHelper('qolCompactParty',partySettings.compactPokemon === true);
            this.partymodHelper('qolHideTrainerCard',partySettings.showTrainerCard === false);
            this.partymodHelper('qolHideFieldButton',partySettings.showFieldButton === false);
            this.partymodHelper('qolHideModeChecks',partySettings.showModeChecks === false);
            this.partymodHelper('qolHideUserName',partySettings.showUserName === false);

            // clickable compact pokemon
            if(partySettings.showPokemon === true 
                && partySettings.compactPokemon === true  
                && partySettings.clickablePokemon === true ) 
            {
                $('.party .pkmn').each(function() {
                    const pkmnID = $(this.parentElement).attr('data-pid');
                    if(pkmnID) {
                        $(this).append('<a class="qolCompactLink" href="/summary/'+pkmnID+'"></a>');
                    }
                });
            }
        }
        
        else if (partySettings.partyModType !== 'noMod') {
            ErrorHandler.warn('Invalid party mod type: '+partySettings.partyModType);
        }
    }

    // toggle setting should be true to add the class, false to remove it
    partymodHelper(toggleClass, toggleSetting) {
        if(toggleSetting) {
            $('#multiuser').addClass(toggleClass);
        }
        else {
            $('#multiuser').removeClass(toggleClass);
        }
    }
}
