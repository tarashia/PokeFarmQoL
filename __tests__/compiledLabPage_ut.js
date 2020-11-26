const jQuery = require('../__mocks__/jquery_files').jQuery;
const console = require('../__mocks__/console_suppress').console;
const fs = require('fs')
const path = require('path')

const pfqol = require('./compiled');

const oldWindowLocation = window.location;

beforeAll(() => {
    delete window.location;

    window.location = Object.defineProperties(
        {},
        {
            ...Object.getOwnPropertyDescriptors(oldWindowLocation),
            href: {
                writable: true,
                value: 'fdsa'
            },
            assign: {
                configurable: true,
                value: jest.fn(),
            },
        },
    );
});

describe("Test Lab Page", () => {
    test("Test PFQoL controls on Lab page", () => {
        const htmlpath = path.join(__dirname, './data/', 'lab.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = "https://pokefarm.com/lab";
        document.documentElement.innerHTML = innerHTML;

        localStorage.setItem('QoLLab', 
                             '{"findLabEgg":"o,b/v/d.png/t=1478697860",'+
                             '"customEgg":true,'+
                             '"findLabType":"13,9",'+
                             '"findTypeEgg":true}');
        pfqol.pfqol(jQuery);

        // trigger 'window' load handler
        $(window).trigger('load');

        // trigger '#addLabSearch' click handler
        $('#addLabSearch').trigger('click');

        // trigger '#removeLabSearch' click handler
        $('#removeLabSearch').trigger('click');

        // trigger '#addLabTypeList' click handler
        $('#addLabTypeList').trigger('click');
        // click it again so that clicking #removeLabTypeList will execute the for loop
        $('#addLabTypeList').trigger('click');

        // trigger '#removeLabTypeList' click handler
        $('#removeLabTypeList').trigger('click');

        // trigger '#labCustomSearch input' change handler
        $('[data-key=findTypeEgg]').trigger('click');

        // trigger MutationObserver observe
        $('#labpage>div>div>div').children().eq(0).remove();
    });
});
