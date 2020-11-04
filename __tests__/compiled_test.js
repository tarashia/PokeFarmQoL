const jQuery = require('jquery').jQuery;
const fs = require('fs')
const path = require('path')
const htmlpath = path.join(__dirname, './data/', 'party.html');
const html = fs.readFileSync(htmlpath, 'utf8', 'r');
jQuery('html', document).html(html);

require('./compiled')