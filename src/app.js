'use strict';

const m = require('mithril');
const Filter = require('./models/filter.js');

let app = {
    controller: function() {
        this.filters = m.prop([
            new Filter({name: 'First Filter'}),
            new Filter({name: 'Second Filter'})
        ]);
    },
    view: (controller) =>
        m('div#app.u-flexbox', [
            m(require('./components/filterBox/component.js'), controller),
            m(require('./components/map/component.js'), controller)
        ])
};

m.mount(document.body, app);
