class BaseFieldsPage extends Page {

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
} 
}