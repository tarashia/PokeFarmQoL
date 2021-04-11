// ==UserScript==
// @name         Poké Farm QoL
// @namespace    https://github.com/jpgualdarrama/
// @author       Bentomon
// @homepage     https://github.com/jpgualdarrama/PokeFarmQoL
// @downloadURL  https://github.com/jpgualdarrama/PokeFarmQoL/raw/issue_70/Poke-Farm-QoL.user.js
// @updateURL    https://github.com/jpgualdarrama/PokeFarmQoL/raw/issue_70/Poke-Farm-QoL.user.js
// @description  Quality of Life changes to Pokéfarm!
// @version      1.6.8
// @match        https://pokefarm.com/*
// @connect      github.com
// ==/UserScript==
/** TamperMonkey polyfill to replace GM_addStyle function */
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
class ResourcesBase {
    css() {
        return `/* Pokefarm QoL style sheet */

        /* Announcement bar */
        
        #announcements li[data-name="QoL"] {
            cursor: pointer;
        }
        
        /* Shelter Page */
        
        /* tooltip */
        
        .tooltip {
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
            padding: 4px;
            border-radius: 4px;
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
        
        .qolpartyclickalot {
            position: absolute!important;
            background-color: transparent!important;
            border: none!important;
            left: 300px!important;
            top: 500px!important;
        }
        
        .qolpartyclickz {
            z-index: 100!important;
        }
        
        .qolpartyclicknav {
            position: absolute!important;
            left: 300px!important;
            top: 500px!important;
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
            <h4>Advanced Field search</h4>
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
            <div class="tooltip">Custom Search Help
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
        <h4>Advanced Field search</h4>
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
        <div class="tooltip">Custom Search Help
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
        <div class="tooltip">Custom Search Help
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
                                <input type='checkbox' class='qolsetting' data-key='enableDaycare'/>
                                <span>
                                  Highlight Breeding Matches
                                </span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input type="checkbox" class="qolsetting" data-key="shelterEnable"/>
                                <span>
                                  Advanced Shelter Search
                                </span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input type="checkbox" class="qolsetting" data-key="fishingEnable"/>
                                <span>
                                  Release/Fishing select all
                                </span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input type="checkbox" class="qolsetting" data-key="publicFieldEnable"/>
                                <span>
                                  Sort & Search Fields (Public View)
                                </span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input type="checkbox" class="qolsetting" data-key="privateFieldEnable"/>
                                <span>
                                  Search Fields (Private View)
                                </span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input type="checkbox" class="qolsetting" data-key="partyMod"/>
                                <span>
                                  Party click mod
                                </span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input type="checkbox" class="qolsetting" data-key="easyEvolve"/>
                                <span>
                                  Easy evolving
                                </span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input type="checkbox" class="qolsetting" data-key="labNotifier"/>
                                <span>
                                  Lab Notifier
                                </span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input type="checkbox" class="qolsetting" data-key="dexFilterEnable"/>
                                <span>
                                  Multiple Types Filtering
                                </span>
                              </label>
                            </li>
                            <li>
                              <label>
                                <input type="checkbox" class="qolsetting" data-key="condenseWishforge"/>
                                <span>
                                  Smaller Crafted Badges List
                                </span>
                              </label>
                            </li>
                          </ul>
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
/**
 * This class is used to store CSS and HTML snippets that were previously loaded via Tampermonkey's '@resource' tool
 */

class Resources extends ResourcesBase {
    constructor() {
        super();
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
          </tbody>
        </table>
        <h4>Search on evolutions</h4>
        <span>Highlight pokemon based on evolution data. Make sure to use the <i>Update Pokedex</i> button in the QoL Hub to load evolution data.</span>
        <div class="tooltip">Note
          <span class="tooltiptext">
            Currently, these buttons may not highlight pokemon with multiple forms correctly. This is due to the form of a pokemon not being readily available in the text on the shelter page before clicking "Adopt" on the pokemon.
            <br>
            There is a work-around for this, but it has not been implemented yet.
          </span>
        </div>
        <table>
          <tbody>
            <tr>
          <td colspan="2">
            <label>
              <input type="checkbox" class="qolsetting" data-key="findReadyToEvolve"/>Ready to Evolve (by Level)
            </label>
          </td>
            </tr>
            <tr>
              <td colspan="2">
                <label>
                  <input type="checkbox" class="qolsetting" data-key="findNFE"/>
                  <div class="tooltip">Evolutions Left
                    <span class="tooltiptext">
                      Pokemon with one evolution left are highlighted in red
                      <br>
                      Pokemon with two evolutions left are highlighted in blue
                    </span>
                  </div>
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
        <div class="tooltip">Custom Search Help
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

    privateFieldSearchHTML() {
        return `<div id ="fieldsearch">
      <h4>Advanced Field search</h4>
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
            <td>
              <label>
                <input type="checkbox" class="qolsetting" data-key="fieldNFE"/>
                <div class="tooltip">Evolutions Left
                  <span class="tooltiptext">
                    Pokemon with one evolution left are highlighted in red
                    <br>
                    Pokemon with two evolutions left are highlighted in blue
                  </span>
                </div>
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
      <div class="tooltip">Custom Search Help
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
    </div>`;
    }
}
class Helpers {
    static buildOptionsString(arr) {
        let str = '<option value="none">None</option> ';
        for (let i = 0; i < arr.length; i++) {
            str += `<option value="${i}">${arr[i]}</option> `;
        }
        return str;
    }
    static toggleSetting(key, set) {
        // update values for checkboxes
        if (typeof set === 'boolean') {
            const element = document.querySelector(`.qolsetting[data-key="${key}"]`);
            if (element && element.type === 'checkbox') {
                element.checked = set;
            }
        }
    } // toggleSetting
    static setupFieldArrayHTML($, arr, id, div, cls) {
        const n = arr.length;
        for (let i = 0; i < n; i++) {
            const rightDiv = i + 1;
            const rightValue = arr[i];
            $(`#${id}`).append(div);
            $(`.${cls}`).removeClass(cls).addClass('' + rightDiv + '').find('.qolsetting').val(rightValue);
        }
    }
    static loadSettings($, KEY, DEFAULT, obj) {
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
    static saveSettings(key, obj) {
        localStorage.setItem(key, JSON.stringify(obj));
    }
    static textSearchDiv(cls, dataKey, id, arrayName) {
        return `<div class='${cls}'><label><input type="text" class="qolsetting" data-key="${dataKey}" ` +
            `array-name='${arrayName}'` +
            `/></label><input type='button' value='Remove' id='${id}'></div>`;
    }
    static selectSearchDiv(cls, name, dataKey, options, id, divParent, arrayName) {
        return `<div class='${cls}'> <select name='${name}' class="qolsetting" data-key='${dataKey}' ` +
            `array-name='${arrayName}'> ${options} </select> <input type='button' value='Remove' id='${id}'> </div>`;
    }
    static parseFieldPokemonTooltip($, GLOBALS, tooltip) {
        const dataElements = $(tooltip).children(0).children();
        let index = 1;
        // nickname
        const nickname = dataElements[index].textContent;
        if (!nickname) {
            console.error(`Helpers.parseFieldPokemonTooltip - nickname '${nickname}' (is not a valid name)`);
        }
        index++;

        // Issue #59 - Pokefarm added a new h3 element after the nickname
        // that contains no data
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
        const typeElements = $(dataElements[index]).children().slice(1,);
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
}

class GlobalsBase {
    fillTemplates(TEMPLATES) {
        this.TEMPLATES.shelterOptionsHTML         = TEMPLATES.shelterOptionsHTML();
        this.TEMPLATES.fieldSortHTML              = TEMPLATES.fieldSortHTML();
        this.TEMPLATES.fieldSearchHTML            = TEMPLATES.fieldSearchHTML();
        this.TEMPLATES.privateFieldSearchHTML     = TEMPLATES.privateFieldSearchHTML();
        this.TEMPLATES.qolHubHTML                 = TEMPLATES.qolHubHTML();
        this.TEMPLATES.evolveFastHTML             = TEMPLATES.evolveFastHTML();
        this.TEMPLATES.labOptionsHTML             = TEMPLATES.labOptionsHTML();
        this.TEMPLATES.publicFieldTooltipModHTML  = TEMPLATES.publicFieldTooltipModHTML();
        this.TEMPLATES.privateFieldTooltipModHTML = TEMPLATES.privateFieldTooltipModHTML();
    }
    fillOptionsLists() {
        this.TYPE_OPTIONS = Helpers.buildOptionsString(this.TYPE_LIST);
        this.NATURE_OPTIONS = Helpers.buildOptionsString(this.NATURE_LIST);
        this.EGG_GROUP_OPTIONS = Helpers.buildOptionsString(this.EGG_GROUP_LIST);
    }
    TEMPLATES = { // all the new/changed HTML for the userscript
        qolHubLinkHTML        : '<li data-name="QoL"><a title="QoL Settings"><img src="https://i.imgur.com/L6KRli5.png" alt="QoL Settings">QoL</a></li>',
        qolHubUpdateLinkHTML  : '<li data-name="QoLupdate"><a href="https://github.com/jpgualdarrama/PokeFarmQoL/raw/master/Poke-Farm-QoL.user.js" target="_blank"><img src="https://i.imgur.com/SJhgsU8.png" alt="QoL Update">QoL Update Available!</a></li>',
        massReleaseSelectHTML : '<label id="selectallfish"><input class="qolsetting" id="selectallfishcheckbox" type="checkbox">Select all</label>' +
        '<label id="movefishselectany"><input class="qolsetting" id="movefishselectanycheckbox" type="checkbox">Select Any  </label>' +
        '<label id="movefishselectsour"><input class="qolsetting" id="movefishselectsourcheckbox" type="checkbox">Select Sour  </label>' +
        '<label id="movefishselectspicy"><input class="qolsetting" id="movefishselectspicycheckbox" type="checkbox">Select Spicy</label>' +
        '<label id="movefishselectdry"><input class="qolsetting" id="movefishselectdrycheckbox" type="checkbox">Select Dry  </label>' +
        '<label id="movefishselectsweet"><input class="qolsetting" id="movefishselectsweetcheckbox" type="checkbox">Select Sweet  </label>' +
        '<label id="movefishselectbitter"><input class="qolsetting" id="movefishselectbittercheckbox" type="checkbox">Select Bitter  </label>',
        partyModHTML          : '<div id=\'qolpartymod\'><label><input type="checkbox" class="qolsetting qolalone" data-key="hideDislike"/>Hide disliked berries</label><label><input type="checkbox" class="qolsetting qolalone" data-key="niceTable"/>Show in table</label><label><input type="checkbox" class="qolsetting qolalone" data-key="hideAll"/>Hide all click fast</label></div>',
        // filled in by fillTemplates
        shelterOptionsHTML   : null,
        fieldSortHTML         : null,
        fieldSearchHTML       : null,
        privateFieldSearchHTML: null,
        qolHubHTML            : null,
        evolveFastHTML        : null,
        labOptionsHTML        : null,
        publicFieldTooltipModHTML   : null,
        privateFieldTooltipModHTML  : null
    };

    SETTINGS_SAVE_KEY = 'QoLSettings';
    DAYCARE_PAGE_SETTINGS_KEY = 'QoLDaycare';
    DEX_PAGE_SETTINGS_KEY = 'QoLDexPage';
    FARM_PAGE_SETTINGS_KEY = 'QoLFarm';
    FISHING_PAGE_SETTINGS_KEY = 'QoLFishing';
    LAB_PAGE_SETTINGS_KEY = 'QoLLab';
    MULTIUSER_PAGE_SETTINGS_KEY = 'QoLMultiuser';
    PRIVATE_FIELDS_PAGE_SETTINGS_KEY = 'QoLPrivateFields';
    PUBLIC_FIELDS_PAGE_SETTINGS_KEY = 'QoLPublicFields';
    SHELTER_PAGE_SETTINGS_KEY = 'QoLShelter';
    WISHFORGE_PAGE_SETTINGS_KEY = 'QoLWishforge';
    POKEDEX_DATA_KEY = 'QoLPokedex';
    POKEDEX_DEX_IDS_KEY = 'QoLDexIDsCache';
    POKEDEX_REGIONAL_FORMS_KEY = 'QoLRegionalFormsList';
    POKEDEX_EGG_TYPES_MAP_KEY = 'QoLEggTypesMap';
    POKEDEX_EVOLVE_BY_LEVEL_KEY = 'QoLEvolveByLevel';
    POKEDEX_EVOLUTION_TREE_DEPTH_KEY = 'QoLEvolutionTreeDepth';
    // Note - the order of TYPE_LIST is important. It looks like PFQ uses an array in this order in its code
    // Don't change the order without looking for where this array is used
    TYPE_LIST = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];
    NATURE_LIST = ['Lonely', 'Mild', 'Hasty', 'Gentle', 'Bold', 'Modest', 'Timid', 'Calm',
        'Impish', 'Adamant', 'Jolly', 'Careful', 'Relaxed', 'Brave', 'Quiet', 'Sassy',
        'Lax', 'Naughty', 'Rash', 'Naïve', 'Hardy', 'Docile', 'Serious', 'Bashful', 'Quirky'];
    EGG_GROUP_LIST = [
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
    EGG_GROUP_ID_TO_NAME = [
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
    SHELTER_TYPE_TABLE = [
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
    SHELTER_SEARCH_DATA = [
        'findNewEgg', 'Egg', 'new egg', '<img src="//pfq-static.com/img/pkmn/egg.png/t=1451852195">',
        'findNewPokemon', 'Pokémon', 'new Pokémon', '<img src="//pfq-static.com/img/pkmn/pkmn.png/t=1451852507">',
        'findShiny', 'SHINY', 'Shiny', '<img src="//pfq-static.com/img/pkmn/shiny.png/t=1400179603">',
        'findAlbino','ALBINO', 'Albino', '<img src="//pfq-static.com/img/pkmn/albino.png/t=1414662094">',
        'findMelanistic', 'MELANISTIC', 'Melanistic', '<img src="//pfq-static.com/img/pkmn/melanistic.png/t=1435353274">',
        'findPrehistoric', 'PREHISTORIC', 'Prehistoric', '<img src="//pfq-static.com/img/pkmn/prehistoric.png/t=1465558964">',
        'findDelta', 'DELTA', 'Delta', '<img src="//pfq-static.com/img/pkmn/_delta/dark.png/t=1501325214">',
        'findMega', 'MEGA', 'Mega', '<img src="//pfq-static.com/img/pkmn/mega.png/t=1400179603">',
        'findStarter', 'STARTER', 'Starter', '<img src="//pfq-static.com/img/pkmn/starter.png/t=1484919510">',
        'findCustomSprite', 'CUSTOM SPRITE', 'Custom Sprite', '<img src="//pfq-static.com/img/pkmn/cs.png/t=1405806997">',
        'findMale', '[M]', 'Male', '<img src="//pfq-static.com/img/pkmn/gender_m.png/t=1401213006">',
        'findFemale', '[F]', 'Female', '<img src="//pfq-static.com/img/pkmn/gender_f.png/t=1401213007">',
        'findNoGender', '[N]', 'Genderless', '<img src="//pfq-static.com/img/pkmn/gender_n.png/t=1401213004">',
    ];

    // filled in by fillOptionsLists
    TYPE_OPTIONS = null;
    NATURE_OPTIONS = null;
    EGG_GROUP_OPTIONS = null;

    // filled in by LocalStorageManager
    DEX_UPDATE_DATE = null;

    // filled in by subclasses
    DEX_DATA = null;
}

class Globals extends GlobalsBase {
    // filled in by LocalStorageManager
    EVOLVE_BY_LEVEL_LIST = null;
    EVOLUTIONS_LEFT = null;
    constructor(jQuery, localStorageMgr) {
        super();
        this.jQuery = jQuery;
        this.localStorageMgr = localStorageMgr;
    }
}
/* eslint-disable no-trailing-spaces */
/* EvolutionTreeParser class
 * This purely static class provides functions for parsing the evolution div of a dex page.
 * This class should only be used by the DexPageParser class.
 * This classes complies with the practice of prepending an underscore on private items. This includes
 * "private" methods within this class, and the class itself.
 */
class EvolutionTreeParser {
    
    /* _parseEvolutionLi
     * Parses the contents of an <li> element from the evolution tree div of a dex page
     * Inputs:
     * - li - an HTML node representing the <li> to be parsed
     * - dex_id_map - object mapping Pokemon names to their ID values
     *                e.g. {'Rattata' => '019'}
     *     > TODO - there's definitely a better way to handle this that is used somewhere else
     *              in DexPageParser already
     * Output:
     * - ret - object mapping the name of the evolution target to the evolution conditions and parsed evolutions of said Pokemon
     *         e.g. {
     *               'Vaporeon' => {
     *                           'condition' => 'Water Stone', 
     *                           'evolutions' => [
     *                                            // parsed <ul> containing Vaporeon [Mega Forme Q]
     *                                           ]
     *                          }, ...
     *              }
     */
    static _parseEvolutionLi(li, dexIDMap) {
        const condition = li.children('.condition');
        const targetElem = li.find('.name').eq(0);
        const target = targetElem.text().trim();

        // if the targetElem has a link as a child, store the dex ID in the link
        if(targetElem.find('a').length) {
            const link = targetElem.find('a')[0]['href'];
            const id = link.substring('/dex/'.length);
            dexIDMap[target] = id;
        }

        const ret = {};
        ret[target] = {
            'condition': condition[0],
            'evolutions': []
        };
        const uls = li.children('ul');
        if(uls.length) {
            for(let i = 0; i < uls.length; i++) {
                const nest = EvolutionTreeParser._parseEvolutionUl(uls.eq(i), dexIDMap);
                ret[target]['evolutions'].push(nest);
            }
            return ret;
        } else {
            return ret;
        }
    }

    /* _parseEvolutionUl
     * Parses the contents of an <ul> element from the evolution tree div of a dex page
     * Inputs:
     * - ul - an HTML node representing the <ul> to be parsed
     * - dex_id_map - object mapping Pokemon names to their ID values
     *                e.g. {'Rattata' => '019'}
     *     > TODO - there's definitely a better way to handle this that is used somewhere else
     *              in DexPageParser already
     * Output:
     * - ret - object mapping the names of the evolution targets to the evolution conditions and parsed evolutions of said Pokemon.
     *         ret will contain one key (i.e., one evolution target name) for each <li> found in the <ul> passed
     *         e.g. {
     *               'Vaporeon' => {
     *                              'condition' => 'Water Stone', 
     *                              'evolutions' => [
     *                                               // parsed <ul> containing Vaporeon [Mega Forme Q]
     *                                               {
     *                                                'Vaporeon' => {
     *                                                               'condition' => 'Water Stone', 
     *                                                               'evolutions' => []
     *                                                              }
     *                                               }
     *                                              ]
     *                             }, ...
     *              }
     */
    static _parseEvolutionUl(ul, dexIDMap) {
        const lis = ul.children('li');
        const numParallelEvolutions = lis.length;

        const ret = {};
        for(let i = 0; i < numParallelEvolutions; i++) {
            const nest = EvolutionTreeParser._parseEvolutionLi(lis.eq(i), dexIDMap);
            for(const d in nest) {
                ret[d] = nest[d];
            }
        }
        return ret;
    }
    
    /* parseEvolutionTree
     * Parses the content of an evolution tree of a dex page
     * Inputs:
     * - root - a string with the name of the pokemon at the base of the tree (e.g., 'Rattata')
     * - evotree - the contents of $('.evolutiontree'). Example:
     *             <div class="evolutiontree">
     *               <span class="Name">
     *                 <span class="icon" style="background-image:url(//url//)"></span>
     *                 <b>Eevee</b>
     *               </span>
     *               <ul>
     *                 <li>
     *                   <span class="condition">Water Stone</span>
     *                   <span class="name">
     *                     <span class="icon" style="background-image:url(//url//)"></span>
     *                     <a href="/dex/144">Vaporeon</a>
     *                   </span>
     *                   <ul>
     *                     <li>
     *                       <span class="condition">
     *                         <img src=//url//>
     *                         "Vaporeonite Q"
     *                       </span>
     *                       <span class="name">
     *                         <span class="icon" style="background-image:url(//url//)"></span>
     *                         <a href="/dex/144-Q">Vaporeon</a>
     *                         <i class="small">[Mega Forme Q</i>
     *                       </span>
     *                     </li>
     *                   </ul>
     *                 </li>
     *                 <li> ... data for Jolteon </li>
     *                 ... data for Flareon, Espeon, Umbreon, Leafeon, Glaceon, Sylveon
     *               </ul>
     *             </div>
     * - dex_id_map - object mapping Pokemon names to their ID values
     *                e.g. {'Eevee' => '143'}
     *     > TODO - there's definitely a better way to handle this that is used somewhere else
     *              in DexPageParser already
     * Outputs:
     * - flat - Contains evolution data for a subtree of evolution data. For the base (non-recursive) call,
     *          is an object containing evolutions for a single pokemon family. For recursive calls,
     *          is an array which contains an object in each index.
     *          Example (of whole object and of one index of array):
     *          {
     *           'members' => ['Eevee', 'Vaporeon', 'Jolteon', 'Flareon', 'Espeon', 'Umbreon',
     *                         'Leafeon', 'Glaceon', 'Sylveon'],
     *           'evolutions' => [
     *             {'source' => 'Eevee'   , 'target' => 'Vaporeon', 'condition' => 'Water Stone'},
     *             {'source' => 'Vaporeon', 'target' => 'Vaporeon [Mega Forme Q]', 'condition' => 'Vaporeonite Q'},
     *             {'source' => 'Eevee'   , 'target' => 'Jolteon' , 'condition' => 'ThunderStone'},
     *             {'source' => 'Jolteon' , 'target' => 'Jolteon [Mega Forme Q]' , 'condition' => 'Jolteonite Q'},
     *             {'source' => 'Eevee'   , 'target' => 'Flareon' , 'condition' => 'Fire Stone'},
     *             {'source' => 'Flareon' , 'target' => 'Flareon [Mega Forme Q]' , 'condition' => 'Flareonite Q'},
     *             {'source' => 'Eevee'   , 'target' => 'Espeon'  , 'condition' => 'Happiess during Daytime'},
     *             {'source' => 'Espeon'  , 'target' => 'Espeon [Mega Forme Q]'  , 'condition' => 'Espeonite Q'},
     *             {'source' => 'Eevee'   , 'target' => 'Umbreon' , 'condition' => 'Happiness during Nighttime'},
     *             {'source' => 'Umbreon' , 'target' => 'Umbreon [Mega Forme Q]' , 'condition' => 'Umbreonite Q'},
     *             {'source' => 'Eevee'   , 'target' => 'Leafeon' , 'condition' => 'In Grass-type Field'},
     *             {'source' => 'Leafeon' , 'target' => 'Leafeon [Mega Forme Q]' , 'condition' => 'Leafeonite Q'},
     *             {'source' => 'Eevee'   , 'target' => 'Glaceon' , 'condition' => 'In Ice-type Field'},
     *             {'source' => 'Glaceon' , 'target' => 'Glaceon [Mega Forme Q]' , 'condition' => 'Glaceonite Q'},
     *             {'source' => 'Eevee'   , 'target' => 'Sylveon' , 'condition' => 'Affection'},
     *             {'source' => 'Sylveon' , 'target' => 'Sylveon [Mega Forme Q]' , 'condition' => 'Sylveonite Q'},
     *           ]
     *          }
     */
    static parseEvolutionTree(root, evotree, dexIDMap) {
        const uls = evotree.children('ul');
        const tree = {};
        const textContent = evotree.text();

        const doesNotEvolveMarker = ' is not known to evolve';
        const markerIndex = textContent.indexOf(doesNotEvolveMarker);
        if(markerIndex > -1) {
            // mimic the format of the output of flattenEvolutionFamily
            return {'members': ['Ditto'], 'evolutions': []};
        }

        // TODO: Pull this side effect out of this function
        if(evotree.children('span').length) {
            const linkElem = evotree.children('span').children('a');
            if(linkElem.length) {
                const link = linkElem[0]['href'];
                const dexID = link.substring('https://pokefarm.com/dex/'.length);
                dexIDMap[root] = dexID;
            }
        }

        /* tree format example
         * {
         *  'Eevee' => [
         *              {
         *               'Vaporeon' => {
         *                              'condition' => 'Water Stone', 
         *                               'evolutions' => [
         *                                                // parsed <ul> containing Vaporeon [Mega Forme Q]
         *                                               ],
         *                             }, ...
         *              },
         *              // data for Jolteon, Flareon, Espeon, Umbreon, Leafeon, Glaceon, Sylveon
         *            ]
         * }
         */
        tree[root] = [];
        for(let i = 0; i < uls.length; i++) {
            tree[root].push(EvolutionTreeParser._parseEvolutionUl(uls.eq(i), dexIDMap));
        }

        // flatten the tree
        const flat = EvolutionTreeParser._flattenEvolutionTree(tree);

        // parse the evolution conditions
        EvolutionTreeParser._parseEvolutionConditions(flat);
        return flat;
    }

    /* _flattenEvolutionTree
     * Parses a tree structure representing the evolutions of a pokemon into an object containing flat arrays.
     * Called recursively to parse the nested evolution data.
     * Inputs:
     * - family_obj - Contains evolution data for a subtree of evolution data. For the base (non-recursive) call,
     *                is an object containing evolutions for a single pokemon family. For recursive calls,
     *                is an array which contains an object in each index.
     *                Example (of whole object and of one index of array):
     *                {
     *                 'Eevee' => [
     *                             {
     *                              'Vaporeon' => {
     *                                             'condition' => 'Water Stone', 
     *                                              'evolutions' => [
     *                                                               // parsed <ul> containing 
     *                                                               // Vaporeon [Mega Forme Q]
     *                                                              ],
     *                                            }, ...
     *                             },
     *                             // data for Jolteon, Flareon, Espeon, Umbreon, Leafeon, Glaceon, Sylveon
     *                           ]
     *                }
     * - ret_obj - An aggregator for the flattened data for a given family. Is undefined for the base
     *             (non-recursive) call, and for each recursive call is an object containing family member 
     *             and evolutions data.
     *             Example: 
     *             {
     *               'members' => ['Bulbausaur', 'Ivysaur', 'Venusaur', 'Venusaur [Mega Forme]'],
     *               'evolutions' => [
     *                 {'source' => 'Bulbasaur', 'target' => 'Ivysaur', 'condition' => 'Level 16'},
     *                 {'source' => 'Ivysaur', 'target' => 'Venusaur', 'condition' => 'Level 36'},
     *                 {'source' => 'Venusaur', 'target' => 'Venusaur [Mega Forme]', 'condition => 'Venusaurite'}
     *               ]
     *             }
     * - evo_src - The name of the pokemon at the root of the current call. Is undefined for the base
     *             (non-resursive) call, and for each recursive call it is the name of the pokemon at the 
     *             root of the subtree being parsed
     * Outputs:
     * - ret_obj - This will be equal to the the value of ret_obj that was passed in plus the evolution
     *             data parsed during the current recursion
     * - 
     */
    static _flattenEvolutionTree(familyObj, retObj, evoSrc) {
        retObj = retObj || {
            'members': [],
            'evolutions': []
        };

        if(Array.isArray(familyObj)) {
            for(let i = 0; i < familyObj.length; i++) {
                for(const key in familyObj[i]) {
                    retObj.members.push(key);
                    retObj.evolutions.push({
                        'source': evoSrc,
                        'target': key,
                        'condition': familyObj[i][key]['condition']
                    });
                    this._flattenEvolutionTree(familyObj[i][key]['evolutions'], retObj, key);
                }
            }
        } else if(typeof familyObj === 'object') {
            for(const key in familyObj) {
                retObj.members.push(key);
                this._flattenEvolutionTree(familyObj[key], retObj, key);
            }
        }
        return retObj;
    }

    /* _parseEvolutionConditions
     * Parse the HTML in the conditions list from the flattened object.
     * Currently this only successfully parses Level conditions
     * Inputs:
     * - flattened - See _flattenEvolutionTree for input format. Modified in
     *               place to extract condition information from html
     * Outputs: None
     */
    static _parseEvolutionConditions(flattened) {
        for(let e = 0; e < flattened.evolutions.length; e++) {
            const condition = flattened.evolutions[e].condition;
            const condText = condition.textContent;
            // for now, let's just parse for pokemon that evolve by level
            // TODO: Non-Level conditions
            if(condText.indexOf('Level ') > -1) {
                flattened.evolutions[e].condition = [];
                const words = condText.split(' ');
                let cond = '', clearCurrentCondition = false;

                for(let w = 0; w < words.length; w++) {
                    clearCurrentCondition = false;
                    if(words[w] === 'Level') {
                        clearCurrentCondition = true;
                        flattened.evolutions[e].condition.push({'condition': words[w], 'data': words[w+1]});
                        w++;
                    } else if(words[w] === 'Happiness') {
                        clearCurrentCondition = true;
                        flattened.evolutions[e].condition.push({'condition': words[w], 'data': ''});
                    } else { // catch-all for now
                        clearCurrentCondition = false;
                        cond = cond + ' ' + words[w];
                    }

                    if(clearCurrentCondition) {
                        if(cond !== '') {
                            flattened.evolutions[e].condition.push({'condition': cond.trim(), 'data': ''});
                        }
                        cond = '';
                    }
                } // for

                // if there's any leftover conditions, add it into the list
                if(cond !== '') {
                    flattened.evolutions[e].condition.push({'condition': cond.trim(), 'data': ''});
                }
            } // if level
            else {
                flattened.evolutions[e].condition = condition.textContent.trim();
            }
        }
    }
} // EvolutionTreeParser
/* This class includes static functions for parsing data from a single dex page.
   Functions which process multiple text pages are in DexUtilities.
*/

class DexPageParser {
    /* Parse the header from a dex page
     * Inputs:
     * - html - HTML of a full dex page (from https://www.pokefarm.com/dex/<id>)
     * Outputs:
     * - (anonymous) - struct containing data from header.
     *                 Example:
     *                 {
     *                   base_number: 003,
     *                   base_name: "Venusaur",
     *                   name: "Venusaur [Mega Forme]"
     *                 }
     */
    static getInfoFromDexPageHeader(html) {
        // Note - I thought this wouldn't work for exclusives because they're pokedex numbers all start with "000",
        // but when exclusives have multiple forms, each form has its dex entry, and the forms are not grouped
        // into the panel of a single pokemon. See Lunupine and Lunupine [Mega Forme Q] as an example, contrasted with
        // Venusaur and Venusaur [Mega Forme]. This means that exclusives will never have any links in the form panel
        // and thus will never get into this if statement
        const nameHeader = html.find('#dexinfo>h3').eq(0);
        const formI = nameHeader.children('i.small');

        // https://stackoverflow.com/questions/3442394/using-text-to-retrieve-only-text-not-nested-in-child-tags
        // get text but not children's text
        const nameText = nameHeader.clone().children().remove().end().text();
        const nameSplits = nameText.split(' ');
        const basePokemonNumber = nameSplits[0].replace('#','').replace(':','');
        // just in case the name is more than one word, join the remaining elements back together
        nameSplits.splice(0, 1);
        const basePokemonName = nameSplits.join(' ').trim();
        const pokemonName = (formI.length) ?
            basePokemonName + ' ' + formI.text() :
            basePokemonName;

        return {
            // dex number of the base pokemon
            base_number: basePokemonNumber,
            // name of the base pokemon
            base_name: basePokemonName,
            // name of the form
            name: pokemonName
        };
    }

    /* Parse the footer from a dex page
     * Inputs:
     * - html - HTML of a full dex page (from https://www.pokefarm.com/dex/<id>)
     * Outputs:
     * - (anonymous) - struct containing data from footer.
     *                 Example:
     *                 {
     *                   shortlink: "/shortlinks/save/dex/003-M",
     *                   shortlinkNumber: "003-M"
     *                 }
     */
    static getInfoFromDexPageFooter(html) {
        const currentLink = html.find('#footbar>span>a[href^="/shortlinks"]').attr('href');
        const currentNumber = currentLink.substr(currentLink.indexOf('/dex/')+5);

        return {
            shortlink: currentLink,
            shortlinkNumber: currentNumber
        };
    }

    /* Parse the types of a pokemon from a dex page
     * Inputs:
     * - html - HTML of a full dex page (from https://www.pokefarm.com/dex/<id>)
     * Outputs:
     * - types - array containing the indices of the pokemon's type(s) in the GLOBALS.TYPE_LIST array
     *           Example: For Venusaur:
     *                 [
     *                  4, // Grass
     *                  7 // Poison
     *                 ]
     */
    static parseTypesFromDexPage(html, typeList) {
        const typeImgs = html.find('.dexdetails>li>img');
        const typeUrls = typeImgs.map((idx, img) => {
            return img.src;
        });
        let types = typeUrls.map((idx, url) =>
            url.substring(url.indexOf('types/')+'types/'.length,
                url.indexOf('.png')));
        types = types.map((idx, type) => type.charAt(0).toUpperCase() + type.substring(1));
        types = types.map((idx, type) => typeList.indexOf(type)); // GLOBALS.TYPE_LIST.indexOf(type));
        return types.toArray();
    }

    /* Parse egg png link from dex page
     * Inputs:
     * - html - HTML of a full dex page (from https://www.pokefarm.com/dex/<id>)
     * Outputs:
     * - eggUrl - Partial UTL to the png of the egg from the dex page.
     *             'https://pfq-static.com/img/' is removed from the URL since it is always the same
     */
    static parseEggPngFromDexPage(html) {
        const eggUrl = (html.find('.eggspr').find('img')
            .attr('src') || '')
            .replace('https://pfq-static.com/img/', '');
        return eggUrl;
    }

    /* Parse the evolution tree from a dex page
     * Inputs:
     * - html - HTML of a full dex page (from https://www.pokefarm.com/dex/<id>)
     * Outputs:
     * - flattened - See EvolutionTreeParser.parseEvolutionTree for description
     */
    static parseEvolutionTreeFromDexPage(evolutionTreeParser, html, dexIDMap) {
        const rootName = DexPageParser.getInfoFromDexPageHeader(html).name;
        const tree = html.find('.evolutiontree').eq(0);
        const flattened = evolutionTreeParser.parseEvolutionTree(rootName, tree, dexIDMap);
        return flattened;
    }
} // DexPageParser


class LocalStorageManagerBase {
    constructor(keyPrefix, storage) {
        this.keyPrefix = keyPrefix;
        this.storage = storage;
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
        Helpers.saveSettings(this.translateKey(key), obj);
    }
    loadSettings($, KEY, DEFAULT, obj) {
        return Helpers.loadSettings($, this.translateKey(KEY), DEFAULT, obj);
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

    /* Set GLOBALS.DEX_DATA and GLOBALS.DEX_UPDATE_DATE from the QoLPokedex data stored in localStorage
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

class LocalStorageManager extends LocalStorageManagerBase {
    constructor(keyPrefix, storage) {
        super(keyPrefix, storage);
    }

    /* Set globals.DEX_DATA and globals.DEX_UPDATE_DATE by loading the main dex page from the web
     * Inputs:
     * - $ - reference to jQuery
     * - globals - reference to the GLOBALS settings object
     */
    loadDexIntoGlobalsFromWeb($, document, dexUtilities, globals) {
        return dexUtilities.getMainDexPage($).then((data) => {
            globals.DEX_UPDATE_DATE = (new Date()).toUTCString();
            const html = $.parseHTML(data);
            const dex = $(html[html.length-1], document).find('#dexdata').html();
            globals.DEX_DATA = dex.split(',');
            this.updateLocalStorageDex($, document, globals.DEX_UPDATE_DATE, globals);
        }, (error) => {
            console.error('Error occurred in loadDexIntoGlobalsFromWeb. ' +
                          'Error message: ' + error);
        });
    }

    loadEvolveByLevelList(GLOBALS) {
        GLOBALS.EVOLVE_BY_LEVEL_LIST = JSON.parse(localStorage.getItem(this.translateKey(GLOBALS.POKEDEX_EVOLVE_BY_LEVEL_KEY)));
    }

    loadEvolutionTreeDepthList(GLOBALS) {
        GLOBALS.EVOLUTIONS_LEFT = JSON.parse(localStorage.getItem(this.translateKey(GLOBALS.POKEDEX_EVOLUTION_TREE_DEPTH_KEY)));
    }

    /* Call loadDexIntoGlobalsFromWeb if more than 30 days have passed since it was last loaded
     * Inputs:
     * - $ - reference to jQuery
     * - globals - reference to the GLOBALS settings object
     */
    loadDexIntoGlobalsFromWebIfOld($, document, dexUtilities, globals) {
        // If it's more than 30 days old, update the dex
        const THIRTY_DAYS_IN_MS = 30*24*3600*1000;
        const dateAndDex = JSON.parse(this.storage.getItem(this.translateKey(globals.POKEDEX_DATA_KEY)));
        if ((Date.now() - Date.parse(dateAndDex[0])) > THIRTY_DAYS_IN_MS) {
            return this.loadDexIntoGlobalsFromWeb($, document, dexUtilities, globals);
        }
        return Promise.resolve(false);
    }

    saveEvolveByLevelList(globals, parsedFamilies, dexIDs) {
        const key = this.translateKey(globals.POKEDEX_EVOLVE_BY_LEVEL_KEY);
        // load current evolve by level list
        let evolveByLevelList = {};
        if(this.storage.getItem(key) !== null) {
            evolveByLevelList = JSON.parse(this.storage.getItem(key));
        }

        for(const pokemon in parsedFamilies) {
            const evolutions = parsedFamilies[pokemon];
            for(let i = 0; i < evolutions.length; i++) {
                const evo = evolutions[i];
                if(!(evo.source in evolveByLevelList) && Array.isArray(evo.condition)) {
                    for(let j = 0; j < evo.condition.length; j++) {
                        const cond = evo.condition[j];
                        if(cond.condition === 'Level') {
                            evolveByLevelList[evo.source] = cond.condition + ' ' + cond.data;
                            evolveByLevelList[dexIDs[evo.source]] = cond.condition + ' ' + cond.data;
                        } // if
                    } // for
                } // if
            } // for
        } // for pokemon

        globals.EVOLVE_BY_LEVEL_LIST = evolveByLevelList;
        this.storage.setItem(key, JSON.stringify(evolveByLevelList));
    } // saveEvolveByLevelList

    saveEvolutionTreeDepths(globals, maxEvoTreeDepth) {
        // GLOBALS.EVOLUTIONS_LEFT stores the number of remaining evolutions and the total number of evolutions
        // for a pokemon and it's family
        // e.g. - GLOBALS.EVOLUTIONS_LEFT["019s2"] = { remaining: 4, total: 5 } // 019s2 = Super Saiyan Rattata

        this.storage.setItem(this.translateKey(globals.POKEDEX_EVOLUTION_TREE_DEPTH_KEY), JSON.stringify(maxEvoTreeDepth));
        globals.EVOLUTIONS_LEFT = maxEvoTreeDepth;

    } // saveEvolutionTreeDepths

    saveRegionalFormsList(globals, parsedFamilies, dexIDs, regionalFormMap) {
        // GLOBALS.REGIONAL_FORMS_LIST maps base pokemon species names to the list
        // of regional forms, including the base name.
        // e.g. - GLOBALS.REGIONAL_FORMS_LIST[Rattata] = ["Rattata", "Rattata [Alolan Forme]"]
        const key = this.translateKey(globals.POKEDEX_REGIONAL_FORMS_KEY);
        const list = regionalFormMap;

        this.storage.setItem(key, JSON.stringify(list));
        globals.REGIONAL_FORMS_LIST = list;

    } // saveRegionalFormsList

    saveEggTypesMap(globals, map) {
        // GLOBALS.EGGS_PNG_TO_TYPES_LIST will map a pokemon's base name to all the egg pngs that
        // will appear in the shelter with that name, and map each of those pngs to the type(s)
        // of that egg
        // e.g. GLOBALS.EGGS_PNG_TO_TYPES_LIST[Rattata] = {
        //           <kantonian.png> : [Normal],
        //           <alolan.png> : [Normal, Dark]
        // }
        const key = this.translateKey(globals.POKEDEX_EGG_TYPES_MAP_KEY);
        this.storage.setItem(key, JSON.stringify(map));
        globals.EGGS_PNG_TO_TYPES_LIST = map;
    }

    /* parseAndStoreDexNumbers
     *
     */
    parseAndStoreDexNumbers(globals, dex) {
        const key = this.translateKey(globals.POKEDEX_DEX_IDS_KEY);
        const json = JSON.parse(dex);
        // load current list of processed dex IDs
        let dexIDsCache = [];
        if(this.storage.getItem(key) !== null) {
            dexIDsCache = JSON.parse(this.storage.getItem(key));
        }

        const dexNumbers = [];
        // get the list of pokedex numbers that haven't been processed before
        for(const r in json.regions) {
            for(let i = 0; i < json.regions[r].length; i++) {
                if(dexIDsCache.indexOf(json.regions[r][i][0]) == -1) {
                    dexNumbers.push(json.regions[r][i][0]);
                }
            }
        }

        // Add the list of dexNumbers to the cache and write it back to local storage
        dexIDsCache = dexIDsCache.concat(dexNumbers);
        this.storage.setItem(key, JSON.stringify(dexIDsCache));
        return dexNumbers;
    }
}
class DexUtilities {
    /* Load the main dex page.
     * Note: Testing this would essentially be testing jQuery, so no need to test
     * Inputs:
     * - $ - reference to jQuery
     * Outputs:
     * - (anonymous) - A Promise that will be resolved when the page is loaded
     */
    static getMainDexPage($) {
        return $.get('https://pokefarm.com/dex');
    }
    /* Load the dex page for a pokemon.
     * Inputs:
     * - $ - reference to jQuery
     * - id - dex ID number to load
     * Outputs:
     * - (anonymous) - A promise that will be resolved when the page is loaded
     */
    static getPokemonDexPage($, id) {
        return $.get('https://pokefarm.com/dex/' + id);
    }
    /* Loads the dex pages for the pokemon whose dex numbers are in the dexNumbers input
     * Inputs:
     * - $ - reference to jQuery
     * - dexNumbers - an array containing dex IDs
     *                Example: ["001", "002", "003", "004"];
     * - progressBar - a <progress> tag that will show how many of the IDs in
     *                 'dexNumbers' have been loaded
     * - progressSpan - a <span> tag that will contain text about the progress
     *                  of loading the dex pages
     * Outputs:
     * - (anonymous) - A Promise that will be resolved when all the dex pages
     *                 have been loaded
     */
    static loadDexPages($, dexNumbers, progressBar, progressSpan) {
        const requests = [];
        progressBar.value = 0;
        progressSpan.textContent = 'Loading Pokedex info. Please wait until this is complete...';

        for(let d = 0; d < dexNumbers.length; d++) {
            // if the dex number is 000, the user has not seen the pokemon,
            // so just increment the progress bar value
            if(dexNumbers[d] === '000') {
                progressBar.value = progressBar['value'] + 1;
                progressSpan.textContent = `Loaded ${progressBar['value']} of ${dexNumbers.length} Pokemon`;
            } else {
                const r = DexUtilities.getPokemonDexPage($, dexNumbers[d]).then((data, status, jqXHR) => {
                    progressBar.value = progressBar.value + 1;
                    progressSpan.textContent = `Loaded ${progressBar['value']} of ${dexNumbers.length} Pokemon`;
                    return data;
                }, (error) => {
                    console.log(error);
                });
                requests.push(r);
            }
        }

        // return $.when.apply(undefined, requests);
        return Promise.all(requests);
    } // loadDexPages
    /* Loads the dex pages for the forms of a pokemon
     * Inputs:
     * - $ - reference to jQuery
     * - firstFormHTML - An array containing the HTML for the dex pages for a set of pokemon.
     *                   The HTML in this array will be parsed to find the forms of a pokemon
     * - progressBar - a <progress> tag that will show how many of the IDs in
     *                 'dexNumbers' have been loaded
     * - progressSpan - a <span> tag that will contain text about the progress
     *                  of loading the dex pages
     * Outputs:
     * - (anonymous) - A Promise that will be resolved when all the forms' dex pages
     *                 have been loaded
     */
    static loadFormPages($, ownerDocument, firstFormHTML, progressBar, progressSpan) {
        const requests = [];
        for(let a = 0; a < firstFormHTML.length; a++) {
            const data = firstFormHTML[a];
            // load data from pages for other forms
            const formLinks = $(data, ownerDocument).find('.formeregistration a');
            if(formLinks.length) {
                progressBar['max'] = progressBar['max'] + formLinks.length;
                for(let i = 0; i < formLinks.length; i++) {
                    const link = formLinks.eq(i).attr('href');
                    const r = DexUtilities.getPokemonDexPage($, link.substring('/dex/'.length))
                        .then((formHTML) => {
                            progressBar.value = progressBar['value'] + 1;
                            progressSpan.textContent = `Loaded ${progressBar['value']} of ${progressBar['max']} Pokemon`;
                            return formHTML;
                        }, (error) => {
                            console.log(error);
                        });
                    requests.push(r);
                }
            }
        } // for

        return Promise.all(requests);
    } // loadFormPages
    /* Parses HTML from pokedex pages
     * Inputs:
     * - $ - reference to jQuery
     * - ownerDocument - reference to virtual document to load HTML into
     * - args - an array of HTML from pokedex pages
     * Outputs:
     * - flat_families - See DexPageParser.parseEvolutionTreeFromDexPage for details
     * - dex_id_map - object mapping dex IDs to pokemon's names. Used to track which
     *                pokemon's dex pages have been processed
     */
    static parseEvolutionTrees($, ownerDocument, dexPageParser, evolutionTreeParser, args) {
        const flatFamilies = {};
        const dexIDMap = {};

        for(let a = 0; a < args.length; a++) {
            const data = $(args[a], ownerDocument);
            const rootName = dexPageParser.getInfoFromDexPageHeader(data).name;

            // the evolution tree won't have the dex ID for the form of the pokemon that we're currently using
            // use the footbar to get the full pokedex number for the current form
            const fullIDNumber = dexPageParser.getInfoFromDexPageFooter(data).shortlinkNumber;

            // if the root name is already in in the flat files, but the root of the tree is not in the dexIDMap
            if((!(rootName in flatFamilies)) || (!(rootName in dexIDMap))) {
                dexIDMap[rootName] = fullIDNumber;

                const flattened = dexPageParser.parseEvolutionTreeFromDexPage(evolutionTreeParser, data, dexIDMap);

                // copy the data into the global object to prevent loading data multiple times
                if(flattened.evolutions.length) {
                    for(let i = 0; i < flattened.members.length; i++) {
                        flatFamilies[flattened.members[i]] = flattened.evolutions;
                    }
                } else {
                    flatFamilies[rootName] = flattened.evolutions;
                }
            } // if not in flatFamilies
        } // for a

        return [flatFamilies, dexIDMap];
    } // parseEvolutionTrees

    static buildEvolutionTreeDepthsList(parsedFamilies, dexIDs, formData, formMap) {
        // store the maximum depth of the evolution tree for each pokemon
        // for highlighting each pokemon based on how fully evolved they are
        // https://github.com/jpgualdarrama/PokeFarmQoL/issues/11
        const maxEvoTreeDepth = {};
        for(const pokemon in parsedFamilies) {
            const evolutions = parsedFamilies[pokemon];

            // filter out "evolutions" that are really changes between forms of the
            // same pokemon
            for(let i = evolutions.length - 1; i>= 0; i--) {
                if(formMap[evolutions[i].source] === undefined) {
                    console.error(`Could not find form data for ${evolutions[i].source}`);
                } else {
                    if(formMap[evolutions[i].target] === undefined) {
                        console.error(`Could not find form data for ${evolutions[i].target}`);
                    } else if(JSON.stringify(formMap[evolutions[i].source]) === JSON.stringify(formMap[evolutions[i].target])) {
                        evolutions.splice(i, 1);
                    }
                }
            }

            if(!(pokemon in maxEvoTreeDepth)) {
                if(evolutions.length) {
                    // initialize new entries in the structure
                    maxEvoTreeDepth[pokemon] = {'remaining': 0, 'total': 0};
                    maxEvoTreeDepth[dexIDs[pokemon]] = {'remaining': 0, 'total': 0};

                    const sourcesList = evolutions.map( el => el.source );

                    // don't redo the processing if the root of the tree is already in the list
                    if(sourcesList[0] in maxEvoTreeDepth && pokemon !== sourcesList[0]) {
                        // data for all evolutions is added when the first pokemon is added
                        continue;
                    }

                    const evoTree = {};

                    for(let i = evolutions.length - 1; i >= 0; i--) {
                        const evolution = evolutions[i];
                        const source = evolution.source;
                        const target = evolution.target;

                        if(sourcesList.indexOf(target) == -1) {
                            evoTree[target] = {[target]: []};
                        }

                        if(!(source in evoTree)) {
                            evoTree[source] = {[source]: [evoTree[target]]};
                        } else {
                            evoTree[source][source].push(evoTree[target]);
                        }
                    }

                    const finalTree = evoTree[sourcesList[0]];
                    const createPaths = function(stack, tree, paths) {
                        const name = Object.keys(tree)[0];
                        const children = tree[name];
                        const numChildren = children.length;

                        // append this node to the path array
                        stack.push(name);
                        if(numChildren === 0) {
                            // append all of its children
                            paths.push(stack.reverse().join('|'));
                            stack.reverse();
                        } else {
                            // otherwise try subtrees
                            for(let i = 0; i < numChildren; i++) {
                                createPaths(stack, children[i], paths);
                            }
                        }
                        stack.pop();
                    };
                    const parseEvolutionPaths = function(tree) {
                        const paths = [];
                        createPaths([], tree, paths);

                        // get remaining number of evolutions in each path and total number
                        // of evolutions along each path
                        const pokemonPathData = {};
                        for(let p = 0; p < paths.length; p++) {
                            const mons = paths[p].split('|');
                            for(let m = 0; m < mons.length; m++) {
                                // first or only appearance
                                if(!(mons[m] in pokemonPathData)) {
                                    pokemonPathData[mons[m]] = {'remaining': m, 'total': mons.length - 1};
                                }
                                // pokemon has multiple evolution paths
                                else {
                                    const remaining = pokemonPathData[mons[m]].remaining;
                                    const total = pokemonPathData[mons[m]].total;
                                    pokemonPathData[mons[m]].remaining = (remaining + m) / 2;
                                    pokemonPathData[mons[m]].total = (total + mons.length - 1) / 2;
                                }
                            }
                        }

                        // return paths.map((p) => { return p.split('|').length })
                        return pokemonPathData;
                    };
                    // - 1 because there is one less evolution then there are pokemon
                    const parsedPathData = parseEvolutionPaths(finalTree);
                    for(const p in parsedPathData) {
                        maxEvoTreeDepth[p] = parsedPathData[p];
                        maxEvoTreeDepth[dexIDs[p]] = parsedPathData[p];
                    }
                    // maxEvoTreeDepth[pokemon] = Math.max(...parseEvolutionPaths(finalTree)) - 1;
                    // maxEvoTreeDepth[dexIDs[pokemon]] = maxEvoTreeDepth[pokemon]
                } // if evolutions.length
                // add pokemon that don't evolve
                else {
                    maxEvoTreeDepth[pokemon] = {'remaining': 0, 'total': 0};
                    maxEvoTreeDepth[dexIDs[pokemon]] = maxEvoTreeDepth[pokemon];
                }
            } // if not in maxEvoTreeDepth
        } // for pokemon in parsedFamilies

        return maxEvoTreeDepth;

    } // buildEvolutionTreeDepthsList

    static parseFormData($, ownerDocument, dexPageParser, args) {
        const formData = {};
        const formMap = {};

        // because the evolution tree for all the members of a single family will have the same text,
        // use the text as a key in families
        // use the ownerDocument parameter to jQuery to stop jQuery from loading images and audio files
        for(let a = 0; a < args.length; a++) {
            const data = $(args[a], ownerDocument);
            const headerInfo = dexPageParser.getInfoFromDexPageHeader(data);
            const footerInfo = dexPageParser.getInfoFromDexPageFooter(data);

            // use the footbar to get the full pokedex number for the current form
            const currentNumber = footerInfo.shortlinkNumber;

            (formData[headerInfo.name] = formData[headerInfo.name] || []).push({
                // dex number of the base pokemon
                base_number: headerInfo.base_number,
                // name of the base pokemon
                base_name: headerInfo.base_name,
                // dex number of the form
                number: currentNumber,
                // name of the form
                name: headerInfo.name
            });
        } // for a

        // reorganize forms to all be under the base
        for(const name in formData) {
            for(let i = 0; i < formData[name].length; i++) {
                (formMap[formData[name][i].base_name] = formMap[formData[name][i].base_name] || []).push({
                    name: formData[name][i].name,
                    number: formData[name][i].number
                });
            } // i
        } // name

        // duplicate data from base pokemon into entries for each form
        for(const name in formData) {
            for(let i = 0; i < formData[name].length; i++) {
                if(formData[name][i].base_name !== formData[name][i].name) {
                    // formMap[formData[name][i].number] = formMap[formData[name][i].base_name];
                    formMap[formData[name][i].name] = formMap[formData[name][i].base_name];
                }
            }
        }

        return [formData, formMap];
    } // parseFormData

    /* base_names = {
       'Rattata' : 'Rattata',
       'Rattata [Alolan Forme]' : 'Rattata',
       'Raticate [Alolan Totem Forme]' : 'Raticate'
       }
    */
    static parseBaseNames($, ownerDocument, dexPageParser, args) {
        const list = {};
        for(let a = 0; a <args.length; a++) {
            const data = $(args[a], ownerDocument);
            const headerInfo = dexPageParser.getInfoFromDexPageHeader(data);
            list[headerInfo.name] = headerInfo.base_name;
        }
        return list;
    }

    /* egg_pngs = {
       'Rattata' : '... .png',
       'Rattata [Alolan Forme]' : '... .png'
       }
    */
    static parseEggsPngsList($, ownerDocument, dexPageParser, args) {
        const list = {};
        for(let a = 0; a <args.length; a++) {
            const data = $(args[a], ownerDocument);
            const headerInfo = dexPageParser.getInfoFromDexPageHeader(data);
            const name = headerInfo.name;
            const eggUrl = dexPageParser.parseEggPngFromDexPage(data);

            if(eggUrl) {
                list[name] = eggUrl;
            }
        }
        return list;
    }

    /* types = {
       'Rattata' : [Normal],
       'Raticate' : [Normal],
       'Rattata [Alolan Forme]' : [Normal, Dark],
       'Raticate [Alolan Forme]' : [Normal, Dark]
       }
    */
    static parseTypesList($, ownerDocument, dexPageParser, globals, args) {
        const list = {};
        for(let a = 0; a < args.length; a++) {
            const data = $(args[a], ownerDocument);
            const headerInfo = dexPageParser.getInfoFromDexPageHeader(data);
            const name = headerInfo.name;
            const types = dexPageParser.parseTypesFromDexPage(data, globals.TYPE_LIST);

            list[name] = types;
        }
        return list;
    }

    static buildRegionalFormsMap(formMap) {
        const regionalFormData = {};

        const REGIONAL_NAME_MARKERS = ['Kantonian',
            'Johtoian', // unused
            'Hoennian', // unused
            'Sinnohian', // unused
            'Unovan',
            'Kalosian', // unused
            'Alolan',
            'Galarian'];

        const allSpecies = Object.keys(formMap);
        const checkedSpecies = {};
        for(let i = 0; i < allSpecies.length; i++) {
            const current = allSpecies[i];
            const base = (current.indexOf('[') > -1) ? current.substring(0, current.indexOf('[')).trim() : current;
            if(!Object.prototype.hasOwnProperty.call(checkedSpecies, base)) {
                checkedSpecies[base] = true;

                const formNames = formMap[base].map((e) => e.name);

                // if any of the names have one of the regional markers,
                // add the regional names to the list
                let formWithMarkers = formNames.filter((n) => {
                    return REGIONAL_NAME_MARKERS.filter((r) => n.indexOf(`${r}`) > -1).length > 0;
                });

                // filter out megas/totems
                // these are filtered out this way to allow for Galarian Zen Mode Darmanitan
                formWithMarkers = formWithMarkers.filter((n) => n.indexOf('Mega Forme') == -1);
                formWithMarkers = formWithMarkers.filter((n) => n.indexOf('Totem Forme') == -1);

                if(formWithMarkers && formWithMarkers.length) {
                    (regionalFormData[base] = regionalFormData[base] || []).push(base);
                    regionalFormData[base] = regionalFormData[base].concat(formWithMarkers);
                }
            }
        }

        return regionalFormData;
    }

    /* egg_pngs_types_map = {
       'Rattata' : {
             <kantonian.png> : [Normal],
             <alolan.png> : [Normal, Dark],
          }
       }
    */
    static buildEggPngsTypesMap(baseNamesList, eggPngsList, typesList) {
        const map = {};
        for(const name in eggPngsList) {
            const base = baseNamesList[name];
            const png = eggPngsList[name];
            const types = typesList[name];
            (map[base] = map[base] || {})[png] = types;
        }

        return map;
    }

} // DexUtilities
/* This class handles creating, removing, and handling the DOM object actions
 * for the QoL Hub.
 */

class QoLHubBase {
    static DEFAULT_USER_SETTINGS = { // default settings when the script gets loaded the first time
        customCss: '',
        enableDaycare: true,
        shelterEnable: true,
        fishingEnable: true,
        publicFieldEnable: true,
        privateFieldEnable: true,
        partyMod: true,
        easyEvolve: true,
        labNotifier: true,
        dexFilterEnable: true,
        condenseWishforge: true
    };
    constructor(jQuery, localStorageMgr, GLOBALS, PAGES, SETTINGS) {
        this.jQuery = jQuery;
        this.localStorageMgr = localStorageMgr;
        this.GLOBALS = GLOBALS;
        this.PAGES = PAGES;
        this.SETTINGS_SAVE_KEY = GLOBALS.SETTINGS_SAVE_KEY;
        if(SETTINGS) {
            this.USER_SETTINGS = SETTINGS;
        }
        else {
            this.USER_SETTINGS = QoLHubBase.DEFAULT_USER_SETTINGS;
        }
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

        obj.jQuery(document).on('input', '.qolsetting', (function () { //Changes QoL settings
            obj.settingsChange(this.getAttribute('data-key'),
                obj.jQuery(this).val(),
                obj.jQuery(this).parent().parent().attr('class'),
                obj.jQuery(this).parent().attr('class'),
                (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
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
    }
    loadSettings() {
        if (this.localStorageMgr.getItem(this.SETTINGS_SAVE_KEY) === null) {
            this.saveSettings();
        } else {
            try {
                const countScriptSettings = Object.keys(this.USER_SETTINGS).length;
                const localStorageString = JSON.parse(this.localStorageMgr.getItem(this.SETTINGS_SAVE_KEY));
                const countLocalStorageSettings = Object.keys(localStorageString).length;
                // adds new objects (settings) to the local storage
                if (countLocalStorageSettings < countScriptSettings) {
                    const defaultsSetting = this.USER_SETTINGS;
                    const userSetting = JSON.parse(this.localStorageMgr.getItem(this.SETTINGS_SAVE_KEY));
                    const newSetting = this.jQuery.extend(true, {}, defaultsSetting, userSetting);

                    this.USER_SETTINGS = newSetting;
                    this.saveSettings();
                }
                // removes objects from the local storage if they don't exist anymore. Not yet possible..
                if (countLocalStorageSettings > countScriptSettings) {
                    //let defaultsSetting = QOLHUB.USER_SETTINGS;
                    //let userSetting = JSON.parse(this.localStorageMgr.getItem(QOLHUB.SETTINGS_SAVE_KEY));
                    this.saveSettings();
                }
            }
            catch (err) {
                this.saveSettings();
            }
            if (this.localStorageMgr.getItem(this.SETTINGS_SAVE_KEY) != this.USER_SETTINGS) {
                this.USER_SETTINGS = JSON.parse(this.localStorageMgr.getItem(this.SETTINGS_SAVE_KEY));
            }
        }
    }
    saveSettings() {
        this.localStorageMgr.setItem(this.SETTINGS_SAVE_KEY, JSON.stringify(this.USER_SETTINGS));
    }
    populateSettings() {
        for (const key in this.USER_SETTINGS) {
            if (Object.hasOwnProperty.call(this.USER_SETTINGS, key)) {
                const value = this.USER_SETTINGS[key];
                if (typeof value === 'boolean') {
                    Helpers.toggleSetting(key, value);
                }
                else if (typeof value === 'string') {
                    Helpers.toggleSetting(key, value);
                }
            }
        }
    }
    settingsChange(element, textElement) {
        if (JSON.stringify(this.USER_SETTINGS).indexOf(element) >= 0) { // userscript settings
            if (this.USER_SETTINGS[element] === false) {
                this.USER_SETTINGS[element] = true;
            } else if (this.USER_SETTINGS[element] === true) {
                this.USER_SETTINGS[element] = false;
            } else if (typeof this.USER_SETTINGS[element] === 'string') {
                this.USER_SETTINGS[element] = textElement;
            }
            this.saveSettings();
            return true;
        }
        return false;
    }
    clearPageSettings(pageName) {
        if (pageName !== 'None') { // "None" matches option in HTML
            this.PAGES.clearPageSettings(pageName);
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
        this.jQuery('.qolHubHead').css('background-color',  qolHubCssBackgroundHead);
        this.jQuery('.qolHubHead').css('color', qolHubCssTextColorHead);
        this.jQuery('.qolChangeLogHead').css('background-color', qolHubCssBackgroundHead);
        this.jQuery('.qolChangeLogHead').css('color', qolHubCssTextColorHead);
        this.jQuery('.qolChangeLogHead').css('border', qolHubDialogBorder);
        this.jQuery('.qolopencloselist.qolChangeLogContent').css('background-color', qolHubCssBackground);
        this.jQuery('.qolopencloselist.qolChangeLogContent').css('color',  qolHubCssTextColor);

        this.jQuery('.qolAllSettings').css('border', qolHubDialogBorder);

        const customCss = this.USER_SETTINGS.customCss;

        this.jQuery('.textareahub', document).append('<textarea id="qolcustomcss" rows="15" cols="60" class="qolsetting" data-key="customCss"/></textarea>');
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
/* This class handles creating, removing, and handling the DOM object actions
 * for the QoL Hub.
 */

class QoLHub extends QoLHubBase {
    constructor(jQuery, localStorageMgr, GLOBALS, PAGES, SETTINGS) {
        super(jQuery, localStorageMgr, GLOBALS, PAGES, SETTINGS);
    }
    setupHandlers() {
        super.setupHandlers();
        const obj = this;

        obj.jQuery(document).on('click', '#updateDex', (function () {
            obj.handleUpdateDexClick(document);
        }));

        // Issue #61 - Item 6 - Remove the 'Cleared!' message so the user knows they can click it again
        obj.jQuery(document).on('mouseover', '#clearCachedDex', (function () {
            obj.jQuery('#clearCachedDex').next().remove();
        }));

        // Issue #61 - Item 6 - Add a 'Cleared!' message so the user knows that the clearing works
        obj.jQuery(document).on('click', '#clearCachedDex', (function () {
            obj.jQuery('#clearCachedDex').next().remove();
            obj.localStorageMgr.removeItem(obj.GLOBALS.POKEDEX_EVOLVE_BY_LEVEL_KEY);
            obj.localStorageMgr.removeItem(obj.GLOBALS.POKEDEX_DEX_IDS_KEY);
            obj.localStorageMgr.removeItem(obj.GLOBALS.POKEDEX_EVOLUTION_TREE_DEPTH_KEY);
            obj.localStorageMgr.removeItem(obj.GLOBALS.POKEDEX_REGIONAL_FORMS_KEY);
            obj.jQuery('#clearCachedDex').after('<span> Cleared!</span>');
        }));
    }
    build(document) {
        super.build(document);

        const dexUpdateRowContents = `<table><tr><td colspan="2" class="qolDexUpdate">
          <input type='button' value="Update Pokedex" id="updateDex">
          <span>Date last updated:<span class="qolDate">""</span></span>
        </td></tr>
        <tr><td colspan="2" class="qolDexUpdate">
          <progress class="qolDexUpdateProgress" value="100" max="100"> 100% </progress>
          <span class="qolDexUpdateProgress">Complete!</span>
        </td></tr></table>`;
        this.jQuery('#qolDexUpdateRow').append(dexUpdateRowContents);

        const debuggingCornerRowAppend = `<input type='button' value="Reset Page Settings" id="resetPageSettings"><br><br>
            <span>
                Having issues with the "Update Pokedex" button or the Ready-to-Evolve feature in the Shelter?
                Use this button to erase the cached pokedex info, then use the <b>Update Pokedex</b> button to reload the pokedex.
            </span>
            <input type='button' value="Clear Cached Dex" id="clearCachedDex">`;
        this.jQuery('#qolDebuggingCornerRow').append(debuggingCornerRowAppend);

        this.jQuery('.qolDate', document).text(this.GLOBALS.DEX_UPDATE_DATE);
    }
    handleUpdateDexClick(document) {
        const obj = this;
        const localStorageManager = this.localStorageMgr;
        // Manually update GLOBALS.DEX_DATA
        localStorageManager.loadDexIntoGlobalsFromWeb(obj.jQuery, document, DexUtilities, obj.GLOBALS);

        // obj.GLOBALS.DEX_DATA will contain the latest info as is read from local storage
        // this handler updates the local storage
        const progressSpan = obj.jQuery('span.qolDexUpdateProgress', document)[0];
        progressSpan.textContent = 'Loading...';

        const date = (new Date()).toUTCString();
        obj.GLOBALS.DEX_UPDATE_DATE = date;
        obj.jQuery('.qolDate', document).text(obj.GLOBALS.DEX_UPDATE_DATE);
        localStorageManager.updateLocalStorageDex(obj.jQuery, document, date, obj.GLOBALS);

        // this will update the obj.GLOBALS.EVOLVE_BY_LEVEL_LIST
        // and local storage
        const virtualDocument = document.implementation.createHTMLDocument('virtual');
        DexUtilities.getMainDexPage(obj.jQuery).then((data) => {
            const html = obj.jQuery.parseHTML(data);
            const dex = obj.jQuery(html[html.length - 1], virtualDocument).find('#dexdata').html();
            const dexNumbers = localStorageManager.parseAndStoreDexNumbers(obj.GLOBALS, dex);

            if (dexNumbers.length > 0) {
                // update the progress bar in the hub
                const limit = dexNumbers.length;
                const progressBar = obj.jQuery('progress.qolDexUpdateProgress', document)[0];
                progressBar['max'] = limit;
                DexUtilities.loadDexPages(obj.jQuery, dexNumbers, progressBar, progressSpan).then((data) => {
                    const dexPagesHTML = data.map(d => (Array.isArray(d) ? d[0] : d));
                    DexUtilities.loadFormPages(obj.jQuery, virtualDocument, dexPagesHTML, progressBar, progressSpan).then((data) => {
                        const formPagesHTML = data.map(d => (Array.isArray(d) ? d[0] : d));

                        // Combine the arrays of HTML into one array
                        const allPagesHTML = dexPagesHTML.concat(formPagesHTML);

                        // Parse evolution data
                        const [parsedFamilies, dexIDs] = DexUtilities.parseEvolutionTrees(obj.jQuery, virtualDocument, DexPageParser, EvolutionTreeParser, allPagesHTML);

                        // Parse form data
                        const [formData, formMap] = DexUtilities.parseFormData(obj.jQuery, virtualDocument, DexPageParser, allPagesHTML);

                        // Build evolution tree depths
                        const evolutionTreeDepthList = DexUtilities.buildEvolutionTreeDepthsList(parsedFamilies, dexIDs, formData, formMap);

                        // Collect regional form data
                        const regionalFormMap = DexUtilities.buildRegionalFormsMap(formMap);

                        // Collect list of base names to make it easier down the line
                        const baseNames = DexUtilities.parseBaseNames(obj.jQuery, virtualDocument, DexPageParser, allPagesHTML);
                        // Collect list of egg pngs
                        const eggPngs = DexUtilities.parseEggsPngsList(obj.jQuery, virtualDocument, DexPageParser, allPagesHTML);
                        // Collect list of types
                        const types = DexUtilities.parseTypesList(obj.jQuery, virtualDocument, DexPageParser, obj.GLOBALS, allPagesHTML);
                        const eggPngsTypeMap = DexUtilities.buildEggPngsTypesMap(baseNames, eggPngs, types);

                        localStorageManager.saveEvolveByLevelList(obj.GLOBALS, parsedFamilies, dexIDs);
                        localStorageManager.saveEvolutionTreeDepths(obj.GLOBALS, evolutionTreeDepthList);
                        localStorageManager.saveRegionalFormsList(obj.GLOBALS, parsedFamilies, dexIDs, regionalFormMap);
                        localStorageManager.saveEggTypesMap(obj.GLOBALS, eggPngsTypeMap);
                        progressSpan.textContent = 'Complete!';
                    }, (error) => {
                        console.log(error);
                    }); // loadFormPages
                }, (error) => {
                    console.log(error);
                }); // loadDexData
            } // if dexNumbers.length > 0
            else {
                progressSpan.textContent = 'Complete!';
            }
        }, (error) => {
            console.log(error);
        });// getMainDexPage
    }
} // QoLHub

class Page {
    constructor(jQuery, localStorageMgr, ssk, ds, url) {
        this.jQuery = jQuery;
        this.localStorageMgr = localStorageMgr;
        this.settingsSaveKey = ssk;
        this.defaultSettings = ds;
        this.url = url;
        this.settings = this.defaultSettings;
    }

    onPage(w) {
        return w.location.href.indexOf(this.url) != -1;
    }

    loadSettings() {
        this.settings = this.localStorageMgr.loadSettings(
            this.jQuery,this.settingsSaveKey,
            this.defaultSettings,
            this.settings);
        // this.settings =
        //     Helpers.loadSettings(this.jQuery,this.settingsSaveKey,
        //         this.defaultSettings,
        //         this.settings);
    }

    saveSettings() {
        this.localStorageMgr.saveSettings(this.settingsSaveKey, this.settings);
        // Helpers.saveSettings(this.settingsSaveKey, this.settings);
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
                Helpers.toggleSetting(key, value);//, false);
            }
            else if (typeof value === 'string') {
                console.log('TODO - split and populate');
                // Helpers.toggleSetting(key, value, false);
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

class ShelterPageBase extends Page {
    constructor(jQuery, localStorageMgr, GLOBALS) {
        super(jQuery, localStorageMgr, GLOBALS.SHELTER_PAGE_SETTINGS_KEY, {
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
            findMale: true,
            findFemale: true,
            findNoGender: true,
            customEgg: true,
            customPokemon: true,
            customPng: false,
            shelterGrid: true,
        }, '/shelter');
        this.customArray = [];
        this.typeArray = [];
        const obj = this;
        this.observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                obj.customSearch(GLOBALS);
            });
        });

        // used to keep track of the currently selected match
        // matches can be selected via a shortcut key, specified via this.selectNextMatchKey
        this.selectNextMatchKey = 78; // 'n'
        this.currentlySelectedMatch = undefined;
    }

    setupHTML(GLOBALS) {
        this.jQuery('.tabbed_interface.horizontal>div').removeClass('tab-active');
        this.jQuery('.tabbed_interface.horizontal>ul>li').removeClass('tab-active');
        document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterbegin', '<li class="tab-active"><label>Search</label></li>');
        document.querySelector('.tabbed_interface.horizontal>ul>li').insertAdjacentHTML('afterend', '<li class=""><label>Sort</label></li>');
        document.querySelector('.tabbed_interface.horizontal>ul').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.shelterOptionsHTML);
        document.querySelector('#shelteroptionsqol').insertAdjacentHTML('afterend', '<div id="qolsheltersort"><label><input type="checkbox" class="qolsetting" data-key="shelterGrid"/><span>Sort by Grid</span></label>');
        this.jQuery('#shelteroptionsqol').addClass('tab-active');

        document.querySelector('#sheltercommands').insertAdjacentHTML('beforebegin', '<div id="sheltersuccess"></div>');

        const theField = Helpers.textSearchDiv('numberDiv', 'findCustom', 'removeShelterTextfield', 'customArray');
        const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'findType', GLOBALS.TYPE_OPTIONS,
            'removeShelterTypeList', 'fieldTypes', 'typeArray');

        this.customArray = this.settings.findCustom.split(',');
        this.typeArray = this.settings.findType.split(',');

        Helpers.setupFieldArrayHTML(this.jQuery, this.customArray, 'searchkeys', theField, 'numberDiv');
        Helpers.setupFieldArrayHTML(this.jQuery, this.typeArray, 'shelterTypes', theType, 'typeNumber');

        this.jQuery('[data-shelter=reload]').addClass('customSearchOnClick');
        this.jQuery('[data-shelter=whiteflute]').addClass('customSearchOnClick');
        this.jQuery('[data-shelter=blackflute]').addClass('customSearchOnClick');
    }
    setupCSS() {
        const shelterSuccessCss = this.jQuery('#sheltercommands').css('background-color');
        this.jQuery('#sheltersuccess').css('background-color', shelterSuccessCss);
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
        const theField = Helpers.textSearchDiv('numberDiv', 'findCustom', 'removeShelterTextfield', 'customArray');
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
        const theList = Helpers.selectSearchDiv('typeNumber', 'types', 'findType', GLOBALS.TYPE_OPTIONS,
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
        if (selected.length) {
            const searchResult = SEARCH_DATA[keyIndex + 2]; //type of Pokémon found
            const imgResult = selected.length + ' ' + searchResult; //amount + type found
            const imgFitResult = SEARCH_DATA[keyIndex + 3]; //image for type of Pokémon
            const shelterBigImg = selected.parent().prev().children('img.big');
            this.jQuery(shelterBigImg).addClass('shelterfoundme');

            this.insertShelterFoundDiv(selected.length, imgResult, imgFitResult);
        }
    }
    customSearch(GLOBALS) {
        const obj = this;
        const SEARCH_DATA = GLOBALS.SHELTER_SEARCH_DATA;

        const dexData = GLOBALS.DEX_DATA;
        // search whatever you want to find in the shelter & grid

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
            // this.jQuery('#shelterpage #shelter #shelterarea:before').css({'display' : 'none!important'});
            // this.jQuery('<pseudo:before>').attr('style', 'display: none!important');
            this.jQuery('head').append('<style id="sheltergridthingy">#shelterarea:before{display:none !important;}</style>');
        }

        //search values depending on settings
        //emptying the sheltersuccess div to avoid duplicates
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

        if (this.settings.findNewPokemon === true) {
            const key = 'findNewPokemon';
            const value = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 1];
            const selected = this.jQuery('#shelterarea .tooltip_content:contains(' + value + ')');
            if (selected.length) {
                const searchResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 2];
                const imgFitResult = SEARCH_DATA[SEARCH_DATA.indexOf(key) + 3];
                const tooltipResult = selected.length + ' ' + searchResult;
                const shelterImgSearch = selected;
                const shelterBigImg = shelterImgSearch.prev().children('img.big');
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
                    const shelterBigImg = shelterImgSearch.prev().children('img.big');
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
                                const shelterBigImg = shelterImgSearch.parent().prev().children('img.big');
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
                            const shelterBigImg = shelterImgSearch.parent().prev().children('img.big');
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
                        const shelterBigImg = shelterImgSearch.prev().children('img.big');
                        this.jQuery(shelterBigImg).addClass('shelterfoundme');
                        this.insertShelterFoundDiv(selected.length, tooltipResult, eggPng);
                    }
                }

                //imgSearch with Pokémon
                if (this.settings.customPng === true) {
                    const selected = this.jQuery('#shelterarea img.big[src*="' + customValue + '"]');
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
            for (let i = 0; i < filteredTypeArray.length; i++) {
                const value = filteredTypeArray[i];
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
                        const shelterBigImg = shelterImgSearch.prev().children('img.big');
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
                        const shelterBigImg = shelterImgSearch.prev().children('img.big');
                        this.jQuery(shelterBigImg).addClass('shelterfoundme');
                    }

                    this.insertShelterTypeFoundDiv(typePokemonNames.length, foundType, 'Pokemon', typePokemonNames);
                }
            }
        } // filteredTypeArray
    } // customSearch
}

class ShelterPage extends ShelterPageBase {
    constructor(jQuery, localStorageMgr, GLOBALS) {
        super(jQuery, localStorageMgr, GLOBALS);
        this.settings.findReadyToEvolve = false;
        this.settings.findNFE = false;

        // when the page is loaded, check to see if the data needed for finding eggs by type is loaded (if it's needed)
        if (this.onPage(window) &&
            this.settings.findTypeEgg &&
            !(GLOBALS.EGGS_PNG_TO_TYPES_LIST || JSON.parse(this.localStorageMgr.getItem(GLOBALS.POKEDEX_EGG_TYPES_MAP_KEY)))) {
            window.alert('Message from QoL script:\nUnable to load list of pokemon eggs and their types, ' +
                'which is used to distinguish eggs with the same name but different types (Vulpix and ' +
                'Alolan Vulpix).\n\nCan still find eggs by type, but there may be mistakes. ' +
                'Please clear and reload your pokedex data by clicking the "Clear Cached Dex" ' +
                'and then clicking the "Update Pokedex" button in the QoL Hub to load list of eggs and types.');
        }
    }
    searchForReadyToEvolveByLevel(GLOBALS) {
        const obj = this;
        const selected = this.jQuery('#shelterarea .tooltip_content');
        const readyBigImg = [];
        selected.each((idx, s) => {
            const text = s.textContent.split(' ');
            const name = text[0];
            const level = parseInt(text[1].substring(4));

            // get level that pokemon needs to be at to evolve
            let evolveLevel = undefined;
            if (GLOBALS.EVOLVE_BY_LEVEL_LIST[name] !== undefined) {
                evolveLevel = parseInt(GLOBALS.EVOLVE_BY_LEVEL_LIST[name].split(' ')[1]);
            }

            if (evolveLevel !== undefined && level >= evolveLevel) {
                const shelterBigImg = obj.jQuery(s).prev().children('img.big');
                readyBigImg.push(shelterBigImg);
            }
        });

        for (let i = 0; i < readyBigImg.length; i++) {
            this.jQuery(readyBigImg[i]).addClass('shelterfoundme');
        }

        const imgResult = readyBigImg.length + ' ' + 'ready to evolve';
        this.insertShelterFoundDiv(readyBigImg.length, imgResult, '');
    }
    highlightByHowFullyEvolved(GLOBALS, pokemonElem) {
        // if a pokemon is clicked-and-dragged, the tooltip element after the pokemon
        // will not exist. If this occurs. don't try highlighting anything until the
        // pokemon is "put down"
        if (!this.jQuery(pokemonElem).next().length) { return; }

        const tooltipElem = this.jQuery(pokemonElem).next()[0];
        const tooltip = {
            species: tooltipElem.textContent.split(' ')[0],
            forme: ''
        };
        let pokemon = tooltip['species'];

        if (GLOBALS.EVOLUTIONS_LEFT !== undefined && GLOBALS.EVOLUTIONS_LEFT !== null) {
            const evolutionData = GLOBALS.EVOLUTIONS_LEFT;
            // if can't find the pokemon directly, try looking for its form data
            if (!evolutionData[pokemon]) {
                if (tooltip['forme']) {
                    pokemon = pokemon + ' [' + tooltip['forme'] + ']';
                }
            }
            if (!evolutionData[pokemon]) {
                // Do not log error here. Repeated errors can (will) slow down the page
                // console.error(`Private Fields Page - Could not find evolution data for ${pokemon}`);
            } else {
                const evolutionsLeft = evolutionData[pokemon].remaining;

                if (evolutionsLeft === 1) {
                    this.jQuery(pokemonElem).children('img.big').addClass('oneevolutionleft');
                } else if (evolutionsLeft === 2) {
                    this.jQuery(pokemonElem).children('img.big').addClass('twoevolutionleft');
                }
            }
        } else {
            console.error('Unable to load evolution data. In QoL Hub, please clear cached dex and reload dex data');
        }
    }
    customSearch(GLOBALS) {
        super.customSearch(GLOBALS);
        const obj = this;

        const dexData = GLOBALS.DEX_DATA;
        // search whatever you want to find in the shelter & grid

        if (this.settings.findNFE === true) {
            this.jQuery('#shelterarea>[data-stage=pokemon]').each(function () {
                obj.highlightByHowFullyEvolved(GLOBALS, this);
            });
        } else {
            this.jQuery('.oneevolutionleft').each((k, v) => {
                obj.jQuery(v).removeClass('oneevolutionleft');
            });
            this.jQuery('.twoevolutionleft').each((k, v) => {
                obj.jQuery(v).removeClass('twoevolutionleft');
            });
        }

        if (this.settings.findReadyToEvolve === true) {
            if (GLOBALS.EVOLVE_BY_LEVEL_LIST === null) {
                window.alert('Unable to load list of pokemon that can evolve by level. Please try updating dex ' +
                    'by clicking "Update Pokedex" in the QoL Hub. If the problem persists, please post in the thread.\n\n' +
                    'Disabling this function until the checkbox is clicked again');
                this.settings.findReadyToEvolve = false;
                // uncheck checkbox
                this.jQuery('[data-key=findReadyToEvolve]')[0].checked = false;
            } else {
                this.searchForReadyToEvolveByLevel(GLOBALS);
            }
        }

        //loop to find all the types
        const filteredTypeArray = this.typeArray.filter(v => v != '');

        if (filteredTypeArray.length > 0) {
            const eggPngsToTypes = GLOBALS.EGGS_PNG_TO_TYPES_LIST ||
                JSON.parse(this.localStorageMgr.getItem(GLOBALS.POKEDEX_EGG_TYPES_MAP_KEY)) || undefined;
            for (let i = 0; i < filteredTypeArray.length; i++) {
                const value = filteredTypeArray[i];
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
                        if (eggPngsToTypes) {
                            const imgUrl = obj.jQuery(obj.jQuery(this).prev().find('img')[0]).attr('src').replace('https://pfq-static.com/img/', '');
                            searchTypeOne = eggPngsToTypes[searchPokemon] &&
                                eggPngsToTypes[searchPokemon][imgUrl] &&
                                ('' + eggPngsToTypes[searchPokemon][imgUrl][0]);
                            searchTypeTwo = eggPngsToTypes[searchPokemon] &&
                                eggPngsToTypes[searchPokemon][imgUrl] &&
                                ('' + (eggPngsToTypes[searchPokemon][imgUrl][1] || -1));
                        } else {
                            const searchPokemonIndex = dexData.indexOf('"' + searchPokemon + '"');
                            searchTypeOne = dexData[searchPokemonIndex + 1];
                            searchTypeTwo = dexData[searchPokemonIndex + 2];
                        }
                        if ((searchTypeOne === value) || (searchTypeTwo === value)) {
                            typePokemonNames.push(searchPokemon);
                            pokemonElems.push(this);
                        }
                    });

                    for (let o = 0; o < pokemonElems.length; o++) {
                        const shelterImgSearch = this.jQuery(pokemonElems[o]);
                        const shelterBigImg = shelterImgSearch.prev().children('img.big');
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
                        const shelterBigImg = shelterImgSearch.prev().children('img.big');
                        this.jQuery(shelterBigImg).addClass('shelterfoundme');
                    }

                    this.insertShelterTypeFoundDiv(typePokemonNames.length, foundType, 'Pokemon', typePokemonNames);
                }
            }
        } // filteredTypeArray
    } // customSearch
}

class PrivateFieldsPageBase extends Page {
    constructor(jQuery, localStorageMgr, GLOBALS) {
        super(jQuery, localStorageMgr, GLOBALS.PRIVATE_FIELDS_PAGE_SETTINGS_KEY, {
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
        }, 'fields');
        this.customArray = [];
        this.typeArray = [];
        this.natureArray = [];
        this.eggGroupArray = [];
        const obj = this;
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                obj.customSearch(GLOBALS);
                obj.handleTooltipSettings();
            });
        });
    }

    onPage(w) {
        return w.location.href.indexOf('fields') != -1 &&
            w.location.href.indexOf('fields/') == -1;
    }

    setupHTML(GLOBALS) {
        document.querySelector('#field_field').insertAdjacentHTML('beforebegin', GLOBALS.TEMPLATES.privateFieldTooltipModHTML);
        document.querySelector('#field_field').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.privateFieldSearchHTML);

        const theField = Helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray');
        const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS,
            'removePrivateFieldTypeSearch', 'fieldTypes', 'typeArray');
        const theNature = Helpers.selectSearchDiv('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS,
            'removePrivateFieldNature', 'natureTypes', 'natureArray');
        const theEggGroup = Helpers.selectSearchDiv('eggGroupNumber', 'eggGroups', 'fieldEggGroup', GLOBALS.EGG_GROUP_OPTIONS,
            'removePrivateFieldEggGroup', 'eggGroupTypes', 'eggGroupArray');
        this.customArray = this.settings.fieldCustom.split(',');
        this.typeArray = this.settings.fieldType.split(',');
        this.natureArray = this.settings.fieldNature.split(',');
        this.eggGroupArray = this.settings.fieldEggGroup.split(',');
        Helpers.setupFieldArrayHTML(this.jQuery, this.customArray, 'searchkeys', theField, 'numberDiv');
        Helpers.setupFieldArrayHTML(this.jQuery, this.typeArray, 'fieldTypes', theType, 'typeNumber');
        Helpers.setupFieldArrayHTML(this.jQuery, this.natureArray, 'natureTypes', theNature, 'natureNumber');
        Helpers.setupFieldArrayHTML(this.jQuery, this.eggGroupArray, 'eggGroupTypes', theEggGroup, 'eggGroupNumber');

        this.handleTooltipSettings();
    }
    setupCSS() {
        // same as public fields
        const fieldOrderCssColor = this.jQuery('#field_field').css('background-color');
        const fieldOrderCssBorder = this.jQuery('#field_field').css('border');
        this.jQuery('#fieldorder').css('background-color', '' + fieldOrderCssColor + '');
        this.jQuery('#fieldorder').css('border', '' + fieldOrderCssBorder + '');
        this.jQuery('#fieldsearch').css('background-color', '' + fieldOrderCssColor + '');
        this.jQuery('#fieldsearch').css('border', '' + fieldOrderCssBorder + '');
        this.jQuery('#tooltipenable').css('max-width', '600px');
        this.jQuery('#tooltipenable').css('position', 'relative');
        this.jQuery('#tooltipenable').css('margin', '16px auto');
        this.jQuery('.collapsible').css('background-color', '' + fieldOrderCssColor + '');
        this.jQuery('.collapsible').css('border', '' + fieldOrderCssBorder + '');
        this.jQuery('.collapsible_content').css('background-color', '' + fieldOrderCssColor + '');

        this.jQuery('.tooltiptext').css('background-color', this.jQuery('.tooltip_content').eq(0).css('background-color'));
        this.jQuery('.tooltiptext').css('border', '' + fieldOrderCssBorder + '');

        // Issue #47 - Since the default Pokefarm CSS for buttons does not use the same color
        // settings as most of the text on the site, manually set the text color for
        // '.collapsible' to match the text around it
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
            obj.handleTooltipSettings();
            obj.saveSettings();
        }));

        this.jQuery(document).on('load', '.field', (function () {
            obj.customSearch(GLOBALS);
        }));

        this.jQuery(document).on('click', '*[data-menu="release"]', (function (e) { //select all feature
            e.stopPropagation();
            obj.releaseEnableReleaseAll();
        }));

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

        this.jQuery(document).on('click', '*[data-menu="bulkmove"]', (function () { // select all feature
            obj.moveEnableReleaseAll();
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
        if (selected.length) {
            // next line different from shelter
            const bigImg = selected.parent().parent().parent().parent().prev().children('img.big');
            this.jQuery(bigImg).addClass('privatefoundme');
        }
    }
    searchForCustomPokemon(value, male, female, nogender) {
        const genderMatches = [];
        if (male) { genderMatches.push('[M]'); }
        if (female) { genderMatches.push('[F]'); }
        if (nogender) { genderMatches.push('[N]'); }

        if (genderMatches.length > 0) {
            for (let i = 0; i < genderMatches.length; i++) {
                const genderMatch = genderMatches[i];
                const selected = this.jQuery('#field_field .tooltip_content:containsIN(' + value + ') img[title*=\'' + genderMatch + '\']');
                if (selected.length) {
                    const shelterBigImg = selected.parent().parent().parent().parent().prev().children('img.big');
                    this.jQuery(shelterBigImg).addClass('privatefoundme');
                }
            }
        }

        //No genders
        else {
            const selected = this.jQuery('#field_field .tooltip_content:containsIN(' + value + ')');
            if (selected.length) {
                const shelterBigImg = selected.parent().parent().parent().parent().prev().children('img.big');
                this.jQuery(shelterBigImg).addClass('privatefoundme');
            }
        }

    }
    searchForCustomEgg(value) {
        const selected = this.jQuery('#field_field .tooltip_content:containsIN(' + value + '):contains("Egg")');
        if (selected.length) {
            const shelterBigImg = selected.parent().parent().parent().parent().prev().children('img.big');
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
        const obj = this;
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
                const itemBigImgs = items.parent().parent().parent().parent().prev().children('img.big');
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
                const tooltipData = Helpers.parseFieldPokemonTooltip(obj.jQuery, GLOBALS, obj.jQuery(searchPokemonBigImg).parent().next()[0]);

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
    addSelectSearch(cls, name, dataKey, options, id, divParent, arrayName) {
        const theList = Helpers.selectSearchDiv(cls, name, dataKey, options, id, divParent, arrayName);
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
        const theField = Helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray');
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

class PrivateFieldsPage extends PrivateFieldsPageBase {
    constructor(jQuery, localStorageMgr, GLOBALS) {
        super(jQuery, localStorageMgr, GLOBALS);
        this.settings.fieldNFE = false;
    }
    highlightByHowFullyEvolved(GLOBALS, pokemonElem) {
        // if a pokemon is clicked-and-dragged, the tooltip element after the pokemon
        // will not exist. If this occurs. don't try highlighting anything until the
        // pokemon is "put down"
        if (!this.jQuery(pokemonElem).next().length) { return; }

        const tooltip = Helpers.parseFieldPokemonTooltip(this.jQuery, GLOBALS, this.jQuery(pokemonElem).next()[0]);
        let pokemon = tooltip['species'];

        const key = GLOBALS.POKEDEX_EVOLUTION_TREE_DEPTH_KEY;
        if (this.localStorageMgr.getItem(key) !== null) {
            const evolutionData = JSON.parse(this.localStorageMgr.getItem(key));
            if (Object.keys(evolutionData).length > 0) {
                // if can't find the pokemon directly, try looking for its form data
                if (!evolutionData[pokemon]) {
                    if (tooltip['forme']) {
                        pokemon = pokemon + ' [' + tooltip['forme'] + ']';
                    }
                }
                if (!evolutionData[pokemon]) {
                    console.error(`Private Fields Page - Could not find evolution data for ${pokemon}`);
                } else {
                    const evolutionsLeft = evolutionData[pokemon].remaining;

                    if (evolutionsLeft === 1) {
                        this.jQuery(pokemonElem).children('img.big').addClass('oneevolutionleft');
                    } else if (evolutionsLeft === 2) {
                        this.jQuery(pokemonElem).children('img.big').addClass('twoevolutionleft');
                    }
                }
            } else {
                console.error('Unable to load evolution data. In QoL Hub, please clear cached dex and reload dex data');
            }
        } else {
            console.error('Unable to load evolution data. In QoL Hub, please clear cached dex and reload dex data');
        }
    }
    customSearch(GLOBALS) {
        super.customSearch(GLOBALS);
        const obj = this;
        if (this.settings.fieldNFE === true) {
            obj.jQuery('.fieldmon').each(function () {
                obj.highlightByHowFullyEvolved(GLOBALS, this);
            });
        } else {
            obj.jQuery('.oneevolutionleft').each((k, v) => {
                obj.jQuery(v).removeClass('oneevolutionleft');
            });
            obj.jQuery('.twoevolutionleft').each((k, v) => {
                obj.jQuery(v).removeClass('twoevolutionleft');
            });
        }
    }
}

const PublicFieldsBase = Page;

class PublicFieldsPage extends PublicFieldsBase {
    constructor(jQuery, localStorageMgr, GLOBALS) {
        super(jQuery, localStorageMgr, GLOBALS.PUBLIC_FIELDS_PAGE_SETTINGS_KEY, {
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
        }, 'fields/');
        this.customArray = [];
        this.typeArray = [];
        this.natureArray = [];
        this.eggGroupArray = [];
        const obj = this;
        this.observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                obj.customSearch(GLOBALS);
                obj.handleTooltipSettings();
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
        document.querySelector('#field_field').insertAdjacentHTML('beforebegin', GLOBALS.TEMPLATES.publicFieldTooltipModHTML);
        document.querySelector('#field_field').insertAdjacentHTML('beforebegin', GLOBALS.TEMPLATES.fieldSortHTML);
        document.querySelector('#field_field').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.fieldSearchHTML);

        const theField = Helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray');
        const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'fieldType', GLOBALS.TYPE_OPTIONS,
            'removeFieldTypeSearch', 'fieldTypes', 'typeArray');
        const theNature = Helpers.selectSearchDiv('natureNumber', 'natures', 'fieldNature', GLOBALS.NATURE_OPTIONS,
            'removeFieldNature', 'natureTypes', 'natureArray');
        const theEggGroup = Helpers.selectSearchDiv('eggGroupNumber', 'eggGroups', 'fieldEggGroup', GLOBALS.EGG_GROUP_OPTIONS,
            'removeFieldEggGroup', 'eggGroupTypes', 'eggGroupArray');
        this.customArray = this.settings.fieldCustom.split(',');
        this.typeArray = this.settings.fieldType.split(',');
        this.natureArray = this.settings.fieldNature.split(',');
        this.eggGroupArray = this.settings.fieldEggGroup.split(',');
        Helpers.setupFieldArrayHTML(this.jQuery, this.customArray, 'searchkeys', theField, 'numberDiv');
        Helpers.setupFieldArrayHTML(this.jQuery, this.typeArray, 'fieldTypes', theType, 'typeNumber');
        Helpers.setupFieldArrayHTML(this.jQuery, this.natureArray, 'natureTypes', theNature, 'natureNumber');
        Helpers.setupFieldArrayHTML(this.jQuery, this.eggGroupArray, 'eggGroupTypes', theEggGroup, 'eggGroupNumber');

        this.handleTooltipSettings();
    }
    setupCSS() {
        const fieldOrderCssColor = this.jQuery('#field_field').css('background-color');
        const fieldOrderCssBorder = this.jQuery('#field_field').css('border');
        this.jQuery('#fieldorder').css('background-color', '' + fieldOrderCssColor + '');
        this.jQuery('#fieldorder').css('border', '' + fieldOrderCssBorder + '');
        this.jQuery('#fieldsearch').css('background-color', '' + fieldOrderCssColor + '');
        this.jQuery('#fieldsearch').css('border', '' + fieldOrderCssBorder + '');
        this.jQuery('#tooltipenable').css('max-width', '600px');
        this.jQuery('#tooltipenable').css('position', 'relative');
        this.jQuery('#tooltipenable').css('margin', '16px auto');
        this.jQuery('.collapsible').css('background-color', '' + fieldOrderCssColor + '');
        this.jQuery('.collapsible').css('border', '' + fieldOrderCssBorder + '');
        this.jQuery('.collapsible_content').css('background-color', '' + fieldOrderCssColor + '');

        this.jQuery('.tooltiptext').css('background-color', this.jQuery('.tooltip_content').eq(0).css('background-color'));
        this.jQuery('.tooltiptext').css('border', '' + fieldOrderCssBorder + '');

        // Issue #47 - Since the default Pokefarm CSS for buttons does not use the same color
        // settings as most of the text on the site, manually set the text color for
        // '.collapsible' to match the text around it
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
            obj.handleTooltipSettings();
            obj.saveSettings();
        }));

        obj.jQuery(document).on('click input', '#fieldorder, #field_field, #field_berries, #field_nav', (function() { //field sort
            obj.customSearch(GLOBALS);
        }));

        document.addEventListener('keydown', function() {
            obj.customSearch(GLOBALS);
        });

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

        obj.jQuery('input.qolalone').on('change', function() { //only 1 textbox may be true
            obj.jQuery('input.qolalone').not(this).prop('checked', false);
        });

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
        if (selected.length) {
            // next line different from shelter
            const bigImg = selected.parent().parent().parent().parent().prev().children('img.big');
            this.jQuery(bigImg).addClass('publicfoundme');
        }
    }
    searchForCustomPokemon(value, male, female, nogender) {
        const genderMatches = [];
        if (male) { genderMatches.push('[M]'); }
        if(female) { genderMatches.push('[F]'); }
        if(nogender) { genderMatches.push('[N]'); }

        if(genderMatches.length > 0) {
            for(let i = 0; i < genderMatches.length; i++) {
                const genderMatch = genderMatches[i];
                const selected = this.jQuery('#field_field .tooltip_content:containsIN('+value+') img[title*=\'' + genderMatch + '\']');
                if (selected.length) {
                    const shelterBigImg = selected.parent().parent().parent().parent().prev().children('img.big');
                    this.jQuery(shelterBigImg).addClass('publicfoundme');
                }
            }
        }

        //No genders
        else {
            const selected = this.jQuery('#field_field .tooltip_content:containsIN('+value+'):not(:containsIN("Egg"))');
            if (selected.length) {
                const shelterBigImg = selected.parent().parent().parent().parent().prev().children('img.big');
                this.jQuery(shelterBigImg).addClass('publicfoundme');
            }
        }

    }
    searchForCustomEgg(value) {
        const selected = this.jQuery('#field_field .tooltip_content:containsIN('+value+'):contains("Egg")');
        if (selected.length) {
            const shelterBigImg = selected.parent().parent().parent().parent().prev().children('img.big');
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

        /////////////////////////////////////////////////
        //////////////////// sorting ////////////////////
        /////////////////////////////////////////////////
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
                    this.jQuery('#pokemonclickcount').css({'color' : '#059121'});
                }
                if (pokemonClicked !== JSON.parse(pokemonInField)) {
                    this.jQuery('#pokemonclickcount').css({'color' : '#a30323'});
                }
            }
        }

        /////////////////////////////////////////////////
        /////////////////// searching ///////////////////
        /////////////////////////////////////////////////
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
                const itemBigImgs = items.parent().parent().parent().parent().prev().children('img.big');
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
                const tooltipData = Helpers.parseFieldPokemonTooltip(obj.jQuery, GLOBALS, obj.jQuery(searchPokemonBigImg).parent().next()[0]);

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
    } // customSearch
    addSelectSearch(cls, name, dataKey, options, id, divParent, arrayName) {
        const theList = Helpers.selectSearchDiv(cls, name, dataKey, options, id, divParent, arrayName);
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
        const theField = Helpers.textSearchDiv('numberDiv', 'fieldCustom', 'removeTextField', 'customArray');
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

class LabPageBase extends Page {
    constructor(jQuery, localStorageMgr, GLOBALS) {
        super(jQuery, localStorageMgr, GLOBALS.LAB_PAGE_SETTINGS_KEY, {
            findLabEgg: '', // same as findCustom in shelter
            customEgg: true,
            findLabType: '', // same as findType in shelter
            findTypeEgg: true,
        }, '/lab');
        this.searchArray = [];
        this.typeArray = [];
        this.globals = GLOBALS;
        const obj = this;
        this.observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                obj.customSearch();
            });
        });
    }

    setupHTML(GLOBALS) {
        document.querySelector('#eggsbox360>p.center').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.labOptionsHTML);
        document.querySelector('#egglist').insertAdjacentHTML('afterend', '<div id="labsuccess"></div>');

        const theField = Helpers.textSearchDiv('numberDiv', 'findLabEgg', 'removeLabSearch', 'searchArray');
        const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'findLabType', GLOBALS.TYPE_OPTIONS,
            'removeLabTypeList', 'labTypes', 'typeArray');

        this.searchArray = this.settings.findLabEgg.split(',');
        this.typeArray = this.settings.findLabType.split(',');

        Helpers.setupFieldArrayHTML(this.jQuery, this.searchArray, 'searchkeys', theField, 'numberDiv');
        Helpers.setupFieldArrayHTML(this.jQuery, this.typeArray, 'labTypes', theType, 'typeNumber');
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
        const theField = Helpers.textSearchDiv('numberDiv', 'findLabEgg', 'removeLabSearch', 'searchArray');
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
        const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'findLabType', GLOBALS.TYPE_OPTIONS,
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

