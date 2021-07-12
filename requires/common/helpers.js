// eslint-disable-next-line no-unused-vars
class Helpers {
    buildOptionsString(arr) {
        let str = '<option value="none">None</option> ';
        for (let i = 0; i < arr.length; i++) {
            str += `<option value="${i}">${arr[i]}</option> `;
        }
        return str;
    }
    toggleSetting(key, set, cls) {
        // provide default value for cls
        cls = cls || 'qolsetting';
        // update values for checkboxes
        if (typeof set === 'boolean') {
            const element = document.querySelector(`.${cls}[data-key="${key}"]`);
            if (element && element.type === 'checkbox') {
                element.checked = set;
            }
        }
    } // toggleSetting
    setupFieldArrayHTML($, arr, id, div, cls) {
        const n = arr.length;
        for (let i = 0; i < n; i++) {
            const rightDiv = i + 1;
            const rightValue = arr[i];
            $(`#${id}`).append(div);
            $(`.${cls}`).removeClass(cls).addClass('' + rightDiv + '').find('.qolsetting').val(rightValue);
        }
    }
    loadSettings($, KEY, DEFAULT, obj) {
        if (localStorage.getItem(KEY) === null) {
            this.saveSettings(KEY);
        } else {
            try {
                const countScriptSettings = Object.keys(obj).length;
                const localStorageString = JSON.parse(localStorage.getItem(KEY));
                const countLocalStorageSettings = Object.keys(localStorageString).length;
                if (countLocalStorageSettings < countScriptSettings) { // adds new objects (settings) to the local storage
                    const defaultsSetting = DEFAULT;
                    const userSetting = JSON.parse(localStorage.getItem(KEY));
                    const newSetting = $.extend(true, {}, defaultsSetting, userSetting);

                    obj = newSetting;
                    this.saveSettings(KEY, obj);
                }
                if (countLocalStorageSettings > countScriptSettings) {
                    this.saveSettings(KEY, obj);
                }
            }
            catch (err) {
                this.saveSettings(KEY, obj);
            }
            if (localStorage.getItem(KEY) != JSON.stringify(obj)) {
                obj = JSON.parse(localStorage.getItem(KEY));
            }
        }

        return obj;
    }
    saveSettings(key, obj) {
        localStorage.setItem(key, JSON.stringify(obj));
    }
    textSearchDiv(cls, dataKey, id, arrayName) {
        return `<div class='${cls}'><label><input type="text" class="qolsetting" data-key="${dataKey}" ` +
            `array-name='${arrayName}'` +
            `/></label><input type='button' value='Remove' id='${id}'></div>`;
    }
    selectSearchDiv(cls, name, dataKey, options, id, divParent, arrayName) {
        return `<div class='${cls}'> <select name='${name}' class="qolsetting" data-key='${dataKey}' ` +
            `array-name='${arrayName}'> ${options} </select> <input type='button' value='Remove' id='${id}'> </div>`;
    }
    parseFieldPokemonTooltip($, GLOBALS, tooltip) {
        const dataElements = $(tooltip).children(0).children();
        let index = 1;
        // nickname
        const nickname = dataElements[index].textContent;
        if (!nickname) {
            console.error(`Helpers.parseFieldPokemonTooltip - nickname '${nickname}' (is not a valid name)`);
        }
        index++;

        /*
         * Issue #59 - Pokefarm added a new h3 element after the nickname
         * that contains no data
         */
        index++;

        // species
        let species = '';
        if (dataElements[index].textContent) {
            const tc = dataElements[index].textContent;
            const tcSplit = tc.trim().split(':  ');
            if (tcSplit.length == 1) {
                console.error('Helpers.parseFieldPokemonTooltip - species text does not contain \':  \'');
            }
            else {
                species = tcSplit[1];
            }
        }
        index++;

        // dataElements[3] will be a forme if the pokemon has a forme
        let forme = '';
        if (dataElements[index].textContent &&
            dataElements[index].textContent.startsWith('Forme')) {
            forme = dataElements[index].textContent.substr('Forme: '.length);
            index++;
        }

        // types
        const typeElements = $(dataElements[index]).children().slice(1);
        const typeUrls = typeElements.map(idx => typeElements[idx]['src']);
        let types = typeUrls.map(idx =>
            typeUrls[idx].substring(typeUrls[idx].indexOf('types/') + 'types/'.length,
                typeUrls[idx].indexOf('.png')));
        types = types.map(idx => types[idx].charAt(0).toUpperCase() + types[idx].substring(1));
        types = types.map(idx => GLOBALS.TYPE_LIST.indexOf(types[idx]));
        index++;

        // level
        let level = -1;
        if (dataElements[index].textContent) {
            const tcSplit = dataElements[index].textContent.split(' ');
            if (tcSplit.length > 1) {
                level = parseInt(tcSplit[1]);
            }
        } else {
            console.error('Helpers.parseFieldPokemonToolTip - could not load level because text was empty');
        }
        index++;

        // if the pokemon's happiness is less than max, skip the next index, since it will be a progress bar
        if (!dataElements[index].textContent ||
            !dataElements[index].textContent.startsWith('Happiness')) {
            index++;
        }

        // happiness
        let happiness = -1;
        if (dataElements[index].textContent) {
            const tcSplit = dataElements[index].textContent.split(' ');
            if (tcSplit.length > 1) {
                happiness = tcSplit[1].trim();
                happiness = (happiness == 'MAX') ? 100 : parseInt(happiness.substring(0, happiness.length - 1));
            }
        } else {
            console.error('Helpers.parseFieldPokemonToolTip - could not load happiness because text was empty');
        }
        index++;

        // nature
        let nature = -1;
        if (dataElements[index].textContent) {
            const tcSplit = dataElements[index].textContent.split(' ');
            if (tcSplit.length > 1) {
                nature = tcSplit[1].replace('(', '').trim();
                nature = GLOBALS.NATURE_LIST.indexOf(nature); // .substring(0, nature.length-1))
            }
        } else {
            console.error('Helpers.parseFieldPokemonToolTip - could not load nature because text was empty');
        }
        index++;

        // held item
        let item = '';
        if (dataElements[index].textContent !== 'Item: None') {
            item = dataElements[index].textContent.substring(dataElements[8].textContent.indexOf(' ') + 1);
        } else {
            item = 'None';
        }
        index++;

        // egg groups
        let eggGroups = [];
        if (dataElements[index].textContent) {
            eggGroups = dataElements[index].textContent.substring('Egg Group: '.length).split('/');
        }
        else {
            console.error('Helpers.parseFieldPokemonToolTip - could not load egg groups because text was empty');
        }
        index++;

        const ret = {
            'nickname': nickname,
            'species': species,
            'types': types,
            'level': level,
            'happiness_percent': happiness,
            'nature': nature,
            'item': item,
            'eggGroups': eggGroups,
        };
        if (forme !== '') {
            ret.forme = forme;
        }
        return ret;
    } // parseFieldPokemonToolTip
    getPokemonImageClass() {
        // this seems like PFQ's threshold based on my experimentation
        if (window.innerWidth >= 650) {
            return 'big';
        } else {
            return 'small';
        }
    }
}