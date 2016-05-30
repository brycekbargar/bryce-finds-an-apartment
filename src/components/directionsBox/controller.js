'use strict';

const Viewmodel = require('./viewmodel.js');

module.exports = function(vm) {
    this.vm = new Viewmodel(vm.google);
};
