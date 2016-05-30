'use strict';

const m = require('mithril');

module.exports = (ctrl) => {
    let vm = ctrl.vm;
    return m('div.Directions', [
        m('table', [
            m('thead.Directions--name', [
                m('tr', [
                    m('th[colspan=2]', vm.directions.name())
                ])
            ]),
            m('tbody', [
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
        ])
    ]);
};
