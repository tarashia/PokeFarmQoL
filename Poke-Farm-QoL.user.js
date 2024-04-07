// ==UserScript==
// @name         Poké Farm QoL
// @namespace    https://github.com/tarashia/
// @author       Bentomon, ECEInTheHole, Tarashia (Mirzam)
// @homepageURL  https://github.com/tarashia/PokeFarmQoL
// @downloadURL  https://github.com/tarashia/PokeFarmQoL/raw/master/Poke-Farm-QoL.user.js
// @updateURL    https://github.com/tarashia/PokeFarmQoL/raw/master/Poke-Farm-QoL.user.js
// @description  Quality of Life changes to Pokéfarm!
// @version      2.0.0
// @match        https://pokefarm.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js
// ==/UserScript==

/* global $ */
class ErrorHandler {
    // convenience wrappers on writeCustomError
    static info(message, err=undefined) {
        ErrorHandler.writeCustomError(message,'info',err);
    }
    static warn(message, err=undefined) {
        ErrorHandler.writeCustomError(message,'warn',err);
    }
    static error(message, err=undefined) {
        ErrorHandler.writeCustomError(message,'error',err);
    }

    /*
     * Custom error handler to output in the QoL error console
     * Level should be info, warn, or error; default is info
     * Message is also written to the JavaScript console during errorToString call
     * err should be the full Error object - if provided and supported, the
     *     stack trace for this error will be Base 64 encoded and included for the user
     */
    static writeCustomError(message,level='info',err=undefined) {
        const logElement = document.getElementById('qolConsoleHolder');
        const logOutput = ErrorHandler.errorToString(message, level, err);
        if(logElement) {
            logElement.innerHTML += '<li><div class="qolB64Output">' + logOutput +'</div></li>';
        }
        else {
            console.error('Could not add custom log to log element');
        }
    }

    // show an error at the bottom of the page, since the hub may not be accessible in these cases
    static fatalErrorHandler(err) {
    // prevent showing the fatal error output while logged out, and on non-core pages like direct image links
        if(err!='#announcements missing') {
            const message = 'Fatal error initializing QoL';
            console.error(message);
            console.error(err);
            const errorMsg = ErrorHandler.errorToString(message, 'error', err);
            $('#core').append('<div class="panel" style="padding:0.5rem;word-wrap:break-word;user-select:all;">'+errorMsg+'</div>');
        }
    }

    /*
     * translates the given details into a printable version
     * logs the message to the console at the same time
     */
    static errorToString(message, level='info', err=undefined) {
        let prefix = undefined;
        let stackTrace = '';
        if(err && err.stack) {
            stackTrace = '<br>'+btoa(err.stack)+'';
        }
        if(level=='warn') {
            prefix = 'WARN: ';
            console.warn('QoL: '+message);
            if(err) {
                console.warn(err);
            }
        }
        else if(level=='error') {
            prefix = 'ERROR: ';
            console.error('QoL: '+message);
            if(err) {
                console.error(err);
            }
        }
        else {
            prefix = 'INFO: ';
            console.log('QoL: '+message);
            if(err) {
                console.logs(err);
            }
        }
        return prefix + message + stackTrace;
    }
}

class Helpers {
    static addGlobalStyle(css) {
        if(css) {
            const head = document.getElementsByTagName('head')[0];
            const style = document.createElement('style');
            style.innerHTML = css;
            head.appendChild(style);
        }
    }

    static addGlowColourCSS(glowColour) {
        if(glowColour) {
            let css = '.publicfoundme, .privatefoundme, .shelterfoundme img, .daycarefoundme, .labfoundme {';
            css += 'box-shadow: 0px 0px 25px 15px '+glowColour+' !important;';
            css += 'background-color: '+glowColour+' !important;}';
            Helpers.addGlobalStyle(css);
        }
    }

    static buildOptionsString(arr) {
        let str = '<option value="none">None</option> ';
        if(Array.isArray(arr)) {
            for (let i = 0; i < arr.length; i++) {
                str += `<option value="${i}">${arr[i]}</option> `;
            }
        }
        // allow for object-formatted option lists
        else {
            for(const key in arr) {
                str += `<option value="${key}">${arr[key]}</option> `;
            }
        }
        return str;
    }

    /*
     * returns true if the page is equal to or smaller to the given size class
     * mobile cutoff (point when header changes): "mq2"
     * ex: const isMobile = Helpers.detectPageSize('mq2');
     */
    static detectPageSize(size) {
        return $('html').hasClass(size);
    }

    /*
     * sets up a basic mutation observer with the given options for the specified element
     * when the mutation is observed, calls the provided callback with the detected mutation
     * watchElement is a DOM element object
     * observeOptions should be an options element compatible with mutation observers
     */
    static addObserver(watchElement, observeOptions, callback) {
        const observer = new MutationObserver(function (mutations) {
            callback(mutations);
        });
        observer.observe(watchElement, observeOptions);
    }

    /*
     *Demo collapse html. Deviation from this may result in errors.
     *
     *<div class="panel accordion qolCollapse">
     *  <h3>
     *      <a href="#">
     *      Collapse Title
     *      <svg viewBox="-6 -6 12 12" width="16" height="16" class="acctoggle"><polygon fill="currentColor" points="-2,-4 4,0 -2,4"></polygon></svg>
     *      </a>
     *  </h3>
     *  <div style="display:none;">
     *      Collapse Content
     *  </div>
     *</div>
     */
    static activateCollapses() {
        const collapses = $('.qolCollapse');
        for(let i=0; i<collapses.length; i++) {
            const header = collapses[i].children[0];
            const body = collapses[i].children[1];
            if(header && body) {
                $(header).on('click', function() {
                    if($(header).hasClass('active')) {
                        $(header).removeClass('active');
                        $(body).css('display','none');
                    }
                    else {
                        $(header).addClass('active');
                        $(body).css('display','block');
                    }
                });
            }
            else {
                ErrorHandler.error('Malformed collapse box');
                console.log(collapses[i]);
            }
        }
    }

    /*
     * activate the click and hold feature for qol tooltips
     * Example tooltip:
     * <span class="tooltip_trigger qolTooltip"><img src="https://pfq-static.com/img/pkmn/q/g/k.png" /></span>
     * <div class="tooltip_content">Test tooltip contentx</div>
     */
    static activateTooltips() {
        $('.qolTooltip').on('click',function(event) {
            $(event.target.closest('.qolTooltip')).toggleClass('lock');
            event.stopPropagation();
        });
    }

    /*
     * Options should be on be one of the json objects from resources, or formatted similarly
     * Extras are any additional options that should appear at the top, also in object format
     * The keys of each item will be used as the option value
     * The wrapping <select> is NOT created here, so its class/ID can be set more simply
     */
    static generateSelectOptions(options, extras={}) {
        let output = '';
        for(const key in extras) {
            output += '<option value="'+key+'">'+extras[key]+'</option>';
        }
        for(const key in options) {
            output += '<option value="'+key+'">'+options[key]+'</option>';
        }
        return output;
    }
}

class LocalStorageManager {
    // Look for settings that contain QoL and return them as an array of keys
    static getAllQoLSettings(includeDex=false) {
        const qolSettings = {};
        for (let i = 0, len = localStorage.length; i < len; ++i) {
            const key = localStorage.key(i);
            // the dex is the largest data element by far; allow excluding it
            if(key && key.includes('QoL') && (includeDex || !key.includes(UserPokedex.DEX_DATA_KEY))) {
                qolSettings[key] = localStorage.getItem(key);
            }
        }
        return qolSettings;
    }
    // delete ALL QoL keys in storage
    static clearAllQoLKeys() {
        for (let i = 0, len = localStorage.length; i < len; ++i) {
            const key = localStorage.key(i);
            if(key && key.includes('QoL')) {
                localStorage.removeItem(key);
            }
        }
    }

    /*
     * validates key is in QoL format, and appends the current user ID to the key
     * returns null if the key is in a bad format (use === to evaluate)
     */
    static translateKey(key) {
        if(!key.startsWith('QoL')) {
            ErrorHandler.error('Bad key format: '+ key);
            return null;
        }
        let userID = $('#core').attr('data-user');
        if(!userID) {
            userID = 'unknown';
        }
        return userID+'.'+key;
    }

    static getItem(key) {
        const tKey = LocalStorageManager.translateKey(key);
        if(tKey) {
            return localStorage.getItem(tKey);
        }
    }
    static setItem(key, value) {
        const tKey = LocalStorageManager.translateKey(key);
        if(tKey) {
            localStorage.setItem(tKey, JSON.stringify(value));
        }
    }
    static removeItem(key) {
        const tKey = LocalStorageManager.translateKey(key);
        if(tKey) {
            localStorage.removeItem(tKey);
        }
    }

    static getDexFromStorage() {
        const tKey = LocalStorageManager.translateKey(UserPokedex.DEX_DATA_KEY);
        if(!tKey) {
            return false;
        }
        const storedData = localStorage.getItem(tKey);
        if(localStorage.getItem(tKey) === null || Object.keys(JSON.parse(storedData)).length === 0) {
            return false;
        }
        const dateAndDex = JSON.parse(localStorage.getItem(tKey));
        // if QoLPokedex only contains date
        if((dateAndDex.length === 1) ||
           // or if the dex part of the array is empty
           (dateAndDex[1] === undefined) || (dateAndDex[1] === null)) {
            return false;
        }
        return dateAndDex;
    }

    static updateLocalStorageDex(DEX_DATA, dateString) {
        LocalStorageManager.setItem(UserPokedex.DEX_DATA_KEY, [dateString, DEX_DATA]);
    }
}


/**
 * This class is used to store JSON, CSS, and HTML files - the build script replaces these with the given file's contents
 */
class Resources {

    // JSON objects loaded from resource files
    static BODY_STYLE_LIST = {
        "0":"Short Blob","1":"Snake","2":"Fish","3":"Two Arms","4":"Tall Blob","5":"Dino","6":"Two Legs","7":"Four Legs","8":"Bird","9":"Jelly","10":"Multi","11":"Human","12":"Flying Bug","13":"Crawling Bug"
    };
    static COLOUR_LIST = {
        "0":"Black","1":"Blue","2":"Brown","3":"Green","4":"Grey","5":"Pink","6":"Purple","7":"Red","8":"White","9":"Yellow"
    };
    static EGG_GROUP_LIST = {
        "0":"Undiscovered","1":"Monster","2":"Dragon","3":"Field","4":"Bug","5":"Grass","6":"Water 1","7":"Water 2","8":"Water 3","9":"Amorphous","10":"Fairy","11":"Human-Like","12":"Mineral","13":"Flying","15":"Ditto"
    };
    static NATURE_LIST = {
        "1":"Serious","2":"Lonely","3":"Adamant","4":"Naughty","5":"Brave","6":"Bold","7":"Hardy","8":"Impish","9":"Lax","10":"Relaxed","11":"Modest","12":"Mild","13":"Bashful","14":"Rash","15":"Quiet","16":"Calm","17":"Gentle","18":"Careful","19":"Docile","20":"Sassy","21":"Timid","22":"Hasty","23":"Jolly","24":"Naïve","25":"Quirky"
    };
    static REGION_LIST = {
        "1":"Kanto","2":"Johto","3":"Hoenn","4":"Sinnoh","5":"Unova","6":"Kalos","7":"Alola","8":"Galar","9":"Paldea","97":"PokéFarm Q (Exclusives)","98":"PokéFarm Q (Megas)","99":"PokéFarm Q (Variants)"
    };
    static TYPE_LIST = {
        "0":"Normal","1":"Fire","2":"Water","3":"Electric","4":"Grass","5":"Ice","6":"Fighting","7":"Poison","8":"Ground","9":"Flying","10":"Psychic","11":"Bug","12":"Rock","13":"Ghost","14":"Dragon","15":"Dark","16":"Steel","17":"Fairy"
    };
    static SHELTER_SEARCH_KEYS = {
        "findNewEgg":{
            "searchKey":"Egg","display":"new egg","icon":"<img src='//pfq-static.com/img/pkmn/egg.png'>"
        },"findNewPokemon":{
            "searchKey":"Pokémon","display":"new Pokémon","icon":"<img src='//pfq-static.com/img/pkmn/pkmn.png'>"
        },"findShiny":{
            "searchKey":"SHINY","display":"Shiny","icon":"<img src='//pfq-static.com/img/pkmn/shiny.png'>"
        },"findAlbino":{
            "searchKey":"ALBINO","display":"Albino","icon":"<img src='//pfq-static.com/img/pkmn/albino.png'>"
        },"findMelanistic":{
            "searchKey":"MELANISTIC","display":"Melanistic","icon":"<img src='//pfq-static.com/img/pkmn/melanistic.png'>"
        },"findPrehistoric":{
            "searchKey":"PREHISTORIC","display":"Prehistoric","icon":"<img src='//pfq-static.com/img/pkmn/prehistoric.png'>"
        },"findDelta":{
            "searchKey":"DELTA","display":"Delta","icon":"<img src='//pfq-static.com/img/pkmn/_delta/dark.png'>"
        },"findMega":{
            "searchKey":"MEGA","display":"Mega","icon":"<img src='//pfq-static.com/img/pkmn/mega.png'>"
        },"findStarter":{
            "searchKey":"STARTER","display":"Starter","icon":"<img src='//pfq-static.com/img/pkmn/starter.png'>"
        },"findCustomSprite":{
            "searchKey":"CUSTOM SPRITE","display":"Custom Sprite","icon":"<img src='//pfq-static.com/img/pkmn/cs.png'>"
        },"findMale":{
            "searchKey":"[M]","display":"Male","icon":"<img src='//pfq-static.com/img/pkmn/gender_m.png'>"
        },"findFemale":{
            "searchKey":"[F]","display":"Female","icon":"<img src='//pfq-static.com/img/pkmn/gender_f.png'>"
        },"findNoGender":{
            "searchKey":"[N]","display":"Genderless","icon":"<img src='//pfq-static.com/img/pkmn/gender_n.png'>"
        },"findTotem":{
            "searchKey":"[TOTEM]","display":"Totem","icon":"<img src='//pfq-static.com/img/pkmn/totem.png/'>"
        },"findLegendary":{
            "searchKey":"","display":"Legendary","icon":"<img src='//pfq-static.com/img/pkmn/pkmn.png'>"
        }
    };

