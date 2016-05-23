'use strict';

const m = require('mithril');

module.exports = function (data){
    this.name = m.prop(data.name);
    this.enabled = m.prop(false);
};
