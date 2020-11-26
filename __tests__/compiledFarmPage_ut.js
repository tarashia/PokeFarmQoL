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

describe("Test Farm Page", () => {
    test("Test 'Evolve controls on Farm page", () => {
        const htmlpath = path.join(__dirname, './data/', 'farm.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = "https://pokefarm.com/farm#tab=1";
        document.documentElement.innerHTML = innerHTML;

        // load pokedex that's missing a few pokemon
        const incompleteDexPath = path.join(__dirname, './data/', 'dex_modified.json');
        const incompleteDex = fs.readFileSync(incompleteDexPath, 'utf8', 'r');
        localStorage.setItem('QoLPokedex', incompleteDex);

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

        pfqol.pfqol(jQuery);

        // trigger '#qolevolvenormal' click handler
        $('#qolevolvenormal').trigger('click');

        // trigger '#qolchangesletype' click handler
        $('#qolchangesletype').trigger('click');

        // test the part of the '#qolevolvenew' click handler that works with pokemon
        // that have not been seen
        $('#qolevolvenew').trigger('click');

        // trigger '#qolsortevolvename' click handler
        $('#qolsortevolvename').trigger('click');
    });
});
