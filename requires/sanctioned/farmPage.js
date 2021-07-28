/* globals FarmPageBase */
// eslint-disable-next-line no-unused-vars
class FarmPage extends FarmPageBase {
    constructor(jQuery, localStorageMgr, helpers, GLOBALS, externals) {
        super(jQuery, localStorageMgr, helpers, GLOBALS, externals);
    }
    easyEvolveTypeList(GLOBALS) {
        const obj = this;
        const dexData = GLOBALS.DEX_DATA;

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

        const appendDeltaTypeIfDelta = function ($, evoString, elemToAppendTo) {
            if (evoString.includes('title="[DELTA')) {
                const deltaType = evoString.match('DELTA-(.*)]">');
                $(elemToAppendTo).clone().appendTo(obj.settings.TYPE_APPEND[deltaType[1]]);
            }
        };

        obj.jQuery('#farmnews-evolutions>.scrollable>.evolvepkmnlist>Li').each(function () {
            // getting the <li> element from the pokemon & the pokemon evolved name
            const getEvolveString = obj.jQuery(this).html();
            let previousPokemon = getEvolutionOrigin(getEvolveString);
            const evolvePokemon = getEvolutionDestination(getEvolveString);

            // Handle unicode characters
            previousPokemon = previousPokemon
                .replace(/é/g, '\\u00e9')
                .replace(/í/g, '\\u00ed')
                .replace(/ñ/g, '\\u00f1');

            // Handle evolvePokemon name formatting
            let evolveFormatted = evolvePokemon.replace(' [', '/');
            evolveFormatted = evolveFormatted.replace(']', '');

            const previousIndex = dexData.indexOf('"' + previousPokemon + '"');
            const evolveIndex = dexData.indexOf('"' + evolveFormatted + '"');

            const previousInDex = previousIndex != -1;
            const evolveInDex = evolveIndex != -1;
            const evolveInExceptions = evolvePokemon in obj.settings.KNOWN_EXCEPTIONS;
            let evolveTypesPrevious = [];
            let evolveTypes = [];

            /*
             * Procedure
             * 1. If the evolution destination is in the known exceptions list
             *    a. Load the types from KNOWN_EXCEPTIONS
             * 2. Else:
             *    a. If the evolution origin is in the dex, load the types from the dex
             *    b. If the evolution origin is not in the dex, mark the type as '18' (not a valid type)
             *    c. If the destination pokemon is in the dex, load the types from the dex
             *    d. Else, mark the type as '18' (not a valid type)
             * 3. Use types to apply HTML classes to the list item that contains the current evolution
             *    a. Use the evolution origin's and destination's types as HTML classes
             *    b. If the origin pokemon is a Delta mon, use the delta type as an HTML class as well
             */

            if(evolveInExceptions) {
                evolveTypes = obj.settings.KNOWN_EXCEPTIONS[evolvePokemon].map((t) => '' + t);
                // short circuit the previous pokemon's types, since the KNOWN_EXCEPTIONS table will have everything
                evolveTypesPrevious = evolveTypes;
            }
            else {
                if (previousInDex) {
                    evolveTypesPrevious = [1, 2].map((i) => dexData[previousIndex + i]);
                }
                else {
                    evolveTypesPrevious = ['18', '-1'];
                }

                if (evolveInDex) {
                    evolveTypes = [1, 2].map((i) => dexData[evolveIndex + i]);
                }
                else {
                    evolveTypes = ['18', '-1'];
                }
            }

            /*
             * the evolveTypes and evolveTypesPrevious entries can begin with a '.'
             * in some cases. Just strip it off
             */
            evolveTypesPrevious = evolveTypesPrevious.map((t) => t.replace('.', ''));
            evolveTypes = evolveTypes.map((t) => t.replace('.', ''));

            // filter out invalid 2nd types (will be -1)
            evolveTypesPrevious = evolveTypesPrevious.filter((t) => t !== '-1');
            evolveTypes = evolveTypes.filter((t) => t !== '-1');

            // append types to DOM
            const elem = this;
            // add unknown source types
            if(evolveTypesPrevious   .includes('18')) {
                obj.jQuery(elem).clone().appendTo('.18source');
            }
            // add unknown target types
            if(evolveTypes.includes('18')) {
                obj.jQuery(elem).clone().appendTo('.18target');
            }
            const combinedValidTypes = [...evolveTypesPrevious, ...evolveTypes]
                .filter((t, i, self) => t != '18' && self.indexOf(t) === i);
            combinedValidTypes.map((t) => {
                obj.jQuery(elem).clone().appendTo(`.${t}`);
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