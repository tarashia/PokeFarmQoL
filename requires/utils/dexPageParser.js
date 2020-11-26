/* This class includes static functions for parsing data from a single dex page.
   Functions which process multiple text pages are in DexUtilities.
*/

class DexPageParser {
    /* Parse the header from a dex page
     * Inputs:
     * - html - HTML of a full dex page (from https://www.pokefarm.com/dex/<id>)
     * Outputs:
     * - (anonymous) - struct containing data from header.
     *                 Example:
     *                 {
     *                   base_number: 003,
     *                   base_name: "Venusaur",
     *                   name: "Venusaur [Mega Forme]"
     *                 }
     */
    static getInfoFromDexPageHeader(html) {
        // Note - I thought this wouldn't work for exclusives because they're pokedex numbers all start with "000",
        // but when exclusives have multiple forms, each form has its dex entry, and the forms are not grouped
        // into the panel of a single pokemon. See Lunupine and Lunupine [Mega Forme Q] as an example, contrasted with
        // Venusaur and Venusaur [Mega Forme]. This means that exclusives will never have any links in the form panel
        // and thus will never get into this if statement
        const name_header = html.find('#dexinfo>h3').eq(0);
        const form_i = name_header.children('i.small');

        // https://stackoverflow.com/questions/3442394/using-text-to-retrieve-only-text-not-nested-in-child-tags
        // get text but not children's text
        let name_text = name_header.clone().children().remove().end().text()
        let name_splits = name_text.split(' ')
        let base_pokemon_number = name_splits[0].replace('#','').replace(':','')
        // just in case the name is more than one word, join the remaining elements back together
        name_splits.splice(0, 1)
        let base_pokemon_name = name_splits.join(' ').trim()
        let pokemon_name = (form_i.length) ?
            base_pokemon_name + ' ' + form_i.text() :
            base_pokemon_name;

        return {
            // dex number of the base pokemon
            base_number: base_pokemon_number,
            // name of the base pokemon
            base_name: base_pokemon_name,
            // name of the form
            name: pokemon_name
        }
    }

    /* Parse the footer from a dex page
     * Inputs:
     * - html - HTML of a full dex page (from https://www.pokefarm.com/dex/<id>)
     * Outputs:
     * - (anonymous) - struct containing data from footer.
     *                 Example:
     *                 {
     *                   shortlink: "/shortlinks/save/dex/003-M",
     *                   shortlink_number: "003-M"
     *                 }
     */
    static getInfoFromDexPageFooter(html) {
        let current_link = html.find('#footbar>span>a[href^="/shortlinks"]').attr('href');
        let current_number = current_link.substr(current_link.indexOf('/dex/')+5);

        return {
            shortlink: current_link,
            shortlink_number: current_number
        };
    }

    /* Parse the types of a pokemon from a dex page
     * Inputs:
     * - html - HTML of a full dex page (from https://www.pokefarm.com/dex/<id>)
     * Outputs:
     * - types - array containing the indices of the pokemon's type(s) in the GLOBALS.TYPE_LIST array
     *           Example: For Venusaur:
     *                 [
     *                  4, // Grass
     *                  7 // Poison
     *                 ]
     */
    static parseTypesFromDexPage(html, type_list) {
        let typeImgs = html.find('.dexdetails>li>img');
        let typeUrls = typeImgs.map((idx, img) => {
            return img.src
        });
        let types = typeUrls.map((idx, url) =>
                                 url.substring(url.indexOf("types/")+"types/".length,
                                               url.indexOf(".png")));
        types = types.map((idx, type) => type.charAt(0).toUpperCase() + type.substring(1));
        types = types.map((idx, type) => type_list.indexOf(type)); // GLOBALS.TYPE_LIST.indexOf(type));
        return types.toArray();
    }

    /* Parse egg png link from dex page
     * Inputs:
     * - html - HTML of a full dex page (from https://www.pokefarm.com/dex/<id>)
     * Outputs:
     * - egg_url - Partial UTL to the png of the egg from the dex page.
     *             'https://pfq-static.com/img/' is removed from the URL since it is always the same
     */
    static parseEggPngFromDexPage(html) {
        let egg_url = (html.find('.eggspr').find('img')
                       .attr('src') || "")
            .replace('https://pfq-static.com/img/', '');
        return egg_url;
    }

    /* Parse the evolution tree from a dex page
     * Inputs:
     * - html - HTML of a full dex page (from https://www.pokefarm.com/dex/<id>)
     * Outputs:
     * - flattened - See EvolutionTreeParser.parseEvolutionTree for description
     */
    static parseEvolutionTreeFromDexPage(evolutionTreeParser, html, dex_id_map) {
        const rootName = DexPageParser.getInfoFromDexPageHeader(html).name;
        const tree = html.find('.evolutiontree').eq(0);
        const flattened = evolutionTreeParser.parseEvolutionTree(rootName, tree, dex_id_map);
        return flattened;
    }    
} // DexPageParser

if(module)
    module.exports = DexPageParser;
