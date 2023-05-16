class Fields {
    constructor(page) {
        let settings = UserDataHandle.getSettings();
        // determine if this is public vs private so the correct settings can be used
        if(page.name=='privateFields') {
            this.SETTING_ENABLE = PrivateFields.SETTING_ENABLE;
            this.SETTING_KEY = PrivateFields.SETTING_KEY;
            this.SUB_SETTINGS = PrivateFields.SUB_SETTINGS;
            $('#content').addClass('qolPrivateField');
        }
        else if(page.name=='publicFields') {
            this.SETTING_ENABLE = PublicFields.SETTING_ENABLE;
            this.SETTING_KEY = PublicFields.SETTING_KEY;
            this.SUB_SETTINGS = PublicFields.SUB_SETTINGS;
            $('#content').addClass('qolPublicField');
        }
        else {
            console.error('Unknown field page');
            ErrorHandler.error('Unknown field page: '+page.name);
            return;
        }
        // check if the master setting is enabled
        if(settings.QoLSettings[this.SETTING_ENABLE]) {
            Helpers.addGlobalStyle(Resources.FIELDS_CSS);
            // if specific features are enabled, run them
            if(settings[this.SUB_SETTINGS].pkmnlinks) {
                this.pkmnLinks();
            }
            if(settings[this.SUB_SETTINGS].search) {
                this.setupSearch(settings);
            }
            if(settings[this.SUB_SETTINGS].tooltip) {
                this.setupTooltips(settings);
            }
        }
        // don't log when disabled here, leave that to the unique classes
    }

    pkmnLinks() {
        // add modal button next to farm name
        let header = document.getElementsByTagName('h1')[0];
        let newBtn = document.createElement('button');
        header.appendChild(newBtn);
        newBtn.innerText = 'View links';
        newBtn.style= 'vertical-align:middle;margin-left: 10px;';

        let self = this;
        newBtn.onclick = function(){
            let content = '<table style="border-collapse:collapse;">';
            let fieldmon = document.getElementsByClassName('fieldmon');
            for(let i=0; i<fieldmon.length; i++){
              if(i%4==0) {
                  content += '<tr>';
              }
              let pkmnID = fieldmon[i].getAttribute('data-id');
              let small = fieldmon[i].children[1];
              let imgSRC = small.getAttribute('src');
              let pkmnName = small.getAttribute('alt');
              content += '<td style="padding:5px;border:1px solid;">' +
                          '<img style="vertical-align:middle;" src="'+imgSRC+'"> ' +
                          '<a href="/summary/'+pkmnID+'">'+pkmnName+'</a></td>';
              if(i%4==3) {
                  content += '</tr>';
              }
            }
            content += '</table>';
            self.pkmnLinksModal = new Modal('Pokemon links', content);
            self.pkmnLinksModal.open();
        }
    }

    setupSearch(settings) {
    }

    // enable the tooltip collapse, and enable the input/setting listeners
    setupTooltips(settings) {
        document.querySelector('#fieldmodetoggle').insertAdjacentHTML('afterend', Resources.FIELD_TOOLTIP_HTML);
        // set data-group based on public vs private
        $('input[name="fieldHideHoverTooltips"]').attr('data-group',this.SETTING_KEY);
        let self = this;
        Helpers.activateCollapses();
        settings.addSettingsListeners();
        settings.registerChangeListener(function(changeDetails) {
            if(changeDetails.settingName == 'fieldHideHoverTooltips') {
                self.hideTooltips(settings);
            }
        });
        this.hideTooltips(settings);
    }
    // add & remove the class that hides hover tooltips based on the current setting
    hideTooltips(settings) {
        if(settings[this.SETTING_KEY].fieldHideHoverTooltips) {
            $('#field_field').addClass('qolHideTooltips');
        }
        else {
            $('#field_field').removeClass('qolHideTooltips');
        }
    }
}