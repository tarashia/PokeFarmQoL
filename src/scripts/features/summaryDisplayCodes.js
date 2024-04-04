class SummaryDisplayCodes {
  static SETTING_ENABLE = 'summaryEnable';

  constructor() {
    if(UserDataHandle.getSettings().QoLSettings[SummaryDisplayCodes.SETTING_ENABLE]) {
        this.setupHTML();
    }
    else {
        console.log('Summary display codes features disabled');
    }
  }

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
