'use strict';

const m = require('mithril');
const FilterComponent = require('./../filter/component.js');

module.exports = (_, vm) => 
    m('div.FilterBox.u-flexbox.u-flexbox--vertical', [
        vm.filters().map((f, i) => m(FilterComponent, [f, i]))
    ]);

