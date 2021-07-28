// eslint-disable-next-line no-unused-vars
class GlobalsBase {
    constructor(helpers) {
        this.HELPERS = helpers;
        this.TEMPLATES = { // all the new/changed HTML for the userscript
            qolHubLinkHTML: '<li data-name="QoL"><a title="QoL Settings"><img src="https://i.imgur.com/L6KRli5.png" alt="QoL Settings">QoL</a></li>',
            qolHubUpdateLinkHTML: '<li data-name="QoLupdate"><a href="https://github.com/jpgualdarrama/PokeFarmQoL/raw/master/Poke-Farm-QoL.user.js" target="_blank"><img src="https://i.imgur.com/SJhgsU8.png" alt="QoL Update">QoL Update Available!</a></li>',
            massReleaseSelectHTML: '<label id="selectallfish"><input class="qolsetting" id="selectallfishcheckbox" type="checkbox">Select all</label>' +
                '<label id="movefishselectany"><input class="qolsetting" id="movefishselectanycheckbox" type="checkbox">Select Any  </label>' +
                '<label id="movefishselectsour"><input class="qolsetting" id="movefishselectsourcheckbox" type="checkbox">Select Sour  </label>' +
                '<label id="movefishselectspicy"><input class="qolsetting" id="movefishselectspicycheckbox" type="checkbox">Select Spicy</label>' +
                '<label id="movefishselectdry"><input class="qolsetting" id="movefishselectdrycheckbox" type="checkbox">Select Dry  </label>' +
                '<label id="movefishselectsweet"><input class="qolsetting" id="movefishselectsweetcheckbox" type="checkbox">Select Sweet  </label>' +
                '<label id="movefishselectbitter"><input class="qolsetting" id="movefishselectbittercheckbox" type="checkbox">Select Bitter  </label>',
            partyModHTML: '<div id=\'qolpartymod\'><label><input type="checkbox" class="qolsetting qolalone" data-key="hideDislike"/>Hide disliked berries</label><label><input type="checkbox" class="qolsetting qolalone" data-key="niceTable"/>Show in table</label><label><input type="checkbox" class="qolsetting qolalone" data-key="hideAll"/>Hide all click fast</label></div>',
            // filled in by fillTemplates
            shelterOptionsHTML: null,
            fieldSortHTML: null,
            fieldSearchHTML: null,
            privateFieldSearchHTML: null,
            qolHubHTML: null,
            evolveFastHTML: null,
            labOptionsHTML: null,
            publicFieldTooltipModHTML: null,
            privateFieldTooltipModHTML: null
        };

        this.SETTINGS_SAVE_KEY = 'QoLSettings';
        this.DAYCARE_PAGE_SETTINGS_KEY = 'QoLDaycare';
        this.DEX_PAGE_SETTINGS_KEY = 'QoLDexPage';
        this.FARM_PAGE_SETTINGS_KEY = 'QoLFarm';
        this.FISHING_PAGE_SETTINGS_KEY = 'QoLFishing';
        this.LAB_PAGE_SETTINGS_KEY = 'QoLLab';
        this.MULTIUSER_PAGE_SETTINGS_KEY = 'QoLMultiuser';
        this.PRIVATE_FIELDS_PAGE_SETTINGS_KEY = 'QoLPrivateFields';
        this.PUBLIC_FIELDS_PAGE_SETTINGS_KEY = 'QoLPublicFields';
        this.SHELTER_PAGE_SETTINGS_KEY = 'QoLShelter';
        this.WISHFORGE_PAGE_SETTINGS_KEY = 'QoLWishforge';
        this.POKEDEX_DATA_KEY = 'QoLPokedex';
        this.POKEDEX_DEX_IDS_KEY = 'QoLDexIDsCache';
        this.POKEDEX_REGIONAL_FORMS_KEY = 'QoLRegionalFormsList';
        this.POKEDEX_EGG_TYPES_MAP_KEY = 'QoLEggTypesMap';
        this.POKEDEX_EVOLVE_BY_LEVEL_KEY = 'QoLEvolveByLevel';
        this.POKEDEX_EVOLUTION_TREE_DEPTH_KEY = 'QoLEvolutionTreeDepth';
        /*
         * Note - the order of TYPE_LIST is important. It looks like PFQ uses an array in this order in its code
         * Don't change the order without looking for where this array is used
         */
        this.TYPE_LIST = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];
        this.NATURE_LIST = ['Lonely', 'Mild', 'Hasty', 'Gentle', 'Bold', 'Modest', 'Timid', 'Calm',
            'Impish', 'Adamant', 'Jolly', 'Careful', 'Relaxed', 'Brave', 'Quiet', 'Sassy',
            'Lax', 'Naughty', 'Rash', 'Naïve', 'Hardy', 'Docile', 'Serious', 'Bashful', 'Quirky'];
        this.EGG_GROUP_LIST = [
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
        this.EGG_GROUP_ID_TO_NAME = [
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
        this.SHELTER_TYPE_TABLE = [
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
        this.SHELTER_SEARCH_DATA = [
            'findNewEgg', 'Egg', 'new egg', '<img src="//pfq-static.com/img/pkmn/egg.png/t=1451852195">',
            'findNewPokemon', 'Pokémon', 'new Pokémon', '<img src="//pfq-static.com/img/pkmn/pkmn.png/t=1451852507">',
            'findShiny', 'SHINY', 'Shiny', '<img src="//pfq-static.com/img/pkmn/shiny.png/t=1400179603">',
            'findAlbino', 'ALBINO', 'Albino', '<img src="//pfq-static.com/img/pkmn/albino.png/t=1414662094">',
            'findMelanistic', 'MELANISTIC', 'Melanistic', '<img src="//pfq-static.com/img/pkmn/melanistic.png/t=1435353274">',
            'findPrehistoric', 'PREHISTORIC', 'Prehistoric', '<img src="//pfq-static.com/img/pkmn/prehistoric.png/t=1465558964">',
            'findDelta', 'DELTA', 'Delta', '<img src="//pfq-static.com/img/pkmn/_delta/dark.png/t=1501325214">',
            'findMega', 'MEGA', 'Mega', '<img src="//pfq-static.com/img/pkmn/mega.png/t=1400179603">',
            'findStarter', 'STARTER', 'Starter', '<img src="//pfq-static.com/img/pkmn/starter.png/t=1484919510">',
            'findCustomSprite', 'CUSTOM SPRITE', 'Custom Sprite', '<img src="//pfq-static.com/img/pkmn/cs.png/t=1405806997">',
            'findMale', '[M]', 'Male', '<img src="//pfq-static.com/img/pkmn/gender_m.png/t=1401213006">',
            'findFemale', '[F]', 'Female', '<img src="//pfq-static.com/img/pkmn/gender_f.png/t=1401213007">',
            'findNoGender', '[N]', 'Genderless', '<img src="//pfq-static.com/img/pkmn/gender_n.png/t=1401213004">',
            'findLegendary', '', 'Legendary', '<img src="//pfq-static.com/img/pkmn/pkmn.png/t=1451852507">',
        ];
        this.SHELTER_SEARCH_LISTS = {
            'findLegendary': [
                /*
                 * List of official legendaries more or less based on
                 * https://bulbapedia.bulbagarden.net/wiki/Legendary_Pok%C3%A9mon#Generation_IV
                 * Kanto
                 */
                'Articuno', 'Zapdos', 'Moltres', 'Mewtwo', 'Mew',
                // Johto
                'Raikou', 'Entei', 'Suicune', 'Lugia', 'Ho-oh', 'Celebi',
                // Hoenn
                'Regirock', 'Regice', 'Registeel', 'Latias', 'Latios', 'Kyogre', 'Groudon', 'Rayquaza', 'Deoxys', 'Jirachi',
                // Sinnoh
                'Uxie', 'Mesprit', 'Azelf', 'Dialga', 'Palkia', 'Heatran', 'Regigigas', 'Giratina', 'Cresselia',
                'Manaphy', 'Darkrai', 'Shaymin', 'Arceus',
                // Unova
                'Cobalion', 'Terrakion', 'Virizion', 'Tornadus', 'Thundurus', 'Reshiram', 'Zekrom',
                'Landorus', 'Kyurem', 'Keldeo', 'Meloetta', 'Genesect',
                // Kalos
                'Xerneas', 'Yveltal', 'Zygarde', 'Diancie', 'Hoopa', 'Volcanion',
                // Alola
                'Type: Null', 'Silvally', 'Tapu Koko', 'Tapu Lele', 'Tapu Bulu', 'Tapu Fini',
                'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Necrozma',
                // Galar
                'Zacian', 'Zamazenta', 'Eternatus',
                // PFQ
                /* None */
            ]
        };

        // filled in by fillOptionsLists
        this.TYPE_OPTIONS = null;
        this.NATURE_OPTIONS = null;
        this.EGG_GROUP_OPTIONS = null;

        // filled in by LocalStorageManager
        this.DEX_UPDATE_DATE = null;

        /*
         * a static copy of the <script id="dexdata"> tag from Feb 16, 2021
         * this is updated every time the user visits the dex page
         */
        this.DEX_DATA = ('{"columns":["id","name","type1","type2","eggs","eggdex","pkmn","pokedex","shinydex","albidex","melandex"],' +
            '"types":["normal","fire","water","electric","grass","ice","fighting","poison","ground","flying","psychic","bug","rock","ghost","dragon","dark","steel","fairy"],' +
            '"regions":{"1":[["001","Bulbasaur",4,7,1,1,1,1,1,1,0],' +
            '["002","Ivysaur",4,7,0,0,1,1,1,1,0],' +
            '["003","Venusaur",4,7,0,0,2,2,1,1,0],' +
            '["004","Charmander",1,-1,1,1,1,1,1,1,0],' +
            '["005","Charmeleon",1,-1,0,0,1,1,1,1,0],' +
            '["006","Charizard",1,9,0,0,3,3,3,3,0],' +
            '["007","Squirtle",2,-1,1,1,1,1,1,0,0],' +
            '["008","Wartortle",2,-1,0,0,1,1,1,0,0],' +
            '["009","Blastoise",2,-1,0,0,2,2,2,0,0],' +
            '["010","Caterpie",11,-1,1,1,1,1,1,1,0],' +
            '["011","Metapod",11,-1,0,0,1,1,1,1,0],' +
            '["012","Butterfree",11,9,0,0,1,1,1,1,0],' +
            '["013","Weedle",11,7,1,1,1,1,0,1,0],' +
            '["014","Kakuna",11,7,0,0,1,1,0,1,0],' +
            '["015","Beedrill",11,7,0,0,2,2,0,1,0],' +
            '["016","Pidgey",0,9,1,1,1,1,1,1,0],' +
            '["017","Pidgeotto",0,9,0,0,1,1,1,1,0],' +
            '["018","Pidgeot",0,9,0,0,2,2,2,2,0],' +
            '["019","Rattata",0,-1,2,2,2,2,1,1,0],' +
            '["020r7","Raticate",15,0,0,0,3,3,2,2,0],' +
            '["021","Spearow",0,9,1,1,1,1,0,1,0],' +
            '["022","Fearow",0,9,0,0,1,1,0,1,0],' +
            '["023","Ekans",7,-1,1,1,1,1,1,1,0],' +
            '["024","Arbok",7,-1,0,0,1,1,1,1,0],' +
            '["025","Pichu",3,-1,1,1,1,1,1,1,0],' +
            '["026","Pikachu",3,-1,0,0,1,1,1,1,0],' +
            '["027","Raichu",3,-1,0,0,2,2,2,2,0],' +
            '["028","Sandshrew",8,-1,2,2,2,2,2,2,0],' +
            '["029r7","Sandslash",5,16,0,0,2,2,2,2,0],' +
            '["030","Nidoran",7,-1,1,1,1,1,1,1,0],' +
            '["031","Nidorina",7,-1,0,0,1,1,1,1,0],' +
            '["032","Nidoqueen",7,8,0,0,1,1,1,1,0],' +
            '["033","Nidorino",7,-1,0,0,1,1,1,1,0],' +
            '["034","Nidoking",7,8,0,0,1,1,1,1,0],' +
            '["035","Cleffa",17,-1,1,1,1,1,1,1,0],' +
            '["036","Clefairy",17,-1,0,0,1,1,1,1,0],' +
            '["037","Clefable",17,-1,0,0,1,1,1,1,0],' +
            '["038","Vulpix",1,-1,2,2,2,2,2,2,0],' +
            '["039r7","Ninetales",5,17,0,0,2,2,2,2,0],' +
            '["040","Igglybuff",0,17,1,1,1,1,1,1,0],' +
            '["041","Jigglypuff",0,17,0,0,1,1,1,1,0],' +
            '["042","Wigglytuff",0,17,0,0,1,1,1,1,0],' +
            '["043","Zubat",7,9,1,1,1,1,0,1,0],' +
            '["044","Golbat",7,9,0,0,1,1,0,1,0],' +
            '["045","Crobat",7,9,0,0,1,1,0,1,0],' +
            '["046","Oddish",4,7,1,1,1,1,0,0,0],' +
            '["047","Gloom",4,7,0,0,1,1,0,0,0],' +
            '["048","Vileplume",4,7,0,0,1,1,0,0,0],' +
            '["049","Bellossom",4,-1,0,0,1,1,0,0,0],' +
            '["050","Paras",11,4,1,1,1,1,0,1,0],' +
            '["051","Parasect",11,4,0,0,1,1,0,0,0],' +
            '["052","Venonat",11,7,1,1,1,1,0,1,0],' +
            '["053","Venomoth",11,7,0,0,1,1,0,0,0],' +
            '["054","Diglett",8,-1,2,2,2,2,2,2,0],' +
            '["055","Dugtrio",8,-1,0,0,2,2,2,2,0],' +
            '["056r8","Meowth",16,-1,3,3,3,3,2,2,0],' +
            '["057","Persian",0,-1,0,0,2,2,1,1,0],' +
            '["058","Psyduck",2,-1,1,1,1,1,1,1,0],' +
            '["059","Golduck",2,-1,0,0,1,1,1,1,0],' +
            '["060","Mankey",6,-1,1,1,1,1,1,1,1],' +
            '["061","Primeape",6,-1,0,0,1,1,1,1,1],' +
            '["062","Growlithe",1,-1,1,1,1,1,1,1,0],' +
            '["063","Arcanine",1,-1,0,0,1,1,1,1,0],' +
            '["064","Poliwag",2,-1,1,1,1,1,1,1,0],' +
            '["065","Poliwhirl",2,-1,0,0,1,1,1,1,0],' +
            '["066","Poliwrath",2,6,0,0,1,1,1,1,0],' +
            '["067","Politoed",2,-1,0,0,1,1,1,1,0],' +
            '["068","Abra",10,-1,1,1,1,1,1,1,0],' +
            '["069","Kadabra",10,-1,0,0,1,1,1,1,0],' +
            '["070-M","Alakazam",10,-1,0,0,2,2,2,2,0],' +
            '["071","Machop",6,-1,1,1,1,1,1,1,0],' +
            '["072","Machoke",6,-1,0,0,1,1,1,1,0],' +
            '["073","Machamp",6,-1,0,0,1,1,1,1,0],' +
            '["074","Bellsprout",4,7,1,1,1,1,0,0,0],' +
            '["075","Weepinbell",4,7,0,0,1,1,0,0,0],' +
            '["076","Victreebell",4,7,0,0,1,1,0,0,0],' +
            '["077","Tentacool",2,7,1,1,1,1,0,0,0],' +
            '["078","Tentacruel",2,7,0,0,1,1,0,0,0],' +
            '["079r7","Geodude",12,3,2,2,2,2,2,2,0],' +
            '["080r7","Graveler",12,3,0,0,2,2,2,2,0],' +
            '["081r7","Golem",12,3,0,0,2,2,2,2,0],' +
            '["082","Ponyta",1,-1,2,2,2,2,1,1,0],' +
            '["083r8","Rapidash",10,17,0,0,2,2,1,1,0],' +
            '["084","Slowpoke",2,10,2,2,2,2,0,0,0],' +
            '["085","Slowbro",2,10,0,0,3,3,1,0,0],' +
            '["086","Slowking",2,10,0,0,2,2,0,0,0],' +
            '["087","Magnemite",3,16,1,1,1,1,1,1,0],' +
            '["088","Magneton",3,16,0,0,1,1,1,1,0],' +
            '["089","Magnezone",3,16,0,0,1,1,1,1,0],' +
            '["090r8","Farfetch\'d",6,-1,2,2,2,2,1,1,0],' +
            '["091","Doduo",0,9,1,1,1,1,0,0,0],' +
            '["092","Dodrio",0,9,0,0,1,1,0,0,0],' +
            '["093","Seel",2,-1,1,1,1,1,1,1,0],' +
            '["094","Dewgong",2,5,0,0,1,1,1,1,0],' +
            '["095","Grimer",7,-1,2,2,2,2,1,1,0],' +
            '["096","Muk",7,-1,0,0,2,2,1,1,0],' +
            '["097","Shellder",2,-1,1,1,1,1,1,1,0],' +
            '["098","Cloyster",2,5,0,0,1,1,1,1,0],' +
            '["099","Gastly",13,7,1,1,1,1,1,1,0],' +
            '["100","Haunter",13,7,0,0,1,1,1,1,0],' +
            '["101","Gengar",13,7,0,0,2,2,2,2,0],' +
            '["102","Onix",12,8,1,1,1,1,1,1,0],' +
            '["103","Steelix",16,8,0,0,2,2,2,2,0],' +
            '["104","Drowzee",10,-1,1,1,1,1,0,0,0],' +
            '["105","Hypno",10,-1,0,0,1,1,0,0,0],' +
            '["106","Krabby",2,-1,1,1,1,1,0,0,0],' +
            '["107","Kingler",2,-1,0,0,1,1,0,0,0],' +
            '["108","Voltorb",3,-1,1,1,1,1,1,1,0],' +
            '["109","Electrode",3,-1,0,0,1,1,1,1,0],' +
            '["110","Exeggcute",4,10,1,1,1,1,1,1,0],' +
            '["111","Exeggutor",4,10,0,0,2,2,2,2,0],' +
            '["112","Cubone",8,-1,1,1,1,1,1,1,0],' +
            '["113t7","Marowak",1,13,0,0,3,3,3,3,0],' +
            '["114","Lickitung",0,-1,1,1,1,1,0,0,0],' +
            '["115","Lickilicky",0,-1,0,0,1,1,0,0,0],' +
            '["116","Koffing",7,-1,1,1,1,1,0,0,0],' +
            '["117","Weezing",7,-1,0,0,2,2,0,0,0],' +
            '["118","Rhyhorn",8,12,1,1,1,1,1,1,0],' +
            '["119","Rhydon",8,12,0,0,1,1,1,1,0],' +
            '["120","Rhyperior",8,12,0,0,1,1,1,1,0],' +
            '["121","Tangela",4,-1,1,1,1,1,0,0,0],' +
            '["122","Tangrowth",4,-1,0,0,1,1,0,0,0],' +
            '["123","Kangaskhan",0,-1,1,1,2,2,0,0,0],' +
            '["124","Horsea",2,-1,1,1,1,1,1,1,0],' +
            '["125","Seadra",2,-1,0,0,1,1,1,1,0],' +
            '["126","Kingdra",2,14,0,0,1,1,1,1,0],' +
            '["127","Goldeen",2,-1,1,1,1,1,0,0,0],' +
            '["128","Seaking",2,-1,0,0,1,1,0,0,0],' +
            '["129","Staryu",2,-1,1,1,1,1,0,0,0],' +
            '["130","Starmie",2,10,0,0,1,1,0,0,0],' +
            '["131","Mime Jr.",10,17,1,1,1,1,1,1,1],' +
            '["132","Mr. Mime",10,17,2,2,2,2,2,2,1],' +
            '["133","Scyther",11,9,1,1,1,1,1,1,0],' +
            '["134","Scizor",11,16,0,0,2,2,2,2,0],' +
            '["135","Smoochum",5,10,1,1,1,1,1,1,1],' +
            '["136","Jynx",5,10,0,0,1,1,1,1,1],' +
            '["137","Pinsir",11,-1,1,1,2,2,0,0,0],' +
            '["138","Tauros",0,-1,1,1,1,1,0,0,0],' +
            '["139","Magikarp",2,-1,1,1,1,1,1,1,0],' +
            '["140-M","Gyarados",2,15,0,0,2,2,2,2,0],' +
            '["141","Lapras",2,5,1,1,1,1,1,1,0],' +
            '["142","Ditto",0,-1,1,1,1,1,0,0,0],' +
            '["143","Eevee",0,-1,1,1,1,1,1,1,0],' +
            '["144","Vaporeon",2,-1,0,0,1,1,1,1,0],' +
            '["145","Jolteon",3,-1,0,0,1,1,1,1,0],' +
            '["146","Flareon",1,-1,0,0,1,1,1,1,0],' +
            '["147","Espeon",10,-1,0,0,1,1,1,1,0],' +
            '["148","Umbreon",15,-1,0,0,1,1,1,1,0],' +
            '["149","Leafeon",4,-1,0,0,1,1,1,1,0],' +
            '["150","Glaceon",5,-1,0,0,1,1,1,1,0],' +
            '["151","Sylveon",17,-1,0,0,1,1,1,1,0],' +
            '["152","Omanyte",12,2,1,1,1,1,1,1,0],' +
            '["153","Omastar",12,2,0,0,1,1,1,1,0],' +
            '["154","Kabuto",12,2,1,1,1,1,1,1,0],' +
            '["155","Kabutops",12,2,0,0,1,1,1,1,0],' +
            '["156","Aerodactyl",12,9,1,1,2,2,2,2,0],' +
            '["157","Munchlax",0,-1,1,1,1,1,0,0,0],' +
            '["158","Snorlax",0,-1,1,1,1,1,0,0,0],' +
            '["159","Articuno",5,9,1,1,1,1,0,0,0],' +
            '["160","Zapdos",3,9,1,1,1,1,0,0,0],' +
            '["161","Moltres",1,9,1,1,1,1,0,0,0],' +
            '["162","Dratini",14,-1,1,1,1,1,1,1,0],' +
            '["163","Dragonair",14,-1,0,0,1,1,1,1,0],' +
            '["164","Dragonite",14,9,0,0,1,1,1,1,0],' +
            '["165-Y","Mewtwo",10,-1,1,1,3,3,0,0,0],' +
            '["166","Mew",10,-1,1,1,1,1,0,0,0]],' +
            '"2":[["167","Chikorita",4,-1,1,1,1,1,0,0,0],' +
            '["168","Bayleef",4,-1,0,0,1,1,0,0,0],' +
            '["169","Meganium",4,-1,0,0,1,1,0,0,0],' +
            '["170","Cyndaquil",1,-1,1,1,1,1,1,1,0],' +
            '["171","Quilava",1,-1,0,0,1,1,1,1,0],' +
            '["172","Typhlosion",1,-1,0,0,1,1,1,1,0],' +
            '["173","Totodile",2,-1,1,1,1,1,1,0,0],' +
            '["174","Croconaw",2,-1,0,0,1,1,1,0,0],' +
            '["175","Feraligator",2,-1,0,0,1,1,1,0,0],' +
            '["176","Sentret",0,-1,1,1,1,1,0,1,0],' +
            '["177","Furret",0,-1,0,0,1,1,0,1,0],' +
            '["178","Hoothoot",0,9,1,1,1,1,0,0,0],' +
            '["179","Noctowl",0,9,0,0,1,1,0,0,0],' +
            '["180","Ledyba",11,9,1,1,1,1,0,1,0],' +
            '["181","Ledian",11,9,0,0,1,1,0,0,0],' +
            '["182","Spinarak",11,7,1,1,1,1,0,1,0],' +
            '["183","Ariados",11,7,0,0,1,1,0,0,0],' +
            '["184","Chinchou",2,3,1,1,1,1,1,1,0],' +
            '["185","Lanturn",2,3,0,0,1,1,1,1,0],' +
            '["186","Togepi",17,-1,1,1,1,1,1,1,0],' +
            '["187","Togetic",17,9,0,0,1,1,1,1,0],' +
            '["188","Togekiss",17,9,0,0,1,1,1,1,0],' +
            '["189","Natu",10,9,1,1,1,1,0,0,0],' +
            '["190","Xatu",10,9,0,0,1,1,0,0,0],' +
            '["191","Mareep",3,-1,1,1,1,1,1,1,0],' +
            '["192","Flaaffy",3,-1,0,0,1,1,1,1,0],' +
            '["193-M","Ampharos",3,14,0,0,2,2,2,2,0],' +
            '["194","Azurill",0,17,1,1,1,1,1,1,0],' +
            '["195","Marill",2,17,1,1,1,1,1,1,0],' +
            '["196","Azumarill",2,17,0,0,1,1,1,1,0],' +
            '["197","Bonsly",12,-1,1,1,1,1,1,1,0],' +
            '["198","Sudowoodo",12,-1,1,1,1,1,1,1,0],' +
            '["199","Hoppip",4,9,1,1,1,1,1,0,0],' +
            '["200","Skiploom",4,9,0,0,1,1,1,0,0],' +
            '["201","Jumpluff",4,9,0,0,1,1,1,0,0],' +
            '["202","Aipom",0,-1,1,1,1,1,0,0,0],' +
            '["203","Ambipom",0,-1,0,0,1,1,0,0,0],' +
            '["204","Sunkern",4,-1,1,1,1,1,0,0,0],' +
            '["205","Sunflora",4,-1,0,0,1,1,0,0,0],' +
            '["206","Yanma",11,9,1,1,1,1,0,0,0],' +
            '["207","Yanmega",11,9,0,0,1,1,0,0,0],' +
            '["208","Wooper",2,8,1,1,1,1,1,1,0],' +
            '["209","Quagsire",2,8,0,0,1,1,1,1,0],' +
            '["210","Murkrow",15,9,1,1,1,1,1,1,0],' +
            '["211","Honchkrow",15,9,0,0,1,1,1,1,0],' +
            '["212","Misdreavus",13,-1,1,1,1,1,1,1,0],' +
            '["213","Mismagius",13,-1,0,0,1,1,1,1,0],' +
            '["214h","Unown",10,-1,28,28,28,28,0,0,0],' +
            '["215","Girafarig",0,10,1,1,1,1,0,0,0],' +
            '["216","Pineco",11,-1,1,1,1,1,1,1,0],' +
            '["217","Forretress",11,16,0,0,1,1,1,1,0],' +
            '["218","Dunsparce",0,-1,1,1,1,1,0,0,0],' +
            '["219","Gligar",8,9,1,1,1,1,1,1,0],' +
            '["220","Gliscor",8,9,0,0,1,1,1,1,0],' +
            '["221","Snubbull",17,-1,1,1,1,1,1,1,0],' +
            '["222","Granbull",17,-1,0,0,1,1,1,1,0],' +
            '["223","Qwilfish",2,7,1,1,1,1,0,0,0],' +
            '["224","Shuckle",11,12,1,1,1,1,1,1,0],' +
            '["225-M","Heracross",11,6,1,1,2,2,2,2,0],' +
            '["226","Sneasel",15,5,1,1,1,1,1,1,0],' +
            '["227","Weavile",15,5,0,0,1,1,1,1,0],' +
            '["228","Teddiursa",0,-1,1,1,1,1,0,0,0],' +
            '["229","Ursaring",0,-1,0,0,1,1,0,0,0],' +
            '["230","Slugma",1,-1,1,1,1,1,1,1,0],' +
            '["231","Magcargo",1,12,0,0,1,1,1,1,0],' +
            '["232","Swinub",5,8,1,1,1,1,1,1,0],' +
            '["233","Piloswine",5,8,0,0,1,1,1,1,0],' +
            '["234","Mamoswine",5,8,0,0,1,1,1,1,0],' +
            '["235","Corsola",2,12,2,2,2,2,1,1,0],' +
            '["236","Remoraid",2,-1,1,1,1,1,0,0,0],' +
            '["237","Octillery",2,-1,0,0,1,1,0,0,0],' +
            '["238","Delibird",5,9,1,1,1,1,1,1,0],' +
            '["239","Skarmory",16,9,1,1,1,1,1,1,0],' +
            '["240","Houndour",15,1,1,1,1,1,1,1,0],' +
            '["241-M","Houndoom",15,1,0,0,2,2,2,2,0],' +
            '["242","Phanpy",8,-1,1,1,1,1,1,1,0],' +
            '["243","Donphan",8,-1,0,0,1,1,1,1,0],' +
            '["244","Stantler",0,-1,1,1,1,1,0,0,0],' +
            '["245","Smeargle",0,-1,1,1,1,1,0,0,0],' +
            '["246","Tyrogue",6,-1,1,1,1,1,1,1,0],' +
            '["247","Hitmonlee",6,-1,0,0,1,1,1,1,0],' +
            '["248","Hitmonchan",6,-1,0,0,1,1,1,1,0],' +
            '["249","Hitmontop",6,-1,0,0,1,1,1,1,0],' +
            '["250","Elekid",3,-1,1,1,1,1,1,1,0],' +
            '["251","Electabuzz",3,-1,0,0,1,1,1,1,0],' +
            '["252","Electivire",3,-1,0,0,1,1,1,1,0],' +
            '["253","Magby",1,-1,1,1,1,1,1,1,1],' +
            '["254","Magmar",1,-1,0,0,1,1,1,1,1],' +
            '["255","Magmortar",1,-1,0,0,1,1,1,1,1],' +
            '["256","Miltank",0,-1,1,1,1,1,0,0,0],' +
            '["257","Raikou",3,-1,1,1,1,1,0,0,0],' +
            '["258","Entei",1,-1,1,1,1,1,0,0,0],' +
            '["259","Suicune",2,-1,1,1,1,1,0,0,0],' +
            '["260","Larvitar",12,8,1,1,1,1,1,1,0],' +
            '["261","Pupitar",12,8,0,0,1,1,1,1,0],' +
            '["262-M","Tyranitar",12,15,0,0,2,2,2,2,0],' +
            '["263","Lugia",10,9,1,1,1,1,0,0,0],' +
            '["264","Ho-oh",1,9,1,1,1,1,0,0,0],' +
            '["265","Celebi",10,4,1,1,1,1,0,0,0]],' +
            '"3":[["266","Treecko",4,-1,1,1,1,1,1,1,0],' +
            '["267","Grovyle",4,-1,0,0,1,1,1,1,0],' +
            '["268","Sceptile",4,-1,0,0,2,2,2,2,0],' +
            '["269","Torchic",1,-1,1,1,1,1,1,1,0],' +
            '["270","Combusken",1,6,0,0,1,1,1,1,0],' +
            '["271-M","Blaziken",1,6,0,0,2,2,2,2,0],' +
            '["272","Mudkip",2,-1,1,1,1,1,1,1,0],' +
            '["273","Marshtomp",2,8,0,0,1,1,1,1,0],' +
            '["274","Swampert",2,8,0,0,2,2,2,2,0],' +
            '["275","Poochyena",15,-1,1,1,1,1,1,1,0],' +
            '["276","Mightyena",15,-1,0,0,1,1,1,1,0],' +
            '["277","Zigzagoon",0,-1,2,2,2,2,1,2,0],' +
            '["278","Linoone",0,-1,0,0,2,2,1,1,0],' +
            '["279","Wurmple",11,-1,1,1,1,1,0,0,0],' +
            '["280","Silcoon",11,-1,0,0,1,1,0,0,0],' +
            '["281","Beautifly",11,9,0,0,1,1,0,0,0],' +
            '["282","Cascoon",11,-1,0,0,1,1,0,0,0],' +
            '["283","Dustox",11,7,0,0,1,1,0,0,0],' +
            '["284","Lotad",2,4,1,1,1,1,0,0,0],' +
            '["285","Lombre",2,4,0,0,1,1,0,0,0],' +
            '["286","Ludicolo",2,4,0,0,1,1,0,0,0],' +
            '["287","Seedot",4,-1,1,1,1,1,1,1,0],' +
            '["288","Nuzleaf",4,15,0,0,1,1,1,1,0],' +
            '["289","Shiftry",4,15,0,0,1,1,1,1,0],' +
            '["290","Taillow",0,9,1,1,1,1,0,1,0],' +
            '["291","Swellow",0,9,0,0,1,1,0,0,0],' +
            '["292","Wingull",2,9,1,1,1,1,0,0,0],' +
            '["293","Pelipper",2,9,0,0,1,1,0,0,0],' +
            '["294","Ralts",10,17,1,1,1,1,1,1,0],' +
            '["295","Kirlia",10,17,0,0,1,1,1,1,0],' +
            '["296-M","Gardevoir",10,17,0,0,2,2,2,2,0],' +
            '["297","Gallade",10,6,0,0,2,2,2,2,0],' +
            '["298","Surskit",11,2,1,1,1,1,0,0,0],' +
            '["299","Masquerain",11,9,0,0,1,1,0,0,0],' +
            '["300","Shroomish",4,-1,1,1,1,1,1,1,0],' +
            '["301","Breloom",4,6,0,0,1,1,1,1,0],' +
            '["302","Slakoth",0,-1,1,1,1,1,0,0,0],' +
            '["303","Vigoroth",0,-1,0,0,1,1,0,0,0],' +
            '["304","Slaking",0,-1,0,0,1,1,0,0,0],' +
            '["305","Nincada",11,8,1,1,1,1,1,1,0],' +
            '["306","Ninjask",11,9,0,0,1,1,1,1,0],' +
            '["307","Shedinja",11,13,0,0,1,1,1,1,0],' +
            '["308","Whismur",0,-1,1,1,1,1,0,0,0],' +
            '["309","Loudred",0,-1,0,0,1,1,0,0,0],' +
            '["310","Exploud",0,-1,0,0,1,1,0,0,0],' +
            '["311","Makuhita",6,-1,1,1,1,1,1,1,0],' +
            '["312","Hariyama",6,-1,0,0,1,1,1,1,0],' +
            '["313","Nosepass",12,-1,1,1,1,1,1,1,0],' +
            '["314","Probopass",12,16,0,0,1,1,1,1,0],' +
            '["315","Skitty",0,-1,1,1,1,1,1,0,0],' +
            '["316","Delcatty",0,-1,0,0,1,1,1,0,0],' +
            '["317","Sableye",15,13,1,1,2,2,2,2,0],' +
            '["318","Mawile",16,17,1,1,2,2,2,2,0],' +
            '["319","Aron",16,12,1,1,1,1,1,1,0],' +
            '["320","Lairon",16,12,0,0,1,1,1,1,0],' +
            '["321-M","Aggron",16,-1,0,0,2,2,2,2,0],' +
            '["322","Meditite",6,10,1,1,1,1,1,1,0],' +
            '["323-M","Medicham",6,10,0,0,2,2,2,2,0],' +
            '["324","Electrike",3,-1,1,1,1,1,1,1,0],' +
            '["325","Manectric",3,-1,0,0,2,2,2,2,0],' +
            '["326","Plusle",3,-1,1,1,1,1,1,1,0],' +
            '["327","Minun",3,-1,1,1,1,1,1,1,0],' +
            '["328","Volbeat",11,-1,1,1,1,1,0,1,0],' +
            '["329","Illumise",11,-1,1,1,1,1,0,1,0],' +
            '["330","Gulpin",7,-1,1,1,1,1,0,0,0],' +
            '["331","Swalot",7,-1,0,0,1,1,0,0,0],' +
            '["332","Carvanha",2,15,1,1,1,1,1,1,0],' +
            '["333","Sharpedo",2,15,0,0,2,2,2,2,0],' +
            '["334","Wailmer",2,-1,1,1,1,1,1,0,0],' +
            '["335","Wailord",2,-1,0,0,1,1,1,0,0],' +
            '["336","Numel",1,8,1,1,1,1,1,1,0],' +
            '["337-M","Camerupt",1,8,0,0,2,2,2,2,0],' +
            '["338","Torkoal",1,-1,1,1,1,1,1,1,0],' +
            '["339","Spoink",10,-1,1,1,1,1,0,0,0],' +
            '["340","Grumpig",10,-1,0,0,1,1,0,0,0],' +
            '["341","Spinda",0,-1,1,1,1,1,0,0,0],' +
            '["342","Trapinch",8,-1,1,1,1,1,1,1,0],' +
            '["343","Vibrava",8,14,0,0,1,1,1,1,0],' +
            '["344","Flygon",8,14,0,0,1,1,1,1,0],' +
            '["345","Cacnea",4,-1,1,1,1,1,1,1,0],' +
            '["346","Cacturne",4,15,0,0,1,1,1,1,0],' +
            '["347","Swablu",0,9,1,1,1,1,1,1,0],' +
            '["348","Altaria",14,9,0,0,2,2,2,2,0],' +
            '["349","Zangoose",0,-1,1,1,1,1,0,0,0],' +
            '["350","Seviper",7,-1,1,1,1,1,0,0,0],' +
            '["351","Lunatone",12,10,1,1,1,1,1,1,0],' +
            '["352","Solrock",12,10,1,1,1,1,1,1,0],' +
            '["353","Barboach",2,8,1,1,1,1,1,1,0],' +
            '["354","Whiscash",2,8,0,0,1,1,1,1,0],' +
            '["355","Corphish",2,-1,1,1,1,1,1,1,0],' +
            '["356","Crawdaunt",2,15,0,0,1,1,1,1,0],' +
            '["357","Baltoy",8,10,1,1,1,1,1,1,0],' +
            '["358","Claydol",8,10,0,0,1,1,1,1,0],' +
            '["359","Lileep",12,4,1,1,1,1,1,1,0],' +
            '["360","Cradily",12,4,0,0,1,1,1,1,0],' +
            '["361","Anorith",12,11,1,1,1,1,1,1,0],' +
            '["362","Armaldo",12,11,0,0,1,1,1,1,0],' +
            '["363","Feebas",2,-1,1,1,1,1,0,0,0],' +
            '["364","Milotic",2,-1,0,0,1,1,0,0,0],' +
            '["365s","Castform",1,-1,1,1,4,4,0,0,0],' +
            '["366","Kecleon",0,-1,1,1,1,1,0,0,0],' +
            '["367","Shuppet",13,-1,1,1,1,1,1,1,0],' +
            '["368-M","Banette",13,-1,0,0,2,2,2,2,0],' +
            '["369","Duskull",13,-1,1,1,1,1,1,1,1],' +
            '["370","Dusclops",13,-1,0,0,1,1,1,1,1],' +
            '["371","Dusknoir",13,-1,0,0,1,1,1,1,1],' +
            '["372","Tropius",4,9,1,1,1,1,0,0,0],' +
            '["373","Chingling",10,-1,1,1,1,1,0,0,0],' +
            '["374","Chimecho",10,-1,1,1,1,1,0,0,0],' +
            '["375-M","Absol",15,-1,1,1,2,2,2,2,0],' +
            '["376","Wynaut",10,-1,1,1,1,1,0,0,0],' +
            '["377","Wobbuffet",10,-1,1,1,1,1,0,0,0],' +
            '["378","Snorunt",5,-1,1,1,1,1,1,1,0],' +
            '["379","Glalie",5,-1,0,0,2,2,2,2,0],' +
            '["380","Froslass",5,13,0,0,1,1,1,1,0],' +
            '["381","Spheal",5,2,1,1,1,1,1,1,0],' +
            '["382","Sealeo",5,2,0,0,1,1,1,1,0],' +
            '["383","Walrein",5,2,0,0,1,1,1,1,0],' +
            '["384","Clamperl",2,-1,1,1,1,1,0,0,0],' +
            '["385","Huntail",2,-1,0,0,1,1,0,0,0],' +
            '["386","Gorebyss",2,-1,0,0,1,1,0,0,0],' +
            '["387","Relicanth",2,12,1,1,1,1,1,1,0],' +
            '["388","Luvdisc",2,-1,1,1,1,1,0,0,0],' +
            '["389","Bagon",14,-1,1,1,1,1,1,1,0],' +
            '["390","Shelgon",14,-1,0,0,1,1,1,1,0],' +
            '["391-M","Salamence",14,9,0,0,2,2,2,2,0],' +
            '["392","Beldum",16,10,1,1,1,1,1,1,0],' +
            '["393","Metang",16,10,0,0,1,1,1,1,0],' +
            '["394-M","Metagross",16,10,0,0,2,2,2,2,0],' +
            '["395","Regirock",12,-1,1,1,1,1,0,0,0],' +
            '["396","Regice",5,-1,1,1,1,1,0,0,0],' +
            '["397","Registeel",16,-1,1,1,1,1,0,0,0],' +
            '["398","Latias",14,10,1,1,2,2,0,0,0],' +
            '["399-M","Latios",14,10,1,1,2,2,0,0,0],' +
            '["400","Kyogre",2,-1,1,1,2,2,0,0,0],' +
            '["401","Groudon",8,-1,1,1,2,2,0,0,0],' +
            '["402","Rayquaza",14,9,1,1,2,2,0,0,0],' +
            '["403","Jirachi",16,10,1,1,1,1,0,0,0],' +
            '["404a","Deoxys",10,-1,1,1,4,4,0,0,0]],' +
            '"4":[["405","Turtwig",4,-1,1,1,1,1,1,1,0],' +
            '["406","Grotle",4,-1,0,0,1,1,1,1,0],' +
            '["407","Torterra",4,8,0,0,1,1,1,1,0],' +
            '["408","Chimchar",1,-1,1,1,1,1,1,1,0],' +
            '["409","Monferno",1,6,0,0,1,1,1,1,0],' +
            '["410","Infernape",1,6,0,0,1,1,1,1,0],' +
            '["411","Piplup",2,-1,1,1,1,1,1,1,0],' +
            '["412","Prinplup",2,-1,0,0,1,1,1,1,0],' +
            '["413","Empoleon",2,16,0,0,1,1,1,1,0],' +
            '["414","Starly",0,9,1,1,1,1,0,1,0],' +
            '["415","Staravia",0,9,0,0,1,1,0,1,0],' +
            '["416","Staraptor",0,9,0,0,1,1,0,1,0],' +
            '["417","Bidoof",0,-1,1,1,1,1,0,0,0],' +
            '["418","Bibarel",0,2,0,0,1,1,0,0,0],' +
            '["419","Kricketot",11,-1,1,1,1,1,0,0,0],' +
            '["420","Kricketune",11,-1,0,0,1,1,0,0,0],' +
            '["421","Shinx",3,-1,1,1,1,1,1,1,0],' +
            '["422","Luxio",3,-1,0,0,1,1,1,1,0],' +
            '["423","Luxray",3,-1,0,0,1,1,1,1,0],' +
            '["424","Budew",4,7,1,1,1,1,0,0,0],' +
            '["425","Roselia",4,7,1,1,1,1,0,0,0],' +
            '["426","Roserade",4,7,0,0,1,1,0,0,0],' +
            '["427","Cranidos",12,-1,1,1,1,1,1,1,0],' +
            '["428","Rampardos",12,-1,0,0,1,1,1,1,0],' +
            '["429","Shieldon",12,16,1,1,1,1,1,1,0],' +
            '["430","Bastiodon",12,16,0,0,1,1,1,1,0],' +
            '["431b","Burmy",11,-1,1,1,3,3,3,3,0],' +
            '["432c","Wormadam",11,8,0,0,3,3,3,3,0],' +
            '["433","Mothim",11,9,0,0,1,1,1,1,0],' +
            '["434","Combee",11,9,1,1,1,1,0,0,0],' +
            '["435","Vespiquen",11,9,0,0,1,1,1,0,0],' +
            '["436","Pachirisu",3,-1,1,1,1,1,1,1,0],' +
            '["437","Buizel",2,-1,1,1,1,1,0,0,0],' +
            '["438","Floatzel",2,-1,0,0,1,1,0,0,0],' +
            '["439","Cherubi",4,-1,1,1,1,1,0,0,0],' +
            '["440","Cherrim",4,-1,0,0,2,2,0,0,0],' +
            '["441b","Shellos",2,-1,1,1,2,2,2,2,0],' +
            '["442b","Gastrodon",2,8,0,0,2,2,2,2,0],' +
            '["443","Drifloon",13,9,1,1,1,1,1,1,0],' +
            '["444","Drifblim",13,9,0,0,1,1,1,1,0],' +
            '["445","Buneary",0,-1,1,1,1,1,1,1,0],' +
            '["446-M","Lopunny",0,6,0,0,2,2,2,2,0],' +
            '["447","Glameow",0,-1,1,1,1,1,1,1,0],' +
            '["448","Purugly",0,-1,0,0,1,1,1,1,0],' +
            '["449","Stunky",7,15,1,1,1,1,1,1,0],' +
            '["450","Skuntank",7,15,0,0,1,1,1,1,0],' +
            '["451","Bronzor",16,10,1,1,1,1,1,1,0],' +
            '["452","Bronzong",16,10,0,0,1,1,1,1,0],' +
            '["453","Happiny",0,-1,1,1,1,1,0,0,0],' +
            '["454","Chansey",0,-1,1,1,1,1,0,0,0],' +
            '["455","Blissey",0,-1,0,0,1,1,0,0,0],' +
            '["456","Chatot",0,9,1,1,1,1,0,0,0],' +
            '["457","Spiritomb",13,15,1,1,1,1,1,1,0],' +
            '["458","Gible",14,8,1,1,1,1,1,1,0],' +
            '["459","Gabite",14,8,0,0,1,1,1,1,0],' +
            '["460","Garchomp",14,8,0,0,2,2,2,2,0],' +
            '["461","Riolu",6,-1,1,1,1,1,1,1,0],' +
            '["462-M","Lucario",6,16,0,0,2,2,2,2,0],' +
            '["463","Hippopotas",8,-1,1,1,1,1,1,1,0],' +
            '["464","Hippowdon",8,-1,0,0,1,1,1,1,0],' +
            '["465","Skorupi",7,11,1,1,1,1,1,1,0],' +
            '["466","Drapion",7,15,0,0,1,1,1,1,0],' +
            '["467","Croagunk",7,6,1,1,1,1,1,1,0],' +
            '["468","Toxicroak",7,6,0,0,1,1,1,1,0],' +
            '["469","Carnivine",4,-1,1,1,1,1,0,0,0],' +
            '["470","Finneon",2,-1,1,1,1,1,0,0,0],' +
            '["471","Lumineon",2,-1,0,0,1,1,0,0,0],' +
            '["472","Mantyke",2,9,1,1,1,1,0,0,0],' +
            '["473","Mantine",2,9,1,1,1,1,0,0,0],' +
            '["474","Snover",5,4,1,1,1,1,1,1,0],' +
            '["475","Abomasnow",5,4,0,0,2,2,2,2,0],' +
            '["476","Porygon",0,-1,1,1,1,1,0,0,0],' +
            '["477","Porygon2",0,-1,0,0,1,1,0,0,0],' +
            '["478","Porygon-Z",0,-1,0,0,1,1,0,0,0],' +
            '["479e","Rotom",3,2,1,1,6,6,6,6,0],' +
            '["480","Uxie",10,-1,1,1,1,1,0,0,0],' +
            '["481","Mesprit",10,-1,1,1,1,1,0,0,0],' +
            '["482","Azelf",10,-1,1,1,1,1,0,0,0],' +
            '["483","Dialga",16,14,1,1,1,1,0,0,0],' +
            '["484","Palkia",2,14,1,1,1,1,0,0,0],' +
            '["485","Heatran",1,16,1,1,1,1,0,0,0],' +
            '["486","Regigigas",0,-1,1,1,1,1,0,0,0],' +
            '["487b","Giratina",13,14,1,1,2,2,0,0,0],' +
            '["488","Cresselia",10,-1,1,1,1,1,0,0,0],' +
            '["489","Phione",2,-1,1,1,1,1,0,0,0],' +
            '["490","Manaphy",2,-1,1,1,1,1,0,0,0],' +
            '["491","Darkrai",15,-1,1,1,1,1,0,0,0],' +
            '["492s","Shaymin",4,9,1,1,2,2,0,0,0],' +
            '["493j","Arceus",8,-1,1,1,18,18,0,0,0]],' +
            '"5":[["494","Victini",10,1,1,1,1,1,0,0,0],' +
            '["495","Snivy",4,-1,1,1,1,1,0,0,0],' +
            '["496","Servine",4,-1,0,0,1,1,0,0,0],' +
            '["497","Serperior",4,-1,0,0,1,1,0,0,0],' +
            '["498","Tepig",1,-1,1,1,1,1,1,1,0],' +
            '["499","Pignite",1,6,0,0,1,1,1,1,0],' +
            '["500","Emboar",1,6,0,0,1,1,1,1,0],' +
            '["501","Oshawott",2,-1,1,1,1,1,0,0,0],' +
            '["502","Dewott",2,-1,0,0,1,1,0,0,0],' +
            '["503","Samurott",2,-1,0,0,1,1,0,0,0],' +
            '["504","Patrat",0,-1,1,1,1,1,0,0,0],' +
            '["505","Watchog",0,-1,0,0,1,1,0,0,0],' +
            '["506","Lillipup",0,-1,1,1,1,1,0,0,0],' +
            '["507","Herdier",0,-1,0,0,1,1,0,0,0],' +
            '["508","Stoutland",0,-1,0,0,1,1,0,0,0],' +
            '["509","Purrloin",15,-1,1,1,1,1,1,1,0],' +
            '["510","Liepard",15,-1,0,0,1,1,1,1,0],' +
            '["511","Pansage",4,-1,1,1,1,1,0,0,0],' +
            '["512","Simisage",4,-1,0,0,1,1,0,0,0],' +
            '["513","Pansear",1,-1,1,1,1,1,1,1,0],' +
            '["514","Simisear",1,-1,0,0,1,1,1,1,0],' +
            '["515","Panpour",2,-1,1,1,1,1,0,0,0],' +
            '["516","Simipour",2,-1,0,0,1,1,0,0,0],' +
            '["517","Munna",10,-1,1,1,1,1,0,0,0],' +
            '["518","Musharna",10,-1,0,0,1,1,0,0,0],' +
            '["519","Pidove",0,9,1,1,1,1,1,0,0],' +
            '["520","Tranquill",0,9,0,0,1,1,1,0,0],' +
            '["521","Unfezant",0,9,0,0,1,1,1,0,0],' +
            '["522","Blitzle",3,-1,1,1,1,1,1,1,0],' +
            '["523","Zebstrika",3,-1,0,0,1,1,1,1,0],' +
            '["524","Roggenrola",12,-1,1,1,1,1,1,1,0],' +
            '["525","Boldore",12,-1,0,0,1,1,1,1,0],' +
            '["526","Gigalith",12,-1,0,0,1,1,1,1,0],' +
            '["527","Woobat",10,9,1,1,1,1,0,0,0],' +
            '["528","Swoobat",10,9,0,0,1,1,0,0,0],' +
            '["529","Drilbur",8,-1,1,1,1,1,1,1,0],' +
            '["530","Excadrill",8,16,0,0,1,1,1,1,0],' +
            '["531-M","Audino",0,17,1,1,2,2,0,0,0],' +
            '["532","Timburr",6,-1,1,1,1,1,1,1,0],' +
            '["533","Gurdurr",6,-1,0,0,1,1,1,1,0],' +
            '["534","Conkeldurr",6,-1,0,0,1,1,1,1,0],' +
            '["535","Tympole",2,-1,1,1,1,1,1,1,0],' +
            '["536","Palpitoad",2,8,0,0,1,1,1,1,0],' +
            '["537","Seismitoad",2,8,0,0,1,1,1,1,0],' +
            '["538","Throh",6,-1,1,1,1,1,1,1,0],' +
            '["539","Sawk",6,-1,1,1,1,1,1,1,0],' +
            '["540","Sewaddle",11,4,1,1,1,1,0,0,0],' +
            '["541","Swadloon",11,4,0,0,1,1,0,0,0],' +
            '["542","Leavanny",11,4,0,0,1,1,0,0,0],' +
            '["543","Venipede",11,7,1,1,1,1,0,0,0],' +
            '["544","Whirlipede",11,7,0,0,1,1,0,0,0],' +
            '["545","Scolipede",11,7,0,0,1,1,0,0,0],' +
            '["546","Cottonee",4,17,1,1,1,1,1,1,0],' +
            '["547","Whimsicott",4,17,0,0,1,1,1,1,0],' +
            '["548","Petilil",4,-1,1,1,1,1,0,0,0],' +
            '["549","Lilligant",4,-1,0,0,1,1,0,0,0],' +
            '["550b","Basculin",2,-1,1,1,2,2,0,0,0],' +
            '["551","Sandile",8,15,1,1,1,1,1,1,0],' +
            '["552","Krokorok",8,15,0,0,1,1,1,1,0],' +
            '["553","Krookodile",8,15,0,0,1,1,1,1,0],' +
            '["554r8","Darumaka",5,-1,2,2,2,2,2,2,0],' +
            '["555","Darmanitan",1,-1,0,0,4,4,4,4,0],' +
            '["556","Maractus",4,-1,1,1,1,1,0,0,0],' +
            '["557","Dwebble",11,12,1,1,1,1,1,1,0],' +
            '["558","Crustle",11,12,0,0,1,1,1,1,0],' +
            '["559","Scraggy",15,6,1,1,1,1,1,1,0],' +
            '["560","Scrafty",15,6,0,0,1,1,1,1,0],' +
            '["561","Sigilyph",10,9,1,1,1,1,0,0,0],' +
            '["562r8","Yamask",8,13,2,2,2,2,2,2,0],' +
            '["563","Cofagrigus",13,-1,0,0,1,1,1,1,0],' +
            '["564","Tirtouga",2,12,1,1,1,1,1,1,0],' +
            '["565","Carracosta",2,12,0,0,1,1,1,1,0],' +
            '["566","Archen",12,9,1,1,1,1,1,1,0],' +
            '["567","Archeops",12,9,0,0,1,1,1,1,0],' +
            '["568","Trubbish",7,-1,1,1,1,1,0,0,0],' +
            '["569","Garbodor",7,-1,0,0,1,1,0,0,0],' +
            '["570","Zorua",15,-1,1,1,1,1,1,1,0],' +
            '["571","Zoroark",15,-1,0,0,1,1,1,1,0],' +
            '["572","Minccino",0,-1,1,1,1,1,0,0,0],' +
            '["573","Cinccino",0,-1,0,0,1,1,0,0,0],' +
            '["574","Gothita",10,-1,1,1,1,1,0,1,0],' +
            '["575","Gothorita",10,-1,0,0,1,1,0,0,0],' +
            '["576","Gothitelle",10,-1,0,0,1,1,0,0,0],' +
            '["577","Solosis",10,-1,1,1,1,1,0,0,0],' +
            '["578","Duosion",10,-1,0,0,1,1,0,0,0],' +
            '["579","Reuniclus",10,-1,0,0,1,1,0,0,0],' +
            '["580","Ducklett",2,9,1,1,1,1,0,0,0],' +
            '["581","Swanna",2,9,0,0,1,1,0,0,0],' +
            '["582","Vanillite",5,-1,1,1,1,1,1,1,0],' +
            '["583","Vanillish",5,-1,0,0,1,1,1,1,0],' +
            '["584","Vanilluxe",5,-1,0,0,1,1,1,1,0],' +
            '["585","Deerling",0,4,1,1,1,1,0,0,0],' +
            '["586","Sawsbuck",0,4,0,0,1,1,0,0,0],' +
            '["587","Emolga",3,9,1,1,1,1,1,1,0],' +
            '["588","Karrablast",11,-1,1,1,1,1,1,1,0],' +
            '["589","Escavalier",11,16,0,0,1,1,1,1,0],' +
            '["590","Foongus",4,7,1,1,1,1,0,0,0],' +
            '["591","Amoonguss",4,7,0,0,1,1,0,0,0],' +
            '["592","Frillish",2,13,1,1,1,1,1,1,0],' +
            '["593","Jellicent",2,13,0,0,1,1,1,1,0],' +
            '["594","Alomomola",2,-1,1,1,1,1,0,0,0],' +
            '["595","Joltik",11,3,1,1,1,1,1,1,0],' +
            '["596","Galvantula",11,3,0,0,1,1,1,1,0],' +
            '["597","Ferroseed",4,16,1,1,1,1,1,1,0],' +
            '["598","Ferrothorn",4,16,0,0,1,1,1,1,0],' +
            '["599","Klink",16,-1,1,1,1,1,1,1,0],' +
            '["600","Klang",16,-1,0,0,1,1,1,1,0],' +
            '["601","Klinklang",16,-1,0,0,1,1,1,1,0],' +
            '["602","Tynamo",3,-1,1,1,1,1,1,1,0],' +
            '["603","Eelektrik",3,-1,0,0,1,1,1,1,0],' +
            '["604","Eelektross",3,-1,0,0,1,1,1,1,0],' +
            '["605","Elgyem",10,-1,1,1,1,1,0,0,0],' +
            '["606","Beheeyem",10,-1,0,0,1,1,0,0,0],' +
            '["607","Litwick",13,1,1,1,1,1,1,1,0],' +
            '["608","Lampent",13,1,0,0,1,1,1,1,0],' +
            '["609","Chandelure",13,1,0,0,1,1,1,1,0],' +
            '["610","Axew",14,-1,1,1,1,1,1,1,0],' +
            '["611","Fraxure",14,-1,0,0,1,1,1,1,0],' +
            '["612","Haxorus",14,-1,0,0,1,1,1,1,0],' +
            '["613","Cubchoo",5,-1,1,1,1,1,1,1,0],' +
            '["614","Beartic",5,-1,0,0,1,1,1,1,0],' +
            '["615","Cryogonal",5,-1,1,1,1,1,1,1,0],' +
            '["616","Shelmet",11,-1,1,1,1,1,0,0,0],' +
            '["617","Accelgor",11,-1,0,0,1,1,0,0,0],' +
            '["618r8","Stunfisk",8,16,2,2,2,2,2,2,0],' +
            '["619","Mienfoo",6,-1,1,1,1,1,1,1,0],' +
            '["620","Mienshao",6,-1,0,0,1,1,1,1,0],' +
            '["621","Druddigon",14,-1,1,1,1,1,1,1,0],' +
            '["622","Golett",8,13,1,1,1,1,1,1,0],' +
            '["623","Golurk",8,13,0,0,1,1,1,1,0],' +
            '["624","Pawniard",15,16,1,1,1,1,1,1,0],' +
            '["625","Bisharp",15,16,0,0,1,1,1,1,0],' +
            '["626","Bouffalant",0,-1,1,1,1,1,0,0,0],' +
            '["627","Rufflet",0,9,1,1,1,1,0,0,0],' +
            '["628","Braviary",0,9,0,0,1,1,0,0,0],' +
            '["629","Vullaby",15,9,1,1,1,1,1,1,0],' +
            '["630","Mandibuzz",15,9,0,0,1,1,1,1,0],' +
            '["631","Heatmor",1,-1,1,1,1,1,1,1,0],' +
            '["632","Durant",11,16,1,1,1,1,1,1,0],' +
            '["633","Deino",15,14,1,1,1,1,1,1,0],' +
            '["634","Zweilous",15,14,0,0,1,1,1,1,0],' +
            '["635","Hydreigon",15,14,0,0,1,1,1,1,0],' +
            '["636","Larvesta",11,1,1,1,1,1,1,1,0],' +
            '["637","Volcarona",11,1,0,0,1,1,1,1,0],' +
            '["638","Cobalion",16,6,1,1,1,1,0,0,0],' +
            '["639","Terrakion",12,6,1,1,1,1,0,0,0],' +
            '["640","Virizion",4,6,1,1,1,1,0,0,0],' +
            '["641","Tornadus",9,-1,1,1,2,2,0,0,0],' +
            '["642","Thundurus",3,9,1,1,2,2,0,0,0],' +
            '["643","Reshiram",14,1,1,1,1,1,0,0,0],' +
            '["644","Zekrom",14,3,1,1,1,1,0,0,0],' +
            '["645","Landorus",8,9,1,1,2,2,0,0,0],' +
            '["646z","Kyurem",14,5,1,1,3,3,0,0,0],' +
            '["647","Keldeo",2,6,1,1,2,2,0,0,0],' +
            '["648","Meloetta",0,10,1,1,2,2,0,0,0],' +
            '["649c","Genesect",11,16,1,1,5,5,0,0,0]],' +
            '"6":[["650","Chespin",4,-1,1,1,1,1,1,1,0],' +
            '["651","Quilladin",4,-1,0,0,1,1,1,1,0],' +
            '["652","Chesnaught",4,6,0,0,1,1,1,1,0],' +
            '["653","Fennekin",1,-1,1,1,1,1,1,1,0],' +
            '["654","Braixen",1,-1,0,0,1,1,1,1,0],' +
            '["655","Delphox",1,10,0,0,1,1,1,1,0],' +
            '["656","Froakie",2,-1,1,1,1,1,1,1,0],' +
            '["657","Frogadier",2,-1,0,0,1,1,1,1,0],' +
            '["658","Greninja",2,15,0,0,1,1,1,1,0],' +
            '["659","Bunnelby",0,-1,1,1,1,1,1,1,0],' +
            '["660","Diggersby",0,8,0,0,1,1,1,1,0],' +
            '["661","Fletchling",0,9,1,1,1,1,1,1,0],' +
            '["662","Fletchinder",1,9,0,0,1,1,1,1,0],' +
            '["663","Talonflame",1,9,0,0,1,1,1,1,0],' +
            '["664","Scatterbug",11,-1,1,1,1,1,0,1,0],' +
            '["665","Spewpa",11,-1,0,0,1,1,0,0,0],' +
            '["666","Vivillon",11,9,0,0,1,1,0,0,0],' +
            '["667","Litleo",1,0,1,1,1,1,1,1,0],' +
            '["668","Pyroar",1,0,0,0,1,1,1,1,0],' +
            '["669","Flab\u00e9b\u00e9",17,-1,1,1,1,1,1,1,0],' +
            '["670","Floette",17,-1,0,0,1,1,1,1,0],' +
            '["671","Florges",17,-1,0,0,1,1,1,1,0],' +
            '["672","Skiddo",4,-1,1,1,1,1,0,0,0],' +
            '["673","Gogoat",4,-1,0,0,1,1,0,0,0],' +
            '["674","Pancham",6,-1,1,1,1,1,1,1,0],' +
            '["675","Pangoro",6,15,0,0,1,1,1,1,0],' +
            '["676","Furfrou",0,-1,1,1,1,1,0,0,0],' +
            '["677","Espurr",10,-1,1,1,1,1,0,0,0],' +
            '["678","Meowstic",10,-1,0,0,1,1,0,0,0],' +
            '["679","Honedge",16,13,1,1,1,1,1,1,0],' +
            '["680","Doublade",16,13,0,0,1,1,1,1,0],' +
            '["681","Aegislash",16,13,0,0,2,2,2,2,0],' +
            '["682","Spritzee",17,-1,1,1,1,1,1,1,0],' +
            '["683","Aromatisse",17,-1,0,0,1,1,1,1,0],' +
            '["684","Swirlix",17,-1,1,1,1,1,1,1,0],' +
            '["685","Slurpuff",17,-1,0,0,1,1,1,1,0],' +
            '["686","Inkay",15,10,1,1,1,1,1,1,0],' +
            '["687","Malamar",15,10,0,0,1,1,1,1,0],' +
            '["688","Binacle",12,2,1,1,1,1,1,1,0],' +
            '["689","Barbaracle",12,2,0,0,1,1,1,1,0],' +
            '["690","Skrelp",7,2,1,1,1,1,1,1,0],' +
            '["691","Dragalge",7,14,0,0,1,1,1,1,0],' +
            '["692","Clauncher",2,-1,1,1,1,1,0,0,0],' +
            '["693","Clawitzer",2,-1,0,0,1,1,0,0,0],' +
            '["694","Helioptile",3,0,1,1,1,1,1,1,0],' +
            '["695","Heliolisk",3,0,0,0,1,1,1,1,0],' +
            '["696","Tyrunt",12,14,1,1,1,1,1,1,0],' +
            '["697","Tyrantrum",12,14,0,0,1,1,1,1,0],' +
            '["698","Amaura",12,5,1,1,1,1,1,1,0],' +
            '["699","Aurorus",12,5,0,0,1,1,1,1,0],' +
            '["700","Hawlucha",6,9,1,1,1,1,1,1,0],' +
            '["701","Dedenne",3,17,1,1,1,1,1,1,0],' +
            '["702","Carbink",12,17,1,1,1,1,1,1,0],' +
            '["703","Goomy",14,-1,1,1,1,1,1,1,0],' +
            '["704","Sliggoo",14,-1,0,0,1,1,1,1,0],' +
            '["705","Goodra",14,-1,0,0,1,1,1,1,0],' +
            '["706","Klefki",16,17,1,1,1,1,1,1,1],' +
            '["707","Phantump",13,4,1,1,1,1,1,1,0],' +
            '["708","Trevenant",13,4,0,0,1,1,1,1,0],' +
            '["709s3","Pumpkaboo",13,4,1,1,4,4,4,4,0],' +
            '["710s3","Gourgeist",13,4,0,0,4,4,4,4,0],' +
            '["711","Bergmite",5,-1,1,1,1,1,1,1,0],' +
            '["712","Avalugg",5,-1,0,0,1,1,1,1,0],' +
            '["713","Noibat",9,14,1,1,1,1,1,1,0],' +
            '["714","Noivern",9,14,0,0,1,1,1,1,0],' +
            '["715","Xerneas",17,-1,1,1,1,1,0,0,0],' +
            '["716","Yveltal",15,9,1,1,1,1,0,0,0],' +
            '["717c","Zygarde",14,8,1,1,4,4,0,0,0],' +
            '["718","Diancie",12,17,1,1,2,2,0,0,0],' +
            '["719","Hoopa",10,13,1,1,2,2,0,0,0],' +
            '["720","Volcanion",1,2,1,1,1,1,0,0,0]],' +
            '"7":[["721","Rowlet",4,9,1,1,1,1,1,1,0],' +
            '["722","Dartrix",4,9,0,0,1,1,1,1,0],' +
            '["723","Decidueye",4,13,0,0,1,1,1,1,0],' +
            '["724","Litten",1,-1,1,1,1,1,1,1,0],' +
            '["725","Torracat",1,-1,0,0,1,1,1,1,0],' +
            '["726","Incineroar",1,15,0,0,1,1,1,1,0],' +
            '["727","Popplio",2,-1,1,1,1,1,1,1,0],' +
            '["728","Brionne",2,-1,0,0,1,1,1,1,0],' +
            '["729","Primarina",2,17,0,0,1,1,1,1,0],' +
            '["730","Pikipek",0,9,1,1,1,1,0,0,0],' +
            '["731","Trumbeak",0,9,0,0,1,1,0,0,0],' +
            '["732","Toucannon",0,9,0,0,1,1,0,0,0],' +
            '["733","Yungoos",0,-1,1,1,1,1,0,0,0],' +
            '["734","Gumshoos",0,-1,0,0,2,2,0,0,0],' +
            '["735","Grubbin",11,-1,1,1,1,1,1,1,0],' +
            '["736","Charjabug",11,3,0,0,1,1,1,1,0],' +
            '["737t","Vikavolt",11,3,0,0,2,2,2,2,0],' +
            '["738","Crabrawler",6,-1,1,1,1,1,1,1,0],' +
            '["739","Crabominable",6,5,0,0,1,1,1,1,0],' +
            '["740d","Oricorio",13,9,1,1,4,4,0,0,0],' +
            '["741","Cutiefly",11,17,1,1,1,1,1,1,0],' +
            '["742","Ribombee",11,17,0,0,2,2,2,2,0],' +
            '["743","Rockruff",12,-1,1,1,1,1,1,1,0],' +
            '["744c","Lycanroc",12,-1,0,0,3,3,3,3,0],' +
            '["745t","Wishiwashi",2,-1,1,1,3,3,0,0,0],' +
            '["746","Mareanie",7,2,1,1,1,1,0,0,0],' +
            '["747","Toxapex",7,2,0,0,1,1,0,0,0],' +
            '["748","Mudbray",8,-1,1,1,1,1,1,1,0],' +
            '["749","Mudsdale",8,-1,0,0,1,1,1,1,0],' +
            '["750","Dewpider",2,11,1,1,1,1,0,0,0],' +
            '["751","Araquanid",2,11,0,0,2,2,0,0,0],' +
            '["752","Fomantis",4,-1,1,1,1,1,0,0,0],' +
            '["753","Lurantis",4,-1,0,0,2,2,0,0,0],' +
            '["754","Morelull",4,17,1,1,1,1,1,1,0],' +
            '["755","Shiinotic",4,17,0,0,1,1,1,1,0],' +
            '["756","Salandit",7,1,1,1,1,1,1,1,0],' +
            '["757","Salazzle",7,1,0,0,2,2,2,2,0],' +
            '["758","Stufful",0,6,1,1,1,1,1,1,0],' +
            '["759","Bewear",0,6,0,0,1,1,1,1,0],' +
            '["760","Bounsweet",4,-1,1,1,1,1,0,0,0],' +
            '["761","Steenee",4,-1,0,0,1,1,0,0,0],' +
            '["762","Tsareena",4,-1,0,0,1,1,0,0,0],' +
            '["763","Comfey",17,-1,1,1,1,1,1,1,0],' +
            '["764","Oranguru",0,10,1,1,1,1,0,1,0],' +
            '["765","Passimian",6,-1,1,1,1,1,1,1,0],' +
            '["766","Wimpod",11,2,1,1,1,1,0,0,0],' +
            '["767","Golisopod",11,2,0,0,1,1,0,0,0],' +
            '["768","Sandygast",13,8,1,1,1,1,1,1,0],' +
            '["769","Palossand",13,8,0,0,1,1,1,1,0],' +
            '["770","Pyukumuku",2,-1,1,1,1,1,0,0,0],' +
            '["771","Type: Null",0,-1,1,1,1,1,0,0,0],' +
            '["772q","Silvally",17,-1,0,0,18,18,0,0,0],' +
            '["773","Minior",12,9,1,1,2,2,2,2,0],' +
            '["774","Komala",0,-1,1,1,1,1,0,0,0],' +
            '["775","Turtonator",1,14,1,1,1,1,1,1,0],' +
            '["776","Togedemaru",3,16,1,1,2,2,2,2,0],' +
            '["777","Mimikyu",13,17,1,1,2,2,2,2,0],' +
            '["778","Bruxish",2,10,1,1,1,1,0,0,0],' +
            '["779","Drampa",0,14,1,1,1,1,1,1,0],' +
            '["780","Dhelmise",13,4,1,1,1,1,1,1,0],' +
            '["781","Jangmo-o",14,-1,1,1,1,1,1,1,0],' +
            '["782","Hakamo-o",14,6,0,0,1,1,1,1,0],' +
            '["783","Kommo-o",14,6,0,0,2,2,2,2,0],' +
            '["784","Tapu Koko",3,17,1,1,1,1,0,0,0],' +
            '["785","Tapu Lele",10,17,1,1,1,1,0,0,0],' +
            '["786","Tapu Bulu",4,17,1,1,1,1,0,0,0],' +
            '["787","Tapu Fini",2,17,1,1,1,1,0,0,0],' +
            '["788","Cosmog",10,-1,1,1,1,1,0,0,0],' +
            '["789","Cosmoem",10,-1,0,0,1,1,0,0,0],' +
            '["790","Solgaleo",10,16,0,0,1,1,0,0,0],' +
            '["791","Lunala",10,13,0,0,1,1,0,0,0],' +
            '["792","Nihilego",12,7,1,1,1,1,0,0,0],' +
            '["793","Buzzwole",11,6,1,1,1,1,0,0,0],' +
            '["794","Pheromosa",11,6,1,1,1,1,0,0,0],' +
            '["795","Xurkitree",3,-1,1,1,1,1,0,0,0],' +
            '["796","Celesteela",16,9,1,1,1,1,0,0,0],' +
            '["797","Kartana",4,16,1,1,1,1,0,0,0],' +
            '["798","Guzzlord",15,14,1,1,1,1,0,0,0],' +
            '["799","Poipole",7,-1,1,1,1,1,0,0,0],' +
            '["800","Naganadel",7,14,0,0,1,1,0,0,0],' +
            '["801","Stakataka",12,16,1,1,1,1,0,0,0],' +
            '["802","Blacephalon",1,13,1,1,1,1,0,0,0],' +
            '["803s","Necrozma",10,16,1,1,4,4,0,0,0],' +
            '["804","Magearna",16,17,1,1,1,1,0,0,0],' +
            '["805","Marshadow",6,13,1,1,1,1,0,0,0],' +
            '["806","Zeraora",3,-1,1,1,1,1,0,0,0],' +
            '["807","Meltan",16,-1,1,1,1,1,0,1,0],' +
            '["808","Melmetal",16,-1,0,0,1,1,0,0,0]],' +
            '"8":[["809","Grookey",4,-1,1,1,1,1,0,0,0],' +
            '["810","Thwackey",4,-1,0,0,1,1,0,0,0],' +
            '["811","Rillaboom",4,-1,0,0,1,1,0,0,0],' +
            '["812","Scorbunny",1,-1,1,1,1,1,1,1,0],' +
            '["813","Raboot",1,-1,0,0,1,1,1,1,0],' +
            '["814","Cinderace",1,-1,0,0,1,1,1,1,0],' +
            '["815","Sobble",2,-1,1,1,1,1,0,0,0],' +
            '["816","Drizzile",2,-1,0,0,1,1,0,0,0],' +
            '["817","Inteleon",2,-1,0,0,1,1,0,0,0],' +
            '["818","Skwovet",0,-1,1,1,1,1,0,0,0],' +
            '["819","Greedent",0,-1,0,0,1,1,0,0,0],' +
            '["820","Rookidee",9,-1,1,1,1,1,1,1,0],' +
            '["821","Corvisquire",9,-1,0,0,1,1,1,1,0],' +
            '["822","Corviknight",9,16,0,0,1,1,1,1,0],' +
            '["823","Blipbug",11,-1,1,1,1,1,0,0,0],' +
            '["824","Dottler",11,10,0,0,1,1,0,0,0],' +
            '["825","Orbeetle",11,10,0,0,1,1,0,0,0],' +
            '["826","Nickit",15,-1,1,1,1,1,1,1,0],' +
            '["827","Thievul",15,-1,0,0,1,1,1,1,0],' +
            '["828","Gossifleur",4,-1,1,1,1,1,0,0,0],' +
            '["829","Eldegoss",4,-1,0,0,1,1,0,0,0],' +
            '["830","Wooloo",0,-1,1,1,1,1,0,0,0],' +
            '["831","Dubwool",0,-1,0,0,1,1,0,0,0],' +
            '["832","Chewtle",2,-1,1,1,1,1,1,1,0],' +
            '["833","Drednaw",2,12,0,0,1,1,1,1,0],' +
            '["834","Yamper",3,-1,1,1,1,1,1,1,0],' +
            '["835","Boltund",3,-1,0,0,1,1,1,1,0],' +
            '["836","Rolycoly",12,-1,1,1,1,1,1,1,0],' +
            '["837","Carkol",12,1,0,0,1,1,1,1,0],' +
            '["838","Coalossal",12,1,0,0,1,1,1,1,0],' +
            '["839","Applin",4,14,1,1,1,1,1,1,0],' +
            '["840","Flapple",4,14,0,0,1,1,1,1,0],' +
            '["841","Appletun",4,14,0,0,1,1,1,1,0],' +
            '["842","Silicobra",8,-1,1,1,1,1,1,1,0],' +
            '["843","Sandaconda",8,-1,0,0,1,1,1,1,0],' +
            '["844c","Cramorant",9,2,1,1,3,3,0,0,0],' +
            '["845","Arrokuda",2,-1,1,1,1,1,0,0,0],' +
            '["846","Barraskewda",2,-1,0,0,1,1,0,0,0],' +
            '["847","Toxel",3,7,1,1,1,1,1,1,0],' +
            '["848","Toxtricity",3,7,0,0,2,2,2,2,0],' +
            '["849","Sizzlipede",1,11,1,1,1,1,1,1,0],' +
            '["850","Centiskorch",1,11,0,0,1,1,1,1,0],' +
            '["851","Clobbopus",6,-1,1,1,1,1,1,1,0],' +
            '["852","Grapploct",6,-1,0,0,1,1,1,1,0],' +
            '["853","Sinistea",13,-1,1,1,1,1,1,1,0],' +
            '["854","Polteageist",13,-1,0,0,1,1,1,1,0],' +
            '["855","Hatenna",10,-1,1,1,1,1,1,1,0],' +
            '["856","Hattrem",10,-1,0,0,1,1,1,1,0],' +
            '["857","Hatterene",10,17,0,0,1,1,1,1,0],' +
            '["858","Impidimp",15,17,1,1,1,1,1,1,0],' +
            '["859","Morgrem",15,17,0,0,1,1,1,1,0],' +
            '["860","Grimmsnarl",15,17,0,0,1,1,1,1,0],' +
            '["861","Obstagoon",15,0,0,0,1,1,1,1,0],' +
            '["862","Perrserker",16,-1,0,0,1,1,1,1,0],' +
            '["863","Cursola",13,-1,0,0,1,1,1,1,0],' +
            '["864","Sirfetch\'d",6,-1,0,0,1,1,1,1,0],' +
            '["865","Mr. Rime",5,10,0,0,1,1,1,1,0],' +
            '["866","Runerigus",8,13,0,0,1,1,1,1,0],' +
            '["867","Milcery",17,-1,1,1,1,1,1,1,0],' +
            '["868","Alcremie",17,-1,0,0,1,1,1,1,0],' +
            '["869","Falinks",6,-1,1,1,1,1,1,1,1],' +
            '["870","Pincurchin",3,-1,1,1,1,1,1,1,0],' +
            '["871","Snom",5,11,1,1,1,1,1,1,0],' +
            '["872","Frosmoth",5,11,0,0,1,1,1,1,0],' +
            '["873","Stonjourner",12,-1,1,1,1,1,1,1,0],' +
            '["874","Eiscue",5,-1,1,1,2,2,2,2,0],' +
            '["875","Indeedee",10,0,1,1,2,2,0,0,0],' +
            '["876","Morpeko",3,15,1,1,2,2,2,2,0],' +
            '["877","Cufant",16,-1,1,1,1,1,1,1,0],' +
            '["878","Copperajah",16,-1,0,0,1,1,1,1,0],' +
            '["879","Dracozolt",3,14,1,1,1,1,1,1,0],' +
            '["880","Arctozolt",3,5,1,1,1,1,1,1,0],' +
            '["881","Dracovish",2,14,1,1,1,1,1,1,0],' +
            '["882","Arctovish",2,5,1,1,1,1,1,1,0],' +
            '["883","Duraludon",16,14,1,1,1,1,1,1,0],' +
            '["884","Dreepy",14,13,1,1,1,1,1,1,0],' +
            '["885","Drakloak",14,13,0,0,1,1,1,1,0],' +
            '["886","Dragapult",14,13,0,0,1,1,1,1,0],' +
            '["887","Zacian",17,-1,1,1,2,2,0,0,0],' +
            '["888","Zamazenta",6,-1,1,1,2,2,0,0,0],' +
            '["889","Eternatus",7,14,1,1,1,1,0,0,0]],' +
            '"97":[["000a1","Lunupine",15,-1,1,1,1,1,0,0,0],' +
            '["000-L","Lunupine/Mega Forme Q",15,17,0,0,1,1,0,0,0],' +
            '["000a2","Blophin",2,-1,1,1,1,1,0,0,0],' +
            '["000a3","Inflale",2,-1,0,0,1,1,0,0,0],' +
            '["000a4","Orkit",2,-1,1,1,1,1,0,0,0],' +
            '["000a6","Orcalot",2,16,0,0,1,1,0,0,0],' +
            '["000a7","Faemue\u00f1o",17,9,1,1,1,1,0,0,0],' +
            '["000a8","Faemilar\u00edn",17,9,0,0,1,1,0,0,0],' +
            '["000a9","Faem\u00edsimo",17,9,0,0,1,1,0,0,0],' +
            '["000aa","Wagell",7,17,1,1,1,1,0,0,0],' +
            '["000ab","Wanamangora",7,17,0,0,1,1,0,0,0],' +
            '["000ac","Gosold",0,9,1,1,1,1,0,0,0],' +
            '["000ad","Goldesem",10,9,0,0,1,1,0,0,0],' +
            '["000ae","Impyre",15,-1,1,1,1,1,0,0,0],' +
            '["000af","Baflammet",15,1,0,0,1,1,0,0,0],' +
            '["000ag","Searene",14,2,1,1,1,1,0,0,0],' +
            '["000ah","Solynx",1,-1,1,1,1,1,0,0,0],' +
            '["000-S","Solynx/Mega Forme Q",1,3,0,0,1,1,0,0,0],' +
            '["000ai","Ardik",5,-1,1,1,1,1,0,0,0],' +
            '["000aj","Sibex",5,-1,0,0,1,1,0,0,0],' +
            '["000ak","Boxaby",12,6,1,1,1,1,0,0,0],' +
            '["000al","Kangspar",12,6,0,0,1,1,0,0,0],' +
            '["000-X","Kangspar/Mega Forme Q",12,6,0,0,1,1,0,0,0],' +
            '["000am","Bunbori",5,17,1,1,1,1,0,0,0],' +
            '["000-B","Bunbori/Mega Forme Q",5,17,0,0,1,1,0,0,0],' +
            '["000an","Taiveret",4,-1,1,1,1,1,0,0,0],' +
            '["000ao","Taipaeus",4,-1,0,0,1,1,0,0,0],' +
            '["000ap","Taimorpha",4,6,0,0,1,1,0,0,0],' +
            '["000aq","Flarbat",1,9,1,1,1,1,0,0,0],' +
            '["000ar","Flarotis",1,17,0,0,1,1,0,0,0],' +
            '["000as","Flaroptera",1,17,0,0,1,1,0,0,0],' +
            '["000at","Hydrark",2,-1,1,1,1,1,0,0,0],' +
            '["000au","Hydrinus",2,-1,0,0,1,1,0,0,0],' +
            '["000av","Hydrinifor",2,16,0,0,1,1,0,0,0],' +
            '["000aw","Gragon",13,14,1,1,1,1,0,0,0],' +
            '["000ay","Greegon",13,14,0,0,1,1,0,0,0],' +
            '["000az","Avaragon",13,14,0,0,1,1,0,0,0],' +
            '["000b0","Kinaster",15,1,1,1,1,1,0,0,0],' +
            '["000b1","Luckoo",4,9,1,1,1,1,0,0,0],' +
            '["000b2","Peckoo",4,9,0,0,1,1,0,0,0],' +
            '["000b3","Peekoo",4,10,0,0,1,1,0,0,0],' +
            '["000b4","Arasprit",8,-1,1,1,1,1,0,0,0],' +
            '["000b5","Arthreux",8,11,0,0,1,1,0,0,0],' +
            '["000b6","Quetzephyr",3,9,1,1,1,1,0,0,0],' +
            '["000b7","Quetzaptyl",3,9,0,0,1,1,0,0,0],' +
            '["000b8","Pixrine",12,17,1,1,1,1,0,0,0],' +
            '["000b9","Kitsunari",10,-1,1,1,1,1,0,0,0],' +
            '["000ba","Kitsubuki",10,13,0,0,1,1,0,0,0],' +
            '["000bb","Kryptik",12,13,1,1,1,1,0,0,0],' +
            '["000bc","Bandicoon",0,15,1,1,1,1,0,0,0],' +
            '["000bd","Phastix",11,-1,1,1,1,1,0,0,0],' +
            '["000be","Phasmaleef/Forest Forme",11,-1,0,0,1,1,0,0,0],' +
            '["000bf","Phasmaleef/Desert Forme",11,-1,0,0,1,1,0,0,0],' +
            '["000bg","Pasovan",0,-1,1,1,1,1,0,0,0],' +
            '["000bh","Glaquine",5,-1,1,1,1,1,0,0,0],' +
            '["000bi","Cavallost",5,-1,0,0,1,1,0,0,0],' +
            '["000bk","Minibbit",16,-1,1,1,1,1,0,0,0],' +
            '["000bl","Metabbit",16,-1,0,0,1,1,0,0,0],' +
            '["000bm","Terabbit",16,-1,0,0,1,1,0,0,0],' +
            '["000bn","Tillink",8,-1,1,1,1,1,0,0,0],' +
            '["000bo","Terrink",8,-1,0,0,1,1,0,0,0],' +
            '["000bp","Bezerell",2,15,1,1,1,1,0,0,0],' +
            '["000bq","Bezermuur",2,15,0,0,1,1,0,0,0],' +
            '["000br","Bezermuut",2,15,0,0,1,1,0,0,0],' +
            '["000bt","Ayeren",0,10,1,1,1,1,0,0,0],' +
            '["000bu","Aytheraye",0,13,0,0,1,1,0,0,0],' +
            '["000bv","Skeleco",2,13,1,1,1,1,0,0,0],' +
            '["000bw","Phantiidae",2,13,0,0,1,1,0,0,0],' +
            '["000bx","Klaatupillar",11,-1,1,1,1,1,0,0,0],' +
            '["000by","Charaxalis",11,-1,0,0,1,1,0,0,0],' +
            '["000bz","Incantasius",11,10,0,0,1,1,0,0,0],' +
            '["000c0","Maravol",11,7,1,1,1,1,0,1,0],' +
            '["000cm","Kyutopi",10,17,1,1,1,1,0,0,0],' +
            '["000cn","Konatus",10,17,0,0,1,1,0,0,0],' +
            '["000co","Kenyip",8,-1,1,1,1,1,0,0,0],' +
            '["000cp","Arfrica",8,6,0,0,1,1,0,0,0],' +
            '["000cq","Kalahowli",8,6,0,0,1,1,0,0,0],' +
            '["000cr","Petripeep",12,-1,1,1,1,1,0,0,0],' +
            '["000cs","Chirock",12,14,0,0,1,1,0,0,0],' +
            '["000ct","Toxitrice",12,14,0,0,1,1,0,0,0],' +
            '["000cu","Serpetone",12,7,0,0,1,1,0,0,0],' +
            '["000cv","Toxilisk",12,7,0,0,1,1,0,0,0],' +
            '["000cw","Gumairy",4,17,1,1,1,1,0,0,0],' +
            '["000cx","Eucylph",4,17,0,0,1,1,0,0,0],' +
            '["000cy","Puppod",7,0,1,1,1,1,0,0,0],' +
            '["000cz","Slugdog",7,0,0,0,1,1,0,0,0],' +
            '["000d0","Rokiwi",4,-1,1,1,1,1,0,0,0],' +
            '["000d1","Brushiwi",4,15,0,0,1,1,0,0,0],' +
            '["000d2","Alicalf",5,12,1,1,1,1,0,0,0],' +
            '["000d3","Cetacorn",5,12,0,0,1,1,0,0,0],' +
            '["000d4","Valkind",17,6,1,1,1,1,0,0,0],' +
            '["000d5","Frayja",17,6,0,0,1,1,0,0,0],' +
            '["000d6","Croaket",15,-1,1,1,1,1,0,0,0],' +
            '["000d7","Quibbit/Toxic Forme",15,7,0,0,1,1,0,0,0],' +
            '["000d8","Quibbit/Charged Forme",15,3,0,0,1,1,0,0,0],' +
            '["000d9","Quibbit/Herbal Forme",15,4,0,0,1,1,0,0,0],' +
            '["000da","Quibbit/Magma Forme",15,1,0,0,1,1,0,0,0],' +
            '["000db","Quibbit/Fae Forme",15,17,0,0,1,1,0,0,0],' +
            '["000de","Slypin",10,15,1,1,1,1,0,0,0],' +
            '["000df","Haredini",10,15,0,0,1,1,0,0,0],' +
            '["000dg","Selkrub",11,7,1,1,1,1,0,0,0],' +
            '["000dh","Aqrabion",11,7,0,0,1,1,0,0,0],' +
            '["000di","Skargas",11,7,0,0,1,1,0,0,0],' +
            '["000dj","Kawotor",2,0,1,1,1,1,0,0,0],' +
            '["000dk","Lutriva",2,6,0,0,1,1,0,0,0],' +
            '["000dl","Selutian",2,5,0,0,1,1,0,0,0],' +
            '["000dm","Kitwurm",11,-1,1,1,1,1,0,0,0],' +
            '["000dn","Purrpa",11,-1,0,0,1,1,0,0,0],' +
            '["000do","Moffkat",11,17,0,0,1,1,0,0,0],' +
            '["000dp","Pepyre",4,1,1,1,1,1,0,0,0],' +
            '["000dq","Skarasear",4,1,0,0,1,1,0,0,0],' +
            '["000dr","Aphreyd",11,-1,1,1,1,1,0,0,0],' +
            '["000ds","Scavady",11,-1,0,0,1,1,0,0,0],' +
            '["000dt","Mantidra",11,14,0,0,1,1,0,0,0],' +
            '["000du","Caimaw",16,-1,1,1,1,1,0,0,0],' +
            '["000dv","Caimangle",16,-1,0,0,1,1,0,0,0],' +
            '["000dw","Valimp",17,15,1,1,1,1,0,0,0],' +
            '["000dx","Valladox",17,15,0,0,1,1,0,0,0],' +
            '["000dy","Valenoir",17,15,0,0,1,1,0,0,0],' +
            '["000dz","Frusky",5,-1,1,1,1,1,1,1,0],' +
            '["000f0","Glacifur",5,-1,0,0,1,1,1,1,0],' +
            '["000f1","Skyrie",9,-1,1,1,1,1,0,0,0],' +
            '["000f2","Grymphony",9,-1,0,0,1,1,0,0,0],' +
            '["000f3","Shinorin",14,6,1,1,1,1,0,0,0],' +
            '["000f4","Shinorin/Incandescent",14,1,0,0,1,1,0,0,0],' +
            '["000f5","Sikannos",0,1,1,1,1,1,0,0,0],' +
            '["000f6","Sikannos/Unfettered",13,1,0,0,1,1,0,0,0],' +
            '["000f7","Goschief",17,-1,1,1,1,1,0,0,0],' +
            '["000f8","Havonk",17,15,0,0,1,1,0,0,0],' +
            '["000f9","Mocknock",13,16,1,1,1,1,0,0,0],' +
            '["000fa","Portalgeist",13,16,0,0,1,1,0,0,0]],' +
            '"98":[["012-Q","Butterfree/Mega Forme Q",11,10,0,0,1,1,1,1,0],' +
            '["024-Q","Arbok/Mega Forme Q",7,15,0,0,1,1,1,1,0],' +
            '["027-Q","Raichu/Mega Forme Q",3,6,0,0,1,1,0,0,0],' +
            '["039-Q","Ninetales/Mega Forme Q",1,10,0,0,1,1,1,1,0],' +
            '["057-Q","Persian/Mega Forme Q",0,13,0,0,1,1,0,0,0],' +
            '["063-Q","Arcanine/Mega Forme Q",1,14,0,0,1,1,1,1,0],' +
            '["083-Q","Rapidash/Mega Forme Q",1,9,0,0,1,1,1,1,0],' +
            '["090-Q","Farfetch\'d/Mega Forme Q",0,9,0,0,1,1,0,0,0],' +
            '["094-Q","Dewgong/Mega Forme Q",2,5,0,0,1,1,1,1,0],' +
            '["113-Q","Marowak/Alolan Mega Forme Q",1,13,0,0,1,1,1,1,0],' +
            '["136-Q","Jynx/Mega Forme Q",5,10,0,0,1,1,1,1,1],' +
            '["141-Q","Lapras/Mega Forme Q",2,5,0,0,1,1,1,1,0],' +
            '["144-Q","Vaporeon/Mega Forme Q",2,-1,0,0,1,1,1,0,0],' +
            '["145-Q","Jolteon/Mega Forme Q",3,-1,0,0,1,1,0,0,0],' +
            '["146-Q","Flareon/Mega Forme Q",1,-1,0,0,1,1,1,0,0],' +
            '["147-Q","Espeon/Mega Forme Q",10,-1,0,0,1,1,0,1,0],' +
            '["148-Q","Umbreon/Mega Forme Q",15,-1,0,0,1,1,1,0,0],' +
            '["149-Q","Leafeon/Mega Forme Q",4,-1,0,0,1,1,0,0,0],' +
            '["150-Q","Glaceon/Mega Forme Q",5,-1,0,0,1,1,0,0,0],' +
            '["151-Q","Sylveon/Mega Forme Q",17,-1,0,0,1,1,0,1,0],' +
            '["164-Q","Dragonite/Mega Forme Q",14,9,0,0,1,1,0,0,0],' +
            '["166-Q","Mew/Mega Forme Q",10,-1,0,0,1,1,0,0,0],' +
            '["177-Q","Furret/Mega Forme Q",0,14,0,0,1,1,0,1,0],' +
            '["201-Q","Jumpluff/Mega Forme Q",4,17,0,0,1,1,0,0,0],' +
            '["215-Q","Girafarig/Mega Forme Q",0,10,0,0,1,1,0,0,0],' +
            '["218-Q","Dunsparce/Mega Forme Q",0,14,0,0,1,1,1,0,0],' +
            '["227-Q","Weavile/Mega Forme Q",15,5,0,0,1,1,1,0,0],' +
            '["239-Q","Skarmory/Mega Forme Q",16,14,0,0,1,1,1,0,0],' +
            '["263-Q","Lugia/Mega Forme Q",10,9,0,0,1,1,0,0,0],' +
            '["264-Q","Ho-oh/Mega Forme Q",1,9,0,0,1,1,0,0,0],' +
            '["265-Q","Celebi/Mega Forme Q",10,4,0,0,1,1,0,0,0],' +
            '["276-Q","Mightyena/Mega Forme Q",15,-1,0,0,1,1,1,1,0],' +
            '["301-Q","Breloom/Mega Forme Q",4,6,0,0,1,1,1,1,0],' +
            '["325-Q","Manectric/Mega Forme Q",3,1,0,0,1,1,1,1,0],' +
            '["335-Q","Wailord/Mega Forme Q",2,9,0,0,1,1,0,0,0],' +
            '["344-Q","Flygon/Mega Forme Q",8,14,0,0,1,1,1,1,0],' +
            '["349-Q","Zangoose/Mega Forme Q",0,15,0,0,1,1,0,0,0],' +
            '["350-Q","Seviper/Mega Forme Q",7,2,0,0,1,1,1,0,0],' +
            '["364-Q","Milotic/Mega Forme Q",2,17,0,0,1,1,0,0,0],' +
            '["380-Q","Froslass/Mega Forme Q",5,13,0,0,1,1,1,1,0],' +
            '["403-Q","Jirachi/Mega Forme Q",16,10,0,0,1,1,0,0,0],' +
            '["423-Q","Luxray/Mega Forme Q",3,15,0,0,1,1,1,1,0],' +
            '["438-Q","Floatzel/Mega Forme Q",2,-1,0,0,1,1,0,0,0],' +
            '["471-Q","Lumineon/Mega Forme Q",2,17,0,0,1,1,0,0,0],' +
            '["487-Q","Giratina/Mega Forme Q",13,14,0,0,1,1,0,0,0],' +
            '["490-Q","Manaphy/Mega Forme Q",2,17,0,0,1,1,0,0,0],' +
            '["510-Q","Liepard/Mega Forme Q",15,-1,0,0,1,1,1,1,0],' +
            '["545-Q","Scolipede/Mega Forme Q",11,7,0,0,1,1,0,0,0],' +
            '["560-Q","Scrafty/Mega Forme Q",15,6,0,0,1,1,1,1,0],' +
            '["571-Q","Zoroark/Mega Forme Q",15,-1,0,0,1,1,1,1,0],' +
            '["609-Q","Chandelure/Mega Forme Q",13,1,0,0,1,1,1,1,0],' +
            '["612-Q","Haxorus/Mega Forme Q",14,16,0,0,1,1,1,1,0],' +
            '["621-Q","Druddigon/Mega Forme Q",14,12,0,0,1,1,0,1,0],' +
            '["668-Q","Pyroar/Mega Forme Q",1,0,0,0,1,1,1,1,0],' +
            '["673-Q","Gogoat/Mega Forme Q",4,-1,0,0,1,1,0,0,0],' +
            '["695-Q","Heliolisk/Mega Forme Q",3,1,0,0,1,1,1,1,0],' +
            '["700-Q","Hawlucha/Mega Forme Q",6,9,0,0,1,1,1,1,0],' +
            '["705-Q","Goodra/Mega Forme Q",14,7,0,0,1,1,1,1,0],' +
            '["714-Q","Noivern/Mega Forme Q",9,14,0,0,1,1,0,1,0]],' +
            '"99":[["019s1","Saiyan Rattata",0,6,1,1,1,1,0,0,0],' +
            '["019s2","Super-Saiyan Rattata",0,6,0,0,1,1,0,0,0],' +
            '["020s1","Super-Saiyan Raticate",0,6,0,0,1,1,0,0,0],' +
            '["020s2","Super-Saiyan 2 Raticate",0,6,0,0,1,1,0,0,0],' +
            '["020-S","Super-Saiyan 3 Raticate",0,6,0,0,1,1,0,0,0],' +
            '["020-T","Super-Saiyan 4 Raticate",0,6,0,0,1,1,0,0,0],' +
            '["025f","Flying Pichu",3,-1,1,1,1,1,0,0,0],' +
            '["025s","Surfing Pichu",3,-1,1,1,1,1,0,0,0],' +
            '["026f","Flying Pikachu",3,-1,0,0,1,1,0,0,0],' +
            '["026s","Surfing Pikachu",3,-1,0,0,1,1,0,0,0],' +
            '["026w","Snowboarding Pikachu",3,-1,0,0,1,1,0,0,0],' +
            '["027f","Flying Raichu",3,9,0,0,1,1,0,0,0],' +
            '["027s","Surfing Raichu",3,2,0,0,1,1,0,0,0],' +
            '["027w","Snowboarding Raichu",3,5,0,0,1,1,0,0,0],' +
            '["029t","Sandslash/Totem Forme Q",8,-1,0,0,1,1,1,1,0],' +
            '["035s","Shooting Star Cleffa",17,-1,1,1,1,1,0,0,0],' +
            '["036s","Shooting Star Clefairy",17,-1,0,0,1,1,0,0,0],' +
            '["037s","Shooting Star Clefable",17,-1,0,0,1,1,0,0,0],' +
            '["038a","Koroku",1,5,1,1,1,1,0,0,0],' +
            '["039-A","Kyukori",1,5,0,0,1,1,0,0,0],' +
            '["040g","Guild Igglybuff",0,17,1,1,1,1,0,0,0],' +
            '["041g","Guild Jigglypuff",0,17,0,0,1,1,0,0,0],' +
            '["042g","Guild Wigglytuff",0,17,0,0,1,1,0,0,0],' +
            '["062x","Apocalyptic Growlithe",1,-1,1,1,1,1,0,0,0],' +
            '["063x","Apocalyptic Arcanine",1,1,0,0,1,1,0,0,0],' +
            '["084s","Snowpoke",5,10,1,1,1,1,0,0,0],' +
            '["085s","Snowbro",5,10,0,0,1,1,0,0,0],' +
            '["086s","Snowking",5,10,0,0,1,1,0,0,0],' +
            '["108ds","Death Star Voltorb",3,-1,1,1,1,1,0,0,0],' +
            '["109ds","Death Star Electrode",3,-1,0,0,1,1,0,0,0],' +
            '["189e","Early Bird Natu",10,9,1,1,1,1,0,0,0],' +
            '["190e","Early Bird Xatu",10,9,0,0,1,1,0,0,0],' +
            '["219v","Gligar/Vampire",8,9,1,1,1,1,0,0,0],' +
            '["220v","Gliscor/Vampire",8,9,0,0,1,1,0,0,0],' +
            '["225s","Scaracross",11,13,1,1,1,1,1,0,0],' +
            '["230bm","Blue Moon Slugma",2,-1,1,1,1,1,0,0,0],' +
            '["231bm","Blue Moon Magcargo",2,12,0,0,1,1,0,0,0],' +
            '["240c","Houndour/Orthrus",1,14,1,1,1,1,0,0,0],' +
            '["240i","Frosdour",15,5,1,1,1,1,1,0,0],' +
            '["241c","Houndoom/Cerberus",1,14,0,0,1,1,0,0,0],' +
            '["241i","Chilldoom",15,5,0,0,1,1,1,0,0],' +
            '["243t","Donphan/Totem Forme Q",8,-1,0,0,1,1,1,1,0],' +
            '["263xd","XD001",10,9,1,1,1,1,0,0,0],' +
            '["275x","Apocalyptic Poochyena",15,13,1,1,1,1,0,0,0],' +
            '["276x","Apocalyptic Mightyena",15,13,0,0,1,1,0,0,0],' +
            '["294b","Snoralts",5,17,1,1,1,1,0,0,0],' +
            '["295b","Snolia",5,17,0,0,1,1,0,0,0],' +
            '["296b","Frosvoir",5,13,0,0,1,1,0,0,0],' +
            '["297b","Glaillade",5,6,0,0,1,1,0,0,0],' +
            '["300x","Apocalyptic Shroomish",4,7,1,1,1,1,0,0,0],' +
            '["301x","Apocalyptic Breloom",4,7,0,0,1,1,0,0,0],' +
            '["336i","Numel/Arctic",5,8,1,1,1,1,0,0,0],' +
            '["337i","Camerupt/Arctic",5,8,0,0,1,1,0,0,0],' +
            '["354t","Whiscash/Totem Forme Q",2,8,0,0,1,1,1,1,0],' +
            '["402f","Ryukuza",14,9,1,1,1,1,0,0,0],' +
            '["402m","Magquaza",14,13,1,1,1,1,0,0,0],' +
            '["405s","Seasonal Turtwig",4,-1,1,1,1,1,0,0,0],' +
            '["406s","Seasonal Grotle",4,-1,0,0,1,1,0,0,0],' +
            '["407s","Seasonal Torterra",4,-1,0,0,1,1,0,0,0],' +
            '["421f","Shinxel",3,2,1,1,1,1,1,0,0],' +
            '["422f","Fluxio",3,2,0,0,1,1,1,0,0],' +
            '["423f","Fluxray",3,2,0,0,1,1,1,0,0],' +
            '["423-F","Fluxray/Mega Forme Q",3,2,0,0,1,1,1,0,0],' +
            '["434s","Snow Combee",11,5,1,1,1,1,0,0,0],' +
            '["435s","Snow Vespiquen",11,5,0,0,1,1,0,0,0],' +
            '["435t","Snow Vespiquen/Totem Forme Q",11,5,0,0,1,1,0,0,0],' +
            '["450t","Skuntank/Totem Forme Q",7,15,0,0,1,1,1,1,0],' +
            '["483p","Dialga/Primal Forme Q",16,14,0,0,1,1,0,0,0],' +
            '["484p","Palkia/Primal Forme Q",2,14,0,0,1,1,0,0,0],' +
            '["509h","Purrloin/Hallowe\'en Witch",15,-1,1,1,1,1,0,0,0],' +
            '["510h","Liepard/Hallowe\'en Witch",15,-1,0,0,1,1,0,0,0],' +
            '["556t","Maractus/Totem Forme Q",4,-1,0,0,1,1,0,0,0],' +
            '["622x","Apocalyptic Golett",12,16,1,1,1,1,0,0,0],' +
            '["623x","Apocalyptic Golurk",12,16,0,0,1,1,0,0,0],' +
            '["628t","Braviary/Totem Forme Q",0,9,0,0,1,1,0,0,0],' +
            '["630t","Mandibuzz/Totem Forme Q",15,9,0,0,1,1,1,1,0],' +
            '["667g","Glileo",1,7,1,1,1,1,0,0,0],' +
            '["668g","Pyriscor",1,7,0,0,1,1,0,0,0],' +
            '["682p","Spritzkrow",17,15,1,1,1,1,0,0,0],' +
            '["683p","Aromakrow",17,15,0,0,1,1,0,0,0],' +
            '["713b","Noismog",10,14,1,1,1,1,0,0,0],' +
            '["713c","Noismoem",10,14,0,0,1,1,0,0,0],' +
            '["714b","Solgavern",16,14,0,0,1,1,0,0,0],' +
            '["714c","Lunavern",13,14,0,0,1,1,0,0,0],' +
            '["726b","Incineroar/Feral",1,3,0,0,1,1,0,0,0],' +
            '["740q","Oricorio/Pointe Style",4,9,0,0,1,1,0,0,0]]}}').split(',');
    }
    // eslint-disable-next-line camelcase
    fillTemplates(TEMPLATES) {
        this.TEMPLATES.shelterOptionsHTML = TEMPLATES.shelterOptionsHTML();
        this.TEMPLATES.fieldSortHTML = TEMPLATES.fieldSortHTML();
        this.TEMPLATES.fieldSearchHTML = TEMPLATES.fieldSearchHTML();
        this.TEMPLATES.privateFieldSearchHTML = TEMPLATES.privateFieldSearchHTML();
        this.TEMPLATES.qolHubHTML = TEMPLATES.qolHubHTML();
        this.TEMPLATES.evolveFastHTML = TEMPLATES.evolveFastHTML();
        this.TEMPLATES.labOptionsHTML = TEMPLATES.labOptionsHTML();
        this.TEMPLATES.publicFieldTooltipModHTML = TEMPLATES.publicFieldTooltipModHTML();
        this.TEMPLATES.privateFieldTooltipModHTML = TEMPLATES.privateFieldTooltipModHTML();
    }
    fillOptionsLists() {
        this.TYPE_OPTIONS = this.HELPERS.buildOptionsString(this.TYPE_LIST);
        this.NATURE_OPTIONS = this.HELPERS.buildOptionsString(this.NATURE_LIST);
        this.EGG_GROUP_OPTIONS = this.HELPERS.buildOptionsString(this.EGG_GROUP_LIST);
    }
}