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
            context.vm.redraw();
        }
        else {
            context.vm = controller.vm;
            m.startComputation();
            GoogleMapsLoader.load((google) => {
                let map = new google.maps.Map(element, mapOptions);
                context.vm
                    .init(
                        new google.maps.places.PlacesService(map),
                        (cOpts) => new google.maps.Circle(Object.assign(cOpts, {map: map})))
                    .finally(() => m.endComputation());
            });
            context.onunload = () => GoogleMapsLoader.release();
        } 
    };
