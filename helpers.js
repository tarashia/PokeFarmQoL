let Helpers = (function Helpers() {
    /* public stuff */
    const API = {
        onPage(pg) { return window.location.href.indexOf(pg) != -1; },
        onMultiuserPage() { return API.onPage("users/"); },
        onShelterPage() { return API.onPage("/shelter"); },
        onPublicFieldsPage() { return API.onPage("fields/"); },
        onPrivateFieldsPage() { return API.onPage("fields") && !API.onPublicFieldsPage(); },
        onFarmPage(tab) { return API.onPage("farm#" + ((tab===undefined) ? "" : tab)); },
        onFishingPage() { return API.onPage("fishing"); },
        onLabPage() { return API.onPage("/lab"); },
        onDexPage() { return API.onPage("dex"); },

        shelterKeyIsTopCheckbox(k) {
            return k != 'findCustom' && k != 'findMale' && k != 'findFemale' && k != 'findNoGender' && k != 'customEgg' && k != 'customPokemon' && k != 'customPng';
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
            console.log('Helpers.loadSettings')

            if (localStorage.getItem(KEY) === null) {
                API.saveSettings(KEY);
            } else {
                // console.log(localStorage.getItem(KEY))
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
            //                 console.log('Helpers.saveSettings')
            //                 console.log(KEY)
            //                 console.log(obj)
            localStorage.setItem(KEY, JSON.stringify(obj));
        },
    };

    return API;
})();
