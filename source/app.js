'use strict';

const m = require('mithril');

let app = {
    view: () =>
        m('div#app', {style: {display: 'flex', width: '100vw', height: '100vh'}}, [
            m(require('./components/filterBox/component.js')),
            m(require('./components/map/component.js'))
        ])
};

m.mount(document.body, app);
