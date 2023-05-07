// ==UserScript==
// @name         Poké Farm QoL
// @namespace    https://github.com/tarashia/
// @author       Bentomon, ECEInTheHole, Tarashia (Mirzam)
// @homepageURL  https://github.com/tarashia/PokeFarmQoL
// @downloadURL  https://github.com/tarashia/PokeFarmQoL/raw/master/Poke-Farm-QoL.user.js
// @updateURL    https://github.com/tarashia/PokeFarmQoL/raw/master/Poke-Farm-QoL.user.js
// @description  Quality of Life changes to Pokéfarm!
// @version      1.7.8
// @match        https://pokefarm.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js
// ==/UserScript==

// Tell ESLint that jQuery's $ is defined elsewhere
/* global $ */
class Helpers {
    // Custom error handler to output in the QoL error console
    // Level should be info, warn, or error; default is info
    // Message is also written to the JavaScript console
    // err should be the full Error object - if provided and supported, the 
    //     stack trace for this error will be Base 64 encoded and included for the user
    static writeCustomError(message,level='info',err=undefined) {
        const logElement = document.getElementById('qolConsoleHolder');
        if(logElement) {
            logElement.innerHTML += '<li>' + Helpers.errorToString(message, level, err) +'</li>';
        }
        else {
            console.error('Could not add custom log to log element');
        }
    }
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
    /** TamperMonkey polyfill to replace GM_addStyle function */
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
            for(let key in arr) {
                str += `<option value="${key}">${arr[key]}</option> `;
            }
        }
        return str;
    }
    static toggleSetting(key, set, cls) {
        // provide default value for cls
        cls = cls || 'qolsetting';
        // update values for checkboxes
        if (typeof set === 'boolean') {
            const element = document.querySelector(`.${cls}[data-key="${key}"]`);
            if (element && element.type === 'checkbox') {
                element.checked = set;
            }
        }
    } // toggleSetting
    static setupFieldArrayHTML(arr, id, div, cls) {
        const n = arr.length;
        for (let i = 0; i < n; i++) {
            const rightDiv = i + 1;
            const rightValue = arr[i];
            $(`#${id}`).append(div);
            $(`.${cls}`).removeClass(cls).addClass('' + rightDiv + '').find('.qolsetting').val(rightValue);
        }
    }
    static textSearchDiv(cls, dataKey, id, arrayName) {
        return `<div class='${cls}'><label><input type="text" class="qolsetting" data-key="${dataKey}" ` +
            `array-name='${arrayName}'` +
            `/></label><input type='button' value='Remove' id='${id}'></div>`;
    }
    static selectSearchDiv(cls, name, dataKey, options, id, divParent, arrayName) {
        return `<div class='${cls}'> <select name='${name}' class="qolsetting" data-key='${dataKey}' ` +
            `array-name='${arrayName}'> ${options} </select> <input type='button' value='Remove' id='${id}'> </div>`;
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
        types = types.map(idx => Globals.TYPE_LIST.indexOf(types[idx]));
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
                nature = Globals.NATURE_LIST.indexOf(nature); // .substring(0, nature.length-1))
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
    } // parseFieldPokemonToolTip

    // returns true if the page is equal to or smaller to the given size class
    // mobile cutoff (point when header changes): "mq2"
    // ex: const isMobile = Helpers.detectPageSize('mq2');
    static detectPageSize(size) {
        return $('html').hasClass(size);
    }

    static addPkmnLinksPopup() {
      let fielddiv = document.getElementById('field_field');
      if(!fielddiv) {
        // Ensure we're actually on a page with fields.
        // I'm not sure how, but I once saw the button show in forums.
        return;
      }
      let body = document.getElementsByTagName('body')[0];
      let header = document.getElementsByTagName('h1')[0];
      let core = document.getElementById('core');
      let newBtn = document.createElement('button');
      header.appendChild(newBtn);
      newBtn.innerText = 'View links';
      newBtn.style= 'vertical-align:middle;margin-left: 10px;';
      newBtn.onclick = function(){
  
          let content = '<h3>Pokemon links</h3><table style="border-collapse:collapse;">';
          let fieldmon = document.getElementsByClassName('fieldmon');
          for(let i=0; i<fieldmon.length; i++){
          if(i%4==0) {
              content += '<tr>';
          }
          let pkmnID = fieldmon[i].getAttribute('data-id');
          let small = fieldmon[i].children[1];
          let imgSRC = small.getAttribute('src');
          let pkmnName = small.getAttribute('alt');
          content += '<td style="padding:5px;border:1px solid;">' +
                     '<img style="vertical-align:middle;" src="'+imgSRC+'"> ' +
                     '<a href="/summary/'+pkmnID+'">'+pkmnName+'</a></td>';
          if(i%4==3) {
              content += '</tr>';
          }
          }
          content += '</table>';
  
          let dialog = document.createElement('div');
          let dialogDiv1 = document.createElement('div');
          let dialogDiv2 = document.createElement('div');
          let dialogDiv3 = document.createElement('div');
          let closeBtn = document.createElement('button');
          closeBtn.setAttribute('type','button');
          closeBtn.style = 'float:right;margin:8px;';
          closeBtn.innerText = 'Close';
          closeBtn.onclick = function() {
          dialog.remove();
          core.classList.remove('scrolllock');
          }
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
}

class Globals {
    // if you add a new page settings key, be sure to add it to the reset menu in qol-hub.html
    static SETTINGS_SAVE_KEY = 'QoLSettings';
    static LAB_PAGE_SETTINGS_KEY = 'QoLLab';
    static MULTIUSER_PAGE_SETTINGS_KEY = 'QoLMultiuser';
    static PRIVATE_FIELDS_PAGE_SETTINGS_KEY = 'QoLPrivateFields';
    static PUBLIC_FIELDS_PAGE_SETTINGS_KEY = 'QoLPublicFields';
    static SHELTER_PAGE_SETTINGS_KEY = 'QoLShelter';
    static POKEDEX_DATA_KEY = 'QoLPokedex';

    // JSON objects loaded from resource files
    static BODY_STYLE_LIST = {"1":"Short Blob","2":"Snake","3":"Fish","4":"Two Arms","5":"Tall Blob","6":"Dino","7":"Two Legs","8":"Four Legs","9":"Bird","10":"Jelly","11":"Multi","12":"Human","13":"Flying Bug","14":"Crawling Bug"};
    static COLOUR_LIST = {"0":"Black","1":"Blue","2":"Brown","3":"Green","4":"Grey","5":"Pink","6":"Purple","7":"Red","8":"White","9":"Yellow"};
    static EGG_GROUP_LIST = {"0":"Undiscovered","1":"Monster","2":"Dragon","3":"Field","4":"Bug","5":"Grass","6":"Water 1","7":"Water 2","8":"Water 3","9":"Amorphous","10":"Fairy","11":"Human-Like","12":"Mineral","13":"Flying","15":"Ditto"};
    static NATURE_LIST = ["Lonely","Mild","Hasty","Gentle","Bold","Modest","Timid","Calm","Impish","Adamant","Jolly","Careful","Relaxed","Brave","Quiet","Sassy","Lax","Naughty","Rash","Naïve","Hardy","Docile","Serious","Bashful","Quirky"];
    static REGION_LIST = {"1":"Kanto","2":"Johto","3":"Hoenn","4":"Sinnoh","5":"Unova","6":"Kalos","7":"Alola","8":"Galar","9":"Paldea","97":"PokéFarm Q (Exclusives)","98":"PokéFarm Q (Megas)","99":"PokéFarm Q (Variants)"};
    static TYPE_LIST = {"0":"Normal","1":"Fire","2":"Water","3":"Electric","4":"Grass","5":"Ice","6":"Fighting","7":"Poison","8":"Ground","9":"Flying","10":"Psychic","11":"Bug","12":"Rock","13":"Ghost","14":"Dragon","15":"Dark","16":"Steel","17":"Fairy"};
    static STATIC_DEX_DATA = [{"region":"2","dexID":"167","species":"Chikorita","forme":"","type1":"4","type2":null,"eggGroup1":"5","eggGroup2":"1","legendary":false,"colour":"3","bodyStyle":"8","imgCodes":["c/z/0","1/f/z"]},{"region":"2","dexID":"168","species":"Bayleef","forme":"","type1":"4","type2":null,"eggGroup1":"5","eggGroup2":"1","legendary":false,"colour":"3","bodyStyle":"8","imgCodes":["6/i/2"]},{"region":"2","dexID":"169","species":"Meganium","forme":"","type1":"4","type2":null,"eggGroup1":"5","eggGroup2":"1","legendary":false,"colour":"3","bodyStyle":"8","imgCodes":["a/c/r","1/a/v"]},{"region":"2","dexID":"170","species":"Cyndaquil","forme":"","type1":"1","type2":null,"eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"7","imgCodes":["4/2/a","l/4/p"]},{"region":"2","dexID":"171","species":"Quilava","forme":"","type1":"1","type2":null,"eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"8","imgCodes":["9/j/v"]},{"region":"2","dexID":"172","species":"Typhlosion","forme":"","type1":"1","type2":null,"eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"8","imgCodes":["k/c/o"]},{"region":"2","dexID":"172","species":"Typhlosion","forme":"Hisuian Forme","type1":"1","type2":"13","eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"8","imgCodes":["2/j/d/9"]},{"region":"2","dexID":"173","species":"Totodile","forme":"","type1":"2","type2":null,"eggGroup1":"6","eggGroup2":"1","legendary":false,"colour":"1","bodyStyle":"6","imgCodes":["4/3/r","7/y/f"]},{"region":"2","dexID":"174","species":"Croconaw","forme":"","type1":"2","type2":null,"eggGroup1":"6","eggGroup2":"1","legendary":false,"colour":"1","bodyStyle":"6","imgCodes":["1/n/6"]},{"region":"2","dexID":"175","species":"Feraligator","forme":"","type1":"2","type2":null,"eggGroup1":"6","eggGroup2":"1","legendary":false,"colour":"1","bodyStyle":"6","imgCodes":["d/5/3"]},{"region":"1","dexID":"001","species":"Bulbasaur","forme":"","type1":"4","type2":"7","eggGroup1":"5","eggGroup2":"1","legendary":false,"colour":"3","bodyStyle":"8","imgCodes":["c/0/7","1/g/g"]},{"region":"1","dexID":"002","species":"Ivysaur","forme":"","type1":"4","type2":"7","eggGroup1":"5","eggGroup2":"1","legendary":false,"colour":"3","bodyStyle":"8","imgCodes":["9/6/r"]},{"region":"1","dexID":"003","species":"Venusaur","forme":"","type1":"4","type2":"7","eggGroup1":"5","eggGroup2":"1","legendary":false,"colour":"3","bodyStyle":"8","imgCodes":["c/1/5","2/u/a"]},{"region":"1","dexID":"003-M","species":"Venusaur","forme":"Mega Forme","type1":"4","type2":"7","eggGroup1":"5","eggGroup2":"1","legendary":false,"colour":"3","bodyStyle":"8","imgCodes":["7/5/z"]},{"region":"1","dexID":"004","species":"Charmander","forme":"","type1":"1","type2":null,"eggGroup1":"2","eggGroup2":"1","legendary":false,"colour":"7","bodyStyle":"6","imgCodes":["f/d/w","5/l/t"]},{"region":"1","dexID":"005","species":"Charmeleon","forme":"","type1":"1","type2":null,"eggGroup1":"2","eggGroup2":"1","legendary":false,"colour":"7","bodyStyle":"6","imgCodes":["o/i/v"]},{"region":"1","dexID":"006","species":"Charizard","forme":"","type1":"1","type2":"9","eggGroup1":"2","eggGroup2":"1","legendary":false,"colour":"7","bodyStyle":"6","imgCodes":["j/j/t"]},{"region":"1","dexID":"006-X","species":"Charizard","forme":"Mega Forme X","type1":"1","type2":"14","eggGroup1":"2","eggGroup2":"1","legendary":false,"colour":"0","bodyStyle":"6","imgCodes":["g/i/k"]},{"region":"1","dexID":"006-Y","species":"Charizard","forme":"Mega Forme Y","type1":"1","type2":"9","eggGroup1":"2","eggGroup2":"1","legendary":false,"colour":"7","bodyStyle":"6","imgCodes":["l/a"]},{"region":"1","dexID":"007","species":"Squirtle","forme":"","type1":"2","type2":null,"eggGroup1":"6","eggGroup2":"1","legendary":false,"colour":"1","bodyStyle":"6","imgCodes":["l/w/s","h/h/e"]},{"region":"1","dexID":"008","species":"Wartortle","forme":"","type1":"2","type2":null,"eggGroup1":"6","eggGroup2":"1","legendary":false,"colour":"1","bodyStyle":"6","imgCodes":["j/n"]},{"region":"1","dexID":"009","species":"Blastoise","forme":"","type1":"2","type2":null,"eggGroup1":"6","eggGroup2":"1","legendary":false,"colour":"1","bodyStyle":"6","imgCodes":["2/4/p"]},{"region":"1","dexID":"009-M","species":"Blastoise","forme":"Mega Forme","type1":"2","type2":null,"eggGroup1":"6","eggGroup2":"1","legendary":false,"colour":"1","bodyStyle":"6","imgCodes":["9/b/z/l"]},{"region":"1","dexID":"010","species":"Caterpie","forme":"","type1":"11","type2":null,"eggGroup1":"4","eggGroup2":null,"legendary":false,"colour":"3","bodyStyle":"14","imgCodes":["j/n/z","8/i/9"]},{"region":"1","dexID":"011","species":"Metapod","forme":"","type1":"11","type2":null,"eggGroup1":"4","eggGroup2":null,"legendary":false,"colour":"3","bodyStyle":"2","imgCodes":["o/o/m"]},{"region":"1","dexID":"012","species":"Butterfree","forme":"","type1":"11","type2":"9","eggGroup1":"4","eggGroup2":null,"legendary":false,"colour":"8","bodyStyle":"13","imgCodes":["e/k/d","5/2/p"]},{"region":"1","dexID":"013","species":"Weedle","forme":"","type1":"11","type2":"7","eggGroup1":"4","eggGroup2":null,"legendary":false,"colour":"2","bodyStyle":"14","imgCodes":["9/6/y"]},{"region":"1","dexID":"014","species":"Kakuna","forme":"","type1":"11","type2":"7","eggGroup1":"4","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"2","imgCodes":["f/1/q"]},{"region":"1","dexID":"015","species":"Beedrill","forme":"","type1":"11","type2":"7","eggGroup1":"4","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"13","imgCodes":["f/c/4"]},{"region":"1","dexID":"015-M","species":"Beedrill","forme":"Mega Forme","type1":"11","type2":"7","eggGroup1":"4","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"13","imgCodes":["d/1/6/d"]},{"region":"1","dexID":"016","species":"Pidgey","forme":"","type1":"0","type2":"9","eggGroup1":"13","eggGroup2":null,"legendary":false,"colour":"2","bodyStyle":"9","imgCodes":["b/y"]},{"region":"1","dexID":"017","species":"Pidgeotto","forme":"","type1":"0","type2":"9","eggGroup1":"13","eggGroup2":null,"legendary":false,"colour":"2","bodyStyle":"9","imgCodes":["c/c/o"]},{"region":"1","dexID":"018","species":"Pidgeot","forme":"","type1":"0","type2":"9","eggGroup1":"13","eggGroup2":null,"legendary":false,"colour":"2","bodyStyle":"9","imgCodes":["c/9/9"]},{"region":"1","dexID":"018-M","species":"Pidgeot","forme":"Mega Forme","type1":"0","type2":"9","eggGroup1":"13","eggGroup2":null,"legendary":false,"colour":"2","bodyStyle":"9","imgCodes":["m/r/4"]},{"region":"1","dexID":"019","species":"Rattata","forme":"","type1":"0","type2":null,"eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"6","bodyStyle":"8","imgCodes":["i/b/h/e"]},{"region":"1","dexID":"019r7","species":"Rattata","forme":"Alolan Forme","type1":"15","type2":"0","eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"0","bodyStyle":"8","imgCodes":["5/j/w","l/y/p","o/1/x"]},{"region":"1","dexID":"020","species":"Raticate","forme":"","type1":"0","type2":null,"eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"2","bodyStyle":"8","imgCodes":["s/y/w/b","3/6/m/d"]},{"region":"1","dexID":"020r7","species":"Raticate","forme":"Alolan Forme","type1":"15","type2":"0","eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"0","bodyStyle":"8","imgCodes":["3/j/v","c/p/z"]},{"region":"1","dexID":"020t7","species":"Raticate","forme":"Alolan Totem Forme","type1":"15","type2":"0","eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"0","bodyStyle":"8","imgCodes":["o/e/g/u"]},{"region":"1","dexID":"021","species":"Spearow","forme":"","type1":"0","type2":"9","eggGroup1":"13","eggGroup2":null,"legendary":false,"colour":"2","bodyStyle":"9","imgCodes":["3/4/y/0"]},{"region":"1","dexID":"022","species":"Fearow","forme":"","type1":"0","type2":"9","eggGroup1":"13","eggGroup2":null,"legendary":false,"colour":"2","bodyStyle":"9","imgCodes":["i/m/r","k/5"]},{"region":"1","dexID":"023","species":"Ekans","forme":"","type1":"7","type2":null,"eggGroup1":"3","eggGroup2":"2","legendary":false,"colour":"6","bodyStyle":"2","imgCodes":["6/v/6","d/b/d"]},{"region":"1","dexID":"024","species":"Arbok","forme":"","type1":"7","type2":null,"eggGroup1":"3","eggGroup2":"2","legendary":false,"colour":"6","bodyStyle":"2","imgCodes":["4/p/w"]},{"region":"1","dexID":"025","species":"Pichu","forme":"","type1":"3","type2":null,"eggGroup1":"0","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"8","imgCodes":["g/s/8","g/j/m"]},{"region":"1","dexID":"026","species":"Pikachu","forme":"","type1":"3","type2":null,"eggGroup1":"10","eggGroup2":"3","legendary":false,"colour":"9","bodyStyle":"8","imgCodes":["e/a/r","2/v/f"]},{"region":"1","dexID":"027","species":"Raichu","forme":"","type1":"3","type2":null,"eggGroup1":"10","eggGroup2":"3","legendary":false,"colour":"9","bodyStyle":"6","imgCodes":["2/d/p","3/z/5"]},{"region":"1","dexID":"027r7","species":"Raichu","forme":"Alolan Forme","type1":"3","type2":"10","eggGroup1":"10","eggGroup2":"3","legendary":false,"colour":"2","bodyStyle":"6","imgCodes":["e/k/u/7"]},{"region":"1","dexID":"028","species":"Sandshrew","forme":"","type1":"8","type2":null,"eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"6","imgCodes":["1/i/1","o/u/0"]},{"region":"1","dexID":"028r7","species":"Sandshrew","forme":"Alolan Forme","type1":"5","type2":"16","eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"8","bodyStyle":"6","imgCodes":["r/2/t/g","4/v/a/h"]},{"region":"1","dexID":"029","species":"Sandslash","forme":"","type1":"8","type2":null,"eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"6","imgCodes":["5/n/0"]},{"region":"1","dexID":"029t","species":"Sandslash","forme":"Totem Forme Q","type1":"8","type2":null,"eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"9","bodyStyle":"6","imgCodes":["b/8/r"]},{"region":"1","dexID":"029r7","species":"Sandslash","forme":"Alolan Forme","type1":"5","type2":"16","eggGroup1":"3","eggGroup2":null,"legendary":false,"colour":"1","bodyStyle":"6","imgCodes":["h/z/z/a"]}];
    static SHELTER_SEARCH_KEYS = {"findNewEgg":{"searchKey":"Egg","display":"new egg","icon":"<img src='//pfq-static.com/img/pkmn/egg.png'>"},"findNewPokemon":{"searchKey":"Pokémon","display":"new Pokémon","icon":"<img src='//pfq-static.com/img/pkmn/pkmn.png'>"},"findShiny":{"searchKey":"SHINY","display":"Shiny","icon":"<img src='//pfq-static.com/img/pkmn/shiny.png'>"},"findAlbino":{"searchKey":"ALBINO","display":"Albino","icon":"<img src='//pfq-static.com/img/pkmn/albino.png'>"},"findMelanistic":{"searchKey":"MELANISTIC","display":"Melanistic","icon":"<img src='//pfq-static.com/img/pkmn/melanistic.png'>"},"findPrehistoric":{"searchKey":"PREHISTORIC","display":"Prehistoric","icon":"<img src='//pfq-static.com/img/pkmn/prehistoric.png'>"},"findDelta":{"searchKey":"DELTA","display":"Delta","icon":"<img src='//pfq-static.com/img/pkmn/_delta/dark.png'>"},"findMega":{"searchKey":"MEGA","display":"Mega","icon":"<img src='//pfq-static.com/img/pkmn/mega.png'>"},"findStarter":{"searchKey":"STARTER","display":"Starter","icon":"<img src='//pfq-static.com/img/pkmn/starter.png'>"},"findCustomSprite":{"searchKey":"CUSTOM SPRITE","display":"Custom Sprite","icon":"<img src='//pfq-static.com/img/pkmn/cs.png'>"},"findMale":{"searchKey":"[M]","display":"Male","icon":"<img src='//pfq-static.com/img/pkmn/gender_m.png'>"},"findFemale":{"searchKey":"[F]","display":"Female","icon":"<img src='//pfq-static.com/img/pkmn/gender_f.png'>"},"findNoGender":{"searchKey":"[N]","display":"Genderless","icon":"<img src='//pfq-static.com/img/pkmn/gender_n.png'>"},"findLegendary":{"searchKey":"","display":"Legendary","icon":"<img src='//pfq-static.com/img/pkmn/pkmn.png'>"}};
}

class LocalStorageManager {
    // Look for settings that contain QoL and return them as an array of keys
    // Uses the same basic code as the migrateSettings function
    static getAllQoLSettings(includeDex=false) {
        const qolSettings = {};
        for (let i = 0, len = localStorage.length; i < len; ++i) {
            const key = localStorage.key(i);
            // the dex is the largest data element by far; allow excluding it
            if(key && key.match(/QoL/) && (includeDex || !key.match(/QoLPokedex/))) {
                qolSettings[key] = localStorage.getItem(key);
            }
        }
        return qolSettings;
    }
    // delete ALL QoL keys in storage
    static clearAllQoLKeys() {
        for (let i = 0, len = localStorage.length; i < len; ++i) {
            const key = localStorage.key(i);
            if(key && key.match(/QoL/)) {
                localStorage.removeItem(key);
            }
        }
    }
    /**
     * This function helps users use the updated script without having to
     * clear their settings by looking for items in local storage that
     * start with 'QoL...' and moving the settings to the correct
     * translated local storage key
     */
    static migrateSettings() {
        const newItems = {};
        const newKeys = [];
        const keysToRemove = [];
        // find the items that need to be replaced
        for (let i = 0, len = localStorage.length; i < len; ++i) {
            let match = localStorage.key(i).match(/^QoL/);
            if(!match) {
                // the user ID feature was just returning undefined - convert these too
                match = localStorage.key(i).match(/^undefined\.QoL/);
            }
            if(match) {
                const oldKey = match.input;
                const newKey = LocalStorageManager.translateKey(oldKey);
                newItems[newKey] = localStorage.getItem(oldKey);
                keysToRemove.push(oldKey);
            }
            match = localStorage.key(i).match(/^undefined\.undefined\.QoL/);
            if(match) {
                keysToRemove.push(match.input);
            }
        }
        // remove the old style keys
        for(let j = 0; j < keysToRemove.length; j++) {
            localStorage.removeItem(keysToRemove[j]);
        }
        // add the new style keys
        for(const newKey in newItems) {
            localStorage.setItem(newKey, newItems[newKey]);
            newKeys.push(newKey);
        }
        if(keysToRemove.length>0 || newKeys.length>0) {
            console.log('Migrated keys (old, new):');
            console.log(keysToRemove);
            console.log(newKeys);
        }
    }
    static translateKey(key) {
        let pos = key.indexOf('QoL');
        if(pos<0) {
            throw 'Bad key format';
        }
        key = key.substring(pos);
        let userID = $('#core').attr('data-user');
        if(!userID) {
            userID = 'unknown';
        }
        return userID+'.'+key;
    }
    static saveSettings(key, obj) {
        if (key == null){ return; }
        localStorage.setItem(LocalStorageManager.translateKey(key), JSON.stringify(obj));
    }
    static loadSettings(KEY, DEFAULT, obj) {
        if (KEY == null){ return; }
        KEY = LocalStorageManager.translateKey(KEY);
        if (localStorage.getItem(KEY) === null) {
            this.saveSettings(KEY);
        } else {
            try {
                const countScriptSettings = Object.keys(obj).length;
                const localStorageString = JSON.parse(localStorage.getItem(KEY));
                const countLocalStorageSettings = Object.keys(localStorageString).length;
                if (countLocalStorageSettings < countScriptSettings) { // adds new objects (settings) to the local storage
                    const defaultsSetting = DEFAULT;
                    const userSetting = JSON.parse(localStorage.getItem(KEY));
                    const newSetting = $.extend(true, {}, defaultsSetting, userSetting);

                    obj = newSetting;
                    this.saveSettings(KEY, obj);
                }
                if (countLocalStorageSettings > countScriptSettings) {
                    this.saveSettings(KEY, obj);
                }
            }
            catch (err) {
                this.saveSettings(KEY, obj);
            }
            if (localStorage.getItem(KEY) != JSON.stringify(obj)) {
                obj = JSON.parse(localStorage.getItem(KEY));
            }
        }

        return obj;
    }
    static getItem(key) {
        return localStorage.getItem(LocalStorageManager.translateKey(key));
    }
    static setItem(key, value) {
        localStorage.setItem(LocalStorageManager.translateKey(key), value);
    }
    static removeItem(key) {
        localStorage.removeItem(LocalStorageManager.translateKey(key));
    }

    static getDexFromStorage() {
        const key = LocalStorageManager.translateKey(Globals.POKEDEX_DATA_KEY);
        if(localStorage.getItem(key) === null) {
            return false;
        }
        if(Object.keys(JSON.parse(localStorage.getItem(key))).length === 0) {
            return false;
        }

        const dateAndDex = JSON.parse(localStorage.getItem(key));
        // if QoLPokedex only contains date
        if((dateAndDex.length === 1) ||
           // or if the dex part of the array is empty
           (dateAndDex[1] === undefined) ||
            (dateAndDex[1] === null)) {
            return false;
        }
        return dateAndDex;
    }

    static updateLocalStorageDex(DEX_DATA, dateString) {
        const datePlusDex = [dateString, DEX_DATA];
        localStorage.setItem(LocalStorageManager.translateKey(Globals.POKEDEX_DATA_KEY), JSON.stringify(datePlusDex));
    }
}


/**
 * This class is used to store CSS and HTML snippets that were previously loaded via Tampermonkey's '@resource' tool
 */
class Resources {
    static css() {
        return `#announcements li[data-name=QoL]{cursor:pointer}#labsuccess{text-align:center}#labfound{padding-top:20px}.boldp{font-weight:700}.collapsible{border-radius:6px;cursor:pointer;max-width:600px;padding:4px;position:relative;text-align:left;width:100%}.collapsible_content{display:none;overflow:hidden;padding:0 18px}.oneevolutionleft{background-color:#f36971;border-radius:100%;box-shadow:0 0 25px 15px #f36971}.twoevolutionleft{background-color:#6a6df2;border-radius:100%;box-shadow:0 0 25px 15px #6a6df2} `+
               `.qoltooltip_trigger{border-bottom:1px dotted #000;display:inline-block;position:relative}.tooltip .tooltiptext{border-radius:6px;bottom:125%;left:50%;margin-left:0;opacity:0;padding:5px 0;position:absolute;text-align:center;transition:opacity .3s;visibility:hidden;width:500px;z-index:1}.tooltip .tooltiptext:after{border-style:solid;border-width:5px;content:"";left:50%;margin-left:-5px;position:absolute;top:100%}.tooltip:hover .tooltiptext{opacity:1;visibility:visible}.customsearchtooltip{width:400px}#sheltersuccess{text-align:center}#shelterfound{padding-top:20px}.daycarefoundme,.labfoundme,.privatefoundme,.publicfoundme,.shelterfoundme{background-color:#d5e265;border-radius:100%;box-shadow:0 0 25px 15px #d5e265}.qolshelterareagrid{display:flex!important;display:grid!important;flex-direction:row;flex-flow:row wrap;grid-template-columns:repeat(6,1fr);grid-template-rows:repeat(5,70px);min-height:350px}.qolshelterareagridmq2:not(.qolshelterarealarge){grid-template-rows:repeat(5,35px);min-height:175px}.qoltooltipgrid{bottom:0;position:absolute!important;transform:translateY(100%)}.qolpokemongrid{align-items:center;display:inline-block!important;display:inline-flex!important;flex:1 1 16%;justify-content:center;position:static!important}.qolpokemongrid img{max-height:100%;max-width:100%}.qolshelterarealarge .pokemon .big{display:block!important}.qolshelterarealarge .pokemon .small,.qolshelterareasmall .pokemon .big{display:none!important}.qolshelterareasmall .pokemon .small{display:block!important} `+
               `#fieldorder{border-radius:4px;padding:4px}#fieldorder,#fieldsearch{margin:16px auto;max-width:600px;position:relative}.qolSortBerry{margin:-10px!important;top:45%!important;transition:none!important}.qolSortBerry>img.big{animation:none!important;padding:25px!important}.qolSortBerry.qolAnyBerry,.qolSortBerry.qolSourBerry{left:0!important}.qolSortBerry.qolSpicyBerry{left:20%!important}.qolSortBerry.qolDryBerry{left:40%!important}.qolSortBerry.qolSweetBerry{left:60%!important}.qolSortBerry.qolBitterBerry{left:80%!important}.mq2 .qolSortBerry{margin:-10px 2%!important;overflow:hidden;top:45%!important;transition:none!important;width:16%}.mq2 .qolSortBerry>img.small{animation:none!important;margin-left:-13px!important;padding:50%!important}.qolSortMiddle{left:40%!important;margin:-10px!important;top:35%!important;transition:none!important}.qolSortMiddle>img{animation:none!important;padding:40px!important}.qolGridField{display:flex!important;display:grid;flex-flow:row wrap;grid-template-columns:repeat(8,12.5%);grid-template-rows:repeat(5,69px);min-height:345px;padding-top:0!important}.mq25 .qolGridField{grid-template-rows:repeat(5,36px);min-height:180px}.qolGridPokeSize{align-items:center;display:inline-flex;flex:1 1 12.5%;justify-content:center;margin:0!important;position:static!important}.qolGridPokeImg{animation:none!important;max-height:70px;max-width:75px}.qolSelectFlavour{display:none}.qolFlavourShown~.qolSelectFlavour{display:inline}.qolFlavourShown~.qolSelectGender,.qolNatureShown~.qolSelectGender{display:none} `+
               `.qolHubSuperHead:first-child{border-top-left-radius:5px;border-top-right-radius:5px}.qolHubHead{margin:0;padding:4px;text-align:center}.qolAllSettings{vertical-align:top}.qolAllSettings,.qolChangeLog{border-top:none;height:100%;width:315px}.qolAllSettings>ul{list-style-type:none;padding:0;vertical-align:top}.qolHubTable{border-collapse:collapse;border-spacing:0;width:100%}.qolChangeLogList{margin:0;padding:4px;text-align:left;text-align:center}.qolChangeLogContent{display:none;list-style-type:disc}.expandlist{font-size:16px;list-style-type:none;text-align:center}.slidermenu{cursor:pointer}.qolChangeLogHead{margin:0}.closeHub{cursor:pointer;font-size:20px;margin:0 10px 0 0;text-align:right}.textareahub textarea{box-sizing:border-box;width:100%}#qolStorageOutput{border:1px solid;max-height:100px;overflow-y:auto;padding:3px;user-select:all;word-break:break-all} `+
               `#qolpartymod{text-align:center}#qolpartymodcustom h3{font-size:100%;padding:2px}.qolPartyCustomParty{--multiuser-button-height:5em;--multiuser-border-radius:8px}.qolPartyCustomParty h1{align-items:center;display:flex;justify-content:center}.qolPartyCustomParty #partybox{padding-top:calc(var(--multiuser-button-height) + 1em);position:relative}.qolPartyCustomParty #partybox .party{box-shadow:none}.qolPartyCustomParty #partybox .party>div{position:static}.qolPartyCustomParty #partybox .action{height:auto!important;left:0;min-height:0;position:absolute;top:0;width:100%;z-index:9999}.qolPartyCustomParty #partybox .action>a,.qolPartyCustomParty #partybox .action>div{line-height:var(--multiuser-button-height);margin:0;min-height:var(--multiuser-button-height);padding:0}.qolPartyCustomParty #partybox .action .berrybuttons>a{box-sizing:border-box;height:100%!important;line-height:var(--multiuser-button-height)!important;width:100%}.qolPartyCustomParty #partybox .action>a{align-items:center;box-sizing:border-box;display:flex!important;justify-content:center}.qolPartyCustomParty #partybox .action.working,.qolPartyCustomParty #partybox .action:empty,.qolPartyCustomParty #partybox .action>table,.qolPartyCustomParty #partybox .berrybuttons>.tooltip_content{display:none}.qolPartyCustomParty #partybox .party>div:hover>.action a[data-berry]:after{border-color:transparent}.qolPartyCustomParty.qolStackMore .qolGetMore,.qolPartyCustomParty.qolStackNext .qolGoNext{height:var(--multiuser-button-height);left:0;line-height:var(--multiuser-button-height);margin:0;padding:0;position:absolute;top:0;width:100%;z-index:999}.qolPartyCustomParty.qolHideParty .party{height:0;overflow:hidden}.qolPartyCustomParty.qolCompactParty #partybox .party>div{background:transparent;border:none;margin-bottom:20px;padding:0;width:unset}.qolPartyCustomParty.qolCompactParty #partybox .party .expbar,.qolPartyCustomParty.qolCompactParty #partybox .party .name{display:none}.qolPartyCustomParty.qolCompactParty #partybox .party .pkmn a.qolCompactLink{display:block;height:100%;left:0;position:absolute;top:0;width:100%;z-index:999}.qolPartyCustomParty.qolHideFieldButton .fieldslink,.qolPartyCustomParty.qolHideModeChecks #partybox>label,.qolPartyCustomParty.qolHideTrainerCard #profilebox,.qolPartyCustomParty.qolHideUserName h1{display:none}.mq2 .qolPartyCustomParty #partybox .party>div,.multi-compact .qolPartyCustomParty #partybox .party>div{display:inline-block}.mq2 .qolPartyCustomParty #partybox .party>div .pkmn,.multi-compact .qolPartyCustomParty #partybox .party>div .pkmn{margin-right:0}.qolPartyCustomParty #partybox .party .action a,.qolPartyHideAll #partybox .party .action a,.qolPartyHideDislike #partybox .party .action a,.qolPartyNiceTable #partybox .party .action a{display:none;position:absolute;width:100%}.qolPartyCustomParty #partybox .party .action .berrybuttons[data-up=any] a[data-berry=aspear],.qolPartyCustomParty #partybox .party .action .berrybuttons[data-up=bitter]>a[data-berry=rawst],.qolPartyCustomParty #partybox .party .action .berrybuttons[data-up=dry]>a[data-berry=chesto],.qolPartyCustomParty #partybox .party .action .berrybuttons[data-up=sour]>a[data-berry=aspear],.qolPartyCustomParty #partybox .party .action .berrybuttons[data-up=spicy]>a[data-berry=cheri],.qolPartyCustomParty #partybox .party .action .berrybuttons[data-up=sweet]>a[data-berry=pecha],.qolPartyCustomParty #partybox .party .action>a,.qolPartyHideAll #partybox .party .action .berrybuttons[data-up=any] a[data-berry=aspear],.qolPartyHideAll #partybox .party .action .berrybuttons[data-up=bitter]>a[data-berry=rawst],.qolPartyHideAll #partybox .party .action .berrybuttons[data-up=dry]>a[data-berry=chesto],.qolPartyHideAll #partybox .party .action .berrybuttons[data-up=sour]>a[data-berry=aspear],.qolPartyHideAll #partybox .party .action .berrybuttons[data-up=spicy]>a[data-berry=cheri],.qolPartyHideAll #partybox .party .action .berrybuttons[data-up=sweet]>a[data-berry=pecha],.qolPartyHideAll #partybox .party .action>a,.qolPartyHideDislike #partybox .party .action .berrybuttons[data-up=any] a[data-berry=aspear],.qolPartyHideDislike #partybox .party .action .berrybuttons[data-up=bitter]>a[data-berry=rawst],.qolPartyHideDislike #partybox .party .action .berrybuttons[data-up=dry]>a[data-berry=chesto],.qolPartyHideDislike #partybox .party .action .berrybuttons[data-up=sour]>a[data-berry=aspear],.qolPartyHideDislike #partybox .party .action .berrybuttons[data-up=spicy]>a[data-berry=cheri],.qolPartyHideDislike #partybox .party .action .berrybuttons[data-up=sweet]>a[data-berry=pecha],.qolPartyHideDislike #partybox .party .action>a,.qolPartyNiceTable #partybox .party .action .berrybuttons[data-up=any] a[data-berry=aspear],.qolPartyNiceTable #partybox .party .action .berrybuttons[data-up=bitter]>a[data-berry=rawst],.qolPartyNiceTable #partybox .party .action .berrybuttons[data-up=dry]>a[data-berry=chesto],.qolPartyNiceTable #partybox .party .action .berrybuttons[data-up=sour]>a[data-berry=aspear],.qolPartyNiceTable #partybox .party .action .berrybuttons[data-up=spicy]>a[data-berry=cheri],.qolPartyNiceTable #partybox .party .action .berrybuttons[data-up=sweet]>a[data-berry=pecha],.qolPartyNiceTable #partybox .party .action>a{display:inline-block}.qolPartyCustomParty #partybox .party .working .berrybuttons,.qolPartyHideAll #partybox .party .working .berrybuttons,.qolPartyHideDislike #partybox .party .working .berrybuttons,.qolPartyNiceTable #partybox .party .working .berrybuttons{opacity:.3}.qolPartyCustomParty .loading,.qolPartyHideAll .loading,.qolPartyHideDislike .loading,.qolPartyNiceTable .loading{user-select:none}.qolPartyHideAll #partybox .party>div>:not(.action),.qolPartyHideAll .tooltip_content,.qolPartyNiceTable #partybox .party>div>:not(.action),.qolPartyNiceTable .tooltip_content{display:none}.qolPartyNiceTable #profilepage #partybox .party{box-shadow:none;width:250px}.qolPartyNiceTable #profilepage #partybox .party>div{border-radius:0;border-width:1px 1px 0;width:210px}.qolPartyNiceTable #profilepage #partybox .party>div:first-child{border-radius:6px 6px 0 0}.qolPartyNiceTable #profilepage #partybox .party>div:nth-child(6){border-bottom-width:1px;border-radius:0 0 6px 6px}.qolPartyHideAll #profilepage #partybox .party{box-shadow:none}.qolPartyHideAll #profilepage #partybox .party>div{background:transparent;border:none;height:0;padding:0;position:unset;width:0}.qolPartyHideAll #profilepage #partybox .party>div .action,.qolPartyHideAll #profilepage #partybox .party>div .action .berrybuttons{height:0;position:unset!important}.qolPartyHideAll #profilepage #partybox .party>div .action a{margin-left:10px;overflow:hidden;padding:3px;position:absolute;width:112px;z-index:1}.qolPartyHideAll #profilepage #partybox .party>div .action .berrybuttons a{border-radius:8px;padding:5px}.qolPartyHideAll #profilepage #partybox .party>div .action table{display:none}.qolPartyHideAll .compact-view-toggle+label{display:inline-block;margin:0 4px 8px}.qolPartyHideAll #profilebox,.qolPartyHideAll #trainerimage,.qolPartyHideAll .fieldslink,.qolPartyHideAll .working{display:none} `+
               `.badgelist>table>tbody>tr>td>.itemtooltip{margin-top:-28px;position:relative}.badgelist>table>tbody>tr>td>p{margin-block-end:0;margin-block-start:0}.qolBadges{border-collapse:collapse}.qolBadgesTop td{border-top:1px solid}.qolBadgesBot td:first-of-type img{margin-right:5px;vertical-align:middle} `;
    }

    static fieldSearchHTML() {
        return `<div id="fieldsearch"><button type="button" class="collapsible"><b>Advanced Field search</b></button><div class="collapsible_content"><p>Check the boxes of Pokemon you wish to find in this field! You can select multiple checkboxes at once and it will notify you whenever it will find the types of Pokemons you selected!</p><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldShiny">Shiny</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldAlbino">Albino</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldMelanistic">Melanistic</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldPrehistoric">Prehistoric</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldDelta">Delta</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldMega">Mega</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldStarter">Starter</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldCustomSprite">Custom Sprite</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldItem">Holds Item</label></td></tr></tbody></table><h4>Search on type</h4><p>Select which types of Pokemon you wish to find</p><input type="button" value="Add type" id="addFieldTypeSearch"><div id="fieldTypes"><div class="0"></div></div><h4>Search on nature</h4><p>Select which natures of Pokemon you wish to find</p><input type="button" value="Add nature" id="addFieldNatureSearch"><div id="natureTypes"><div class="0"></div></div><h4>Search on egg group</h4><p>Select which egg groups you wish to find</p><input type="button" value="Add egg group" id="addFieldEggGroupSearch"><div id="eggGroupTypes"><div class="0"></div></div><h4>Custom Search</h4><p>Here you can custom find any Pokemon you want! Hover over "Custom Search Help" for more info.</p><div class="tooltip_trigger qoltooltip_trigger">Custom Search Help</div><div class="tooltip_content customsearchtooltip"><span class="tooltiptext">Custom search by Pokemon name<br><br>Select Custom Egg and/or Custom Pokemon and type the name of the Pokemon you wish to find to find that Pokemon or the egg of that Pokemon. If you want to find a Pokemon with a specific gender, select the gender you wish to find.<br><br>Custom search by image code<br><br>Select By img code (and de-select Custom Egg & Custom Pokemon checkboxes) to find a Pokemon or egg by img code. For example you wish to find a Bulbasaur. When the URL for its image is this:<br>//pfq-static.com/img/pkmn/1/g/g.png/t=1474027727<br>paste only '1/g/g' (without the quotes), and now it will show you when a Bulbasaur is found! You may also copy the complete link.<br><a href="https://docs.google.com/spreadsheets/d/1rD1VZNTQRYXMOVKvGasjmMdMJu-iheE-ajsFkfs4QXA/edit?usp=sharing">List of Eggs Image Codes</a><br><br>More info on finding Pokemon with their img code:<br><br><a href="https://pokefarm.com/forum/thread/127552/Site-Skins-How-To-and-Helpful-CSS">"Pokemon Modifications - Make Shelter Pokemon Stand Out"</a></span></div><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldCustomEgg">Custom Egg</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldCustomPokemon">Custom Pokemon</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldCustomPng">By img code</label></td></tr></tbody></table><h4>Search on gender</h4><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldMale">Male</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldFemale">Female</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldNoGender">Genderless</label></td></tr></tbody></table><h4>Search Keys</h4><input type="button" value="Add searchfield" id="addTextField"><div id="searchkeys"><div class="0"></div></div><br></div></div>`;
    }

    static fieldSortHTML() {
        return `<div id="fieldorder"><label><input type="checkbox" class="qolsetting qolalone" data-key="fieldByBerry"> Sort by berries</label> <label><input type="checkbox" class="qolsetting qolalone" data-key="fieldByMiddle"> Sort in the middle</label> <label><input type="checkbox" class="qolsetting qolalone" data-key="fieldByGrid"> Align to grid</label> <label><input type="checkbox" class="qolsetting" data-key="fieldClickCount"> Click counter</label></div>`;
    }

    static labOptionsHTML() {
        return `<div id="labCustomSearch" class="center"><p class="boldp">Egg type search</p><p>Select which egg types you would like to find in the lab. You can select multiple!</p><input type="checkbox" class="qolsetting" data-key="findTypeEgg">Egg types <input type="button" value="Add typesearch" id="addLabTypeList"><div id="labTypes"><div class="0"></div></div><p class="boldp">Egg custom search</p><p>Add the pokemon name or Img code (complete link starting from //pfq..) that you would like to find in the lab in a searchfield. You can select multiple!</p><input type="checkbox" class="qolsetting" data-key="customEgg">Custom Egg <input type="button" value="Add searchfield" id="addLabSearch"><div id="searchkeys"><div class="0"></div></div></div>`;
    }

    static evolveFastHTML() {
        return `<ul class="qolEvolveTypeList"><li class="expandlist"><h3 class="slidermenu">Normal</h3><ul class="normal 0 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Fire</h3><ul class="Fire 1 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Water</h3><ul class="Water 2 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Electric</h3><ul class="Electric 3 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Grass</h3><ul class="Grass 4 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Ice</h3><ul class="Ice 5 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Fighting</h3><ul class="Fighting 6 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Poison</h3><ul class="Poison 7 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Ground</h3><ul class="Ground 8 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Flying</h3><ul class="Flying 9 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Psychic</h3><ul class="Psychic 10 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Bug</h3><ul class="Bug 11 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Rock</h3><ul class="Rock 12 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Ghost</h3><ul class="Ghost 13 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Dragon</h3><ul class="Dragon 14 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Dark</h3><ul class="Dark 15 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Steel</h3><ul class="Steel 16 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Fairy</h3><ul class="Fairy 17 qolChangeLogContent"></ul></li><br><li class="expandlist"><h3 class="slidermenu">Unknown Types</h3><ul class="Unknown 18 qolChangeLogContent"></ul></li></ul>`;
    }

    static privateFieldSearchHTML() {
        return `<div id="fieldsearch"><button type="button" class="collapsible"><b>Advanced Field search</b></button><div class="collapsible_content"><p>Check the boxes of Pokemon you wish to find in this field! You can select multiple checkboxes at once and it will notify you whenever it will find the types of Pokemons you selected!</p><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldShiny">Shiny</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldAlbino">Albino</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldMelanistic">Melanistic</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldPrehistoric">Prehistoric</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldDelta">Delta</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldMega">Mega</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldStarter">Starter</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldCustomSprite">Custom Sprite</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldItem">Holds Item</label></td></tr></tbody></table><h4>Search on type</h4><p>Select which types of Pokemon you wish to find</p><input type="button" value="Add type" id="addPrivateFieldTypeSearch"><div id="fieldTypes"><div class="0"></div></div><h4>Search on nature</h4><p>Select which natures of Pokemon you wish to find</p><input type="button" value="Add nature" id="addPrivateFieldNatureSearch"><div id="natureTypes"><div class="0"></div></div><h4>Search on egg group</h4><p>Select which egg groups you wish to find</p><input type="button" value="Add egg group" id="addPrivateFieldEggGroupSearch"><div id="eggGroupTypes"><div class="0"></div></div><h4>Custom Search</h4><p>Here you can custom find any Pokemon you want! Hover over "Custom Search Help" for more info.</p><div class="tooltip_trigger qoltooltip_trigger">Custom Search Help</div><div class="tooltip_content customsearchtooltip"><span class="tooltiptext">Custom search by Pokemon name<br><br>Select Custom Egg and/or Custom Pokemon and type the name of the Pokemon you wish to find to find that Pokemon or the egg of that Pokemon. If you want to find a Pokemon with a specific gender, select the gender you wish to find.<br><br>Custom search by image code<br><br>Select By img code (and de-select Custom Egg & Custom Pokemon checkboxes) to find a Pokemon or egg by img code. For example you wish to find a Bulbasaur. You paste it's Img code in the search bar:<br>//pfq-static.com/img/pkmn/1/g/g.png/t=1474027727<br>and now it will show you when a Bulbasaur is found! Copy paste the complete link (starting from //) or you won't find anything.<br><br><a href="https://docs.google.com/spreadsheets/d/1rD1VZNTQRYXMOVKvGasjmMdMJu-iheE-ajsFkfs4QXA/edit?usp=sharing">List of Eggs Image Codes</a><br><br>More info on finding Pokemon with their img code:<br><br><a href="https://pokefarm.com/forum/thread/127552/Site-Skins-How-To-and-Helpful-CSS">"Pokemon Modifications - Make Shelter Pokemon Stand Out"</a></span></div><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="customEgg">Custom Egg</label></td><td><label><input type="checkbox" class="qolsetting" data-key="customPokemon">Custom Pokemon</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="customPng">By img code</label></td></tr></tbody></table><h4>Search on gender</h4><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="fieldMale">Male</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldFemale">Female</label></td><td><label><input type="checkbox" class="qolsetting" data-key="fieldNoGender">Genderless</label></td></tr></tbody></table><h4>Search Keys</h4><input type="button" value="Add searchfield" id="addTextField"><div id="searchkeys"><div class="0"></div></div></div><br></div>`;
    }

    static shelterOptionsHTML() {
        return `<div id="shelteroptionsqol"><p>Check the boxes of Pokemon you wish to find in the shelter! You can select multiple checkboxes at once and it will notify you whenever it will find the types of Pokemon you selected! Use the letter 'n' key to select and cycle through the Pokemon matched by the script.</p><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="findNewEgg">New Egg</label></td><td><label><input type="checkbox" class="qolsetting" data-key="findNewPokemon">New Pokemon</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="findShiny">Shiny</label></td><td><label><input type="checkbox" class="qolsetting" data-key="findAlbino">Albino</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="findMelanistic">Melanistic</label></td><td><label><input type="checkbox" class="qolsetting" data-key="findPrehistoric">Prehistoric</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="findDelta">Delta</label></td><td><label><input type="checkbox" class="qolsetting" data-key="findMega">Mega</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="findStarter">Starter</label></td><td><label><input type="checkbox" class="qolsetting" data-key="findCustomSprite">Custom Sprite</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="findLegendary">Legendary</label></td></tr></tbody></table><h4>Search on type</h4><p>Select which types of Pokemon and/or eggs you wish to find</p><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="findTypeEgg">Egg types</label></td><td><label><input type="checkbox" class="qolsetting" data-key="findTypePokemon">Pokemon types</label></td></tr></tbody></table><input type="button" value="Add typesearch" id="addShelterTypeList"><div id="shelterTypes"><div class="0"></div></div><h4>Custom Search</h4><p>Here you can custom find any Pokemon you want! Hover over "Custom Search Help" for more info.</p><div class="tooltip_trigger qoltooltip_trigger">Custom Search Help</div><div class="tooltip_content customsearchtooltip"><span class="tooltiptext">Custom search by Pokemon name<br><br>Select Custom Egg and/or Custom Pokemon and type the name of the Pokemon you wish to find to find that Pokemon or the egg of that Pokemon. If you want to find a Pokemon with a specific gender, select the gender you wish to find.<br><br>Custom search by image code<br><br>Select By img code (and de-select Custom Egg & Custom Pokemon checkboxes) to find a Pokemon or egg by img code. For example you wish to find a Bulbasaur. You paste it's Img code in the search bar:<br>//pfq-static.com/img/pkmn/1/g/g.png/t=1474027727<br>and now it will show you when a Bulbasaur is found! Copy paste the complete link (starting from //) or you won't find anything.<br><br><a href="https://docs.google.com/spreadsheets/d/1rD1VZNTQRYXMOVKvGasjmMdMJu-iheE-ajsFkfs4QXA/edit?usp=sharing">List of Eggs Image Codes</a><br><br>More info on finding Pokemon with their img code:<br><br><a href="https://pokefarm.com/forum/thread/127552/Site-Skins-How-To-and-Helpful-CSS">"Pokemon Modifications - Make Shelter Pokemon Stand Out"</a></span></div><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="customEgg">Custom Egg</label></td><td><label><input type="checkbox" class="qolsetting" data-key="customPokemon">Custom Pokemon</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="customPng">By img code</label></td></tr></tbody></table><h4>Search on Gender</h4><table><tbody><tr><td><label><input type="checkbox" class="qolsetting" data-key="findMale">Male</label></td><td><label><input type="checkbox" class="qolsetting" data-key="findFemale">Female</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting" data-key="findNoGender">Genderless</label></td></tr></tbody></table><h4>Search Keys</h4><input type="button" value="Add searchfield" id="addShelterTextfield"><div id="searchkeys"><div class="0"></div></div></div>`;
    }

    static shelterSortHTML() {
        return `<div id="qolsheltersort"><label><input type="checkbox" class="qolsetting" data-key="shelterGrid"><span>Sort by Grid</span></label><div style="padding: 5px">Sprite size mode:<p style="margin: 5px 0"><input type="radio" id="spriteSizeAuto" name="shelterSpriteSize" value="auto"> <label for="spriteSizeAuto">Automatic</label></p><p style="margin: 5px 0"><input type="radio" id="spriteSizeLarge" name="shelterSpriteSize" value="large"> <label for="spriteSizeLarge">Large</label></p><p style="margin: 5px 0"><input type="radio" id="spriteSizeSmall" name="shelterSpriteSize" value="small"> <label for="spriteSizeSmall">Small</label></p></div></div>`;
    }

    static qolHubHTML() {
        return `<div class="dialog"><div><div><div style="margin-top: 1em; margin-bottom: 1em;"><h3 class="qolHubHead qolHubSuperHead">Quality of Life userscript Hub</h3><div><p>Welcome to the user hub of the QoL userscript! Here you can adjust the script settings and view the latest changes to the script.</p><div><table class="qolHubTable"><tbody><tr><td><h3 class="qolHubHead">Settings</h3></td></tr><tr><td class="qolAllSettings"><ul><li><label><input type="checkbox" class="qolhubsetting" data-key="enableDaycare"> <span>Highlight Breeding Matches</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="shelterEnable"> <span>Enable All Shelter QoL Features</span></label><ul><li><label><input type="checkbox" class="qolhubsetting" data-key="shelterFeatureEnables.search"> <span>Advanced Searching</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="shelterFeatureEnables.sort"> <span>Advanced Sorting</span></label></li></ul></li><li><label><input type="checkbox" class="qolhubsetting" data-key="fishingEnable"> <span>Fishing Multi-Select Controls</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="publicFieldEnable"> <span>Enable All Public Fields QoL Features</span></label><ul><li><label><input type="checkbox" class="qolhubsetting" data-key="publicFieldFeatureEnables.search"> <span>Advanced Searching</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="publicFieldFeatureEnables.sort"> <span>Advanced Sorting</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="publicFieldFeatureEnables.tooltip"> <span>Tooltips Enable/Disable</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="publicFieldFeatureEnables.pkmnlinks"> <span>Pokemon Link List</span></label></li></ul></li><li><label><input type="checkbox" class="qolhubsetting" data-key="privateFieldEnable"> <span>Enable All Private Fields QoL Features</span></label><ul><li><label><input type="checkbox" class="qolhubsetting" data-key="privateFieldFeatureEnables.search"> <span>Advanced Searching</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="privateFieldFeatureEnables.release"> <span>Multi-Select Controls (Move & Release)</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="privateFieldFeatureEnables.tooltip"> <span>Tooltips Enable/Disable</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="privateFieldFeatureEnables.pkmnlinks"> <span>Pokemon Link List</span></label></li></ul></li><li><label><input type="checkbox" class="qolhubsetting" data-key="partyMod"> <span>Party click mod</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="easyEvolve"> <span>Easy evolving</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="labNotifier"> <span>Lab Notifier</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="dexFilterEnable"> <span>Multiple Types Filtering</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="condenseWishforge"> <span>Smaller Crafted Badges List</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="interactionsEnable"> <span>Interactions page (sent multi-link)</span></label></li><li><label><input type="checkbox" class="qolhubsetting" data-key="summaryEnable"> <span>Summary page (pkmnpanel code)</span></label></li></ul><span><b>Note</b>: Please refresh the page to see any changes made to these settings take effect.</span></td></tr><tr><td><h3 class="qolHubHead">Change log</h3></td></tr><tr><td class="qolChangeLog"><ul class="qolChangeLogList"><li class="expandlist"><span>Change log was removed as of April 2021. Visit <a href="https://github.com/tarashia/PokeFarmQoL" target="_blank">GitHub</a> for the latest list of features</span></li></ul></td></tr><tr><td colspan="2" class="qolDexUpdate"><h3 class="qolHubHead">Pokedex Settings</h3></td></tr><tr id="qolDexUpdateRow"><td colspan="2" class="qolAllSettings"><span>Notice that you can't find the newly added Eggs or Pokemon in shelter? You may have to update your pokedex. Please visit the Dex page, and the Userscript will update itself with the newest pokemon. Then, in order to use the update, refresh the page where you are using the script's search features.</span><br><span>Date last updated: <span id="qolDexDate"></span></span></td></tr><tr id="qolDexClearRow"><td colspan="2"><input type="button" value="Clear Cached Dex" id="clearCachedDex"></td></tr><tr><td colspan="2" class="qolAllSettings"><h3 class="qolHubHead">Css Settings</h3></td></tr><tr><td colspan="2"><span>Add your custom CSS! If you have an error in your CSS you won't get notified, so read your code carefully. Still doesn't work? Try: '!important'. The custom CSS is being loaded after the page loads, so it's possible that there will be a short delay before your CSS changes apply. Note: LESS formatting is not supported; if you're copying LESS-formatted code from a guide, you should <a href="https://lesscss.org/less-preview/" target="_blank">convert it to plain CSS first.</a></span></td></tr><tr><td colspan="2" class="qolAllSettings"><div class="textareahub"><textarea id="qolcustomcss" rows="15" class="qolhubsetting" data-key="customCss"></textarea></div></td></tr><tr><td colspan="2" class="qolAllSettings"><h3 class="qolHubHead">Debugging Corner</h3></td></tr><tr id="qolDebuggingCornerRow"><td colspan="2" class="qolAllSettings"><span>Use these controls to reset the settings for a particular page back to its defaults</span><br><span><b>Page Select</b></span><!-- Option values correspond to keys in the PAGES object in the main script --> <select name="Page Select" class="qolHubResetSettingsSelect" data-key="resetPageSettings"><option value="None">None</option><option value="Lab">Lab</option><option value="Multiuser">Multiuser</option><option value="PrivateFields">Private Fields</option><option value="PublicFields">Public Fields</option><option value="Shelter">Shelter</option></select> <input type="button" value="Reset Page Settings" id="resetPageSettings"> <input type="button" value="Reset ALL Settings" id="resetAllSettings"></td></tr><tr><td><br>Some QoL features may log problems or errors here. You may be asked about this when reporting bugs. <input type="button" value="View errors" id="qolErrorConsole"><ul id="qolConsoleContent" style="word-break:break-all;"></ul><br>The QoL settings are stored in a cookie on your browser. You may be asked to post them when reporting bugs. <input type="button" value="Load settings" id="qolStorageLog"><div id="qolStorageOutput" style="display: none;"></div><br><input type="button" value="Log settings + dex" id="qolLogPlusDex"></td></tr></tbody></table></div></div><p class="closeHub">Close</p></div></div></div></div>`;
    }

    static publicFieldTooltipModHTML() {
        return `<div id="tooltipenable"><button type="button" class="collapsible"><b>Tooltip Settings</b></button><div class="collapsible_content"><span>The "Enable tooltip" settings force the tooltip on or off. To revert back to Pokefarm's default tooltip settings, uncheck "Enable QoL Tooltip Changes" and refresh the page.</span><hr><table><tr><td><label><input type="checkbox" class="qolsetting tooltipsetting" data-key="tooltipEnableMods"> Enable QoL Tooltip Settings</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting tooltipsetting" data-key="tooltipNoBerry"> Hide tooltip<br>(No berry selected)</label></td><td><label><input type="checkbox" class="qolsetting tooltipsetting" data-key="tooltipBerry"> Hide tooltip<br>(Berry selected)</label></td></tr></table></div></div>`;
    }

    static privateFieldTooltipModHTML() {
        return `<div id="tooltipenable"><button type="button" class="collapsible"><b>Tooltip Settings</b></button><div class="collapsible_content"><span>The "Enable tooltip" settings force the tooltip on or off. To revert back to Pokefarm's default tooltip settings, uncheck "Enable QoL Tooltip Changes" and refresh the page.</span><hr><table><tr><td><label><input type="checkbox" class="qolsetting tooltipsetting" data-key="tooltipEnableMods"> Enable QoL Tooltip Settings</label></td></tr><tr><td><label><input type="checkbox" class="qolsetting tooltipsetting" data-key="tooltipNoBerry"> Hide tooltip</label></td></tr></table></div></div>`;
    }

    static qolHubLinkHTML() {
        return `<li data-name="QoL"><a title="QoL Settings"><img src="https://pokefarm.com/upload/:b7q/QoL/icon.png" alt="QoL Settings">QoL </a><!-- The QoL hub doesn't exist until opened; store custom errors here initially instead --><ul style="display: none;" id="qolConsoleHolder"></ul></li>`;
    }

    static massReleaseSelectHTML() {
        return `<label id="selectallfish"><input class="qolsetting" id="selectallfishcheckbox" type="checkbox">Select all</label> <label id="movefishselectany"><input class="qolsetting" id="movefishselectanycheckbox" type="checkbox">Select Any</label> <label id="movefishselectsour"><input class="qolsetting" id="movefishselectsourcheckbox" type="checkbox">Select Sour</label> <label id="movefishselectspicy"><input class="qolsetting" id="movefishselectspicycheckbox" type="checkbox">Select Spicy</label> <label id="movefishselectdry"><input class="qolsetting" id="movefishselectdrycheckbox" type="checkbox">Select Dry</label> <label id="movefishselectsweet"><input class="qolsetting" id="movefishselectsweetcheckbox" type="checkbox">Select Sweet</label> <label id="movefishselectbitter"><input class="qolsetting" id="movefishselectbittercheckbox" type="checkbox">Select Bitter</label>`;
    }

    static partyModHTML() {
        return `<div id="qolpartymod"><label><input type="checkbox" class="qolsetting qolalone" data-key="hideDislike">Hide disliked berries</label> <label><input type="checkbox" class="qolsetting qolalone" data-key="niceTable">Show in table</label> <label><input type="checkbox" class="qolsetting qolalone" data-key="hideAll">Hide all click fast</label> <label><input type="checkbox" class="qolsetting qolalone" data-key="customParty">Customize</label></div>`;
    }

    static partyModCustomHTML() {
        return `<div id="qolpartymodcustom" class="panel accordion" style="display:none;"><h3><a href="#">Custom options <svg viewBox="-6 -6 12 12" width="16" height="16" class="acctoggle"><polygon fill="currentColor" points="-2,-4 4,0 -2,4"></polygon></svg></a></h3><div style="display:none;"><div class="customopt"><label><input type="checkbox" class="qolsetting" data-key="stackNextButton">Stack next button</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-key="stackMoreButton">Stack get more button</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-key="showPokemon">Show pokemon</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-key="compactPokemon">Compact pokemon (if shown)</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-key="clickablePokemon">Clickable pokemon (if compact)</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-key="showTrainerCard">Show trainer card</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-key="showFieldButton">Show field button</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-key="showModeChecks">Show view mode checks</label></div><div class="customopt"><label><input type="checkbox" class="qolsetting" data-key="showUserName">Show user name</label></div></div></div>`;
    }
}

/* 
This is a singleton wrapper on the settings/dex classes
It makes it easier to get the master settings instance,
without needing to explicitly pass it around between functions
*/

let UserSettingsHandle = (function () {
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


// Do not call this constructor directly to get or create a settings object
// Always call UserSettingsHandle.getSettings();
class UserSettings {
    constructor() {
        this.setDefaults();

        /*
         * used to tie "global" enable settings in USER_SETTINGS to the more
         * granular settings that are related to the same page
         */
        this.LINKED_SETTINGS = [
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
    }
    setDefaults() {
        // default settings when the script gets loaded the first time
        this.customCss = '';
        this.enableDaycare = true;
        this.shelterEnable = true;
        this.fishingEnable = true;
        this.publicFieldEnable = true;
        this.privateFieldEnable = true;
        this.partyMod = true;
        this.easyEvolve = true;
        this.labNotifier = true;
        this.dexFilterEnable = true;
        this.condenseWishforge = true;
        this.interactionsEnable = true;
        this.summaryEnable = true;
        this.shelterFeatureEnables = {
            search: true,
            sort: true,
        };
        this.publicFieldFeatureEnables = {
            search: true,
            sort: true,
            release: true,
            tooltip: true,
            pkmnlinks: true
        };
        this.privateFieldFeatureEnables = {
            search: true,
            release: true,
            tooltip: true,
            pkmnlinks: true
        };
    }
    /// load settings from an object that is not of type UserSettings
    load(settingsObj) {
        try {
            const countScriptSettings = Object.keys(this).length;
            const localStorageString = settingsObj;
            const countLocalStorageSettings = Object.keys(localStorageString).length;
            // adds new settings to this class
            if (countLocalStorageSettings < countScriptSettings) {
                const newSettings = $.extend(true, this, settingsObj);
                this.copyFields(newSettings);
            }
            // removes objects from the local storage if they don't exist anymore. Not yet possible..
            if (countLocalStorageSettings > countScriptSettings) {
                /* do nothing at the moment */
            }
        }
        catch (err) {
            Helpers.writeCustomError('Error while loading settings object: '+err,'error',err);
        }
        if (settingsObj != this) {
            this.copyFields(settingsObj);
            // this = JSON.parse(LocalStorageManager.getItem(this.SETTINGS_SAVE_KEY));
        }
    }
    copyFields(settingsObj) {
        const recursiveCopy = (object, key, value) => {
            // typeof null returns "object" - disclude it explicitly
            if (value !== null && typeof value === 'object') {
                for (const [_key, _value] of Object.entries(value)) {
                    recursiveCopy(object[key], _key, _value);
                }
            } else {
                object[key] = value;
            }
        };
        for (const [key, value] of Object.entries(settingsObj)) {
            recursiveCopy(this, key, value);
        }
    }
}

// Do not call this constructor directly to get or create a dex object
// Always call UserSettingsHandle.getDex();
// Note on DEX_LOADING: undefined if fetchUploadedDex is not called, or if resetDex is called
//                      true if loading is in progress, false if loading has completed
//                      use === to evaluate the value, to ensure false vs undefined
class UserPokedex {
    constructor() {
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
        console.log('Updating dex from from uploaded file');
        try {
            this.DEX_LOADING = true;
            const self = this;
            $.get("https://pokefarm.com/upload/:b7q/QoL/dex-data.jpg", function(data){
                self.DEX_DATA = JSON.parse(data);
                let dateString = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
                self.DEX_UPDATE_DATE = dateString;
                LocalStorageManager.updateLocalStorageDex(self.DEX_DATA, dateString);
                self.DEX_LOADING = false;
                console.log('Dex load complete');
            });
        } catch(e) {
            console.error('Failed to load dex data from uploaded file');
            console.log(e);
            this.resetDex();
        }
    }
    // Clears any locally stored dex data, and loads the static dex data instead.
    resetDex() {
        console.warn('Using static dex data');
        LocalStorageManager.removeItem(Globals.POKEDEX_DATA_KEY);
        this.DEX_UPDATE_DATE = undefined;
        this.DEX_LOADING = undefined;
        this.DEX_DATA = Globals.STATIC_DEX_DATA;
    }
    // Return the number of days since this.DEX_UPDATE_DATE
    daysSinceUpdate() {
        if(!this.DEX_UPDATE_DATE) {
            return -1;
        }
        try {
            return (new Date() - new Date(this.DEX_UPDATE_DATE)) / (1000 * 3600 * 24);
        } catch(e) {
            console.error('Failed to determine number of days since dex update');
            console.log(e);
            return -1;
        }
    }
}

class PagesManager {
    constructor() {
        this.USER_SETTINGS = UserSettingsHandle.getSettings();
        this.pages = {
            'Daycare': {
                class: DaycarePage,
                object: undefined,
                setting: 'enableDaycare'
            },
            'Farm': {
                class: FarmPage,
                object: undefined,
                setting: 'easyEvolve'
            },
            'Fishing': {
                class: FishingPage,
                object: undefined,
                setting: 'fishingEnable'
            },
            'Lab': {
                class: LabPage,
                object: undefined,
                setting: 'labNotifier'
            },
            'Multiuser': {
                class: MultiuserPage,
                object: undefined,
                setting: 'partyMod'
            },
            'PrivateFields': {
                class: PrivateFieldsPage,
                object: undefined,
                setting: 'privateFieldEnable'
            },
            'PublicFields': {
                class: PublicFieldsPage,
                object: undefined,
                setting: 'publicFieldEnable'
            },
            'Shelter': {
                class: ShelterPage,
                object: undefined,
                setting: 'shelterEnable'
            },
            'Dex': {
                class: DexPage,
                object: undefined,
                setting: 'dexFilterEnable'
            },
            'Wishforge': {
                class: WishforgePage,
                object: undefined,
                setting: 'condenseWishforge'
            },
            'Interactions': {
                class: InteractionsPage,
                object: undefined,
                setting: 'interactionsEnable'
            },
            'Summary': {
                class: SummaryPage,
                object: undefined,
                setting: 'summaryEnable'
            }
        };
    }
    instantiatePages() {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (this.USER_SETTINGS[pg.setting] === true) {
                pg.object = new pg.class(this.USER_SETTINGS);
            }
        }
    }
    loadSettings() {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (this.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.loadSettings();
            }
        }
    }
    saveSettings() {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (this.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.saveSettings();
            }
        }
    }
    populateSettings() {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (this.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.populateSettings();
            }
        }
    }
    clearPageSettings(pageName) {
        if (!(pageName in this.pages)) {
            console.error(`Could not proceed with clearing page settings. Page ${pageName} not found in list of pages`);
        } else if (this.pages[pageName].object) {
            this.pages[pageName].object.resetSettings();
        }
    }
    clearAllPageSettings() {
        for(let pageName in this.pages) {
            this.clearPageSettings(pageName);
        }
    }
    setupHTML() {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (this.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.setupHTML();
            }
        }
    }
    setupCSS() {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (this.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.setupCSS();
            }
        }
    }
    setupObservers() {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (this.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.setupObserver();
            }
        }
    }
    setupHandlers() {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (this.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                pg.object.setupHandlers();
            }
        }
    }
}

