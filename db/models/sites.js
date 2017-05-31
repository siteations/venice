const Sequelize = require('sequelize');
const db = require('../index.js');

// from pre-db
//{id: 1, cx:9335, cy:5672, r:1480/2, name: 'Marriage of the Sea.Bissona Serenissima', type:'processions', cluster: false, clusterId: null },

const sites = db.define('Sites', {
    cx: {type: Sequelize.INTEGER, notNull: true },
    cy: {type: Sequelize.INTEGER, notNull: true },
    r: {type: Sequelize.INTEGER, notNull: true },
    name: {type: Sequelize.STRING, notNull: true },
    type: {type: Sequelize.STRING, notNull: true },
    cluster: {type: Sequelize.BOOLEAN, notNull: true },
    clusterId: {type: Sequelize.INTEGER, notNull: true },
});

module.exports = sites;
