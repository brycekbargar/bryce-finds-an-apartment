'use strict';

const expect = require('chai').expect;
const jsdomify = require('jsdomify').default;

const Controller = require('../source/components/filter/filter.controller.js');

describe('For the controller', () => {
    it('expect it to have two testing filters', () => {
        let controller = new Controller();

        expect(controller.filters()).to.be.have.length(2);
    });
});

describe('For the views', () => {
    before('create the dom', () => jsdomify.create());
    beforeEach('clear the dom', () => jsdomify.clear());
    after('destroy the dom', () => jsdomify.destroy());

    describe('expect FilterView', () => {
        it('should be ok', () => expect(true).to.be.ok );
    });
});
