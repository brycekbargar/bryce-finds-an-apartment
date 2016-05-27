const GoogleMapsLoader = require('google-maps');

GoogleMapsLoader.LIBRARIES = ['drawing', 'geometry', 'places'];
GoogleMapsLoader.KEY = 'GOOGLE_MAPS_LOADER_KEY';
const mapOptions = {
    center: {lat: 41.881832, lng: -87.623177},
    zoom: 12
};

module.exports = (controller) =>
    function(element, isInitialized, context){
        // grab the controller to shutup eslint
        controller.filters().map(() => {});
        if(isInitialized === false){
            GoogleMapsLoader.load((google) => context.map = new google.maps.Map(element, mapOptions));
            context.onunload = () => GoogleMapsLoader.release();
        }
    };
