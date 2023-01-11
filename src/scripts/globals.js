class Globals {
    static SETTINGS_SAVE_KEY = 'QoLSettings';
    static LAB_PAGE_SETTINGS_KEY = 'QoLLab';
    static MULTIUSER_PAGE_SETTINGS_KEY = 'QoLMultiuser';
    static PRIVATE_FIELDS_PAGE_SETTINGS_KEY = 'QoLPrivateFields';
    static PUBLIC_FIELDS_PAGE_SETTINGS_KEY = 'QoLPublicFields';
    static SHELTER_PAGE_SETTINGS_KEY = 'QoLShelter';
    static POKEDEX_DATA_KEY = 'QoLPokedex';
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