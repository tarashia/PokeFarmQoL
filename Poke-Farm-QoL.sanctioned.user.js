// eslint-disable-next-line multiline-comment-style
// ==UserScript==
// @name         Poké Farm QoL
// @namespace    https://github.com/jpgualdarrama/
// @author       Bentomon
// @homepage     https://github.com/jpgualdarrama/PokeFarmQoL
// @downloadURL  https://github.com/jpgualdarrama/PokeFarmQoL/raw/master/Poke-Farm-QoL.sanctioned.user.js
// @updateURL    https://github.com/jpgualdarrama/PokeFarmQoL/raw/master/Poke-Farm-QoL.sanctioned.user.js
// @description  Quality of Life changes to Pokéfarm!
// @version      1.6.9
// @match        https://pokefarm.com/*
// @connect      github.com
// ==/UserScript==
// eslint-disable-next-line no-undef
$(function () {
    ('use strict');
    /** TamperMonkey polyfill to replace GM_addStyle function */
    // eslint-disable-next-line no-unused-vars
    function addGlobalStyle(css) {
        const head = document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        if (!head) { return; }
        style.innerHTML = css;
        head.appendChild(style);
    }
    /**
     * This class is used to store CSS and HTML snippets that were previously loaded via Tampermonkey's '@resource' tool
     */
    // eslint-disable-next-line no-unused-vars
    class ResourcesBase {
        css() {
            return `/* Pokefarm QoL style sheet */

        /* Announcement bar */
        
        #announcements li[data-name="QoL"] {
            cursor: pointer;
        }
        
        /* Shelter Page */
        
        /* tooltip */
        
        .qoltooltip_trigger {
            position: relative;
            display: inline-block;
            border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
        }
        
        .tooltip .tooltiptext {
            visibility: hidden;
            width: 500px;
            text-align: center;
            padding: 5px 0;
            border-radius: 6px;
        
            position: absolute;
            z-index: 1;
            bottom: 125%;
            left: 50%;
            margin-left: 0px;
        
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .tooltip .tooltiptext::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
        }
        
        .tooltip:hover .tooltiptext {
            visibility: visible;
            opacity: 1;
        }
        
        .customsearchtooltip {
            width: 400px;
        }
        
        /* shelter notification wrap */
        #sheltersuccess {
            text-align: center;
        }
        
        /* shelter notification */
        #shelterfound {
            padding-top: 20px;
        }
        
        /* shelter Pokemon/egg found background */
        .publicfoundme, .privatefoundme, .shelterfoundme, .daycarefoundme, .labfoundme {
            box-shadow: 0px 0px 25px 15px #d5e265;
            background-color: #d5e265;
            border-radius: 100%;
        }
        
        /*shelterSort */
        
        /* shelter grid sort */
        .qolshelterareagrid {
            min-height: 350px;
            display: flex!important;
            flex-direction:row;
            flex-flow: row wrap;
            display: grid!important;
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: repeat(5, 70px);
        }
        .qolshelterareagridmq2 {
            min-height: 175px;
            grid-template-rows: repeat(5, 35px);
        }
        .qoltooltipgrid {
            position: absolute!important;
            bottom: 0;
            transform: translate(0, 100%);
        }
        .qolpokemongrid {
            position: static!important;
            flex: 1 1 16%;
            display: inline-block!important;
            display: inline-flex!important;
            justify-content: center;
            align-items: center;
        }
        
        /* fields */
        /* Field settings div */
        #fieldorder {
            margin: 16px auto;
            padding: 4px;
            border-radius: 4px;
            max-width: 600px;
            position: relative;
        }
        
        #fieldsearch {
            margin: 16px auto;
            max-width: 600px;
            position: relative;
        }
        
        /* sort by berry */
        .qolAnyBerry {
            left: 0%!important;
            top: 45%!important;
            margin: -10px!important;
            transition: none!important;
        }
        .qolAnyBerry>img.big {
            animation: none!important;
            padding: 25px!important;
        }
        .qolSourBerry {
            left: 0%!important;
            top: 45%!important;
            margin: -10px!important;
            transition: none!important;
        }
        .qolSourBerry>img.big {
            animation: none!important;
            padding: 25px!important;
        }
        
        .qolSpicyBerry {
            left: 20%!important;
            top: 45%!important;
            margin: -10px!important;
            transition: none!important;
        }
        
        .qolSpicyBerry>img.big {
            animation: none!important;
            padding: 25px!important;
        }
        
        .qolDryBerry {
            left: 40%!important;
            top: 45%!important;
            margin: -10px!important;
            transition: none!important;
        }
        
        .qolDryBerry>img.big {
            animation: none!important;
            padding: 25px!important;
        }
        
        .qolSweetBerry {
            left: 60%!important;
            top: 45%!important;
            margin: -10px!important;
            transition: none!important;
        }
        
        .qolSweetBerry>img.big {
            animation: none!important;
            padding: 25px!important;
        }
        
        .qolBitterBerry {
            left: 80%!important;
            top: 45%!important;
            margin: -10px!important;
            transition: none!important;
        }
        .qolBitterBerry>img.big {
            animation: none!important;
            padding: 25px!important;
        }
        
        /* sort in middle */
        .qolSortMiddle {
            left: 40%!important;
            top: 35%!important;
            margin: -10px!important;
            transition: none!important;
        }
        
        .qolSortMiddle>img.big {
            animation: none!important;
            padding: 40px!important;
        }
        
        
        /* field sort in grid */
        .qolGridField {
            min-height: 345px;
            display: flex!important;
            flex-flow: row wrap;
            display: grid;
            grid-template-columns: repeat(8,12.5%);
            grid-template-rows: repeat(5,69px);
            padding-top: 0%!important;
        }
        
        .mq25 .qolGridField {
            min-height: 180px;
            grid-template-rows: repeat(5, 36px);
        }
        
        .qolGridPokeSize {
            margin: 0 !important;
            position: static!important;
            flex: 1 1 12.5%;
            display: inline-flex;
            justify-content: center;
            align-items: center;
        }
        
        .qolGridPokeImg {
            max-width: 75px;
            max-height: 70px;
            animation: none!important;
        }
        
        /* QoL Settings Hub */
        .qolHubSuperHead:first-child {
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        } 
        
        .qolHubHead {
            text-align: center;
            padding: 4px;
            margin: 0;
            text-align: center;
        }
        
        .qolAllSettings {
            width: 315px;
            height: 100%;
            border-top: none;
            vertical-align: top;
        }
        
        .qolChangeLog {
            width: 315px;
            height: 100%;
            border-top: none;
        }
        
        .qolAllSettings>ul {
            list-style-type: none;
            padding: 0px;
            vertical-align: top;
        }
        
        .qolHubTable {
            border-spacing: 0px 0px;
            border-collapse: collapse;
        }
        
        .qolChangeLogList {
            text-align: left;
            padding: 4px;
            margin: 0;
            text-align: center;
        }
        
        .qolChangeLogContent {
            list-style-type: disc;
            display: none;
        }
        
        .expandlist {
            font-size: 16px;
            text-align: center;
            list-style-type: none;
        }
        
        .slidermenu {
            cursor: pointer;
        }
        
        .qolChangeLogHead {
            margin: 0px;
        }
        
        .closeHub {
            text-align: right;
            margin: 0px 10px 0px 0px;
            font-size: 20px;
            cursor: pointer;
        }
        
        /* qol party clicking mod */
        /* settings menu */
        #qolpartymod {
            text-align: center;
        }
        
        .qolpartyclickhide {
            display: none!important;
        }
        
        .qolpartyclickwidth {
            width: 100%!important;
        }
        
        .qolpartyclickblock {
            display: inline-block!important;
        }
        
        .qolpartyclickz {
            z-index: 100!important;
        }

        .qolpartyclickbigscreen {
          left: 50%!important;
          top: 50%!important;
        }

        .qolpartyclicksmallscreen {
          left: 50%!important;
          top: 75%!important;
        }
        
        .qolpartyclickalot {
            position: absolute!important;
            background-color: transparent!important;
            border: none!important;
        }
        
        .qolpartyclicknav {
            position: absolute!important;
        }
        
        .qolpartyclickpartywidth {
            width: 300px!important;
        }
        
        .qolpartyclickpartydivwidth {
            width: 211px!important;
        }
        
        .qolpartyclickborderone {
            border-top-right-radius: 6px!important;
        }
        
        .qolpartyclickbordertwo {
            border-top-right-radius: 0px!important;
            border-top-width: 0px!important;
        }
        
        .qolpartyclickborderthree {
            border-bottom-left-radius: 0px!important;
        }
        
        .qolpartyclickborderfour {
            border-bottom-left-radius: 6px!important;
        }
        
        .qolpartyclickborderfive {
            border-right-width: 1px!important;
        }
        
        .qolpartyclickul {
            height: 35px!important;
            overflow: hidden!important;
        }
        
        .qolpartyclicklilabel {
            width: 5px!important;
            padding: 2px!important;
        }
        
        /* hide dislike */
        .qolpartyclicktextalign {
            text-align: center!important;
        }
        
        /* lab */
        /* lab notification wrap */
        #labsuccess {
            text-align: center;
        }
        
        /* lab notification div */
        #labfound {
            padding-top: 20px;
        }
        
        /* lab <p> bold */
        .boldp {
            font-weight: bold;
        }
        
        .collapsible {
          cursor: pointer;
          padding: 4px;
          width: 100%;
          text-align: left;
          max-width: 600px;
          position: relative;
          border-radius: 6px;
        }
        
        /* Style the collapsible content. Note: hidden by default */
        .collapsible_content {
          padding: 0 18px;
          display: none;
          overflow: hidden;
        }
        
        /* evolutions left highlighting */
        .oneevolutionleft {
            box-shadow: 0px 0px 25px 15px #f36971; /* light red */
            background-color: #f36971;
            border-radius: 100%;
        }
        
        .twoevolutionleft {
            box-shadow: 0px 0px 25px 15px #6a6df2; /* light blue */
            background-color: #6a6df2;
            border-radius: 100%;
        }
        
        /* wishforge page */
        .badgelist>table>tbody>tr>td>.itemtooltip {
            position: relative;
            margin-top: -28px;
        }
        .badgelist>table>tbody>tr>td>p {
            margin-block-start: 0;
            margin-block-end: 0;
        }`;
        }

        fieldSearchHTML() {
            return `<div id ="fieldsearch">
          <button type="button" class="collapsible"><b>Advanced Field search</b></button>
          <div class="collapsible_content">
            <p> Check the boxes of Pokemon you wish to find in this field! You can select multiple checkboxes at once and it will notify you whenever it will find the types of Pokemons you selected!</p>
            <table>
                <tbody>
                <tr>
                    <td>
                    <label>
                        <input type="checkbox" class="qolsetting" data-key="fieldShiny"/>Shiny
                    </label>
                    </td>
                    <td>
                    <label>
                        <input type="checkbox" class="qolsetting" data-key="fieldAlbino"/>Albino
                    </label>
                    </td>
                    <td>
                    <label>
                        <input type="checkbox" class="qolsetting" data-key="fieldMelanistic"/>Melanistic
                    </label>
                    </td>
                </tr>
                <tr>
                    <td>
                    <label>
                        <input type="checkbox" class="qolsetting" data-key="fieldPrehistoric"/>Prehistoric
                    </label>
                    </td>
                    <td>
                    <label>
                        <input type="checkbox" class="qolsetting" data-key="fieldDelta"/>Delta
                    </label>
                    </td>
                </tr>
                <tr>
                    <td>
                    <label>
                        <input type="checkbox" class="qolsetting" data-key="fieldMega"/>Mega
                    </label>
                    </td>
                    <td>
                    <label>
                        <input type="checkbox" class="qolsetting" data-key="fieldStarter"/>Starter
                    </label>
                    </td>
                </tr>
                <tr>
                    <td>
                    <label>
                        <input type="checkbox" class="qolsetting" data-key="fieldCustomSprite"/>Custom Sprite
                    </label>
                    </td>
                    <td>
                    <label>
                        <input type="checkbox" class="qolsetting" data-key="fieldItem"/>Holds Item
                    </label>
                    </td>
                </tr>
                </tbody>
            </table>
            <h4>Search on type</h4>
            <p>Select which types of Pokemon you wish to find</p>
            <input type='button' value='Add type' id='addFieldTypeSearch'>
            <div id="fieldTypes">
                <div class='0'></div>
            </div>
            <h4>Search on nature</h4>
            <p>Select which natures of Pokemon you wish to find</p>
            <input type='button' value='Add nature' id='addFieldNatureSearch'>
            <div id="natureTypes">
                <div class='0'></div>
            </div>
            <h4>Search on egg group</h4>
            <p>Select which egg groups you wish to find</p>
            <input type='button' value='Add egg group' id='addFieldEggGroupSearch'>
            <div id="eggGroupTypes">
                <div class='0'></div>
            </div>
            <h4>Custom Search</h4>
            <p>Here you can custom find any Pokemon you want! Hover over "Custom Search Help" for more info.</p>
            <div class="tooltip_trigger qoltooltip_trigger">Custom Search Help</div>
            <div class="tooltip_content customsearchtooltip">
                <span class="tooltiptext">
                Custom search by Pokemon name
                <br>
                <br>
                Select Custom Egg and/or Custom Pokemon and type the name of the Pokemon you wish to find to find that Pokemon or the egg of that Pokemon. If you want to find a Pokemon with a specific gender, select the gender you wish to find.
                <br>
                <br>
                Custom search by image code
                <br>
                <br>
                Select By img code (and de-select Custom Egg & Custom Pokemon checkboxes) to find a Pokemon or egg by img code. For example you wish to find a Bulbasaur. When the URL for its image is this:
                <br>
                //pfq-static.com/img/pkmn/1/g/g.png/t=1474027727
                <br>
                paste only '1/g/g' (without the quotes), and now it will show you when a Bulbasaur is found! You may also copy the complete link.
                <br>
                <a href="https://docs.google.com/spreadsheets/d/1rD1VZNTQRYXMOVKvGasjmMdMJu-iheE-ajsFkfs4QXA/edit?usp=sharing">List of Eggs Image Codes</a>
                <br>
                <br>
                More info on finding Pokemon with their img code:
                <br>
                <br>
                <a href="https://pokefarm.com/forum/thread/127552/Site-Skins-How-To-and-Helpful-CSS">"Pokemon Modifications - Make Shelter Pokemon Stand Out"</a>
                </span>
            </div>

            <table>
                <tbody>
                <tr>
                    <td>
                <label>
                    <input type="checkbox" class="qolsetting" data-key="fieldCustomEgg"/>Custom Egg
                </label>
                    </td>
                    <td>
                <label>
                    <input type="checkbox" class="qolsetting" data-key="fieldCustomPokemon"/>Custom Pokemon
                </label>
                    </td>
                </tr>
                <tr>
                    <td>
                <label>
                    <input type="checkbox" class="qolsetting" data-key="fieldCustomPng"/>By img code
                </label>
                    </td>
                </tr>
                </tbody>
            </table>
            <h4>Search on gender</h4>
            <table>
                <tbody>
                <tr>
                    <td>
                    <label>
                        <input type="checkbox" class="qolsetting" data-key="fieldMale"/>Male
                    </label>
                    </td>
                    <td>
                    <label>
                        <input type="checkbox" class="qolsetting" data-key="fieldFemale"/>Female
                    </label>
                    </td>
                    <td>
                    <label>
                        <input type="checkbox" class="qolsetting" data-key="fieldNoGender"/>Genderless
                    </label>
                    </td>
                </tr>
                </tbody>
            </table>

            <h4>Search Keys</h4>
            <input type='button' value='Add searchfield' id='addTextField'>
            <div id="searchkeys">
                <div class='0'></div>
            </div>
          </div>
        </div>`;
        }

        fieldSortHTML() {
            return `<div id="fieldorder">
        <label>
          <input type="checkbox" class="qolsetting qolalone" data-key="fieldByBerry"/>
          Sort by berries
        </label>
        <label>
          <input type="checkbox" class="qolsetting qolalone" data-key="fieldByMiddle"/>
          Sort in the middle
        </label>
        <label>
          <input type="checkbox" class="qolsetting qolalone" data-key="fieldByGrid"/>
          Align to grid
        </label>
        <label>
          <input type="checkbox" class="qolsetting" data-key="fieldClickCount"/>
          Click counter
        </label>
      </div>`;
        }

        labOptionsHTML() {
            return `<div id="labCustomSearch" class="center">
        <p class='boldp'>Egg type search</p>
        <p>Select which egg types you would like to find in the lab. You can select multiple!</p>
        <input type="checkbox" class="qolsetting" data-key="findTypeEgg"/>Egg types
        <input type='button' value='Add typesearch' id='addLabTypeList'>
        <div id="labTypes">
            <div class='0'></div>
        </div>
    
        <p class='boldp'>Egg custom search</p>
        <p>Add the pokemon name or Img code (complete link starting from //pfq..) that you would like to find in the lab in a searchfield. You can select multiple!</p>
        <input type="checkbox" class="qolsetting" data-key="customEgg"/>Custom Egg
        <input type='button' value='Add searchfield' id='addLabSearch'>
        <div id="searchkeys">
            <div class='0'></div>
        </div>
    </div>`;
        }

        evolveFastHTML() {
            return `<ul class="qolEvolveTypeList"><li class="expandlist"><h3 class="slidermenu">Normal</h3>
		    <ul class="normal 0 qolChangeLogContent"></ul></li><br>
            <li class="expandlist"><h3 class="slidermenu">Fire</h3>
                    <ul class="Fire 1 qolChangeLogContent"></ul>
                </li><br>
                <li class="expandlist"><h3 class="slidermenu">Water</h3>
                    <ul class="Water 2 qolChangeLogContent"></ul>
                </li><br>
                <li class="expandlist"><h3 class="slidermenu">Electric</h3>
                    <ul class="Electric 3 qolChangeLogContent"></ul>
                </li><br>
                <li class="expandlist"><h3 class="slidermenu">Grass</h3>
                    <ul class="Grass 4 qolChangeLogContent"></ul>
                </li><br>
                <li class="expandlist"><h3 class="slidermenu">Ice</h3>
                    <ul class="Ice 5 qolChangeLogContent"></ul>
                </li><br>
                <li class="expandlist"><h3 class="slidermenu">Fighting</h3>
                    <ul class="Fighting 6 qolChangeLogContent"></ul>
                </li><br>
                <li class="expandlist"><h3 class="slidermenu">Poison</h3>
                    <ul class="Poison 7 qolChangeLogContent"></ul>
                </li><br>
                <li class="expandlist"><h3 class="slidermenu">Ground</h3>
                    <ul class="Ground 8 qolChangeLogContent"></ul>
                </li><br>
                <li class="expandlist"><h3 class="slidermenu">Flying</h3>
                    <ul class="Flying 9 qolChangeLogContent"></ul>
                </li><br>
                <li class="expandlist"><h3 class="slidermenu">Psychic</h3>
                    <ul class="Psychic 10 qolChangeLogContent"></ul>
                </li><br>
                <li class="expandlist"><h3 class="slidermenu">Bug</h3>
                    <ul class="Bug 11 qolChangeLogContent"></ul>
                </li><br>
                <li class="expandlist"><h3 class="slidermenu">Rock</h3>
                    <ul class="Rock 12 qolChangeLogContent"></ul>
                </li><br>
                <li class="expandlist"><h3 class="slidermenu">Ghost</h3>
                    <ul class="Ghost 13 qolChangeLogContent"></ul>
                </li><br>
                <li class="expandlist"><h3 class="slidermenu">Dragon</h3>
                    <ul class="Dragon 14 qolChangeLogContent"></ul>
                </li><br>
                <li class="expandlist"><h3 class="slidermenu">Dark</h3>
                    <ul class="Dark 15 qolChangeLogContent"></ul>
                </li><br>
                <li class="expandlist"><h3 class="slidermenu">Steel</h3>
                    <ul class="Steel 16 qolChangeLogContent"></ul>
                </li><br>
                <li class="expandlist"><h3 class="slidermenu">Fairy</h3>
                    <ul class="Fairy 17 qolChangeLogContent"></ul>
                </li><br>
                <li class="expandlist"><h3 class="slidermenu">Unknown Types</h3>
                    <ul class="Unknown 18 qolChangeLogContent"></ul>
                </li>
            </ul>`;
        }

        privateFieldSearchHTML() {
            return `<div id ="fieldsearch">
        <button type="button" class="collapsible"><b>Advanced Field search</b></button>
        <div class="collapsible_content">
        <p> Check the boxes of Pokemon you wish to find in this field! You can select multiple checkboxes at once and it will notify you whenever it will find the types of Pokemons you selected!</p>
        <table>
          <tbody>
            <tr>
              <td>
                <label>
                  <input type="checkbox" class="qolsetting" data-key="fieldShiny"/>Shiny
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" class="qolsetting" data-key="fieldAlbino"/>Albino
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" class="qolsetting" data-key="fieldMelanistic"/>Melanistic
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  <input type="checkbox" class="qolsetting" data-key="fieldPrehistoric"/>Prehistoric
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" class="qolsetting" data-key="fieldDelta"/>Delta
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  <input type="checkbox" class="qolsetting" data-key="fieldMega"/>Mega
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" class="qolsetting" data-key="fieldStarter"/>Starter
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  <input type="checkbox" class="qolsetting" data-key="fieldCustomSprite"/>Custom Sprite
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" class="qolsetting" data-key="fieldItem"/>Holds Item
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <h4>Search on type</h4>
        <p>Select which types of Pokemon you wish to find</p>
        <input type='button' value='Add type' id='addPrivateFieldTypeSearch'>
        <div id="fieldTypes">
          <div class='0'></div>
        </div>
        <h4>Search on nature</h4>
        <p>Select which natures of Pokemon you wish to find</p>
        <input type='button' value='Add nature' id='addPrivateFieldNatureSearch'>
        <div id="natureTypes">
          <div class='0'></div>
        </div>
        <h4>Search on egg group</h4>
        <p>Select which egg groups you wish to find</p>
        <input type='button' value='Add egg group' id='addPrivateFieldEggGroupSearch'>
        <div id="eggGroupTypes">
          <div class='0'></div>
        </div>
        <h4>Custom Search</h4>
        <p>Here you can custom find any Pokemon you want! Hover over "Custom Search Help" for more info.</p>
        <div class="tooltip_trigger qoltooltip_trigger">Custom Search Help</div>
        <div class="tooltip_content customsearchtooltip">
          <span class="tooltiptext">
            Custom search by Pokemon name
            <br>
            <br>
            Select Custom Egg and/or Custom Pokemon and type the name of the Pokemon you wish to find to find that Pokemon or the egg of that Pokemon. If you want to find a Pokemon with a specific gender, select the gender you wish to find.
            <br>
            <br>
            Custom search by image code
            <br>
            <br>
            Select By img code (and de-select Custom Egg & Custom Pokemon checkboxes) to find a Pokemon or egg by img code. For example you wish to find a Bulbasaur. You paste it's Img code in the search bar:
            <br>
            //pfq-static.com/img/pkmn/1/g/g.png/t=1474027727
            <br>
            and now it will show you when a Bulbasaur is found! Copy paste the complete link (starting from //) or you won't find anything.
            <br>
            <br>
            <a href="https://docs.google.com/spreadsheets/d/1rD1VZNTQRYXMOVKvGasjmMdMJu-iheE-ajsFkfs4QXA/edit?usp=sharing">List of Eggs Image Codes</a>
            <br>
            <br>
            More info on finding Pokemon with their img code:
            <br>
            <br>
            <a href="https://pokefarm.com/forum/thread/127552/Site-Skins-How-To-and-Helpful-CSS">"Pokemon Modifications - Make Shelter Pokemon Stand Out"</a>
          </span>
        </div>
      
        <table>
          <tbody>
            <tr>
              <td>
            <label>
              <input type="checkbox" class="qolsetting" data-key="customEgg"/>Custom Egg
            </label>
              </td>
              <td>
            <label>
              <input type="checkbox" class="qolsetting" data-key="customPokemon"/>Custom Pokemon
            </label>
              </td>
            </tr>
            <tr>
              <td>
            <label>
              <input type="checkbox" class="qolsetting" data-key="customPng"/>By img code
            </label>
              </td>
            </tr>
          </tbody>
        </table>
        <h4>Search on gender</h4>
        <table>
          <tbody>
            <tr>
              <td>
                <label>
                  <input type="checkbox" class="qolsetting" data-key="fieldMale"/>Male
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" class="qolsetting" data-key="fieldFemale"/>Female
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" class="qolsetting" data-key="fieldNoGender"/>Genderless
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      
        <h4>Search Keys</h4>
        <input type='button' value='Add searchfield' id='addTextField'>
        <div id="searchkeys">
          <div class='0'></div>
        </div>
        </div>
      </div>`;
        }

        shelterOptionsHTML() {
            return `<div id ="shelteroptionsqol">
        <p> Check the boxes of Pokemon you wish to find in the shelter! You can select multiple checkboxes at once and it will notify you whenever it will find the types of Pokemon you selected! Use the letter 'n' key to select and cycle through the Pokemon matched by the script.</p>
        <table>
          <tbody>
            <tr>
          <td>
            <label>
              <input type="checkbox" class="qolsetting" data-key="findNewEgg"/>New Egg
            </label>
          </td>
          <td>
            <label>
              <input type="checkbox" class="qolsetting" data-key="findNewPokemon"/>New Pokemon
            </label>
          </td>
            </tr>
            <tr>
          <td>
            <label>
              <input type="checkbox" class="qolsetting" data-key="findShiny"/>Shiny
            </label>
          </td>
          <td>
            <label>
              <input type="checkbox" class="qolsetting" data-key="findAlbino"/>Albino
            </label>
          </td>
            </tr>
            <tr>
          <td>
            <label>
              <input type="checkbox" class="qolsetting" data-key="findMelanistic"/>Melanistic
            </label>
          </td>
          <td>
            <label>
              <input type="checkbox" class="qolsetting" data-key="findPrehistoric"/>Prehistoric
            </label>
          </td>
            </tr>
            <tr>
          <td>
            <label>
              <input type="checkbox" class="qolsetting" data-key="findDelta"/>Delta
            </label>
          </td>
          <td>
            <label>
              <input type="checkbox" class="qolsetting" data-key="findMega"/>Mega
            </label>
          </td>
            </tr>
            <tr>
          <td>
            <label>
              <input type="checkbox" class="qolsetting" data-key="findStarter"/>Starter
            </label>
          </td>
          <td>
            <label>
              <input type="checkbox" class="qolsetting" data-key="findCustomSprite"/>Custom Sprite
            </label>
          </td>
            </tr>
            <tr>
          <td>
            <label>
              <input type="checkbox" class="qolsetting" data-key="findLegendary"/>Legendary
            </label>
          </td>
            </tr>
          </tbody>
        </table>
        <h4>Search on type</h4>
        <p>Select which types of Pokemon and/or eggs you wish to find</p>
        <table>
          <tbody>
            <tr>
          <td>
            <label>
              <input type="checkbox" class="qolsetting" data-key="findTypeEgg"/>Egg types
            </label>
          </td>
          <td>
            <label>
              <input type="checkbox" class="qolsetting" data-key="findTypePokemon"/>Pokemon types
            </label>
          </td>
            </tr>
          </tbody>
        </table>
        <input type='button' value='Add typesearch' id='addShelterTypeList'>
        <div id="shelterTypes">
          <div class='0'></div>
        </div>
        <h4>Custom Search</h4>
        <p>Here you can custom find any Pokemon you want! Hover over "Custom Search Help" for more info.</p>
        <div class="tooltip_trigger qoltooltip_trigger">Custom Search Help</div>
        <div class="tooltip_content customsearchtooltip">
          <span class="tooltiptext">
            Custom search by Pokemon name
            <br>
            <br>
            Select Custom Egg and/or Custom Pokemon and type the name of the Pokemon you wish to find to find that Pokemon or the egg of that Pokemon. If you want to find a Pokemon with a specific gender, select the gender you wish to find.
            <br>
            <br>
            Custom search by image code
            <br>
            <br>
            Select By img code (and de-select Custom Egg & Custom Pokemon checkboxes) to find a Pokemon or egg by img code. For example you wish to find a Bulbasaur. You paste it's Img code in the search bar:
            <br>
            //pfq-static.com/img/pkmn/1/g/g.png/t=1474027727
            <br>
            and now it will show you when a Bulbasaur is found! Copy paste the complete link (starting from //) or you won't find anything.
            <br>
            <br>
            <a href="https://docs.google.com/spreadsheets/d/1rD1VZNTQRYXMOVKvGasjmMdMJu-iheE-ajsFkfs4QXA/edit?usp=sharing">List of Eggs Image Codes</a>
            <br>
            <br>
            More info on finding Pokemon with their img code:
            <br>
            <br>
            <a href="https://pokefarm.com/forum/thread/127552/Site-Skins-How-To-and-Helpful-CSS">"Pokemon Modifications - Make Shelter Pokemon Stand Out"</a>
          </span>
        </div>
      
        <table>
          <tbody>
            <tr>
              <td>
            <label>
              <input type="checkbox" class="qolsetting" data-key="customEgg"/>Custom Egg
            </label>
              </td>
              <td>
            <label>
              <input type="checkbox" class="qolsetting" data-key="customPokemon"/>Custom Pokemon
            </label>
              </td>
            </tr>
            <tr>
              <td>
            <label>
              <input type="checkbox" class="qolsetting" data-key="customPng"/>By img code
            </label>
              </td>
            </tr>
          </tbody>
        </table>
        <h4>Search on Gender</h4>
        <table>
          <tbody>
            <tr>
              <td>
            <label>
              <input type="checkbox" class="qolsetting" data-key="findMale"/>Male
            </label>
              </td>
              <td>
            <label>
              <input type="checkbox" class="qolsetting" data-key="findFemale"/>Female
            </label>
              </td>
            </tr>
            <tr>
              <td>
            <label>
              <input type="checkbox" class="qolsetting" data-key="findNoGender"/>Genderless
            </label>
              </td>
            </tr>
          </tbody>
        </table>
      
        <h4>Search Keys</h4>
        <input type='button' value='Add searchfield' id='addShelterTextfield'>
        <div id="searchkeys">
          <div class='0'></div>
        </div>
      </div>`;
        }

        qolHubHTML() {
            return `<div class="dialog">
        <div>
          <div>
            <div>
              <h3 class="qolHubHead qolHubSuperHead">Quality of Life userscript Hub</h3>
              <div>
                <p>Welcome to the user hub of the QoL userscript! Here you can adjust the script settings and view the latest changes to the script.</p>
                <div>
                  <table class="qolHubTable">
                    <tbody>
                      <tr>
                        <td>
                          <h3 class="qolHubHead">Settings</h3>
                        </td>
                        <td>
                          <h3 class="qolHubHead">Change log</h3>
                        </td>
                      </tr>
                      <tr>
                        <td class="qolAllSettings">
                          <ul>
                            <li>
                              <label>
                                <input type='checkbox' class='qolhubsetting' data-key='enableDaycare'/>
                                <span>
                                  Highlight Breeding Matches
                                </span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input type="checkbox" class="qolhubsetting" data-key="shelterEnable"/>
                                <span>
                                  Enable All Shelter QoL Features
                                </span>
                              </label>
                              <ul>
                                <li>
                                  <label>
                                    <input type="checkbox" class="qolhubsetting" data-key="shelterFeatureEnables.search"/>
                                    <span>
                                      Advanced Searching
                                    </span>
                                  </label>
                                </li>
                                <li>
                                  <label>
                                    <input type="checkbox" class="qolhubsetting" data-key="shelterFeatureEnables.sort"/>
                                    <span>
                                      Advanced Sorting
                                    </span>
                                  </label>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <label>
                                <input type="checkbox" class="qolhubsetting" data-key="fishingEnable"/>
                                <span>
                                  Fishing Multi-Select Controls
                                </span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input type="checkbox" class="qolhubsetting" data-key="publicFieldEnable"/>
                                <span>
                                  Enable All Public Fields QoL Features
                                </span>
                              </label>
                              <ul>
                                <li>
                                  <label>
                                    <input type="checkbox" class="qolhubsetting" data-key="publicFieldFeatureEnables.search"/>
                                    <span>
                                      Advanced Searching
                                    </span>
                                  </label>
                                </li>
                                <li>
                                  <label>
                                    <input type="checkbox" class="qolhubsetting" data-key="publicFieldFeatureEnables.sort"/>
                                    <span>
                                      Advanced Sorting
                                    </span>
                                  </label>
                                </li>
                                <li>
                                  <label>
                                    <input type="checkbox" class="qolhubsetting" data-key="publicFieldFeatureEnables.tooltip"/>
                                    <span>
                                      Tooltips Enable/Disable
                                    </span>
                                  </label>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <label>
                                <input type="checkbox" class="qolhubsetting" data-key="privateFieldEnable"/>
                                <span>
                                  Enable All Private Fields QoL Features
                                </span>
                              </label>
                              <ul>
                                <li>
                                  <label>
                                    <input type="checkbox" class="qolhubsetting" data-key="privateFieldFeatureEnables.search"/>
                                    <span>
                                      Advanced Searching
                                    </span>
                                  </label>
                                </li>
                                <li>
                                  <label>
                                    <input type="checkbox" class="qolhubsetting" data-key="privateFieldFeatureEnables.release"/>
                                    <span>
                                      Multi-Select Controls (Move & Release)
                                    </span>
                                  </label>
                                </li>
                                <li>
                                  <label>
                                    <input type="checkbox" class="qolhubsetting" data-key="privateFieldFeatureEnables.tooltip"/>
                                    <span>
                                      Tooltips Enable/Disable
                                    </span>
                                  </label>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <label>
                                <input type="checkbox" class="qolhubsetting" data-key="partyMod"/>
                                <span>
                                  Party click mod
                                </span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input type="checkbox" class="qolhubsetting" data-key="easyEvolve"/>
                                <span>
                                  Easy evolving
                                </span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input type="checkbox" class="qolhubsetting" data-key="labNotifier"/>
                                <span>
                                  Lab Notifier
                                </span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input type="checkbox" class="qolhubsetting" data-key="dexFilterEnable"/>
                                <span>
                                  Multiple Types Filtering
                                </span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input type="checkbox" class="qolhubsetting" data-key="condenseWishforge"/>
                                <span>
                                  Smaller Crafted Badges List
                                </span>
                              </label>
                            </li>
                          </ul>
                          <span><b>Note</b>: Please refresh the page to see any changes made to these settings take effect.</span>
                        </td>
                        <td class="qolChangeLog">
                          <ul class="qolChangeLogList">
                            <li class="expandlist">
                              <span>
                                Change log was removed as of April 2021. Visit
                                <a href="https://github.com/jpgualdarrama/PokeFarmQoL">GitHub</a>
                                for the latest list of features
                              </span>
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" class="qolDexUpdate">
                          <h3 class="qolHubHead">Pokedex Settings</h3>
                        </td>
                      </tr>
                      <tr id="qolDexUpdateRow"> <!-- Filled in by implementations -->
                      </tr>
                      <tr id="qolDexClearRow">
                        <td colspan="2">
                          <input type='button' value="Clear Cached Dex" id="clearCachedDex">
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" class="qolAllSettings">
                          <h3 class="qolHubHead">Css Settings</h3>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <span>Add your custom css! not all custom css works if you add a site-skin to Pokefarm because the script overrides those css changes, add your custom skin here instead! If you have an error in your css you won't get notified, so read your code carefully. Still doesn't work? Try: '!important'. The custom css is being loaded after the page loads, so it's possible that there will be a short delay before your css changes apply. To change the css of the script refer to it's stylesheet and change what you want to change here in the textarea.<br><a href="https://github.com/KaizokuBento/PokeFarmQoL/blob/master/resources/css/pfqol.css" target="_blank">Qol Userscript StyleSheet</a></span>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" class="qolAllSettings">
                          <div class='textareahub'></div>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" class="qolAllSettings">
                          <h3 class="qolHubHead">Debugging Corner</h3>
                        </td>
                      </tr>
                      <tr id="qolDebuggingCornerRow">
                        <td colspan="2" class="qolAllSettings">
                          <span>Use these controls to reset the settings for a particular page back to its defaults</span><br>
                          <span><b>Page Select</b></span>
                          <!-- Option values correspond to keys in the PAGES object in the main script -->
                          <select name='Page Select' class="qolHubResetSettingsSelect" data-key="resetPageSettings">
                            <option value="None">None</option>
                            <option value="Daycare">Daycare</option>
                            <option value="Farm">Farm</option>
                            <option value="Fishing">Fishing</option>
                            <option value="Lab">Lab</option>
                            <option value="Multiuser">Multiuser</option>
                            <option value="PrivateFields">Private Fields</option>
                            <option value="PublicFields">Public Fields</option>
                            <option value="Shelter">Shelter</option>
                          </select>
                          <input type='button' value="Reset Page Settings" id="resetPageSettings">
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p class='closeHub'>Close</p>
            </div>
          </div>
        </div>
      </div>`;
        }

        publicFieldTooltipModHTML() {
            return `<div id=tooltipenable>
        <button type="button" class="collapsible"><b>Tooltip Settings</b></button>
        <div class="collapsible_content">
          <span> The "Enable tooltip" settings force the tooltip on or off. To revert back to Pokefarm's default tooltip settings, uncheck "Enable QoL Tooltip Changes" and refresh the page.</span>
          <hr>
          <table>
            <tr>
              <td>
                <label>
                  <input type="checkbox" class="qolsetting tooltipsetting" data-key="tooltipEnableMods"/>
                  Enable QoL Tooltip Settings
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  <input type="checkbox" class="qolsetting tooltipsetting" data-key="tooltipNoBerry"/>
                  Hide tooltip<br>(No berry selected)
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" class="qolsetting tooltipsetting" data-key="tooltipBerry"/>
                  Hide tooltip<br>(Berry selected)
                </label>
              </td>
            </tr>
          </table>
        </div>
      </div>`;
        }

        privateFieldTooltipModHTML() {
            return `<div id=tooltipenable>
        <button type="button" class="collapsible"><b>Tooltip Settings</b></button>
        <div class="collapsible_content">
          <span> The "Enable tooltip" settings force the tooltip on or off. To revert back to Pokefarm's default tooltip settings, uncheck "Enable QoL Tooltip Changes" and refresh the page.</span>
          <hr>
          <table>
            <tr>
              <td>
                <label>
                  <input type="checkbox" class="qolsetting tooltipsetting" data-key="tooltipEnableMods"/>
                  Enable QoL Tooltip Settings
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  <input type="checkbox" class="qolsetting tooltipsetting" data-key="tooltipNoBerry"/>
                  Hide tooltip
                </label>
              </td>
            </tr>
          </table>
        </div>
      </div>`;
        }
    }
    // eslint-disable-next-line no-unused-vars
    class Helpers {
        buildOptionsString(arr) {
            let str = '<option value="none">None</option> ';
            for (let i = 0; i < arr.length; i++) {
                str += `<option value="${i}">${arr[i]}</option> `;
            }
            return str;
        }
        toggleSetting(key, set, cls) {
        // provide default value for cls
            cls = cls || 'qolsetting';
            // update values for checkboxes
            if (typeof set === 'boolean') {
                const element = document.querySelector(`.${cls}[data-key="${key}"]`);
                if (element && element.type === 'checkbox') {
                    element.checked = set;
                }
            }
        } // toggleSetting
        setupFieldArrayHTML($, arr, id, div, cls) {
            const n = arr.length;
            for (let i = 0; i < n; i++) {
                const rightDiv = i + 1;
                const rightValue = arr[i];
                $(`#${id}`).append(div);
                $(`.${cls}`).removeClass(cls).addClass('' + rightDiv + '').find('.qolsetting').val(rightValue);
            }
        }
        loadSettings($, KEY, DEFAULT, obj) {
            if (localStorage.getItem(KEY) === null) {
                this.saveSettings(KEY);
            } else {
                try {
                    const countScriptSettings = Object.keys(obj).length;
                    const localStorageString = JSON.parse(localStorage.getItem(KEY));
                    const countLocalStorageSettings = Object.keys(localStorageString).length;
                    if (countLocalStorageSettings < countScriptSettings) { // adds new objects (settings) to the local storage
                        const defaultsSetting = DEFAULT;
                        const userSetting = JSON.parse(localStorage.getItem(KEY));
                        const newSetting = $.extend(true, {}, defaultsSetting, userSetting);

                        obj = newSetting;
                        this.saveSettings(KEY, obj);
                    }
                    if (countLocalStorageSettings > countScriptSettings) {
                        this.saveSettings(KEY, obj);
                    }
                }
                catch (err) {
                    this.saveSettings(KEY, obj);
                }
                if (localStorage.getItem(KEY) != JSON.stringify(obj)) {
                    obj = JSON.parse(localStorage.getItem(KEY));
                }
            }

            return obj;
        }
        saveSettings(key, obj) {
            localStorage.setItem(key, JSON.stringify(obj));
        }
        textSearchDiv(cls, dataKey, id, arrayName) {
            return `<div class='${cls}'><label><input type="text" class="qolsetting" data-key="${dataKey}" ` +
            `array-name='${arrayName}'` +
            `/></label><input type='button' value='Remove' id='${id}'></div>`;
        }
        selectSearchDiv(cls, name, dataKey, options, id, divParent, arrayName) {
            return `<div class='${cls}'> <select name='${name}' class="qolsetting" data-key='${dataKey}' ` +
            `array-name='${arrayName}'> ${options} </select> <input type='button' value='Remove' id='${id}'> </div>`;
        }
        parseFieldPokemonTooltip($, GLOBALS, tooltip) {
            const dataElements = $(tooltip).children(0).children();
            let index = 1;
            // nickname
            const nickname = dataElements[index].textContent;
            if (!nickname) {
                console.error(`Helpers.parseFieldPokemonTooltip - nickname '${nickname}' (is not a valid name)`);
            }
            index++;

            /*
             * Issue #59 - Pokefarm added a new h3 element after the nickname
             * that contains no data
             */
            index++;

            // species
            let species = '';
            if (dataElements[index].textContent) {
                const tc = dataElements[index].textContent;
                const tcSplit = tc.trim().split(':  ');
                if (tcSplit.length == 1) {
                    console.error('Helpers.parseFieldPokemonTooltip - species text does not contain \':  \'');
                }
                else {
                    species = tcSplit[1];
                }
            }
            index++;

            // dataElements[3] will be a forme if the pokemon has a forme
            let forme = '';
            if (dataElements[index].textContent &&
            dataElements[index].textContent.startsWith('Forme')) {
                forme = dataElements[index].textContent.substr('Forme: '.length);
                index++;
            }

            // types
            const typeElements = $(dataElements[index]).children().slice(1);
            const typeUrls = typeElements.map(idx => typeElements[idx]['src']);
            let types = typeUrls.map(idx =>
                typeUrls[idx].substring(typeUrls[idx].indexOf('types/') + 'types/'.length,
                    typeUrls[idx].indexOf('.png')));
            types = types.map(idx => types[idx].charAt(0).toUpperCase() + types[idx].substring(1));
            types = types.map(idx => GLOBALS.TYPE_LIST.indexOf(types[idx]));
            index++;

            // level
            let level = -1;
            if (dataElements[index].textContent) {
                const tcSplit = dataElements[index].textContent.split(' ');
                if (tcSplit.length > 1) {
                    level = parseInt(tcSplit[1]);
                }
            } else {
                console.error('Helpers.parseFieldPokemonToolTip - could not load level because text was empty');
            }
            index++;

            // if the pokemon's happiness is less than max, skip the next index, since it will be a progress bar
            if (!dataElements[index].textContent ||
            !dataElements[index].textContent.startsWith('Happiness')) {
                index++;
            }

            // happiness
            let happiness = -1;
            if (dataElements[index].textContent) {
                const tcSplit = dataElements[index].textContent.split(' ');
                if (tcSplit.length > 1) {
                    happiness = tcSplit[1].trim();
                    happiness = (happiness == 'MAX') ? 100 : parseInt(happiness.substring(0, happiness.length - 1));
                }
            } else {
                console.error('Helpers.parseFieldPokemonToolTip - could not load happiness because text was empty');
            }
            index++;

            // nature
            let nature = -1;
            if (dataElements[index].textContent) {
                const tcSplit = dataElements[index].textContent.split(' ');
                if (tcSplit.length > 1) {
                    nature = tcSplit[1].replace('(', '').trim();
                    nature = GLOBALS.NATURE_LIST.indexOf(nature); // .substring(0, nature.length-1))
                }
            } else {
                console.error('Helpers.parseFieldPokemonToolTip - could not load nature because text was empty');
            }
            index++;

            // held item
            let item = '';
            if (dataElements[index].textContent !== 'Item: None') {
                item = dataElements[index].textContent.substring(dataElements[8].textContent.indexOf(' ') + 1);
            } else {
                item = 'None';
            }
            index++;

            // egg groups
            let eggGroups = [];
            if (dataElements[index].textContent) {
                eggGroups = dataElements[index].textContent.substring('Egg Group: '.length).split('/');
            }
            else {
                console.error('Helpers.parseFieldPokemonToolTip - could not load egg groups because text was empty');
            }
            index++;

            const ret = {
                'nickname': nickname,
                'species': species,
                'types': types,
                'level': level,
                'happiness_percent': happiness,
                'nature': nature,
                'item': item,
                'eggGroups': eggGroups,
            };
            if (forme !== '') {
                ret.forme = forme;
            }
            return ret;
        } // parseFieldPokemonToolTip
        getPokemonImageClass() {
        // this seems like PFQ's threshold based on my experimentation
            if (window.innerWidth >= 650) {
                return 'big';
            } else {
                return 'small';
            }
        }
    }
    // eslint-disable-next-line no-unused-vars
    class GlobalsBase {
        constructor(helpers) {
            this.HELPERS = helpers;
            this.TEMPLATES = { // all the new/changed HTML for the userscript
                qolHubLinkHTML: '<li data-name="QoL"><a title="QoL Settings"><img src="https://i.imgur.com/L6KRli5.png" alt="QoL Settings">QoL</a></li>',
                qolHubUpdateLinkHTML: '<li data-name="QoLupdate"><a href="https://github.com/jpgualdarrama/PokeFarmQoL/raw/master/Poke-Farm-QoL.user.js" target="_blank"><img src="https://i.imgur.com/SJhgsU8.png" alt="QoL Update">QoL Update Available!</a></li>',
                massReleaseSelectHTML: '<label id="selectallfish"><input class="qolsetting" id="selectallfishcheckbox" type="checkbox">Select all</label>' +
                '<label id="movefishselectany"><input class="qolsetting" id="movefishselectanycheckbox" type="checkbox">Select Any  </label>' +
                '<label id="movefishselectsour"><input class="qolsetting" id="movefishselectsourcheckbox" type="checkbox">Select Sour  </label>' +
                '<label id="movefishselectspicy"><input class="qolsetting" id="movefishselectspicycheckbox" type="checkbox">Select Spicy</label>' +
                '<label id="movefishselectdry"><input class="qolsetting" id="movefishselectdrycheckbox" type="checkbox">Select Dry  </label>' +
                '<label id="movefishselectsweet"><input class="qolsetting" id="movefishselectsweetcheckbox" type="checkbox">Select Sweet  </label>' +
                '<label id="movefishselectbitter"><input class="qolsetting" id="movefishselectbittercheckbox" type="checkbox">Select Bitter  </label>',
                partyModHTML: '<div id=\'qolpartymod\'><label><input type="checkbox" class="qolsetting qolalone" data-key="hideDislike"/>Hide disliked berries</label><label><input type="checkbox" class="qolsetting qolalone" data-key="niceTable"/>Show in table</label><label><input type="checkbox" class="qolsetting qolalone" data-key="hideAll"/>Hide all click fast</label></div>',
                // filled in by fillTemplates
                shelterOptionsHTML: null,
                fieldSortHTML: null,
                fieldSearchHTML: null,
                privateFieldSearchHTML: null,
                qolHubHTML: null,
                evolveFastHTML: null,
                labOptionsHTML: null,
                publicFieldTooltipModHTML: null,
                privateFieldTooltipModHTML: null
            };

            this.SETTINGS_SAVE_KEY = 'QoLSettings';
            this.DAYCARE_PAGE_SETTINGS_KEY = 'QoLDaycare';
            this.DEX_PAGE_SETTINGS_KEY = 'QoLDexPage';
            this.FARM_PAGE_SETTINGS_KEY = 'QoLFarm';
            this.FISHING_PAGE_SETTINGS_KEY = 'QoLFishing';
            this.LAB_PAGE_SETTINGS_KEY = 'QoLLab';
            this.MULTIUSER_PAGE_SETTINGS_KEY = 'QoLMultiuser';
            this.PRIVATE_FIELDS_PAGE_SETTINGS_KEY = 'QoLPrivateFields';
            this.PUBLIC_FIELDS_PAGE_SETTINGS_KEY = 'QoLPublicFields';
            this.SHELTER_PAGE_SETTINGS_KEY = 'QoLShelter';
            this.WISHFORGE_PAGE_SETTINGS_KEY = 'QoLWishforge';
            this.POKEDEX_DATA_KEY = 'QoLPokedex';
            this.POKEDEX_DEX_IDS_KEY = 'QoLDexIDsCache';
            this.POKEDEX_REGIONAL_FORMS_KEY = 'QoLRegionalFormsList';
            this.POKEDEX_EGG_TYPES_MAP_KEY = 'QoLEggTypesMap';
            this.POKEDEX_EVOLVE_BY_LEVEL_KEY = 'QoLEvolveByLevel';
            this.POKEDEX_EVOLUTION_TREE_DEPTH_KEY = 'QoLEvolutionTreeDepth';
            /*
             * Note - the order of TYPE_LIST is important. It looks like PFQ uses an array in this order in its code
             * Don't change the order without looking for where this array is used
             */
            this.TYPE_LIST = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];
            this.NATURE_LIST = ['Lonely', 'Mild', 'Hasty', 'Gentle', 'Bold', 'Modest', 'Timid', 'Calm',
                'Impish', 'Adamant', 'Jolly', 'Careful', 'Relaxed', 'Brave', 'Quiet', 'Sassy',
                'Lax', 'Naughty', 'Rash', 'Naïve', 'Hardy', 'Docile', 'Serious', 'Bashful', 'Quirky'];
            this.EGG_GROUP_LIST = [
                'Undiscovered', // 0
                'Monster', // 1
                'Dragon', // 2
                'Field', // 3
                'Bug', // 4
                'Grass', // 5
                'Water 1', // 6
                'Water 2', // 7
                'Water 3', // 8
                'Amorphous', // 9
                'Fairy', // 10
                'Human-Like', // 11
                'Mineral', // 12
                'Flying', // 13 <-- This skip is correct
                'Ditto', // 15
            ];
            this.EGG_GROUP_ID_TO_NAME = [
                'Undiscovered', // 0
                'Monster', // 1
                'Dragon', // 2
                'Field', // 3
                'Bug', // 4
                'Grass', // 5
                'Water 1', // 6
                'Water 2', // 7
                'Water 3', // 8
                'Amorphous', // 9
                'Fairy', // 10
                'Human-Like', // 11
                'Mineral', // 12
                'Flying', // 13
                'ERROR', // 14
                'Ditto', // 15
            ];
            this.SHELTER_TYPE_TABLE = [
                '0', 'Normal', '<img src="//pfq-static.com/img/types/normal.png/t=1262702646">',
                '1', 'Fire', '<img src="//pfq-static.com/img/types/fire.png/t=1262702645">',
                '2', 'Water', '<img src="//pfq-static.com/img/types/water.png/t=1262702646">',
                '3', 'Electric', '<img src="//pfq-static.com/img/types/electric.png/t=1262702645">',
                '4', 'Grass', '<img src="//pfq-static.com/img/types/grass.png/t=1262702645">',
                '5', 'Ice', '<img src="//pfq-static.com/img/types/ice.png/t=1262702646">',
                '6', 'fighting', '<img src="//pfq-static.com/img/types/fighting.png/t=1262702645">',
                '7', 'Poison', '<img src="//pfq-static.com/img/types/poison.png/t=1262702646">',
                '8', 'Ground', '<img src="//pfq-static.com/img/types/ground.png/t=1262702646">',
                '9', 'Flying', '<img src="//pfq-static.com/img/types/flying.png/t=1262702645">',
                '10', 'Psychic', '<img src="//pfq-static.com/img/types/psychic.png/t=1262702646">',
                '11', 'Bug', '<img src="//pfq-static.com/img/types/bug.png/t=1262702645">',
                '12', 'Rock', '<img src="//pfq-static.com/img/types/rock.png/t=1262702646">',
                '13', 'Ghost', '<img src="//pfq-static.com/img/types/ghost.png/t=1262702645">',
                '14', 'Dragon', '<img src="//pfq-static.com/img/types/dragon.png/t=1263605747">',
                '15', 'Dark', '<img src="//pfq-static.com/img/types/dark.png/t=1262702645">',
                '16', 'Steel', '<img src="//pfq-static.com/img/types/steel.png/t=1262702646">',
                '17', 'Fairy', '<img src="//pfq-static.com/img/types/fairy.png/t=1374419124">',
            ];
            this.SHELTER_SEARCH_DATA = [
                'findNewEgg', 'Egg', 'new egg', '<img src="//pfq-static.com/img/pkmn/egg.png/t=1451852195">',
                'findNewPokemon', 'Pokémon', 'new Pokémon', '<img src="//pfq-static.com/img/pkmn/pkmn.png/t=1451852507">',
                'findShiny', 'SHINY', 'Shiny', '<img src="//pfq-static.com/img/pkmn/shiny.png/t=1400179603">',
                'findAlbino', 'ALBINO', 'Albino', '<img src="//pfq-static.com/img/pkmn/albino.png/t=1414662094">',
                'findMelanistic', 'MELANISTIC', 'Melanistic', '<img src="//pfq-static.com/img/pkmn/melanistic.png/t=1435353274">',
                'findPrehistoric', 'PREHISTORIC', 'Prehistoric', '<img src="//pfq-static.com/img/pkmn/prehistoric.png/t=1465558964">',
                'findDelta', 'DELTA', 'Delta', '<img src="//pfq-static.com/img/pkmn/_delta/dark.png/t=1501325214">',
                'findMega', 'MEGA', 'Mega', '<img src="//pfq-static.com/img/pkmn/mega.png/t=1400179603">',
                'findStarter', 'STARTER', 'Starter', '<img src="//pfq-static.com/img/pkmn/starter.png/t=1484919510">',
                'findCustomSprite', 'CUSTOM SPRITE', 'Custom Sprite', '<img src="//pfq-static.com/img/pkmn/cs.png/t=1405806997">',
                'findMale', '[M]', 'Male', '<img src="//pfq-static.com/img/pkmn/gender_m.png/t=1401213006">',
                'findFemale', '[F]', 'Female', '<img src="//pfq-static.com/img/pkmn/gender_f.png/t=1401213007">',
                'findNoGender', '[N]', 'Genderless', '<img src="//pfq-static.com/img/pkmn/gender_n.png/t=1401213004">',
                'findLegendary', '', 'Legendary', '<img src="//pfq-static.com/img/pkmn/pkmn.png/t=1451852507">',
            ];
            this.SHELTER_SEARCH_LISTS = {
                'findLegendary': [
                /*
                 * List of official legendaries more or less based on
                 * https://bulbapedia.bulbagarden.net/wiki/Legendary_Pok%C3%A9mon#Generation_IV
                 * Kanto
                 */
                    'Articuno', 'Zapdos', 'Moltres', 'Mewtwo', 'Mew',
                    // Johto
                    'Raikou', 'Entei', 'Suicune', 'Lugia', 'Ho-oh', 'Celebi',
                    // Hoenn
                    'Regirock', 'Regice', 'Registeel', 'Latias', 'Latios', 'Kyogre', 'Groudon', 'Rayquaza', 'Deoxys', 'Jirachi',
                    // Sinnoh
                    'Uxie', 'Mesprit', 'Azelf', 'Dialga', 'Palkia', 'Heatran', 'Regigigas', 'Giratina', 'Cresselia',
                    'Manaphy', 'Darkrai', 'Shaymin', 'Arceus',
                    // Unova
                    'Cobalion', 'Terrakion', 'Virizion', 'Tornadus', 'Thundurus', 'Reshiram', 'Zekrom',
                    'Landorus', 'Kyurem', 'Keldeo', 'Meloetta', 'Genesect',
                    // Kalos
                    'Xerneas', 'Yveltal', 'Zygarde', 'Diancie', 'Hoopa', 'Volcanion',
                    // Alola
                    'Type: Null', 'Silvally', 'Tapu Koko', 'Tapu Lele', 'Tapu Bulu', 'Tapu Fini',
                    'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Necrozma',
                    // Galar
                    'Zacian', 'Zamazenta', 'Eternatus',
                // PFQ
                /* None */
                ]
            };

            // filled in by fillOptionsLists
            this.TYPE_OPTIONS = null;
            this.NATURE_OPTIONS = null;
            this.EGG_GROUP_OPTIONS = null;

            // filled in by LocalStorageManager
            this.DEX_UPDATE_DATE = null;

            /*
             * a static copy of the <script id="dexdata"> tag from Feb 16, 2021
             * this is updated every time the user visits the dex page
             */
            this.DEX_DATA = ('{"columns":["id","name","type1","type2","eggs","eggdex","pkmn","pokedex","shinydex","albidex","melandex"],' +
            '"types":["normal","fire","water","electric","grass","ice","fighting","poison","ground","flying","psychic","bug","rock","ghost","dragon","dark","steel","fairy"],' +
            '"regions":{"1":[["001","Bulbasaur",4,7,1,1,1,1,1,1,0],' +
            '["002","Ivysaur",4,7,0,0,1,1,1,1,0],' +
            '["003","Venusaur",4,7,0,0,2,2,1,1,0],' +
            '["004","Charmander",1,-1,1,1,1,1,1,1,0],' +
            '["005","Charmeleon",1,-1,0,0,1,1,1,1,0],' +
            '["006","Charizard",1,9,0,0,3,3,3,3,0],' +
            '["007","Squirtle",2,-1,1,1,1,1,1,0,0],' +
            '["008","Wartortle",2,-1,0,0,1,1,1,0,0],' +
            '["009","Blastoise",2,-1,0,0,2,2,2,0,0],' +
            '["010","Caterpie",11,-1,1,1,1,1,1,1,0],' +
            '["011","Metapod",11,-1,0,0,1,1,1,1,0],' +
            '["012","Butterfree",11,9,0,0,1,1,1,1,0],' +
            '["013","Weedle",11,7,1,1,1,1,0,1,0],' +
            '["014","Kakuna",11,7,0,0,1,1,0,1,0],' +
            '["015","Beedrill",11,7,0,0,2,2,0,1,0],' +
            '["016","Pidgey",0,9,1,1,1,1,1,1,0],' +
            '["017","Pidgeotto",0,9,0,0,1,1,1,1,0],' +
            '["018","Pidgeot",0,9,0,0,2,2,2,2,0],' +
            '["019","Rattata",0,-1,2,2,2,2,1,1,0],' +
            '["020r7","Raticate",15,0,0,0,3,3,2,2,0],' +
            '["021","Spearow",0,9,1,1,1,1,0,1,0],' +
            '["022","Fearow",0,9,0,0,1,1,0,1,0],' +
            '["023","Ekans",7,-1,1,1,1,1,1,1,0],' +
            '["024","Arbok",7,-1,0,0,1,1,1,1,0],' +
            '["025","Pichu",3,-1,1,1,1,1,1,1,0],' +
            '["026","Pikachu",3,-1,0,0,1,1,1,1,0],' +
            '["027","Raichu",3,-1,0,0,2,2,2,2,0],' +
            '["028","Sandshrew",8,-1,2,2,2,2,2,2,0],' +
            '["029r7","Sandslash",5,16,0,0,2,2,2,2,0],' +
            '["030","Nidoran",7,-1,1,1,1,1,1,1,0],' +
            '["031","Nidorina",7,-1,0,0,1,1,1,1,0],' +
            '["032","Nidoqueen",7,8,0,0,1,1,1,1,0],' +
            '["033","Nidorino",7,-1,0,0,1,1,1,1,0],' +
            '["034","Nidoking",7,8,0,0,1,1,1,1,0],' +
            '["035","Cleffa",17,-1,1,1,1,1,1,1,0],' +
            '["036","Clefairy",17,-1,0,0,1,1,1,1,0],' +
            '["037","Clefable",17,-1,0,0,1,1,1,1,0],' +
            '["038","Vulpix",1,-1,2,2,2,2,2,2,0],' +
            '["039r7","Ninetales",5,17,0,0,2,2,2,2,0],' +
            '["040","Igglybuff",0,17,1,1,1,1,1,1,0],' +
            '["041","Jigglypuff",0,17,0,0,1,1,1,1,0],' +
            '["042","Wigglytuff",0,17,0,0,1,1,1,1,0],' +
            '["043","Zubat",7,9,1,1,1,1,0,1,0],' +
            '["044","Golbat",7,9,0,0,1,1,0,1,0],' +
            '["045","Crobat",7,9,0,0,1,1,0,1,0],' +
            '["046","Oddish",4,7,1,1,1,1,0,0,0],' +
            '["047","Gloom",4,7,0,0,1,1,0,0,0],' +
            '["048","Vileplume",4,7,0,0,1,1,0,0,0],' +
            '["049","Bellossom",4,-1,0,0,1,1,0,0,0],' +
            '["050","Paras",11,4,1,1,1,1,0,1,0],' +
            '["051","Parasect",11,4,0,0,1,1,0,0,0],' +
            '["052","Venonat",11,7,1,1,1,1,0,1,0],' +
            '["053","Venomoth",11,7,0,0,1,1,0,0,0],' +
            '["054","Diglett",8,-1,2,2,2,2,2,2,0],' +
            '["055","Dugtrio",8,-1,0,0,2,2,2,2,0],' +
            '["056r8","Meowth",16,-1,3,3,3,3,2,2,0],' +
            '["057","Persian",0,-1,0,0,2,2,1,1,0],' +
            '["058","Psyduck",2,-1,1,1,1,1,1,1,0],' +
            '["059","Golduck",2,-1,0,0,1,1,1,1,0],' +
            '["060","Mankey",6,-1,1,1,1,1,1,1,1],' +
            '["061","Primeape",6,-1,0,0,1,1,1,1,1],' +
            '["062","Growlithe",1,-1,1,1,1,1,1,1,0],' +
            '["063","Arcanine",1,-1,0,0,1,1,1,1,0],' +
            '["064","Poliwag",2,-1,1,1,1,1,1,1,0],' +
            '["065","Poliwhirl",2,-1,0,0,1,1,1,1,0],' +
            '["066","Poliwrath",2,6,0,0,1,1,1,1,0],' +
            '["067","Politoed",2,-1,0,0,1,1,1,1,0],' +
            '["068","Abra",10,-1,1,1,1,1,1,1,0],' +
            '["069","Kadabra",10,-1,0,0,1,1,1,1,0],' +
            '["070-M","Alakazam",10,-1,0,0,2,2,2,2,0],' +
            '["071","Machop",6,-1,1,1,1,1,1,1,0],' +
            '["072","Machoke",6,-1,0,0,1,1,1,1,0],' +
            '["073","Machamp",6,-1,0,0,1,1,1,1,0],' +
            '["074","Bellsprout",4,7,1,1,1,1,0,0,0],' +
            '["075","Weepinbell",4,7,0,0,1,1,0,0,0],' +
            '["076","Victreebell",4,7,0,0,1,1,0,0,0],' +
            '["077","Tentacool",2,7,1,1,1,1,0,0,0],' +
            '["078","Tentacruel",2,7,0,0,1,1,0,0,0],' +
            '["079r7","Geodude",12,3,2,2,2,2,2,2,0],' +
            '["080r7","Graveler",12,3,0,0,2,2,2,2,0],' +
            '["081r7","Golem",12,3,0,0,2,2,2,2,0],' +
            '["082","Ponyta",1,-1,2,2,2,2,1,1,0],' +
            '["083r8","Rapidash",10,17,0,0,2,2,1,1,0],' +
            '["084","Slowpoke",2,10,2,2,2,2,0,0,0],' +
            '["085","Slowbro",2,10,0,0,3,3,1,0,0],' +
            '["086","Slowking",2,10,0,0,2,2,0,0,0],' +
            '["087","Magnemite",3,16,1,1,1,1,1,1,0],' +
            '["088","Magneton",3,16,0,0,1,1,1,1,0],' +
            '["089","Magnezone",3,16,0,0,1,1,1,1,0],' +
            '["090r8","Farfetch\'d",6,-1,2,2,2,2,1,1,0],' +
            '["091","Doduo",0,9,1,1,1,1,0,0,0],' +
            '["092","Dodrio",0,9,0,0,1,1,0,0,0],' +
            '["093","Seel",2,-1,1,1,1,1,1,1,0],' +
            '["094","Dewgong",2,5,0,0,1,1,1,1,0],' +
            '["095","Grimer",7,-1,2,2,2,2,1,1,0],' +
            '["096","Muk",7,-1,0,0,2,2,1,1,0],' +
            '["097","Shellder",2,-1,1,1,1,1,1,1,0],' +
            '["098","Cloyster",2,5,0,0,1,1,1,1,0],' +
            '["099","Gastly",13,7,1,1,1,1,1,1,0],' +
            '["100","Haunter",13,7,0,0,1,1,1,1,0],' +
            '["101","Gengar",13,7,0,0,2,2,2,2,0],' +
            '["102","Onix",12,8,1,1,1,1,1,1,0],' +
            '["103","Steelix",16,8,0,0,2,2,2,2,0],' +
            '["104","Drowzee",10,-1,1,1,1,1,0,0,0],' +
            '["105","Hypno",10,-1,0,0,1,1,0,0,0],' +
            '["106","Krabby",2,-1,1,1,1,1,0,0,0],' +
            '["107","Kingler",2,-1,0,0,1,1,0,0,0],' +
            '["108","Voltorb",3,-1,1,1,1,1,1,1,0],' +
            '["109","Electrode",3,-1,0,0,1,1,1,1,0],' +
            '["110","Exeggcute",4,10,1,1,1,1,1,1,0],' +
            '["111","Exeggutor",4,10,0,0,2,2,2,2,0],' +
            '["112","Cubone",8,-1,1,1,1,1,1,1,0],' +
            '["113t7","Marowak",1,13,0,0,3,3,3,3,0],' +
            '["114","Lickitung",0,-1,1,1,1,1,0,0,0],' +
            '["115","Lickilicky",0,-1,0,0,1,1,0,0,0],' +
            '["116","Koffing",7,-1,1,1,1,1,0,0,0],' +
            '["117","Weezing",7,-1,0,0,2,2,0,0,0],' +
            '["118","Rhyhorn",8,12,1,1,1,1,1,1,0],' +
            '["119","Rhydon",8,12,0,0,1,1,1,1,0],' +
            '["120","Rhyperior",8,12,0,0,1,1,1,1,0],' +
            '["121","Tangela",4,-1,1,1,1,1,0,0,0],' +
            '["122","Tangrowth",4,-1,0,0,1,1,0,0,0],' +
            '["123","Kangaskhan",0,-1,1,1,2,2,0,0,0],' +
            '["124","Horsea",2,-1,1,1,1,1,1,1,0],' +
            '["125","Seadra",2,-1,0,0,1,1,1,1,0],' +
            '["126","Kingdra",2,14,0,0,1,1,1,1,0],' +
            '["127","Goldeen",2,-1,1,1,1,1,0,0,0],' +
            '["128","Seaking",2,-1,0,0,1,1,0,0,0],' +
            '["129","Staryu",2,-1,1,1,1,1,0,0,0],' +
            '["130","Starmie",2,10,0,0,1,1,0,0,0],' +
            '["131","Mime Jr.",10,17,1,1,1,1,1,1,1],' +
            '["132","Mr. Mime",10,17,2,2,2,2,2,2,1],' +
            '["133","Scyther",11,9,1,1,1,1,1,1,0],' +
            '["134","Scizor",11,16,0,0,2,2,2,2,0],' +
            '["135","Smoochum",5,10,1,1,1,1,1,1,1],' +
            '["136","Jynx",5,10,0,0,1,1,1,1,1],' +
            '["137","Pinsir",11,-1,1,1,2,2,0,0,0],' +
            '["138","Tauros",0,-1,1,1,1,1,0,0,0],' +
            '["139","Magikarp",2,-1,1,1,1,1,1,1,0],' +
            '["140-M","Gyarados",2,15,0,0,2,2,2,2,0],' +
            '["141","Lapras",2,5,1,1,1,1,1,1,0],' +
            '["142","Ditto",0,-1,1,1,1,1,0,0,0],' +
            '["143","Eevee",0,-1,1,1,1,1,1,1,0],' +
            '["144","Vaporeon",2,-1,0,0,1,1,1,1,0],' +
            '["145","Jolteon",3,-1,0,0,1,1,1,1,0],' +
            '["146","Flareon",1,-1,0,0,1,1,1,1,0],' +
            '["147","Espeon",10,-1,0,0,1,1,1,1,0],' +
            '["148","Umbreon",15,-1,0,0,1,1,1,1,0],' +
            '["149","Leafeon",4,-1,0,0,1,1,1,1,0],' +
            '["150","Glaceon",5,-1,0,0,1,1,1,1,0],' +
            '["151","Sylveon",17,-1,0,0,1,1,1,1,0],' +
            '["152","Omanyte",12,2,1,1,1,1,1,1,0],' +
            '["153","Omastar",12,2,0,0,1,1,1,1,0],' +
            '["154","Kabuto",12,2,1,1,1,1,1,1,0],' +
            '["155","Kabutops",12,2,0,0,1,1,1,1,0],' +
            '["156","Aerodactyl",12,9,1,1,2,2,2,2,0],' +
            '["157","Munchlax",0,-1,1,1,1,1,0,0,0],' +
            '["158","Snorlax",0,-1,1,1,1,1,0,0,0],' +
            '["159","Articuno",5,9,1,1,1,1,0,0,0],' +
            '["160","Zapdos",3,9,1,1,1,1,0,0,0],' +
            '["161","Moltres",1,9,1,1,1,1,0,0,0],' +
            '["162","Dratini",14,-1,1,1,1,1,1,1,0],' +
            '["163","Dragonair",14,-1,0,0,1,1,1,1,0],' +
            '["164","Dragonite",14,9,0,0,1,1,1,1,0],' +
            '["165-Y","Mewtwo",10,-1,1,1,3,3,0,0,0],' +
            '["166","Mew",10,-1,1,1,1,1,0,0,0]],' +
            '"2":[["167","Chikorita",4,-1,1,1,1,1,0,0,0],' +
            '["168","Bayleef",4,-1,0,0,1,1,0,0,0],' +
            '["169","Meganium",4,-1,0,0,1,1,0,0,0],' +
            '["170","Cyndaquil",1,-1,1,1,1,1,1,1,0],' +
            '["171","Quilava",1,-1,0,0,1,1,1,1,0],' +
            '["172","Typhlosion",1,-1,0,0,1,1,1,1,0],' +
            '["173","Totodile",2,-1,1,1,1,1,1,0,0],' +
            '["174","Croconaw",2,-1,0,0,1,1,1,0,0],' +
            '["175","Feraligator",2,-1,0,0,1,1,1,0,0],' +
            '["176","Sentret",0,-1,1,1,1,1,0,1,0],' +
            '["177","Furret",0,-1,0,0,1,1,0,1,0],' +
            '["178","Hoothoot",0,9,1,1,1,1,0,0,0],' +
            '["179","Noctowl",0,9,0,0,1,1,0,0,0],' +
            '["180","Ledyba",11,9,1,1,1,1,0,1,0],' +
            '["181","Ledian",11,9,0,0,1,1,0,0,0],' +
            '["182","Spinarak",11,7,1,1,1,1,0,1,0],' +
            '["183","Ariados",11,7,0,0,1,1,0,0,0],' +
            '["184","Chinchou",2,3,1,1,1,1,1,1,0],' +
            '["185","Lanturn",2,3,0,0,1,1,1,1,0],' +
            '["186","Togepi",17,-1,1,1,1,1,1,1,0],' +
            '["187","Togetic",17,9,0,0,1,1,1,1,0],' +
            '["188","Togekiss",17,9,0,0,1,1,1,1,0],' +
            '["189","Natu",10,9,1,1,1,1,0,0,0],' +
            '["190","Xatu",10,9,0,0,1,1,0,0,0],' +
            '["191","Mareep",3,-1,1,1,1,1,1,1,0],' +
            '["192","Flaaffy",3,-1,0,0,1,1,1,1,0],' +
            '["193-M","Ampharos",3,14,0,0,2,2,2,2,0],' +
            '["194","Azurill",0,17,1,1,1,1,1,1,0],' +
            '["195","Marill",2,17,1,1,1,1,1,1,0],' +
            '["196","Azumarill",2,17,0,0,1,1,1,1,0],' +
            '["197","Bonsly",12,-1,1,1,1,1,1,1,0],' +
            '["198","Sudowoodo",12,-1,1,1,1,1,1,1,0],' +
            '["199","Hoppip",4,9,1,1,1,1,1,0,0],' +
            '["200","Skiploom",4,9,0,0,1,1,1,0,0],' +
            '["201","Jumpluff",4,9,0,0,1,1,1,0,0],' +
            '["202","Aipom",0,-1,1,1,1,1,0,0,0],' +
            '["203","Ambipom",0,-1,0,0,1,1,0,0,0],' +
            '["204","Sunkern",4,-1,1,1,1,1,0,0,0],' +
            '["205","Sunflora",4,-1,0,0,1,1,0,0,0],' +
            '["206","Yanma",11,9,1,1,1,1,0,0,0],' +
            '["207","Yanmega",11,9,0,0,1,1,0,0,0],' +
            '["208","Wooper",2,8,1,1,1,1,1,1,0],' +
            '["209","Quagsire",2,8,0,0,1,1,1,1,0],' +
            '["210","Murkrow",15,9,1,1,1,1,1,1,0],' +
            '["211","Honchkrow",15,9,0,0,1,1,1,1,0],' +
            '["212","Misdreavus",13,-1,1,1,1,1,1,1,0],' +
            '["213","Mismagius",13,-1,0,0,1,1,1,1,0],' +
            '["214h","Unown",10,-1,28,28,28,28,0,0,0],' +
            '["215","Girafarig",0,10,1,1,1,1,0,0,0],' +
            '["216","Pineco",11,-1,1,1,1,1,1,1,0],' +
            '["217","Forretress",11,16,0,0,1,1,1,1,0],' +
            '["218","Dunsparce",0,-1,1,1,1,1,0,0,0],' +
            '["219","Gligar",8,9,1,1,1,1,1,1,0],' +
            '["220","Gliscor",8,9,0,0,1,1,1,1,0],' +
            '["221","Snubbull",17,-1,1,1,1,1,1,1,0],' +
            '["222","Granbull",17,-1,0,0,1,1,1,1,0],' +
            '["223","Qwilfish",2,7,1,1,1,1,0,0,0],' +
            '["224","Shuckle",11,12,1,1,1,1,1,1,0],' +
            '["225-M","Heracross",11,6,1,1,2,2,2,2,0],' +
            '["226","Sneasel",15,5,1,1,1,1,1,1,0],' +
            '["227","Weavile",15,5,0,0,1,1,1,1,0],' +
            '["228","Teddiursa",0,-1,1,1,1,1,0,0,0],' +
            '["229","Ursaring",0,-1,0,0,1,1,0,0,0],' +
            '["230","Slugma",1,-1,1,1,1,1,1,1,0],' +
            '["231","Magcargo",1,12,0,0,1,1,1,1,0],' +
            '["232","Swinub",5,8,1,1,1,1,1,1,0],' +
            '["233","Piloswine",5,8,0,0,1,1,1,1,0],' +
            '["234","Mamoswine",5,8,0,0,1,1,1,1,0],' +
            '["235","Corsola",2,12,2,2,2,2,1,1,0],' +
            '["236","Remoraid",2,-1,1,1,1,1,0,0,0],' +
            '["237","Octillery",2,-1,0,0,1,1,0,0,0],' +
            '["238","Delibird",5,9,1,1,1,1,1,1,0],' +
            '["239","Skarmory",16,9,1,1,1,1,1,1,0],' +
            '["240","Houndour",15,1,1,1,1,1,1,1,0],' +
            '["241-M","Houndoom",15,1,0,0,2,2,2,2,0],' +
            '["242","Phanpy",8,-1,1,1,1,1,1,1,0],' +
            '["243","Donphan",8,-1,0,0,1,1,1,1,0],' +
            '["244","Stantler",0,-1,1,1,1,1,0,0,0],' +
            '["245","Smeargle",0,-1,1,1,1,1,0,0,0],' +
            '["246","Tyrogue",6,-1,1,1,1,1,1,1,0],' +
            '["247","Hitmonlee",6,-1,0,0,1,1,1,1,0],' +
            '["248","Hitmonchan",6,-1,0,0,1,1,1,1,0],' +
            '["249","Hitmontop",6,-1,0,0,1,1,1,1,0],' +
            '["250","Elekid",3,-1,1,1,1,1,1,1,0],' +
            '["251","Electabuzz",3,-1,0,0,1,1,1,1,0],' +
            '["252","Electivire",3,-1,0,0,1,1,1,1,0],' +
            '["253","Magby",1,-1,1,1,1,1,1,1,1],' +
            '["254","Magmar",1,-1,0,0,1,1,1,1,1],' +
            '["255","Magmortar",1,-1,0,0,1,1,1,1,1],' +
            '["256","Miltank",0,-1,1,1,1,1,0,0,0],' +
            '["257","Raikou",3,-1,1,1,1,1,0,0,0],' +
            '["258","Entei",1,-1,1,1,1,1,0,0,0],' +
            '["259","Suicune",2,-1,1,1,1,1,0,0,0],' +
            '["260","Larvitar",12,8,1,1,1,1,1,1,0],' +
            '["261","Pupitar",12,8,0,0,1,1,1,1,0],' +
            '["262-M","Tyranitar",12,15,0,0,2,2,2,2,0],' +
            '["263","Lugia",10,9,1,1,1,1,0,0,0],' +
            '["264","Ho-oh",1,9,1,1,1,1,0,0,0],' +
            '["265","Celebi",10,4,1,1,1,1,0,0,0]],' +
            '"3":[["266","Treecko",4,-1,1,1,1,1,1,1,0],' +
            '["267","Grovyle",4,-1,0,0,1,1,1,1,0],' +
            '["268","Sceptile",4,-1,0,0,2,2,2,2,0],' +
            '["269","Torchic",1,-1,1,1,1,1,1,1,0],' +
            '["270","Combusken",1,6,0,0,1,1,1,1,0],' +
            '["271-M","Blaziken",1,6,0,0,2,2,2,2,0],' +
            '["272","Mudkip",2,-1,1,1,1,1,1,1,0],' +
            '["273","Marshtomp",2,8,0,0,1,1,1,1,0],' +
            '["274","Swampert",2,8,0,0,2,2,2,2,0],' +
            '["275","Poochyena",15,-1,1,1,1,1,1,1,0],' +
            '["276","Mightyena",15,-1,0,0,1,1,1,1,0],' +
            '["277","Zigzagoon",0,-1,2,2,2,2,1,2,0],' +
            '["278","Linoone",0,-1,0,0,2,2,1,1,0],' +
            '["279","Wurmple",11,-1,1,1,1,1,0,0,0],' +
            '["280","Silcoon",11,-1,0,0,1,1,0,0,0],' +
            '["281","Beautifly",11,9,0,0,1,1,0,0,0],' +
            '["282","Cascoon",11,-1,0,0,1,1,0,0,0],' +
            '["283","Dustox",11,7,0,0,1,1,0,0,0],' +
            '["284","Lotad",2,4,1,1,1,1,0,0,0],' +
            '["285","Lombre",2,4,0,0,1,1,0,0,0],' +
            '["286","Ludicolo",2,4,0,0,1,1,0,0,0],' +
            '["287","Seedot",4,-1,1,1,1,1,1,1,0],' +
            '["288","Nuzleaf",4,15,0,0,1,1,1,1,0],' +
            '["289","Shiftry",4,15,0,0,1,1,1,1,0],' +
            '["290","Taillow",0,9,1,1,1,1,0,1,0],' +
            '["291","Swellow",0,9,0,0,1,1,0,0,0],' +
            '["292","Wingull",2,9,1,1,1,1,0,0,0],' +
            '["293","Pelipper",2,9,0,0,1,1,0,0,0],' +
            '["294","Ralts",10,17,1,1,1,1,1,1,0],' +
            '["295","Kirlia",10,17,0,0,1,1,1,1,0],' +
            '["296-M","Gardevoir",10,17,0,0,2,2,2,2,0],' +
            '["297","Gallade",10,6,0,0,2,2,2,2,0],' +
            '["298","Surskit",11,2,1,1,1,1,0,0,0],' +
            '["299","Masquerain",11,9,0,0,1,1,0,0,0],' +
            '["300","Shroomish",4,-1,1,1,1,1,1,1,0],' +
            '["301","Breloom",4,6,0,0,1,1,1,1,0],' +
            '["302","Slakoth",0,-1,1,1,1,1,0,0,0],' +
            '["303","Vigoroth",0,-1,0,0,1,1,0,0,0],' +
            '["304","Slaking",0,-1,0,0,1,1,0,0,0],' +
            '["305","Nincada",11,8,1,1,1,1,1,1,0],' +
            '["306","Ninjask",11,9,0,0,1,1,1,1,0],' +
            '["307","Shedinja",11,13,0,0,1,1,1,1,0],' +
            '["308","Whismur",0,-1,1,1,1,1,0,0,0],' +
            '["309","Loudred",0,-1,0,0,1,1,0,0,0],' +
            '["310","Exploud",0,-1,0,0,1,1,0,0,0],' +
            '["311","Makuhita",6,-1,1,1,1,1,1,1,0],' +
            '["312","Hariyama",6,-1,0,0,1,1,1,1,0],' +
            '["313","Nosepass",12,-1,1,1,1,1,1,1,0],' +
            '["314","Probopass",12,16,0,0,1,1,1,1,0],' +
            '["315","Skitty",0,-1,1,1,1,1,1,0,0],' +
            '["316","Delcatty",0,-1,0,0,1,1,1,0,0],' +
            '["317","Sableye",15,13,1,1,2,2,2,2,0],' +
            '["318","Mawile",16,17,1,1,2,2,2,2,0],' +
            '["319","Aron",16,12,1,1,1,1,1,1,0],' +
            '["320","Lairon",16,12,0,0,1,1,1,1,0],' +
            '["321-M","Aggron",16,-1,0,0,2,2,2,2,0],' +
            '["322","Meditite",6,10,1,1,1,1,1,1,0],' +
            '["323-M","Medicham",6,10,0,0,2,2,2,2,0],' +
            '["324","Electrike",3,-1,1,1,1,1,1,1,0],' +
            '["325","Manectric",3,-1,0,0,2,2,2,2,0],' +
            '["326","Plusle",3,-1,1,1,1,1,1,1,0],' +
            '["327","Minun",3,-1,1,1,1,1,1,1,0],' +
            '["328","Volbeat",11,-1,1,1,1,1,0,1,0],' +
            '["329","Illumise",11,-1,1,1,1,1,0,1,0],' +
            '["330","Gulpin",7,-1,1,1,1,1,0,0,0],' +
            '["331","Swalot",7,-1,0,0,1,1,0,0,0],' +
            '["332","Carvanha",2,15,1,1,1,1,1,1,0],' +
            '["333","Sharpedo",2,15,0,0,2,2,2,2,0],' +
            '["334","Wailmer",2,-1,1,1,1,1,1,0,0],' +
            '["335","Wailord",2,-1,0,0,1,1,1,0,0],' +
            '["336","Numel",1,8,1,1,1,1,1,1,0],' +
            '["337-M","Camerupt",1,8,0,0,2,2,2,2,0],' +
            '["338","Torkoal",1,-1,1,1,1,1,1,1,0],' +
            '["339","Spoink",10,-1,1,1,1,1,0,0,0],' +
            '["340","Grumpig",10,-1,0,0,1,1,0,0,0],' +
            '["341","Spinda",0,-1,1,1,1,1,0,0,0],' +
            '["342","Trapinch",8,-1,1,1,1,1,1,1,0],' +
            '["343","Vibrava",8,14,0,0,1,1,1,1,0],' +
            '["344","Flygon",8,14,0,0,1,1,1,1,0],' +
            '["345","Cacnea",4,-1,1,1,1,1,1,1,0],' +
            '["346","Cacturne",4,15,0,0,1,1,1,1,0],' +
            '["347","Swablu",0,9,1,1,1,1,1,1,0],' +
            '["348","Altaria",14,9,0,0,2,2,2,2,0],' +
            '["349","Zangoose",0,-1,1,1,1,1,0,0,0],' +
            '["350","Seviper",7,-1,1,1,1,1,0,0,0],' +
            '["351","Lunatone",12,10,1,1,1,1,1,1,0],' +
            '["352","Solrock",12,10,1,1,1,1,1,1,0],' +
            '["353","Barboach",2,8,1,1,1,1,1,1,0],' +
            '["354","Whiscash",2,8,0,0,1,1,1,1,0],' +
            '["355","Corphish",2,-1,1,1,1,1,1,1,0],' +
            '["356","Crawdaunt",2,15,0,0,1,1,1,1,0],' +
            '["357","Baltoy",8,10,1,1,1,1,1,1,0],' +
            '["358","Claydol",8,10,0,0,1,1,1,1,0],' +
            '["359","Lileep",12,4,1,1,1,1,1,1,0],' +
            '["360","Cradily",12,4,0,0,1,1,1,1,0],' +
            '["361","Anorith",12,11,1,1,1,1,1,1,0],' +
            '["362","Armaldo",12,11,0,0,1,1,1,1,0],' +
            '["363","Feebas",2,-1,1,1,1,1,0,0,0],' +
            '["364","Milotic",2,-1,0,0,1,1,0,0,0],' +
            '["365s","Castform",1,-1,1,1,4,4,0,0,0],' +
            '["366","Kecleon",0,-1,1,1,1,1,0,0,0],' +
            '["367","Shuppet",13,-1,1,1,1,1,1,1,0],' +
            '["368-M","Banette",13,-1,0,0,2,2,2,2,0],' +
            '["369","Duskull",13,-1,1,1,1,1,1,1,1],' +
            '["370","Dusclops",13,-1,0,0,1,1,1,1,1],' +
            '["371","Dusknoir",13,-1,0,0,1,1,1,1,1],' +
            '["372","Tropius",4,9,1,1,1,1,0,0,0],' +
            '["373","Chingling",10,-1,1,1,1,1,0,0,0],' +
            '["374","Chimecho",10,-1,1,1,1,1,0,0,0],' +
            '["375-M","Absol",15,-1,1,1,2,2,2,2,0],' +
            '["376","Wynaut",10,-1,1,1,1,1,0,0,0],' +
            '["377","Wobbuffet",10,-1,1,1,1,1,0,0,0],' +
            '["378","Snorunt",5,-1,1,1,1,1,1,1,0],' +
            '["379","Glalie",5,-1,0,0,2,2,2,2,0],' +
            '["380","Froslass",5,13,0,0,1,1,1,1,0],' +
            '["381","Spheal",5,2,1,1,1,1,1,1,0],' +
            '["382","Sealeo",5,2,0,0,1,1,1,1,0],' +
            '["383","Walrein",5,2,0,0,1,1,1,1,0],' +
            '["384","Clamperl",2,-1,1,1,1,1,0,0,0],' +
            '["385","Huntail",2,-1,0,0,1,1,0,0,0],' +
            '["386","Gorebyss",2,-1,0,0,1,1,0,0,0],' +
            '["387","Relicanth",2,12,1,1,1,1,1,1,0],' +
            '["388","Luvdisc",2,-1,1,1,1,1,0,0,0],' +
            '["389","Bagon",14,-1,1,1,1,1,1,1,0],' +
            '["390","Shelgon",14,-1,0,0,1,1,1,1,0],' +
            '["391-M","Salamence",14,9,0,0,2,2,2,2,0],' +
            '["392","Beldum",16,10,1,1,1,1,1,1,0],' +
            '["393","Metang",16,10,0,0,1,1,1,1,0],' +
            '["394-M","Metagross",16,10,0,0,2,2,2,2,0],' +
            '["395","Regirock",12,-1,1,1,1,1,0,0,0],' +
            '["396","Regice",5,-1,1,1,1,1,0,0,0],' +
            '["397","Registeel",16,-1,1,1,1,1,0,0,0],' +
            '["398","Latias",14,10,1,1,2,2,0,0,0],' +
            '["399-M","Latios",14,10,1,1,2,2,0,0,0],' +
            '["400","Kyogre",2,-1,1,1,2,2,0,0,0],' +
            '["401","Groudon",8,-1,1,1,2,2,0,0,0],' +
            '["402","Rayquaza",14,9,1,1,2,2,0,0,0],' +
            '["403","Jirachi",16,10,1,1,1,1,0,0,0],' +
            '["404a","Deoxys",10,-1,1,1,4,4,0,0,0]],' +
            '"4":[["405","Turtwig",4,-1,1,1,1,1,1,1,0],' +
            '["406","Grotle",4,-1,0,0,1,1,1,1,0],' +
            '["407","Torterra",4,8,0,0,1,1,1,1,0],' +
            '["408","Chimchar",1,-1,1,1,1,1,1,1,0],' +
            '["409","Monferno",1,6,0,0,1,1,1,1,0],' +
            '["410","Infernape",1,6,0,0,1,1,1,1,0],' +
            '["411","Piplup",2,-1,1,1,1,1,1,1,0],' +
            '["412","Prinplup",2,-1,0,0,1,1,1,1,0],' +
            '["413","Empoleon",2,16,0,0,1,1,1,1,0],' +
            '["414","Starly",0,9,1,1,1,1,0,1,0],' +
            '["415","Staravia",0,9,0,0,1,1,0,1,0],' +
            '["416","Staraptor",0,9,0,0,1,1,0,1,0],' +
            '["417","Bidoof",0,-1,1,1,1,1,0,0,0],' +
            '["418","Bibarel",0,2,0,0,1,1,0,0,0],' +
            '["419","Kricketot",11,-1,1,1,1,1,0,0,0],' +
            '["420","Kricketune",11,-1,0,0,1,1,0,0,0],' +
            '["421","Shinx",3,-1,1,1,1,1,1,1,0],' +
            '["422","Luxio",3,-1,0,0,1,1,1,1,0],' +
            '["423","Luxray",3,-1,0,0,1,1,1,1,0],' +
            '["424","Budew",4,7,1,1,1,1,0,0,0],' +
            '["425","Roselia",4,7,1,1,1,1,0,0,0],' +
            '["426","Roserade",4,7,0,0,1,1,0,0,0],' +
            '["427","Cranidos",12,-1,1,1,1,1,1,1,0],' +
            '["428","Rampardos",12,-1,0,0,1,1,1,1,0],' +
            '["429","Shieldon",12,16,1,1,1,1,1,1,0],' +
            '["430","Bastiodon",12,16,0,0,1,1,1,1,0],' +
            '["431b","Burmy",11,-1,1,1,3,3,3,3,0],' +
            '["432c","Wormadam",11,8,0,0,3,3,3,3,0],' +
            '["433","Mothim",11,9,0,0,1,1,1,1,0],' +
            '["434","Combee",11,9,1,1,1,1,0,0,0],' +
            '["435","Vespiquen",11,9,0,0,1,1,1,0,0],' +
            '["436","Pachirisu",3,-1,1,1,1,1,1,1,0],' +
            '["437","Buizel",2,-1,1,1,1,1,0,0,0],' +
            '["438","Floatzel",2,-1,0,0,1,1,0,0,0],' +
            '["439","Cherubi",4,-1,1,1,1,1,0,0,0],' +
            '["440","Cherrim",4,-1,0,0,2,2,0,0,0],' +
            '["441b","Shellos",2,-1,1,1,2,2,2,2,0],' +
            '["442b","Gastrodon",2,8,0,0,2,2,2,2,0],' +
            '["443","Drifloon",13,9,1,1,1,1,1,1,0],' +
            '["444","Drifblim",13,9,0,0,1,1,1,1,0],' +
            '["445","Buneary",0,-1,1,1,1,1,1,1,0],' +
            '["446-M","Lopunny",0,6,0,0,2,2,2,2,0],' +
            '["447","Glameow",0,-1,1,1,1,1,1,1,0],' +
            '["448","Purugly",0,-1,0,0,1,1,1,1,0],' +
            '["449","Stunky",7,15,1,1,1,1,1,1,0],' +
            '["450","Skuntank",7,15,0,0,1,1,1,1,0],' +
            '["451","Bronzor",16,10,1,1,1,1,1,1,0],' +
            '["452","Bronzong",16,10,0,0,1,1,1,1,0],' +
            '["453","Happiny",0,-1,1,1,1,1,0,0,0],' +
            '["454","Chansey",0,-1,1,1,1,1,0,0,0],' +
            '["455","Blissey",0,-1,0,0,1,1,0,0,0],' +
            '["456","Chatot",0,9,1,1,1,1,0,0,0],' +
            '["457","Spiritomb",13,15,1,1,1,1,1,1,0],' +
            '["458","Gible",14,8,1,1,1,1,1,1,0],' +
            '["459","Gabite",14,8,0,0,1,1,1,1,0],' +
            '["460","Garchomp",14,8,0,0,2,2,2,2,0],' +
            '["461","Riolu",6,-1,1,1,1,1,1,1,0],' +
            '["462-M","Lucario",6,16,0,0,2,2,2,2,0],' +
            '["463","Hippopotas",8,-1,1,1,1,1,1,1,0],' +
            '["464","Hippowdon",8,-1,0,0,1,1,1,1,0],' +
            '["465","Skorupi",7,11,1,1,1,1,1,1,0],' +
            '["466","Drapion",7,15,0,0,1,1,1,1,0],' +
            '["467","Croagunk",7,6,1,1,1,1,1,1,0],' +
            '["468","Toxicroak",7,6,0,0,1,1,1,1,0],' +
            '["469","Carnivine",4,-1,1,1,1,1,0,0,0],' +
            '["470","Finneon",2,-1,1,1,1,1,0,0,0],' +
            '["471","Lumineon",2,-1,0,0,1,1,0,0,0],' +
            '["472","Mantyke",2,9,1,1,1,1,0,0,0],' +
            '["473","Mantine",2,9,1,1,1,1,0,0,0],' +
            '["474","Snover",5,4,1,1,1,1,1,1,0],' +
            '["475","Abomasnow",5,4,0,0,2,2,2,2,0],' +
            '["476","Porygon",0,-1,1,1,1,1,0,0,0],' +
            '["477","Porygon2",0,-1,0,0,1,1,0,0,0],' +
            '["478","Porygon-Z",0,-1,0,0,1,1,0,0,0],' +
            '["479e","Rotom",3,2,1,1,6,6,6,6,0],' +
            '["480","Uxie",10,-1,1,1,1,1,0,0,0],' +
            '["481","Mesprit",10,-1,1,1,1,1,0,0,0],' +
            '["482","Azelf",10,-1,1,1,1,1,0,0,0],' +
            '["483","Dialga",16,14,1,1,1,1,0,0,0],' +
            '["484","Palkia",2,14,1,1,1,1,0,0,0],' +
            '["485","Heatran",1,16,1,1,1,1,0,0,0],' +
            '["486","Regigigas",0,-1,1,1,1,1,0,0,0],' +
            '["487b","Giratina",13,14,1,1,2,2,0,0,0],' +
            '["488","Cresselia",10,-1,1,1,1,1,0,0,0],' +
            '["489","Phione",2,-1,1,1,1,1,0,0,0],' +
            '["490","Manaphy",2,-1,1,1,1,1,0,0,0],' +
            '["491","Darkrai",15,-1,1,1,1,1,0,0,0],' +
            '["492s","Shaymin",4,9,1,1,2,2,0,0,0],' +
            '["493j","Arceus",8,-1,1,1,18,18,0,0,0]],' +
            '"5":[["494","Victini",10,1,1,1,1,1,0,0,0],' +
            '["495","Snivy",4,-1,1,1,1,1,0,0,0],' +
            '["496","Servine",4,-1,0,0,1,1,0,0,0],' +
            '["497","Serperior",4,-1,0,0,1,1,0,0,0],' +
            '["498","Tepig",1,-1,1,1,1,1,1,1,0],' +
            '["499","Pignite",1,6,0,0,1,1,1,1,0],' +
            '["500","Emboar",1,6,0,0,1,1,1,1,0],' +
            '["501","Oshawott",2,-1,1,1,1,1,0,0,0],' +
            '["502","Dewott",2,-1,0,0,1,1,0,0,0],' +
            '["503","Samurott",2,-1,0,0,1,1,0,0,0],' +
            '["504","Patrat",0,-1,1,1,1,1,0,0,0],' +
            '["505","Watchog",0,-1,0,0,1,1,0,0,0],' +
            '["506","Lillipup",0,-1,1,1,1,1,0,0,0],' +
            '["507","Herdier",0,-1,0,0,1,1,0,0,0],' +
            '["508","Stoutland",0,-1,0,0,1,1,0,0,0],' +
            '["509","Purrloin",15,-1,1,1,1,1,1,1,0],' +
            '["510","Liepard",15,-1,0,0,1,1,1,1,0],' +
            '["511","Pansage",4,-1,1,1,1,1,0,0,0],' +
            '["512","Simisage",4,-1,0,0,1,1,0,0,0],' +
            '["513","Pansear",1,-1,1,1,1,1,1,1,0],' +
            '["514","Simisear",1,-1,0,0,1,1,1,1,0],' +
            '["515","Panpour",2,-1,1,1,1,1,0,0,0],' +
            '["516","Simipour",2,-1,0,0,1,1,0,0,0],' +
            '["517","Munna",10,-1,1,1,1,1,0,0,0],' +
            '["518","Musharna",10,-1,0,0,1,1,0,0,0],' +
            '["519","Pidove",0,9,1,1,1,1,1,0,0],' +
            '["520","Tranquill",0,9,0,0,1,1,1,0,0],' +
            '["521","Unfezant",0,9,0,0,1,1,1,0,0],' +
            '["522","Blitzle",3,-1,1,1,1,1,1,1,0],' +
            '["523","Zebstrika",3,-1,0,0,1,1,1,1,0],' +
            '["524","Roggenrola",12,-1,1,1,1,1,1,1,0],' +
            '["525","Boldore",12,-1,0,0,1,1,1,1,0],' +
            '["526","Gigalith",12,-1,0,0,1,1,1,1,0],' +
            '["527","Woobat",10,9,1,1,1,1,0,0,0],' +
            '["528","Swoobat",10,9,0,0,1,1,0,0,0],' +
            '["529","Drilbur",8,-1,1,1,1,1,1,1,0],' +
            '["530","Excadrill",8,16,0,0,1,1,1,1,0],' +
            '["531-M","Audino",0,17,1,1,2,2,0,0,0],' +
            '["532","Timburr",6,-1,1,1,1,1,1,1,0],' +
            '["533","Gurdurr",6,-1,0,0,1,1,1,1,0],' +
            '["534","Conkeldurr",6,-1,0,0,1,1,1,1,0],' +
            '["535","Tympole",2,-1,1,1,1,1,1,1,0],' +
            '["536","Palpitoad",2,8,0,0,1,1,1,1,0],' +
            '["537","Seismitoad",2,8,0,0,1,1,1,1,0],' +
            '["538","Throh",6,-1,1,1,1,1,1,1,0],' +
            '["539","Sawk",6,-1,1,1,1,1,1,1,0],' +
            '["540","Sewaddle",11,4,1,1,1,1,0,0,0],' +
            '["541","Swadloon",11,4,0,0,1,1,0,0,0],' +
            '["542","Leavanny",11,4,0,0,1,1,0,0,0],' +
            '["543","Venipede",11,7,1,1,1,1,0,0,0],' +
            '["544","Whirlipede",11,7,0,0,1,1,0,0,0],' +
            '["545","Scolipede",11,7,0,0,1,1,0,0,0],' +
            '["546","Cottonee",4,17,1,1,1,1,1,1,0],' +
            '["547","Whimsicott",4,17,0,0,1,1,1,1,0],' +
            '["548","Petilil",4,-1,1,1,1,1,0,0,0],' +
            '["549","Lilligant",4,-1,0,0,1,1,0,0,0],' +
            '["550b","Basculin",2,-1,1,1,2,2,0,0,0],' +
            '["551","Sandile",8,15,1,1,1,1,1,1,0],' +
            '["552","Krokorok",8,15,0,0,1,1,1,1,0],' +
            '["553","Krookodile",8,15,0,0,1,1,1,1,0],' +
            '["554r8","Darumaka",5,-1,2,2,2,2,2,2,0],' +
            '["555","Darmanitan",1,-1,0,0,4,4,4,4,0],' +
            '["556","Maractus",4,-1,1,1,1,1,0,0,0],' +
            '["557","Dwebble",11,12,1,1,1,1,1,1,0],' +
            '["558","Crustle",11,12,0,0,1,1,1,1,0],' +
            '["559","Scraggy",15,6,1,1,1,1,1,1,0],' +
            '["560","Scrafty",15,6,0,0,1,1,1,1,0],' +
            '["561","Sigilyph",10,9,1,1,1,1,0,0,0],' +
            '["562r8","Yamask",8,13,2,2,2,2,2,2,0],' +
            '["563","Cofagrigus",13,-1,0,0,1,1,1,1,0],' +
            '["564","Tirtouga",2,12,1,1,1,1,1,1,0],' +
            '["565","Carracosta",2,12,0,0,1,1,1,1,0],' +
            '["566","Archen",12,9,1,1,1,1,1,1,0],' +
            '["567","Archeops",12,9,0,0,1,1,1,1,0],' +
            '["568","Trubbish",7,-1,1,1,1,1,0,0,0],' +
            '["569","Garbodor",7,-1,0,0,1,1,0,0,0],' +
            '["570","Zorua",15,-1,1,1,1,1,1,1,0],' +
            '["571","Zoroark",15,-1,0,0,1,1,1,1,0],' +
            '["572","Minccino",0,-1,1,1,1,1,0,0,0],' +
            '["573","Cinccino",0,-1,0,0,1,1,0,0,0],' +
            '["574","Gothita",10,-1,1,1,1,1,0,1,0],' +
            '["575","Gothorita",10,-1,0,0,1,1,0,0,0],' +
            '["576","Gothitelle",10,-1,0,0,1,1,0,0,0],' +
            '["577","Solosis",10,-1,1,1,1,1,0,0,0],' +
            '["578","Duosion",10,-1,0,0,1,1,0,0,0],' +
            '["579","Reuniclus",10,-1,0,0,1,1,0,0,0],' +
            '["580","Ducklett",2,9,1,1,1,1,0,0,0],' +
            '["581","Swanna",2,9,0,0,1,1,0,0,0],' +
            '["582","Vanillite",5,-1,1,1,1,1,1,1,0],' +
            '["583","Vanillish",5,-1,0,0,1,1,1,1,0],' +
            '["584","Vanilluxe",5,-1,0,0,1,1,1,1,0],' +
            '["585","Deerling",0,4,1,1,1,1,0,0,0],' +
            '["586","Sawsbuck",0,4,0,0,1,1,0,0,0],' +
            '["587","Emolga",3,9,1,1,1,1,1,1,0],' +
            '["588","Karrablast",11,-1,1,1,1,1,1,1,0],' +
            '["589","Escavalier",11,16,0,0,1,1,1,1,0],' +
            '["590","Foongus",4,7,1,1,1,1,0,0,0],' +
            '["591","Amoonguss",4,7,0,0,1,1,0,0,0],' +
            '["592","Frillish",2,13,1,1,1,1,1,1,0],' +
            '["593","Jellicent",2,13,0,0,1,1,1,1,0],' +
            '["594","Alomomola",2,-1,1,1,1,1,0,0,0],' +
            '["595","Joltik",11,3,1,1,1,1,1,1,0],' +
            '["596","Galvantula",11,3,0,0,1,1,1,1,0],' +
            '["597","Ferroseed",4,16,1,1,1,1,1,1,0],' +
            '["598","Ferrothorn",4,16,0,0,1,1,1,1,0],' +
            '["599","Klink",16,-1,1,1,1,1,1,1,0],' +
            '["600","Klang",16,-1,0,0,1,1,1,1,0],' +
            '["601","Klinklang",16,-1,0,0,1,1,1,1,0],' +
            '["602","Tynamo",3,-1,1,1,1,1,1,1,0],' +
            '["603","Eelektrik",3,-1,0,0,1,1,1,1,0],' +
            '["604","Eelektross",3,-1,0,0,1,1,1,1,0],' +
            '["605","Elgyem",10,-1,1,1,1,1,0,0,0],' +
            '["606","Beheeyem",10,-1,0,0,1,1,0,0,0],' +
            '["607","Litwick",13,1,1,1,1,1,1,1,0],' +
            '["608","Lampent",13,1,0,0,1,1,1,1,0],' +
            '["609","Chandelure",13,1,0,0,1,1,1,1,0],' +
            '["610","Axew",14,-1,1,1,1,1,1,1,0],' +
            '["611","Fraxure",14,-1,0,0,1,1,1,1,0],' +
            '["612","Haxorus",14,-1,0,0,1,1,1,1,0],' +
            '["613","Cubchoo",5,-1,1,1,1,1,1,1,0],' +
            '["614","Beartic",5,-1,0,0,1,1,1,1,0],' +
            '["615","Cryogonal",5,-1,1,1,1,1,1,1,0],' +
            '["616","Shelmet",11,-1,1,1,1,1,0,0,0],' +
            '["617","Accelgor",11,-1,0,0,1,1,0,0,0],' +
            '["618r8","Stunfisk",8,16,2,2,2,2,2,2,0],' +
            '["619","Mienfoo",6,-1,1,1,1,1,1,1,0],' +
            '["620","Mienshao",6,-1,0,0,1,1,1,1,0],' +
            '["621","Druddigon",14,-1,1,1,1,1,1,1,0],' +
            '["622","Golett",8,13,1,1,1,1,1,1,0],' +
            '["623","Golurk",8,13,0,0,1,1,1,1,0],' +
            '["624","Pawniard",15,16,1,1,1,1,1,1,0],' +
            '["625","Bisharp",15,16,0,0,1,1,1,1,0],' +
            '["626","Bouffalant",0,-1,1,1,1,1,0,0,0],' +
            '["627","Rufflet",0,9,1,1,1,1,0,0,0],' +
            '["628","Braviary",0,9,0,0,1,1,0,0,0],' +
            '["629","Vullaby",15,9,1,1,1,1,1,1,0],' +
            '["630","Mandibuzz",15,9,0,0,1,1,1,1,0],' +
            '["631","Heatmor",1,-1,1,1,1,1,1,1,0],' +
            '["632","Durant",11,16,1,1,1,1,1,1,0],' +
            '["633","Deino",15,14,1,1,1,1,1,1,0],' +
            '["634","Zweilous",15,14,0,0,1,1,1,1,0],' +
            '["635","Hydreigon",15,14,0,0,1,1,1,1,0],' +
            '["636","Larvesta",11,1,1,1,1,1,1,1,0],' +
            '["637","Volcarona",11,1,0,0,1,1,1,1,0],' +
            '["638","Cobalion",16,6,1,1,1,1,0,0,0],' +
            '["639","Terrakion",12,6,1,1,1,1,0,0,0],' +
            '["640","Virizion",4,6,1,1,1,1,0,0,0],' +
            '["641","Tornadus",9,-1,1,1,2,2,0,0,0],' +
            '["642","Thundurus",3,9,1,1,2,2,0,0,0],' +
            '["643","Reshiram",14,1,1,1,1,1,0,0,0],' +
            '["644","Zekrom",14,3,1,1,1,1,0,0,0],' +
            '["645","Landorus",8,9,1,1,2,2,0,0,0],' +
            '["646z","Kyurem",14,5,1,1,3,3,0,0,0],' +
            '["647","Keldeo",2,6,1,1,2,2,0,0,0],' +
            '["648","Meloetta",0,10,1,1,2,2,0,0,0],' +
            '["649c","Genesect",11,16,1,1,5,5,0,0,0]],' +
            '"6":[["650","Chespin",4,-1,1,1,1,1,1,1,0],' +
            '["651","Quilladin",4,-1,0,0,1,1,1,1,0],' +
            '["652","Chesnaught",4,6,0,0,1,1,1,1,0],' +
            '["653","Fennekin",1,-1,1,1,1,1,1,1,0],' +
            '["654","Braixen",1,-1,0,0,1,1,1,1,0],' +
            '["655","Delphox",1,10,0,0,1,1,1,1,0],' +
            '["656","Froakie",2,-1,1,1,1,1,1,1,0],' +
            '["657","Frogadier",2,-1,0,0,1,1,1,1,0],' +
            '["658","Greninja",2,15,0,0,1,1,1,1,0],' +
            '["659","Bunnelby",0,-1,1,1,1,1,1,1,0],' +
            '["660","Diggersby",0,8,0,0,1,1,1,1,0],' +
            '["661","Fletchling",0,9,1,1,1,1,1,1,0],' +
            '["662","Fletchinder",1,9,0,0,1,1,1,1,0],' +
            '["663","Talonflame",1,9,0,0,1,1,1,1,0],' +
            '["664","Scatterbug",11,-1,1,1,1,1,0,1,0],' +
            '["665","Spewpa",11,-1,0,0,1,1,0,0,0],' +
            '["666","Vivillon",11,9,0,0,1,1,0,0,0],' +
            '["667","Litleo",1,0,1,1,1,1,1,1,0],' +
            '["668","Pyroar",1,0,0,0,1,1,1,1,0],' +
            '["669","Flab\u00e9b\u00e9",17,-1,1,1,1,1,1,1,0],' +
            '["670","Floette",17,-1,0,0,1,1,1,1,0],' +
            '["671","Florges",17,-1,0,0,1,1,1,1,0],' +
            '["672","Skiddo",4,-1,1,1,1,1,0,0,0],' +
            '["673","Gogoat",4,-1,0,0,1,1,0,0,0],' +
            '["674","Pancham",6,-1,1,1,1,1,1,1,0],' +
            '["675","Pangoro",6,15,0,0,1,1,1,1,0],' +
            '["676","Furfrou",0,-1,1,1,1,1,0,0,0],' +
            '["677","Espurr",10,-1,1,1,1,1,0,0,0],' +
            '["678","Meowstic",10,-1,0,0,1,1,0,0,0],' +
            '["679","Honedge",16,13,1,1,1,1,1,1,0],' +
            '["680","Doublade",16,13,0,0,1,1,1,1,0],' +
            '["681","Aegislash",16,13,0,0,2,2,2,2,0],' +
            '["682","Spritzee",17,-1,1,1,1,1,1,1,0],' +
            '["683","Aromatisse",17,-1,0,0,1,1,1,1,0],' +
            '["684","Swirlix",17,-1,1,1,1,1,1,1,0],' +
            '["685","Slurpuff",17,-1,0,0,1,1,1,1,0],' +
            '["686","Inkay",15,10,1,1,1,1,1,1,0],' +
            '["687","Malamar",15,10,0,0,1,1,1,1,0],' +
            '["688","Binacle",12,2,1,1,1,1,1,1,0],' +
            '["689","Barbaracle",12,2,0,0,1,1,1,1,0],' +
            '["690","Skrelp",7,2,1,1,1,1,1,1,0],' +
            '["691","Dragalge",7,14,0,0,1,1,1,1,0],' +
            '["692","Clauncher",2,-1,1,1,1,1,0,0,0],' +
            '["693","Clawitzer",2,-1,0,0,1,1,0,0,0],' +
            '["694","Helioptile",3,0,1,1,1,1,1,1,0],' +
            '["695","Heliolisk",3,0,0,0,1,1,1,1,0],' +
            '["696","Tyrunt",12,14,1,1,1,1,1,1,0],' +
            '["697","Tyrantrum",12,14,0,0,1,1,1,1,0],' +
            '["698","Amaura",12,5,1,1,1,1,1,1,0],' +
            '["699","Aurorus",12,5,0,0,1,1,1,1,0],' +
            '["700","Hawlucha",6,9,1,1,1,1,1,1,0],' +
            '["701","Dedenne",3,17,1,1,1,1,1,1,0],' +
            '["702","Carbink",12,17,1,1,1,1,1,1,0],' +
            '["703","Goomy",14,-1,1,1,1,1,1,1,0],' +
            '["704","Sliggoo",14,-1,0,0,1,1,1,1,0],' +
            '["705","Goodra",14,-1,0,0,1,1,1,1,0],' +
            '["706","Klefki",16,17,1,1,1,1,1,1,1],' +
            '["707","Phantump",13,4,1,1,1,1,1,1,0],' +
            '["708","Trevenant",13,4,0,0,1,1,1,1,0],' +
            '["709s3","Pumpkaboo",13,4,1,1,4,4,4,4,0],' +
            '["710s3","Gourgeist",13,4,0,0,4,4,4,4,0],' +
            '["711","Bergmite",5,-1,1,1,1,1,1,1,0],' +
            '["712","Avalugg",5,-1,0,0,1,1,1,1,0],' +
            '["713","Noibat",9,14,1,1,1,1,1,1,0],' +
            '["714","Noivern",9,14,0,0,1,1,1,1,0],' +
            '["715","Xerneas",17,-1,1,1,1,1,0,0,0],' +
            '["716","Yveltal",15,9,1,1,1,1,0,0,0],' +
            '["717c","Zygarde",14,8,1,1,4,4,0,0,0],' +
            '["718","Diancie",12,17,1,1,2,2,0,0,0],' +
            '["719","Hoopa",10,13,1,1,2,2,0,0,0],' +
            '["720","Volcanion",1,2,1,1,1,1,0,0,0]],' +
            '"7":[["721","Rowlet",4,9,1,1,1,1,1,1,0],' +
            '["722","Dartrix",4,9,0,0,1,1,1,1,0],' +
            '["723","Decidueye",4,13,0,0,1,1,1,1,0],' +
            '["724","Litten",1,-1,1,1,1,1,1,1,0],' +
            '["725","Torracat",1,-1,0,0,1,1,1,1,0],' +
            '["726","Incineroar",1,15,0,0,1,1,1,1,0],' +
            '["727","Popplio",2,-1,1,1,1,1,1,1,0],' +
            '["728","Brionne",2,-1,0,0,1,1,1,1,0],' +
            '["729","Primarina",2,17,0,0,1,1,1,1,0],' +
            '["730","Pikipek",0,9,1,1,1,1,0,0,0],' +
            '["731","Trumbeak",0,9,0,0,1,1,0,0,0],' +
            '["732","Toucannon",0,9,0,0,1,1,0,0,0],' +
            '["733","Yungoos",0,-1,1,1,1,1,0,0,0],' +
            '["734","Gumshoos",0,-1,0,0,2,2,0,0,0],' +
            '["735","Grubbin",11,-1,1,1,1,1,1,1,0],' +
            '["736","Charjabug",11,3,0,0,1,1,1,1,0],' +
            '["737t","Vikavolt",11,3,0,0,2,2,2,2,0],' +
            '["738","Crabrawler",6,-1,1,1,1,1,1,1,0],' +
            '["739","Crabominable",6,5,0,0,1,1,1,1,0],' +
            '["740d","Oricorio",13,9,1,1,4,4,0,0,0],' +
            '["741","Cutiefly",11,17,1,1,1,1,1,1,0],' +
            '["742","Ribombee",11,17,0,0,2,2,2,2,0],' +
            '["743","Rockruff",12,-1,1,1,1,1,1,1,0],' +
            '["744c","Lycanroc",12,-1,0,0,3,3,3,3,0],' +
            '["745t","Wishiwashi",2,-1,1,1,3,3,0,0,0],' +
            '["746","Mareanie",7,2,1,1,1,1,0,0,0],' +
            '["747","Toxapex",7,2,0,0,1,1,0,0,0],' +
            '["748","Mudbray",8,-1,1,1,1,1,1,1,0],' +
            '["749","Mudsdale",8,-1,0,0,1,1,1,1,0],' +
            '["750","Dewpider",2,11,1,1,1,1,0,0,0],' +
            '["751","Araquanid",2,11,0,0,2,2,0,0,0],' +
            '["752","Fomantis",4,-1,1,1,1,1,0,0,0],' +
            '["753","Lurantis",4,-1,0,0,2,2,0,0,0],' +
            '["754","Morelull",4,17,1,1,1,1,1,1,0],' +
            '["755","Shiinotic",4,17,0,0,1,1,1,1,0],' +
            '["756","Salandit",7,1,1,1,1,1,1,1,0],' +
            '["757","Salazzle",7,1,0,0,2,2,2,2,0],' +
            '["758","Stufful",0,6,1,1,1,1,1,1,0],' +
            '["759","Bewear",0,6,0,0,1,1,1,1,0],' +
            '["760","Bounsweet",4,-1,1,1,1,1,0,0,0],' +
            '["761","Steenee",4,-1,0,0,1,1,0,0,0],' +
            '["762","Tsareena",4,-1,0,0,1,1,0,0,0],' +
            '["763","Comfey",17,-1,1,1,1,1,1,1,0],' +
            '["764","Oranguru",0,10,1,1,1,1,0,1,0],' +
            '["765","Passimian",6,-1,1,1,1,1,1,1,0],' +
            '["766","Wimpod",11,2,1,1,1,1,0,0,0],' +
            '["767","Golisopod",11,2,0,0,1,1,0,0,0],' +
            '["768","Sandygast",13,8,1,1,1,1,1,1,0],' +
            '["769","Palossand",13,8,0,0,1,1,1,1,0],' +
            '["770","Pyukumuku",2,-1,1,1,1,1,0,0,0],' +
            '["771","Type: Null",0,-1,1,1,1,1,0,0,0],' +
            '["772q","Silvally",17,-1,0,0,18,18,0,0,0],' +
            '["773","Minior",12,9,1,1,2,2,2,2,0],' +
            '["774","Komala",0,-1,1,1,1,1,0,0,0],' +
            '["775","Turtonator",1,14,1,1,1,1,1,1,0],' +
            '["776","Togedemaru",3,16,1,1,2,2,2,2,0],' +
            '["777","Mimikyu",13,17,1,1,2,2,2,2,0],' +
            '["778","Bruxish",2,10,1,1,1,1,0,0,0],' +
            '["779","Drampa",0,14,1,1,1,1,1,1,0],' +
            '["780","Dhelmise",13,4,1,1,1,1,1,1,0],' +
            '["781","Jangmo-o",14,-1,1,1,1,1,1,1,0],' +
            '["782","Hakamo-o",14,6,0,0,1,1,1,1,0],' +
            '["783","Kommo-o",14,6,0,0,2,2,2,2,0],' +
            '["784","Tapu Koko",3,17,1,1,1,1,0,0,0],' +
            '["785","Tapu Lele",10,17,1,1,1,1,0,0,0],' +
            '["786","Tapu Bulu",4,17,1,1,1,1,0,0,0],' +
            '["787","Tapu Fini",2,17,1,1,1,1,0,0,0],' +
            '["788","Cosmog",10,-1,1,1,1,1,0,0,0],' +
            '["789","Cosmoem",10,-1,0,0,1,1,0,0,0],' +
            '["790","Solgaleo",10,16,0,0,1,1,0,0,0],' +
            '["791","Lunala",10,13,0,0,1,1,0,0,0],' +
            '["792","Nihilego",12,7,1,1,1,1,0,0,0],' +
            '["793","Buzzwole",11,6,1,1,1,1,0,0,0],' +
            '["794","Pheromosa",11,6,1,1,1,1,0,0,0],' +
            '["795","Xurkitree",3,-1,1,1,1,1,0,0,0],' +
            '["796","Celesteela",16,9,1,1,1,1,0,0,0],' +
            '["797","Kartana",4,16,1,1,1,1,0,0,0],' +
            '["798","Guzzlord",15,14,1,1,1,1,0,0,0],' +
            '["799","Poipole",7,-1,1,1,1,1,0,0,0],' +
            '["800","Naganadel",7,14,0,0,1,1,0,0,0],' +
            '["801","Stakataka",12,16,1,1,1,1,0,0,0],' +
            '["802","Blacephalon",1,13,1,1,1,1,0,0,0],' +
            '["803s","Necrozma",10,16,1,1,4,4,0,0,0],' +
            '["804","Magearna",16,17,1,1,1,1,0,0,0],' +
            '["805","Marshadow",6,13,1,1,1,1,0,0,0],' +
            '["806","Zeraora",3,-1,1,1,1,1,0,0,0],' +
            '["807","Meltan",16,-1,1,1,1,1,0,1,0],' +
            '["808","Melmetal",16,-1,0,0,1,1,0,0,0]],' +
            '"8":[["809","Grookey",4,-1,1,1,1,1,0,0,0],' +
            '["810","Thwackey",4,-1,0,0,1,1,0,0,0],' +
            '["811","Rillaboom",4,-1,0,0,1,1,0,0,0],' +
            '["812","Scorbunny",1,-1,1,1,1,1,1,1,0],' +
            '["813","Raboot",1,-1,0,0,1,1,1,1,0],' +
            '["814","Cinderace",1,-1,0,0,1,1,1,1,0],' +
            '["815","Sobble",2,-1,1,1,1,1,0,0,0],' +
            '["816","Drizzile",2,-1,0,0,1,1,0,0,0],' +
            '["817","Inteleon",2,-1,0,0,1,1,0,0,0],' +
            '["818","Skwovet",0,-1,1,1,1,1,0,0,0],' +
            '["819","Greedent",0,-1,0,0,1,1,0,0,0],' +
            '["820","Rookidee",9,-1,1,1,1,1,1,1,0],' +
            '["821","Corvisquire",9,-1,0,0,1,1,1,1,0],' +
            '["822","Corviknight",9,16,0,0,1,1,1,1,0],' +
            '["823","Blipbug",11,-1,1,1,1,1,0,0,0],' +
            '["824","Dottler",11,10,0,0,1,1,0,0,0],' +
            '["825","Orbeetle",11,10,0,0,1,1,0,0,0],' +
            '["826","Nickit",15,-1,1,1,1,1,1,1,0],' +
            '["827","Thievul",15,-1,0,0,1,1,1,1,0],' +
            '["828","Gossifleur",4,-1,1,1,1,1,0,0,0],' +
            '["829","Eldegoss",4,-1,0,0,1,1,0,0,0],' +
            '["830","Wooloo",0,-1,1,1,1,1,0,0,0],' +
            '["831","Dubwool",0,-1,0,0,1,1,0,0,0],' +
            '["832","Chewtle",2,-1,1,1,1,1,1,1,0],' +
            '["833","Drednaw",2,12,0,0,1,1,1,1,0],' +
            '["834","Yamper",3,-1,1,1,1,1,1,1,0],' +
            '["835","Boltund",3,-1,0,0,1,1,1,1,0],' +
            '["836","Rolycoly",12,-1,1,1,1,1,1,1,0],' +
            '["837","Carkol",12,1,0,0,1,1,1,1,0],' +
            '["838","Coalossal",12,1,0,0,1,1,1,1,0],' +
            '["839","Applin",4,14,1,1,1,1,1,1,0],' +
            '["840","Flapple",4,14,0,0,1,1,1,1,0],' +
            '["841","Appletun",4,14,0,0,1,1,1,1,0],' +
            '["842","Silicobra",8,-1,1,1,1,1,1,1,0],' +
            '["843","Sandaconda",8,-1,0,0,1,1,1,1,0],' +
            '["844c","Cramorant",9,2,1,1,3,3,0,0,0],' +
            '["845","Arrokuda",2,-1,1,1,1,1,0,0,0],' +
            '["846","Barraskewda",2,-1,0,0,1,1,0,0,0],' +
            '["847","Toxel",3,7,1,1,1,1,1,1,0],' +
            '["848","Toxtricity",3,7,0,0,2,2,2,2,0],' +
            '["849","Sizzlipede",1,11,1,1,1,1,1,1,0],' +
            '["850","Centiskorch",1,11,0,0,1,1,1,1,0],' +
            '["851","Clobbopus",6,-1,1,1,1,1,1,1,0],' +
            '["852","Grapploct",6,-1,0,0,1,1,1,1,0],' +
            '["853","Sinistea",13,-1,1,1,1,1,1,1,0],' +
            '["854","Polteageist",13,-1,0,0,1,1,1,1,0],' +
            '["855","Hatenna",10,-1,1,1,1,1,1,1,0],' +
            '["856","Hattrem",10,-1,0,0,1,1,1,1,0],' +
            '["857","Hatterene",10,17,0,0,1,1,1,1,0],' +
            '["858","Impidimp",15,17,1,1,1,1,1,1,0],' +
            '["859","Morgrem",15,17,0,0,1,1,1,1,0],' +
            '["860","Grimmsnarl",15,17,0,0,1,1,1,1,0],' +
            '["861","Obstagoon",15,0,0,0,1,1,1,1,0],' +
            '["862","Perrserker",16,-1,0,0,1,1,1,1,0],' +
            '["863","Cursola",13,-1,0,0,1,1,1,1,0],' +
            '["864","Sirfetch\'d",6,-1,0,0,1,1,1,1,0],' +
            '["865","Mr. Rime",5,10,0,0,1,1,1,1,0],' +
            '["866","Runerigus",8,13,0,0,1,1,1,1,0],' +
            '["867","Milcery",17,-1,1,1,1,1,1,1,0],' +
            '["868","Alcremie",17,-1,0,0,1,1,1,1,0],' +
            '["869","Falinks",6,-1,1,1,1,1,1,1,1],' +
            '["870","Pincurchin",3,-1,1,1,1,1,1,1,0],' +
            '["871","Snom",5,11,1,1,1,1,1,1,0],' +
            '["872","Frosmoth",5,11,0,0,1,1,1,1,0],' +
            '["873","Stonjourner",12,-1,1,1,1,1,1,1,0],' +
            '["874","Eiscue",5,-1,1,1,2,2,2,2,0],' +
            '["875","Indeedee",10,0,1,1,2,2,0,0,0],' +
            '["876","Morpeko",3,15,1,1,2,2,2,2,0],' +
            '["877","Cufant",16,-1,1,1,1,1,1,1,0],' +
            '["878","Copperajah",16,-1,0,0,1,1,1,1,0],' +
            '["879","Dracozolt",3,14,1,1,1,1,1,1,0],' +
            '["880","Arctozolt",3,5,1,1,1,1,1,1,0],' +
            '["881","Dracovish",2,14,1,1,1,1,1,1,0],' +
            '["882","Arctovish",2,5,1,1,1,1,1,1,0],' +
            '["883","Duraludon",16,14,1,1,1,1,1,1,0],' +
            '["884","Dreepy",14,13,1,1,1,1,1,1,0],' +
            '["885","Drakloak",14,13,0,0,1,1,1,1,0],' +
            '["886","Dragapult",14,13,0,0,1,1,1,1,0],' +
            '["887","Zacian",17,-1,1,1,2,2,0,0,0],' +
            '["888","Zamazenta",6,-1,1,1,2,2,0,0,0],' +
            '["889","Eternatus",7,14,1,1,1,1,0,0,0]],' +
            '"97":[["000a1","Lunupine",15,-1,1,1,1,1,0,0,0],' +
            '["000-L","Lunupine/Mega Forme Q",15,17,0,0,1,1,0,0,0],' +
            '["000a2","Blophin",2,-1,1,1,1,1,0,0,0],' +
            '["000a3","Inflale",2,-1,0,0,1,1,0,0,0],' +
            '["000a4","Orkit",2,-1,1,1,1,1,0,0,0],' +
            '["000a6","Orcalot",2,16,0,0,1,1,0,0,0],' +
            '["000a7","Faemue\u00f1o",17,9,1,1,1,1,0,0,0],' +
            '["000a8","Faemilar\u00edn",17,9,0,0,1,1,0,0,0],' +
            '["000a9","Faem\u00edsimo",17,9,0,0,1,1,0,0,0],' +
            '["000aa","Wagell",7,17,1,1,1,1,0,0,0],' +
            '["000ab","Wanamangora",7,17,0,0,1,1,0,0,0],' +
            '["000ac","Gosold",0,9,1,1,1,1,0,0,0],' +
            '["000ad","Goldesem",10,9,0,0,1,1,0,0,0],' +
            '["000ae","Impyre",15,-1,1,1,1,1,0,0,0],' +
            '["000af","Baflammet",15,1,0,0,1,1,0,0,0],' +
            '["000ag","Searene",14,2,1,1,1,1,0,0,0],' +
            '["000ah","Solynx",1,-1,1,1,1,1,0,0,0],' +
            '["000-S","Solynx/Mega Forme Q",1,3,0,0,1,1,0,0,0],' +
            '["000ai","Ardik",5,-1,1,1,1,1,0,0,0],' +
            '["000aj","Sibex",5,-1,0,0,1,1,0,0,0],' +
            '["000ak","Boxaby",12,6,1,1,1,1,0,0,0],' +
            '["000al","Kangspar",12,6,0,0,1,1,0,0,0],' +
            '["000-X","Kangspar/Mega Forme Q",12,6,0,0,1,1,0,0,0],' +
            '["000am","Bunbori",5,17,1,1,1,1,0,0,0],' +
            '["000-B","Bunbori/Mega Forme Q",5,17,0,0,1,1,0,0,0],' +
            '["000an","Taiveret",4,-1,1,1,1,1,0,0,0],' +
            '["000ao","Taipaeus",4,-1,0,0,1,1,0,0,0],' +
            '["000ap","Taimorpha",4,6,0,0,1,1,0,0,0],' +
            '["000aq","Flarbat",1,9,1,1,1,1,0,0,0],' +
            '["000ar","Flarotis",1,17,0,0,1,1,0,0,0],' +
            '["000as","Flaroptera",1,17,0,0,1,1,0,0,0],' +
            '["000at","Hydrark",2,-1,1,1,1,1,0,0,0],' +
            '["000au","Hydrinus",2,-1,0,0,1,1,0,0,0],' +
            '["000av","Hydrinifor",2,16,0,0,1,1,0,0,0],' +
            '["000aw","Gragon",13,14,1,1,1,1,0,0,0],' +
            '["000ay","Greegon",13,14,0,0,1,1,0,0,0],' +
            '["000az","Avaragon",13,14,0,0,1,1,0,0,0],' +
            '["000b0","Kinaster",15,1,1,1,1,1,0,0,0],' +
            '["000b1","Luckoo",4,9,1,1,1,1,0,0,0],' +
            '["000b2","Peckoo",4,9,0,0,1,1,0,0,0],' +
            '["000b3","Peekoo",4,10,0,0,1,1,0,0,0],' +
            '["000b4","Arasprit",8,-1,1,1,1,1,0,0,0],' +
            '["000b5","Arthreux",8,11,0,0,1,1,0,0,0],' +
            '["000b6","Quetzephyr",3,9,1,1,1,1,0,0,0],' +
            '["000b7","Quetzaptyl",3,9,0,0,1,1,0,0,0],' +
            '["000b8","Pixrine",12,17,1,1,1,1,0,0,0],' +
            '["000b9","Kitsunari",10,-1,1,1,1,1,0,0,0],' +
            '["000ba","Kitsubuki",10,13,0,0,1,1,0,0,0],' +
            '["000bb","Kryptik",12,13,1,1,1,1,0,0,0],' +
            '["000bc","Bandicoon",0,15,1,1,1,1,0,0,0],' +
            '["000bd","Phastix",11,-1,1,1,1,1,0,0,0],' +
            '["000be","Phasmaleef/Forest Forme",11,-1,0,0,1,1,0,0,0],' +
            '["000bf","Phasmaleef/Desert Forme",11,-1,0,0,1,1,0,0,0],' +
            '["000bg","Pasovan",0,-1,1,1,1,1,0,0,0],' +
            '["000bh","Glaquine",5,-1,1,1,1,1,0,0,0],' +
            '["000bi","Cavallost",5,-1,0,0,1,1,0,0,0],' +
            '["000bk","Minibbit",16,-1,1,1,1,1,0,0,0],' +
            '["000bl","Metabbit",16,-1,0,0,1,1,0,0,0],' +
            '["000bm","Terabbit",16,-1,0,0,1,1,0,0,0],' +
            '["000bn","Tillink",8,-1,1,1,1,1,0,0,0],' +
            '["000bo","Terrink",8,-1,0,0,1,1,0,0,0],' +
            '["000bp","Bezerell",2,15,1,1,1,1,0,0,0],' +
            '["000bq","Bezermuur",2,15,0,0,1,1,0,0,0],' +
            '["000br","Bezermuut",2,15,0,0,1,1,0,0,0],' +
            '["000bt","Ayeren",0,10,1,1,1,1,0,0,0],' +
            '["000bu","Aytheraye",0,13,0,0,1,1,0,0,0],' +
            '["000bv","Skeleco",2,13,1,1,1,1,0,0,0],' +
            '["000bw","Phantiidae",2,13,0,0,1,1,0,0,0],' +
            '["000bx","Klaatupillar",11,-1,1,1,1,1,0,0,0],' +
            '["000by","Charaxalis",11,-1,0,0,1,1,0,0,0],' +
            '["000bz","Incantasius",11,10,0,0,1,1,0,0,0],' +
            '["000c0","Maravol",11,7,1,1,1,1,0,1,0],' +
            '["000cm","Kyutopi",10,17,1,1,1,1,0,0,0],' +
            '["000cn","Konatus",10,17,0,0,1,1,0,0,0],' +
            '["000co","Kenyip",8,-1,1,1,1,1,0,0,0],' +
            '["000cp","Arfrica",8,6,0,0,1,1,0,0,0],' +
            '["000cq","Kalahowli",8,6,0,0,1,1,0,0,0],' +
            '["000cr","Petripeep",12,-1,1,1,1,1,0,0,0],' +
            '["000cs","Chirock",12,14,0,0,1,1,0,0,0],' +
            '["000ct","Toxitrice",12,14,0,0,1,1,0,0,0],' +
            '["000cu","Serpetone",12,7,0,0,1,1,0,0,0],' +
            '["000cv","Toxilisk",12,7,0,0,1,1,0,0,0],' +
            '["000cw","Gumairy",4,17,1,1,1,1,0,0,0],' +
            '["000cx","Eucylph",4,17,0,0,1,1,0,0,0],' +
            '["000cy","Puppod",7,0,1,1,1,1,0,0,0],' +
            '["000cz","Slugdog",7,0,0,0,1,1,0,0,0],' +
            '["000d0","Rokiwi",4,-1,1,1,1,1,0,0,0],' +
            '["000d1","Brushiwi",4,15,0,0,1,1,0,0,0],' +
            '["000d2","Alicalf",5,12,1,1,1,1,0,0,0],' +
            '["000d3","Cetacorn",5,12,0,0,1,1,0,0,0],' +
            '["000d4","Valkind",17,6,1,1,1,1,0,0,0],' +
            '["000d5","Frayja",17,6,0,0,1,1,0,0,0],' +
            '["000d6","Croaket",15,-1,1,1,1,1,0,0,0],' +
            '["000d7","Quibbit/Toxic Forme",15,7,0,0,1,1,0,0,0],' +
            '["000d8","Quibbit/Charged Forme",15,3,0,0,1,1,0,0,0],' +
            '["000d9","Quibbit/Herbal Forme",15,4,0,0,1,1,0,0,0],' +
            '["000da","Quibbit/Magma Forme",15,1,0,0,1,1,0,0,0],' +
            '["000db","Quibbit/Fae Forme",15,17,0,0,1,1,0,0,0],' +
            '["000de","Slypin",10,15,1,1,1,1,0,0,0],' +
            '["000df","Haredini",10,15,0,0,1,1,0,0,0],' +
            '["000dg","Selkrub",11,7,1,1,1,1,0,0,0],' +
            '["000dh","Aqrabion",11,7,0,0,1,1,0,0,0],' +
            '["000di","Skargas",11,7,0,0,1,1,0,0,0],' +
            '["000dj","Kawotor",2,0,1,1,1,1,0,0,0],' +
            '["000dk","Lutriva",2,6,0,0,1,1,0,0,0],' +
            '["000dl","Selutian",2,5,0,0,1,1,0,0,0],' +
            '["000dm","Kitwurm",11,-1,1,1,1,1,0,0,0],' +
            '["000dn","Purrpa",11,-1,0,0,1,1,0,0,0],' +
            '["000do","Moffkat",11,17,0,0,1,1,0,0,0],' +
            '["000dp","Pepyre",4,1,1,1,1,1,0,0,0],' +
            '["000dq","Skarasear",4,1,0,0,1,1,0,0,0],' +
            '["000dr","Aphreyd",11,-1,1,1,1,1,0,0,0],' +
            '["000ds","Scavady",11,-1,0,0,1,1,0,0,0],' +
            '["000dt","Mantidra",11,14,0,0,1,1,0,0,0],' +
            '["000du","Caimaw",16,-1,1,1,1,1,0,0,0],' +
            '["000dv","Caimangle",16,-1,0,0,1,1,0,0,0],' +
            '["000dw","Valimp",17,15,1,1,1,1,0,0,0],' +
            '["000dx","Valladox",17,15,0,0,1,1,0,0,0],' +
            '["000dy","Valenoir",17,15,0,0,1,1,0,0,0],' +
            '["000dz","Frusky",5,-1,1,1,1,1,1,1,0],' +
            '["000f0","Glacifur",5,-1,0,0,1,1,1,1,0],' +
            '["000f1","Skyrie",9,-1,1,1,1,1,0,0,0],' +
            '["000f2","Grymphony",9,-1,0,0,1,1,0,0,0],' +
            '["000f3","Shinorin",14,6,1,1,1,1,0,0,0],' +
            '["000f4","Shinorin/Incandescent",14,1,0,0,1,1,0,0,0],' +
            '["000f5","Sikannos",0,1,1,1,1,1,0,0,0],' +
            '["000f6","Sikannos/Unfettered",13,1,0,0,1,1,0,0,0],' +
            '["000f7","Goschief",17,-1,1,1,1,1,0,0,0],' +
            '["000f8","Havonk",17,15,0,0,1,1,0,0,0],' +
            '["000f9","Mocknock",13,16,1,1,1,1,0,0,0],' +
            '["000fa","Portalgeist",13,16,0,0,1,1,0,0,0]],' +
            '"98":[["012-Q","Butterfree/Mega Forme Q",11,10,0,0,1,1,1,1,0],' +
            '["024-Q","Arbok/Mega Forme Q",7,15,0,0,1,1,1,1,0],' +
            '["027-Q","Raichu/Mega Forme Q",3,6,0,0,1,1,0,0,0],' +
            '["039-Q","Ninetales/Mega Forme Q",1,10,0,0,1,1,1,1,0],' +
            '["057-Q","Persian/Mega Forme Q",0,13,0,0,1,1,0,0,0],' +
            '["063-Q","Arcanine/Mega Forme Q",1,14,0,0,1,1,1,1,0],' +
            '["083-Q","Rapidash/Mega Forme Q",1,9,0,0,1,1,1,1,0],' +
            '["090-Q","Farfetch\'d/Mega Forme Q",0,9,0,0,1,1,0,0,0],' +
            '["094-Q","Dewgong/Mega Forme Q",2,5,0,0,1,1,1,1,0],' +
            '["113-Q","Marowak/Alolan Mega Forme Q",1,13,0,0,1,1,1,1,0],' +
            '["136-Q","Jynx/Mega Forme Q",5,10,0,0,1,1,1,1,1],' +
            '["141-Q","Lapras/Mega Forme Q",2,5,0,0,1,1,1,1,0],' +
            '["144-Q","Vaporeon/Mega Forme Q",2,-1,0,0,1,1,1,0,0],' +
            '["145-Q","Jolteon/Mega Forme Q",3,-1,0,0,1,1,0,0,0],' +
            '["146-Q","Flareon/Mega Forme Q",1,-1,0,0,1,1,1,0,0],' +
            '["147-Q","Espeon/Mega Forme Q",10,-1,0,0,1,1,0,1,0],' +
            '["148-Q","Umbreon/Mega Forme Q",15,-1,0,0,1,1,1,0,0],' +
            '["149-Q","Leafeon/Mega Forme Q",4,-1,0,0,1,1,0,0,0],' +
            '["150-Q","Glaceon/Mega Forme Q",5,-1,0,0,1,1,0,0,0],' +
            '["151-Q","Sylveon/Mega Forme Q",17,-1,0,0,1,1,0,1,0],' +
            '["164-Q","Dragonite/Mega Forme Q",14,9,0,0,1,1,0,0,0],' +
            '["166-Q","Mew/Mega Forme Q",10,-1,0,0,1,1,0,0,0],' +
            '["177-Q","Furret/Mega Forme Q",0,14,0,0,1,1,0,1,0],' +
            '["201-Q","Jumpluff/Mega Forme Q",4,17,0,0,1,1,0,0,0],' +
            '["215-Q","Girafarig/Mega Forme Q",0,10,0,0,1,1,0,0,0],' +
            '["218-Q","Dunsparce/Mega Forme Q",0,14,0,0,1,1,1,0,0],' +
            '["227-Q","Weavile/Mega Forme Q",15,5,0,0,1,1,1,0,0],' +
            '["239-Q","Skarmory/Mega Forme Q",16,14,0,0,1,1,1,0,0],' +
            '["263-Q","Lugia/Mega Forme Q",10,9,0,0,1,1,0,0,0],' +
            '["264-Q","Ho-oh/Mega Forme Q",1,9,0,0,1,1,0,0,0],' +
            '["265-Q","Celebi/Mega Forme Q",10,4,0,0,1,1,0,0,0],' +
            '["276-Q","Mightyena/Mega Forme Q",15,-1,0,0,1,1,1,1,0],' +
            '["301-Q","Breloom/Mega Forme Q",4,6,0,0,1,1,1,1,0],' +
            '["325-Q","Manectric/Mega Forme Q",3,1,0,0,1,1,1,1,0],' +
            '["335-Q","Wailord/Mega Forme Q",2,9,0,0,1,1,0,0,0],' +
            '["344-Q","Flygon/Mega Forme Q",8,14,0,0,1,1,1,1,0],' +
            '["349-Q","Zangoose/Mega Forme Q",0,15,0,0,1,1,0,0,0],' +
            '["350-Q","Seviper/Mega Forme Q",7,2,0,0,1,1,1,0,0],' +
            '["364-Q","Milotic/Mega Forme Q",2,17,0,0,1,1,0,0,0],' +
            '["380-Q","Froslass/Mega Forme Q",5,13,0,0,1,1,1,1,0],' +
            '["403-Q","Jirachi/Mega Forme Q",16,10,0,0,1,1,0,0,0],' +
            '["423-Q","Luxray/Mega Forme Q",3,15,0,0,1,1,1,1,0],' +
            '["438-Q","Floatzel/Mega Forme Q",2,-1,0,0,1,1,0,0,0],' +
            '["471-Q","Lumineon/Mega Forme Q",2,17,0,0,1,1,0,0,0],' +
            '["487-Q","Giratina/Mega Forme Q",13,14,0,0,1,1,0,0,0],' +
            '["490-Q","Manaphy/Mega Forme Q",2,17,0,0,1,1,0,0,0],' +
            '["510-Q","Liepard/Mega Forme Q",15,-1,0,0,1,1,1,1,0],' +
            '["545-Q","Scolipede/Mega Forme Q",11,7,0,0,1,1,0,0,0],' +
            '["560-Q","Scrafty/Mega Forme Q",15,6,0,0,1,1,1,1,0],' +
            '["571-Q","Zoroark/Mega Forme Q",15,-1,0,0,1,1,1,1,0],' +
            '["609-Q","Chandelure/Mega Forme Q",13,1,0,0,1,1,1,1,0],' +
            '["612-Q","Haxorus/Mega Forme Q",14,16,0,0,1,1,1,1,0],' +
            '["621-Q","Druddigon/Mega Forme Q",14,12,0,0,1,1,0,1,0],' +
            '["668-Q","Pyroar/Mega Forme Q",1,0,0,0,1,1,1,1,0],' +
            '["673-Q","Gogoat/Mega Forme Q",4,-1,0,0,1,1,0,0,0],' +
            '["695-Q","Heliolisk/Mega Forme Q",3,1,0,0,1,1,1,1,0],' +
            '["700-Q","Hawlucha/Mega Forme Q",6,9,0,0,1,1,1,1,0],' +
            '["705-Q","Goodra/Mega Forme Q",14,7,0,0,1,1,1,1,0],' +
            '["714-Q","Noivern/Mega Forme Q",9,14,0,0,1,1,0,1,0]],' +
            '"99":[["019s1","Saiyan Rattata",0,6,1,1,1,1,0,0,0],' +
            '["019s2","Super-Saiyan Rattata",0,6,0,0,1,1,0,0,0],' +
            '["020s1","Super-Saiyan Raticate",0,6,0,0,1,1,0,0,0],' +
            '["020s2","Super-Saiyan 2 Raticate",0,6,0,0,1,1,0,0,0],' +
            '["020-S","Super-Saiyan 3 Raticate",0,6,0,0,1,1,0,0,0],' +
            '["020-T","Super-Saiyan 4 Raticate",0,6,0,0,1,1,0,0,0],' +
            '["025f","Flying Pichu",3,-1,1,1,1,1,0,0,0],' +
            '["025s","Surfing Pichu",3,-1,1,1,1,1,0,0,0],' +
            '["026f","Flying Pikachu",3,-1,0,0,1,1,0,0,0],' +
            '["026s","Surfing Pikachu",3,-1,0,0,1,1,0,0,0],' +
            '["026w","Snowboarding Pikachu",3,-1,0,0,1,1,0,0,0],' +
            '["027f","Flying Raichu",3,9,0,0,1,1,0,0,0],' +
            '["027s","Surfing Raichu",3,2,0,0,1,1,0,0,0],' +
            '["027w","Snowboarding Raichu",3,5,0,0,1,1,0,0,0],' +
            '["029t","Sandslash/Totem Forme Q",8,-1,0,0,1,1,1,1,0],' +
            '["035s","Shooting Star Cleffa",17,-1,1,1,1,1,0,0,0],' +
            '["036s","Shooting Star Clefairy",17,-1,0,0,1,1,0,0,0],' +
            '["037s","Shooting Star Clefable",17,-1,0,0,1,1,0,0,0],' +
            '["038a","Koroku",1,5,1,1,1,1,0,0,0],' +
            '["039-A","Kyukori",1,5,0,0,1,1,0,0,0],' +
            '["040g","Guild Igglybuff",0,17,1,1,1,1,0,0,0],' +
            '["041g","Guild Jigglypuff",0,17,0,0,1,1,0,0,0],' +
            '["042g","Guild Wigglytuff",0,17,0,0,1,1,0,0,0],' +
            '["062x","Apocalyptic Growlithe",1,-1,1,1,1,1,0,0,0],' +
            '["063x","Apocalyptic Arcanine",1,1,0,0,1,1,0,0,0],' +
            '["084s","Snowpoke",5,10,1,1,1,1,0,0,0],' +
            '["085s","Snowbro",5,10,0,0,1,1,0,0,0],' +
            '["086s","Snowking",5,10,0,0,1,1,0,0,0],' +
            '["108ds","Death Star Voltorb",3,-1,1,1,1,1,0,0,0],' +
            '["109ds","Death Star Electrode",3,-1,0,0,1,1,0,0,0],' +
            '["189e","Early Bird Natu",10,9,1,1,1,1,0,0,0],' +
            '["190e","Early Bird Xatu",10,9,0,0,1,1,0,0,0],' +
            '["219v","Gligar/Vampire",8,9,1,1,1,1,0,0,0],' +
            '["220v","Gliscor/Vampire",8,9,0,0,1,1,0,0,0],' +
            '["225s","Scaracross",11,13,1,1,1,1,1,0,0],' +
            '["230bm","Blue Moon Slugma",2,-1,1,1,1,1,0,0,0],' +
            '["231bm","Blue Moon Magcargo",2,12,0,0,1,1,0,0,0],' +
            '["240c","Houndour/Orthrus",1,14,1,1,1,1,0,0,0],' +
            '["240i","Frosdour",15,5,1,1,1,1,1,0,0],' +
            '["241c","Houndoom/Cerberus",1,14,0,0,1,1,0,0,0],' +
            '["241i","Chilldoom",15,5,0,0,1,1,1,0,0],' +
            '["243t","Donphan/Totem Forme Q",8,-1,0,0,1,1,1,1,0],' +
            '["263xd","XD001",10,9,1,1,1,1,0,0,0],' +
            '["275x","Apocalyptic Poochyena",15,13,1,1,1,1,0,0,0],' +
            '["276x","Apocalyptic Mightyena",15,13,0,0,1,1,0,0,0],' +
            '["294b","Snoralts",5,17,1,1,1,1,0,0,0],' +
            '["295b","Snolia",5,17,0,0,1,1,0,0,0],' +
            '["296b","Frosvoir",5,13,0,0,1,1,0,0,0],' +
            '["297b","Glaillade",5,6,0,0,1,1,0,0,0],' +
            '["300x","Apocalyptic Shroomish",4,7,1,1,1,1,0,0,0],' +
            '["301x","Apocalyptic Breloom",4,7,0,0,1,1,0,0,0],' +
            '["336i","Numel/Arctic",5,8,1,1,1,1,0,0,0],' +
            '["337i","Camerupt/Arctic",5,8,0,0,1,1,0,0,0],' +
            '["354t","Whiscash/Totem Forme Q",2,8,0,0,1,1,1,1,0],' +
            '["402f","Ryukuza",14,9,1,1,1,1,0,0,0],' +
            '["402m","Magquaza",14,13,1,1,1,1,0,0,0],' +
            '["405s","Seasonal Turtwig",4,-1,1,1,1,1,0,0,0],' +
            '["406s","Seasonal Grotle",4,-1,0,0,1,1,0,0,0],' +
            '["407s","Seasonal Torterra",4,-1,0,0,1,1,0,0,0],' +
            '["421f","Shinxel",3,2,1,1,1,1,1,0,0],' +
            '["422f","Fluxio",3,2,0,0,1,1,1,0,0],' +
            '["423f","Fluxray",3,2,0,0,1,1,1,0,0],' +
            '["423-F","Fluxray/Mega Forme Q",3,2,0,0,1,1,1,0,0],' +
            '["434s","Snow Combee",11,5,1,1,1,1,0,0,0],' +
            '["435s","Snow Vespiquen",11,5,0,0,1,1,0,0,0],' +
            '["435t","Snow Vespiquen/Totem Forme Q",11,5,0,0,1,1,0,0,0],' +
            '["450t","Skuntank/Totem Forme Q",7,15,0,0,1,1,1,1,0],' +
            '["483p","Dialga/Primal Forme Q",16,14,0,0,1,1,0,0,0],' +
            '["484p","Palkia/Primal Forme Q",2,14,0,0,1,1,0,0,0],' +
            '["509h","Purrloin/Hallowe\'en Witch",15,-1,1,1,1,1,0,0,0],' +
            '["510h","Liepard/Hallowe\'en Witch",15,-1,0,0,1,1,0,0,0],' +
            '["556t","Maractus/Totem Forme Q",4,-1,0,0,1,1,0,0,0],' +
            '["622x","Apocalyptic Golett",12,16,1,1,1,1,0,0,0],' +
            '["623x","Apocalyptic Golurk",12,16,0,0,1,1,0,0,0],' +
            '["628t","Braviary/Totem Forme Q",0,9,0,0,1,1,0,0,0],' +
            '["630t","Mandibuzz/Totem Forme Q",15,9,0,0,1,1,1,1,0],' +
            '["667g","Glileo",1,7,1,1,1,1,0,0,0],' +
            '["668g","Pyriscor",1,7,0,0,1,1,0,0,0],' +
            '["682p","Spritzkrow",17,15,1,1,1,1,0,0,0],' +
            '["683p","Aromakrow",17,15,0,0,1,1,0,0,0],' +
            '["713b","Noismog",10,14,1,1,1,1,0,0,0],' +
            '["713c","Noismoem",10,14,0,0,1,1,0,0,0],' +
            '["714b","Solgavern",16,14,0,0,1,1,0,0,0],' +
            '["714c","Lunavern",13,14,0,0,1,1,0,0,0],' +
            '["726b","Incineroar/Feral",1,3,0,0,1,1,0,0,0],' +
            '["740q","Oricorio/Pointe Style",4,9,0,0,1,1,0,0,0]]}}').split(',');
        }
        // eslint-disable-next-line camelcase
        fillTemplates(TEMPLATES) {
            this.TEMPLATES.shelterOptionsHTML = TEMPLATES.shelterOptionsHTML();
            this.TEMPLATES.fieldSortHTML = TEMPLATES.fieldSortHTML();
            this.TEMPLATES.fieldSearchHTML = TEMPLATES.fieldSearchHTML();
            this.TEMPLATES.privateFieldSearchHTML = TEMPLATES.privateFieldSearchHTML();
            this.TEMPLATES.qolHubHTML = TEMPLATES.qolHubHTML();
            this.TEMPLATES.evolveFastHTML = TEMPLATES.evolveFastHTML();
            this.TEMPLATES.labOptionsHTML = TEMPLATES.labOptionsHTML();
            this.TEMPLATES.publicFieldTooltipModHTML = TEMPLATES.publicFieldTooltipModHTML();
            this.TEMPLATES.privateFieldTooltipModHTML = TEMPLATES.privateFieldTooltipModHTML();
        }
        fillOptionsLists() {
            this.TYPE_OPTIONS = this.HELPERS.buildOptionsString(this.TYPE_LIST);
            this.NATURE_OPTIONS = this.HELPERS.buildOptionsString(this.NATURE_LIST);
            this.EGG_GROUP_OPTIONS = this.HELPERS.buildOptionsString(this.EGG_GROUP_LIST);
        }
    }
    // eslint-disable-next-line no-unused-vars
    class UserSettings {
        constructor() {
        // default settings when the script gets loaded the first time
            this.customCss = '';
            this.enableDaycare = true;
            this.shelterEnable = true;
            this.fishingEnable = true;
            this.publicFieldEnable = true;
            this.privateFieldEnable = true;
            this.partyMod = true;
            this.easyEvolve = true;
            this.labNotifier = true;
            this.dexFilterEnable = true;
            this.condenseWishforge = true;
            this.shelterFeatureEnables = {
                search: true,
                sort: true,
            };
            this.publicFieldFeatureEnables = {
                search: true,
                sort: true,
                release: true,
                tooltip: true
            };
            this.privateFieldFeatureEnables = {
                search: true,
                release: true,
                tooltip: true
            };

            /*
             * used to tie "global" enable settings in USER_SETTINGS to the more
             * granular settings that are related to the same page
             */
            this.LINKED_SETTINGS = [
                {
                    'manager': 'shelterEnable',
                    'managed': 'shelterFeatureEnables'
                },
                {
                    'manager': 'publicFieldEnable',
                    'managed': 'publicFieldFeatureEnables'
                },
                {
                    'manager': 'privateFieldEnable',
                    'managed': 'privateFieldFeatureEnables'
                },
            ];
        }
        /// load settings from an object that is not of type UserSettings
        load(settingsObj) {
            try {
                const countScriptSettings = Object.keys(this).length;
                const localStorageString = settingsObj;
                const countLocalStorageSettings = Object.keys(localStorageString).length;
                // adds new settings to this class
                if (countLocalStorageSettings < countScriptSettings) {
                    const newSettings = this.jQuery.extend(true, this, settingsObj);
                    this.copyFields(newSettings);
                }
                // removes objects from the local storage if they don't exist anymore. Not yet possible..
                if (countLocalStorageSettings > countScriptSettings) {
                /* do nothing at the moment */
                }
            }
            catch (err) {
            /* do nothing at the moment */
            }
            if (settingsObj != this) {
                this.copyFields(settingsObj);
            // this = JSON.parse(this.localStorageMgr.getItem(this.SETTINGS_SAVE_KEY));
            }
        }
        copyFields(settingsObj) {
            const recursiveCopy = (object, key, value) => {
                if (typeof value === 'object') {
                    for (const [_key, _value] of Object.entries(value)) {
                        recursiveCopy(object[key], _key, _value);
                    }
                } else {
                    object[key] = value;
                }
            };
            for (const [key, value] of Object.entries(settingsObj)) {
                recursiveCopy(this, key, value);
            }
        }
    }
    // eslint-disable-next-line no-unused-vars
    class LocalStorageManagerBase {
        constructor(keyPrefix, storage, helpers) {
            this.keyPrefix = keyPrefix;
            this.storage = storage;
            this.helpers = helpers;
        }
        /**
         * This function helps users use the updated script without having to
         * clear their settings by looking for items in local storage that
         * start with 'QoL...' and moving the settings to the correct
         * translated local storage key
         */
        migrateSettings() {
            const newItems = {};
            const keysToRemove = [];
            // find the items that need to be replaced
            for (let i = 0, len = this.storage.length; i < len; ++i) {
                const match = this.storage.key(i).match(/^QoL.*/);
                if(match) {
                    const oldKey = match.input;
                    const newKey = this.translateKey(oldKey);
                    newItems[newKey] = this.storage.getItem(oldKey);
                    keysToRemove.push(oldKey);
                }
            }
            // remove the old style keys
            for(let j = 0; j < keysToRemove.length; j++) {
                this.storage.removeItem(keysToRemove[j]);
            }
            // add the new style keys
            for(const newKey in newItems) {
                this.storage.setItem(newKey, newItems[newKey]);
            }
        }
        translateKey(key) {
            return `${this.keyPrefix}.${key}`;
        }
        saveSettings(key, obj) {
            this.helpers.saveSettings(this.translateKey(key), obj);
        }
        loadSettings($, KEY, DEFAULT, obj) {
            return this.helpers.loadSettings($, this.translateKey(KEY), DEFAULT, obj);
        }
        getItem(key) {
            return this.storage.getItem(this.translateKey(key));
        }
        setItem(key, value) {
            this.storage.setItem(this.translateKey(key), value);
        }
        removeItem(key) {
            this.storage.removeItem(this.translateKey(key));
        }

        /*
         * Set GLOBALS.DEX_DATA and GLOBALS.DEX_UPDATE_DATE from the QoLPokedex data stored in localStorage
         * Inputs:
         * - globals - reference to the GLOBALS settings object
         */
        loadDexIntoGlobalsFromStorage(globals) {
            const key = this.translateKey(globals.POKEDEX_DATA_KEY);
            if(this.storage.getItem(key) === null) {
                return false;
            }
            if(Object.keys(JSON.parse(this.storage.getItem(key))).length === 0) {
                return false;
            }

            const dateAndDex = JSON.parse(this.storage.getItem(key));
            // if QoLPokedex only contains date
            if((dateAndDex.length === 1) ||
           // or if the dex part of the array is empty
           (dateAndDex[1] === undefined) ||
            (dateAndDex[1] === null)) {
                return false;
            }

            globals.DEX_UPDATE_DATE = dateAndDex[0];
            const dex = dateAndDex.slice(1);
            globals.DEX_DATA = dex;
            return true;
        }

        updateLocalStorageDex($, document, updateDate, globals) {
            let dateString = '';
            if(updateDate === undefined) {
                dateString = (new Date()).toUTCString();
            } else {
                dateString = updateDate;
            }
            const datePlusDex = [dateString].concat(globals.DEX_DATA);
            this.storage.setItem(this.translateKey(globals.POKEDEX_DATA_KEY), JSON.stringify(datePlusDex));
            $('.qolDate', document).val(dateString);
        }
    }

    /*
     * This class handles creating, removing, and handling the DOM object actions
     * for the QoL Hub.
     */
    // eslint-disable-next-line no-unused-vars
    class QoLHubBase {
        constructor(jQuery, localStorageMgr, HELPERS, GLOBALS, PAGES, DEFAULT_SETTINGS, SETTINGS) {
            this.jQuery = jQuery;
            this.localStorageMgr = localStorageMgr;
            this.HELPERS = HELPERS;
            this.GLOBALS = GLOBALS;
            this.PAGES = PAGES;
            this.SETTINGS_SAVE_KEY = GLOBALS.SETTINGS_SAVE_KEY;
            this.DEFAULT_USER_SETTINGS = DEFAULT_SETTINGS;
            if (SETTINGS) {
                this.USER_SETTINGS = SETTINGS;
            }
            else {
                this.USER_SETTINGS = this.DEFAULT_USER_SETTINGS;
            }
            this.LINKED_SETTINGS = this.USER_SETTINGS.LINKED_SETTINGS;
        }
        setupCSS() {
        //custom user css
            const customUserCss = this.USER_SETTINGS.customCss;
            //document.querySelector('head').append();
            this.jQuery('head').append('<style type="text/css">' + customUserCss + '</style>');
        }
        setupHandlers() {
            const obj = this;
            obj.jQuery('#qolcustomcss', document).on('keydown', function (e) {
                if (e.keyCode == 9 || e.which == 9) {
                    e.preventDefault();
                    const s = this.selectionStart;
                    obj.jQuery(this).val(function (i, v) {
                        return v.substring(0, s) + '\t' + v.substring(this.selectionEnd);
                    });
                    this.selectionEnd = s + 1;
                }
            });

            obj.jQuery(document).on('input', '.qolhubsetting', (function () { //Changes QoL settings
                const dataKey = this.getAttribute('data-key');
                obj.settingsChange(this.getAttribute('data-key'),
                    obj.jQuery(this).val(),
                    obj.jQuery(this).parent().parent().attr('class'),
                    obj.jQuery(this).parent().attr('class'),
                    (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
                obj.handleLinkedSetting(dataKey);
            }));

            obj.jQuery(document).on('click', '.closeHub', (function () { //close QoL hub
                obj.close(document);
            }));

            obj.jQuery(document).on('click', '#resetPageSettings', (function () {
                const page = obj.jQuery(this).parent().find('select').val();
                obj.clearPageSettings(page);
            }));

            obj.jQuery(document).on('click', 'h3.slidermenu', (function () { //show hidden li in change log
                obj.jQuery(this).next().slideToggle();
            }));

            // Issue #61 - Item 6 - Remove the 'Cleared!' message so the user knows they can click it again
            obj.jQuery(document).on('mouseover', '#clearCachedDex', (function () {
                obj.jQuery('#clearCachedDex').next().remove();
            }));

            // Issue #61 - Item 6 - Add a 'Cleared!' message so the user knows that the clearing works
            obj.jQuery(document).on('click', '#clearCachedDex', (function () {
                obj.resetDex();
            }));
        }
        loadSettings() {
            if (this.localStorageMgr.getItem(this.SETTINGS_SAVE_KEY) === null) {
                this.saveSettings();
            } else {
                if(this.USER_SETTINGS.load(JSON.parse(this.localStorageMgr.getItem(this.SETTINGS_SAVE_KEY)))) {
                    this.saveSettings();
                }
            }
        }
        saveSettings() {
            this.localStorageMgr.setItem(this.SETTINGS_SAVE_KEY, JSON.stringify(this.USER_SETTINGS));
        }
        populateSettings() {
            function populateSetting(object, key, self, oldKeys) {
                oldKeys = oldKeys || [];
                const _object = object[key];
                const newKeys = [...oldKeys, key];
                if (typeof _object === 'boolean') {
                    const _key = newKeys.join('.');
                    self.HELPERS.toggleSetting(_key, _object, 'qolhubsetting');
                }
                else if (typeof _object === 'string') {
                    const _key = newKeys.join('.');
                    self.HELPERS.toggleSetting(_key, _object, 'qolhubsetting');
                } else if (typeof _object === 'object') {
                    for (const _key in _object) {
                        populateSetting(_object, _key, self, newKeys);
                    }
                }
            }
            for (const key in this.USER_SETTINGS) {
                if (Object.hasOwnProperty.call(this.USER_SETTINGS, key)) {
                    populateSetting(this.USER_SETTINGS, key, this);
                }
                this.handleLinkedSetting(key);
            }
        }
        settingsChange(element, textElement) {
            function getProperty( propertyName, object ) {
                const parts = propertyName.split( '.' );
                const length = parts.length;
                let property = object || this;

                for (let i = 0; i < length; i++ ) {
                    if ( ! Object.hasOwnProperty.call(property, parts[i])) {
                        return null;
                    }
                    property = property[parts[i]];
                }
                return property;
            }

            function setProperty( propertyName, object, newValue) {
                const parts = propertyName.split('.');
                const first = parts[0];
                const rest = parts.slice(1);

                if ( !Object.hasOwnProperty.call(object, first)) {
                    return false;
                }
                else if (rest.length == 0) {
                    object[first] = newValue;
                    return true;
                } else {
                    return setProperty(rest.join('.'), object[first], newValue);
                }
            }

            const oldValue = getProperty(element, this.USER_SETTINGS);
            let newValue;
            if (oldValue !== undefined) { // userscript settings
                if (oldValue === false) {
                    newValue = true;
                } else if (oldValue === true) {
                    newValue = false;
                } else if (typeof oldValue === 'string') {
                    newValue = textElement;
                }
                if(!setProperty(element, this.USER_SETTINGS, newValue)) {
                    return false;
                } else {
                    this.saveSettings();
                    return true;
                }
            }
            return false;
        }
        clearPageSettings(pageName) {
            if (pageName !== 'None') { // "None" matches option in HTML
                this.PAGES.clearPageSettings(pageName);
            }
        }
        handleLinkedSetting(possibleManager) {
            const linkedSettingIndex = this.LINKED_SETTINGS.findIndex(ls => ls.manager === possibleManager);
            if(linkedSettingIndex > -1) {
                const managed = this.LINKED_SETTINGS[linkedSettingIndex].managed;
                const userSettings = this.USER_SETTINGS[managed];
                if(this.jQuery(`[data-key=${possibleManager}]`).prop('checked') === false) {
                    for(const setting in userSettings) {
                        this.jQuery(`[data-key="${managed}.${setting}"]`).prop('disabled', true);
                    }
                } else {
                    for(const setting in userSettings) {
                        this.jQuery(`[data-key="${managed}.${setting}"]`).prop('disabled', false);
                    }
                }
            }
        }
        build(document) {
            this.jQuery('body', document).append(this.GLOBALS.TEMPLATES.qolHubHTML);
            this.jQuery('#core', document).addClass('scrolllock');
            const qolHubCssBackgroundHead = this.jQuery('.qolHubHead.qolHubSuperHead').css('background-color');
            const qolHubCssTextColorHead = this.jQuery('.qolHubHead.qolHubSuperHead').css('color');
            const qolHubCssBackground = this.jQuery('.qolHubTable').css('background-color');
            const qolHubCssTextColor = this.jQuery('.qolHubTable').css('color');
            const qolHubDialogBorder = this.jQuery('.dialog>div>div>div').css('border');
            this.jQuery('.qolHubHead').css('background-color', qolHubCssBackgroundHead);
            this.jQuery('.qolHubHead').css('color', qolHubCssTextColorHead);
            this.jQuery('.qolChangeLogHead').css('background-color', qolHubCssBackgroundHead);
            this.jQuery('.qolChangeLogHead').css('color', qolHubCssTextColorHead);
            this.jQuery('.qolChangeLogHead').css('border', qolHubDialogBorder);
            this.jQuery('.qolopencloselist.qolChangeLogContent').css('background-color', qolHubCssBackground);
            this.jQuery('.qolopencloselist.qolChangeLogContent').css('color', qolHubCssTextColor);

            this.jQuery('.qolAllSettings').css('border', qolHubDialogBorder);

            const customCss = this.USER_SETTINGS.customCss;

            this.jQuery('.textareahub', document).append('<textarea id="qolcustomcss" rows="15" cols="60" class="qolhubsetting" data-key="customCss"/></textarea>');
            if (customCss === '') {
                this.jQuery('.textareahub textarea', document).val('#thisisanexample {\n    color: yellow;\n}\n\n.thisisalsoanexample {\n    background-color: blue!important;\n}\n\nhappycssing {\n    display: absolute;\n}');
            } else {
                this.jQuery('.textareahub textarea', document).val(customCss);
            }
        }
        close(document) {
            this.jQuery('.dialog', document).remove();
            this.jQuery('#core', document).removeClass('scrolllock');
        }
    } // QoLHubBase
    // eslint-disable-next-line no-unused-vars
    class Page {
        constructor(jQuery, localStorageMgr, helpers, ssk, ds, url, globalSettings) {
            this.jQuery = jQuery;
            this.localStorageMgr = localStorageMgr;
            this.helpers = helpers;
            this.settingsSaveKey = ssk;
            this.defaultSettings = ds;
            this.url = url;
            this.settings = this.defaultSettings;
            this.globalSettings = globalSettings;
        }

        onPage(w) {
            return w.location.href.indexOf(`pokefarm.com/${this.url}`) != -1;
        }

        loadSettings() {
            this.settings = this.localStorageMgr.loadSettings(
                this.jQuery,this.settingsSaveKey,
                this.defaultSettings,
                this.settings);
        }

        saveSettings() {
            this.localStorageMgr.saveSettings(this.settingsSaveKey, this.settings);
        }

        populateSettings(obj) {
            if(obj === undefined) {
                obj = this.settings;
            }
            for (const key in obj) {
                if (!Object.prototype.hasOwnProperty.call(obj, key)) {
                    continue;
                }
                const value = obj[key];
                if (typeof value === 'object') {
                    this.populateSettings(obj[key]);
                }
                else if (typeof value === 'boolean') {
                    this.helpers.toggleSetting(key, value);//, false);
                }
                else if (typeof value === 'string') {
                    console.log('TODO - split and populate');
                }
            }
        }

        resetSettings() {
            this.settings = JSON.parse(JSON.stringify(this.defaultSettings));
            this.saveSettings();
        }

        settingsChange(element, textElement, customClass, typeClass, arrayName) {
            if (JSON.stringify(this.settings).indexOf(element) >= 0) {
                if (typeof this.settings[element] === 'boolean') {
                    this.settings[element] = !this.settings[element];
                }
                else if (typeof this.settings[element] === 'string') {
                    if (arrayName !== undefined && arrayName !== '') {
                        if (textElement === 'none') {
                            const tempIndex = typeClass - 1;
                            this[arrayName].splice(tempIndex, tempIndex);
                            this.settings[element] = this[arrayName].toString();
                        } else {
                            let tempIndex = -1;
                            if(typeClass !== undefined) {
                                tempIndex = typeClass - 1; // select array
                            } else if(customClass !== undefined) {
                                tempIndex = customClass - 1; // textfield array
                            }
                            this[arrayName][tempIndex] = textElement;
                            this.settings[element] = this[arrayName].toString();
                        }
                    }
                    else {
                        this.settings[element] = textElement;
                    }
                }
                return true;
            }
            else { return false; }
        }

        setupHTML() { /* empty */ }
        setupCSS() { /* empty */ }
        setupObserver() { /* empty */ }
        setupHandlers() { /* empty */ }
    } // Page

    // eslint-disable-next-line no-unused-vars
    class DaycarePage extends Page {
        constructor(jQuery, localStorageMgr, helpers, GLOBALS) {
            super(jQuery, localStorageMgr, helpers, GLOBALS.DAYCARE_PAGE_SETTINGS_KEY, {}, 'daycare');
            const obj = this;
            this.observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                // const fsPokemon = document.querySelector('#fs_pokemon');
                    const fsPokemon = obj.jQuery('#fs_pokemon');
                    if (fsPokemon.length > 0 &&
                    obj.jQuery.contains(fsPokemon[0], mutation.target)) {
                        obj.customSearch(GLOBALS);
                    }
                });
            });
        } // constructor

        setupObserver() {
            this.observer.observe(document.querySelector('body'), {
                childList: true,
                subtree: true
            });
        }
        customSearch(GLOBALS) {
            const obj = this;
            const button = document.querySelector('#pkmnadd');

            let gender = null;
            let eggGroup1 = null, eggGroup2 = null;

            if (button !== null) {
                if (button.attributes['data-gender'] !== undefined) {
                    gender = button.attributes['data-gender'].value;
                }
                /*
                 * the egg group is binary coded decimal
                 * if a pokemon has two egg groups, the leftmost 4 bits of the number returned
                 * are the first egg group and the rightmost 4 bits are the second egg group
                 */
                if (button.attributes['data-egggroup'] !== undefined) {
                    eggGroup1 = parseInt(button.attributes['data-egggroup'].value);
                    if (eggGroup1 > 15) { // two egg groups
                        eggGroup2 = eggGroup1 & 15;
                        eggGroup1 = eggGroup1 >> 4;
                    }
                }
            }

            const EGG_ID_TO_NAME = GLOBALS.EGG_GROUP_ID_TO_NAME;
            if (eggGroup1 !== null) { eggGroup1 = EGG_ID_TO_NAME[eggGroup1]; }
            if (eggGroup2 !== null) { eggGroup2 = EGG_ID_TO_NAME[eggGroup2]; }

            // clear matches
            obj.jQuery('.daycarefoundme').removeClass('daycarefoundme');

            if (gender !== null && eggGroup1 !== null) {
                const fieldmons = document.querySelectorAll('.fieldmon');
                if (fieldmons !== null) {
                    for (let m = 0; m < fieldmons.length; m++) {
                        const mon = fieldmons[m];
                        const searchPokemonBigImg = obj.jQuery(mon)[0].childNodes[0];
                        const searchPokemon = searchPokemonBigImg.alt;

                        const tooltip = obj.jQuery(mon).next();
                        const fieldmontip = tooltip[0].querySelector('.fieldmontip');
                        const speciesDiv = obj.jQuery(fieldmontip).children(':contains(Species)')[0];
                        const eggGroupDiv = obj.jQuery(fieldmontip).children(':contains(Egg Group)')[0];
                        const searchIcons = speciesDiv.querySelector('span').querySelectorAll('img');

                        /*
                         * There can be other icons if the Pokemon is CS/Delta/Shiny/Albino/Melan
                         * The gender title can be "[M], [F], [N]"
                         */
                        const searchGender = searchIcons[0].title.toLowerCase().substring(1, 2);
                        const searchEggGroups = obj.jQuery(eggGroupDiv).text().slice('Egg Group: '.length).split('/');

                        // Match Ditto in Daycare to anything that can breed
                        if (gender === 'd' && eggGroup1 === 'Ditto' &&
                        searchPokemon !== 'Ditto' && searchEggGroups[0] !== 'Undiscovered') {
                            obj.jQuery(searchPokemonBigImg).addClass('daycarefoundme');
                        }
                        // Match Ditto in field to anything that can breed
                        else if (eggGroup1 !== 'Ditto' && searchPokemon === 'Ditto' && eggGroup1 !== 'Undiscovered') {
                            obj.jQuery(searchPokemonBigImg).addClass('daycarefoundme');
                        }
                        // Match correct gender
                        else {
                            const genderCorrect = (gender === 'f' && searchGender === 'm') ||
                            (gender === 'm' && searchGender === 'f');
                            const group1Correct = searchEggGroups.reduce((res, curr) => { res = res || (eggGroup1 === curr); return res; }, false);
                            let group2Correct = false;
                            if (eggGroup2 !== null) {
                                group2Correct = searchEggGroups.reduce((res, curr) => { res = res || (eggGroup2 === curr); return res; }, false);
                            }

                            if (genderCorrect && (group1Correct || group2Correct)) {
                                obj.jQuery(searchPokemonBigImg).addClass('daycarefoundme');
                            }
                        }

                    } // for
                }
            } // if
        } // customSearch
    }

    // eslint-disable-next-line no-unused-vars
    class DexPageBase extends Page {
        constructor(jQuery, localStorageMgr, helpers, GLOBALS) {
            super(jQuery, localStorageMgr, helpers, GLOBALS.DEX_PAGE_SETTINGS_KEY, {}, 'dex');
            const obj = this;
            this.observer = new MutationObserver(function (mutations) {
            // eslint-disable-next-line no-unused-vars
                mutations.forEach(function (mutation) {
                    obj.applyTypeFilters();
                });
            });
            this.typeArray = [];
        }
        setupObserver() {
            this.observer.observe(document.querySelector('#regionslist'), {
                childList: true,
                subtree: true,
            });
        }
        setupHTML() {
            const elem = document.querySelector('.filter-type');
            const clone = elem.cloneNode(true);
            elem.parentNode.appendChild(clone);
            /*
             * can't remove filter-type class or else the filtering
             * won't look right
             */
            this.jQuery(clone).addClass('filter-type-2');
        }

        setupHandlers() {
            const obj = this;
            let h = obj.jQuery.parseJSON(obj.jQuery('#dexdata').html());
            const type2 = obj.jQuery('.filter-type-2');
            const l = obj.jQuery('.filter-type-2 .types');
            const c = l.children();

            const typesSpan = obj.jQuery('.filter-type-2 .types');

            type2.on('mousedown.dextfilter touchstart.dextfilter', function (event) {
                event.preventDefault();
                const leftedge = typesSpan.offset().left;
                const width = typesSpan.width();
                const rightedge = leftedge + width;
                let xLocation = (event.originalEvent.touches ? event.originalEvent.touches[0] : event).pageX;
                if (xLocation >= leftedge & xLocation < rightedge) {
                    xLocation -= leftedge;
                    xLocation = Math.floor(xLocation / width * c.length);
                    xLocation = c.eq(xLocation);
                    if (xLocation.data('type') == h) {
                        h = null;
                        obj.toggleSelectedTypes();
                        obj.applyTypeFilters();
                    } else {
                        h = xLocation.data('type');
                        obj.toggleSelectedTypes(xLocation);
                        obj.applyTypeFilters();
                    }
                } else {
                    obj.toggleSelectedTypes();
                    obj.applyTypeFilters();
                }
            });
        }

        toggleSelectedTypes(b) {
            const g = this.jQuery('.filter-type-2 .name i');
            const l = this.jQuery('.filter-type-2 .types');
            const c = l.children();

            l.addClass('selected');
            c.removeClass('selected');
            if (b && b.length && !b.hasClass('selected')) {
                b.addClass('selected');
                g.text(b.data('type').charAt(0).toUpperCase() + b.data('type').slice(1));
            } else {
                l.removeClass('selected');
                g.text('');
            }
        }

        applyTypeFilters() {
            const l1 = this.jQuery('.entry.filter-type:not(.filter-type-2) .types');
            const l = this.jQuery('.entry.filter-type-2 .types');
            const c1 = l1.children();
            const c = l.children();

            // get the first filter type
            const a1 = c1.filter('.selected').data('type');
            const a = c.filter('.selected').data('type');

            let selector = '.region-entries>li.entry';
            if (a1 !== undefined) {
                selector += '.t-' + a1;
            }
            if (a !== undefined) {
                selector += '.t-' + a;
            }
            if (a1 || a) {
            // Set "display" to "none" for all elements
                this.jQuery('.region-entries>li.entry').css('display', 'none');
                // Set "display" to "inline-block" for elements matching selector
                this.jQuery(selector).css('display', 'inline-block');
            } else {
                this.jQuery(selector).css('display', 'inline-block');
            }
        }
    }

    // eslint-disable-next-line no-unused-vars
    class FarmPageBase extends Page {
        DEFAULT_SETTINGS(GLOBALS) {
            const d = {
                TYPE_APPEND: {}
            };
            // .TYPE_APPEND needs to be fully defined before it can be used in kNOWN_EXCEPTIONS
            for (let i = 0; i < GLOBALS.TYPE_LIST.length; i++) {
                const type = GLOBALS.TYPE_LIST[i];
                d.TYPE_APPEND[type.toUpperCase()] = '' + i;
            }
            d.TYPE_APPEND['NONE'] = '.' + GLOBALS.TYPE_LIST.length;
            d.KNOWN_EXCEPTIONS = {
                'Gastrodon [Occident]': [
                    '2',
                    '8'
                ],
                'Gastrodon [Orient]': [
                    '2',
                    '8'
                ],
                'Wormadam [Plant Cloak]': [
                    '11',
                    '4'
                ],
                'Wormadam [Trash Cloak]':[
                    '11',
                    '16'
                ],
                'Wormadam [Sandy Cloak]': [
                    '11',
                    '8'
                ],
                'Raticate [Alolan Forme]': [
                    '15',
                    '0'
                ],
                'Ninetales [Alolan Forme]': [
                    '5',
                    '17'
                ],
                'Exeggutor [Alolan Forme]': [
                    '4',
                    '14'
                ],
                'Marowak [Alolan Forme]': [
                    '1',
                    '13'
                ],
                'Dugtrio [Alolan Forme]': [
                    '8',
                    '16'
                ],
                'Graveler [Alolan Forme]': [
                    '12',
                    '3'
                ],
                'Golem [Alolan Forme]': [
                    '12',
                    '3'
                ],
                'Muk [Alolan Forme]': [
                    '7',
                    '15'
                ],
                'Raichu [Alolan Forme]': [
                    '3',
                    '10'
                ],
                'Linoone [Galarian Forme]': [
                    '15',
                    '0'
                ],
                'Gourgeist [Small Size]': [
                    '13',
                    '4'
                ],
                'Gourgeist [Average Size]': [
                    '13',
                    '4'
                ],
                'Gourgeist [Large Size]': [
                    '13',
                    '4'
                ],
                'Gourgeist [Super Size]': [
                    '13',
                    '4'
                ],
                'Persian [Alolan Forme]': [
                    '15'
                ],
            };
            return d;
        }
        constructor(jQuery, localStorageMgr, helpers, GLOBALS) {
            super(jQuery, localStorageMgr, helpers, GLOBALS.FARM_PAGE_SETTINGS_KEY, {}, 'farm#tab=1');
            this.defaultSettings = this.DEFAULT_SETTINGS(GLOBALS);
            this.settings = this.defaultSettings;
            this.evolveListCache = '';
            const obj = this;
            this.observer = new MutationObserver(function (mutations) {
            // eslint-disable-next-line no-unused-vars
                mutations.forEach(function (mutation) {
                    obj.easyQuickEvolve();
                });
            });
        }
        setupHTML() {
            const obj = this;
            this.jQuery(document).ready(function () {
                obj.jQuery('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
                document.querySelector('#farm-evolve>h3').insertAdjacentHTML('afterend',
                    '<label id="qolevolvenormal"><input type="button" class="qolsortnormal" value="Normal list"/></label><label id="qolchangesletype"><input type="button" class="qolsorttype" value="Sort on types"/></label><label id="qolsortevolvename"><input type="button" class="qolsortname" value="Sort on name"/></label><label id="qolevolvenew"><input type="button" class="qolsortnew" value="New dex entry"/>');
                // use the evolve button
                obj.jQuery('#farmnews-evolutions>p>label>input').addClass('qolquickevo');
            });
        }
        setupObserver() {
            this.observer.observe(document.querySelector('#farmnews-evolutions'), {
                childList: true,
                characterdata: true,
                subtree: true,
                characterDataOldValue: true,
            });
        }
        setupHandlers(GLOBALS) {
            const obj = this;
            obj.jQuery(document).on('click', '#qolevolvenormal', (function () {
                obj.easyEvolveNormalList(GLOBALS);
            }));

            obj.jQuery(document).on('click', '#qolchangesletype', (function () {
                obj.easyEvolveTypeList(GLOBALS);
            }));

            obj.jQuery(document).on('click', '#qolsortevolvename', (function () {
                obj.easyEvolveNameList(GLOBALS);
            }));

            obj.jQuery(document).on('click', '#qolevolvenew', (function () {
                obj.easyEvolveNewList(GLOBALS);
            }));
        }
        clearSortedEvolveLists() {
        // first remove the sorted pokemon type list to avoid duplicates
            this.jQuery('.evolvepkmnlist').show();
            this.jQuery('.evolvepkmnlist').removeAttr('class');
            if (document.querySelector('.qolEvolveTypeList')) {
                document.querySelector('.qolEvolveTypeList').remove();
            }
            if (document.querySelector('.qolEvolveNameList')) {
                document.querySelector('.qolEvolveNameList').remove();
            }
            if (document.querySelector('.qolEvolveNewList')) {
                document.querySelector('.qolEvolveNewList').remove();
            }
        }
        easyEvolveNormalList() {
            this.clearSortedEvolveLists();
        }
        easyEvolveNameList() {
            const obj = this;
            this.clearSortedEvolveLists();

            this.jQuery('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
            document.querySelector('#farmnews-evolutions>.scrollable').insertAdjacentHTML('afterbegin', '<ul class="qolEvolveNameList">');

            let errorOccurred = false;
            this.jQuery('#farmnews-evolutions>.scrollable>.evolvepkmnlist>Li').each(function (index) {
            // getting the <li> element from the pokemon & the pokemon evolved name
                const getEvolveString = obj.jQuery(this).html();
                if (getEvolveString === undefined || getEvolveString === '') {
                    console.error(`Unable to parse html from <li> at index ${index}`);
                    errorOccurred = true;
                } else {
                    let beforeEvolvePokemon = obj.jQuery(this).children().children().text().slice(0, -6);
                    if (beforeEvolvePokemon === undefined || beforeEvolvePokemon === '') {
                        console.error(`Unable to parse pokemon-evolving-from from <li> at index ${index}`);
                        errorOccurred = true;
                    } else {
                    // remove extraneous whitespace
                        beforeEvolvePokemon = beforeEvolvePokemon.trim();
                        // use a regex to find extra whitespace between words
                        let whitespace = beforeEvolvePokemon.match(/\s{2,}/g);
                        while (whitespace) {
                            for (let i = whitespace.length - 1; i >= 0; i--) {
                                const match = whitespace[i];
                                beforeEvolvePokemon = beforeEvolvePokemon.replace(match, ' ');
                            }
                            whitespace = beforeEvolvePokemon.match(/\s{2,}/g);
                        }
                        let evolvePokemon = getEvolveString.substr(getEvolveString.indexOf('into</span> ') + 12);
                        if (evolvePokemon === undefined || evolvePokemon === '') {
                            console.error(`Unable to parse pokemon-evolving-to from <li> at index ${index}`);
                            errorOccurred = true;
                        } else {
                        // remove extraneous whitespace
                            evolvePokemon = evolvePokemon.trim();
                            // use a regex to find extra whitespace between words
                            whitespace = evolvePokemon.match(/\s{2,}/g);
                            while (whitespace) {
                                for (let i = whitespace.length - 1; i >= 0; i--) {
                                    const match = whitespace[i];
                                    evolvePokemon = evolvePokemon.replace(match, ' ');
                                }
                                whitespace = evolvePokemon.match(/\s{2,}/g);
                            }
                            // Replace all spaces with a character that is not part of any Pokemon's name, but is valid in a CSS selector
                            const evolvePokemonClass = evolvePokemon.replace(/ /g, '_').replace('[', '').replace(']', '').replace(/\./g, '');
                            if (evolvePokemonClass === undefined || evolvePokemonClass === '') {
                                console.error(`Unable to create valid CSS class for pokemon-evolving-to from <li> at index ${index}`);
                                errorOccurred = true;
                            } else {
                                if (obj.jQuery('#farmnews-evolutions>.scrollable>.qolEvolveNameList>Li>Ul').hasClass(evolvePokemonClass) === false) {
                                    document.querySelector('.qolEvolveNameList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">' +
                                    beforeEvolvePokemon + ' > ' + evolvePokemon +
                                    '</h3><ul class="' + evolvePokemonClass +
                                    ' qolChangeLogContent"></ul></li><br>');
                                } // class
                                obj.jQuery(this).clone().appendTo('.' + evolvePokemonClass + '');
                            } // evolvePokemonClass
                        } // evolvePokemon
                    } // beforeEvolvePokemon
                } // getEvolveString
            });

            if (errorOccurred) {
                window.alert('Error occurred while sorting pokemon by name');
                return;
            }

            obj.jQuery('#farmnews-evolutions>.scrollable>.qolEvolveNameList>Li').each(function (index) {
                const amountOfEvolves = obj.jQuery(this).children().children().length;
                if (amountOfEvolves === 0) {
                    console.error(`Found 0 evolutions for <li> at ${index} of evolve name list`);
                    errorOccurred = true;
                } else {
                    const getEvolveString = obj.jQuery(this).children().children().html();
                    if (getEvolveString === undefined || getEvolveString === '') {
                        console.error(`Unable to parse evolve string from <li> at ${index} from evolve name list`);
                        errorOccurred = true;
                    } else {
                        const beforeEvolvePokemon = obj.jQuery(this).children().children().children().children().first().text(); // .split(' ').join('');

                        if (beforeEvolvePokemon === undefined || beforeEvolvePokemon === '') {
                            console.error(`Unable to parse pokemon-evolving-from from <li> at ${index} from evolve name list`);
                            errorOccurred = true;
                        } else {
                            const evolvePokemon = getEvolveString.substr(getEvolveString.indexOf('into</span> ') + 'into</span> '.length);
                            if (evolvePokemon === undefined || evolvePokemon === '') {
                                console.error(`Unable to parse pokemon-evolving-to from <li> at ${index} from evolve name list`);
                                errorOccurred = true;
                            } else {
                                obj.jQuery(this).children('.slidermenu').html(beforeEvolvePokemon + ' > ' + evolvePokemon + ' (' + amountOfEvolves + ')');
                            }
                        }
                    } // getEvolveString
                } // amountOfEvolves
            });

            obj.jQuery('.evolvepkmnlist').hide();

            if (errorOccurred) {
                window.alert('Error occurred while sorting pokemon by name');
                return;
            }

            //layout of the created html
            const typeBackground = obj.jQuery('.panel>h3').css('background-color');
            const typeBorder = obj.jQuery('.panel>h3').css('border');
            const typeColor = obj.jQuery('.panel>h3').css('color');
            obj.jQuery('.expandlist').css('background-color', '' + typeBackground + '');
            obj.jQuery('.expandlist').css('border', '' + typeBorder + '');
            obj.jQuery('.expandlist').css('color', '' + typeColor + '');

            const typeListBackground = obj.jQuery('.tabbed_interface>div').css('background-color');
            const typeListColor = obj.jQuery('.tabbed_interface>div').css('color');
            obj.jQuery('.qolChangeLogContent').css('background-color', '' + typeListBackground + '');
            obj.jQuery('.qolChangeLogContent').css('color', '' + typeListColor + '');
        }
        easyEvolveNewList(GLOBALS) {
            const obj = this;
            const dexData = GLOBALS.DEX_DATA;

            this.clearSortedEvolveLists();

            // add a class to the original pokemon evolve list to be able to manipulate the element more easily and add the ul for the new dex search
            this.jQuery('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
            document.querySelector('#farmnews-evolutions>.scrollable').insertAdjacentHTML('afterbegin', '<ul class="qolEvolveNewList">');

            const getNewCheckData = (name) => {
                const nameIndex = dexData.indexOf('"' + name + '"');
                const checkData = (nameIndex > -1 && dexData.length > nameIndex + 9) ?
                    dexData.slice(nameIndex + 5, nameIndex + 10) :
                    [undefined, undefined, undefined, undefined, undefined];
                if (checkData[4] !== undefined) {
                    checkData[4] = checkData[4].replace(']', '');
                }
                return checkData;
            };

            const createListElements = (jQuery, cls, header, name, elem) => {
                if (jQuery('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass(cls) === false) {
                    const html = '<li class="expandlist">' +
                    `<h3 class="slidermenu">${header}</h3>` +
                    `<ul class="${cls} qolChangeLogContent"></ul></li><br>`;
                    document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', html);
                }

                if (jQuery(`#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.${cls}>li:contains(${name})`).length == 0) {
                    jQuery(elem).clone().appendTo(`.${cls}`);
                }
            };

            this.jQuery('#farmnews-evolutions>.scrollable>.evolvepkmnlist>Li').each(function () { //the actual search
            // getting the <li> element from the pokemon & the pokemon evolved name
                const getEvolveString = obj.jQuery(this).html();

                // every pokemon is a normal unless shiny, albino or melanistic pokemon is found
                let pokemonIsNormal = true;
                let pokemonIsShiny = false;
                let pokemonIsAlbino = false;
                let pokemonIsMelanistic = false;

                if (getEvolveString.includes('title="[SHINY]')) {
                    pokemonIsShiny = true;
                    pokemonIsNormal = false;
                }
                if (getEvolveString.includes('title="[ALBINO]')) {
                    pokemonIsAlbino = true;
                    pokemonIsNormal = false;
                }
                if (getEvolveString.includes('title="[MELANISTIC]')) {
                    pokemonIsMelanistic = true;
                    pokemonIsNormal = false;
                }

                let evolvePokemonName = getEvolveString.substr(getEvolveString.indexOf('into</span> ') + 'into</span>'.length).trim();
                // use a regex to find extra whitespace between words
                let whitespace = evolvePokemonName.match(/\s{2,}/g);
                while (whitespace) {
                    for (let i = whitespace.length - 1; i >= 0; i--) {
                        const match = whitespace[i];
                        evolvePokemonName = evolvePokemonName.replace(match, ' ');
                    }
                    whitespace = evolvePokemonName.match(/\s{2,}/g);
                }
                const evolvePokemonNameIndex = dexData.indexOf('"' + evolvePokemonName + '"');
                const evolvePokemonNameInDex = evolvePokemonNameIndex != -1;

                const [evolveNewTotal, evolveNewCheck,
                    evolveNewShinyCheck, evolveNewAlbinoCheck,
                    evolveNewMelaCheck] = getNewCheckData(evolvePokemonName);

                const [evolvePokemonNameOne, pokemonDexKeepSecondName,
                    pokemonDexKeepThirdName, pokemonDexKeepFourthName,
                    pokemonDexKeepFifthName, pokemonDexKeepSixthName] = evolvePokemonName.split(' ');
                const [evolveNewTotalOne, evolveNewCheckOne, /* ignore */, /* ignore */, /* ignore */] = getNewCheckData(evolvePokemonNameOne);
                /*
                 * if a pokemon has a name like gligar [Vampire] it won't be found. This tries to change the name as it's recorded in the pokedex data array
                 * The remaining checks are a (not great) way of checking for names with '/' in them.
                 * PFQ uses '/' in the names of PFQ variants and in PFQ exclusives with multiple forms
                 * Example of evolvePokemonNameTwoBefore: 'Gliscor/Vampire'
                 * Regex: \w+/\w+
                 */
                const evolvePokemonNameTwo = (evolvePokemonNameOne + '/' + pokemonDexKeepSecondName).replace('[', '').replace(']', '');
                const [evolveNewTotalTwo, evolveNewCheckTwo,
                    evolveNewShinyCheckTwo, evolveNewAlbinoCheckTwo,
                    evolveNewMelaCheckTwo] = getNewCheckData(evolvePokemonNameTwo);

                /*
                 * Example of evolvePokemonNameThreeBefore: 'Phasmaleef/Forest Forme\'
                 * Regex: \w+/\w+ \w+
                 */
                const evolvePokemonNameThree = (evolvePokemonNameOne + '/' +
                pokemonDexKeepSecondName + ' ' +
                pokemonDexKeepThirdName).replace('[', '').replace(']', '');
                const [evolveNewTotalThree, evolveNewCheckThree,
                    evolveNewShinyCheckThree, evolveNewAlbinoCheckThree,
                    evolveNewMelaCheckThree] = getNewCheckData(evolvePokemonNameThree);

                /*
                 * Example of evolvePokemonNameFourBefore: 'Butterfree/Mega Forme Q'
                 * Regex: \w+/\w+ \w+ \w+
                 */
                const evolvePokemonNameFour = (evolvePokemonNameOne + '/' +
                pokemonDexKeepSecondName + ' ' +
                pokemonDexKeepThirdName + ' ' +
                pokemonDexKeepFourthName).replace('[', '').replace(']', '');
                const [evolveNewTotalFour, evolveNewCheckFour,
                    evolveNewShinyCheckFour, evolveNewAlbinoCheckFour,
                    evolveNewMelaCheckFour] = getNewCheckData(evolvePokemonNameFour);

                /*
                 * Example of evolvePokemonNameFiveBefore: 'Marowak/Alolan Mega Forme Q'
                 * Regex: \w+/\w+ \w+ \w+ \w+
                 */
                const evolvePokemonNameFive = (evolvePokemonNameOne + '/' +
                pokemonDexKeepSecondName + ' ' +
                pokemonDexKeepThirdName + ' ' +
                pokemonDexKeepFourthName + ' ' +
                pokemonDexKeepFifthName).replace('[', '').replace(']', '');
                const [evolveNewTotalFive, evolveNewCheckFive,
                    evolveNewShinyCheckFive, evolveNewAlbinoCheckFive,
                    evolveNewMelaCheckFive] = getNewCheckData(evolvePokemonNameFive);

                /*
                 * Couldn't find any examples of pokemon that match evolvePokemonNameSixBefore
                 * Regex: \w+/\w+ \w+ \w+ \w+ \w+
                 */
                const evolvePokemonNameSix = (evolvePokemonNameOne + '/' +
                pokemonDexKeepSecondName + ' ' +
                pokemonDexKeepThirdName + ' ' +
                pokemonDexKeepFourthName + ' ' +
                pokemonDexKeepFifthName + ' ' +
                pokemonDexKeepSixthName).replace('[', '').replace(']', '');
                const [evolveNewTotalSix, evolveNewCheckSix,
                    evolveNewShinyCheckSix, evolveNewAlbinoCheckSix,
                    evolveNewMelaCheckSix] = getNewCheckData(evolvePokemonNameSix);

                //prep done now the search
                if (evolvePokemonNameInDex) { //Looks for the Pokémon name in which it evolves to check if it's in your Pokédex
                    if (pokemonIsNormal == true) { //normal Pokémon search
                        if (evolveNewCheckOne == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                            createListElements(obj.jQuery, 'newpokedexentry', 'New Pokédex entry', evolvePokemonName, this);
                        } else if (evolveNewTotal > evolveNewCheck && evolveNewCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                            createListElements(obj.jQuery, 'newpossiblepokedexentry', 'Possible Mega/Totem forme', evolvePokemonName, this);
                        }
                    // the rest of the pokemon that could be found by name are pokemon that you already have in the dex
                    } else if (pokemonIsShiny == true) { //shiny Pokemon search
                        if (evolveNewShinyCheck == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                            createListElements(obj.jQuery, 'newshinypokedexentry', 'New Shiny Pokédex entry', evolvePokemonName, this);
                        } else if (evolveNewTotal > evolveNewShinyCheck && evolveNewShinyCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                            createListElements(obj.jQuery, 'newpossibleshinypokedexentry', 'Possible Shiny Mega/Totem forme', evolvePokemonName, this);
                        }
                    // the rest of the pokemon that could be found by name are pokemon that you already have in the dex
                    } else if (pokemonIsAlbino == true) { //albino pokemon search
                        if (evolveNewAlbinoCheck == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                            createListElements(obj.jQuery, 'newalbinopokedexentry', 'New Albino Pokédex entry', evolvePokemonName, this);
                        } else if (evolveNewTotal > evolveNewAlbinoCheck && evolveNewAlbinoCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                            createListElements(obj.jQuery, 'newpossiblealbinopokedexentry', 'Possible Albino Mega/Totem forme', evolvePokemonName, this);
                        }
                    // the rest of the pokemon that could be found by name are pokemon that you already have in the dex
                    } else if (pokemonIsMelanistic == true) { //melanistic pokemon search
                        if (evolveNewMelaCheck == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                            createListElements(obj.jQuery, 'newmelanisticpokedexentry', 'New Melanistic Pokédex entry', evolvePokemonName, this);
                        } else if (evolveNewTotal > evolveNewMelaCheck && evolveNewMelaCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                            createListElements(obj.jQuery, 'newpossiblemelanisticpokedexentry', 'Possible Melanistic Mega/Totem forme', evolvePokemonName, this);
                        }
                    // the rest of the pokemon that could be found by name are pokemon that you already have in the dex
                    }

                //Looks for the Pokémon name in which it evolves to check if it's in your Pokédex
                } else {
                    if (pokemonIsNormal == true) {
                        if (evolveNewCheckTwo == 0 || evolveNewCheckThree == 0 || evolveNewCheckFour == 0 || evolveNewCheckFive == 0 || evolveNewCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                            createListElements(obj.jQuery, 'newpokedexentry', 'New Pokédex entry', evolvePokemonName, this);
                        } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                            if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                                createListElements(obj.jQuery, 'possiblealolan', 'Possible new Alolan entry', evolvePokemonName, this);
                            }
                        } else if (evolvePokemonName.indexOf('[') >= 0) {
                            if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"' + evolvePokemonNameOne + '"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                                createListElements(obj.jQuery, 'possibledifferent', 'Possible new forme/cloak entry', evolvePokemonName, this);
                            } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                                createListElements(obj.jQuery, 'newpokedexentry', 'New Pokédex entry', evolvePokemonName, this);
                            }

                        } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                            createListElements(obj.jQuery, 'newpokedexentry', 'New Pokédex entry', evolvePokemonName, this);
                        } else {
                            createListElements(obj.jQuery, 'errornotfound', 'Error contact ECEInTheHole!', evolvePokemonName, this);
                        }
                    } else if (pokemonIsShiny == true) {
                        if (evolveNewShinyCheckTwo == 0 || evolveNewShinyCheckThree == 0 || evolveNewShinyCheckFour == 0 || evolveNewShinyCheckFive == 0 || evolveNewShinyCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                            createListElements(obj.jQuery, 'newshinypokedexentry', 'New Shiny Pokédex entry', evolvePokemonName, this);
                        } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                            if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                                createListElements(obj.jQuery, 'possibleshinyalolan', 'Possible new Shiny Alolan entry', evolvePokemonName, this);
                            }
                        } else if (evolvePokemonName.indexOf('[') >= 0) {
                            if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"' + evolvePokemonNameOne + '"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                                createListElements(obj.jQuery, 'possibleshinydifferent', 'Possible new Shiny forme/cloak entry', evolvePokemonName, this);
                            } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                                createListElements(obj.jQuery, 'newshinypokedexentry', 'New Shiny Pokédex entry', evolvePokemonName, this);
                            }
                        } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                            createListElements(obj.jQuery, 'newshinypokedexentry', 'New Shiny Pokédex entry', evolvePokemonName, this);
                        } else {
                            createListElements(obj.jQuery, 'errornotfound', 'Error contact ECEInTheHole!', evolvePokemonName, this);
                        }
                    } else if (pokemonIsAlbino == true) {
                        if (evolveNewAlbinoCheckTwo == 0 || evolveNewAlbinoCheckThree == 0 || evolveNewAlbinoCheckFour == 0 || evolveNewAlbinoCheckFive == 0 || evolveNewAlbinoCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                            createListElements(obj.jQuery, 'newalbinopokedexentry', 'New Albino Pokédex entry', evolvePokemonName, this);
                        } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                            if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                                createListElements(obj.jQuery, 'possiblealbinoalolan', 'Possible new Albino Alolan entry', evolvePokemonName, this);
                            }
                        } else if (evolvePokemonName.indexOf('[') >= 0) {
                            if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"' + evolvePokemonNameOne + '"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                                createListElements(obj.jQuery, 'possiblealbinodifferent', 'Possible new Albino forme/cloak entry', evolvePokemonName, this);
                            } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                                createListElements(obj.jQuery, 'newalbinopokedexentry', 'New Albino Pokédex entry', evolvePokemonName, this);
                            }
                        } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                            createListElements(obj.jQuery, 'newalbinopokedexentry', 'New Albino Pokédex entry', evolvePokemonName, this);
                        } else {
                            createListElements(obj.jQuery, 'errornotfound', 'Error contact ECEInTheHole!', evolvePokemonName, this);
                        }

                    } else if (pokemonIsMelanistic == true) {
                        if (evolveNewMelaCheckTwo == 0 || evolveNewMelaCheckThree == 0 || evolveNewMelaCheckFour == 0 || evolveNewMelaCheckFive == 0 || evolveNewMelaCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                            createListElements(obj.jQuery, 'newmelanisticpokedexentry', 'New Melanistic Pokédex entry', evolvePokemonName, this);
                        } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                            if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                                createListElements(obj.jQuery, 'possiblemelanalolan', 'Possible new Melanistic Alolan entry', evolvePokemonName, this);
                            }
                        } else if (evolvePokemonName.indexOf('[') >= 0) {
                            if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"' + evolvePokemonNameOne + '"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                                createListElements(obj.jQuery, 'possiblemelandifferent', 'Possible new Melanistic forme/cloak entry', evolvePokemonName, this);
                            } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                                createListElements(obj.jQuery, 'newmelanisticpokedexentry', 'New Melanistic Pokédex entry', evolvePokemonName, this);
                            }
                        } else if (dexData.indexOf('"' + evolvePokemonNameOne + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameTwo + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameThree + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFour + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameFive + '"') == -1 && dexData.indexOf('"' + evolvePokemonNameSix + '"') == -1) {
                            createListElements(obj.jQuery, 'newmelanisticpokedexentry', 'New Melanistic Pokédex entry', evolvePokemonName, this);
                        } else {
                            createListElements(obj.jQuery, 'errornotfound', 'Error contact ECEInTheHole!', evolvePokemonName, this);
                        }
                    }
                }
            });

            obj.jQuery('.evolvepkmnlist').hide();

            //layout
            const typeBackground = obj.jQuery('.panel>h3').css('background-color');
            const typeBorder = obj.jQuery('.panel>h3').css('border');
            const typeColor = obj.jQuery('.panel>h3').css('color');
            obj.jQuery('.expandlist').css('background-color', '' + typeBackground + '');
            obj.jQuery('.expandlist').css('border', '' + typeBorder + '');
            obj.jQuery('.expandlist').css('color', '' + typeColor + '');

            const typeListBackground = obj.jQuery('.tabbed_interface>div').css('background-color');
            const typeListColor = obj.jQuery('.tabbed_interface>div').css('color');
            obj.jQuery('.qolChangeLogContent').css('background-color', '' + typeListBackground + '');
            obj.jQuery('.qolChangeLogContent').css('color', '' + typeListColor + '');
        }
        easyQuickEvolve() {
            if (this.jQuery('.canevolve:contains("evolved into")').parent().length != 0) {
                this.jQuery('.canevolve:contains("evolved into")').parent().remove();
            }
        }
    }

    // eslint-disable-next-line no-unused-vars
    class FishingPage extends Page {
        constructor(jQuery, localStorageMgr, helpers, GLOBALS) {
            super(jQuery, localStorageMgr, helpers, GLOBALS.FISHING_PAGE_SETTINGS_KEY, {}, 'fishing');
        // no observer
        }
        setupHTML(GLOBALS) {
        // fishing select all button on caught fishing
            document.querySelector('#caughtfishcontainer label').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.massReleaseSelectHTML);
        }
        setupHandlers() {
            const obj = this;
            obj.jQuery('#selectallfishcheckbox').on('click', function () {
                obj.jQuery('li[data-flavour]>label>input').prop('checked', this.checked);
            });

            obj.jQuery('#movefishselectanycheckbox').on('click', function () {
                obj.jQuery('li[data-flavour=Any]>label>input').prop('checked', this.checked);
            });

            obj.jQuery('#movefishselectsourcheckbox').on('click', function () {
                obj.jQuery('li[data-flavour=Sour]>label>input').prop('checked', this.checked);
            });

            obj.jQuery('#movefishselectspicycheckbox').on('click', function () {
                obj.jQuery('li[data-flavour=Spicy]>label>input').prop('checked', this.checked);
            });

            obj.jQuery('#movefishselectdrycheckbox').on('click', function () {
                obj.jQuery('li[data-flavour=Dry]>label>input').prop('checked', this.checked);
            });

            obj.jQuery('#movefishselectsweetcheckbox').on('click', function () {
                obj.jQuery('li[data-flavour=Sweet]>label>input').prop('checked', this.checked);
            });

            obj.jQuery('#movefishselectbittercheckbox').on('click', function () {
                obj.jQuery('li[data-flavour=Bitter]>label>input').prop('checked', this.checked);
            });
        }
    }

    // eslint-disable-next-line no-unused-vars
    class LabPageBase extends Page {
        constructor(jQuery, localStorageMgr, helpers, GLOBALS) {
            super(jQuery, localStorageMgr, helpers, GLOBALS.LAB_PAGE_SETTINGS_KEY, {
                findLabEgg: '', // same as findCustom in shelter
                customEgg: true,
                findLabType: '', // same as findType in shelter
                findTypeEgg: true,
            }, 'lab');
            this.searchArray = [];
            this.typeArray = [];
            this.globals = GLOBALS;
            const obj = this;
            this.observer = new MutationObserver(function (mutations) {
            // eslint-disable-next-line no-unused-vars
                mutations.forEach(function (mutation) {
                    obj.customSearch();
                });
            });
        }

        setupHTML(GLOBALS) {
            document.querySelector('#eggsbox360>p.center').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.labOptionsHTML);
            document.querySelector('#egglist').insertAdjacentHTML('afterend', '<div id="labsuccess"></div>');

            const theField = this.helpers.textSearchDiv('numberDiv', 'findLabEgg', 'removeLabSearch', 'searchArray');
            const theType = this.helpers.selectSearchDiv('typeNumber', 'types', 'findLabType', GLOBALS.TYPE_OPTIONS,
                'removeLabTypeList', 'labTypes', 'typeArray');

            this.searchArray = this.settings.findLabEgg.split(',');
            this.typeArray = this.settings.findLabType.split(',');

            this.helpers.setupFieldArrayHTML(this.jQuery, this.searchArray, 'searchkeys', theField, 'numberDiv');
            this.helpers.setupFieldArrayHTML(this.jQuery, this.typeArray, 'labTypes', theType, 'typeNumber');
        }
        setupCSS() {
        //lab css
            const labSuccessCss = this.jQuery('#labpage>div').css('background-color');
            this.jQuery('#labsuccess').css('background-color', labSuccessCss);
        }
        setupObserver() {
            this.observer.observe(document.querySelector('#labpage>div>div>div'), {
                childList: true,
                characterdata: true,
                subtree: true,
                characterDataOldValue: true,
            });
        }
        setupHandlers(GLOBALS) {
            const obj = this;
            obj.jQuery(document).on('click', '#addLabSearch', (function () { //add lab text field
                obj.addTextField();
            }));

            obj.jQuery(document).on('click', '#removeLabSearch', (function () { //remove lab text field
                obj.removeTextField(this, obj.jQuery(this).parent().find('input').val());
                obj.saveSettings();
            }));

            obj.jQuery(document).on('click', '#addLabTypeList', (function () { //add lab type list
                obj.addTypeList(GLOBALS);
            }));

            obj.jQuery(document).on('click', '#removeLabTypeList', (function () { //remove lab type list
                obj.removeTypeList(this, obj.jQuery(this).parent().find('select').val());
                obj.saveSettings();
            }));

            obj.jQuery(document).on('change', '#labCustomSearch input', (function () { //lab search
                obj.customSearch(GLOBALS);
            }));

            obj.jQuery(document).on('click', '#labpage', (function () { //shelter search
                obj.customSearch(GLOBALS);
            }));

            obj.jQuery(document).on('input', '.qolsetting', (function () { //Changes QoL settings
                obj.settingsChange(this.getAttribute('data-key'),
                    obj.jQuery(this).val(),
                    obj.jQuery(this).parent().parent().attr('class'),
                    obj.jQuery(this).parent().attr('class'),
                    (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
                obj.customSearch(GLOBALS);
                obj.saveSettings();
            }));

            obj.jQuery(window).on('load', (function () {
                obj.loadSettings();
                obj.customSearch(GLOBALS);
            }));
        }
        addTextField() {
            const theField = this.helpers.textSearchDiv('numberDiv', 'findLabEgg', 'removeLabSearch', 'searchArray');
            const numberDiv = this.jQuery('#searchkeys>div').length;
            this.jQuery('#searchkeys').append(theField);
            this.jQuery('.numberDiv').removeClass('numberDiv').addClass('' + numberDiv + '');
        }
        removeTextField(byebye, key) {
        // when textfield is removed, the value will be deleted from the localstorage
            this.searchArray = this.jQuery.grep(this.searchArray, function (value) {
                return value != key;
            });
            this.settings.findCustom = this.searchArray.toString();

            this.jQuery(byebye).parent().remove();

            for (let i = 0; i < this.jQuery('#searchkeys>div').length; i++) {
                const rightDiv = i + 1;
                this.jQuery('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
            }
        }
        addTypeList(GLOBALS) {
            const theType = this.helpers.selectSearchDiv('typeNumber', 'types', 'findLabType', GLOBALS.TYPE_OPTIONS,
                'removeLabTypeList', 'labTypes', 'typeArray');
            const numberTypes = this.jQuery('#labTypes>div').length;
            this.jQuery('#labTypes').append(theType);
            this.jQuery('.typeNumber').removeClass('typeNumber').addClass('' + numberTypes + '');
        }
        removeTypeList(byebye, key) {
            this.typeArray = this.jQuery.grep(this.typeArray, function (value) {
                return value != key;
            });
            this.settings.findType = this.typeArray.toString();

            this.jQuery(byebye).parent().remove();

            for (let i = 0; i < this.jQuery('#labTypes>div').length; i++) {
                const rightDiv = i + 1;
                this.jQuery('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
            }
        }
        getTypesForEgg(searchPokemon) {
            const data = this.globals.DEX_DATA;
            const searchPokemonIndex = data.indexOf('"' + searchPokemon + '"');
            return [data[searchPokemonIndex + 1], data[searchPokemonIndex + 2]];
        }
        searchForEggsMatchingTypes() {
            const GLOBALS = this.globals;
            const jQuery = this.jQuery;
            const obj = this;
            const enabled = ((this.settings.findTypeEgg === true) &&
            (!(this.typeArray.length == 1 && this.typeArray[0] == '')));
            if (enabled) {
                const typesArrayNoEmptySpace = this.typeArray.filter(v => v != '');
                for (let i = 0; i < typesArrayNoEmptySpace.length; i++) {
                    const value = typesArrayNoEmptySpace[i];
                    const amountOfTypesFound = [];
                    const typePokemonNames = [];

                    jQuery('#egglist>div>h3').each(function () {
                        const searchPokemon = jQuery(this).text().split(' ')[0];
                        const [searchTypeOne, searchTypeTwo] = obj.getTypesForEgg(searchPokemon);
                        if (searchTypeOne === value) {
                            amountOfTypesFound.push('found');
                            typePokemonNames.push(searchPokemon);
                        }

                        if (searchTypeTwo === value) {
                            amountOfTypesFound.push('found');
                            typePokemonNames.push(searchPokemon);
                        }
                    }); // each

                    const foundType = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(value) + 2];

                    const typeImgStandOutLength = typePokemonNames.length;
                    for (let o = 0; o < typeImgStandOutLength; o++) {
                        const value = typePokemonNames[o];
                        const shelterImgSearch = this.jQuery('#egglist>div>h3:containsIN(' + value + ')');
                        const shelterBigImg = shelterImgSearch.next();
                        jQuery(shelterBigImg).addClass('labfoundme');
                    }

                    if (amountOfTypesFound.length > 1) {
                        document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + amountOfTypesFound.length + ' ' + foundType + ' egg types found! (' + typePokemonNames.toString() + ')</div>');
                    } else if (amountOfTypesFound.length == 1) {
                        document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + amountOfTypesFound.length + ' ' + foundType + ' egg type found! (' + typePokemonNames.toString() + ')</div>');
                    }
                } // for
            } // if
        }
        searchForEggsMatchingCustom() {
            const jQuery = this.jQuery;
            if (!(this.searchArray.length == 1 && this.searchArray[0] == '')) {
                if (this.settings.customEgg === true) {
                    const searchArrayNoEmptySpace = this.searchArray.filter(v => v != '');
                    for (let i = 0; i < searchArrayNoEmptySpace.length; i++) {
                        const value = searchArrayNoEmptySpace[i];
                        if (jQuery('#egglist>div>h3:containsIN(' + value + ')').length) {
                            const searchResult = value;

                            const shelterImgSearch = jQuery('#egglist>div>h3:containsIN(' + value + ')');
                            const shelterBigImg = shelterImgSearch.next();
                            jQuery(shelterBigImg).addClass('labfoundme');

                            if (jQuery('#egglist>div>h3:containsIN(' + value + ')').length > 1) {
                                document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                            } else {
                                document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                            }
                        } // if

                        if (jQuery('#egglist>div img[src*="' + value + '"]').length) {
                            const searchResult = jQuery('#egglist>div img[src*="' + value + '"]').prev().text();

                            const shelterImgSearch = jQuery('#egglist>div img[src*="' + value + '"]');
                            jQuery(shelterImgSearch).addClass('labfoundme');

                            if (jQuery('#egglist>div img[src*="' + value + '"]').length > 1) {
                                document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                            } else {
                                document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                            }
                        } // if
                    } // for
                } // if
            } // else
        }
        customSearch() {
            document.querySelector('#labsuccess').innerHTML = '';
            this.jQuery('#egglist>div>img').removeClass('labfoundme');

            this.searchForEggsMatchingTypes();
            this.searchForEggsMatchingCustom();
        }
    }

    // eslint-disable-next-line no-unused-vars
    class MultiuserPage extends Page {
        constructor(jQuery, localStorageMgr, helpers, GLOBALS) {
            super(jQuery, localStorageMgr, helpers, GLOBALS.MULTIUSER_PAGE_SETTINGS_KEY, {
                hideDislike: false,
                hideAll: false,
                niceTable: false,
            }, 'users/');
            const obj = this;
            this.observer = new MutationObserver(function (mutations) {
            // eslint-disable-next-line no-unused-vars
                mutations.forEach(function (mutation) {
                    obj.partyModification();
                });
            });
        }

        settingsChange(element, textElement, customClass, typeClass, arrayName) {
            if (super.settingsChange(element, textElement, customClass, typeClass, arrayName) === false) {
                return false;
            }

            const mutuallyExclusive = ['hideAll', 'hideDislike', 'niceTable'];
            const idx = mutuallyExclusive.indexOf(element);
            if (idx > -1) {
                for (let i = 0; i < mutuallyExclusive.length; i++) {
                    if (i !== idx) {
                        this.settings[mutuallyExclusive[i]] = false;
                    }
                }
                return true;
            }
            else { return false; }
        }
        setupHTML(GLOBALS) {
            document.querySelector('#multiuser').insertAdjacentHTML('beforebegin', GLOBALS.TEMPLATES.partyModHTML);
        }
        setupCSS() {
            const menuBackground = this.jQuery('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('background-color');
            this.jQuery('#qolpartymod').css('background-color', '' + menuBackground + '');
            const menuColor = this.jQuery('#navigation>#navbtns>li>a, #navigation #navbookmark>li>a').css('color');
            this.jQuery('#qolpartymod').css('color', '' + menuColor + '');
        }
        setupObserver() {
            this.observer.observe(document.querySelector('#multiuser'), {
                childList: true,
                subtree: true,
            });
        }
        setupHandlers() {
            const obj = this;
            obj.jQuery(window).on('load', (function () {
                obj.loadSettings();
                obj.partyModification();
            }));

            obj.jQuery(document).on('click input', '#qolpartymod', (function () {
                obj.partyModification();
            }));

            obj.jQuery(document).on('click', '.tabbed_interface', (function () {
                obj.partyModification();
            }));

            obj.jQuery(document).on('change', '.qolsetting', (function () {
                obj.loadSettings();
                obj.settingsChange(this.getAttribute('data-key'),
                    obj.jQuery(this).val(),
                    obj.jQuery(this).parent().parent().attr('class'),
                    obj.jQuery(this).parent().attr('class'));
                obj.partyModification();
                obj.saveSettings();
            }));

            obj.jQuery('input.qolalone').on('change', function () { //only 1 textbox may be true
                obj.jQuery('input.qolalone').not(this).prop('checked', false);
            });
        }
        partyModification() {
            if (this.settings.hideDislike === false && this.settings.hideAll === false && this.settings.niceTable === false) {
                this.jQuery('#trainerimage').removeClass('qolpartyclickhide');
                this.jQuery('#profilebox').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .pkmn').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .name').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .expbar').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .taste').removeClass('qolpartyclickhide');
                this.jQuery('#partybox .party>div>.action.working').removeClass('qolpartyclickhide');
                this.jQuery('.party>div>.action>.berrybuttons:not([data-up=\'sour\'])>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons:not([data-up=\'spicy\'])>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons:not([data-up=\'dry\'])>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons:not([data-up=\'sweet\'])>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons:not([data-up=\'bitter\'])>[data-berry=\'rawst\']').removeClass('qolpartyclickhide');
                this.jQuery('.party>div>.action>.berrybuttons[data-up=\'sour\']>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons[data-up=\'spicy\']>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons[data-up=\'dry\']>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons[data-up=\'sweet\']>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons[data-up=\'bitter\']>[data-berry=\'rawst\']').removeClass('qolpartyclickwidth');
                this.jQuery('.party>div>.action>.berrybuttons[data-up=\'any\']>[data-berry]').removeClass('qolpartyclickblock');
                this.jQuery('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .party>div').removeClass('qolpartyclickbigscreen');
                this.jQuery('#multiuser .party>div').removeClass('qolpartyclicksmallscreen');
                this.jQuery('#multiuser .party>div').removeClass('qolpartyclickalot');
                this.jQuery('#multiuser .party>div>.action a[data-berry]').removeClass('qolpartyclickz');
                this.jQuery('.mu_navlink.next').removeClass('qolpartyclickbigscreen');
                this.jQuery('.mu_navlink.next').removeClass('qolpartyclicksmallscreen');
                this.jQuery('.mu_navlink.next').removeClass('qolpartyclicknav');
                this.jQuery('#multiuser .party').removeClass('qolpartyclickpartywidth');
                this.jQuery('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
                this.jQuery('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
                this.jQuery('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
                this.jQuery('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
                this.jQuery('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
                this.jQuery('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
                this.jQuery('#multiuser.tabbed_interface.horizontal>ul').removeClass('qolpartyclickul');
                this.jQuery('#multiuser.tabbed_interface>ul>li>label').removeClass('qolpartyclicklilabel');
                this.jQuery('#multiuser .pkmn').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .name').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .expbar').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .taste').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .party').removeClass('qolpartyclickpartywidth');
                this.jQuery('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
                this.jQuery('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
                this.jQuery('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
                this.jQuery('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
                this.jQuery('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
                this.jQuery('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
                this.jQuery('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');
                this.jQuery('.party>div>.action>.berrybuttons').removeClass('qolpartyclicktextalign');
            }

            if (this.settings.hideDislike === true) {
                this.jQuery('#trainerimage').removeClass('qolpartyclickhide');
                this.jQuery('#profilebox').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .pkmn').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .name').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .expbar').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .taste').removeClass('qolpartyclickhide');
                this.jQuery('#partybox .party>div>.action.working').removeClass('qolpartyclickhide');
                this.jQuery('.party>div>.action>.berrybuttons:not([data-up=\'sour\'])>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons:not([data-up=\'spicy\'])>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons:not([data-up=\'dry\'])>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons:not([data-up=\'sweet\'])>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons:not([data-up=\'bitter\'])>[data-berry=\'rawst\']').removeClass('qolpartyclickhide');
                this.jQuery('.party>div>.action>.berrybuttons[data-up=\'sour\']>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons[data-up=\'spicy\']>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons[data-up=\'dry\']>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons[data-up=\'sweet\']>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons[data-up=\'bitter\']>[data-berry=\'rawst\']').removeClass('qolpartyclickwidth');
                this.jQuery('.party>div>.action>.berrybuttons[data-up=\'any\']>[data-berry]').removeClass('qolpartyclickblock');
                this.jQuery('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .party>div').removeClass('qolpartyclickbigscreen');
                this.jQuery('#multiuser .party>div').removeClass('qolpartyclicksmallscreen');
                this.jQuery('#multiuser .party>div').removeClass('qolpartyclickalot');
                this.jQuery('#multiuser .party>div>.action a[data-berry]').removeClass('qolpartyclickz');
                this.jQuery('.mu_navlink.next').removeClass('qolpartyclickbigscreen');
                this.jQuery('.mu_navlink.next').removeClass('qolpartyclicksmallscreen');
                this.jQuery('.mu_navlink.next').removeClass('qolpartyclicknav');
                this.jQuery('#multiuser .party').removeClass('qolpartyclickpartywidth');
                this.jQuery('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
                this.jQuery('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
                this.jQuery('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
                this.jQuery('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
                this.jQuery('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
                this.jQuery('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
                this.jQuery('#multiuser.tabbed_interface.horizontal>ul').removeClass('qolpartyclickul');
                this.jQuery('#multiuser.tabbed_interface>ul>li>label').removeClass('qolpartyclicklilabel');
                this.jQuery('#multiuser .pkmn').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .name').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .expbar').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .taste').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .party').removeClass('qolpartyclickpartywidth');
                this.jQuery('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
                this.jQuery('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
                this.jQuery('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
                this.jQuery('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
                this.jQuery('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
                this.jQuery('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
                this.jQuery('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');
                this.jQuery('.party>div>.action>.berrybuttons').addClass('qolpartyclicktextalign');
                this.jQuery('.party>div>.action>.berrybuttons:not([data-up=\'sour\'])>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons:not([data-up=\'spicy\'])>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons:not([data-up=\'dry\'])>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons:not([data-up=\'sweet\'])>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons:not([data-up=\'bitter\'])>[data-berry=\'rawst\']').addClass('qolpartyclickhide');
                this.jQuery('.party>div>.action>.berrybuttons[data-up=\'sour\']>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons[data-up=\'spicy\']>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons[data-up=\'dry\']>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons[data-up=\'sweet\']>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons[data-up=\'bitter\']>[data-berry=\'rawst\']').addClass('qolpartyclickwidth');
                this.jQuery('.party>div>.action>.berrybuttons[data-up=\'any\']>[data-berry]').addClass('qolpartyclickblock');
            }

            if (this.settings.niceTable === true) {
                this.jQuery('#trainerimage').removeClass('qolpartyclickhide');
                this.jQuery('#profilebox').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .pkmn').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .name').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .expbar').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .taste').removeClass('qolpartyclickhide');
                this.jQuery('#partybox .party>div>.action.working').removeClass('qolpartyclickhide');
                this.jQuery('.party>div>.action>.berrybuttons:not([data-up=\'sour\'])>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons:not([data-up=\'spicy\'])>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons:not([data-up=\'dry\'])>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons:not([data-up=\'sweet\'])>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons:not([data-up=\'bitter\'])>[data-berry=\'rawst\']').removeClass('qolpartyclickhide');
                this.jQuery('.party>div>.action>.berrybuttons[data-up=\'sour\']>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons[data-up=\'spicy\']>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons[data-up=\'dry\']>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons[data-up=\'sweet\']>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons[data-up=\'bitter\']>[data-berry=\'rawst\']').removeClass('qolpartyclickwidth');
                this.jQuery('.party>div>.action>.berrybuttons[data-up=\'any\']>[data-berry]').removeClass('qolpartyclickblock');
                this.jQuery('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .party>div').removeClass('qolpartyclickbigscreen');
                this.jQuery('#multiuser .party>div').removeClass('qolpartyclicksmallscreen');
                this.jQuery('#multiuser .party>div').removeClass('qolpartyclickalot');
                this.jQuery('#multiuser .party>div>.action a[data-berry]').removeClass('qolpartyclickz');
                this.jQuery('.mu_navlink.next').removeClass('qolpartyclickbigscreen');
                this.jQuery('.mu_navlink.next').removeClass('qolpartyclicksmallscreen');
                this.jQuery('.mu_navlink.next').removeClass('qolpartyclicknav');
                this.jQuery('#multiuser .party').removeClass('qolpartyclickpartywidth');
                this.jQuery('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
                this.jQuery('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
                this.jQuery('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
                this.jQuery('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
                this.jQuery('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
                this.jQuery('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
                this.jQuery('#multiuser.tabbed_interface.horizontal>ul').removeClass('qolpartyclickul');
                this.jQuery('#multiuser.tabbed_interface>ul>li>label').removeClass('qolpartyclicklilabel');
                this.jQuery('.party>div>.action>.berrybuttons').removeClass('qolpartyclicktextalign');
                this.jQuery('#multiuser .pkmn').addClass('qolpartyclickhide');
                this.jQuery('#multiuser .name').addClass('qolpartyclickhide');
                this.jQuery('#multiuser .expbar').addClass('qolpartyclickhide');
                this.jQuery('#multiuser .taste').addClass('qolpartyclickhide');
                this.jQuery('#multiuser .party').addClass('qolpartyclickpartywidth');
                this.jQuery('#multiuser .party>div').addClass('qolpartyclickpartydivwidth');
                this.jQuery('#multiuser .party>div:nth-child(1)').addClass('qolpartyclickborderone');
                this.jQuery('#multiuser .party>div:nth-child(2)').addClass('qolpartyclickbordertwo');
                this.jQuery('#multiuser .party>div:nth-child(5)').addClass('qolpartyclickborderthree');
                this.jQuery('#multiuser .party>div:nth-child(6)').addClass('qolpartyclickborderfour');
                this.jQuery('#multiuser .party>div:nth-child(2n+1)').addClass('qolpartyclickborderfive');
                this.jQuery('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').addClass('qolpartyclickhide');
                this.jQuery('.party>div>.action>.berrybuttons').addClass('qolpartyclicktextalign');
                this.jQuery('.party>div>.action>.berrybuttons:not([data-up=\'sour\'])>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons:not([data-up=\'spicy\'])>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons:not([data-up=\'dry\'])>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons:not([data-up=\'sweet\'])>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons:not([data-up=\'bitter\'])>[data-berry=\'rawst\']').addClass('qolpartyclickhide');
                this.jQuery('.party>div>.action>.berrybuttons[data-up=\'sour\']>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons[data-up=\'spicy\']>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons[data-up=\'dry\']>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons[data-up=\'sweet\']>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons[data-up=\'bitter\']>[data-berry=\'rawst\']').addClass('qolpartyclickwidth');
                this.jQuery('.party>div>.action>.berrybuttons[data-up=\'any\']>[data-berry]').addClass('qolpartyclickblock');
            }


            if (this.settings.hideAll === true) {
                this.jQuery('.party>div>.action>.berrybuttons').removeClass('qolpartyclicktextalign');
                this.jQuery('.party>div>.action>.berrybuttons:not([data-up=\'sour\'])>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons:not([data-up=\'spicy\'])>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons:not([data-up=\'dry\'])>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons:not([data-up=\'sweet\'])>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons:not([data-up=\'bitter\'])>[data-berry=\'rawst\']').removeClass('qolpartyclickhide');
                this.jQuery('.party>div>.action>.berrybuttons[data-up=\'sour\']>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons[data-up=\'spicy\']>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons[data-up=\'dry\']>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons[data-up=\'sweet\']>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons[data-up=\'bitter\']>[data-berry=\'rawst\']').removeClass('qolpartyclickwidth');
                this.jQuery('.party>div>.action>.berrybuttons[data-up=\'any\']>[data-berry]').removeClass('qolpartyclickblock');
                this.jQuery('#multiuser .pkmn').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .name').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .expbar').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .taste').removeClass('qolpartyclickhide');
                this.jQuery('#multiuser .party').removeClass('qolpartyclickpartywidth');
                this.jQuery('#multiuser .party>div').removeClass('qolpartyclickpartydivwidth');
                this.jQuery('#multiuser .party>div:nth-child(1)').removeClass('qolpartyclickborderone');
                this.jQuery('#multiuser .party>div:nth-child(2)').removeClass('qolpartyclickbordertwo');
                this.jQuery('#multiuser .party>div:nth-child(5)').removeClass('qolpartyclickborderthree');
                this.jQuery('#multiuser .party>div:nth-child(6)').removeClass('qolpartyclickborderfour');
                this.jQuery('#multiuser .party>div:nth-child(2n+1)').removeClass('qolpartyclickborderfive');
                this.jQuery('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').removeClass('qolpartyclickhide');
                this.jQuery('#trainerimage').addClass('qolpartyclickhide');
                this.jQuery('#profilebox').addClass('qolpartyclickhide');
                this.jQuery('#multiuser .pkmn').addClass('qolpartyclickhide');
                this.jQuery('#multiuser .name').addClass('qolpartyclickhide');
                this.jQuery('#multiuser .expbar').addClass('qolpartyclickhide');
                this.jQuery('#multiuser .taste').addClass('qolpartyclickhide');
                this.jQuery('#partybox .party>div>.action.working').addClass('qolpartyclickhide');
                this.jQuery('.party>div>.action>.berrybuttons:not([data-up=\'sour\'])>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons:not([data-up=\'spicy\'])>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons:not([data-up=\'dry\'])>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons:not([data-up=\'sweet\'])>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons:not([data-up=\'bitter\'])>[data-berry=\'rawst\']').addClass('qolpartyclickhide');
                this.jQuery('.party>div>.action>.berrybuttons[data-up=\'sour\']>[data-berry=\'aspear\'], .party>div>.action>.berrybuttons[data-up=\'spicy\']>[data-berry=\'cheri\'], .party>div>.action>.berrybuttons[data-up=\'dry\']>[data-berry=\'chesto\'], .party>div>.action>.berrybuttons[data-up=\'sweet\']>[data-berry=\'pecha\'], .party>div>.action>.berrybuttons[data-up=\'bitter\']>[data-berry=\'rawst\']').addClass('qolpartyclickwidth');
                this.jQuery('.party>div>.action>.berrybuttons[data-up=\'any\']>[data-berry]').addClass('qolpartyclickblock');
                this.jQuery('#multiuser .party>div>.action>.berrybuttons>.tooltip_content').addClass('qolpartyclickhide');

                // desktop
                if(window.innerWidth > 650) {
                    this.jQuery('#multiuser .party>div').addClass('qolpartyclickbigscreen');
                }
                // mobile
                else {
                    this.jQuery('#multiuser .party>div').addClass('qolpartyclicksmallscreen');
                }
                this.jQuery('#multiuser .party>div').addClass('qolpartyclickalot');
                this.jQuery('#multiuser .party>div>.action a[data-berry]').addClass('qolpartyclickz');

                // desktop
                if(window.innerWidth > 650) {
                    this.jQuery('.mu_navlink.next').addClass('qolpartyclickbigscreen');
                }
                // mobile
                else {
                    this.jQuery('.mu_navlink.next').addClass('qolpartyclicksmallscreen');
                }
                this.jQuery('.mu_navlink.next').addClass('qolpartyclicknav');

                this.jQuery('#multiuser .party').addClass('qolpartyclickpartywidth');
                this.jQuery('#multiuser .party>div').addClass('qolpartyclickpartydivwidth');
                this.jQuery('#multiuser .party>div:nth-child(1)').addClass('qolpartyclickborderone');
                this.jQuery('#multiuser .party>div:nth-child(2)').addClass('qolpartyclickbordertwo');
                this.jQuery('#multiuser .party>div:nth-child(5)').addClass('qolpartyclickborderthree');
                this.jQuery('#multiuser .party>div:nth-child(6)').addClass('qolpartyclickborderfour');
                this.jQuery('#multiuser .party>div:nth-child(2n+1)').addClass('qolpartyclickborderfive');
                this.jQuery('#multiuser.tabbed_interface.horizontal>ul').addClass('qolpartyclickul');
                this.jQuery('#multiuser.tabbed_interface>ul>li>label').addClass('qolpartyclicklilabel');
            }
        }
    }


    // eslint-disable-next-line no-unused-vars
    class PrivateFieldsPageBase extends Page {
        constructor(jQuery, localStorageMgr, helpers, GLOBALS, settings) {
            super(jQuery, localStorageMgr, helpers, GLOBALS.PRIVATE_FIELDS_PAGE_SETTINGS_KEY, {
                fieldCustom: '',
                fieldType: '',
                fieldNature: '',
                fieldEggGroup: '',
                fieldNewPokemon: true,
                fieldShiny: true,
                fieldAlbino: true,
                fieldMelanistic: true,
                fieldPrehistoric: true,
                fieldDelta: true,
                fieldMega: true,
                fieldStarter: true,
                fieldCustomSprite: true,
                fieldMale: true,
                fieldFemale: true,
                fieldNoGender: true,
                fieldItem: true,
                customItem: true, // unused
                customEgg: true,
                customPokemon: true,
                customPng: false,
                releaseSelectAll: true,
                /* tooltip settings */
                tooltipEnableMods: false,
                tooltipNoBerry: false,
                tooltipBerry: false,
            }, 'fields', settings);
            this.customArray = [];
            this.typeArray = [];
            this.natureArray = [];
            this.eggGroupArray = [];
            const obj = this;
            this.observer = new MutationObserver((mutations) => {
            // eslint-disable-next-line no-unused-vars
                mutations.forEach((mutation) => {
                    obj.customSearch(GLOBALS);
                    if(obj.globalSettings.privateFieldFeatureEnables.tooltip) {
                        obj.handleTooltipSettings();
                    }
                });
            });
        }

        onPage(w) {
            return w.location.href.indexOf('fields') != -1 &&
            w.location.href.indexOf('fields/') == -1;
        }

        setupHTML(GLOBALS) {
            if(this.globalSettings.privateFieldFeatureEnables.search) {
                document.querySelector('#field_field').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.privateFieldSearchHTML);
                const theField = this.helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray');
                const theType = this.helpers.selectSearchDiv('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS,
                    'removePrivateFieldTypeSearch', 'fieldTypes', 'typeArray');
                const theNature = this.helpers.selectSearchDiv('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS,
                    'removePrivateFieldNature', 'natureTypes', 'natureArray');
                const theEggGroup = this.helpers.selectSearchDiv('eggGroupNumber', 'eggGroups', 'fieldEggGroup', GLOBALS.EGG_GROUP_OPTIONS,
                    'removePrivateFieldEggGroup', 'eggGroupTypes', 'eggGroupArray');
                this.customArray = this.settings.fieldCustom.split(',');
                this.typeArray = this.settings.fieldType.split(',');
                this.natureArray = this.settings.fieldNature.split(',');
                this.eggGroupArray = this.settings.fieldEggGroup.split(',');
                this.helpers.setupFieldArrayHTML(this.jQuery, this.customArray, 'searchkeys', theField, 'numberDiv');
                this.helpers.setupFieldArrayHTML(this.jQuery, this.typeArray, 'fieldTypes', theType, 'typeNumber');
                this.helpers.setupFieldArrayHTML(this.jQuery, this.natureArray, 'natureTypes', theNature, 'natureNumber');
                this.helpers.setupFieldArrayHTML(this.jQuery, this.eggGroupArray, 'eggGroupTypes', theEggGroup, 'eggGroupNumber');
            }

            if(this.globalSettings.privateFieldFeatureEnables.release) {
            /* nothing here */
            }

            if(this.globalSettings.privateFieldFeatureEnables.tooltip) {
                document.querySelector('#field_field').insertAdjacentHTML('beforebegin', GLOBALS.TEMPLATES.privateFieldTooltipModHTML);
                this.handleTooltipSettings();
            }
        }
        setupCSS() {
        // same as public fields
            const fieldOrderCssColor = this.jQuery('#field_field').css('background-color');
            const fieldOrderCssBorder = this.jQuery('#field_field').css('border');
            this.jQuery('#fieldorder').css('background-color', '' + fieldOrderCssColor + '');
            this.jQuery('#fieldorder').css('border', '' + fieldOrderCssBorder + '');
            this.jQuery('#fieldsearch').css('background-color', '' + fieldOrderCssColor + '');
            this.jQuery('#tooltipenable').css('max-width', '600px');
            this.jQuery('#tooltipenable').css('position', 'relative');
            this.jQuery('#tooltipenable').css('margin', '16px auto');
            this.jQuery('.collapsible').css('background-color', '' + fieldOrderCssColor + '');
            this.jQuery('.collapsible').css('border', '' + fieldOrderCssBorder + '');
            this.jQuery('.collapsible_content').css('background-color', '' + fieldOrderCssColor + '');

            this.jQuery('.tooltiptext').css('background-color', this.jQuery('.tooltip_content').eq(0).css('background-color'));
            this.jQuery('.tooltiptext').css('border', '' + fieldOrderCssBorder + '');

            /*
             * Issue #47 - Since the default Pokefarm CSS for buttons does not use the same color
             * settings as most of the text on the site, manually set the text color for
             * '.collapsible' to match the text around it
             */
            this.jQuery('.collapsible').css('color', this.jQuery('#content').find('h1').eq(0).css('color'));
        }
        setupObserver() {
            this.observer.observe(document.querySelector('#field_field'), {
                childList: true,
                characterdata: true,
                subtree: true,
                characterDataOldValue: true,
            });
        }
        setupHandlers(GLOBALS) {
            const obj = this;
            this.jQuery(window).on('load', (() => {
                obj.loadSettings();
                obj.customSearch(GLOBALS);
                if(obj.globalSettings.privateFieldFeatureEnables.tooltip) {
                    obj.handleTooltipSettings();
                }
                obj.saveSettings();
            }));

            this.jQuery(document).on('load', '.field', (function () {
                obj.customSearch(GLOBALS);
            }));

            if(obj.globalSettings.privateFieldFeatureEnables.release) {
                this.jQuery(document).on('click', '*[data-menu="release"]', (function (e) { //select all feature
                    e.stopPropagation();
                    obj.releaseEnableReleaseAll();
                }));
                this.jQuery(document).on('click', '*[data-menu="bulkmove"]', (function () { // select all feature
                    obj.moveEnableReleaseAll();
                }));
            }

            if(obj.globalSettings.privateFieldFeatureEnables.search) {
                this.jQuery(document).on('click', '#addPrivateFieldTypeSearch', (function (e) { //add field type list
                    e.stopPropagation();
                    obj.addSelectSearch('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS, 'removePrivateFieldTypeSearch', 'fieldTypes', 'typeArray');
                    obj.customSearch(GLOBALS);
                }));

                this.jQuery(document).on('click', '#removePrivateFieldTypeSearch', (function (e) { //remove field type list
                    e.stopPropagation();
                    obj.typeArray = obj.removeSelectSearch(obj.typeArray, this, obj.jQuery(this).parent().find('select').val(), 'fieldType', 'fieldTypes');
                    obj.saveSettings();
                    obj.customSearch(GLOBALS);
                }));

                this.jQuery(document).on('click', '#addPrivateFieldNatureSearch', (function (e) { //add field nature search
                    e.stopPropagation();
                    obj.addSelectSearch('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS, 'removePrivateFieldNature', 'natureTypes', 'natureArray');
                    obj.customSearch(GLOBALS);
                }));

                this.jQuery(document).on('click', '#removePrivateFieldNature', (function (e) { //remove field nature search
                    e.stopPropagation();
                    obj.natureArray = obj.removeSelectSearch(obj.natureArray, this, obj.jQuery(this).parent().find('select').val(), 'fieldNature', 'natureTypes');
                    obj.saveSettings();
                    obj.customSearch(GLOBALS);
                }));

                this.jQuery(document).on('click', '#addPrivateFieldEggGroupSearch', (function (e) { //add egg group nature search
                    e.stopPropagation();
                    obj.addSelectSearch('eggGroupNumber', 'eggGroups', 'fieldEggGroup', GLOBALS.EGG_GROUP_OPTIONS, 'removePrivateFieldEggGroup', 'eggGroupTypes', 'eggGroupArray');
                    obj.customSearch(GLOBALS);
                }));

                this.jQuery(document).on('click', '#removePrivateFieldEggGroup', (function (e) { //remove egg group nature search
                    e.stopPropagation();
                    obj.eggGroupArray = obj.removeSelectSearch(obj.eggGroupArray, this, obj.jQuery(this).parent().find('select').val(), 'fieldEggGroup', 'eggGroupTypes');
                    obj.saveSettings();
                    obj.customSearch(GLOBALS);
                }));

                this.jQuery(document).on('click', '#addTextField', (function (e) {
                    e.stopPropagation();
                    obj.addTextField();
                    obj.saveSettings();
                }));

                this.jQuery(document).on('click', '#removeTextField', (function (e) {
                    e.stopPropagation();
                    obj.removeTextField(this, obj.jQuery(this).parent().find('input').val());
                    obj.saveSettings();
                    obj.customSearch(GLOBALS);
                }));
            }

            if(obj.globalSettings.privateFieldFeatureEnables.tooltip) {
                this.jQuery('.tooltipsetting[data-key=tooltipEnableMods]').on('click', function () {
                    obj.loadSettings();
                    obj.handleTooltipSettings();
                    obj.saveSettings();
                });

                this.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').on('click', function () {
                    obj.loadSettings();
                    obj.handleTooltipSettings();
                    obj.saveSettings();
                });
            }

            this.jQuery(document).on('change', '.qolsetting', (function () {
                obj.loadSettings();
                obj.customSearch(GLOBALS);
                obj.saveSettings();
            }));

            this.jQuery(document).on('input', '.qolsetting', (function () { //Changes QoL settings
                obj.settingsChange(this.getAttribute('data-key'),
                    obj.jQuery(this).val(),
                    obj.jQuery(this).parent().parent().attr('class'),
                    obj.jQuery(this).parent().attr('class'),
                    (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
                obj.customSearch(GLOBALS);
                obj.saveSettings();
            }));

            this.jQuery('.collapsible').on('click', function () {
                this.classList.toggle('active');
                const content = this.nextElementSibling;
                if (content.style.display === 'block') {
                    content.style.display = 'none';
                } else {
                    content.style.display = 'block';
                }
            });
        }
        handleTooltipSettings() {
            const obj = this;
            if (obj.jQuery('.tooltipsetting[data-key=tooltipEnableMods]').prop('checked')) {
            // make sure checkboxes are enabled
                obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').prop('disabled', false);

                // use the correct setting to turn on the tooltips based on the berries
                if (obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').prop('checked')) { obj.disableTooltips(); }
                else { obj.enableTooltips(); }
            } else {
                obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').prop('disabled', true);
                // if tooltipNoBerry was checked before the mods were disabled, reenable the tooltips
                if (obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').prop('checked')) {
                    obj.enableTooltips();
                }
            }
        }
        disableTooltips() {
            this.jQuery('#field_field>div.field>.fieldmon').removeAttr('data-tooltip').removeClass('tooltip_trigger');
        }
        enableTooltips() {
            this.jQuery('#field_field>div.field>.fieldmon').attr('data-tooltip', '');
        }
        searchForImgTitle(GLOBALS, key) {
            const SEARCH_DATA = GLOBALS.SHELTER_SEARCH_DATA;
            const keyIndex = SEARCH_DATA.indexOf(key);
            const value = SEARCH_DATA[keyIndex + 1];
            const selected = this.jQuery('img[title*="' + value + '"]');
            const cls = this.helpers.getPokemonImageClass();
            if (selected.length) {
            // next line different from shelter
                const bigImg = selected.parent().parent().parent().parent().prev().children(`img.${cls}`);
                this.jQuery(bigImg).addClass('privatefoundme');
            }
        }
        searchForCustomPokemon(value, male, female, nogender) {
            const genderMatches = [];
            if (male) { genderMatches.push('[M]'); }
            if (female) { genderMatches.push('[F]'); }
            if (nogender) { genderMatches.push('[N]'); }
            const cls = this.helpers.getPokemonImageClass();

            if (genderMatches.length > 0) {
                for (let i = 0; i < genderMatches.length; i++) {
                    const genderMatch = genderMatches[i];
                    const selected = this.jQuery('#field_field .tooltip_content:containsIN(' + value + ') img[title*=\'' + genderMatch + '\']');
                    if (selected.length) {
                        const shelterBigImg = selected.parent().parent().parent().parent().prev().children(`img.${cls}`);
                        this.jQuery(shelterBigImg).addClass('privatefoundme');
                    }
                }
            }

            //No genders
            else {
                const selected = this.jQuery('#field_field .tooltip_content:containsIN(' + value + ')');
                if (selected.length) {
                    const shelterBigImg = selected.parent().parent().parent().parent().prev().children(`img.${cls}`);
                    this.jQuery(shelterBigImg).addClass('privatefoundme');
                }
            }

        }
        searchForCustomEgg(value) {
            const cls = this.helpers.getPokemonImageClass();
            const selected = this.jQuery('#field_field .tooltip_content:containsIN(' + value + '):contains("Egg")');
            if (selected.length) {
                const shelterBigImg = selected.parent().parent().parent().parent().prev().children(`img.${cls}`);
                this.jQuery(shelterBigImg).addClass('privatefoundme');
            }
        }
        searchForCustomPng(value) {
            const selected = this.jQuery('#field_field img[src*="' + value + '"]');
            if (selected.length) {
                const shelterImgSearch = selected;
                this.jQuery(shelterImgSearch).addClass('privatefoundme');
            }
        }
        customSearch(GLOBALS) {
            if(this.globalSettings.privateFieldFeatureEnables.search) {
                const obj = this;
                const cls = this.helpers.getPokemonImageClass();
                const bigImgs = document.querySelectorAll('.privatefoundme');
                if (bigImgs !== null) {
                    bigImgs.forEach((b) => { obj.jQuery(b).removeClass('privatefoundme'); });
                }

                if (this.settings.fieldShiny === true) {
                    this.searchForImgTitle(GLOBALS, 'findShiny');
                }
                if (this.settings.fieldAlbino === true) {
                    this.searchForImgTitle(GLOBALS, 'findAlbino');
                }
                if (this.settings.fieldMelanistic === true) {
                    this.searchForImgTitle(GLOBALS, 'findMelanistic');
                }
                if (this.settings.fieldPrehistoric === true) {
                    this.searchForImgTitle(GLOBALS, 'findPrehistoric');
                }
                if (this.settings.fieldDelta === true) {
                    this.searchForImgTitle(GLOBALS, 'findDelta');
                }
                if (this.settings.fieldMega === true) {
                    this.searchForImgTitle(GLOBALS, 'findMega');
                }
                if (this.settings.fieldStarter === true) {
                    this.searchForImgTitle(GLOBALS, 'findStarter');
                }
                if (this.settings.fieldCustomSprite === true) {
                    this.searchForImgTitle(GLOBALS, 'findCustomSprite');
                }
                if (this.settings.fieldItem === true) {
                    // pokemon that hold items will have HTML that matches the following selector
                    const items = obj.jQuery('.tooltip_content .item>div>.tooltip_item');
                    if (items.length) {
                        const itemBigImgs = items.parent().parent().parent().parent().prev().children(`img.${cls}`);
                        obj.jQuery(itemBigImgs).addClass('privatefoundme');
                    }
                }
                const filteredTypeArray = this.typeArray.filter(v => v != '');
                const filteredNatureArray = this.natureArray.filter(v => v != '');
                const filteredEggGroupArray = this.eggGroupArray.filter(v => v != '');

                //loop to find all the types
                if (filteredTypeArray.length > 0 || filteredNatureArray.length > 0 || filteredEggGroupArray.length > 0) {
                    obj.jQuery('.fieldmon').each(function () {
                        const searchPokemonBigImg = obj.jQuery(this)[0].childNodes[0];
                        const tooltipData = obj.helpers.parseFieldPokemonTooltip(obj.jQuery, GLOBALS, obj.jQuery(searchPokemonBigImg).parent().next()[0]);

                        const searchTypeOne = tooltipData.types[0] + '';
                        const searchTypeTwo = (tooltipData.types.length > 1) ? tooltipData.types[1] + '' : '';

                        const searchNature = GLOBALS.NATURE_LIST[tooltipData.nature];

                        const searchEggGroup = obj.jQuery(this).next().find('.fieldmontip').
                            children(':contains(Egg Group)').eq(0).text().slice('Egg Group: '.length);

                        for (let i = 0; i < filteredTypeArray.length; i++) {
                            if ((searchTypeOne === filteredTypeArray[i]) || (searchTypeTwo === filteredTypeArray[i])) {
                                obj.jQuery(searchPokemonBigImg).addClass('privatefoundme');
                            }
                        }

                        for (let i = 0; i < filteredNatureArray.length; i++) {
                            if (searchNature === GLOBALS.NATURE_LIST[filteredNatureArray[i]]) {
                                obj.jQuery(searchPokemonBigImg).addClass('privatefoundme');
                            }
                        }

                        for (let i = 0; i < filteredEggGroupArray.length; i++) {
                            const value = GLOBALS.EGG_GROUP_LIST[filteredEggGroupArray[i]];
                            if (searchEggGroup === value ||
                        searchEggGroup.indexOf(value + '/') > -1 ||
                        searchEggGroup.indexOf('/' + value) > -1) {
                                obj.jQuery(searchPokemonBigImg).addClass('privatefoundme');
                            }
                        }
                    }); // each
                } // end

                // custom search
                for (let i = 0; i < this.customArray.length; i++) {
                    const value = this.customArray[i];
                    if (value != '') {
                        //custom pokemon search
                        if (this.settings.customPokemon === true) {
                            this.searchForCustomPokemon(value, this.settings.fieldMale,
                                this.settings.fieldFemale,
                                this.settings.fieldNoGender);
                        }

                        //custom egg
                        if (this.settings.customEgg === true) {
                            this.searchForCustomEgg(value);
                        }

                        //imgSearch with Pokémon
                        if (this.settings.customPng === true) {
                            this.searchForCustomPng(value);
                        }
                    }
                }
            }
        }
        addSelectSearch(cls, name, dataKey, options, id, divParent, arrayName) {
            const theList = this.helpers.selectSearchDiv(cls, name, dataKey, options, id, divParent, arrayName);
            const number = this.jQuery(`#${divParent}>div`).length;
            this.jQuery(`#${divParent}`).append(theList);
            this.jQuery(`.${cls}`).removeClass(cls).addClass('' + number + '');
        }
        removeSelectSearch(arr, byebye, key, settingsKey, divParent) {
            arr = this.jQuery.grep(arr, function (value) { return value != key; });
            this.settings[settingsKey] = arr.toString();

            this.jQuery(byebye).parent().remove();

            for (let i = 0; i < this.jQuery(`#${divParent}>div`).length; i++) {
                const rightDiv = i + 1;
                this.jQuery('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
            }

            return arr;
        }
        addTextField() {
            const theField = this.helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray');
            const numberDiv = this.jQuery('#searchkeys>div').length;
            this.jQuery('#searchkeys').append(theField);
            this.jQuery('.numberDiv').removeClass('numberDiv').addClass('' + numberDiv + '');
        }
        removeTextField(byebye, key) {
            this.customArray = this.jQuery.grep(this.customArray, function (value) {
                return value != key;
            });
            this.settings.fieldCustom = this.customArray.toString();

            this.jQuery(byebye).parent().remove();

            let i;
            for (i = 0; i < this.jQuery('#searchkeys>div').length; i++) {
                const rightDiv = i + 1;
                this.jQuery('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
            }
        }
        releaseEnableReleaseAll() {
            const obj = this;
            if (this.settings.releaseSelectAll === true &&
            !this.jQuery('#selectallfield').length) {
                const checkboxes = '<label id="selectallfield"><input id="selectallfieldcheckbox" type="checkbox">Select all  </label><label id="selectallfieldany"><input id="selectallfieldanycheckbox" type="checkbox">Select Any  </label><label id="selectallfieldsour"><input id="selectallfieldsourcheckbox" type="checkbox">Select Sour  </label><label id="selectallfieldspicy"><input id="selectallfieldspicycheckbox" type="checkbox">Select Spicy</label><label id="selectallfielddry"><input id="selectallfielddrycheckbox" type="checkbox">Select Dry  </label><label id="selectallfieldsweet"><input id="selectallfieldsweetcheckbox" type="checkbox">Select Sweet  </label><label id="selectallfieldbitter"><input id="selectallfieldbittercheckbox" type="checkbox">Select Bitter  </label>';
                this.jQuery('.dialog>div>div>div>div>button').eq(0).after(checkboxes);
                this.jQuery('#selectallfieldcheckbox').click(function () {
                    obj.jQuery('#massreleaselist>ul>li>label>input').not(this).prop('checked', this.checked);
                });

                this.jQuery('#selectallfieldanycheckbox').click(function () {
                    const selectAny = obj.jQuery('.icons:contains("Any")').prev().prev().prev('input');
                    obj.jQuery(selectAny).not(this).prop('checked', this.checked);
                });

                this.jQuery('#selectallfieldsourcheckbox').click(function () {
                    const selectSour = obj.jQuery('.icons:contains("Sour")').prev().prev().prev('input');
                    obj.jQuery(selectSour).not(this).prop('checked', this.checked);
                });

                this.jQuery('#selectallfieldspicycheckbox').click(function () {
                    const selectSpicy = obj.jQuery('.icons:contains("Spicy")').prev().prev().prev('input');
                    obj.jQuery(selectSpicy).not(this).prop('checked', this.checked);
                });

                this.jQuery('#selectallfielddrycheckbox').click(function () {
                    const selectDry = obj.jQuery('.icons:contains("Dry")').prev().prev().prev('input');
                    obj.jQuery(selectDry).not(this).prop('checked', this.checked);
                });

                this.jQuery('#selectallfieldsweetcheckbox').click(function () {
                    const selectSweet = obj.jQuery('.icons:contains("Sweet")').prev().prev().prev('input');
                    obj.jQuery(selectSweet).not(this).prop('checked', this.checked);
                });

                this.jQuery('#selectallfieldbittercheckbox').click(function () {
                    const selectBitter = obj.jQuery('.icons:contains("Bitter")').prev().prev().prev('input');
                    obj.jQuery(selectBitter).not(this).prop('checked', this.checked);
                });
            } // if
        } // releaseAll
        moveEnableReleaseAll() {
            const obj = this;
            if (this.settings.releaseSelectAll === true &&
            !this.jQuery('#movefieldselectall').length) {
                const checkboxes = '<label id="movefieldselectall"><input id="movefieldselectallcheckbox" type="checkbox">Select all  </label><label id="movefieldselectany"><input id="movefieldselectanycheckbox" type="checkbox">Select Any  </label><label id="movefieldselectsour"><input id="movefieldselectsourcheckbox" type="checkbox">Select Sour  </label><label id="movefieldselectspicy"><input id="movefieldselectspicycheckbox" type="checkbox">Select Spicy</label><label id="movefieldselectdry"><input id="movefieldselectdrycheckbox" type="checkbox">Select Dry  </label><label id="movefieldselectsweet"><input id="movefieldselectsweetcheckbox" type="checkbox">Select Sweet  </label><label id="movefieldselectbitter"><input id="movefieldselectbittercheckbox" type="checkbox">Select Bitter  </label>';
                obj.jQuery('.dialog>div>div>div>div>button').eq(0).after(checkboxes);
                obj.jQuery('#movefieldselectallcheckbox').click(function () {
                    obj.jQuery('#massmovelist>ul>li>label>input').not(this).prop('checked', this.checked);
                });

                obj.jQuery('#movefieldselectanycheckbox').click(function () {
                    const selectAny = obj.jQuery('.icons:contains("Any")').prev().prev().prev('input');
                    obj.jQuery(selectAny).not(this).prop('checked', this.checked);
                });

                obj.jQuery('#movefieldselectsourcheckbox').click(function () {
                    const selectSour = obj.jQuery('.icons:contains("Sour")').prev().prev().prev('input');
                    obj.jQuery(selectSour).not(this).prop('checked', this.checked);
                });

                obj.jQuery('#movefieldselectspicycheckbox').click(function () {
                    const selectSpicy = obj.jQuery('.icons:contains("Spicy")').prev().prev().prev('input');
                    obj.jQuery(selectSpicy).not(this).prop('checked', this.checked);
                });

                obj.jQuery('#movefieldselectdrycheckbox').click(function () {
                    const selectDry = obj.jQuery('.icons:contains("Dry")').prev().prev().prev('input');
                    obj.jQuery(selectDry).not(this).prop('checked', this.checked);
                });

                obj.jQuery('#movefieldselectsweetcheckbox').click(function () {
                    const selectSweet = obj.jQuery('.icons:contains("Sweet")').prev().prev().prev('input');
                    obj.jQuery(selectSweet).not(this).prop('checked', this.checked);
                });

                obj.jQuery('#movefieldselectbittercheckbox').click(function () {
                    const selectBitter = obj.jQuery('.icons:contains("Bitter")').prev().prev().prev('input');
                    obj.jQuery(selectBitter).not(this).prop('checked', this.checked);
                });
            } // if
        } // moveEnableReleaseAll
    }

    // eslint-disable-next-line no-unused-vars
    class PublicFieldsPage extends Page {
        constructor(jQuery, localStorageMgr, helpers, GLOBALS, settings) {
            super(jQuery, localStorageMgr, helpers, GLOBALS.PUBLIC_FIELDS_PAGE_SETTINGS_KEY, {
                fieldByBerry: false,
                fieldByMiddle: false,
                fieldByGrid: false,
                fieldClickCount: true,
                fieldCustom: '',
                fieldType: '',
                fieldNature: '',
                fieldEggGroup: '',
                fieldNewPokemon: true,
                fieldShiny: true,
                fieldAlbino: true,
                fieldMelanistic: true,
                fieldPrehistoric: true,
                fieldDelta: true,
                fieldMega: true,
                fieldStarter: true,
                fieldCustomSprite: true,
                fieldMale: true,
                fieldFemale: true,
                fieldNoGender: true,
                fieldCustomItem: true, // unused
                fieldCustomPokemon: true,
                fieldCustomEgg: true,
                fieldCustomPng: false,
                fieldItem: true,
                /* tooltip settings */
                tooltipEnableMods: false,
                tooltipNoBerry: false,
                tooltipBerry: false,
            }, 'fields/', settings);
            this.customArray = [];
            this.typeArray = [];
            this.natureArray = [];
            this.eggGroupArray = [];
            const obj = this;
            this.observer = new MutationObserver(function(mutations) {
            // eslint-disable-next-line no-unused-vars
                mutations.forEach(function(mutation) {
                    obj.customSearch(GLOBALS);
                    if(obj.globalSettings.publicFieldFeatureEnables.tooltip) {
                        obj.handleTooltipSettings();
                    }
                });
            });
        }

        settingsChange(element, textElement, customClass, typeClass, arrayName) {
            if(super.settingsChange(element, textElement, customClass, typeClass, arrayName) === false) {
                return false;
            }

            const mutuallyExclusive = ['fieldByBerry', 'fieldByMiddle', 'fieldByGrid'];
            const idx = mutuallyExclusive.indexOf(element);
            if(idx > -1) {
                for(let i = 0; i < mutuallyExclusive.length; i++) {
                    if(i !== idx) {
                        this.settings[mutuallyExclusive[i]] = false;
                    }
                }
                return true;
            }
            else { return false; }
        }

        setupHTML(GLOBALS) {
            if(this.globalSettings.publicFieldFeatureEnables.search) {
                document.querySelector('#field_field').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.fieldSearchHTML);
                const theField = this.helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray');
                const theType = this.helpers.selectSearchDiv('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS,
                    'removeFieldTypeSearch', 'fieldTypes', 'typeArray');
                const theNature = this.helpers.selectSearchDiv('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS,
                    'removeFieldNature', 'natureTypes', 'natureArray');
                const theEggGroup = this.helpers.selectSearchDiv('eggGroupNumber', 'eggGroups', 'fieldEggGroup', GLOBALS.EGG_GROUP_OPTIONS,
                    'removeFieldEggGroup', 'eggGroupTypes', 'eggGroupArray');
                this.customArray = this.settings.fieldCustom.split(',');
                this.typeArray = this.settings.fieldType.split(',');
                this.natureArray = this.settings.fieldNature.split(',');
                this.eggGroupArray = this.settings.fieldEggGroup.split(',');
                this.helpers.setupFieldArrayHTML(this.jQuery, this.customArray, 'searchkeys', theField, 'numberDiv');
                this.helpers.setupFieldArrayHTML(this.jQuery, this.typeArray, 'fieldTypes', theType, 'typeNumber');
                this.helpers.setupFieldArrayHTML(this.jQuery, this.natureArray, 'natureTypes', theNature, 'natureNumber');
                this.helpers.setupFieldArrayHTML(this.jQuery, this.eggGroupArray, 'eggGroupTypes', theEggGroup, 'eggGroupNumber');
            }
            if(this.globalSettings.publicFieldFeatureEnables.sort) {
                document.querySelector('#field_field').insertAdjacentHTML('beforebegin', GLOBALS.TEMPLATES.fieldSortHTML);
            }
            if(this.globalSettings.publicFieldFeatureEnables.tooltip) {
                document.querySelector('#field_field').insertAdjacentHTML('beforebegin', GLOBALS.TEMPLATES.publicFieldTooltipModHTML);
                this.handleTooltipSettings();
            }
        }
        setupCSS() {
            const fieldOrderCssColor = this.jQuery('#field_field').css('background-color');
            const fieldOrderCssBorder = this.jQuery('#field_field').css('border');
            this.jQuery('#fieldorder').css('background-color', '' + fieldOrderCssColor + '');
            this.jQuery('#fieldorder').css('border', '' + fieldOrderCssBorder + '');
            this.jQuery('#fieldsearch').css('background-color', '' + fieldOrderCssColor + '');
            this.jQuery('#tooltipenable').css('max-width', '600px');
            this.jQuery('#tooltipenable').css('position', 'relative');
            this.jQuery('#tooltipenable').css('margin', '16px auto');
            this.jQuery('.collapsible').css('background-color', '' + fieldOrderCssColor + '');
            this.jQuery('.collapsible').css('border', '' + fieldOrderCssBorder + '');
            this.jQuery('.collapsible_content').css('background-color', '' + fieldOrderCssColor + '');

            this.jQuery('.tooltiptext').css('background-color', this.jQuery('.tooltip_content').eq(0).css('background-color'));
            this.jQuery('.tooltiptext').css('border', '' + fieldOrderCssBorder + '');

            /*
             * Issue #47 - Since the default Pokefarm CSS for buttons does not use the same color
             * settings as most of the text on the site, manually set the text color for
             * '.collapsible' to match the text around it
             */
            this.jQuery('.collapsible').css('color', this.jQuery('#content').find('h1').eq(0).css('color'));
        }
        setupObserver() {
            this.observer.observe(document.querySelector('#field_field'), {
                childList: true,
                characterdata: true,
                subtree: true,
                characterDataOldValue: true,
            });
        }
        setupHandlers(GLOBALS) {
            const obj = this;
            obj.jQuery(window).on('load', (function() {
                obj.loadSettings();
                obj.customSearch(GLOBALS);
                if(obj.globalSettings.publicFieldFeatureEnables.tooltip) {
                    obj.handleTooltipSettings();
                }
                obj.saveSettings();
            }));

            obj.jQuery(document).on('click input', '#fieldorder, #field_field, #field_berries, #field_nav', (function() { //field sort
                obj.customSearch(GLOBALS);
            }));

            document.addEventListener('keydown', function() {
                obj.customSearch(GLOBALS);
            });

            obj.jQuery(document).on('change', '.qolsetting', (function() {
                obj.loadSettings();
                obj.customSearch(GLOBALS);
                obj.saveSettings();
            }));

            obj.jQuery(document).on('input', '.qolsetting', (function() { //Changes QoL settings
                obj.settingsChange(this.getAttribute('data-key'),
                    obj.jQuery(this).val(),
                    obj.jQuery(this).parent().parent().attr('class'),
                    obj.jQuery(this).parent().attr('class'),
                    (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
                obj.customSearch(GLOBALS);
                obj.saveSettings();
            }));

            if(this.globalSettings.publicFieldFeatureEnables.search) {
                obj.jQuery(document).on('click', '#addFieldTypeSearch', (function() { //add field type list
                    obj.addSelectSearch('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS, 'removeFieldTypeSearch', 'fieldTypes', 'typeArray');
                    obj.customSearch(GLOBALS);
                }));

                obj.jQuery(document).on('click', '#removeFieldTypeSearch', (function() { //remove field type list
                    obj.typeArray = obj.removeSelectSearch(obj.typeArray, this, obj.jQuery(this).parent().find('select').val(), 'fieldType', 'fieldTypes');
                    obj.saveSettings();
                    obj.customSearch(GLOBALS);
                }));

                obj.jQuery(document).on('click', '#addFieldNatureSearch', (function() { //add field nature search
                    obj.addSelectSearch('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS, 'removeFieldNature', 'natureTypes', 'natureArray');
                    obj.customSearch(GLOBALS);
                }));

                obj.jQuery(document).on('click', '#removeFieldNature', (function() { //remove field nature search
                    obj.natureArray = obj.removeSelectSearch(obj.natureArray, this, obj.jQuery(this).parent().find('select').val(), 'fieldNature', 'natureTypes');
                    obj.saveSettings();
                    obj.customSearch(GLOBALS);
                }));

                obj.jQuery(document).on('click', '#addFieldEggGroupSearch', (function() { //add egg group nature search
                    obj.addSelectSearch('eggGroupNumber', 'eggGroups', 'fieldEggGroup', GLOBALS.EGG_GROUP_OPTIONS, 'removeFieldEggGroup', 'eggGroupTypes', 'eggGroupArray');
                    obj.customSearch(GLOBALS);
                }));

                obj.jQuery(document).on('click', '#removeFieldEggGroup', (function() { //remove egg group nature search
                    obj.eggGroupArray = obj.removeSelectSearch(obj.eggGroupArray, this, obj.jQuery(this).parent().find('select').val(), 'fieldEggGroup', 'eggGroupTypes');
                    obj.saveSettings();
                    obj.customSearch(GLOBALS);
                }));

                obj.jQuery(document).on('click', '#addTextField', (function() {
                    obj.addTextField();
                    obj.saveSettings();
                }));

                obj.jQuery(document).on('click', '#removeTextField', (function() {
                    obj.removeTextField(this, obj.jQuery(this).parent().find('input').val());
                    obj.saveSettings();
                    obj.customSearch(GLOBALS);
                }));
            }

            if(this.globalSettings.publicFieldFeatureEnables.sort) {
                obj.jQuery('input.qolalone').on('change', function() { //only 1 textbox may be true
                    obj.jQuery('input.qolalone').not(this).prop('checked', false);
                });
            }

            if(this.globalSettings.publicFieldFeatureEnables.tooltip) {
                obj.jQuery('.collapsible').on('click', function() {
                    this.classList.toggle('active');
                    const content = this.nextElementSibling;
                    if(content.style.display === 'block') {
                        content.style.display = 'none';
                    } else {
                        content.style.display = 'block';
                    }
                });

                obj.jQuery('#field_berries').on('click', function() {
                    obj.loadSettings();
                    obj.handleTooltipSettings();
                });

                obj.jQuery('.tooltipsetting[data-key=tooltipEnableMods]').on('click', function() {
                    obj.loadSettings();
                    obj.handleTooltipSettings();
                    obj.saveSettings();
                });

                obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').on('click', function() {
                    obj.loadSettings();
                    obj.handleTooltipSettings();
                    obj.saveSettings();
                });

                obj.jQuery('.tooltipsetting[data-key=tooltipBerry]').on('click', function() {
                    obj.loadSettings();
                    obj.handleTooltipSettings();
                    obj.saveSettings();
                });
            }

            // based on PFQ's code in fields_public.min.js
            obj.jQuery(window).on('keyup.field_shortcuts', function (a) {
                const k = obj.jQuery('#field_berries');
                if (0 == obj.jQuery(a.target).closest('input, textarea').length) {
                    switch (a.keyCode) {
                    case 49: // 1
                    case 97: // Num-1
                        k.find('a').eq(0).trigger('click');
                        break;
                    case 50: // 2
                    case 98: // Num-2
                        k.find('a').eq(1).trigger('click');
                        break;
                    case 51: // 3
                    case 99: // Num-3
                        k.find('a').eq(2).trigger('click');
                        break;
                    case 52: // 4
                    case 100: // Num-4
                        k.find('a').eq(3).trigger('click');
                        break;
                    case 53: // 5
                    case 101: // Num-5
                        k.find('a').eq(4).trigger('click');
                    }
                }
            });
        }
        // specific
        handleTooltipSettings() {
            const obj = this;
            if(obj.jQuery('.tooltipsetting[data-key=tooltipEnableMods]').prop('checked')) {
            // make sure checkboxes are enabled
                obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').prop('disabled', false);
                obj.jQuery('.tooltipsetting[data-key=tooltipBerry]').prop('disabled', false);

                // use the correct setting to turn on the tooltips based on the berries
                if(obj.jQuery('#field_berries').hasClass('selected')) {
                    if(obj.jQuery('.tooltipsetting[data-key=tooltipBerry]').prop('checked')) { obj.disableTooltips(); }
                    else { obj.enableTooltips(); }
                } else {
                    if(obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').prop('checked')) { obj.disableTooltips(); }
                    else { obj.enableTooltips(); }
                }
            } else {
                obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').prop('disabled', true);
                obj.jQuery('.tooltipsetting[data-key=tooltipBerry]').prop('disabled', true);
                // if tooltipNoBerry was checked before the mods were disabled, reenable the tooltips
                if(obj.jQuery('.tooltipsetting[data-key=tooltipNoBerry]').prop('checked')) {
                    obj.enableTooltips();
                }
                // same for tooltipBerry
                if(obj.jQuery('.tooltipsetting[data-key=tooltipBerry]').prop('checked')) {
                    obj.enableTooltips();
                }
            }
        }
        disableTooltips() {
            this.jQuery('#field_field>div.field>.fieldmon').removeAttr('data-tooltip').removeClass('tooltip_trigger');
        }
        enableTooltips() {
            this.jQuery('#field_field>div.field>.fieldmon').attr('data-tooltip', '');
        }
        searchForImgTitle(GLOBALS, key) {
            const SEARCH_DATA = GLOBALS.SHELTER_SEARCH_DATA;
            const keyIndex = SEARCH_DATA.indexOf(key);
            const value = SEARCH_DATA[keyIndex + 1];
            const selected = this.jQuery('img[title*="'+value+'"]');
            const cls = this.helpers.getPokemonImageClass();
            if (selected.length) {
            // next line different from shelter
                const bigImg = selected.parent().parent().parent().parent().prev().children(`img.${cls}`);
                this.jQuery(bigImg).addClass('publicfoundme');
            }
        }
        searchForCustomPokemon(value, male, female, nogender) {
            const genderMatches = [];
            if (male) { genderMatches.push('[M]'); }
            if(female) { genderMatches.push('[F]'); }
            if(nogender) { genderMatches.push('[N]'); }
            const cls = this.helpers.getPokemonImageClass();

            if(genderMatches.length > 0) {
                for(let i = 0; i < genderMatches.length; i++) {
                    const genderMatch = genderMatches[i];
                    const selected = this.jQuery('#field_field .tooltip_content:containsIN('+value+') img[title*=\'' + genderMatch + '\']');
                    if (selected.length) {
                        const shelterBigImg = selected.parent().parent().parent().parent().prev().children(`img.${cls}`);
                        this.jQuery(shelterBigImg).addClass('publicfoundme');
                    }
                }
            }

            //No genders
            else {
                const selected = this.jQuery('#field_field .tooltip_content:containsIN('+value+'):not(:containsIN("Egg"))');
                if (selected.length) {
                    const shelterBigImg = selected.parent().parent().parent().parent().prev().children(`img.${cls}`);
                    this.jQuery(shelterBigImg).addClass('publicfoundme');
                }
            }

        }
        searchForCustomEgg(value) {
            const selected = this.jQuery('#field_field .tooltip_content:containsIN('+value+'):contains("Egg")');
            const cls = this.helpers.getPokemonImageClass();
            if (selected.length) {
                const shelterBigImg = selected.parent().parent().parent().parent().prev().children(`img.${cls}`);
                this.jQuery(shelterBigImg).addClass('publicfoundme');
            }
        }
        searchForCustomPng(value) {
            const selected = this.jQuery('#field_field img[src*="'+value+'"]');
            if (selected.length) {
                const shelterImgSearch = selected;
                this.jQuery(shelterImgSearch).addClass('publicfoundme');
            }
        }
        customSearch(GLOBALS) {
            const obj = this;
            const cls = this.helpers.getPokemonImageClass();

            if(obj.globalSettings.publicFieldFeatureEnables.sort) {

                //////////////////// sorting ////////////////////
                if (this.settings.fieldByBerry === true) { //sort field by berries
                    this.jQuery('.fieldmon').removeClass('qolSortMiddle');
                    this.jQuery('.field').removeClass('qolGridField');
                    this.jQuery('.fieldmon').removeClass('qolGridPokeSize');
                    this.jQuery('.fieldmon>img').removeClass('qolGridPokeImg');

                    if(this.jQuery('#field_field [data-flavour*="any-"]').length) {
                        this.jQuery('#field_field [data-flavour*="any-"]').addClass('qolAnyBerry');
                    }
                    if(this.jQuery('#field_field [data-flavour*="sour-"]').length) {
                        this.jQuery('#field_field [data-flavour*="sour-"]').addClass('qolSourBerry');
                    }
                    if(this.jQuery('#field_field [data-flavour*="spicy-"]').length) {
                        this.jQuery('#field_field [data-flavour*="spicy-"]').addClass('qolSpicyBerry');
                    }
                    if(this.jQuery('#field_field [data-flavour*="dry-"]').length) {
                        this.jQuery('#field_field [data-flavour*="dry-"]').addClass('qolDryBerry');
                    }
                    if(this.jQuery('#field_field [data-flavour*="sweet-"]').length) {
                        this.jQuery('#field_field [data-flavour*="sweet-"]').addClass('qolSweetBerry');
                    }
                    if(this.jQuery('#field_field [data-flavour*="bitter-"]').length) {
                        this.jQuery('#field_field [data-flavour*="bitter-"]').addClass('qolBitterBerry');
                    }
                }
                else if (this.settings.fieldByMiddle === true) { //sort field in the middle
                    this.jQuery('#field_field [data-flavour*="any-"]').removeClass('qolAnyBerry');
                    this.jQuery('#field_field [data-flavour*="sour-"]').removeClass('qolSourBerry');
                    this.jQuery('#field_field [data-flavour*="spicy-"]').removeClass('qolSpicyBerry');
                    this.jQuery('#field_field [data-flavour*="dry-"]').removeClass('qolDryBerry');
                    this.jQuery('#field_field [data-flavour*="sweet-"]').removeClass('qolSweetBerry');
                    this.jQuery('#field_field [data-flavour*="bitter-"]').removeClass('qolBitterBerry');
                    this.jQuery('.field').removeClass('qolGridField');
                    this.jQuery('.fieldmon').removeClass('qolGridPokeSize');
                    this.jQuery('.fieldmon>img').removeClass('qolGridPokeImg');

                    this.jQuery('.fieldmon').addClass('qolSortMiddle');
                }
                else if (this.settings.fieldByGrid === true) { //sort field in a grid
                    this.jQuery('#field_field [data-flavour*="any-"]').removeClass('qolAnyBerry');
                    this.jQuery('#field_field [data-flavour*="sour-"]').removeClass('qolSourBerry');
                    this.jQuery('#field_field [data-flavour*="spicy-"]').removeClass('qolSpicyBerry');
                    this.jQuery('#field_field [data-flavour*="dry-"]').removeClass('qolDryBerry');
                    this.jQuery('#field_field [data-flavour*="sweet-"]').removeClass('qolSweetBerry');
                    this.jQuery('#field_field [data-flavour*="bitter-"]').removeClass('qolBitterBerry');
                    this.jQuery('.fieldmon').removeClass('qolSortMiddle');

                    this.jQuery('.field').addClass('qolGridField');
                    this.jQuery('.fieldmon').addClass('qolGridPokeSize');
                    this.jQuery('.fieldmon>img').addClass('qolGridPokeImg');
                }
                else {
                    this.jQuery('#field_field [data-flavour*="any-"]').removeClass('qolAnyBerry');
                    this.jQuery('#field_field [data-flavour*="sour-"]').removeClass('qolSourBerry');
                    this.jQuery('#field_field [data-flavour*="spicy-"]').removeClass('qolSpicyBerry');
                    this.jQuery('#field_field [data-flavour*="dry-"]').removeClass('qolDryBerry');
                    this.jQuery('#field_field [data-flavour*="sweet-"]').removeClass('qolSweetBerry');
                    this.jQuery('#field_field [data-flavour*="bitter-"]').removeClass('qolBitterBerry');
                    this.jQuery('.fieldmon').removeClass('qolSortMiddle');
                    this.jQuery('.field').removeClass('qolGridField');
                    this.jQuery('.fieldmon').removeClass('qolGridPokeSize');
                    this.jQuery('.fieldmon>img').removeClass('qolGridPokeImg');
                }

                //Pokémon click counter
                if (this.settings.fieldClickCount === false) {
                    this.jQuery('#pokemonclickcount').remove();
                } else if (this.settings.fieldClickCount === true) {
                    const pokemonFed = this.jQuery('.fieldmon').map(function() { return obj.jQuery(this).attr('data-fed'); }).get();

                    let pokemonClicked = 0;
                    for (let i = 0; i < pokemonFed.length; i++) {
                        pokemonClicked += pokemonFed[i] << 0;
                    }

                    const pokemonInField = this.jQuery('.fieldpkmncount').text();

                    if (this.jQuery('#pokemonclickcount').length === 0) {
                        document.querySelector('.fielddata').insertAdjacentHTML('beforeend','<div id="pokemonclickcount">'+pokemonClicked+' / '+pokemonInField+' Clicked</div>');
                    } else if(this.jQuery('#pokemonclickcount').text() !== (pokemonClicked+' / '+pokemonInField+' Clicked')) {
                        this.jQuery('#pokemonclickcount').text(pokemonClicked+' / '+pokemonInField+' Clicked');
                    }

                    if(pokemonInField !== '') {
                        if (JSON.stringify(pokemonClicked) === pokemonInField) {
                            this.jQuery('#pokemonclickcount').css({
                                'color' : '#059121'
                            });
                        }
                        if (pokemonClicked !== JSON.parse(pokemonInField)) {
                            this.jQuery('#pokemonclickcount').css({
                                'color' : '#a30323'
                            });
                        }
                    }
                }
            }

            if(obj.globalSettings.publicFieldFeatureEnables.search) {
                /////////////////// searching ///////////////////
                const bigImgs = document.querySelectorAll('.publicfoundme');
                if(bigImgs !== null) {
                    bigImgs.forEach((b) => {obj.jQuery(b).removeClass('publicfoundme');});
                }

                if(this.settings.fieldShiny === true) {
                    this.searchForImgTitle(GLOBALS, 'findShiny');
                }
                if(this.settings.fieldAlbino === true) {
                    this.searchForImgTitle(GLOBALS, 'findAlbino');
                }
                if(this.settings.fieldMelanistic === true) {
                    this.searchForImgTitle(GLOBALS, 'findMelanistic');
                }
                if(this.settings.fieldPrehistoric === true) {
                    this.searchForImgTitle(GLOBALS, 'findPrehistoric');
                }
                if(this.settings.fieldDelta === true) {
                    this.searchForImgTitle(GLOBALS, 'findDelta');
                }
                if(this.settings.fieldMega === true) {
                    this.searchForImgTitle(GLOBALS, 'findMega');
                }
                if(this.settings.fieldStarter === true) {
                    this.searchForImgTitle(GLOBALS, 'findStarter');
                }
                if(this.settings.fieldCustomSprite === true) {
                    this.searchForImgTitle(GLOBALS, 'findCustomSprite');
                }
                if(this.settings.fieldItem === true) {
                    // pokemon that hold items will have HTML that matches the following selector
                    const items = this.jQuery('.tooltip_content .item>div>.tooltip_item');
                    if(items.length) {
                        const itemBigImgs = items.parent().parent().parent().parent().prev().children(`img.${cls}`);
                        this.jQuery(itemBigImgs).addClass('publicfoundme');
                    }
                }

                const filteredTypeArray = this.typeArray.filter(v=>v!='');
                const filteredNatureArray = this.natureArray.filter(v=>v!='');
                const filteredEggGroupArray = this.eggGroupArray.filter(v=>v!='');

                //loop to find all the types
                if (filteredTypeArray.length > 0 || filteredNatureArray.length > 0 || filteredEggGroupArray.length > 0) {
                    this.jQuery('.fieldmon').each(function() {
                        const searchPokemonBigImg = obj.jQuery(this)[0].childNodes[0];
                        const tooltipData = obj.helpers.parseFieldPokemonTooltip(obj.jQuery, GLOBALS, obj.jQuery(searchPokemonBigImg).parent().next()[0]);

                        const searchTypeOne = tooltipData.types[0] + '';
                        const searchTypeTwo = (tooltipData.types.length > 1) ? tooltipData.types[1] + '': '';

                        const searchNature = GLOBALS.NATURE_LIST[tooltipData.nature];

                        const searchEggGroup = obj.jQuery(this).next().find('.fieldmontip').
                            children(':contains(Egg Group)').eq(0).text().slice('Egg Group: '.length);

                        for (let i = 0; i < filteredTypeArray.length; i++) {
                            if ((searchTypeOne === filteredTypeArray[i]) || (searchTypeTwo === filteredTypeArray[i])) {
                                obj.jQuery(searchPokemonBigImg).addClass('publicfoundme');
                            }
                        }

                        for (let i = 0; i < filteredNatureArray.length; i++) {
                            if(searchNature === GLOBALS.NATURE_LIST[filteredNatureArray[i]]) {
                                obj.jQuery(searchPokemonBigImg).addClass('publicfoundme');
                            }
                        }

                        for (let i = 0; i < filteredEggGroupArray.length; i++) {
                            const value = GLOBALS.EGG_GROUP_LIST[filteredEggGroupArray[i]];
                            if(searchEggGroup === value ||
                       searchEggGroup.indexOf(value + '/') > -1 ||
                       searchEggGroup.indexOf('/' + value) > -1) {
                                obj.jQuery(searchPokemonBigImg).addClass('publicfoundme');
                            }
                        }
                    }); // each
                } // end

                // custom search
                for (let i = 0; i < this.customArray.length; i++) {
                    const value = this.customArray[i];
                    if (value != '') {
                        //custom pokemon search
                        if (this.settings.fieldCustomPokemon === true) {
                            this.searchForCustomPokemon(value, this.settings.fieldMale,
                                this.settings.fieldFemale,
                                this.settings.fieldNoGender);
                        }

                        //custom egg
                        if (this.settings.fieldCustomEgg === true) {
                            this.searchForCustomEgg(value);
                        }

                        //imgSearch with Pokémon
                        if (this.settings.fieldCustomPng === true) {
                            this.searchForCustomPng(value);
                        }
                    }
                }
            }
        } // customSearch
        addSelectSearch(cls, name, dataKey, options, id, divParent, arrayName) {
            const theList = this.helpers.selectSearchDiv(cls, name, dataKey, options, id, divParent, arrayName);
            const number = this.jQuery(`#${divParent}>div`).length;
            this.jQuery(`#${divParent}`).append(theList);
            this.jQuery(`.${cls}`).removeClass(cls).addClass(''+number+'');
        }
        removeSelectSearch(arr, byebye, key, settingsKey, divParent) {
            arr = this.jQuery.grep(arr, function(value) { return value != key; });
            this.settings[settingsKey] = arr.toString();

            this.jQuery(byebye).parent().remove();

            for(let i = 0; i < this.jQuery(`#${divParent}>div`).length; i++) {
                const rightDiv = i + 1;
                this.jQuery('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
            }

            return arr;
        }
        addTextField() {
            const theField = this.helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray');
            const numberDiv = this.jQuery('#searchkeys>div').length;
            this.jQuery('#searchkeys').append(theField);
            this.jQuery('.numberDiv').removeClass('numberDiv').addClass(''+numberDiv+'');
        }
        removeTextField(byebye, key) {
            this.customArray = this.jQuery.grep(this.customArray, function(value) {
                return value != key;
            });
            this.settings.fieldCustom = this.customArray.toString();

            this.jQuery(byebye).parent().remove();

            let i;
            for(i = 0; i < this.jQuery('#searchkeys>div').length; i++) {
                const rightDiv = i + 1;
                this.jQuery('.'+i+'').next().removeClass().addClass(''+rightDiv+'');
            }
        }
    }

    // eslint-disable-next-line no-unused-vars
    class ShelterPageBase extends Page {
        constructor(jQuery, localStorageMgr, helpers, GLOBALS, SETTINGS) {
            super(jQuery, localStorageMgr, helpers, GLOBALS.SHELTER_PAGE_SETTINGS_KEY, {
                findCustom: '',
                findType: '',
                findTypeEgg: true,
                findTypePokemon: false,
                findNewEgg: true,
                findNewPokemon: true,
                findShiny: true,
                findAlbino: true,
                findMelanistic: true,
                findPrehistoric: true,
                findDelta: true,
                findMega: true,
                findStarter: true,
                findCustomSprite: true,
                findLegendary: false,
                findMale: true,
                findFemale: true,
                findNoGender: true,
                customEgg: true,
                customPokemon: true,
                customPng: false,
                shelterGrid: true,
            }, 'shelter', SETTINGS);
            this.customArray = [];
            this.typeArray = [];
            const obj = this;
            this.observer = new MutationObserver(function (mutations) {
            // eslint-disable-next-line no-unused-vars
                mutations.forEach(function (mutation) {
                    obj.customSearch(GLOBALS);
                });
            });

            /*
             * used to keep track of the currently selected match
             * matches can be selected via a shortcut key, specified via this.selectNextMatchKey
             */
            this.selectNextMatchKey = 78; // 'n'
            this.currentlySelectedMatch = undefined;
        }

        setupHTML(GLOBALS) {
            if(this.globalSettings.shelterFeatureEnables.search) {
                this.jQuery('.tabbed_interface.horizontal>div').removeClass('tab-active');
                this.jQuery('.tabbed_interface.horizontal>ul>li').removeClass('tab-active');
                document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterbegin', '<li class="tab-active"><label>Search</label></li>');
                document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.shelterOptionsHTML);
                this.jQuery('#shelteroptionsqol').addClass('tab-active');

                document.querySelector('#sheltercommands').insertAdjacentHTML('beforebegin', '<div id="sheltersuccess"></div>');

                const theField = this.helpers.textSearchDiv('numberDiv', 'findCustom', 'removeShelterTextfield', 'customArray');
                const theType = this.helpers.selectSearchDiv('typeNumber', 'types', 'findType', GLOBALS.TYPE_OPTIONS,
                    'removeShelterTypeList', 'fieldTypes', 'typeArray');

                this.customArray = this.settings.findCustom.split(',');
                this.typeArray = this.settings.findType.split(',');

                this.helpers.setupFieldArrayHTML(this.jQuery, this.customArray, 'searchkeys', theField, 'numberDiv');
                this.helpers.setupFieldArrayHTML(this.jQuery, this.typeArray, 'shelterTypes', theType, 'typeNumber');

                this.jQuery('[data-shelter=reload]').addClass('customSearchOnClick');
                this.jQuery('[data-shelter=whiteflute]').addClass('customSearchOnClick');
                this.jQuery('[data-shelter=blackflute]').addClass('customSearchOnClick');
            }
            if(this.globalSettings.shelterFeatureEnables.sort) {
                document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterbegin', '<li class=""><label>Sort</label></li>');
                document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterend', '<div id="qolsheltersort"><label><input type="checkbox" class="qolsetting" data-key="shelterGrid"/><span>Sort by Grid</span></label>');
            }
        }
        setupCSS() {
            if(this.globalSettings.shelterFeatureEnables.search ||
            this.globalSettings.shelterFeatureEnables.sort) {
                const shelterSuccessCss = this.jQuery('#sheltercommands').css('background-color');
                this.jQuery('#sheltersuccess').css('background-color', shelterSuccessCss);
                this.jQuery('.tooltiptext').css('background-color', this.jQuery('.tooltip_content').eq(0).css('background-color'));
                const background = this.jQuery('#shelterpage>.panel').eq(0).css('border');
                this.jQuery('.tooltiptext').css('border', '' + background + '');
            }
        }
        setupObserver() {
            this.observer.observe(document.querySelector('#shelterarea'), {
                childList: true,
            });
        }
        setupHandlers(GLOBALS) {
            const obj = this;
            this.jQuery(document).on('change', '#shelteroptionsqol input', (function () { //shelter search
                obj.loadSettings();
                obj.customSearch(GLOBALS);
                obj.saveSettings();
            }));

            this.jQuery(document).on('change', '.qolsetting', (function () {
                obj.loadSettings();
                obj.customSearch(GLOBALS);
                obj.saveSettings();
            }));

            this.jQuery(document).on('input', '.qolsetting', (function () { //Changes QoL settings
                obj.settingsChange(this.getAttribute('data-key'),
                    obj.jQuery(this).val(),
                    obj.jQuery(this).parent().parent().attr('class'),
                    obj.jQuery(this).parent().attr('class'),
                    (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
                obj.customSearch(GLOBALS);
                obj.saveSettings();
            }));

            this.jQuery('.customSearchOnClick').on('click', (function () {
                obj.loadSettings();
                obj.customSearch(GLOBALS);
                obj.saveSettings();
            }));

            this.jQuery(document).on('click', '#addShelterTextfield', (function () { //add shelter text field
                obj.addTextField();
                obj.saveSettings();
            }));

            this.jQuery(document).on('click', '#removeShelterTextfield', (function () { //remove shelter text field
                obj.removeTextField(this, obj.jQuery(this).parent().find('input').val());
                obj.saveSettings();
                obj.customSearch(GLOBALS);
            }));

            this.jQuery(document).on('click', '#addShelterTypeList', (function () { //add shelter type list
                obj.addTypeList(GLOBALS);
                obj.customSearch(GLOBALS);
            }));

            this.jQuery(document).on('click', '#removeShelterTypeList', (function () { //remove shelter type list
                obj.removeTypeList(this, obj.jQuery(this).parent().find('select').val());
                obj.saveSettings();
                obj.customSearch(GLOBALS);
            }));

            this.jQuery(window).on('keyup.qol_shelter_shortcuts', function (a) {
                if (0 == obj.jQuery(a.target).closest('input, textarea').length) {
                    switch (a.keyCode) {
                    case obj.selectNextMatchKey: {
                        const numMatches = obj.jQuery('#shelterarea').find('.pokemon').find('.shelterfoundme').length;

                        // remove all existing locks
                        obj.jQuery('#shelterarea').find('.pokemon').removeClass('lock').removeClass('dismiss');

                        // default is undefined, so set the value to either 0 or 1+current
                        obj.currentlySelectedMatch = (obj.currentlySelectedMatch + 1) || 0;

                        if (numMatches) {
                            const modIndex = (numMatches == 1) ? 0 : (obj.currentlySelectedMatch + 1) % numMatches - 1;
                            const selected = obj.jQuery('#shelterarea').find('.pokemon').find('.shelterfoundme').parent().eq(modIndex);
                            // these steps mimic clicking on the pokemon/egg
                            selected.parent().addClass('selected');
                            selected.addClass('tooltip_trigger').addClass('lock').removeClass('dismiss');
                            selected.next().find('[data-shelter=adopt]').focus();
                        } else {
                            obj.currentlySelectedMatch = undefined;
                        }
                    }
                    }
                }
            });
        }
        addTextField() {
            const theField = this.helpers.textSearchDiv('numberDiv', 'findCustom', 'removeShelterTextfield', 'customArray');
            const numberDiv = this.jQuery('#searchkeys>div').length;
            this.jQuery('#searchkeys').append(theField);
            this.jQuery('.numberDiv').removeClass('numberDiv').addClass('' + numberDiv + '');
        }
        removeTextField(byebye, key) {
            this.customArray = this.jQuery.grep(this.customArray, function (value) { //when textfield is removed, the value will be deleted from the localstorage
                return value != key;
            });
            this.settings.findCustom = this.customArray.toString();

            this.jQuery(byebye).parent().remove();

            let i;
            for (i = 0; i < this.jQuery('#searchkeys>div').length; i++) {
                const rightDiv = i + 1;
                this.jQuery('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
            }
        }
        addTypeList(GLOBALS) {
            const theList = this.helpers.selectSearchDiv('typeNumber', 'types', 'findType', GLOBALS.TYPE_OPTIONS,
                'removeShelterTypeList', 'fieldTypes', 'typeArray');
            const numberTypes = this.jQuery('#shelterTypes>div').length;
            this.jQuery('#shelterTypes').append(theList);
            this.jQuery('.typeNumber').removeClass('typeNumber').addClass('' + numberTypes + '');
        }
        removeTypeList(byebye, key) {
            this.typeArray = this.jQuery.grep(this.typeArray, function (value) {
                return value != key;
            });
            this.settings.findType = this.typeArray.toString();

            this.jQuery(byebye).parent().remove();

            let i;
            for (i = 0; i < this.jQuery('#shelterTypes>div').length; i++) {
                const rightDiv = i + 1;
                this.jQuery('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
            }
        }
        insertShelterFoundDiv(number, name, img) {
            document.querySelector('#sheltersuccess').
                insertAdjacentHTML('beforeend',
                    '<div id="shelterfound">' + name + ((number !== 1) ? 's' : '') + ' found ' + img + '</div>');
        }
        insertShelterTypeFoundDiv(number, type, stage, names) {
            let stageNoun = '';
            if (stage === 'egg') {
                stageNoun = stage + (number !== 1 ? 's' : '');
            } else { // i.e. stage === 'Pokemon'
                stageNoun = stage;
            }
            document.querySelector('#sheltersuccess').
                insertAdjacentHTML('beforeend',
                    '<div id="shelterfound">' + number + ' ' + type + ' type ' +
                stageNoun + ' found!' + (names.length > 0 ? '(' + names.toString() + ')' : '') + '</div>');
        }

        searchForImgTitle(GLOBALS, key) {
            const SEARCH_DATA = GLOBALS.SHELTER_SEARCH_DATA;
            const keyIndex = SEARCH_DATA.indexOf(key);
            const value = SEARCH_DATA[keyIndex + 1];
            const selected = this.jQuery('img[title*="' + value + '"]');
            const cls = this.helpers.getPokemonImageClass();
            if (selected.length) {
                const searchResult = SEARCH_DATA[keyIndex + 2]; //type of Pokémon found
                const imgResult = selected.length + ' ' + searchResult; //amount + type found
                const imgFitResult = SEARCH_DATA[keyIndex + 3]; //image for type of Pokémon
                const shelterBigImg = selected.parent().prev().children(`img.${cls}`);
                this.jQuery(shelterBigImg).addClass('shelterfoundme');

                this.insertShelterFoundDiv(selected.length, imgResult, imgFitResult);
            }
        }

        searchForTooltipText(GLOBALS, key) {
            const LIST = GLOBALS.SHELTER_SEARCH_LISTS[key];
            const SEARCH_DATA = GLOBALS.SHELTER_SEARCH_DATA;
            const keyIndex = SEARCH_DATA.indexOf(key);
            for (let i = 0; i < LIST.length; i++) {
                const entry = LIST[i];
                const selected = this.jQuery(`div.pokemon+div.tooltip_content:contains('${entry}')`);
                if (selected.length) {
                    const searchResult = SEARCH_DATA[keyIndex + 2]; //type of Pokémon found
                    const imgResult = selected.length + ' ' + searchResult; //amount + type found
                    const imgFitResult = SEARCH_DATA[keyIndex + 3]; //image for type of Pokémon
                    const shelterBigImg = selected.prev().children('img.big');
                    shelterBigImg.addClass('shelterfoundme');

                    this.insertShelterFoundDiv(selected.length, imgResult, imgFitResult);
                }
            }
        }

        searchForTypes(GLOBALS, types) {
            const obj = this;
            const dexData = GLOBALS.DEX_DATA;
            const cls = this.helpers.getPokemonImageClass();
            for (let i = 0; i < types.length; i++) {
                const value = types[i];
                const foundType = GLOBALS.SHELTER_TYPE_TABLE[GLOBALS.SHELTER_TYPE_TABLE.indexOf(value) + 2];

                let typePokemonNames = [];
                let selected = undefined;
                if (this.settings.findTypeEgg === true) {
                    const pokemonElems = [];
                    typePokemonNames = [];
                    selected = this.jQuery('#shelterarea>.tooltip_content:contains("Egg")');
                    selected.each(function () {
                        const searchPokemon = (obj.jQuery(this).text().split(' ')[0]);
                        let searchTypeOne = '';
                        let searchTypeTwo = '';

                        const searchPokemonIndex = dexData.indexOf('"' + searchPokemon + '"');
                        searchTypeOne = dexData[searchPokemonIndex + 1];
                        searchTypeTwo = dexData[searchPokemonIndex + 2];

                        if ((searchTypeOne === value) || (searchTypeTwo === value)) {
                            typePokemonNames.push(searchPokemon);
                            pokemonElems.push(this);
                        }
                    });

                    for (let o = 0; o < pokemonElems.length; o++) {
                        const shelterImgSearch = this.jQuery(pokemonElems[o]);
                        const shelterBigImg = shelterImgSearch.prev().children(`img.${cls}`);
                        this.jQuery(shelterBigImg).addClass('shelterfoundme');
                    }

                    this.insertShelterTypeFoundDiv(typePokemonNames.length, foundType, 'egg', typePokemonNames);
                }

                if (this.settings.findTypePokemon === true) {
                    typePokemonNames = [];
                    selected = this.jQuery('#shelterarea>.tooltip_content').not(':contains("Egg")');
                    selected.each(function () {
                        const searchPokemon = (obj.jQuery(this).text().split(' ')[0]);
                        const searchPokemonIndex = dexData.indexOf('"' + searchPokemon + '"');
                        const searchTypeOne = dexData[searchPokemonIndex + 1];
                        const searchTypeTwo = dexData[searchPokemonIndex + 2];
                        if ((searchTypeOne === value) || (searchTypeTwo === value)) {
                            typePokemonNames.push(searchPokemon);
                        }
                    });

                    for (let o = 0; o < typePokemonNames.length; o++) {
                        const shelterImgSearch = this.jQuery('#shelterarea .tooltip_content:containsIN(\'' + typePokemonNames[o] + ' (\')');
                        const shelterBigImg = shelterImgSearch.prev().children(`img.${cls}`);
                        this.jQuery(shelterBigImg).addClass('shelterfoundme');
                    }

                    this.insertShelterTypeFoundDiv(typePokemonNames.length, foundType, 'Pokemon', typePokemonNames);
                }
            }

        }

        customSearch(GLOBALS) {
            const obj = this;
            const SEARCH_DATA = GLOBALS.SHELTER_SEARCH_DATA;
            const cls = this.helpers.getPokemonImageClass();

            // search whatever you want to find in the shelter & grid

            if(this.globalSettings.shelterFeatureEnables.sort) {
            //sort in grid
                this.jQuery('#shelterarea').removeClass('qolshelterareagrid');
                this.jQuery('.mq2 #shelterarea').removeClass('qolshelterareagridmq2');
                this.jQuery('#shelterarea .tooltip_content').removeClass('qoltooltipgrid');
                this.jQuery('#shelterpage #shelter #shelterarea > .pokemon').removeClass('qolpokemongrid');
                this.jQuery('#sheltergridthingy').remove();

                if (this.settings.shelterGrid === true) { //shelter grid
                    this.jQuery('#shelterarea').addClass('qolshelterareagrid');
                    this.jQuery('.mq2 #shelterarea').addClass('qolshelterareagridmq2');
                    this.jQuery('#shelterarea .tooltip_content').addClass('qoltooltipgrid');
                    this.jQuery('#shelterpage #shelter #shelterarea > .pokemon').addClass('qolpokemongrid');
                    this.jQuery('head').append('<style id="sheltergridthingy">#shelterarea:before{display:none !important;}</style>');
                }
            }

            if(this.globalSettings.shelterFeatureEnables.search) {
                /*
                 * search values depending on settings
                 * emptying the sheltersuccess div to avoid duplicates
                 */
                document.querySelector('#sheltersuccess').innerHTML = '';
                this.jQuery('#shelterarea>div>img').removeClass('shelterfoundme');

                if (this.settings.findShiny === true) {
                    this.searchForImgTitle(GLOBALS, 'findShiny');
                }
                if (this.settings.findAlbino === true) {
                    this.searchForImgTitle(GLOBALS, 'findAlbino');
                }
                if (this.settings.findMelanistic === true) {
                    this.searchForImgTitle(GLOBALS, 'findMelanistic');
                }
                if (this.settings.findPrehistoric === true) {
                    this.searchForImgTitle(GLOBALS, 'findPrehistoric');
                }
                if (this.settings.findDelta === true) {
                    this.searchForImgTitle(GLOBALS, 'findDelta');
                }
                if (this.settings.findMega === true) {
                    this.searchForImgTitle(GLOBALS, 'findMega');
                }
                if (this.settings.findStarter === true) {
                    this.searchForImgTitle(GLOBALS, 'findStarter');
                }
                if (this.settings.findCustomSprite === true) {
                    this.searchForImgTitle(GLOBALS, 'findCustomSprite');
                }
                if (this.settings.findLegendary === true) {
                    this.searchForTooltipText(GLOBALS, 'findLegendary');
                }

                if (this.settings.findNewPokemon === true) {
                    const key = 'findNewPokemon';
                    const value = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 1];
                    const selected = this.jQuery('#shelterarea .tooltip_content:contains(' + value + ')');
                    if (selected.length) {
                        const searchResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 2];
                        const imgFitResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 3];
                        const tooltipResult = selected.length + ' ' + searchResult;
                        const shelterImgSearch = selected;
                        const shelterBigImg = shelterImgSearch.prev().children(`img.${cls}`);
                        this.jQuery(shelterBigImg).addClass('shelterfoundme');

                        this.insertShelterFoundDiv(selected.length, tooltipResult, imgFitResult);
                    }
                }

                if (this.settings.findNewEgg === true) {
                    const key = 'findNewEgg';
                    const value = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 1];
                    const selected = this.jQuery('#shelterarea .tooltip_content:contains(' + value + ')').filter(function () {
                        // .text() will include the text in the View/Adopt and Hide buttons, so there will be a space
                        return obj.jQuery(this).text().startsWith(value + ' ');
                    });

                    if (selected.length) {
                        const searchResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 2];
                        const imgFitResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 3];
                        if (selected.length >= 1) {
                            const shelterImgSearch = selected;
                            const shelterBigImg = shelterImgSearch.prev().children(`img.${cls}`);
                            this.jQuery(shelterBigImg).addClass('shelterfoundme');
                        }
                        this.insertShelterFoundDiv(selected.length, searchResult, imgFitResult);
                    }
                }

                //loop to find all search genders for the custom
                const shelterValueArrayCustom = [];
                for (const key in this.settings) {
                    const value = this.settings[key];
                    if (value === true) {
                        if (key === 'findMale' || key === 'findFemale' || key === 'findNoGender') {
                            const searchKey = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(key) + 1];
                            shelterValueArrayCustom.push(searchKey);
                        }
                    }
                }

                //loop to find all the custom search parameters
                const customSearchAmount = this.customArray.length;
                const heartPng = '<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952">';
                const eggPng = '<img src="//pfq-static.com/img/pkmn/egg.png/t=1451852195">';
                for (let i = 0; i < customSearchAmount; i++) {
                    const customValue = this.customArray[i];
                    if (customValue != '') {
                        //custom pokemon search
                        if (this.settings.customPokemon === true) {
                            const genderMatches = [];
                            if (shelterValueArrayCustom.indexOf('[M]') > -1) {
                                genderMatches.push('[M]');
                            }
                            if (shelterValueArrayCustom.indexOf('[F]') > -1) {
                                genderMatches.push('[F]');
                            }
                            if (shelterValueArrayCustom.indexOf('[N]') > -1) {
                                genderMatches.push('[N]');
                            }

                            if (genderMatches.length > 0) {
                                for (let i = 0; i < genderMatches.length; i++) {
                                    const genderMatch = genderMatches[i];
                                    const selected = this.jQuery('#shelterarea .tooltip_content:containsIN(' + customValue + ') img[title*=\'' + genderMatch + '\']');
                                    if (selected.length) {
                                        const searchResult = customValue;
                                        const genderName = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(genderMatch) + 1];
                                        const imgGender = GLOBALS.SHELTER_SEARCH_DATA[GLOBALS.SHELTER_SEARCH_DATA.indexOf(genderMatch) + 2];
                                        const tooltipResult = selected.length + ' ' + genderName + imgGender + ' ' + searchResult;
                                        const shelterImgSearch = selected;
                                        const shelterBigImg = shelterImgSearch.parent().prev().children(`img.${cls}`);
                                        this.jQuery(shelterBigImg).addClass('shelterfoundme');

                                        this.insertShelterFoundDiv(selected.length, tooltipResult, heartPng);
                                    }
                                }
                            }

                            //No genders
                            else if (shelterValueArrayCustom.length === 0) {
                                const selected = this.jQuery('#shelterarea .tooltip_content:containsIN(' + customValue + '):not(:containsIN("Egg"))');
                                if (selected.length) {
                                    const searchResult = customValue;
                                    const tooltipResult = selected.length + ' ' + searchResult;
                                    const shelterImgSearch = selected;
                                    const shelterBigImg = shelterImgSearch.parent().prev().children(`img.${cls}`);
                                    this.jQuery(shelterBigImg).addClass('shelterfoundme');
                                    this.insertShelterFoundDiv(selected.length, tooltipResult, heartPng);
                                }
                            }
                        }

                        //custom egg
                        if (this.settings.customEgg === true) {
                            const selected = this.jQuery('#shelterarea .tooltip_content:containsIN(' + customValue + '):contains("Egg")');
                            if (selected.length) {
                                const searchResult = customValue;
                                const tooltipResult = selected.length + ' ' + searchResult;
                                const shelterImgSearch = selected;
                                const shelterBigImg = shelterImgSearch.prev().children(`img.${cls}`);
                                this.jQuery(shelterBigImg).addClass('shelterfoundme');
                                this.insertShelterFoundDiv(selected.length, tooltipResult, eggPng);
                            }
                        }

                        //imgSearch with Pokémon
                        if (this.settings.customPng === true) {
                            const selected = this.jQuery(`#shelterarea img.${cls}[src*="${customValue}"]`);
                            if (selected.length) {
                                const searchResult = selected.parent().next().text().split('(')[0];
                                const tooltipResult = selected.length + ' ' + searchResult + ' (Custom img search)';
                                const shelterImgSearch = selected;
                                this.jQuery(shelterImgSearch).addClass('shelterfoundme');
                                this.insertShelterFoundDiv(selected.length, tooltipResult, heartPng);
                            }
                        }
                    }
                }

                //loop to find all the types

                const filteredTypeArray = this.typeArray.filter(v => v != '');

                if (filteredTypeArray.length > 0) {
                    obj.searchForTypes(GLOBALS, filteredTypeArray);
                }
            }
        } // customSearch
    }


    // eslint-disable-next-line no-unused-vars
    class WishforgePage extends Page {
        constructor(jQuery, localStorageMgr, helpers, GLOBALS) {
            super(jQuery, localStorageMgr, helpers, GLOBALS.WISHFORGE_PAGE_SETTINGS_KEY, {}, 'forge');
            const obj = this;
            this.observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if(mutation.type === 'childList' && mutation.addedNodes.length) {
                        obj.setupHTML(GLOBALS);
                    }
                });
            });
        } // constructor

        setupHTML(GLOBALS) {
            const obj = this;
            // setup table format
            const header = '<th>Type</th> <th>Level</th> <th>Gem Progress</th> <th>Item</th> <th>Upgrade</th> <th>Notify</th>';

            // use GLOBALS.TYPE_LIST to get list of types
            const types = GLOBALS.TYPE_LIST;

            // build HTML table
            const rows = {};
            for (let i = 0; i < types.length; i++) {
                rows[types[i]] = `<td>${types[i]}</td> <td></td> <td></td> <td></td> <td></td> <td></td>`;
            }
            let table = '<table style="width: 100%">' +
            '<colgroup>' +
            '<col span="1" style="width: 10%;">' +
            '<col span="1" style="width: 20%;">' +
            '<col span="1" style="width: 20%;">' +
            '<col span="1" style="width: 20%;">' +
            '<col span="1" style="width: 10%;">' +
            '<col span="1" style="width: 10%;">' +
            '</colgroup>' +
            `<tr id="head"> ${header}</tr>`;
            for (let i = 0; i < types.length; i++) {
                table += `<tr id=${types[i]}> ${rows[types[i]]} </tr>`;
            }
            table += '</table>';

            // add table to page
            const craftedBadgesList = obj.jQuery('#badges').next().find('ul.badgelist');
            craftedBadgesList.prepend(table);

            // define column aliases to make the movements more logical
            const LEVEL_COL = 2;
            const GEM_COL = 3;
            const ITEM_COL = 4;
            const UPDATE_COL = 5;
            const NOTIFY_COL = 6;

            // move elements from original elements to table
            for (let j = 0; j < types.length; j++) {
                const type = types[j];
                const index = j + 1;
                const li = obj.jQuery(craftedBadgesList.children()[index]);

                // get badge image
                const badgeImg = obj.jQuery(obj.jQuery(li.children()[0]).children()[0]);
                badgeImg.appendTo(`tr#${type}>td:nth-child(${LEVEL_COL})`);

                // get badge name
                const badgeName = obj.jQuery(li.children()[0]);
                badgeName.text(' ' + badgeName.text().replace(` ${type} Badge`, ''));
                badgeName.css('display', 'inline-block');
                badgeName.appendTo(`tr#${type}>td:nth-child(${LEVEL_COL})`);

                // get gem progress bar
                const gemProgress = obj.jQuery(li.children()[0]);
                gemProgress.appendTo(`tr#${type}>td:nth-child(${GEM_COL})`);

                // if the badge is under construction, the tooltip will not be there
                if(obj.jQuery(li.children()[0]).hasClass('itemtooltip')) {
                    const gemTooltip = obj.jQuery(li.children()[0]);
                    gemTooltip.appendTo(`tr#${type}>td:nth-child(${GEM_COL})`);
                }

                // get item progress bar
                const itemProgress = obj.jQuery(li.children()[0]);
                itemProgress.appendTo(`tr#${type}>td:nth-child(${ITEM_COL})`);

                // if the badge is under construction, the tooltip will not be there
                if(obj.jQuery(li.children()[0]).hasClass('itemtooltip')) {
                    const itemTooltip = obj.jQuery(li.children()[0]);
                    itemTooltip.appendTo(`tr#${type}>td:nth-child(${ITEM_COL})`);
                }

                // get notify button
                const notifyBtn = obj.jQuery(li.children()[0]);
                notifyBtn.appendTo(`tr#${type}>td:nth-child(${NOTIFY_COL})`);

                // get upgrade button
                const updateBtn = obj.jQuery(li.children()[0]);
                updateBtn.appendTo(`tr#${type}>td:nth-child(${UPDATE_COL})`);
            }

            // remove the li's left over
            const children = craftedBadgesList.children();
            for (let i = types.length; i >= 1; i--) {
                obj.jQuery(children[i]).remove();
            }
        }

        setupObserver() {
            const obj = this;
            const target = obj.jQuery('#badges').next('div')[0];
            this.observer.observe(target, {
                childList: true
            });
        }
    }

    // eslint-disable-next-line no-unused-vars
    class PagesManager {
        constructor(jQuery, localStorageMgr, globals, HELPERS, SETTINGS) {
            this.jQuery = jQuery;
            this.localStorageMgr = localStorageMgr;
            this.GLOBALS = globals;
            this.HELPERS = HELPERS;
            this.SETTINGS = SETTINGS;
            this.pages = {
                'Daycare': {
                    class: DaycarePage,
                    object: undefined,
                    setting: 'enableDaycare'
                },
                'Farm': {
                    class: FarmPage,
                    object: undefined,
                    setting: 'easyEvolve'
                },
                'Fishing': {
                    class: FishingPage,
                    object: undefined,
                    setting: 'fishingEnable'
                },
                'Lab': {
                    class: LabPage,
                    object: undefined,
                    setting: 'labNotifier'
                },
                'Multiuser': {
                    class: MultiuserPage,
                    object: undefined,
                    setting: 'partyMod'
                },
                'PrivateFields': {
                    class: PrivateFieldsPage,
                    object: undefined,
                    setting: 'privateFieldEnable'
                },
                'PublicFields': {
                    class: PublicFieldsPage,
                    object: undefined,
                    setting: 'publicFieldEnable'
                },
                'Shelter': {
                    class: ShelterPage,
                    object: undefined,
                    setting: 'shelterEnable'
                },
                'Dex': {
                    class: DexPage,
                    object: undefined,
                    setting: 'dexFilterEnable'
                },
                'Wishforge': {
                    class: WishforgePage,
                    object: undefined,
                    setting: 'condenseWishforge'
                },
            };
        }
        instantiatePages(QOLHUB) {
            for (const key of Object.keys(this.pages)) {
                const pg = this.pages[key];
                if (QOLHUB.USER_SETTINGS[pg.setting] === true) {
                    this.pages[key].object = new this.pages[key].class(this.jQuery, this.localStorageMgr, this.HELPERS, this.GLOBALS, this.SETTINGS);
                }
            }
        }
        loadSettings(QOLHUB) {
            for (const key of Object.keys(this.pages)) {
                const pg = this.pages[key];
                if (QOLHUB.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                    pg.object.loadSettings();
                }
            }
        }
        saveSettings(QOLHUB) {
            for (const key of Object.keys(this.pages)) {
                const pg = this.pages[key];
                if (QOLHUB.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                    pg.object.saveSettings();
                }
            }
        }
        populateSettings(QOLHUB) {
            for (const key of Object.keys(this.pages)) {
                const pg = this.pages[key];
                if (QOLHUB.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                    pg.object.populateSettings();
                }
            }
        }
        clearPageSettings(pageName) {
            if (!(pageName in this.pages)) {
                console.error(`Could not proceed with clearing page settings. Page ${pageName} not found in list of pages`);
            } else if (this.pages[pageName].object) {
                this.pages[pageName].object.resetSettings();
            }
        }
        setupHTML(GLOBALS, QOLHUB) {
            for (const key of Object.keys(this.pages)) {
                const pg = this.pages[key];
                if (QOLHUB.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                    pg.object.setupHTML(GLOBALS);
                }
            }
        }
        setupCSS(QOLHUB) {
            for (const key of Object.keys(this.pages)) {
                const pg = this.pages[key];
                if (QOLHUB.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                    pg.object.setupCSS();
                }
            }
        }
        setupObservers(QOLHUB) {
            for (const key of Object.keys(this.pages)) {
                const pg = this.pages[key];
                if (QOLHUB.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                    pg.object.setupObserver();
                }
            }
        }
        setupHandlers(GLOBALS, QOLHUB) {
            for (const key of Object.keys(this.pages)) {
                const pg = this.pages[key];
                if (QOLHUB.USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                    pg.object.setupHandlers(GLOBALS);
                }
            }
        }
    }

    // eslint-disable-next-line no-unused-vars
    class PFQoLBase {
        constructor($) {
        // :contains to case insensitive
            $.extend($.expr[':'], {
            // eslint-disable-next-line no-unused-vars
                'containsIN': function (elem, i, match, array) {
                    return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || '').toLowerCase()) >= 0;
                }
            });

            this.jQuery = $;
            this.HELPERS = new Helpers();
            this.LOCAL_STORAGE_MANAGER = new LocalStorageManager($.USERID, localStorage, this.HELPERS);
            this.LOCAL_STORAGE_MANAGER.migrateSettings();

            this.SETTINGS = new UserSettings();
            this.GLOBALS = new Globals(this.jQuery, this.LOCAL_STORAGE_MANAGER, this.HELPERS);
            this.RESOURCES = new Resources();
            this.PAGES = new PagesManager(this.jQuery, this.LOCAL_STORAGE_MANAGER, this.GLOBALS, this.HELPERS, this.SETTINGS);
            this.QOLHUB = new QoLHub(this.jQuery, this.LOCAL_STORAGE_MANAGER, this.HELPERS, this.GLOBALS, this.PAGES, this.SETTINGS);
            this.GLOBALS.fillTemplates(this.RESOURCES);
            this.GLOBALS.fillOptionsLists();

            this.init();
        }
        instantiatePages(obj) {
            obj.PAGES.instantiatePages(obj.QOLHUB);
        }
        loadSettings(obj) { // initial settings on first run and setting the variable settings key
            obj.QOLHUB.loadSettings();
            obj.PAGES.loadSettings(obj.QOLHUB);
        } // loadSettings
        saveSettings() { // Save changed settings
            this.QOLHUB.saveSettings();
            this.PAGES.saveSettings(this.QOLHUB);
        } // saveSettings
        populateSettingsPage(obj) { // checks all settings checkboxes that are true in the settings
            obj.QOLHUB.populateSettings();
            obj.PAGES.populateSettings(obj.QOLHUB);
        }
        setupHTML(obj) { // injects the HTML changes from GLOBALS.TEMPLATES into the site
        // Header link to Userscript settings
            document.querySelector('li[data-name*=\'Lucky Egg\']')
                .insertAdjacentHTML('afterend', obj.GLOBALS.TEMPLATES.qolHubLinkHTML);
            obj.PAGES.setupHTML(obj.GLOBALS, obj.QOLHUB);
        }
        setupCSS(obj) { // All the CSS changes are added here
            addGlobalStyle(obj.RESOURCES.css());
            obj.PAGES.setupCSS(obj.QOLHUB);
            obj.QOLHUB.setupCSS();
        }
        setupObservers(obj) { // all the Observers that needs to run
            obj.PAGES.setupObservers(obj.QOLHUB);
        }
        setupHandlers(obj) { // all the event handlers
            obj.jQuery(document).on('click', 'li[data-name="QoL"]', (function () { //open QoL hub
                obj.QOLHUB.build(document);
                obj.populateSettingsPage(obj);
            }));
            obj.QOLHUB.setupHandlers();
            obj.PAGES.setupHandlers(obj.GLOBALS, obj.QOLHUB);
        }
        startup() { // All the functions that are run to start the script on Pokéfarm
            return {
                'creating Page handlers': this.instantiatePages,
                'loading Settings': this.loadSettings,
                'setting up HTML': this.setupHTML,
                'populating Settings': this.populateSettingsPage,
                'setting up CSS': this.setupCSS,
                'setting up Observers': this.setupObservers,
                'setting up Handlers': this.setupHandlers,
            };
        }
        init() { // Starts all the functions.
            console.log('Starting up ..');
            const startup = this.startup();
            for (const message in startup) {
                if (Object.hasOwnProperty.call(startup, message)) {
                    console.log(message);
                    startup[message](this, this.GLOBALS);
                }
            }
        }
    }
    /**
     * This class is used to store CSS and HTML snippets that were previously loaded via Tampermonkey's '@resource' tool
     */

    // eslint-disable-next-line no-unused-vars
    class Resources extends ResourcesBase {
        constructor() {
            super();
        }
    }

    // eslint-disable-next-line no-unused-vars
    class Globals extends GlobalsBase {
        constructor(jQuery, localStorageMgr, helpers) {
            super(helpers);
            this.jQuery = jQuery;
            this.localStorageMgr = localStorageMgr;
        }
    }


    // eslint-disable-next-line no-unused-vars
    class LocalStorageManager extends LocalStorageManagerBase {
        constructor(keyPrefix, storage, helpers) {
            super(keyPrefix, storage, helpers);
        }
    }
    /*
     * This class handles creating, removing, and handling the DOM object actions
     * for the QoL Hub.
     */

    // eslint-disable-next-line no-unused-vars
    class QoLHub extends QoLHubBase {
        constructor(jQuery, localStorageMgr, HELPERS, GLOBALS, PAGES, DEFAULT_SETTINGS, SETTINGS) {
            super(jQuery, localStorageMgr, HELPERS, GLOBALS, PAGES, DEFAULT_SETTINGS, SETTINGS);
        }
        resetDex() {
            this.jQuery('#clearCachedDex').next().remove();
            this.GLOBALS.DEX_UPDATE_DATE = null;
            this.GLOBALS.DEX_DATA = null;
            this.localStorageMgr.removeItem(this.GLOBALS.POKEDEX_DATA_KEY);
            this.jQuery('#clearCachedDex').after('<span> Cleared!</span>');
        }
        build(document) {
            super.build(document);

            const dexUpdateRowContents = `<td colspan="2" class="qolAllSettings">
          <span>Notice that you can't find the newly added Eggs or Pokemon in shelter?
          You may have to update your pokedex. Please visit the Dex page, and the Userscript will update itself with
          the newest pokemon. Then, in order to use the update, refresh the page where you are using the script's search features.</span><br>
          <span>Date last updated:<span class="qolDate">""</span></span>
          </td>`;
            this.jQuery('#qolDexUpdateRow').append(dexUpdateRowContents);

            const dexUpdateDate = (this.GLOBALS.DEX_UPDATE_DATE === null) ?
                'Not updated since installation' :
                this.GLOBALS.DEX_UPDATE_DATE;
            this.jQuery('.qolDate', document).text(dexUpdateDate);

        }
    } // QoLHub

    // eslint-disable-next-line no-unused-vars
    class ShelterPage extends ShelterPageBase {
        constructor(jQuery, localStorageMgr, HELPERS, GLOBALS, settings) {
            super(jQuery, localStorageMgr, HELPERS, GLOBALS, settings);
        }
    }

    // eslint-disable-next-line no-unused-vars
    class PrivateFieldsPage extends PrivateFieldsPageBase {
        constructor(jQuery, localStorageMgr, HELPERS, GLOBALS, settings) {
            super(jQuery, localStorageMgr, HELPERS, GLOBALS, settings);
        }
    }

    // eslint-disable-next-line no-unused-vars
    class LabPage extends LabPageBase {}

    // eslint-disable-next-line no-unused-vars
    class FarmPage extends FarmPageBase {
        constructor(jQuery, localStorageMgr, helpers, GLOBALS, externals) {
            super(jQuery, localStorageMgr, helpers, GLOBALS, externals);
        }
        easyEvolveTypeList(GLOBALS) {
            const obj = this;
            const dexData = GLOBALS.DEX_DATA;

            this.clearSortedEvolveLists();

            const typeBackground = obj.jQuery('.panel>h3').css('background-color');
            obj.jQuery('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
            document.querySelector('#farmnews-evolutions>.scrollable').insertAdjacentHTML('afterbegin', GLOBALS.TEMPLATES.evolveFastHTML);

            const typeBorder = obj.jQuery('.panel>h3').css('border');
            const typeColor = obj.jQuery('.panel>h3').css('color');
            obj.jQuery('.expandlist').css('background-color', '' + typeBackground + '');
            obj.jQuery('.expandlist').css('border', '' + typeBorder + '');
            obj.jQuery('.expandlist').css('color', '' + typeColor + '');

            const typeListBackground = obj.jQuery('.tabbed_interface>div').css('background-color');
            const typeListColor = obj.jQuery('.tabbed_interface>div').css('color');
            obj.jQuery('.qolChangeLogContent').css('background-color', '' + typeListBackground + '');
            obj.jQuery('.qolChangeLogContent').css('color', '' + typeListColor + '');

            /* Nested helper function */
            const getEvolutionOrigin = function (evoString) {
                const summary = '/summary/';
                const originStart = evoString.indexOf(summary) + summary.length + 7;
                const originEnd = evoString.indexOf('</a>');
                return evoString.substring(originStart, originEnd);
            };

            const getEvolutionDestination = function (evoString) {
                const destStart = evoString.indexOf('into</span>') + 'into</span>'.length;
                return evoString.substr(destStart).trim();
            };

            const appendDeltaTypeIfDelta = function ($, evoString, elemToAppendTo) {
                if (evoString.includes('title="[DELTA')) {
                    const deltaType = evoString.match('DELTA-(.*)]">');
                    $(elemToAppendTo).clone().appendTo(obj.settings.TYPE_APPEND[deltaType[1]]);
                }
            };

            obj.jQuery('#farmnews-evolutions>.scrollable>.evolvepkmnlist>Li').each(function () {
            // getting the <li> element from the pokemon & the pokemon evolved name
                const getEvolveString = obj.jQuery(this).html();
                let previousPokemon = getEvolutionOrigin(getEvolveString);
                const evolvePokemon = getEvolutionDestination(getEvolveString);

                // Handle unicode characters
                previousPokemon = previousPokemon
                    .replace(/é/g, '\\u00e9')
                    .replace(/í/g, '\\u00ed')
                    .replace(/ñ/g, '\\u00f1');

                // Handle evolvePokemon name formatting
                let evolveFormatted = evolvePokemon.replace(' [', '/');
                evolveFormatted = evolveFormatted.replace(']', '');

                const previousIndex = dexData.indexOf('"' + previousPokemon + '"');
                const evolveIndex = dexData.indexOf('"' + evolveFormatted + '"');

                const previousInDex = previousIndex != -1;
                const evolveInDex = evolveIndex != -1;
                const evolveInExceptions = evolvePokemon in obj.settings.KNOWN_EXCEPTIONS;
                let evolveTypesPrevious = [];
                let evolveTypes = [];

                /*
                 * Procedure
                 * 1. If the evolution destination is in the known exceptions list
                 *    a. Load the types from KNOWN_EXCEPTIONS
                 * 2. Else:
                 *    a. If the evolution origin is in the dex, load the types from the dex
                 *    b. If the evolution origin is not in the dex, mark the type as '18' (not a valid type)
                 *    c. If the destination pokemon is in the dex, load the types from the dex
                 *    d. Else, mark the type as '18' (not a valid type)
                 * 3. Use types to apply HTML classes to the list item that contains the current evolution
                 *    a. Use the evolution origin's and destination's types as HTML classes
                 *    b. If the origin pokemon is a Delta mon, use the delta type as an HTML class as well
                 */

                if(evolveInExceptions) {
                    evolveTypes = obj.settings.KNOWN_EXCEPTIONS[evolvePokemon].map((t) => '' + t);
                    // short circuit the previous pokemon's types, since the KNOWN_EXCEPTIONS table will have everything
                    evolveTypesPrevious = evolveTypes;
                }
                else {
                    if (previousInDex) {
                        evolveTypesPrevious = [1, 2].map((i) => dexData[previousIndex + i]);
                    }
                    else {
                        evolveTypesPrevious = ['18', '-1'];
                    }

                    if (evolveInDex) {
                        evolveTypes = [1, 2].map((i) => dexData[evolveIndex + i]);
                    }
                    else {
                        evolveTypes = ['18', '-1'];
                    }
                }

                /*
                 * the evolveTypes and evolveTypesPrevious entries can begin with a '.'
                 * in some cases. Just strip it off
                 */
                evolveTypesPrevious = evolveTypesPrevious.map((t) => t.replace('.', ''));
                evolveTypes = evolveTypes.map((t) => t.replace('.', ''));

                // filter out invalid 2nd types (will be -1)
                evolveTypesPrevious = evolveTypesPrevious.filter((t) => t !== '-1');
                evolveTypes = evolveTypes.filter((t) => t !== '-1');

                // append types to DOM
                const elem = this;
                // add unknown source types
                if(evolveTypesPrevious   .includes('18')) {
                    obj.jQuery(elem).clone().appendTo('.18source');
                }
                // add unknown target types
                if(evolveTypes.includes('18')) {
                    obj.jQuery(elem).clone().appendTo('.18target');
                }
                const combinedValidTypes = [...evolveTypesPrevious, ...evolveTypes]
                    .filter((t, i, self) => t != '18' && self.indexOf(t) === i);
                combinedValidTypes.map((t) => {
                    obj.jQuery(elem).clone().appendTo(`.${t}`);
                });

                appendDeltaTypeIfDelta(obj.jQuery, getEvolveString, this);
            }); // each

            obj.jQuery('#farmnews-evolutions>.scrollable>.qolEvolveTypeList>Li').each(function () {
                const amountOfEvolves = obj.jQuery(this).children().children().length;
                const evolveTypeName = obj.jQuery(this).children('.slidermenu').html();

                // hide the types with no evolutions
                if (amountOfEvolves === 0) {
                    this.nextSibling.hidden = true;
                    this.hidden = true;
                } else {
                    obj.jQuery(this).children('.slidermenu').html(evolveTypeName + ' (' + amountOfEvolves + ')');
                }
            });

            obj.jQuery('.evolvepkmnlist').hide();
        }
    }

    // eslint-disable-next-line no-unused-vars
    class DexPage extends DexPageBase {
        constructor(jQuery, localStorageMgr, helpers, GLOBALS) {
            super(jQuery, localStorageMgr, helpers, GLOBALS);

            /*
             * when entering the dex page, update the local storage QoLPokedex
             * so the user can update their information
             */
            if (jQuery('script#dexdata') && jQuery('script#dexdata').text()) {
                const text = jQuery('script#dexdata').text();
                GLOBALS.DEX_DATA = text.split(',');
                this.localStorageMgr.updateLocalStorageDex(this.jQuery, document, undefined, GLOBALS);
            }
        }
    }

    // eslint-disable-next-line no-unused-vars
    class PFQoL extends PFQoLBase {
        constructor($) {
            super($);
            /*
             * set GLOBALS.DEX_DATA and GLOBALS.DEX_UPDATE_DATE
             * GLOBALS.DEX_DATA is the data loaded directly from the script contained in
             * the pokefarm.com/dex HTML. It contains the list of pokemon, and for each:
             * - their types
             * - if they hatch from an egg,
             * - if you have the eggdex, and
             * - if you have the regular, shiny, albino, and melanistic pokedex entries
             */
            this.LOCAL_STORAGE_MANAGER.loadDexIntoGlobalsFromStorage(this.GLOBALS);
        }
    }

    if (typeof(module) !== 'undefined') {
        module.exports.pfqol = PFQoL;
    } else {
    // eslint-disable-next-line no-undef
        new PFQoL(jQuery);
    }});