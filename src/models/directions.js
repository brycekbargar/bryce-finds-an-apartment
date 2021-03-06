'use strict';

const m = require('mithril');

module.exports = function(data) {
    this.name = m.prop(data.name);
    this.address = m.prop(data.address);
    this.bikingMinutes = m.prop();
    this.transitMinutes = m.prop();
};
