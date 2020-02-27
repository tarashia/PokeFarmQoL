let FishingPage = (function FishingPage() {
    const SETTINGS_SAVE_KEY = 'QoLFishing';
    const DEFAULT_SETTINGS = { /* empty */ };
    let settings = DEFAULT_SETTINGS;
	// more data
	// no observer
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
        populateSettings() { /* empty */ },
        settingsChange(element, textElement, customClass, typeClass) { /* empty */ },
        setupHTML() {
			// fishing select all button on caught fishing
            document.querySelector('#caughtfishcontainer label').insertAdjacentHTML('beforeend', TEMPLATES.massReleaseSelectHTML);
        },
        setupCSS() { /* empty */ },
        setupObserver() { /* empty */ },
        setupHandlers() {
			$(document).on('mouseover', '#caughtfishcontainer', (function() { //select all feature
				API.releaseSelectAll();
			}));
		},
		releaseSelectAll() {
			$("#selectallfishcheckbox").click(function(){
				$('input:checkbox').not(this).prop('checked', this.checked);
			});

			$('#movefishselectanycheckbox').click(function() {
				let selectAny = $('.icons:contains("Any")').prev().prev('input');
				$(selectAny).not(this).prop('checked', this.checked);
			});

			$('#movefishselectsourcheckbox').click(function() {
				let selectSour = $('.icons:contains("Sour")').prev().prev('input');
				$(selectSour).not(this).prop('checked', this.checked);
			});

			$('#movefishselectspicycheckbox').click(function() {
				let selectSpicy = $('.icons:contains("Spicy")').prev().prev('input');
				$(selectSpicy).not(this).prop('checked', this.checked);
			});

			$('#movefishselectdrycheckbox').click(function() {
				let selectDry = $('.icons:contains("Dry")').prev().prev('input');
				$(selectDry).not(this).prop('checked', this.checked);
			});

			$('#movefishselectsweetcheckbox').click(function() {
				let selectSweet = $('.icons:contains("Sweet")').prev().prev('input');
				$(selectSweet).not(this).prop('checked', this.checked);
			});

			$('#movefishselectbittercheckbox').click(function() {
				let selectBitter = $('.icons:contains("Bitter")').prev().prev('input');
				$(selectBitter).not(this).prop('checked', this.checked);
			});
		},
    };

    return API;
})(); // LabPage