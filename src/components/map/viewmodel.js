'use strict';

const m = require('mithril');
const GoogleMapsLoader = require('google-maps');

GoogleMapsLoader.LIBRARIES = ['drawing', 'places'];
GoogleMapsLoader.KEY = 'GOOGLE_MAPS_LOADER_KEY';

module.exports = function(g) { 
    this.loadMap = (element, initialized, context) => {
        if(!initialized) {
            m.startComputation();
            GoogleMapsLoader.load((google) => {
                // initialize :all_the_things:!
                let map = new google.maps.Map(element, {
                    center: g.center(),
                    zoom: g.zoom()
                }); 
                g.map(map);
                g.maps = google.maps;
                g.services.places(new google.maps.places.PlacesService(map));
                g.services.geocoder(new google.maps.Geocoder());
                m.endComputation();
            });
            context.onunload = () => GoogleMapsLoader.release();
        } 
    };
};
