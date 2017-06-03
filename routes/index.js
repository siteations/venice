const router = require('express').Router();
const {Images, Narratives, Details, Sites, Tours, Themes, User } = require('../db/models/index.js');

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

router.post('/sites', (req, res, next)=>{
		Sites.create(req.body)
		.then(siteList=>{
			res.send(siteList);
		})
		.catch(err=>{
			next(err);
		});
});

router.put('/sites', (req, res, next)=>{
		Sites.findById(req.body.id)
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

//-------------authorization----------------------

router.get('/user', function (req, res, next) {
  User.findById(req.session.userId)
  .then(user => res.json(user))
  .catch(next);
});

// // signup
// router.post('/', function (req, res, next) {
//   User.findOrCreate({
//     where: {
//       email: req.body.email
//     },
//     defaults: { // if the user doesn't exist, create including this info
//       password: req.body.password
//     }
//   })
//   .spread((user, created) => {
//     if (created) {
//       req.session.userId = user.id;
//       res.json(user);
//       console.log('user created');
//     } else {
//       res.sendStatus(401); // this user already exists, you cannot sign up
//     }
//   });
// });

// login
router.put('/user', function (req, res, next) {
  User.findOne({
    where: {
      name: req.body.name
    },
    attributes: {
      include: ['password', 'salt']
    }
  })
  .then(user => {
    if (!user) {
      //res.sendStatus(401); // no message; good practice to omit why auth fails
      res.send({message: 'sorry, login failed'});
    } else {
        req.session.userId = user.id;
        res.json(user);
    }
  })
  .catch(next);
});

// logout, i.e. "please just forget `me`"
router.delete('/user', function (req, res, next) {
  delete req.session.userId;
  res.sendStatus(204);
});

module.exports = router;



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
