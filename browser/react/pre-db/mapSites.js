const mapNames= {
	barbari: './img/barbari',
	section: './img/section',
	fracho: './img/fracho',
	demo1762: './img/demo1762',
}

//Georg Braun; Frans Hogenberg: Civitates Orbis Terrarum, Band 1, 1572 (Ausgabe Beschreibung vnd Contrafactur der vornembster Stät der Welt, Köln 1582; [VD16-B7188)

//Map of Venice contained in the Libro di Benedetto Bordone published in 1528

//Giacomo Frácho - Universitätsbibliothek Salzburg, G 66 III (aus dem ehemaligen Wolf-Dietrich-Klebeband Städtebilder; alte Signatur: V.4.A.14);

//carte de Venis au XVe siecle par Erhardum Reüwich de Trajecto et Bernhard von Breydenbach

const mapSites = [
// presuming auto start, just click to advance, update tour
	{
		id: 1,
		x: 8192, //set to center on full scale version
		y: 4096,	//set to center
		r: 0, // circle or icon of sorts, symbol to draw the eye?
		scale: 3,
		mapName: 'barbari',
		name: 'Map Sources & Symbolism.Barbari, 1500',
		type: 'map',
		cluster: null,
		clusterId: null,
		author: "Jacopo de' Barbari",
		publisher: 'Anton Kolb, Nuremberg',
		date: '1500',
		physical: 'dimensions here',
		detail: 'bird-eyes',
		src: './test-thumbnail.jpg',
		narrative: 'General Introduction to looking closer. Edges of map / framing. Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	},
	{
		id: 2,
		x: 7258, //set to center on full scale version
		y: 4096,	//set to center
		r: 0, // circle or icon of sorts, symbol to draw the eye?
		scale: 5,
		mapName: 'barbari',
		name: 'Perspective Projections.Barbari, 1500',
		type: 'map',
		cluster: null,
		clusterId: null,
		author: "Jacopo de' Barbari",
		publisher: 'Anton Kolb, Nuremberg',
		date: '1500',
		physical: 'dimensions here',
		detail: 'construction',
		src: './test-thumbnail.jpg',
		narrative: 'Seen angles & the import of Mathematical Construction. consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	},
	{
		id: 3,
		x: 7799, //set to center on full scale version
		y: 5823,	//set to center
		r: 0, // circle or icon of sorts, symbol to draw the eye?
		scale: 5,
		mapName: 'barbari',
		name: 'Foreground Frames.Barbari, 1500',
		type: 'map',
		cluster: null,
		clusterId: null,
		author: "Jacopo de' Barbari",
		publisher: 'Anton Kolb, Nuremberg',
		date: '1500',
		physical: 'dimensions here',
		detail: 'construction',
		src: './test-thumbnail.jpg',
		narrative: 'Seen angles & the import of Mathematical Construction. consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	},
	{
		id: 4,
		x: 7799, //set to center on full scale version
		y: 5823,	//set to center
		r: 0, // circle or icon of sorts, symbol to draw the eye?
		scale: 4,
		mapName: 'fracho',
		name: 'Iconic Imagery.Francho, (date)',
		type: 'map',
		cluster: null,
		clusterId: null,
		author: "Giacomo Frácho",
		publisher: 'Anton Kolb, Nuremberg',
		date: '1500',
		physical: 'dimensions here',
		detail: 'construction',
		src: './test-thumbnail.jpg',
		narrative: 'Churches as icons, in harbor vs. marriage & exaggeration of towers of Murlano. consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	},
	{
		id: 5,
		x: 8192, //set to center on full scale version
		y: 4096,
		r: 0, // circle or icon of sorts, symbol to draw the eye?
		scale: 3,
		mapName: 'fracho',
		name: 'Edges, Enclosure, Context.Francho, (date)',
		type: 'map',
		cluster: null,
		clusterId: null,
		author: "Giacomo Frácho",
		publisher: 'Anton Kolb, Nuremberg',
		date: '1500',
		physical: 'dimensions here',
		detail: 'construction',
		src: './test-thumbnail.jpg',
		narrative: 'Placement & Context of metropolitan/empire. consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	},
	{
		id: 6,
		x: 8192, //set to center on full scale version
		y: 4096,
		r: 0, // circle or icon of sorts, symbol to draw the eye?
		scale: 3,
		mapName: 'section',
		name: 'Grand Canal Views.Unknown (date)',
		type: 'map',
		cluster: null,
		clusterId: null,
		author: "Giacomo Frácho",
		publisher: 'Anton Kolb, Nuremberg',
		date: '1500',
		physical: 'dimensions here',
		detail: 'construction',
		src: './test-thumbnail.jpg',
		narrative: 'Placement & Context of metropolitan/empire. consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	},
	{
		id: 7,
		x: 8192, //set to center on full scale version
		y: 4096,
		r: 0, // circle or icon of sorts, symbol to draw the eye?
		scale: 5,
		mapName: 'section',
		name: 'Other Sections. Unknown (date)',
		type: 'map',
		cluster: null,
		clusterId: null,
		author: "Giacomo Frácho",
		publisher: 'Anton Kolb, Nuremberg',
		date: '1500',
		physical: 'dimensions here',
		detail: 'construction',
		src: './test-thumbnail.jpg',
		narrative: 'Talk of Other Symbolic views. Open question of Symbolic geography consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	},
	{
		id: 8,
		x: 6369, //set to center on full scale version
		y: 3281,
		r: 0, // circle or icon of sorts, symbol to draw the eye?
		scale: 5,
		mapName: 'barbari',
		name: 'Other. Other',
		type: 'map',
		cluster: null,
		clusterId: null,
		author: "Jacopo de' Barbari",
		publisher: 'Anton Kolb, Nuremberg',
		date: '1500',
		physical: 'dimensions here',
		detail: 'construction',
		src: './test-thumbnail.jpg',
		narrative: 'Talk of Other Symbolic views. Open question of Symbolic geography consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	},


];

export default mapSites;
