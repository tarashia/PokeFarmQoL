let Helpers = (function Helpers() {
    /* public stuff */
    const API = {
        publicFieldsKeyIsTopCheckbox(k) {
            return k === 'fieldNewPokemon' || k === 'fieldShiny' || k === 'fieldAlbino' || k === 'fieldMelanistic' ||
                k === 'fieldPrehistoric' || k === 'fieldDelta' || k === 'fieldMega' || k === 'fieldStarter' ||
                k === 'fieldCustomSprite' || k === 'fieldItem'
        },

        buildOptionsString(arr) {
            let str = '<option value="none">None</option> ';
            for(let i = 0; i < arr.length; i++) {
                str += `<option value="${i}">${arr[i]}</option> `;
            }
            return str;
        },

        toggleSetting(key, set = false) {
            if (typeof set === 'boolean') {
                let element = document.querySelector(`.qolsetting[data-key="${key}"]`);
                if (element && element.type === 'checkbox') {
                    element.checked = set;
                }
            }
            else if (typeof set === 'string') {
                let element = document.querySelector(`.qolsetting[data-key="${key}"]`);
                if (element && element.type === 'text') {
                    element.value = set;
                }
            }
        }, // toggleSetting

        setupFieldArrayHTML(arr, id, div, cls) {
            let n = arr.length;
            for(let i = 0; i < n; i++) {
                let rightDiv = i + 1;
                let rightValue = arr[i];
                $(`#${id}`).append(div);
                $(`.${cls}`).removeClass(cls).addClass(""+rightDiv+"").find('.qolsetting').val(rightValue);
            }
        },

        loadSettings(KEY, DEFAULT, obj) {
            if (localStorage.getItem(KEY) === null) {
                API.saveSettings(KEY);
            } else {
                try {
                    let countScriptSettings = Object.keys(obj).length
                    let localStorageString = JSON.parse(localStorage.getItem(KEY));
                    let countLocalStorageSettings = Object.keys(localStorageString).length
                    if (countLocalStorageSettings < countScriptSettings) { // adds new objects (settings) to the local storage
                        let defaultsSetting = DEFAULT;
                        let userSetting = JSON.parse(localStorage.getItem(KEY));
                        let newSetting = $.extend(true,{}, defaultsSetting, userSetting);

                        obj = newSetting;
                        API.saveSettings(KEY, obj);
                    }
                    if (countLocalStorageSettings > countScriptSettings) {
                        API.saveSettings(KEY, obj);
                    }
                }
                catch(err) {
                    API.saveSettings(KEY, obj);
                }
                if (localStorage.getItem(KEY) != obj) {
                    obj = JSON.parse(localStorage.getItem(KEY));
                }
            }

            return obj;
        },
        saveSettings(key, obj) {
            localStorage.setItem(key, JSON.stringify(obj));
        },

        textSearchDiv(cls, data_key, id, array_name) {
            return `<div class='${cls}'><label><input type="text" class="qolsetting" data-key="${data_key}" ` +
                ((array_name !== undefined) ? `array-name='${array_name}'` : ``) +
                `/></label><input type='button' value='Remove' id='${id}'></div>`;
        },

        selectSearchDiv(cls, name, data_key, options, id, divParent, array_name) {
            return `<div class='${cls}'> <select name='${name}' class="qolsetting" data-key='${data_key}' ` +
                `array-name='${array_name}'> ${options} </select> <input type='button' value='Remove' id='${id}'> </div>`;
        },

        parseFieldPokemonTooltip(tooltip) {
            const dataElements = $(tooltip).children(0).children()

            let index = 1;
            // nickname
            const nickname = dataElements[index++].textContent

            // species
            const species  = dataElements[index++].textContent.trim().split(':  ')[1]

            // dataElements[3] will be a forme if the pokemon has a forme
            let forme = ""
            if(dataElements[index].textContent.startsWith("Forme")) {
                forme = dataElements[index++].textContent.substr("Forme: ".length)
            }

            // types
            const typeElements = $(dataElements[index++]).children().slice(1,)
            const typeUrls = typeElements.map(idx => typeElements[idx]['src'])
            let types = typeUrls.map(idx =>
                                     typeUrls[idx].substring(typeUrls[idx].indexOf("types/")+"types/".length,
                                                             typeUrls[idx].indexOf(".png")))
            types = types.map(idx => types[idx].charAt(0).toUpperCase() + types[idx].substring(1))
            types = types.map(idx => GLOBALS.TYPE_LIST.indexOf(types[idx]))

            // level
            const level = parseInt(dataElements[index++].textContent.split(' ')[1])

            // if the pokemon's happiness is less than max, skip the next index, since it will be a progress bar
            if(!dataElements[index].textContent.startsWith("Happiness")) {
                index++;
            }

            // happiness
            let happiness = dataElements[index++].textContent.split(' ')[1].trim()
            happiness = parseInt(happiness.substring(0, happiness.length-1))

            // nature
            let nature = dataElements[index++].textContent.split(' ')[1].replace('(', '').trim()
            nature = GLOBALS.NATURE_LIST.indexOf(nature) // .substring(0, nature.length-1))

            // held item
            let item = ""
            if(dataElements[index].textContent !== "Item: None") {
                item = dataElements[index++].textContent.substring(dataElements[8].textContent.indexOf(' ')+1)
            } else {
                item = "None"
                index++
            }

            // egg groups
            const eggGroups = dataElements[index++].textContent.substring("Egg Group: ".length).split('/')

            const ret = {
                'nickname': nickname,
                'species': species,
                'types': types,
                'level': level,
                'happiness_percent': happiness,
                'nature': nature,
                'item': item,
                'eggGroups': eggGroups,
            }
            if(forme !== "") {
                ret.forme = forme
            }
            return ret;
        }

    };

    return API;
})();