    // CSS files
    static CORE_CSS = `#announcements li[data-name=QoL],input[type=checkbox].qolsetting:enabled,input[type=radio].qolsetting:enabled{cursor:pointer}.qolB64Output{border:1px solid;margin-bottom:.5em;max-height:100px;overflow-y:auto;padding:3px;user-select:all;word-break:break-all}.daycarefoundme,.dojofoundme,.labfoundme,.privatefoundme,.publicfoundme,.shelterfoundme img{background-color:#d5e265;border-radius:100%;box-shadow:0 0 25px 15px #d5e265}#qolMassSelect{margin:1rem 0}.qolModal>h3:first-child a{color:inherit;float:right}.qolCollapse h3{font-size:100%;padding:2px}.qolTooltip{border-bottom:1px dotted}`;
    static FIELDS_CSS = `#fieldorder{border-radius:4px;line-height:18pt;margin:16px auto;max-width:600px;padding:4px;position:relative;text-align:center}#fieldorder label{white-space:nowrap}#fieldsearch{margin:16px auto;max-width:600px;position:relative}#pokemonclickcount.unclicked{color:#a30323}#pokemonclickcount.clicked{color:#059121}.qolFieldBerrySort .fieldmon{margin:-10px!important;top:45%!important;transition:none!important}.qolFieldBerrySort .fieldmon>img.big{animation:none!important;padding:25px!important}.qolFieldBerrySort .fieldmon[data-flavour^=any],.qolFieldBerrySort .fieldmon[data-flavour^=sour]{left:0!important}.qolFieldBerrySort .fieldmon[data-flavour^=spicy]{left:20%!important}.qolFieldBerrySort .fieldmon[data-flavour^=dry]{left:40%!important}.qolFieldBerrySort .fieldmon[data-flavour^=sweet]{left:60%!important}.qolFieldBerrySort .fieldmon[data-flavour^=bitter]{left:80%!important}.mq2 .qolFieldBerrySort .fieldmon{margin:-10px 2%!important;overflow:hidden;width:16%}.mq2 .qolFieldBerrySort .fieldmon>img.small{animation:none!important;margin-left:-13px!important;padding:50%!important}.qolFieldStack .fieldmon{left:40%!important;margin:-10px!important;top:35%!important;transition:none!important}.qolFieldStack .fieldmon>img{animation:none!important;padding:40px!important}.qolFieldStackMax>div.field>.fieldmon{height:100%!important;left:0!important;margin:0!important;padding-left:40%!important;top:0!important;transition:none!important;width:60%!important}.qolFieldStackMax>div.field>.fieldmon .small{display:none!important}.qolFieldStackMax>div.field>.fieldmon .big{animation:none!important;display:block!important}.qolFieldGrid .field{background-size:cover!important;display:flex!important;display:grid;flex-flow:row wrap;grid-template-columns:repeat(8,12.5%);grid-template-rows:repeat(5,69px);min-height:345px;padding-top:0!important}.qolFieldGrid .field .fieldmon{align-items:center;display:inline-flex;flex:1 1 12.5%;justify-content:center;margin:0!important;position:static!important}.qolFieldGrid .field .fieldmon>img{animation:none!important;max-height:70px;max-width:75px}.mq25 .qolFieldGrid .field{grid-template-rows:repeat(5,36px);min-height:180px}.qolSelectFlavour{display:none}.qolFlavourShown~#qolMassSelect .qolSelectFlavour{display:inline}.qolFlavourShown~#qolMassSelect .qolSelectGender,.qolNatureShown~#qolMassSelect .qolSelectGender{display:none}#tooltipenable{margin:16px auto;max-width:600px;position:relative}.qolPrivateField .qolHideTooltips .fieldmon.tooltip_trigger:not(.selected)+.tooltip_content,.qolPublicField .qolHideTooltips .fieldmon.tooltip_trigger:not(.lock)+.tooltip_content{display:none!important}`;
    static SEARCH_CSS = `.searchChecks>div{box-sizing:border-box;display:inline-block;padding:3px;width:33%}.searchChecks>div label{white-space:nowrap}#shelterupgrades .searchChecks>div,.mq2 .searchChecks>div{width:50%}.qolQuickSearchBlock{margin:.5rem 0}.qolQuickSearchBlock[data-type=quickNatureSearch] .pkmnState{display:none}.qolQuickSearchBlock .qolTooltip{display:inline-block;margin-left:5px}.qolQuickSearchBlock .qolTooltip img{vertical-align:middle}.qolQuickSearchInputs{column-gap:6px;display:flex}.qolQuickSearchInputs input,.qolQuickSearchInputs select{flex-grow:1}.qolQuickSearchIcons{column-gap:6px;display:flex;margin-top:.5rem}.qolQuickSearchIcons label{border-radius:3px;display:inline-block;padding:3px}.qolQuickSearchIcons label input[type=checkbox]{cursor:pointer}.qolQuickSearchIcons label.hatched div{display:inline-block;height:16px;width:18px}.qolQuickSearchIcons label.hatched div img{left:-2px;position:relative;top:-8px;vertical-align:text-top}`;
    static DOJO_CSS = `.dojoperfectstat{font-weight:700;text-decoration:underline}`;
    static FISHING_CSS = `#fishing button[data-reel].shake{padding:20px}.qolSelectGender{display:none}`;
    static FORGE_CSS = `.badgelist>table>tbody>tr>td>.itemtooltip{margin-top:-28px;position:relative}.badgelist>table>tbody>tr>td>p{margin-block-end:0;margin-block-start:0}.qolBadges{border-collapse:collapse}.qolBadgesTop td{border-top:1px solid}.qolBadgesBot td:first-of-type img{margin-right:5px;vertical-align:middle}`;
    static HUB_CSS = `.qolHubModal>div>.panel{margin-bottom:1em}.qolHubModal>div>.panel>div>p:first-child{margin-top:.25em}.qolHubModal textarea{box-sizing:border-box;width:100%}#qolConsoleContent{word-break:break-all}#qolHubSettings ul{margin:0}#qolHubSettings label{display:inline-block;margin-bottom:.25em}#glowColourPreview{background-color:#d5e265;border:1px solid;display:inline-block;height:1rem;margin-left:.5rem;vertical-align:middle;width:3rem}`;
    static LAB_CSS = `#labsuccess{text-align:center}#labfound{padding-top:20px}.boldp{font-weight:700}`;
    static PARTY_CSS = `#qolpartymod{text-align:center}#qolpartymod label{white-space:nowrap}.qolPartyCustomParty{--multiuser-button-height:60pt;--multiuser-border-radius:8px}.qolPartyCustomParty h1{align-items:center;display:flex;justify-content:center}.qolPartyCustomParty #partybox{padding-top:calc(var(--multiuser-button-height) + 1em);position:relative}.qolPartyCustomParty #partybox .party{box-shadow:none}.qolPartyCustomParty #partybox .party>div{position:static}.qolPartyCustomParty #partybox .action{height:auto!important;left:0;min-height:0;position:absolute;top:0;width:100%}.qolPartyCustomParty #partybox .action>a,.qolPartyCustomParty #partybox .action>div{line-height:var(--multiuser-button-height);margin:0;min-height:var(--multiuser-button-height);padding:0}.qolPartyCustomParty #partybox .action .berrybuttons>a{box-sizing:border-box;height:100%!important;line-height:var(--multiuser-button-height)!important;width:100%}.qolPartyCustomParty #partybox .action>a{align-items:center;box-sizing:border-box;display:flex!important;justify-content:center}.qolPartyCustomParty #partybox .action.working,.qolPartyCustomParty #partybox .action:empty,.qolPartyCustomParty #partybox .action>table,.qolPartyCustomParty #partybox .berrybuttons>.tooltip_content{display:none}.qolPartyCustomParty #partybox .party>div:hover>.action a[data-berry]:after{border-color:transparent}.qolPartyCustomParty #partybox .showcase .berrybuttons>a{display:inline-block;position:absolute;text-align:center;width:100%}.qolPartyCustomParty #partybox .showcase .berrybuttons>a img{display:inline-block!important;vertical-align:middle}.qolPartyCustomParty.qolStackMore .qolGetMore,.qolPartyCustomParty.qolStackNext .qolGoNext{height:var(--multiuser-button-height);left:0;line-height:var(--multiuser-button-height);margin:0;padding:0;position:absolute;top:0;width:100%;z-index:1}.qolPartyCustomParty.qolHideParty .party,.qolPartyCustomParty.qolHideParty .showcase{border:none;height:0;overflow:hidden;padding:0}.qolPartyCustomParty.qolHideParty .mu_navlink.toggle{display:none!important}.qolPartyCustomParty.qolCompactParty #partybox .party>div{background:transparent;border:none;margin-bottom:20px;padding:0;width:unset}.qolPartyCustomParty.qolCompactParty #partybox .party .expbar,.qolPartyCustomParty.qolCompactParty #partybox .party .name{display:none}.qolPartyCustomParty.qolCompactParty #partybox .party .pkmn a.qolCompactLink{display:block;height:100%;left:0;position:absolute;top:0;width:100%;z-index:1}.qolPartyCustomParty.qolHideFieldButton .fieldslink,.qolPartyCustomParty.qolHideModeChecks #partybox>label,.qolPartyCustomParty.qolHideTrainerCard #profilebox,.qolPartyCustomParty.qolHideUserName h1{display:none}.qolPartyCustomParty.qolHideShowcase .showcase,.qolPartyCustomParty.qolHideShowcase .showcase+.toggle{display:none!important}.qolPartyCustomParty:not(.qolHideShowcase) .showcase:not(:empty)+.mu_navlink.toggle{display:block!important}.mq2 .qolPartyCustomParty #partybox .party>div,.multi-compact .qolPartyCustomParty #partybox .party>div{display:inline-block}.mq2 .qolPartyCustomParty #partybox .party>div .pkmn,.multi-compact .qolPartyCustomParty #partybox .party>div .pkmn{margin-right:0}.qolPartyCustomParty #partybox .party .action a,.qolPartyHideAll #partybox .party .action a,.qolPartyHideDislike #partybox .party .action a,.qolPartyNiceTable #partybox .party .action a{display:none;position:absolute;width:100%}.qolPartyCustomParty #partybox .party .action .berrybuttons[data-up=any] a[data-berry=aspear],.qolPartyCustomParty #partybox .party .action .berrybuttons[data-up=bitter]>a[data-berry=rawst],.qolPartyCustomParty #partybox .party .action .berrybuttons[data-up=dry]>a[data-berry=chesto],.qolPartyCustomParty #partybox .party .action .berrybuttons[data-up=sour]>a[data-berry=aspear],.qolPartyCustomParty #partybox .party .action .berrybuttons[data-up=spicy]>a[data-berry=cheri],.qolPartyCustomParty #partybox .party .action .berrybuttons[data-up=sweet]>a[data-berry=pecha],.qolPartyCustomParty #partybox .party .action>a,.qolPartyHideAll #partybox .party .action .berrybuttons[data-up=any] a[data-berry=aspear],.qolPartyHideAll #partybox .party .action .berrybuttons[data-up=bitter]>a[data-berry=rawst],.qolPartyHideAll #partybox .party .action .berrybuttons[data-up=dry]>a[data-berry=chesto],.qolPartyHideAll #partybox .party .action .berrybuttons[data-up=sour]>a[data-berry=aspear],.qolPartyHideAll #partybox .party .action .berrybuttons[data-up=spicy]>a[data-berry=cheri],.qolPartyHideAll #partybox .party .action .berrybuttons[data-up=sweet]>a[data-berry=pecha],.qolPartyHideAll #partybox .party .action>a,.qolPartyHideDislike #partybox .party .action .berrybuttons[data-up=any] a[data-berry=aspear],.qolPartyHideDislike #partybox .party .action .berrybuttons[data-up=bitter]>a[data-berry=rawst],.qolPartyHideDislike #partybox .party .action .berrybuttons[data-up=dry]>a[data-berry=chesto],.qolPartyHideDislike #partybox .party .action .berrybuttons[data-up=sour]>a[data-berry=aspear],.qolPartyHideDislike #partybox .party .action .berrybuttons[data-up=spicy]>a[data-berry=cheri],.qolPartyHideDislike #partybox .party .action .berrybuttons[data-up=sweet]>a[data-berry=pecha],.qolPartyHideDislike #partybox .party .action>a,.qolPartyNiceTable #partybox .party .action .berrybuttons[data-up=any] a[data-berry=aspear],.qolPartyNiceTable #partybox .party .action .berrybuttons[data-up=bitter]>a[data-berry=rawst],.qolPartyNiceTable #partybox .party .action .berrybuttons[data-up=dry]>a[data-berry=chesto],.qolPartyNiceTable #partybox .party .action .berrybuttons[data-up=sour]>a[data-berry=aspear],.qolPartyNiceTable #partybox .party .action .berrybuttons[data-up=spicy]>a[data-berry=cheri],.qolPartyNiceTable #partybox .party .action .berrybuttons[data-up=sweet]>a[data-berry=pecha],.qolPartyNiceTable #partybox .party .action>a{display:inline-block}.qolPartyCustomParty #partybox .party .working .berrybuttons,.qolPartyHideAll #partybox .party .working .berrybuttons,.qolPartyHideDislike #partybox .party .working .berrybuttons,.qolPartyNiceTable #partybox .party .working .berrybuttons{opacity:.3}.qolPartyCustomParty .loading,.qolPartyHideAll .loading,.qolPartyHideDislike .loading,.qolPartyNiceTable .loading{user-select:none}.qolPartyHideAll #partybox .party>div>:not(.action),.qolPartyHideAll .tooltip_content,.qolPartyNiceTable #partybox .party>div>:not(.action),.qolPartyNiceTable .tooltip_content{display:none}.qolPartyNiceTable #profilepage #partybox .party{box-shadow:none;width:250px}.qolPartyNiceTable #profilepage #partybox .party>div{border-radius:0;border-width:1px 1px 0;width:210px}.qolPartyNiceTable #profilepage #partybox .party>div:first-child{border-radius:6px 6px 0 0}.qolPartyNiceTable #profilepage #partybox .party>div:nth-child(6){border-bottom-width:1px;border-radius:0 0 6px 6px}.qolPartyCustomParty:not(.qolHideShowcase) #partybox:not(.swap-panels) .showcase,.qolPartyHideAll:not(.qolHideShowcase) #partybox:not(.swap-panels) .showcase{border:none;display:flex!important;height:0;margin:0;overflow:hidden;padding:0}.qolPartyCustomParty #partybox.swap-panels>.party,.qolPartyHideAll #partybox.swap-panels>.party{height:0;margin:0;overflow:hidden}.qolPartyCustomParty .party .action a,.qolPartyHideAll .party .action a{z-index:3}.qolPartyCustomParty .showcase .action a,.qolPartyHideAll .showcase .action a{z-index:2}.qolPartyHideAll #profilepage #partybox .party{box-shadow:none}.qolPartyHideAll #profilepage #partybox .party>div{background:transparent;border:none;height:0;overflow:hidden;padding:0;position:unset;width:0}.qolPartyHideAll .party .action,.qolPartyHideAll .party .action .berrybuttons,.qolPartyHideAll .showcase .action,.qolPartyHideAll .showcase .action .berrybuttons{height:0;position:unset!important}.qolPartyHideAll .party .action a,.qolPartyHideAll .showcase .action a{margin-left:10px;overflow:hidden;padding:3px;position:absolute;width:112px!important}.qolPartyHideAll .party .action .berrybuttons a,.qolPartyHideAll .showcase .action .berrybuttons a{border-radius:8px;padding:5px}.qolPartyHideAll .party .action table,.qolPartyHideAll .showcase .action table{display:none}.qolPartyHideAll .compact-view-toggle+label{display:inline-block;margin:0 4px 8px}.qolPartyHideAll #profilebox,.qolPartyHideAll #trainerimage,.qolPartyHideAll .fieldslink,.qolPartyHideAll .showcase+.mu_navlink.toggle,.qolPartyHideAll .working{display:none!important}`;
    static SHELTER_CSS = `#sheltersuccess{text-align:center}#shelterfound{padding-top:20px}.qolshelterareagrid{display:flex!important;display:grid!important;flex-direction:row;flex-flow:row wrap;grid-template-columns:repeat(6,1fr);grid-template-rows:repeat(5,70px);min-height:350px}.qolshelterareagrid .pokemon{align-items:center;display:inline-block!important;display:inline-flex!important;flex:1 1 16%;justify-content:center;position:static!important}.qolshelterareagrid .pokemon img{max-height:100%;max-width:100%}.qolshelterareagrid .tooltip_content{bottom:0;position:absolute!important;transform:translateY(100%)}.qolshelterareagrid:before{display:none!important}.mq2 .qolshelterareagrid:not(.qolshelterarealarge),.qolshelterareasmall{grid-template-rows:repeat(5,35px);min-height:175px}.qolshelterarealarge .pokemon .big{display:block!important}.qolshelterarealarge .pokemon .small,.qolshelterareasmall .pokemon .big{display:none!important}.qolshelterareasmall .pokemon .small{display:block!important}`;
    static DEMO_CSS = '#thisisanexample {\n    color: yellow;\n}\n\n.thisisalsoanexample {\n    background-color: blue!important;\n}\n\nhappycssing {\n    display: absolute;\n}';

