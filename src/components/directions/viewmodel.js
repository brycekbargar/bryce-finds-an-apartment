'use strict';

module.exports = function(directions) {
    let vm = this;
    vm.directions = directions;
    vm.bikingVisible = () => vm.directions.bikingMinutes() < 45;
    vm.transitVisible = () => vm.directions.transitMinutes() > 0;
};

