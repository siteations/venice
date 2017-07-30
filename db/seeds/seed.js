const fs = require('fs');
const Promise = require('bluebird');

//const db = require('./db.js');
const db = require('../index.js');
const Images = require('../models/images.js');
const Details = require('../models/details.js');
const Sites = require('../models/sites.js');
const Narratives = require('../models/narratives.js');
const Tours = require('../models/tours.js');
const User = require('../models/user.js');
const Biblio = require('../models/bibliography.js');

const siteSeed = require('../../browser/react/non-db/sites.json');
const narrativeSeed = require('../../browser/react/non-db/narratives.json');
const imageSeed = require('../../browser/react/non-db/images.json');
const tourSeed = require('../../browser/react/non-db/tours.json');
const detailSeed = require('../../browser/react/non-db/details.json');

//-------------faked data from pre-db--------------------

const {userSeed, biblioSeed} = require ('./updateSeed.js');

var database = db.sync({force:true}); // for seeding only...
database.then(()=> { console.log('synced, top-confirmation'); });


////////////////////////////////////////////////////////////////////////////////


database.then(()=>{
    console.log('db synched, adding models');

//add all seeded values
const creatingSites = Promise.map(siteSeed, site => {
            return Sites.create(site);
        })
    .then((site)=>{
    })
    .catch(console.log);


const creatingDetails = Promise.map(detailSeed, detail => {
            return Details.create(detail);
        })
    .then((detail)=>{
    })
    .catch(console.log);


const creatingNarratives = Promise.map(narrativeSeed, narr => {
            return Narratives.create(narr);
        })
    .then((narr)=>{
    })
    .catch(console.log);

const creatingImages = Promise.map(imageSeed, image => {
            return Images.create(image);
        })
    .then((image)=>{
    })
    .catch(console.log);

const creatingTours = Promise.map(tourSeed, tour => {
            return Tours.create(tour);
        })
    .then((tour)=>{
    })
    .catch(console.log);

const creatingUser = Promise.map(userSeed, user => {
            return User.create(user);
        })
    .then((user)=>{
    })
    .catch(console.log);

const creatingBiblio = Promise.map(biblioSeed, biblio => {
            return Biblio.create(biblio);
        })
    .then((biblio)=>{
    })
    .catch(console.log);

}).catch(console.log);


module.exports = {};

