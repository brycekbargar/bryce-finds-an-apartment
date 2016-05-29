'use strict';

const Promise = require('bluebird');
const ls = require('local-storage');

const MapFilter = function(filter){
    let circles = [];

    this.redraw = () => {
        if(!circles) { return; }
        if(filter.enabled()){
            circles.map((c) => {
                c.setRadius(parseInt(filter.radius()));
                c.setVisible(true);
            });
        }
        else{
            circles.map((c) => c.setVisible(false));
        }
    };

    this.init = (places, newCircle) => 
        new Promise((resolve, reject) => {
            if(ls(filter.name())) {
                resolve(ls(filter.name()));
                return;
            }
            places.radarSearch({
                location: {lat: 41.881832, lng: -87.623177},
                radius: 16000,
                type: filter.placeType(),
                name: filter.placeName()
            },
            (radarResults, status) => {
                if(status === 'OK') {
                    ls(filter.name(), radarResults);
                    resolve(radarResults);
                    return;
                }
                else {
                    reject(new Error(status));
                }
            });
        })
        .then((radarResults) => 
            radarResults.map((r) =>
                circles.push(newCircle({
                    center: r.geometry.location,
                    radius: filter.radius(),
                    visible: filter.enabled(),
                    fillColor: filter.color(),
                    fillOpacity: .35,
                    strokeWeight: 0
                }))));
};

const MapAddress = function(address) {
    let marker = null;
    let geocoder = null; 

    this.init = (g, newMarker) => {
        geocoder = g;
        marker = newMarker({
            icon: {
                url: 'http://maps.gstatic.com/mapfiles/circle.png'
            }
        });
    };
    
    this.redraw = () => {
        if(!marker || !geocoder || address().value() === '') { return; }
        geocoder.geocode({
            address: `${address().value()}, Chicago IL`
        }, (geocoderResults, status) => {
            if(status === 'OK') {
                if(geocoderResults[0]){
                    marker.setPosition(geocoderResults[0].geometry.location);
                }
            }
            else {
                throw new Error(status);
            }
        });
    };
};


module.exports = function(address, filters){
    let vm = {
        filters: filters().map((f) => new MapFilter(f)),
        address: new MapAddress(address)
    };

    this.init = (places, geocoder, newCircle, newMarker) => {
        vm.address.init(geocoder, newMarker);
        return Promise.map(vm.filters, (f) => f.init(places, newCircle), {concurrency: 5});
    };

    this.redraw = () => {
        vm.filters.map((f) => f.redraw());
        return vm.address.redraw();
    };
};