class LabPage extends LabPageBase {
    constructor(jQuery, localStorageMgr, GLOBALS) {
        super(jQuery, localStorageMgr, GLOBALS);

        // when the page is loaded, check to see if the data needed for finding eggs by type is loaded (if it's needed)
        if (this.onPage(window) &&
            this.settings.findTypeEgg &&
            !(GLOBALS.EGGS_PNG_TO_TYPES_LIST || JSON.parse(this.localStorageMgr.getItem(GLOBALS.POKEDEX_EGG_TYPES_MAP_KEY)))) {
            window.alert('Message from QoL script:\nUnable to load list of pokemon eggs and their types, ' +
                'which is used to distinguish eggs with the same name but different types (Vulpix and ' +
                'Alolan Vulpix).\n\nCan still find eggs by type, but there may be mistakes. ' +
                'Please clear and reload your pokedex data by clicking the "Clear Cached Dex" ' +
                'and then clicking the "Update Pokedex" button in the QoL Hub to load list of eggs and types.');
        }
    }
    getTypesForEgg(searchPokemon) {
        const dexData = this.globals.DEX_DATA;
        const eggPngsToTypes = this.globals.EGGS_PNG_TO_TYPES_LIST ||
            JSON.parse(this.localStorageMgr.getItem(this.globals.POKEDEX_EGG_TYPES_MAP_KEY)) || undefined;
        let searchTypeOne = '';
        let searchTypeTwo = '';
        if (eggPngsToTypes) {
            const imgUrl = this.jQuery(this).next().attr('src').replace('https://pfq-static.com/img/', '');
            searchTypeOne = eggPngsToTypes[searchPokemon] &&
                eggPngsToTypes[searchPokemon][imgUrl] &&
                ('' + eggPngsToTypes[searchPokemon][imgUrl][0]);
            searchTypeTwo = eggPngsToTypes[searchPokemon] &&
                eggPngsToTypes[searchPokemon][imgUrl] &&
                ('' + (eggPngsToTypes[searchPokemon][imgUrl][1] || -1));
        } else {
            const searchPokemonIndex = dexData.indexOf('"' + searchPokemon + '"');
            searchTypeOne = dexData[searchPokemonIndex + 1];
            searchTypeTwo = dexData[searchPokemonIndex + 2];
        }
        return [searchTypeOne, searchTypeTwo];
    }
}
const FishingBase = Page;

