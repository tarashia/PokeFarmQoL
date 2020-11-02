/* EvolutionTreeParser class
 * This purely static class provides functions for parsing the evolution div of a dex page. 
 * This class should only be used by the DexPageParser class.
 * This classes complies with the practice of prepending an underscore on private items. This includes
 * "private" methods within this class, and the class itself.
 */
class EvolutionTreeParser {
    
    /* _parseEvolutionLi
     * Parses the contents of an <li> element from the evolution tree div of a dex page
     * Inputs:
     * - li - an HTML node representing the <li> to be parsed
     * - dex_id_map - object mapping Pokemon names to their ID values
     *                e.g. {'Rattata' => '019'}
     *     > TODO - there's definitely a better way to handle this that is used somewhere else
     *              in DexPageParser already
     * Output:
     * - ret - object mapping the name of the evolution target to the evolution conditions and parsed evolutions of said Pokemon
     *         e.g. {
     *               'Vaporeon' => {
     *                           'condition' => 'Water Stone', 
     *                           'evolutions' => [
     *                                            // parsed <ul> containing Vaporeon [Mega Forme Q]
     *                                           ]
     *                          }, ...
     *              }
     */
    static _parseEvolutionLi(li, dex_id_map) {
        let condition = li.children('.condition');
        let targetElem = li.find('.name').eq(0);
        let target = targetElem.text().trim();

        // if the targetElem has a link as a child, store the dex ID in the link
        if(targetElem.find('a').length) {
            let link = targetElem.find('a')[0]['href']
            let id = link.substring("/dex/".length)
            dex_id_map[target] = id
        }

        let ret = {};
        ret[target] = {
            'condition': condition[0],
            'evolutions': []
        };
        const uls = li.children('ul');
        if(uls.length) {
            for(let i = 0; i < uls.length; i++) {
                let nest = EvolutionTreeParser._parseEvolutionUl(uls.eq(i), dex_id_map);
                ret[target]['evolutions'].push(nest);
            }
            return ret;
        } else {
            return ret;
        }
    }

    /* _parseEvolutionUl
     * Parses the contents of an <ul> element from the evolution tree div of a dex page
     * Inputs:
     * - ul - an HTML node representing the <ul> to be parsed
     * - dex_id_map - object mapping Pokemon names to their ID values
     *                e.g. {'Rattata' => '019'}
     *     > TODO - there's definitely a better way to handle this that is used somewhere else
     *              in DexPageParser already
     * Output:
     * - ret - object mapping the names of the evolution targets to the evolution conditions and parsed evolutions of said Pokemon.
     *         ret will contain one key (i.e., one evolution target name) for each <li> found in the <ul> passed
     *         e.g. {
     *               'Vaporeon' => {
     *                              'condition' => 'Water Stone', 
     *                              'evolutions' => [
     *                                               // parsed <ul> containing Vaporeon [Mega Forme Q]
     *                                               {
     *                                                'Vaporeon' => {
     *                                                               'condition' => 'Water Stone', 
     *                                                               'evolutions' => []
     *                                                              }
     *                                               }
     *                                              ]
     *                             }, ...
     *              }
     */
    static _parseEvolutionUl(ul, dex_id_map) {
        const lis = ul.children('li')
        const num_parallel_evolutions = lis.length

        let ret = {}
        for(let i = 0; i < num_parallel_evolutions; i++) {
            let nest = EvolutionTreeParser._parseEvolutionLi(lis.eq(i), dex_id_map)
            for(let d in nest) {
                ret[d] = nest[d]
            }
        }
        return ret
    }
    
