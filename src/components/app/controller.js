'use strict';

const m = require('mithril');
const Viewmodel = require('./viewmodel.js');

module.exports = function() {
    this.filters = m.prop(new Viewmodel().filters);
};
