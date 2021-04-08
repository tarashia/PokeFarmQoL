/* This class includes static functions for parsing data from a single dex page.
   Functions which process multiple text pages are in DexUtilities.
*/

// eslint-disable-next-line no-unused-vars
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
        const nameHeader = html.find('#dexinfo>h3').eq(0);
        const formI = nameHeader.children('i.small');

        // https://stackoverflow.com/questions/3442394/using-text-to-retrieve-only-text-not-nested-in-child-tags
        // get text but not children's text
        const nameText = nameHeader.clone().children().remove().end().text();
        const nameSplits = nameText.split(' ');
        const basePokemonNumber = nameSplits[0].replace('#','').replace(':','');
        // just in case the name is more than one word, join the remaining elements back together
        nameSplits.splice(0, 1);
        const basePokemonName = nameSplits.join(' ').trim();
        const pokemonName = (formI.length) ?
            basePokemonName + ' ' + formI.text() :
            basePokemonName;

        return {
            // dex number of the base pokemon
            // eslint-disable-next-line camelcase
            base_number: basePokemonNumber,
            // name of the base pokemon
            // eslint-disable-next-line camelcase
            base_name: basePokemonName,
            // name of the form
            name: pokemonName
        };
    }

    /* Parse the footer from a dex page
     * Inputs:
     * - html - HTML of a full dex page (from https://www.pokefarm.com/dex/<id>)
     * Outputs:
     * - (anonymous) - struct containing data from footer.
     *                 Example:
     *                 {
     *                   shortlink: "/shortlinks/save/dex/003-M",
     *                   shortlinkNumber: "003-M"
     *                 }
     */
    static getInfoFromDexPageFooter(html) {
        const currentLink = html.find('#footbar>span>a[href^="/shortlinks"]').attr('href');
        const currentNumber = currentLink.substr(currentLink.indexOf('/dex/')+5);

        return {
            shortlink: currentLink,
            shortlinkNumber: currentNumber
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
    static parseTypesFromDexPage(html, typeList) {
        const typeImgs = html.find('.dexdetails>li>img');
        const typeUrls = typeImgs.map((idx, img) => {
            return img.src;
        });
        let types = typeUrls.map((idx, url) =>
            url.substring(url.indexOf('types/')+'types/'.length,
                url.indexOf('.png')));
        types = types.map((idx, type) => type.charAt(0).toUpperCase() + type.substring(1));
        types = types.map((idx, type) => typeList.indexOf(type)); // GLOBALS.TYPE_LIST.indexOf(type));
        return types.toArray();
    }

    /* Parse egg png link from dex page
     * Inputs:
     * - html - HTML of a full dex page (from https://www.pokefarm.com/dex/<id>)
     * Outputs:
     * - eggUrl - Partial UTL to the png of the egg from the dex page.
     *             'https://pfq-static.com/img/' is removed from the URL since it is always the same
     */
    static parseEggPngFromDexPage(html) {
        const eggUrl = (html.find('.eggspr').find('img')
            .attr('src') || '')
            .replace('https://pfq-static.com/img/', '');
        return eggUrl;
    }

    /* Parse the evolution tree from a dex page
     * Inputs:
     * - html - HTML of a full dex page (from https://www.pokefarm.com/dex/<id>)
     * Outputs:
     * - flattened - See EvolutionTreeParser.parseEvolutionTree for description
     */
    static parseEvolutionTreeFromDexPage(evolutionTreeParser, html, dexIDMap) {
        const rootName = DexPageParser.getInfoFromDexPageHeader(html).name;
        const tree = html.find('.evolutiontree').eq(0);
        const flattened = evolutionTreeParser.parseEvolutionTree(rootName, tree, dexIDMap);
        return flattened;
    }
} // DexPageParser