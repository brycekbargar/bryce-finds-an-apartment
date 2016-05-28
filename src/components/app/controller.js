const m = require('mithril');
const Filter = require('./../../models/filter.js');

module.exports = function() {
    this.filters = m.prop([
        new Filter({name: 'First Filter'}),
        new Filter({name: 'Second Filter'})
    ]);
};
