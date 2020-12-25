/* This class handles creating, removing, and handling the DOM object actions 
 * for the QoL Hub.
 */

// eslint-disable-next-line no-unused-vars
class QoLHub {
    static build($, document, templates, globals, settings, settingsChange) {
        $('body', document).append(templates.qolHubHTML);
        $('#core', document).addClass('scrolllock');
        let qolHubCssBackgroundHead = $('.qolHubHead.qolHubSuperHead', document).css('background-color');
        let qolHubCssTextColorHead = $('.qolHubHead.qolHubSuperHead', document).css('color');
        let qolHubCssBackground = $('.qolHubTable', document).css('background-color');
        let qolHubCssTextColor = $('.qolHubTable', document).css('color');
        $('.qolHubHead', document).css({ 'backgroundColor': '' + qolHubCssBackgroundHead + '', 'color': '' + qolHubCssTextColorHead + '' });
        $('.qolChangeLogHead', document).css({ 'backgroundColor': '' + qolHubCssBackgroundHead + '', 'color': '' + qolHubCssTextColorHead + '' });
        $('.qolopencloselist.qolChangeLogContent', document).css({ 'backgroundColor': '' + qolHubCssBackground + '', 'color': '' + qolHubCssTextColor + '' });
        $('.qolDate', document).text(globals.DEX_UPDATE_DATE);

        let customCss = settings.customCss;

        $('.textareahub', document).append('<textarea id="qolcustomcss" rows="15" cols="60" class="qolsetting" data-key="customCss"/></textarea>');
        if (customCss === '') {
            $('.textareahub textarea', document).val('#thisisanexample {\n    color: yellow;\n}\n\n.thisisalsoanexample {\n    background-color: blue!important;\n}\n\nhappycssing {\n    display: absolute;\n}');
        } else {
            $('.textareahub textarea', document).val(customCss);
        }

        $('#qolcustomcss', document).on('keydown', function (e) {
            if (e.keyCode == 9 || e.which == 9) {
                e.preventDefault();
                var s = this.selectionStart;
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

        let date = (new Date()).toUTCString();
        globals.DEX_UPDATE_DATE = date;
        $('.qolDate', document).text(globals.DEX_UPDATE_DATE);
        localStorageManager.updateLocalStorageDex($, document, date, globals);

        // this will update the globals.EVOLVE_BY_LEVEL_LIST
        // and local storage
        const virtualDocument = document;//.implementation.createHTMLDocument('virtual');
        dexUtilities.getMainDexPage($).done((data) => {
            let html = $.parseHTML(data);
            let dex = $(html[html.length - 1], virtualDocument).find('#dexdata').html();
            const dexNumbers = localStorageManager.parseAndStoreDexNumbers(dex);

            if (dexNumbers.length > 0) {
                // update the progress bar in the hub
                const limit = dexNumbers.length;
                const progressBar = $('progress.qolDexUpdateProgress', document)[0];
                progressBar['max'] = limit;
                dexUtilities.loadDexPages($, dexNumbers, progressBar, progressSpan).done((...data) => {
                    const dexPagesHTML = data.map(d => (Array.isArray(d) ? d[0] : d));
                    dexUtilities.loadFormPages($, virtualDocument, dexPagesHTML, progressBar, progressSpan).done((...formData) => {
                        const formPagesHTML = formData.map(d => (Array.isArray(d) ? d[0] : d));

                        // Combine the arrays of HTML into one array
                        let allPagesHTML = dexPagesHTML.concat(formPagesHTML);

                        // Parse evolution data
                        const parsed_families_and_dex_ids = dexUtilities.parseEvolutionTrees($, virtualDocument, dexPageParser, evolutionTreeParser, allPagesHTML);
                        const parsed_families = parsed_families_and_dex_ids[0];
                        const dex_ids = parsed_families_and_dex_ids[1];

                        // Parse form data
                        const parsed_forms_and_map = dexUtilities.parseFormData($, virtualDocument, dexPageParser, allPagesHTML);
                        const form_data = parsed_forms_and_map[0];
                        const form_map = parsed_forms_and_map[1];

                        // Build evolution tree depths
                        const evolution_tree_depth_list = dexUtilities.buildEvolutionTreeDepthsList(parsed_families, dex_ids, form_data, form_map);

                        // Collect regional form data
                        const regional_form_map = dexUtilities.buildRegionalFormsMap(form_map);

                        // Collect list of base names to make it easier down the line
                        const base_names = dexUtilities.parseBaseNames($, virtualDocument, dexPageParser, allPagesHTML);
                        // Collect list of egg pngs
                        const egg_pngs = dexUtilities.parseEggsPngsList($, virtualDocument, dexPageParser, allPagesHTML);
                        // Collect list of types
                        const types = dexUtilities.parseTypesList($, virtualDocument, dexPageParser, globals, allPagesHTML);
                        const egg_pngs_types_map = dexUtilities.buildEggPngsTypesMap(base_names, egg_pngs, types);

                        localStorageManager.saveEvolveByLevelList(globals, parsed_families, dex_ids);
                        localStorageManager.saveEvolutionTreeDepths(globals, evolution_tree_depth_list);
                        localStorageManager.saveRegionalFormsList(globals, parsed_families, dex_ids, regional_form_map);
                        localStorageManager.saveEggTypesMap(globals, egg_pngs_types_map);
                        progressSpan.textContent = 'Complete!';
                    }).fail((error) => {
                        console.log(error);
                    }); // loadFormPages
                }).fail((error) => {
                    console.log(error);
                }); // loadDexData
            } // if dexNumbers.length > 0
            else {
                progressSpan.textContent = 'Complete!';
            }
        }).fail((error) => {
            console.log(error);
        });// getMainDexPage
    } // handleUpdateDexClick
} // QoLHub