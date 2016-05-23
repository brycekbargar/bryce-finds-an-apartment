'use strict';

const m = require('mithril');

let filter = function(_, args){
    let filter = args[0];
    let index = args[1];

    return m('span', [
        m('input[type=checkbox]', {
            id: 'filter' + index,
            onclick: m.withAttr('checked', filter.enabled), 
            checked: filter.enabled()
        }), 
        m('label', {for: 'filter' + index}, filter.name())
    ]);
};

let flexStyle = {style: {'display': 'flex', 'flex-direction': 'column'}}; 
let filterBox = (controller) =>
    m('div', flexStyle, [
        controller.filters().map(() => m(require('./filter.js').Filter, arguments))
    ]);

module.exports = {
    filterView: filter,
    filterBoxView: filterBox
};
