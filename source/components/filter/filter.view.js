'use strict';

const m = require('mithril');
const vm = require('./filter.model.js');

module.exports = () =>
    m('html', [
        m('div', {style: {display: 'flex', 'flex-direction': 'column'}}, [
            vm.list.map(
                (f,i) => 
                    m('span', [
                        m('input[type=checkbox]', {
                            id: 'filter' + i,
                            onclick: m.withAttr('checked', f.enabled), 
                            checked: f.enabled()
                        }), 
                        m('label', {for: 'filter' + i}, f.name())
                    ]))
        ])
    ]);
