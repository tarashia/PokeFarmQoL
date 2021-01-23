/* globals jQuery GM_addStyle
        Globals Resources Helpers QoLHub PagesManager */
'use strict';
class PFQoL {
    constructor($) {
        // :contains to case insensitive
        $.extend($.expr[':'], {
            // eslint-disable-next-line no-unused-vars
            'containsIN': function (elem, i, match, array) {
                return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || '').toLowerCase()) >= 0;
            }
        });

        this.jQuery = $;
        this.GLOBALS = new Globals();
        this.HELPERS = new Helpers();
        this.RESOURCES = new Resources();
        this.PAGES = new PagesManager(this.jQuery, this.GLOBALS);
        this.QOLHUB = new QoLHub(this.jQuery, this.GLOBALS, this.PAGES);
        this.GLOBALS.fillTemplates(this.RESOURCES);
        this.GLOBALS.fillOptionsLists(this.HELPERS);

        this.init();
    }
    instantiatePages() {
        this.PAGES.instantiatePages(this.QOLHUB);
    }
    loadSettings() { // initial settings on first run and setting the variable settings key
        this.QOLHUB.loadSettings();
        this.PAGES.loadSettings(this.QOLHUB);
    } // loadSettings
    saveSettings() { // Save changed settings
        this.QOLHUB.saveSettings();
        this.PAGES.saveSettings(this.QOLHUB);
    } // saveSettings
    populateSettingsPage() { // checks all settings checkboxes that are true in the settings
        this.QOLHUB.populateSettings();
        this.PAGES.populateSettings(this.QOLHUB);
    }
    setupHTML() { // injects the HTML changes from GLOBALS.TEMPLATES into the site
        // Header link to Userscript settings
        document.querySelector('li[data-name*=\'Lucky Egg\']')
            .insertAdjacentHTML('afterend', this.GLOBALS.TEMPLATES.qolHubLinkHTML);
        this.PAGES.setupHTML(this.GLOBALS, this.QOLHUB);
    }
    setupCSS() { // All the CSS changes are added here
        GM_addStyle(this.RESOURCES.css());
        this.PAGES.setupCSS(this.QOLHUB);
        this.QOLHUB.setupCSS();
    }
    setupObservers() { // all the Observers that needs to run
        this.PAGES.setupObservers(this.QOLHUB);
    }
    setupHandlers() { // all the event handlers
        const obj = this;
        this.jQuery(document).on('click', 'li[data-name="QoL"]', (function () { //open QoL hub
            this.QOLHUB.build(document);
            obj.populateSettingsPage();
        }));
        this.QOLHUB.setupHandlers();
        this.PAGES.setupHandlers(this.GLOBALS, this.QOLHUB);
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
                startup[message](this.GLOBALS);
            }
        }
    }
}



if (module) {
    module.exports.pfqol = PFQoL;
} else {
    new PFQoL(jQuery);
}