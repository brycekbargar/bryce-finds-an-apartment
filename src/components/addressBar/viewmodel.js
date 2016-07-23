'use strict';

const m = require('mithril');

module.exports = function(google){

    this.autocomplete = (element) => {
        if(google.services.autocomplete() || !google.maps) { return; }
        let marker = new google.maps.Marker({
            icon: {
                url: 'https://maps.gstatic.com/mapfiles/circle.png'
            },
            map: google.map()
        });
        let autocomplete = new google.maps.places.Autocomplete(element, {
            bounds: google.bounds()
        });
        google.services.autocomplete(autocomplete);
        autocomplete.addListener('place_changed', () => {
            if(mixpanel) { mixpanel.track('place_changed'); }

            var place = autocomplete.getPlace();
            if(place.geometry) {
                marker.setPosition(place.geometry.location);
                m.redraw();
            }
        });
    };
};
