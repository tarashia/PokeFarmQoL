const TEMPLATES = { // all the new/changed HTML for the userscript
    qolHubLinkHTML        : `<li data-name="QoL"><a title="QoL Settings"><img src="https://i.imgur.com/L6KRli5.png" alt="QoL Settings">QoL</a></li>`,
    qolHubUpdateLinkHTML  : `<li data-name="QoLupdate"><a href=\"https://github.com/jpgualdarrama/PokeFarmQoL/raw/master/Poke-Farm-QoL.user.js\" target=\"_blank\"><img src="https://i.imgur.com/SJhgsU8.png" alt="QoL Update">QoL Update Available!</a></li>`,
    qolSettingsMenuHTML   : GM_getResourceText('QoLSettingsMenuHTML'),
    shelterSettingsHTML   : GM_getResourceText('shelterSettingsHTML'),
    massReleaseSelectHTML : `<label id="selectallfish"><input id="selectallfishcheckbox" type="checkbox">Select all</label><label id="movefishselectany"><input id="movefishdselectanycheckbox" type="checkbox">Select Any  </label><label id="movefishselectsour"><input id="movefishselectsourcheckbox" type="checkbox">Select Sour  </label><label id="movefishselectspicy"><input id="movefishselectspicycheckbox" type="checkbox">Select Spicy</label><label id="movefishselectdry"><input id="movefishselectdrycheckbox" type="checkbox">Select Dry  </label><label id="movefishselectsweet"><input id="movefishselectsweetcheckbox" type="checkbox">Select Sweet  </label><label id="movefishselectbitter"><input id="movefishselectbittercheckbox" type="checkbox">Select Bitter  </label>`,
    fieldSortHTML         : GM_getResourceText('fieldSortHTML'),
    fieldSearchHTML       : GM_getResourceText('fieldSearchHTML'),
    privateFieldSearchHTML: GM_getResourceText('privateFieldSearchHTML'),
    qolHubHTML            : GM_getResourceText('QolHubHTML'),
    partyModHTML          : `<div id='qolpartymod'><label><input type="checkbox" class="qolsetting qolalone" data-key="hideDislike"/>Hide disliked berries</label><label><input type="checkbox" class="qolsetting qolalone" data-key="niceTable"/>Show in table</label><label><input type="checkbox" class="qolsetting qolalone" data-key="hideAll"/>Hide all click fast</label></div>`,
    evolveFastHTML        : GM_getResourceText('evolveFastHTML'),
    labOptionsHTML        : GM_getResourceText('labOptionsHTML'),
    publicFieldTooltipModHTML   : GM_getResourceText('publicFieldTooltipModHTML'),
    privateFieldTooltipModHTML  : GM_getResourceText('privateFieldTooltipModHTML'),
}

