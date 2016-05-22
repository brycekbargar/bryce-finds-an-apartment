'use strict';

filter.controller = function() {
    filter.vm.init();
    filter.vm.add(new filter.Filter({name: 'First Filter'}));
    filter.vm.add(new filter.Filter({name: 'Second Filter'}));
    filter.vm.add(new filter.Filter({name: 'Third Filter'}));
};


