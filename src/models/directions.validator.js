'use strict';

const m = require('mithril');
require('mithril-validator')(m);

module.exports = Function.bind.call(m.validator, null, {
    name: (name) => {
        if(!name) { return 'Name is required.'; }
    },
    address: (address) => {
        if(!address) { return 'Address is required.'; }
    }
});
