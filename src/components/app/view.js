const m = require('mithril');

module.exports = (controller) =>
    m('div.App.u-flexbox', [
        m('div.App--inputs.u-flexbox.u-flexbox--vertical', [
            m(require('./../addressBar/component.js'), controller.vm),
            m(require('./../filterBox/component.js'), controller.vm)
        ]), 
        m(require('./../map/component.js'), controller.vm)
    ]);
