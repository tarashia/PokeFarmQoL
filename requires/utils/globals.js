// eslint-disable-next-line no-unused-vars
class Globals {
    // eslint-disable-next-line camelcase
    static fillTemplates(GM_getResourceText) {
        Globals.TEMPLATES.shelterOptionsHTML         = GM_getResourceText('shelterOptionsHTML');
        Globals.TEMPLATES.fieldSortHTML              = GM_getResourceText('fieldSortHTML');
        Globals.TEMPLATES.fieldSearchHTML            = GM_getResourceText('fieldSearchHTML');
        Globals.TEMPLATES.privateFieldSearchHTML     = GM_getResourceText('privateFieldSearchHTML');
        Globals.TEMPLATES.qolHubHTML                 = GM_getResourceText('qolHubHTML');
        Globals.TEMPLATES.evolveFastHTML             = GM_getResourceText('evolveFastHTML');
        Globals.TEMPLATES.labOptionsHTML             = GM_getResourceText('labOptionsHTML');
        Globals.TEMPLATES.publicFieldTooltipModHTML  = GM_getResourceText('publicFieldTooltipModHTML');
        Globals.TEMPLATES.privateFieldTooltipModHTML = GM_getResourceText('privateFieldTooltipModHTML');
    }
    static fillOptionsLists(helpers) {
        Globals.TYPE_OPTIONS = helpers.buildOptionsString(Globals.TYPE_LIST);
        Globals.NATURE_OPTIONS = helpers.buildOptionsString(Globals.NATURE_LIST);
        Globals.EGG_GROUP_OPTIONS = helpers.buildOptionsString(Globals.EGG_GROUP_LIST);
    }
    static TEMPLATES = { // all the new/changed HTML for the userscript
        qolHubLinkHTML        : '<li data-name="QoL"><a title="QoL Settings"><img src="https://i.imgur.com/L6KRli5.png" alt="QoL Settings">QoL</a></li>',
        qolHubUpdateLinkHTML  : '<li data-name="QoLupdate"><a href="https://github.com/jpgualdarrama/PokeFarmQoL/raw/master/Poke-Farm-QoL.user.js" target="_blank"><img src="https://i.imgur.com/SJhgsU8.png" alt="QoL Update">QoL Update Available!</a></li>',
        // qolSettingsMenuHTML   : GM_getResourceText('QoLSettingsMenuHTML'),
        massReleaseSelectHTML : '<label id="selectallfish"><input class="qolsetting" id="selectallfishcheckbox" type="checkbox">Select all</label>' +
        '<label id="movefishselectany"><input class="qolsetting" id="movefishselectanycheckbox" type="checkbox">Select Any  </label>' +
        '<label id="movefishselectsour"><input class="qolsetting" id="movefishselectsourcheckbox" type="checkbox">Select Sour  </label>' +
        '<label id="movefishselectspicy"><input class="qolsetting" id="movefishselectspicycheckbox" type="checkbox">Select Spicy</label>' +
        '<label id="movefishselectdry"><input class="qolsetting" id="movefishselectdrycheckbox" type="checkbox">Select Dry  </label>' +
        '<label id="movefishselectsweet"><input class="qolsetting" id="movefishselectsweetcheckbox" type="checkbox">Select Sweet  </label>' +
        '<label id="movefishselectbitter"><input class="qolsetting" id="movefishselectbittercheckbox" type="checkbox">Select Bitter  </label>',
        partyModHTML          : '<div id=\'qolpartymod\'><label><input type="checkbox" class="qolsetting qolalone" data-key="hideDislike"/>Hide disliked berries</label><label><input type="checkbox" class="qolsetting qolalone" data-key="niceTable"/>Show in table</label><label><input type="checkbox" class="qolsetting qolalone" data-key="hideAll"/>Hide all click fast</label></div>',
        // filled in by fillTemplates
        shelterOptionsHTML   : null,
        fieldSortHTML         : null,
        fieldSearchHTML       : null,
        privateFieldSearchHTML: null,
        qolHubHTML            : null,
        evolveFastHTML        : null,
        labOptionsHTML        : null,
        publicFieldTooltipModHTML   : null,
        privateFieldTooltipModHTML  : null
    };

