const Sequelize = require('sequelize');
const db = require('../index.js');

// from pre-db
//{id: 1, cx:9335, cy:5672, r:1480/2, name: 'Marriage of the Sea.Bissona Serenissima', type:'processions', cluster: false, clusterId: null },

const themes = db.define('Themes', {
    tourId: {type: Sequelize.INTEGER, notNull: true },
    layerType: {type: Sequelize.STRING, notNull: true },
});

module.exports = themes;
