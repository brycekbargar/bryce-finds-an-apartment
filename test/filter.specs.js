'use strict';

const expect = require('chai').expect;

const Controller = require('../source/components/filter/filter.controller.js');

describe('For the controller', () => {
    it('expect it to have two testing filters', () => {
        let controller = new Controller();

        expect(controller.filters()).to.be.have.length(2);
    });
});
