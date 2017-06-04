const Sequelize = require('sequelize');
const db = require('../index.js');

// from pre-db

const images = db.define('Images', {
    // coreId: {type: Sequelize.INTEGER}, //is there any reason to have these?
    // minorId: {type: Sequelize.INTEGER},
    // clusterId: {type: Sequelize.INTEGER, notNull: true },
    imageSeries: {type: Sequelize.INTEGER, notNull: true }, //so several images can then fill slider for a single panel
    src: {type: Sequelize.TEXT, notNull: true },
    caption: {type: Sequelize.STRING, notNull: true },
    catalogSource: {type: Sequelize.TEXT, notNull: true },
    catalogLink: {type: Sequelize.STRING },
});

module.exports = images;
