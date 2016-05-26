const m = require('mithril');

let map = function(){
};

module.exports = () => m('div#mapContainer', [m('div#map', { config: map })]);
    
