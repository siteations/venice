'use strict';

var Sequelize = require('sequelize');

//MAMP connection
var db = new Sequelize('veniceMamp', 'root', 'root', {
  dialect: 'mysql',
	socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// var sequelize = new Sequelize('mysql://user:pass@example.com:9821/dbname', {
//   // Look to the next section for possible options
// })

//nonMAMP connection
// var db = new Sequelize('venice', 'root', '', {
// host: 'localhost',
// dialect: 'mysql',

//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   }
// });



// var databaseURI = 'postgres://localhost:5432/forecast';
// //var databaseURI = process.env.DATABASE_URL; //process for heroku node

// var db = new Sequelize(databaseURI, {
//   define: {
//     timestamps: false,
//     underscored: true
//   },
//   logging: false
// });

module.exports = db;
