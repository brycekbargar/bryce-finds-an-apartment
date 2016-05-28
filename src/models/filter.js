'use strict';

const m = require('mithril');

module.exports = function (data){
    this.name = m.prop(data.name);
    this.enabled = m.prop(false);
    this.radius = m.prop(data.radius);
    this.placeType = m.prop(data.placeType);
    this.placeName = m.prop(data.placeName);
};
