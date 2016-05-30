'use strict';

const Viewmodel = require('./viewmodel');

module.exports = function(vm) {
    this.vm = new Viewmodel(vm.google);
};
