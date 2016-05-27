'use strict';

const expect = require('chai').expect;
const jsdomify = require('jsdomify').default;

describe('For the FilterComponent', () => {

    describe('expect the View to', () => {
        before('create the dom', () => jsdomify.create('<html><body></body></html>'));
        after('destroy the dom', () => jsdomify.destroy());

        beforeEach('re-require mithril', () => {
            delete require.cache[require.resolve('mithril')];
            this.m = require('mithril');
        });
        beforeEach('setup filter', () => {
            let Filter = require('../src/models/filter.js');
            this.filter = new Filter({name: 'Test Filter'});
        });
        beforeEach('jsdom setup', () => {
            jsdomify.clear();
            this.document = jsdomify.getDocument();
            this.m.deps(this.document.defaultView);
        });
        beforeEach('render view', () => {
            this.m.mount(this.document.body, {
                view: () => require('../src/components/filter/view.js')(null, [this.filter, 1])
            });
        });

        it('have an id', () => {
            let element = this.document.getElementById('filter1');
            expect(element).to.not.be.null;
        });
        it('have a label', () => {
            let element = this.document.getElementsByTagName('label')[0];
            expect(element.textContent).to.equal('Test Filter');
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
            this.m.redraw(true);
            let element = this.document.getElementById('filter1');
            expect(element.checked).to.be.true;
        });
    });

});
