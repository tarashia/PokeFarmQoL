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
}