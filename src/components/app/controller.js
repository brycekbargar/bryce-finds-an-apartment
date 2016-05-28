const m = require('mithril');
const Filter = require('./../../models/filter.js');

module.exports = function() {
    this.filters = m.prop([
        new Filter({
            name: 'Red Line Stations',
            radius: 16000,
            placeType: 'transit_station',
            placeName: 'red'
        }),
        new Filter({
            name: 'Pink Line Stations',
            radius: 16000,
            placeType: 'transit_station',
            placeName: 'pink'
        }),
        new Filter({
            name: 'Blue Line Stations',
            radius: 16000,
            placeType: 'transit_station',
            placeName: 'blue'
        }),
        new Filter({
            name: 'Green Line Stations',
            radius: 16000,
            placeType: 'transit_station',
            placeName: 'green'
        }),
        new Filter({
            name: 'Brown Line Stations',
            radius: 16000,
            placeType: 'transit_station',
            placeName: 'brown'
        }),
        new Filter({
            name: 'Orange Line Stations',
            radius: 16000,
            placeType: 'transit_station',
            placeName: 'orange'
        })
    ]);
};
