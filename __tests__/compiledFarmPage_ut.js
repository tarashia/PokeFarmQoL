/* globals __dirname global */
const $ = require('../__mocks__/jquery_files').jQuery;
// eslint-disable-next-line no-unused-vars
const console = require('../__mocks__/console_suppress').console;
const fs = require('fs');
const path = require('path');

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

describe('Test Farm Page', () => {
    it('Should be setup correctly', () => {
        const htmlpath = path.join(__dirname, './data/', 'farm.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/farm#tab=1';
        document.documentElement.innerHTML = innerHTML;

        pfqol.pfqol($);

        expect($('.qolsortnormal').length).toBe(1);
        expect($('.qolsorttype').length).toBe(1);
        expect($('.qolsortname').length).toBe(1);
        expect($('.qolsortnew').length).toBe(1);
    });

    it('Should show normal list when "Normal list" is clicked', () => {
        const htmlpath = path.join(__dirname, './data/', 'farm.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/farm#tab=1';
        document.documentElement.innerHTML = innerHTML;

        // load pokedex
        const dexPath = path.join(__dirname, './data/', 'dex.json');
        const dex = fs.readFileSync(dexPath, 'utf8', 'r');

        localStorage.setItem('QoLPokedex', dex);localStorage.setItem('QoLFarm',
            '{"TYPE_APPEND":' +
            '{"NORMAL":".0",' +
            '"FIRE":".1",' +
            '"WATER":".2",' +
            '"ELECTRIC":".3",' +
            '"GRASS":".4",' +
            '"ICE":".5",' +
            '"FIGHTING":".6",' +
            '"POISON":".7",' +
            '"GROUND":".8",' +
            '"FLYING":".9",' +
            '"PSYCHIC":".10",' +
            '"BUG":".11",' +
            '"ROCK":".12",' +
            '"GHOST":".13",' +
            '"DRAGON":".14",' +
            '"DARK":".15",' +
            '"STEEL":".16",' +
            '"FAIRY":".17",' +
            '"NONE":".18"},' +
            '"KNOWN_EXCEPTIONS":' +
            '{"Gastrodon [Orient]":[".2",".8"],' +
            '"Gastrodon [Occident]":[".2",".8"],' +
            '"Wormadam [Plant Cloak]":[".11",".4"],' +
            '"Wormadam [Trash Cloak]":[".11",".16"],' +
            '"Chilldoom":[".15",".5"],' +
            '"Raticate [Alolan Forme]":[".15",".0"],' +
            '"Ninetales [Alolan Forme]":[".5",".17"],' +
            '"Exeggutor [Alolan Forme]":[".4",".14"],' +
            '"Marowak [Alolan Forme]":[".1",".13"],' +
            '"Dugtrio [Alolan Forme]":[".8",".16"],' +
            '"Graveler [Alolan Forme]":[".12",".3"],' +
            '"Golem [Alolan Forme]":[".12",".3"],' +
            '"Muk [Alolan Forme]":[".7",".15"],' +
            '"Raichu [Alolan Forme]":[".3",".10"],' +
            '"Linoone [Galarian Forme]":[".15",".0"],' +
            '"Lycanroc [Midnight Forme]":[".12"],' +
            '"Lycanroc [Midday Forme]":[".12"]}}');

        pfqol.pfqol($);

        const htmlBefore = $('#farmnews-evolutions .scrollable').html();
        
        // need to modify the list in order to show that it goes back to normal
        // trigger '#qolsortevolvename' click handler
        $('#qolsortevolvename').trigger('click');

        // trigger '#qolevolvenormal' click handler
        $('#qolevolvenormal').trigger('click');

        // there is an inconsequential difference between the HTML before and after:
        // the <ul> item has an empty style attribute (i.e., 'style=""')
        // remove the empty attribute from the before HTML
        const htmlAfter = $('#farmnews-evolutions .scrollable').html().replace(' style=""', '');

        expect(htmlBefore).toBe(htmlAfter);
    });

    it.skip('Should sort on types when "Sort on types" is clicked', () => {
        const htmlpath = path.join(__dirname, './data/', 'farm.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/farm#tab=1';
        document.documentElement.innerHTML = innerHTML;

        // load pokedex
        const dexPath = path.join(__dirname, './data/', 'dex.json');
        const dex = fs.readFileSync(dexPath, 'utf8', 'r');
        localStorage.setItem('QoLPokedex', dex);

        localStorage.setItem('QoLPokedex', dex);localStorage.setItem('QoLFarm',
            '{"TYPE_APPEND":' +
            '{"NORMAL":".0",' +
            '"FIRE":".1",' +
            '"WATER":".2",' +
            '"ELECTRIC":".3",' +
            '"GRASS":".4",' +
            '"ICE":".5",' +
            '"FIGHTING":".6",' +
            '"POISON":".7",' +
            '"GROUND":".8",' +
            '"FLYING":".9",' +
            '"PSYCHIC":".10",' +
            '"BUG":".11",' +
            '"ROCK":".12",' +
            '"GHOST":".13",' +
            '"DRAGON":".14",' +
            '"DARK":".15",' +
            '"STEEL":".16",' +
            '"FAIRY":".17",' +
            '"NONE":".18"},' +
            '"KNOWN_EXCEPTIONS":' +
            '{"Gastrodon [Orient]":[".2",".8"],' +
            '"Gastrodon [Occident]":[".2",".8"],' +
            '"Wormadam [Plant Cloak]":[".11",".4"],' +
            '"Wormadam [Trash Cloak]":[".11",".16"],' +
            '"Chilldoom":[".15",".5"],' +
            '"Raticate [Alolan Forme]":[".15",".0"],' +
            '"Ninetales [Alolan Forme]":[".5",".17"],' +
            '"Exeggutor [Alolan Forme]":[".4",".14"],' +
            '"Marowak [Alolan Forme]":[".1",".13"],' +
            '"Dugtrio [Alolan Forme]":[".8",".16"],' +
            '"Graveler [Alolan Forme]":[".12",".3"],' +
            '"Golem [Alolan Forme]":[".12",".3"],' +
            '"Muk [Alolan Forme]":[".7",".15"],' +
            '"Raichu [Alolan Forme]":[".3",".10"],' +
            '"Linoone [Galarian Forme]":[".15",".0"],' +
            '"Lycanroc [Midnight Forme]":[".12"],' +
            '"Lycanroc [Midday Forme]":[".12"]}}');

        pfqol.pfqol($);

        // trigger '#qolchangesletype' click handler
        $('#qolchangesletype').trigger('click');
    });

    it('Should sort on names when "Sort on name" is clicked', () => {
        const htmlpath = path.join(__dirname, './data/', 'farm.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/farm#tab=1';
        document.documentElement.innerHTML = innerHTML;

        const expectedPath = path.join(__dirname, './data/', 'farmListSortedOnName.html');
        const expectedHTML = fs.readFileSync(expectedPath, 'utf8', 'r');
        
        // load pokedex
        const dexPath = path.join(__dirname, './data/', 'dex.json');
        const dex = fs.readFileSync(dexPath, 'utf8', 'r');
        localStorage.setItem('QoLPokedex', dex);

        localStorage.setItem('QoLFarm',
            '{"TYPE_APPEND":' +
            '{"NORMAL":".0",' +
            '"FIRE":".1",' +
            '"WATER":".2",' +
            '"ELECTRIC":".3",' +
            '"GRASS":".4",' +
            '"ICE":".5",' +
            '"FIGHTING":".6",' +
            '"POISON":".7",' +
            '"GROUND":".8",' +
            '"FLYING":".9",' +
            '"PSYCHIC":".10",' +
            '"BUG":".11",' +
            '"ROCK":".12",' +
            '"GHOST":".13",' +
            '"DRAGON":".14",' +
            '"DARK":".15",' +
            '"STEEL":".16",' +
            '"FAIRY":".17",' +
            '"NONE":".18"},' +
            '"KNOWN_EXCEPTIONS":' +
            '{"Gastrodon [Orient]":[".2",".8"],' +
            '"Gastrodon [Occident]":[".2",".8"],' +
            '"Wormadam [Plant Cloak]":[".11",".4"],' +
            '"Wormadam [Trash Cloak]":[".11",".16"],' +
            '"Chilldoom":[".15",".5"],' +
            '"Raticate [Alolan Forme]":[".15",".0"],' +
            '"Ninetales [Alolan Forme]":[".5",".17"],' +
            '"Exeggutor [Alolan Forme]":[".4",".14"],' +
            '"Marowak [Alolan Forme]":[".1",".13"],' +
            '"Dugtrio [Alolan Forme]":[".8",".16"],' +
            '"Graveler [Alolan Forme]":[".12",".3"],' +
            '"Golem [Alolan Forme]":[".12",".3"],' +
            '"Muk [Alolan Forme]":[".7",".15"],' +
            '"Raichu [Alolan Forme]":[".3",".10"],' +
            '"Linoone [Galarian Forme]":[".15",".0"],' +
            '"Lycanroc [Midnight Forme]":[".12"],' +
            '"Lycanroc [Midday Forme]":[".12"]}}');

        pfqol.pfqol($);

        // trigger '#qolsortevolvename' click handler
        $('#qolsortevolvename').trigger('click');

        expect($('.qolEvolveNameList').length).toBe(1);
        expect($('.evolvepkmnlist').length).toBe(1);
        expect($('.evolvepkmnlist').css('display')).toBe('none');
        expect($('#farmnews-evolutions .scrollable').html()).toBe(expectedHTML);
    });

    it.skip('Should only show new pokemon when "New dex entry" is clicked', () => {
        const htmlpath = path.join(__dirname, './data/', 'farm.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/farm#tab=1';
        document.documentElement.innerHTML = innerHTML;

        // load pokedex that's missing a few pokemon
        const incompleteDexPath = path.join(__dirname, './data/', 'dex_modified.json');
        const incompleteDex = fs.readFileSync(incompleteDexPath, 'utf8', 'r');
        localStorage.setItem('QoLPokedex', incompleteDex);

        localStorage.setItem('QoLPokedex');localStorage.setItem('QoLFarm',
            '{"TYPE_APPEND":' +
            '{"NORMAL":".0",' +
            '"FIRE":".1",' +
            '"WATER":".2",' +
            '"ELECTRIC":".3",' +
            '"GRASS":".4",' +
            '"ICE":".5",' +
            '"FIGHTING":".6",' +
            '"POISON":".7",' +
            '"GROUND":".8",' +
            '"FLYING":".9",' +
            '"PSYCHIC":".10",' +
            '"BUG":".11",' +
            '"ROCK":".12",' +
            '"GHOST":".13",' +
            '"DRAGON":".14",' +
            '"DARK":".15",' +
            '"STEEL":".16",' +
            '"FAIRY":".17",' +
            '"NONE":".18"},' +
            '"KNOWN_EXCEPTIONS":' +
            '{"Gastrodon [Orient]":[".2",".8"],' +
            '"Gastrodon [Occident]":[".2",".8"],' +
            '"Wormadam [Plant Cloak]":[".11",".4"],' +
            '"Wormadam [Trash Cloak]":[".11",".16"],' +
            '"Chilldoom":[".15",".5"],' +
            '"Raticate [Alolan Forme]":[".15",".0"],' +
            '"Ninetales [Alolan Forme]":[".5",".17"],' +
            '"Exeggutor [Alolan Forme]":[".4",".14"],' +
            '"Marowak [Alolan Forme]":[".1",".13"],' +
            '"Dugtrio [Alolan Forme]":[".8",".16"],' +
            '"Graveler [Alolan Forme]":[".12",".3"],' +
            '"Golem [Alolan Forme]":[".12",".3"],' +
            '"Muk [Alolan Forme]":[".7",".15"],' +
            '"Raichu [Alolan Forme]":[".3",".10"],' +
            '"Linoone [Galarian Forme]":[".15",".0"],' +
            '"Lycanroc [Midnight Forme]":[".12"],' +
            '"Lycanroc [Midday Forme]":[".12"]}}');

        pfqol.pfqol($);

        // test the part of the '#qolevolvenew' click handler that works with pokemon
        // that have not been seen
        $('#qolevolvenew').trigger('click');
    });

});
