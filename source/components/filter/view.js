'use strict';

const m = require('mithril');

module.exports = function(_, args){
    let filter = args[0];
    let index = args[1];

    return m('span.Filter', [
        m(`input#${'filter' + index}[type=checkbox]`, {
            onclick: m.withAttr('checked', filter.enabled), 
            checked: filter.enabled()
        }), 
        m(`label[for=${'filter' + index}]`, filter.name())
    ]);
};
