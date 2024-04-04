class MultiUser {
  static SETTING_KEY = 'QoLMultiuser';
  static SETTING_ENABLE = 'partyMod';

  constructor() {
    if(UserDataHandle.getSettings().QoLSettings[MultiUser.SETTING_ENABLE]) {
      this.setupHTML();
      this.setupObservers();
      this.setupHandlers();
    }
    else {
      console.log('MultiUser features disabled');
    }
  }

  setupHTML() {
      Helpers.addGlobalStyle(Resources.PARTY_CSS);
      document.querySelector('#multiuser').insertAdjacentHTML('beforebegin', Resources.PARTY_MOD_HTML);
      const menuBackground = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('background-color');
      const menuColor = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('color');
      $('#qolpartymod').css('background-color', '' + menuBackground + '');
      $('#qolpartymod').css('color', '' + menuColor + '');
  }
  
  setupObservers() {
      const self = this;
      // don't observe the whole party area as it may cause excess firing
      Helpers.addObserver(document.querySelector('#multiuser'), {
          childList: true,
          subtree: true,
      }, function(mutations) {
          let doMod = false;
          mutations.forEach(function (mutation) {
              if($(mutation.target).attr('id') == 'partybox'){
                  // many mutations fire, so limit calls to party mod to prevent excess and looping calls
                  // #partybox is when the next button is added, making it a convenient time to run the mods
                  doMod = true;
              }
          });
          if(doMod) {
              // TODO: when going very fast, the get more class may not get added properly
              // figure out a time to re-detect, and fix the classes accordingly
              self.partyModification();
          }
      });
      $(window).resize(function() {
          setTimeout(() => {
              // the hide all alignment works better with the timeout
              self.partyModification();
          }, 100);
      });
  }

  setupHandlers() {
      const self = this;
      // activate the custom options collapse
      Helpers.activateCollapses();
      const settings = UserDataHandle.getSettings();
      settings.addSettingsListeners();
      settings.registerChangeListener(function(changeDetails) {
          if(changeDetails.settingGroup==MultiUser.SETTING_KEY) {
              self.partyModification();
          }
      });
  }

  // changes that all available mods make
  sharedPartyMods() {
      $('#multiuser').addClass('qolPartyModded');
      // change any berry to sour so it gets a bg color
      $('.berrybuttons[data-up="any"]').attr('data-up','sour'); 
  }

  partyModification() {
      // get page-specific settings
      const partySettings = UserDataHandle.getSettings()[MultiUser.SETTING_KEY];

      // first, remove any existing selection (all qol classes)
      let classList = document.getElementById('multiuser').className.split(/\s+/);
      for (let i = 0; i < classList.length; i++) {
          if (classList[i].match(/^qol/)) {
              $('#multiuser').removeClass(classList[i]);
          }
      }
      $('#qolpartymodcustom').css('display','none');
      $('.party .pkmn a.qolCompactLink').remove();

      const btns = $('#multiuser .party>div .action a');
      if(btns) {
          btns.css({"top":0,"left":0});
      }

      if (partySettings.partyModType == 'hideDislike') {
          $('#multiuser').addClass('qolPartyHideDislike');
          this.sharedPartyMods();
      }

      else if (partySettings.partyModType == 'niceTable') {
          $('#multiuser').addClass('qolPartyNiceTable');
          this.sharedPartyMods();
      }

      else if (partySettings.partyModType == 'hideAll') {
          $('#multiuser').addClass('qolPartyHideAll');
          this.sharedPartyMods();
          const nextLink = $('.mu_navlink.next');
          // on chrome, sometimes .position() is undefined on load
          if(btns && nextLink && nextLink.position()) {
              btns.css(nextLink.position());
          }
      }

      else if (partySettings.partyModType == 'customParty') {
          $('#multiuser').addClass('qolPartyCustomParty');
          this.sharedPartyMods();
          $('#qolpartymodcustom').css('display','block');

          // differentiate next and more buttons
          let next = $('.mu_navlink.next');
          if(next.text() == 'Get more +') {
              next.addClass('qolGetMore');
          }
          else {
              next.addClass('qolGoNext');
          }

          // hide classes are inverted
          this.partymodHelper('qolStackNext',partySettings.stackNextButton === true);
          this.partymodHelper('qolStackMore',partySettings.stackMoreButton === true);
          this.partymodHelper('qolHideParty',partySettings.showPokemon === false);
          this.partymodHelper('qolCompactParty',partySettings.compactPokemon === true);
          this.partymodHelper('qolHideTrainerCard',partySettings.showTrainerCard === false);
          this.partymodHelper('qolHideFieldButton',partySettings.showFieldButton === false);
          this.partymodHelper('qolHideModeChecks',partySettings.showModeChecks === false);
          this.partymodHelper('qolHideUserName',partySettings.showUserName === false);
          this.partymodHelper('qolHideShowcase',partySettings.includeShowcase === false);

          // clickable compact pokemon
          if(partySettings.showPokemon === true 
              && partySettings.compactPokemon === true  
              && partySettings.clickablePokemon === true ) 
          {
              $('.party .pkmn').each(function() {
                  const pkmnID = $(this.parentElement).attr('data-pid');
                  if(pkmnID) {
                      $(this).append('<a class="qolCompactLink" href="/summary/'+pkmnID+'"></a>');
                  }
              });
          }
      }
      
      else if (partySettings.partyModType !== 'none') {
          ErrorHandler.warn('Invalid party mod type: '+partySettings.partyModType);
      }
  }

  // toggle setting should be true to add the class, false to remove it
  partymodHelper(toggleClass, toggleSetting) {
      if(toggleSetting) {
          $('#multiuser').addClass(toggleClass);
      }
      else {
          $('#multiuser').removeClass(toggleClass);
      }
  }
}
