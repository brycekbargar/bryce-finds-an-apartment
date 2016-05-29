'use strict';

const m = require('mithril');

module.exports = function(_, args){
    let filter = args[0];
    let index = args[1];

    return m('span.Filter.u-flexbox.u-flexbox--vertical', [
        m('span.Filter--enabled', [
            m(`input#${'filter' + index}[type=checkbox]`, {
                onclick: m.withAttr('checked', filter.enabled), 
                checked: filter.enabled()
            }), 
            m(`label[for=${'filter' + index}]`, filter.name())
        ]),
        m('span.Filter--radius', [
            m('input[type=range]', {
                min: 0,
                max: 5 * 1600,
                step: 100,
                onchange: m.withAttr('value', filter.radius),
                value: filter.radius()
            }),
            m('label', filter.radius())
        ])
    ]);
};
