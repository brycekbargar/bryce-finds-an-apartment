'use strict'; 

const m = require('mithril');

module.exports = function(){
    this.google = {
        center: m.prop({
            lat: 41.881832,
            lng: -87.623177
        }),
        zoom: m.prop(12),
        bounds: m.prop({
            north: 41.985584,
            east: -87.354896,
            south: 41.782557, 
            west: -87.836900
        }),
        map: m.prop(),
        maps: null,
        services: {
            places: m.prop(),
            geocoder: m.prop(),
            autocomplete: m.prop()
        }
    };
};
