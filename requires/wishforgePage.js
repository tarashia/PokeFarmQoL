class WishforgePage extends Page {
    constructor() {
        super('QoLDaycare', {}, 'daycare')
        const obj = this;
        this.observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
              if(document.querySelector('#fs_pokemon') !== null) {
                  obj.customSearch()
              }
          })
        });
    } // constructor
};

const wishforgePage = new WishforgePage();
