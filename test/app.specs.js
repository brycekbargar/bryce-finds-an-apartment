'use strict';

const expect = require('chai')
    .use(require('sinon-chai'))
    .expect;
const jsdomify = require('jsdomify').default;
const stub = require('sinon').stub;
const spy = require('sinon').spy;
const proxyquire = require('proxyquire').noCallThru();

describe('For the App', () => {

    describe('expect the Controller to', () => {
        it('instantiate the view model', () => {
            let viewmodelSpy = spy();
            let Controller = 
                proxyquire('../src/components/app/controller.js', {
                    './viewmodel.js': viewmodelSpy
                });
            new Controller();
            expect(viewmodelSpy).to.have.been.calledWithNew;
        });
    });

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
        beforeEach('setup stubs', () => {
            let m = this.m;
            this.filterBoxStub = stub();
            this.filterBoxStub.returns(m('div'));
            this.mapStub = stub();
            this.mapStub.returns(m('div'));
        });
        beforeEach('render view', () => {
            let view = 
                proxyquire('./../src/components/app/view.js', {
                    './../filterBox/component.js': {view: this.filterBoxStub},
                    './../map/component.js': {view: this.mapStub},
                    'mithril': this.m
                });

            this.m.mount(this.document.body, {
                view: view             
            });
        });

        it('to render the FilterBox', () => {
            expect(this.filterBoxStub).to.have.been.called;
        });
        it('to render the Map', () => {
            expect(this.mapStub).to.have.been.called;
        });
    });

});
