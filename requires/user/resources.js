/**
 * This class is used to store CSS and HTML snippets that were previously loaded via Tampermonkey's '@resource' tool
 */
/* globals ResourcesBase */
// eslint-disable-next-line no-unused-vars
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
            <tr>
            <td>
              <label>
                <input type="checkbox" class="qolsetting" data-key="findLegendary"/>Legendary
              </label>
            </td>
              </tr>
          </tbody>
        </table>
        <h4>Search on evolutions</h4>
        <span>Highlight pokemon based on evolution data. Make sure to use the <i>Update Pokedex</i> button in the QoL Hub to load evolution data.</span>
        <div class="tooltip_trigger qoltooltip_trigger">Note</div>
        <div class="tooltip_content>
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
                  <div class="tooltip_trigger qoltooltip_trigger" style="display:inline-block">Evolutions Left</div>
                  <div class="tooltip_content">
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
            <td>
              <label>
                <input type="checkbox" class="qolsetting" data-key="fieldNFE"/>
                <div class="tooltip_trigger qoltooltip_trigger" style="display:inline-block">Evolutions Left</div>
                <div class="tooltip_content">
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
}