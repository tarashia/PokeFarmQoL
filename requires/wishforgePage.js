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
            rows[types[i]] = `<td>${types[i]}</td> <td></td> <td>Test</td> <td>Test</td> <td>Test</td> <td>Test</td>`
        };
        let table = `<table><tr id="head"> ${header}</tr>`;
        /*
        <colgroup>
            <col span="1" style="width: 15%;">
            <col span="1" style="width: 70%;">
            <col span="1" style="width: 15%;">
        </colgroup>
        */
        for (let i = 0; i < types.length; i++) {
            table += `<tr id=${types[i]}> ${rows[types[i]]} </tr>`;
        }
        table += `</table>`;
        
        // add table to page
        const craftedBadgesList = $($('ul.badgelist')[1]);
        craftedBadgesList.prepend(table);
        
        // define column aliases to make the movements more logical
        const LEVEL_COL = 2;
        const GEM_COL = 3;
        const ITEM_COL = 4;
        const UPDATE_COL = 5;
        const NOTIFY_COL = 6;

        // move elements from original elements to table
        for (let i = 0; i < types.length; i++) {
            let index = i + 1;

            // get badge image
            let badgeImg = $($($(craftedBadgesList.children()[index]).children()[0]).children()[0]);
            badgeImg.appendTo(`tr#${types[i]}>td:nth-child(${LEVEL_COL})`);

            // get badge name
            let badgeName = $($(craftedBadgesList.children()[index]).children()[0]); // .innerText;
            badgeName.text(badgeName.text().replace(` ${types[i]} Badge`, ""));
            badgeName.appendTo(`tr#${types[i]}>td:nth-child(${LEVEL_COL})`);
        }
    }
};

const wishforgePage = new WishforgePage();
