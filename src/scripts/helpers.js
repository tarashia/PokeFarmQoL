class Helpers {
    static addGlobalStyle(css) {
        if(css) {
            const head = document.getElementsByTagName('head')[0];
            const style = document.createElement('style');
            style.innerHTML = css;
            head.appendChild(style);
        }
    }

    static addGlowColourCSS(glowColour) {
        if(glowColour) {
            let css = '.publicfoundme, .privatefoundme, .shelterfoundme img, .daycarefoundme, .labfoundme {';
            css += 'box-shadow: 0px 0px 25px 15px '+glowColour+' !important;';
            css += 'background-color: '+glowColour+' !important;}';
            Helpers.addGlobalStyle(css);
        }
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

    // remove accents/diacritics from a string, to make comparisons more flexible
    // Ex: Convert Flabébé to Flabebe
    // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
    static normalizeString(string) {
        return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    // compares normalized strings, and considers null and empty string equivalent
    static normalizeCompare(string1, string2) {
        if(!string1 && !string2) {
            return true;
        }
        string1 = Helpers.normalizeString(string1.toLowerCase());
        string2 = Helpers.normalizeString(string2.toLowerCase());
        return string1 == string2;
    }

    // finds a normalized value within another string
    static normalizeInclude(haystack, needle) {
        haystack = Helpers.normalizeString(haystack.toLowerCase());
        needle = Helpers.normalizeString(needle.toLowerCase());
        return haystack.includes(needle);
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

    /* activate the click and hold feature for qol tooltips
    Example tooltip:
    <span class="tooltip_trigger qolTooltip"><img src="https://pfq-static.com/img/pkmn/q/g/k.png" /></span>
    <div class="tooltip_content">Test tooltip contentx</div>
    */
    static activateTooltips() {
        $('.qolTooltip').on('click',function(event) {
            $(event.target.closest('.qolTooltip')).toggleClass('lock');
            event.stopPropagation();
        });
    }

    // Options should be on be one of the json objects from resources, or formatted similarly
    // Extras are any additional options that should appear at the top, also in object format
    // The keys of each item will be used as the option value
    // The wrapping <select> is NOT created here, so its class/ID can be set more simply
    static generateSelectOptions(options, extras={}) {
        let output = '';
        for(const key in extras) {
            output += '<option value="'+key+'">'+extras[key]+'</option>';
        }
        for(const key in options) {
            output += '<option value="'+key+'">'+options[key]+'</option>';
        }
        return output;
    }
}