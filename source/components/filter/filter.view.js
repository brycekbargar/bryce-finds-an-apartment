'use strict';

const m = require('mithril');

let filter = function(_, args){
    let filter = args[0];
    let index = args[1];

    return m('span', [
        m(`input#${'filter' + index}[type=checkbox]`, {
            onclick: m.withAttr('checked', filter.enabled), 
            checked: filter.enabled()
        }), 
        m(`label[for=${'filter' + index}]`, filter.name())
    ]);
};

let flexStyle = {style: {'display': 'flex', 'flex-direction': 'column'}}; 
let filterBox = (controller) => {
    let filterComponent = require('./filter.js').Filter;
    return m('div', flexStyle, [
        controller.filters().map((f, i) => m(filterComponent, [f, i]))
    ]);
};

module.exports = {
    filterView: filter,
    filterBoxView: filterBox
};
