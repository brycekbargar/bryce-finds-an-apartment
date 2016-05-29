'use strict';

const Promise = require('bluebird');

const MapFilter = function(filter){
    let markers = [];
    let isShown = false;

    let show = (map) => {
        if(!isShown && markers) {
            markers.map((m) => m.setMap(map));
        }
        isShown = true;
    };

    let remove = () => {
        if(isShown && markers){
            markers.map((m) => m.setMap(null));
        }
        isShown = false;
    };

    this.redraw = (map) => {
        if(filter.enabled()){
            show(map);
        }
        else{
            remove();
        }
    };

    this.init = (Marker, places) => 
        new Promise((resolve, reject) => {
            places.radarSearch({
                location: {lat: 41.881832, lng: -87.623177},
                radius: 16000,
                type: filter.placeType(),
                name: filter.placeName()
            },
            (radarResults, status) => {
                if(status === 'OK') {
                    radarResults.map((r) => markers.push(new Marker({position: r.geometry.location})));
                    resolve();
                }
                else {
                    reject(status);
                }
            });
        });

};

module.exports = function(filters){
    let vms = filters.map((f) => new MapFilter(f));

    this.init = (Marker, places) => Promise.map(vms, (f) => f.init(Marker, places));
    this.redraw = (map) => vms.map((f) => f.redraw(map));
};
