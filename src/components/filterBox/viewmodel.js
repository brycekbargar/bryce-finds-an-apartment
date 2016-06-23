'use strict';

const m = require('mithril');
const Filter = require('./../../models/filter.js');

module.exports = function(google) {
    let vm = this;
    vm.google = google;
    vm.filters =  m.prop([]);

    vm.name = m.prop('');
    vm.placeType = m.prop('');
    vm.keyword = m.prop('');

    vm.add = () => {
        vm.filters().push(new Filter({
            name: vm.name(),
            placeType: vm.placeType(),
            placeName: vm.keyword()
        }));
        vm.name('');
        vm.keyword('');
    };
};
