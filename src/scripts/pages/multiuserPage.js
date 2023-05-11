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

    }

    // changes that all available mods make
    sharedPartyMods() {
        $('#multiuser').addClass('qolPartyModded');
        // change any berry to sour so it gets a bg color
        $('.berrybuttons[data-up="any"]').attr('data-up','sour'); 
    }

    partyModification() {
        // get page-specific settings
        const settings = UserDataHandle.getSettings().pageSettings['QoLMultiuser'];

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

        if (settings.hideDislike === true) {
            $('#multiuser').addClass('qolPartyHideDislike');
            this.sharedPartyMods();
        }

        if (settings.niceTable === true) {
            $('#multiuser').addClass('qolPartyNiceTable');
            this.sharedPartyMods();
        }

        if (settings.hideAll === true) {
            $('#multiuser').addClass('qolPartyHideAll');
            this.sharedPartyMods();
            const nextLink = $('.mu_navlink.next');
            // on chrome, sometimes .position() is undefined on load
            if(btns && nextLink && nextLink.position()) {
                btns.css(nextLink.position());
            }
        }

        if (settings.customParty === true) {
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
            this.partymodHelper('qolStackNext',settings.stackNextButton === true);
            this.partymodHelper('qolStackMore',settings.stackMoreButton === true);
            this.partymodHelper('qolHideParty',settings.showPokemon === false);
            this.partymodHelper('qolCompactParty',settings.compactPokemon === true);
            this.partymodHelper('qolHideTrainerCard',settings.showTrainerCard === false);
            this.partymodHelper('qolHideFieldButton',settings.showFieldButton === false);
            this.partymodHelper('qolHideModeChecks',settings.showModeChecks === false);
            this.partymodHelper('qolHideUserName',settings.showUserName === false);

            // clickable compact pokemon
            if(settings.showPokemon === true 
                && settings.compactPokemon === true  
                && settings.clickablePokemon === true ) 
            {
                $('.party .pkmn').each(function() {
                    const pkmnID = $(this.parentElement).attr('data-pid');
                    if(pkmnID) {
                        $(this).append('<a class="qolCompactLink" href="/summary/'+pkmnID+'"></a>');
                    }
                });
            }
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
