//-----------ONLY FOR SEEDING!-------------------
//const seed = require('./db/seed.js');

//-----------ALL OTHER-------------------
const Sequelize = require('sequelize');
const path = require('path');
const express = require('express');
const fs = require('fs');
const Promise = require('bluebird');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const morgan = require('morgan');

const session = require('express-session');

const db = require('./db');

//------------mysql db in full later as sequelize connections------------------
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'venice'
// });

//  connection.connect(function(err){
//  if(!err) {
//      console.log("MySQL Venice Database is connected ... \n\n");
//  } else {
//      console.log("Error connecting database ... \n\n");
//  }
//  });

 //-------super simple query test-------

 // app.get("/query",function(req,res,next){
 //   connection.query('SELECT * from veniceTest', function(err, rows, fields) {
 //   //connection.end();
 //     if (!err)
 //       console.log('The solution is: ', rows);
 //     else
 //       console.log('Error while performing Query.');
 //       //next(err);
 //     });
 //    res.send('done searching');
 // });

//


//------------PUBLIC/USE/ETC------------------
//const fsP = Promise.promisify(fs.readFile);

const port = 3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
app.use(bodyParser.json({ 'type': '*/*',limit: '20mb' }));
app.use(express.static('./browser/'));
app.use(express.static('./public/'));
app.use(express.static('./public/stylesheets/'));
app.use(express.static('./public/bootstrap/'));
app.use(express.static('./public/img/'));

//---------super basic login----------------
//basic sessions/cookies use and login
//not yet set for actual security
app.use(session({
  secret: 'not secure',
  resave: false,
  saveUninitialized: false
}));


//-----------API ROUTES-------------------
app.use('/api', require('./routes/index.js'));

//catch all react-router front-end routes and direct to index
var validFrontendRoutes = ['/', '/map', '/Venice', '/Venice-Edit'];
var indexPath = path.join(__dirname, 'browser', 'index.html');
console.log(__dirname, indexPath);
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});


//-----------ERROR HANDLING-------------------

// app.use(function(req, res, next) {
//     console.log('this is reached');
//     console.log('url ' + req.url );
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

app.use(function (err, req, res, next) {
    console.log(err);
    var error={
        'message': err.message,
        'status':err.status,
        'stack':err.stack,
    }
    res.send(error);
    //res.render('error.html', {error:error});
});

//-----------DATABASE & CONNECTION SYNC-------------------

// var database = db.sync(); // for queries only...
//   app.listen(port, ()=>{
//       console.log('listening at '+port);
//       console.log(' db synced, top-confirmation');
//   });


app.listen(port, function (err) {
  if (err) throw err;
  console.log('HTTP server patiently listening on port', port);
  db.sync()
  .then(function () {
    console.log('server is connected, too');
  });
});



