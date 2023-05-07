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
const imgDir = 'images';
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
    fs.writeFileSync(resourceDir+'/dex-data.json',JSON.stringify(output),{encoding:'utf8',flag:'w'});
    // special format for on-site upload
    fs.writeFileSync(imgDir+'/dex-data.jpg',JSON.stringify(output),{encoding:'utf8',flag:'w'});
    console.log('Done.');
}

/*[
    0 'Region',       1 'Dex ID',       2 'Species',
    3 'Forme',        4 'Type 1',       5 'Type 2',
    6 'Egg group 1',  7 'Egg group 2',  8 'Is legendary?',
    9 'Colour',      10 'Body style',  11 'Img codes'
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
            switch (j) {
                case 0:
                    index = validate('regions.jsonc', row[0]);
                    if(index === null) {
                        throwError('Region not set');
                    }
                    procRow['region'] = index;
                    break;
                case 1:
                    const dexID = row[1].trim();
                    if(dexID=='') {
                        throwError('Dex ID not set');
                    }
                    if(!dexID.match(/^\d{3}[a-zA-Z0-9_-]*$/)) {
                        throwError('Invalid dex ID: '+dexID);
                    }
                    procRow['dexID'] = dexID;
                    break;
                case 2:
                    if(row[2]=='') {
                        throwError('Species not set');
                    }
                    procRow['species'] = row[2].trim();
                    break;
                case 3:
                    procRow['forme'] = row[3].trim();
                    break;
                case 4:
                    procRow['type1'] = validate('types.jsonc', row[4]);
                    break;
                case 5:
                    procRow['type2'] = validate('types.jsonc', row[5]);
                    break;
                case 6:
                    procRow['eggGroup1'] = validate('egg-groups.jsonc', row[6]);
                    break;
                case 7:
                    procRow['eggGroup2'] = validate('egg-groups.jsonc', row[7]);
                    break;
                case 8:
                    if(row[8].toUpperCase()=='YES') {
                        procRow['legendary'] = true;
                    }
                    else {
                        procRow['legendary'] = false;
                    }
                    break;
                case 9:
                    procRow['colour'] = validate('colours.jsonc', row[9]);
                    break;
                case 10:
                    procRow['bodyStyle'] = validate('body-styles.jsonc', row[10]);
                    break;
                case 11:
                    var imgCodes = parse(row[11].trim(), {})[0];
                    if(imgCodes) {
                        for(var k=0; k<imgCodes.length; k++) {
                            imgCodes[k] = imgCodes[k].trim();
                            if(!imgCodes[k].match(/^[a-z0-9](\/[a-z0-9])+$/)) {
                                throwError('Invalid img code: '+imgCodes[k]);
                            }
                        }
                    }
                    else {
                        imgCodes = null;
                    }
                    procRow['imgCodes'] = imgCodes;
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
