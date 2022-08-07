class SummaryPage extends Page {
  constructor(localStorageMgr, helpers, GLOBALS) {
      super(localStorageMgr, helpers, GLOBALS.SUMMARY_PAGE_SETTINGS_KEY, {}, 'summary');
  } // constructor

  setupHTML() {
    const pkmnID = $('.party div')[0].getAttribute('data-pid');
    const displayAccordion = $('#displaycodelist').parent();
    const newHTML = 
      "<p>Display an interactive panel in Pokefarm's forums!</p>"+
      '<p class="displaycode" style="user-select:all";>[pkmnpanel='+pkmnID+']</p>'+
      '<div style="border-bottom: 1px solid;margin-top: 1rem;"></div>';
    displayAccordion.prepend(newHTML);
  }
}
