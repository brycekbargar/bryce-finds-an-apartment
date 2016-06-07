const spy = require('sinon').spy;
const expect = require('chai')
    .use(require('sinon-chai'))
    .expect;
const proxyquire = require('proxyquire').noCallThru();


describe('For the Map component', () => {
    beforeEach('reset mithril', () => {
        delete require.cache[require.resolve('mithril')];
        this.m = require('mithril');
    });

    describe('expect the Controller to', () => {
        beforeEach('setup spies', () => {
            this.vmSpy = spy();
        });
        beforeEach('setup Controller', () => {
            this.Controller = proxyquire('../src/components/map/controller.js', {
                './viewmodel.js': this.vmSpy
            });
        });

        it('should give the viewmodel access to google', () => {
            let google = {};
            new this.Controller({google: google});
            expect(this.vmSpy).to.have.been.calledWithNew;
            expect(this.vmSpy).to.have.calledWithExactly(google);
        });
    });
});
