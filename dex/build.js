/*
    Reads all CSVs present in the csvs folder, and creates the dex-data.json file from them.
    Ensures that minimum data (region, dex ID, species) is present, and that all options are valid.
*/

import fs from 'fs';
import jsonc from 'jsonc';
import { parse } from 'csv-parse/sync';
import { exit } from 'node:process';

const csvDir = 'dex/csvs';
const resourceDir = 'src/resources';
const resources = {
    'regions.jsonc': undefined,
    'types.jsonc': undefined,
    'egg-groups.jsonc': undefined,
    'colours.jsonc': undefined,
    'body-styles.jsonc': undefined
}
// track which file/
var location = {
    'file': undefined,
    'line': undefined,
    'column': undefined
};

async function run() {
    // Load resources for later
    for (const [key, value] of Object.entries(resources)) {
        resources[key] = await jsonc.read(resourceDir+'/'+key);
    }

    // Read CSVs
    const files = await fs.promises.readdir(csvDir);
    if(!files) {
        console.error('No files found - have you downloaded the CSVs?');
        exit(1);
    }
    var output = [];
    for(var i=0; i<files.length; i++) {
        location.file = files[i];
        const fileContents = fs.readFileSync(csvDir+'/'+files[i]);
        const data = parse(fileContents, {from: 2});
        const procData = process(data);
        output = output.concat(procData);
    }
    // use "jpg" file extension for on-site upload
    fs.writeFileSync('dex/dex-data.json',JSON.stringify(output),{encoding:'utf8',flag:'w'});
    fs.writeFileSync('dex/dex-data.jpg',JSON.stringify(output),{encoding:'utf8',flag:'w'});
    console.log('Done.');
}

/*[
    0 Dex ID
    1 Species
    2 Forme
    3 Type 1
    4 Type 2
    5 Egg group 1
    6 Egg group 2
    7 Is legendary?
    8 Is egg?
    9 In lab?
    10 Colour
    11 Body style
    12 Region
]*/
function process(data) {
    var output = [];
    for(var i=0; i<data.length; i++) {
        location.line = i;
        const row = data[i];
        var procRow = {};
        var index = undefined;
        for(var j=0; j<row.length; j++) {
            location.column = j;
            let value = row[j].trim();
            switch (j) {
                case 0:
                    if(value=='') {
                        throwError('Dex ID not set');
                    }
                    if(!value.match(/^\d{3}[a-zA-Z0-9_|~-]*$/)) {
                        throwError('Invalid dex ID: '+value);
                    }
                    procRow['dexID'] = value;
                    break;
                case 1:
                    if(value=='') {
                        throwError('Species not set');
                    }
                    procRow['species'] = value;
                    break;
                case 2:
                    procRow['forme'] = value;
                    break;
                case 3:
                    procRow['type1'] = validate('types.jsonc', value);
                    break;
                case 4:
                    procRow['type2'] = validate('types.jsonc', value);
                    break;
                case 5:
                    procRow['eggGroup1'] = validate('egg-groups.jsonc', value);
                    break;
                case 6:
                    procRow['eggGroup2'] = validate('egg-groups.jsonc', value);
                    break;
                case 7:
                    if(value.toUpperCase()=='YES') {
                        procRow['legendary'] = true;
                    }
                    else {
                        procRow['legendary'] = false;
                    }
                    break;
                case 8:
                    if(value.toUpperCase()=='YES') {
                        procRow['egg'] = true;
                    }
                    else {
                        procRow['egg'] = false;
                    }
                    break;
                case 9:
                    if(value.toUpperCase()=='YES') {
                        procRow['inLab'] = true;
                    }
                    else {
                        procRow['inLab'] = false;
                    }
                    break;
                case 10:
                    procRow['colour'] = validate('colours.jsonc', value);
                    break;
                case 11:
                    procRow['bodyStyle'] = validate('body-styles.jsonc', value);
                    break;
                case 12: 
                    index = validate('regions.jsonc', value);
                    procRow['region'] = index;
                    break;
                default:    
                    throwError('Out of bounds');
            }
        }
        output.push(procRow);
    }
    return output;
}

/* 
    returns the key or index of the resource set if entry is present
    throws an exception if the entry is invalid (not present)
    returns null if the entry is empty (vs existing, but invalid)
*/
function validate(option, entry) {
    if(entry.trim()=='') {
        return null;
    }
    const dataSet = resources[option];
    const key = Object.keys(dataSet).find(key => dataSet[key] === entry);
    if(key) {
        return key;
    }
    throwError('Entry not found in '+option+': '+entry);
}

function throwError(message) {
    console.error(message);
    console.error(location);
    exit(1);
}

run();
