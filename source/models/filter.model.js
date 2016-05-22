'use strict';

//const m = require('mithril');

const filter = {};

filter.Filter = function (data){
    this.name = m.prop(data.name);
    this.enabled = m.prop(false);
};

filter.FilterList = function (){
    let _filterList = new Array();
    this.push = item => _filterList.push(item);
    this.map = lambda => _filterList.map(lambda);
};

filter.vm = (function(){
    let vm = {};
    vm.init = function(){
        vm.list = new filter.FilterList();
        vm.add = filter => vm.list.push(filter);
    };
    return vm;
})();
