/*
 * This class handles creating, removing, and handling the DOM object actions
 * for the QoL Hub.
 */
class QoLHub {
    constructor() {
        Helpers.addGlobalStyle(Resources.HUB_CSS);
        this.addQoLIcon();
        this.hubModal = new Modal('Quality of Life Script Hub', Resources.QOL_HUB_HTML, null, ['qolHubModal']);
        this.hubModal.addOpenCallback(QoLHub.setupHandlers);
        this.hubModal.addOpenCallback(QoLHub.afterOpen);
    }

    addQoLIcon() {
        if(document.getElementById('announcements')) {
            // this cannot go with the other handlers, as those only trigger after modal open
            const self = this;
            $('#qolHubIcon').on('click', (function () {
                console.log('Opening QoL hub');
                self.hubModal.open();
            }));
        }
        else {
            console.warn('Did not load QoL - could not find icon ribbon. Are you logged in? Is this a core page?');
            throw '#announcements missing';
        }
    }

    static setupHandlers() {
        // add menu items to reset dropdown
        for(let i=0; i<UserSettings.FEATURE_SPECIFIC_SETTINGS.length; i++) {
            let featureSettings = UserSettings.FEATURE_SPECIFIC_SETTINGS[i];
            $('#qolHubResetSettingsSelect').append('<option value="'+featureSettings.name+'">'+featureSettings.display+'</option>');
        }
        // reset settings handlers
        $('#resetPageSettings').on('click', (function (event) {
            UserDataHandle.getSettings().resetFeatureDefaults(event.target.value);
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
        // also logs the user settings object to the console
        $('#qolExportSettings').on('click', (function() {
            console.log('Stored settings:');
            let storedSettings = LocalStorageManager.getAllQoLSettings();
            console.log(storedSettings);
            console.log('User settings:');
            let userSettings = UserDataHandle.getSettings();
            console.log(userSettings);
            console.log('Dex data:');
            let dexData = UserDataHandle.getDex();
            console.log(dexData);
            // TODO: get relevant browser/screen size data, add to object?
            // convert to JSON, then base 64 encode
            let output = JSON.stringify(storedSettings);
            output = btoa(output);
            // output to hub to user can copy/paste it
            $('#qolStorageOutput').text(output);
            $('#qolStorageOutput').css('display','block');
        }));
    }

    // additional after open tasks that aren't handlers
    static afterOpen() {
        const settings = UserDataHandle.getSettings();
        settings.addSettingsListeners();
        // set dex updated date display
        let dexUpdateDate = UserDataHandle.getDex().DEX_UPDATE_DATE;
        if(!dexUpdateDate) {
            dexUpdateDate = 'Never updated';
        }
        $('#qolDexDate').text(dexUpdateDate);
        // glow colour changes
        $('#glowColourPreview').css('background-color',settings.QoLSettings.searchGlowColour);
        settings.registerChangeListener(function(changeDetails) {
            if(changeDetails.settingName=='searchGlowColour') {
                // prevent an empty value
                if(changeDetails.newValue.trim()=='') {
                    settings.changeSetting('QoLSettings', 'searchGlowColour', '#ffff77');
                }
                else {
                    $('#glowColourPreview').css('background-color',changeDetails.newValue);
                }
            }
        });
    }

} // QoLHub