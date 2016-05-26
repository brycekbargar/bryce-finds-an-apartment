'use strict';

const m = require('mithril');

let app = {
    view: () =>
        m('div#app.u-flexbox', [
            m(require('./components/filterBox/component.js')),
            m(require('./components/map/component.js'))
        ])
};

m.mount(document.body, app);
