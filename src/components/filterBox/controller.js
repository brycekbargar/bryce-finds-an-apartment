'use strict';

const Viewmodel = require('./viewmodel');
const Validator = require('./../../models/filter.validator.js');

module.exports = function(vm) {
    let ctrl = this;
    ctrl.vm = new Viewmodel(vm.google);
    ctrl.validator = new Validator();

    ctrl.add = () => {
        ctrl.validator.validate(ctrl.vm);
        if(!ctrl.validator.hasErrors()) {
            ctrl.vm.add();
        }
    };
};
