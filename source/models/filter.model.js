'use strict';

const m = require('mithril');

let Filter = function (data){
    this.name = m.prop(data.name);
    this.enabled = m.prop(false);
};

module.exports = (function(){
    let vm = {};
    vm.init = function(){
        vm.list = new Array();
        vm.add = data => vm.list.push(new Filter(data));
    };
    return vm;
})();