let GLOBALS = {
    SETTINGS_SAVE_KEY : 'QoLSettings',
    // Note - the order of TYPE_LIST is important. It looks like PFQ uses an array in this order in its code
    // Don't change the order without looking for where this array is used
    TYPE_LIST : ["Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"],
    NATURE_LIST : ["Lonely", "Mild", "Hasty", "Gentle", "Bold", "Modest", "Timid", "Calm",
                   "Impish", "Adamant", "Jolly", "Careful", "Relaxed", "Brave", "Quiet", "Sassy",
                   "Lax", "Naughty", "Rash", "Naïve", "Hardy", "Docile", "Serious", "Bashful", "Quirky"],
    EGG_GROUP_LIST : [
        "Undiscovered", // 0
        "Monster", // 1
        "Dragon", // 2
        "Field", // 3
        "Bug", // 4
        "Grass", // 5
        "Water 1", // 6
        "Water 2", // 7
        "Water 3", // 8
        "Amorphous", // 9
        "Fairy", // 10
        "Human-Like", // 11
        "Mineral", // 12
        "Flying", // 13 <-- This skip is correct
        "Ditto", // 15
    ],
    EGG_GROUP_ID_TO_NAME : [
        "Undiscovered", // 0
        "Monster", // 1
        "Dragon", // 2
        "Field", // 3
        "Bug", // 4
        "Grass", // 5
        "Water 1", // 6
        "Water 2", // 7
        "Water 3", // 8
        "Amorphous", // 9
        "Fairy", // 10
        "Human-Like", // 11
        "Mineral", // 12
        "Flying", // 13
        "ERROR", // 14
        "Ditto", // 15
    ],
    SHELTER_TYPE_TABLE : [
        "0", "Normal", '<img src="//pfq-static.com/img/types/normal.png/t=1262702646">',
        "1", "Fire", '<img src="//pfq-static.com/img/types/fire.png/t=1262702645">',
        "2", "Water", '<img src="//pfq-static.com/img/types/water.png/t=1262702646">',
        "3", "Electric", '<img src="//pfq-static.com/img/types/electric.png/t=1262702645">',
        "4", "Grass", '<img src="//pfq-static.com/img/types/grass.png/t=1262702645">',
        "5", "Ice", '<img src="//pfq-static.com/img/types/ice.png/t=1262702646">',
        "6", "fighting", '<img src="//pfq-static.com/img/types/fighting.png/t=1262702645">',
        "7", "Poison", '<img src="//pfq-static.com/img/types/poison.png/t=1262702646">',
        "8", "Ground", '<img src="//pfq-static.com/img/types/ground.png/t=1262702646">',
        "9", "Flying", '<img src="//pfq-static.com/img/types/flying.png/t=1262702645">',
        "10", "Psychic", '<img src="//pfq-static.com/img/types/psychic.png/t=1262702646">',
        "11", "Bug", '<img src="//pfq-static.com/img/types/bug.png/t=1262702645">',
        "12", "Rock", '<img src="//pfq-static.com/img/types/rock.png/t=1262702646">',
        "13", "Ghost", '<img src="//pfq-static.com/img/types/ghost.png/t=1262702645">',
        "14", "Dragon", '<img src="//pfq-static.com/img/types/dragon.png/t=1263605747">',
        "15", "Dark", '<img src="//pfq-static.com/img/types/dark.png/t=1262702645">',
        "16", "Steel", '<img src="//pfq-static.com/img/types/steel.png/t=1262702646">',
        "17", "Fairy", '<img src="//pfq-static.com/img/types/fairy.png/t=1374419124">',
    ],
    SHELTER_SEARCH_DATA : [
        "findNewEgg", "Egg", "new egg", '<img src="//pfq-static.com/img/pkmn/egg.png/t=1451852195">',
        "findNewPokemon", "Pokémon", "new Pokémon", '<img src="//pfq-static.com/img/pkmn/pkmn.png/t=1451852507">',
        "findShiny", "SHINY", "Shiny", '<img src="//pfq-static.com/img/pkmn/shiny.png/t=1400179603">',
        "findAlbino","ALBINO", "Albino", '<img src="//pfq-static.com/img/pkmn/albino.png/t=1414662094">',
        "findMelanistic", "MELANISTIC", "Melanistic", '<img src="//pfq-static.com/img/pkmn/melanistic.png/t=1435353274">',
        "findPrehistoric", "PREHISTORIC", "Prehistoric", '<img src="//pfq-static.com/img/pkmn/prehistoric.png/t=1465558964">',
        "findDelta", "DELTA", "Delta", '<img src="//pfq-static.com/img/pkmn/_delta/dark.png/t=1501325214">',
        "findMega", "MEGA", "Mega", '<img src="//pfq-static.com/img/pkmn/mega.png/t=1400179603">',
        "findStarter", "STARTER", "Starter", '<img src="//pfq-static.com/img/pkmn/starter.png/t=1484919510">',
        "findCustomSprite", "CUSTOM SPRITE", "Custom Sprite", '<img src="//pfq-static.com/img/pkmn/cs.png/t=1405806997">',
        "findMale", "[M]", "Male", '<img src="//pfq-static.com/img/pkmn/gender_m.png/t=1401213006">',
        "findFemale", "[F]", "Female", '<img src="//pfq-static.com/img/pkmn/gender_f.png/t=1401213007">',
        "findNoGender", "[N]", "Genderless", '<img src="//pfq-static.com/img/pkmn/gender_n.png/t=1401213004">',
    ],
}
GLOBALS.TYPE_OPTIONS = Helpers.buildOptionsString(GLOBALS.TYPE_LIST);
GLOBALS.NATURE_OPTIONS = Helpers.buildOptionsString(GLOBALS.NATURE_LIST);
GLOBALS.EGG_GROUP_OPTIONS = Helpers.buildOptionsString(GLOBALS.EGG_GROUP_LIST);

// manage GLOBALS.DEX_DATA and GLOBALS.DEX_UPDATE_DATE
// GLOBALS.DEX_DATA is the data loaded directly from the script contained in
// the pokefarm.com/dex HTML. It contains the list of pokemon, and for each:
// - their types
// - if they hatch from an egg,
// - if you have the eggdex, and
// - if you have the regular, shiny, albino, and melanistic pokedex entries
if(!DexUtilities.loadDexIntoGlobalsFromStorage()) { // can't load it from storage
    DexUtilities.loadDexIntoGlobalsFromWeb(); // so load it from the web
} else { // can load it from storage
    DexUtilities.loadDexIntoGlobalsFromWebIfOld(); // reload it from web if it's old
}

GLOBALS.EVOLVE_BY_LEVEL_LIST = JSON.parse(localStorage.getItem('QoLEvolveByLevel'))
