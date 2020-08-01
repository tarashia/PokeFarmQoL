class WishforgePage extends Page {
    constructor() {
        super('QoLWishforge', {}, 'forge');
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
        // setup table format
        const header = "<th>Type</th> <th>Level</th> <th>Gem Progress</th> <th>Item</th> <th>Upgrade</th> <th>Notify</th>";
        
        // use GLOBALS.TYPE_LIST to get list of types
        const types = GLOBALS.TYPE_LIST;
        
        // build HTML table
        let rows = {};
        for (let i = 0; i < types.length; i++) {
            rows[types[i]] = `<td>${types[i]}</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td>`
        };
        let table = `<table><tr id="head"> ${header}</tr>`;
        for (let i = 0; i < types.length; i++) {
            table += `<tr id=${types[i]}> ${rows[${types[i]}]} </tr>`;
        }
        table += `</table>`;
        
        // add table to page
        const craftedBadgesList = $($('ul.badgelist')[1]);
        craftedBadgesList.prepend(table);
        
        // move elements from original elements to table
        for (let i = 0; i < types.length; i++) {
            $($($(craftedBadgesList.children()[i]).children()[0]).children()[0]).appendTo(`tr#${types[i]}`);
        }
        
    }
};

const wishforgePage = new WishforgePage();
