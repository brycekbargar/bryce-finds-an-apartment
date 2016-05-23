'use strict';

const Filter = require('./../../models/filter.js');

module.exports = (function(){
    let vm = {};
    vm.init = function(){
        vm.list = new Array();
        vm.add = data => vm.list.push(new Filter(data));
    };
    return vm;
})();
