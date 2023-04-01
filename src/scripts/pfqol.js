// eslint-disable-next-line no-unused-vars
class PFQoL {
  constructor() {
      // :contains to case insensitive
      $.extend($.expr[':'], {
          // eslint-disable-next-line no-unused-vars
          'containsIN': function (elem, i, match, array) {
              return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || '').toLowerCase()) >= 0;
          }
      });

      LocalStorageManager.migrateSettings();

      this.PAGES = new PagesManager();
      this.QOLHUB = new QoLHub(this.PAGES);

      this.init();
  }
  instantiatePages(obj) {
    try {
        obj.PAGES.instantiatePages();
    } catch(err) {
        Helpers.writeCustomError('Error while instantiating pages: '+err,'error',err);
    }
  }
  loadSettings(obj) { // initial settings on first run and setting the variable settings key
    try {
        obj.QOLHUB.loadSettings();
        obj.PAGES.loadSettings();
    } catch(err) {
        Helpers.writeCustomError('Error while loading settings during startup: '+err,'error',err);
    }
  } // loadSettings
  saveSettings(obj) { // Save changed settings
      obj.QOLHUB.saveSettings();
      obj.PAGES.saveSettings();
  } // saveSettings
  populateSettingsPage(obj) { // checks all settings checkboxes that are true in the settings
    try {
        obj.QOLHUB.populateSettings();
        obj.PAGES.populateSettings();
    } catch(err) {
        Helpers.writeCustomError('Error while populating settings page: '+err,'error',err);
    }
  }
  addIcon() { // inject the QoL icon into the icon bar
    // this is done separately from the main HTML to ensure it's always added first,
    // as there's a custom error handler that relies on it existing
    
    if(document.getElementById('announcements')) {
        document.querySelector('#announcements li.spacer')
              .insertAdjacentHTML('beforebegin', Resources.qolHubLinkHTML());
    }
    else {
        console.warn('Did not load QoL - could not find icon ribbon. Are you logged in? Is this a core page?');
        throw '#announcements missing';
    }
  }
  setupHTML(obj) { // injects the HTML changes into the site
    try {
        obj.PAGES.setupHTML();
    } catch(err) {
        Helpers.writeCustomError('Error while setting up HTML: '+err,'error',err);
    }
  }
  setupCSS(obj) { // All the CSS changes are added here
    try {
        Helpers.addGlobalStyle(Resources.css());
        obj.PAGES.setupCSS();
        obj.QOLHUB.setupCSS();
    } catch(err) {
        Helpers.writeCustomError('Error while applying global styling: '+err,'error',err);
    }
  }
  setupObservers(obj) { // all the Observers that needs to run
    try {
        obj.PAGES.setupObservers();
    } catch(err) {
        Helpers.writeCustomError('Error while setting up observers: '+err,'error',err);
    }
  }
  setupHandlers(obj) { // all the event handlers
    try {
        $(document).on('click', 'li[data-name="QoL"]', (function () { //open QoL hub
            obj.QOLHUB.build(document);
            obj.populateSettingsPage(obj);
        }));
        obj.QOLHUB.setupHandlers();
        obj.PAGES.setupHandlers();
    } catch(err) {
        Helpers.writeCustomError('Error while setting up handlers: '+err,'error',err);
    }
  }
  startup() { // All the functions that are run to start the script on Pokéfarm
      return {
          'adding QoL icon': this.addIcon,
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
              startup[message](this);
          }
      }
      console.log('Finished startup');
  }
}