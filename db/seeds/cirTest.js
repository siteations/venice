//use for database seeding later...

const siteSeed = [ // this should be akin to json entries, minus name, etc.
	{cx:9335, cy:5672, r:1480/2, name: 'Marriage of the Sea.Bissona Serenissima', type:'processions', cluster: false, clusterId: null },
	{cx:7668, cy:5989, r:900/2, name: 'Benedictine Monastery.San Giorgio Maggiore', type:'monastery', cluster: false, clusterId: null },
	{cx:8687, cy:4677, r:700/2, name: 'Benedictine Convent.San Zaccaria', type:'convent', cluster: false, clusterId: null },
	{cx:13535, cy:4563, r:900/2, name: 'Basilica (main).San Pietro di Castello', type:'bascilica', cluster: false, clusterId: null },
	{cx:9747, cy:3541, r:700/2, name: 'Franciscan Church and Monastery.San Francesco della Vigna', type:'monastery', cluster: false, clusterId: null },
	{cx:9446, cy:4379, r:500/2, name: 'The Greeks.San Giorgio dei Greci (Sant’Antonin)', type:'non-catholic communities', cluster: false, clusterId: null },
	{cx:8474, cy:2043, r:500/2, name: 'Camaldolese.San Michele in Isola', type:'monastery', cluster: false, clusterId: null },
	{cx:7972, cy:3242, r:700/2, name: 'Dominican Basilica.Basilica dei Santi Giovanni e Paolo', type:'bascilica', cluster: false, clusterId: null },
	{cx:7899, cy:3109, r:500/2, name: 'Plague Hospital.Santi Giovanni e Paolo', type:'plague churches', cluster: false, clusterId: null },
	{cx:7674, cy:3842, r:500/2, name: 'Parish Church.Santa Maria Formosa', type:'parish churches', cluster: false, clusterId: null },
	{cx:6696, cy:3163, r:500/2, name: 'German Lutherans.Il Fondaco dei Tedeschi', type:'non-catholic communities', cluster: true, clusterId: 1 },
	{cx:7271, cy:4563, r:900/2, name: 'Bascilica of patron saint of Venice.Basilica di San Marco (connected to Doge’s palace)', type:'bascilica', cluster: false, clusterId: null },
	{cx:6642, cy:4677, r:1480/2, name: 'Holy week processions.Piazza San Marco/Bascilica San Marco', type:'processions', cluster: false, clusterId: null },
	{cx:4325, cy:5150, r:700/2, name: 'Basilica and Plague Church.Santa Maria della Salute', type:'bascilica', cluster: false, clusterId: null },
	{cx:4023, cy:3900, r:500/2, name: 'Augustinian Church and Monastery.Santo Stefano', type:'monastery', cluster: false, clusterId: null },
	{cx:3074, cy:5090, r:700/2, name: 'Augustinian Convent.Spirito Santo', type:'convent', cluster: false, clusterId: null },
	{cx:3271, cy:6563, r:700/2, name: 'Basilica and Plague Church.Il Redentore', type:'bascilica', cluster: false, clusterId: null },
	{cx:1547, cy:3674, r:500/2, name: 'Parish Church.San Nicolò', type:'parish churches', cluster: false, clusterId: null },
	{cx:3331, cy:3195, r:500/2, name: 'Parish Church.San Pantalon', type:'parish churches', cluster: false, clusterId: null },
	{cx:3693, cy:2976, r:500/2, name: 'Plague Church and Scuola (confraternity).San Rocco', type:'plague churches', cluster: false, clusterId: null },
	{cx:3839, cy:3065, r:700/2, name: 'Franciscan Basilica.Basilica di Santa Maria Gloriosa dei Frari', type:'bascilica', cluster: false, clusterId: null },
	{cx:4071, cy:2217, r:500/2, name: 'Spanish Presence.San Geremia', type:'non-catholic communities', cluster: false, clusterId: null },
	{cx:4287, cy:1684, r:700/2, name: 'The Jewish Ghetto.Il Ghetto', type:'non-catholic communities', cluster: false, clusterId: null },
	{cx:5814, cy:1623, r:700/2, name: "Cistercian.Madonna dell'Orto", type:'monastery', cluster: false, clusterId: null },
	{cx:4941, cy:2189, r:500/2, name: 'The Turks.Il Fondaco dei Turchi', type:'non-catholic communities', cluster: false, clusterId: null },
];

const detailSeed = [
	{nameH: 'Customs', srcThumb:'/img/placeholder_01sm.jpg', clusterId: 1, },
	{nameH: 'Publications', srcThumb:'/img/placeholder_02sm.jpg', clusterId: 1, },
	{nameH: 'Observations', srcThumb:'/img/placeholder_03sm.jpg', clusterId: 1, },
	{nameH: 'Dress', srcThumb:'/img/placeholder_05sm.jpg', clusterId: 1, }
];


