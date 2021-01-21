/* globals LabPageBase */
// eslint-disable-next-line no-unused-vars
class LabPage extends LabPageBase {
    constructor(jQuery, GLOBALS) {
        super(jQuery, GLOBALS);

        // when the page is loaded, check to see if the data needed for finding eggs by type is loaded (if it's needed)
        if (this.onPage(window) &&
            this.settings.findTypeEgg &&
            !(GLOBALS.EGGS_PNG_TO_TYPES_LIST || JSON.parse(localStorage.getItem('QoLEggTypesMap')))) {
            window.alert('Message from QoL script:\nUnable to load list of pokemon eggs and their types, ' +
                'which is used to distinguish eggs with the same name but different types (Vulpix and ' +
                'Alolan Vulpix).\n\nCan still find eggs by type, but there may be mistakes. ' +
                'Please clear and reload your pokedex data by clicking the "Clear Cached Dex" ' +
                'and then clicking the "Update Pokedex" button in the QoL Hub to load list of eggs and types.');
        }
    }
    getTypesForEgg(searchPokemon) {
        const dexData = this.globals.DEX_DATA;
        const eggPngsToTypes = this.globals.EGGS_PNG_TO_TYPES_LIST ||
            JSON.parse(localStorage.getItem('QoLEggTypesMap')) || undefined;
        let searchTypeOne = '';
        let searchTypeTwo = '';
        if (eggPngsToTypes) {
            const imgUrl = this.jQuery(this).next().attr('src').replace('https://pfq-static.com/img/', '');
            searchTypeOne = eggPngsToTypes[searchPokemon] &&
                eggPngsToTypes[searchPokemon][imgUrl] &&
                ('' + eggPngsToTypes[searchPokemon][imgUrl][0]);
            searchTypeTwo = eggPngsToTypes[searchPokemon] &&
                eggPngsToTypes[searchPokemon][imgUrl] &&
                ('' + (eggPngsToTypes[searchPokemon][imgUrl][1] || -1));
        } else {
            const searchPokemonIndex = dexData.indexOf('"' + searchPokemon + '"');
            searchTypeOne = dexData[searchPokemonIndex + 1];
            searchTypeTwo = dexData[searchPokemonIndex + 2];
        }
        return [searchTypeOne, searchTypeTwo];
    }
}