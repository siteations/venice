const Sequelize = require('sequelize');
const db = require('../index.js');

// for map thumbnail details {id:1, nameH: 'Customs', srcThumb:'/img/placeholder_01sm.jpg', clusterId: 1, },

const details = db.define('Details', {
    nameH: {type: Sequelize.STRING, notNull: true },
   	srcThumb: {type: Sequelize.STRING, notNull: true },
    clusterId: {type: Sequelize.INTEGER, notNull: true },
});

module.exports = details;
