const m = require('mithril');

module.exports =  (controller) =>
    m('div.App.u-flexbox', [
        m(require('./components/filterBox/component.js'), controller),
        m(require('./components/map/component.js'), controller)
    ]);
