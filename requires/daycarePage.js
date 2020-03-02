let DaycarePage = (function DaycarePage() {
    const SETTINGS_SAVE_KEY = 'QolDaycare';
    const DEFAULT_SETTINGS = { /* empty */ };
    let settings = DEFAULT_SETTINGS;
    // more data
    cosnt observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // TODO
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
        populateSettings() { /* empty */ },
        settingsChange(element, textElement, customClass, typeClass) { /* empty */ },
        setupHTML() { /* empty */ },
        setupCSS() { /* empty */ },
        setupObserver() {
            observer.observe(document.querySelector('.dialog'), {
                childList: true,
                characterdata: true,
                subtree: true,
                characterDataOldValue: true,
            });
        },
        setupHandlers() {
            $(document).on('click', '#pkmnadd', (function() {
                console.log(this);
                console.log($(this));
            }));
        },
        // TODO
    };

    return API;
})(); // DaycarePage
        
