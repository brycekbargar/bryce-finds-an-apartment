const spy = require('sinon').spy;
const stub = require('sinon').stub;
const expect = require('chai')
    .use(require('sinon-chai'))
    .expect;
const proxyquire = require('proxyquire').noCallThru();

let AppViewmodel;

describe('For the AddressBar component', () => {
    beforeEach('reset mithril', () => {
        delete require.cache[require.resolve('mithril')];
        AppViewmodel = require('./../src/components/app/viewmodel.js');
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

        it('give the viewmodel access to google on the app viewmodel', () => {
            let vm = new AppViewmodel();
            new this.Controller(vm);
            expect(this.vmSpy).to.have.been.calledWithNew;
            expect(this.vmSpy).to.have.calledWithExactly(vm.google);
        });
    });

    describe('expect the Viewmodel when .autocomplete() is called', () => {
        beforeEach('setup spies', () => {
            this.appGoogle = new AppViewmodel().google;
            this.appGoogle.map(this.map);
            this.appGoogle.maps = {
                Marker: stub(),
                places: {
                    Autocomplete: stub()
                }
            };
            this.appGoogle.maps.Marker.returns(this.marker);
            this.appGoogle.maps.places.Autocomplete.returns(this.autocomplete = {
                addListener: spy()
            });
        });

        beforeEach('setup viewmodel', () => {
            let Viewmodel = require('./../src/components/addressBar/viewmodel.js');
            this.viewmodel = new Viewmodel(this.appGoogle);
        });

        it('and the maps haven\'t been loaded to do nothing', () => {
            this.appGoogle.services.autocomplete(undefined);
            this.appGoogle.maps = undefined;
            expect(this.viewmodel.autocomplete()).to.not.throw;
        });
        it('and autocomplete has already been setup to do nothing', () => {
            this.appGoogle.services.autocomplete({});
            this.viewmodel.autocomplete({});
            expect(this.appGoogle.maps.places.Autocomplete).to.not.have.been.called;
        });

        describe('and maps have been loaded but autocomplete hasnt been setup', () => {
            beforeEach('call loadMap()', () => {
                this.viewmodel.autocomplete(this.element);
            });

            it('to make a new marker', () => {
                expect(this.appGoogle.maps.Marker).to.have.been.calledWithNew;
                expect(this.appGoogle.maps.Marker).to.have.been.calledWith({
                    icon: {
                        url: 'https://maps.gstatic.com/mapfiles/circle.png'
                    },
                    map: this.map
                });
            });
            it('to create the Autocomplete service', () => {
                expect(this.appGoogle.maps.places.Autocomplete).to.have.been.calledWithNew;
                expect(this.appGoogle.maps.places.Autocomplete).to.have.been.calledWith(this.element);
            });
            it('to register the place_changed callback', () => {
                expect(this.autocomplete.addListener).to.have.been.calledWith('place_changed');
            });
        });
    });
});
