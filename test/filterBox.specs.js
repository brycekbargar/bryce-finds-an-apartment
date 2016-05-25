'use strict';

const expect = require('chai').expect;
const jsdomify = require('jsdomify').default;

const m = require('mithril');
const Filter = require('../source/models/filter.js');
const FilterBoxController = require('../source/components/filterBox/controller.js');
const FilterBoxView = require('../source/components/filterBox/view.js');

describe('For the controller', () => {
    it('expect it to have two testing filters', () => {
        let controller = new FilterBoxController();
        expect(controller.filters()).to.be.have.length(2);
    });
});

describe('For the FilterBoxView expect it to', () => {
    before('create the dom', () => jsdomify.create('<html><body></body></html>'));
    after('destroy the dom', () => jsdomify.destroy());
    beforeEach('jsdom setup', () => {
        jsdomify.clear();
        this.document = jsdomify.getDocument();
        m.deps(this.document.defaultView);
    });
    beforeEach('setup filter', () => this.filter = new Filter({name: 'Test Filter'}));
    beforeEach('render view', () => {
        let filters = [
            new Filter({name: 'First'}),
            new Filter({name: 'Second'}),
            new Filter({name: 'Third'})
        ];
        m.mount(this.document.body, {
            controller: function(){ return {filters: () => filters}; },
            view: FilterBoxView 
        });
    });

    it('render many filters', () => {
        let filters = this.document.getElementsByTagName('span'); 
        expect(filters).to.have.length(3);
    });
});