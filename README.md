# PokeFarmQoL
Userscript that includes a few QoL changes to Pokéfarm and can enhance your Pokéfarm experience even more!

# Features
Note that currently some features are different between the Sanctioned and Tampermoneky versions of this script. The subsections below call out the differences where they exist.
## Quality of Life Hub (Icon on Timers Bar)
- Enable/disable the modifications on each page
- Displays info on Pokedex data settings
- Place for adding custom CSS
- Options for resetting the QoL settings for each page
## Daycare Page (/daycare)
- Highlight eligible breeding partners for a pokemon while searching from the daycare
## Dex Page (/dex)
- Add a second type-filtering selection option
- Save a copy of of the dex data for use on other pages
## Farm Page (/farm)
- Sorting options for Pokémon evolve list in the farm sorted on types
  - Sort by type
  - Sort by name
  - Sort by "newness" (if you own the evolution or not)
Sanctioned Script
Does not currently have the ability to sort Nicknamed pokemon by type. This would require loading the nicknamed pokemon's summary page, which has proven to be a slow process that causes a high amount of communication with the Pokefarm server, and so was left out of the Sanctioned version.
## Fishing Page (/fishing)
- Select all Pokémon and select by berry preference for adopting/releasing
## Public Fields Page (/fields/user)
- Advanced sorting
- Advanced searching with custom search parameters
- Pokémon clicked counter
- Options for hiding Pokémon tooltips
## Private Fields Page (/fields)
- Select all Pokémon and select by berry preference for moving/releasing
- Advanced searching with custom search parameters
- Options for hiding Pokémon tooltips
## Lab Page (/lab)
- Advanced searching with custom search parameters
- Advanced Fields sorting & Pokémon clicked counter in fields
## Multiuser Page (/users/...)
- Mass party clicking modifications
## Shelter Page (/shelter)
### Common Features
- Advanced searching with custom search parameters:
  - Any icon that appears next to a Pokemon's name (Male, Female, Genderless, Starter, Shiny, Albino, Melanistic, Custom Sprite)
  - Egg and Pokemon types
  - Image file paths (img code)
- Use the 'n' key on the keyboard to select an egg instead of clicking on it
### Sanctioned Script
- Does not currently have the ability to search for Not Fully Evolved (NFE) or Ready to Evolve (RTE) pokemon. This may be updated later, but at the moment, it is a feature that has proven buggy for many users, and so was left out of the Sanctioned version.
### Tampermonkey Script
- Additional search parameters:
  - RTE pokemon
  - NFE pokemon
## Wishforge Page (/forge)
- Condense the list of Crafted Badges into a table

# Past Suggestions/Issues
- **Farm Page** - Easy Evolution doesn't work when the list is sorted - This was not fixed, because it is impossible to implement given the current design of the sorted lists without copying code from pokefarm.
- **Shelter** - Add nature/berry selector - This feature was not implemented, because it would 1) cause the shelter page to be extremely slow, 2) requires additional information not readily available on the shelter page, and 3) (may) break the one-click rule.
- **Shelter** - Highlight pokemon that are ready to evolve (by item) - This feature was not implemented, because it would require loading information from a user's inventory

# Supported Environments
## Tampermonkey Script
This is supported anywhere Tampermonkey is supported
## Integrated Script
_Always working on expanding testing_ 🙂
### Windows
- **Versions**: Tested on Windows 10 
- **Browsers**: Chrome, Firefox, Opera (maybe more??)
### Mac OS
- **Versions**: Tested on Mac Big Sur 11.0.1
- **Browsers**: Safari, Firefox
### iOS
- **Versions**: Tested on 13.3.1
- **Browsers**: Chrome, Firefox
## Ubuntu Linux
- **Versions**: TBR
- **Browsers**: Chrome, Firefox