/*
 * This class handles creating, removing, and handling the DOM object actions
 * for the QoL Hub.
 */
class QoLHub {
    constructor(PAGES) {
        this.PAGES = PAGES;
        this.SETTINGS_SAVE_KEY = Globals.SETTINGS_SAVE_KEY;
        this.USER_SETTINGS = UserSettingsHandle.getSettings();
        this.LINKED_SETTINGS = this.USER_SETTINGS.LINKED_SETTINGS;
    }
    setupCSS() {
        //custom user css
        $('head').append('<style type="text/css">' + this.USER_SETTINGS.customCss + '</style>');
    }
    setupHandlers() {
        const obj = this;
        $('#qolcustomcss', document).on('keydown', function (e) {
            if (e.keyCode == 9 || e.which == 9) {
                e.preventDefault();
                const s = this.selectionStart;
                $(this).val(function (i, v) {
                    return v.substring(0, s) + '\t' + v.substring(this.selectionEnd);
                });
                this.selectionEnd = s + 1;
            }
        });

        $(document).on('input', '.qolhubsetting', (function () { //Changes QoL settings
            const dataKey = this.getAttribute('data-key');
            obj.settingsChange(this.getAttribute('data-key'),
                $(this).val(),
                $(this).parent().parent().attr('class'),
                $(this).parent().attr('class'),
                (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
            obj.handleLinkedSetting(dataKey);
        }));

        $(document).on('click', '.closeHub', (function () { //close QoL hub
            obj.close(document);
        }));

        $(document).on('click', '#resetPageSettings', (function () {
            const page = $(this).parent().find('select').val();
            obj.clearPageSettings(page);
        }));

        $(document).on('click', '#resetAllSettings', (function () {
            if(window.confirm('Are you sure? All settings, including your custom CSS, will be reset.')) {
                obj.clearAllSettings();
            }
        }))

        $(document).on('click', 'h3.slidermenu', (function () { //show hidden li in change log
            $(this).next().slideToggle();
        }));

        // Issue #61 - Item 6 - Remove the 'Cleared!' message so the user knows they can click it again
        $(document).on('mouseover', '#clearCachedDex', (function () {
            $('#clearCachedDex').next().remove();
        }));

        // Issue #61 - Item 6 - Add a 'Cleared!' message so the user knows that the clearing works
        $(document).on('click', '#clearCachedDex', (function () {
            obj.resetDex();
        }));

        $(document).on('click', '#qolErrorConsole', (function() {
            let consoleContent = $('#qolConsoleHolder').html();
            if(consoleContent.trim() == '') {
                consoleContent = '[ No errors to display ]';
            }
            $('#qolConsoleContent').html(consoleContent);
        }));

        $(document).on('click', '#qolStorageLog', (function() {
            let storedSettings = LocalStorageManager.getAllQoLSettings();
            console.log(storedSettings);
            // get relevant browser/screen size data, add to object
            // convert to JSON, then base 64 encode
            let output = JSON.stringify(storedSettings);
            output = btoa(output);
            // output to somewhere user can copy/paste it
            $('#qolStorageOutput').text(output);
            $('#qolStorageOutput').css('display','block');
        }));
        $(document).on('click', '#qolLogPlusDex', (function() {
            let storedSettings = LocalStorageManager.getAllQoLSettings(true);
            console.log(JSON.stringify(storedSettings));
        }));
    }
    loadSettings() {
        try {
            if (LocalStorageManager.getItem(this.SETTINGS_SAVE_KEY) === null) {
                this.saveSettings();
            } else {
                if(this.USER_SETTINGS.load(JSON.parse(LocalStorageManager.getItem(this.SETTINGS_SAVE_KEY)))) {
                    this.saveSettings();
                }
            }
        } catch(err) {
            Helpers.writeCustomError('Error while loading user settings: '+err,'error',err);
        }
    }
    clearAllSettings() {
        LocalStorageManager.clearAllQoLKeys();
        location.reload(); 
    }
    saveSettings() {
        LocalStorageManager.setItem(this.SETTINGS_SAVE_KEY, JSON.stringify(this.USER_SETTINGS));
    }
    populateSettings() {
        function populateSetting(object, key, self, oldKeys) {
            oldKeys = oldKeys || [];
            const _object = object[key];
            const newKeys = [...oldKeys, key];
            if (typeof _object === 'boolean') {
                const _key = newKeys.join('.');
                Helpers.toggleSetting(_key, _object, 'qolhubsetting');
            }
            else if (typeof _object === 'string') {
                const _key = newKeys.join('.');
                Helpers.toggleSetting(_key, _object, 'qolhubsetting');
            } else if (typeof _object === 'object') {
                for (const _key in _object) {
                    populateSetting(_object, _key, self, newKeys);
                }
            }
        }
        for (const key in this.USER_SETTINGS) {
            if (Object.hasOwnProperty.call(this.USER_SETTINGS, key)) {
                populateSetting(this.USER_SETTINGS, key, this);
            }
            this.handleLinkedSetting(key);
        }
    }
    settingsChange(element, textElement) {
        function getProperty( propertyName, object ) {
            const parts = propertyName.split( '.' );
            const length = parts.length;
            let property = object || this;

            for (let i = 0; i < length; i++ ) {
                if ( ! Object.hasOwnProperty.call(property, parts[i])) {
                    return null;
                }
                property = property[parts[i]];
            }
            return property;
        }

        function setProperty( propertyName, object, newValue) {
            const parts = propertyName.split('.');
            const first = parts[0];
            const rest = parts.slice(1);

            if ( !Object.hasOwnProperty.call(object, first)) {
                return false;
            }
            else if (rest.length == 0) {
                object[first] = newValue;
                return true;
            } else {
                return setProperty(rest.join('.'), object[first], newValue);
            }
        }

        const oldValue = getProperty(element, this.USER_SETTINGS);
        let newValue;
        if (oldValue !== undefined) { // userscript settings
            if (oldValue === false) {
                newValue = true;
            } else if (oldValue === true) {
                newValue = false;
            } else if (typeof oldValue === 'string') {
                newValue = textElement;
            }
            if(!setProperty(element, this.USER_SETTINGS, newValue)) {
                return false;
            } else {
                this.saveSettings();
                return true;
            }
        }
        return false;
    }
    clearPageSettings(pageName) {
        if (pageName !== 'None') { // "None" matches option in HTML
            this.PAGES.clearPageSettings(pageName);
        }
    }
    handleLinkedSetting(possibleManager) {
        const linkedSettingIndex = this.LINKED_SETTINGS.findIndex(ls => ls.manager === possibleManager);
        if(linkedSettingIndex > -1) {
            const managed = this.LINKED_SETTINGS[linkedSettingIndex].managed;
            const USER_SETTINGS = this.USER_SETTINGS[managed];
            if($(`[data-key=${possibleManager}]`).prop('checked') === false) {
                for(const setting in USER_SETTINGS) {
                    $(`[data-key="${managed}.${setting}"]`).prop('disabled', true);
                }
            } else {
                for(const setting in USER_SETTINGS) {
                    $(`[data-key="${managed}.${setting}"]`).prop('disabled', false);
                }
            }
        }
    }
    build(document) {
        $('body', document).append(Resources.qolHubHTML());
        $('#core', document).addClass('scrolllock');
        const qolHubCssBackgroundHead = $('.qolHubHead.qolHubSuperHead').css('background-color');
        const qolHubCssTextColorHead = $('.qolHubHead.qolHubSuperHead').css('color');
        const qolHubCssBackground = $('.qolHubTable').css('background-color');
        const qolHubCssTextColor = $('.qolHubTable').css('color');
        const qolHubDialogBorder = $('.dialog>div>div>div').css('border');
        $('.qolHubHead').css('background-color', qolHubCssBackgroundHead);
        $('.qolHubHead').css('color', qolHubCssTextColorHead);
        $('.qolChangeLogHead').css('background-color', qolHubCssBackgroundHead);
        $('.qolChangeLogHead').css('color', qolHubCssTextColorHead);
        $('.qolChangeLogHead').css('border', qolHubDialogBorder);
        $('.qolopencloselist.qolChangeLogContent').css('background-color', qolHubCssBackground);
        $('.qolopencloselist.qolChangeLogContent').css('color', qolHubCssTextColor);

        $('.qolAllSettings').css('border', qolHubDialogBorder);

        const customCss = this.USER_SETTINGS.customCss;

        if (customCss === '') {
            $('.textareahub textarea', document).val('#thisisanexample {\n    color: yellow;\n}\n\n.thisisalsoanexample {\n    background-color: blue!important;\n}\n\nhappycssing {\n    display: absolute;\n}');
        } else {
            $('.textareahub textarea', document).val(customCss);
        }

        let dexUpdateDate = UserSettingsHandle.getDex().DEX_UPDATE_DATE;
        if(!dexUpdateDate) {
            dexUpdateDate = 'Never updated';
        }
        $('#qolDexDate', document).text(dexUpdateDate);
    }
    close(document) {
        $('.dialog', document).remove();
        $('#core', document).removeClass('scrolllock');
    }
    resetDex() {
        $('#clearCachedDex').next().remove();
        UserSettingsHandle.getDex().resetDex();
        $('#clearCachedDex').after('<span> Cleared!</span>');
        $('#qolDexDate').text('Never updated');
    }
} // QoLHub

// eslint-disable-next-line no-unused-vars
class PFQoL {
  constructor() {
      // :contains to case insensitive
      $.extend($.expr[':'], {
          // eslint-disable-next-line no-unused-vars
          'containsIN': function (elem, i, match, array) {
              return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || '').toLowerCase()) >= 0;
          }
      });

      LocalStorageManager.migrateSettings();

      this.PAGES = new PagesManager();
      this.QOLHUB = new QoLHub(this.PAGES);

      this.init();
  }
  instantiatePages(obj) {
    try {
        obj.PAGES.instantiatePages();
    } catch(err) {
        Helpers.writeCustomError('Error while instantiating pages: '+err,'error',err);
    }
  }
  loadSettings(obj) { // initial settings on first run and setting the variable settings key
    try {
        obj.QOLHUB.loadSettings();
        obj.PAGES.loadSettings();
    } catch(err) {
        Helpers.writeCustomError('Error while loading settings during startup: '+err,'error',err);
    }
  } // loadSettings
  saveSettings(obj) { // Save changed settings
      obj.QOLHUB.saveSettings();
      obj.PAGES.saveSettings();
  } // saveSettings
  populateSettingsPage(obj) { // checks all settings checkboxes that are true in the settings
    try {
        obj.QOLHUB.populateSettings();
        obj.PAGES.populateSettings();
    } catch(err) {
        Helpers.writeCustomError('Error while populating settings page: '+err,'error',err);
    }
  }
  addIcon() { // inject the QoL icon into the icon bar
    // this is done separately from the main HTML to ensure it's always added first,
    // as there's a custom error handler that relies on it existing
    
    if(document.getElementById('announcements')) {
        document.querySelector('#announcements li.spacer')
              .insertAdjacentHTML('beforebegin', Resources.qolHubLinkHTML());
    }
    else {
        console.warn('Did not load QoL - could not find icon ribbon. Are you logged in? Is this a core page?');
        throw '#announcements missing';
    }
  }
  setupHTML(obj) { // injects the HTML changes into the site
    try {
        obj.PAGES.setupHTML();
    } catch(err) {
        Helpers.writeCustomError('Error while setting up HTML: '+err,'error',err);
    }
  }
  setupCSS(obj) { // All the CSS changes are added here
    try {
        Helpers.addGlobalStyle(Resources.css());
        obj.PAGES.setupCSS();
        obj.QOLHUB.setupCSS();
    } catch(err) {
        Helpers.writeCustomError('Error while applying global styling: '+err,'error',err);
    }
  }
  setupObservers(obj) { // all the Observers that needs to run
    try {
        obj.PAGES.setupObservers();
    } catch(err) {
        Helpers.writeCustomError('Error while setting up observers: '+err,'error',err);
    }
  }
  setupHandlers(obj) { // all the event handlers
    try {
        $(document).on('click', 'li[data-name="QoL"]', (function () { //open QoL hub
            obj.QOLHUB.build(document);
            obj.populateSettingsPage(obj);
        }));
        obj.QOLHUB.setupHandlers();
        obj.PAGES.setupHandlers();
    } catch(err) {
        Helpers.writeCustomError('Error while setting up handlers: '+err,'error',err);
    }
  }
  startup() { // All the functions that are run to start the script on Pokéfarm
      return {
          'adding QoL icon': this.addIcon,
          'creating Page handlers': this.instantiatePages,
          'loading Settings': this.loadSettings,
          'setting up HTML': this.setupHTML,
          'populating Settings': this.populateSettingsPage,
          'setting up CSS': this.setupCSS,
          'setting up Observers': this.setupObservers,
          'setting up Handlers': this.setupHandlers,
      };
  }
  init() { // Starts all the functions.
      console.log('Starting up ..');
      const startup = this.startup();
      for (const message in startup) {
          if (Object.hasOwnProperty.call(startup, message)) {
              console.log(message);
              startup[message](this);
          }
      }
      console.log('Finished startup');
  }
}

