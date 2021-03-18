/* globals Page */
// eslint-disable-next-line no-unused-vars
class DexPageBase extends Page {
    constructor(jQuery) {
        super(jQuery, 'QoLDexPage', {}, '/dex');
        const obj = this;
        this.observer = new MutationObserver(function (mutations) {
            // eslint-disable-next-line no-unused-vars
            mutations.forEach(function (mutation) {
                obj.applyTypeFilters();
            });
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
        // can't remove filter-type class or else the filtering
        // won't look right
        this.jQuery(clone).addClass('filter-type-2');
    }

    setupHandlers() {
        const obj = this;
        let h = obj.jQuery.parseJSON(obj.jQuery('#dexdata').html());
        const type2 = obj.jQuery('.filter-type-2');
        const l = obj.jQuery('.filter-type-2 .types');
        const c = l.children();

        const typesSpan = obj.jQuery('.filter-type-2 .types');

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
        const g = this.jQuery('.filter-type-2 .name i');
        const l = this.jQuery('.filter-type-2 .types');
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
        const l1 = this.jQuery('.entry.filter-type:not(.filter-type-2) .types');
        const l = this.jQuery('.entry.filter-type-2 .types');
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
            this.jQuery('.region-entries>li.entry').css('display', 'none');
            // Set "display" to "inline-block" for elements matching selector
            this.jQuery(selector).css('display', 'inline-block');
        } else {
            this.jQuery(selector).css('display', 'inline-block');
        }
    }
}