    // HTML files
    static EVOLVE_FAST_HTML = `<ul class="qolEvolveTypeList"><li class="expandlist"><h3 class="slidermenu">Normal</h3><ul class="normal 0 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Fire</h3><ul class="Fire 1 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Water</h3><ul class="Water 2 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Electric</h3><ul class="Electric 3 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Grass</h3><ul class="Grass 4 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Ice</h3><ul class="Ice 5 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Fighting</h3><ul class="Fighting 6 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Poison</h3><ul class="Poison 7 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Ground</h3><ul class="Ground 8 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Flying</h3><ul class="Flying 9 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Psychic</h3><ul class="Psychic 10 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Bug</h3><ul class="Bug 11 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Rock</h3><ul class="Rock 12 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Ghost</h3><ul class="Ghost 13 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Dragon</h3><ul class="Dragon 14 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Dark</h3><ul class="Dark 15 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Steel</h3><ul class="Steel 16 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Fairy</h3><ul class="Fairy 17 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Unknown Types</h3><ul class="Unknown 18 qolChangeLogContent"></ul></li></ul>`;
    static FARM_EVOLVE_HTML = `<label id="qolevolvenormal"><input type="button" class="qolsortnormal" value="Normal list"></label> <label id="qolchangesletype"><input type="button" class="qolsorttype" value="Sort on types"></label> <label id="qolsortevolvename"><input type="button" class="qolsortname" value="Sort on name"></label> <label id="qolevolvenew"><input type="button" class="qolsortnew" value="New dex entry"></label>`;
    static FIELD_SEARCH_HTML = `<div id="fieldsearch" class="panel accordion qolCollapse"><h3><a href="#">Advanced Field search <svg viewBox="-6 -6 12 12" width="16" height="16" class="acctoggle"><polygon fill="currentColor" points="-2,-4 4,0 -2,4"></polygon></svg></a></h3><div style="display:none;"><p>Check the boxes of Pokemon you wish to find in this field! You can select multiple checkboxes at once and it will notify you whenever it will find the types of Pokemons you selected!</p><div class="searchChecks"><div><label><input type="checkbox" class="qolsetting qolfieldsetting" name="fieldShiny">Shiny</label></div><div><label><input type="checkbox" class="qolsetting qolfieldsetting" name="fieldAlbino">Albino</label></div><div><label><input type="checkbox" class="qolsetting qolfieldsetting" name="fieldMelanistic">Melanistic</label></div><div><label><input type="checkbox" class="qolsetting qolfieldsetting" name="fieldPrehistoric">Prehistoric</label></div><div><label><input type="checkbox" class="qolsetting qolfieldsetting" name="fieldDelta">Delta</label></div><div><label><input type="checkbox" class="qolsetting qolfieldsetting" name="fieldMega">Mega</label></div><div><label><input type="checkbox" class="qolsetting qolfieldsetting" name="fieldLegend">Legendary</label></div><div><label><input type="checkbox" class="qolsetting qolfieldsetting" name="fieldStarter">Starter</label></div><div><label><input type="checkbox" class="qolsetting qolfieldsetting" name="fieldCustomSprite">Custom Sprite</label></div><div><label><input type="checkbox" class="qolsetting qolfieldsetting" name="fieldItem">Holds Item</label></div></div><h4>Search on type</h4><p>Select which types of Pokemon you wish to find</p><input type="button" value="Add type" id="addFieldTypeSearch"><div id="fieldTypes"><div class="0"></div></div><h4>Search on nature</h4><p>Select which natures of Pokemon you wish to find</p><input type="button" value="Add nature" id="addFieldNatureSearch"><div id="natureTypes"><div class="0"></div></div><h4>Search on egg group</h4><p>Select which egg groups you wish to find</p><input type="button" value="Add egg group" id="addFieldEggGroupSearch"><div id="eggGroupTypes"><div class="0"></div></div><h4>Search on gender</h4><div class="searchChecks"><div><label><input type="checkbox" class="qolsetting qolfieldsetting" name="fieldMale">Male</label></div><div><label><input type="checkbox" class="qolsetting qolfieldsetting" name="fieldFemale">Female</label></div><div><label><input type="checkbox" class="qolsetting qolfieldsetting" name="fieldNoGender">Genderless</label></div></div><h4>Search Keys</h4><div class="searchChecks"><div><label><input type="checkbox" class="qolsetting qolfieldsetting" name="fieldName">Search name</label></div><div><label><input type="checkbox" class="qolsetting qolfieldsetting" name="fieldSpecies">Search species</label></div><div><label><input type="checkbox" class="qolsetting qolfieldsetting" name="fieldSearchItem">Search item name</label></div></div><p><input type="button" value="Add searchfield" id="addTextField"></p><div id="searchkeys"><div class="0"></div></div><p></p></div></div>`;
    static FIELD_SORT_HTML = `<div id="fieldorder"><label><input type="radio" class="qolsetting" data-group="QoLPublicField" name="fieldSort" value="none"> None</label> <label><input type="radio" class="qolsetting" data-group="QoLPublicField" name="fieldSort" value="grid"> Align to grid</label> <label><input type="radio" class="qolsetting" data-group="QoLPublicField" name="fieldSort" value="berry"> Sort by berries</label> <label><input type="radio" class="qolsetting" data-group="QoLPublicField" name="fieldSort" value="stack"> Stack all</label> <label><input type="checkbox" class="qolsetting" data-group="QoLPublicField" name="fieldClickCount"> Click counter</label> <label><input type="checkbox" class="qolsetting" data-group="QoLPublicField" name="maxStack"> Maximise stacked click zone</label></div>`;
    static FIELD_TOOLTIP_HTML = `<div id="tooltipenable" class="panel accordion qolCollapse"><h3><a href="#">Tooltip Settings <svg viewBox="-6 -6 12 12" width="16" height="16" class="acctoggle"><polygon fill="currentColor" points="-2,-4 4,0 -2,4"></polygon></svg></a></h3><div style="display:none;"><p><label><input type="checkbox" class="qolsetting qolfieldsetting" name="fieldHideHoverTooltips"> Hide hover tooltip</label><br><span>Prevents tooltips from appearing when hovered. Tooltips will still appear when the Pokemon is selected by clicking/tapping.</span></p></div></div>`;
    static LAB_OPTIONS_HTML = `<div id="labCustomSearch" class="center"><p class="boldp">Egg type search</p><p>Select which egg types you would like to find in the lab. You can select multiple!</p><input type="checkbox" class="qolsetting" data-key="findTypeEgg">Egg types <input type="button" value="Add typesearch" id="addLabTypeList"><div id="labTypes"><div class="0"></div></div><p class="boldp">Egg custom search</p><p>Add the pokemon name or Img code (complete link starting from //pfq..) that you would like to find in the lab in a searchfield. You can select multiple!</p><input type="checkbox" class="qolsetting" data-key="customEgg">Custom Egg <input type="button" value="Add searchfield" id="addLabSearch"><div id="searchkeys"><div class="0"></div></div></div>`;
    static MASS_SELECT_HTML = `<div id="qolMassSelect"><label id="selectall"><input id="selectallcheckbox" type="checkbox">Select all</label> <label id="selectallmale" class="qolSelectGender"><input id="selectallmalecheckbox" type="checkbox">Select Male</label> <label id="selectallfemale" class="qolSelectGender"><input id="selectallfemalecheckbox" type="checkbox">Select Female</label> <label id="selectallgenderless" class="qolSelectGender"><input id="selectallgenderlesscheckbox" type="checkbox">Select Genderless</label> <label id="selectallany" class="qolSelectFlavour"><input id="selectallanycheckbox" type="checkbox">Select Any</label> <label id="selectallsour" class="qolSelectFlavour"><input id="selectallsourcheckbox" type="checkbox">Select Sour</label> <label id="selectallspicy" class="qolSelectFlavour"><input id="selectallspicycheckbox" type="checkbox">Select Spicy</label> <label id="selectalldry" class="qolSelectFlavour"><input id="selectalldrycheckbox" type="checkbox">Select Dry</label> <label id="selectallsweet" class="qolSelectFlavour"><input id="selectallsweetcheckbox" type="checkbox">Select Sweet</label> <label id="selectallbitter" class="qolSelectFlavour"><input id="selectallbittercheckbox" type="checkbox">Select Bitter</label></div>`;
    static PARTY_MOD_HTML = `<div id="qolpartymod"><label><input type="radio" class="qolsetting" data-group="QoLMultiuser" name="partyModType" value="none"> None</label> <label><input type="radio" class="qolsetting" data-group="QoLMultiuser" name="partyModType" value="hideDislike"> Hide disliked</label> <label><input type="radio" class="qolsetting" data-group="QoLMultiuser" name="partyModType" value="niceTable"> Table view</label> <label><input type="radio" class="qolsetting" data-group="QoLMultiuser" name="partyModType" value="hideAll"> Hide all</label> <label><input type="radio" class="qolsetting" data-group="QoLMultiuser" name="partyModType" value="customParty"> Customize</label></div><div id="qolpartymodcustom" class="panel accordion qolCollapse" style="display:none;"><h3><a href="#">Custom options <svg viewBox="-6 -6 12 12" width="16" height="16" class="acctoggle"><polygon fill="currentColor" points="-2,-4 4,0 -2,4"></polygon></svg></a></h3><div style="display:none;"><div class="customopt"><label><input type="checkbox" class="qolsetting" data-group="QoLMultiuser" name="stackNextButton">Stack next button</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-group="QoLMultiuser" name="stackMoreButton">Stack get more button</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-group="QoLMultiuser" name="showPokemon">Show pokemon</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-group="QoLMultiuser" name="compactPokemon">Compact pokemon (if shown)</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-group="QoLMultiuser" name="clickablePokemon">Clickable pokemon (if compact)</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-group="QoLMultiuser" name="showTrainerCard">Show trainer card</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-group="QoLMultiuser" name="showFieldButton">Show field button</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-group="QoLMultiuser" name="showModeChecks">Show view mode checks</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-group="QoLMultiuser" name="showUserName">Show user name</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-group="QoLMultiuser" name="includeShowcase">Include showcase</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-group="QoLMultiuser" name="hideShowcase">Hide showcase on desktop</label></div></div></div>`;
    static QOL_HUB_ICON_HTML = `<li data-name="QoL"><a title="QoL Settings" id="qolHubIcon"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAABy1BMVEX///9AQEArKytAQEA5OTkuLkY7OzswMEAuOjo1NTw0QUEzODg6Pz9LS0tSUj08QEBpaT04QDxRVE0zNjxsbjxRRjRYSi9ATj5YTDI9WkNXWVFHRjc6TT9zczxDVT8/Z0VdUTJiY090dDo+VkFKYkBcXlViZFl1dmVEOS49XkRsbVdwcWJbhEY9aEdbgUZHOCxVdkVHOCxGXUF4dzaOj3NHOS0+bEhzsk5QQi+JiDmpqYdGOi5xrU52dTI9gE5tpUuKZSKIhSo2k1Y6V0KPjCeblyS5tR4zNjo0oFw0q180u2Q0vGQ0vmU0wWY1pl03OTw3nVo7fE48PUA9ek1EbkdIckdOTjZRUDdRVFdSPSlVV1pZWDRZi0pcUkVgmEtiYTFlTClmZk5zQxZ0QxZ2TCF2dUx3VyV7WSJ8cSmAzFKNcSeP5laQaB+Q6VeR6VeR6leflCKodRmveRexgR+1gx61rR22sBq3fxfBvRLFwRDFwRHFw0nFw4LLwxjLxRHe1RDf1RPj2BHj3Qjm2xLn4Qfn4iPn5bDo3RHq3xHq5Abr5Qbr6bLw5gz07QP79AH99x3+9wD/+AD/+R7/+UL/+lv/+nT/+nX/+5H//MC4cZZXAAAAR3RSTlMABAYICQsNEBYiJzI5Ojs8P0BPVWFifH+AhY2PkZWZqa2xtLW2tr3U2NnZ293g4eLi4+To6ers7/Dz8/b29vf7/P3+/v7+/oG7ISUAAAGDSURBVCiRY2CAAh4pNXV1NSkeBlTArmrVNgMI2qxU2ZHFhbS7p0+dMnnylKnTu7WFEOK8JtMmTYSCSdNMeGHirFr9E5FAvxYrVEKxdSIKaFWEiDNZTkQDlkxgCX43ILsTJtgFxG78YAml+om9ie7xYOEJqe5hfRPrlcASsrU9FVH+7i0giaaIIPeqnlpZsASna0djeGz0BLCO6Njwxg5XTojttu0dDWV1ldU1NdWVdWUNHe22UOcKOHZ0lGaVFANBSVZpR4ejAMyHIi7NBeXpkUCQXl7Q7CKCCBM+44yihOSkpOSEogxjPpTgVShKSwGCtCIFFGEWNlGHwhwgKHQQZWOBCysb6emoSItJWFhIiEmr6OgZKUMl5ANjsnNt5Jj19ZnlbHKzYwLloRKCTn4hmfnm4vr64ub5mSF+ToJQCUZdL+/guDwDQ0ODvLhgby9dRpglHGY+vgGh9qam9qEBvj5mHAhXcWnaeXo4W1s7e3jaaXKhOJhbUkZYQ0NYRpIbKgAAWVaJegCEZTUAAAAASUVORK5CYII=" alt="QoL Settings">QoL </a><!-- The QoL hub doesn't exist until opened; store custom errors here initially instead --><ul style="display: none;" id="qolConsoleHolder"></ul></li>`;
    static QOL_HUB_HTML = `<p>Welcome to the user hub of the QoL userscript! Here you can adjust the script settings. If you need help or have suggestions, please visit the <a href="https://pokefarm.com/forum/thread/193472/Quality-of-Life-changes-UserScript">QoL's main thread</a>.</p><div class="panel"><h3>Main Settings</h3><div id="qolHubSettings"><p><b>Note</b>: Please refresh the page to see any changes made to these settings take effect.</p><div><label><input type="checkbox" class="qolsetting" data-group="QoLSettings" name="partyMod"> <span>Party click mod</span></label></div><div><label><input type="checkbox" class="qolsetting" data-group="QoLSettings" name="shelterEnable"> <span>Enable All Shelter QoL Features</span></label><ul><li><label><input type="checkbox" class="qolsetting" data-group="QoLShelterFeatures" name="search"> <span>Advanced Searching</span></label></li><li><label><input type="checkbox" class="qolsetting" data-group="QoLShelterFeatures" name="sort"> <span>Advanced Sorting</span></label></li></ul></div><div><label><input type="checkbox" class="qolsetting" data-group="QoLSettings" name="publicFieldEnable"> <span>Enable All Public Fields QoL Features</span></label><ul><li><label><input type="checkbox" class="qolsetting" data-group="QoLPublicFieldFeatures" name="search"> <span>Advanced Searching</span></label></li><li><label><input type="checkbox" class="qolsetting" data-group="QoLPublicFieldFeatures" name="sort"> <span>Advanced Sorting</span></label></li><li><label><input type="checkbox" class="qolsetting" data-group="QoLPublicFieldFeatures" name="tooltip"> <span>Tooltips</span></label></li><li><label><input type="checkbox" class="qolsetting" data-group="QoLPublicFieldFeatures" name="pkmnlinks"> <span>Pokemon Link List</span></label></li></ul></div><div><label><input type="checkbox" class="qolsetting" data-group="QoLSettings" name="privateFieldEnable"> <span>Enable All Private Fields QoL Features</span></label><ul><li><label><input type="checkbox" class="qolsetting" data-group="QoLPrivateFieldFeatures" name="search"> <span>Advanced Searching</span></label></li><li><label><input type="checkbox" class="qolsetting" data-group="QoLPrivateFieldFeatures" name="release"> <span>Multi-Select Controls (Move & Release)</span></label></li><li><label><input type="checkbox" class="qolsetting" data-group="QoLPrivateFieldFeatures" name="tooltip"> <span>Tooltips</span></label></li><li><label><input type="checkbox" class="qolsetting" data-group="QoLPrivateFieldFeatures" name="pkmnlinks"> <span>Pokemon Link List</span></label></li></ul></div><div><label><input type="checkbox" class="qolsetting" data-group="QoLSettings" name="enableDaycare"> <span>Highlight Breeding Matches</span></label></div><div><label><input type="checkbox" class="qolsetting" data-group="QoLSettings" name="fishingEnable"> <span>Fishing Multi-Select Controls</span></label></div><div><label><input type="checkbox" class="qolsetting" data-group="QoLSettings" name="easyEvolve"> <span>Easy evolving</span></label></div><div><label><input type="checkbox" class="qolsetting" data-group="QoLSettings" name="labNotifier"> <span>Lab Notifier</span></label></div><div><label><input type="checkbox" class="qolsetting" data-group="QoLSettings" name="dexFilterEnable"> <span>Multiple Types Filtering</span></label></div><div><label><input type="checkbox" class="qolsetting" data-group="QoLSettings" name="condenseWishforge"> <span>Smaller Crafted Badges List</span></label></div><div><label><input type="checkbox" class="qolsetting" data-group="QoLSettings" name="interactionsEnable"> <span>Interactions page (sent multi-link)</span></label></div><div><label><input type="checkbox" class="qolsetting" data-group="QoLSettings" name="summaryEnable"> <span>Summary page (pkmnpanel code)</span></label></div><div><label><input type="checkbox" class="qolhubsetting" data-group="QoLSettings" name="dojoEnable"> <span>Dojo page (perfect stat highlight)</span></label></div><div><div>Search Pokemon glow colour<div id="glowColourPreview"></div></div><label><input type="text" class="qolsetting" data-group="QoLSettings" name="searchGlowColour"></label></div></div></div><div class="panel"><h3>Pokédex Settings</h3><div><p>If newly added Pokémon are not matching properly, your dex may be out of date. You can try clearing your cached dex to get the new data. If that doesn't help, the new Pokémon may not have been added yet - please report it in the QoL thread.</p><p>Date last updated: <span id="qolDexDate">[unknown]</span> <button type="button" id="clearCachedDex">Clear Cached Dex</button></p></div></div><div class="panel"><h3>Custom CSS</h3><div><p>Add your custom CSS! If you have an error in your CSS you won't get notified, so read your code carefully. Still doesn't work? Try: '!important'. The custom CSS is being loaded after the page loads, so it's possible that there will be a short delay before your CSS changes apply. Note: LESS formatting and skin color vars are not supported; if you're copying LESS-formatted code from a guide, you should <a href="https://lesscss.org/less-preview/" target="_blank">convert it to plain CSS first.</a></p><textarea id="qolcustomcss" rows="15" class="qolsetting" data-group="QoLSettings" name="customCss"></textarea></div></div><div class="panel"><h3>Setting Management</h3><div><p>You can reset some or all of the script settings here. If this script misbehaving after an update, this could help. Caution: You cannot undo this action.</p><p>Reset page settings:<br><!-- Option values correspond to the setting group keys --> <select id="qolHubResetSettingsSelect"><option value="None">None</option></select> <button type="button" id="resetPageSettings">Reset</button></p><p><button type="button" id="resetAllSettings">Reset ALL Settings</button></p><p></p><div>The QoL settings are stored in a cookie on your browser. You may be asked to post them when reporting bugs. <button type="button" id="qolExportSettings">Get settings</button><p></p><div id="qolStorageOutput" class="qolB64Output" style="display: none;"></div><p></p></div></div></div><div class="panel"><h3>Debugging</h3><div><div>Some QoL features may log problems or errors here. You may be asked about this when reporting bugs. <button type="button" id="qolErrorConsole">View errors</button></div><ul id="qolConsoleContent"></ul></div></div><p style="text-align: right"><button type="button" class="modalClose">Close</button></p>`;
    static SHELTER_SEARCH_HTML = `<p>Enter search criteria below to highlight specific Pokemon. Use the letter 'n' key to select and cycle through the Pokemon matched by the script.</p><div class="searchChecks"><div><label><input type="checkbox" class="qolsetting" data-group="QoLShelter" name="findNewEgg">New Egg</label></div><div><label><input type="checkbox" class="qolsetting" data-group="QoLShelter" name="findNewPokemon">New Pokemon</label></div><div><label><input type="checkbox" class="qolsetting" data-group="QoLShelter" name="findShiny">Shiny</label></div><div><label><input type="checkbox" class="qolsetting" data-group="QoLShelter" name="findAlbino">Albino</label></div><div><label><input type="checkbox" class="qolsetting" data-group="QoLShelter" name="findMelanistic">Melanistic</label></div><div><label><input type="checkbox" class="qolsetting" data-group="QoLShelter" name="findPrehistoric">Prehistoric</label></div><div><label><input type="checkbox" class="qolsetting" data-group="QoLShelter" name="findDelta">Delta</label></div><div><label><input type="checkbox" class="qolsetting" data-group="QoLShelter" name="findMega">Mega</label></div><div><label><input type="checkbox" class="qolsetting" data-group="QoLShelter" name="findStarter">Starter</label></div><div><label><input type="checkbox" class="qolsetting" data-group="QoLShelter" name="findCustomSprite">Custom Sprite</label></div><div><label><input type="checkbox" class="qolsetting" data-group="QoLShelter" name="findTotem">Totem</label></div><div><label><input type="checkbox" class="qolsetting" data-group="QoLShelter" name="findLegendary">Legendary</label></div></div><h4 style="margin-block-end:0.5em;">Quick search</h4><div class="qolQuickSearchBlock"><button type="button" id="qolQuickNameBtn">Add name search</button> <span class="tooltip_trigger qolTooltip"><img src="https://pfq-static.com/img/pkmn/q/g/k.png"></span><div class="tooltip_content">Search for all or part of a Pokemon's species name.<p>To seach for a specific forme, use the forme specifier as in the [pkmn] icon BBCode<br>Example: <b>Vulpix/Alolan Forme</b></p><p>To search for the base form while excluding the alternate formes, add a / at the end<br>Example: <b>Vulpix/</b> (Kanto only)</p><p>To search for an img code, your search term must include "pkmn/"<br>Example: <b>img/pkmn/s/o/y/s.png</b> (dark purple Flabébé)</p></div></div><div id="qolQuickNameContainer"></div><hr><div class="qolQuickSearchBlock"><button type="button" id="qolQuickTypeBtn">Add type search</button></div><div id="qolQuickTypeContainer"></div><hr><div class="qolQuickSearchBlock"><button type="button" id="qolQuickNatureBtn">Add nature search</button></div><div id="qolQuickNatureContainer"></div><h4 style="margin-block-end:0.5em;">Advanced search</h4><p>(coming soon!)</p><!--<button type="button" id="qolNewAdvancedSearchBtn">New search</button> 
  <div id="qolAdvancedShelterSearches"></div>--></div>`;
    static SHELTER_SORT_HTML = `<label><input type="checkbox" class="qolsetting" data-group="QoLShelter" name="shelterGrid"><span>Sort by Grid</span></label><div style="padding: 5px">Sprite size mode:<p style="margin: 5px 0"><label><input type="radio" class="qolsetting" data-group="QoLShelter" name="shelterSpriteSize" value="auto"> Automatic</label></p><p style="margin: 5px 0"><label><input type="radio" class="qolsetting" data-group="QoLShelter" name="shelterSpriteSize" value="large"> Large</label></p><p style="margin: 5px 0"><label><input type="radio" class="qolsetting" data-group="QoLShelter" name="shelterSpriteSize" value="small"> Small</label></p></div>`;
    static QUICK_SEARCH_ICONS = `<div class="qolQuickSearchIcons"><label class="pkmnState"><input type="checkbox" name="qolQsEgg"> <img src="img/pkmn/egg.png" alt="Egg"></label> <label class="hatched pkmnState"><input type="checkbox" name="qolQsPkmn"><div><img src="img/pkmn/m/m/h.png" alt="Hatched Pokemon"></div></label> <label><input type="checkbox" name="qolQsMale"> <img src="img/pkmn/gender_m.png" alt="Male"></label> <label><input type="checkbox" name="qolQsFemale"> <img src="img/pkmn/gender_f.png" alt="Female"></label> <label><input type="checkbox" name="qolQsGenderless"> <img src="img/pkmn/gender_n.png" alt="Genderless"></label></div>`;

