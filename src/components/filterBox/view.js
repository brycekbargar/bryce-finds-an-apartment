'use strict';

const m = require('mithril');
const FilterComponent = require('./../filter/component.js');
const placeTypes = require('google-place-types');
const humanize = require('humanize-string');

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
                class: ctrl.validator.hasError('name') ? 'u-background--red' : '',
                onchange: m.withAttr('value', ctrl.vm.name),
                value: ctrl.vm.name()
            })
        ]),
        m('span.FilterBox--type', [
            m('label[for=Type]', 'Type:'),
            m('select#Type', {
                class: ctrl.validator.hasError('placeType') ? 'u-background--red' : '',
                onchange: m.withAttr('value', ctrl.vm.placeType),
                value: ctrl.vm.placeType()
            }, [
                placeTypes.map(p => m(`option[value=${p}]`, humanize(p)))
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
            onclick: ctrl.add
        }, 'Add')
    ]);

