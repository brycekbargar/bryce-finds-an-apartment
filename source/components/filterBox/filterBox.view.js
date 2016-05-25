'use strict';

const m = require('mithril');
const FilterComponent = require('./../filter/filter.js');

let flexStyle = {style: {'display': 'flex', 'flex-direction': 'column'}}; 
module.exports = (controller) => {
    return m('div', flexStyle, [
        controller.filters().map((f, i) => m(FilterComponent, [f, i]))
    ]);
};

