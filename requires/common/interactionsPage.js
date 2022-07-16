/* globals Page */
// eslint-disable-next-line no-unused-vars
class InteractionsPage extends Page {
  constructor(jQuery, localStorageMgr, helpers, GLOBALS) {
      super(jQuery, localStorageMgr, helpers, GLOBALS.INTERACTIONS_PAGE_SETTINGS_KEY, {}, 'interactions');
  } // constructor

  setupHTML() {
    console.log('50 clickback');
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
      console.log(names);
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