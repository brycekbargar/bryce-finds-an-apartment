'use strict';

const m = require('mithril');
const FilterComponent = require('./../filter/component.js');

module.exports = (_, controller) => {
    return m('div.FilterBox.u-flexbox.u-flexbox--vertical', [
        controller.filters().map((f, i) => m(FilterComponent, [f, i]))
    ]);
};

