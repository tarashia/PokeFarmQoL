/* This class handles creating, removing, and handling the DOM object actions
 * for the QoL Hub.
 */
/* globals QoLHubBase */
// eslint-disable-next-line no-unused-vars
class QoLHub extends QoLHubBase {
    constructor(jQuery, GLOBALS, PAGES, SETTINGS) {
        super(jQuery, GLOBALS, PAGES, SETTINGS);
    }
} // QoLHub

if (module) {
    module.exports.QoLHub = QoLHub;
}