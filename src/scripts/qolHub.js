/*
 * This class handles creating, removing, and handling the DOM object actions
 * for the QoL Hub.
 */
// eslint-disable-next-line no-unused-vars
class QoLHub {
    constructor() {
        QoLHub.addQoLIcon();
        this.hubModal = new Modal('Quality of Life Script Hub', Resources.QOL_HUB_HTML, null, ['qolHubModal']);
        this.hubModal.addOpenCallback(QoLHub.setupHandlers);
        this.hubModal.addOpenCallback(QoLHub.afterOpen);
    }

    static addQoLIcon() {
        if(document.getElementById('announcements')) {
            document.querySelector('#announcements li.spacer')
                  .insertAdjacentHTML('beforebegin', Resources.QOL_HUB_ICON_HTML);
        }
        else {
            console.warn('Did not load QoL - could not find icon ribbon. Are you logged in? Is this a core page?');
            throw '#announcements missing';
        }
    }

    static setupHandlers() {
        // reset settings handlers
        $('#resetPageSettings').on('click', (function (e) {
            console.log('TODO reset page settings');
            console.log(e);
        }));
        $('#resetAllSettings').on('click', (function () {
            if(window.confirm('Are you sure? All settings, including your custom CSS, will be reset.')) {
                LocalStorageManager.clearAllQoLKeys();
                location.reload(); 
            }
        }));

        // clear cached dex
        $('#clearCachedDex').on('click', (function () {
            UserDataHandle.getDex().resetDex();
            $('#clearCachedDex').after('<p>Dex cleared!</p>');
            $('#qolDexDate').text('Never updated');
        }));

        // fetch errors from the hidden console, and show them in the hub
        $('#qolErrorConsole').on('click', (function() {
            let consoleContent = $('#qolConsoleHolder').html();
            if(consoleContent.trim() == '') {
                consoleContent = '[ No errors to display ]';
            }
            $('#qolConsoleContent').html(consoleContent);
        }));

        // storage/settings loggers
        $('#qolStorageLog').on('click', (function() {
            let storedSettings = LocalStorageManager.getAllQoLSettings();
            console.log(storedSettings);
            // TODO: get relevant browser/screen size data, add to object?
            // convert to JSON, then base 64 encode
            let output = JSON.stringify(storedSettings);
            output = btoa(output);
            // output to hub to user can copy/paste it
            $('#qolStorageOutput').text(output);
            $('#qolStorageOutput').css('display','block');
        }));
        $(document).on('click', '#qolLogPlusDex', (function() {
            // console-only version of above that also includes dex data
            // stringifies output to make sure it doesn't get changed later
            let storedSettings = LocalStorageManager.getAllQoLSettings(true);
            console.log(JSON.stringify(storedSettings));
        }));
    }

    // additional after open tasks that aren't handlers
    static afterOpen() {
        // set dex updated date display
        let dexUpdateDate = UserDataHandle.getDex().DEX_UPDATE_DATE;
        if(!dexUpdateDate) {
            dexUpdateDate = 'Never updated';
        }
        $('#qolDexDate').text(dexUpdateDate);
        
        let mainSettings = UserDataHandle.getSettings().mainSettings;
        if('customCss' in mainSettings && mainSettings.customCss.trim() !== ''){
            $('#qolcustomcss').val(mainSettings.customCss);
        }
        else {
            $('#qolcustomcss').val(Resources.DEMO_CSS);
        }
    }

} // QoLHub