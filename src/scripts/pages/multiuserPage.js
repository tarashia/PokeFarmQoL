class MultiuserPage extends Page {
    constructor() {
        super(Globals.MULTIUSER_PAGE_SETTINGS_KEY, {
            hideDislike: false,
            hideAll: false,
            niceTable: false,
        }, 'users/');
        const obj = this;
        this.observer = new MutationObserver(function (mutations) {
            // eslint-disable-next-line no-unused-vars
            mutations.forEach(function (mutation) {
                obj.partyModification();
            });
        });
    }

    settingsChange(element, textElement, customClass, typeClass, arrayName) {
        if (super.settingsChange(element, textElement, customClass, typeClass, arrayName) === false) {
            return false;
        }

        const mutuallyExclusive = ['hideAll', 'hideDislike', 'niceTable'];
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
    }
    setupCSS() {
        const menuBackground = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('background-color');
        $('#qolpartymod').css('background-color', '' + menuBackground + '');
        const menuColor = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('color');
        $('#qolpartymod').css('color', '' + menuColor + '');
    }
    setupObserver() {
        this.observer.observe(document.querySelector('#multiuser'), {
            childList: true,
            subtree: true,
        });
    }
    setupHandlers() {
        const obj = this;
        $(window).on('load', (function () {
            obj.loadSettings();
            obj.partyModification();
        }));

        let resizeTimer;
        $(window).resize(function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                obj.loadSettings();
                obj.partyModification();
            }, 100);
        });

        $(document).on('click input', '#qolpartymod', (function () {
            // the hide all option needs a delay like the resize timer to work when first clicked
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                obj.partyModification();
            }, 100);
        }));

        $(document).on('click', '.tabbed_interface', (function () {
            obj.partyModification();
        }));

        $(document).on('change', '.qolsetting', (function () {
            obj.loadSettings();
            obj.settingsChange(this.getAttribute('data-key'),
                $(this).val(),
                $(this).parent().parent().attr('class'),
                $(this).parent().attr('class'));
            obj.partyModification();
            obj.saveSettings();
        }));

        $('input.qolalone').on('change', function () { //only 1 checkbox may be true
            $('input.qolalone').not(this).prop('checked', false);
        });

    }
    partyModification() {
        // first, remove any existing selection
        const btns = $('#multiuser .party>div .action a');
        $('#multiuser').removeClass('qolPartyHideDislike');
        $('#multiuser').removeClass('qolPartyNiceTable');
        $('#multiuser').removeClass('qolPartyHideAll');
        if(btns) {
            btns.css({"top":0,"left":0});
        }

        if (this.settings.hideDislike === true) {
            $('#multiuser').addClass('qolPartyHideDislike');
        }

        if (this.settings.niceTable === true) {
            $('#multiuser').addClass('qolPartyNiceTable');
        }

        if (this.settings.hideAll === true) {
            $('#multiuser').addClass('qolPartyHideAll');
            const nextLink = $('.mu_navlink.next');
            // on chrome, sometimes .position() is undefined on load
            if(btns && nextLink && nextLink.position()) {
                btns.css(nextLink.position());
            }
        }
    }
}
