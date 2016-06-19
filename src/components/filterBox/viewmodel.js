'use strict';

const randomColor = require('randomcolor');
const m = require('mithril');
const Filter = require('./../../models/filter.js');

module.exports = function(google) {
    let vm = this;
    vm.google = google;
    vm.filters =  m.prop([]);

    vm.name = m.prop('');
    vm.type = m.prop('');
    vm.keyword = m.prop('');

    vm.add = () => {
        vm.filters().push(new Filter({
            name: vm.name(),
            radius: 800,
            placeType: vm.type(),
            placeName: vm.keyword(),
            color: randomColor()
        }));
        vm.name('');
        vm.keyword('');
    };
};
