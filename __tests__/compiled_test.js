const jQuery = require('jquery').jQuery;
const fs = require('fs')
const path = require('path')

describe("Test that PFQoL compiles", () => {
    test("Test that PFQoL compiles on Party page", () => {
        const htmlpath = path.join(__dirname, './data/', 'party.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        jQuery('html', document).html(html);
        require('./compiled')
    });
    test("Test that PFQoL compiles on Daycare page", () => {
        const htmlpath = path.join(__dirname, './data/', 'daycare.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        jQuery('html', document).html(html);
        require('./compiled')
    });
    test("Test that PFQoL compiles on Dex page", () => {
        const htmlpath = path.join(__dirname, './data/', 'dex.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        jQuery('html', document).html(html);
        require('./compiled')
    });
    test("Test that PFQoL compiles on Farm page", () => {
        const htmlpath = path.join(__dirname, './data/', 'farm.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        jQuery('html', document).html(html);
        require('./compiled')
    });
    test("Test that PFQoL compiles on Fishing page", () => {
        const htmlpath = path.join(__dirname, './data/', 'fishing.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        jQuery('html', document).html(html);
        require('./compiled')
    });
    test("Test that PFQoL compiles on Lab page", () => {
        const htmlpath = path.join(__dirname, './data/', 'lab.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        jQuery('html', document).html(html);
        require('./compiled')
    });
    test("Test that PFQoL compiles on Multiuser page", () => {
        const htmlpath = path.join(__dirname, './data/', 'multiuser.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        jQuery('html', document).html(html);
        require('./compiled')
    });
    test("Test that PFQoL compiles on Private Fields page", () => {
        const htmlpath = path.join(__dirname, './data/', 'privateFields.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        jQuery('html', document).html(html);
        require('./compiled')
    });
    test("Test that PFQoL compiles on Public Fields page", () => {
        const htmlpath = path.join(__dirname, './data/', 'publicFields.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        jQuery('html', document).html(html);
        require('./compiled')
    });
    test("Test that PFQoL compiles on Shelter page", () => {
        const htmlpath = path.join(__dirname, './data/', 'shelter.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        jQuery('html', document).html(html);
        require('./compiled')
    });
    test("Test that PFQoL compiles on Wishforge page", () => {
        const htmlpath = path.join(__dirname, './data/', 'wishforge.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        jQuery('html', document).html(html);
        require('./compiled')
    });
});