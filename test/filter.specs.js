'use strict';

const expect = require('chai').expect;

const vm = require('../source/models/filter.model.js');
const Controller = require('../source/controllers/filter.controller.js');

describe('For the model', () => {
    beforeEach('setup the model', () => {
        vm.init();
    });
    it('expect it to hold models', () => {
        vm.add({name: 'one'});
        vm.add({name: 'two'});
        vm.add({name: 'three'});

        expect(vm.list.length).to.equal(3);
    });
    it('expect it to be enable-able', () => {
        vm.add({name: 'one'});
        vm.add({name: 'two'});
        vm.list[0].enabled(true);

        expect(vm.list[0].enabled()).to.be.ok;
        expect(vm.list[1].enabled()).to.not.be.ok;
    });
});

describe('For the controller', () => {
    it('expect the model to be initialized', () => {
        new Controller();

        expect(vm.list).to.be.empty;
    });
});
