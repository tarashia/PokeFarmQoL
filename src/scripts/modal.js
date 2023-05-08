/*
Create a popup module with the given content
By default, all modules will have a button in the top right corner that closes the window

This will return a class with the constructed, but unopened modal.
Call the new object's open function to add it to the DOM and open it.
Modals can be destroyed and removed from the DOM with their destroy method.

All modal-closing buttons should have the modalClose class
When the modal is added to the DOM, it will also add close listeners to those

*/
class Modal {
  // exposed DOM elements
  modalElement;
  dialogHead;
  dialogBody;

  openCallbacks = [];

  // content can be anything that can be appended with jQuery's append function
  // classList will add additional classes to the dialog content element
  constructor(title, content, maxWidth=null, classList=[]) {
    // dialog wrapper
    this.modalElement = document.createElement('div');
    this.modalElement.classList.add('dialog');
    // dialog sub-wrappers
    let dialogDiv1 = document.createElement('div');
    this.modalElement.appendChild(dialogDiv1);
    let dialogDiv2 = document.createElement('div');
    dialogDiv1.appendChild(dialogDiv2);
    // dialog content
    let dialog = document.createElement('div');
    dialogDiv2.appendChild(dialog);
    dialog.classList.add('qolModal');
    for(let i=0; i<classList.length; i++) {
      dialog.classList.add(classList[i]);
    }
    if(maxWidth!==null) {
      // the default max width is set in PFQ's stylesheet, at 640px
      // the default min width is 300px
      // the actual width may vary, based on content size
      dialog.style = 'max-width: '+maxWidth+'px';
    }
    // header
    this.dialogHead = document.createElement('h3');
    dialog.appendChild(this.dialogHead);
    this.dialogHead.innerText = title;
    let closeBtn = document.createElement('button');
    this.dialogHead.appendChild(closeBtn);
    closeBtn.setAttribute('type','button');
    closeBtn.innerText = 'X';
    closeBtn.classList.add('modalClose');
    // body
    this.dialogBody = document.createElement('div');
    dialog.appendChild(this.dialogBody);
    $(this.dialogBody).append(content);
  }

  // adds the modal to the DOM
  openModal() {
    // remove any already open modals
    Modal.closeModal();
    // add modal to dom
    $('body').append(this.modalElement);
    // prevent non-modal scrolling
    $('#core').addClass('scrolllock');
    // add close listeners 
    $('.modalClose').on('click', function() {
      Modal.closeModal();
    });
    // run callbacks
    for(let i=0; i<this.openCallbacks.length; i++) {
      if(typeof this.openCallbacks[i] == 'function') {
        this.openCallbacks[i]();
      }
    }
  }

  // add a function to be run after the modal opens
  // use this to add DOM-based event listeners, etc
  addOpenCallback(callback) {
    this.openCallbacks.push(callback);
  }

  // closes any open modal, even PFQ's
  static closeModal() {
    $('.dialog').remove();
  }
}