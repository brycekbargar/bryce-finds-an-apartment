'use strict';

const expect = require('chai').expect;
const jsdomify = require('jsdomify').default;

const m = require('mithril');
const Filter = require('../source/models/filter.js');
const Controller = require('../source/components/filter/filter.controller.js');
const views = require('../source/components/filter/filter.view.js');

describe('For the controller', () => {
    it('expect it to have two testing filters', () => {
        let controller = new Controller();

        expect(controller.filters()).to.be.have.length(2);
    });
});

describe('For the views', () => {
    before('create the dom', () => jsdomify.create('<html><body></body></html>'));
    after('destroy the dom', () => jsdomify.destroy());
    beforeEach('jsdom setup', () => {
        jsdomify.clear();
        this.document = jsdomify.getDocument();
        m.deps(this.document.defaultView);
    });

    describe('expect FilterView to', () => {
        beforeEach('setup filter', () => this.filter = new Filter({name: 'Test Filter'}));
        beforeEach('render view', () => {
            m.mount(
                this.document.body, 
                {
                    view: () => views.filterView(null, [this.filter, 1])
                });
        });
        it('have an id', () => {
            let element = this.document.getElementById('filter1');
            expect(element).to.not.be.null;
        });
        it('be disabled by default', () => {
            let element = this.document.getElementById('filter1');
            expect(element.checked).to.be.false;
        });
        it('have checks update the model', () => {
            let element = this.document.getElementById('filter1');
            let label = this.document.getElementsByTagName('label')[0];
            element.checked = true;
            label.click();
            expect(this.filter.enabled()).to.be.true;
        });
        it('be bound to the model', () => {
            this.filter.enabled(true);
            m.redraw(true);
            let element = this.document.getElementById('filter1');
            expect(element.checked).to.be.true;
        });
    });
});
