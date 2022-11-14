/* 
This is a singleton wrapper on the settings/dex classes
It makes it easier to get the master settings instance,
without needing to explicitly pass it around between functions
*/

var UserSettingsHandle = (function () {
    var settings;
    var dex;

    return {
        getSettings: function () {
            if (!settings) {
                settings = new UserSettings();
            }
            return settings;
        },
        getDex: function() {
            if (!dex) {
                dex = new UserPokedex();
            }
            return dex;
        }
    };
})();
