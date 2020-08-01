class WishforgePage extends Page {
    constructor() {
        super('QoLWishforge', {}, 'wishforge');
        const obj = this;
        /*
        this.observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
              if(document.querySelector('#fs_pokemon') !== null) {
                  obj.customSearch();
              }
          })
        });
        */
    } // constructor
    
    setupHTML() {
        // test table
        const header = "<th>Type</th> <th>Level</th> <th>Gem Progress</th> <th>Item</th> <th>Upgrade</th> <th>Notify</th>";
        const rows = {
            "normal": "<td>Normal</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td>",
            "fire": "<td>Fire</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td>",
            "water": "<td>Water</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td>",
            "electric": "<td>Electric</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td>",
            "grass": "<td>Grass</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td>",
            "ice": "<td>Ice</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td>",
            "fighting": "<td>Fighting</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td>",
            "poison": "<td>Poison</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td>",
            "ground": "<td>Ground</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td>",
            "flying": "<td>Flying</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td>",
            "psychic": "<td>Psychic</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td>",
            "bug": "<td>Bug</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td>",
            "rock": "<td>Rock</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td>",
            "ghost": "<td>Ghost</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td>",
            "dragon": "<td>Dragon</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td>",
            "dark": "<td>Dark</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td>",
            "steel": "<td>Steel</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td>",
            "fairy": "<td>Fairy</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td>",
        };
        const table = `<table>
            <tr id=”head”> ${header}</tr>
            <tr id=”normal”> ${rows["normal"]} </tr>
            <tr id=”fire”> ${rows["fire"]} </tr>
            <tr id=”water”> ${rows["water"]} </tr>
            <tr id=”electric”> ${rows["electric"]} </tr>
            <tr id=”grass”> ${rows["grass"]} </tr>
            <tr id=”ice”> ${rows["ice"]} </tr>
            <tr id=”fighting”> ${rows["fighting"]} </tr>
            <tr id=”poison”> ${rows["poison"]} </tr>
            <tr id=”ground”> ${rows["ground"]} </tr>
            <tr id=”flying”> ${rows["flying"]} </tr>
            <tr id=”psychic”> ${rows["psychic"]} </tr>
            <tr id=”bug”> ${rows["bug"]} </tr>
            <tr id=”rock”> ${rows["rock"]} </tr>
            <tr id=”ghost”> ${rows["ghost"]} </tr>
            <tr id=”dragon”> ${rows["dragon"]} </tr>
            <tr id=”dark”> ${rows["dark"]} </tr>
            <tr id=”steel”> ${rows["steel"]} </tr>
            <tr id=”fairy”> ${rows["fairy"]} </tr>
            </table>`;
        
        list = $($('ul.badgelist')[1]);
        list.prepend(table);
        
    }
};

const wishforgePage = new WishforgePage();
