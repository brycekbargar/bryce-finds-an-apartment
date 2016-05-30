'use strict';

const m = require('mithril');
const Directions = require('./../../models/directions.js');

module.exports = function(google) {
    this.google = google;
    this.directions = m.prop([
        new Directions({
            name: 'Lessons',
            address: '2217 W Ferdinand St, Chicago, IL 60612'
        }),
        new Directions({
            name: 'Therapy',
            address: '980 N Michigan Ave, Chicago, IL 60611'
        }),
        new Directions({
            name: 'Movie Night',
            address: '651 S Wells St, Chicago, IL 60607'
        }),
        new Directions({
            name: 'SSH',
            address: '1048 W 37th St #105, Chicago, IL 60609'
        }),
        new Directions({
            name: 'CBC',
            address: '1907 N Mendell St #4C, Chicago, IL 60642'
        }),
        new Directions({
            name: 'BKB',
            address: '100 S Morgan St, Chicago, IL 60607'
        })
    ]);
};
