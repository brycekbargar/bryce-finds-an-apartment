'use strict'; 

const Filter = require('./../../models/filter.js');

const groceryColor = '#a431fc';

module.exports = function(){
    this.filters =  [
        new Filter({
            name: 'Red Line Stations',
            radius: 800,
            placeType: 'transit_station',
            placeName: 'red',
            color: '#c60c30'
        }),
        new Filter({
            name: 'Pink Line Stations',
            radius: 800,
            placeType: 'transit_station',
            placeName: 'pink',
            color: '#e27ea6'
        }),
        new Filter({
            name: 'Blue Line Stations',
            radius: 800,
            placeType: 'transit_station',
            placeName: 'blue',
            color: '#00a1de'
        }),
        new Filter({
            name: 'Green Line Stations',
            radius: 800,
            placeType: 'transit_station',
            placeName: 'green',
            color: '#009b3a'
        }),
        new Filter({
            name: 'Brown Line Stations',
            radius: 800,
            placeType: 'transit_station',
            placeName: 'brown',
            color: '#62361b'
        }),
        new Filter({
            name: 'Orange Line Stations',
            radius: 800,
            placeType: 'transit_station',
            placeName: 'orange',
            color: '#f9461c'
        }),
        new Filter({
            name: 'Mariano\'s',
            radius: 800,
            placeType: 'grocery_or_supermarket',
            placeName: 'mariano',
            color: groceryColor
        }),
        new Filter({
            name: 'Pete\'s',
            radius: 800,
            placeType: 'grocery_or_supermarket',
            placeName: 'pete',
            color: groceryColor
        }),
        new Filter({
            name: 'Jewel',
            radius: 800,
            placeType: 'grocery_or_supermarket',
            placeName: 'jewel',
            color: groceryColor
        }),
        new Filter({
            name: 'Whole Foods',
            radius: 800,
            placeType: 'grocery_or_supermarket',
            placeName: 'whole foods',
            color: groceryColor
        }),
        new Filter({
            name: 'Trader Joe\'s',
            radius: 800,
            placeType: 'grocery_or_supermarket',
            placeName: 'trader joe',
            color: groceryColor
        })
    ];
};