    // Static dex data
    static DEFAULT_DEX = [{
        "dexID":"001","species":"Bulbasaur","forme":"","type1":"4","type2":"7","eggGroup1":"5","eggGroup2":"1","legendary":false,"colour":"3","bodyStyle":"7","evolvesAt":16,"region":"1"
    },{
        "dexID":"002","species":"Ivysaur","forme":"","type1":"4","type2":"7","eggGroup1":"5","eggGroup2":"1","legendary":false,"colour":"3","bodyStyle":"7","evolvesAt":32,"region":"1"
    },{
        "dexID":"003","species":"Venusaur","forme":"","type1":"4","type2":"7","eggGroup1":"5","eggGroup2":"1","legendary":false,"colour":"3","bodyStyle":"7","evolvesAt":"","region":"1"
    },{
        "dexID":"003-M","species":"Venusaur","forme":"Mega Forme","type1":"4","type2":"7","eggGroup1":"5","eggGroup2":"1","legendary":false,"colour":"3","bodyStyle":"7","evolvesAt":"","region":"1"
    },{
        "dexID":"004","species":"Charmander","forme":"","type1":"1","type2":null,"eggGroup1":"2","eggGroup2":"1","legendary":false,"colour":"7","bodyStyle":"5","evolvesAt":16,"region":"1"
    },{
        "dexID":"005","species":"Charmeleon","forme":"","type1":"1","type2":null,"eggGroup1":"2","eggGroup2":"1","legendary":false,"colour":"7","bodyStyle":"5","evolvesAt":36,"region":"1"
    },{
        "dexID":"006","species":"Charizard","forme":"","type1":"1","type2":"9","eggGroup1":"2","eggGroup2":"1","legendary":false,"colour":"7","bodyStyle":"5","evolvesAt":"","region":"1"
    },{
        "dexID":"006-X","species":"Charizard","forme":"Mega Forme X","type1":"1","type2":"14","eggGroup1":"2","eggGroup2":"1","legendary":false,"colour":"0","bodyStyle":"5","evolvesAt":"","region":"1"
    },{
        "dexID":"006-Y","species":"Charizard","forme":"Mega Forme Y","type1":"1","type2":"9","eggGroup1":"2","eggGroup2":"1","legendary":false,"colour":"7","bodyStyle":"5","evolvesAt":"","region":"1"
    },{
        "dexID":"007","species":"Squirtle","forme":"","type1":"2","type2":null,"eggGroup1":"6","eggGroup2":"1","legendary":false,"colour":"1","bodyStyle":"5","evolvesAt":16,"region":"1"
    },{
        "dexID":"008","species":"Wartortle","forme":"","type1":"2","type2":null,"eggGroup1":"6","eggGroup2":"1","legendary":false,"colour":"1","bodyStyle":"5","evolvesAt":36,"region":"1"
    },{
        "dexID":"009","species":"Blastoise","forme":"","type1":"2","type2":null,"eggGroup1":"6","eggGroup2":"1","legendary":false,"colour":"1","bodyStyle":"5","evolvesAt":"","region":"1"
    },{
        "dexID":"009-M","species":"Blastoise","forme":"Mega Forme","type1":"2","type2":null,"eggGroup1":"6","eggGroup2":"1","legendary":false,"colour":"1","bodyStyle":"5","evolvesAt":"","region":"1"
    },{
        "dexID":"010","species":"Caterpie","forme":"","type1":"11","type2":null,"eggGroup1":"4","eggGroup2":null,"legendary":false,"colour":"3","bodyStyle":"13","evolvesAt":7,"region":"1"
    },{
        "dexID":"011","species":"Metapod","forme":"","type1":"11","type2":null,"eggGroup1":"4","eggGroup2":null,"legendary":false,"colour":"3","bodyStyle":"1","evolvesAt":10,"region":"1"
    },{
        "dexID":"012","species":"Butterfree","forme":"","type1":"11","type2":"9","eggGroup1":"4","eggGroup2":null,"legendary":false,"colour":"8","bodyStyle":"12","evolvesAt":"","region":"1"
    },{
        "dexID":"013","species":"Weedle","forme":"","type1":"11","type2":"7","eggGroup1":"4","eggGroup2":null,"legendary":false,"colour":"2","bodyStyle":"13","evolvesAt":7,"region":"1"
    },{
        "dexID":"014","species":"Kakuna","forme":"","type1":"11","type2":"7","eggGroup1":"4","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"1","evolvesAt":10,"region":"1"
    },{
        "dexID":"015","species":"Beedrill","forme":"","type1":"11","type2":"7","eggGroup1":"4","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"12","evolvesAt":"","region":"1"
    },{
        "dexID":"015-M","species":"Beedrill","forme":"Mega Forme","type1":"11","type2":"7","eggGroup1":"4","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"12","evolvesAt":"","region":"1"
    },{
        "dexID":"016","species":"Pidgey","forme":"","type1":"0","type2":"9","eggGroup1":"13","eggGroup2":null,"legendary":false,"colour":"2","bodyStyle":"8","evolvesAt":18,"region":"1"
    },{
        "dexID":"017","species":"Pidgeotto","forme":"","type1":"0","type2":"9","eggGroup1":"13","eggGroup2":null,"legendary":false,"colour":"2","bodyStyle":"8","evolvesAt":36,"region":"1"
    },{
        "dexID":"018","species":"Pidgeot","forme":"","type1":"0","type2":"9","eggGroup1":"13","eggGroup2":null,"legendary":false,"colour":"2","bodyStyle":"8","evolvesAt":"","region":"1"
    },{
        "dexID":"018-M","species":"Pidgeot","forme":"Mega Forme","type1":"0","type2":"9","eggGroup1":"13","eggGroup2":null,"legendary":false,"colour":"2","bodyStyle":"8","evolvesAt":"","region":"1"
    },{
        "dexID":"019","species":"Rattata","forme":"","type1":"0","type2":null,"eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"6","bodyStyle":"7","evolvesAt":20,"region":"1"
    },{
        "dexID":"019r7","species":"Rattata","forme":"Alolan Forme","type1":"15","type2":"0","eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"0","bodyStyle":"7","evolvesAt":20,"region":"1"
    },{
        "dexID":"020","species":"Raticate","forme":"","type1":"0","type2":null,"eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"2","bodyStyle":"7","evolvesAt":"","region":"1"
    },{
        "dexID":"020r7","species":"Raticate","forme":"Alolan Forme","type1":"15","type2":"0","eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"0","bodyStyle":"7","evolvesAt":"","region":"1"
    },{
        "dexID":"020t7","species":"Raticate","forme":"Alolan Totem Forme","type1":"15","type2":"0","eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"0","bodyStyle":"7","evolvesAt":"","region":"1"
    },{
        "dexID":"021","species":"Spearow","forme":"","type1":"0","type2":"9","eggGroup1":"13","eggGroup2":null,"legendary":false,"colour":"2","bodyStyle":"8","evolvesAt":20,"region":"1"
    },{
        "dexID":"022","species":"Fearow","forme":"","type1":"0","type2":"9","eggGroup1":"13","eggGroup2":null,"legendary":false,"colour":"2","bodyStyle":"8","evolvesAt":"","region":"1"
    },{
        "dexID":"023","species":"Ekans","forme":"","type1":"7","type2":null,"eggGroup1":"3","eggGroup2":"2","legendary":false,"colour":"6","bodyStyle":"1","evolvesAt":22,"region":"1"
    },{
        "dexID":"024","species":"Arbok","forme":"","type1":"7","type2":null,"eggGroup1":"3","eggGroup2":"2","legendary":false,"colour":"6","bodyStyle":"1","evolvesAt":"","region":"1"
    },{
        "dexID":"025","species":"Pichu","forme":"","type1":"3","type2":null,"eggGroup1":"0","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"7","evolvesAt":"","region":"1"
    },{
        "dexID":"026","species":"Pikachu","forme":"","type1":"3","type2":null,"eggGroup1":"10","eggGroup2":"3","legendary":false,"colour":"9","bodyStyle":"7","evolvesAt":"","region":"1"
    },{
        "dexID":"027","species":"Raichu","forme":"","type1":"3","type2":null,"eggGroup1":"10","eggGroup2":"3","legendary":false,"colour":"9","bodyStyle":"5","evolvesAt":"","region":"1"
    },{
        "dexID":"027r7","species":"Raichu","forme":"Alolan Forme","type1":"3","type2":"10","eggGroup1":"10","eggGroup2":"3","legendary":false,"colour":"2","bodyStyle":"5","evolvesAt":"","region":"1"
    },{
        "dexID":"028","species":"Sandshrew","forme":"","type1":"8","type2":null,"eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"5","evolvesAt":22,"region":"1"
    },{
        "dexID":"028r7","species":"Sandshrew","forme":"Alolan Forme","type1":"5","type2":"16","eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"8","bodyStyle":"5","evolvesAt":"","region":"1"
    },{
        "dexID":"029","species":"Sandslash","forme":"","type1":"8","type2":null,"eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"5","evolvesAt":"","region":"1"
    },{
        "dexID":"029t","species":"Sandslash","forme":"Totem Forme Q","type1":"8","type2":null,"eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"5","evolvesAt":"","region":"1"
    },{
        "dexID":"029r7","species":"Sandslash","forme":"Alolan Forme","type1":"5","type2":"16","eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"1","bodyStyle":"5","evolvesAt":"","region":"1"
    }];

}

class DaycareMatches {
    static SETTING_ENABLE = 'enableDaycare';

    constructor() {
        if(UserDataHandle.getSettings().QoLSettings[DaycareMatches.SETTING_ENABLE]) {
            this.setupObservers();
        }
    }

    setupObservers() {
        const self = this;
        Helpers.addObserver(document.querySelector('body'), {
            childList: true,
            subtree: true
        }, function(mutations) {
            mutations.forEach(function (mutation) {
                /*
                 * const fsPokemon = document.querySelector('#fs_pokemon');
                 * TODO: detect if this mutation is actually a field loading
                 * (same in dojo)
                 */
                const fsPokemon = $('#fs_pokemon');
                if (fsPokemon.length > 0 && $.contains(fsPokemon[0], mutation.target)) {
                    self.customSearch();
                }
            });
        });
    }

    customSearch() {
        const button = document.querySelector('#pkmnadd');

        let gender = null;
        let eggGroup1 = null, eggGroup2 = null;

        if (button !== null) {
            if (button.attributes['data-gender'] !== undefined) {
                gender = button.attributes['data-gender'].value;
            }
            /*
             * the egg group is binary coded decimal
             * if a pokemon has two egg groups, the leftmost 4 bits of the number returned
             * are the first egg group and the rightmost 4 bits are the second egg group
             */
            if (button.attributes['data-egggroup'] !== undefined) {
                eggGroup1 = parseInt(button.attributes['data-egggroup'].value);
                if (eggGroup1 > 15) { // two egg groups
                    eggGroup2 = eggGroup1 & 15;
                    eggGroup1 = eggGroup1 >> 4;
                }
            }
        }

        const EGG_ID_TO_NAME = Resources.EGG_GROUP_LIST;
        if (eggGroup1 !== null) { eggGroup1 = EGG_ID_TO_NAME[eggGroup1]; }
        if (eggGroup2 !== null) { eggGroup2 = EGG_ID_TO_NAME[eggGroup2]; }

        // clear matches
        $('.daycarefoundme').removeClass('daycarefoundme');

        if (gender !== null && eggGroup1 !== null) {
            const fieldmons = document.querySelectorAll('.fieldmon');
            if (fieldmons !== null) {
                for (let m = 0; m < fieldmons.length; m++) {
                    const mon = fieldmons[m];
                    const searchPokemonBigImg = $(mon)[0].childNodes[0];
                    const searchPokemon = searchPokemonBigImg.alt;

                    const tooltip = $(mon).next();
                    const fieldmontip = tooltip[0].querySelector('.fieldmontip');
                    const speciesDiv = $(fieldmontip).children(':contains(Species)')[0];
                    const eggGroupDiv = $(fieldmontip).children(':contains(Egg Group)')[0];
                    const searchIcons = speciesDiv.querySelector('span').querySelectorAll('img');

                    /*
                     * There can be other icons if the Pokemon is CS/Delta/Shiny/Albino/Melan
                     * The gender title can be "[M], [F], [N]"
                     */
                    const searchGender = searchIcons[0].title.toLowerCase().substring(1, 2);
                    const searchEggGroups = $(eggGroupDiv).text().slice('Egg Group: '.length).split('/');

                    // Match Ditto in Daycare to anything that can breed
                    if (gender === 'd' && eggGroup1 === 'Ditto' &&
                        searchPokemon !== 'Ditto' && searchEggGroups[0] !== 'Undiscovered') {
                        $(mon).addClass('daycarefoundme');
                    }
                    // Match Ditto in field to anything that can breed
                    else if (eggGroup1 !== 'Ditto' && searchPokemon === 'Ditto' && eggGroup1 !== 'Undiscovered') {
                        $(mon).addClass('daycarefoundme');
                    }
                    // Match correct gender
                    else {
                        const genderCorrect = (gender === 'f' && searchGender === 'm') ||
                            (gender === 'm' && searchGender === 'f');
                        const group1Correct = searchEggGroups.reduce((res, curr) => { res = res || (eggGroup1 === curr); return res; }, false);
                        let group2Correct = false;
                        if (eggGroup2 !== null) {
                            group2Correct = searchEggGroups.reduce((res, curr) => { res = res || (eggGroup2 === curr); return res; }, false);
                        }

                        if (genderCorrect && (group1Correct || group2Correct)) {
                            $(mon).addClass('daycarefoundme');
                        }
                    }

                }
            }
        }
    }
}

class DexPageFilters {
    static SETTING_ENABLE = 'dexFilterEnable';

    constructor() {
        if(UserDataHandle.getSettings().QoLSettings[DexPageFilters.SETTING_ENABLE]) {
            this.setupHTML();
            this.setupObservers();
            this.setupHandlers();
        }
        else {
            console.log('DexPageFilters features disabled');
        }
    }

    setupObservers() {
        const self = this;
        Helpers.addObserver(document.querySelector('#regionslist'), {
            childList: true,
            subtree: true,
        }, function() {
            self.applyTypeFilters();
        });
    }

    setupHTML() {
        const elem = document.querySelector('.filter-type');
        const clone = elem.cloneNode(true);
        elem.parentNode.appendChild(clone);
        /*
         * can't remove filter-type class or else the filtering
         * won't look right
         */
        $(clone).addClass('filter-type-2');
    }

    setupHandlers() {
        const self = this;
        let h = $.parseJSON($('#dexdata').html());
        const type2 = $('.filter-type-2');
        const l = $('.filter-type-2 .types');
        const c = l.children();

        const typesSpan = $('.filter-type-2 .types');

        type2.on('mousedown.dextfilter touchstart.dextfilter', function (event) {
            event.preventDefault();
            const leftedge = typesSpan.offset().left;
            const width = typesSpan.width();
            const rightedge = leftedge + width;
            let xLocation = (event.originalEvent.touches ? event.originalEvent.touches[0] : event).pageX;
            if (xLocation >= leftedge & xLocation < rightedge) {
                xLocation -= leftedge;
                xLocation = Math.floor(xLocation / width * c.length);
                xLocation = c.eq(xLocation);
                if (xLocation.data('type') == h) {
                    h = null;
                    self.toggleSelectedTypes();
                    self.applyTypeFilters();
                } else {
                    h = xLocation.data('type');
                    self.toggleSelectedTypes(xLocation);
                    self.applyTypeFilters();
                }
            } else {
                self.toggleSelectedTypes();
                self.applyTypeFilters();
            }
        });
    }

    toggleSelectedTypes(b) {
        const g = $('.filter-type-2 .name i');
        const l = $('.filter-type-2 .types');
        const c = l.children();

        l.addClass('selected');
        c.removeClass('selected');
        if (b && b.length && !b.hasClass('selected')) {
            b.addClass('selected');
            g.text(b.data('type').charAt(0).toUpperCase() + b.data('type').slice(1));
        } else {
            l.removeClass('selected');
            g.text('');
        }
    }

    applyTypeFilters() {
        const l1 = $('.entry.filter-type:not(.filter-type-2) .types');
        const l = $('.entry.filter-type-2 .types');
        const c1 = l1.children();
        const c = l.children();

        // get the first filter type
        const a1 = c1.filter('.selected').data('type');
        const a = c.filter('.selected').data('type');

        let selector = '.region-entries>li.entry';
        if (a1 !== undefined) {
            selector += '.t-' + a1;
        }
        if (a !== undefined) {
            selector += '.t-' + a;
        }
        if (a1 || a) {
            // Set "display" to "none" for all elements
            $('.region-entries>li.entry').css('display', 'none');
            // Set "display" to "inline-block" for elements matching selector
            $(selector).css('display', 'inline-block');
        } else {
            $(selector).css('display', 'inline-block');
        }
    }
}

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
                /*
                 * const fsPokemon = document.querySelector('#fs_pokemon');
                 * TODO: detect if this mutation is actually a field loading
                 * (same in daycare)
                 */
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