    /* parseEvolutionTree
     * Parses the content of an evolution tree of a dex page
     * Inputs:
     * - root - a string with the name of the pokemon at the base of the tree (e.g., 'Rattata')
     * - evotree - the contents of $('.evolutiontree'). Example:
     *             <div class="evolutiontree">
     *               <span class="Name">
     *                 <span class="icon" style="background-image:url(//url//)"></span>
     *                 <b>Eevee</b>
     *               </span>
     *               <ul>
     *                 <li>
     *                   <span class="condition">Water Stone</span>
     *                   <span class="name">
     *                     <span class="icon" style="background-image:url(//url//)"></span>
     *                     <a href="/dex/144">Vaporeon</a>
     *                   </span>
     *                   <ul>
     *                     <li>
     *                       <span class="condition">
     *                         <img src=//url//>
     *                         "Vaporeonite Q"
     *                       </span>
     *                       <span class="name">
     *                         <span class="icon" style="background-image:url(//url//)"></span>
     *                         <a href="/dex/144-Q">Vaporeon</a>
     *                         <i class="small">[Mega Forme Q</i>
     *                       </span>
     *                     </li>
     *                   </ul>
     *                 </li>
     *                 <li> ... data for Jolteon </li>
     *                 ... data for Flareon, Espeon, Umbreon, Leafeon, Glaceon, Sylveon
     *               </ul>
     *             </div>
     * - dex_id_map - object mapping Pokemon names to their ID values
     *                e.g. {'Eevee' => '143'}
     *     > TODO - there's definitely a better way to handle this that is used somewhere else
     *              in DexPageParser already
     * Outputs:
     * - flat - Contains evolution data for a subtree of evolution data. For the base (non-recursive) call,
     *          is an object containing evolutions for a single pokemon family. For recursive calls,
     *          is an array which contains an object in each index.
     *          Example (of whole object and of one index of array):
     *          {
     *           'members' => ['Eevee', 'Vaporeon', 'Jolteon', 'Flareon', 'Espeon', 'Umbreon',
     *                         'Leafeon', 'Glaceon', 'Sylveon'],
     *           'evolutions' => [
     *             {'source' => 'Eevee'   , 'target' => 'Vaporeon', 'condition' => 'Water Stone'},
     *             {'source' => 'Vaporeon', 'target' => 'Vaporeon [Mega Forme Q]', 'condition' => 'Vaporeonite Q'},
     *             {'source' => 'Eevee'   , 'target' => 'Jolteon' , 'condition' => 'ThunderStone'},
     *             {'source' => 'Jolteon' , 'target' => 'Jolteon [Mega Forme Q]' , 'condition' => 'Jolteonite Q'},
     *             {'source' => 'Eevee'   , 'target' => 'Flareon' , 'condition' => 'Fire Stone'},
     *             {'source' => 'Flareon' , 'target' => 'Flareon [Mega Forme Q]' , 'condition' => 'Flareonite Q'},
     *             {'source' => 'Eevee'   , 'target' => 'Espeon'  , 'condition' => 'Happiess during Daytime'},
     *             {'source' => 'Espeon'  , 'target' => 'Espeon [Mega Forme Q]'  , 'condition' => 'Espeonite Q'},
     *             {'source' => 'Eevee'   , 'target' => 'Umbreon' , 'condition' => 'Happiness during Nighttime'},
     *             {'source' => 'Umbreon' , 'target' => 'Umbreon [Mega Forme Q]' , 'condition' => 'Umbreonite Q'},
     *             {'source' => 'Eevee'   , 'target' => 'Leafeon' , 'condition' => 'In Grass-type Field'},
     *             {'source' => 'Leafeon' , 'target' => 'Leafeon [Mega Forme Q]' , 'condition' => 'Leafeonite Q'},
     *             {'source' => 'Eevee'   , 'target' => 'Glaceon' , 'condition' => 'In Ice-type Field'},
     *             {'source' => 'Glaceon' , 'target' => 'Glaceon [Mega Forme Q]' , 'condition' => 'Glaceonite Q'},
     *             {'source' => 'Eevee'   , 'target' => 'Sylveon' , 'condition' => 'Affection'},
     *             {'source' => 'Sylveon' , 'target' => 'Sylveon [Mega Forme Q]' , 'condition' => 'Sylveonite Q'},
     *           ]
     *          }
     */
    static parseEvolutionTree(root, evotree, dex_id_map) {
        const uls = evotree.children('ul');
        const tree = {}
        const textContent = evotree.text();

        const doesNotEvolveMarker = " is not known to evolve"
        const markerIndex = textContent.indexOf(doesNotEvolveMarker)
        if(markerIndex > -1) {
            // mimic the format of the output of flattenEvolutionFamily
            let name = textContent.substring(0, markerIndex);
            return {"members": ["Ditto"], "evolutions": []};
        }

        // TODO: Pull this side effect out of this function
        if(evotree.children('span').length) {
            let linkElem = evotree.children('span').children('a')
            if(linkElem.length) {
                let link = linkElem[0]['href']
                let dex_id = link.substring("https://pokefarm.com/dex/".length)
                dex_id_map[root] = dex_id
            }
        }

        /* tree format example
         * {
         *  'Eevee' => [
         *              {
         *               'Vaporeon' => {
         *                              'condition' => 'Water Stone', 
         *                               'evolutions' => [
         *                                                // parsed <ul> containing Vaporeon [Mega Forme Q]
         *                                               ],
         *                             }, ...
         *              },
         *              // data for Jolteon, Flareon, Espeon, Umbreon, Leafeon, Glaceon, Sylveon
         *            ]
         * }
         */
        tree[root] = []
        for(let i = 0; i < uls.length; i++) {
            tree[root].push(EvolutionTreeParser._parseEvolutionUl(uls.eq(i), dex_id_map))
        }

        // flatten the tree
        let flat = EvolutionTreeParser._flattenEvolutionTree(tree);

        // parse the evolution conditions
        EvolutionTreeParser._parseEvolutionConditions(flat);
        return flat;
    }

