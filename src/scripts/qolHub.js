/*
 * This class handles creating, removing, and handling the DOM object actions
 * for the QoL Hub.
 */
class QoLHub {
    constructor(PAGES) {
        this.PAGES = PAGES;
        this.SETTINGS_SAVE_KEY = Globals.SETTINGS_SAVE_KEY;
        this.USER_SETTINGS = UserSettingsHandle.getSettings();
        this.LINKED_SETTINGS = this.USER_SETTINGS.LINKED_SETTINGS;
    }
    setupCSS() {
        //custom user css
        $('head').append('<style type="text/css">' + this.USER_SETTINGS.customCss + '</style>');
    }
    setupHandlers() {
        const obj = this;
        $('#qolcustomcss', document).on('keydown', function (e) {
            if (e.keyCode == 9 || e.which == 9) {
                e.preventDefault();
                const s = this.selectionStart;
                $(this).val(function (i, v) {
                    return v.substring(0, s) + '\t' + v.substring(this.selectionEnd);
                });
                this.selectionEnd = s + 1;
            }
        });

        $(document).on('input', '.qolhubsetting', (function () { //Changes QoL settings
            const dataKey = this.getAttribute('data-key');
            obj.settingsChange(this.getAttribute('data-key'),
                $(this).val(),
                $(this).parent().parent().attr('class'),
                $(this).parent().attr('class'),
                (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
            obj.handleLinkedSetting(dataKey);
        }));

        $(document).on('click', '.closeHub', (function () { //close QoL hub
            obj.close(document);
        }));

        $(document).on('click', '#resetPageSettings', (function () {
            const page = $(this).parent().find('select').val();
            obj.clearPageSettings(page);
        }));

        $(document).on('click', '#resetAllSettings', (function () {
            if(window.confirm('Are you sure? All settings, including your custom CSS, will be reset.')) {
                obj.clearAllSettings();
            }
        }))

        $(document).on('click', 'h3.slidermenu', (function () { //show hidden li in change log
            $(this).next().slideToggle();
        }));

        // Issue #61 - Item 6 - Remove the 'Cleared!' message so the user knows they can click it again
        $(document).on('mouseover', '#clearCachedDex', (function () {
            $('#clearCachedDex').next().remove();
        }));

        // Issue #61 - Item 6 - Add a 'Cleared!' message so the user knows that the clearing works
        $(document).on('click', '#clearCachedDex', (function () {
            obj.resetDex();
        }));

        $(document).on('click', '#qolErrorConsole', (function() {
            let consoleContent = $('#qolConsoleHolder').html();
            if(consoleContent.trim() == '') {
                consoleContent = '[ No errors to display ]';
            }
            $('#qolConsoleContent').html(consoleContent);
        }));

        $(document).on('click', '#qolDataLog', (function() {
            console.log(UserSettingsHandle.getSettings());
        }));
        $(document).on('click', '#qolDexLog', (function() {
            console.log(UserSettingsHandle.getDex());
        }));
        $(document).on('click', '#qolStorageLog', (function() {
            console.log(LocalStorageManager.getAllLocalStorage());
        }));
    }
    loadSettings() {
        try {
            if (LocalStorageManager.getItem(this.SETTINGS_SAVE_KEY) === null) {
                this.saveSettings();
            } else {
                if(this.USER_SETTINGS.load(JSON.parse(LocalStorageManager.getItem(this.SETTINGS_SAVE_KEY)))) {
                    this.saveSettings();
                }
            }
        } catch(err) {
            Helpers.writeCustomError('Error while loading user settings: '+err,'error',err);
        }
    }
    clearAllSettings() {
        this.PAGES.clearAllPageSettings();
        this.USER_SETTINGS.setDefaults();
        this.saveSettings();
        location.reload(); 
    }
    saveSettings() {
        LocalStorageManager.setItem(this.SETTINGS_SAVE_KEY, JSON.stringify(this.USER_SETTINGS));
    }
    populateSettings() {
        function populateSetting(object, key, self, oldKeys) {
            oldKeys = oldKeys || [];
            const _object = object[key];
            const newKeys = [...oldKeys, key];
            if (typeof _object === 'boolean') {
                const _key = newKeys.join('.');
                Helpers.toggleSetting(_key, _object, 'qolhubsetting');
            }
            else if (typeof _object === 'string') {
                const _key = newKeys.join('.');
                Helpers.toggleSetting(_key, _object, 'qolhubsetting');
            } else if (typeof _object === 'object') {
                for (const _key in _object) {
                    populateSetting(_object, _key, self, newKeys);
                }
            }
        }
        for (const key in this.USER_SETTINGS) {
            if (Object.hasOwnProperty.call(this.USER_SETTINGS, key)) {
                populateSetting(this.USER_SETTINGS, key, this);
            }
            this.handleLinkedSetting(key);
        }
    }
    settingsChange(element, textElement) {
        function getProperty( propertyName, object ) {
            const parts = propertyName.split( '.' );
            const length = parts.length;
            let property = object || this;

            for (let i = 0; i < length; i++ ) {
                if ( ! Object.hasOwnProperty.call(property, parts[i])) {
                    return null;
                }
                property = property[parts[i]];
            }
            return property;
        }

        function setProperty( propertyName, object, newValue) {
            const parts = propertyName.split('.');
            const first = parts[0];
            const rest = parts.slice(1);

            if ( !Object.hasOwnProperty.call(object, first)) {
                return false;
            }
            else if (rest.length == 0) {
                object[first] = newValue;
                return true;
            } else {
                return setProperty(rest.join('.'), object[first], newValue);
            }
        }

        const oldValue = getProperty(element, this.USER_SETTINGS);
        let newValue;
        if (oldValue !== undefined) { // userscript settings
            if (oldValue === false) {
                newValue = true;
            } else if (oldValue === true) {
                newValue = false;
            } else if (typeof oldValue === 'string') {
                newValue = textElement;
            }
            if(!setProperty(element, this.USER_SETTINGS, newValue)) {
                return false;
            } else {
                this.saveSettings();
                return true;
            }
        }
        return false;
    }
    clearPageSettings(pageName) {
        if (pageName !== 'None') { // "None" matches option in HTML
            this.PAGES.clearPageSettings(pageName);
        }
    }
    handleLinkedSetting(possibleManager) {
        const linkedSettingIndex = this.LINKED_SETTINGS.findIndex(ls => ls.manager === possibleManager);
        if(linkedSettingIndex > -1) {
            const managed = this.LINKED_SETTINGS[linkedSettingIndex].managed;
            const USER_SETTINGS = this.USER_SETTINGS[managed];
            if($(`[data-key=${possibleManager}]`).prop('checked') === false) {
                for(const setting in USER_SETTINGS) {
                    $(`[data-key="${managed}.${setting}"]`).prop('disabled', true);
                }
            } else {
                for(const setting in USER_SETTINGS) {
                    $(`[data-key="${managed}.${setting}"]`).prop('disabled', false);
                }
            }
        }
    }
    build(document) {
        $('body', document).append(Resources.qolHubHTML());
        $('#core', document).addClass('scrolllock');
        const qolHubCssBackgroundHead = $('.qolHubHead.qolHubSuperHead').css('background-color');
        const qolHubCssTextColorHead = $('.qolHubHead.qolHubSuperHead').css('color');
        const qolHubCssBackground = $('.qolHubTable').css('background-color');
        const qolHubCssTextColor = $('.qolHubTable').css('color');
        const qolHubDialogBorder = $('.dialog>div>div>div').css('border');
        $('.qolHubHead').css('background-color', qolHubCssBackgroundHead);
        $('.qolHubHead').css('color', qolHubCssTextColorHead);
        $('.qolChangeLogHead').css('background-color', qolHubCssBackgroundHead);
        $('.qolChangeLogHead').css('color', qolHubCssTextColorHead);
        $('.qolChangeLogHead').css('border', qolHubDialogBorder);
        $('.qolopencloselist.qolChangeLogContent').css('background-color', qolHubCssBackground);
        $('.qolopencloselist.qolChangeLogContent').css('color', qolHubCssTextColor);

        $('.qolAllSettings').css('border', qolHubDialogBorder);

        const customCss = this.USER_SETTINGS.customCss;

        if (customCss === '') {
            $('.textareahub textarea', document).val('#thisisanexample {\n    color: yellow;\n}\n\n.thisisalsoanexample {\n    background-color: blue!important;\n}\n\nhappycssing {\n    display: absolute;\n}');
        } else {
            $('.textareahub textarea', document).val(customCss);
        }

        let dexUpdateDate = UserSettingsHandle.getDex().DEX_UPDATE_DATE;
        if(!dexUpdateDate) {
            dexUpdateDate = 'Not updated since installation';
        }
        $('.qolDate', document).text(dexUpdateDate);
    }
    close(document) {
        $('.dialog', document).remove();
        $('#core', document).removeClass('scrolllock');
    }
    resetDex() {
        $('#clearCachedDex').next().remove();
        UserSettingsHandle.getDex().resetDex();
        $('#clearCachedDex').after('<span> Cleared!</span>');
    }
} // QoLHub