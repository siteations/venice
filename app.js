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
const mysql = require('mysql');
const morgan = require('morgan');

//------------mysql db in full later as sequelize connections------------------
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'venice'
});

 connection.connect(function(err){
 if(!err) {
     console.log("MySQL Venice Database is connected ... \n\n");
 } else {
     console.log("Error connecting database ... \n\n");
 }
 });

 //-------super simple query test-------

 app.get("/query",function(req,res,next){
 connection.query('SELECT * from veniceTest', function(err, rows, fields) {
 //connection.end();
   if (!err)
     console.log('The solution is: ', rows);
   else
     console.log('Error while performing Query.');
     //next(err);
   });
    res.send('done searching');
 });

//const db = require('./db/index.js').db;
//const router = require('./routes/index.js');

//------------GEO/D3 later------------------
//const fsP = Promise.promisify(fs.readFile);

const port = 3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./browser/'));
app.use(express.static('./public/'));
app.use(express.static('./public/stylesheets/'));
app.use(express.static('./public/bootstrap/'));
app.use(express.static('./public/img/'));
//app.use(express.static('./public/geojson/'));


app.use('/hello', (req,res,next)=>{
  res.send('hello');

})


//-----------MORE ROUTES-------------------

//app.use('/api', router);
/*app.use('/geojson/:file', (req, res, next) => {
      fsP(`./public/geojson/${req.params.file}`)
        .then(geojson =>{
          res.send(geojson);
        })
        .catch(err=>{
          next(err);
        });
});*/


//-----------ERROR HANDLING-------------------

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use('/', (err, req, res, next) =>{
    console.log(err);
    var error={
        'message': err.message,
        'status':err.status,
        'stack':err.stack,
    }
    //res.send(error);
    res.render('error.html', {error:error});
});

//-----------DATABASE & CONNECTION SYNC-------------------

// var database = db.sync() // for queries only...

  app.listen(port, ()=>{
      console.log('listening at '+port);
      console.log(' db synced, top-confirmation');
  });



