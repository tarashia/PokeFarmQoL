const $ = require('../__mocks__/jquery_files').jQuery;
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

describe("Test Fishing Page", () => {
    test("Test PFQoL controls on Fishing page", () => {
        const htmlpath = path.join(__dirname, './data/', 'fishing.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = "https://pokefarm.com/fishing";
        document.documentElement.innerHTML = innerHTML;

        localStorage.setItem('QoLLab', '{}');
        pfqol.pfqol($);

        $("#selectallfishcheckbox").trigger('click');
        $('#movefishselectanycheckbox').trigger('click');
        $('#movefishselectsourcheckbox').trigger('click');
        $('#movefishselectspicycheckbox').trigger('click');
        $('#movefishselectdrycheckbox').trigger('click');
        $('#movefishselectsweetcheckbox').trigger('click');
        $('#movefishselectbittercheckbox').trigger('click');
    });
});
