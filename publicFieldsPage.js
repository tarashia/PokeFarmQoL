let PublicFieldsPage = (function PublicFieldsPage() {
    const SETTINGS_SAVE_KEY = 'QoLPublicFields';
    const DEFAULT_SORT_SETTINGS = {
        fieldByBerry: false,
        fieldByMiddle: false,
        fieldByGrid: false,
        fieldClickCount: true,
    };
    const DEFAULT_SEARCH_SETTINGS = {
        fieldCustom: "",
        fieldType: "",
        fieldNature: "",
        fieldNewPokemon: true,
        fieldShiny: true,
        fieldAlbino: true,
        fieldMelanistic: true,
        fieldPrehistoric: true,
        fieldDelta: true,
        fieldMega: true,
        fieldStarter: true,
        fieldCustomSprite: true,
        fieldMale: true,
        fieldFemale: true,
        fieldNoGender: true,
        fieldCustomPokemon: true,
        fieldCustomPng: false,
        fieldItem: true,
        customItem: true,
    };
    let settings = {
        sortSettings : DEFAULT_SORT_SETTINGS,
        searchSettings : DEFAULT_SEARCH_SETTINGS,
    };
    let customArray : [];
    let typeArray : [];
    let natureArray : [];
    let dexData = "";
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            API.customSearch();
        });
    });

    const API = {
	loadSettings() {
	    settings = Helpers.loadSettings(SETTINGS_SAVE_KEY, DEFAULT_SETTINGS, settings);
	},
	saveSettings() {
	    Helpers.saveSettings(SETTINGS_SAVE_KEY, settings)
	},
	getSettings() {
	    return settings;
	},
        populateSettings() {
            for (let key in sortSettings) {
                if (!sortSettings.hasOwnProperty(key)) {
                    continue;
                }
                let value = sortSettings[key];
                if (typeof value === 'boolean') {
                    Helpers.toggleSetting(key, value, false);
                    continue;
                }

                if (typeof value === 'string') {
                    Helpers.toggleSetting(key, value, false);
                    continue;
                }
            }
            for (let key in searchSettings) {
                if (!searchSettings.hasOwnProperty(key)) {
                    continue;
                }
                let value = searchSettings[key];
                if (typeof value === 'boolean') {
                    Helpers.toggleSetting(key, value, false);
                    continue;
                }
            }
        },
	settingsChange(element, textElement, customClass, typeClass) {

        },
        setupHTML() {
            document.querySelector('#field_field').insertAdjacentHTML('afterend', TEMPLATES.fieldSortHTML);
            fn.backwork.populateSettingsPage();
            document.querySelector('#field_field').insertAdjacentHTML('afterend', TEMPLATES.fieldSearchHTML);

            const theField = `<div class='numberDiv'><label><input type="text" class="qolsetting" data-key="fieldCustom"/></label><input type='button' value='Remove' id='removeFieldSearch'></div>`;
            const theType = `<div class='typeNumber'> <select name="types" class="qolsetting" data-key="fieldType"> ` + GLOBALS.TYPE_OPTIONS + ` </select> <input type='button' value='Remove' id='removeFieldTypeList'> </div>`;
            const theNature = `<div class='natureNumber'> <select name="natures" class="qolsetting" data-key="fieldNature"> ` + GLOBALS.NATURE_OPTIONS + ` </select> <input type='button' value='Remove' id='removeFieldNature'> </div>`;
            customArray = searchSettings.fieldCustom.split(',');
            typeArray = searchSettings.fieldType.split(',');
            natureArray = searchSettings.fieldNature.split(',');
            Helpers.setupFieldArrayHTML(customArray, 'searchkeys', theField, 'numberDiv');
            Helpers.setupFieldArrayHTML(typeArray, 'fieldTypes', theType, 'typeNumber');
            Helpers.setupFieldArrayHTML(natureArray, 'natureTypes', theNature, 'natureNumber');

            dexData = GLOBALS.DEX_DATA.split(',');
        }
    };

    return API;
})();

        
