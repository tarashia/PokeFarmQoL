/* globals __dirname global */
const $ = require('../__mocks__/jquery_files').jQuery;
// eslint-disable-next-line no-unused-vars
const console = require('../__mocks__/console_suppress').console;
const fs = require('fs');
const path = require('path');

const pfqol = require('./compiled');

const oldWindowLocation = window.location;

function internalTrim(jObj) {
    // trim self
    const re = RegExp('>(.*?)<', 'g');
    for (let i = 0; i < jObj.length; i++) {
        const currentHTML = jObj.eq(i).html().trim();
        if (currentHTML.length) {
            let textBetweenTags;
            if (re.test(currentHTML)) {
                while ((textBetweenTags = re.exec(currentHTML)) !== null) {
                    let [tagAndText, justText] = textBetweenTags;
                    let htmlBeforeText = currentHTML.substring(0, textBetweenTags.index + 1);
                    let textTrimmed = justText.replace(/\s{1,}/g, ' ').trim();
                    let htmlAfterText = currentHTML.substring(textBetweenTags.index + tagAndText.length - 1);
                    let newHTML = (htmlBeforeText + textTrimmed + htmlAfterText).trim();
                    jObj.eq(i).html(newHTML);
                }
            }
            else
                jObj.eq(i).html(currentHTML.replace(/\s{1,}/g, ' ').trim());
        }
    }
    // trim children
    for (let j = 0; j < jObj.length; j++) {
        internalTrim(jObj.eq(j).children());
    }
}

function internalStringTrim(currentHTML) {
    // trim self
    const startsWithTextBeforeElement = /^([^>]*?)</s;
    const endsWithTextAfterElement = />([^<]*?)$/s;
    const hasTextBetweenElements = RegExp('>(.*?)<', 'sg');
    if (currentHTML.length) {
        let newHTML = '';
        let textBetweenTags;
        let lastIndex = 0;
        // before elements
        if (((textBetweenTags = startsWithTextBeforeElement.exec(currentHTML)) !== null) &&
            textBetweenTags[1] !== '') {
            let justText = textBetweenTags[1];
            let textTrimmed = justText.replace(/\s{1,}/g, ' ').trim();
            newHTML += currentHTML.substring(lastIndex, textBetweenTags.index);
            newHTML += `${textTrimmed}<`;
            lastIndex = textBetweenTags[0].length;
        }
        // between elements
        while ((textBetweenTags = hasTextBetweenElements.exec(currentHTML)) !== null) {
            let justText = textBetweenTags[1];
            let textTrimmed = justText.replace(/\s{1,}/g, ' ').trim();
            newHTML += currentHTML.substring(lastIndex, textBetweenTags.index);
            newHTML += `>${textTrimmed}<`;
            lastIndex = hasTextBetweenElements.lastIndex;
        }
        // after elements
        if (((textBetweenTags = endsWithTextAfterElement.exec(currentHTML)) !== null) &&
            textBetweenTags[1] !== '') {
            let justText = textBetweenTags[1];
            let textTrimmed = justText.replace(/\s{1,}/g, ' ').trim();
            newHTML += currentHTML.substring(lastIndex, textBetweenTags.index);
            newHTML += `>${textTrimmed}`;
            lastIndex = currentHTML.length;
        }

        if (!newHTML)
            return currentHTML.replace(/\s{1,}/g, ' ').trim();
        else {
            newHTML += currentHTML.substring(lastIndex);
            return newHTML.replace(/\s{1,}/g, ' ').trim();
        }
    }
    return currentHTML.trim();
}

