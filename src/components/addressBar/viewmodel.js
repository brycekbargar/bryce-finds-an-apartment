'use strict';

const m = require('mithril');

module.exports = function(google){
    let vm = this;

    vm.address = m.prop('');

    let marker;
    vm.onchange = (value) => {
        vm.address(value);
        if(vm.address !== '' && google.services.geocoder() && google.map()) {
            marker = marker || new google.maps.Marker({
                icon: {
                    url: 'http://maps.gstatic.com/mapfiles/circle.png'
                },
                map: google.map()
            });
            google.services.geocoder().geocode({
                address: vm.address(),
                bounds: google.bounds()
            }, (geocoderResults, status) => {
                if(status === google.maps.GeocoderStatus.OK && geocoderResults[0]){
                    marker.setPosition(geocoderResults[0].geometry.location);
                }
            });
        }
    };
};
