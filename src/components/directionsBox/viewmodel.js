'use strict';

const m = require('mithril');
const Directions = require('./../../models/directions.js');
const Promise = require('bluebird');

module.exports = function(google) {
    let vm = this;
    vm.google = google;
    vm.directions = m.prop([]);

    vm.name = m.prop('');
    vm.address = m.prop('');
    vm.add = () => {
        vm.directions().push(new Directions({
            name: vm.name(),
            address: vm.address()
        }));
        vm.name('');
        vm.address('');
    };

    let previousLocation;
    vm.getDirections = () => {
        if(!google.maps || !google.services.autocomplete() || ! google.services.directions()) { return; }

        let place = google.services.autocomplete().getPlace();
        if(place && place.geometry && place.geometry.location !== previousLocation) {
            previousLocation = place.geometry.location;

            let routeGetter = (args, minutes) =>
                new Promise((resolve, reject) => 
                    google.services.directions().route(Object.assign(args, {
                        origin: {
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng()
                        },
                        provideRouteAlternatives: false
                    }),
                    (routeResults, status) => {
                        if(status === google.maps.DirectionsStatus.OK || 
                            status === google.maps.DirectionsStatus.NOT_FOUND) {
                            let route = routeResults.routes[0];
                            if(route && route.legs) {
                                let totalSeconds =
                                    route.legs
                                        .filter((l) => l.duration)
                                        .reduce((seconds, l) => seconds + l.duration.value, 0);
                                minutes(Math.round(totalSeconds / 60));
                            } else {
                                minutes(undefined);
                            }
                            resolve();
                        }
                        else {
                            reject(new Error(status));
                        }
                    }));

            m.startComputation();
            Promise.map(vm.directions(), (d) => {
                let destination = {destination: d.address()};
                return Promise.join(
                    routeGetter(
                        Object.assign({}, destination, {travelMode: google.maps.TravelMode.BICYCLING}),
                        d.bikingMinutes),
                    routeGetter(
                        Object.assign({}, destination, {travelMode: google.maps.TravelMode.TRANSIT}),
                        d.transitMinutes),
                    Promise.delay(1000));
            }, {
                concurrency: 1
            })
            .finally(() => m.endComputation());
        }
    };
};
