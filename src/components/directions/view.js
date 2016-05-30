'use strict';

const m = require('mithril');

module.exports = (ctrl) => {
    let vm = ctrl.vm;
    return m('div.Directions.u-flexbox.u-flexbox--vertical', {
        config: vm.getDirections
    }, [
        m('label', vm.directions.name()),
        m('span.Directions--walking', {
            style: {display: vm.walkingVisible() ? 'inline' : 'none'}
        }, [
            m('label', 'Walking:'),
            m('label', vm.directions.walkingMinutes())
        ]),
        m('span.Directions--biking', [
            m('label', 'Biking:'),
            m('label', vm.directions.bikingMinutes())
        ]),
        m('span.Directions--transit', [
            m('label', 'Transit:'),
            m('label', vm.directions.transitMinutes())
        ])
    ]);
};
