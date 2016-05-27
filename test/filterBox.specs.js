'use strict';

const expect = require('chai').expect;
const jsdomify = require('jsdomify').default;

describe('For the FilterBoxComponent', () => {
    
    describe('expect the View to', () => {
        before('create the dom', () => jsdomify.create('<html><body></body></html>'));
        after('destroy the dom', () => jsdomify.destroy());

        beforeEach('re-require mithril', () => {
            delete require.cache[require.resolve('mithril')];
            this.m = require('mithril');
        });
        beforeEach('jsdom setup', () => {
            jsdomify.clear();
            this.document = jsdomify.getDocument();
            this.m.deps(this.document.defaultView);
        });
        beforeEach('render view', () => {
            let Filter = require('../src/models/filter.js');
            let filters = [
                new Filter({name: 'First'}),
                new Filter({name: 'Second'}),
                new Filter({name: 'Third'})
            ];
            this.m.mount(this.document.body, {
                view: () => require('../src/components/filterBox/view.js')(null, {filters: () => filters})
            });
        });

        it('render many filters', () => {
            let filters = this.document.getElementsByTagName('span'); 
            expect(filters).to.have.length(3);
        });
    });

});
