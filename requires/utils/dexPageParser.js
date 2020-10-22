/* This class includes static functions for parsing data from a single dex page.
   Functions which process multiple text pages are in DexUtilities.
 */
class DexPageParser {
    static getInfoFromDexPageHeader(html) {
        // Note - I thought this wouldn't work for exclusives because they're pokedex numbers all start with "000",
        // but when exclusives have multiple forms, each form has its dex entry, and the forms are not grouped
        // into the panel of a single pokemon. See Lunupine and Lunupine [Mega Forme Q] as an example, contrasted with
        // Venusaur and Venusaur [Mega Forme]. This means that exclusives will never have any links in the form panel
        // and thus will never get into this if statement
        let ownerDocument = document.implementation.createHTMLDocument('virtual');
        const name_header = $(html, ownerDocument).find('#dexinfo>h3')[0]
        const form_i = $(name_header).children('i.small')

        // https://stackoverflow.com/questions/3442394/using-text-to-retrieve-only-text-not-nested-in-child-tags
        // get text but not children's text
        let name_text = $(name_header).clone().children().remove().end().text()
        let name_splits = name_text.split(' ')
        let base_pokemon_number = name_splits[0].replace('#','').replace(':','')
        // just in case the name is more than one word, join the remaining elements back together
        name_splits.splice(0, 1)
        let base_pokemon_name = name_splits.join(' ').trim()
        let pokemon_name = (form_i.length) ? base_pokemon_name + ' ' + form_i.text() : base_pokemon_name

        return {
            // dex number of the base pokemon
            base_number: base_pokemon_number,
            // name of the base pokemon
            base_name: base_pokemon_name,
            // name of the form
            name: pokemon_name
        }
    }

    static getInfoFromDexPageFooter(html) {
        let ownerDocument = document.implementation.createHTMLDocument('virtual');
        let current_link = $(html, ownerDocument).find('#footbar>span>a[href^="/shortlinks"]').attr('href');
        let current_number = current_link.substr(current_link.indexOf('/dex/')+5);

        return {
            shortlink: current_link,
            shortlink_number: current_number
        };
    }

    static parseTypesFromDexPage(html) {
        let ownerDocument = document.implementation.createHTMLDocument('virtual');
        let typeImgs = $(html, ownerDocument).find('.dexdetails>li>img');
        let typeUrls = typeImgs.map((idx, img) => img.src);
        let types = typeUrls.map((idx, url) =>
                                 url.substring(url.indexOf("types/")+"types/".length,
                                               url.indexOf(".png")));
        types = types.map((idx, type) => type.charAt(0).toUpperCase() + type.substring(1));
        types = types.map((idx, type) => GLOBALS.TYPE_LIST.indexOf(type));
        return types.toArray();
    }

    static parseEggPngFromDexPage(html) {
        let ownerDocument = document.implementation.createHTMLDocument('virtual');
        let egg_url = ($(html, ownerDocument).find('.eggspr').find('img')
                       .attr('src') || "")
            .replace('https://pfq-static.com/img/', '');
        return egg_url;
    }

    static parseEvolutionTreeFromDexPage(html) {
        // because the evolution tree for all the members of a single family will have the same text,
        // use the text as a key in families
        // use the ownerDocument parameter to jQuery to stop jQuery from loading images and audio files
        let ownerDocument = document.implementation.createHTMLDocument('virtual');
        let tree = $(data, ownerDocument).find('.evolutiontree')[0]
        return tree;
    }    

} // DexPageParser
