class Globals {
    static SETTINGS_SAVE_KEY = 'QoLSettings';
    static DAYCARE_PAGE_SETTINGS_KEY = 'QoLDaycare';
    static DEX_PAGE_SETTINGS_KEY = 'QoLDexPage';
    static FARM_PAGE_SETTINGS_KEY = 'QoLFarm';
    static FISHING_PAGE_SETTINGS_KEY = 'QoLFishing';
    static LAB_PAGE_SETTINGS_KEY = 'QoLLab';
    static MULTIUSER_PAGE_SETTINGS_KEY = 'QoLMultiuser';
    static PRIVATE_FIELDS_PAGE_SETTINGS_KEY = 'QoLPrivateFields';
    static PUBLIC_FIELDS_PAGE_SETTINGS_KEY = 'QoLPublicFields';
    static SHELTER_PAGE_SETTINGS_KEY = 'QoLShelter';
    static WISHFORGE_PAGE_SETTINGS_KEY = 'QoLWishforge';
    static POKEDEX_DATA_KEY = 'QoLPokedex';
    static POKEDEX_DEX_IDS_KEY = 'QoLDexIDsCache';
    static POKEDEX_REGIONAL_FORMS_KEY = 'QoLRegionalFormsList';
    static POKEDEX_EGG_TYPES_MAP_KEY = 'QoLEggTypesMap';
    static POKEDEX_EVOLVE_BY_LEVEL_KEY = 'QoLEvolveByLevel';
    static POKEDEX_EVOLUTION_TREE_DEPTH_KEY = 'QoLEvolutionTreeDepth';
    static INTERACTIONS_PAGE_SETTINGS_KEY = 'QoLInteractions';
    static SUMMARY_PAGE_SETTINGS_KEY = 'QoLSummary';
        /*
         * Note - the order of TYPE_LIST is important. It looks like PFQ uses an array in this order in its code
         * Don't change the order without looking for where this array is used
         */
    static TYPE_LIST = "<% src/resources/type-list.jsonc %>";
    static NATURE_LIST = "<% src/resources/nature-list.jsonc %>";
    static EGG_GROUP_LIST = "<% src/resources/egg-group-list.jsonc %>";
    static SHELTER_TYPE_TABLE = "<% src/resources/shelter-type-search.jsonc %>";
    static SHELTER_SEARCH_DATA = "<% src/resources/shelter-search-data.jsonc %>";
    static SHELTER_SEARCH_LISTS = "<% src/resources/shelter-search-lists.jsonc %>";

    static TYPE_OPTIONS = Helpers.buildOptionsString(this.TYPE_LIST);
    static NATURE_OPTIONS = Helpers.buildOptionsString(this.NATURE_LIST);
    static EGG_GROUP_OPTIONS = Helpers.buildOptionsString(this.EGG_GROUP_LIST);
}