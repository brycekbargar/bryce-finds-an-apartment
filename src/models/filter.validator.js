'use strict';

const m = require('mithril');
require('mithril-validator')(m);

module.exports = Function.bind.call(m.validator, null, {
    name: (name) => {
        if(!name) { return 'Name is required.'; }
    },
    placeType: (placeType) => {
        if(!placeType) { return 'Type is required.'; }
    }
});
