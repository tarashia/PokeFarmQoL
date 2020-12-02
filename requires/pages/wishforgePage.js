const WishforgeBase = Page;
    
class WishforgePage extends WishforgeBase {
    constructor(jQuery, GLOBALS) {
        super('QoLWishforge', {}, 'forge');
        this.jQuery = jQuery;
        const obj = this;
        this.observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
              if(mutation.type === "childList" && mutation.addedNodes.length) {
                  obj.setupHTML(GLOBALS);
              }
          })
        });
    } // constructor

    setupHTML(GLOBALS) {
        const obj = this;
        // setup table format
        const header = "<th>Type</th> <th>Level</th> <th>Gem Progress</th> <th>Item</th> <th>Upgrade</th> <th>Notify</th>";

        // use GLOBALS.TYPE_LIST to get list of types
        const types = GLOBALS.TYPE_LIST;

        // build HTML table
        let rows = {};
        for (let i = 0; i < types.length; i++) {
            rows[types[i]] = `<td>${types[i]}</td> <td></td> <td></td> <td></td> <td></td> <td></td>`
        };
        let table = `<table style="width: 100%">` +
            `<colgroup>` +
            `<col span="1" style="width: 10%;">` +
            `<col span="1" style="width: 20%;">` +
            `<col span="1" style="width: 20%;">` +
            `<col span="1" style="width: 20%;">` +
            `<col span="1" style="width: 10%;">` +
            `<col span="1" style="width: 10%;">` +
            `</colgroup>` +
            `<tr id="head"> ${header}</tr>`;
        for (let i = 0; i < types.length; i++) {
            table += `<tr id=${types[i]}> ${rows[types[i]]} </tr>`;
        }
        table += `</table>`;

        // add table to page
        const craftedBadgesList = obj.jQuery('#badges').next().find('ul.badgelist');
        craftedBadgesList.prepend(table);

        // define column aliases to make the movements more logical
        const LEVEL_COL = 2;
        const GEM_COL = 3;
        const ITEM_COL = 4;
        const UPDATE_COL = 5;
        const NOTIFY_COL = 6;

        // move elements from original elements to table
        for (let j = 0; j < types.length; j++) {
            let type = types[j];
            let index = j + 1;
            let li = obj.jQuery(craftedBadgesList.children()[index])

            // get badge image
            let badgeImg = obj.jQuery(obj.jQuery(li.children()[0]).children()[0]);
            badgeImg.appendTo(`tr#${type}>td:nth-child(${LEVEL_COL})`);

            // get badge name
            let badgeName = obj.jQuery(li.children()[0]);
            badgeName.text(' ' + badgeName.text().replace(` ${type} Badge`, ""));
            badgeName.css('display', 'inline-block');
            badgeName.appendTo(`tr#${type}>td:nth-child(${LEVEL_COL})`);

            // get gem progress bar
            let gemProgress = obj.jQuery(li.children()[0]);
            gemProgress.appendTo(`tr#${type}>td:nth-child(${GEM_COL})`);

            // if the badge is under construction, the tooltip will not be there
            if(obj.jQuery(li.children()[0]).hasClass('itemtooltip')) {
                let gemTooltip = obj.jQuery(li.children()[0]);
                gemTooltip.appendTo(`tr#${type}>td:nth-child(${GEM_COL})`);
            }

            // get item progress bar
            let itemProgress = obj.jQuery(li.children()[0]);
            itemProgress.appendTo(`tr#${type}>td:nth-child(${ITEM_COL})`);

            // if the badge is under construction, the tooltip will not be there
            if(obj.jQuery(li.children()[0]).hasClass('itemtooltip')) {
                let itemTooltip = obj.jQuery(li.children()[0]);
                itemTooltip.appendTo(`tr#${type}>td:nth-child(${ITEM_COL})`);
            }

            // get notify button
            let notifyBtn = obj.jQuery(li.children()[0]);
            notifyBtn.appendTo(`tr#${type}>td:nth-child(${NOTIFY_COL})`);

            // get upgrade button
            let updateBtn = obj.jQuery(li.children()[0]);
            updateBtn.appendTo(`tr#${type}>td:nth-child(${UPDATE_COL})`);
        }

        // remove the li's left over
        const children = craftedBadgesList.children();
        for (let i = types.length; i >= 1; i--) {
            obj.jQuery(children[i]).remove();
        }
    }
    
    setupObserver() {
        const obj = this;
        const target = obj.jQuery('#badges').next("div")[0];
        this.observer.observe(target, {
            childList: true
        });
    }
};