// extend jQuery with recursive HTML equality function
$.fn.equivalent = function (compareTo) {
    if (!compareTo || this.length != compareTo.length) {
        return false;
    }
    for (var i = 0; i < this.length; ++i) {
        if (!$(this[i]).children().equivalent($(compareTo[i]).children())) {
            return false;
        }
    }
    for (var i = 0; i < this.length; ++i) {
        // use a "fuzzy" equivalency by removing extraneous whitespace that
        // doesn't actually affect the structure of the HTML
        let actual = $(this[i]);
        let expected = $(compareTo[i]);
        let actualHTML = internalStringTrim(actual.html());
        let expectedHTML = internalStringTrim(expected.html());
        if (actualHTML !== expectedHTML) {
            return false;
        }
    }
    return true;
}

// extend jQuery with recursive node equality function
$.fn.equals = function (compareTo) {
    if (!compareTo || this.length != compareTo.length) {
        return false;
    }
    for (var i = 0; i < this.length; ++i) {
        if (this[i] !== compareTo[i]) {
            return false;
        }
    }
    for (var i = 0; i < this.length; ++i) {
        if (!$(this[i]).children().equals($(compareTo[i]).children())) {
            return false;
        }
    }
    return true;
};

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
    it.skip('Should be setup correctly', () => {
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

    it.skip('Should show normal list when "Normal list" is clicked', () => {
        const htmlpath = path.join(__dirname, './data/', 'farm.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/farm#tab=1';
        document.documentElement.innerHTML = innerHTML;

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

        const htmlBefore = $('#farmnews-evolutions .scrollable').html();

        // need to modify the list in order to show that it goes back to normal
        // trigger '#qolsortevolvename' click handler
        $('#qolsortevolvename').trigger('click');

        // trigger '#qolevolvenormal' click handler
        $('#qolevolvenormal').trigger('click');

        // there is an inconsequential difference between the HTML before and after:
        // the <ul> item has an empty style attribute (i.e., 'style=""')
        // remove the empty attribute from the after HTML
        const htmlAfter = $('#farmnews-evolutions .scrollable').html().replace(' style=""', '');

        expect(htmlBefore).toBe(htmlAfter);
    });

    it.skip('Should sort on types when "Sort on types" is clicked', () => {
        const htmlpath = path.join(__dirname, './data/', 'farm.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/farm#tab=1';
        document.documentElement.innerHTML = innerHTML;

        const expectedPath = path.join(__dirname, './data/', 'farmListSortedOnType.html');
        const expectedObjects = $($.parseHTML(fs.readFileSync(expectedPath, 'utf8', 'r').trim()));
        const expectedHTML = expectedObjects.filter('ul');

        // load pokedex
        const dexPath = path.join(__dirname, './data/', 'dex.json');
        const dex = fs.readFileSync(dexPath, 'utf8', 'r');
        localStorage.setItem('QoLPokedex', dex);

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

        // trigger '#qolchangesletype' click handler
        $('#qolchangesletype').trigger('click');

        expect($('.qolEvolveTypeList').length).toBe(1);
        expect($('.evolvepkmnlist').length).toBe(1);
        expect($('.qolEvolveTypeList').css('display')).toBe('block');
        expect($('.evolvepkmnlist').css('display')).toBe('none');
        const actualHTML = $('#farmnews-evolutions .scrollable').children();
        expect(actualHTML.equivalent(expectedHTML)).toBeTruthy();
    });

    it.skip('Should sort on names when "Sort on name" is clicked', () => {
        const htmlpath = path.join(__dirname, './data/', 'farm.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/farm#tab=1';
        document.documentElement.innerHTML = innerHTML;

        const expectedPath = path.join(__dirname, './data/', 'farmListSortedOnName.html');
        const expectedObjects = $($.parseHTML(fs.readFileSync(expectedPath, 'utf8', 'r').trim()));
        const expectedHTML = expectedObjects.filter('ul');
        // need to remove all the internal whitespace
        internalTrim(expectedHTML);

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
        expect($('.qolEvolveNameList').css('display')).toBe('block');
        expect($('.evolvepkmnlist').css('display')).toBe('none');
        const actualHTML = $('#farmnews-evolutions .scrollable').children();
        internalTrim(actualHTML);
        expect(actualHTML.equivalent(expectedHTML)).toBeTruthy();
    });

    it('Should only show new pokemon when "New dex entry" is clicked', () => {
        const htmlpath = path.join(__dirname, './data/', 'farm.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/farm#tab=1';
        document.documentElement.innerHTML = innerHTML;

        const expectedPath = path.join(__dirname, './data/', 'farmListSortedOnNew.html');
        const expectedObjects = $($.parseHTML(fs.readFileSync(expectedPath, 'utf8', 'r').trim()));
        const expectedHTML = expectedObjects.filter('ul');
        // need to remove all the internal whitespace
        internalTrim(expectedHTML);

        /* load pokedex that gas a few mods:
         * - Charmeleon has been removed
         * - Raticate [Alolan Forme] replaced Raticate
         *   - Type 1 modified to be 4 (Grass)
         *   - Type 2 modified to be 7 (Poison)
         *   - Eggs set to 1 ("1 egg(s) entries exist")
         *   - Egg Dex set to 1 ("1 egg seen")
         *   - Pokemon set to 2 ("2 pokemon entries exist")
         *   - Poke Dex set to 1 ("1 pokemon entry(ies) seen")
         *   - Shiny Dex set to 0 ("0 shiny entry(ies) seen")
         *   - Albino Dex set to 0 ("0 albino entry(ies) seen")
         *   - Melanistic Dex set to 0 ("0 melanistic entry(ies) seen")
         * - Lycanroc's data has been modified
         *   - Eggs set to 1
         *   - Egg Dex set to 1
         *   - Pokemon set to 3
         *   - Poke Dex set to 1
         *   - Shiny Dex set to 0
         *   - Albino Dex set to 0
         *   - Melanistic Dex set to 0
         * - Thievul's data has been modified
         *   - Eggs set to 1
         *   - Egg Dex set to 1
         *   - Pokemon set to 1
         *   - Poke Dex set to 0
         *   - Shiny Dex set to 0
         *   - Albino Dex set to 0
         *   - Melanistic Dex set to 0
         *   Frosmoth's data has been modified
         *   - Eggs set to 1
         *   - Egg Dex set to 1
         *   - Pokemon set to 2
         *   - Poke Dex set to 1
         *   - Shiny Dex set to 1
         *   - Albino Dex set to 1
         *   - Melanistic Dex set to 1
         * - Phasmaleef [Forest Forme] has been removed
         * - Phasmaleef [Desert Forme] has been removed
         * - Quibbit [Toxic Forme]'s data has been modified
         *   - Eggs set to 0
         *   - Egg Dex set to 0
         *   - Pokemon set to 2
         *   - Poke Dex set to 1
         *   - Shiny Dex set to 0
         *   - Albino Dex set to 0
         *   - Melanistic Dex set to 0
         * - Quibbit [Magma Forme]'s data has been modified
         *   - Eggs set to 0
         *   - Egg Dex set to 0
         *   - Pokemon set to 1
         *   - Poke Dex set to 0
         *   - Shiny Dex set to 0
         *   - Albino Dex set to 0
         *   - Melanistic Dex set to 0
         */
        const incompleteDexPath = path.join(__dirname, './data/', 'dex_modified.json');
        let incompleteDex = fs.readFileSync(incompleteDexPath, 'utf8', 'r');
        // use today as the date to avoid reloading the dex from the "web" (a file in this case)
        incompleteDex = JSON.parse(incompleteDex);
        incompleteDex[0] = (new Date()).toUTCString();
        incompleteDex = JSON.stringify(incompleteDex);
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

        pfqol.pfqol($);

        expect(localStorage.getItem('QoLPokedex')).toBe(incompleteDex);

        // test the part of the '#qolevolvenew' click handler that works with pokemon
        // that have not been seen
        $('#qolevolvenew').trigger('click');
    });

});
