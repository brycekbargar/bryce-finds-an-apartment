'use strict';

const Viewmodel = require('./viewmodel.js');

module.exports = function(data, index){
    this.vm = new Viewmodel(data.filter, data.google, index);
};