class EasyEvolve {
    static SETTING_ENABLE = 'easyEvolve';

    constructor() {
        if(UserDataHandle.getSettings().QoLSettings[EasyEvolve.SETTING_ENABLE]) {
            console.log('TODO: EasyEvolve features');
        }
        else {
            console.log('EasyEvolve features disabled');
        }
    }
}

class Fields {
    constructor(page) {
        const settings = UserDataHandle.getSettings();
        // determine if this is public vs private so the correct settings can be used
        if(page.name=='privateFields') {
            this.SETTING_ENABLE = PrivateFields.SETTING_ENABLE;
            this.SETTING_KEY = PrivateFields.SETTING_KEY;
            this.SUB_SETTINGS = PrivateFields.SUB_SETTINGS;
            $('#content').addClass('qolPrivateField');
        }
        else if(page.name=='publicFields') {
            this.SETTING_ENABLE = PublicFields.SETTING_ENABLE;
            this.SETTING_KEY = PublicFields.SETTING_KEY;
            this.SUB_SETTINGS = PublicFields.SUB_SETTINGS;
            $('#content').addClass('qolPublicField');
        }
        else {
            console.error('Unknown field page');
            ErrorHandler.error('Unknown field page: '+page.name);
            return;
        }
        // check if the master setting is enabled
        if(settings.QoLSettings[this.SETTING_ENABLE]) {
            Helpers.addGlobalStyle(Resources.FIELDS_CSS);
            Helpers.addGlobalStyle(Resources.SEARCH_CSS);
            // if specific features are enabled, run them
            if(settings[this.SUB_SETTINGS].pkmnlinks) {
                this.pkmnLinks();
            }
            if(settings[this.SUB_SETTINGS].tooltip) {
                this.setupTooltips(settings);
            }
            if(settings[this.SUB_SETTINGS].search) {
                this.setupSearch(settings);
                this.runSearch();
                const self = this;
                Helpers.addObserver(document.querySelector('#field_field'), {
                    childList: true,
                    subtree: true,
                }, function(mutations) {
                    /*
                     * TODO: does this need to detect what's in mutations?
                     * if so, consider also PublicFields.setupObservers
                     */
                    console.warn(mutations);
                    self.runSearch();
                });
            }
            Helpers.activateCollapses();
            // set data-group based on public vs private
            $('input.qolfieldsetting').attr('data-group',this.SETTING_KEY);
            settings.addSettingsListeners();
        }
        // don't log when disabled here, leave that to the unique classes
    }

    pkmnLinks() {
        // add modal button next to farm name
        const header = document.getElementsByTagName('h1')[0];
        const newBtn = document.createElement('button');
        header.appendChild(newBtn);
        newBtn.innerText = 'View links';
        newBtn.style= 'vertical-align:middle;margin-left: 10px;';

        const self = this;
        newBtn.onclick = function(){
            let content = '<table style="border-collapse:collapse;">';
            const fieldmon = document.getElementsByClassName('fieldmon');
            for(let i=0; i<fieldmon.length; i++){
                if(i%4==0) {
                    content += '<tr>';
                }
                const pkmnID = fieldmon[i].getAttribute('data-id');
                const small = fieldmon[i].children[1];
                const imgSRC = small.getAttribute('src');
                const pkmnName = small.getAttribute('alt');
                content += '<td style="padding:5px;border:1px solid;">' +
                          '<img style="vertical-align:middle;" src="'+imgSRC+'"> ' +
                          '<a href="/summary/'+pkmnID+'">'+pkmnName+'</a></td>';
                if(i%4==3) {
                    content += '</tr>';
                }
            }
            content += '</table>';
            self.pkmnLinksModal = new Modal('Pokemon links', content);
            self.pkmnLinksModal.open();
        };
    }

    // enable the tooltip collapse, and enable the input/setting listeners
    setupTooltips(settings) {
        $('#content').append(Resources.FIELD_TOOLTIP_HTML);
        const self = this;
        settings.registerChangeListener(function(changeDetails) {
            if(changeDetails.settingName == 'fieldHideHoverTooltips') {
                self.hideTooltips(settings);
            }
        });
        this.hideTooltips(settings);
    }
    // add & remove the class that hides hover tooltips based on the current setting
    hideTooltips(settings) {
        if(settings[this.SETTING_KEY].fieldHideHoverTooltips) {
            $('#field_field').addClass('qolHideTooltips');
        }
        else {
            $('#field_field').removeClass('qolHideTooltips');
        }
    }

    setupSearch(settings) {
        const self = this;
        $('#content').append(Resources.FIELD_SEARCH_HTML);
        // if any related settings change, re-run the search
        settings.registerChangeListener(function(changeDetails) {
            if(changeDetails.settingGroup==self.SETTING_KEY) {
                self.runSearch();
            }
        });

        /*
         * TODO: display existing search values
         * TODO: search term buttons & resulting box listeners
         */

        // handlers to add/remove search options
        $(document).on('click', '#addFieldTypeSearch', (function() {
            console.log('add type');
            console.log(this);
        }));
        $(document).on('click', '#removeFieldTypeSearch', (function() {
            console.log('remove type');
            console.log(this);
        }));
        $(document).on('click', '#addFieldNatureSearch', (function() {
            console.log('add nature');
            console.log(this);
        }));
        $(document).on('click', '#removeFieldNature', (function() {
            console.log('remove nature');
            console.log(this);
        }));
        $(document).on('click', '#addFieldEggGroupSearch', (function() {
            console.log('add egg group');
            console.log(this);
        }));
        $(document).on('click', '#removeFieldEggGroup', (function() {
            console.log('remove egg group');
            console.log(this);
        }));
        $(document).on('click', '#addTextField', (function() {
            console.log('add text field');
            console.log(this);
        }));
        $(document).on('click', '#removeTextField', (function() {
            console.log('remove text field');
            console.log(this);
        }));
    }

    runSearch() {
        console.warn('TODO: field search');
        // something like... read current settings, iterate over pkmn, call tooltip parser, decide if highlight?
    }

    static parseFieldPokemonTooltip(tooltip) {
        const dataElements = $(tooltip).children(0).children();
        let index = 1;
        // nickname
        const nickname = dataElements[index].textContent;
        if (!nickname) {
            console.error(`Helpers.parseFieldPokemonTooltip - nickname '${nickname}' (is not a valid name)`);
        }
        index++;

        /*
         * Issue #59 - Pokefarm added a new h3 element after the nickname
         * that contains no data
         */
        index++;

        // species
        let species = '';
        if (dataElements[index].textContent) {
            const tc = dataElements[index].textContent;
            const tcSplit = tc.trim().split(':  ');
            if (tcSplit.length == 1) {
                console.error('Helpers.parseFieldPokemonTooltip - species text does not contain \':  \'');
            }
            else {
                species = tcSplit[1];
            }
        }
        index++;

        // dataElements[3] will be a forme if the pokemon has a forme
        let forme = '';
        if (dataElements[index].textContent &&
            dataElements[index].textContent.startsWith('Forme')) {
            forme = dataElements[index].textContent.substr('Forme: '.length);
            index++;
        }

        // types
        const typeElements = $(dataElements[index]).children().slice(1);
        const typeUrls = typeElements.map(idx => typeElements[idx]['src']);
        let types = typeUrls.map(idx =>
            typeUrls[idx].substring(typeUrls[idx].indexOf('types/') + 'types/'.length,
                typeUrls[idx].indexOf('.png')));
        types = types.map(idx => types[idx].charAt(0).toUpperCase() + types[idx].substring(1));
        //types = types.map(idx => Globals.TYPE_LIST.indexOf(types[idx]));
        types = types.map(idx => Object.values(Resources.TYPE_LIST).indexOf(types[idx]));
        // TODO: this is very hacky, consider cleaning up this whole builder
        index++;

        // level
        let level = -1;
        if (dataElements[index].textContent) {
            const tcSplit = dataElements[index].textContent.split(' ');
            if (tcSplit.length > 1) {
                level = parseInt(tcSplit[1]);
            }
        } else {
            console.error('Helpers.parseFieldPokemonToolTip - could not load level because text was empty');
        }
        index++;

        // if the pokemon's happiness is less than max, skip the next index, since it will be a progress bar
        if (!dataElements[index].textContent ||
            !dataElements[index].textContent.startsWith('Happiness')) {
            index++;
        }

        // happiness
        let happiness = -1;
        if (dataElements[index].textContent) {
            const tcSplit = dataElements[index].textContent.split(' ');
            if (tcSplit.length > 1) {
                happiness = tcSplit[1].trim();
                happiness = (happiness == 'MAX') ? 100 : parseInt(happiness.substring(0, happiness.length - 1));
            }
        } else {
            console.error('Helpers.parseFieldPokemonToolTip - could not load happiness because text was empty');
        }
        index++;

        // nature
        let nature = -1;
        if (dataElements[index].textContent) {
            const tcSplit = dataElements[index].textContent.split(' ');
            if (tcSplit.length > 1) {
                nature = tcSplit[1].replace('(', '').trim();
                //nature = Resources.NATURE_LIST.indexOf(nature); // .substring(0, nature.length-1))
            }
        } else {
            console.error('Helpers.parseFieldPokemonToolTip - could not load nature because text was empty');
        }
        index++;

        // held item
        let item = '';
        if (dataElements[index].textContent !== 'Item: None') {
            item = dataElements[index].textContent.substring(dataElements[8].textContent.indexOf(' ') + 1);
        } else {
            item = 'None';
        }
        index++;

        // egg groups
        let eggGroups = [];
        if (dataElements[index].textContent) {
            eggGroups = dataElements[index].textContent.substring('Egg Group: '.length).split('/');
        }
        else {
            console.error('Helpers.parseFieldPokemonToolTip - could not load egg groups because text was empty');
        }
        index++;

        const tooltipData = {
            'nickname': nickname,
            'species': species,
            'types': types,
            'level': level,
            'happiness_percent': happiness,
            'nature': nature,
            'item': item,
            'eggGroups': eggGroups,
        };
        if (forme !== '') {
            tooltipData.forme = forme;
        }
        return tooltipData;
    }
}

class Fishing {
    static SETTING_ENABLE = 'fishingEnable';

    constructor() {
        if(UserDataHandle.getSettings().QoLSettings[Fishing.SETTING_ENABLE]) {
            // add CSS always
            Helpers.addGlobalStyle(Resources.FISHING_CSS);
            if(document.getElementById('caughtfishcontainer')) {
                this.multiSelectControls();
            }
        }
        else {
            console.log('Fishing features disabled');
        }
    }

    multiSelectControls() {
        const caughtFishLabel = document.querySelector('#caughtfishcontainer label');
        if(caughtFishLabel) {
            caughtFishLabel.insertAdjacentHTML('afterend', Resources.MASS_SELECT_HTML);
        }

        $('#selectallcheckbox').on('click', function () {
            $('li[data-flavour]>label>input').prop('checked', this.checked);
        });

        $('#selectallanycheckbox').on('click', function () {
            $('li[data-flavour=Any]>label>input').prop('checked', this.checked);
        });

        $('#selectallsourcheckbox').on('click', function () {
            $('li[data-flavour=Sour]>label>input').prop('checked', this.checked);
        });

        $('#selectallspicycheckbox').on('click', function () {
            $('li[data-flavour=Spicy]>label>input').prop('checked', this.checked);
        });

        $('#selectalldrycheckbox').on('click', function () {
            $('li[data-flavour=Dry]>label>input').prop('checked', this.checked);
        });

        $('#selectallsweetcheckbox').on('click', function () {
            $('li[data-flavour=Sweet]>label>input').prop('checked', this.checked);
        });

        $('#selectallbittercheckbox').on('click', function () {
            $('li[data-flavour=Bitter]>label>input').prop('checked', this.checked);
        });
    }

}

class InteractionsLinks {
    static SETTING_ENABLE = 'interactionsEnable';

    constructor() {
        if(UserDataHandle.getSettings().QoLSettings[InteractionsLinks.SETTING_ENABLE]) {
            this.setupHTML();
        }
        else {
            console.log('Interactions links features disabled');
        }
    }

    setupHTML() {
    // add 50 clickback link to sent interactions section
        let names = "";
        const lists = document.getElementsByClassName('userlist');
        const lastList = lists[lists.length-1];
        if(lastList.parentElement.previousElementSibling.innerText == "Sent"){
            const nameElements = lastList.childNodes;
            let overFifty = false;
            for(let i=0; i<nameElements.length; i++){
                if(i>=50){
                    overFifty = true;
                    break;
                }
                if(i!=0){
                    names+=",";
                }
                const userUrl = nameElements[i].lastChild.href;
                const name = userUrl.split("/user/")[1];
                names+=name;
            }
            const url = "https://pokefarm.com/users/"+names;
            const newP = document.createElement("p");
            const newLink = document.createElement("a");
            newLink.href = url;
            if(overFifty){
                newLink.innerText = "Open top 50 users";
            }
            else{
                newLink.innerText = "Open all users";
            }
            newP.appendChild(newLink);
            lastList.parentNode.insertBefore(newP,lastList);
        }
    }
}


class Lab {
    static SETTING_KEY = 'QoLLab';
    static SETTING_ENABLE = 'labNotifier';

    constructor() {
        if(UserDataHandle.getSettings().QoLSettings[Lab.SETTING_ENABLE]) {
            console.log('TODO: Lab features');
        }
        else {
            console.log('Lab features disabled');
        }
    }
}

class MultiUser {
    static SETTING_KEY = 'QoLMultiuser';
    static SETTING_ENABLE = 'partyMod';

    constructor() {
        if(UserDataHandle.getSettings().QoLSettings[MultiUser.SETTING_ENABLE]) {
            this.setupHTML();
            this.setupObservers();
            this.setupHandlers();
        }
        else {
            console.log('MultiUser features disabled');
        }
    }

    setupHTML() {
        Helpers.addGlobalStyle(Resources.PARTY_CSS);
        document.querySelector('#multiuser').insertAdjacentHTML('beforebegin', Resources.PARTY_MOD_HTML);
        const menuBackground = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('background-color');
        const menuColor = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('color');
        $('#qolpartymod').css('background-color', '' + menuBackground + '');
        $('#qolpartymod').css('color', '' + menuColor + '');
    }

    setupObservers() {
        const self = this;
        // don't observe the whole party area as it may cause excess firing
        Helpers.addObserver(document.querySelector('#multiuser'), {
            childList: true,
            subtree: true,
        }, function(mutations) {
            let doMod = false;
            mutations.forEach(function (mutation) {
                if($(mutation.target).attr('id') == 'partybox'){
                    /*
                     * many mutations fire, so limit calls to party mod to prevent excess and looping calls
                     * #partybox is when the next button is added, making it a convenient time to run the mods
                     */
                    doMod = true;
                }
            });
            if(doMod) {
                /*
                 * TODO: when going very fast, the get more class may not get added properly
                 * figure out a time to re-detect, and fix the classes accordingly
                 */
                self.partyModification();
            }
        });
        $(window).resize(function() {
            setTimeout(() => {
                // the hide all alignment works better with the timeout
                self.partyModification();
            }, 100);
        });
    }

    setupHandlers() {
        const self = this;
        // activate the custom options collapse
        Helpers.activateCollapses();
        const settings = UserDataHandle.getSettings();
        settings.addSettingsListeners();
        settings.registerChangeListener(function(changeDetails) {
            if(changeDetails.settingGroup==MultiUser.SETTING_KEY) {
                self.partyModification();
            }
        });
    }

    // changes that all available mods make
    sharedPartyMods() {
        $('#multiuser').addClass('qolPartyModded');
        // change any berry to sour so it gets a bg color
        $('.berrybuttons[data-up="any"]').attr('data-up','sour');
    }

    partyModification() {
        // get page-specific settings
        const partySettings = UserDataHandle.getSettings()[MultiUser.SETTING_KEY];

        // first, remove any existing selection (all qol classes)
        const classList = document.getElementById('multiuser').className.split(/\s+/);
        for (let i = 0; i < classList.length; i++) {
            if (classList[i].match(/^qol/)) {
                $('#multiuser').removeClass(classList[i]);
            }
        }
        $('#qolpartymodcustom').css('display','none');
        $('.party .pkmn a.qolCompactLink').remove();

        const btns = $('#multiuser .party>div .action a');
        if(btns) {
            btns.css({
                "top":0,"left":0
            });
        }

        if (partySettings.partyModType == 'hideDislike') {
            $('#multiuser').addClass('qolPartyHideDislike');
            this.sharedPartyMods();
        }

        else if (partySettings.partyModType == 'niceTable') {
            $('#multiuser').addClass('qolPartyNiceTable');
            this.sharedPartyMods();
        }

        else if (partySettings.partyModType == 'hideAll') {
            $('#multiuser').addClass('qolPartyHideAll');
            this.sharedPartyMods();
            const nextLink = $('.mu_navlink.next');
            // on chrome, sometimes .position() is undefined on load
            if(btns && nextLink && nextLink.position()) {
                btns.css(nextLink.position());
            }
        }

        else if (partySettings.partyModType == 'customParty') {
            $('#multiuser').addClass('qolPartyCustomParty');
            this.sharedPartyMods();
            $('#qolpartymodcustom').css('display','block');

            // differentiate next and more buttons
            const next = $('.mu_navlink.next');
            if(next.text() == 'Get more +') {
                next.addClass('qolGetMore');
            }
            else {
                next.addClass('qolGoNext');
            }

            // hide classes are inverted
            this.partymodHelper('qolStackNext',partySettings.stackNextButton === true);
            this.partymodHelper('qolStackMore',partySettings.stackMoreButton === true);
            this.partymodHelper('qolHideParty',partySettings.showPokemon === false);
            this.partymodHelper('qolCompactParty',partySettings.compactPokemon === true);
            this.partymodHelper('qolHideTrainerCard',partySettings.showTrainerCard === false);
            this.partymodHelper('qolHideFieldButton',partySettings.showFieldButton === false);
            this.partymodHelper('qolHideModeChecks',partySettings.showModeChecks === false);
            this.partymodHelper('qolHideUserName',partySettings.showUserName === false);
            this.partymodHelper('qolHideShowcase',partySettings.includeShowcase === false);

            // clickable compact pokemon
            if(partySettings.showPokemon === true
              && partySettings.compactPokemon === true
              && partySettings.clickablePokemon === true )
            {
                $('.party .pkmn').each(function() {
                    const pkmnID = $(this.parentElement).attr('data-pid');
                    if(pkmnID) {
                        $(this).append('<a class="qolCompactLink" href="/summary/'+pkmnID+'"></a>');
                    }
                });
            }
        }

        else if (partySettings.partyModType !== 'none') {
            ErrorHandler.warn('Invalid party mod type: '+partySettings.partyModType);
        }
    }

