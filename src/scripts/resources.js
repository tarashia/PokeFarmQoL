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
    static STATIC_DEX_DATA = "<% src/resources/dex-data.json %>";
    static SHELTER_SEARCH_KEYS = "<% src/resources/shelter-search-keys.jsonc %>";

    // CSS files
    static CORE_CSS = `<% src/styles/core.css %>`;
    static HUB_CSS = `<% src/styles/hub.css %>`;
    static MODAL_CSS = `<% src/styles/modal.less %>`;
    static SHELTER_CSS = `<% src/styles/shelter.less %>`;
    static FIELDS_CSS = `<% src/styles/fields.less %>`;
    static PARTY_CSS = `<% src/styles/party.less %>`;
    static FORGE_CSS = `<% src/styles/forge.css %>`;
    static LAB_CSS = `<% src/styles/lab.css %>`;
    static DEMO_CSS = '#thisisanexample {\n    color: yellow;\n}\n\n.thisisalsoanexample {\n    background-color: blue!important;\n}\n\nhappycssing {\n    display: absolute;\n}';

    // HTML files
    static QOL_HUB_HTML = `<% src/html/qol-hub.html %>`;
    static PARTY_MOD_HTML = `<% src/html/party-mod.html %>`;
    static QOL_HUB_ICON_HTML = `<% src/html/qol-hub-icon.html %>`;
    static LAB_OPTIONS_HTML = `<% src/html/lab-options.html %>`;
    static EVOLVE_FAST_HTML = `<% src/html/evolve-fast.html %>`;
    static PRIVATE_FIELD_SEARCH_HTML = `<% src/html/private-field-search.html %>`;
    static SHELTER_OPTIONS_HTML = `<div id ="shelteroptionsqol"><% src/html/shelter-options.html %> <% src/html/shelter-search.html %></div>`;
    static SHELTER_SORT_HTML = `<% src/html/shelter-sort.html %>`;
    static FIELD_SEARCH_HTML = `<% src/html/field-search.html %>`;
    static FIELD_SORT_HTML = `<% src/html/field-sort.html %>`;
    static PUBLIC_FIELD_TOOLTIP_MOD_HTML = `<% src/html/public-field-tooltip.html %>`;
    static PRIVATE_FIELD_TOOLTIP_MOD_HTML = `<% src/html/private-field-tooltip.html %>`;
    static MASS_RELEASE_FISHING_HTML = `<% src/html/mass-release-fishing.html %>`;

}