const m = require('mithril');

module.exports = (controller) => m('div.Map', {config: require('./map.js')(controller)});

    