class Page {
    /* ssk should be a value from Globals indicating the storage key name
        this is only set when the page has page-specific settings
        if the page does not have settings, pass undefined instead */
    constructor(ssk, ds, url) {
        this.settingsSaveKey = ssk;
        this.defaultSettings = ds;
        this.url = url;
        this.settings = this.defaultSettings;
        this.USER_SETTINGS = UserSettingsHandle.getSettings();;
        this.POKEDEX = UserSettingsHandle.getDex();
    }

    onPage(w) {
        return w.location.href.indexOf(`pokefarm.com/${this.url}`) != -1;
    }

    loadSettings() {
        this.settings = LocalStorageManager.loadSettings(
            this.settingsSaveKey,
            this.defaultSettings,
            this.settings);
    }

    saveSettings() {
        LocalStorageManager.saveSettings(this.settingsSaveKey, this.settings);
    }

    populateSettings(obj) {
        if(obj === undefined) {
            obj = this.settings;
        }
        for (const key in obj) {
            if (!Object.prototype.hasOwnProperty.call(obj, key)) {
                continue;
            }
            const value = obj[key];
            if (typeof value === 'object') {
                this.populateSettings(obj[key]);
            }
            else if (typeof value === 'boolean') {
                Helpers.toggleSetting(key, value);//, false);
            }
            else if (typeof value === 'string') {
                console.log('TODO - split and populate');
            }
        }
    }

