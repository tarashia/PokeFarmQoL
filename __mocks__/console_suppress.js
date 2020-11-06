//__mocks__/console_suppress.js:

const c = console;

// don't print anything
const error = jest.fn((message) => {
    return message;
});

// don't print anything
const log = jest.fn((message) => {
    return message;
});

const cons = c;
cons.error = error;
cons.log = log;
exports.console = cons;
