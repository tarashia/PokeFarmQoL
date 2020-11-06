const MultiuserBase = (module) ? require('./basePage').Page : Page;
    
class MultiuserPage extends MultiuserBase {
    constructor() {
        super('QoLMultiuser', {
            hideDislike : false,
            hideAll : false,
            niceTable : false,
        }, 'users/');
        const obj = this
        this.observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                obj.partyModification();
            });
        });
    }
    
    settingsChange(element, textElement, customClass, typeClass, arrayName) {
        if(super.settingsChange(element, textElement, customClass, typeClass, arrayName) === false) {
            return false;
        }

        const mutuallyExclusive = ["hideAll", "hideDislike", "niceTable"]
        const idx = mutuallyExclusive.indexOf(element)
        if(idx > -1) {
            for(let i = 0; i < mutuallyExclusive.length; i++) {
                if(i !== idx) {
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
        const obj = this
        $(window).on('load', (function() {
            obj.loadSettings();
            obj.partyModification();
        }));

        $(document).on('click input', '#qolpartymod', (function() {
            obj.partyModification();
        }));

        $(document).on('click', '.tabbed_interface', (function() {
            obj.partyModification();
        }));

        $(document).on('change', '.qolsetting', (function() {
            obj.loadSettings();
            obj.settingsChange(this.getAttribute('data-key'),
                               $(this).val(),
                               $(this).parent().parent().attr('class'),
                               $(this).parent().attr('class'));
            obj.partyModification();
            obj.saveSettings();
        }));
        
        $('input.qolalone').on('change', function() { //only 1 textbox may be true
            $('input.qolalone').not(this).prop('checked', false);
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