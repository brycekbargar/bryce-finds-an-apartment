'use strict';

const expect = require('chai').expect;
const jsdomify = require('jsdomify').default;

const m = require('mithril');
const Filter = require('../src/models/filter.js');
const View = require('../src/components/filterBox/view.js');

describe('For the FilterBoxComponent', () => {
    
    describe('expect the View to', () => {
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
                view: () => View(null, {filters: () => filters})
            });
        });
        it('render many filters', () => {
            let filters = this.document.getElementsByTagName('span'); 
            expect(filters).to.have.length(3);
        });
    });

});
