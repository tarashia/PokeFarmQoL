class MultiuserPage {
    SETTINGS_SAVE_KEY() { return 'QoLMultiuser'; }
    DEFAULT_SETTINGS() { return {
        hideDislike : false,
        hideAll : false,
        niceTable : false,
    }};
    
    constructor() {
        this.settings = DEFAULT_SETTINGS();
        this.observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                this.partyModification();
            });
        });
    }
    
    loadSettings() { // initial settings on first run and setting the variable settings key
        this.settings = Helpers.loadSettings(this.SETTINGS_SAVE_KEY(), this.DEFAULT_SETTINGS(), this.settings);
    }
    saveSettings() { // Save changed settings
        Helpers.saveSettings(this.SETTINGS_SAVE_KEY(), this.settings)
    }
    getSettings() { return this.settings; }
    populateSettings() {
        for (let key in this.settings) {
            if (!this.settings.hasOwnProperty(key)) {
                continue;
            }
            let value = this.settings[key];
            if (typeof value === 'boolean') {
                Helpers.toggleSetting(key, value, false);
                continue;
            }

            if (typeof value === 'string') {
                Helpers.toggleSetting(key, value, false);
                continue;
            }
        }
    }
    settingsChange(element, textElement, customClass, typeClass) {
        if (this.settings[element] === false ) {
            this.settings[element] = true;
            if (element === "hideAll") {
                this.settings.hideDislike = false;
                this.settings.niceTable = false;
            } else if (element === "hideDislike") {
                this.settings.hideAll = false;
                this.settings.niceTable = false;
            } else if (element === "niceTable") {
                this.settings.hideDislike = false;
                this.settings.hideAll = false;
            }
        } else if (this.settings[element] === true ) {
            this.settings[element] = false;
        } else if (typeof this.settings[element] === 'string') {
            this.settings[element] = textElement;
        }
    }
    setupHTML() {
        document.querySelector('#multiuser').insertAdjacentHTML('beforebegin', TEMPLATES.partyModHTML);
    }
    setupCSS() {
        let menuBackground = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('background-color');
        $("#qolpartymod").css("background-color", ""+menuBackground+"");
        let menuColor = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('color');
        $("#qolpartymod").css("color", ""+menuColor+"");
    }
    setupObserver() {
        this.observer.observe(document.querySelector('#multiuser'), {
            childList: true,
        });
    }
    setupHandlers() {
        $(window).on('load', (function(e) {
            this.loadSettings();
            this.partyModification();
        }));

        $(document).on('click input', '#qolpartymod', (function(e) { // partymods
            this.partyModification();
        }));

        $(document).on('click', '.tabbed_interface', (function(e) {
            this.partyModification();
        }));

        $(document).on('change', '.qolsetting', (function(e) {
            this.loadSettings();
            this.settingsChange(e.getAttribute('data-key'), $(e).val(),
                               $(e).parent().parent().attr('class'), $(e).parent().attr('class'));
            this.partyModification();
            this.saveSettings();
        }));
        
        $('input.qolalone').on('change', function(e) { //only 1 textbox may be true
            $('input.qolalone').not(e).prop('checked', false);
        });
    }
    partyModification() {
        if (this.settings.hideDislike === false && this.settings.hideAll === false && this.settings.niceTable === false) {
            $('#trainerimage').removeClass('qolpartyclickhide');
            $('#profilebox').removeClass('qolpartyclickhide');
            $('#multiuser .pkmn').removeClass('qolpartyclickhide');
            $('#multiuser .name').removeClass('qolpartyclickhide');
            $('#multiuser .expbar').removeClass('qolpartyclickhide');
            $('#multiuser .taste').removeClass('qolpartyclickhide');
            $('#partybox .party>div>.action.working').removeClass('qolpartyclickhide');
            $(".party>div>.action>.berrybuttons:not([data-up='sour'])>[data-berry='aspear'], .party>div>.action>.berrybuttons:not([data-up='spicy'])>[data-berry='cheri'], .party>div>.action>.berrybuttons:not([data-up='dry'])>[data-berry='chesto'], .party>div>.action>.berrybuttons:not([data-up='sweet'])>[data-berry='pecha'], .party>div>.action>.berrybuttons:not([data-up='bitter'])>[data-berry='rawst']").removeClass('qolpartyclickhide');
            $(".party>div>.action>.berrybuttons[data-up='sour']>[data-berry='aspear'], .party>div>.action>.berrybuttons[data-up='spicy']>[data-berry='cheri'], .party>div>.action>.berrybuttons[data-up='dry']>[data-berry='chesto'], .party>div>.action>.berrybuttons[data-up='sweet']>[data-berry='pecha'], .party>div>.action>.berrybuttons[data-up='bitter']>[data-berry='rawst']").removeClass('qolpartyclickwidth');
            $(".party>div>.action>.berrybuttons[data-up='any']>[data-berry]").removeClass('qolpartyclickblock');
            $('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');
            $('#multiuser .party>div').removeClass('qolpartyclickalot');
            $('#multiuser .party>div>.action a[data-berry]').removeClass('qolpartyclickz');
            $('.mu_navlink.next').removeClass('qolpartyclicknav');
            $('#multiuser .party').removeClass('qolpartyclickpartywidth');
            $('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
            $('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
            $('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
            $('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
            $('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
            $('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
            $('#multiuser.tabbed_interface.horizontal>ul').removeClass('qolpartyclickul');
            $('#multiuser.tabbed_interface>ul>li>label').removeClass('qolpartyclicklilabel');
            $('#multiuser .pkmn').removeClass('qolpartyclickhide');
            $('#multiuser .name').removeClass('qolpartyclickhide');
            $('#multiuser .expbar').removeClass('qolpartyclickhide');
            $('#multiuser .taste').removeClass('qolpartyclickhide');
            $('#multiuser .party').removeClass('qolpartyclickpartywidth');
            $('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
            $('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
            $('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
            $('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
            $('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
            $('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
            $('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');

            $('.party>div>.action>.berrybuttons').removeClass('qolpartyclicktextalign');
        }

        if (this.settings.hideDislike === true) {
            $('#trainerimage').removeClass('qolpartyclickhide');
            $('#profilebox').removeClass('qolpartyclickhide');
            $('#multiuser .pkmn').removeClass('qolpartyclickhide');
            $('#multiuser .name').removeClass('qolpartyclickhide');
            $('#multiuser .expbar').removeClass('qolpartyclickhide');
            $('#multiuser .taste').removeClass('qolpartyclickhide');
            $('#partybox .party>div>.action.working').removeClass('qolpartyclickhide');
            $(".party>div>.action>.berrybuttons:not([data-up='sour'])>[data-berry='aspear'], .party>div>.action>.berrybuttons:not([data-up='spicy'])>[data-berry='cheri'], .party>div>.action>.berrybuttons:not([data-up='dry'])>[data-berry='chesto'], .party>div>.action>.berrybuttons:not([data-up='sweet'])>[data-berry='pecha'], .party>div>.action>.berrybuttons:not([data-up='bitter'])>[data-berry='rawst']").removeClass('qolpartyclickhide');
            $(".party>div>.action>.berrybuttons[data-up='sour']>[data-berry='aspear'], .party>div>.action>.berrybuttons[data-up='spicy']>[data-berry='cheri'], .party>div>.action>.berrybuttons[data-up='dry']>[data-berry='chesto'], .party>div>.action>.berrybuttons[data-up='sweet']>[data-berry='pecha'], .party>div>.action>.berrybuttons[data-up='bitter']>[data-berry='rawst']").removeClass('qolpartyclickwidth');
            $(".party>div>.action>.berrybuttons[data-up='any']>[data-berry]").removeClass('qolpartyclickblock');
            $('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');
            $('#multiuser .party>div').removeClass('qolpartyclickalot');
            $('#multiuser .party>div>.action a[data-berry]').removeClass('qolpartyclickz');
            $('.mu_navlink.next').removeClass('qolpartyclicknav');
            $('#multiuser .party').removeClass('qolpartyclickpartywidth');
            $('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
            $('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
            $('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
            $('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
            $('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
            $('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
            $('#multiuser.tabbed_interface.horizontal>ul').removeClass('qolpartyclickul');
            $('#multiuser.tabbed_interface>ul>li>label').removeClass('qolpartyclicklilabel');
            $('#multiuser .pkmn').removeClass('qolpartyclickhide');
            $('#multiuser .name').removeClass('qolpartyclickhide');
            $('#multiuser .expbar').removeClass('qolpartyclickhide');
            $('#multiuser .taste').removeClass('qolpartyclickhide');
            $('#multiuser .party').removeClass('qolpartyclickpartywidth');
            $('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
            $('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
            $('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
            $('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
            $('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
            $('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
            $('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');

            $('.party>div>.action>.berrybuttons').addClass('qolpartyclicktextalign');
            $(".party>div>.action>.berrybuttons:not([data-up='sour'])>[data-berry='aspear'], .party>div>.action>.berrybuttons:not([data-up='spicy'])>[data-berry='cheri'], .party>div>.action>.berrybuttons:not([data-up='dry'])>[data-berry='chesto'], .party>div>.action>.berrybuttons:not([data-up='sweet'])>[data-berry='pecha'], .party>div>.action>.berrybuttons:not([data-up='bitter'])>[data-berry='rawst']").addClass('qolpartyclickhide');
            $(".party>div>.action>.berrybuttons[data-up='sour']>[data-berry='aspear'], .party>div>.action>.berrybuttons[data-up='spicy']>[data-berry='cheri'], .party>div>.action>.berrybuttons[data-up='dry']>[data-berry='chesto'], .party>div>.action>.berrybuttons[data-up='sweet']>[data-berry='pecha'], .party>div>.action>.berrybuttons[data-up='bitter']>[data-berry='rawst']").addClass('qolpartyclickwidth');
            $(".party>div>.action>.berrybuttons[data-up='any']>[data-berry]").addClass('qolpartyclickblock');
        }

        if (this.settings.niceTable === true) {
            $('#trainerimage').removeClass('qolpartyclickhide');
            $('#profilebox').removeClass('qolpartyclickhide');
            $('#multiuser .pkmn').removeClass('qolpartyclickhide');
            $('#multiuser .name').removeClass('qolpartyclickhide');
            $('#multiuser .expbar').removeClass('qolpartyclickhide');
            $('#multiuser .taste').removeClass('qolpartyclickhide');
            $('#partybox .party>div>.action.working').removeClass('qolpartyclickhide');
            $(".party>div>.action>.berrybuttons:not([data-up='sour'])>[data-berry='aspear'], .party>div>.action>.berrybuttons:not([data-up='spicy'])>[data-berry='cheri'], .party>div>.action>.berrybuttons:not([data-up='dry'])>[data-berry='chesto'], .party>div>.action>.berrybuttons:not([data-up='sweet'])>[data-berry='pecha'], .party>div>.action>.berrybuttons:not([data-up='bitter'])>[data-berry='rawst']").removeClass('qolpartyclickhide');
            $(".party>div>.action>.berrybuttons[data-up='sour']>[data-berry='aspear'], .party>div>.action>.berrybuttons[data-up='spicy']>[data-berry='cheri'], .party>div>.action>.berrybuttons[data-up='dry']>[data-berry='chesto'], .party>div>.action>.berrybuttons[data-up='sweet']>[data-berry='pecha'], .party>div>.action>.berrybuttons[data-up='bitter']>[data-berry='rawst']").removeClass('qolpartyclickwidth');
            $(".party>div>.action>.berrybuttons[data-up='any']>[data-berry]").removeClass('qolpartyclickblock');
            $('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');
            $('#multiuser .party>div').removeClass('qolpartyclickalot');
            $('#multiuser .party>div>.action a[data-berry]').removeClass('qolpartyclickz');
            $('.mu_navlink.next').removeClass('qolpartyclicknav');
            $('#multiuser .party').removeClass('qolpartyclickpartywidth');
            $('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
            $('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
            $('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
            $('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
            $('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
            $('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
            $('#multiuser.tabbed_interface.horizontal>ul').removeClass('qolpartyclickul');
            $('#multiuser.tabbed_interface>ul>li>label').removeClass('qolpartyclicklilabel');
            $('.party>div>.action>.berrybuttons').removeClass('qolpartyclicktextalign');

            $('#multiuser .pkmn').addClass('qolpartyclickhide');
            $('#multiuser .name').addClass('qolpartyclickhide');
            $('#multiuser .expbar').addClass('qolpartyclickhide');
            $('#multiuser .taste').addClass('qolpartyclickhide');
            $('#multiuser .party').addClass('qolpartyclickpartywidth');
            $('#multiuser .party>div').addClass('qolpartyclickpartydivwidth');
            $('#multiuser .party>div:nth-child(1)').addClass('qolpartyclickborderone');
            $('#multiuser .party>div:nth-child(2)').addClass('qolpartyclickbordertwo');
            $('#multiuser .party>div:nth-child(5)').addClass('qolpartyclickborderthree');
            $('#multiuser .party>div:nth-child(6)').addClass('qolpartyclickborderfour');
            $('#multiuser .party>div:nth-child(2n+1)').addClass('qolpartyclickborderfive');
            $('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').addClass('qolpartyclickhide');
            $('.party>div>.action>.berrybuttons').addClass('qolpartyclicktextalign');
            $(".party>div>.action>.berrybuttons:not([data-up='sour'])>[data-berry='aspear'], .party>div>.action>.berrybuttons:not([data-up='spicy'])>[data-berry='cheri'], .party>div>.action>.berrybuttons:not([data-up='dry'])>[data-berry='chesto'], .party>div>.action>.berrybuttons:not([data-up='sweet'])>[data-berry='pecha'], .party>div>.action>.berrybuttons:not([data-up='bitter'])>[data-berry='rawst']").addClass('qolpartyclickhide');
            $(".party>div>.action>.berrybuttons[data-up='sour']>[data-berry='aspear'], .party>div>.action>.berrybuttons[data-up='spicy']>[data-berry='cheri'], .party>div>.action>.berrybuttons[data-up='dry']>[data-berry='chesto'], .party>div>.action>.berrybuttons[data-up='sweet']>[data-berry='pecha'], .party>div>.action>.berrybuttons[data-up='bitter']>[data-berry='rawst']").addClass('qolpartyclickwidth');
            $(".party>div>.action>.berrybuttons[data-up='any']>[data-berry]").addClass('qolpartyclickblock');
        }


        if (this.settings.hideAll === true) {
            $('.party>div>.action>.berrybuttons').removeClass('qolpartyclicktextalign');
            $(".party>div>.action>.berrybuttons:not([data-up='sour'])>[data-berry='aspear'], .party>div>.action>.berrybuttons:not([data-up='spicy'])>[data-berry='cheri'], .party>div>.action>.berrybuttons:not([data-up='dry'])>[data-berry='chesto'], .party>div>.action>.berrybuttons:not([data-up='sweet'])>[data-berry='pecha'], .party>div>.action>.berrybuttons:not([data-up='bitter'])>[data-berry='rawst']").removeClass('qolpartyclickhide');
            $(".party>div>.action>.berrybuttons[data-up='sour']>[data-berry='aspear'], .party>div>.action>.berrybuttons[data-up='spicy']>[data-berry='cheri'], .party>div>.action>.berrybuttons[data-up='dry']>[data-berry='chesto'], .party>div>.action>.berrybuttons[data-up='sweet']>[data-berry='pecha'], .party>div>.action>.berrybuttons[data-up='bitter']>[data-berry='rawst']").removeClass('qolpartyclickwidth');
            $(".party>div>.action>.berrybuttons[data-up='any']>[data-berry]").removeClass('qolpartyclickblock');
            $('#multiuser .pkmn').removeClass('qolpartyclickhide');
            $('#multiuser .name').removeClass('qolpartyclickhide');
            $('#multiuser .expbar').removeClass('qolpartyclickhide');
            $('#multiuser .taste').removeClass('qolpartyclickhide');
            $('#multiuser .party').removeClass('qolpartyclickpartywidth');
            $('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
            $('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
            $('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
            $('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
            $('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
            $('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
            $('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');

            $('#trainerimage').addClass('qolpartyclickhide');
            $('#profilebox').addClass('qolpartyclickhide');
            $('#multiuser .pkmn').addClass('qolpartyclickhide');
            $('#multiuser .name').addClass('qolpartyclickhide');
            $('#multiuser .expbar').addClass('qolpartyclickhide');
            $('#multiuser .taste').addClass('qolpartyclickhide');
            $('#partybox .party>div>.action.working').addClass('qolpartyclickhide');
            $(".party>div>.action>.berrybuttons:not([data-up='sour'])>[data-berry='aspear'], .party>div>.action>.berrybuttons:not([data-up='spicy'])>[data-berry='cheri'], .party>div>.action>.berrybuttons:not([data-up='dry'])>[data-berry='chesto'], .party>div>.action>.berrybuttons:not([data-up='sweet'])>[data-berry='pecha'], .party>div>.action>.berrybuttons:not([data-up='bitter'])>[data-berry='rawst']").addClass('qolpartyclickhide');
            $(".party>div>.action>.berrybuttons[data-up='sour']>[data-berry='aspear'], .party>div>.action>.berrybuttons[data-up='spicy']>[data-berry='cheri'], .party>div>.action>.berrybuttons[data-up='dry']>[data-berry='chesto'], .party>div>.action>.berrybuttons[data-up='sweet']>[data-berry='pecha'], .party>div>.action>.berrybuttons[data-up='bitter']>[data-berry='rawst']").addClass('qolpartyclickwidth');
            $(".party>div>.action>.berrybuttons[data-up='any']>[data-berry]").addClass('qolpartyclickblock');
            $('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').addClass('qolpartyclickhide');
            $('#multiuser .party>div').addClass('qolpartyclickalot');
            $('#multiuser .party>div>.action a[data-berry]').addClass('qolpartyclickz');
            $('.mu_navlink.next').addClass('qolpartyclicknav');
            $('#multiuser .party').addClass('qolpartyclickpartywidth');
            $('#multiuser .party>div').addClass('qolpartyclickpartydivwidth');
            $('#multiuser .party>div:nth-child(1)').addClass('qolpartyclickborderone');
            $('#multiuser .party>div:nth-child(2)').addClass('qolpartyclickbordertwo');
            $('#multiuser .party>div:nth-child(5)').addClass('qolpartyclickborderthree');
            $('#multiuser .party>div:nth-child(6)').addClass('qolpartyclickborderfour');
            $('#multiuser .party>div:nth-child(2n+1)').addClass('qolpartyclickborderfive');
            $('#multiuser.tabbed_interface.horizontal>ul').addClass('qolpartyclickul');
            $('#multiuser.tabbed_interface>ul>li>label').addClass('qolpartyclicklilabel');
        }
    }
}
    
const multiuserPage = new MultiuserPage();
