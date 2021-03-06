const router = require('express').Router();
const {Images, Narratives, Details, Sites, Tours, User, Biblio } = require('../db/models/index.js');
const { ImageUploader }= require('../utility/imageUploaders.js');
//const { ImageUploaderAWS }= require('../utility/imageUploaders.js');
//rework once you've done the db design/setup mysql tables

//nested under /api

//-------------------------sites--------------------------

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

router.put('/sites/:id', (req, res, next)=>{
	var fields = Object.keys(req.body);

		Sites.findById(req.params.id)
		.then(siteList=>{
			return siteList.update(req.body,{fields: fields})
			.then(results=> {
				res.send(results.data);
			})
		})
		.catch(err=>{
			next(err);
		});
});

router.delete('/sites/:id', (req, res, next)=>{
		Sites.findById(req.params.id)
		.then(siteList=>{
			//check for narrative, details (optional)
			//check for tour entries with site id... must be removed
			return siteList.destroy();
		})
		.then(results=> {
				res.send({message: `site ${req.params.id} removed, deleted from all tours`});
		})
		.catch(err=>{
			next(err);
		});
});

//-------------------------details--------------------------

router.get('/details', (req, res, next)=>{
		Details.findAll({})
		.then(detailList=>{
			res.send(detailList);
		})
		.catch(err=>{
			next(err);
		});
});

router.post('/details', (req, res, next)=>{
		Details.create(req.body)
		.then(siteList=>{
			res.send(siteList);
		})
		.catch(err=>{
			next(err);
		});
});

router.put('/details/:id', (req, res, next)=>{

var fields = Object.keys(req.body);

		Details.findById(req.params.id)
		.then(siteList=>{
			return siteList.update(req.body,{fields: fields})
			.then(results=> {
				res.send(results.data);
			})
		})
		.catch(err=>{
			next(err);
		});
});

router.delete('/details/:id', (req, res, next)=>{
		Details.findById(req.params.id)
		.then(siteList=>{
			//check for narrative, details (optional)
			//check for tour entries with site id... must be removed
			return siteList.destroy();
		})
		.then(results=> {
				res.send({message: `detail ${req.params.id} removed, deleted from all tours`});
		})
		.catch(err=>{
			next(err);
		});
});

//-------------------------narratives--------------------------

router.get('/narratives', (req, res, next)=>{
		Narratives.findAll({})
		.then(narrList=>{
			res.send(narrList);
		})
		.catch(err=>{
			next(err);
		});
});

router.post('/narratives', (req, res, next)=>{
		Narratives.create(req.body)
		.then(narrList=>{
			res.send(narrList);
		})
		.catch(err=>{
			next(err);
		});
});

router.put('/narratives/:id', (req, res, next)=>{
	var field = Object.keys(req.body);

		Narratives.findById(req.params.id)
		.then(narrList=>{
			return narrList.update(req.body, {fields: field})
			.then(results=> {
				res.send(results.data);
			})
		})
		.catch(err=>{
			next(err);
		});
});

router.delete('/narratives/:id', (req, res, next)=>{
		Narratives.findById(req.params.id)
		.then(siteList=>{
			//check for narrative, details (optional)
			//check for tour entries with site id... must be removed
			return siteList.destroy();
		})
		.then(results=> {
				res.send({message: `narrative ${req.params.id} removed, deleted from all tours`});
		})
		.catch(err=>{
			next(err);
		});
});

//-------------------------images--------------------------

router.get('/images', (req, res, next)=>{
		Images.findAll({})
		.then(imgList=>{
			res.send(imgList);
		})
		.catch(err=>{
			next(err);
		});
});


router.post('/images', (req, res, next)=>{ //to image table
		Images.create(req.body)
		.then(imgList=>{
			res.send(imgList);
		})
		.catch(err=>{
			next(err);
		});
});


