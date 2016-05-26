const m = require('mithril');
const GoogleMapsLoader = require('google-maps');

GoogleMapsLoader.CLIENT = process.env.GOOGLE_MAPS_CLIENT_KEY;
GoogleMapsLoader.LIBRARIES = ['drawing', 'geometry', 'places'];
const mapOptions = {
};

let map = function(element, isInit, context){
    if(isInit){
        GoogleMapsLoader.load(
            (google) => 
                context.map = new google.maps.Map(element, mapOptions));
        context.onunload(() => GoogleMapsLoader.release());
    }
};

module.exports = () => m('div#mapContainer', [m('div#map', { config: map })]);
    
