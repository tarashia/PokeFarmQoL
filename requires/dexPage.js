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
        const clone = elem.cloneNode(true)
        elem.parentNode.appendChild(clone)
        $(clone).addClass('filter-type-2')
    }

    setupHandlers() {
        var h = $.parseJSON($("#dexdata").html())
        const q = $("#dextemplate").html();
        const type2 = $('.filter-type-2')
        const g = document.querySelector('.filter-type-2 .name')
        const l = document.querySelector(".filter-type-2 .types")
        const c = $(l).children()
        const k = c.map(function() {
            return this.getAttribute("data-type")
        }).get()
        // based on code from dex.min.js
        function toggleSelected(b) {
            l.addClass("selected");
            c.removeClass("selected");
            if(b && b.length) {
                g.text(a(b.data("type")))
                b.addClass("selected")
            } else {
                l.removeClass("selected")
                g.text("")
            }
        }

        function e() {
            var a = c.filter(".selected").data("type");
            h = a;
            f.removeClass("filter-type");
            $.each(k, function(b, c) {
                c == a ? f.addClass("filter-type").addClass("t-" + c) : f.removeClass("t-" + c)
            })
        }

        type2.on("mousedown.dextfilter touchstart.dextfilter", function(event) {
            event.preventDefault();
            var leftedge = type2.offset().left
            var width = type2.width();
            var rightedge = leftedge + width
            event.preventDefault();
            var xLocation = (event.originalEvent.touches ? event.originalEvent.touches[0] : event).pageX;
            if(xLocation >= leftedge & xLocation < rightedge) {
                xLocation -= leftedge;
                xLocation = Math.floor(xLocation / width * c.length)
                xLocation = c.eq(xLocation)
                if(xLocation.data("type") == h) {
                    toggleSelected()
                } else {
                    h = null
                    toggleSelected(xLocation)
                }
            } else {
                toggleSelected()
            }
        })
        $(document.body).on("mousemove.dextfilter touchmove.dextfilter", type2)
            .on("mouseup.dextfilter touchend.dextfilter touchcancel.dextfilter", function(event) {
            event.preventDefault();
            $(document.body).off("mousemove.dextfilter touchmove.dextfilter mouseup.dextfilter touchend.dextfilter touchcancel.dextfilter");
            e()
        })
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
