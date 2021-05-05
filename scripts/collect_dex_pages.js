/* globals jQuery */
const getMainDexPage = () => jQuery.get('https://pokefarm.com/dex');

const getPokemonDexPage = ($, id) => jQuery.get('https://pokefarm.com/dex/' + id);

function parseAndStoreDexNumbers(dex) {
    const json = JSON.parse(dex);
    const dexNumbers = [];

    // get the list of pokedex numbers that haven't been processed before
    for(const r in json.regions) {
        for(let i = 0; i < json.regions[r].length; i++) {
            dexNumbers.push(json.regions[r][i][0]);
        }
    }

    return dexNumbers;
}

function loadDexPages($, dexNumbers) {
    const requests = [];

    for(let d = 0; d < dexNumbers.length; d++) {
        /*
         * if the dex number is 000, the user has not seen the pokemon,
         * so just increment the progress bar value
         */
        if(dexNumbers[d] !== '000') {
            // eslint-disable-next-line no-unused-vars
            const r = getPokemonDexPage($, dexNumbers[d]).then((data, status, jqXHR) => {
                return data;
            }, (error) => {
                console.log(error);
            });
            requests.push(r);
        }
    }

    // return $.when.apply(undefined, requests);
    return Promise.all(requests);
} // loadDexPages

function loadFormPages($, ownerDocument, firstFormHTML) {
    const requests = [];
    for(let a = 0; a < firstFormHTML.length; a++) {
        const data = firstFormHTML[a];
        // load data from pages for other forms
        const formLinks = $(data, ownerDocument).find('.formeregistration a');
        if(formLinks.length) {
            for(let i = 0; i < formLinks.length; i++) {
                const link = formLinks.eq(i).attr('href');
                const r = getPokemonDexPage($, link.substring('/dex/'.length))
                    .then((formHTML) => {
                        return formHTML;
                    }, (error) => {
                        console.log(error);
                    });
                requests.push(r);
            }
        }
    } // for

    return Promise.all(requests);
} // loadFormPages

const virtualDocument = document.implementation.createHTMLDocument('virtual');
getMainDexPage().then((data) => {
    const html = jQuery.parseHTML(data);
    const dex = jQuery(html[html.length - 1], virtualDocument).find('#dexdata').html();
    const dexNumbers = parseAndStoreDexNumbers(dex);

    if (dexNumbers.length > 0) {
        // update the progress bar in the hub
        loadDexPages(jQuery, dexNumbers).then((data) => {
            const dexPagesHTML = data.map(d => (Array.isArray(d) ? d[0] : d));
            loadFormPages(jQuery, virtualDocument, dexPagesHTML).then((data) => {
                const formPagesHTML = data.map(d => (Array.isArray(d) ? d[0] : d));

                // Combine the arrays of HTML into one array
                const allPagesHTML = dexPagesHTML.concat(formPagesHTML);

                const filename = 'dexPages.json';
                const text = JSON.stringify(allPagesHTML);
                const blob = new Blob([text], {type:'text/plain'});
                const link = document.createElement('a');
                link.download = filename;
                link.innerHTML = 'Download Collected Dex Pages';
                link.href = window.URL.createObjectURL(blob);
                document.body.appendChild(link);
            }, (error) => {
                console.log(error);
            }); // loadFormPages
        }, (error) => {
            console.log(error);
        }); // loadDexData
    } // if dexNumbers.length > 0
}, (error) => {
    console.log(error);
});// getMainDexPage