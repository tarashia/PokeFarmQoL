const DexUtilities = require("../requires/utils/dexUtilities.js");
const jQuery = require("../node_modules/jquery/dist/jquery.min.js");
const fs = require("fs");
const path = require("path");

jest.mock('../node_modules/jquery/dist/jquery.min');
const ownerDocument = document.implementation.createHTMLDocument('virtual');

describe("Load main dex page", () => {
    test("Should call jQuery.get to load main dex page", () => {
        jQuery.get.mockClear();
        jQuery.get.mockImplementation((path) => path);
        let result = DexUtilities.getDexPage(jQuery);
        expect(jQuery.get.mock.calls.length).toBe(1);
        expect(result).toBe('https://pokefarm.com/dex');
    });
});

describe("Load the dex pages for the pokemon whose dex numbers are in the dexNumbers input", () => {
    test("Loads dex pages for known pokemon and updates progressBar and progressSpan", () => {
        jQuery.get.mockClear();
        jQuery.get.mockImplementation((path) => Promise.resolve(path));
        jQuery.when.mockImplementation((prom1, prom2, prom3, prom4) => {
            return Promise.resolve();
        });
        const dexNumbers = ["001", "002", "003", "003-M"];
        const progressBar = {
            'value': 0,
        };
        const progressSpan = {
            'textContent': '',
        };
        DexUtilities.loadDexPages(jQuery, dexNumbers, progressBar, progressSpan).then(() => {
            expect(progressBar.value).toBe(4);
            expect(progressSpan.textContent).toBe("Loaded 4 of 4 Pokemon");
            expect(jQuery.get.mock.calls.length).toBe(4);
        });
    });
    test("Handles unknown pokemon by updating progressBar and progressSpan without calling jQuery", () => {
        jQuery.get.mockClear();
        jQuery.get.mockImplementation((path) => Promise.resolve(path));
        jQuery.when.mockImplementation((prom1, prom2, prom3, prom4) => {
            return Promise.resolve();
        });
        const dexNumbers = ["001", "002", "000", "003-M"];
        const progressBar = {
            'value': 0,
        };
        const progressSpan = {
            'textContent': '',
        };
        DexUtilities.loadDexPages(jQuery, dexNumbers, progressBar, progressSpan).then(() => {
            expect(progressBar.value).toBe(4);
            expect(progressSpan.textContent).toBe("Loaded 4 of 4 Pokemon");
            expect(jQuery.get.mock.calls.length).toBe(3);
        });
    });
});

describe("Loads the dex pages for the forms of a pokemon", () => {
    test("Load pages for other forms", () => {
        jQuery.get.mockClear();
        jQuery.get.mockImplementation((path) => Promise.resolve(path));
        jQuery.fn.find.mockImplementation(() => console.log('fdsa'));
        const file1 = path.join(__dirname, "./", "003-M.html");
        const html1 = fs.readFileSync(file1, "utf8", 'r');
        const file2 = path.join(__dirname, "./", "003-M.html");
        const html2 = fs.readFileSync(file2, "utf8", 'r');
        const input = [html1, html2];
        const progressBar = {
            'value': 0,
        };
        const progressSpan = {
            'textContent': '',
        };

        DexUtilities.loadFormPages(jQuery, ownerDocument, input, progressBar, progressSpan).then(() => {
            expect(progressBar.value).toBe(4);
            expect(progressSpan.textContent).toBe("Loaded 4 of 4 Pokemon");
            expect(jQuery.get.mock.calls.length).toBe(3);
        });
    });
});

/*
  loadFormPages($, ownerDocument, firstFormHTML, progressBar, progressSpan)
  parseEvolutionTrees($, ownerDocument, args)
  buildEvolutionTreeDepthsList(parsed_families, dex_ids, form_data, form_map)
  parseFormData($, ownerDocument, args)
  parseBaseNames($, ownerDocument, args)
  parseEggsPngsList($, ownerDocument, args)
  parseTypesList($, ownerDocument, globals, args)
  buildRegionalFormsMap(form_map)
  buildEggPngsTypesMap(base_names_list, egg_pngs_list, types_list)
*/
