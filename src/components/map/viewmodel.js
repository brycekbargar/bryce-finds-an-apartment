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

    this.init = (places, newCircle) => 
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
                        circles.push(newCircle({
                            center: r.geometry.location,
                            radius: filter.radius(),
                            visible: filter.enabled(),
                            fillColor: filter.color(),
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

    this.init = (places, newCircle) => Promise.map(vms, (f) => f.init(places, newCircle), {concurrency: 5});
    this.redraw = () => vms.map((f) => f.redraw());
};
