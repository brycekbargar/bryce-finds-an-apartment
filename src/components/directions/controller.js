'use strict';

const Viewmodel = require('./viewmodel.js');

module.exports = function(data) {
    this.vm = new Viewmodel(data.directions);
};
