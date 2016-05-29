'use strict';

const Promise = require('bluebird');

const MapFilter = function(filter){
    let circles = [];

    let redraw = () => {
        if(circles) {
            circles.map((c) => {
                c.setRadius(filter.radius());
                c.setVisible(true);
            });
        }
    };

    let remove = () => {
        if(circles){
            circles.map((c) => c.setVisible(false));
        }
    };

    this.redraw = () => {
        if(filter.enabled()){
            redraw();
        }
        else{
            remove();
        }
    };

    this.init = (Circle, places, map) => 
        new Promise((resolve, reject) => {
            places.radarSearch({
                location: {lat: 41.881832, lng: -87.623177},
                radius: 16000,
                type: filter.placeType(),
                name: filter.placeName()
            },
            (radarResults, status) => {
                if(status === 'OK') {
                    radarResults.map((r) =>
                        circles.push(new Circle({
                            center: r.geometry.location,
                            radius: filter.radius(),
                            visible: filter.enabled(),
                            fillColor: filter.color(),
                            map: map,
                            fillOpacity: .35,
                            strokeWeight: 0
                        })));
                    resolve();
                }
                else {
                    reject(new Error(status));
                }
            });
        });

};

module.exports = function(filters){
    let vms = filters.map((f) => new MapFilter(f));

    this.init = (Marker, places, map) => Promise.map(vms, (f) => f.init(Marker, places, map));
    this.redraw = () => vms.map((f) => f.redraw());
};