    // toggle setting should be true to add the class, false to remove it
    partymodHelper(toggleClass, toggleSetting) {
        if(toggleSetting) {
            $('#multiuser').addClass(toggleClass);
        }
        else {
            $('#multiuser').removeClass(toggleClass);
        }
    }
}


class PrivateFields {
    static SETTING_KEY = 'QoLPrivateField';
    static SETTING_ENABLE = 'privateFieldEnable';
    static SUB_SETTINGS = 'QoLPrivateFieldFeatures';

    constructor() {
        const settings = UserDataHandle.getSettings();
        if(settings.QoLSettings[PrivateFields.SETTING_ENABLE]) {
            // if specific features are enabled, run them
            if(settings[PrivateFields.SUB_SETTINGS].release) {
                $(document).on('click', '*[data-menu="release"]', (function (e) { //select all feature
                    e.stopPropagation();
                    PrivateFields.enableMoveReleaseControls();
                }));
                $(document).on('click', '*[data-menu="bulkmove"]', (function () { // select all feature
                    PrivateFields.enableMoveReleaseControls();
                }));
            }
        }
        else {
            console.log('PrivateFields features disabled');
        }
    }

    static showBulkNatures(enable) {
        console.log('show bulk natures');
        const pkmn = $('input[name="masspkmn"]');
        for(let i=0; i<pkmn.length; i++) {
            const pkmnDetails = $(pkmn[i]).next().next().html();
            if(enable) {
                const natureRegex = /<b>Nature:<\/b> ([a-zA-Zï]+)/;
                const results = pkmnDetails.match(natureRegex);
                if(results.length>1) { // this should always be true, but just in case
                    $(pkmn[i]).next().next().next().html(results[1]);
                }
            }
            else {
                const genderRegex = /<span class="icons">(<img src=".+">)<\/span>/;
                const results = pkmnDetails.match(genderRegex);
                if(results.length>1) { // this should always be true, but just in case
                    $(pkmn[i]).next().next().next().html(results[1]);
                }
            }
        }
    }
    static enableMoveReleaseControls() {
        // find flavour checkbox, add show nature checkbox
        const flavourCheckbox =  $('.bulkpokemonlist>label:first-child>input');
        const natureCheckbox = $('<input type="checkbox"> Show Pokemon natures');
        const natureLabel = $('<label></label>').append(natureCheckbox).append(' Show Pokemon natures');
        flavourCheckbox.parent().after('<br>');
        flavourCheckbox.parent().after(natureLabel);
        flavourCheckbox.parent().after('<br>');

        // add flavour/nature listeners
        flavourCheckbox.on('change',function() {
            // disable show natures
            $('.bulkpokemonlist').removeClass('qolNatureShown');
            natureCheckbox.prop('checked',false);

            if($(this).prop('checked')) {
                $('.bulkpokemonlist').addClass('qolFlavourShown');
            }
            else {
                $('.bulkpokemonlist').removeClass('qolFlavourShown');
            }
        });
        natureCheckbox.on('change',function() {
            // disable show flavours
            $('.bulkpokemonlist').removeClass('qolFlavourShown');
            flavourCheckbox.prop('checked',false);

            if($(this).prop('checked')) {
                $('.bulkpokemonlist').addClass('qolNatureShown');
                PrivateFields.showBulkNatures(true);
            }
            else {
                $('.bulkpokemonlist').removeClass('qolNatureShown');
                PrivateFields.showBulkNatures(false);
            }
        });

        // add selection checkboxes
        $('.bulkpokemonlist').after(Resources.MASS_SELECT_HTML);

        // checkbox listeners
        $('#selectallcheckbox').click(function () {
            $('.bulkpokemonlist>ul>li>label>input').not(this).prop('checked', this.checked);
        });
        $('#selectallmalecheckbox').click(function () {
            const selectAny = $('.icons img[title="[M]"]').parent().prev().prev().prev('input');
            $(selectAny).not(this).prop('checked', this.checked);
        });
        $('#selectallfemalecheckbox').click(function () {
            const selectAny = $('.icons img[title="[F]"]').parent().prev().prev().prev('input');
            $(selectAny).not(this).prop('checked', this.checked);
        });
        $('#selectallgenderlesscheckbox').click(function () {
            const selectAny = $('.icons img[title="[N]"]').parent().prev().prev().prev('input');
            $(selectAny).not(this).prop('checked', this.checked);
        });
        $('#selectallanycheckbox').click(function () {
            const selectAny = $('.icons:contains("Any")').prev().prev().prev('input');
            $(selectAny).not(this).prop('checked', this.checked);
        });
        $('#selectallsourcheckbox').click(function () {
            const selectSour = $('.icons:contains("Sour")').prev().prev().prev('input');
            $(selectSour).not(this).prop('checked', this.checked);
        });
        $('#selectallspicycheckbox').click(function () {
            const selectSpicy = $('.icons:contains("Spicy")').prev().prev().prev('input');
            $(selectSpicy).not(this).prop('checked', this.checked);
        });
        $('#selectalldrycheckbox').click(function () {
            const selectDry = $('.icons:contains("Dry")').prev().prev().prev('input');
            $(selectDry).not(this).prop('checked', this.checked);
        });
        $('#selectallsweetcheckbox').click(function () {
            const selectSweet = $('.icons:contains("Sweet")').prev().prev().prev('input');
            $(selectSweet).not(this).prop('checked', this.checked);
        });
        $('#selectallbittercheckbox').click(function () {
            const selectBitter = $('.icons:contains("Bitter")').prev().prev().prev('input');
            $(selectBitter).not(this).prop('checked', this.checked);
        });
    }
}

class PublicFields {
    static SETTING_KEY = 'QoLPublicField';
    static SETTING_ENABLE = 'publicFieldEnable';
    static SUB_SETTINGS = 'QoLPublicFieldFeatures';

    constructor() {
        const settings = UserDataHandle.getSettings();
        if(settings.QoLSettings[PublicFields.SETTING_ENABLE]) {
            // if specific features are enabled, run them
            if(settings[PublicFields.SUB_SETTINGS].sort) {
                PublicFields.setupFieldSort(settings);
            }
            this.setupObservers(settings);
        }
        else {
            console.log('PublicFields features disabled');
        }
    }

    setupObservers(settings) {
        Helpers.addObserver(document.querySelector('#field_field'), {
            childList: true,
            subtree: true,
        }, function() {
            PublicFields.addClickCounter(settings);
        });
    }

    static addClickCounter(settings) {
        //Pokémon click counter
        if (settings[PublicFields.SETTING_KEY].fieldClickCount === true) {
            const pokemonFed = $('.fieldmon').map(function() { return $(this).attr('data-fed'); }).get();

            let pokemonClicked = 0;
            for (let i = 0; i < pokemonFed.length; i++) {
                pokemonClicked += pokemonFed[i] << 0;
            }

            const pokemonInField = $('.fieldpkmncount').text();

            if ($('#pokemonclickcount').length === 0) {
                document.querySelector('.fielddata').insertAdjacentHTML('beforeend','<div id="pokemonclickcount">'+pokemonClicked+' / '+pokemonInField+' Clicked</div>');
            } else if($('#pokemonclickcount').text() !== (pokemonClicked+' / '+pokemonInField+' Clicked')) {
                $('#pokemonclickcount').text(pokemonClicked+' / '+pokemonInField+' Clicked');
            }

            if(pokemonInField !== '') {
                if (JSON.stringify(pokemonClicked) === pokemonInField) {
                    $('#pokemonclickcount').removeClass('unclicked');
                    $('#pokemonclickcount').addClass('clicked');
                }
                if (pokemonClicked !== JSON.parse(pokemonInField)) {
                    $('#pokemonclickcount').removeClass('clicked');
                    $('#pokemonclickcount').addClass('unclicked');
                }
            }
        }
        else {
            $('#pokemonclickcount').remove();
        }
    }
    static setupFieldSort(settings) {
        // add sort menu items
        document.querySelector('#field_nav').insertAdjacentHTML('beforebegin', Resources.FIELD_SORT_HTML);
        const menuBackground = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('background-color');
        const menuColor = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('color');
        $('#fieldorder').css('background-color', '' + menuBackground + '');
        $('#fieldorder').css('color', '' + menuColor + '');
        // enable setting listeners
        settings.addSettingsListeners();
        settings.registerChangeListener(function(changeDetails) {
            if(changeDetails.settingGroup==PublicFields.SETTING_KEY) {
                PublicFields.applyFieldSort(settings);
            }
        });
        // run at page load too
        PublicFields.applyFieldSort(settings);
        PublicFields.addClickCounter(settings);
    }
    static applyFieldSort(settings) {
        const fieldSettings = settings[PublicFields.SETTING_KEY];
        /*
         *Sort-related settings, and their default values
         *fieldSettings.fieldSort = 'none';
         *fieldSettings.fieldClickCount = true;
         *fieldSettings.maxStack = false;
         */
        // first, remove any existing selection (all qol classes)
        const classList = document.getElementById('field_field').className.split(/\s+/);
        for (let i = 0; i < classList.length; i++) {
            if (classList[i].match(/^qol/)) {
                $('#field_field').removeClass(classList[i]);
            }
        }
        // add the desired sort class
        switch(fieldSettings.fieldSort) {
        case 'grid':
            $('#field_field').addClass('qolFieldGrid');
            break;
        case 'berry':
            $('#field_field').addClass('qolFieldBerrySort');
            break;
        case 'stack':
            if(fieldSettings.maxStack===true) {
                $('#field_field').addClass('qolFieldStackMax');
            }
            else {
                $('#field_field').addClass('qolFieldStack');
            }
            break;
        case 'none':
        default:
            break;
        }
    }
}

class Shelter {
    static SETTING_KEY = 'QoLShelter';
    static SETTING_ENABLE = 'shelterEnable';
    static SUB_SETTINGS = 'QoLShelterFeatures';
    static NEXT_MATCH_KEY = 78; // 'n'

    constructor() {
        const settings = UserDataHandle.getSettings();
        if(settings.QoLSettings[Shelter.SETTING_ENABLE]) {
            Helpers.addGlobalStyle(Resources.SHELTER_CSS);
            Helpers.addGlobalStyle(Resources.SEARCH_CSS);
            // if specific features are enabled, run them
            if(settings[Shelter.SUB_SETTINGS].search) {
                this.matches = [];
                this.currentMatch = -1;
                this.setupSearch();
            }
            // putting this second will actually make its tab first
            if(settings[Shelter.SUB_SETTINGS].sort) {
                Shelter.setupSort();
            }
            settings.addSettingsListeners();
        }
        else {
            console.log('Shelter features disabled');
        }
    }

    static setupSort() {
        // add sort tab
        document.querySelector('#shelterupgrades .tabbed_interface>ul').insertAdjacentHTML('afterbegin', '<li><label>Sort</label></li>');
        document.querySelector('#shelterupgrades .tabbed_interface>ul').insertAdjacentHTML('afterend', '<div>'+Resources.SHELTER_SORT_HTML+'</div>');

        // listen for sort settings changes
        UserDataHandle.getSettings().registerChangeListener(function(changeDetails) {
            if(changeDetails.settingName == 'shelterGrid' || changeDetails.settingName == 'shelterSpriteSize') {
                Shelter.handleSortSettings();
            }
        });

        // run initially
        Shelter.handleSortSettings();
    }

    static handleSortSettings() {
        const shelterSettings = UserDataHandle.getSettings()[Shelter.SETTING_KEY];

        // sort in grid
        $('#shelterarea').removeClass('qolshelterareagrid');
        if (shelterSettings.shelterGrid === true) { //shelter grid
            $('#shelterarea').addClass('qolshelterareagrid');
        }

        // sprite size mode
        $('#shelterarea').removeClass('qolshelterarealarge');
        $('#shelterarea').removeClass('qolshelterareasmall');
        if(shelterSettings.shelterSpriteSize == 'large') {
            $('#shelterarea').addClass('qolshelterarealarge');
        }
        else if(shelterSettings.shelterSpriteSize == 'small') {
            $('#shelterarea').addClass('qolshelterareasmall');
        }
    }

    static createQuickSearchKey(baseObject) {
        // increment the unique search ID counter
        const settings = UserDataHandle.getSettings();
        const lastSearchID = settings[Shelter.SETTING_KEY]['lastSearchID'];
        settings.changeSetting(Shelter.SETTING_KEY, 'lastSearchID', lastSearchID+1);
        baseObject.id = lastSearchID+1;
        // set the common defaults (checkboxes) - unique attribute defaults are passed in the baseObject
        baseObject.egg = true;
        baseObject.pkmn = true;
        baseObject.male = true;
        baseObject.female = true;
        baseObject.genderless = true;
        return baseObject;
    }

    removeQuickSearch(event) {
        // detect type of quick search
        const element = $(event.target).closest('.qolQuickSearchBlock');
        const searchType = element.attr('data-type');
        const settings = UserDataHandle.getSettings();
        const searchSettings = settings[Shelter.SETTING_KEY][searchType];
        // find and remove matching search key
        const searchID = element.attr('data-id');
        const searchIndex = searchSettings.findIndex(({ id }) => id === searchID);
        searchSettings.splice(searchIndex, 1);
        // commit changes and remove inputs from DOM
        element.remove();
        settings.changeSetting(Shelter.SETTING_KEY, searchType, searchSettings);
    }

    saveQuickSearch(event) {
        // detect type of quick search
        const element = $(event.target).closest('.qolQuickSearchBlock');
        const searchType = element.attr('data-type');
        const settings = UserDataHandle.getSettings();
        const searchSettings = settings[Shelter.SETTING_KEY][searchType];

        // find the stored data for this search, if it exists
        const searchID = element.attr('data-id');
        let searchKey = searchSettings.find(({ id }) => id === searchID);
        if(!searchKey) {
            /*
             * if this is a new block, create it instead -
             * the ID was generated and incremented during DOM creation (createQuickSearchKey)
             */
            searchKey = {
                id: searchID
            };
            searchSettings.push(searchKey);
        }

        // set the new value(s)
        if(searchType == 'quickPkmnSearch') {
            searchKey.name = element.find('input[name="qolQsName"]').val();
        }
        else if(searchType == 'quickTypeSearch') {
            searchKey.type1 = element.find('select[name="qolQsType1"]').val();
            searchKey.type2 = element.find('select[name="qolQsType2"]').val();
        }
        else if(searchType == 'quickNatureSearch') {
            searchKey.nature = element.find('select[name="qolQsNature"]').val();
        }
        searchKey.egg = element.find('input[name="qolQsEgg"]').prop('checked');
        searchKey.pkmn = element.find('input[name="qolQsPkmn"]').prop('checked');
        searchKey.male = element.find('input[name="qolQsMale"]').prop('checked');
        searchKey.female = element.find('input[name="qolQsFemale"]').prop('checked');
        searchKey.genderless = element.find('input[name="qolQsGenderless"]').prop('checked');
        // commit the changed settings
        settings.changeSetting(Shelter.SETTING_KEY, searchType, searchSettings);
    }

    drawQuickSearch(searchKey) {
        const self = this;
        let element;
        if(searchKey && 'name' in searchKey) {
            let output = '<div class="qolQuickSearchBlock" data-type="quickPkmnSearch" data-id="'+searchKey.id+'"><div class="qolQuickSearchInputs">';
            output += '<input type="text" name="qolQsName" /><button type="button" class="qolQuickSearchRemove">X</button></div>';
            output += Resources.QUICK_SEARCH_ICONS;
            output += '</div>';
            element = $(output).appendTo($('#qolQuickNameContainer'));
            element.find('input[name="qolQsName"]').val(searchKey.name);
        }
        else if(searchKey && 'type1' in searchKey) {
            let output = '<div class="qolQuickSearchBlock" data-type="quickTypeSearch" data-id="'+searchKey.id+'"><div class="qolQuickSearchInputs">';
            output += '<select name="qolQsType1">'+Helpers.generateSelectOptions(Resources.TYPE_LIST,{
                'select': 'Select'
            })+'</select>';
            output += '<select name="qolQsType2">'+Helpers.generateSelectOptions(Resources.TYPE_LIST,{
                'any': 'Any', 'none': 'None'
            })+'</select>';
            output += '<button type="button" class="qolQuickSearchRemove">X</button>';
            output += '</div>';
            output += Resources.QUICK_SEARCH_ICONS;
            output += '</div>';
            element = $(output).appendTo($('#qolQuickTypeContainer'));
            element.find('select[name="qolQsType1"]').val(searchKey.type1);
            element.find('select[name="qolQsType2"]').val(searchKey.type2);
        }
        else if(searchKey && 'nature' in searchKey) {
            let output = '<div class="qolQuickSearchBlock" data-type="quickNatureSearch" data-id="'+searchKey.id+'"><div class="qolQuickSearchInputs">';
            output += '<select name="qolQsNature">'+Helpers.generateSelectOptions(Resources.NATURE_LIST,{
                'select': 'Select'
            })+'</select>';
            output += '<button type="button" class="qolQuickSearchRemove">X</button>';
            output += '</div>';
            output += Resources.QUICK_SEARCH_ICONS;
            output += '</div>';
            element = $(output).appendTo($('#qolQuickNatureContainer'));
            element.find('select[name="qolQsNature"]').val(searchKey.nature);
        }
        else {
            ErrorHandler.warn('Unknown quick search key format');
            console.log(searchKey);
            return;
        }
        element.find('button.qolQuickSearchRemove').on('click', function(event) {
            self.removeQuickSearch(event);
        });
        element.find('input[name="qolQsEgg"]').prop('checked', searchKey.egg);
        element.find('input[name="qolQsPkmn"]').prop('checked', searchKey.pkmn);
        element.find('input[name="qolQsMale"]').prop('checked', searchKey.male);
        element.find('input[name="qolQsFemale"]').prop('checked', searchKey.female);
        element.find('input[name="qolQsGenderless"]').prop('checked', searchKey.genderless);
        element.find('input, select').on('change', function(event) {
            self.saveQuickSearch(event);
        });
    }

