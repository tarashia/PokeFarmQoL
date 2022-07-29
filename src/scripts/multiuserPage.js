class MultiuserPage extends Page {
    constructor(jQuery, localStorageMgr, helpers, GLOBALS) {
        super(jQuery, localStorageMgr, helpers, GLOBALS.MULTIUSER_PAGE_SETTINGS_KEY, {
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
    setupHTML(GLOBALS) {
        document.querySelector('#multiuser').insertAdjacentHTML('beforebegin', GLOBALS.TEMPLATES.partyModHTML);
    }
    setupCSS() {
        const menuBackground = this.jQuery('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('background-color');
        this.jQuery('#qolpartymod').css('background-color', '' + menuBackground + '');
        const menuColor = this.jQuery('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('color');
        this.jQuery('#qolpartymod').css('color', '' + menuColor + '');
    }
    setupObserver() {
        this.observer.observe(document.querySelector('#multiuser'), {
            childList: true,
            subtree: true,
        });
    }
    setupHandlers() {
        const obj = this;
        obj.jQuery(window).on('load', (function () {
            obj.loadSettings();
            obj.partyModification();
        }));

        let resizeTimer;
        obj.jQuery(window).resize(function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                obj.loadSettings();
                obj.partyModification();
            }, 100);
        });

        obj.jQuery(document).on('click input', '#qolpartymod', (function () {
            // the hide all option needs a delay like the resize timer to work when first clicked
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                obj.partyModification();
            }, 100);
        }));

        obj.jQuery(document).on('click', '.tabbed_interface', (function () {
            obj.partyModification();
        }));

        obj.jQuery(document).on('change', '.qolsetting', (function () {
            obj.loadSettings();
            obj.settingsChange(this.getAttribute('data-key'),
                obj.jQuery(this).val(),
                obj.jQuery(this).parent().parent().attr('class'),
                obj.jQuery(this).parent().attr('class'));
            obj.partyModification();
            obj.saveSettings();
        }));

        obj.jQuery('input.qolalone').on('change', function () { //only 1 checkbox may be true
            obj.jQuery('input.qolalone').not(this).prop('checked', false);
        });

    }
    partyModification() {
        // first, remove any existing selection
        const btns = '#multiuser .party>div .action a';
        this.jQuery('#multiuser').removeClass('qolPartyHideDislike');
        this.jQuery('#multiuser').removeClass('qolPartyNiceTable');
        this.jQuery('#multiuser').removeClass('qolPartyHideAll');
        this.jQuery(btns).css({"top":0,"left":0});;

        if (this.settings.hideDislike === true) {
            this.jQuery('#multiuser').addClass('qolPartyHideDislike');
        }

        if (this.settings.niceTable === true) {
            this.jQuery('#multiuser').addClass('qolPartyNiceTable');
        }

        if (this.settings.hideAll === true) {
            this.jQuery('#multiuser').addClass('qolPartyHideAll');
            this.jQuery(btns).css(this.jQuery('.mu_navlink.next').position());
        }
    }
}
