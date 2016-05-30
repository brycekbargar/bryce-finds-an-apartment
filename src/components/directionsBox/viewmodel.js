'use strict';

const m = require('mithril');
const Directions = require('./../../models/directions.js');
const Promise = require('bluebird');

module.exports = function(google) {
    let vm = this;
    vm.google = google;
    vm.directions = m.prop();

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
                        if(status === google.maps.DirectionsStatus.OK) {
                            let route = routeResults.routes[0];
                            if(route && route.legs) {
                                let totalSeconds =
                                    route.legs
                                        .filter((l) => l.duration)
                                        .reduce((seconds, l) => seconds + l.duration.value, 0);
                                minutes(Math.round(totalSeconds / 60));
                            } else {
                                minutes(0);
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

    vm.directions([
        new Directions({
            name: 'Lessons',
            address: '2217 W Ferdinand St, Chicago, IL 60612'
        }),
        new Directions({
            name: 'Therapy',
            address: '980 N Michigan Ave, Chicago, IL 60611'
        }),
        new Directions({
            name: 'Movie Night',
            address: '651 S Wells St, Chicago, IL 60607'
        }),
        new Directions({
            name: 'SSH',
            address: '1048 W 37th St #105, Chicago, IL 60609'
        }),
        new Directions({
            name: 'CBC',
            address: '1907 N Mendell St #4C, Chicago, IL 60642'
        }),
        new Directions({
            name: 'BKB',
            address: '100 S Morgan St, Chicago, IL 60607'
        })
    ]);
};
