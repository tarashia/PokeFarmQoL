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

describe("Test Multiuser Page", () => {
    test("Test PFQoL controls on Multiuser page", () => {
        const htmlpath = path.join(__dirname, './data/', 'multiuser.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = "https://pokefarm.com/users/A,A,A,A,A,A,A,A,A,A";
        document.documentElement.innerHTML = innerHTML;


        localStorage.setItem('QoLMultiuser',
            '{"hideDislike":false,' +
            '"hideAll":false,' +
            '"niceTable":false}');
        pfqol.pfqol(jQuery);

        // trigger 'window' load handler
        $(window).trigger('load');

        // trigger MutationObserver observe
        $('#multiuser>div').eq(-1).remove();

        // trigger mutually exclusive settings
        $('[data-key=hideDislike]').trigger('click');

        // trigger .tabbed_interface click
        $('.tabbed_interface>.tab-active').find('[data-berry=aspear]').trigger('click');

        // trigger niceTable section of partyModification
        $('[data-key=niceTable]').trigger('click');

        // trigger hideAll section of partyModification
        $('[data-key=hideAll]').trigger('click');

        //         // trigger '#addLabSearch' click handler
        //         $('#addLabSearch').trigger('click');

        //         // trigger '#removeLabSearch' click handler
        //         $('#removeLabSearch').trigger('click');

        //         // trigger '#addLabTypeList' click handler
        //         $('#addLabTypeList').trigger('click');
        //         // click it again so that clicking #removeLabTypeList will execute the for loop
        //         $('#addLabTypeList').trigger('click');

        //         // trigger '#removeLabTypeList' click handler
        //         $('#removeLabTypeList').trigger('click');

        //         // trigger '#labCustomSearch input' change handler
        //         $('[data-key=findTypeEgg]').trigger('click');

        //         // trigger MutationObserver observe
        //         $('#labpage>div>div>div').children().eq(0).remove();
    });
});