    resetSettings() {
        this.settings = JSON.parse(JSON.stringify(this.defaultSettings));
        this.saveSettings();
    }

    settingsChange(element, textElement, customClass, typeClass, arrayName) {
        if (JSON.stringify(this.settings).indexOf(element) >= 0) {
            if (typeof this.settings[element] === 'boolean') {
                this.settings[element] = !this.settings[element];
            }
            else if (typeof this.settings[element] === 'string') {
                if (arrayName !== undefined && arrayName !== '') {
                    if (textElement === 'none') {
                        const tempIndex = typeClass - 1;
                        this[arrayName].splice(tempIndex, tempIndex);
                        this.settings[element] = this[arrayName].toString();
                    } else {
                        let tempIndex = -1;
                        if(typeClass !== undefined) {
                            tempIndex = typeClass - 1; // select array
                        } else if(customClass !== undefined) {
                            tempIndex = customClass - 1; // textfield array
                        }
                        this[arrayName][tempIndex] = textElement;
                        this.settings[element] = this[arrayName].toString();
                    }
                }
                else {
                    this.settings[element] = textElement;
                }
            }
            return true;
        }
        else { return false; }
    }

    setupHTML() { /* empty */ }
    setupCSS() { /* empty */ }
    setupObserver() { /* empty */ }
    setupHandlers() { /* empty */ }
} // Page

