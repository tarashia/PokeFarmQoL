let MultiuserPage = (function MultiuserPage() {
    const SETTINGS_SAVE_KEY = 'QoLMultiuser';
    const DEFAULT_SETTINGS = {
		hideDislike : false,
		hideAll : false,
	};
    let settings = DEFAULT_SETTINGS;
	// more data
	const observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			API.partyModification();
		});
	});
    const API = {
        loadSettings() { // initial settings on first run and setting the variable settings key
            settings = Helpers.loadSettings(SETTINGS_SAVE_KEY, DEFAULT_SETTINGS, settings);
        },
        saveSettings() { // Save changed settings
            Helpers.saveSettings(SETTINGS_SAVE_KEY, settings)
        },
        getSettings() {
            return settings;
        },
        populateSettings() {
			for (let key in settings) {
				if (!settings.hasOwnProperty(key)) {
					continue;
				}
				let value = settings[key];
				if (typeof value === 'boolean') {
					Helpers.toggleSetting(key, value, false);
					continue;
				}

			   if (typeof value === 'string') {
					Helpers.toggleSetting(key, value, false);
					continue;
			   }
			}
		},
        settingsChange(element, textElement, customClass, typeClass) {
			if (settings[element] === false ) {
				settings[element] = true;
				if (element === "hideAll") {
					settings.hideDislike = false;
					settings.niceTable = false;
				} else if (element === "hideDislike") {
					settings.hideAll = false;
					settings.niceTable = false;
				} else if (element === "niceTable") {
					settings.hideDislike = false;
					settings.hideAll = false;
				}
			} else if (settings[element] === true ) {
				settings[element] = false;
			} else if (typeof settings[element] === 'string') {
				settings[element] = textElement;
			}
		},
        setupHTML() {
			document.querySelector('#multiuser').insertAdjacentHTML('beforebegin', TEMPLATES.partyModHTML);
        },
        setupCSS() {
			let menuBackground = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('background-color');
			$("#qolpartymod").css("background-color", ""+menuBackground+"");
			let menuColor = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('color');
			$("#qolpartymod").css("color", ""+menuColor+"");
		},
        setupObserver() {
			observer.observe(document.querySelector('#multiuser'), {
				childList: true,
			});
		},
        setupHandlers() {
			$(window).on('load', (function() {
				API.partyModification();
			}));

			$(document).on('click input', '#qolpartymod', (function() { // partymods
				API.partyModification();
			}));

			$(document).on('click', '.tabbed_interface', (function() {
				API.partyModification();
			}));
		},
		partyModification() {
			$('input.qolalone').on('change', function() { //only 1 textbox may be true
				$('input.qolalone').not(this).prop('checked', false);
			});

			if (settings.hideDislike === false && settings.hideAll === false && settings.niceTable === false) {
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

			if (settings.hideDislike === true) {
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

			if (settings.niceTable === true) {
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


			if (settings.hideAll === true) {
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
    };

    return API;
})(); // LabPage