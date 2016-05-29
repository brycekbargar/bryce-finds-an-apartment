'use strict';

const m = require('mithril');
const GoogleMapsLoader = require('google-maps');

GoogleMapsLoader.LIBRARIES = ['drawing', 'places'];
GoogleMapsLoader.KEY = 'GOOGLE_MAPS_LOADER_KEY';
const mapOptions = {
    center: {lat: 41.881832, lng: -87.623177},
    zoom: 12
};

module.exports = (vm) => 
    (element, initialized, context) => {
        if(!initialized) {
            m.startComputation();
            GoogleMapsLoader.load((google) => {
                vm.maps = google.maps;
                let map = vm.maps.Map(element, mapOptions); 
                vm.services.places = new google.maps.PlacesService(map);
                vm.services.geocoder = new google.maps.Geocoder();
                m.endComputation();
            });
            context.onunload = () => GoogleMapsLoader.release();
        } 
    };
