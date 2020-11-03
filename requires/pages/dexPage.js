class DexPage extends Page {
    constructor() {
        super('QoLDexPage', {}, '/dex')
        const obj = this
        this.observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                obj.applyTypeFilters();
            });
        });
        this.typeArray = []
    }
    setupObserver() {
        this.observer.observe(document.querySelector('#regionslist'), {
            childList: true,
            subtree: true,
        });
    }
    setupHTML() {
        const elem = document.querySelector('.filter-type')
        const clone = elem.cloneNode(true)
        elem.parentNode.appendChild(clone)
        // can't remove filter-type class or else the filtering
        // won't look right
        $(clone).addClass('filter-type-2')
    }

    setupHandlers() {
        const obj = this
        var h = $.parseJSON($("#dexdata").html())
        const type2 = $('.filter-type-2')
        const g = $('.filter-type-2 .name i')
        const l = $(".filter-type-2 .types")
        const c = l.children()
        const k = c.map(function() {
            return this.getAttribute("data-type")
        }).get()

        const typesSpan = $('.filter-type-2 .types')

        type2.on("mousedown.dextfilter touchstart.dextfilter", function(event) {
            event.preventDefault();
            var leftedge = typesSpan.offset().left
            var width = typesSpan.width();
            var rightedge = leftedge + width
            event.preventDefault();
            var xLocation = (event.originalEvent.touches ? event.originalEvent.touches[0] : event).pageX;
            if(xLocation >= leftedge & xLocation < rightedge) {
                xLocation -= leftedge;
                xLocation = Math.floor(xLocation / width * c.length)
                xLocation = c.eq(xLocation)
                if(xLocation.data("type") == h) {
                    h = null
                    obj.toggleSelectedTypes()
                    obj.applyTypeFilters();
                } else {
                    h = xLocation.data("type")
                    obj.toggleSelectedTypes(xLocation)
                    obj.applyTypeFilters();
                }
            } else {
                obj.toggleSelectedTypes()
                obj.applyTypeFilters();
            }
        })
    }

    toggleSelectedTypes(b) {
        const g = $('.filter-type-2 .name i')
        const l = $(".filter-type-2 .types")
        const c = l.children()

        l.addClass("selected");
        c.removeClass("selected");
        if(b && b.length) {
            if(!b.hasClass("selected")) {
                b.addClass("selected")
                g.text(b.data("type").charAt(0).toUpperCase() + b.data("type").slice(1))
            } else {
                l.removeClass("selected")
                b.removeClass("selected")
                g.text("")
            }
        } else {
            l.removeClass("selected")
            g.text("")
        }
    }

    applyTypeFilters() {
        const l1 = $(".entry.filter-type:not(.filter-type-2) .types")
        const l = $(".entry.filter-type-2 .types")
        const c1 = l1.children()
        const c = l.children()

        // get the first filter type
        const a1 = c1.filter(".selected").data("type");
        const a = c.filter(".selected").data("type");

        let selector = '.region-entries>li.entry'
        if(a1 !== undefined) {
            selector += '.t-' + a1
        }
        if(a !== undefined) {
            selector += '.t-' + a
        }
        if(a1 || a) {
            // Set "display" to "none" for all elements
            $('.region-entries>li.entry').css("display", "none")
            // Set "display" to "inline-block" for elements matching selector
            $(selector).css("display", "inline-block")
        } else {
            $(selector).css("display", "inline-block")
        }
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