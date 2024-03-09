class DojoPage extends Page {
  constructor() {
      super(undefined, {}, 'dojo');
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
    // highlight pkmn with perfect stats
    $(".fieldmontip .item+div:contains('= 186')").parent().parent().prev().addClass('dojofoundme');

    // highlight individual perfect stats
    $(".fieldmontip .item+div .small>span:contains('31')").addClass('dojoperfectstat');
  }
}