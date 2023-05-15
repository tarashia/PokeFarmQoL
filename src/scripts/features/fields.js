class Fields {
    constructor(page) {
        // determine if this is public vs private so the correct settings can be used
        if(page.name=='privateFields') {
            this.SETTING_ENABLE = PrivateFields.SETTING_ENABLE;
            this.SETTING_KEY = PrivateFields.SETTING_KEY;
            this.SUB_SETTINGS = PrivateFields.SUB_SETTINGS;
        }
        else if(page.name=='publicFields') {
            this.SETTING_ENABLE = PublicFields.SETTING_ENABLE;
            this.SETTING_KEY = PublicFields.SETTING_KEY;
            this.SUB_SETTINGS = PublicFields.SUB_SETTINGS;
        }
        else {
            console.error('Unknown field page');
            ErrorHandler.error('Unknown field page: '+page.name);
            return;
        }
        let settings = UserDataHandle.getSettings();
        // check if the master setting is enabled
        if(settings.QoLSettings[this.SETTING_ENABLE]) {
            // if specific features are enabled, run them
            if(settings[this.SUB_SETTINGS].pkmnlinks) {
                this.pkmnLinks();
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
}