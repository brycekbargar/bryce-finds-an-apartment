'use strict';

const m = require('mithril');
const randomColor = require('randomcolor');

module.exports = function(filter, google, index) {
    let vm = this;
    vm.name = filter.name;
    vm.enabled = m.prop(false);
    vm.radius = m.prop(800);
    vm.color = m.prop(randomColor());
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
        new Promise((resolve, reject) => 
            google.services.places().radarSearch({
                bounds: google.bounds(),
                type: filter.placeType(),
                name: filter.placeName()
            },
            (radarResults, status) => {
                if(status == google.maps.places.PlacesServiceStatus.OK) {
                    resolve(radarResults);
                }
                else {
                    reject(new Error(status));
                }
            }))
        .then((radarResults) => 
            radarResults.map((r) => 
                circles.push(new google.maps.Circle({
                    map: google.map(),
                    center: r.geometry.location,
                    radius: vm.radius(),
                    visible: vm.enabled(),
                    fillColor: vm.color(),
                    fillOpacity: .45,
                    strokeWeight: 0
                }))));
    };
};
