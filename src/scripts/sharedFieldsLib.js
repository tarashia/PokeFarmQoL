// Shared functions for the publicFieldsPage/privateFieldsPage
class SharedFieldsLib {
  static addPkmnLinksPopup() {
    var body = document.getElementsByTagName('body')[0];
    var header = document.getElementsByTagName('h1')[0];
    var core = document.getElementById('core');
    var newBtn = document.createElement('button');
    header.appendChild(newBtn);
    newBtn.innerText = 'View links';
    newBtn.style= 'vertical-align:middle;margin-left: 10px;';
    newBtn.onclick = function(){

        var content = '<h3>Pokemon links</h3><table style="border-collapse:collapse;">';
        var fieldmon = document.getElementsByClassName('fieldmon');
        for(var i=0; i<fieldmon.length; i++){
        if(i%4==0) {
            content += '<tr>';
        }
        var pkmnID = fieldmon[i].getAttribute('data-id');
            var small = fieldmon[i].children[1];
        var imgSRC = small.getAttribute('src');
        var pkmnName = small.getAttribute('alt');
        content += '<td style="padding:5px;border:1px solid;">' +
                   '<img style="vertical-align:middle;" src="'+imgSRC+'"> ' +
                   '<a href="/summary/'+pkmnID+'">'+pkmnName+'</a></td>';
        if(i%4==3) {
            content += '</tr>';
        }
        }
        content += '</table>';

        var dialog = document.createElement('div');
        var dialogDiv1 = document.createElement('div');
        var dialogDiv2 = document.createElement('div');
        var dialogDiv3 = document.createElement('div');
        var closeBtn = document.createElement('button');
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
