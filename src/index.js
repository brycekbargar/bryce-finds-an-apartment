'use strict';

const app = require('./components/app/component.js');

mixpanel.track('app_loaded');
require('mithril').mount(document.body, app);
