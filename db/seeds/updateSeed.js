//use for database seeding later...
const sites = require('../../browser/react/non-db/sites.json');
const narratives = require('../../browser/react/non-db/narratives.json');
const images = require('../../browser/react/non-db/images.json');
//import * as tours from '../../browser/react/non-db/tours.json';
//import * as tours from '../../browser/react/non-db/tours.json';


const detailSeed = [
	{nameH: 'Customs', srcThumb:'/img/placeholder_01sm.jpg', clusterId: 1, },
	{nameH: 'Publications', srcThumb:'/img/placeholder_02sm.jpg', clusterId: 1, },
	{nameH: 'Observations', srcThumb:'/img/placeholder_03sm.jpg', clusterId: 1, },
	{nameH: 'Dress', srcThumb:'/img/placeholder_05sm.jpg', clusterId: 1, },
	{id:5, nameH: 'Test', srcThumb:'/img/placeholder_01sm.jpg', clusterId: 2, },
	{id:6, nameH: 'Test', srcThumb:'/img/placeholder_02sm.jpg', clusterId: 2, },
	{id:7, nameH: 'Test', srcThumb:'/img/placeholder_03sm.jpg', clusterId: 3, }
];


const tourSeed = [ //any sort of narrative strategy
	{
		tourId: 1,
		siteId: 3,
		zoom: 6,
		tourName: 'test',
	},
	{
		tourId: 1,
		siteId: 11,
		zoom: 5,
		tourName: 'test',
    },
  {
		tourId: 1,
  	siteId: 9,
    zoom: 6,
    tourName: 'test',
  },
  {
		tourId: 1,
    siteId: 21,
      zoom: 5,
  	tourName: 'test',
  },
  {
		tourId: 1,
		siteId: 17,
		zoom: 5,
  	tourName: 'test',
  },
  {
		tourId: 1,
		siteId: 13,
		zoom: 4,
  	tourName: 'test',
  },
  {
		tourId: 1,
		siteId: 6,
		zoom: 6,
  	tourName: 'test',
  },
  {
		tourId: 1,
		siteId: 23,
		zoom: 6,
  	tourName: 'test',
  }

];

const userSeed =[
		{
		name: 'Meg',
		password: 'Studer',
	},
	{
		name: 'Newberry',
		password: 'DianeLia',
	},
];

const biblioSeed = [
	{
	  narrativeId: 1,
	  imageId: null,
		author:	'Braun, Georg, 1540 or 1541-1622.',
		title:	'Diuersi Dithmarsorum et vicinarum gentium habitus.',
		published:	'[Amsterdam : Van Hoeve, 1980].',
		physical:	'1 view ; 36 x 50 cm.',
		page: '1.',
		link: 'https://i-share.carli.illinois.edu/nby/cgi-bin/Pwebrecon.cgi?DB=local&v1=1&BBRecID=947138',
	},
	{
	  narrativeId: 1,
	  imageId: null,
		author:	'Braun, Georg, 1540 or 1541-1622.',
		title:	'Diuersi Dithmarsorum et vicinarum gentium habitus. v2 series1',
		published:	'[Amsterdam : Van Hoeve, 1980].',
		physical:	'1 view ; 36 x 50 cm.',
		page: '1.',
		link: 'https://i-share.carli.illinois.edu/nby/cgi-bin/Pwebrecon.cgi?DB=local&v1=1&BBRecID=947138',
	},
	{
	  narrativeId: null,
	  imageId: 1,
		author:	'Braun, Georg, 1540 or 1541-1622.',
		title:	'Diuersi Dithmarsorum et vicinarum gentium habitus. image credit',
		published:	'[Amsterdam : Van Hoeve, 1980].',
		physical:	'1 view ; 36 x 50 cm.',
		page: '1.',
		link: 'https://i-share.carli.illinois.edu/nby/cgi-bin/Pwebrecon.cgi?DB=local&v1=1&BBRecID=947138',
	},
		{
	  narrativeId: 2,
	  imageId: null,
		author:	'Braun, Georg, 1540 or 1541-1622.',
		title:	'Diuersi Dithmarsorum et vicinarum gentium habitus.',
		published:	'[Amsterdam : Van Hoeve, 1980].',
		physical:	'1 view ; 36 x 50 cm.',
		page: '1.',
		link: 'https://i-share.carli.illinois.edu/nby/cgi-bin/Pwebrecon.cgi?DB=local&v1=1&BBRecID=947138',
	},
	{
	  narrativeId: null,
	  imageId: 2,
		author:	'Braun, Georg, 1540 or 1541-1622.',
		title:	'Diuersi Dithmarsorum et vicinarum gentium habitus. slider2-1',
		published:	'[Amsterdam : Van Hoeve, 1980].',
		physical:	'1 view ; 36 x 50 cm.',
		page: '1.',
		link: 'https://i-share.carli.illinois.edu/nby/cgi-bin/Pwebrecon.cgi?DB=local&v1=1&BBRecID=947138',
	},
	{
	  narrativeId: null,
	  imageId: 3,
		author:	'Braun, Georg, 1540 or 1541-1622.',
		title:	'Diuersi Dithmarsorum et vicinarum gentium habitus. slider2-2',
		published:	'[Amsterdam : Van Hoeve, 1980].',
		physical:	'1 view ; 36 x 50 cm.',
		page: '1.',
		link: 'https://i-share.carli.illinois.edu/nby/cgi-bin/Pwebrecon.cgi?DB=local&v1=1&BBRecID=947138',
	}
];

module.exports = {detailSeed, tourSeed, userSeed, biblioSeed };
