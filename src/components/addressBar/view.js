'use strict';

const m = require('mithril'); 

module.exports = (_, vm) =>
    m('div.AddressBar.u-flexbox', [
        m('input[type=text]', {
            onchange: m.withAttr('value', vm.address().value),
            value: vm.address().value()
        })
    ]);
