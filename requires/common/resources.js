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