    setupSearch() {
        const shelterSettings = UserDataHandle.getSettings()[Shelter.SETTING_KEY];

        // add search tab & results box
        $('#shelterupgrades .tabbed_interface>div').removeClass('tab-active');
        $('#shelterupgrades .tabbed_interface>ul>li').removeClass('tab-active');
        document.querySelector('#shelterupgrades .tabbed_interface>ul').insertAdjacentHTML('afterbegin', '<li class="tab-active"><label>Search</label></li>');
        document.querySelector('#shelterupgrades .tabbed_interface>ul').insertAdjacentHTML('afterend', '<div class="tab-active">'+Resources.SHELTER_SEARCH_HTML+'</div>');
        document.querySelector('#sheltercommands').insertAdjacentHTML('beforebegin', '<div id="sheltersuccess"></div>');
        Helpers.activateTooltips();

        const self = this;

        for(const i in shelterSettings.quickPkmnSearch) {
            this.drawQuickSearch(shelterSettings.quickPkmnSearch[i]);
        }
        for(const i in shelterSettings.quickTypeSearch) {
            this.drawQuickSearch(shelterSettings.quickTypeSearch[i]);
        }
        for(const i in shelterSettings.quickNatureSearch) {
            this.drawQuickSearch(shelterSettings.quickNatureSearch[i]);
        }

        // listeners to add new search terms
        $('#qolQuickNameBtn').on('click', function() {
            self.drawQuickSearch(Shelter.createQuickSearchKey({
                'name':''
            }));
        });
        $('#qolQuickTypeBtn').on('click', function() {
            self.drawQuickSearch(Shelter.createQuickSearchKey({
                'type1':'select','type2':'any'
            }));
        });
        $('#qolQuickNatureBtn').on('click', function() {
            self.drawQuickSearch(Shelter.createQuickSearchKey({
                'nature':'select'
            }));
        });

        // listen for next match hotkey
        $(window).on('keyup', function (e) {
            if (0 == $(e.target).closest('input, textarea').length) {
                if(e.keyCode == Shelter.NEXT_MATCH_KEY) {
                    self.findNextMatch();
                }
            }
        });

        // watch for shelter page refreshes (and initial load)
        Helpers.addObserver(document.querySelector('#shelterarea'), {
            childList: true
        }, function(mutations) {
            console.log('TODO: mutation observed');
            console.log(mutations);
            self.runSearch();
        });

        // listen for seach settings changes
        UserDataHandle.getSettings().registerChangeListener(function(changeDetails) {
            if(changeDetails.settingGroup == Shelter.SETTING_KEY) {
                self.runSearch();
            }
        });
    }

    findNextMatch() {
        console.log('TODO: next key pressed');
    }

    runSearch() {
        // remove old highlights
        $('#shelterarea .shelterfoundme').removeClass('shelterfoundme');
        // run new search
        const shelterSettings = UserDataHandle.getSettings()[Shelter.SETTING_KEY];
        $('#shelterarea .pokemon').each(function() {
            /*
             *  TODO: special checks
             * for(const i in shelterSettings.quickPkmnSearch) {
             *  TODO: handle accents (flabebe, faemueno)
             */
            /*
             *pkmn: does search contain pkmn/? if so, search .pokemon img[src]
             *does search contain a /? if not, search by tooltip_content text
             *if it does have a slash, check the dex for the forme id and search .pokemon[data-fid]
             */
            /*
             * }
             * for(const i in shelterSettings.quickTypeSearch) {
             *  for each .pokemon[data-fid] on page, check dex for type(s)
             * }
             */
            for(const i in shelterSettings.quickNatureSearch) {
                if(this.getAttribute('data-nature') == shelterSettings.quickNatureSearch[i]['nature']) {
                    Shelter.searchCheckboxes(shelterSettings.quickNatureSearch[i], this, false);
                }
            }
        });
    }

    static applyHighlight(pkmn) {
        pkmn.addClass('shelterfoundme');
    }

    /*
     * call this after confirming the primary match
     * it will apply the highlight if the secondary checkboxes also match
     * set checkStage to false for searches like nature that don't care about egg vs pkmn
     */
    static searchCheckboxes(searchKey, pkmn, checkStage) {
        pkmn = $(pkmn); // jquery
        if(checkStage) {
            // if egg, don't check gender
            if(pkmn.attr('data-stage')=='egg') {
                if(searchKey['egg']===true) {
                    Shelter.applyHighlight(pkmn);
                }
                return;
            }
            // if pkmn, check stage then continue to gender
            else if(pkmn.attr('data-stage')=='pkmn') {
                if(searchKey['pkmn']===false) {
                    return;
                }
            }
            else {
                ErrorHandler.warn('Unknown pkmn data-stage');
                console.log(pkmn);
                return;
            }
        }
        // ensure that the gender matches
        if(searchKey['male'] && pkmn.next().find('img[title="[M]"]').length>0) {
            Shelter.applyHighlight(pkmn);
        }
        else if(searchKey['female'] && pkmn.next().find('img[title="[F]"]').length>0) {
            Shelter.applyHighlight(pkmn);
        }
        else if(searchKey['genderless'] && pkmn.next().find('img[title="[N]"]').length>0) {
            Shelter.applyHighlight(pkmn);
        }
    }
}

class SummaryDisplayCodes {
    static SETTING_ENABLE = 'summaryEnable';

    constructor() {
        if(UserDataHandle.getSettings().QoLSettings[SummaryDisplayCodes.SETTING_ENABLE]) {
            this.setupHTML();
        }
        else {
            console.log('Summary display codes features disabled');
        }
    }

    setupHTML() {
        const pkmnID = $('.party div')[0].getAttribute('data-pid');
        const displayAccordion = $('#displaycodelist').parent();
        const newHTML =
      "<p>Display an interactive panel in Pokefarm's forums!</p>"+
      '<p class="displaycode" style="user-select:all";>[pkmnpanel='+pkmnID+']</p>'+
      '<div style="border-bottom: 1px solid;margin-top: 1rem;"></div>';
        displayAccordion.prepend(newHTML);
    }
}


class Wishforge {
    static SETTING_ENABLE = 'condenseWishforge';

    constructor() {
        if(UserDataHandle.getSettings().QoLSettings[Wishforge.SETTING_ENABLE]) {
            this.setupHTML();
            this.setupObservers();
        }
        else {
            console.log('Wishforge features disabled');
        }
    }

    setupObservers() {
        const self = this;
        const target = $('#badges').next('div')[0];
        Helpers.addObserver(target, {
            childList: true
        }, function(mutations) {
            mutations.forEach(function(mutation) {
                if(mutation.type === 'childList' && mutation.addedNodes.length) {
                    self.setupHTML();
                }
            });
        });
    }

