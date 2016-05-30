'use strict';

module.exports = function(directions, google) {
    let vm = this;

    vm.directions = directions;
    
    vm.walkingVisible = () => vm.directions.walkingMinutes() < 30;

    vm.getDirections = () => {
        if(!google.maps) { return; }
    };
};
