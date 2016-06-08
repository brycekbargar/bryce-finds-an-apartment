const match = require('sinon').match;
const spy = require('sinon').spy;
const stub = require('sinon').stub;
const expect = require('chai')
    .use(require('sinon-chai'))
    .expect;
const proxyquire = require('proxyquire').noCallThru();
const jsdomify = require('jsdomify').default;

let m, AppViewmodel;

describe('For the Map component', () => {
    beforeEach('reset mithril', () => {
        delete require.cache[require.resolve('mithril')];
        m = require('mithril');
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

    describe('expect the Viewmodel', () => {
        beforeEach('setup spies', () => {
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
            this.appGoogle = new AppViewmodel().google;
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
                    expect(this.google.maps.Map).to.have.been.calledWith(this.element, {
                        center: this.appGoogle.center(),
                        zoom: this.appGoogle.zoom()
                    });
                });
                it('update the app viewmodel', () => {
                    expect(this.appGoogle.map()).to.exist;
                    expect(this.appGoogle.maps).to.equal(this.google.maps);;
                    expect(this.appGoogle.services.places()).to.exist;
                    expect(this.appGoogle.services.directions()).to.exist;
                });
            });
        });
    });

    describe('expect the View', () => {
        before('create the dom', () => jsdomify.create('<html><body></body></html>'));
        after('destroy the dom', () => jsdomify.destroy());

        beforeEach('setup jsdom', () => {
            jsdomify.clear();
            this.document = jsdomify.getDocument();
            m.deps(this.document.defaultView);
        });
        beforeEach('render View', () => {
            let test = this;
            test.loadMapSpy = spy();
            m.mount(this.document.body, {
                controller: function() {
                    this.vm = {
                        loadMap: test.loadMapSpy
                    }
                },
                view: require('./../src/components/map/view.js')             
            });
        });
        it('to load the map', () => {
            expect(this.loadMapSpy).to.have.been.calledWith(match.any, false, {});
        });
        it('to render it in a named div', () => {
            let element = this.document.getElementsByTagName('div')[0];
            expect(element.className).to.equal('Map');
        });
    });
})
