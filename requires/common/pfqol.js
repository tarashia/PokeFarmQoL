/* globals addGlobalStyle QoLHub UserSettings
        Globals Resources Helpers PagesManager LocalStorageManager */
// eslint-disable-next-line no-unused-vars
class PFQoLBase {
    constructor($) {
        // :contains to case insensitive
        $.extend($.expr[':'], {
            // eslint-disable-next-line no-unused-vars
            'containsIN': function (elem, i, match, array) {
                return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || '').toLowerCase()) >= 0;
            }
        });

        this.jQuery = $;
        this.HELPERS = new Helpers();
        this.LOCAL_STORAGE_MANAGER = new LocalStorageManager($.USERID, localStorage, this.HELPERS);
        this.LOCAL_STORAGE_MANAGER.migrateSettings();

        this.SETTINGS = new UserSettings();
        this.GLOBALS = new Globals(this.jQuery, this.LOCAL_STORAGE_MANAGER, this.HELPERS);
        this.RESOURCES = new Resources();
        this.PAGES = new PagesManager(this.jQuery, this.LOCAL_STORAGE_MANAGER, this.GLOBALS, this.HELPERS, this.SETTINGS);
        this.QOLHUB = new QoLHub(this.jQuery, this.LOCAL_STORAGE_MANAGER, this.HELPERS, this.GLOBALS, this.PAGES, this.SETTINGS);
        this.GLOBALS.fillTemplates(this.RESOURCES);
        this.GLOBALS.fillOptionsLists();

        this.init();
    }
    instantiatePages(obj) {
        obj.PAGES.instantiatePages(obj.QOLHUB);
    }
    loadSettings(obj) { // initial settings on first run and setting the variable settings key
        obj.QOLHUB.loadSettings();
        obj.PAGES.loadSettings(obj.QOLHUB);
    } // loadSettings
    saveSettings() { // Save changed settings
        this.QOLHUB.saveSettings();
        this.PAGES.saveSettings(this.QOLHUB);
    } // saveSettings
    populateSettingsPage(obj) { // checks all settings checkboxes that are true in the settings
        obj.QOLHUB.populateSettings();
        obj.PAGES.populateSettings(obj.QOLHUB);
    }
    setupHTML(obj) { // injects the HTML changes from GLOBALS.TEMPLATES into the site
        // Header link to Userscript settings
        document.querySelector('li[data-name*=\'Lucky Egg\']')
            .insertAdjacentHTML('afterend', obj.GLOBALS.TEMPLATES.qolHubLinkHTML);
        obj.PAGES.setupHTML(obj.GLOBALS, obj.QOLHUB);
    }
    setupCSS(obj) { // All the CSS changes are added here
        addGlobalStyle(obj.RESOURCES.css());
        obj.PAGES.setupCSS(obj.QOLHUB);
        obj.QOLHUB.setupCSS();
    }
    setupObservers(obj) { // all the Observers that needs to run
        obj.PAGES.setupObservers(obj.QOLHUB);
    }
    setupHandlers(obj) { // all the event handlers
        obj.jQuery(document).on('click', 'li[data-name="QoL"]', (function () { //open QoL hub
            obj.QOLHUB.build(document);
            obj.populateSettingsPage(obj);
        }));
        obj.QOLHUB.setupHandlers();
        obj.PAGES.setupHandlers(obj.GLOBALS, obj.QOLHUB);
    }
    startup() { // All the functions that are run to start the script on Pokéfarm
        return {
            'creating Page handlers': this.instantiatePages,
            'loading Settings': this.loadSettings,
            'setting up HTML': this.setupHTML,
            'populating Settings': this.populateSettingsPage,
            'setting up CSS': this.setupCSS,
            'setting up Observers': this.setupObservers,
            'setting up Handlers': this.setupHandlers,
        };
    }
    init() { // Starts all the functions.
        console.log('Starting up ..');
        const startup = this.startup();
        for (const message in startup) {
            if (Object.hasOwnProperty.call(startup, message)) {
                console.log(message);
                startup[message](this, this.GLOBALS);
            }
        }
    }
}