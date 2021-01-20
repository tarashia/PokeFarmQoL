// ==UserScript==
// @name         Poké Farm QoL
// @namespace    https://github.com/jpgualdarrama/
// @author       Bentomon
// @homepage     https://github.com/jpgualdarrama/PokeFarmQoL
// @downloadURL  https://github.com/jpgualdarrama/PokeFarmQoL/raw/issue_70/Poke-Farm-QoL.sanctioned.js
// @updateURL    https://github.com/jpgualdarrama/PokeFarmQoL/raw/issue_70/Poke-Farm-QoL.sanctioned.js
// @description  Quality of Life changes to Pokéfarm!
// @version      1.6.8
// @match        https://pokefarm.com/*
// @connect      github.com
// @grant        GM_addStyle
// ==/UserScript==
/**
 * This class is used to store CSS and HTML snippets that were previously loaded via Tampermonkey's '@resource' tool
 */
class Resources {
    static css() {
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
            background-color: #555;
            color: #fff;
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
            border-color: #555 transparent transparent transparent;
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
            border: 1px solid #9ec690;
            border-radius: 4px;
            max-width: 600px;
            position: relative;
        }
        
        #fieldsearch {
            margin: 16px auto;
            padding: 4px;
            border: 1px solid #9ec690;
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
            border-bottom: 1px solid #9ec690;
            text-align: center;
            padding: 4px;
            margin: 0;
            text-align: center;
        }
        
        .qolAllSettings {
            width: 315px;
            height: 100%;
            border: 1px solid #9ec690;
            border-top: none;
            vertical-align: top;
        }
        
        .qolChangeLog {
            width: 315px;
            height: 100%;
            border: 1px solid #9ec690;
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
            color: #004000;
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
            border: 1px solid #9ec690;
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
        
        /* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
        .active, .collapsible:hover {
          background-color: #ccc;
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

    static fieldSearchHTML() {
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

    static fieldSortHTML() {
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

    static labOptionsHTML() {
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

    static evolveFastHTML() {
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

    static privateFieldSearchHTML() {
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

    static shelterOptionsHTML() {
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

    static qolHubHTML() {
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
                            <li class="expandlist"><h3 class="slidermenu qolChangeLogHead">V 1.3.6 - **/02/2020</h3>
                              <ul class="qolopencloselist qolChangeLogContent">
                                <li>Code reorganization to make it easier to add new features</li><br>
                              </ul>
                            </li>
                            <li class="expandlist"><h3 class="slidermenu qolChangeLogHead">V 1.3.5 - 11/02/2019</h3>
                              <ul class="qolopencloselist qolChangeLogContent">
                                <li>Custom Css: The script broke a lot of the custom css/skin you can create in your profile. If the script broke your custom css you can add that custom css in the QoL Hub and it works!</li><br>
                                <li>Shelter/lab search: Pokemon/Eggs that are found are now also highlighted.</li><br>
                                <li>Release/move mass Pokemon: Added a "select on berry" function!</li><br>
                                <li>Moved select all & select berry checkboxes to the bottom at the move all/release all Pokemon dialogs</li><br>
                                <li>Evolvelist fix: Alolan Forme Pokemon should now be placed in the right category!</li><br>
                                <li>Evolvelist additions: Can now sort pokemons that can evolve on names.</li><br>
                                <li>Evolvelist additions: Can now sort on Pokemon you don't have in your Pokedex. This included Shinies, albinos & melanistic pokemon. Also shows possible Alolan & mega/totem evolves, if you didn't complete a Pokemon 100%.</li><br>
                                <li>Evolvelist addition: There is a counter showing how many Pokemons per category that can evolve, except for missing dex entries search.</li><br>
                                <li>Evolvelist addition: When a pokemon evolves using the Quick evo button the Pokemon gets deleted from the list.</li><br>
                                <li>Fixed a display bug when releasing a Pokemon in your party</li><br>
                                <li>Fixed a bug with the party clicker modification sometimes breaking (probably fixed)</li><br>
                              </ul>
                            </li>
                            <li class="expandlist"><h3 class="slidermenu qolChangeLogHead">V 1.3.0 - 26/01/2019</h3>
                              <ul class="qolopencloselist qolChangeLogContent">
                                <li>Advanced Shelter Search: Added feature to search Pokemon and/or eggs on their types!</li><br>
                                <li>Advanced Shelter Search: Custom search isn't case sensitive anymore, capital letters or not doesn't matter anymore!</li><br>
                                <li>Lab Notifier: New feature! You can now 'search' the lab eggs so you're sure not to miss an egg that you really want to have (for example a ditto egg in the lab) or you can search the lab on Pokemon types, for typeraces for example.</li><br>
                              </ul>
                            </li>
                            <li class="expandlist"><h3 class="slidermenu qolChangeLogHead">V 1.2.0 - 18/01/2019</h3>
                              <ul class="qolopencloselist qolChangeLogContent">
                                <li>Oh yeah baby, I have an awesome function for you! Now in the farm evolve list all the Pokemons that can evolve will be categorized on types!! No more endless searching which Pokemon has which type. Standard setting is based on my Pokedex data. Open the Pokedex one time to update your own data. Happy wishforge hunting :)</li><br>
                                <li>NOTE: Known issues with the new feature: Quick evolve doesn't function & clicking on a pokemon closes the selected type list. To evolve your Pokemons: 'Right-click' > 'open on new tab' and then evolve. I'm looking for a fix.</li><br>
                                <li>Shelter search: now when you adopted a new egg you won't get notified in the shelter when you find this egg. Before it would still notify you found a new egg because it wasn't hatched yet. When you find multiple new eggs you still have to watch out that you don't adopt the 'new' egg that you just adopted and haven't hatched yet. This was a pain in the ass to test with adoption limits etc. Please let me know if you have any issues.</li><br>
                                <li>New: added party click modifications menu to change the css on the mass party click list. For now there are 3 options: 'only hide disliked berries', 'show party in a table & hide disliked berries' & 'hide everything mass click super fast'.</li><br>
                              </ul>
                            </li>
                            <li class="expandlist"><h3 class="slidermenu qolChangeLogHead">V 1.1.5 - 12/01/2019</h3>
                              <ul class="qolopencloselist qolChangeLogContent">
                                <li>Shelter Search has been upgraded, you can now search multiple custom pokemons at once! Beware, having to many pokemons to search for can be a bit laggy. I rewrote the code, in my tests everything worked but if you encounter a bug let me know.</li><br>
                                <li>Added a 'sort to grid' option in the shelter.</li><br>
                                <li>QoL menus: All the added menus are now respecting your site skin colors!</li><br>
                                <li>Fixed a few bugs in the fields section. Private view works now after selecting an option, Pokemon click counter now updates on keypresses & berry like/dislike colors are now fixed. Hopefully fixed the 'align to grid' option.</li><br>
                                <li>Fixed auto update, didn't process the script versions right.</li><br>
                              </ul>
                            </li>
                            <li class="expandlist"><h3 class="slidermenu qolChangeLogHead">V 1.1.0 - 11/01/2019</h3>
                              <ul class="qolopencloselist qolChangeLogContent">
                                <li>Added various field sorter features on the fields page. For now you can sort Pokemons on berries, in the middle or in a grid.</li><br>
                                <li>Added Pokemon click counter on fields. Especially handy for fields that only have 1 type of Pokemon in a field.</li><br>
                                <li>Userscript has it's own settings page now and removed itself from the farm tab. Altogether with a change log. Yeeey</li><br>
                                <li>Moved the shelter search menu for better access and view.</li><br>
                                <li>Changed some code around to make it easier to implement new features. Like how the user settings are safed and stuff.</li><br>
                              </ul>
                            </li>
                            <li class="expandlist"><h3 class="slidermenu qolChangeLogHead">V 1.0.0 - 08/01/2019</h3>
                              <ul class="qolopencloselist qolChangeLogContent">
                                <li>complete script rewrite, now using jQuery.</li></br>
                                <li>Advanced Shelter Search rewritten. Can now search on Pokemon with Custom Sprites and on Pokemon name instead of only with image code.</li></br>
                                <li>Select All checkbox added on field mass release & fishing.</li></br>
                                <li>Userscript prompts the user when there is an update available for the script.</li></br>
                              </ul>
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" class="qolDexUpdate">
                          <h3 class="qolHubHead">Pokedex Settings</h3>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" class="qolDexUpdate">
                          <input type='button' value="Update Pokedex" id="updateDex">
                          <span>Date last updated:<span class="qolDate">""</span></span>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" class="qolDexUpdate">
                          <progress class="qolDexUpdateProgress" value="100" max="100"> 100% </progress>
                          <span class="qolDexUpdateProgress">Complete!</span>
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
                      <tr>
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
                          <br><br>
                          <span>Having issues with the "Update Pokedex" button or the Ready-to-Evolve feature in the Shelter? Use this button to erase the cached pokedex info, then use the <b>Update Pokedex</b> button to reload the pokedex.</span>
                          <input type='button' value="Clear Cached Dex" id="clearCachedDex">
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

    static publicFieldTooltipModHTML() {
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

    static privateFieldTooltipModHTML() {
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
const Helpers = (function Helpers() {
    /* public stuff */
    const API = {
        buildOptionsString(arr) {
            let str = '<option value="none">None</option> ';
            for(let i = 0; i < arr.length; i++) {
                str += `<option value="${i}">${arr[i]}</option> `;
            }
            return str;
        },

        toggleSetting(key, set) {
            // update values for checkboxes
            if (typeof set === 'boolean') {
                const element = document.querySelector(`.qolsetting[data-key="${key}"]`);
                if (element && element.type === 'checkbox') {
                    element.checked = set;
                }
            }
        }, // toggleSetting

        setupFieldArrayHTML($, arr, id, div, cls) {
            const n = arr.length;
            for(let i = 0; i < n; i++) {
                const rightDiv = i + 1;
                const rightValue = arr[i];
                $(`#${id}`).append(div);
                $(`.${cls}`).removeClass(cls).addClass(''+rightDiv+'').find('.qolsetting').val(rightValue);
            }
        },

        loadSettings($, KEY, DEFAULT, obj) {
            if (localStorage.getItem(KEY) === null) {
                API.saveSettings(KEY);
            } else {
                try {
                    const countScriptSettings = Object.keys(obj).length;
                    const localStorageString = JSON.parse(localStorage.getItem(KEY));
                    const countLocalStorageSettings = Object.keys(localStorageString).length;
                    if (countLocalStorageSettings < countScriptSettings) { // adds new objects (settings) to the local storage
                        const defaultsSetting = DEFAULT;
                        const userSetting = JSON.parse(localStorage.getItem(KEY));
                        const newSetting = $.extend(true,{}, defaultsSetting, userSetting);

                        obj = newSetting;
                        API.saveSettings(KEY, obj);
                    }
                    if (countLocalStorageSettings > countScriptSettings) {
                        API.saveSettings(KEY, obj);
                    }
                }
                catch(err) {
                    API.saveSettings(KEY, obj);
                }
                if (localStorage.getItem(KEY) != obj) {
                    obj = JSON.parse(localStorage.getItem(KEY));
                }
            }

            return obj;
        },
        saveSettings(key, obj) {
            localStorage.setItem(key, JSON.stringify(obj));
        },

        textSearchDiv(cls, dataKey, id, arrayName) {
            return `<div class='${cls}'><label><input type="text" class="qolsetting" data-key="${dataKey}" ` +
                `array-name='${arrayName}'` +
                `/></label><input type='button' value='Remove' id='${id}'></div>`;
        },

        selectSearchDiv(cls, name, dataKey, options, id, divParent, arrayName) {
            return `<div class='${cls}'> <select name='${name}' class="qolsetting" data-key='${dataKey}' ` +
                `array-name='${arrayName}'> ${options} </select> <input type='button' value='Remove' id='${id}'> </div>`;
        },

        parseFieldPokemonTooltip($, GLOBALS, tooltip) {
            const dataElements = $(tooltip).children(0).children();
            let index = 1;
            // nickname
            const nickname = dataElements[index].textContent;
            if(!nickname) {
                console.error(`Helpers.parseFieldPokemonTooltip - nickname '${nickname}' (is not a valid name)`);
            }
            index++;

            // Issue #59 - Pokefarm added a new h3 element after the nickname
            // that contains no data
            index++;

            // species
            let species = '';
            if(dataElements[index].textContent) {
                const tc = dataElements[index].textContent;
                const tcSplit = tc.trim().split(':  ');
                if(tcSplit.length == 1) {
                    console.error('Helpers.parseFieldPokemonTooltip - species text does not contain \':  \'');
                }
                else {
                    species = tcSplit[1];
                }
            }
            index++;

            // dataElements[3] will be a forme if the pokemon has a forme
            let forme = '';
            if(dataElements[index].textContent &&
               dataElements[index].textContent.startsWith('Forme')) {
                forme = dataElements[index].textContent.substr('Forme: '.length);
                index++;
            }

            // types
            const typeElements = $(dataElements[index]).children().slice(1,);
            const typeUrls = typeElements.map(idx => typeElements[idx]['src']);
            let types = typeUrls.map(idx =>
                typeUrls[idx].substring(typeUrls[idx].indexOf('types/')+'types/'.length,
                    typeUrls[idx].indexOf('.png')));
            types = types.map(idx => types[idx].charAt(0).toUpperCase() + types[idx].substring(1));
            types = types.map(idx => GLOBALS.TYPE_LIST.indexOf(types[idx]));
            index++;

            // level
            let level = -1;
            if(dataElements[index].textContent) {
                const tcSplit = dataElements[index].textContent.split(' ');
                if(tcSplit.length > 1) {
                    level = parseInt(tcSplit[1]);
                }
            } else {
                console.error('Helpers.parseFieldPokemonToolTip - could not load level because text was empty');
            }
            index++;

            // if the pokemon's happiness is less than max, skip the next index, since it will be a progress bar
            if(!dataElements[index].textContent ||
               !dataElements[index].textContent.startsWith('Happiness')) {
                index++;
            }

            // happiness
            let happiness = -1;
            if(dataElements[index].textContent) {
                const tcSplit = dataElements[index].textContent.split(' ');
                if(tcSplit.length > 1) {
                    happiness = tcSplit[1].trim();
                    happiness = (happiness == 'MAX') ? 100 : parseInt(happiness.substring(0, happiness.length-1));
                }
            } else {
                console.error('Helpers.parseFieldPokemonToolTip - could not load happiness because text was empty');
            }
            index++;

            // nature
            let nature = -1;
            if(dataElements[index].textContent) {
                const tcSplit = dataElements[index].textContent.split(' ');
                if(tcSplit.length > 1) {
                    nature = tcSplit[1].replace('(', '').trim();
                    nature = GLOBALS.NATURE_LIST.indexOf(nature); // .substring(0, nature.length-1))
                }
            } else {
                console.error('Helpers.parseFieldPokemonToolTip - could not load nature because text was empty');
            }
            index++;

            // held item
            let item = '';
            if(dataElements[index].textContent !== 'Item: None') {
                item = dataElements[index].textContent.substring(dataElements[8].textContent.indexOf(' ')+1);
            } else {
                item = 'None';
            }
            index++;

            // egg groups
            let eggGroups = [];
            if(dataElements[index].textContent) {
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
            if(forme !== '') {
                ret.forme = forme;
            }
            return ret;
        } // parseFieldPokemonToolTip
    };

    return API;
})();

if (module) {
    module.exports.Helpers = Helpers;
}
class Globals {
    static fillTemplates(TEMPLATES) {
        Globals.TEMPLATES.shelterOptionsHTML         = TEMPLATES.shelterOptionsHTML();
        Globals.TEMPLATES.fieldSortHTML              = TEMPLATES.fieldSortHTML();
        Globals.TEMPLATES.fieldSearchHTML            = TEMPLATES.fieldSearchHTML();
        Globals.TEMPLATES.privateFieldSearchHTML     = TEMPLATES.privateFieldSearchHTML();
        Globals.TEMPLATES.qolHubHTML                 = TEMPLATES.qolHubHTML();
        Globals.TEMPLATES.evolveFastHTML             = TEMPLATES.evolveFastHTML();
        Globals.TEMPLATES.labOptionsHTML             = TEMPLATES.labOptionsHTML();
        Globals.TEMPLATES.publicFieldTooltipModHTML  = TEMPLATES.publicFieldTooltipModHTML();
        Globals.TEMPLATES.privateFieldTooltipModHTML = TEMPLATES.privateFieldTooltipModHTML();
    }
    static fillOptionsLists(helpers) {
        Globals.TYPE_OPTIONS = helpers.buildOptionsString(Globals.TYPE_LIST);
        Globals.NATURE_OPTIONS = helpers.buildOptionsString(Globals.NATURE_LIST);
        Globals.EGG_GROUP_OPTIONS = helpers.buildOptionsString(Globals.EGG_GROUP_LIST);
    }
    static TEMPLATES = { // all the new/changed HTML for the userscript
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

    static SETTINGS_SAVE_KEY = 'QoLSettings';
    // Note - the order of TYPE_LIST is important. It looks like PFQ uses an array in this order in its code
    // Don't change the order without looking for where this array is used
    static TYPE_LIST = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];
    static NATURE_LIST = ['Lonely', 'Mild', 'Hasty', 'Gentle', 'Bold', 'Modest', 'Timid', 'Calm',
        'Impish', 'Adamant', 'Jolly', 'Careful', 'Relaxed', 'Brave', 'Quiet', 'Sassy',
        'Lax', 'Naughty', 'Rash', 'Naïve', 'Hardy', 'Docile', 'Serious', 'Bashful', 'Quirky'];
    static EGG_GROUP_LIST = [
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
    static EGG_GROUP_ID_TO_NAME = [
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
    static SHELTER_TYPE_TABLE = [
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
    static SHELTER_SEARCH_DATA = [
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
    static TYPE_OPTIONS = null;
    static NATURE_OPTIONS = null;
    static EGG_GROUP_OPTIONS = null;

    // filled in by LocalStorageManager
    static DEX_DATA = null;
    static DEX_UPDATE_DATE = null;
    static EVOLVE_BY_LEVEL_LIST = null;
    static EVOLUTIONS_LEFT = null;
}
/* This class handles creating, removing, and handling the DOM object actions
 * for the QoL Hub.
 */

class QoLHub {
    static build($, document, templates, globals, settings, settingsChange) {
        $('body', document).append(templates.qolHubHTML);
        $('#core', document).addClass('scrolllock');
        // const qolHubCssBackgroundHead = $('.qolHubHead.qolHubSuperHead', document).css('background-color');
        const qolHubCssBackgroundHead = document.querySelector('.qolHubHead.qolHubSuperHead').style.backgroundColor;
        // const qolHubCssTextColorHead = $('.qolHubHead.qolHubSuperHead', document).css('color');
        const qolHubCssTextColorHead = document.querySelector('.qolHubHead.qolHubSuperHead').style.color;
        // const qolHubCssBackground = $('.qolHubTable', document).css('background-color');
        const qolHubCssBackground = document.querySelector('.qolHubTable').style.backgroundColor;
        // const qolHubCssTextColor = $('.qolHubTable', document).css('color');
        const qolHubCssTextColor = document.querySelector('.qolHubTable').style.color;
        // $('.qolHubHead', document).css({ 'backgroundColor': '' + qolHubCssBackgroundHead + '', 'color': '' + qolHubCssTextColorHead + '' });
        document.querySelector('.qolHubHead').style.backgroundColor = '' + qolHubCssBackgroundHead + '';
        document.querySelector('.qolHubHead').style.color = '' + qolHubCssTextColorHead + '';
        // $('.qolChangeLogHead', document).css({ 'backgroundColor': '' + qolHubCssBackgroundHead + '', 'color': '' + qolHubCssTextColorHead + '' });
        document.querySelector('.qolChangeLogHead').style.backgroundColor = '' + qolHubCssBackgroundHead + '';
        document.querySelector('.qolChangeLogHead').style.color = '' + qolHubCssTextColorHead + '';
        // $('.qolopencloselist.qolChangeLogContent', document).css({ 'backgroundColor': '' + qolHubCssBackground + '', 'color': '' + qolHubCssTextColor + '' });
        document.querySelector('.qolopencloselist.qolChangeLogContent').style.backgroundColor = '' + qolHubCssBackground + '';
        document.querySelector('.qolopencloselist.qolChangeLogContent').style.color = '' + qolHubCssTextColor + '';
        $('.qolDate', document).text(globals.DEX_UPDATE_DATE);

        const customCss = settings.customCss;

        $('.textareahub', document).append('<textarea id="qolcustomcss" rows="15" cols="60" class="qolsetting" data-key="customCss"/></textarea>');
        if (customCss === '') {
            $('.textareahub textarea', document).val('#thisisanexample {\n    color: yellow;\n}\n\n.thisisalsoanexample {\n    background-color: blue!important;\n}\n\nhappycssing {\n    display: absolute;\n}');
        } else {
            $('.textareahub textarea', document).val(customCss);
        }

        $('#qolcustomcss', document).on('keydown', function (e) {
            if (e.keyCode == 9 || e.which == 9) {
                e.preventDefault();
                const s = this.selectionStart;
                $(this).val(function (i, v) {
                    return v.substring(0, s) + '\t' + v.substring(this.selectionEnd);
                });
                this.selectionEnd = s + 1;
            }
        });

        $(document).on('input', '.qolsetting', (function () { //Changes QoL settings
            settingsChange(this.getAttribute('data-key'),
                $(this).val(),
                $(this).parent().parent().attr('class'),
                $(this).parent().attr('class'),
                (this.hasAttribute('array-name') ? this.getAttribute('array-name') : ''));
        }));

        $(document).on('click', '.closeHub', (function () { //close QoL hub
            QoLHub.close($, document);
        }));
    }

    static close($, document) {
        $('.dialog', document).remove();
        $('#core', document).removeClass('scrolllock');
    }

    static handleUpdateDexClick($, document, dexUtilities, localStorageManager, dexPageParser, evolutionTreeParser, globals) {
        // Manually update GLOBALS.DEX_DATA
        localStorageManager.loadDexIntoGlobalsFromWeb($, document, dexUtilities, globals);

        // globals.DEX_DATA will contain the latest info as is read from local storage
        // this handler updates the local storage
        const progressSpan = $('span.qolDexUpdateProgress', document)[0];
        progressSpan.textContent = 'Loading...';

        const date = (new Date()).toUTCString();
        globals.DEX_UPDATE_DATE = date;
        $('.qolDate', document).text(globals.DEX_UPDATE_DATE);
        localStorageManager.updateLocalStorageDex($, document, date, globals);

        // this will update the globals.EVOLVE_BY_LEVEL_LIST
        // and local storage
        const virtualDocument = document.implementation.createHTMLDocument('virtual');
        dexUtilities.getMainDexPage($).then((data) => {
            const html = $.parseHTML(data);
            const dex = $(html[html.length - 1], virtualDocument).find('#dexdata').html();
            const dexNumbers = localStorageManager.parseAndStoreDexNumbers(dex);

            if (dexNumbers.length > 0) {
                // update the progress bar in the hub
                const limit = dexNumbers.length;
                const progressBar = $('progress.qolDexUpdateProgress', document)[0];
                progressBar['max'] = limit;
                dexUtilities.loadDexPages($, dexNumbers, progressBar, progressSpan).then((data) => {
                    const dexPagesHTML = data.map(d => (Array.isArray(d) ? d[0] : d));
                    dexUtilities.loadFormPages($, virtualDocument, dexPagesHTML, progressBar, progressSpan).then((data) => {
                        const formPagesHTML = data.map(d => (Array.isArray(d) ? d[0] : d));

                        // Combine the arrays of HTML into one array
                        const allPagesHTML = dexPagesHTML.concat(formPagesHTML);

                        // Parse evolution data
                        const [parsedFamilies, dexIDs] = dexUtilities.parseEvolutionTrees($, virtualDocument, dexPageParser, evolutionTreeParser, allPagesHTML);

                        // Parse form data
                        const [formData, formMap] = dexUtilities.parseFormData($, virtualDocument, dexPageParser, allPagesHTML);

                        // Build evolution tree depths
                        const evolutionTreeDepthList = dexUtilities.buildEvolutionTreeDepthsList(parsedFamilies, dexIDs, formData, formMap);

                        // Collect regional form data
                        const regionalFormMap = dexUtilities.buildRegionalFormsMap(formMap);

                        // Collect list of base names to make it easier down the line
                        const baseNames = dexUtilities.parseBaseNames($, virtualDocument, dexPageParser, allPagesHTML);
                        // Collect list of egg pngs
                        const eggPngs = dexUtilities.parseEggsPngsList($, virtualDocument, dexPageParser, allPagesHTML);
                        // Collect list of types
                        const types = dexUtilities.parseTypesList($, virtualDocument, dexPageParser, globals, allPagesHTML);
                        const eggPngsTypeMap = dexUtilities.buildEggPngsTypesMap(baseNames, eggPngs, types);

                        localStorageManager.saveEvolveByLevelList(globals, parsedFamilies, dexIDs);
                        localStorageManager.saveEvolutionTreeDepths(globals, evolutionTreeDepthList);
                        localStorageManager.saveRegionalFormsList(globals, parsedFamilies, dexIDs, regionalFormMap);
                        localStorageManager.saveEggTypesMap(globals, eggPngsTypeMap);
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
    } // handleUpdateDexClick
} // QoLHub

if (module) {
    module.exports.QoLHub = QoLHub;
}

class Page {
    constructor(jQuery, ssk, ds, url) {
        this.jQuery = jQuery;
        this.settingsSaveKey = ssk;
        this.defaultSettings = ds;
        this.url = url;
        this.settings = this.defaultSettings;
    }

    onPage(w) {
        return w.location.href.indexOf(this.url) != -1;
    }

    loadSettings() {
        this.settings =
            Helpers.loadSettings(this.jQuery,this.settingsSaveKey,
                this.defaultSettings,
                this.settings);
    }

    saveSettings() {
        Helpers.saveSettings(this.settingsSaveKey, this.settings);
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

const ShelterBase = Page;

class ShelterPage extends ShelterBase {
    constructor(jQuery, GLOBALS) {
        super(jQuery, 'QoLShelter', {
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
            findReadyToEvolve: false,
            findMale: true,
            findFemale: true,
            findNoGender: true,
            findNFE: false,
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

        // when the page is loaded, check to see if the data needed for finding eggs by type is loaded (if it's needed)
        if (this.onPage(window) &&
            this.settings.findTypeEgg &&
            !(GLOBALS.EGGS_PNG_TO_TYPES_LIST || JSON.parse(localStorage.getItem('QoLEggTypesMap')))) {
            window.alert('Message from QoL script:\nUnable to load list of pokemon eggs and their types, ' +
                'which is used to distinguish eggs with the same name but different types (Vulpix and ' +
                'Alolan Vulpix).\n\nCan still find eggs by type, but there may be mistakes. ' +
                'Please clear and reload your pokedex data by clicking the "Clear Cached Dex" ' +
                'and then clicking the "Update Pokedex" button in the QoL Hub to load list of eggs and types.');
        }

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
            const eggPngsToTypes = GLOBALS.EGGS_PNG_TO_TYPES_LIST ||
                JSON.parse(localStorage.getItem('QoLEggTypesMap')) || undefined;
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

const PrivateFieldsBase = Page;

class PrivateFieldsPage extends PrivateFieldsBase {
    constructor(jQuery, GLOBALS) {
        super(jQuery, 'QoLPrivateFields', {
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
            fieldNFE: false,
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
        this.jQuery('#tooltipenable').css('background-color', '' + fieldOrderCssColor + '');
        this.jQuery('#tooltipenable').css('border', '' + fieldOrderCssBorder + '');
        this.jQuery('#tooltipenable').css('max-width', '600px');
        this.jQuery('#tooltipenable').css('position', 'relative');
        this.jQuery('#tooltipenable').css('margin', '16px auto');
        this.jQuery('#fieldsearch').css('background-color', '' + fieldOrderCssColor + '');
        this.jQuery('#fieldsearch').css('border', '' + fieldOrderCssBorder + '');
        this.jQuery('.collapsible').css('background-color', '' + fieldOrderCssColor + '');
        this.jQuery('.collapsible').css('border', '' + fieldOrderCssBorder + '');
        this.jQuery('.collapsible_content').css('background-color', '' + fieldOrderCssColor + '');

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
    // specific
    /*
    insertFoundDiv(number, name, img) {
        document.querySelector('#sheltersuccess').
            insertAdjacentHTML('beforeend',
                               '<div id="shelterfound">' + name + ((number > 1) ? 's' : '') + ' found ' + img + '</div>')
    }
    */
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
    highlightByHowFullyEvolved(GLOBALS, pokemonElem) {
        // if a pokemon is clicked-and-dragged, the tooltip element after the pokemon
        // will not exist. If this occurs. don't try highlighting anything until the
        // pokemon is "put down"
        if (!this.jQuery(pokemonElem).next().length) { return; }

        const tooltip = Helpers.parseFieldPokemonTooltip(this.jQuery, GLOBALS, this.jQuery(pokemonElem).next()[0]);
        let pokemon = tooltip['species'];

        const key = 'QoLEvolutionTreeDepth';
        if (localStorage.getItem(key) !== null) {
            const evolutionData = JSON.parse(localStorage.getItem(key));
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

    searchForImgTitle(GLOBALS, key) {
        const SEARCH_DATA = GLOBALS.SHELTER_SEARCH_DATA;
        const keyIndex = SEARCH_DATA.indexOf(key);
        const value = SEARCH_DATA[keyIndex + 1];
        const selected = this.jQuery('img[title*="' + value + '"]');
        if (selected.length) {
            // next line different from shelter
            const bigImg = selected.parent().parent().parent().parent().prev().children('img.big');
            this.jQuery(bigImg).addClass('privatefoundme');

            // this.insertFoundDiv(selected.length, imgResult, imgFitResult)
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

const PublicFieldsBase = Page;

class PublicFieldsPage extends PublicFieldsBase {
    constructor(jQuery, GLOBALS) {
        super(jQuery, 'QoLPublicFields', {
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
        this.jQuery('#fieldorder').css('background-color', ''+fieldOrderCssColor+'');
        this.jQuery('#fieldorder').css('border', ''+fieldOrderCssBorder+'');
        this.jQuery('#tooltipenable').css('background-color', ''+fieldOrderCssColor+'');
        this.jQuery('#tooltipenable').css('border', ''+fieldOrderCssBorder+'');
        this.jQuery('#tooltipenable').css('max-width', '600px');
        this.jQuery('#tooltipenable').css('position', 'relative');
        this.jQuery('#tooltipenable').css('margin', '16px auto');
        this.jQuery('#fieldsearch').css('background-color', ''+fieldOrderCssColor+'');
        this.jQuery('#fieldsearch').css('border', ''+fieldOrderCssBorder+'');
        this.jQuery('.collapsible').css('background-color', ''+fieldOrderCssColor+'');
        this.jQuery('.collapsible').css('border', ''+fieldOrderCssBorder+'');
        this.jQuery('.collapsible_content').css('background-color', ''+fieldOrderCssColor+'');
        
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

const LabBase = Page;

class LabPage extends LabBase {
    constructor(jQuery, GLOBALS) {
        super(jQuery, 'QoLLab', {
            findLabEgg: '', // same as findCustom in shelter
            customEgg: true,
            findLabType: '', // same as findType in shelter
            findTypeEgg: true,
        }, '/lab');
        this.searchArray = [];
        this.listArray = [];
        const obj = this;
        this.observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                obj.customSearch(GLOBALS);
            });
        });

        // when the page is loaded, check to see if the data needed for finding eggs by type is loaded (if it's needed)
        if (this.onPage(window) &&
            this.settings.findTypeEgg &&
            !(GLOBALS.EGGS_PNG_TO_TYPES_LIST || JSON.parse(localStorage.getItem('QoLEggTypesMap')))) {
            window.alert('Message from QoL script:\nUnable to load list of pokemon eggs and their types, ' +
                'which is used to distinguish eggs with the same name but different types (Vulpix and ' +
                'Alolan Vulpix).\n\nCan still find eggs by type, but there may be mistakes. ' +
                'Please clear and reload your pokedex data by clicking the "Clear Cached Dex" ' +
                'and then clicking the "Update Pokedex" button in the QoL Hub to load list of eggs and types.');
        }
    }

    setupHTML(GLOBALS) {
        document.querySelector('#eggsbox360>p.center').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.labOptionsHTML);
        document.querySelector('#egglist').insertAdjacentHTML('afterend', '<div id="labsuccess"></div>');

        const theField = Helpers.textSearchDiv('numberDiv', 'findLabEgg', 'removeLabSearch', 'searchArray');
        const theType = Helpers.selectSearchDiv('typeNumber', 'types', 'findLabType', GLOBALS.TYPE_OPTIONS,
            'removeLabTypeList', 'labTypes', 'listArray');

        this.searchArray = this.settings.findLabEgg.split(',');
        this.listArray = this.settings.findLabType.split(',');

        Helpers.setupFieldArrayHTML(this.jQuery, this.searchArray, 'searchkeys', theField, 'numberDiv');
        Helpers.setupFieldArrayHTML(this.jQuery, this.listArray, 'labTypes', theType, 'typeNumber');
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
            'removeLabTypeList', 'labTypes', 'listArray');
        const numberTypes = this.jQuery('#labTypes>div').length;
        this.jQuery('#labTypes').append(theType);
        this.jQuery('.typeNumber').removeClass('typeNumber').addClass('' + numberTypes + '');
    }
    removeTypeList(byebye, key) {
        this.listArray = this.jQuery.grep(this.listArray, function (value) {
            return value != key;
        });
        this.settings.findType = this.listArray.toString();

        this.jQuery(byebye).parent().remove();

        for (let i = 0; i < this.jQuery('#labTypes>div').length; i++) {
            const rightDiv = i + 1;
            this.jQuery('.' + i + '').next().removeClass().addClass('' + rightDiv + '');
        }
    }
    customSearch(GLOBALS) {
        const obj = this;
        const dexData = GLOBALS.DEX_DATA;
        document.querySelector('#labsuccess').innerHTML = '';
        obj.jQuery('#egglist>div>img').removeClass('labfoundme');

        if (!(this.listArray.length == 1 && this.listArray[0] == '')) {
            if (this.settings.findTypeEgg === true) {
                const eggPngsToTypes = GLOBALS.EGGS_PNG_TO_TYPES_LIST ||
                    JSON.parse(localStorage.getItem('QoLEggTypesMap')) || undefined;
                const typesArrayNoEmptySpace = this.listArray.filter(v => v != '');
                const typeSearchAmount = typesArrayNoEmptySpace.length;
                for (let i = 0; i < typeSearchAmount; i++) {
                    const value = typesArrayNoEmptySpace[i];
                    const amountOfTypesFound = [];
                    const typePokemonNames = [];

                    obj.jQuery('#egglist>div>h3').each(function () {
                        const searchPokemon = (obj.jQuery(this).text().split(' ')[0]);
                        let searchTypeOne = '';
                        let searchTypeTwo = '';

                        if (eggPngsToTypes) {
                            const imgUrl = obj.jQuery(this).next().attr('src').replace('https://pfq-static.com/img/', '');
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
                        obj.jQuery(shelterBigImg).addClass('labfoundme');
                    }

                    if (amountOfTypesFound.length > 1) {
                        document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + amountOfTypesFound.length + ' ' + foundType + ' egg types found! (' + typePokemonNames.toString() + ')</div>');
                    } else if (amountOfTypesFound.length == 1) {
                        document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + amountOfTypesFound.length + ' ' + foundType + ' egg type found! (' + typePokemonNames.toString() + ')</div>');
                    }
                } // for
            } // if
        } // else

        if (!(this.searchArray.length == 1 && this.searchArray[0] == '')) {
            const customSearchAmount = this.searchArray.length;

            if (this.settings.customEgg === true) {
                for (let i = 0; i < customSearchAmount; i++) {
                    const value = this.searchArray[i];
                    // skip falsy values (including empty strings)
                    if(!value) {
                        continue;
                    }

                    if (this.jQuery('#egglist>div>h3:containsIN(' + value + ')').length) {
                        const searchResult = value;

                        const shelterImgSearch = this.jQuery('#egglist>div>h3:containsIN(' + value + ')');
                        const shelterBigImg = shelterImgSearch.next();
                        obj.jQuery(shelterBigImg).addClass('labfoundme');

                        if (this.jQuery('#egglist>div>h3:containsIN(' + value + ')').length > 1) {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                        } else {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                        }
                    } // if

                    if (obj.jQuery('#egglist>div img[src*="' + value + '"]').length) {
                        const searchResult = obj.jQuery('#egglist>div img[src*="' + value + '"]').prev().text();

                        const shelterImgSearch = obj.jQuery('#egglist>div img[src*="' + value + '"]');
                        obj.jQuery(shelterImgSearch).addClass('labfoundme');

                        if (obj.jQuery('#egglist>div img[src*="' + value + '"]').length > 1) {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                        } else {
                            document.querySelector('#labsuccess').insertAdjacentHTML('beforeend', '<div id="labfound">' + searchResult + ' found!<img src="//pfq-static.com/img/pkmn/heart_1.png/t=1427152952"></div>');
                        }
                    } // if
                } // for
            } // if
        } // else
    } // customSearch
}
const FishingBase = Page;

class FishingPage extends FishingBase {
    constructor(jQuery) {
        super(jQuery, 'QoLFishing', {}, 'fishing');
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
    constructor(jQuery) {
        super(jQuery, 'QoLMultiuser', {
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

const FarmBase = Page;

class FarmPage extends FarmBase {
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

    constructor(jQuery, GLOBALS, externals) {
        super(jQuery, 'QoLFarm', {}, 'farm#tab=1');
        this.defaultSettings = this.DEFAULT_SETTINGS(GLOBALS);
        this.settings = this.defaultSettings;
        this.evolveListCache = '';
        if (externals && externals.DexPageParser) {
            this.DexPageParser = externals.DexPageParser;
        }
        // if(externals) {
        //     for(let key in externals) {
        //         this[key] = externals[key];
        //     }
        // }
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
    checkForValidDexData(GLOBALS) {
        if (GLOBALS.DEX_DATA === undefined) {
            window.alert('Pokedex data is not currently loaded. Please load by pressing "Update Pokedex" in the QoL Hub');
        } else if (GLOBALS.DEX_DATA === null) {
            window.alert('Pokedex data is not currently loaded. Please load by pressing "Update Pokedex" in the QoL Hub');
        }
    }
    easyEvolveNormalList(GLOBALS) {
        this.clearSortedEvolveLists();
        this.checkForValidDexData(GLOBALS);
    }
    easyEvolveTypeList(GLOBALS) {
        const obj = this;
        obj.checkForValidDexData(GLOBALS);
        const dexData = GLOBALS.DEX_DATA;

        if (!GLOBALS.REGIONAL_FORMS_LIST && localStorage.getItem('QoLRegionalFormsList')) {
            GLOBALS.REGIONAL_FORMS_LIST = JSON.parse(localStorage.getItem('QoLRegionalFormsList'));
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

        const loadDataFromEvolutionOriginDexPage = function ($, dexPageParser, typeList, number, name) {
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
                    types = getTypesFromDexPage(dexPageParser, typeList, $(html)).map((t) => '' + t);
                } // htmlIndex > -1
            }); // loadDexPage
            return {
                status: status,
                evolutions: evolutions,
                types: types
            };
        };

        const loadDataFromEvolutionDestinationDexPage = function ($, dexPageParser, typeList, number, name) {
            let status = false;
            let types = [];
            // Load dex page for the match
            loadDexPage($, number, name, (data) => {
                const html = obj.jQuery.parseHTML(data);
                const htmlIndex = findDivCoreIndex($, html);
                if (!logErrorIfIndexNegativeOne(htmlIndex,
                    `Unable to find dex details on dex page for pokedex number ${number}`)) {
                    types = getTypesFromDexPage(dexPageParser, typeList, $(html[htmlIndex])).map((t) => '' + t);
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
            const destStart = evoString.indexOf('into</span> ') + 12;
            return evoString.substr(destStart);
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

        const getTypesFromDexPage = function (DexPageParser, typeList, html) {
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
                    const dexInfo = loadDataFromEvolutionOriginDexPage(obj.jQuery, obj.DexPageParser, GLOBALS.TYPE_LIST, dexNumber, previousPokemon);
                    let evolutions = {};
                    if (dexInfo.status) {
                        evolveInDex = dexInfo.status;
                        evolutions = dexInfo.evolutions;
                        evolveTypesPrevious = dexInfo.types;
                    }

                    if (evolveInDex && Object.keys(evolutions).indexOf(evolvePokemon) > -1) {
                        const info = loadDataFromEvolutionDestinationDexPage(obj.jQuery, obj.DexPageParser, GLOBALS.TYPE_LIST, evolutions[evolvePokemon], evolvePokemon);
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

            let evolvePokemonName = getEvolveString.substr(getEvolveString.indexOf('into</span> ') + 12);
            // remove extraneous whitespace
            evolvePokemonName = evolvePokemonName.trim();
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

const DaycareBase = Page;
class DaycarePage extends DaycareBase {
    constructor(jQuery, GLOBALS) {
        super(jQuery, 'QoLDaycare', {}, 'daycare');
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

const DexBase = Page;

class DexPage extends DexBase {
    constructor(jQuery) {
        super(jQuery, 'QoLDexPage', {}, '/dex');
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

const WishforgeBase = Page;

class WishforgePage extends WishforgeBase {
    constructor(jQuery, GLOBALS) {
        super(jQuery, 'QoLWishforge', {}, 'forge');
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





const pfqol = function ($) {
    'use strict';
    // :contains to case insensitive
    $.extend($.expr[':'], {
        'containsIN': function (elem, i, match, array) {
            return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || '').toLowerCase()) >= 0;
        }
    });

    const DEFAULT_USER_SETTINGS = { // default settings when the script gets loaded the first time
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
    let USER_SETTINGS = DEFAULT_USER_SETTINGS;

    const GLOBALS = Globals;
    const HELPERS = Helpers;
    const RESOURCES = Resources;
    GLOBALS.fillTemplates(RESOURCES);
    GLOBALS.fillOptionsLists(HELPERS);

    // manage GLOBALS.DEX_DATA and GLOBALS.DEX_UPDATE_DATE
    // GLOBALS.DEX_DATA is the data loaded directly from the script contained in
    // the pokefarm.com/dex HTML. It contains the list of pokemon, and for each:
    // - their types
    // - if they hatch from an egg,
    // - if you have the eggdex, and
    // - if you have the regular, shiny, albino, and melanistic pokedex entries
    const LOCAL_STORAGE = new LocalStorageManager(localStorage);
    if (!LOCAL_STORAGE.loadDexIntoGlobalsFromStorage(GLOBALS)) { // can't load it from storage
        LOCAL_STORAGE.loadDexIntoGlobalsFromWeb($, document, DexUtilities, GLOBALS); // so load it from the web
    } else { // can load it from storage
        LOCAL_STORAGE.loadDexIntoGlobalsFromWebIfOld($, document, DexUtilities, GLOBALS); // reload it from web if it's old
    }
    LOCAL_STORAGE.loadEvolveByLevelList(GLOBALS);
    LOCAL_STORAGE.loadEvolutionTreeDepthList(GLOBALS);

    const PFQoL = (function PFQoL() {

        const SETTINGS_SAVE_KEY = GLOBALS.SETTINGS_SAVE_KEY;

        const PAGES = {
            instantiatePages: function () {
                for (const key of Object.keys(PAGES.pages)) {
                    const pg = PAGES.pages[key];
                    if (USER_SETTINGS[pg.setting] === true) {
                        PAGES.pages[key].object = new PAGES.pages[key].class($, GLOBALS, {
                            DexPageParser: DexPageParser
                        });
                    }
                }
            },
            loadSettings: function () {
                for (const key of Object.keys(PAGES.pages)) {
                    const pg = PAGES.pages[key];
                    if (USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                        pg.object.loadSettings();
                    }
                }
            },
            saveSettings: function () {
                for (const key of Object.keys(PAGES.pages)) {
                    const pg = PAGES.pages[key];
                    if (USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                        pg.object.saveSettings();
                    }
                }
            },
            populateSettings: function () {
                for (const key of Object.keys(PAGES.pages)) {
                    const pg = PAGES.pages[key];
                    if (USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                        pg.object.populateSettings();
                    }
                }
            },
            clearPageSettings: function (pageName) {
                if (!(pageName in PAGES.pages)) {
                    console.error(`Could not proceed with clearing page settings. Page ${pageName} not found in list of pages`);
                } else if (PAGES.pages[pageName].object) {
                    PAGES.pages[pageName].object.resetSettings();
                }
            },
            setupHTML: function (GLOBALS) {
                for (const key of Object.keys(PAGES.pages)) {
                    const pg = PAGES.pages[key];
                    if (USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                        pg.object.setupHTML(GLOBALS);
                        fn.backwork.populateSettingsPage();
                    }
                }
            },
            setupCSS: function () {
                for (const key of Object.keys(PAGES.pages)) {
                    const pg = PAGES.pages[key];
                    if (USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                        pg.object.setupCSS();
                    }
                }
            },
            setupObservers: function () {
                for (const key of Object.keys(PAGES.pages)) {
                    const pg = PAGES.pages[key];
                    if (USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                        pg.object.setupObserver();
                    }
                }
            },
            setupHandlers: function (GLOBALS) {
                for (const key of Object.keys(PAGES.pages)) {
                    const pg = PAGES.pages[key];
                    if (USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                        pg.object.setupHandlers(GLOBALS);
                    }
                }
            },
            settingsChange: function () {
                for (const key of Object.keys(PAGES.pages)) {
                    const pg = PAGES.pages[key];
                    if (USER_SETTINGS[pg.setting] === true && pg.object.onPage(window)) {
                        pg.object.settingsChange();
                    }
                }
            },
            pages: {
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
        };

        const fn = { // all the functions for the script
            /** background stuff */
            backwork: { // background stuff
                instantiatePages() {
                    PAGES.instantiatePages();
                },
                loadSettings() { // initial settings on first run and setting the variable settings key
                    PAGES.loadSettings();
                    if (localStorage.getItem(SETTINGS_SAVE_KEY) === null) {
                        fn.backwork.saveSettings();
                    } else {
                        try {
                            const countScriptSettings = Object.keys(USER_SETTINGS).length;
                            const localStorageString = JSON.parse(localStorage.getItem(SETTINGS_SAVE_KEY));
                            const countLocalStorageSettings = Object.keys(localStorageString).length;
                            // adds new objects (settings) to the local storage
                            if (countLocalStorageSettings < countScriptSettings) {
                                const defaultsSetting = USER_SETTINGS;
                                const userSetting = JSON.parse(localStorage.getItem(SETTINGS_SAVE_KEY));
                                const newSetting = $.extend(true, {}, defaultsSetting, userSetting);

                                USER_SETTINGS = newSetting;
                                fn.backwork.saveSettings();
                            }
                            // removes objects from the local storage if they don't exist anymore. Not yet possible..
                            if (countLocalStorageSettings > countScriptSettings) {
                                //let defaultsSetting = USER_SETTINGS;
                                //let userSetting = JSON.parse(localStorage.getItem(SETTINGS_SAVE_KEY));
                                fn.backwork.saveSettings();
                            }
                        }
                        catch (err) {
                            fn.backwork.saveSettings();
                        }
                        if (localStorage.getItem(SETTINGS_SAVE_KEY) != USER_SETTINGS) {
                            USER_SETTINGS = JSON.parse(localStorage.getItem(SETTINGS_SAVE_KEY));
                        }
                    }
                }, // loadSettings
                saveSettings() { // Save changed settings
                    PAGES.saveSettings();
                    localStorage.setItem(SETTINGS_SAVE_KEY, JSON.stringify(USER_SETTINGS));
                }, // saveSettings
                populateSettingsPage() { // checks all settings checkboxes that are true in the settings
                    for (const key in USER_SETTINGS) {
                        if (Object.hasOwnProperty.call(USER_SETTINGS, key)) {
                            const value = USER_SETTINGS[key];
                            if (typeof value === 'boolean') {
                                HELPERS.toggleSetting(key, value);
                            }
                            else if (typeof value === 'string') {
                                HELPERS.toggleSetting(key, value);
                            }
                        }
                    }
                    PAGES.populateSettings();
                },
                clearPageSettings(pageName) {
                    PAGES.clearPageSettings(pageName);
                },
                setupHTML(GLOBALS) { // injects the HTML changes from GLOBALS.TEMPLATES into the site
                    // Header link to Userscript settings
                    document.querySelector('li[data-name*=\'Lucky Egg\']').insertAdjacentHTML('afterend', GLOBALS.TEMPLATES.qolHubLinkHTML);

                    PAGES.setupHTML(GLOBALS);
                },
                setupCSS() { // All the CSS changes are added here
                    GM_addStyle(RESOURCES.css());
                    PAGES.setupCSS();

                    //custom user css
                    const customUserCss = USER_SETTINGS.customCss;
                    //document.querySelector('head').append();
                    $('head').append('<style type="text/css">' + customUserCss + '</style>');
                },
                setupObservers() { // all the Observers that needs to run
                    PAGES.setupObservers();
                },
                setupHandlers(GLOBALS) { // all the event handlers
                    PAGES.setupHandlers(GLOBALS);
                },
                startup() { // All the functions that are run to start the script on Pokéfarm
                    return {
                        'creating Page handlers': fn.backwork.instantiatePages,
                        'loading Settings': fn.backwork.loadSettings,
                        'setting up HTML': fn.backwork.setupHTML,
                        'populating Settings': fn.backwork.populateSettingsPage,
                        'setting up CSS': fn.backwork.setupCSS,
                        'setting up Observers': fn.backwork.setupObservers,
                        'setting up Handlers': fn.backwork.setupHandlers,
                    };
                },
                init() { // Starts all the functions.
                    console.log('Starting up ..');
                    const startup = fn.backwork.startup();
                    for (const message in startup) {
                        if (Object.hasOwnProperty.call(startup, message)) {
                            console.log(message);
                            startup[message](GLOBALS);
                        }
                    }
                },
            }, // end of backwork

            /** public stuff */
            API: { // the actual seeable and interactable part of the userscript
                settingsChange(element, textElement) {
                    if (JSON.stringify(USER_SETTINGS).indexOf(element) >= 0) { // userscript settings
                        if (USER_SETTINGS[element] === false) {
                            USER_SETTINGS[element] = true;
                        } else if (USER_SETTINGS[element] === true) {
                            USER_SETTINGS[element] = false;
                        } else if (typeof USER_SETTINGS[element] === 'string') {
                            USER_SETTINGS[element] = textElement;
                        }
                        fn.backwork.saveSettings();
                    } else {
                        PAGES.settingsChange();
                    }
                }, // settingsChange

                clearPageSettings(pageName) {
                    if (pageName !== 'None') { // "None" matches option in HTML
                        fn.backwork.clearPageSettings(pageName);
                    }
                }, // clearPageSettings
                populateSettingsPage() {
                    fn.backwork.populateSettingsPage();
                } // populateSettingsPage
            }, // end of API
        }; // end of fn

        fn.backwork.init();

        return fn.API;
    })(); // end of PFQoL function

    $(document).on('click', 'li[data-name="QoL"]', (function () { //open QoL hub
        QoLHub.build($, document, GLOBALS.TEMPLATES, GLOBALS, USER_SETTINGS, PFQoL.settingsChange);
        PFQoL.populateSettingsPage();
    }));

    $(document).on('click', '#updateDex', (function () {
        QoLHub.handleUpdateDexClick($, document, DexUtilities, LOCAL_STORAGE, DexPageParser, EvolutionTreeParser, GLOBALS);
    }));

    $(document).on('click', '#resetPageSettings', (function () {
        const page = $(this).parent().find('select').val();
        PFQoL.clearPageSettings(page);
    }));

    // Issue #61 - Item 6 - Remove the 'Cleared!' message so the user knows they can click it again
    $(document).on('mouseover', '#clearCachedDex', (function () {
        $('#clearCachedDex').next().remove();
    }));

    // Issue #61 - Item 6 - Add a 'Cleared!' message so the user knows that the clearing works
    $(document).on('click', '#clearCachedDex', (function () {
        $('#clearCachedDex').next().remove();
        localStorage.removeItem('QoLEvolveByLevel');
        localStorage.removeItem('QoLDexIDsCache');
        localStorage.removeItem('QoLEvolutionTreeDepth');
        localStorage.removeItem('QoLRegionalFormsList');
        $('#clearCachedDex').after('<span> Cleared!</span>');
    }));

    $(document).on('click', 'h3.slidermenu', (function () { //show hidden li in change log
        $(this).next().slideToggle();
    }));
};

if (module) {
    module.exports.pfqol = pfqol;
}
else {
    pfqol(jQuery);
}

