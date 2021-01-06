//__mocks__/console.js:

// console.log(console);
const c = console;

const error = jest.fn((message) => {
    // console.log('Error - ', message);
    return message;
});

const cons = c;
cons.error = error;
exports.console = cons;
