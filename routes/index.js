const router = require('express').Router();
const {Images, Narratives, Details, Sites, Tours, Themes } = require('../db/models/index.js');

//rework once you've done the db design/setup mysql tables

//nested under /api

//-------------------------BASIC 'GET ALL'---------------------------

router.get('/sites', (req, res, next)=>{
		Sites.findAll({})
		.then(siteList=>{
			res.send(siteList);
		})
		.catch(err=>{
			next(err);
		});
});

router.get('/details', (req, res, next)=>{
		Details.findAll({})
		.then(detailList=>{
			res.send(detailList);
		})
		.catch(err=>{
			next(err);
		});
});

router.get('/narratives', (req, res, next)=>{
		Narratives.findAll({})
		.then(narrList=>{
			res.send(narrList);
		})
		.catch(err=>{
			next(err);
		});
});


router.get('/images', (req, res, next)=>{
		Images.findAll({})
		.then(imgList=>{
			res.send(imgList);
		})
		.catch(err=>{
			next(err);
		});
});

router.get('/tours', (req, res, next)=>{
		Tours.findAll({})
		.then(tourList=>{
			res.send(tourList);
		})
		.catch(err=>{
			next(err);
		});
});


router.get('/themes', (req, res, next)=>{
		Themes.findAll({})
		.then(themeList=>{
			res.send(themeList);
		})
		.catch(err=>{
			next(err);
		});
});



//-------------GET by vessel id FOR EACH TABLE----------generic grabs for summary

router.get('/vessels/:id', (req, res, next)=>{
	console.log(req.params.id);

	Voyages.findOne({
		where: {
			id : req.params.id
			}
		})
		.then(voyage => {
			res.send(voyage);
		})
		.catch(err=>{
			next(err);
		});

});

router.get('/places/:id', (req, res, next)=>{
	let id = req.params.id.replace('_', ' ');

	Places.findAll({
			where: {
				LogId : id
			}
		})
		.then(placeList=>{
			res.send(placeList);
		})
		.catch(err=>{
			next(err);
		});

});

router.get('/animals/:id', (req, res, next)=>{
	let id = req.params.id.replace('_', ' ');

	Animals.findAll({
			where: {
				LogId : id
			}
		})
		.then(animalSumList=>{
			res.send(animalSumList);
		})
		.catch(err=>{
			next(err);
		});

});

router.get('/allanimals/:id', (req, res, next)=>{
	let id = req.params.id.replace('_', ' ');

	AllAnimals.findAll({
			where: {
				LogId : id
			}
		})
		.then(animalSumList=>{
			res.send(animalSumList);
		})
		.catch(err=>{
			next(err);
		});

});

router.get('/contact/:id', (req, res, next)=>{
	let id = req.params.id.replace('_', ' ');


	Contacts.findAll({
			where: {
					LogId : id
				}
		})
		.then(contactList=>{
			res.send(contactList);
		})
		.catch(err=>{
			next(err);
		});

});

router.get('/crew/:id', (req, res, next)=>{
	let id = req.params.id.replace('_', ' ');
	console.log('hit route:', id);

	Crews.findAll({
			where: {
					LogId : id
				}
		})
		.then(contactList=>{
			res.send(contactList);
		})
		.catch(err=>{
			next(err);
		});

});



module.exports = router;
