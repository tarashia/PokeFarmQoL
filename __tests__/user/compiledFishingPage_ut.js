const $ = require('../../__mocks__/jquery_files').jQuery;
$.USERID = '';
const key = `${$.USERID}.QoLFishing`;
// eslint-disable-next-line no-unused-vars
const console = require('../../__mocks__/console_suppress').console;
const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path');
const pfqol = require(appRoot + '/Poke-Farm-QoL.test.user');
const oldWindowLocation = window.location;

beforeAll(() => {
    delete window.location;

    window.location = Object.defineProperties(
        {},
        {
            ...Object.getOwnPropertyDescriptors(oldWindowLocation),
            href: {
                writable: true,
                value: 'fdsa'
            },
            assign: {
                configurable: true,
                value: jest.fn(),
            },
        },
    );
});

describe('Test Fishing Page', () => {
    test.skip('Test PFQoL controls on Fishing page', () => {
        /*
         * Test HTML has unique numbers of each flavor to facilitate testing:
         * - 1 Any
         * - 2 Sour
         * - 3 Spicy
         * - 4 Dry
         * - 5 Sweet
         * - 6 Bitter
         * - Total = 21
         */
        const ANY_BERRY    = 1;
        const SOUR_BERRY   = 2;
        const SPICY_BERRY  = 3;
        const DRY_BERRY    = 4;
        const SWEET_BERRY  = 5;
        const BITTER_BERRY = 6;
        const TOTAL_BERRY  = ANY_BERRY + SOUR_BERRY + SPICY_BERRY + DRY_BERRY + SWEET_BERRY + BITTER_BERRY;

        const htmlpath = path.join(__dirname, '../data/', 'fishing.html');
        const html = fs.readFileSync(htmlpath, 'utf8', 'r');
        const innerHTML = html.replace(/<html .*?>/, '').replace(/<\/html>/, '').trim();
        global.location.href = 'https://pokefarm.com/fishing';
        document.documentElement.innerHTML = innerHTML;

        localStorage.setItem(key, '{}');
        new pfqol.pfqol($);

        // check that setup is correct
        expect($('[name=masspkmn]').length).toBe(TOTAL_BERRY);

        // check that buttons got added correctly
        expect($('#selectallfish').length).toBe(1);
        expect($('#movefishselectany').length).toBe(1);
        expect($('#movefishselectsour').length).toBe(1);
        expect($('#movefishselectspicy').length).toBe(1);
        expect($('#movefishselectdry').length).toBe(1);
        expect($('#movefishselectsweet').length).toBe(1);
        expect($('#movefishselectbitter').length).toBe(1);
        expect($('[data-showflavour]').parent().next().attr('id')).toBe('selectallfish');
        expect($('#selectallfish').next().attr('id')).toBe('movefishselectany');
        expect($('#movefishselectany').next().attr('id')).toBe('movefishselectsour');
        expect($('#movefishselectsour').next().attr('id')).toBe('movefishselectspicy');
        expect($('#movefishselectspicy').next().attr('id')).toBe('movefishselectdry');
        expect($('#movefishselectdry').next().attr('id')).toBe('movefishselectsweet');
        expect($('#movefishselectsweet').next().attr('id')).toBe('movefishselectbitter');

        //////////////////////////////////////////////

        // check that the right number of pokemon are selected
        $('#selectallfishcheckbox').trigger('click');
        expect($('[name=masspkmn]:checked').length).toBe(TOTAL_BERRY);
        // and check that they are selected
        $('#selectallfishcheckbox').trigger('click');
        expect($('[name=masspkmn]:checked').length).toBe(0);
        //////////////////////////////////////////////

        //////////////////////////////////////////////

        // check that the right number of pokemon are selected
        $('#movefishselectanycheckbox').trigger('click');
        expect($('[name=masspkmn]:checked').length).toBe(ANY_BERRY);
        // and check that they are selected
        $('#movefishselectanycheckbox').trigger('click');
        expect($('[name=masspkmn]:checked').length).toBe(0);
        //////////////////////////////////////////////

        //////////////////////////////////////////////

        // check that the right number of pokemon are selected
        $('#movefishselectsourcheckbox').trigger('click');
        expect($('[name=masspkmn]:checked').length).toBe(SOUR_BERRY);
        // and check that they are selected
        $('#movefishselectsourcheckbox').trigger('click');
        expect($('[name=masspkmn]:checked').length).toBe(0);
        //////////////////////////////////////////////

        //////////////////////////////////////////////

        // check that the right number of pokemon are selected
        $('#movefishselectspicycheckbox').trigger('click');
        expect($('[name=masspkmn]:checked').length).toBe(SPICY_BERRY);
        // and check that they are selected
        $('#movefishselectspicycheckbox').trigger('click');
        expect($('[name=masspkmn]:checked').length).toBe(0);
        //////////////////////////////////////////////

        //////////////////////////////////////////////

        // check that the right number of pokemon are selected
        $('#movefishselectdrycheckbox').trigger('click');
        expect($('[name=masspkmn]:checked').length).toBe(DRY_BERRY);
        // and check that they are selected
        $('#movefishselectdrycheckbox').trigger('click');
        expect($('[name=masspkmn]:checked').length).toBe(0);
        //////////////////////////////////////////////

        //////////////////////////////////////////////

        // check that the right number of pokemon are selected
        $('#movefishselectsweetcheckbox').trigger('click');
        expect($('[name=masspkmn]:checked').length).toBe(SWEET_BERRY);
        // and check that they are selected
        $('#movefishselectsweetcheckbox').trigger('click');
        expect($('[name=masspkmn]:checked').length).toBe(0);
        //////////////////////////////////////////////

        //////////////////////////////////////////////

        // check that the right number of pokemon are selected
        $('#movefishselectbittercheckbox').trigger('click');
        expect($('[name=masspkmn]:checked').length).toBe(BITTER_BERRY);
        // and check that they are selected
        $('#movefishselectbittercheckbox').trigger('click');
        expect($('[name=masspkmn]:checked').length).toBe(0);
        //////////////////////////////////////////////
    });
});
