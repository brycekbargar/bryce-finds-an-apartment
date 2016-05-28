const m = require('mithril');

module.exports =  (controller) =>
    m('div.App.u-flexbox', [
        m(require('./../filterBox/component.js'), controller),
        m(require('./../map/component.js'), controller)
    ]);
