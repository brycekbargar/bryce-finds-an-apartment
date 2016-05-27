const m = require('mithril');

module.exports = (_, controller) => m('div.Map', {config: require('./map.js')(controller)});

    
