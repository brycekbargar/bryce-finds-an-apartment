'use strict';

const m = require('mithril');

module.exports = (ctrl) => {
    let vm = ctrl.vm;
    return m('div.Directions.u-flexbox.u-flexbox--vertial', {
        config: vm.getDirections
    }, [
        m('label', vm.name()),
        m('span.Directions--walking', {
            display: vm.walkingVisible() ? 'inline' : 'none'
        }, [
            m('label', 'Walking:'),
            m('label', vm.walkingMinutes())
        ]),
        m('span.Directions--biking', [
            m('label', 'Biking:'),
            m('label', vm.bikingMinutes())
        ]),
        m('span.Directions--transit', [
            m('label', 'Transit:'),
            m('label', vm.transitMinutes())
        ])
    ]);
};
