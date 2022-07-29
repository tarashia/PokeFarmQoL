/**
 * This class is used to store CSS and HTML snippets that were previously loaded via Tampermonkey's '@resource' tool
 */
class Resources {
    css() {
        return `<% src/styles/core.css %> `+
               `<% src/styles/shelter.css %> `+
               `<% src/styles/fields.css %> `+
               `<% src/styles/hub.css %> `+
               `<% src/styles/party.less %> `+
               `<% src/styles/forge.css %> `;
    }

    fieldSearchHTML() {
        return `<% src/html/field-search.html %>`;
    }

    fieldSortHTML() {
        return `<% src/html/field-sort.html %>`;
    }

    labOptionsHTML() {
        return `<% src/html/lab-options.html %>`;
    }

    evolveFastHTML() {
        return `<% src/html/evolve-fast.html %>`;
    }

    privateFieldSearchHTML() {
        return `<% src/html/private-field-search.html %>`;
    }

    shelterOptionsHTML() {
        return `<% src/html/shelter-options.html %>`;
    }

    qolHubHTML() {
        return `<% src/html/qol-hub.html %>`;
    }

    publicFieldTooltipModHTML() {
        return `<% src/html/public-field-tooltip.html %>`;
    }

    privateFieldTooltipModHTML() {
        return `<% src/html/private-field-tooltip.html %>`;
    }
}