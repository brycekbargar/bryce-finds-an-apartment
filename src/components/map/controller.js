'use strict';

const Viewmodel = require('./viewmodel.js');

module.exports = function(controller){
    this.vm = new Viewmodel(controller.filters());
};
