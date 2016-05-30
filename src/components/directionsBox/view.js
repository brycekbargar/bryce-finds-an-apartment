'use strict';

const m = require('mithril');
const DirectionsComponent = require('./../directions/component.js');

module.exports = (ctrl) => 
    m('div.DirectionsBox.u-flexbox.u-flexbox--vertical', {
        config: ctrl.vm.getDirections
    }, [
        ctrl.vm.directions().map((d) => m(DirectionsComponent, {directions: d}))
    ]);
