const Sequelize = require('sequelize');
const db = require('../index.js');

// from pre-db

const images = db.define('Images', {
    // coreId: {type: Sequelize.INTEGER}, //is there any reason to have these?
    // minorId: {type: Sequelize.INTEGER},
    // clusterId: {type: Sequelize.INTEGER, notNull: true },
    // imageSeries: {type: Sequelize.INTEGER, notNull: true }, //use find where narrativeId : #
    narrativeId: {type: Sequelize.INTEGER, notNull: true },
    src: {type: Sequelize.TEXT, notNull: true },
    caption: {type: Sequelize.STRING, notNull: true },
    capShort: {type: Sequelize.STRING, notNull: true },
    bibliography: {type: Sequelize.STRING, notNull: true },
    link: {type: Sequelize.STRING, notNull: true },
    // biblioSeries: {type: Sequelize.INTEGER, notNull: true },
});

module.exports = images;