const narrativeSeed = [
	{
		coreId: 11,
		minorId: null,
		clusterId: 1,
		title: 'Lutherans on the Grand Canal',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sem est, ultricies at cursus non, sodales bibendum elit. Suspendisse pellentesque accumsan risus, ac malesuada risus sodales at. Cras imperdiet tellus sed dolor volutpat pellentesque. Quisque eleifend efficitur lacus. Maecenas ornare blandit turpis non bibendum. Cras vel fermentum tortor, vitae auctor sapien. Suspendisse massa neque, pulvinar vel pulvinar vitae, iaculis sit amet massa. Nunc accumsan sapien quis sapien semper ullamcorper. Etiam pellentesque orci ac lectus tempor tincidunt. In viverra nulla felis, ut mollis tortor semper sit amet. Maecenas nec est lacus. Quisque erat lorem, malesuada non faucibus id, fermentum eget velit.',
		researcherName: 'john doe',
    researcherTitle: 'professor',
    researcherAffiliation: 'University',
	},
	{
		coreId: null,
		minorId: 1,
		clusterId: 1,
		title: 'Lutheran Presence & German Trade',
		text: 'In eu semper nibh, blandit euismod massa. Sed ut pulvinar lorem. Praesent sit amet porta leo. Proin luctus enim sit amet risus molestie, ut elementum leo pulvinar. Morbi maximus felis nec arcu malesuada, a venenatis felis consectetur. Nullam in risus sem. Aenean eget luctus nulla.',
		researcherName: 'john doe',
    researcherTitle: 'professor',
    researcherAffiliation: 'University',
	},
	{
		coreId: null,
		minorId: 2,
		clusterId: 1,
		title: 'Protestant Prints & Lutheran Bible Circulation in Venice',
		text: 'Donec diam velit, facilisis vitae pharetra rutrum, sodales et orci. Vestibulum id ultrices justo, at lobortis ligula. Aliquam erat volutpat. Sed molestie malesuada lacinia. Proin ex massa, ultricies nec arcu vitae, malesuada aliquet justo. Sed tincidunt, orci sed euismod ultrices, turpis tellus aliquam purus, a rutrum lacus nisl at eros. Maecenas quis diam nunc. Phasellus ac quam eu urna ultrices sagittis. Nulla facilisi. Donec sodales neque sit amet urna dapibus maximus dapibus lobortis metus. Sed vel nisi id lectus laoreet hendrerit nec quis mi. Suspendisse efficitur nisi sed tincidunt congue.',
		researcherName: 'jane doe',
    researcherTitle: 'professor',
    researcherAffiliation: 'University',
	},
	{
		coreId: null,
		minorId: 3,
		clusterId: 1,
		title: 'Lutheran Religious Practices',
		text: 'Quisque tincidunt blandit ipsum, et consectetur dui vulputate nec. Praesent quis velit consectetur quam pharetra feugiat ut vel nibh. Aliquam porttitor nibh et ullamcorper feugiat. Quisque tempus pretium nunc, eu egestas turpis posuere in. Proin enim nunc, vestibulum at erat at, tempor semper leo. Nunc tincidunt enim sed tempus dapibus. Nullam vel elit vitae velit vulputate lacinia vel non erat. Fusce in feugiat nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur iaculis dictum placerat. Maecenas et risus nec metus blandit laoreet. Donec enim velit, hendrerit eu justo at, mollis elementum risus. In tristique metus at dolor tristique, nec aliquam arcu faucibus. Nullam nec risus tortor.',
		researcherName: 'john doe',
    researcherTitle: 'professor',
    researcherAffiliation: 'University',
	},
	{
		coreId: null,
		minorId: 4,
		clusterId: 1,
		title: 'Germanic Costumes & Cultural Portraits',
		text: 'Quisque in purus faucibus erat iaculis maximus. Maecenas posuere interdum massa, nec tincidunt orci placerat quis. Aenean at tempor lacus, ac malesuada augue. Vestibulum cursus mauris vel nulla pulvinar, quis aliquet orci porttitor. Fusce vel gravida arcu, et tempor nibh. Cras blandit eu urna eu bibendum. Donec id lorem rutrum, imperdiet tellus vel, pulvinar eros. Mauris vulputate odio at metus finibus rhoncus. Fusce ornare risus velit, nec viverra ligula porta ultrices. Donec nunc risus, tincidunt a risus id, commodo feugiat eros. Donec eleifend mauris nec augue rutrum, eu euismod felis blandit. Praesent vel dolor in mi efficitur sollicitudin. Integer molestie varius sapien, a fringilla justo faucibus a. Curabitur maximus feugiat imperdiet. Praesent laoreet, erat nec condimentum tempor, mi elit maximus nunc, at aliquam orci odio in purus. Sed mattis facilisis odio, quis sodales ex efficitur id.',
		researcherName: 'jane doe',
    researcherTitle: 'professor',
    researcherAffiliation: 'University',
	},
];

const imageSeed = [
	{
		narrativeId: 1,
		src: '/img/placeholder_06.jpg ',
		caption: 'lorem ipsum',
	},
	{
		narrativeId: 2,
		src:'/img/placeholder_01.jpg' ,
		caption: 'lorem ipsum',
	},
	{
		narrativeId: 2,
		src:'/img/placeholder_04.jpg' ,
		caption: 'lorem ipsum',
	},
	{
		narrativeId: 3,
		src:'/img/placeholder_02.jpg' ,
		caption: 'lorem ipsum',
	},
	{
		narrativeId: 4,
		src:'/img/placeholder_03.jpg' ,
		caption: 'lorem ipsum',
	},
	{
		narrativeId: 5,
		src:'/img/placeholder_05.jpg' ,
		caption: 'lorem ipsum',
	},

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
]

module.exports = {siteSeed, detailSeed, narrativeSeed, imageSeed, tourSeed, userSeed, biblioSeed };
