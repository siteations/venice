const fs = require('fs');
const Promise = require('bluebird');

//const db = require('./db.js');
const db = require('../index.js');
const Images = require('../models/images.js');
const Details = require('../models/details.js');
const Sites = require('../models/sites.js');
const Narratives = require('../models/narratives.js');
const Tours = require('../models/tours.js');

//-------------faked data from pre-db--------------------

const {siteSeed, detailSeed, narrativeSeed, imageSeed, tourSeed } = require ('./cirTest.js');

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

}).catch(console.log);


module.exports = {};

