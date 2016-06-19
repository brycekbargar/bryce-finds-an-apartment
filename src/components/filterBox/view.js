'use strict';

const m = require('mithril');
const FilterComponent = require('./../filter/component.js');

module.exports = (ctrl) => 
    m('div.FilterBox.u-flexbox.u-flexbox--vertical.u-box', [
        ctrl.vm.filters().map((f, index) => 
            m(FilterComponent, {
                filter: f,
                google: ctrl.vm.google
            }, index)),
        m('span.FilterBox--name', [
            m('label[for=FilterName]', 'Name:'),
            m('input#FilterName[type=text]', {
                onchange: m.withAttr('value', ctrl.vm.name),
                value: ctrl.vm.name()
            })
        ]),
        m('span.FilterBox--type', [
            m('label[for=Type]', 'Type:'),
            m('select#Type', {
                onchange: m.withAttr('value', ctrl.vm.type),
                value: ctrl.vm.type()
            }, [
                m('option[value=bar]', 'Drink'),
                m('option[value=restaurant]', 'Food')
            ])
        ]),
        m('span.FilterBox--keyword', [
            m('label[for=Keyword]', 'Keyword:'),
            m('input#Keyword[type=text]', {
                onchange: m.withAttr('value', ctrl.vm.keyword),
                value: ctrl.vm.keyword()
            })
        ]),
        m('button[type=button]', {
            onclick: ctrl.vm.add
        }, 'Add')
    ]);

