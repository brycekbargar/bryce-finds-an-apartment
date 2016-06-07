const spy = require('sinon').spy;
const stub = require('sinon').stub;
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

        it('give the viewmodel access to google on the app viewmodel', () => {
            let google = {};
            new this.Controller({google: google});
            expect(this.vmSpy).to.have.been.calledWithNew;
            expect(this.vmSpy).to.have.calledWithExactly(google);
        });
    });

    describe('expect the Viewmodel', () => {
        beforeEach('setup spies', () => {
            this.appGoogle = {
                center: spy(),
                zoom: spy(),
                map: spy(),
                services: {
                    places: spy(),
                    directions: spy()
                }
            };
            this.mithril = {
                startComputation: spy(),
                endComputation: spy()
            };
            this.google = {
                maps: {
                    Map: spy(),
                    places: {
                        PlacesService: spy(),
                    },
                    DirectionsService: spy()
                },
            };
            this.google_maps = {
                load: stub(),
                release: spy()
            };
            this.google_maps.load.callsArgWith(0, this.google);
        });
        beforeEach('setup viewmodel', () => {
            let Viewmodel = proxyquire('./../src/components/map/viewmodel.js', {
                'mithril': this.mithril,
                'google-maps': this.google_maps
            });
            this.viewmodel = new Viewmodel(this.appGoogle);
        });

        describe('when .loadMap() is called', () => {
            it('to setup the loader', () => {
                expect(this.google_maps.LIBRARIES).to.contain('drawing');
                expect(this.google_maps.LIBRARIES).to.contain('places');
                expect(this.google_maps.KEY).to.equal('GOOGLE_MAPS_LOADER_KEY');
            });
            it('to do nothing when already initialized', () => {
                this.viewmodel.loadMap(null, true, null);
                expect(this.mithril.startComputation).to.not.have.been.called;
                expect(this.google_maps.load).to.not.have.been.called;
            });
            describe('and it isn\'t initialized to', () => {
                beforeEach('call method', () => {
                    this.context = {};
                    this.element = {};
                    this.viewmodel.loadMap(this.element, false, this.context);
                });
                it('free the map on onunload', () => {
                    this.context.onunload();
                    expect(this.google_maps.release).to.have.been.called;
                });
                it('redraw with mithril', () => {
                    expect(this.mithril.startComputation).to.have.been.calledBefore(this.mithril.endComputation);
                });
                it('load the map', () => {
                    expect(this.google_maps.load).to.have.been.called;
                });
                it('render the map', () => {
                    expect(this.google.maps.Map).to.have.been.calledWithNew;
                    expect(this.google.maps.Map).to.have.been.calledWith(this.element);
                    expect(this.appGoogle.center).to.have.been.called;
                    expect(this.appGoogle.zoom).to.have.been.called;
                });
                it('update the app viewmodel', () => {
                    expect(this.appGoogle.map).to.have.been.called;
                    expect(this.appGoogle.maps).to.equal(this.google.maps);;
                    expect(this.appGoogle.services.places).to.have.been.called;
                    expect(this.appGoogle.services.directions).to.have.been.called;
                });
            });
        });
    });


});
