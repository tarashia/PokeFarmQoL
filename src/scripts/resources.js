/**
 * This class is used to store JSON, CSS, and HTML files - the build script replaces these with the given file's contents
 */
class Resources {
    
    // JSON objects loaded from resource files
    static BODY_STYLE_LIST = "<% src/resources/body-styles.jsonc %>";
    static COLOUR_LIST = "<% src/resources/colours.jsonc %>";
    static EGG_GROUP_LIST = "<% src/resources/egg-groups.jsonc %>";
    static NATURE_LIST = "<% src/resources/natures.jsonc %>";
    static REGION_LIST = "<% src/resources/regions.jsonc %>";
    static TYPE_LIST = "<% src/resources/types.jsonc %>";
    static SHELTER_SEARCH_KEYS = "<% src/resources/shelter-search-keys.jsonc %>";

    // CSS files
    static CORE_CSS = `<% src/styles/core.less %>`;
    static FIELDS_CSS = `<% src/styles/fields.less %>`;
    static FISHING_CSS = `<% src/styles/fishing.less %>`;
    static FORGE_CSS = `<% src/styles/forge.less %>`;
    static HUB_CSS = `<% src/styles/hub.less %>`;
    static LAB_CSS = `<% src/styles/lab.less %>`;
    static PARTY_CSS = `<% src/styles/party.less %>`;
    static SHELTER_CSS = `<% src/styles/shelter.less %>`;
    static DEMO_CSS = '#thisisanexample {\n    color: yellow;\n}\n\n.thisisalsoanexample {\n    background-color: blue!important;\n}\n\nhappycssing {\n    display: absolute;\n}';

    // HTML files
    static EVOLVE_FAST_HTML = `<% src/html/evolve-fast.html %>`;
    static FARM_EVOLVE_HTML = `<% src/html/farm-evolve.html %>`;
    static FIELD_SEARCH_HTML = `<% src/html/field-search.html %>`;
    static FIELD_SORT_HTML = `<% src/html/field-sort.html %>`;
    static FIELD_TOOLTIP_HTML = `<% src/html/field-tooltip.html %>`;
    static LAB_OPTIONS_HTML = `<% src/html/lab-options.html %>`;
    static MASS_SELECT_HTML = `<% src/html/mass-select-move-release.html %>`;
    static PARTY_MOD_HTML = `<% src/html/party-mod.html %>`;
    static QOL_HUB_ICON_HTML = `<% src/html/qol-hub-icon.html %>`;
    static QOL_HUB_HTML = `<% src/html/qol-hub.html %>`;
    static SHELTER_OPTIONS_HTML = `<div id ="shelteroptionsqol"><% src/html/shelter-options.html %> <% src/html/shelter-search.html %></div>`;
    static SHELTER_SORT_HTML = `<% src/html/shelter-sort.html %>`;

}