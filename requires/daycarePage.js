let DaycarePage = (function DaycarePage() {
    const SETTINGS_SAVE_KEY = 'QolDaycare';
    const DEFAULT_SETTINGS = { /* empty */ };
    let settings = DEFAULT_SETTINGS;
    // more data
    const observers = [
        new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                API.customSearch()
            });
        }),
        /*
        new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if(document.querySelector('.dialog:not(.top)') !== null) {
                    console.log('field dialog exists')
                    // API.customSearch()
                }
            });
        })
        */
    ];
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
        setupObserver() {
            observers[0].observe(document.querySelector('#dcpokemon'), {
                childList: true,
                subtree: true,
            });
            /*
            observers[1].observe(document.querySelector('body'), {
                childList: true,
                subtree: true
            });
            */
        },
        setupHandlers() {
            $('#dcpokemon').on('click', () => API.customSearch());
            $('body').on('click', '.dialog:not(.top)', () => API.customSearch());
        },
        customSearch() {
            const button = document.querySelector('#pkmnadd')

            if(button !== null) {
                let gender = null;
                let eggGroup1 = null, eggGroup2 = null;
                if(button.attributes['data-gender'] !== undefined) {
                    gender = button.attributes['data-gender'].value
                }
                // the egg group is binary coded decimal
                // if a pokemon has two egg groups, the leftmost 4 bits of the number returned
                // are the first egg group and the rightmost 4 bits are the second egg group
                if(button.attributes['data-egggroup'] !== undefined) {
                    eggGroup1 = 0 + button.attributes['data-egggroup'].value
                    if(eggGroup1 > 15) { // two egg groups
                        eggGroup2 = eggGroup1 & 15;
                        eggGroup1 = eggGroup1 >> 4;
                    }
                }
                console.log(gender, eggGroup1, eggGroup2)
            }
        },
        // TODO
    };

    return API;
})(); // DaycarePage
