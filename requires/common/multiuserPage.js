/* globals Page */
const MultiuserBase = Page;

// eslint-disable-next-line no-unused-vars
class MultiuserPage extends MultiuserBase {
    constructor(jQuery) {
        super(jQuery, 'QoLMultiuser', {
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
        });
    }
    setupHandlers() {
        const obj = this;
        obj.jQuery(window).on('load', (function () {
            obj.loadSettings();
            obj.partyModification();
        }));

        obj.jQuery(document).on('click input', '#qolpartymod', (function () {
            obj.partyModification();
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

        obj.jQuery('input.qolalone').on('change', function () { //only 1 textbox may be true
            obj.jQuery('input.qolalone').not(this).prop('checked', false);
        });
    }
    partyModification() {
        if (this.settings.hideDislike === false && this.settings.hideAll === false && this.settings.niceTable === false) {
            this.jQuery('#trainerimage').removeClass('qolpartyclickhide');
            this.jQuery('#profilebox').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .pkmn').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .name').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .expbar').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .taste').removeClass('qolpartyclickhide');
            this.jQuery('#partybox .party>div>.action.working').removeClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons:not([data-up=\'sour\'])>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons:not([data-up=\'spicy\'])>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons:not([data-up=\'dry\'])>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons:not([data-up=\'sweet\'])>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons:not([data-up=\'bitter\'])>[data-berry=\'rawst\']').removeClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'sour\']>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons[data-up=\'spicy\']>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons[data-up=\'dry\']>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons[data-up=\'sweet\']>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons[data-up=\'bitter\']>[data-berry=\'rawst\']').removeClass('qolpartyclickwidth');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'any\']>[data-berry]').removeClass('qolpartyclickblock');
            this.jQuery('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .party>div').removeClass('qolpartyclickalot');
            this.jQuery('#multiuser .party>div>.action a[data-berry]').removeClass('qolpartyclickz');
            this.jQuery('.mu_navlink.next').removeClass('qolpartyclicknav');
            this.jQuery('#multiuser .party').removeClass('qolpartyclickpartywidth');
            this.jQuery('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
            this.jQuery('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
            this.jQuery('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
            this.jQuery('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
            this.jQuery('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
            this.jQuery('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
            this.jQuery('#multiuser.tabbed_interface.horizontal>ul').removeClass('qolpartyclickul');
            this.jQuery('#multiuser.tabbed_interface>ul>li>label').removeClass('qolpartyclicklilabel');
            this.jQuery('#multiuser .pkmn').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .name').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .expbar').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .taste').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .party').removeClass('qolpartyclickpartywidth');
            this.jQuery('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
            this.jQuery('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
            this.jQuery('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
            this.jQuery('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
            this.jQuery('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
            this.jQuery('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
            this.jQuery('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons').removeClass('qolpartyclicktextalign');
        }

        if (this.settings.hideDislike === true) {
            this.jQuery('#trainerimage').removeClass('qolpartyclickhide');
            this.jQuery('#profilebox').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .pkmn').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .name').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .expbar').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .taste').removeClass('qolpartyclickhide');
            this.jQuery('#partybox .party>div>.action.working').removeClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons:not([data-up=\'sour\'])>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons:not([data-up=\'spicy\'])>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons:not([data-up=\'dry\'])>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons:not([data-up=\'sweet\'])>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons:not([data-up=\'bitter\'])>[data-berry=\'rawst\']').removeClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'sour\']>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons[data-up=\'spicy\']>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons[data-up=\'dry\']>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons[data-up=\'sweet\']>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons[data-up=\'bitter\']>[data-berry=\'rawst\']').removeClass('qolpartyclickwidth');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'any\']>[data-berry]').removeClass('qolpartyclickblock');
            this.jQuery('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .party>div').removeClass('qolpartyclickalot');
            this.jQuery('#multiuser .party>div>.action a[data-berry]').removeClass('qolpartyclickz');
            this.jQuery('.mu_navlink.next').removeClass('qolpartyclicknav');
            this.jQuery('#multiuser .party').removeClass('qolpartyclickpartywidth');
            this.jQuery('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
            this.jQuery('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
            this.jQuery('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
            this.jQuery('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
            this.jQuery('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
            this.jQuery('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
            this.jQuery('#multiuser.tabbed_interface.horizontal>ul').removeClass('qolpartyclickul');
            this.jQuery('#multiuser.tabbed_interface>ul>li>label').removeClass('qolpartyclicklilabel');
            this.jQuery('#multiuser .pkmn').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .name').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .expbar').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .taste').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .party').removeClass('qolpartyclickpartywidth');
            this.jQuery('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
            this.jQuery('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
            this.jQuery('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
            this.jQuery('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
            this.jQuery('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
            this.jQuery('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
            this.jQuery('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons').addClass('qolpartyclicktextalign');
            this.jQuery('.party>div>.action>.berrybuttons:not([data-up=\'sour\'])>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons:not([data-up=\'spicy\'])>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons:not([data-up=\'dry\'])>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons:not([data-up=\'sweet\'])>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons:not([data-up=\'bitter\'])>[data-berry=\'rawst\']').addClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'sour\']>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons[data-up=\'spicy\']>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons[data-up=\'dry\']>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons[data-up=\'sweet\']>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons[data-up=\'bitter\']>[data-berry=\'rawst\']').addClass('qolpartyclickwidth');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'any\']>[data-berry]').addClass('qolpartyclickblock');
        }

        if (this.settings.niceTable === true) {
            this.jQuery('#trainerimage').removeClass('qolpartyclickhide');
            this.jQuery('#profilebox').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .pkmn').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .name').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .expbar').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .taste').removeClass('qolpartyclickhide');
            this.jQuery('#partybox .party>div>.action.working').removeClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons:not([data-up=\'sour\'])>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons:not([data-up=\'spicy\'])>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons:not([data-up=\'dry\'])>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons:not([data-up=\'sweet\'])>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons:not([data-up=\'bitter\'])>[data-berry=\'rawst\']').removeClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'sour\']>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons[data-up=\'spicy\']>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons[data-up=\'dry\']>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons[data-up=\'sweet\']>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons[data-up=\'bitter\']>[data-berry=\'rawst\']').removeClass('qolpartyclickwidth');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'any\']>[data-berry]').removeClass('qolpartyclickblock');
            this.jQuery('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .party>div').removeClass('qolpartyclickalot');
            this.jQuery('#multiuser .party>div>.action a[data-berry]').removeClass('qolpartyclickz');
            this.jQuery('.mu_navlink.next').removeClass('qolpartyclicknav');
            this.jQuery('#multiuser .party').removeClass('qolpartyclickpartywidth');
            this.jQuery('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
            this.jQuery('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
            this.jQuery('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
            this.jQuery('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
            this.jQuery('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
            this.jQuery('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
            this.jQuery('#multiuser.tabbed_interface.horizontal>ul').removeClass('qolpartyclickul');
            this.jQuery('#multiuser.tabbed_interface>ul>li>label').removeClass('qolpartyclicklilabel');
            this.jQuery('.party>div>.action>.berrybuttons').removeClass('qolpartyclicktextalign');
            this.jQuery('#multiuser .pkmn').addClass('qolpartyclickhide');
            this.jQuery('#multiuser .name').addClass('qolpartyclickhide');
            this.jQuery('#multiuser .expbar').addClass('qolpartyclickhide');
            this.jQuery('#multiuser .taste').addClass('qolpartyclickhide');
            this.jQuery('#multiuser .party').addClass('qolpartyclickpartywidth');
            this.jQuery('#multiuser .party>div').addClass('qolpartyclickpartydivwidth');
            this.jQuery('#multiuser .party>div:nth-child(1)').addClass('qolpartyclickborderone');
            this.jQuery('#multiuser .party>div:nth-child(2)').addClass('qolpartyclickbordertwo');
            this.jQuery('#multiuser .party>div:nth-child(5)').addClass('qolpartyclickborderthree');
            this.jQuery('#multiuser .party>div:nth-child(6)').addClass('qolpartyclickborderfour');
            this.jQuery('#multiuser .party>div:nth-child(2n+1)').addClass('qolpartyclickborderfive');
            this.jQuery('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').addClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons').addClass('qolpartyclicktextalign');
            this.jQuery('.party>div>.action>.berrybuttons:not([data-up=\'sour\'])>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons:not([data-up=\'spicy\'])>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons:not([data-up=\'dry\'])>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons:not([data-up=\'sweet\'])>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons:not([data-up=\'bitter\'])>[data-berry=\'rawst\']').addClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'sour\']>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons[data-up=\'spicy\']>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons[data-up=\'dry\']>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons[data-up=\'sweet\']>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons[data-up=\'bitter\']>[data-berry=\'rawst\']').addClass('qolpartyclickwidth');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'any\']>[data-berry]').addClass('qolpartyclickblock');
        }


        if (this.settings.hideAll === true) {
            this.jQuery('.party>div>.action>.berrybuttons').removeClass('qolpartyclicktextalign');
            this.jQuery('.party>div>.action>.berrybuttons:not([data-up=\'sour\'])>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons:not([data-up=\'spicy\'])>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons:not([data-up=\'dry\'])>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons:not([data-up=\'sweet\'])>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons:not([data-up=\'bitter\'])>[data-berry=\'rawst\']').removeClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'sour\']>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons[data-up=\'spicy\']>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons[data-up=\'dry\']>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons[data-up=\'sweet\']>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons[data-up=\'bitter\']>[data-berry=\'rawst\']').removeClass('qolpartyclickwidth');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'any\']>[data-berry]').removeClass('qolpartyclickblock');
            this.jQuery('#multiuser .pkmn').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .name').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .expbar').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .taste').removeClass('qolpartyclickhide');
            this.jQuery('#multiuser .party').removeClass('qolpartyclickpartywidth');
            this.jQuery('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
            this.jQuery('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
            this.jQuery('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
            this.jQuery('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
            this.jQuery('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
            this.jQuery('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
            this.jQuery('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');
            this.jQuery('#trainerimage').addClass('qolpartyclickhide');
            this.jQuery('#profilebox').addClass('qolpartyclickhide');
            this.jQuery('#multiuser .pkmn').addClass('qolpartyclickhide');
            this.jQuery('#multiuser .name').addClass('qolpartyclickhide');
            this.jQuery('#multiuser .expbar').addClass('qolpartyclickhide');
            this.jQuery('#multiuser .taste').addClass('qolpartyclickhide');
            this.jQuery('#partybox .party>div>.action.working').addClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons:not([data-up=\'sour\'])>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons:not([data-up=\'spicy\'])>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons:not([data-up=\'dry\'])>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons:not([data-up=\'sweet\'])>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons:not([data-up=\'bitter\'])>[data-berry=\'rawst\']').addClass('qolpartyclickhide');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'sour\']>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons[data-up=\'spicy\']>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons[data-up=\'dry\']>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons[data-up=\'sweet\']>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons[data-up=\'bitter\']>[data-berry=\'rawst\']').addClass('qolpartyclickwidth');
            this.jQuery('.party>div>.action>.berrybuttons[data-up=\'any\']>[data-berry]').addClass('qolpartyclickblock');
            this.jQuery('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').addClass('qolpartyclickhide');
            this.jQuery('#multiuser .party>div').addClass('qolpartyclickalot');
            this.jQuery('#multiuser .party>div>.action a[data-berry]').addClass('qolpartyclickz');
            this.jQuery('.mu_navlink.next').addClass('qolpartyclicknav');
            this.jQuery('#multiuser .party').addClass('qolpartyclickpartywidth');
            this.jQuery('#multiuser .party>div').addClass('qolpartyclickpartydivwidth');
            this.jQuery('#multiuser .party>div:nth-child(1)').addClass('qolpartyclickborderone');
            this.jQuery('#multiuser .party>div:nth-child(2)').addClass('qolpartyclickbordertwo');
            this.jQuery('#multiuser .party>div:nth-child(5)').addClass('qolpartyclickborderthree');
            this.jQuery('#multiuser .party>div:nth-child(6)').addClass('qolpartyclickborderfour');
            this.jQuery('#multiuser .party>div:nth-child(2n+1)').addClass('qolpartyclickborderfive');
            this.jQuery('#multiuser.tabbed_interface.horizontal>ul').addClass('qolpartyclickul');
            this.jQuery('#multiuser.tabbed_interface>ul>li>label').addClass('qolpartyclicklilabel');
        }
    }
}