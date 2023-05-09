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
     * Message is also written to the JavaScript console
     * err should be the full Error object - if provided and supported, the
     *     stack trace for this error will be Base 64 encoded and included for the user
     */
    static writeCustomError(message,level='info',err=undefined) {
        const logElement = document.getElementById('qolConsoleHolder');
        if(logElement) {
            logElement.innerHTML += '<li>' + ErrorHandler.errorToString(message, level, err) +'</li>';
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
            $('body').append('<div class="panel" style="padding:0.5rem;word-wrap:break-word;user-select:all;">'+errorMsg+'</div>');
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
            stackTrace = '<br>'+btoa(err.stack);
        }
        if(level=='warn') {
            prefix = 'WARN: ';
            console.warn('QoL: '+message);
        }
        else if(level=='error') {
            prefix = 'ERROR: ';
            console.error('QoL: '+message);
        }
        else {
            prefix = 'INFO: ';
            console.log('QoL: '+message);
        }
        return prefix + message + stackTrace;
    }
}

class Helpers {
    static addGlobalStyle(css) {
        const head = document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        style.innerHTML = css;
        head.appendChild(style);
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
}

class LocalStorageManager {

    static MAIN_SETTINGS_KEY = 'QoLSettings';
    static PAGE_SETTINGS_KEYS  = [
        'QoLLab',
        'QoLMultiuser',
        'QoLPrivateFields',
        'QoLPublicFields',
        'QoLShelter'
    ];
    static DEX_DATA_KEY = 'QoLPokedex';
    // see keys in UserSettings.pageSettings for page-specific storage keys

