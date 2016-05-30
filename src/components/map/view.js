'use strict';

const m = require('mithril');

module.exports = (ctrl) => m('div.Map', {config: ctrl.vm.loadMap});