    setupHTML() {
        Helpers.addGlobalStyle(Resources.FORGE_CSS);
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

        /*
         *  use Globals.TYPE_LIST to get list of types
         * const types = Globals.TYPE_LIST;
         */
        const types = Object.values(Resources.TYPE_LIST);
        /*
         * TODO: this is very hacky, consider cleaning up this whole builder
         * I'd really like to shrink the item progress bar to a yes/no kind of thing too
         * Need to get some HTML samples from badges in various stages of construction
         */

        // build HTML table
        const rows = {};
        for (let i = 0; i < types.length; i++) {
            if(!isMobile) {
                rows[types[i]] = `<tr id=${types[i]}> <td>${types[i]}</td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>`;
            }
            else {
                rows[types[i]] = `<tr id="${types[i]}-top" class="qolBadgesTop"> <td>${types[i]}</td> <td></td> <td></td> </tr>`
                               + `<tr id="${types[i]}-bot" class="qolBadgesBot"> <td></td> <td></td> <td></td> </tr>`;
            }
        }
        let table = '<table style="width: 100%" class="qolBadges">' +
            `<colgroup> ${columns} </colgroup>` +
            `<tr id="head"> ${header} </tr>`;
        for (let i = 0; i < types.length; i++) {
            table += rows[types[i]];
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
        for (let j = 0; j < types.length; j++) {
            const type = types[j];
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

class PagesManager {
    /*
     * Lists the pages the QoL should activate on, and which features should be loaded
     * Each key should be a regex that can match everything after .com/ but before ? (window.location.pathname)
     * It should have an array of feature classes that load on that page
     * (many pages will only have a single feature)
     * The hub is not affected by these settings, and appears on all pages with the ribbon while logged in
     * Name is a friendly name that can be read by classes that may be called from multiple locations
     */
    static PAGES = [
        {
            url: /^\/users\/.+$/,
            name: 'users',
            features: [
                MultiUser
            ]
        },
        {
            url: /^\/dex\/?$/,
            name: 'dex',
            features: [
                DexPageFilters
            ]
        },
        {
            url: /^\/dojo\/?$/,
            name: 'dojo',
            features: [
                Dojo
            ]
        },
        {
            url: /^\/forge\/?$/,
            name: 'forge',
            features: [
                Wishforge
            ]
        },
        {
            url: /^\/interactions\/?$/,
            name: 'interactions',
            features: [
                InteractionsLinks
            ]
        },
        {
            url: /^\/summary\/[a-zA-Z0-9_-]+\/?$/,
            name: 'summary',
            features: [
                SummaryDisplayCodes
            ]
        },
        {
            url: /^\/fishing\/?$/,
            name: 'fishing',
            features: [
                Fishing
            ]
        },
        {
            url: /^\/daycare\/?$/,
            name: 'daycare',
            features: [
                DaycareMatches
            ]
        },
        {
            url: /^\/lab\/?$/,
            name: 'lab',
            features: [
                Lab
            ]
        },
        {
            url: /^\/fields\/?$/,
            name: 'privateFields',
            features: [
                Fields,
                PrivateFields
            ]
        },
        {
            url: /^\/fields\/.+$/,
            name: 'publicFields',
            features: [
                Fields,
                PublicFields
            ]
        },
        {
            url: /^\/farm\/?$/,
            name: 'farm',
            features: [
                EasyEvolve
            ]
        },
        {
            url: /^\/shelter\/?$/,
            name: 'shelter',
            features: [
                Shelter
            ]
        },
    ];

    static instantiatePage() {
        const path = window.location.pathname;
        let onPage = false;
        for(let i=0; i<PagesManager.PAGES.length; i++) {
            const page = PagesManager.PAGES[i];
            if(page.url.test(path)) {
                console.log('On QoL feature page');
                onPage = true;
                for(let j=0; j<page.features.length; j++) {
                    new page.features[j](page);
                }
            }
        }
        if(!onPage) {
            console.log('Not on QoL feature page');
        }
    }
}

/*
 *Create a popup module with the given content
 *By default, all modules will have a button in the top right corner that closes the window
 *
 *This will return a class with the constructed, but unopened modal.
 *Call the new object's open function to add it to the DOM and open it.
 *Modals can be destroyed and removed from the DOM with their destroy method.
 *
 *All modal-closing buttons should have the modalClose class
 *When the modal is added to the DOM, it will also add close listeners to those
 *
 */
class Modal {
    // exposed DOM elements
    modalElement;
    dialogHead;
    dialogBody;

    openCallbacks = [];

    /*
     * content can be anything that can be appended with jQuery's append function
     * classList will add additional classes to the dialog content element
     */
    constructor(title, content, maxWidth=null, classList=[]) {
    // dialog wrapper
        this.modalElement = document.createElement('div');
        this.modalElement.classList.add('dialog');
        // dialog sub-wrappers
        const dialogDiv1 = document.createElement('div');
        this.modalElement.appendChild(dialogDiv1);
        const dialogDiv2 = document.createElement('div');
        dialogDiv1.appendChild(dialogDiv2);
        // dialog content
        const dialog = document.createElement('div');
        dialogDiv2.appendChild(dialog);
        dialog.classList.add('qolModal');
        for(let i=0; i<classList.length; i++) {
            dialog.classList.add(classList[i]);
        }
        if(maxWidth!==null) {
            /*
             * the default max width is set in PFQ's stylesheet, at 640px
             * the default min width is 300px
             * the actual width may vary, based on content size
             */
            dialog.style = 'max-width: '+maxWidth+'px';
        }
        // header
        this.dialogHead = document.createElement('h3');
        dialog.appendChild(this.dialogHead);
        this.dialogHead.innerText = title;
        const closeBtn = document.createElement('a');
        this.dialogHead.appendChild(closeBtn);
        closeBtn.setAttribute('href','#');
        closeBtn.innerText = 'X';
        closeBtn.classList.add('modalClose');
        // body
        this.dialogBody = document.createElement('div');
        dialog.appendChild(this.dialogBody);
        $(this.dialogBody).append(content);
    }

    // adds the modal to the DOM
    open() {
    // remove any already open modals
        Modal.close();
        // add modal to dom
        $('body').append(this.modalElement);
        // prevent non-modal scrolling
        $('#core').addClass('scrolllock');
        // add close listeners
        $('.modalClose').on('click', function() {
            Modal.close();
        });
        // run callbacks
        for(let i=0; i<this.openCallbacks.length; i++) {
            if(typeof this.openCallbacks[i] == 'function') {
                this.openCallbacks[i]();
            }
        }
    }

    /*
     * add a function to be run after the modal opens
     * use this to add DOM-based event listeners, etc
     */
    addOpenCallback(callback) {
        this.openCallbacks.push(callback);
    }

    // closes any open modal, even PFQ's
    static close() {
        $('#core').removeClass('scrolllock');
        $('.dialog').remove();
    }
}

/*
 *This is a singleton wrapper on the settings/dex classes
 *It makes it easier to get the master settings instance,
 *without needing to explicitly pass it around between functions
 */

const UserDataHandle = (function () {
    let settings;
    let dex;

    return {
        getSettings: function () {
            if (!settings) {
                settings = new UserSettings();
            }
            return settings;
        },
        getDex: function() {
            if (!dex) {
                dex = new UserPokedex();
            }
            return dex;
        }
    };
})();


/*
 * Do not call this constructor directly to get or create a dex object
 * Always call UserDataHandle.getDex();
 * Note on DEX_LOADING: undefined if fetchUploadedDex is not called, or if resetDex is called
 *                      true if loading is in progress, false if loading has completed
 *                      use === to evaluate the value, to ensure false vs undefined
 */
class UserPokedex {
    static DEX_DATA_KEY = 'QoLPokedex';

    constructor() {
        console.log('Initializing dex');
        this.loadDex();
    }
    loadDex() {
        // Attempt to load dex from local storage
        console.log('Requesting dex from storage');
        const dateAndDex = LocalStorageManager.getDexFromStorage();
        // If the load fails, or if the data is too old, try getting from uploaded version
        if(!dateAndDex || this.daysSinceUpdate()>7) {
            this.fetchUploadedDex();
        }
        else if(dateAndDex) {
            this.DEX_UPDATE_DATE = dateAndDex[0];
            this.DEX_DATA = dateAndDex[1];
        }
        else {
            this.resetDex();
        }
    }
    // Get the dex data from the updatable, uploaded version, and store it to local storage
    fetchUploadedDex() {
        console.log('Uploaded dex currently disabled');
        this.resetDex();
        /*
         *console.log('Updating dex from from uploaded file');
         *try {
         *    this.DEX_LOADING = true;
         *    const self = this;
         *    $.get("https://pokefarm.com/upload/:b7q/QoL/dex-data.jpg", function(data){
         *        self.DEX_DATA = JSON.parse(data);
         *        let dateString = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
         *        self.DEX_UPDATE_DATE = dateString;
         *        LocalStorageManager.updateLocalStorageDex(self.DEX_DATA, dateString);
         *        self.DEX_LOADING = false;
         *        console.log('Dex load complete');
         *    });
         *} catch(e) {
         *    ErrorHandler.error('Failed to load dex data from uploaded file', e);
         *    this.resetDex();
         *}
         */
    }
    // Clears any locally stored dex data, and loads the static dex data instead.
    resetDex() {
        ErrorHandler.warn('Cleared dex data');
        LocalStorageManager.removeItem(UserPokedex.DEX_DATA_KEY);
        this.DEX_UPDATE_DATE = undefined;
        this.DEX_LOADING = undefined;
        this.DEX_DATA = Resources.DEFAULT_DEX;
    }
    // Return the number of days since this.DEX_UPDATE_DATE
    daysSinceUpdate() {
        if(!this.DEX_UPDATE_DATE) {
            return -1;
        }
        try {
            return (new Date() - new Date(this.DEX_UPDATE_DATE)) / (1000 * 3600 * 24);
        } catch(e) {
            ErrorHandler.error('Failed to determine number of days since dex update',e);
            return -1;
        }
    }
    /*
     * type 1 and 2 should be the object key of the relevant type
     * ex: '4' for grass, not the actual string 'grass'
     * set type2 to 'none' to find single-typed
     */
    getByType(type1,type2=null) {
        if(!type2) {
            return this.DEX_DATA.filter(pkmn => {
                return (pkmn.type1==type1 || pkmn.type2==type1);
            });
        }
        else if(type2=='none') {
            return this.DEX_DATA.filter(pkmn => {
                return (pkmn.type1==type1 && pkmn.type2===null);
            });
        }
        return this.DEX_DATA.filter(pkmn => {
            return ((pkmn.type1==type1 && pkmn.type2==type2) || (pkmn.type1==type2 && pkmn.type2==type1));
        });
    }
    getBySpecies(name) {
        // if name contains a slash (/), we are doing an exact forme match, which will return a single
        if(name.includes('/')) {
            const splitSpecies = name.split('/');
            return this.DEX_DATA.filter(pkmn => {
                return (pkmn.species==splitSpecies[0] && pkmn.forme==splitSpecies[1]);
            });
        }
        else {
            return this.DEX_DATA.filter(pkmn => {
                return pkmn.species.includes(name);
            });
        }
    }
}

/*
 * Do not call this constructor directly to get or create a settings object
 * Always call UserDataHandle.getSettings();
 * Most setting keys are located in the feature class they go with
 */
class UserSettings {
    // Default values for global settins
    static GLOBAL_DEFAULTS = {
        customCss: '',
        searchGlowColour: '#d5e265'
    };
    // All main setting enablers, and their default values
    static SETTING_ENABLERS = [
        {
            'name': DaycareMatches.SETTING_ENABLE,
            'default': true
        },
        {
            'name': DexPageFilters.SETTING_ENABLE,
            'default': true
        },
        {
            'name': EasyEvolve.SETTING_ENABLE,
            'default': true
        },
        {
            'name': Fishing.SETTING_ENABLE,
            'default': true
        },
        {
            'name': InteractionsLinks.SETTING_ENABLE,
            'default': true
        },
        {
            'name': Lab.SETTING_ENABLE,
            'default': true
        },
        {
            'name': MultiUser.SETTING_ENABLE,
            'default': true
        },
        {
            'name': PrivateFields.SETTING_ENABLE,
            'default': true
        },
        {
            'name': PublicFields.SETTING_ENABLE,
            'default': true
        },
        {
            'name': Shelter.SETTING_ENABLE,
            'default': true
        },
        {
            'name': SummaryDisplayCodes.SETTING_ENABLE,
            'default': true
        },
        {
            'name': Wishforge.SETTING_ENABLE,
            'default': true
        },
        {
            'name': Dojo.SETTING_ENABLE,
            'default': true
        }
    ];
    static SUB_ENABLERS = [
        {
            'name': Shelter.SUB_SETTINGS,
            'default': {
                search: true,
                sort: true,
            }
        },
        {
            'name': PrivateFields.SUB_SETTINGS,
            'default': UserSettings.fieldDefaults('private').sub
        },
        {
            'name': PublicFields.SUB_SETTINGS,
            'default': UserSettings.fieldDefaults('public').sub
        }
    ];
    /*
     * list of features with their own settings group
     * (typically ones that appear on the specific feature page, vs in the hub)
     * Display value is shown on the hub's page reset feature
     */
    static FEATURE_SPECIFIC_SETTINGS = [
        {
            'name': Lab.SETTING_KEY,
            'display': 'Lab',
            'default': {
                findLabEgg: '',
                customEgg: true,
                findLabType: '',
                findTypeEgg: true,
            }
        },
        {
            'name': MultiUser.SETTING_KEY,
            'display': 'Multi-user clickback',
            'default': {
                partyModType: 'none',
                hideDislike: false,
                hideAll: false,
                niceTable: false,
                customParty: false,
                stackNextButton: true,
                stackMoreButton: true,
                showPokemon: true,
                compactPokemon: true,
                clickablePokemon: false,
                showTrainerCard: true,
                showFieldButton: false,
                showModeChecks: false,
                showUserName: true,
                includeShowcase: true,
                hideShowcase: true
            }
        },
        {
            'name': PrivateFields.SETTING_KEY,
            'display': 'Private fields',
            'default': UserSettings.fieldDefaults('private').main
        },
        {
            'name': PublicFields.SETTING_KEY,
            'display': 'Public fields',
            'default': UserSettings.fieldDefaults('public').main
        },
        {
            'name': Shelter.SETTING_KEY,
            'display': 'Shelter',
            'default': {
                findNewEgg: true,
                findNewPokemon: true,
                findShiny: true,
                findAlbino: true,
                findMelanistic: true,
                findPrehistoric: true,
                findDelta: true,
                findMega: true,
                findStarter: true,
                findCustomSprite: true,
                findTotem: false,
                findLegendary: false,
                shelterGrid: true,
                shelterSpriteSize: 'auto',
                lastSearchID: 0,
                quickPkmnSearch: [],
                quickTypeSearch: [],
                quickNatureSearch: []
            }
        }
    ];
    // Most field settings are shared, build defaults here
    static fieldDefaults(mode) {
        const mainSettings = {
            fieldNewPokemon: true,
            fieldShiny: false,
            fieldAlbino: false,
            fieldMelanistic: false,
            fieldPrehistoric: false,
            fieldDelta: false,
            fieldMega: false,
            fieldLegend: false,
            fieldStarter: false,
            fieldCustomSprite: false,
            fieldItem: true,
            fieldMale: true,
            fieldFemale: true,
            fieldNoGender: true,
            fieldName: true,
            fieldSpecies: true,
            fieldSearchItem: false,
            fieldHideHoverTooltips: false,
            fieldCustom: '',
            fieldType: '',
            fieldNature: '',
            fieldEggGroup: ''
        };
        const subSettings = {
            search: true,
            tooltip: true,
            pkmnlinks: true
        };
        // Additional page-specific settings
        if(mode=='public') {
            mainSettings.fieldSort = 'none';
            mainSettings.fieldClickCount = true;
            mainSettings.maxStack = false;
            subSettings.sort = true;
        }
        else if(mode=='private') {
            subSettings.release = true;
        }
        else {
            ErrorHandler.error('Unknown field page specifier: '+mode);
            return null;
        }

        return {
            main: mainSettings, sub: subSettings
        };
    }

    constructor() {
        console.log('Initializing QoL settings');
        this.setDefaults();
        this.loadSettings();
        this.changeListeners = [];
    }
    /*
     * Set the default settings values (does not save to storage)
     * These are used when someone first enables the script, when settings are reset,
     * or when a new setting is added that the user doesn't have already in storage
     */
    setDefaults() {
        this.QoLSettings = UserSettings.GLOBAL_DEFAULTS;
        // main feature enablers
        for(let i=0; i<UserSettings.SETTING_ENABLERS.length; i++) {
            this.QoLSettings[UserSettings.SETTING_ENABLERS[i].name] = UserSettings.SETTING_ENABLERS[i].default;
        }
        // sub feature enablers
        for(let i=0; i<UserSettings.SUB_ENABLERS.length; i++) {
            this[UserSettings.SUB_ENABLERS[i].name] = UserSettings.SUB_ENABLERS[i].default;
        }
        // feature/page-specific settings
        for(let i=0; i<UserSettings.FEATURE_SPECIFIC_SETTINGS.length; i++) {
            this[UserSettings.FEATURE_SPECIFIC_SETTINGS[i].name] = UserSettings.FEATURE_SPECIFIC_SETTINGS[i].default;
        }
    }
    /*
     * Resets the feature-specific settings, and saves the defaults to local storage
     * Feature should be one of the names in FEATURE_SPECIFIC_SETTINGS
     */
    resetFeatureDefaults(feature) {
        let foundSetting = false;
        // there aren't many items in this list, so let's just brute force it
        for(let i=0; i<UserSettings.FEATURE_SPECIFIC_SETTINGS.length; i++) {
            const featureSettings = UserSettings.FEATURE_SPECIFIC_SETTINGS[i];
            if(featureSettings.name == feature) {
                foundSetting = true;
                this[featureSettings.name] = featureSettings.default;
                LocalStorageManager.setItem(featureSettings.name, this[featureSettings.default]);
            }
        }
        if(!foundSetting) {
            ErrorHandler.error('Unknown feature setting group: '+feature);
        }
    }
    /*
     * Change a single setting, and save it in local storage
     * Note: this effectively re-stores the whole group, due to how settings are stored
     * But it does NOT re-store all settings in all groups
     * When done, calls any registered listeners, and provides them the change details
     */
    changeSetting(settingGroup, settingName, newValue) {
        console.log('Changing QoL setting: '+settingGroup+'.'+settingName+' = '+newValue);
        if(this[settingGroup]) {
            this[settingGroup][settingName] = newValue;
            LocalStorageManager.setItem(settingGroup, this[settingGroup]);
            const changeDetails = {
                settingGroup: settingGroup,
                settingName: settingName,
                newValue: newValue
            };
            for(let i=0; i<this.changeListeners.length; i++) {
                if(typeof this.changeListeners[i] == 'function') {
                    this.changeListeners[i](changeDetails);
                }
            }
        }
        else {
            ErrorHandler.error('Cannot change setting in unknown group: '+settingGroup+'.'+settingName);
        }
    }
    // Loads all settings in storage into the UserSettings object
    loadSettings() {
        console.log('Loading QoL settings from storage');
        const storedSettings = LocalStorageManager.getAllQoLSettings();
        for(const settingKey in storedSettings) {
            // remove user ID from setting
            let settingGroup = settingKey.split('.');
            if(settingGroup.length == 2) {
                // Try to read the JSON recieved from storage (use full key with user id, not just name)
                let loadedSettings = {};
                try {
                    loadedSettings = JSON.parse(storedSettings[settingKey]);
                } catch(e) {
                    ErrorHandler.error('Could not parse stored settings for '+settingGroup+': '+storedSettings[settingKey],e);
                }
                // For convenience, replace with the setting name string
                settingGroup = settingGroup[1];
                if(this[settingGroup] != undefined) {
                    for(const settingName in loadedSettings) {
                        this[settingGroup][settingName] = loadedSettings[settingName];
                    }
                }
                else {
                    ErrorHandler.warn('Loaded unknown setting group: '+settingGroup);
                }
            }
            else {
                ErrorHandler.warn('Invalid setting key: '+settingKey);
            }
        }
    }

    /*
     * Allows pages to take actions when settings change, without watching inputs directly
     * (inputs should not be watched directly, since those events may get cleared in addSettingsListeners())
     * callbacks may include change details as their parameter - see changeSetting
     */
    registerChangeListener(callback) {
        this.changeListeners.push(callback);
    }

    // ** Everything below here is for interfacing with the DOM (show current values, handle changes, etc) ** //

    /*
     * Get details about a setting from a DOM setting input
     * All settings inputs should have the qolsetting class, as well as the following attributes:
     * data-group: indicator of which set of settings (ex: "QoLSettings" for main settings)
     * name: the actual setting name/key
     * For example, "hide disliked" party setting should be data-group="QoLMultiuser" name="hideDislike"
     */
    getSettingDetailsFromTarget(target) {
        const settingGroup = target.getAttribute('data-group');
        const settingName = target.getAttribute('name');
        if(settingGroup && settingName) {
            // try to read the setting from the active settings object
            let settingValue;
            if(this[settingGroup] && settingName in this[settingGroup]) {
                settingValue = this[settingGroup][settingName];
            }
            else {
                ErrorHandler.warn('Unrecognized setting input: '+settingGroup+'.'+settingName);
                console.warn(target);
            }
            // try to read the value of the DOM input
            let inputValue;
            if(target.type=='radio') {
                const element = document.querySelector('input[name="'+target.getAttribute('name')+'"]:checked');
                // there may not be a checked radio yet, especially when this is being used in displaySettingsValues
                if(element) {
                    inputValue = element.value;
                }
            }
            else if(target.type=='checkbox') {
                inputValue = target.checked;
            }
            else { // textbox dropdown etc
                inputValue = target.value;
            }
            return {
                settingGroup: settingGroup,
                settingName: settingName,
                settingValue: settingValue,
                inputValue: inputValue
            };
        }
        else {
            ErrorHandler.error('QoL setting could not be identified.');
            console.error(target);
            console.error(settingGroup);
            console.error(settingName);
            return null;
        }
    }
    /*
     * Listens for changes to settings inputs
     * Should be called after input elements are added (ex: after html builder, or after modal open, etc)
     * the parent lets you start at a given element, to avoid resetting all listeners on the page
     */
    addSettingsListeners(parent='') {
        const self = this;
        this.displaySettingsValues();
        // add a space after the parent selector
        if(parent) {
            parent = parent.trim()+' ';
        }
        // remove any existing listeners
        $(parent+'.qolsetting').off('change');
        $(parent+'.qolsetting').on('change', (function (event) {
            const settingDetails = self.getSettingDetailsFromTarget(event.target);
            if(settingDetails) {
                self.changeSetting(settingDetails.settingGroup, settingDetails.settingName, settingDetails.inputValue);
            }
        }));
    }
    // helper for addSettingsListeners, this ensures that inputs have the existing value shown
    displaySettingsValues() {
        const self = this;
        $('.qolsetting').each(function(){
            const settingDetails = self.getSettingDetailsFromTarget(this);
            if(settingDetails) {
                if(this.type=='radio') {
                    // if the value matches, this is the currently selected radio
                    this.checked = this.value==settingDetails.settingValue;
                }
                else if(this.type=='checkbox') {
                    this.checked = settingDetails.settingValue;
                }
                else {
                    this.value = settingDetails.settingValue;
                }
            }
            // special case for custom css textbox demo value
            if(this.id=='qolcustomcss' && this.value.trim()=='') {
                this.value = Resources.DEMO_CSS;
            }
        });
    }
}

/*
 * This class handles creating, removing, and handling the DOM object actions
 * for the QoL Hub.
 */
class QoLHub {
    constructor() {
        Helpers.addGlobalStyle(Resources.HUB_CSS);
        this.addQoLIcon();
        this.hubModal = new Modal('Quality of Life Script Hub', Resources.QOL_HUB_HTML, null, ['qolHubModal']);
        this.hubModal.addOpenCallback(QoLHub.setupHandlers);
        this.hubModal.addOpenCallback(QoLHub.afterOpen);
    }

    addQoLIcon() {
        if(document.getElementById('announcements')) {
            // this cannot go with the other handlers, as those only trigger after modal open
            const self = this;
            $('#qolHubIcon').on('click', (function () {
                console.log('Opening QoL hub');
                self.hubModal.open();
            }));
        }
        else {
            console.warn('Did not load QoL - could not find icon ribbon. Are you logged in? Is this a core page?');
            throw '#announcements missing';
        }
    }

    static setupHandlers() {
        // add menu items to reset dropdown
        for(let i=0; i<UserSettings.FEATURE_SPECIFIC_SETTINGS.length; i++) {
            const featureSettings = UserSettings.FEATURE_SPECIFIC_SETTINGS[i];
            $('#qolHubResetSettingsSelect').append('<option value="'+featureSettings.name+'">'+featureSettings.display+'</option>');
        }
        // reset settings handlers
        $('#resetPageSettings').on('click', (function (event) {
            UserDataHandle.getSettings().resetFeatureDefaults(event.target.value);
        }));
        $('#resetAllSettings').on('click', (function () {
            if(window.confirm('Are you sure? All settings, including your custom CSS, will be reset.')) {
                LocalStorageManager.clearAllQoLKeys();
                location.reload();
            }
        }));

        // clear cached dex
        $('#clearCachedDex').on('click', (function () {
            UserDataHandle.getDex().resetDex();
            $('#clearCachedDex').after('<p>Dex cleared!</p>');
            $('#qolDexDate').text('Never updated');
        }));

        // fetch errors from the hidden console, and show them in the hub
        $('#qolErrorConsole').on('click', (function() {
            let consoleContent = $('#qolConsoleHolder').html();
            if(consoleContent.trim() == '') {
                consoleContent = '[ No errors to display ]';
            }
            $('#qolConsoleContent').html(consoleContent);
        }));

        /*
         * storage/settings loggers
         * also logs the user settings object to the console
         */
        $('#qolExportSettings').on('click', (function() {
            console.log('Stored settings:');
            const storedSettings = LocalStorageManager.getAllQoLSettings();
            console.log(storedSettings);
            console.log('User settings:');
            const userSettings = UserDataHandle.getSettings();
            console.log(userSettings);
            console.log('Dex data:');
            const dexData = UserDataHandle.getDex();
            console.log(dexData);
            /*
             * TODO: get relevant browser/screen size data, add to object?
             * convert to JSON, then base 64 encode
             */
            let output = JSON.stringify(storedSettings);
            output = btoa(output);
            // output to hub to user can copy/paste it
            $('#qolStorageOutput').text(output);
            $('#qolStorageOutput').css('display','block');
        }));
    }

    // additional after open tasks that aren't handlers
    static afterOpen() {
        const settings = UserDataHandle.getSettings();
        settings.addSettingsListeners();
        // set dex updated date display
        let dexUpdateDate = UserDataHandle.getDex().DEX_UPDATE_DATE;
        if(!dexUpdateDate) {
            dexUpdateDate = 'Never updated';
        }
        $('#qolDexDate').text(dexUpdateDate);
        // glow colour changes
        $('#glowColourPreview').css('background-color',settings.QoLSettings.searchGlowColour);
        settings.registerChangeListener(function(changeDetails) {
            if(changeDetails.settingName=='searchGlowColour') {
                // prevent an empty value
                if(changeDetails.newValue.trim()=='') {
                    settings.changeSetting('QoLSettings', 'searchGlowColour', '#d5e265');
                }
                else {
                    $('#glowColourPreview').css('background-color',changeDetails.newValue);
                }
            }
        });
    }

} // QoLHub

$(function () {
    ('use strict');
    // script entry point
    let settings;
    try {
        // add this first, so custom errors have a place to go
        console.log('Adding QoL icon');
        document.querySelector('#announcements li.spacer').insertAdjacentHTML('beforebegin', Resources.QOL_HUB_ICON_HTML);

        console.log('Loading QoL settings & dex');
        settings = UserDataHandle.getSettings();
        UserDataHandle.getDex(); //pre-load dex
        console.log('Initializing QoL hub');
        new QoLHub();
    } catch(err) {
        ErrorHandler.fatalErrorHandler(err);
        return;
    }

    console.log('Adding QoL CSS');
    Helpers.addGlobalStyle(Resources.CORE_CSS);
    try {
        Helpers.addGlobalStyle(settings.QoLSettings.customCss);
        Helpers.addGlowColourCSS(settings.QoLSettings.searchGlowColour);
    } catch(e) {
        ErrorHandler.error("Could not add user's custom QoL CSS",e);
    }

    try {
        console.log('Initializing QoL page features');
        PagesManager.instantiatePage();
    } catch(e) {
        ErrorHandler.error("Could not init page-specific QoL features",e);
    }

    console.log('QoL Running');
});

