const Sequelize = require('sequelize');
const db = require('../index.js');

const Images = require('./images.js');
const Narratives = require('./narratives.js');
const Details = require('./details.js');
const Sites = require('./sites.js');
const Tours = require('./tours.js');
const User = require('./user.js');

//add associations here

module.exports = {
    db,
    Images,
    Narratives,
    Details,
    Sites,
    Tours,
    User,
};
