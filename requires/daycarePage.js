class DaycarePage {
    SETTINGS_SAVE_KEY() { return 'QoLDaycare' }
    DEFAULT_SETTINGS() { return {} }
    
    constructor() {
        this.settings = this.DEFAULT_SETTINGS();    
        this.observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if(document.querySelector('#fs_pokemon') !== null) {
                    this.customSearch()
                }
            })
        });
    } // constructor
   
    loadSettings() { // initial settings on first run and setting the variable settings key
        this.settings = Helpers.loadSettings(this.SETTINGS_SAVE_KEY(), this.DEFAULT_SETTINGS(), this.settings);
    }
    saveSettings() { // Save changed settings
        Helpers.saveSettings(this.SETTINGS_SAVE_KEY(), this.settings)
    }
    // getSettings() { return this.settings; }
    populateSettings() { /* empty */ }
    settingsChange(element, textElement, customClass, typeClass) { /* empty */ }
    setupHTML() { /* empty */ }
    setupCSS() { /* empty */ }
    setupObserver() {
        this.observer.observe(document.querySelector('body'), {
            childList: true,
            subtree: true
        });
    }
    setupHandlers() { /* empty */ }
    customSearch() {
        const button = document.querySelector('#pkmnadd')

        let gender = null;
        let eggGroup1 = null, eggGroup2 = null;

        if(button !== null) {
            if(button.attributes['data-gender'] !== undefined) {
                gender = button.attributes['data-gender'].value
            }
            // the egg group is binary coded decimal
            // if a pokemon has two egg groups, the leftmost 4 bits of the number returned
            // are the first egg group and the rightmost 4 bits are the second egg group
            if(button.attributes['data-egggroup'] !== undefined) {
                eggGroup1 = parseInt(button.attributes['data-egggroup'].value)
                if(eggGroup1 > 15) { // two egg groups
                    eggGroup2 = eggGroup1 & 15;
                    eggGroup1 = eggGroup1 >> 4;
                }
            }
        }

        const EGG_ID_TO_NAME = GLOBALS.EGG_GROUP_ID_TO_NAME;
        if(eggGroup1 !== null) { eggGroup1 = EGG_ID_TO_NAME[eggGroup1] }
        if(eggGroup2 !== null) { eggGroup2 = EGG_ID_TO_NAME[eggGroup2] }

        // TODO - translate egg group to name. Reorder the egg group list
        // in globals.js to match the order that PFQ has it in

        // clear matches
        let bigImgs = document.querySelectorAll('.privatefoundme')
        if(bigImgs !== null) {
            bigImgs.forEach((b) => {$(b).removeClass('privatefoundme')})
        }

        if(gender !== null && eggGroup1 !== null) {
            const fieldmons = document.querySelectorAll('.fieldmon')
            if(fieldmons !== null) {
                for(let m = 0; m < fieldmons.length; m++) {
                    let mon = fieldmons[m]
                    let searchPokemonBigImg = $(mon)[0].childNodes[0];
                    let searchPokemon = searchPokemonBigImg.alt;

                    let tooltip = $(mon).next()
                    let fieldmontip = tooltip[0].querySelector('.fieldmontip')
                    let speciesDiv = $(fieldmontip).children(':contains(Species)')[0];
                    let eggGroupDiv = $(fieldmontip).children(':contains(Egg Group)')[0]
                    let searchIcons = speciesDiv.querySelector('span').querySelectorAll('img')

                    // There can be other icons if the Pokemon is CS/Delta/Shiny/Albino/Melan
                    // The gender title can be "[M], [F], [N]"
                    let searchGender = searchIcons[0].title.toLowerCase().substring(1,2)
                    let searchEggGroups = eggGroupDiv.innerText.slice("Egg Group: ".length).split('/')

                    // Match ditto to anything that can breed
                    if(searchPokemon === "Ditto" && eggGroup1 !== "Undiscovered") {
                        $(searchPokemonBigImg).addClass('daycarefoundme')
                    }
                    // Match correct gender
                    else {
                        let genderCorrect = (gender === "f" && searchGender === "m") ||
                            (gender === "m" && searchGender === "f");
                        let group1Correct = searchEggGroups.reduce((res, curr) => {res = res || (eggGroup1 === curr); return res}, false);
                        let group2Correct = false;
                        if(eggGroup2 !== null) {
                            group2Correct = searchEggGroups.reduce((res, curr) => {res = res || (eggGroup2 === curr); return res}, false);
                        }

                        if(genderCorrect && (group1Correct || group2Correct)) {
                            $(searchPokemonBigImg).addClass('daycarefoundme')
                        }
                    }

                } // for
            }
        } // if
    } // customSearch
};

const daycarePage = new DaycarePage();
