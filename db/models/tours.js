const Sequelize = require('sequelize');
const db = require('../index.js');

// from pre-db
//{id: 1, cx:9335, cy:5672, r:1480/2, name: 'Marriage of the Sea.Bissona Serenissima', type:'processions', cluster: false, clusterId: null },

const tours = db.define('Tours', {
    tourId: {type: Sequelize.INTEGER, notNull: true },
    siteId: {type: Sequelize.INTEGER, notNull: true },
    zoom: {type: Sequelize.INTEGER, notNull: true },
    tourName: {type: Sequelize.STRING, notNull: true},
});

module.exports = tours;