    static SETTINGS_SAVE_KEY = 'QoLSettings';
    // Note - the order of TYPE_LIST is important. It looks like PFQ uses an array in this order in its code
    // Don't change the order without looking for where this array is used
    static TYPE_LIST = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];
    static NATURE_LIST = ['Lonely', 'Mild', 'Hasty', 'Gentle', 'Bold', 'Modest', 'Timid', 'Calm',
        'Impish', 'Adamant', 'Jolly', 'Careful', 'Relaxed', 'Brave', 'Quiet', 'Sassy',
        'Lax', 'Naughty', 'Rash', 'Naïve', 'Hardy', 'Docile', 'Serious', 'Bashful', 'Quirky'];
    static EGG_GROUP_LIST = [
        'Undiscovered', // 0
        'Monster', // 1
        'Dragon', // 2
        'Field', // 3
        'Bug', // 4
        'Grass', // 5
        'Water 1', // 6
        'Water 2', // 7
        'Water 3', // 8
        'Amorphous', // 9
        'Fairy', // 10
        'Human-Like', // 11
        'Mineral', // 12
        'Flying', // 13 <-- This skip is correct
        'Ditto', // 15
    ];
    static EGG_GROUP_ID_TO_NAME = [
        'Undiscovered', // 0
        'Monster', // 1
        'Dragon', // 2
        'Field', // 3
        'Bug', // 4
        'Grass', // 5
        'Water 1', // 6
        'Water 2', // 7
        'Water 3', // 8
        'Amorphous', // 9
        'Fairy', // 10
        'Human-Like', // 11
        'Mineral', // 12
        'Flying', // 13
        'ERROR', // 14
        'Ditto', // 15
    ];
    static SHELTER_TYPE_TABLE = [
        '0', 'Normal', '<img src="//pfq-static.com/img/types/normal.png/t=1262702646">',
        '1', 'Fire', '<img src="//pfq-static.com/img/types/fire.png/t=1262702645">',
        '2', 'Water', '<img src="//pfq-static.com/img/types/water.png/t=1262702646">',
        '3', 'Electric', '<img src="//pfq-static.com/img/types/electric.png/t=1262702645">',
        '4', 'Grass', '<img src="//pfq-static.com/img/types/grass.png/t=1262702645">',
        '5', 'Ice', '<img src="//pfq-static.com/img/types/ice.png/t=1262702646">',
        '6', 'fighting', '<img src="//pfq-static.com/img/types/fighting.png/t=1262702645">',
        '7', 'Poison', '<img src="//pfq-static.com/img/types/poison.png/t=1262702646">',
        '8', 'Ground', '<img src="//pfq-static.com/img/types/ground.png/t=1262702646">',
        '9', 'Flying', '<img src="//pfq-static.com/img/types/flying.png/t=1262702645">',
        '10', 'Psychic', '<img src="//pfq-static.com/img/types/psychic.png/t=1262702646">',
        '11', 'Bug', '<img src="//pfq-static.com/img/types/bug.png/t=1262702645">',
        '12', 'Rock', '<img src="//pfq-static.com/img/types/rock.png/t=1262702646">',
        '13', 'Ghost', '<img src="//pfq-static.com/img/types/ghost.png/t=1262702645">',
        '14', 'Dragon', '<img src="//pfq-static.com/img/types/dragon.png/t=1263605747">',
        '15', 'Dark', '<img src="//pfq-static.com/img/types/dark.png/t=1262702645">',
        '16', 'Steel', '<img src="//pfq-static.com/img/types/steel.png/t=1262702646">',
        '17', 'Fairy', '<img src="//pfq-static.com/img/types/fairy.png/t=1374419124">',
    ];
    static SHELTER_SEARCH_DATA = [
        'findNewEgg', 'Egg', 'new egg', '<img src="//pfq-static.com/img/pkmn/egg.png/t=1451852195">',
        'findNewPokemon', 'Pokémon', 'new Pokémon', '<img src="//pfq-static.com/img/pkmn/pkmn.png/t=1451852507">',
        'findShiny', 'SHINY', 'Shiny', '<img src="//pfq-static.com/img/pkmn/shiny.png/t=1400179603">',
        'findAlbino','ALBINO', 'Albino', '<img src="//pfq-static.com/img/pkmn/albino.png/t=1414662094">',
        'findMelanistic', 'MELANISTIC', 'Melanistic', '<img src="//pfq-static.com/img/pkmn/melanistic.png/t=1435353274">',
        'findPrehistoric', 'PREHISTORIC', 'Prehistoric', '<img src="//pfq-static.com/img/pkmn/prehistoric.png/t=1465558964">',
        'findDelta', 'DELTA', 'Delta', '<img src="//pfq-static.com/img/pkmn/_delta/dark.png/t=1501325214">',
        'findMega', 'MEGA', 'Mega', '<img src="//pfq-static.com/img/pkmn/mega.png/t=1400179603">',
        'findStarter', 'STARTER', 'Starter', '<img src="//pfq-static.com/img/pkmn/starter.png/t=1484919510">',
        'findCustomSprite', 'CUSTOM SPRITE', 'Custom Sprite', '<img src="//pfq-static.com/img/pkmn/cs.png/t=1405806997">',
        'findMale', '[M]', 'Male', '<img src="//pfq-static.com/img/pkmn/gender_m.png/t=1401213006">',
        'findFemale', '[F]', 'Female', '<img src="//pfq-static.com/img/pkmn/gender_f.png/t=1401213007">',
        'findNoGender', '[N]', 'Genderless', '<img src="//pfq-static.com/img/pkmn/gender_n.png/t=1401213004">',
    ];

    // filled in by fillOptionsLists
    static TYPE_OPTIONS = null;
    static NATURE_OPTIONS = null;
    static EGG_GROUP_OPTIONS = null;

    // filled in by LocalStorageManager
    static DEX_DATA = null;
    static DEX_UPDATE_DATE = null;
    static EVOLVE_BY_LEVEL_LIST = null;
    static EVOLUTIONS_LEFT = null;
}