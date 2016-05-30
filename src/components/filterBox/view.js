'use strict';

const m = require('mithril');
const FilterComponent = require('./../filter/component.js');

module.exports = (ctrl) => 
    m('div.FilterBox.u-flexbox.u-flexbox--vertical.u-box', [
        ctrl.vm.filters().map((f, index) => 
            m(FilterComponent, {
                filter: f,
                google: ctrl.vm.google
            }, index))
    ]);

