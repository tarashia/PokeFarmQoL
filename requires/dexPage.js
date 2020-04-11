class DexPage extends Page {
    constructor() {
        super('QoLPokedex', {}, '/dex')
        const obj = this
        this.observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                obj.filter();
            });
        });
        this.typeArray = []
    }

    setupHTML() {
//         const type1SelectDiv = `<select name="type1" class="qolsetting filtertype" data-key="filterType" array-name="filterTypes">` +
//               GLOBALS.TYPE_OPTIONS + `</select>`
//         const type2SelectDiv = `<select name="type2" class="qolsetting filtertype" data-key="filterType" array-name="filterTypes">` +
//               GLOBALS.TYPE_OPTIONS + `</select>`
//         const multifilter = `<li class="entry filter filter-type2">` +
//               `<a class="ecnt" href="#">` +
//               `<span class="type type-unknown"></span>` +
//               `<span class="qol-types">` +
//               `<span class="type-wrap-span">` + type1SelectDiv + `</span>` +
//               `<span class="type-wrap-span">` + type2SelectDiv + `</span>` +
//               `</span>` +
//               `</a>` +
//               `</li>`
        const elem = document.querySelector('.filter-type')
        elem.parentNode.appendChild(elem.cloneNode(true))
    }

    setupHandlers() {

    }

    addTypeList() {
        const theList = Helpers.selectSearchDiv('typeNumber', 'types', 'findType', GLOBALS.TYPE_OPTIONS,
                                             'removeShelterTypeList', 'fieldTypes', 'typeArray');
        let numberTypes = $('#shelterTypes>div').length;
        $('#shelterTypes').append(theList);
        $('.typeNumber').removeClass('typeNumber').addClass(""+numberTypes+"");
    }
    removeTypeList(byebye, key) {
        this.typeArray = $.grep(this.typeArray, function(value) {
            return value != key;
        });
        this.settings.findType = this.typeArray.toString()

        $(byebye).parent().remove();

        let i;
        for(i = 0; i < $('#shelterTypes>div').length; i++) {
            let rightDiv = i + 1;
            $('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
        }
    }
}

const dexPage = new DexPage();
