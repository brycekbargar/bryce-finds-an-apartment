'use strict';

const m = require('mithril');
const GoogleMapsLoader = require('google-maps');

GoogleMapsLoader.LIBRARIES = ['drawing', 'geometry', 'places'];
GoogleMapsLoader.KEY = 'GOOGLE_MAPS_LOADER_KEY';
const mapOptions = {
    center: {lat: 41.881832, lng: -87.623177},
    zoom: 12
};

module.exports = (controller) => 
    (element, isInitialized, context) => {
        if(isInitialized){
            context.vm.redraw(context.map);
        }
        else {
            context.vm = controller.vm;
            m.startComputation();
            GoogleMapsLoader.load((google) => {
                context.map = new google.maps.Map(element, mapOptions);
                context.vm.init(
                    google.maps.Marker, 
                    new google.maps.places.PlacesService(context.map)
                ).finally(() => m.endComputation());
            });
            context.onunload = () => GoogleMapsLoader.release();
        } 
    };
