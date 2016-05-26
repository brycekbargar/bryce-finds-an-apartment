const m = require('mithril');
const GoogleMapsLoader = require('google-maps');

GoogleMapsLoader.LIBRARIES = ['drawing', 'geometry', 'places'];
const mapOptions = {
    center: {lat: 41.881832, lng: -87.623177},
    zoom: 12
};

let map = function(element, isInitialized, context){
    if(isInitialized === false){
        GoogleMapsLoader.load((google) => context.map = new google.maps.Map(element, mapOptions));
        context.onunload = () => GoogleMapsLoader.release();
    }
};

module.exports = () => m('div.Map', {config: map});
    
