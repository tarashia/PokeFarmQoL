/** TamperMonkey polyfill to replace GM_addStyle function */
function addGlobalStyle(css) {
    const head = document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    if (!head) { return; }
    style.innerHTML = css;
    head.appendChild(style);
}