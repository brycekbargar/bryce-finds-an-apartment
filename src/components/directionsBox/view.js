'use strict';

const m = require('mithril');
const DirectionsComponent = require('./../directions/component.js');

module.exports = (ctrl) => 
    m('div.DirectionsBox.u-flexbox.u-flexbox--vertical.u-box', {
        config: ctrl.vm.getDirections
    }, [
        ctrl.vm.directions().map((d) => m(DirectionsComponent, {directions: d})),
        m('span.u-flexbox.u-flexbox--vertical', [
            m('span.DirectionsBox--name', [
                m('label[for=DirectionsName]', 'Name:'),
                m('input#DirectionsName[type=text]', {
                    class: ctrl.validator.hasError('name') ? 'u-background--red' : '',
                    onchange: m.withAttr('value', ctrl.vm.name),
                    value: ctrl.vm.name()
                })
            ]),
            m('span.DirectionsBox--address', [
                m('label[for=Address]', 'Address:' ),
                m('input#Address[type=text]', {
                    class: ctrl.validator.hasError('address') ? 'u-background--red' : '',
                    onchange: m.withAttr('value', ctrl.vm.address),
                    value: ctrl.vm.address()
                })
            ]),
            m('button[type=button]', {
                onclick: ctrl.add
            }, 'Add')
        ])
    ]);
