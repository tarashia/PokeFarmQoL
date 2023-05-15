class Helpers {
    static addGlobalStyle(css) {
        const head = document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        style.innerHTML = css;
        head.appendChild(style);
    }

    static buildOptionsString(arr) {
        let str = '<option value="none">None</option> ';
        if(Array.isArray(arr)) {
            for (let i = 0; i < arr.length; i++) {
                str += `<option value="${i}">${arr[i]}</option> `;
            }
        }
        // allow for object-formatted option lists
        else {
            for(let key in arr) {
                str += `<option value="${key}">${arr[key]}</option> `;
            }
        }
        return str;
    }

    // returns true if the page is equal to or smaller to the given size class
    // mobile cutoff (point when header changes): "mq2"
    // ex: const isMobile = Helpers.detectPageSize('mq2');
    static detectPageSize(size) {
        return $('html').hasClass(size);
    }

    // sets up a basic mutation observer with the given options for the specified element
    // when the mutation is observed, calls the provided callback with the detected mutation
    // watchElement is a DOM element object
    // observeOptions should be an options element compatible with mutation observers
    static addObserver(watchElement, observeOptions, callback) {
        let observer = new MutationObserver(function (mutations) {
            callback(mutations);
        });
        observer.observe(watchElement, observeOptions);
    }

    /* 
    Demo collapse html. Deviation from this may result in errors.
    
    <div class="panel accordion qolCollapse">
        <h3>
            <a href="#">
            Collapse Title
            <svg viewBox="-6 -6 12 12" width="16" height="16" class="acctoggle"><polygon fill="currentColor" points="-2,-4 4,0 -2,4"></polygon></svg>
            </a>
        </h3>
        <div style="display:none;">
            Collapse Content
        </div>
    </div>
    */
    static activateCollapses() {
        let collapses = $('.qolCollapse');
        for(let i=0; i<collapses.length; i++) {
            let header = collapses[i].children[0];
            let body = collapses[i].children[1];
            if(header && body) {
                $(header).on('click', function() {
                    if($(header).hasClass('active')) {
                        $(header).removeClass('active');
                        $(body).css('display','none');
                    }
                    else {
                        $(header).addClass('active');
                        $(body).css('display','block');
                    }
                });
            }
            else {
                ErrorHandler.error('Malformed collapse box');
                console.log(collapses[i]);
            }
        }
    }
}