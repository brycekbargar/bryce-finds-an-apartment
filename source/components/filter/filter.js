'use strict';

const FilterBoxController = require('./filter.controller.js');
const views = require('./filter.view.js');

module.exports = {
    FilterBox: {
        controller: FilterBoxController,
        view: views.filterBoxView
    },
    Filter: {
        view: views.filterView
    }
};
