'use strict';

//const m = require('mithril');

filter.view = () =>
    m('html', [
        m('div', {style: {display: 'flex', 'flex-direction': 'column'}}, [
            filter.vm.list.map(
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
