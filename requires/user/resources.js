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
}