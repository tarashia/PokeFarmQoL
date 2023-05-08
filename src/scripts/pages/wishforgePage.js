class WishforgePage extends Page {
    static init() {
        WishforgePage.setupHTML();
        WishforgePage.setupObservers();
    }

    static setupObservers() {
        const target = $('#badges').next('div')[0];
        Page.addObserver(target, {
            childList: true
        }, function(mutations) {
            mutations.forEach(function(mutation) {
                if(mutation.type === 'childList' && mutation.addedNodes.length) {
                    obj.setupHTML();
                }
            });
        });
    }

    static setupHTML() {
        const isMobile = Helpers.detectPageSize('mq2');
        // setup table format
        let header = '<th>Type</th> <th>Level</th> <th>Gem Progress</th> <th>Item</th> <th>Upgrade</th> <th>Notify</th>';
        let columns = 
            '<col style="width: 10%;">' +
            '<col style="width: 20%;">' +
            '<col style="width: 20%;">' +
            '<col style="width: 20%;">' +
            '<col style="width: 10%;">' +
            '<col style="width: 10%;">';
        if(isMobile) {
            header = '<th>Type</th> <th>Gem Progress</th> <th>Item</th>';
            columns = 
                '<col style="width: 34%;">' +
                '<col style="width: 33%;">' +
                '<col style="width: 33%;">';
        }

        const types = Resources.TYPE_LIST;

        // build HTML table
        let rows = {};
        for (key in types) {
            if(!isMobile) {
                rows[types[key]] = `<tr id=${types[key]}> <td>${types[key]}</td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>`;
            }
            else {
                rows[types[key]] = `<tr id="${types[key]}-top" class="qolBadgesTop"> <td>${types[key]}</td> <td></td> <td></td> </tr>`
                               + `<tr id="${types[key]}-bot" class="qolBadgesBot"> <td></td> <td></td> <td></td> </tr>`;
            }
        }
        let table = '<table style="width: 100%" class="qolBadges">' +
            `<colgroup> ${columns} </colgroup>` +
            `<tr id="head"> ${header} </tr>`;
        for (key in types) {
            table += rows[types[key]];
        }
        table += '</table>';

        // add table to page
        const craftedBadgesList = $('#badges').next().find('ul.badgelist');
        craftedBadgesList.prepend(table);

        // define column aliases to make the movements more logical
        let LEVEL_COL = 2;
        let GEM_COL = 3;
        let ITEM_COL = 4;
        let UPDATE_COL = 5;
        let NOTIFY_COL = 6;
        let MOB_TOP = '';
        let MOB_BOT = '';
        if(isMobile) {
            LEVEL_COL = 1;
            GEM_COL = 2;
            ITEM_COL = 3;
            UPDATE_COL = 2;
            NOTIFY_COL = 3;
            // row specifiers for mobile
            MOB_TOP = '-top';
            MOB_BOT = '-bot';
        }

        // move elements from original elements to table
        for (key in types) {
            const type = types[key];
            const index = j + 1;
            const li = $(craftedBadgesList.children()[index]);

            // get badge image
            const badgeImg = $($(li.children()[0]).children()[0]);
            badgeImg.appendTo(`tr#${type}${MOB_BOT}>td:nth-child(${LEVEL_COL})`);

            // get badge name
            const badgeName = $(li.children()[0]);
            badgeName.text(' ' + badgeName.text().replace(` ${type} Badge`, ''));
            badgeName.css('display', 'inline-block');
            badgeName.appendTo(`tr#${type}${MOB_BOT}>td:nth-child(${LEVEL_COL})`);

            // get gem progress bar
            const gemProgress = $(li.children()[0]);
            gemProgress.appendTo(`tr#${type}${MOB_TOP}>td:nth-child(${GEM_COL})`);

            // if the badge is under construction, the tooltip will not be there
            if($(li.children()[0]).hasClass('itemtooltip')) {
                const gemTooltip = $(li.children()[0]);
                gemTooltip.appendTo(`tr#${type}${MOB_TOP}>td:nth-child(${GEM_COL})`);
            }

            // get item progress bar
            const itemProgress = $(li.children()[0]);
            itemProgress.appendTo(`tr#${type}${MOB_TOP}>td:nth-child(${ITEM_COL})`);

            // if the badge is under construction, the tooltip will not be there
            if($(li.children()[0]).hasClass('itemtooltip')) {
                const itemTooltip = $(li.children()[0]);
                itemTooltip.appendTo(`tr#${type}${MOB_TOP}>td:nth-child(${ITEM_COL})`);
            }

            // get notify button
            const notifyBtn = $(li.children()[0]);
            notifyBtn.appendTo(`tr#${type}${MOB_BOT}>td:nth-child(${NOTIFY_COL})`);

            // get upgrade button
            const updateBtn = $(li.children()[0]);
            updateBtn.appendTo(`tr#${type}${MOB_BOT}>td:nth-child(${UPDATE_COL})`);
        }

        // remove the li's left over
        const children = craftedBadgesList.children();
        for (let i = types.length; i >= 1; i--) {
            $(children[i]).remove();
        }
    }
}