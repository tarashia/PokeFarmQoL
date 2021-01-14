//__mocks__/jquery.js:

const jQ = jest.requireActual('jquery');

const get = jest.fn((path) => {
    return jQ.Deferred().resolve(path);
});

const jQuery = jQ;
jQuery.get = get;
// jQuery.when = when;
exports.jQuery = jQuery;