router.put('/images/:id', (req, res, next)=>{
	var field = Object.keys(req.body);

		Images.findById(req.params.id)
		.then(narrList=>{
			return narrList.update(req.body, {fields: field})
			.then(results=> {
				res.send(results.data);
			})
		})
		.catch(err=>{
			next(err);
		});
});


router.post('/images-files', (req, res, next)=> { //to aws storage or local public
	//AWS and local version, depending on hosting...
	console.log(req.body);

	var image = ImageUploader({
	//var image = ImageUploaderAWS({
	    data_uri: req.body.data_uri,
	    filename: req.body.filename,
	    filetype: req.body.filetype
	  }).then(result=>{
	  	res.send({
	      status: 'success',
	      //uri: 'https://s3.us-east-2.amazonaws.com/newberry-images/images/'+req.body.filename, //image link for secondary submission to database in post above
	      uri: '/img/'+req.body.filename,
	    });
	  }).catch(console.log);


});

router.delete('/images/:id', (req, res, next)=>{
		Images.findById(req.params.id)
		.then(siteList=>{
			//check for narrative, details (optional)
			//check for tour entries with site id... must be removed
			return siteList.destroy();
		})
		.then(results=> {
				res.send({message: `images ${req.params.id} removed, deleted from all tours`});
		})
		.catch(err=>{
			next(err);
		});
});

//-------------------------tours--------------------------

router.get('/tours', (req, res, next)=>{
		Tours.findAll({})
		.then(tourList=>{
			res.send(tourList);
		})
		.catch(err=>{
			next(err);
		});
});

router.post('/tours', (req, res, next)=>{
		Tours.create(req.body)
		.then(tourList=>{
			res.send(tourList);
		})
		.catch(err=>{
			next(err);
		});
});

router.put('/tours/:id', (req, res, next)=>{
		let fields = Object.keys(req.body);

		Tours.findById(req.params.id)
		.then(tourList=>{
			return tourList.update(req.body, {fields: fields});
		}).then(() => {
			res.send({message: req.params.id+' removed'});
		})
		.catch(err=>{
			next(err);
		});
});

router.delete('/tours/:id', (req, res, next)=>{ //single entry

		Tours.findById(req.params.id)
		.then(tourList=>{
			return tourList.destroy();
		}).then(() => {
			res.send({message: req.params.id+' removed'});
		})
		.catch(err=>{
			next(err);
		});
});

router.delete('/tours/all/:id', (req, res, next)=>{ //single entry

		Tours.findAll({
				  where: {
				    tourId: req.params.id
				  }
				})
		.then(tourList=>{
			return tourList.map(list=>list.destroy());
		}).then(() => {
			res.send({message: req.params.id+' removed'});
		})
		.catch(err=>{
			next(err);
		});
});

//-------------bibliographic entries----------------------

router.get('/biblio', (req, res, next)=>{
		Biblio.findAll({})
		.then(bibList=>{
			res.send(bibList);
		})
		.catch(err=>{
			next(err);
		});
});

router.post('/biblio', (req, res, next)=>{
		Biblio.create(req.body)
		.then(bibList=>{
			res.send(bibList);
		})
		.catch(err=>{
			next(err);
		});
});

router.put('/biblio/:id', (req, res, next)=>{
	var field = Object.keys(req.body);

		Biblio.findById(req.params.id)
		.then(narrList=>{
			return narrList.update(req.body, {fields: field})
			.then(results=> {
				res.send(results.data);
			})
		})
		.catch(err=>{
			next(err);
		});
});



router.delete('/biblio/:id', (req, res, next)=>{

		Biblio.findById(req.params.id)
		.then(tourList=>{
			return tourList.destroy();
		}).then(() => {
			res.send({message: req.params.id+' removed'});
		})
		.catch(err=>{
			next(err);
		});
});


//-------------authorization----------------------

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

    if (!user || !user.isPasswordValid(req.body.password)) {
      //res.sendStatus(401); // no message; good practice to omit why auth fails
      res.send({message: 'sorry, login failed: user does not exist or password wrong'});
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

