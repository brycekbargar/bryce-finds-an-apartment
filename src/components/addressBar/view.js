'use strict';

const m = require('mithril'); 

module.exports = (ctrl) => {
    let vm = ctrl.vm;
    return m('div.AddressBar.u-flexbox', [
        m('input[type=text].AddressBar--input', {
            config: vm.autocomplete
        })
    ]);
};
