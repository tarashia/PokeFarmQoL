/* globals Page */
const DaycareBase = Page;
// eslint-disable-next-line no-unused-vars
class DaycarePage extends DaycareBase {
    constructor(jQuery, localStorageMgr, GLOBALS) {
        super(jQuery, localStorageMgr, GLOBALS.DAYCARE_PAGE_SETTINGS_KEY, {}, 'daycare');
        const obj = this;
        this.observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                // const fsPokemon = document.querySelector('#fs_pokemon');
                const fsPokemon = obj.jQuery('#fs_pokemon');
                if (fsPokemon.length > 0 &&
                    obj.jQuery.contains(fsPokemon[0], mutation.target)) {
                    obj.customSearch(GLOBALS);
                }
            });
        });
    } // constructor

    setupObserver() {
        this.observer.observe(document.querySelector('body'), {
            childList: true,
            subtree: true
        });
    }
    customSearch(GLOBALS) {
        const obj = this;
        const button = document.querySelector('#pkmnadd');

        let gender = null;
        let eggGroup1 = null, eggGroup2 = null;

        if (button !== null) {
            if (button.attributes['data-gender'] !== undefined) {
                gender = button.attributes['data-gender'].value;
            }
            // the egg group is binary coded decimal
            // if a pokemon has two egg groups, the leftmost 4 bits of the number returned
            // are the first egg group and the rightmost 4 bits are the second egg group
            if (button.attributes['data-egggroup'] !== undefined) {
                eggGroup1 = parseInt(button.attributes['data-egggroup'].value);
                if (eggGroup1 > 15) { // two egg groups
                    eggGroup2 = eggGroup1 & 15;
                    eggGroup1 = eggGroup1 >> 4;
                }
            }
        }

        const EGG_ID_TO_NAME = GLOBALS.EGG_GROUP_ID_TO_NAME;
        if (eggGroup1 !== null) { eggGroup1 = EGG_ID_TO_NAME[eggGroup1]; }
        if (eggGroup2 !== null) { eggGroup2 = EGG_ID_TO_NAME[eggGroup2]; }

        // clear matches
        obj.jQuery('.daycarefoundme').removeClass('daycarefoundme');

        if (gender !== null && eggGroup1 !== null) {
            const fieldmons = document.querySelectorAll('.fieldmon');
            if (fieldmons !== null) {
                for (let m = 0; m < fieldmons.length; m++) {
                    const mon = fieldmons[m];
                    const searchPokemonBigImg = obj.jQuery(mon)[0].childNodes[0];
                    const searchPokemon = searchPokemonBigImg.alt;

                    const tooltip = obj.jQuery(mon).next();
                    const fieldmontip = tooltip[0].querySelector('.fieldmontip');
                    const speciesDiv = obj.jQuery(fieldmontip).children(':contains(Species)')[0];
                    const eggGroupDiv = obj.jQuery(fieldmontip).children(':contains(Egg Group)')[0];
                    const searchIcons = speciesDiv.querySelector('span').querySelectorAll('img');

                    // There can be other icons if the Pokemon is CS/Delta/Shiny/Albino/Melan
                    // The gender title can be "[M], [F], [N]"
                    const searchGender = searchIcons[0].title.toLowerCase().substring(1, 2);
                    const searchEggGroups = obj.jQuery(eggGroupDiv).text().slice('Egg Group: '.length).split('/');

                    // Match Ditto in Daycare to anything that can breed
                    if (gender === 'd' && eggGroup1 === 'Ditto' &&
                        searchPokemon !== 'Ditto' && searchEggGroups[0] !== 'Undiscovered') {
                        obj.jQuery(searchPokemonBigImg).addClass('daycarefoundme');
                    }
                    // Match Ditto in field to anything that can breed
                    else if (eggGroup1 !== 'Ditto' && searchPokemon === 'Ditto' && eggGroup1 !== 'Undiscovered') {
                        obj.jQuery(searchPokemonBigImg).addClass('daycarefoundme');
                    }
                    // Match correct gender
                    else {
                        const genderCorrect = (gender === 'f' && searchGender === 'm') ||
                            (gender === 'm' && searchGender === 'f');
                        const group1Correct = searchEggGroups.reduce((res, curr) => { res = res || (eggGroup1 === curr); return res; }, false);
                        let group2Correct = false;
                        if (eggGroup2 !== null) {
                            group2Correct = searchEggGroups.reduce((res, curr) => { res = res || (eggGroup2 === curr); return res; }, false);
                        }

                        if (genderCorrect && (group1Correct || group2Correct)) {
                            obj.jQuery(searchPokemonBigImg).addClass('daycarefoundme');
                        }
                    }

                } // for
            }
        } // if
    } // customSearch
}