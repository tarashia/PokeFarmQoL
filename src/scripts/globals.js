class Globals {
    constructor(localStorageMgr, helpers) {
        this.localStorageMgr = localStorageMgr;
        this.HELPERS = helpers;
        this.TEMPLATES = { // all the new/changed HTML for the userscript
            qolHubLinkHTML: `<% src/html/qol-hub-icon.html %>`,
            massReleaseSelectHTML: `<% src/html/mass-release-fishing.html %>`,
            partyModHTML: `<% src/html/party-mod.html %>`,
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
        this.INTERACTIONS_PAGE_SETTINGS_KEY = 'QoLInteractions';
        this.SUMMARY_PAGE_SETTINGS_KEY = 'QoLSummary';
        /*
         * Note - the order of TYPE_LIST is important. It looks like PFQ uses an array in this order in its code
         * Don't change the order without looking for where this array is used
         */
        this.TYPE_LIST = "<% src/resources/type-list.jsonc %>";
        this.NATURE_LIST = "<% src/resources/nature-list.jsonc %>";
        this.EGG_GROUP_LIST = "<% src/resources/egg-group-list.jsonc %>";
        this.SHELTER_TYPE_TABLE = "<% src/resources/shelter-type-search.jsonc %>";
        this.SHELTER_SEARCH_DATA = "<% src/resources/shelter-search-data.jsonc %>";
        this.SHELTER_SEARCH_LISTS = "<% src/resources/shelter-search-lists.jsonc %>";

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
        this.DEX_DATA = (`<% src/resources/dex-data.jsonc %>`).split(',');
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