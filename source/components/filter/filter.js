'use strict';

const filterBoxController = require('./filter.controller.js');
const views = require('./filter.views.js');

module.exports = {
    FilterBox: {
        controller: filterBoxController,
        view: views.filterBoxView
    },
    Filter: {
        view: views.filterView
    }
};
