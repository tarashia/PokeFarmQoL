class MultiuserPage extends Page {
    constructor() {
        super(Globals.MULTIUSER_PAGE_SETTINGS_KEY, {
            hideDislike: false,
            hideAll: false,
            niceTable: false,
            customParty: false,
            stackNextButton: true,
            stackMoreButton: true,
            showPokemon: true,
            compactPokemon: true,
            clickablePokemon: false,
            showTrainerCard: true,
            showFieldButton: false,
            showModeChecks: false,
            showUserName: true
        }, 'users/');
        const obj = this;
        this.observer = new MutationObserver(function (mutations) {
            let doMod = false;
            mutations.forEach(function (mutation) {
                if($(mutation.target).attr('id') == 'partybox'){
                    // many mutations fire, so limit calls to party mod to prevent excess and looping calls
                    // #partybox is when the next button is added, making it a convenient time to run the mods
                    doMod = true;
                }
            });
            if(doMod) {
                obj.partyModification();
            }
        });
    }

    settingsChange(element, textElement, customClass, typeClass, arrayName) {
        if (super.settingsChange(element, textElement, customClass, typeClass, arrayName) === false) {
            return false;
        }

        const mutuallyExclusive = ['hideAll', 'hideDislike', 'niceTable', 'customParty'];
        const idx = mutuallyExclusive.indexOf(element);
        if (idx > -1) {
            for (let i = 0; i < mutuallyExclusive.length; i++) {
                if (i !== idx) {
                    this.settings[mutuallyExclusive[i]] = false;
                }
            }
            return true;
        }
        else { return false; }
    }
    setupHTML() {
        document.querySelector('#multiuser').insertAdjacentHTML('beforebegin', Resources.partyModHTML());
        document.querySelector('#multiuser').insertAdjacentHTML('beforebegin', Resources.partyModCustomHTML());
    }
    setupCSS() {
        const menuBackground = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('background-color');
        $('#qolpartymod').css('background-color', '' + menuBackground + '');
        const menuColor = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('color');
        $('#qolpartymod').css('color', '' + menuColor + '');
    }
    setupObserver() {
        // don't observe the whole party area as it may cause excess firing
        this.observer.observe(document.querySelector('#multiuser'), {
            childList: true,
            subtree: true,
        });
    }
    setupHandlers() {
        const obj = this;

        $(window).resize(function() {
            obj.loadSettings();
            setTimeout(() => {
                // the hide all alignment works better with the timeout
                obj.partyModification();
            }, 100);
        });

        $(document).on('change', '.qolsetting', (function () {
            obj.loadSettings();
            obj.settingsChange(this.getAttribute('data-key'),
                $(this).val(),
                $(this).parent().parent().attr('class'),
                $(this).parent().attr('class'));
            obj.saveSettings();
            obj.partyModification();
        }));

        $('input.qolalone').on('change', function () { //only 1 checkbox may be true
            $('input.qolalone').not(this).prop('checked', false);
        });

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
    partyModification() {
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

        if (this.settings.hideDislike === true) {
            $('#multiuser').addClass('qolPartyHideDislike');
            $('#multiuser').addClass('qolPartyModded');
        }

        if (this.settings.niceTable === true) {
            $('#multiuser').addClass('qolPartyNiceTable');
            $('#multiuser').addClass('qolPartyModded');
        }

        if (this.settings.hideAll === true) {
            $('#multiuser').addClass('qolPartyHideAll');
            $('#multiuser').addClass('qolPartyModded');
            const nextLink = $('.mu_navlink.next');
            // on chrome, sometimes .position() is undefined on load
            if(btns && nextLink && nextLink.position()) {
                btns.css(nextLink.position());
            }
        }

        if (this.settings.customParty === true) {
            $('#multiuser').addClass('qolPartyCustomParty');
            $('#multiuser').addClass('qolPartyModded');
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
            this.partymodHelper('qolStackNext',this.settings.stackNextButton === true);
            this.partymodHelper('qolStackMore',this.settings.stackMoreButton === true);
            this.partymodHelper('qolHideParty',this.settings.showPokemon === false);
            this.partymodHelper('qolCompactParty',this.settings.compactPokemon === true);
            this.partymodHelper('qolHideTrainerCard',this.settings.showTrainerCard === false);
            this.partymodHelper('qolHideFieldButton',this.settings.showFieldButton === false);
            this.partymodHelper('qolHideModeChecks',this.settings.showModeChecks === false);
            this.partymodHelper('qolHideUserName',this.settings.showUserName === false);

            // clickable compact pokemon
            if(this.settings.showPokemon === true 
                && this.settings.compactPokemon === true  
                && this.settings.clickablePokemon === true ) 
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
