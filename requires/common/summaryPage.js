/* globals Page */
// eslint-disable-next-line no-unused-vars
class SummaryPage extends Page {
  constructor(jQuery, localStorageMgr, helpers, GLOBALS) {
      super(jQuery, localStorageMgr, helpers, GLOBALS.SUMMARY_PAGE_SETTINGS_KEY, {}, 'summary');
  } // constructor

  setupHTML() {
    const pkmnID = this.jQuery('.party div')[0].getAttribute('data-pid');
    const displayAccordion = this.jQuery('#displaycodelist').parent();
    const newHTML = 
      "<p>Display an interactive panel in Pokefarm's forums!</p>"+
      '<p class="displaycode" style="user-select:all";>[pkmnpanel='+pkmnID+']</p>'+
      '<div style="border-bottom: 1px solid;margin-top: 1rem;"></div>';
    displayAccordion.prepend(newHTML);
  }
}