class DaycarePage extends Page {
    constructor() {
        super(undefined, {}, 'daycare');
        const obj = this;
        this.observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                // const fsPokemon = document.querySelector('#fs_pokemon');
                const fsPokemon = $('#fs_pokemon');
                if (fsPokemon.length > 0 &&
                    $.contains(fsPokemon[0], mutation.target)) {
                    obj.customSearch();
                }
            });
        });
    } // constructor

    setupObserver() {
        this.observer.observe(document.querySelector('body'), {
            childList: true,
            subtree: true
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

        const EGG_ID_TO_NAME = Globals.EGG_GROUP_LIST;
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
    constructor() {
        super(undefined, {}, 'dex');
        const obj = this;
        this.observer = new MutationObserver(function () {
            obj.applyTypeFilters();
        });
        this.typeArray = [];

    }
    setupObserver() {
        this.observer.observe(document.querySelector('#regionslist'), {
            childList: true,
            subtree: true,
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
        const obj = this;
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
                    obj.toggleSelectedTypes();
                    obj.applyTypeFilters();
                } else {
                    h = xLocation.data('type');
                    obj.toggleSelectedTypes(xLocation);
                    obj.applyTypeFilters();
                }
            } else {
                obj.toggleSelectedTypes();
                obj.applyTypeFilters();
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

class FarmPage extends Page {
    DEFAULT_SETTINGS() {
        const d = {
            TYPE_APPEND: {}
        };
        // .TYPE_APPEND needs to be fully defined before it can be used in kNOWN_EXCEPTIONS
        for (let i = 0; i < Globals.TYPE_LIST.length; i++) {
            const type = Globals.TYPE_LIST[i];
            d.TYPE_APPEND[type.toUpperCase()] = '' + i;
        }
        d.TYPE_APPEND['NONE'] = '.' + Globals.TYPE_LIST.length;
        d.KNOWN_EXCEPTIONS = {} //TODO;
        return d;
    }
    constructor() {
        super(undefined, {}, 'farm#tab=1');
        this.defaultSettings = this.DEFAULT_SETTINGS(Globals);
        this.settings = this.defaultSettings;
        this.evolveListCache = '';
        const obj = this;
        this.observer = new MutationObserver(function() {
            obj.easyQuickEvolve();
            $('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
        });
    }
    setupHTML() {
        $(document).ready(function () {
            $('#farm-evolve>h3').after(`<label id="qolevolvenormal"><input type="button" class="qolsortnormal" value="Normal list"></label> <label id="qolchangesletype"><input type="button" class="qolsorttype" value="Sort on types"></label> <label id="qolsortevolvename"><input type="button" class="qolsortname" value="Sort on name"></label> <label id="qolevolvenew"><input type="button" class="qolsortnew" value="New dex entry"></label>`);
        });
    }
    setupObserver() {
        this.observer.observe(document.querySelector('#farmnews-evolutions'), {
            childList: true,
            characterdata: true,
            subtree: true,
            characterDataOldValue: true,
        });
    }
    setupHandlers() {
        const obj = this;
        $(document).on('click', '#qolevolvenormal', (function () {
            obj.easyEvolveNormalList();
        }));

        $(document).on('click', '#qolchangesletype', (function () {
            obj.easyEvolveTypeList();
        }));

        $(document).on('click', '#qolsortevolvename', (function () {
            obj.easyEvolveNameList();
        }));

        $(document).on('click', '#qolevolvenew', (function () {
            obj.easyEvolveNewList();
        }));
    }
    clearSortedEvolveLists() {
        // first remove the sorted pokemon type list to avoid duplicates
        $('.evolvepkmnlist').show();
        if (document.querySelector('.qolEvolveTypeList')) {
            document.querySelector('.qolEvolveTypeList').remove();
        }
        if (document.querySelector('.qolEvolveNameList')) {
            document.querySelector('.qolEvolveNameList').remove();
        }
        if (document.querySelector('.qolEvolveNewList')) {
            document.querySelector('.qolEvolveNewList').remove();
        }
    }
    easyEvolveNormalList() {
        this.clearSortedEvolveLists();
    }
    easyEvolveNameList() {
        this.clearSortedEvolveLists();
        $('.evolvepkmnlist').hide();

        document.querySelector('#farmnews-evolutions>.scrollable').insertAdjacentHTML('afterbegin', '<ul class="qolEvolveNameList">');

        let errorOccurred = false;
        $('.evolvepkmnlist>li').each(function (index) {
            // getting the <li> element from the pokemon & the pokemon evolved name
            const getEvolveString = $(this).html();
            if (getEvolveString === undefined || getEvolveString === '') {
                console.error(`Unable to parse html from <li> at index ${index}`);
                errorOccurred = true;
            } else {
                let beforeEvolvePokemon = $(this).children().children().text().slice(0, -6);
                if (beforeEvolvePokemon === undefined || beforeEvolvePokemon === '') {
                    console.error(`Unable to parse pokemon-evolving-from from <li> at index ${index}`);
                    errorOccurred = true;
                } else {
                    // remove extraneous whitespace
                    beforeEvolvePokemon = beforeEvolvePokemon.trim();
                    // use a regex to find extra whitespace between words
                    let whitespace = beforeEvolvePokemon.match(/\s{2,}/g);
                    while (whitespace) {
                        for (let i = whitespace.length - 1; i >= 0; i--) {
                            const match = whitespace[i];
                            beforeEvolvePokemon = beforeEvolvePokemon.replace(match, ' ');
                        }
                        whitespace = beforeEvolvePokemon.match(/\s{2,}/g);
                    }
                    let evolvePokemon = getEvolveString.substr(getEvolveString.indexOf('into</span> ') + 12);
                    if (evolvePokemon === undefined || evolvePokemon === '') {
                        console.error(`Unable to parse pokemon-evolving-to from <li> at index ${index}`);
                        errorOccurred = true;
                    } else {
                        // remove extraneous whitespace
                        evolvePokemon = evolvePokemon.trim();
                        // use a regex to find extra whitespace between words
                        whitespace = evolvePokemon.match(/\s{2,}/g);
                        while (whitespace) {
                            for (let i = whitespace.length - 1; i >= 0; i--) {
                                const match = whitespace[i];
                                evolvePokemon = evolvePokemon.replace(match, ' ');
                            }
                            whitespace = evolvePokemon.match(/\s{2,}/g);
                        }
                        // Replace all spaces with a character that is not part of any Pokemon's name, but is valid in a CSS selector
                        const evolvePokemonClass = evolvePokemon.replace(/ /g, '_').replace('[', '').replace(']', '').replace(/\./g, '');
                        if (evolvePokemonClass === undefined || evolvePokemonClass === '') {
                            console.error(`Unable to create valid CSS class for pokemon-evolving-to from <li> at index ${index}`);
                            errorOccurred = true;
                        } else {
                            if ($('.qolEvolveNameList>li>ul').hasClass(evolvePokemonClass) === false) {
                                document.querySelector('.qolEvolveNameList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">' +
                                    beforeEvolvePokemon + ' > ' + evolvePokemon +
                                    '</h3><ul class="' + evolvePokemonClass +
                                    ' qolChangeLogContent"></ul></li><br>');
                            } // class
                            $(this).clone().appendTo('.' + evolvePokemonClass + '');
                        } // evolvePokemonClass
                    } // evolvePokemon
                } // beforeEvolvePokemon
            } // getEvolveString
        });

        if (errorOccurred) {
            window.alert('Error occurred while sorting pokemon by name');
            return;
        }

        $('#.qolEvolveNameList>li').each(function (index) {
            const amountOfEvolves = $(this).children().children().length;
            if (amountOfEvolves === 0) {
                console.error(`Found 0 evolutions for <li> at ${index} of evolve name list`);
                errorOccurred = true;
            } else {
                const getEvolveString = $(this).children().children().html();
                if (getEvolveString === undefined || getEvolveString === '') {
                    console.error(`Unable to parse evolve string from <li> at ${index} from evolve name list`);
                    errorOccurred = true;
                } else {
                    const beforeEvolvePokemon = $(this).children().children().children().children().first().text(); // .split(' ').join('');

                    if (beforeEvolvePokemon === undefined || beforeEvolvePokemon === '') {
                        console.error(`Unable to parse pokemon-evolving-from from <li> at ${index} from evolve name list`);
                        errorOccurred = true;
                    } else {
                        const evolvePokemon = getEvolveString.substr(getEvolveString.indexOf('into</span> ') + 'into</span> '.length);
                        if (evolvePokemon === undefined || evolvePokemon === '') {
                            console.error(`Unable to parse pokemon-evolving-to from <li> at ${index} from evolve name list`);
                            errorOccurred = true;
                        } else {
                            $(this).children('.slidermenu').html(beforeEvolvePokemon + ' > ' + evolvePokemon + ' (' + amountOfEvolves + ')');
                        }
                    }
                } // getEvolveString
            } // amountOfEvolves
        });

        if (errorOccurred) {
            window.alert('Error occurred while sorting pokemon by name');
            return;
        }

        //layout of the created html
        const typeBackground = $('.panel>h3').css('background-color');
        const typeBorder = $('.panel>h3').css('border');
        const typeColor = $('.panel>h3').css('color');
        $('.expandlist').css('background-color', '' + typeBackground + '');
        $('.expandlist').css('border', '' + typeBorder + '');
        $('.expandlist').css('color', '' + typeColor + '');

        const typeListBackground = $('.tabbed_interface>div').css('background-color');
        const typeListColor = $('.tabbed_interface>div').css('color');
        $('.qolChangeLogContent').css('background-color', '' + typeListBackground + '');
        $('.qolChangeLogContent').css('color', '' + typeListColor + '');
    }
    easyEvolveNewList() {
        const dexData = this.POKEDEX.DEX_DATA;

        this.clearSortedEvolveLists();
        $('.evolvepkmnlist').hide();

        document.querySelector('#farmnews-evolutions>.scrollable').insertAdjacentHTML('afterbegin', '<ul class="qolEvolveNewList">');

        const getNewCheckData = (name) => {
            const nameIndex = dexData.indexOf('"' + name + '"');
            const checkData = (nameIndex > -1 && dexData.length > nameIndex + 9) ?
                dexData.slice(nameIndex + 5, nameIndex + 10) :
                [undefined, undefined, undefined, undefined, undefined];
            if (checkData[4] !== undefined) {
                checkData[4] = checkData[4].replace(']', '');
            }
            return checkData;
        };

        const createListElements = (cls, header, name, elem) => {
            if ($('.qolEvolveNewList>li>ul').hasClass(cls) === false) {
                const html = '<li class="expandlist">' +
                    `<h3 class="slidermenu">${header}</h3>` +
                    `<ul class="${cls} qolChangeLogContent"></ul></li><br>`;
                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', html);
            }

            if ($(`.qolEvolveNewList>li>.${cls}>li:contains(${name})`).length == 0) {
                $(elem).clone().appendTo(`.${cls}`);
            }
        };

        $('.evolvepkmnlist>li').each(function () { //the actual search
            // getting the <li> element from the pokemon & the pokemon evolved name
            const getEvolveString = $(this).html();

            // every pokemon is a normal unless shiny, albino or melanistic pokemon is found
            let pokemonIsNormal = true;
            let pokemonIsShiny = false;
            let pokemonIsAlbino = false;
            let pokemonIsMelanistic = false;

            if (getEvolveString.includes('title="[SHINY]')) {
                pokemonIsShiny = true;
                pokemonIsNormal = false;
            }
            if (getEvolveString.includes('title="[ALBINO]')) {
                pokemonIsAlbino = true;
                pokemonIsNormal = false;
            }
            if (getEvolveString.includes('title="[MELANISTIC]')) {
                pokemonIsMelanistic = true;
                pokemonIsNormal = false;
            }

            let evolvePokemonName = getEvolveString.substr(getEvolveString.indexOf('into</span> ') + 'into</span>'.length).trim();
            // use a regex to find extra whitespace between words
            let whitespace = evolvePokemonName.match(/\s{2,}/g);
            while (whitespace) {
                for (let i = whitespace.length - 1; i >= 0; i--) {
                    const match = whitespace[i];
                    evolvePokemonName = evolvePokemonName.replace(match, ' ');
                }
                whitespace = evolvePokemonName.match(/\s{2,}/g);
            }
            const evolvePokemonNameIndex = dexData.indexOf('"' + evolvePokemonName + '"');
            const evolvePokemonNameInDex = evolvePokemonNameIndex != -1;

            const [evolveNewTotal, evolveNewCheck,
                evolveNewShinyCheck, evolveNewAlbinoCheck,
                evolveNewMelaCheck] = getNewCheckData(evolvePokemonName);

            const [evolvePokemonNameOne, pokemonDexKeepSecondName,
                pokemonDexKeepThirdName, pokemonDexKeepFourthName,
                pokemonDexKeepFifthName, pokemonDexKeepSixthName] = evolvePokemonName.split(' ');
            const [evolveNewTotalOne, evolveNewCheckOne, /* ignore */, /* ignore */, /* ignore */] = getNewCheckData(evolvePokemonNameOne);
            /*
             * if a pokemon has a name like gligar [Vampire] it won't be found. This tries to change the name as it's recorded in the pokedex data array
             * The remaining checks are a (not great) way of checking for names with '/' in them.
             * PFQ uses '/' in the names of PFQ variants and in PFQ exclusives with multiple forms
             * Example of evolvePokemonNameTwoBefore: 'Gliscor/Vampire'
             * Regex: \w+/\w+
             */
            const evolvePokemonNameTwo = (evolvePokemonNameOne + '/' + pokemonDexKeepSecondName).replace('[', '').replace(']', '');
            const [evolveNewTotalTwo, evolveNewCheckTwo,
                evolveNewShinyCheckTwo, evolveNewAlbinoCheckTwo,
                evolveNewMelaCheckTwo] = getNewCheckData(evolvePokemonNameTwo);

            /*
             * Example of evolvePokemonNameThreeBefore: 'Phasmaleef/Forest Forme\'
             * Regex: \w+/\w+ \w+
             */
            const evolvePokemonNameThree = (evolvePokemonNameOne + '/' +
                pokemonDexKeepSecondName + ' ' +
                pokemonDexKeepThirdName).replace('[', '').replace(']', '');
            const [evolveNewTotalThree, evolveNewCheckThree,
                evolveNewShinyCheckThree, evolveNewAlbinoCheckThree,
                evolveNewMelaCheckThree] = getNewCheckData(evolvePokemonNameThree);

            /*
             * Example of evolvePokemonNameFourBefore: 'Butterfree/Mega Forme Q'
             * Regex: \w+/\w+ \w+ \w+
             */
            const evolvePokemonNameFour = (evolvePokemonNameOne + '/' +
                pokemonDexKeepSecondName + ' ' +
                pokemonDexKeepThirdName + ' ' +
                pokemonDexKeepFourthName).replace('[', '').replace(']', '');
            const [evolveNewTotalFour, evolveNewCheckFour,
                evolveNewShinyCheckFour, evolveNewAlbinoCheckFour,
                evolveNewMelaCheckFour] = getNewCheckData(evolvePokemonNameFour);

            /*
             * Example of evolvePokemonNameFiveBefore: 'Marowak/Alolan Mega Forme Q'
             * Regex: \w+/\w+ \w+ \w+ \w+
             */
            const evolvePokemonNameFive = (evolvePokemonNameOne + '/' +
                pokemonDexKeepSecondName + ' ' +
                pokemonDexKeepThirdName + ' ' +
                pokemonDexKeepFourthName + ' ' +
                pokemonDexKeepFifthName).replace('[', '').replace(']', '');
            const [evolveNewTotalFive, evolveNewCheckFive,
                evolveNewShinyCheckFive, evolveNewAlbinoCheckFive,
                evolveNewMelaCheckFive] = getNewCheckData(evolvePokemonNameFive);

            /*
             * Couldn't find any examples of pokemon that match evolvePokemonNameSixBefore
             * Regex: \w+/\w+ \w+ \w+ \w+ \w+
             */
            const evolvePokemonNameSix = (evolvePokemonNameOne + '/' +
                pokemonDexKeepSecondName + ' ' +
                pokemonDexKeepThirdName + ' ' +
                pokemonDexKeepFourthName + ' ' +
                pokemonDexKeepFifthName + ' ' +
                pokemonDexKeepSixthName).replace('[', '').replace(']', '');
            const [evolveNewTotalSix, evolveNewCheckSix,
                evolveNewShinyCheckSix, evolveNewAlbinoCheckSix,
                evolveNewMelaCheckSix] = getNewCheckData(evolvePokemonNameSix);

            //prep done now the search
            if (evolvePokemonNameInDex) { //Looks for the Pokémon name in which it evolves to check if it's in your Pokédex
                if (pokemonIsNormal == true) { //normal Pokémon search
                    if (evolveNewCheckOne == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements('newpokedexentry', 'New Pokédex entry', evolvePokemonName, this);
                    } else if (evolveNewTotal > evolveNewCheck && evolveNewCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                        createListElements('newpossiblepokedexentry', 'Possible Mega/Totem forme', evolvePokemonName, this);
                    }
                    // the rest of the pokemon that could be found by name are pokemon that you already have in the dex
                } else if (pokemonIsShiny == true) { //shiny Pokemon search
                    if (evolveNewShinyCheck == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements('newshinypokedexentry', 'New Shiny Pokédex entry', evolvePokemonName, this);
                    } else if (evolveNewTotal > evolveNewShinyCheck && evolveNewShinyCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                        createListElements('newpossibleshinypokedexentry', 'Possible Shiny Mega/Totem forme', evolvePokemonName, this);
                    }
                    // the rest of the pokemon that could be found by name are pokemon that you already have in the dex
                } else if (pokemonIsAlbino == true) { //albino pokemon search
                    if (evolveNewAlbinoCheck == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements('newalbinopokedexentry', 'New Albino Pokédex entry', evolvePokemonName, this);
                    } else if (evolveNewTotal > evolveNewAlbinoCheck && evolveNewAlbinoCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                        createListElements('newpossiblealbinopokedexentry', 'Possible Albino Mega/Totem forme', evolvePokemonName, this);
                    }
                    // the rest of the pokemon that could be found by name are pokemon that you already have in the dex
                } else if (pokemonIsMelanistic == true) { //melanistic pokemon search
                    if (evolveNewMelaCheck == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements('newmelanisticpokedexentry', 'New Melanistic Pokédex entry', evolvePokemonName, this);
                    } else if (evolveNewTotal > evolveNewMelaCheck && evolveNewMelaCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                        createListElements('newpossiblemelanisticpokedexentry', 'Possible Melanistic Mega/Totem forme', evolvePokemonName, this);
                    }
                    // the rest of the pokemon that could be found by name are pokemon that you already have in the dex
                }

                //Looks for the Pokémon name in which it evolves to check if it's in your Pokédex
            } else {
                if (pokemonIsNormal == true) {
                    if (evolveNewCheckTwo == 0 || evolveNewCheckThree == 0 || evolveNewCheckFour == 0 || evolveNewCheckFive == 0 || evolveNewCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements('newpokedexentry', 'New Pokédex entry', evolvePokemonName, this);
                    } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                        if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                            createListElements('possiblealolan', 'Possible new Alolan entry', evolvePokemonName, this);
                        }
                    } else if (evolvePokemonName.indexOf('[') >= 0) {
                        if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"' + evolvePokemonNameOne + '"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                            createListElements('possibledifferent', 'Possible new forme/cloak entry', evolvePokemonName, this);
                        } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                            createListElements('newpokedexentry', 'New Pokédex entry', evolvePokemonName, this);
                        }

                    } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                        createListElements('newpokedexentry', 'New Pokédex entry', evolvePokemonName, this);
                    } else {
                        createListElements('errornotfound', 'Error: not found', evolvePokemonName, this);
                    }
                } else if (pokemonIsShiny == true) {
                    if (evolveNewShinyCheckTwo == 0 || evolveNewShinyCheckThree == 0 || evolveNewShinyCheckFour == 0 || evolveNewShinyCheckFive == 0 || evolveNewShinyCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements('newshinypokedexentry', 'New Shiny Pokédex entry', evolvePokemonName, this);
                    } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                        if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                            createListElements('possibleshinyalolan', 'Possible new Shiny Alolan entry', evolvePokemonName, this);
                        }
                    } else if (evolvePokemonName.indexOf('[') >= 0) {
                        if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"' + evolvePokemonNameOne + '"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                            createListElements('possibleshinydifferent', 'Possible new Shiny forme/cloak entry', evolvePokemonName, this);
                        } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                            createListElements('newshinypokedexentry', 'New Shiny Pokédex entry', evolvePokemonName, this);
                        }
                    } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                        createListElements('newshinypokedexentry', 'New Shiny Pokédex entry', evolvePokemonName, this);
                    } else {
                        createListElements('errornotfound', 'Error: not found', evolvePokemonName, this);
                    }
                } else if (pokemonIsAlbino == true) {
                    if (evolveNewAlbinoCheckTwo == 0 || evolveNewAlbinoCheckThree == 0 || evolveNewAlbinoCheckFour == 0 || evolveNewAlbinoCheckFive == 0 || evolveNewAlbinoCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements('newalbinopokedexentry', 'New Albino Pokédex entry', evolvePokemonName, this);
                    } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                        if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                            createListElements('possiblealbinoalolan', 'Possible new Albino Alolan entry', evolvePokemonName, this);
                        }
                    } else if (evolvePokemonName.indexOf('[') >= 0) {
                        if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"' + evolvePokemonNameOne + '"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                            createListElements('possiblealbinodifferent', 'Possible new Albino forme/cloak entry', evolvePokemonName, this);
                        } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                            createListElements('newalbinopokedexentry', 'New Albino Pokédex entry', evolvePokemonName, this);
                        }
                    } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                        createListElements('newalbinopokedexentry', 'New Albino Pokédex entry', evolvePokemonName, this);
                    } else {
                        createListElements('errornotfound', 'Error: not found', evolvePokemonName, this);
                    }

                } else if (pokemonIsMelanistic == true) {
                    if (evolveNewMelaCheckTwo == 0 || evolveNewMelaCheckThree == 0 || evolveNewMelaCheckFour == 0 || evolveNewMelaCheckFive == 0 || evolveNewMelaCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                        createListElements('newmelanisticpokedexentry', 'New Melanistic Pokédex entry', evolvePokemonName, this);
                    } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                        if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                            createListElements('possiblemelanalolan', 'Possible new Melanistic Alolan entry', evolvePokemonName, this);
                        }
                    } else if (evolvePokemonName.indexOf('[') >= 0) {
                        if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"' + evolvePokemonNameOne + '"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                            createListElements('possiblemelandifferent', 'Possible new Melanistic forme/cloak entry', evolvePokemonName, this);
                        } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                            createListElements('newmelanisticpokedexentry', 'New Melanistic Pokédex entry', evolvePokemonName, this);
                        }
                    } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                        createListElements('newmelanisticpokedexentry', 'New Melanistic Pokédex entry', evolvePokemonName, this);
                    } else {
                        createListElements('errornotfound', 'Error: not found', evolvePokemonName, this);
                    }
                }
            }
        });

        //layout
        const typeBackground = $('.panel>h3').css('background-color');
        const typeBorder = $('.panel>h3').css('border');
        const typeColor = $('.panel>h3').css('color');
        $('.expandlist').css('background-color', '' + typeBackground + '');
        $('.expandlist').css('border', '' + typeBorder + '');
        $('.expandlist').css('color', '' + typeColor + '');

        const typeListBackground = $('.tabbed_interface>div').css('background-color');
        const typeListColor = $('.tabbed_interface>div').css('color');
        $('.qolChangeLogContent').css('background-color', '' + typeListBackground + '');
        $('.qolChangeLogContent').css('color', '' + typeListColor + '');
    }
    easyQuickEvolve() {
        const parent = $('.canevolve:contains("evolved into")').parent();
        if (parent.length != 0) {
            parent.remove();
        }
    }
    easyEvolveTypeList() {
        const obj = this;
        const dexData = this.POKEDEX.DEX_DATA;

        this.clearSortedEvolveLists();
        $('.evolvepkmnlist').hide();

        const typeBackground = $('.panel>h3').css('background-color');
        $('.evolvepkmnlist').before(Resources.evolveFastHTML());

        const typeBorder = $('.panel>h3').css('border');
        const typeColor = $('.panel>h3').css('color');
        $('.expandlist').css('background-color', '' + typeBackground + '');
        $('.expandlist').css('border', '' + typeBorder + '');
        $('.expandlist').css('color', '' + typeColor + '');

        const typeListBackground = $('.tabbed_interface>div').css('background-color');
        const typeListColor = $('.tabbed_interface>div').css('color');
        $('.qolChangeLogContent').css('background-color', '' + typeListBackground + '');
        $('.qolChangeLogContent').css('color', '' + typeListColor + '');

        /* Nested helper function */
        const getEvolutionOrigin = function (evoString) {
            const summary = '/summary/';
            const originStart = evoString.indexOf(summary) + summary.length + 7;
            const originEnd = evoString.indexOf('</a>');
            return evoString.substring(originStart, originEnd);
        };

        const getEvolutionDestination = function (evoString) {
            const destStart = evoString.indexOf('into</span>') + 'into</span>'.length;
            return evoString.substr(destStart).trim();
        };

        const appendDeltaTypeIfDelta = function (evoString, elemToAppendTo) {
            if (evoString.includes('title="[DELTA')) {
                const deltaType = evoString.match('DELTA-(.*)]">');
                $(elemToAppendTo).clone().appendTo(obj.settings.TYPE_APPEND[deltaType[1]]);
            }
        };

        $('.evolvepkmnlist>li').each(function () {
            // getting the <li> element from the pokemon & the pokemon evolved name
            const getEvolveString = $(this).html();
            let previousPokemon = getEvolutionOrigin(getEvolveString);
            const evolvePokemon = getEvolutionDestination(getEvolveString);

            // Handle unicode characters
            previousPokemon = previousPokemon
                .replace(/é/g, '\\u00e9')
                .replace(/í/g, '\\u00ed')
                .replace(/ñ/g, '\\u00f1');

            // Handle evolvePokemon name formatting
            let evolveFormatted = evolvePokemon.replace(' [', '/');
            evolveFormatted = evolveFormatted.replace(']', '');

            const previousIndex = dexData.indexOf('"' + previousPokemon + '"');
            const evolveIndex = dexData.indexOf('"' + evolveFormatted + '"');

            const previousInDex = previousIndex != -1;
            const evolveInDex = evolveIndex != -1;
            const evolveInExceptions = evolvePokemon in obj.settings.KNOWN_EXCEPTIONS;
            let evolveTypesPrevious = [];
            let evolveTypes = [];

            /*
             * Procedure
             * 1. If the evolution destination is in the known exceptions list
             *    a. Load the types from KNOWN_EXCEPTIONS
             * 2. Else:
             *    a. If the evolution origin is in the dex, load the types from the dex
             *    b. If the evolution origin is not in the dex, mark the type as '18' (not a valid type)
             *    c. If the destination pokemon is in the dex, load the types from the dex
             *    d. Else, mark the type as '18' (not a valid type)
             * 3. Use types to apply HTML classes to the list item that contains the current evolution
             *    a. Use the evolution origin's and destination's types as HTML classes
             *    b. If the origin pokemon is a Delta mon, use the delta type as an HTML class as well
             */

            if(evolveInExceptions) {
                evolveTypes = obj.settings.KNOWN_EXCEPTIONS[evolvePokemon].map((t) => '' + t);
                // short circuit the previous pokemon's types, since the KNOWN_EXCEPTIONS table will have everything
                evolveTypesPrevious = evolveTypes;
            }
            else {
                if (previousInDex) {
                    evolveTypesPrevious = [1, 2].map((i) => dexData[previousIndex + i]);
                }
                else {
                    evolveTypesPrevious = ['18', '-1'];
                }

                if (evolveInDex) {
                    evolveTypes = [1, 2].map((i) => dexData[evolveIndex + i]);
                }
                else {
                    evolveTypes = ['18', '-1'];
                }
            }

            /*
             * the evolveTypes and evolveTypesPrevious entries can begin with a '.'
             * in some cases. Just strip it off
             */
            evolveTypesPrevious = evolveTypesPrevious.map((t) => t.replace('.', ''));
            evolveTypes = evolveTypes.map((t) => t.replace('.', ''));

            // filter out invalid 2nd types (will be -1)
            evolveTypesPrevious = evolveTypesPrevious.filter((t) => t !== '-1');
            evolveTypes = evolveTypes.filter((t) => t !== '-1');

            // append types to DOM
            const elem = this;
            // add unknown source types
            if(evolveTypesPrevious   .includes('18')) {
                $(elem).clone().appendTo('.18source');
            }
            // add unknown target types
            if(evolveTypes.includes('18')) {
                $(elem).clone().appendTo('.18target');
            }
            const combinedValidTypes = [...evolveTypesPrevious, ...evolveTypes]
                .filter((t, i, self) => t != '18' && self.indexOf(t) === i);
            combinedValidTypes.map((t) => {
                $(elem).clone().appendTo(`.${t}`);
            });

            appendDeltaTypeIfDelta(getEvolveString, this);
        }); // each

        $('.qolEvolveTypeList>li').each(function () {
            const amountOfEvolves = $(this).children().children().length;
            const evolveTypeName = $(this).children('.slidermenu').html();

            // hide the types with no evolutions
            if (amountOfEvolves === 0) {
                this.nextSibling.hidden = true;
                this.hidden = true;
            } else {
                $(this).children('.slidermenu').html(evolveTypeName + ' (' + amountOfEvolves + ')');
            }
        });
    }
}

