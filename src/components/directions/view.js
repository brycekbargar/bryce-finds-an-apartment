'use strict';

const m = require('mithril');

module.exports = (ctrl) => {
    let vm = ctrl.vm;
    return m('table.Directions', {
        config: vm.getDirections
    }, [
        m('thead', [
            m('tr', [
                m('th[colspan=2]', vm.directions.name())
            ])
        ]),
        m('tbody', [
            m('tr', {
                style: {display: vm.walkingVisible() ? 'inline' : 'none'}
            }, [
                m('td.Directions--walking', 'Walking:'),
                m('td', `${vm.directions.walkingMinutes()} minutes}`)
            ]),
            m('tr', {
                style: {display: vm.bikingVisible() ? 'inline' : 'none'}
            }, [
                m('td.Directions--biking', 'Biking:'),
                m('td', `${vm.directions.bikingMinutes()} minutes`)
            ]),
            m('tr', {
                style: {display: vm.transitVisible() ? 'inline' : 'none'}
            }, [
                m('td.Directions--biking', 'Transit:'),
                m('td', `${vm.directions.transitMinutes()} minutes`)
            ])
        ])
    ]);
};
