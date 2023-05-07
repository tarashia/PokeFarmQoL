class Globals {
    // if you add a new page settings key, be sure to add it to the reset menu in qol-hub.html
    static SETTINGS_SAVE_KEY = 'QoLSettings';
    static LAB_PAGE_SETTINGS_KEY = 'QoLLab';
    static MULTIUSER_PAGE_SETTINGS_KEY = 'QoLMultiuser';
    static PRIVATE_FIELDS_PAGE_SETTINGS_KEY = 'QoLPrivateFields';
    static PUBLIC_FIELDS_PAGE_SETTINGS_KEY = 'QoLPublicFields';
    static SHELTER_PAGE_SETTINGS_KEY = 'QoLShelter';
    static POKEDEX_DATA_KEY = 'QoLPokedex';

    // JSON objects loaded from resource files
    static BODY_STYLE_LIST = "<% src/resources/body-styles.jsonc %>";
    static COLOUR_LIST = "<% src/resources/colours.jsonc %>";
    static EGG_GROUP_LIST = "<% src/resources/egg-groups.jsonc %>";
    static NATURE_LIST = "<% src/resources/natures.jsonc %>";
    static REGION_LIST = "<% src/resources/regions.jsonc %>";
    static TYPE_LIST = "<% src/resources/types.jsonc %>";
    static STATIC_DEX_DATA = "<% src/resources/dex-data.json %>";
    static SHELTER_SEARCH_KEYS = "<% src/resources/shelter-search-keys.jsonc %>";
}