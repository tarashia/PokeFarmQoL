class Dojo {
    static SETTING_ENABLE = 'dojoEnable';


    constructor() {
        if(UserDataHandle.getSettings().QoLSettings[Dojo.SETTING_ENABLE]) {
            Dojo.setupObservers();
        }
        else {
            console.log('Dojo features disabled');
        }
    }
    
    
    static setupObservers() {
        Helpers.addObserver(document.querySelector('body'), {
            childList: true,
            subtree: true
        }, function(mutations) {
            mutations.forEach(function (mutation) {
                // const fsPokemon = document.querySelector('#fs_pokemon');
                // TODO: detect if this mutation is actually a field loading
                // (same in daycare)
                const fsPokemon = $('#fs_pokemon');
                if (fsPokemon.length > 0 && $.contains(fsPokemon[0], mutation.target)) {
                    Dojo.dojoSearch();
                }
            });
        });
    }
    
    static dojoSearch() {
        // highlight pkmn with perfect stats
        $(".fieldmontip .item+div:contains('= 186')").parent().parent().prev().addClass('dojofoundme');

        // highlight individual perfect stats
        $(".fieldmontip .item+div .small>span:contains('31')").addClass('dojoperfectstat');
    }

}