    // Look for settings that contain QoL and return them as an array of keys
    static getAllQoLSettings(includeDex=false) {
        const qolSettings = {};
        for (let i = 0, len = localStorage.length; i < len; ++i) {
            const key = localStorage.key(i);
            // the dex is the largest data element by far; allow excluding it
            if(key && key.includes('QoL') && (includeDex || !key.includes(LocalStorageManager.DEX_DATA_KEY))) {
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
        const tKey = LocalStorageManager.translateKey(LocalStorageManager.DEX_DATA_KEY);
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
        LocalStorageManager.setItem(LocalStorageManager.DEX_DATA_KEY, [dateString, DEX_DATA]);
    }
}


/**
 * This class is used to store JSON, CSS, and HTML files - the build script replaces these with the given file's contents
 */
class Resources {

    // JSON objects loaded from resource files
    static BODY_STYLE_LIST = {
        "1":"Short Blob","2":"Snake","3":"Fish","4":"Two Arms","5":"Tall Blob","6":"Dino","7":"Two Legs","8":"Four Legs","9":"Bird","10":"Jelly","11":"Multi","12":"Human","13":"Flying Bug","14":"Crawling Bug"
    };
    static COLOUR_LIST = {
        "0":"Black","1":"Blue","2":"Brown","3":"Green","4":"Grey","5":"Pink","6":"Purple","7":"Red","8":"White","9":"Yellow"
    };
    static EGG_GROUP_LIST = {
        "0":"Undiscovered","1":"Monster","2":"Dragon","3":"Field","4":"Bug","5":"Grass","6":"Water 1","7":"Water 2","8":"Water 3","9":"Amorphous","10":"Fairy","11":"Human-Like","12":"Mineral","13":"Flying","15":"Ditto"
    };
    static NATURE_LIST = ["Lonely","Mild","Hasty","Gentle","Bold","Modest","Timid","Calm","Impish","Adamant","Jolly","Careful","Relaxed","Brave","Quiet","Sassy","Lax","Naughty","Rash","Naïve","Hardy","Docile","Serious","Bashful","Quirky"];
    static REGION_LIST = {
        "1":"Kanto","2":"Johto","3":"Hoenn","4":"Sinnoh","5":"Unova","6":"Kalos","7":"Alola","8":"Galar","9":"Paldea","97":"PokéFarm Q (Exclusives)","98":"PokéFarm Q (Megas)","99":"PokéFarm Q (Variants)"
    };
    static TYPE_LIST = {
        "0":"Normal","1":"Fire","2":"Water","3":"Electric","4":"Grass","5":"Ice","6":"Fighting","7":"Poison","8":"Ground","9":"Flying","10":"Psychic","11":"Bug","12":"Rock","13":"Ghost","14":"Dragon","15":"Dark","16":"Steel","17":"Fairy"
    };
    static STATIC_DEX_DATA = [{
        "region":"2","dexID":"167","species":"Chikorita","forme":"","type1":"4","type2":null,"eggGroup1":"5","eggGroup2":"1","legendary":false,"colour":"3","bodyStyle":"8","imgCodes":["c/z/0","1/f/z"]
    },{
        "region":"2","dexID":"168","species":"Bayleef","forme":"","type1":"4","type2":null,"eggGroup1":"5","eggGroup2":"1","legendary":false,"colour":"3","bodyStyle":"8","imgCodes":["6/i/2"]
    },{
        "region":"2","dexID":"169","species":"Meganium","forme":"","type1":"4","type2":null,"eggGroup1":"5","eggGroup2":"1","legendary":false,"colour":"3","bodyStyle":"8","imgCodes":["a/c/r","1/a/v"]
    },{
        "region":"2","dexID":"170","species":"Cyndaquil","forme":"","type1":"1","type2":null,"eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"7","imgCodes":["4/2/a","l/4/p"]
    },{
        "region":"2","dexID":"171","species":"Quilava","forme":"","type1":"1","type2":null,"eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"8","imgCodes":["9/j/v"]
    },{
        "region":"2","dexID":"172","species":"Typhlosion","forme":"","type1":"1","type2":null,"eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"8","imgCodes":["k/c/o"]
    },{
        "region":"2","dexID":"172","species":"Typhlosion","forme":"Hisuian Forme","type1":"1","type2":"13","eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"8","imgCodes":["2/j/d/9"]
    },{
        "region":"2","dexID":"173","species":"Totodile","forme":"","type1":"2","type2":null,"eggGroup1":"6","eggGroup2":"1","legendary":false,"colour":"1","bodyStyle":"6","imgCodes":["4/3/r","7/y/f"]
    },{
        "region":"2","dexID":"174","species":"Croconaw","forme":"","type1":"2","type2":null,"eggGroup1":"6","eggGroup2":"1","legendary":false,"colour":"1","bodyStyle":"6","imgCodes":["1/n/6"]
    },{
        "region":"2","dexID":"175","species":"Feraligator","forme":"","type1":"2","type2":null,"eggGroup1":"6","eggGroup2":"1","legendary":false,"colour":"1","bodyStyle":"6","imgCodes":["d/5/3"]
    },{
        "region":"1","dexID":"001","species":"Bulbasaur","forme":"","type1":"4","type2":"7","eggGroup1":"5","eggGroup2":"1","legendary":false,"colour":"3","bodyStyle":"8","imgCodes":["c/0/7","1/g/g"]
    },{
        "region":"1","dexID":"002","species":"Ivysaur","forme":"","type1":"4","type2":"7","eggGroup1":"5","eggGroup2":"1","legendary":false,"colour":"3","bodyStyle":"8","imgCodes":["9/6/r"]
    },{
        "region":"1","dexID":"003","species":"Venusaur","forme":"","type1":"4","type2":"7","eggGroup1":"5","eggGroup2":"1","legendary":false,"colour":"3","bodyStyle":"8","imgCodes":["c/1/5","2/u/a"]
    },{
        "region":"1","dexID":"003-M","species":"Venusaur","forme":"Mega Forme","type1":"4","type2":"7","eggGroup1":"5","eggGroup2":"1","legendary":false,"colour":"3","bodyStyle":"8","imgCodes":["7/5/z"]
    },{
        "region":"1","dexID":"004","species":"Charmander","forme":"","type1":"1","type2":null,"eggGroup1":"2","eggGroup2":"1","legendary":false,"colour":"7","bodyStyle":"6","imgCodes":["f/d/w","5/l/t"]
    },{
        "region":"1","dexID":"005","species":"Charmeleon","forme":"","type1":"1","type2":null,"eggGroup1":"2","eggGroup2":"1","legendary":false,"colour":"7","bodyStyle":"6","imgCodes":["o/i/v"]
    },{
        "region":"1","dexID":"006","species":"Charizard","forme":"","type1":"1","type2":"9","eggGroup1":"2","eggGroup2":"1","legendary":false,"colour":"7","bodyStyle":"6","imgCodes":["j/j/t"]
    },{
        "region":"1","dexID":"006-X","species":"Charizard","forme":"Mega Forme X","type1":"1","type2":"14","eggGroup1":"2","eggGroup2":"1","legendary":false,"colour":"0","bodyStyle":"6","imgCodes":["g/i/k"]
    },{
        "region":"1","dexID":"006-Y","species":"Charizard","forme":"Mega Forme Y","type1":"1","type2":"9","eggGroup1":"2","eggGroup2":"1","legendary":false,"colour":"7","bodyStyle":"6","imgCodes":["l/a"]
    },{
        "region":"1","dexID":"007","species":"Squirtle","forme":"","type1":"2","type2":null,"eggGroup1":"6","eggGroup2":"1","legendary":false,"colour":"1","bodyStyle":"6","imgCodes":["l/w/s","h/h/e"]
    },{
        "region":"1","dexID":"008","species":"Wartortle","forme":"","type1":"2","type2":null,"eggGroup1":"6","eggGroup2":"1","legendary":false,"colour":"1","bodyStyle":"6","imgCodes":["j/n"]
    },{
        "region":"1","dexID":"009","species":"Blastoise","forme":"","type1":"2","type2":null,"eggGroup1":"6","eggGroup2":"1","legendary":false,"colour":"1","bodyStyle":"6","imgCodes":["2/4/p"]
    },{
        "region":"1","dexID":"009-M","species":"Blastoise","forme":"Mega Forme","type1":"2","type2":null,"eggGroup1":"6","eggGroup2":"1","legendary":false,"colour":"1","bodyStyle":"6","imgCodes":["9/b/z/l"]
    },{
        "region":"1","dexID":"010","species":"Caterpie","forme":"","type1":"11","type2":null,"eggGroup1":"4","eggGroup2":null,"legendary":false,"colour":"3","bodyStyle":"14","imgCodes":["j/n/z","8/i/9"]
    },{
        "region":"1","dexID":"011","species":"Metapod","forme":"","type1":"11","type2":null,"eggGroup1":"4","eggGroup2":null,"legendary":false,"colour":"3","bodyStyle":"2","imgCodes":["o/o/m"]
    },{
        "region":"1","dexID":"012","species":"Butterfree","forme":"","type1":"11","type2":"9","eggGroup1":"4","eggGroup2":null,"legendary":false,"colour":"8","bodyStyle":"13","imgCodes":["e/k/d","5/2/p"]
    },{
        "region":"1","dexID":"013","species":"Weedle","forme":"","type1":"11","type2":"7","eggGroup1":"4","eggGroup2":null,"legendary":false,"colour":"2","bodyStyle":"14","imgCodes":["9/6/y"]
    },{
        "region":"1","dexID":"014","species":"Kakuna","forme":"","type1":"11","type2":"7","eggGroup1":"4","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"2","imgCodes":["f/1/q"]
    },{
        "region":"1","dexID":"015","species":"Beedrill","forme":"","type1":"11","type2":"7","eggGroup1":"4","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"13","imgCodes":["f/c/4"]
    },{
        "region":"1","dexID":"015-M","species":"Beedrill","forme":"Mega Forme","type1":"11","type2":"7","eggGroup1":"4","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"13","imgCodes":["d/1/6/d"]
    },{
        "region":"1","dexID":"016","species":"Pidgey","forme":"","type1":"0","type2":"9","eggGroup1":"13","eggGroup2":null,"legendary":false,"colour":"2","bodyStyle":"9","imgCodes":["b/y"]
    },{
        "region":"1","dexID":"017","species":"Pidgeotto","forme":"","type1":"0","type2":"9","eggGroup1":"13","eggGroup2":null,"legendary":false,"colour":"2","bodyStyle":"9","imgCodes":["c/c/o"]
    },{
        "region":"1","dexID":"018","species":"Pidgeot","forme":"","type1":"0","type2":"9","eggGroup1":"13","eggGroup2":null,"legendary":false,"colour":"2","bodyStyle":"9","imgCodes":["c/9/9"]
    },{
        "region":"1","dexID":"018-M","species":"Pidgeot","forme":"Mega Forme","type1":"0","type2":"9","eggGroup1":"13","eggGroup2":null,"legendary":false,"colour":"2","bodyStyle":"9","imgCodes":["m/r/4"]
    },{
        "region":"1","dexID":"019","species":"Rattata","forme":"","type1":"0","type2":null,"eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"6","bodyStyle":"8","imgCodes":["i/b/h/e"]
    },{
        "region":"1","dexID":"019r7","species":"Rattata","forme":"Alolan Forme","type1":"15","type2":"0","eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"0","bodyStyle":"8","imgCodes":["5/j/w","l/y/p","o/1/x"]
    },{
        "region":"1","dexID":"020","species":"Raticate","forme":"","type1":"0","type2":null,"eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"2","bodyStyle":"8","imgCodes":["s/y/w/b","3/6/m/d"]
    },{
        "region":"1","dexID":"020r7","species":"Raticate","forme":"Alolan Forme","type1":"15","type2":"0","eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"0","bodyStyle":"8","imgCodes":["3/j/v","c/p/z"]
    },{
        "region":"1","dexID":"020t7","species":"Raticate","forme":"Alolan Totem Forme","type1":"15","type2":"0","eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"0","bodyStyle":"8","imgCodes":["o/e/g/u"]
    },{
        "region":"1","dexID":"021","species":"Spearow","forme":"","type1":"0","type2":"9","eggGroup1":"13","eggGroup2":null,"legendary":false,"colour":"2","bodyStyle":"9","imgCodes":["3/4/y/0"]
    },{
        "region":"1","dexID":"022","species":"Fearow","forme":"","type1":"0","type2":"9","eggGroup1":"13","eggGroup2":null,"legendary":false,"colour":"2","bodyStyle":"9","imgCodes":["i/m/r","k/5"]
    },{
        "region":"1","dexID":"023","species":"Ekans","forme":"","type1":"7","type2":null,"eggGroup1":"3","eggGroup2":"2","legendary":false,"colour":"6","bodyStyle":"2","imgCodes":["6/v/6","d/b/d"]
    },{
        "region":"1","dexID":"024","species":"Arbok","forme":"","type1":"7","type2":null,"eggGroup1":"3","eggGroup2":"2","legendary":false,"colour":"6","bodyStyle":"2","imgCodes":["4/p/w"]
    },{
        "region":"1","dexID":"025","species":"Pichu","forme":"","type1":"3","type2":null,"eggGroup1":"0","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"8","imgCodes":["g/s/8","g/j/m"]
    },{
        "region":"1","dexID":"026","species":"Pikachu","forme":"","type1":"3","type2":null,"eggGroup1":"10","eggGroup2":"3","legendary":false,"colour":"9","bodyStyle":"8","imgCodes":["e/a/r","2/v/f"]
    },{
        "region":"1","dexID":"027","species":"Raichu","forme":"","type1":"3","type2":null,"eggGroup1":"10","eggGroup2":"3","legendary":false,"colour":"9","bodyStyle":"6","imgCodes":["2/d/p","3/z/5"]
    },{
        "region":"1","dexID":"027r7","species":"Raichu","forme":"Alolan Forme","type1":"3","type2":"10","eggGroup1":"10","eggGroup2":"3","legendary":false,"colour":"2","bodyStyle":"6","imgCodes":["e/k/u/7"]
    },{
        "region":"1","dexID":"028","species":"Sandshrew","forme":"","type1":"8","type2":null,"eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"6","imgCodes":["1/i/1","o/u/0"]
    },{
        "region":"1","dexID":"028r7","species":"Sandshrew","forme":"Alolan Forme","type1":"5","type2":"16","eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"8","bodyStyle":"6","imgCodes":["r/2/t/g","4/v/a/h"]
    },{
        "region":"1","dexID":"029","species":"Sandslash","forme":"","type1":"8","type2":null,"eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"6","imgCodes":["5/n/0"]
    },{
        "region":"1","dexID":"029t","species":"Sandslash","forme":"Totem Forme Q","type1":"8","type2":null,"eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"6","imgCodes":["b/8/r"]
    },{
        "region":"1","dexID":"029r7","species":"Sandslash","forme":"Alolan Forme","type1":"5","type2":"16","eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"1","bodyStyle":"6","imgCodes":["h/z/z/a"]
    }];
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
    static CORE_CSS = `#announcements li[data-name=QoL],.collapsible{cursor:pointer}.collapsible{border-radius:6px;max-width:600px;padding:4px;position:relative;text-align:left;width:100%}.collapsible_content{display:none;overflow:hidden;padding:0 18px}`;
    static HUB_CSS = `.qolHubModal>div>.panel{margin-bottom:1em}.qolHubModal>div>.panel>div>p:first-child{margin-top:.25em}.qolHubModal textarea{box-sizing:border-box;width:100%}#qolStorageOutput{border:1px solid;max-height:100px;overflow-y:auto;padding:3px;user-select:all}#qolConsoleContent,#qolStorageOutput{word-break:break-all}#qolHubSettings ul{margin:0}#qolHubSettings label{display:inline-block;margin-bottom:.25em}`;
    static MODAL_CSS = `.qolModal>h3:first-child a{color:inherit;float:right}`;
    static SHELTER_CSS = `.qoltooltip_trigger{border-bottom:1px dotted #000;display:inline-block;position:relative}.tooltip .tooltiptext{border-radius:6px;bottom:125%;left:50%;margin-left:0;opacity:0;padding:5px 0;position:absolute;text-align:center;transition:opacity .3s;visibility:hidden;width:500px;z-index:1}.tooltip .tooltiptext:after{border-style:solid;border-width:5px;content:"";left:50%;margin-left:-5px;position:absolute;top:100%}.tooltip:hover .tooltiptext{opacity:1;visibility:visible}.customsearchtooltip{width:400px}#sheltersuccess{text-align:center}#shelterfound{padding-top:20px}.daycarefoundme,.labfoundme,.privatefoundme,.publicfoundme,.shelterfoundme{background-color:#d5e265;border-radius:100%;box-shadow:0 0 25px 15px #d5e265}.qolshelterareagrid{display:flex!important;display:grid!important;flex-direction:row;flex-flow:row wrap;grid-template-columns:repeat(6,1fr);grid-template-rows:repeat(5,70px);min-height:350px}.qolshelterareagrid .pokemon{align-items:center;display:inline-block!important;display:inline-flex!important;flex:1 1 16%;justify-content:center;position:static!important}.qolshelterareagrid .pokemon img{max-height:100%;max-width:100%}.qolshelterareagrid .tooltip_content{bottom:0;position:absolute!important;transform:translateY(100%)}.qolshelterareagrid:before{display:none!important}.mq2 .qolshelterareagrid:not(.qolshelterarealarge),.qolshelterareasmall{grid-template-rows:repeat(5,35px);min-height:175px}.qolshelterarealarge .pokemon .big{display:block!important}.qolshelterarealarge .pokemon .small,.qolshelterareasmall .pokemon .big{display:none!important}.qolshelterareasmall .pokemon .small{display:block!important}`;
    static FIELDS_CSS = `#fieldorder{border-radius:4px;padding:4px}#fieldorder,#fieldsearch{margin:16px auto;max-width:600px;position:relative}.qolSortBerry{margin:-10px!important;top:45%!important;transition:none!important}.qolSortBerry>img.big{animation:none!important;padding:25px!important}.qolSortBerry.qolAnyBerry,.qolSortBerry.qolSourBerry{left:0!important}.qolSortBerry.qolSpicyBerry{left:20%!important}.qolSortBerry.qolDryBerry{left:40%!important}.qolSortBerry.qolSweetBerry{left:60%!important}.qolSortBerry.qolBitterBerry{left:80%!important}.mq2 .qolSortBerry{margin:-10px 2%!important;overflow:hidden;top:45%!important;transition:none!important;width:16%}.mq2 .qolSortBerry>img.small{animation:none!important;margin-left:-13px!important;padding:50%!important}.qolSortMiddle{left:40%!important;margin:-10px!important;top:35%!important;transition:none!important}.qolSortMiddle>img{animation:none!important;padding:40px!important}.qolGridField{display:flex!important;display:grid;flex-flow:row wrap;grid-template-columns:repeat(8,12.5%);grid-template-rows:repeat(5,69px);min-height:345px;padding-top:0!important}.mq25 .qolGridField{grid-template-rows:repeat(5,36px);min-height:180px}.qolGridPokeSize{align-items:center;display:inline-flex;flex:1 1 12.5%;justify-content:center;margin:0!important;position:static!important}.qolGridPokeImg{animation:none!important;max-height:70px;max-width:75px}.qolSelectFlavour{display:none}.qolFlavourShown~.qolSelectFlavour{display:inline}.qolFlavourShown~.qolSelectGender,.qolNatureShown~.qolSelectGender{display:none}`;
    static PARTY_CSS = `#qolpartymod{text-align:center}#qolpartymodcustom h3{font-size:100%;padding:2px}.qolPartyCustomParty{--multiuser-button-height:5em;--multiuser-border-radius:8px}.qolPartyCustomParty h1{align-items:center;display:flex;justify-content:center}.qolPartyCustomParty #partybox{padding-top:calc(var(--multiuser-button-height) + 1em);position:relative}.qolPartyCustomParty #partybox .party{box-shadow:none}.qolPartyCustomParty #partybox .party>div{position:static}.qolPartyCustomParty #partybox .action{height:auto!important;left:0;min-height:0;position:absolute;top:0;width:100%;z-index:9999}.qolPartyCustomParty #partybox .action>a,.qolPartyCustomParty #partybox .action>div{line-height:var(--multiuser-button-height);margin:0;min-height:var(--multiuser-button-height);padding:0}.qolPartyCustomParty #partybox .action .berrybuttons>a{box-sizing:border-box;height:100%!important;line-height:var(--multiuser-button-height)!important;width:100%}.qolPartyCustomParty #partybox .action>a{align-items:center;box-sizing:border-box;display:flex!important;justify-content:center}.qolPartyCustomParty #partybox .action.working,.qolPartyCustomParty #partybox .action:empty,.qolPartyCustomParty #partybox .action>table,.qolPartyCustomParty #partybox .berrybuttons>.tooltip_content{display:none}.qolPartyCustomParty #partybox .party>div:hover>.action a[data-berry]:after{border-color:transparent}.qolPartyCustomParty.qolStackMore .qolGetMore,.qolPartyCustomParty.qolStackNext .qolGoNext{height:var(--multiuser-button-height);left:0;line-height:var(--multiuser-button-height);margin:0;padding:0;position:absolute;top:0;width:100%;z-index:999}.qolPartyCustomParty.qolHideParty .party{height:0;overflow:hidden}.qolPartyCustomParty.qolCompactParty #partybox .party>div{background:transparent;border:none;margin-bottom:20px;padding:0;width:unset}.qolPartyCustomParty.qolCompactParty #partybox .party .expbar,.qolPartyCustomParty.qolCompactParty #partybox .party .name{display:none}.qolPartyCustomParty.qolCompactParty #partybox .party .pkmn a.qolCompactLink{display:block;height:100%;left:0;position:absolute;top:0;width:100%;z-index:999}.qolPartyCustomParty.qolHideFieldButton .fieldslink,.qolPartyCustomParty.qolHideModeChecks #partybox>label,.qolPartyCustomParty.qolHideTrainerCard #profilebox,.qolPartyCustomParty.qolHideUserName h1{display:none}.mq2 .qolPartyCustomParty #partybox .party>div,.multi-compact .qolPartyCustomParty #partybox .party>div{display:inline-block}.mq2 .qolPartyCustomParty #partybox .party>div .pkmn,.multi-compact .qolPartyCustomParty #partybox .party>div .pkmn{margin-right:0}.qolPartyCustomParty #partybox .party .action a,.qolPartyHideAll #partybox .party .action a,.qolPartyHideDislike #partybox .party .action a,.qolPartyNiceTable #partybox .party .action a{display:none;position:absolute;width:100%}.qolPartyCustomParty #partybox .party .action .berrybuttons[data-up=any] a[data-berry=aspear],.qolPartyCustomParty #partybox .party .action .berrybuttons[data-up=bitter]>a[data-berry=rawst],.qolPartyCustomParty #partybox .party .action .berrybuttons[data-up=dry]>a[data-berry=chesto],.qolPartyCustomParty #partybox .party .action .berrybuttons[data-up=sour]>a[data-berry=aspear],.qolPartyCustomParty #partybox .party .action .berrybuttons[data-up=spicy]>a[data-berry=cheri],.qolPartyCustomParty #partybox .party .action .berrybuttons[data-up=sweet]>a[data-berry=pecha],.qolPartyCustomParty #partybox .party .action>a,.qolPartyHideAll #partybox .party .action .berrybuttons[data-up=any] a[data-berry=aspear],.qolPartyHideAll #partybox .party .action .berrybuttons[data-up=bitter]>a[data-berry=rawst],.qolPartyHideAll #partybox .party .action .berrybuttons[data-up=dry]>a[data-berry=chesto],.qolPartyHideAll #partybox .party .action .berrybuttons[data-up=sour]>a[data-berry=aspear],.qolPartyHideAll #partybox .party .action .berrybuttons[data-up=spicy]>a[data-berry=cheri],.qolPartyHideAll #partybox .party .action .berrybuttons[data-up=sweet]>a[data-berry=pecha],.qolPartyHideAll #partybox .party .action>a,.qolPartyHideDislike #partybox .party .action .berrybuttons[data-up=any] a[data-berry=aspear],.qolPartyHideDislike #partybox .party .action .berrybuttons[data-up=bitter]>a[data-berry=rawst],.qolPartyHideDislike #partybox .party .action .berrybuttons[data-up=dry]>a[data-berry=chesto],.qolPartyHideDislike #partybox .party .action .berrybuttons[data-up=sour]>a[data-berry=aspear],.qolPartyHideDislike #partybox .party .action .berrybuttons[data-up=spicy]>a[data-berry=cheri],.qolPartyHideDislike #partybox .party .action .berrybuttons[data-up=sweet]>a[data-berry=pecha],.qolPartyHideDislike #partybox .party .action>a,.qolPartyNiceTable #partybox .party .action .berrybuttons[data-up=any] a[data-berry=aspear],.qolPartyNiceTable #partybox .party .action .berrybuttons[data-up=bitter]>a[data-berry=rawst],.qolPartyNiceTable #partybox .party .action .berrybuttons[data-up=dry]>a[data-berry=chesto],.qolPartyNiceTable #partybox .party .action .berrybuttons[data-up=sour]>a[data-berry=aspear],.qolPartyNiceTable #partybox .party .action .berrybuttons[data-up=spicy]>a[data-berry=cheri],.qolPartyNiceTable #partybox .party .action .berrybuttons[data-up=sweet]>a[data-berry=pecha],.qolPartyNiceTable #partybox .party .action>a{display:inline-block}.qolPartyCustomParty #partybox .party .working .berrybuttons,.qolPartyHideAll #partybox .party .working .berrybuttons,.qolPartyHideDislike #partybox .party .working .berrybuttons,.qolPartyNiceTable #partybox .party .working .berrybuttons{opacity:.3}.qolPartyCustomParty .loading,.qolPartyHideAll .loading,.qolPartyHideDislike .loading,.qolPartyNiceTable .loading{user-select:none}.qolPartyHideAll #partybox .party>div>:not(.action),.qolPartyHideAll .tooltip_content,.qolPartyNiceTable #partybox .party>div>:not(.action),.qolPartyNiceTable .tooltip_content{display:none}.qolPartyNiceTable #profilepage #partybox .party{box-shadow:none;width:250px}.qolPartyNiceTable #profilepage #partybox .party>div{border-radius:0;border-width:1px 1px 0;width:210px}.qolPartyNiceTable #profilepage #partybox .party>div:first-child{border-radius:6px 6px 0 0}.qolPartyNiceTable #profilepage #partybox .party>div:nth-child(6){border-bottom-width:1px;border-radius:0 0 6px 6px}.qolPartyHideAll #profilepage #partybox .party{box-shadow:none}.qolPartyHideAll #profilepage #partybox .party>div{background:transparent;border:none;height:0;padding:0;position:unset;width:0}.qolPartyHideAll #profilepage #partybox .party>div .action,.qolPartyHideAll #profilepage #partybox .party>div .action .berrybuttons{height:0;position:unset!important}.qolPartyHideAll #profilepage #partybox .party>div .action a{margin-left:10px;overflow:hidden;padding:3px;position:absolute;width:112px;z-index:1}.qolPartyHideAll #profilepage #partybox .party>div .action .berrybuttons a{border-radius:8px;padding:5px}.qolPartyHideAll #profilepage #partybox .party>div .action table{display:none}.qolPartyHideAll .compact-view-toggle+label{display:inline-block;margin:0 4px 8px}.qolPartyHideAll #profilebox,.qolPartyHideAll #trainerimage,.qolPartyHideAll .fieldslink,.qolPartyHideAll .working{display:none}`;
    static FORGE_CSS = `.badgelist>table>tbody>tr>td>.itemtooltip{margin-top:-28px;position:relative}.badgelist>table>tbody>tr>td>p{margin-block-end:0;margin-block-start:0}.qolBadges{border-collapse:collapse}.qolBadgesTop td{border-top:1px solid}.qolBadgesBot td:first-of-type img{margin-right:5px;vertical-align:middle}`;
    static LAB_CSS = `#labsuccess{text-align:center}#labfound{padding-top:20px}.boldp{font-weight:700}`;
    static DEMO_CSS = '#thisisanexample {\n    color: yellow;\n}\n\n.thisisalsoanexample {\n    background-color: blue!important;\n}\n\nhappycssing {\n    display: absolute;\n}';

    // HTML files
    static QOL_HUB_HTML = `<p>Welcome to the user hub of the QoL userscript! Here you can adjust the script settings. If you need help or have suggestions, please visit the <a href="https://pokefarm.com/forum/thread/193472/Quality-of-Life-changes-UserScript">QoL's main thread</a>.</p><div class="panel"><h3>Main Settings</h3><div id="qolHubSettings"><p><b>Note</b>: Please refresh the page to see any changes made to these settings take effect.</p><div><label><input type="checkbox" class="qolhubsetting" data-key="partyMod"> <span>Party click mod</span></label></div><div><label><input type="checkbox" class="qolhubsetting" data-key="shelterEnable"> <span>Enable All Shelter QoL Features</span></label><ul><li><label><input type="checkbox" class="qolhubsetting" data-key="shelterFeatureEnables.search"> <span>Advanced Searching</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="shelterFeatureEnables.sort"> <span>Advanced Sorting</span></label></li></ul></div><div><label><input type="checkbox" class="qolhubsetting" data-key="publicFieldEnable"> <span>Enable All Public Fields QoL Features</span></label><ul><li><label><input type="checkbox" class="qolhubsetting" data-key="publicFieldFeatureEnables.search"> <span>Advanced Searching</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="publicFieldFeatureEnables.sort"> <span>Advanced Sorting</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="publicFieldFeatureEnables.tooltip"> <span>Tooltips Enable/Disable</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="publicFieldFeatureEnables.pkmnlinks"> <span>Pokemon Link List</span></label></li></ul></div><div><label><input type="checkbox" class="qolhubsetting" data-key="privateFieldEnable"> <span>Enable All Private Fields QoL Features</span></label><ul><li><label><input type="checkbox" class="qolhubsetting" data-key="privateFieldFeatureEnables.search"> <span>Advanced Searching</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="privateFieldFeatureEnables.release"> <span>Multi-Select Controls (Move & Release)</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="privateFieldFeatureEnables.tooltip"> <span>Tooltips Enable/Disable</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="privateFieldFeatureEnables.pkmnlinks"> <span>Pokemon Link List</span></label></li></ul></div><div><label><input type="checkbox" class="qolhubsetting" data-key="enableDaycare"> <span>Highlight Breeding Matches</span></label></div><div><label><input type="checkbox" class="qolhubsetting" data-key="fishingEnable"> <span>Fishing Multi-Select Controls</span></label></div><div><label><input type="checkbox" class="qolhubsetting" data-key="easyEvolve"> <span>Easy evolving</span></label></div><div><label><input type="checkbox" class="qolhubsetting" data-key="labNotifier"> <span>Lab Notifier</span></label></div><div><label><input type="checkbox" class="qolhubsetting" data-key="dexFilterEnable"> <span>Multiple Types Filtering</span></label></div><div><label><input type="checkbox" class="qolhubsetting" data-key="condenseWishforge"> <span>Smaller Crafted Badges List</span></label></div><div><label><input type="checkbox" class="qolhubsetting" data-key="interactionsEnable"> <span>Interactions page (sent multi-link)</span></label></div><div><label><input type="checkbox" class="qolhubsetting" data-key="summaryEnable"> <span>Summary page (pkmnpanel code)</span></label></div></div></div><div class="panel"><h3>Pokédex Settings</h3><div><p>If newly added Pokémon are not matching properly, your dex may be out of date. You can try clearing your cached dex to get the new data. If that doesn't help, the new Pokémon may not have been added yet - please report it in the QoL thread.</p><p>Date last updated: <span id="qolDexDate">[unknown]</span> <button type="button" id="clearCachedDex">Clear Cached Dex</button></p><p><label><input type="checkbox" class="qolhubsetting" data-key="preventDexUpdate"> <span>Prevent auto-update (not recommended)</span></label></p></div></div><div class="panel"><h3>Custom CSS</h3><div><p>Add your custom CSS! If you have an error in your CSS you won't get notified, so read your code carefully. Still doesn't work? Try: '!important'. The custom CSS is being loaded after the page loads, so it's possible that there will be a short delay before your CSS changes apply. Note: LESS formatting and skin color vars are not supported; if you're copying LESS-formatted code from a guide, you should <a href="https://lesscss.org/less-preview/" target="_blank">convert it to plain CSS first.</a></p><textarea id="qolcustomcss" rows="15" class="qolhubsetting" data-key="customCss"></textarea></div></div><div class="panel"><h3>Debugging</h3><div><p>You can reset some or all of the script settings here. If this script misbehaving after an update, this could help. Caution: You cannot undo this action.</p><p>Reset page settings:<!-- Option values correspond to keys in the PAGES object in the main script --> <select name="Page Select" id="qolHubResetSettingsSelect" data-key="resetPageSettings"><option value="None">None</option></select> <button type="button" id="resetPageSettings">Reset Page Settings</button> <button type="button" id="resetAllSettings">Reset ALL Settings</button></p><div><p>Some QoL features may log problems or errors here. You may be asked about this when reporting bugs. <button type="button" id="qolErrorConsole">View errors</button></p><ul id="qolConsoleContent"></ul></div><div>The QoL settings are stored in a cookie on your browser. You may be asked to post them when reporting bugs. <button type="button" id="qolStorageLog">Get settings</button><p id="qolStorageOutput" style="display: none;"></p><button type="button" id="qolLogPlusDex">Log settings & dex to console</button></div></div></div><p style="text-align: right"><button type="button" class="modalClose">Close</button></p>`;
    static PARTY_MOD_HTML = `<div id="qolpartymod"><label><input type="radio" class="qolsetting" name="partyModType" data-key="partyModType" value="noMod">None</label> <label><input type="radio" class="qolsetting" name="partyModType" data-key="partyModType" value="hideDislike">Hide disliked</label> <label><input type="radio" class="qolsetting" name="partyModType" data-key="partyModType" value="niceTable">Table view</label> <label><input type="radio" class="qolsetting" name="partyModType" data-key="partyModType" value="hideAll">Hide all</label> <label><input type="radio" class="qolsetting" name="partyModType" data-key="partyModType" value="customParty">Customize</label></div><div id="qolpartymodcustom" class="panel accordion" style="display:none;"><h3><a href="#">Custom options <svg viewBox="-6 -6 12 12" width="16" height="16" class="acctoggle"><polygon fill="currentColor" points="-2,-4 4,0 -2,4"></polygon></svg></a></h3><div style="display:none;"><div class="customopt"><label><input type="checkbox" class="qolsetting" data-key="stackNextButton">Stack next button</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-key="stackMoreButton">Stack get more button</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-key="showPokemon">Show pokemon</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-key="compactPokemon">Compact pokemon (if shown)</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-key="clickablePokemon">Clickable pokemon (if compact)</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-key="showTrainerCard">Show trainer card</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-key="showFieldButton">Show field button</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-key="showModeChecks">Show view mode checks</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-key="showUserName">Show user name</label></div></div></div>`;
    static QOL_HUB_ICON_HTML = `<li data-name="QoL"><a title="QoL Settings" id="qolHubIcon"><img src="https://pokefarm.com/upload/:b7q/QoL/icon.png" alt="QoL Settings">QoL </a><!-- The QoL hub doesn't exist until opened; store custom errors here initially instead --><ul style="display: none;" id="qolConsoleHolder"></ul></li>`;
    static LAB_OPTIONS_HTML = `<div id="labCustomSearch" class="center"><p class="boldp">Egg type search</p><p>Select which egg types you would like to find in the lab. You can select multiple!</p><input type="checkbox" class="qolsetting" data-key="findTypeEgg">Egg types <input type="button" value="Add typesearch" id="addLabTypeList"><div id="labTypes"><div class="0"></div></div><p class="boldp">Egg custom search</p><p>Add the pokemon name or Img code (complete link starting from //pfq..) that you would like to find in the lab in a searchfield. You can select multiple!</p><input type="checkbox" class="qolsetting" data-key="customEgg">Custom Egg <input type="button" value="Add searchfield" id="addLabSearch"><div id="searchkeys"><div class="0"></div></div></div>`;
    static EVOLVE_FAST_HTML = `<ul class="qolEvolveTypeList"><li class="expandlist"><h3 class="slidermenu">Normal</h3><ul class="normal 0 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Fire</h3><ul class="Fire 1 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Water</h3><ul class="Water 2 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Electric</h3><ul class="Electric 3 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Grass</h3><ul class="Grass 4 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Ice</h3><ul class="Ice 5 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Fighting</h3><ul class="Fighting 6 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Poison</h3><ul class="Poison 7 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Ground</h3><ul class="Ground 8 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Flying</h3><ul class="Flying 9 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Psychic</h3><ul class="Psychic 10 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Bug</h3><ul class="Bug 11 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Rock</h3><ul class="Rock 12 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Ghost</h3><ul class="Ghost 13 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Dragon</h3><ul class="Dragon 14 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Dark</h3><ul class="Dark 15 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Steel</h3><ul class="Steel 16 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Fairy</h3><ul class="Fairy 17 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Unknown Types</h3><ul class="Unknown 18 qolChangeLogContent"></ul></li></ul>`;
    static PRIVATE_FIELD_SEARCH_HTML = `<div id="fieldsearch"><button type="button" class="collapsible"><b>Advanced Field search</b></button><div class="collapsible_content"><p>Check the boxes of Pokemon you wish to find in this field! You can select multiple checkboxes at once and it will notify you whenever it will find the types of Pokemons you selected!</p><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldShiny">Shiny</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldAlbino">Albino</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldMelanistic">Melanistic</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldPrehistoric">Prehistoric</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldDelta">Delta</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldMega">Mega</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldStarter">Starter</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldCustomSprite">Custom Sprite</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldItem">Holds Item</label></td></tr></tbody></table><h4>Search on type</h4><p>Select which types of Pokemon you wish to find</p><input type="button" value="Add type" id="addPrivateFieldTypeSearch"><div id="fieldTypes"><div class="0"></div></div><h4>Search on nature</h4><p>Select which natures of Pokemon you wish to find</p><input type="button" value="Add nature" id="addPrivateFieldNatureSearch"><div id="natureTypes"><div class="0"></div></div><h4>Search on egg group</h4><p>Select which egg groups you wish to find</p><input type="button" value="Add egg group" id="addPrivateFieldEggGroupSearch"><div id="eggGroupTypes"><div class="0"></div></div><h4>Custom Search</h4><p>Here you can custom find any Pokemon you want! Hover over "Custom Search Help" for more info.</p><div class="tooltip_trigger qoltooltip_trigger">Custom Search Help</div><div class="tooltip_content customsearchtooltip"><span class="tooltiptext">Custom search by Pokemon name<br><br>Select Custom Egg and/or Custom Pokemon and type the name of the Pokemon you wish to find to find that Pokemon or the egg of that Pokemon. If you want to find a Pokemon with a specific gender, select the gender you wish to find.<br><br>Custom search by image code<br><br>Select By img code (and de-select Custom Egg & Custom Pokemon checkboxes) to find a Pokemon or egg by img code. For example you wish to find a Bulbasaur. You paste it's Img code in the search bar:<br>//pfq-static.com/img/pkmn/1/g/g.png/t=1474027727<br>and now it will show you when a Bulbasaur is found! Copy paste the complete link (starting from //) or you won't find anything.<br><br><a href="https://docs.google.com/spreadsheets/d/1rD1VZNTQRYXMOVKvGasjmMdMJu-iheE-ajsFkfs4QXA/edit?usp=sharing">List of Eggs Image Codes</a><br><br>More info on finding Pokemon with their img code:<br><br><a href="https://pokefarm.com/forum/thread/127552/Site-Skins-How-To-and-Helpful-CSS">"Pokemon Modifications - Make Shelter Pokemon Stand Out"</a></span></div><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="customEgg">Custom Egg</label></td><td><label><input type="checkbox" class="qolsetting" data-key="customPokemon">Custom Pokemon</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="customPng">By img code</label></td></tr></tbody></table><h4>Search on gender</h4><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldMale">Male</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldFemale">Female</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldNoGender">Genderless</label></td></tr></tbody></table><h4>Search Keys</h4><input type="button" value="Add searchfield" id="addTextField"><div id="searchkeys"><div class="0"></div></div></div><br></div>`;
    static SHELTER_OPTIONS_HTML = `<div id ="shelteroptionsqol"><p>Enter search criteria below to highlight specific Pokemon. Use the letter 'n' key to select and cycle through the Pokemon matched by the script.</p><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="findNewEgg">New Egg</label></td><td><label><input type="checkbox" class="qolsetting" data-key="findNewPokemon">New Pokemon</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="findShiny">Shiny</label></td><td><label><input type="checkbox" class="qolsetting" data-key="findAlbino">Albino</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="findMelanistic">Melanistic</label></td><td><label><input type="checkbox" class="qolsetting" data-key="findPrehistoric">Prehistoric</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="findDelta">Delta</label></td><td><label><input type="checkbox" class="qolsetting" data-key="findMega">Mega</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="findStarter">Starter</label></td><td><label><input type="checkbox" class="qolsetting" data-key="findCustomSprite">Custom Sprite</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="findTotem">Totem</label></td><td><label><input type="checkbox" class="qolsetting" data-key="findLegendary">Legendary</label></td></tr></tbody></table> <h4 style="margin-block-end:0.5em;">Quick search</h4><button type="button" id="qolQuickTextBtn">Add text</button> <button type="button" id="qolQuickTypeBtn">Add type</button><div id="qolQuickShelterSearches"></div></div>`;
    static SHELTER_SORT_HTML = `<div id="qolsheltersort"><label><input type="checkbox" class="qolsetting" data-key="shelterGrid"><span>Sort by Grid</span></label><div style="padding: 5px">Sprite size mode:<p style="margin: 5px 0"><input type="radio" id="spriteSizeAuto" name="shelterSpriteSize" class="qolsetting" data-key="shelterSpriteSize" value="auto"> <label for="spriteSizeAuto">Automatic</label></p><p style="margin: 5px 0"><input type="radio" id="spriteSizeLarge" name="shelterSpriteSize" class="qolsetting" data-key="shelterSpriteSize" value="large"> <label for="spriteSizeLarge">Large</label></p><p style="margin: 5px 0"><input type="radio" id="spriteSizeSmall" name="shelterSpriteSize" class="qolsetting" data-key="shelterSpriteSize" value="small"> <label for="spriteSizeSmall">Small</label></p></div></div>`;
    static FIELD_SEARCH_HTML = `<div id="fieldsearch"><button type="button" class="collapsible"><b>Advanced Field search</b></button><div class="collapsible_content"><p>Check the boxes of Pokemon you wish to find in this field! You can select multiple checkboxes at once and it will notify you whenever it will find the types of Pokemons you selected!</p><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldShiny">Shiny</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldAlbino">Albino</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldMelanistic">Melanistic</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldPrehistoric">Prehistoric</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldDelta">Delta</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldMega">Mega</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldStarter">Starter</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldCustomSprite">Custom Sprite</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldItem">Holds Item</label></td></tr></tbody></table><h4>Search on type</h4><p>Select which types of Pokemon you wish to find</p><input type="button" value="Add type" id="addFieldTypeSearch"><div id="fieldTypes"><div class="0"></div></div><h4>Search on nature</h4><p>Select which natures of Pokemon you wish to find</p><input type="button" value="Add nature" id="addFieldNatureSearch"><div id="natureTypes"><div class="0"></div></div><h4>Search on egg group</h4><p>Select which egg groups you wish to find</p><input type="button" value="Add egg group" id="addFieldEggGroupSearch"><div id="eggGroupTypes"><div class="0"></div></div><h4>Custom Search</h4><p>Here you can custom find any Pokemon you want! Hover over "Custom Search Help" for more info.</p><div class="tooltip_trigger qoltooltip_trigger">Custom Search Help</div><div class="tooltip_content customsearchtooltip"><span class="tooltiptext">Custom search by Pokemon name<br><br>Select Custom Egg and/or Custom Pokemon and type the name of the Pokemon you wish to find to find that Pokemon or the egg of that Pokemon. If you want to find a Pokemon with a specific gender, select the gender you wish to find.<br><br>Custom search by image code<br><br>Select By img code (and de-select Custom Egg & Custom Pokemon checkboxes) to find a Pokemon or egg by img code. For example you wish to find a Bulbasaur. When the URL for its image is this:<br>//pfq-static.com/img/pkmn/1/g/g.png/t=1474027727<br>paste only '1/g/g' (without the quotes), and now it will show you when a Bulbasaur is found! You may also copy the complete link.<br><a href="https://docs.google.com/spreadsheets/d/1rD1VZNTQRYXMOVKvGasjmMdMJu-iheE-ajsFkfs4QXA/edit?usp=sharing">List of Eggs Image Codes</a><br><br>More info on finding Pokemon with their img code:<br><br><a href="https://pokefarm.com/forum/thread/127552/Site-Skins-How-To-and-Helpful-CSS">"Pokemon Modifications - Make Shelter Pokemon Stand Out"</a></span></div><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldCustomEgg">Custom Egg</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldCustomPokemon">Custom Pokemon</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldCustomPng">By img code</label></td></tr></tbody></table><h4>Search on gender</h4><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldMale">Male</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldFemale">Female</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldNoGender">Genderless</label></td></tr></tbody></table><h4>Search Keys</h4><input type="button" value="Add searchfield" id="addTextField"><div id="searchkeys"><div class="0"></div></div><br></div></div>`;
    static FIELD_SORT_HTML = `<div id="fieldorder"><label><input type="checkbox" class="qolsetting qolalone" data-key="fieldByBerry"> Sort by berries</label> <label><input type="checkbox" class="qolsetting qolalone" data-key="fieldByMiddle"> Sort in the middle</label> <label><input type="checkbox" class="qolsetting qolalone" data-key="fieldByGrid"> Align to grid</label> <label><input type="checkbox" class="qolsetting" data-key="fieldClickCount"> Click counter</label></div>`;
    static PUBLIC_FIELD_TOOLTIP_MOD_HTML = `<div id="tooltipenable"><button type="button" class="collapsible"><b>Tooltip Settings</b></button><div class="collapsible_content"><span>The "Enable tooltip" settings force the tooltip on or off. To revert back to Pokefarm's default tooltip settings, uncheck "Enable QoL Tooltip Changes" and refresh the page.</span><hr><table><tr><td><label><input type="checkbox" class="qolsetting tooltipsetting" data-key="tooltipEnableMods"> Enable QoL Tooltip Settings</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting tooltipsetting" data-key="tooltipNoBerry"> Hide tooltip<br>(No berry selected)</label></td><td><label><input type="checkbox" class="qolsetting tooltipsetting" data-key="tooltipBerry"> Hide tooltip<br>(Berry selected)</label></td></tr></table></div></div>`;
    static PRIVATE_FIELD_TOOLTIP_MOD_HTML = `<div id="tooltipenable"><button type="button" class="collapsible"><b>Tooltip Settings</b></button><div class="collapsible_content"><span>The "Enable tooltip" settings force the tooltip on or off. To revert back to Pokefarm's default tooltip settings, uncheck "Enable QoL Tooltip Changes" and refresh the page.</span><hr><table><tr><td><label><input type="checkbox" class="qolsetting tooltipsetting" data-key="tooltipEnableMods"> Enable QoL Tooltip Settings</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting tooltipsetting" data-key="tooltipNoBerry"> Hide tooltip</label></td></tr></table></div></div>`;
    static MASS_RELEASE_FISHING_HTML = `<label id="selectallfish"><input class="qolsetting" id="selectallfishcheckbox" type="checkbox">Select all</label> <label id="movefishselectany"><input class="qolsetting" id="movefishselectanycheckbox" type="checkbox">Select Any</label> <label id="movefishselectsour"><input class="qolsetting" id="movefishselectsourcheckbox" type="checkbox">Select Sour</label> <label id="movefishselectspicy"><input class="qolsetting" id="movefishselectspicycheckbox" type="checkbox">Select Spicy</label> <label id="movefishselectdry"><input class="qolsetting" id="movefishselectdrycheckbox" type="checkbox">Select Dry</label> <label id="movefishselectsweet"><input class="qolsetting" id="movefishselectsweetcheckbox" type="checkbox">Select Sweet</label> <label id="movefishselectbitter"><input class="qolsetting" id="movefishselectbittercheckbox" type="checkbox">Select Bitter</label>`;

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
        const mainSettings = UserDataHandle.getSettings().mainSettings;
        if('preventDexUpdate' in mainSettings && mainSettings.preventDexUpdate===true) {
            console.log('Not updating dex: user disabled');
        }
        else {
            console.log('Updating dex from from uploaded file');
            try {
                this.DEX_LOADING = true;
                const self = this;
                $.get("https://pokefarm.com/upload/:b7q/QoL/dex-data.jpg", function(data){
                    self.DEX_DATA = JSON.parse(data);
                    const dateString = new Date().toLocaleString('en-GB', {
                        timeZone: 'UTC'
                    });
                    self.DEX_UPDATE_DATE = dateString;
                    LocalStorageManager.updateLocalStorageDex(self.DEX_DATA, dateString);
                    self.DEX_LOADING = false;
                    console.log('Dex load complete');
                });
            } catch(e) {
                ErrorHandler.error('Failed to load dex data from uploaded file', e);
                this.resetDex();
            }
        }
    }
    // Clears any locally stored dex data, and loads the static dex data instead.
    resetDex() {
        ErrorHandler.warn('Using static dex data');
        LocalStorageManager.removeItem(LocalStorageManager.DEX_DATA_KEY);
        this.DEX_UPDATE_DATE = undefined;
        this.DEX_LOADING = undefined;
        this.DEX_DATA = Resources.STATIC_DEX_DATA;
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
 */
class UserSettings {

    /*
     * used to tie "global" enable settings in USER_SETTINGS to the more
     * granular settings that are related to the same page
     */
    static LINKED_SETTINGS = [
        {
            'manager': 'shelterEnable',
            'managed': 'shelterFeatureEnables'
        },
        {
            'manager': 'publicFieldEnable',
            'managed': 'publicFieldFeatureEnables'
        },
        {
            'manager': 'privateFieldEnable',
            'managed': 'privateFieldFeatureEnables'
        },
    ];

    mainSettings = {};
    pageSettings = {};

    constructor() {
        console.log('Initializing settings');
        this.setDefaults();
        this.loadSettings();
    }
    // Set the default settings values (does not save to storage)
    setDefaults() {
        // default settings when the script gets loaded the first time
        this.mainSettings = {
            customCss : '',
            enableDaycare : true,
            shelterEnable : true,
            fishingEnable : true,
            publicFieldEnable : true,
            privateFieldEnable : true,
            partyMod : true,
            easyEvolve : true,
            labNotifier : true,
            dexFilterEnable : true,
            condenseWishforge : true,
            interactionsEnable : true,
            summaryEnable : true,
            preventDexUpdate: false,
            shelterFeatureEnables : {
                search: true,
                sort: true,
            },
            publicFieldFeatureEnables : {
                search: true,
                sort: true,
                release: true,
                tooltip: true,
                pkmnlinks: true
            },
            privateFieldFeatureEnables : {
                search: true,
                release: true,
                tooltip: true,
                pkmnlinks: true
            }
        };
        this.setPageDefaults('ALL');
    }
    /*
     * Page should be a valid local storage key, starting with QoL
     * When "ALL", all page defaults are set
     */
    setPageDefaults(page) {
        let pageList = [];
        if(page==='ALL') {
            pageList = LocalStorageManager.PAGE_SETTINGS_KEYS;
        }
        else {
            pageList.push(page);
        }
        for(let i=0; i<pageList.length; i++) {
            switch(pageList[i]) {
            case 'QoLLab':
                this.pageSettings.QoLLab = {
                    findLabEgg: '',
                    customEgg: true,
                    findLabType: '',
                    findTypeEgg: true,
                };
                break;
            case 'QoLMultiuser':
                this.pageSettings.QoLMultiuser ={
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
                    showUserName: true
                };
                break;
            case 'QoLPrivateFields':
                this.pageSettings.QoLPrivateFields = UserSettings.fieldDefaults(false);
                break;
            case 'QoLPublicFields':
                this.pageSettings.QoLPublicFields = UserSettings.fieldDefaults(true);
                break;
            case 'QoLShelter':
                this.pageSettings.QoLShelter = {
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
                    quickTypeSearch: [],
                    fullOptionSearch: {},
                    quickPkmnSearch: [],
                    fullPkmnSearch: {}
                };
                break;
            default:
                ErrorHandler.warn('Cannot set page defaults for unknown page: '+pageList[i]);
            }
        }
    }
    // Most field settings are shared, build defaults here
    static fieldDefaults(isPublic) {
        const fieldSettings = {
            fieldNewPokemon: true,
            fieldShiny: false,
            fieldAlbino: false,
            fieldMelanistic: false,
            fieldPrehistoric: false,
            fieldDelta: false,
            fieldMega: false,
            fieldStarter: false,
            fieldCustomSprite: false,
            fieldItem: false,
            fieldMale: true,
            fieldFemale: true,
            fieldNoGender: true,
            fieldCustomItem: true, // unused
            fieldCustomPokemon: true,
            fieldCustomEgg: true,
            fieldCustomPng: false,
            tooltipEnableMods: false,
            fieldCustom: '',
            fieldType: '',
            fieldNature: '',
            fieldEggGroup: ''
        };
        // Additional public-only settings
        if(isPublic) {
            fieldSettings.tooltipNoBerry = false;
            fieldSettings.tooltipBerry = false;
            fieldSettings.fieldByBerry = false;
            fieldSettings.fieldByMiddle = false;
            fieldSettings.fieldByGrid = false;
            fieldSettings.fieldClickCount = true;
        }
    }
    // Saves all settings in the UserSettings object to local storage
    saveSettings() {
        // Main settings
        LocalStorageManager.setItem(LocalStorageManager.MAIN_SETTINGS_KEY, this.mainSettings);
        // Page settings
        for(const pageKey in this.pageSettings) {
            LocalStorageManager.setItem(pageKey, this.pageSettings[pageKey]);
        }
    }
    // Loads all settings in storage into the UserSettings object
    loadSettings() {
        const storedSettings = LocalStorageManager.getAllQoLSettings();
        for(const settingKey in storedSettings) {
            // remove user ID from setting
            let settingName = settingKey.split('.');
            if(settingName.length == 2) {
                let foundKey = false;
                settingName = settingName[1];
                // Check if this is the main settings object
                if(settingName == LocalStorageManager.MAIN_SETTINGS_KEY) {
                    const mainSettings = JSON.parse(storedSettings[settingKey]);
                    // only load settings that are known about in this class
                    for(const mainKey in mainSettings) {
                        if(mainKey in this) {
                            this.mainSettings[mainKey] = mainSettings[mainKey];
                        }
                    }
                    foundKey = true;
                }
                // Otherwise check for a page settings
                for(const pageKey in this.pageSettings) {
                    if(settingName == pageKey) {
                        // get the matching key for the user setting's object's pageSettings property
                        const pageSettings = JSON.parse(storedSettings[settingKey]);
                        // only load page settings that are known about in this class
                        for(const pageSettingKey in pageSettings) {
                            if(pageSettingKey in this.pageSettings[pageKey]) {
                                this.pageSettings[pageKey] = pageSettings[pageSettingKey];
                            }
                        }
                        foundKey = true;
                    }
                }
                if(!foundKey) {
                    ErrorHandler.warn('Unknown setting: '+settingKey);
                }
            }
            else {
                ErrorHandler.warn('Invalid setting: '+settingKey);
            }
        }
    }
    // Listens for changes to settings inputs
    static addSettingsListeners() {
        $(document).on('change', '.qolsetting', (function () {
            /*
             * TODO: handle setting change
             * will there be a problem for items added after the init cycle? can that even happen?
             * Make sure it can handle radios too (party style, shelter sprite size)
             */
        }));
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
            console.log('Adding QoL icon');
            document.querySelector('#announcements li.spacer').insertAdjacentHTML('beforebegin', Resources.QOL_HUB_ICON_HTML);
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
        // reset settings handlers
        $('#resetPageSettings').on('click', (function (e) {
            console.log('TODO reset page settings');
            console.log(e);
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

        // storage/settings loggers
        $('#qolStorageLog').on('click', (function() {
            const storedSettings = LocalStorageManager.getAllQoLSettings();
            console.log(storedSettings);
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
        $(document).on('click', '#qolLogPlusDex', (function() {
            /*
             * console-only version of above that also includes dex data
             * stringifies output to make sure it doesn't get changed later
             */
            const storedSettings = LocalStorageManager.getAllQoLSettings(true);
            console.log(JSON.stringify(storedSettings));
        }));
    }

    // additional after open tasks that aren't handlers
    static afterOpen() {
        // set dex updated date display
        let dexUpdateDate = UserDataHandle.getDex().DEX_UPDATE_DATE;
        if(!dexUpdateDate) {
            dexUpdateDate = 'Never updated';
        }
        $('#qolDexDate').text(dexUpdateDate);

        const mainSettings = UserDataHandle.getSettings().mainSettings;
        if('customCss' in mainSettings && mainSettings.customCss.trim() !== ''){
            $('#qolcustomcss').val(mainSettings.customCss);
        }
        else {
            $('#qolcustomcss').val(Resources.DEMO_CSS);
        }
    }

} // QoLHub

class Page {
    static init() {
        /*
         *General init order:
         *- html/css
         *- observers
         *- handlers
         *- other tasks
         */
    }

    /*
     * sets up a basic mutation observer with the given options for the specified element
     * when the mutation is observed, calls the provided callback with the detected mutation
     */
    static addObserver(watchElement, observeOptions, callback) {
        const observer = new MutationObserver(function (mutations) {
            callback(mutations);
        });
        observer.observe(watchElement, observeOptions);
    }
}

class BaseFieldsPage extends Page {

    static addPkmnLinksPopup() {
        const fielddiv = document.getElementById('field_field');
        if(!fielddiv) {
            /*
             * Ensure we're actually on a page with fields.
             * I'm not sure how, but I once saw the button show in forums.
             */
            return;
        }
        const body = document.getElementsByTagName('body')[0];
        const header = document.getElementsByTagName('h1')[0];
        const core = document.getElementById('core');
        const newBtn = document.createElement('button');
        header.appendChild(newBtn);
        newBtn.innerText = 'View links';
        newBtn.style= 'vertical-align:middle;margin-left: 10px;';
        newBtn.onclick = function(){

            let content = '<h3>Pokemon links</h3><table style="border-collapse:collapse;">';
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

            const dialog = document.createElement('div');
            const dialogDiv1 = document.createElement('div');
            const dialogDiv2 = document.createElement('div');
            const dialogDiv3 = document.createElement('div');
            const closeBtn = document.createElement('button');
            closeBtn.setAttribute('type','button');
            closeBtn.style = 'float:right;margin:8px;';
            closeBtn.innerText = 'Close';
            closeBtn.onclick = function() {
                dialog.remove();
                core.classList.remove('scrolllock');
            };
            dialog.classList.add('dialog');
            dialog.appendChild(dialogDiv1);
            dialogDiv1.appendChild(dialogDiv2);
            dialogDiv2.appendChild(dialogDiv3);
            dialogDiv3.innerHTML = content;
            dialogDiv3.appendChild(closeBtn);
            body.prepend(dialog);
            core.classList.add('scrolllock');
        };
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
        types = types.map(idx => Resources.TYPE_LIST.indexOf(types[idx]));
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
                nature = Resources.NATURE_LIST.indexOf(nature); // .substring(0, nature.length-1))
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

        const ret = {
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
            ret.forme = forme;
        }
        return ret;
    }
}

class DaycarePage extends Page {
    static init() {
        DaycarePage.setupHTML();
        DaycarePage.setupObservers();
    }

    static setupObservers() {
        Page.addObserver(document.querySelector('body'), {
            childList: true,
            subtree: true
        }, function(mutations) {
            mutations.forEach(function (mutation) {
                /*
                 * const fsPokemon = document.querySelector('#fs_pokemon');
                 * TODO: detect if this mutation is actually a field loading
                 */
                const fsPokemon = $('#fs_pokemon');
                if (fsPokemon.length > 0 &&
                    $.contains(fsPokemon[0], mutation.target)) {
                    DaycarePage.customSearch();
                }
            });
        });
    }

    static customSearch() {
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

                } // for
            }
        } // if
    } // customSearch
}

class DexPage extends Page {
    static init() {
        DexPage.setupHTML();
        DexPage.setupObservers();
        DexPage.setupHandlers();
    }

    static setupObservers() {
        Page.addObserver(document.querySelector('#regionslist'), {
            childList: true,
            subtree: true,
        }, function() {
            DexPage.applyTypeFilters();
        });
    }

    static setupHTML() {
        const elem = document.querySelector('.filter-type');
        const clone = elem.cloneNode(true);
        elem.parentNode.appendChild(clone);
        /*
         * can't remove filter-type class or else the filtering
         * won't look right
         */
        $(clone).addClass('filter-type-2');
    }

    static setupHandlers() {
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
                    DexPage.toggleSelectedTypes();
                    DexPage.applyTypeFilters();
                } else {
                    h = xLocation.data('type');
                    DexPage.toggleSelectedTypes(xLocation);
                    DexPage.applyTypeFilters();
                }
            } else {
                DexPage.toggleSelectedTypes();
                DexPage.applyTypeFilters();
            }
        });
    }

    static toggleSelectedTypes(b) {
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

    static applyTypeFilters() {
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

class FarmPage extends Page {
}

class FishingPage extends Page {
    static init() {
        FishingPage.setupHTML();
        FishingPage.setupHandlers();
    }
    static setupHTML() {
        const caughtFishLabel = document.querySelector('#caughtfishcontainer label');
        if(caughtFishLabel) {
            caughtFishLabel.insertAdjacentHTML('afterend', Resources.MASS_RELEASE_FISHING_HTML);
        }
    }
    static setupHandlers() {
        $('#selectallfishcheckbox').on('click', function () {
            $('li[data-flavour]>label>input').prop('checked', this.checked);
        });

        $('#movefishselectanycheckbox').on('click', function () {
            $('li[data-flavour=Any]>label>input').prop('checked', this.checked);
        });

        $('#movefishselectsourcheckbox').on('click', function () {
            $('li[data-flavour=Sour]>label>input').prop('checked', this.checked);
        });

        $('#movefishselectspicycheckbox').on('click', function () {
            $('li[data-flavour=Spicy]>label>input').prop('checked', this.checked);
        });

        $('#movefishselectdrycheckbox').on('click', function () {
            $('li[data-flavour=Dry]>label>input').prop('checked', this.checked);
        });

        $('#movefishselectsweetcheckbox').on('click', function () {
            $('li[data-flavour=Sweet]>label>input').prop('checked', this.checked);
        });

        $('#movefishselectbittercheckbox').on('click', function () {
            $('li[data-flavour=Bitter]>label>input').prop('checked', this.checked);
        });
    }
}

class InteractionsPage extends Page {
    static init() {
        InteractionsPage.setupHTML();
    }

    static setupHTML() {
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


class LabPage extends Page {
}

class MultiuserPage extends Page {
    static init() {
        MultiuserPage.setupHTMLCSS();
        MultiuserPage.setupObservers();
        MultiuserPage.setupHandlers();
    }

    static setupObservers() {
        // don't observe the whole party area as it may cause excess firing
        Page.addObserver(document.querySelector('#multiuser'), {
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
                MultiuserPage.partyModification();
            }
        });
    }

    static setupHTMLCSS() {
        document.querySelector('#multiuser').insertAdjacentHTML('beforebegin', Resources.PARTY_MOD_HTML);
        const menuBackground = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('background-color');
        $('#qolpartymod').css('background-color', '' + menuBackground + '');
        const menuColor = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('color');
        $('#qolpartymod').css('color', '' + menuColor + '');
    }

    static setupHandlers() {
        $(window).resize(function() {
            setTimeout(() => {
                // the hide all alignment works better with the timeout
                MultiuserPage.partyModification();
            }, 100);
        });
        // listener for the custom accordion (TODO: use existing accordion handlers if they exist?)
        $('#qolpartymodcustom h3 a').on('click', function() {
            if($('#qolpartymodcustom h3').hasClass('active')) {
                $('#qolpartymodcustom h3').removeClass('active');
                $('#qolpartymodcustom > div').css('display','none');
            }
            else {
                $('#qolpartymodcustom h3').addClass('active');
                $('#qolpartymodcustom > div').css('display','block');
            }
        });

    }

    // changes that all available mods make
    static sharedPartyMods() {
        $('#multiuser').addClass('qolPartyModded');
        // change any berry to sour so it gets a bg color
        $('.berrybuttons[data-up="any"]').attr('data-up','sour');
    }

    static partyModification() {
        // get page-specific settings
        const settings = UserDataHandle.getSettings().pageSettings['QoLMultiuser'];

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

        if (settings.hideDislike === true) {
            $('#multiuser').addClass('qolPartyHideDislike');
            MultiuserPage.sharedPartyMods();
        }

        if (settings.niceTable === true) {
            $('#multiuser').addClass('qolPartyNiceTable');
            MultiuserPage.sharedPartyMods();
        }

        if (settings.hideAll === true) {
            $('#multiuser').addClass('qolPartyHideAll');
            MultiuserPage.sharedPartyMods();
            const nextLink = $('.mu_navlink.next');
            // on chrome, sometimes .position() is undefined on load
            if(btns && nextLink && nextLink.position()) {
                btns.css(nextLink.position());
            }
        }

        if (settings.customParty === true) {
            $('#multiuser').addClass('qolPartyCustomParty');
            MultiuserPage.sharedPartyMods();
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
            MultiuserPage.partymodHelper('qolStackNext',settings.stackNextButton === true);
            MultiuserPage.partymodHelper('qolStackMore',settings.stackMoreButton === true);
            MultiuserPage.partymodHelper('qolHideParty',settings.showPokemon === false);
            MultiuserPage.partymodHelper('qolCompactParty',settings.compactPokemon === true);
            MultiuserPage.partymodHelper('qolHideTrainerCard',settings.showTrainerCard === false);
            MultiuserPage.partymodHelper('qolHideFieldButton',settings.showFieldButton === false);
            MultiuserPage.partymodHelper('qolHideModeChecks',settings.showModeChecks === false);
            MultiuserPage.partymodHelper('qolHideUserName',settings.showUserName === false);

            // clickable compact pokemon
            if(settings.showPokemon === true
                && settings.compactPokemon === true
                && settings.clickablePokemon === true )
            {
                $('.party .pkmn').each(function() {
                    const pkmnID = $(this.parentElement).attr('data-pid');
                    if(pkmnID) {
                        $(this).append('<a class="qolCompactLink" href="/summary/'+pkmnID+'"></a>');
                    }
                });
            }
        }
    }

    // toggle setting should be true to add the class, false to remove it
    static partymodHelper(toggleClass, toggleSetting) {
        if(toggleSetting) {
            $('#multiuser').addClass(toggleClass);
        }
        else {
            $('#multiuser').removeClass(toggleClass);
        }
    }
}


class PrivateFieldsPage extends BaseFieldsPage {
}

class PublicFieldsPage extends BaseFieldsPage {
}

class ShelterPage extends Page {
    static NEXT_MATCH_KEY = 78; // 'n'

    static init() {
        ShelterPage.setupHTMLCSS();
        ShelterPage.setupObservers();
        ShelterPage.setupHandlers();
    }

    static setupObservers() {
        Page.addObserver(document.querySelector('#shelterarea'), {
            childList: true
        }, function(mutations) {
            console.log('mutation observed');
            console.log(mutations);
            //ShelterPage.customSearch();
        });
    }

    static setupHTMLCSS() {
        const mainSettings = UserDataHandle.getSettings().mainSettings;
        if(mainSettings.shelterFeatureEnables.search) {
            $('.tabbed_interface.horizontal>div').removeClass('tab-active');
            $('.tabbed_interface.horizontal>ul>li').removeClass('tab-active');
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterbegin', '<li class="tab-active"><label>Search</label></li>');
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterend', Resources.shelterOptionsHTML());
            $('#shelteroptionsqol').addClass('tab-active');
            //ShelterPage.showSearchSettings();
        }
        if(mainSettings.shelterFeatureEnables.sort) {
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterbegin', '<li class=""><label>Sort</label></li>');
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterend', Resources.shelterSortHTML());
            ShelterPage.handleSortSettings();
        }
        if(mainSettings.shelterFeatureEnables.search || mainSettings.shelterFeatureEnables.sort) {
            const shelterSuccessCss = $('#sheltercommands').css('background-color');
            $('#sheltersuccess').css('background-color', shelterSuccessCss);
            $('.tooltiptext').css('background-color', $('.tooltip_content').eq(0).css('background-color'));
            const background = $('#shelterpage>.panel').eq(0).css('border');
            $('.tooltiptext').css('border', '' + background + '');
        }
    }

    static setupHandlers() {

        $('#qolQuickTextBtn').on('click',function() {
            console.log('add quick text');
        });
        $('#qolQuickTypeBtn').on('click',function() {
            console.log('add quick type');
        });

        // listen for next match hotkey
        $(window).on('keyup', function (e) {
            if (0 == $(e.target).closest('input, textarea').length) {
                if(e.keyCode == ShelterPage.NEXT_MATCH_KEY) {
                    console.log('TODO: next key pressed');
                }
            }
        });
    }

    static handleSortSettings() {
        const shelterSettings = UserDataHandle.getSettings().pageSettings['QoLShelter'];
        //sort in grid
        $('#shelterarea').removeClass('qolshelterareagrid');

        if (shelterSettings.shelterGrid === true) { //shelter grid
            $('#shelterarea').addClass('qolshelterareagrid');
        }

        // sprite size mode
        $('#shelterarea').removeClass('qolshelterarealarge');
        $('#shelterarea').removeClass('qolshelterareasmall');
        $('input[name="shelterSpriteSize"]').prop('checked',false);
        if(shelterSettings.shelterSpriteSize == 'large') {
            $('#shelterarea').addClass('qolshelterarealarge');
            $('#spriteSizeLarge').prop('checked',true);
        }
        else if(shelterSettings.shelterSpriteSize == 'small') {
            $('#shelterarea').addClass('qolshelterareasmall');
            $('#spriteSizeSmall').prop('checked',true);
        }
        else {
            $('#spriteSizeAuto').prop('checked',true);
        }
    }
}


class SummaryPage extends Page {
    static init() {
        SummaryPage.setupHTML();
    }

    static setupHTML() {
        const pkmnID = $('.party div')[0].getAttribute('data-pid');
        const displayAccordion = $('#displaycodelist').parent();
        const newHTML =
      "<p>Display an interactive panel in Pokefarm's forums!</p>"+
      '<p class="displaycode" style="user-select:all";>[pkmnpanel='+pkmnID+']</p>'+
      '<div style="border-bottom: 1px solid;margin-top: 1rem;"></div>';
        displayAccordion.prepend(newHTML);
    }
}


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
                    WishforgePage.setupHTML();
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
        const rows = {};
        for (const key in types) {
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
        for (const key in types) {
            table += rows[types[key]];
        }
        table += '</table>';

        // add table to page
        $('.badgelist').prepend(table);

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
        for (const key in types) {
            const type = types[key];
            const index = parseInt(key); // the type keys are strings "0" to "17"
            const li = $('.badgelist').children()[index];

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
        const children = $('.badgelist').children();
        for (let i = types.length; i >= 1; i--) {
            $(children[i]).remove();
        }
    }
}

class PagesManager {
    static PAGES = {
        'daycare': {
            class: DaycarePage,
            setting: 'enableDaycare'
        },
        'farm': {
            class: FarmPage,
            setting: 'easyEvolve'
        },
        'fishing': {
            class: FishingPage,
            setting: 'fishingEnable'
        },
        'lab': {
            class: LabPage,
            setting: 'labNotifier'
        },
        'users': {
            class: MultiuserPage,
            setting: 'partyMod'
        },
        'fields': {
            'base': {
                class: PrivateFieldsPage,
                setting: 'privateFieldEnable'
            },
            'alt': {
                class: PublicFieldsPage,
                setting: 'publicFieldEnable'
            }
        },
        'shelter': {
            class: ShelterPage,
            setting: 'shelterEnable'
        },
        'dex': {
            class: DexPage,
            setting: 'dexFilterEnable'
        },
        'forge': {
            class: WishforgePage,
            setting: 'condenseWishforge'
        },
        'interactions': {
            class: InteractionsPage,
            setting: 'interactionsEnable'
        },
        'summary': {
            class: SummaryPage,
            setting: 'summaryEnable'
        }
    };
    static instantiatePage() {
        const urlComponents = window.location.pathname.split('/');
        const pageName = urlComponents[1]; // this should generally never be null/undefined
        if(pageName in PagesManager.PAGES) {
            let page;
            if('class' in PagesManager.PAGES[pageName]) {
                page = PagesManager.PAGES[pageName];
            }
            // we're in a special case like fields, do more URL checking
            else if(urlComponents.length>2) {
                page = PagesManager.PAGES[pageName]['alt'];
            }
            else {
                page = PagesManager.PAGES[pageName]['base'];
            }
            // init the page object & return it
            const settings = UserDataHandle.getSettings();
            if(page && 'setting' in page && settings.mainSettings[page.setting] === true) {
                console.log('QoL features enabled for page: '+pageName);
                // if init exists and is a function, run it (all pages that extend base page should have this)
                if (typeof page.class['init'] == 'function') {
                    page.class['init']();
                }
                else {
                    ErrorHandler.error('Init function not found for page: '+pageName);
                }
            }
            else {
                console.log('QoL features disabled for page: '+pageName);
            }
        }
        else {
            console.log('Not a QoL page: '+pageName);
        }
    }
}

$(function () {
    ('use strict');
    // script entry point
    try {
        console.log('Loading QoL settings & core CSS');
        const settings = UserDataHandle.getSettings();
        UserDataHandle.getDex(); //pre-load dex
        Helpers.addGlobalStyle(Resources.CORE_CSS);
        Helpers.addGlobalStyle(Resources.MODAL_CSS);
        console.log('Adding QoL user CSS');
        if(settings && 'mainSettings' in settings && 'customCss' in settings.mainSettings) {
            Helpers.addGlobalStyle(settings.mainSettings.customCss);
        }
        else {
            ErrorHandler.warn("Could not add user's custom CSS");
        }
        console.log('Init QoL page');
        PagesManager.instantiatePage();
        console.log('Init QoL hub');
        new QoLHub();
        console.log('QoL Running');
    } catch(err) {
        ErrorHandler.fatalErrorHandler(err);
    }
});

