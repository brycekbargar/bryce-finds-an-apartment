'use strict';

const Viewmodel = require('./viewmodel.js');
const Validator = require('./../../models/directions.validator.js');

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
