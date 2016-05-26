'use strict';

const m = require('mithril');
const FilterComponent = require('./../filter/component.js');

module.exports = (controller) => {
    return m('div', {style: {'display': 'flex', 'flex-direction': 'column', width: '200px'}}, [
        controller.filters().map((f, i) => m(FilterComponent, [f, i]))
    ]);
};

