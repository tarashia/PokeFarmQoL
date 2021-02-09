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