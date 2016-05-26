'use strict';

const expect = require('chai')
    .use(require('sinon-chai'))
    .expect;
const jsdomify = require('jsdomify').default;
const stub = require('sinon').stub;
const proxyquire = require('proxyquire');

const m = require('mithril');
const Controller = require('../src/controller.js');

describe('For the App', () => {

    describe('expect the Controller to', () => {
        it('have two testing filters', () => {
            let controller = new Controller();
            expect(controller.filters()).to.be.have.length(2);
        });
    });

    describe('expect the View to', () => {
        before('create the dom', () => jsdomify.create('<html><body></body></html>'));
        after('destroy the dom', () => jsdomify.destroy());
        beforeEach('jsdom setup', () => {
            jsdomify.clear();
            this.document = jsdomify.getDocument();
            m.deps(this.document.defaultView);
        });
        beforeEach('setup stubs', () => {
            this.filterBoxStub = stub();
            this.filterBoxStub.returns(m('div'));
            this.mapStub = stub();
            this.mapStub.returns(m('div'));
        });
        beforeEach('render view', () => {
            m.mount(this.document.body, {
                view: proxyquire('../src/view.js', {
                    './components/filterBox/component.js': this.filterBoxStub,
                    './components/map/component.js': this.mapStub
                })
            });
        });
        it('to render the FilterBox', () => {
            expect(this.filterBoxStub).to.have.been.called;
        });
    });

});