class FishingPage extends FishingBase {
    constructor(jQuery, localStorageMgr, GLOBALS) {
        super(jQuery, localStorageMgr, GLOBALS.FISHING_PAGE_SETTINGS_KEY, {}, 'fishing');
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

const MultiuserBase = Page;

class MultiuserPage extends MultiuserBase {
    constructor(jQuery, localStorageMgr, GLOBALS) {
        super(jQuery, localStorageMgr, GLOBALS.MULTIUSER_PAGE_SETTINGS_KEY, {
            hideDislike: false,
            hideAll: false,
            niceTable: false,
        }, 'users/');
        const obj = this;
        this.observer = new MutationObserver(function (mutations) {
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
            this.jQuery('#multiuser .party>div').removeClass('qolpartyclickalot');
            this.jQuery('#multiuser .party>div>.action a[data-berry]').removeClass('qolpartyclickz');
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
            this.jQuery('#multiuser .party>div').removeClass('qolpartyclickalot');
            this.jQuery('#multiuser .party>div>.action a[data-berry]').removeClass('qolpartyclickz');
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
            this.jQuery('#multiuser .party>div').removeClass('qolpartyclickalot');
            this.jQuery('#multiuser .party>div>.action a[data-berry]').removeClass('qolpartyclickz');
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
            this.jQuery('#multiuser .party>div').addClass('qolpartyclickalot');
            this.jQuery('#multiuser .party>div>.action a[data-berry]').addClass('qolpartyclickz');
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

class FarmPageBase extends Page {
    DEFAULT_SETTINGS(GLOBALS) {
        const d = { TYPE_APPEND: {} };
        // .TYPE_APPEND needs to be fully defined before it can be used in kNOWN_EXCEPTIONS
        for (let i = 0; i < GLOBALS.TYPE_LIST.length; i++) {
            const type = GLOBALS.TYPE_LIST[i];
            d.TYPE_APPEND[type.toUpperCase()] = '.' + i;
        }
        d.TYPE_APPEND['NONE'] = '.' + GLOBALS.TYPE_LIST.length;
        d.KNOWN_EXCEPTIONS = {
            'Gastrodon [Orient]': [d.TYPE_APPEND['WATER'], d.TYPE_APPEND['GROUND']],
            'Gastrodon [Occident]': [d.TYPE_APPEND['WATER'], d.TYPE_APPEND['GROUND']],
            'Wormadam [Plant Cloak]': [d.TYPE_APPEND['BUG'], d.TYPE_APPEND['GRASS']],
            'Wormadam [Trash Cloak]': [d.TYPE_APPEND['BUG'], d.TYPE_APPEND['STEEL']],//, d.['GRASS']],
            'Chilldoom': [d.TYPE_APPEND['DARK'], d.TYPE_APPEND['ICE']],
            'Raticate [Alolan Forme]': [d.TYPE_APPEND['DARK'], d.TYPE_APPEND['NORMAL']],
            'Ninetales [Alolan Forme]': [d.TYPE_APPEND['ICE'], d.TYPE_APPEND['FAIRY']],
            'Exeggutor [Alolan Forme]': [d.TYPE_APPEND['GRASS'], d.TYPE_APPEND['DRAGON']],
            'Marowak [Alolan Forme]': [d.TYPE_APPEND['FIRE'], d.TYPE_APPEND['GHOST']],
            'Dugtrio [Alolan Forme]': [d.TYPE_APPEND['GROUND'], d.TYPE_APPEND['STEEL']],
            'Graveler [Alolan Forme]': [d.TYPE_APPEND['ROCK'], d.TYPE_APPEND['ELECTRIC']],
            'Golem [Alolan Forme]': [d.TYPE_APPEND['ROCK'], d.TYPE_APPEND['ELECTRIC']],
            'Muk [Alolan Forme]': [d.TYPE_APPEND['POISON'], d.TYPE_APPEND['DARK']],
            'Raichu [Alolan Forme]': [d.TYPE_APPEND['ELECTRIC'], d.TYPE_APPEND['PSYCHIC']],
        };
        return d;
    }
    constructor(jQuery, localStorageMgr, GLOBALS) {
        super(jQuery, localStorageMgr, GLOBALS.FARM_PAGE_SETTINGS_KEY, {}, 'farm#tab=1');
        this.defaultSettings = this.DEFAULT_SETTINGS(GLOBALS);
        this.settings = this.defaultSettings;
        this.evolveListCache = '';
        const obj = this;
        this.observer = new MutationObserver(function (mutations) {
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

        /*
          Nested helper function
        */
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
            previousPokemon = previousPokemon.replace(/é/g, '\\u00e9');

            // Handle evolvePokemon name formatting
            let evolveFormatted = evolvePokemon.replace(' [', '/');
            evolveFormatted = evolveFormatted.replace(']', '');

            const previousIndex = dexData.indexOf('"' + previousPokemon + '"');
            const evolveIndex = dexData.indexOf('"' + evolveFormatted + '"');

            const previousInDex = previousIndex != -1;
            const evolveInDex = evolveIndex != -1;
            let evolveTypesPrevious = [];
            let evolveTypes = [];

            /* Procedure
             * 1. Handling evolution origin:
             *    a. If the evolution origin is in the dex, load the types from the dex
             *    b. If the evolution origin is not in the dex, mark the type as '18' (not a valid type)
             * 2. If the evolution destination is not in the dex:
             *    a. If the destination pokemon is in the dex, load the types from the dex
             *    b. Else, if the destination pokemon is one of the "known exceptions", load the types from KNOWN_EXCEPTIONS
             *    c. Else, mark the type as '18' (not a valid type)
             * 3. Use types to apply HTML classes to the list item that contains the current evolution
             *    a. Use the evolution origin's and destination's types as HTML classes
             *    b. If the origin pokemon is a Delta mon, use the delta type as an HTML class as well
             */

            if (previousInDex) {
                // Step 1.a
                evolveTypesPrevious = [1, 2].map((i) => dexData[previousIndex + i]);
            }
            else {
                // Step 1.b
                evolveTypesPrevious = ['18', '-1'];
            }

            if (evolveInDex) {
                // Step 2.a
                evolveTypes = [1, 2].map((i) => dexData[evolveIndex + i]);
            }
            else {
                // Step 2.b
                if (evolvePokemon in obj.settings.KNOWN_EXCEPTIONS) {
                    evolveTypes = obj.settings.KNOWN_EXCEPTIONS[evolvePokemon].map((t) => '' + t);
                    // short circuit the previous pokemon's types, since the KNOWN_EXCEPTIONS table will have everything
                    evolveTypesPrevious = evolveTypes;
                }
                // Step 2.c
                else {
                    evolveTypes = ['18', '-1'];
                }
            }

            // the evolveTypes and evolveTypesPrevious entries can begin with a '.'
            // in some cases. Just strip it off
            evolveTypesPrevious = evolveTypesPrevious.map((t) => t.replace('.', ''));
            evolveTypes = evolveTypes.map((t) => t.replace('.', ''));

            // filter out invalid 2nd types (will be -1)
            evolveTypesPrevious = evolveTypesPrevious.filter((t) => t !== '-1');
            evolveTypes = evolveTypes.filter((t) => t !== '-1');

            // append types to DOM
            const elem = this;
            evolveTypes.map((t) => {
                obj.jQuery(elem).clone().appendTo('.' + t);
            });
            evolveTypesPrevious.map((t) => {
                if (!isNaN(parseInt(t)) && parseInt(t) > -1 && evolveTypes.indexOf(t) == -1) {
                    obj.jQuery(elem).clone().appendTo('.' + t);
                }
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
                        whitespace = evolvePokemon.match(/\s{2,}/g);
                        // remove extraneous whitespace
                        evolvePokemon = evolvePokemon.trim();
                        // use a regex to find extra whitespace between words
                        let whitespace = evolvePokemon.match(/\s{2,}/g);
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
            // if a pokemon has a name like gligar [Vampire] it won't be found. This tries to change the name as it's recorded in the pokedex data array
            // The remaining checks are a (not great) way of checking for names with '/' in them.
            // PFQ uses '/' in the names of PFQ variants and in PFQ exclusives with multiple forms
            // Example of evolvePokemonNameTwoBefore: 'Gliscor/Vampire'
            // Regex: \w+/\w+
            const evolvePokemonNameTwo = (evolvePokemonNameOne + '/' + pokemonDexKeepSecondName).replace('[', '').replace(']', '');
            const [evolveNewTotalTwo, evolveNewCheckTwo,
                evolveNewShinyCheckTwo, evolveNewAlbinoCheckTwo,
                evolveNewMelaCheckTwo] = getNewCheckData(evolvePokemonNameTwo);

            // Example of evolvePokemonNameThreeBefore: 'Phasmaleef/Forest Forme\'
            // Regex: \w+/\w+ \w+
            const evolvePokemonNameThree = (evolvePokemonNameOne + '/' +
                pokemonDexKeepSecondName + ' ' +
                pokemonDexKeepThirdName).replace('[', '').replace(']', '');
            const [evolveNewTotalThree, evolveNewCheckThree,
                evolveNewShinyCheckThree, evolveNewAlbinoCheckThree,
                evolveNewMelaCheckThree] = getNewCheckData(evolvePokemonNameThree);

            // Example of evolvePokemonNameFourBefore: 'Butterfree/Mega Forme Q'
            // Regex: \w+/\w+ \w+ \w+
            const evolvePokemonNameFour = (evolvePokemonNameOne + '/' +
                pokemonDexKeepSecondName + ' ' +
                pokemonDexKeepThirdName + ' ' +
                pokemonDexKeepFourthName).replace('[', '').replace(']', '');
            const [evolveNewTotalFour, evolveNewCheckFour,
                evolveNewShinyCheckFour, evolveNewAlbinoCheckFour,
                evolveNewMelaCheckFour] = getNewCheckData(evolvePokemonNameFour);

            // Example of evolvePokemonNameFiveBefore: 'Marowak/Alolan Mega Forme Q'
            // Regex: \w+/\w+ \w+ \w+ \w+
            const evolvePokemonNameFive = (evolvePokemonNameOne + '/' +
                pokemonDexKeepSecondName + ' ' +
                pokemonDexKeepThirdName + ' ' +
                pokemonDexKeepFourthName + ' ' +
                pokemonDexKeepFifthName).replace('[', '').replace(']', '');
            const [evolveNewTotalFive, evolveNewCheckFive,
                evolveNewShinyCheckFive, evolveNewAlbinoCheckFive,
                evolveNewMelaCheckFive] = getNewCheckData(evolvePokemonNameFive);

            // Couldn't find any examples of pokemon that match evolvePokemonNameSixBefore
            // Regex: \w+/\w+ \w+ \w+ \w+ \w+
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

class FarmPage extends FarmPageBase {
    constructor(jQuery, localStorageMgr, GLOBALS, externals) {
        super(jQuery, localStorageMgr, GLOBALS, externals);
    }
    checkForValidDexData(GLOBALS) {
        if (GLOBALS.DEX_DATA === undefined) {
            window.alert('Pokedex data is not currently loaded. Please load by pressing "Update Pokedex" in the QoL Hub');
        } else if (GLOBALS.DEX_DATA === null) {
            window.alert('Pokedex data is not currently loaded. Please load by pressing "Update Pokedex" in the QoL Hub');
        }
    }
    easyEvolveTypeList(GLOBALS) {
        const obj = this;
        obj.checkForValidDexData(GLOBALS);
        const dexData = GLOBALS.DEX_DATA;

        if (!GLOBALS.REGIONAL_FORMS_LIST && this.localStorageMgr.getItem(GLOBALS.POKEDEX_REGIONAL_FORMS_KEY)) {
            GLOBALS.REGIONAL_FORMS_LIST = JSON.parse(this.localStorageMgr.getItem(GLOBALS.POKEDEX_REGIONAL_FORMS_KEY));
        }
        const regionalFormList = GLOBALS.REGIONAL_FORMS_LIST;

        if (!regionalFormList) {
            window.alert('Message from QoL script:\nUnable to load list of regional forms. ' +
                'The list will be sorted by types, but there may be mistakes. ' +
                'Please clear and reload your pokedex data by clicking the "Clear Cached Dex" ' +
                'and then clicking the "Update Pokedex" button in the QoL Hub.');
        }

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

        /*
          Nested helper function
        */
        const findDivCoreIndex = function ($, html) {
            for (let j = 0; j < html.length; j++) {
                if ($(html[j]).is('div#core')) {
                    return j;
                }
            }
            return -1;
        };

        const loadEvolutionOriginTypes = function ($, evoUrl) {
            let species = '';
            let types = [];
            let inDex = false;
            // load the pokemon's species and set the pokemon's name to the species name for the rest of this loop
            loadSummaryPage($, evoUrl, (data) => {
                const html = obj.jQuery.parseHTML(data);
                // first find the right element in html to read from
                const htmlIndex = findDivCoreIndex($, html);
                if (!logErrorIfIndexNegativeOne(htmlIndex, `Unable to find species name on ${evoUrl}.`)) {
                    const links = Array.from(html[htmlIndex].querySelectorAll('#pkmnspecdata>p>a'));
                    // find the link that to the species page
                    const speciesIndex = links.findIndex((lnk) => lnk.getAttribute('href').match(/\/dex\/.*/));
                    // if the link is found, load the types
                    if (!logErrorIfIndexNegativeOne(speciesIndex,
                        `Unable to determine species of pokemon from ${evoUrl}.`)) {
                        species = links[speciesIndex].text;
                        types = getTypesFromSummaryData(html[htmlIndex]).map((t) => '' + t);
                        inDex = true;
                    } // speciesIndex > -1
                } // htmlIndex > -1
            }); // load
            return {
                status: inDex,
                types: types,
                species: species
            };
        };

        const loadEvolutionOriginDexNumber = function ($, evoUrl) {
            let dexNumber = '';
            loadSummaryPage($, evoUrl, (data) => {
                const html = obj.jQuery.parseHTML(data);
                const htmlIndex = findDivCoreIndex($, html);
                if (!logErrorIfIndexNegativeOne(htmlIndex,
                    `Unable to find find dex number in summary page ${evoUrl}.`)) {
                    dexNumber = getDexNumberFromSummaryData(html[htmlIndex]);
                }
            });
            return dexNumber;
        };

        const loadDataFromEvolutionOriginDexPage = function ($, typeList, number, name) {
            const evolutions = {};
            let status = false;
            let types = [];
            loadDexPage($, number, name, (data) => {
                // Kill two birds with one stone: 1) get the evolutions, and 2) check that
                // evolveTypePrevOne and evolveTypePrevTwo are correct
                let html = $.parseHTML(data);
                // first find the right element in html to read from
                const htmlIndex = findDivCoreIndex($, html);
                if (!logErrorIfIndexNegativeOne(htmlIndex, `Unable to find evolutions for ${name}.`)) {
                    html = html[htmlIndex];
                    // Get the evolutions from the dex page
                    const evosSpans = html.querySelectorAll('.evolutiontree>ul>li>.name');
                    evosSpans.forEach((e) => {
                        if (e.querySelector('a')) {
                            const evoNumber = e.querySelector('a').attributes['href'].value.substr(5);
                            const evoName = e.textContent;
                            evolutions[evoNumber] = evoName;
                            evolutions[evoName] = evoNumber;
                        } else {
                            console.log('bang');
                        }
                    });
                    status = true;

                    // Get the types
                    types = getTypesFromDexPage(typeList, $(html)).map((t) => '' + t);
                } // htmlIndex > -1
            }); // loadDexPage
            return {
                status: status,
                evolutions: evolutions,
                types: types
            };
        };

        const loadDataFromEvolutionDestinationDexPage = function ($, typeList, number, name) {
            let status = false;
            let types = [];
            // Load dex page for the match
            loadDexPage($, number, name, (data) => {
                const html = obj.jQuery.parseHTML(data);
                const htmlIndex = findDivCoreIndex($, html);
                if (!logErrorIfIndexNegativeOne(htmlIndex,
                    `Unable to find dex details on dex page for pokedex number ${number}`)) {
                    types = getTypesFromDexPage(typeList, $(html[htmlIndex])).map((t) => '' + t);
                    status = true;
                }
            });
            return {
                status: status,
                types: types
            };
        };

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

        const getEvolutionURL = function (evoString) {
            const href = 'href="';
            const urlStart = evoString.indexOf(href) + href.length;
            const urlLength = '/summary/AAAAA'.length;
            return evoString.substr(urlStart, urlLength);
        };

        const logErrorIfIndexNegativeOne = function (index, msg) {
            if (index === -1) {
                console.error(msg);
                return true;
            }
            return false;
        };

        const loadSummaryPage = function ($, urlSuffix, success) {
            // urlSuffix is the part of the url after https://pokefarm.com/
            $.ajax({
                type: 'GET',
                url: 'https://pokefarm.com' + urlSuffix,
                async: false,
                success: success,
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error(`Unable to load the summary page ${urlSuffix}.`);
                },
            });
        };

        const loadDexPage = function ($, dexNumber, name, success) {
            const url = 'https://pokefarm.com/dex/' + dexNumber;
            $.ajax({
                type: 'GET',
                url: url,
                async: false,
                success: success,
                error: function (jqXHR, textStatus, errorThrown) {
                    const msg = `Unable to load the Pokedex page for ${name} (${url}).`;
                    console.error(msg);
                },
            });
        };

        const getTypesFromSummaryData = function (html) {
            const typeImgs = Array.from(html.querySelectorAll('.type>img'));
            const typeUrls = typeImgs.map((e) => e['src']);
            let types = typeUrls.map((url) =>
                url.substring(url.indexOf('types/') + 'types/'.length,
                    url.indexOf('.png')));
            types = types.map((type) => type.charAt(0).toUpperCase() + type.substring(1));
            types = types.map((type) => GLOBALS.TYPE_LIST.indexOf(type));
            return types;
        };

        const getTypesFromDexPage = function (typeList, html) {
            return DexPageParser.parseTypesFromDexPage(html, typeList);
        };

        const getDexNumberFromSummaryData = function (html) {
            const link = html.querySelector('#pkmnspecdata>p>a');
            return link.getAttribute('href').substring('/dex/'.length);
        };

        const addToKnownExceptions = function (name, type1, type2) {
            // add the exception to the known exceptions list
            obj.settings.KNOWN_EXCEPTIONS[name] = [type1];

            if (type2) {
                obj.settings.KNOWN_EXCEPTIONS[name].push(type2);
            }

            obj.saveSettings();
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
            const evoUrl = getEvolutionURL(getEvolveString);

            // Handle unicode characters
            previousPokemon = previousPokemon.replace(/é/g, '\\u00e9');

            let previousInDex = dexData.indexOf('"' + previousPokemon + '"') != -1;
            let evolveInDex = dexData.indexOf('"' + evolvePokemon + '"') != -1;
            const hasRegionalForms = regionalFormList && Object.prototype.hasOwnProperty.call(regionalFormList, previousPokemon);
            let evolveTypesPrevious = [];
            let evolveTypes = [];

            /* Procedure
             * 1. Load types for the evolution origin
             *    a. If it is not in the dex, or if it has regional forms, load the types from the pokemon's summary page
             *    b. If it is in the dex and if it does not have regional forms, load the types from the dex data
             * 2. If step 1.a or 1.b succeeded, load types for the evolution destination
             *    a. If the destination pokemon is in the dex, load the types from the dex
             *    b. Else, if the destination pokemon is one of the "known exceptions", load the types from KNOWN_EXCEPTIONS
             *    c. Else, load the destination pokemon's types by:
             *       i. Getting the origin pokemon's dex number from its summary page
             *       ii. Loading the list of the origin pokemon's evolutions from its dex page
             *       iii. Finding the dex number for the destination pokemon from the list
             *       iv. Loading the destination pokemon's type from its dex page using the dex number found in step 2.c.iii
             * 3. Use types to apply HTML classes to the list item that contains the current evolution
             *    a. Use the evolution origin's and destination's types as HTML classes
             *    b. If the origin pokemon is a Delta mon, use the delta type as an HTML class as well
             */

            // Step 1.a
            if (!previousInDex || hasRegionalForms) {
                const data = loadEvolutionOriginTypes(obj.jQuery, evoUrl);
                if (data.status) {
                    previousInDex = data.status;
                    previousPokemon = data.species;
                    evolveTypesPrevious = data.types;
                }
            }
            // Step 1.b
            else {
                evolveTypesPrevious = [1, 2].map((i) => dexData[dexData.indexOf('"' + previousPokemon + '"') + i]);
            }

            // don't try to load types for evolution endpoint if steps 1.a and 1.b failed
            if (!previousInDex) {
                const msg = `Unable to find load types for evolution origin (${evolvePokemon}) in pokedex data, or unable to load it from PokeFarm Dex page`;
                console.error(msg);
                return; // 'continue' for .each()
            }

            // will only get here if 1.a or 1.b succeeded
            if (!evolveInDex) {
                // Step 2.b
                if (evolvePokemon in obj.settings.KNOWN_EXCEPTIONS) {
                    evolveTypes = obj.settings.KNOWN_EXCEPTIONS[evolvePokemon].map((t) => '' + t);
                    evolveInDex = true;
                }
                // Step 2.c
                else {
                    // Get the dex number for previousPokemon
                    const dexNumber = loadEvolutionOriginDexNumber(obj.jQuery, evoUrl);

                    // Load the dex page for previousPokemon
                    const dexInfo = loadDataFromEvolutionOriginDexPage(obj.jQuery, GLOBALS.TYPE_LIST, dexNumber, previousPokemon);
                    let evolutions = {};
                    if (dexInfo.status) {
                        evolveInDex = dexInfo.status;
                        evolutions = dexInfo.evolutions;
                        evolveTypesPrevious = dexInfo.types;
                    }

                    if (evolveInDex && Object.keys(evolutions).indexOf(evolvePokemon) > -1) {
                        const info = loadDataFromEvolutionDestinationDexPage(obj.jQuery, GLOBALS.TYPE_LIST, evolutions[evolvePokemon], evolvePokemon);
                        if (info.status) {
                            evolveInDex = info.status;
                            evolveTypes = info.types;
                            addToKnownExceptions(evolvePokemon, evolveTypes[0],
                                evolveTypes.length > 1 && evolveTypes[1]);
                        }
                    } else {
                        const msg = `An error occurred when processing ${evolvePokemon}`;
                        console.error(msg);
                    }
                } // else ( if(evolvePokemon in obj.settings.KNOWN_EXCEPTIONS) )
            }
            // Step 2.a
            else {
                evolveTypes = [1, 2].map((i) => dexData[dexData.indexOf('"' + evolvePokemon + '"') + i]);
            }

            if (!evolveInDex) {
                const msg = `Unable to find pokemon evolving to (${evolvePokemon}) in pokedex data, or unable to load it from PokeFarm Dex page`;
                console.error(msg);
                return; // 'continue' for .each()
            }

            // the evolveTypes and evolveTypesPrevious entries can begin with a '.'
            // in some cases. Just strip it off
            evolveTypesPrevious = evolveTypesPrevious.map((t) => t.replace('.', ''));
            evolveTypes = evolveTypes.map((t) => t.replace('.', ''));

            // filter out invalid 2nd types (will be -1)
            evolveTypesPrevious = evolveTypesPrevious.filter((t) => t !== '-1');
            evolveTypes = evolveTypes.filter((t) => t !== '-1');

            // append types to DOM
            const elem = this;
            evolveTypes.map((t) => {
                obj.jQuery(elem).clone().appendTo('.' + t);
            });
            evolveTypesPrevious.map((t) => {
                if (!isNaN(parseInt(t)) && parseInt(t) > -1 && evolveTypes.indexOf(t) == -1) {
                    obj.jQuery(elem).clone().appendTo('.' + t);
                }
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

const DaycareBase = Page;
class DaycarePage extends DaycareBase {
    constructor(jQuery, localStorageMgr, GLOBALS) {
        super(jQuery, localStorageMgr, GLOBALS.DAYCARE_PAGE_SETTINGS_KEY, {}, 'daycare');
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
            // the egg group is binary coded decimal
            // if a pokemon has two egg groups, the leftmost 4 bits of the number returned
            // are the first egg group and the rightmost 4 bits are the second egg group
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

                    // There can be other icons if the Pokemon is CS/Delta/Shiny/Albino/Melan
                    // The gender title can be "[M], [F], [N]"
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

class DexPageBase extends Page {
    constructor(jQuery, localStorageMgr, GLOBALS) {
        super(jQuery, localStorageMgr, GLOBALS.DEX_PAGE_SETTINGS_KEY, {}, '/dex');
        const obj = this;
        this.observer = new MutationObserver(function (mutations) {
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
        // can't remove filter-type class or else the filtering
        // won't look right
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

class DexPage extends DexPageBase {
    constructor(jQuery, localStorageMgr, GLOBALS) {
        super(jQuery, localStorageMgr, GLOBALS);
    }
}

const WishforgeBase = Page;

class WishforgePage extends WishforgeBase {
    constructor(jQuery, localStorageMgr, GLOBALS) {
        super(jQuery, localStorageMgr, GLOBALS.WISHFORGE_PAGE_SETTINGS_KEY, {}, 'forge');
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
/* globals
   DaycarePage FarmPage LabPage PublicFieldsPage PrivateFieldsPage
   ShelterPage FishingPage MultiuserPage DexPage WishforgePage
 */
class PagesManager {
    pages = {
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
    }
    constructor(jQuery, localStorageMgr, GLOBALS) {
        this.jQuery = jQuery;
        this.localStorageMgr = localStorageMgr;
        this.GLOBALS = GLOBALS;
    }
    instantiatePages(QOLHUB) {
        for (const key of Object.keys(this.pages)) {
            const pg = this.pages[key];
            if (QOLHUB.USER_SETTINGS[pg.setting] === true) {
                this.pages[key].object = new this.pages[key].class(this.jQuery, this.localStorageMgr, this.GLOBALS);
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
        this.populateSettings(QOLHUB);
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


'use strict';
class PFQoLBase {
    constructor($) {
        // :contains to case insensitive
        $.extend($.expr[':'], {
            'containsIN': function (elem, i, match, array) {
                return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || '').toLowerCase()) >= 0;
            }
        });

        this.jQuery = $;
        this.LOCAL_STORAGE_MANAGER = new LocalStorageManager($.USERID, localStorage);
        this.LOCAL_STORAGE_MANAGER.migrateSettings();

        this.GLOBALS = new Globals(this.jQuery, this.LOCAL_STORAGE_MANAGER);
        this.HELPERS = new Helpers();
        this.RESOURCES = new Resources();
        this.PAGES = new PagesManager(this.jQuery, this.LOCAL_STORAGE_MANAGER, this.GLOBALS);
        this.QOLHUB = new QoLHub(this.jQuery, this.LOCAL_STORAGE_MANAGER, this.GLOBALS, this.PAGES);
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

class PFQoL extends PFQoLBase {
    constructor($) {
        super($);
        // set GLOBALS.DEX_DATA and GLOBALS.DEX_UPDATE_DATE
        // GLOBALS.DEX_DATA is the data loaded directly from the script contained in
        // the pokefarm.com/dex HTML. It contains the list of pokemon, and for each:
        // - their types
        // - if they hatch from an egg,
        // - if you have the eggdex, and
        // - if you have the regular, shiny, albino, and melanistic pokedex entries
        if (!this.LOCAL_STORAGE_MANAGER.loadDexIntoGlobalsFromStorage(this.GLOBALS)) { // can't load it from storage
            this.LOCAL_STORAGE_MANAGER.loadDexIntoGlobalsFromWeb($, document, DexUtilities, this.GLOBALS); // so load it from the web
        } else { // can load it from storage
            this.LOCAL_STORAGE_MANAGER.loadDexIntoGlobalsFromWebIfOld($, document, DexUtilities, this.GLOBALS); // reload it from web if it's old
        }
        this.LOCAL_STORAGE_MANAGER.loadEvolveByLevelList(this.GLOBALS);
        this.LOCAL_STORAGE_MANAGER.loadEvolutionTreeDepthList(this.GLOBALS);
    }
}

if (typeof(module) !== 'undefined') {
    module.exports.pfqol = PFQoL;
} else {
    new PFQoL(jQuery);
}