class FishingPage extends Page {
    constructor() {
        super(undefined, {}, 'fishing');
        // no observer
    }
    setupHTML() {
        const caughtFishLabel = document.querySelector('#caughtfishcontainer label');
        if(caughtFishLabel) {
            caughtFishLabel.insertAdjacentHTML('afterend', Resources.massReleaseSelectHTML());
        }
    }
    setupHandlers() {
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
  constructor() {
      super(undefined, {}, 'interactions');
  } // constructor

  setupHTML() {
    // add 50 clickback link to sent interactions section
    let names = "";
    let lists = document.getElementsByClassName('userlist');
    let lastList = lists[lists.length-1];
    if(lastList.parentElement.previousElementSibling.innerText == "Sent"){
      let nameElements = lastList.childNodes;
      let overFifty = false;
      for(let i=0; i<nameElements.length; i++){
        if(i>=50){
          overFifty = true;
          break;
        }
        if(i!=0){
          names+=",";
        }
        let userUrl = nameElements[i].lastChild.href;
        let name = userUrl.split("/user/")[1];
        names+=name;
      }
      let url = "https://pokefarm.com/users/"+names;
      let newP = document.createElement("p");
      let newLink = document.createElement("a");
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
    constructor() {
        const defaultPageSettings = {
            findLabEgg: '', // same as findCustom in shelter
            customEgg: true,
            findLabType: '', // same as findType in shelter
            findTypeEgg: true,
        };
        super(Globals.LAB_PAGE_SETTINGS_KEY, defaultPageSettings, 'lab');
        this.searchArray = [];
        this.typeArray = [];
        const obj = this;
        this.observer = new MutationObserver(function () {
            obj.customSearch();
        });
    }

    setupHTML() {
        document.querySelector('#eggsbox360>p.center').insertAdjacentHTML('afterend', Resources.labOptionsHTML());
        document.querySelector('#egglist').insertAdjacentHTML('afterend', '<div id="labsuccess"></div>');

        const theField = Helpers.textSearchDiv('numberDiv', 'findLabEgg', 'removeLabSearch', 'searchArray');
        const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'findLabType', Globals.TYPE_OPTIONS,
            'removeLabTypeList', 'labTypes', 'typeArray');

        this.searchArray = this.settings.findLabEgg.split(',');
        this.typeArray = this.settings.findLabType.split(',');

        Helpers.setupFieldArrayHTML(this.searchArray, 'searchkeys', theField, 'numberDiv');
        Helpers.setupFieldArrayHTML(this.typeArray, 'labTypes', theType, 'typeNumber');
    }
    setupCSS() {
        //lab css
        const labSuccessCss = $('#labpage>div').css('background-color');
        $('#labsuccess').css('background-color', labSuccessCss);
    }
    setupObserver() {
        this.observer.observe(document.querySelector('#labpage>div>div>div'), {
            childList: true,
            characterdata: true,
            subtree: true,
            characterDataOldValue: true,
        });
    }
    setupHandlers() {
        const obj = this;
        $(document).on('click', '#addLabSearch', (function () { //add lab text field
            obj.addTextField();
        }));

        $(document).on('click', '#removeLabSearch', (function () { //remove lab text field
            obj.removeTextField(this, $(this).parent().find('input').val());
            obj.saveSettings();
        }));

        $(document).on('click', '#addLabTypeList', (function () { //add lab type list
            obj.addTypeList();
        }));

        $(document).on('click', '#removeLabTypeList', (function () { //remove lab type list
            obj.removeTypeList(this, $(this).parent().find('select').val());
            obj.saveSettings();
        }));

        $(document).on('change', '#labCustomSearch input', (function () { //lab search
            obj.customSearch();
        }));

        $(document).on('click', '#labpage', (function () { //shelter search
            obj.customSearch();
        }));

        $(document).on('input', '.qolsetting', (function () { //Changes QoL settings
            obj.settingsChange(this.getAttribute('data-key'),
                $(this).val(),
                $(this).parent().parent().attr('class'),
                $(this).parent().attr('class'),
                (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
            obj.customSearch();
            obj.saveSettings();
        }));

        $(window).on('load', (function () {
            obj.loadSettings();
            obj.customSearch();
        }));
    }
    addTextField() {
        const theField = Helpers.textSearchDiv('numberDiv', 'findLabEgg', 'removeLabSearch', 'searchArray');
        const numberDiv = $('#searchkeys>div').length;
        $('#searchkeys').append(theField);
        $('.numberDiv').removeClass('numberDiv').addClass('' + numberDiv + '');
    }
    removeTextField(byebye, key) {
        // when textfield is removed, the value will be deleted from the localstorage
        this.searchArray = $.grep(this.searchArray, function (value) {
            return value != key;
        });
        this.settings.findCustom = this.searchArray.toString();

        $(byebye).parent().remove();

        for (let i = 0; i < $('#searchkeys>div').length; i++) {
            const rightDiv = i + 1;
            $('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }
    }
    addTypeList() {
        const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'findLabType', Globals.TYPE_OPTIONS,
            'removeLabTypeList', 'labTypes', 'typeArray');
        const numberTypes = $('#labTypes>div').length;
        $('#labTypes').append(theType);
        $('.typeNumber').removeClass('typeNumber').addClass('' + numberTypes + '');
    }
    removeTypeList(byebye, key) {
        this.typeArray = $.grep(this.typeArray, function (value) {
            return value != key;
        });
        this.settings.findType = this.typeArray.toString();

        $(byebye).parent().remove();

        for (let i = 0; i < $('#labTypes>div').length; i++) {
            const rightDiv = i + 1;
            $('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }
    }
    getTypesForEgg(searchPokemon) {
        const dexData = this.POKEDEX.DEX_DATA;
        const searchPokemonIndex = dexData.indexOf('"' + searchPokemon + '"');
        return [dexData[searchPokemonIndex + 1], dexData[searchPokemonIndex + 2]];
    }
    searchForEggsMatchingTypes() {
        const obj = this;
        const enabled = ((this.settings.findTypeEgg === true) &&
            (!(this.typeArray.length == 1 && this.typeArray[0] == '')));
        if (enabled) {
            const typesArrayNoEmptySpace = this.typeArray.filter(v => v != '');
            for (let i = 0; i < typesArrayNoEmptySpace.length; i++) {
                const value = typesArrayNoEmptySpace[i];
                const amountOfTypesFound = [];
                const typePokemonNames = [];

                $('#egglist>div>h3').each(function () {
                    const searchPokemon = $(this).text().split(' ')[0];
                    const [searchTypeOne, searchTypeTwo] = obj.getTypesForEgg(searchPokemon);
                    if (searchTypeOne === value) {
                        amountOfTypesFound.push('found');
                        typePokemonNames.push(searchPokemon);
                    }

                    if (searchTypeTwo === value) {
                        amountOfTypesFound.push('found');
                        typePokemonNames.push(searchPokemon);
                    }
                }); // each

                const foundType = Globals.TYPE_LIST[value];

                const typeImgStandOutLength = typePokemonNames.length;
                for (let o = 0; o < typeImgStandOutLength; o++) {
                    const value = typePokemonNames[o];
                    const shelterImgSearch = $('#egglist>div>h3:containsIN(' + value + ')');
                    const shelterBigImg = shelterImgSearch.next();
                    $(shelterBigImg).addClass('labfoundme');
                }

                if (amountOfTypesFound.length > 1) {
                    document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + amountOfTypesFound.length + ' ' + foundType + ' egg types found! (' + typePokemonNames.toString() + ')</div>');
                } else if (amountOfTypesFound.length == 1) {
                    document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + amountOfTypesFound.length + ' ' + foundType + ' egg type found! (' + typePokemonNames.toString() + ')</div>');
                }
            } // for
        } // if
    }
    searchForEggsMatchingCustom() {
        if (!(this.searchArray.length == 1 && this.searchArray[0] == '')) {
            if (this.settings.customEgg === true) {
                const searchArrayNoEmptySpace = this.searchArray.filter(v => v != '');
                for (let i = 0; i < searchArrayNoEmptySpace.length; i++) {
                    const value = searchArrayNoEmptySpace[i];
                    if ($('#egglist>div>h3:containsIN(' + value + ')').length) {
                        const searchResult = value;

                        const shelterImgSearch = $('#egglist>div>h3:containsIN(' + value + ')');
                        const shelterBigImg = shelterImgSearch.next();
                        $(shelterBigImg).addClass('labfoundme');

                        if ($('#egglist>div>h3:containsIN(' + value + ')').length > 1) {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png"></div>');
                        } else {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png"></div>');
                        }
                    } // if

                    if ($('#egglist>div img[src*="' + value + '"]').length) {
                        const searchResult = $('#egglist>div img[src*="' + value + '"]').prev().text();

                        const shelterImgSearch = $('#egglist>div img[src*="' + value + '"]');
                        $(shelterImgSearch).addClass('labfoundme');

                        if ($('#egglist>div img[src*="' + value + '"]').length > 1) {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png"></div>');
                        } else {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png"></div>');
                        }
                    } // if
                } // for
            } // if
        } // else
    }
    customSearch() {
        document.querySelector('#labsuccess').innerHTML = '';
        $('#egglist>div>img').removeClass('labfoundme');

        this.searchForEggsMatchingTypes();
        this.searchForEggsMatchingCustom();
    }
}

class MultiuserPage extends Page {
    constructor() {
        super(Globals.MULTIUSER_PAGE_SETTINGS_KEY, {
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
        }, 'users/');
        const obj = this;
        this.observer = new MutationObserver(function (mutations) {
            let doMod = false;
            mutations.forEach(function (mutation) {
                if($(mutation.target).attr('id') == 'partybox'){
                    // many mutations fire, so limit calls to party mod to prevent excess and looping calls
                    // #partybox is when the next button is added, making it a convenient time to run the mods
                    doMod = true;
                }
            });
            if(doMod) {
                obj.partyModification();
            }
        });
    }

    settingsChange(element, textElement, customClass, typeClass, arrayName) {
        if (super.settingsChange(element, textElement, customClass, typeClass, arrayName) === false) {
            return false;
        }

        const mutuallyExclusive = ['hideAll', 'hideDislike', 'niceTable', 'customParty'];
        const idx = mutuallyExclusive.indexOf(element);
        if (idx > -1) {
            for (let i = 0; i < mutuallyExclusive.length; i++) {
                if (i !== idx) {
                    this.settings[mutuallyExclusive[i]] = false;
                }
            }
            return true;
        }
        else { return false; }
    }
    setupHTML() {
        document.querySelector('#multiuser').insertAdjacentHTML('beforebegin', Resources.partyModHTML());
        document.querySelector('#multiuser').insertAdjacentHTML('beforebegin', Resources.partyModCustomHTML());
    }
    setupCSS() {
        const menuBackground = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('background-color');
        $('#qolpartymod').css('background-color', '' + menuBackground + '');
        const menuColor = $('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('color');
        $('#qolpartymod').css('color', '' + menuColor + '');
    }
    setupObserver() {
        // don't observe the whole party area as it may cause excess firing
        this.observer.observe(document.querySelector('#multiuser'), {
            childList: true,
            subtree: true,
        });
    }
    setupHandlers() {
        const obj = this;

        $(window).resize(function() {
            obj.loadSettings();
            setTimeout(() => {
                // the hide all alignment works better with the timeout
                obj.partyModification();
            }, 100);
        });

        $(document).on('change', '.qolsetting', (function () {
            obj.loadSettings();
            obj.settingsChange(this.getAttribute('data-key'),
                $(this).val(),
                $(this).parent().parent().attr('class'),
                $(this).parent().attr('class'));
            obj.saveSettings();
            obj.partyModification();
        }));

        $('input.qolalone').on('change', function () { //only 1 checkbox may be true
            $('input.qolalone').not(this).prop('checked', false);
        });

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
    sharedPartyMods() {
        $('#multiuser').addClass('qolPartyModded');
        // change any berry to sour so it gets a bg color
        $('.berrybuttons[data-up="any"]').attr('data-up','sour'); 
    }
    partyModification() {
        // first, remove any existing selection (all qol classes)
        let classList = document.getElementById('multiuser').className.split(/\s+/);
        for (let i = 0; i < classList.length; i++) {
            if (classList[i].match(/^qol/)) {
                $('#multiuser').removeClass(classList[i]);
            }
        }
        $('#qolpartymodcustom').css('display','none');
        $('.party .pkmn a.qolCompactLink').remove();

        const btns = $('#multiuser .party>div .action a');
        if(btns) {
            btns.css({"top":0,"left":0});
        }

        if (this.settings.hideDislike === true) {
            $('#multiuser').addClass('qolPartyHideDislike');
            this.sharedPartyMods();
        }

        if (this.settings.niceTable === true) {
            $('#multiuser').addClass('qolPartyNiceTable');
            this.sharedPartyMods();
        }

        if (this.settings.hideAll === true) {
            $('#multiuser').addClass('qolPartyHideAll');
            this.sharedPartyMods();
            const nextLink = $('.mu_navlink.next');
            // on chrome, sometimes .position() is undefined on load
            if(btns && nextLink && nextLink.position()) {
                btns.css(nextLink.position());
            }
        }

        if (this.settings.customParty === true) {
            $('#multiuser').addClass('qolPartyCustomParty');
            this.sharedPartyMods();
            $('#qolpartymodcustom').css('display','block');

            // differentiate next and more buttons
            let next = $('.mu_navlink.next');
            if(next.text() == 'Get more +') {
                next.addClass('qolGetMore');
            }
            else {
                next.addClass('qolGoNext');
            }

            // hide classes are inverted
            this.partymodHelper('qolStackNext',this.settings.stackNextButton === true);
            this.partymodHelper('qolStackMore',this.settings.stackMoreButton === true);
            this.partymodHelper('qolHideParty',this.settings.showPokemon === false);
            this.partymodHelper('qolCompactParty',this.settings.compactPokemon === true);
            this.partymodHelper('qolHideTrainerCard',this.settings.showTrainerCard === false);
            this.partymodHelper('qolHideFieldButton',this.settings.showFieldButton === false);
            this.partymodHelper('qolHideModeChecks',this.settings.showModeChecks === false);
            this.partymodHelper('qolHideUserName',this.settings.showUserName === false);

            // clickable compact pokemon
            if(this.settings.showPokemon === true 
                && this.settings.compactPokemon === true  
                && this.settings.clickablePokemon === true ) 
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
    partymodHelper(toggleClass, toggleSetting) {
        if(toggleSetting) {
            $('#multiuser').addClass(toggleClass);
        }
        else {
            $('#multiuser').removeClass(toggleClass);
        }
    }
}


class PrivateFieldsPage extends Page {
    constructor() {
        const defaultPageSettings = {
            fieldCustom: '',
            fieldType: '',
            fieldNature: '',
            fieldEggGroup: '',
            fieldNewPokemon: true,
            fieldShiny: true,
            fieldAlbino: true,
            fieldMelanistic: true,
            fieldPrehistoric: true,
            fieldDelta: true,
            fieldMega: true,
            fieldStarter: true,
            fieldCustomSprite: true,
            fieldMale: true,
            fieldFemale: true,
            fieldNoGender: true,
            fieldItem: true,
            customItem: true, // unused
            customEgg: true,
            customPokemon: true,
            customPng: false,
            /* tooltip settings */
            tooltipEnableMods: false,
            tooltipNoBerry: false,
            tooltipBerry: false,
        };
        super(Globals.PRIVATE_FIELDS_PAGE_SETTINGS_KEY, defaultPageSettings, 'fields');
        this.customArray = [];
        this.typeArray = [];
        this.natureArray = [];
        this.eggGroupArray = [];
        const obj = this;
        this.observer = new MutationObserver(() => {
            obj.customSearch();
            if(obj.USER_SETTINGS.privateFieldFeatureEnables.tooltip) {
                obj.handleTooltipSettings();
            }
        });
    }

    onPage(w) {
        return w.location.href.indexOf('fields') != -1 &&
            w.location.href.indexOf('fields/') == -1;
    }

    setupHTML() {
        if(this.USER_SETTINGS.privateFieldFeatureEnables.search) {
            document.querySelector('#field_field').insertAdjacentHTML('afterend', Resources.privateFieldSearchHTML());
            const theField = Helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray');
            const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'fieldType', Globals.TYPE_OPTIONS,
                'removePrivateFieldTypeSearch', 'fieldTypes', 'typeArray');
            const theNature = Helpers.selectSearchDiv('natureNumber', 'natures', 'fieldNature', Globals.NATURE_OPTIONS,
                'removePrivateFieldNature', 'natureTypes', 'natureArray');
            const theEggGroup = Helpers.selectSearchDiv('eggGroupNumber', 'eggGroups', 'fieldEggGroup', Globals.EGG_GROUP_OPTIONS,
                'removePrivateFieldEggGroup', 'eggGroupTypes', 'eggGroupArray');
            this.customArray = this.settings.fieldCustom.split(',');
            this.typeArray = this.settings.fieldType.split(',');
            this.natureArray = this.settings.fieldNature.split(',');
            this.eggGroupArray = this.settings.fieldEggGroup.split(',');
            Helpers.setupFieldArrayHTML(this.customArray, 'searchkeys', theField, 'numberDiv');
            Helpers.setupFieldArrayHTML(this.typeArray, 'fieldTypes', theType, 'typeNumber');
            Helpers.setupFieldArrayHTML(this.natureArray, 'natureTypes', theNature, 'natureNumber');
            Helpers.setupFieldArrayHTML(this.eggGroupArray, 'eggGroupTypes', theEggGroup, 'eggGroupNumber');
        }

        if(this.USER_SETTINGS.privateFieldFeatureEnables.release) {
            /* nothing here */
        }

        if(this.USER_SETTINGS.privateFieldFeatureEnables.tooltip) {
            document.querySelector('#field_field').insertAdjacentHTML('beforebegin', Resources.privateFieldTooltipModHTML());
            this.handleTooltipSettings();
        }

        if(this.USER_SETTINGS.privateFieldFeatureEnables.pkmnlinks) {
            Helpers.addPkmnLinksPopup();
        }
    }
    setupCSS() {
        // same as public fields
        const fieldOrderCssColor = $('#field_field').css('background-color');
        const fieldOrderCssBorder = $('#field_field').css('border');
        $('#fieldorder').css('background-color', '' + fieldOrderCssColor + '');
        $('#fieldorder').css('border', '' + fieldOrderCssBorder + '');
        $('#fieldsearch').css('background-color', '' + fieldOrderCssColor + '');
        $('#tooltipenable').css('max-width', '600px');
        $('#tooltipenable').css('position', 'relative');
        $('#tooltipenable').css('margin', '16px auto');
        $('.collapsible').css('background-color', '' + fieldOrderCssColor + '');
        $('.collapsible').css('border', '' + fieldOrderCssBorder + '');
        $('.collapsible_content').css('background-color', '' + fieldOrderCssColor + '');

        $('.tooltiptext').css('background-color', $('.tooltip_content').eq(0).css('background-color'));
        $('.tooltiptext').css('border', '' + fieldOrderCssBorder + '');

        /*
         * Issue #47 - Since the default Pokefarm CSS for buttons does not use the same color
         * settings as most of the text on the site, manually set the text color for
         * '.collapsible' to match the text around it
         */
        $('.collapsible').css('color', $('#content').find('h1').eq(0).css('color'));
    }
    setupObserver() {
        this.observer.observe(document.querySelector('#field_field'), {
            childList: true,
            characterdata: true,
            subtree: true,
            characterDataOldValue: true,
        });
    }
    setupHandlers() {
        const obj = this;
        $(window).on('load', (() => {
            obj.loadSettings();
            obj.customSearch();
            if(obj.USER_SETTINGS.privateFieldFeatureEnables.tooltip) {
                obj.handleTooltipSettings();
            }
            obj.saveSettings();
        }));

        $(document).on('load', '.field', (function () {
            obj.customSearch();
        }));

        if(obj.USER_SETTINGS.privateFieldFeatureEnables.release) {
            $(document).on('click', '*[data-menu="release"]', (function (e) { //select all feature
                e.stopPropagation();
                obj.enableMoveReleaseControls();
            }));
            $(document).on('click', '*[data-menu="bulkmove"]', (function () { // select all feature
                obj.enableMoveReleaseControls();
            }));
        }

        if(obj.USER_SETTINGS.privateFieldFeatureEnables.search) {
            $(document).on('click', '#addPrivateFieldTypeSearch', (function (e) { //add field type list
                e.stopPropagation();
                obj.addSelectSearch('typeNumber', 'types', 'fieldType', Globals.TYPE_OPTIONS, 'removePrivateFieldTypeSearch', 'fieldTypes', 'typeArray');
                obj.customSearch();
            }));

            $(document).on('click', '#removePrivateFieldTypeSearch', (function (e) { //remove field type list
                e.stopPropagation();
                obj.typeArray = obj.removeSelectSearch(obj.typeArray, this, $(this).parent().find('select').val(), 'fieldType', 'fieldTypes');
                obj.saveSettings();
                obj.customSearch();
            }));

            $(document).on('click', '#addPrivateFieldNatureSearch', (function (e) { //add field nature search
                e.stopPropagation();
                obj.addSelectSearch('natureNumber', 'natures', 'fieldNature', Globals.NATURE_OPTIONS, 'removePrivateFieldNature', 'natureTypes', 'natureArray');
                obj.customSearch();
            }));

            $(document).on('click', '#removePrivateFieldNature', (function (e) { //remove field nature search
                e.stopPropagation();
                obj.natureArray = obj.removeSelectSearch(obj.natureArray, this, $(this).parent().find('select').val(), 'fieldNature', 'natureTypes');
                obj.saveSettings();
                obj.customSearch();
            }));

            $(document).on('click', '#addPrivateFieldEggGroupSearch', (function (e) { //add egg group nature search
                e.stopPropagation();
                obj.addSelectSearch('eggGroupNumber', 'eggGroups', 'fieldEggGroup', Globals.EGG_GROUP_OPTIONS, 'removePrivateFieldEggGroup', 'eggGroupTypes', 'eggGroupArray');
                obj.customSearch();
            }));

            $(document).on('click', '#removePrivateFieldEggGroup', (function (e) { //remove egg group nature search
                e.stopPropagation();
                obj.eggGroupArray = obj.removeSelectSearch(obj.eggGroupArray, this, $(this).parent().find('select').val(), 'fieldEggGroup', 'eggGroupTypes');
                obj.saveSettings();
                obj.customSearch();
            }));

            $(document).on('click', '#addTextField', (function (e) {
                e.stopPropagation();
                obj.addTextField();
                obj.saveSettings();
            }));

            $(document).on('click', '#removeTextField', (function (e) {
                e.stopPropagation();
                obj.removeTextField(this, $(this).parent().find('input').val());
                obj.saveSettings();
                obj.customSearch();
            }));
        }

        if(obj.USER_SETTINGS.privateFieldFeatureEnables.tooltip) {
            $('.tooltipsetting[data-key=tooltipEnableMods]').on('click', function () {
                obj.loadSettings();
                obj.handleTooltipSettings();
                obj.saveSettings();
            });

            $('.tooltipsetting[data-key=tooltipNoBerry]').on('click', function () {
                obj.loadSettings();
                obj.handleTooltipSettings();
                obj.saveSettings();
            });
        }

        $(document).on('change', '.qolsetting', (function () {
            obj.loadSettings();
            obj.customSearch();
            obj.saveSettings();
        }));

        $(document).on('input', '.qolsetting', (function () { //Changes QoL settings
            obj.settingsChange(this.getAttribute('data-key'),
                $(this).val(),
                $(this).parent().parent().attr('class'),
                $(this).parent().attr('class'),
                (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
            obj.customSearch();
            obj.saveSettings();
        }));

        $('.collapsible').on('click', function () {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    }
    handleTooltipSettings() {
        const obj = this;
        if ($('.tooltipsetting[data-key=tooltipEnableMods]').prop('checked')) {
            // make sure checkboxes are enabled
            $('.tooltipsetting[data-key=tooltipNoBerry]').prop('disabled', false);

            // use the correct setting to turn on the tooltips based on the berries
            if ($('.tooltipsetting[data-key=tooltipNoBerry]').prop('checked')) { obj.disableTooltips(); }
            else { obj.enableTooltips(); }
        } else {
            $('.tooltipsetting[data-key=tooltipNoBerry]').prop('disabled', true);
            // if tooltipNoBerry was checked before the mods were disabled, reenable the tooltips
            if ($('.tooltipsetting[data-key=tooltipNoBerry]').prop('checked')) {
                obj.enableTooltips();
            }
        }
    }
    disableTooltips() {
        $('#field_field>div.field>.fieldmon').removeAttr('data-tooltip').removeClass('tooltip_trigger');
    }
    enableTooltips() {
        $('#field_field>div.field>.fieldmon').attr('data-tooltip', '');
    }
    searchForImgTitle(key) {
        const SEARCH_DATA = Globals.SHELTER_SEARCH_DATA;
        const keyIndex = SEARCH_DATA.indexOf(key);
        const value = SEARCH_DATA[keyIndex + 1];
        const selected = $('img[title*="' + value + '"]');
        if (selected.length) {
            // next line different from shelter
            const bigImg = selected.parent().parent().parent().parent().prev().children('img');
            $(bigImg).addClass('privatefoundme');
        }
    }
    searchForCustomPokemon(value, male, female, nogender) {
        const genderMatches = [];
        if (male) { genderMatches.push('[M]'); }
        if (female) { genderMatches.push('[F]'); }
        if (nogender) { genderMatches.push('[N]'); }

        if (genderMatches.length > 0) {
            for (let i = 0; i < genderMatches.length; i++) {
                const genderMatch = genderMatches[i];
                const selected = $('#field_field .tooltip_content:containsIN(' + value + ') img[title*=\'' + genderMatch + '\']');
                if (selected.length) {
                    const shelterBigImg = selected.parent().parent().parent().parent().prev().children('img');
                    $(shelterBigImg).addClass('privatefoundme');
                }
            }
        }

        //No genders
        else {
            const selected = $('#field_field .tooltip_content:containsIN(' + value + ')');
            if (selected.length) {
                const shelterBigImg = selected.parent().parent().parent().parent().prev().children('img');
                $(shelterBigImg).addClass('privatefoundme');
            }
        }

    }
    searchForCustomEgg(value) {
        const selected = $('#field_field .tooltip_content:containsIN(' + value + '):contains("Egg")');
        if (selected.length) {
            const shelterBigImg = selected.parent().parent().parent().parent().prev().children('img');
            $(shelterBigImg).addClass('privatefoundme');
        }
    }
    searchForCustomPng(value) {
        const selected = $('#field_field img[src*="' + value + '"]');
        if (selected.length) {
            const shelterImgSearch = selected;
            $(shelterImgSearch).addClass('privatefoundme');
        }
    }
    customSearch() {
        if(this.USER_SETTINGS.privateFieldFeatureEnables.search) {
            const bigImgs = document.querySelectorAll('.privatefoundme');
            if (bigImgs !== null) {
                bigImgs.forEach((b) => { $(b).removeClass('privatefoundme'); });
            }

            if (this.settings.fieldShiny === true) {
                this.searchForImgTitle('findShiny');
            }
            if (this.settings.fieldAlbino === true) {
                this.searchForImgTitle('findAlbino');
            }
            if (this.settings.fieldMelanistic === true) {
                this.searchForImgTitle('findMelanistic');
            }
            if (this.settings.fieldPrehistoric === true) {
                this.searchForImgTitle('findPrehistoric');
            }
            if (this.settings.fieldDelta === true) {
                this.searchForImgTitle('findDelta');
            }
            if (this.settings.fieldMega === true) {
                this.searchForImgTitle('findMega');
            }
            if (this.settings.fieldStarter === true) {
                this.searchForImgTitle('findStarter');
            }
            if (this.settings.fieldCustomSprite === true) {
                this.searchForImgTitle('findCustomSprite');
            }
            if (this.settings.fieldItem === true) {
            // pokemon that hold items will have HTML that matches the following selector
                const items = $('.tooltip_content .item>div>.tooltip_item');
                if (items.length) {
                    const itemBigImgs = items.parent().parent().parent().parent().prev().children('img');
                    $(itemBigImgs).addClass('privatefoundme');
                }
            }
            const filteredTypeArray = this.typeArray.filter(v => v != '');
            const filteredNatureArray = this.natureArray.filter(v => v != '');
            const filteredEggGroupArray = this.eggGroupArray.filter(v => v != '');

            //loop to find all the types
            if (filteredTypeArray.length > 0 || filteredNatureArray.length > 0 || filteredEggGroupArray.length > 0) {
                $('.fieldmon').each(function () {
                    const searchPokemonBigImg = $(this)[0].childNodes[0];
                    const tooltipData = Helpers.parseFieldPokemonTooltip($(searchPokemonBigImg).parent().next()[0]);

                    const searchTypeOne = tooltipData.types[0] + '';
                    const searchTypeTwo = (tooltipData.types.length > 1) ? tooltipData.types[1] + '' : '';

                    const searchNature = Globals.NATURE_LIST[tooltipData.nature];

                    const searchEggGroup = $(this).next().find('.fieldmontip').
                        children(':contains(Egg Group)').eq(0).text().slice('Egg Group: '.length);

                    for (let i = 0; i < filteredTypeArray.length; i++) {
                        if ((searchTypeOne === filteredTypeArray[i]) || (searchTypeTwo === filteredTypeArray[i])) {
                            $(searchPokemonBigImg).parent().children().addClass('privatefoundme');
                        }
                    }

                    for (let i = 0; i < filteredNatureArray.length; i++) {
                        if (searchNature === Globals.NATURE_LIST[filteredNatureArray[i]]) {
                            $(searchPokemonBigImg).parent().children().addClass('privatefoundme');
                        }
                    }

                    for (let i = 0; i < filteredEggGroupArray.length; i++) {
                        const value = Globals.EGG_GROUP_LIST[filteredEggGroupArray[i]];
                        if (searchEggGroup === value ||
                        searchEggGroup.indexOf(value + '/') > -1 ||
                        searchEggGroup.indexOf('/' + value) > -1) {
                            $(searchPokemonBigImg).parent().children().addClass('privatefoundme');
                        }
                    }
                }); // each
            } // end

            // custom search
            for (let i = 0; i < this.customArray.length; i++) {
                const value = this.customArray[i];
                if (value != '') {
                //custom pokemon search
                    if (this.settings.customPokemon === true) {
                        this.searchForCustomPokemon(value, this.settings.fieldMale,
                            this.settings.fieldFemale,
                            this.settings.fieldNoGender);
                    }

                    //custom egg
                    if (this.settings.customEgg === true) {
                        this.searchForCustomEgg(value);
                    }

                    //imgSearch with Pokémon
                    if (this.settings.customPng === true) {
                        this.searchForCustomPng(value);
                    }
                }
            }
        }
    }
    addSelectSearch(cls, name, dataKey, options, id, divParent, arrayName) {
        const theList = Helpers.selectSearchDiv(cls, name, dataKey, options, id, divParent, arrayName);
        const number = $(`#${divParent}>div`).length;
        $(`#${divParent}`).append(theList);
        $(`.${cls}`).removeClass(cls).addClass('' + number + '');
    }
    removeSelectSearch(arr, byebye, key, settingsKey, divParent) {
        arr = $.grep(arr, function (value) { return value != key; });
        this.settings[settingsKey] = arr.toString();

        $(byebye).parent().remove();

        for (let i = 0; i < $(`#${divParent}>div`).length; i++) {
            const rightDiv = i + 1;
            $('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }

        return arr;
    }
    addTextField() {
        const theField = Helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray');
        const numberDiv = $('#searchkeys>div').length;
        $('#searchkeys').append(theField);
        $('.numberDiv').removeClass('numberDiv').addClass('' + numberDiv + '');
    }
    removeTextField(byebye, key) {
        this.customArray = $.grep(this.customArray, function (value) {
            return value != key;
        });
        this.settings.fieldCustom = this.customArray.toString();

        $(byebye).parent().remove();

        let i;
        for (i = 0; i < $('#searchkeys>div').length; i++) {
            const rightDiv = i + 1;
            $('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }
    }
    showBulkNatures(enable) {
        let pkmn = $('input[name="masspkmn"]');
        for(let i=0; i<pkmn.length; i++) {
            let pkmnDetails = $(pkmn[i]).next().next().html();
            if(enable) {
                let natureRegex = /<b>Nature:<\/b> ([a-zA-Zï]+)/;
                let results = pkmnDetails.match(natureRegex);
                if(results.length>1) { // this should always be true, but just in case
                    $(pkmn[i]).next().next().next().html(results[1]);
                }
            }
            else {
                let genderRegex = /<span class="icons">(<img src=".+">)<\/span>/;
                let results = pkmnDetails.match(genderRegex);
                if(results.length>1) { // this should always be true, but just in case
                    $(pkmn[i]).next().next().next().html(results[1]);
                }
            }
        }
    }
    enableMoveReleaseControls() {
        // find flavour checkbox, add show nature checkbox
        let flavourCheckbox =  $('.bulkpokemonlist>label:first-child>input');
        let natureCheckbox = $('<input type="checkbox"> Show Pokemon natures');
        let natureLabel = $('<label></label>').append(natureCheckbox).append(' Show Pokemon natures');
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
        let obj = this;
        natureCheckbox.on('change',function() {
            // disable show flavours
            $('.bulkpokemonlist').removeClass('qolFlavourShown');
            flavourCheckbox.prop('checked',false);

            if($(this).prop('checked')) {
                $('.bulkpokemonlist').addClass('qolNatureShown');
                obj.showBulkNatures(true);
            }
            else {
                $('.bulkpokemonlist').removeClass('qolNatureShown');
                obj.showBulkNatures(false);
            }
        });

        // add selection checkboxes
        const checkboxes = `<label id="selectallfield"><input id="selectallfieldcheckbox" type="checkbox">Select all</label> <label id="selectallfieldmale" class="qolSelectGender"><input id="selectallfieldmalecheckbox" type="checkbox">Select Male</label> <label id="selectallfieldfemale" class="qolSelectGender"><input id="selectallfieldfemalecheckbox" type="checkbox">Select Female</label> <label id="selectallfieldgenderless" class="qolSelectGender"><input id="selectallfieldgenderlesscheckbox" type="checkbox">Select Genderless</label> <label id="selectallfieldany" class="qolSelectFlavour"><input id="selectallfieldanycheckbox" type="checkbox">Select Any</label> <label id="selectallfieldsour" class="qolSelectFlavour"><input id="selectallfieldsourcheckbox" type="checkbox">Select Sour</label> <label id="selectallfieldspicy" class="qolSelectFlavour"><input id="selectallfieldspicycheckbox" type="checkbox">Select Spicy</label> <label id="selectallfielddry" class="qolSelectFlavour"><input id="selectallfielddrycheckbox" type="checkbox">Select Dry</label> <label id="selectallfieldsweet" class="qolSelectFlavour"><input id="selectallfieldsweetcheckbox" type="checkbox">Select Sweet</label> <label id="selectallfieldbitter" class="qolSelectFlavour"><input id="selectallfieldbittercheckbox" type="checkbox">Select Bitter</label>`;
        $('.dialog>div>div>div>div>button').eq(0).after(checkboxes);

        // checkbox listeners
        $('#selectallfieldcheckbox').click(function () {
            $('.bulkpokemonlist>ul>li>label>input').not(this).prop('checked', this.checked);
        });
        $('#selectallfieldmalecheckbox').click(function () {
            const selectAny = $('.icons img[title="[M]"]').parent().prev().prev().prev('input');
            $(selectAny).not(this).prop('checked', this.checked);
        });
        $('#selectallfieldfemalecheckbox').click(function () {
            const selectAny = $('.icons img[title="[F]"]').parent().prev().prev().prev('input');
            $(selectAny).not(this).prop('checked', this.checked);
        });
        $('#selectallfieldgenderlesscheckbox').click(function () {
            const selectAny = $('.icons img[title="[N]"]').parent().prev().prev().prev('input');
            $(selectAny).not(this).prop('checked', this.checked);
        });
        $('#selectallfieldanycheckbox').click(function () {
            const selectAny = $('.icons:contains("Any")').prev().prev().prev('input');
            $(selectAny).not(this).prop('checked', this.checked);
        });
        $('#selectallfieldsourcheckbox').click(function () {
            const selectSour = $('.icons:contains("Sour")').prev().prev().prev('input');
            $(selectSour).not(this).prop('checked', this.checked);
        });
        $('#selectallfieldspicycheckbox').click(function () {
            const selectSpicy = $('.icons:contains("Spicy")').prev().prev().prev('input');
            $(selectSpicy).not(this).prop('checked', this.checked);
        });
        $('#selectallfielddrycheckbox').click(function () {
            const selectDry = $('.icons:contains("Dry")').prev().prev().prev('input');
            $(selectDry).not(this).prop('checked', this.checked);
        });
        $('#selectallfieldsweetcheckbox').click(function () {
            const selectSweet = $('.icons:contains("Sweet")').prev().prev().prev('input');
            $(selectSweet).not(this).prop('checked', this.checked);
        });
        $('#selectallfieldbittercheckbox').click(function () {
            const selectBitter = $('.icons:contains("Bitter")').prev().prev().prev('input');
            $(selectBitter).not(this).prop('checked', this.checked);
        });
    }
}

class PublicFieldsPage extends Page {
    constructor() {
        const defaultPageSettings = {
            fieldByBerry: false,
            fieldByMiddle: false,
            fieldByGrid: false,
            fieldClickCount: true,
            fieldCustom: '',
            fieldType: '',
            fieldNature: '',
            fieldEggGroup: '',
            fieldNewPokemon: true,
            fieldShiny: true,
            fieldAlbino: true,
            fieldMelanistic: true,
            fieldPrehistoric: true,
            fieldDelta: true,
            fieldMega: true,
            fieldStarter: true,
            fieldCustomSprite: true,
            fieldMale: true,
            fieldFemale: true,
            fieldNoGender: true,
            fieldCustomItem: true, // unused
            fieldCustomPokemon: true,
            fieldCustomEgg: true,
            fieldCustomPng: false,
            fieldItem: true,
            /* tooltip settings */
            tooltipEnableMods: false,
            tooltipNoBerry: false,
            tooltipBerry: false,
        };
        super(Globals.PUBLIC_FIELDS_PAGE_SETTINGS_KEY, defaultPageSettings, 'fields/');
        this.customArray = [];
        this.typeArray = [];
        this.natureArray = [];
        this.eggGroupArray = [];
        const obj = this;
        this.observer = new MutationObserver(function() {
            obj.customSearch();
            if(obj.USER_SETTINGS.publicFieldFeatureEnables.tooltip) {
                obj.handleTooltipSettings();
            }
        });
    }

    settingsChange(element, textElement, customClass, typeClass, arrayName) {
        if(super.settingsChange(element, textElement, customClass, typeClass, arrayName) === false) {
            return false;
        }

        const mutuallyExclusive = ['fieldByBerry', 'fieldByMiddle', 'fieldByGrid'];
        const idx = mutuallyExclusive.indexOf(element);
        if(idx > -1) {
            for(let i = 0; i < mutuallyExclusive.length; i++) {
                if(i !== idx) {
                    this.settings[mutuallyExclusive[i]] = false;
                }
            }
            return true;
        }
        else { return false; }
    }

    setupHTML() {
        if(this.USER_SETTINGS.publicFieldFeatureEnables.search) {
            document.querySelector('#field_field').insertAdjacentHTML('afterend', Resources.fieldSearchHTML());
            const theField = Helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray');
            const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'fieldType', Globals.TYPE_OPTIONS,
                'removeFieldTypeSearch', 'fieldTypes', 'typeArray');
            const theNature = Helpers.selectSearchDiv('natureNumber', 'natures', 'fieldNature', Globals.NATURE_OPTIONS,
                'removeFieldNature', 'natureTypes', 'natureArray');
            const theEggGroup = Helpers.selectSearchDiv('eggGroupNumber', 'eggGroups', 'fieldEggGroup', Globals.EGG_GROUP_OPTIONS,
                'removeFieldEggGroup', 'eggGroupTypes', 'eggGroupArray');
            this.customArray = this.settings.fieldCustom.split(',');
            this.typeArray = this.settings.fieldType.split(',');
            this.natureArray = this.settings.fieldNature.split(',');
            this.eggGroupArray = this.settings.fieldEggGroup.split(',');
            Helpers.setupFieldArrayHTML(this.customArray, 'searchkeys', theField, 'numberDiv');
            Helpers.setupFieldArrayHTML(this.typeArray, 'fieldTypes', theType, 'typeNumber');
            Helpers.setupFieldArrayHTML(this.natureArray, 'natureTypes', theNature, 'natureNumber');
            Helpers.setupFieldArrayHTML(this.eggGroupArray, 'eggGroupTypes', theEggGroup, 'eggGroupNumber');
        }
        if(this.USER_SETTINGS.publicFieldFeatureEnables.sort) {
            document.querySelector('#field_field').insertAdjacentHTML('beforebegin', Resources.fieldSortHTML());
        }
        if(this.USER_SETTINGS.publicFieldFeatureEnables.tooltip) {
            document.querySelector('#field_field').insertAdjacentHTML('beforebegin', Resources.publicFieldTooltipModHTML());
            this.handleTooltipSettings();
        }

        if(this.USER_SETTINGS.publicFieldFeatureEnables.pkmnlinks) {
            Helpers.addPkmnLinksPopup();
        }
    }
    setupCSS() {
        const fieldOrderCssColor = $('#field_field').css('background-color');
        const fieldOrderCssBorder = $('#field_field').css('border');
        $('#fieldorder').css('background-color', '' + fieldOrderCssColor + '');
        $('#fieldorder').css('border', '' + fieldOrderCssBorder + '');
        $('#fieldsearch').css('background-color', '' + fieldOrderCssColor + '');
        $('#tooltipenable').css('max-width', '600px');
        $('#tooltipenable').css('position', 'relative');
        $('#tooltipenable').css('margin', '16px auto');
        $('.collapsible').css('background-color', '' + fieldOrderCssColor + '');
        $('.collapsible').css('border', '' + fieldOrderCssBorder + '');
        $('.collapsible_content').css('background-color', '' + fieldOrderCssColor + '');

        $('.tooltiptext').css('background-color', $('.tooltip_content').eq(0).css('background-color'));
        $('.tooltiptext').css('border', '' + fieldOrderCssBorder + '');

        /*
         * Issue #47 - Since the default Pokefarm CSS for buttons does not use the same color
         * settings as most of the text on the site, manually set the text color for
         * '.collapsible' to match the text around it
         */
        $('.collapsible').css('color', $('#content').find('h1').eq(0).css('color'));
    }
    setupObserver() {
        this.observer.observe(document.querySelector('#field_field'), {
            childList: true,
            characterdata: true,
            subtree: true,
            characterDataOldValue: true,
        });
    }
    setupHandlers() {
        const obj = this;
        $(window).on('load', (function() {
            obj.loadSettings();
            obj.customSearch();
            if(obj.USER_SETTINGS.publicFieldFeatureEnables.tooltip) {
                obj.handleTooltipSettings();
            }
            obj.saveSettings();
        }));

        $(document).on('click input', '#fieldorder, #field_field, #field_berries, #field_nav', (function() { //field sort
            obj.customSearch();
        }));

        document.addEventListener('keydown', function() {
            obj.customSearch();
        });

        $(document).on('change', '.qolsetting', (function() {
            obj.loadSettings();
            obj.customSearch();
            obj.saveSettings();
        }));

        $(document).on('input', '.qolsetting', (function() { //Changes QoL settings
            obj.settingsChange(this.getAttribute('data-key'),
                $(this).val(),
                $(this).parent().parent().attr('class'),
                $(this).parent().attr('class'),
                (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
            obj.customSearch();
            obj.saveSettings();
        }));

        // enable all collapses
        $('.collapsible').on('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if(content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });

        if(this.USER_SETTINGS.publicFieldFeatureEnables.search) {
            $(document).on('click', '#addFieldTypeSearch', (function() { //add field type list
                obj.addSelectSearch('typeNumber', 'types', 'fieldType', Globals.TYPE_OPTIONS, 'removeFieldTypeSearch', 'fieldTypes', 'typeArray');
                obj.customSearch();
            }));

            $(document).on('click', '#removeFieldTypeSearch', (function() { //remove field type list
                obj.typeArray = obj.removeSelectSearch(obj.typeArray, this, $(this).parent().find('select').val(), 'fieldType', 'fieldTypes');
                obj.saveSettings();
                obj.customSearch();
            }));

            $(document).on('click', '#addFieldNatureSearch', (function() { //add field nature search
                obj.addSelectSearch('natureNumber', 'natures', 'fieldNature', Globals.NATURE_OPTIONS, 'removeFieldNature', 'natureTypes', 'natureArray');
                obj.customSearch();
            }));

            $(document).on('click', '#removeFieldNature', (function() { //remove field nature search
                obj.natureArray = obj.removeSelectSearch(obj.natureArray, this, $(this).parent().find('select').val(), 'fieldNature', 'natureTypes');
                obj.saveSettings();
                obj.customSearch();
            }));

            $(document).on('click', '#addFieldEggGroupSearch', (function() { //add egg group nature search
                obj.addSelectSearch('eggGroupNumber', 'eggGroups', 'fieldEggGroup', Globals.EGG_GROUP_OPTIONS, 'removeFieldEggGroup', 'eggGroupTypes', 'eggGroupArray');
                obj.customSearch();
            }));

            $(document).on('click', '#removeFieldEggGroup', (function() { //remove egg group nature search
                obj.eggGroupArray = obj.removeSelectSearch(obj.eggGroupArray, this, $(this).parent().find('select').val(), 'fieldEggGroup', 'eggGroupTypes');
                obj.saveSettings();
                obj.customSearch();
            }));

            $(document).on('click', '#addTextField', (function() {
                obj.addTextField();
                obj.saveSettings();
            }));

            $(document).on('click', '#removeTextField', (function() {
                obj.removeTextField(this, $(this).parent().find('input').val());
                obj.saveSettings();
                obj.customSearch();
            }));
        }

        if(this.USER_SETTINGS.publicFieldFeatureEnables.sort) {
            $('input.qolalone').on('change', function() { //only 1 textbox may be true
                $('input.qolalone').not(this).prop('checked', false);
            });
        }

        if(this.USER_SETTINGS.publicFieldFeatureEnables.tooltip) {

            $('#field_berries').on('click', function() {
                obj.loadSettings();
                obj.handleTooltipSettings();
            });

            $('.tooltipsetting[data-key=tooltipEnableMods]').on('click', function() {
                obj.loadSettings();
                obj.handleTooltipSettings();
                obj.saveSettings();
            });

            $('.tooltipsetting[data-key=tooltipNoBerry]').on('click', function() {
                obj.loadSettings();
                obj.handleTooltipSettings();
                obj.saveSettings();
            });

            $('.tooltipsetting[data-key=tooltipBerry]').on('click', function() {
                obj.loadSettings();
                obj.handleTooltipSettings();
                obj.saveSettings();
            });
        }

        // based on PFQ's code in fields_public.min.js
        $(window).on('keyup.field_shortcuts', function (a) {
            const k = $('#field_berries');
            if (0 == $(a.target).closest('input, textarea').length) {
                switch (a.keyCode) {
                case 49: // 1
                case 97: // Num-1
                    k.find('a').eq(0).trigger('click');
                    break;
                case 50: // 2
                case 98: // Num-2
                    k.find('a').eq(1).trigger('click');
                    break;
                case 51: // 3
                case 99: // Num-3
                    k.find('a').eq(2).trigger('click');
                    break;
                case 52: // 4
                case 100: // Num-4
                    k.find('a').eq(3).trigger('click');
                    break;
                case 53: // 5
                case 101: // Num-5
                    k.find('a').eq(4).trigger('click');
                }
            }
        });
    }
    // specific
    handleTooltipSettings() {
        const obj = this;
        if($('.tooltipsetting[data-key=tooltipEnableMods]').prop('checked')) {
            // make sure checkboxes are enabled
            $('.tooltipsetting[data-key=tooltipNoBerry]').prop('disabled', false);
            $('.tooltipsetting[data-key=tooltipBerry]').prop('disabled', false);

            // use the correct setting to turn on the tooltips based on the berries
            if($('#field_berries').hasClass('selected')) {
                if($('.tooltipsetting[data-key=tooltipBerry]').prop('checked')) { obj.disableTooltips(); }
                else { obj.enableTooltips(); }
            } else {
                if($('.tooltipsetting[data-key=tooltipNoBerry]').prop('checked')) { obj.disableTooltips(); }
                else { obj.enableTooltips(); }
            }
        } else {
            $('.tooltipsetting[data-key=tooltipNoBerry]').prop('disabled', true);
            $('.tooltipsetting[data-key=tooltipBerry]').prop('disabled', true);
            // if tooltipNoBerry was checked before the mods were disabled, reenable the tooltips
            if($('.tooltipsetting[data-key=tooltipNoBerry]').prop('checked')) {
                obj.enableTooltips();
            }
            // same for tooltipBerry
            if($('.tooltipsetting[data-key=tooltipBerry]').prop('checked')) {
                obj.enableTooltips();
            }
        }
    }
    disableTooltips() {
        $('#field_field>div.field>.fieldmon').removeAttr('data-tooltip').removeClass('tooltip_trigger');
    }
    enableTooltips() {
        $('#field_field>div.field>.fieldmon').attr('data-tooltip', '');
    }
    searchForImgTitle(key) {
        const SEARCH_DATA = Globals.SHELTER_SEARCH_DATA;
        const keyIndex = SEARCH_DATA.indexOf(key);
        const value = SEARCH_DATA[keyIndex + 1];
        const selected = $('img[title*="'+value+'"]');
        if (selected.length) {
            // next line different from shelter
            const bigImg = selected.parent().parent().parent().parent().prev().children('img');
            $(bigImg).addClass('publicfoundme');
        }
    }
    searchForCustomPokemon(value, male, female, nogender) {
        const genderMatches = [];
        if (male) { genderMatches.push('[M]'); }
        if(female) { genderMatches.push('[F]'); }
        if(nogender) { genderMatches.push('[N]'); }

        if(genderMatches.length > 0) {
            for(let i = 0; i < genderMatches.length; i++) {
                const genderMatch = genderMatches[i];
                const selected = $('#field_field .tooltip_content:containsIN('+value+') img[title*=\'' + genderMatch + '\']');
                if (selected.length) {
                    const shelterBigImg = selected.parent().parent().parent().parent().prev().children('img');
                    $(shelterBigImg).addClass('publicfoundme');
                }
            }
        }

        //No genders
        else {
            const selected = $('#field_field .tooltip_content:containsIN('+value+'):not(:containsIN("Egg"))');
            if (selected.length) {
                const shelterBigImg = selected.parent().parent().parent().parent().prev().children('img');
                $(shelterBigImg).addClass('publicfoundme');
            }
        }

    }
    searchForCustomEgg(value) {
        const selected = $('#field_field .tooltip_content:containsIN('+value+'):contains("Egg")');
        if (selected.length) {
            const shelterBigImg = selected.parent().parent().parent().parent().prev().children('img');
            $(shelterBigImg).addClass('publicfoundme');
        }
    }
    searchForCustomPng(value) {
        const selected = $('#field_field img[src*="'+value+'"]');
        if (selected.length) {
            const shelterImgSearch = selected;
            $(shelterImgSearch).addClass('publicfoundme');
        }
    }
    customSearch() {
        const obj = this;

        $('.fieldmon').removeClass('qolSortBerry');
        $('.fieldmon').removeClass('qolSortMiddle');
        $('.field').removeClass('qolGridField');
        $('.fieldmon').removeClass('qolGridPokeSize');
        $('.fieldmon>img').removeClass('qolGridPokeImg');

        if(obj.USER_SETTINGS.publicFieldFeatureEnables.sort) {

            //////////////////// sorting ////////////////////
            if (this.settings.fieldByBerry === true) { //sort field by berries
                $('.fieldmon').removeClass('qolSortMiddle');
                $('.field').removeClass('qolGridField');
                $('.fieldmon').removeClass('qolGridPokeSize');
                $('.fieldmon>img').removeClass('qolGridPokeImg');

                $('.fieldmon').addClass('qolSortBerry');
                if($('#field_field [data-flavour*="any-"]').length) {
                    $('#field_field [data-flavour*="any-"]').addClass('qolAnyBerry');
                }
                if($('#field_field [data-flavour*="sour-"]').length) {
                    $('#field_field [data-flavour*="sour-"]').addClass('qolSourBerry');
                }
                if($('#field_field [data-flavour*="spicy-"]').length) {
                    $('#field_field [data-flavour*="spicy-"]').addClass('qolSpicyBerry');
                }
                if($('#field_field [data-flavour*="dry-"]').length) {
                    $('#field_field [data-flavour*="dry-"]').addClass('qolDryBerry');
                }
                if($('#field_field [data-flavour*="sweet-"]').length) {
                    $('#field_field [data-flavour*="sweet-"]').addClass('qolSweetBerry');
                }
                if($('#field_field [data-flavour*="bitter-"]').length) {
                    $('#field_field [data-flavour*="bitter-"]').addClass('qolBitterBerry');
                }
            }
            else if (this.settings.fieldByMiddle === true) { //sort field in the middle
                $('.fieldmon').addClass('qolSortMiddle');
            }
            else if (this.settings.fieldByGrid === true) { //sort field in a grid
                $('.field').addClass('qolGridField');
                $('.fieldmon').addClass('qolGridPokeSize');
                $('.fieldmon>img').addClass('qolGridPokeImg');
            }

            //Pokémon click counter
            if (this.settings.fieldClickCount === false) {
                $('#pokemonclickcount').remove();
            } else if (this.settings.fieldClickCount === true) {
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
                        $('#pokemonclickcount').css({
                            'color' : '#059121'
                        });
                    }
                    if (pokemonClicked !== JSON.parse(pokemonInField)) {
                        $('#pokemonclickcount').css({
                            'color' : '#a30323'
                        });
                    }
                }
            }
        }

        if(obj.USER_SETTINGS.publicFieldFeatureEnables.search) {
        /////////////////// searching ///////////////////
            const bigImgs = document.querySelectorAll('.publicfoundme');
            if(bigImgs !== null) {
                bigImgs.forEach((b) => {$(b).removeClass('publicfoundme');});
            }

            if(this.settings.fieldShiny === true) {
                this.searchForImgTitle('findShiny');
            }
            if(this.settings.fieldAlbino === true) {
                this.searchForImgTitle('findAlbino');
            }
            if(this.settings.fieldMelanistic === true) {
                this.searchForImgTitle('findMelanistic');
            }
            if(this.settings.fieldPrehistoric === true) {
                this.searchForImgTitle('findPrehistoric');
            }
            if(this.settings.fieldDelta === true) {
                this.searchForImgTitle('findDelta');
            }
            if(this.settings.fieldMega === true) {
                this.searchForImgTitle('findMega');
            }
            if(this.settings.fieldStarter === true) {
                this.searchForImgTitle('findStarter');
            }
            if(this.settings.fieldCustomSprite === true) {
                this.searchForImgTitle('findCustomSprite');
            }
            if(this.settings.fieldItem === true) {
            // pokemon that hold items will have HTML that matches the following selector
                const items = $('.tooltip_content .item>div>.tooltip_item');
                if(items.length) {
                    const itemBigImgs = items.parent().parent().parent().parent().prev().children('img');
                    $(itemBigImgs).addClass('publicfoundme');
                }
            }

            const filteredTypeArray = this.typeArray.filter(v=>v!='');
            const filteredNatureArray = this.natureArray.filter(v=>v!='');
            const filteredEggGroupArray = this.eggGroupArray.filter(v=>v!='');

            //loop to find all the types
            if (filteredTypeArray.length > 0 || filteredNatureArray.length > 0 || filteredEggGroupArray.length > 0) {
                $('.fieldmon').each(function() {
                    const searchPokemonBigImg = $(this)[0].childNodes[0];
                    const tooltipData = Helpers.parseFieldPokemonTooltip($(searchPokemonBigImg).parent().next()[0]);

                    const searchTypeOne = tooltipData.types[0] + '';
                    const searchTypeTwo = (tooltipData.types.length > 1) ? tooltipData.types[1] + '': '';

                    const searchNature = Globals.NATURE_LIST[tooltipData.nature];

                    const searchEggGroup = $(this).next().find('.fieldmontip').
                        children(':contains(Egg Group)').eq(0).text().slice('Egg Group: '.length);

                    for (let i = 0; i < filteredTypeArray.length; i++) {
                        if ((searchTypeOne === filteredTypeArray[i]) || (searchTypeTwo === filteredTypeArray[i])) {
                            // .parent().children() hack to make both big & small images highlighted
                            // privateFieldsPage has the same issue: TODO: combine some of these search features, 
                            // and remove this hack (put combined functions in a library of some sort)
                            // could put the class on the parent element instead, and make the css .found>img?
                            $(searchPokemonBigImg).parent().children().addClass('publicfoundme');
                        }
                    }

                    for (let i = 0; i < filteredNatureArray.length; i++) {
                        if(searchNature === Globals.NATURE_LIST[filteredNatureArray[i]]) {
                            $(searchPokemonBigImg).parent().children().addClass('publicfoundme');
                        }
                    }

                    for (let i = 0; i < filteredEggGroupArray.length; i++) {
                        const value = Globals.EGG_GROUP_LIST[filteredEggGroupArray[i]];
                        if(searchEggGroup === value ||
                       searchEggGroup.indexOf(value + '/') > -1 ||
                       searchEggGroup.indexOf('/' + value) > -1) {
                            $(searchPokemonBigImg).parent().children().addClass('publicfoundme');
                        }
                    }
                }); // each
            } // end

            // custom search
            for (let i = 0; i < this.customArray.length; i++) {
                const value = this.customArray[i];
                if (value != '') {
                //custom pokemon search
                    if (this.settings.fieldCustomPokemon === true) {
                        this.searchForCustomPokemon(value, this.settings.fieldMale,
                            this.settings.fieldFemale,
                            this.settings.fieldNoGender);
                    }

                    //custom egg
                    if (this.settings.fieldCustomEgg === true) {
                        this.searchForCustomEgg(value);
                    }

                    //imgSearch with Pokémon
                    if (this.settings.fieldCustomPng === true) {
                        this.searchForCustomPng(value);
                    }
                }
            }
        }
    } // customSearch
    addSelectSearch(cls, name, dataKey, options, id, divParent, arrayName) {
        const theList = Helpers.selectSearchDiv(cls, name, dataKey, options, id, divParent, arrayName);
        const number = $(`#${divParent}>div`).length;
        $(`#${divParent}`).append(theList);
        $(`.${cls}`).removeClass(cls).addClass(''+number+'');
    }
    removeSelectSearch(arr, byebye, key, settingsKey, divParent) {
        arr = $.grep(arr, function(value) { return value != key; });
        this.settings[settingsKey] = arr.toString();

        $(byebye).parent().remove();

        for(let i = 0; i < $(`#${divParent}>div`).length; i++) {
            const rightDiv = i + 1;
            $('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
        }

        return arr;
    }
    addTextField() {
        const theField = Helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray');
        const numberDiv = $('#searchkeys>div').length;
        $('#searchkeys').append(theField);
        $('.numberDiv').removeClass('numberDiv').addClass(''+numberDiv+'');
    }
    removeTextField(byebye, key) {
        this.customArray = $.grep(this.customArray, function(value) {
            return value != key;
        });
        this.settings.fieldCustom = this.customArray.toString();

        $(byebye).parent().remove();

        let i;
        for(i = 0; i < $('#searchkeys>div').length; i++) {
            const rightDiv = i + 1;
            $('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
        }
    }
}

class ShelterPage extends Page {
    constructor() {
        const defaultPageSettings = {
            findCustom: '',
            findType: '',
            findTypeEgg: true,
            findTypePokemon: false,
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
            findLegendary: false,
            findMale: true,
            findFemale: true,
            findNoGender: true,
            customEgg: true,
            customPokemon: true,
            customPng: false,
            shelterGrid: true,
            shelterSpriteSize: 'auto'
        };
        super(Globals.SHELTER_PAGE_SETTINGS_KEY, defaultPageSettings, 'shelter');
        this.customArray = [];
        this.typeArray = [];
        const obj = this;
        this.observer = new MutationObserver(function () {
            obj.customSearch();
        });

        /*
         * used to keep track of the currently selected match
         * matches can be selected via a shortcut key, specified via this.selectNextMatchKey
         */
        this.selectNextMatchKey = 78; // 'n'
        this.currentlySelectedMatch = undefined;
    }

    setupHTML() {
        if(this.USER_SETTINGS.shelterFeatureEnables.search) {
            $('.tabbed_interface.horizontal>div').removeClass('tab-active');
            $('.tabbed_interface.horizontal>ul>li').removeClass('tab-active');
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterbegin', '<li class="tab-active"><label>Search</label></li>');
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterend', Resources.shelterOptionsHTML());
            $('#shelteroptionsqol').addClass('tab-active');

            document.querySelector('#sheltercommands').insertAdjacentHTML('beforebegin', '<div id="sheltersuccess"></div>');

            const theField = Helpers.textSearchDiv('numberDiv', 'findCustom', 'removeShelterTextfield', 'customArray');
            const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'findType', Globals.TYPE_OPTIONS,
                'removeShelterTypeList', 'fieldTypes', 'typeArray');

            this.customArray = this.settings.findCustom.split(',');
            this.typeArray = this.settings.findType.split(',');

            Helpers.setupFieldArrayHTML(this.customArray, 'searchkeys', theField, 'numberDiv');
            Helpers.setupFieldArrayHTML(this.typeArray, 'shelterTypes', theType, 'typeNumber');

            $('[data-shelter=reload]').addClass('customSearchOnClick');
            $('[data-shelter=whiteflute]').addClass('customSearchOnClick');
            $('[data-shelter=blackflute]').addClass('customSearchOnClick');
        }
        if(this.USER_SETTINGS.shelterFeatureEnables.sort) {
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterbegin', '<li class=""><label>Sort</label></li>');
            document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterend', Resources.shelterSortHTML());
        }
    }
    setupCSS() {
        if(this.USER_SETTINGS.shelterFeatureEnables.search ||
            this.USER_SETTINGS.shelterFeatureEnables.sort) {
            const shelterSuccessCss = $('#sheltercommands').css('background-color');
            $('#sheltersuccess').css('background-color', shelterSuccessCss);
            $('.tooltiptext').css('background-color', $('.tooltip_content').eq(0).css('background-color'));
            const background = $('#shelterpage>.panel').eq(0).css('border');
            $('.tooltiptext').css('border', '' + background + '');
        }
    }
    setupObserver() {
        this.observer.observe(document.querySelector('#shelterarea'), {
            childList: true,
        });
    }
    setupHandlers() {
        const obj = this;
        $(document).on('change', '#shelteroptionsqol input', (function () { //shelter search
            obj.loadSettings();
            obj.customSearch();
            obj.saveSettings();
        }));

        $(document).on('change', '.qolsetting', (function () {
            obj.loadSettings();
            obj.customSearch();
            obj.saveSettings();
        }));

        $(document).on('input', '.qolsetting', (function () { //Changes QoL settings
            obj.settingsChange(this.getAttribute('data-key'),
                $(this).val(),
                $(this).parent().parent().attr('class'),
                $(this).parent().attr('class'),
                (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
            obj.customSearch();
            obj.saveSettings();
        }));

        $('.customSearchOnClick').on('click', (function () {
            obj.loadSettings();
            obj.customSearch();
            obj.saveSettings();
        }));

        $(document).on('click', '#addShelterTextfield', (function () { //add shelter text field
            obj.addTextField();
            obj.saveSettings();
        }));

        $(document).on('click', '#removeShelterTextfield', (function () { //remove shelter text field
            obj.removeTextField(this, $(this).parent().find('input').val());
            obj.saveSettings();
            obj.customSearch();
        }));

        $(document).on('click', '#addShelterTypeList', (function () { //add shelter type list
            obj.addTypeList();
            obj.customSearch();
        }));

        $(document).on('click', '#removeShelterTypeList', (function () { //remove shelter type list
            obj.removeTypeList(this, $(this).parent().find('select').val());
            obj.saveSettings();
            obj.customSearch();
        }));

        $('input.qolalone').on('change', function () { //only 1 checkbox may be true
            $('input.qolalone').not(this).prop('checked', false);
        });

        $('input[name="shelterSpriteSize"]').on('change', function() {
            obj.settingsChange('shelterSpriteSize',
                $(this).val(),
                $(this).parent().parent().attr('class'),
                $(this).parent().attr('class'),
                '');
            obj.customSearch();
            obj.saveSettings();
        });

        $(window).on('keyup.qol_shelter_shortcuts', function (a) {
            if (0 == $(a.target).closest('input, textarea').length) {
                switch (a.keyCode) {
                case obj.selectNextMatchKey: {
                    const numMatches = $('#shelterarea').find('.pokemon').find('.shelterfoundme').length;

                    // remove all existing locks
                    $('#shelterarea').find('.pokemon').removeClass('lock').removeClass('dismiss');

                    // default is undefined, so set the value to either 0 or 1+current
                    obj.currentlySelectedMatch = (obj.currentlySelectedMatch + 1) || 0;

                    if (numMatches) {
                        const modIndex = (numMatches == 1) ? 0 : (obj.currentlySelectedMatch + 1) % numMatches - 1;
                        const selected = $('#shelterarea').find('.pokemon').find('.shelterfoundme').parent().eq(modIndex);
                        // these steps mimic clicking on the pokemon/egg
                        selected.parent().addClass('selected');
                        selected.addClass('tooltip_trigger').addClass('lock').removeClass('dismiss');
                        selected.next().find('[data-shelter=adopt]').focus();
                    } else {
                        obj.currentlySelectedMatch = undefined;
                    }
                }
                }
            }
        });
    }
    addTextField() {
        const theField = Helpers.textSearchDiv('numberDiv', 'findCustom', 'removeShelterTextfield', 'customArray');
        const numberDiv = $('#searchkeys>div').length;
        $('#searchkeys').append(theField);
        $('.numberDiv').removeClass('numberDiv').addClass('' + numberDiv + '');
    }
    removeTextField(byebye, key) {
        this.customArray = $.grep(this.customArray, function (value) { //when textfield is removed, the value will be deleted from the localstorage
            return value != key;
        });
        this.settings.findCustom = this.customArray.toString();

        $(byebye).parent().remove();

        let i;
        for (i = 0; i < $('#searchkeys>div').length; i++) {
            const rightDiv = i + 1;
            $('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }
    }
    addTypeList() {
        const theList = Helpers.selectSearchDiv('typeNumber', 'types', 'findType', Globals.TYPE_OPTIONS,
            'removeShelterTypeList', 'fieldTypes', 'typeArray');
        const numberTypes = $('#shelterTypes>div').length;
        $('#shelterTypes').append(theList);
        $('.typeNumber').removeClass('typeNumber').addClass('' + numberTypes + '');
    }
    removeTypeList(byebye, key) {
        this.typeArray = $.grep(this.typeArray, function (value) {
            return value != key;
        });
        this.settings.findType = this.typeArray.toString();

        $(byebye).parent().remove();

        let i;
        for (i = 0; i < $('#shelterTypes>div').length; i++) {
            const rightDiv = i + 1;
            $('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }
    }
    insertShelterFoundDiv(name, img) {
        document.querySelector('#sheltersuccess').
            insertAdjacentHTML('beforeend',
                '<div id="shelterfound">' + name + ' found ' + img + '</div>');
    }
    insertShelterTypeFoundDiv(number, type, stage, names) {
        let stageNoun = '';
        if (stage === 'egg') {
            stageNoun = stage + (number !== 1 ? 's' : '');
        } else { // i.e. stage === 'Pokemon'
            stageNoun = stage;
        }
        document.querySelector('#sheltersuccess').
            insertAdjacentHTML('beforeend',
                '<div id="shelterfound">' + number + ' ' + type + ' type ' +
                stageNoun + ' found! ' + (names.length > 0 ? '(' + names.join(', ') + ')' : '') + '</div>');
    }

    searchForImgTitle(key) {
        const SEARCH_DATA = Globals.SHELTER_SEARCH_DATA;
        const keyIndex = SEARCH_DATA.indexOf(key);
        const value = SEARCH_DATA[keyIndex + 1];
        const selected = $('img[title*="' + value + '"]');
        if (selected.length) {
            const searchResult = SEARCH_DATA[keyIndex + 2]; //type of Pokémon found
            const imgResult = selected.length + ' ' + searchResult; //amount + type found
            const imgFitResult = SEARCH_DATA[keyIndex + 3]; //image for type of Pokémon
            const shelterBigImg = selected.parent().prev().children('img');
            $(shelterBigImg).addClass('shelterfoundme');

            this.insertShelterFoundDiv(imgResult, imgFitResult);
        }
    }

    searchForTooltipText(key) {
        const LIST = Globals.SHELTER_SEARCH_LISTS[key];
        const SEARCH_DATA = Globals.SHELTER_SEARCH_DATA;
        const keyIndex = SEARCH_DATA.indexOf(key);
        for (let i = 0; i < LIST.length; i++) {
            const entry = LIST[i];
            const selected = $(`div.pokemon+div.tooltip_content:contains('${entry}')`);
            if (selected.length) {
                const searchResult = SEARCH_DATA[keyIndex + 2]; //type of Pokémon found
                const imgResult = selected.length + ' ' + searchResult; //amount + type found
                const imgFitResult = SEARCH_DATA[keyIndex + 3]; //image for type of Pokémon
                const shelterBigImg = selected.prev().children('img.big');
                shelterBigImg.addClass('shelterfoundme');

                this.insertShelterFoundDiv(imgResult, imgFitResult);
            }
        }
    }

    searchForTypes(types) {
        const dexData = this.POKEDEX.DEX_DATA;
        for (let i = 0; i < types.length; i++) {
            const value = types[i];
            const foundType = Globals.SHELTER_TYPE_TABLE[Globals.SHELTER_TYPE_TABLE.indexOf(value) + 2];

            let typePokemonNames = [];
            let selected = undefined;
            if (this.settings.findTypeEgg === true) {
                const pokemonElems = [];
                typePokemonNames = [];
                selected = $('#shelterarea>.tooltip_content:contains("Egg")');
                selected.each((i, e) => {
                    const allText = $(e).text();
                    const justParentText = allText.replace($(e).children().text(), '').trim();
                    const searchPokemon = justParentText.replace('Egg', '').trim();
                    const dexifiedPokemon = searchPokemon
                        .replace(/é/g, '\\u00e9')
                        .replace(/í/g, '\\u00ed')
                        .replace(/ñ/g, '\\u00f1');
                    let searchTypeOne = '';
                    let searchTypeTwo = '';

                    const searchPokemonIndex = dexData.indexOf('"' + dexifiedPokemon + '"');
                    searchTypeOne = dexData[searchPokemonIndex + 1];
                    searchTypeTwo = dexData[searchPokemonIndex + 2];

                    if ((searchTypeOne === value) || (searchTypeTwo === value)) {
                        typePokemonNames.push(searchPokemon);
                        pokemonElems.push(e);
                    }
                });

                for (let o = 0; o < pokemonElems.length; o++) {
                    const shelterImgSearch = $(pokemonElems[o]);
                    const shelterBigImg = shelterImgSearch.prev().children('img');
                    $(shelterBigImg).addClass('shelterfoundme');
                }

                this.insertShelterTypeFoundDiv(typePokemonNames.length, foundType, 'egg', typePokemonNames);
            }

            if (this.settings.findTypePokemon === true) {
                typePokemonNames = [];
                selected = $('#shelterarea>.tooltip_content').not(':contains("Egg")');
                selected.each((i, e) => {
                    const allText = $(e).text();
                    const justParentText = allText.replace($(e).children().text(), '').trim()
                        .replace(/\n/g, '');
                    const searchPokemon = justParentText.replace(/\(Lv\..*/g, '').trim();
                    const dexifiedPokemon = searchPokemon
                        .replace(/é/g, '\\u00e9')
                        .replace(/í/g, '\\u00ed')
                        .replace(/ñ/g, '\\u00f1');
                    const searchPokemonIndex = dexData.indexOf('"' + dexifiedPokemon + '"');
                    const searchTypeOne = dexData[searchPokemonIndex + 1];
                    const searchTypeTwo = dexData[searchPokemonIndex + 2];
                    if ((searchTypeOne === value) || (searchTypeTwo === value)) {
                        typePokemonNames.push(searchPokemon);
                    }
                });

                for (let o = 0; o < typePokemonNames.length; o++) {
                    const name = typePokemonNames[o];
                    const shelterImgSearch = $(
                        `#shelterarea .tooltip_content:containsIN("${name} (")`
                    );
                    const shelterBigImg = shelterImgSearch.prev().children('img');
                    $(shelterBigImg).addClass('shelterfoundme');
                }

                this.insertShelterTypeFoundDiv(typePokemonNames.length, foundType, 'Pokemon', typePokemonNames);
            }
        }

    }

    customSearch() {
        const obj = this;
        const SEARCH_DATA = Globals.SHELTER_SEARCH_DATA;

        // search whatever you want to find in the shelter & grid

        if(this.USER_SETTINGS.shelterFeatureEnables.sort) {
            //sort in grid
            $('#shelterarea').removeClass('qolshelterareagrid');
            $('.mq2 #shelterarea').removeClass('qolshelterareagridmq2');
            $('#shelterarea .tooltip_content').removeClass('qoltooltipgrid');
            $('#shelterpage #shelter #shelterarea > .pokemon').removeClass('qolpokemongrid');
            $('#sheltergridthingy').remove();

            if (this.settings.shelterGrid === true) { //shelter grid
                $('#shelterarea').addClass('qolshelterareagrid');
                $('.mq2 #shelterarea').addClass('qolshelterareagridmq2');
                $('#shelterarea .tooltip_content').addClass('qoltooltipgrid');
                $('#shelterpage #shelter #shelterarea > .pokemon').addClass('qolpokemongrid');
                $('head').append('<style id="sheltergridthingy">#shelterarea:before{display:none !important;}</style>');
            }

            // sprite size mode
            $('#shelterarea').removeClass('qolshelterarealarge');
            $('#shelterarea').removeClass('qolshelterareasmall');
            $('input[name="shelterSpriteSize"]').prop('checked',false);
            if(this.settings.shelterSpriteSize == 'large') {
                $('#shelterarea').addClass('qolshelterarealarge');
                $('#spriteSizeLarge').prop('checked',true);
            }
            else if(this.settings.shelterSpriteSize == 'small') {
                $('#shelterarea').addClass('qolshelterareasmall');
                $('#spriteSizeSmall').prop('checked',true);
            }
            else {
                $('#spriteSizeAuto').prop('checked',true);
            }
        }

        if(this.USER_SETTINGS.shelterFeatureEnables.search) {
        /*
         * search values depending on settings
         * emptying the sheltersuccess div to avoid duplicates
         */
            document.querySelector('#sheltersuccess').innerHTML = '';
            $('#shelterarea>div>img').removeClass('shelterfoundme');

            if (this.settings.findShiny === true) {
                this.searchForImgTitle('findShiny');
            }
            if (this.settings.findAlbino === true) {
                this.searchForImgTitle('findAlbino');
            }
            if (this.settings.findMelanistic === true) {
                this.searchForImgTitle('findMelanistic');
            }
            if (this.settings.findPrehistoric === true) {
                this.searchForImgTitle('findPrehistoric');
            }
            if (this.settings.findDelta === true) {
                this.searchForImgTitle('findDelta');
            }
            if (this.settings.findMega === true) {
                this.searchForImgTitle('findMega');
            }
            if (this.settings.findStarter === true) {
                this.searchForImgTitle('findStarter');
            }
            if (this.settings.findCustomSprite === true) {
                this.searchForImgTitle('findCustomSprite');
            }
            if (this.settings.findLegendary === true) {
                this.searchForTooltipText('findLegendary');
            }

            if (this.settings.findNewPokemon === true) {
                const key = 'findNewPokemon';
                const value = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 1];
                const selected = $('#shelterarea .tooltip_content:contains(' + value + ')');
                if (selected.length) {
                    const searchResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 2];
                    const imgFitResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 3];
                    const tooltipResult = selected.length + ' ' + searchResult;
                    const shelterImgSearch = selected;
                    const shelterBigImg = shelterImgSearch.prev().children('img');
                    $(shelterBigImg).addClass('shelterfoundme');

                    this.insertShelterFoundDiv(tooltipResult, imgFitResult);
                }
            }

            if (this.settings.findNewEgg === true) {
                const key = 'findNewEgg';
                const value = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 1];
                const selected = $('#shelterarea .tooltip_content:contains(' + value + ')').filter(function () {
                // .text() will include the text in the View/Adopt and Hide buttons, so there will be a space
                    return $(this).text().startsWith(value + ' ');
                });

                if (selected.length) {
                    const searchResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 2];
                    const imgFitResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 3];
                    if (selected.length >= 1) {
                        const shelterImgSearch = selected;
                        const shelterBigImg = shelterImgSearch.prev().children('img');
                        $(shelterBigImg).addClass('shelterfoundme');
                    }
                    this.insertShelterFoundDiv(searchResult, imgFitResult);
                }
            }

            //loop to find all search genders for the custom
            const shelterValueArrayCustom = [];
            for (const key in this.settings) {
                const value = this.settings[key];
                if (value === true) {
                    if (key === 'findMale' || key === 'findFemale' || key === 'findNoGender') {
                        const searchKey = Globals.SHELTER_SEARCH_DATA[Globals.SHELTER_SEARCH_DATA.indexOf(key) + 1];
                        shelterValueArrayCustom.push(searchKey);
                    }
                }
            }

            //loop to find all the custom search parameters
            const customSearchAmount = this.customArray.length;
            const heartPng = '<img src="//pfq-static.com/img/pkmn/heart_1.png">';
            const eggPng = '<img src="//pfq-static.com/img/pkmn/egg.png">';
            for (let i = 0; i < customSearchAmount; i++) {
                const customValue = this.customArray[i];
                if (customValue != '') {
                //custom pokemon search
                    if (this.settings.customPokemon === true) {
                        const genderMatches = [];
                        if (shelterValueArrayCustom.indexOf('[M]') > -1) {
                            genderMatches.push('[M]');
                        }
                        if (shelterValueArrayCustom.indexOf('[F]') > -1) {
                            genderMatches.push('[F]');
                        }
                        if (shelterValueArrayCustom.indexOf('[N]') > -1) {
                            genderMatches.push('[N]');
                        }

                        if (genderMatches.length > 0) {
                            for (let i = 0; i < genderMatches.length; i++) {
                                const genderMatch = genderMatches[i];
                                const selected = $('#shelterarea .tooltip_content:containsIN(' + customValue + ') img[title*=\'' + genderMatch + '\']');
                                if (selected.length) {
                                    const searchResult = customValue;
                                    const genderName = Globals.SHELTER_SEARCH_DATA[Globals.SHELTER_SEARCH_DATA.indexOf(genderMatch) + 1];
                                    const imgGender = Globals.SHELTER_SEARCH_DATA[Globals.SHELTER_SEARCH_DATA.indexOf(genderMatch) + 2];
                                    const tooltipResult = selected.length + ' ' + genderName + imgGender + ' ' + searchResult;
                                    const shelterImgSearch = selected;
                                    const shelterBigImg = shelterImgSearch.parent().prev().children('img');
                                    $(shelterBigImg).addClass('shelterfoundme');

                                    this.insertShelterFoundDiv(tooltipResult, heartPng);
                                }
                            }
                        }

                        //No genders
                        else if (shelterValueArrayCustom.length === 0) {
                            const selected = $('#shelterarea .tooltip_content:containsIN(' + customValue + '):not(:containsIN("Egg"))');
                            if (selected.length) {
                                const searchResult = customValue;
                                const tooltipResult = selected.length + ' ' + searchResult;
                                const shelterImgSearch = selected;
                                const shelterBigImg = shelterImgSearch.parent().prev().children('img');
                                $(shelterBigImg).addClass('shelterfoundme');
                                this.insertShelterFoundDiv(tooltipResult, heartPng);
                            }
                        }
                    }

                    //custom egg
                    if (this.settings.customEgg === true) {
                        const selected = $('#shelterarea .tooltip_content:containsIN(' + customValue + '):contains("Egg")');
                        if (selected.length) {
                            const searchResult = customValue;
                            const tooltipResult = selected.length + ' ' + searchResult;
                            const shelterImgSearch = selected;
                            const shelterBigImg = shelterImgSearch.prev().children('img');
                            $(shelterBigImg).addClass('shelterfoundme');
                            this.insertShelterFoundDiv(tooltipResult, eggPng);
                        }
                    }

                    //imgSearch with Pokémon
                    if (this.settings.customPng === true) {
                        const selected = $(`#shelterarea img[src*="${customValue}"]`);
                        if (selected.length) {
                            let searchResult = $(selected[0]).parent().next().text().split('(')[0];
                            let searchCount = selected.length;
                            if(selected.parent().attr('data-stage')=='egg') {
                                // eggs will match twice, since their small/big sprites are the same
                                searchCount = searchCount/2;
                                // eggs do not have ( ) since they do not have a level/gender
                                searchResult = searchResult.split(' View')[0];
                                // add s for eggs
                                if(searchCount > 1) {
                                    searchResult += 's';
                                }
                            }
                            const tooltipResult = searchCount + ' ' + searchResult + ' (img search)';
                            const shelterImgSearch = selected;
                            $(shelterImgSearch).addClass('shelterfoundme');
                            this.insertShelterFoundDiv(tooltipResult, heartPng);
                        }
                    }
                }
            }

            //loop to find all the types

            const filteredTypeArray = this.typeArray.filter(v => v != '');

            if (filteredTypeArray.length > 0) {
                obj.searchForTypes(filteredTypeArray);
            }
        }
    } // customSearch
}


class SummaryPage extends Page {
  constructor() {
      super(undefined, {}, 'summary');
  } // constructor

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


class WishforgePage extends Page {
    constructor() {
        super(undefined, {}, 'forge');
        const obj = this;
        this.observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if(mutation.type === 'childList' && mutation.addedNodes.length) {
                    obj.setupHTML();
                }
            });
        });
    } // constructor

    setupHTML() {
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

        // use Globals.TYPE_LIST to get list of types
        const types = Globals.TYPE_LIST;

        // build HTML table
        let rows = {};
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

    setupObserver() {
        const target = $('#badges').next('div')[0];
        this.observer.observe(target, {
            childList: true
        });
    }
}

$(function () {
  ('use strict');
  // script entry point
  if (typeof(module) !== 'undefined') {
    module.exports.pfqol = PFQoL;
  } else {
    try {
      new PFQoL();
    } catch(err) {
      // prevent showing the fatal error output while logged out, and on non-core pages like direct image links
      if(err!='#announcements missing') {
        let message = 'Fatal error initializing QoL'
        console.error(message);
        console.error(err);
        let errorMsg = Helpers.errorToString(message, 'error', err);
        $('body').append('<div class="panel" style="padding:0.5rem;word-wrap:break-word;user-select:all;">'+errorMsg+'</div>');
      }
    }
  }
});
