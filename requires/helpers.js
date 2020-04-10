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
        saveSettings(KEY, obj) {
            localStorage.setItem(KEY, JSON.stringify(obj));
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

            // nickname
            const nickname = dataElements[1].textContent

            // species
            const species  = dataElements[2].textContent.trim().split(':  ')[1]

            // types
            const typeElements = $(dataElements[3]).children().slice(1,)
            const typeUrls = typeElements.map(idx => typeElements[idx]['src'])
            let types = typeUrls.map(idx =>
                                     typeUrls[idx].substring(typeUrls[idx].indexOf("types/")+"types/".length,
                                                             typeUrls[idx].indexOf(".png")))
            types = types.map(idx => types[idx].charAt(0).toUpperCase() + types[idx].substring(1))
            types = types.map(idx => GLOBALS.TYPE_LIST.indexOf(types[idx]))
            
            // level
            const level = parseInt(dataElements[4].textContent.split(' ')[1])

            // happiness
            let happiness = dataElements[6].textContent.split(' ')[1].trim()
            happiness = parseInt(happiness.substring(0, happiness.length-1))

            // nature
            let nature = dataElements[7].textContent.split(' ')[1]
            nature = GLOBALS.NATURE_LIST.indexOf(nature.substring(0, nature.length-1))

            // held item
            const item = dataElements[8].textContent.substring(dataElements[8].textContent.indexOf(' ')+1)

            // egg groups
            const eggGroups = dataElements[9].textContent.substring("Egg Group: ".length).split('/')

            return {
                'nickname': nickname,
                'species': species,
                'types': types,
                'level': level,
                'happiness_percent': happiness,
                'nature': nature,
                'item': item,
                'eggGroups': eggGroups,
            }
        }
	
    };

    return API;
})();
