'use strict';

const m = require('mithril');
const Filter = require('./../../models/filter.js');

module.exports = function() {
    this.filters = m.prop([
        new Filter('First Filter'),
        new Filter('Second Filter')
    ]);
};
