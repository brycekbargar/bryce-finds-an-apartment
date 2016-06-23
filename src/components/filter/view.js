'use strict';

const m = require('mithril');

module.exports = function(ctrl){
    let vm = ctrl.vm;

    return m('span.Filter.u-flexbox.u-flexbox--vertical', {
        config: vm.overlay
    },[
        m('span.Filter--enabled', [
            m(`input#${vm.id()}[type=checkbox]`, {
                onclick: m.withAttr('checked', vm.onenabledchange), 
                checked: vm.enabled()
            }), 
            m(`label[for=${vm.id()}]`, {
                style: { 'background-color': vm.color() }
            }, vm.name())
        ]),
        m('span.Filter--radius', [
            m('input[type=range]', {
                min: 0,
                max: 2 * 1600, // About 2 miles
                step: 100,
                onchange: m.withAttr('value', vm.onradiuschange),
                value: vm.radius()
            }),
            m('label', vm.radius())
        ])
    ]);
};
