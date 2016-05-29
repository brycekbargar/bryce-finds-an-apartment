const m = require('mithril');

module.exports = (_, vm) => m('div.Map', {config: require('./map.js')(vm)});

    