    /* _flattenEvolutionTree
     * Parses a tree structure representing the evolutions of a pokemon into an object containing flat arrays.
     * Called recursively to parse the nested evolution data.
     * Inputs:
     * - family_obj - Contains evolution data for a subtree of evolution data. For the base (non-recursive) call,
     *                is an object containing evolutions for a single pokemon family. For recursive calls,
     *                is an array which contains an object in each index.
     *                Example (of whole object and of one index of array):
     *                {
     *                 'Eevee' => [
     *                             {
     *                              'Vaporeon' => {
     *                                             'condition' => 'Water Stone', 
     *                                              'evolutions' => [
     *                                                               // parsed <ul> containing 
     *                                                               // Vaporeon [Mega Forme Q]
     *                                                              ],
     *                                            }, ...
     *                             },
     *                             // data for Jolteon, Flareon, Espeon, Umbreon, Leafeon, Glaceon, Sylveon
     *                           ]
     *                }
     * - ret_obj - An aggregator for the flattened data for a given family. Is undefined for the base
     *             (non-recursive) call, and for each recursive call is an object containing family member 
     *             and evolutions data.
     *             Example: 
     *             {
     *               'members' => ['Bulbausaur', 'Ivysaur', 'Venusaur', 'Venusaur [Mega Forme]'],
     *               'evolutions' => [
     *                 {'source' => 'Bulbasaur', 'target' => 'Ivysaur', 'condition' => 'Level 16'},
     *                 {'source' => 'Ivysaur', 'target' => 'Venusaur', 'condition' => 'Level 36'},
     *                 {'source' => 'Venusaur', 'target' => 'Venusaur [Mega Forme]', 'condition => 'Venusaurite'}
     *               ]
     *             }
     * - evo_src - The name of the pokemon at the root of the current call. Is undefined for the base
     *             (non-resursive) call, and for each recursive call it is the name of the pokemon at the 
     *             root of the subtree being parsed
     * Outputs:
     * - ret_obj - This will be equal to the the value of ret_obj that was passed in plus the evolution
     *             data parsed during the current recursion
     * - 
     */
    static _flattenEvolutionTree(family_obj, ret_obj, evo_src) {
        ret_obj = ret_obj || {
            'members': [],
            'evolutions': []
        };

        if(Array.isArray(family_obj)) {
            for(let i = 0; i < family_obj.length; i++) {
                for(let key in family_obj[i]) {
                    ret_obj.members.push(key)
                    ret_obj.evolutions.push({
                        'source': evo_src,
                        'target': key,
                        'condition': family_obj[i][key]['condition']
                    })
                    this._flattenEvolutionTree(family_obj[i][key]['evolutions'], ret_obj, key);
                }
            }
        } else if(typeof family_obj === 'object') {
            for(let key in family_obj) {
                ret_obj.members.push(key)
                this._flattenEvolutionTree(family_obj[key], ret_obj, key)
            }
        }
        return ret_obj
    }

    /* _parseEvolutionConditions
     * Parse the HTML in the conditions list from the flattened object.
     * Currently this only successfully parses Level conditions
     * Inputs:
     * - flattened - See _flattenEvolutionTree for input format. Modified in
     *               place to extract condition information from html
     * Outputs: None
     */
    static _parseEvolutionConditions(flattened) {
        for(let e = 0; e < flattened.evolutions.length; e++) {
            let source = flattened.evolutions[e].source
            let target = flattened.evolutions[e].target
            let condition = flattened.evolutions[e].condition
            let condText = condition.textContent
            // for now, let's just parse for pokemon that evolve by level
            // TODO: Non-Level conditions
            if(condText.indexOf("Level ") > -1) {
                flattened.evolutions[e].condition = [];
                let words = condText.split(" ")
                let cond = "", clearCurrentCondition = false;

                for(let w = 0; w < words.length; w++) {
                    clearCurrentCondition = false
                    if(words[w] === "Level") {
                        clearCurrentCondition = true
                        flattened.evolutions[e].condition.push({'condition': words[w], 'data': words[w+1]})
                        w++;
                    } else if(words[w] === "Happiness") {
                        clearCurrentCondition = true
                        flattened.evolutions[e].condition.push({'condition': words[w], 'data': ""})
                    } else { // catch-all for now
                        clearCurrentCondition = false
                        cond = cond + " " + words[w]
                    }

                    if(clearCurrentCondition) {
                        if(cond !== "") {
                            flattened.evolutions[e].condition.push({'condition': cond.trim(), 'data': ""})
                        }
                        cond = ""
                    }
                } // for

                // if there's any leftover conditions, add it into the list
                if(cond !== "") {
                    flattened.evolutions[e].condition.push({'condition': cond.trim(), 'data': ""})
                }
            } // if level
            else {
                flattened.evolutions[e].condition = condition.textContent.trim();
            }
        }
    }
} // EvolutionTreeParser

if(module)
    module.exports = EvolutionTreeParser;
