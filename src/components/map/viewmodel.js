'use strict';

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
        places.radarSearch({
            location: {lat: 41.881832, lng: -87.623177},
            radius: filter.radius(),
            type: filter.placeType(),
            name: filter.placeName()
        },
        (radarResults) => 
            radarResults.map(
                (r) => markers.push(new Marker({position: r.geometry.location}))));

};

module.exports = function(filters){
    let vms = filters.map((f) => new MapFilter(f));

    this.init = (Marker, places) => vms.map((f) => f.init(Marker, places));
    this.redraw = (map) => vms.map((f) => f.redraw(map));
};
