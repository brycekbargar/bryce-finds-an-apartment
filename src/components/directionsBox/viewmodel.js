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
        })
    ]);
};
