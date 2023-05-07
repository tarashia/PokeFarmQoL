/**
 * This class is used to store CSS and HTML snippets that were previously loaded via Tampermonkey's '@resource' tool
 */
class Resources {
    static css() {
        return `<% src/styles/core.css %> `+
               `<% src/styles/shelter.less %> `+
               `<% src/styles/fields.less %> `+
               `<% src/styles/hub.css %> `+
               `<% src/styles/party.less %> `+
               `<% src/styles/forge.css %> `;
    }

    static fieldSearchHTML() {
        return `<% src/html/field-search.html %>`;
    }

    static fieldSortHTML() {
        return `<% src/html/field-sort.html %>`;
    }

    static labOptionsHTML() {
        return `<% src/html/lab-options.html %>`;
    }

    static evolveFastHTML() {
        return `<% src/html/evolve-fast.html %>`;
    }

    static privateFieldSearchHTML() {
        return `<% src/html/private-field-search.html %>`;
    }

    static shelterOptionsHTML() {
        return `<div id ="shelteroptionsqol"><% src/html/shelter-options.html %> <% src/html/shelter-search.html %></div>`;
    }

    static shelterSortHTML() {
        return `<% src/html/shelter-sort.html %>`;
    }

    static qolHubHTML() {
        return `<% src/html/qol-hub.html %>`;
    }

    static publicFieldTooltipModHTML() {
        return `<% src/html/public-field-tooltip.html %>`;
    }

    static privateFieldTooltipModHTML() {
        return `<% src/html/private-field-tooltip.html %>`;
    }

    static qolHubLinkHTML() {
        return `<% src/html/qol-hub-icon.html %>`;
    }

    static massReleaseSelectHTML() {
        return `<% src/html/mass-release-fishing.html %>`;
    }

    static partyModHTML() {
        return `<% src/html/party-mod.html %>`;
    }

    static partyModCustomHTML() {
        return `<% src/html/party-mod-custom.html %>`;
    }
}