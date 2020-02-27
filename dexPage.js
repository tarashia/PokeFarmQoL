let PokedexPage = (function PokedexPage() {
	const SETTINGS_SAVE_KEY = 'QoLPokedex';
    const DEFAULT_SETTINGS = { /* empty */ };
    let settings = DEFAULT_SETTINGS;
	// more data
	const observer = null;
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
        setupHTML() { /* empty */ },
        setupCSS() { /* empty */ },
        setupObserver() { /* empty */ },
        setupHandlers() {
			$(window).on('load', (function() {
				API.savingDexData();
			}));
		},
		savingDexData() {
			API.loadSettings();
			let dexTempData = ($('#dexdata').html());
			// let dexTempArray = dexTempData.split(',');

			//Experiment with Flabebe (It's better to just make the new data dex save function)
			//let dexTempArrayFlabebe = dexTempArray.indexOf(Flab\u00e9b\u00e9)
			//Flab\u00e9b\u00e9 > Flabébé

			//let dexArray = dexTempArray.splice(0, 29);

			// if (VARIABLES.userSettings.variData.dexData != dexTempArray.toString()) {
				// VARIABLES.userSettings.variData.dexData = dexTempArray.toString();
				// API.saveSettings();
				// console.log('your dexdata has been updated');
			// }
		},
	};

    return API;
})(); // LabPage