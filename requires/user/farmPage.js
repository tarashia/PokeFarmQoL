/* globals FarmPageBase DexPageParser */
// eslint-disable-next-line no-unused-vars
class FarmPage extends FarmPageBase {
    constructor(jQuery, localStorageMgr, helpers, GLOBALS, externals) {
        super(jQuery, localStorageMgr, helpers, GLOBALS, externals);
    }
    checkForValidDexData(GLOBALS) {
        if (GLOBALS.DEX_DATA === undefined) {
            window.alert('Pokedex data is not currently loaded. Please load by pressing "Update Pokedex" in the QoL Hub');
        } else if (GLOBALS.DEX_DATA === null) {
            window.alert('Pokedex data is not currently loaded. Please load by pressing "Update Pokedex" in the QoL Hub');
        }
    }
    easyEvolveTypeList(GLOBALS) {
        const obj = this;
        obj.checkForValidDexData(GLOBALS);
        const dexData = GLOBALS.DEX_DATA;

        if (!GLOBALS.REGIONAL_FORMS_LIST && this.localStorageMgr.getItem(GLOBALS.POKEDEX_REGIONAL_FORMS_KEY)) {
            GLOBALS.REGIONAL_FORMS_LIST = JSON.parse(this.localStorageMgr.getItem(GLOBALS.POKEDEX_REGIONAL_FORMS_KEY));
        }
        const regionalFormList = GLOBALS.REGIONAL_FORMS_LIST;

        if (!regionalFormList) {
            window.alert('Message from QoL script:\nUnable to load list of regional forms. ' +
                'The list will be sorted by types, but there may be mistakes. ' +
                'Please clear and reload your pokedex data by clicking the "Clear Cached Dex" ' +
                'and then clicking the "Update Pokedex" button in the QoL Hub.');
        }

        this.clearSortedEvolveLists();

        const typeBackground = obj.jQuery('.panel>h3').css('background-color');
        obj.jQuery('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
        document.querySelector('#farmnews-evolutions>.scrollable').insertAdjacentHTML('afterbegin', GLOBALS.TEMPLATES.evolveFastHTML);

        const typeBorder = obj.jQuery('.panel>h3').css('border');
        const typeColor = obj.jQuery('.panel>h3').css('color');
        obj.jQuery('.expandlist').css('background-color', '' + typeBackground + '');
        obj.jQuery('.expandlist').css('border', '' + typeBorder + '');
        obj.jQuery('.expandlist').css('color', '' + typeColor + '');

        const typeListBackground = obj.jQuery('.tabbed_interface>div').css('background-color');
        const typeListColor = obj.jQuery('.tabbed_interface>div').css('color');
        obj.jQuery('.qolChangeLogContent').css('background-color', '' + typeListBackground + '');
        obj.jQuery('.qolChangeLogContent').css('color', '' + typeListColor + '');

        /* Nested helper function */
        const findDivCoreIndex = function ($, html) {
            for (let j = 0; j < html.length; j++) {
                if ($(html[j]).is('div#core')) {
                    return j;
                }
            }
            return -1;
        };

        const loadEvolutionOriginTypes = function ($, evoUrl) {
            let species = '';
            let types = [];
            let inDex = false;
            // load the pokemon's species and set the pokemon's name to the species name for the rest of this loop
            loadSummaryPage($, evoUrl, (data) => {
                const html = obj.jQuery.parseHTML(data);
                // first find the right element in html to read from
                const htmlIndex = findDivCoreIndex($, html);
                if (!logErrorIfIndexNegativeOne(htmlIndex, `Unable to find species name on ${evoUrl}.`)) {
                    const links = Array.from(html[htmlIndex].querySelectorAll('#pkmnspecdata>p>a'));
                    // find the link that to the species page
                    const speciesIndex = links.findIndex((lnk) => lnk.getAttribute('href').match(/\/dex\/.*/));
                    // if the link is found, load the types
                    if (!logErrorIfIndexNegativeOne(speciesIndex,
                        `Unable to determine species of pokemon from ${evoUrl}.`)) {
                        species = links[speciesIndex].text;
                        types = getTypesFromSummaryData(html[htmlIndex]).map((t) => '' + t);
                        inDex = true;
                    } // speciesIndex > -1
                } // htmlIndex > -1
            }); // load
            return {
                status: inDex,
                types: types,
                species: species
            };
        };

        const loadEvolutionOriginDexNumber = function ($, evoUrl) {
            let dexNumber = '';
            loadSummaryPage($, evoUrl, (data) => {
                const html = obj.jQuery.parseHTML(data);
                const htmlIndex = findDivCoreIndex($, html);
                if (!logErrorIfIndexNegativeOne(htmlIndex,
                    `Unable to find find dex number in summary page ${evoUrl}.`)) {
                    dexNumber = getDexNumberFromSummaryData(html[htmlIndex]);
                }
            });
            return dexNumber;
        };

        const loadDataFromEvolutionOriginDexPage = function ($, typeList, number, name) {
            const evolutions = {};
            let status = false;
            let types = [];

            loadDexPage($, number, name, (data) => {
                /*
                 * Kill two birds with one stone: 1) get the evolutions, and 2) check that
                 * evolveTypePrevOne and evolveTypePrevTwo are correct
                 */
                let html = $.parseHTML(data);
                // first find the right element in html to read from
                const htmlIndex = findDivCoreIndex($, html);
                if (!logErrorIfIndexNegativeOne(htmlIndex, `Unable to find evolutions for ${name}.`)) {
                    html = html[htmlIndex];
                    // Get the evolutions from the dex page
                    let originSpan = html.querySelector('.evolutiontree .name>b');
                    originSpan = (originSpan) ? originSpan.parentNode.parentNode : null;
                    const evosSpans = $(originSpan).children('ul').children('li').children('.name');
                    evosSpans.each((i, e) => {
                        if (e.querySelector('a')) {
                            const evoNumber = e.querySelector('a').attributes['href'].value.substr(5);
                            const evoName = e.textContent.trim();
                            evolutions[evoNumber] = evoName;
                            evolutions[evoName] = evoNumber;
                        } else {
                            console.log('bang');
                        }
                    });
                    status = true;

                    // Get the types
                    types = getTypesFromDexPage(typeList, $(html)).map((t) => '' + t);
                } // htmlIndex > -1
            }); // loadDexPage
            return {
                status: status,
                evolutions: evolutions,
                types: types
            };
        };

        const loadDataFromEvolutionDestinationDexPage = function ($, typeList, number, name) {
            let status = false;
            let types = [];
            // Load dex page for the match
            loadDexPage($, number, name, (data) => {
                const html = obj.jQuery.parseHTML(data);
                const htmlIndex = findDivCoreIndex($, html);
                if (!logErrorIfIndexNegativeOne(htmlIndex,
                    `Unable to find dex details on dex page for pokedex number ${number}`)) {
                    types = getTypesFromDexPage(typeList, $(html[htmlIndex])).map((t) => '' + t);
                    status = true;
                }
            });
            return {
                status: status,
                types: types
            };
        };

        const getEvolutionOrigin = function (evoString) {
            const summary = '/summary/';
            const originStart = evoString.indexOf(summary) + summary.length + 7;
            const originEnd = evoString.indexOf('</a>');
            return evoString.substring(originStart, originEnd);
        };

        const getEvolutionDestination = function (evoString) {
            const destStart = evoString.indexOf('into</span>') + 'into</span>'.length;
            return evoString.substr(destStart).trim();
        };

        const getEvolutionURL = function (evoString) {
            const href = 'href="';
            const urlStart = evoString.indexOf(href) + href.length;
            const urlLength = '/summary/AAAAA'.length;
            return evoString.substr(urlStart, urlLength);
        };

        const logErrorIfIndexNegativeOne = function (index, msg) {
            if (index === -1) {
                console.error(msg);
                return true;
            }
            return false;
        };

        const loadSummaryPage = function ($, urlSuffix, success) {
            // urlSuffix is the part of the url after https://pokefarm.com/
            $.ajax({
                type: 'GET',
                url: 'https://pokefarm.com' + urlSuffix,
                async: false,
                success: success,
                // eslint-disable-next-line no-unused-vars
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error(`Unable to load the summary page ${urlSuffix}.`);
                },
            });
        };

        const loadDexPage = function ($, dexNumber, name, success) {
            const url = 'https://pokefarm.com/dex/' + dexNumber;
            $.ajax({
                type: 'GET',
                url: url,
                async: false,
                success: success,
                // eslint-disable-next-line no-unused-vars
                error: function (jqXHR, textStatus, errorThrown) {
                    const msg = `Unable to load the Pokedex page for ${name} (${url}).`;
                    console.error(msg);
                },
            });
        };

        const getTypesFromSummaryData = function (html) {
            const typeImgs = Array.from(html.querySelectorAll('.type>img'));
            const typeUrls = typeImgs.map((e) => e['src']);
            let types = typeUrls.map((url) =>
                url.substring(url.indexOf('types/') + 'types/'.length,
                    url.indexOf('.png')));
            types = types.map((type) => type.charAt(0).toUpperCase() + type.substring(1));
            types = types.map((type) => GLOBALS.TYPE_LIST.indexOf(type));
            return types;
        };

        const getTypesFromDexPage = function (typeList, html) {
            return DexPageParser.parseTypesFromDexPage(html, typeList);
        };

        const getDexNumberFromSummaryData = function (html) {
            const link = html.querySelector('#pkmnspecdata>p>a');
            return link.getAttribute('href').substring('/dex/'.length);
        };

        const addToKnownExceptions = function (name, type1, type2) {
            // add the exception to the known exceptions list
            obj.settings.KNOWN_EXCEPTIONS[name] = (type2) ? [type1, type2] : [type1];

            obj.saveSettings();
        };

        const appendDeltaTypeIfDelta = function ($, evoString, elemToAppendTo) {
            if (evoString.includes('title="[DELTA')) {
                const deltaType = evoString.match('DELTA-(.*?)]">');
                $(elemToAppendTo).clone().appendTo(obj.settings.TYPE_APPEND[deltaType[1]]);
            }
        };

        obj.jQuery('#farmnews-evolutions>.scrollable>.evolvepkmnlist>Li').each(function () {
            // getting the <li> element from the pokemon & the pokemon evolved name
            const getEvolveString = obj.jQuery(this).html();
            let previousPokemon = getEvolutionOrigin(getEvolveString);
            const evolvePokemon = getEvolutionDestination(getEvolveString);
            const evoUrl = getEvolutionURL(getEvolveString);

            // Handle unicode characters
            previousPokemon = previousPokemon
                .replace(/é/g, '\\u00e9')
                .replace(/í/g, '\\u00ed')
                .replace(/ñ/g, '\\u00f1');

            let previousInDex = dexData.indexOf('"' + previousPokemon + '"') != -1;
            let evolveInDex = dexData.indexOf('"' + evolvePokemon + '"') != -1;
            const previousHasRegionalForms = regionalFormList &&
                Object.prototype.hasOwnProperty.call(regionalFormList, previousPokemon) &&
                regionalFormList[previousPokemon].length > 1;
            const evolveHasRegionalForms = regionalFormList &&
                Object.prototype.hasOwnProperty.call(regionalFormList, evolvePokemon) &&
                regionalFormList[evolvePokemon].length > 1;
            let evolveTypesPrevious = [];
            let evolveTypes = [];

            /*
             * Procedure
             * 1. Load types for the evolution origin
             *    a. If it is not in the dex, or if it has regional forms, load the types from the pokemon's summary page
             *    b. If it is in the dex and if it does not have regional forms, load the types from the dex data
             * 2. If step 1.a or 1.b succeeded, load types for the evolution destination
             *    a. If the destination pokemon is in the dex, load the types from the dex
             *    b. Else, if the destination pokemon is one of the "known exceptions", load the types from KNOWN_EXCEPTIONS
             *    c. Else, load the destination pokemon's types by:
             *       i. Getting the origin pokemon's dex number from its summary page
             *       ii. Loading the list of the origin pokemon's evolutions from its dex page
             *       iii. Finding the dex number for the destination pokemon from the list
             *       iv. Loading the destination pokemon's type from its dex page using the dex number found in step 2.c.iii
             * 3. Use types to apply HTML classes to the list item that contains the current evolution
             *    a. Use the evolution origin's and destination's types as HTML classes
             *    b. If the origin pokemon is a Delta mon, use the delta type as an HTML class as well
             */

            // Step 1.a
            if (!previousInDex || previousHasRegionalForms) {
                const data = loadEvolutionOriginTypes(obj.jQuery, evoUrl);
                if (data.status) {
                    previousInDex = data.status;
                    previousPokemon = data.species;
                    evolveTypesPrevious = data.types;
                }
            }
            // Step 1.b
            else {
                evolveTypesPrevious = [1, 2].map((i) => dexData[dexData.indexOf('"' + previousPokemon + '"') + i]);
            }

            // don't try to load types for evolution endpoint if steps 1.a and 1.b failed
            if (!previousInDex) {
                const msg = `Unable to find load types for evolution origin (${evolvePokemon}) in pokedex data, or unable to load it from PokeFarm Dex page`;
                console.error(msg);
                return; // 'continue' for .each()
            }

            // will only get here if 1.a or 1.b succeeded
            if (!evolveInDex || evolveHasRegionalForms) {
                // Step 2.b
                if (evolvePokemon in obj.settings.KNOWN_EXCEPTIONS) {
                    evolveTypes = obj.settings.KNOWN_EXCEPTIONS[evolvePokemon].map((t) => '' + t);
                    evolveInDex = true;
                }
                // Step 2.c
                else {
                    // Get the dex number for previousPokemon
                    const dexNumber = loadEvolutionOriginDexNumber(obj.jQuery, evoUrl);

                    // Load the dex page for previousPokemon
                    const dexInfo = loadDataFromEvolutionOriginDexPage(obj.jQuery, GLOBALS.TYPE_LIST, dexNumber, previousPokemon);
                    let evolutions = {};
                    let loadStatus = false;
                    if (dexInfo.status) {
                        loadStatus = dexInfo.status;
                        evolutions = dexInfo.evolutions;
                        evolveTypesPrevious = dexInfo.types;
                    }

                    if (!evolveInDex) {
                        if(loadStatus && Object.keys(evolutions).indexOf(evolvePokemon) > -1) {
                            const info = loadDataFromEvolutionDestinationDexPage(obj.jQuery, GLOBALS.TYPE_LIST, evolutions[evolvePokemon], evolvePokemon);
                            if (info.status) {
                                evolveInDex = info.status;
                                evolveTypes = info.types;
                                addToKnownExceptions(evolvePokemon, evolveTypes[0],
                                    evolveTypes.length > 1 && evolveTypes[1]);
                            }
                        } else {
                            const msg = `An error occurred when processing ${evolvePokemon}`;
                            console.error(msg);
                        }
                    }
                } // else ( if(evolvePokemon in obj.settings.KNOWN_EXCEPTIONS) )
            }
            // Step 2.a
            else {
                evolveTypes = [1, 2].map((i) => dexData[dexData.indexOf('"' + evolvePokemon + '"') + i]);
            }

            if (!evolveInDex) {
                const msg = `Unable to find pokemon evolving to (${evolvePokemon}) in pokedex data, or unable to load it from PokeFarm Dex page`;
                console.error(msg);
                return; // 'continue' for .each()
            }

            /*
             * the evolveTypes and evolveTypesPrevious entries can begin with a '.'
             * in some cases. Just strip it off
             */
            evolveTypesPrevious = evolveTypesPrevious.map((t) => t.replace('.', ''));
            evolveTypes = evolveTypes.map((t) => t.replace('.', ''));

            // Some pokemon have double types. Remove the second type if it is the same as the first
            if(evolveTypesPrevious[1] == evolveTypesPrevious[0]) {
                evolveTypesPrevious = [evolveTypesPrevious[0]];
            }
            if(evolveTypes[1] == evolveTypes[0]) {
                evolveTypes = [evolveTypes[0]];
            }

            // filter out invalid 2nd types (will be -1)
            evolveTypesPrevious = evolveTypesPrevious.filter((t) => t !== '-1');
            evolveTypes = evolveTypes.filter((t) => t !== '-1');

            // append types to DOM
            const elem = this;
            evolveTypes.map((t) => {
                obj.jQuery(elem).clone().appendTo('.' + t);
            });
            evolveTypesPrevious.map((t) => {
                if (!isNaN(parseInt(t)) && parseInt(t) > -1 && evolveTypes.indexOf(t) == -1) {
                    obj.jQuery(elem).clone().appendTo('.' + t);
                }
            });

            appendDeltaTypeIfDelta(obj.jQuery, getEvolveString, this);
        }); // each

        obj.jQuery('#farmnews-evolutions>.scrollable>.qolEvolveTypeList>Li').each(function () {
            const amountOfEvolves = obj.jQuery(this).children().children().length;
            const evolveTypeName = obj.jQuery(this).children('.slidermenu').html();

            // hide the types with no evolutions
            if (amountOfEvolves === 0) {
                this.nextSibling.hidden = true;
                this.hidden = true;
            } else {
                obj.jQuery(this).children('.slidermenu').html(evolveTypeName + ' (' + amountOfEvolves + ')');
            }
        });

        obj.jQuery('.evolvepkmnlist').hide();
    }
}