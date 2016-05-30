'use strict';

const ls = require('local-storage');

module.exports = function(filter, google, index) {
    let vm = this;
    vm.name = filter.name;
    vm.enabled = filter.enabled;
    vm.radius = filter.radius;
    vm.id = () => `filter${index}`;

    let circles;

    vm.onenabledchange = (value) => {
        vm.enabled(value);
        if(!circles) { return; }
        circles.map((c) => c.setVisible(vm.enabled()));
    };

    vm.onradiuschange = (value) => {
        vm.radius(parseInt(value));
        if(!circles) { return; }
        circles.map((c) => c.setRadius(vm.radius()));
    };

    vm.overlay = () => {
        if(circles || !google.maps) { return; }
        circles = [];
        new Promise((resolve, reject) => {
            if(ls(filter.name())) {
                resolve(ls(vm.name()));
            }
            else {
                google.services.places().radarSearch({
                    bounds: google.bounds(),
                    type: filter.placeType(),
                    name: filter.placeName()
                },
                (radarResults, status) => {
                    if(status == google.maps.places.PlacesServiceStatus.OK) {
                        ls(filter.name(), radarResults);
                        resolve(radarResults);
                    }
                    else {
                        reject(new Error(status));
                    }
                });
            }
        })
        .then((radarResults) => 
            radarResults.map((r) => 
                circles.push(new google.maps.Circle({
                    map: google.map(),
                    center: r.geometry.location,
                    radius: filter.radius(),
                    visible: filter.enabled(),
                    fillColor: filter.color(),
                    fillOpacity: .45,
                    strokeWeight: 0
                }))));
    };
};
