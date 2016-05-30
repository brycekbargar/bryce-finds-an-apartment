'use strict';

const m = require('mithril');
const Promise = require('bluebird');

module.exports = function(directions, google) {
    let vm = this;

    vm.directions = directions;
    
    vm.walkingVisible = () => vm.directions.walkingMinutes() < 30;

    let previousLocation;
    vm.getDirections = () => {
        if(!google.maps || !google.services.autocomplete() || ! google.services.directions()) { return; }

        let place = google.services.autocomplete().getPlace();
        if(place && place.geometry && place.geometry.location !== previousLocation) {
            previousLocation = place.geometry.location;

            let routeGetter = (args, minutes) => 
                new Promise((resolve, reject) => 
                    google.services.directions().route(Object.assign(args, {
                        destination: vm.directions.address(),
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
                                minutes(totalSeconds / 60);
                            } else {
                                minutes(0);
                            }
                            resolve();
                        }
                        else {
                            reject(new Error(status));
                        }
                    }));

            let origin = {origin: place.geometry.location};
            m.startComputation();
            Promise.all([
                routeGetter(
                    Object.assign(origin, {travelMode: google.maps.TravelMode.WALKING}), 
                    vm.directions.walkingMinutes
                ),
                routeGetter(
                    Object.assign(origin, {travelMode: google.maps.TravelMode.BICYCLING}), 
                    vm.directions.bikingMinutes
                ),
                routeGetter(
                    Object.assign(origin, {travelMode: google.maps.TravelMode.TRANSIT}), 
                    vm.directions.transitMinutes
                )
            ])
            .finally(() => m.endComputation());
        }
    };
};
