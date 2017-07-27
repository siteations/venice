const mapNames= {
	barbari: './img/barbari',
	bertilli: './img/bertilli',
	bertilliAligned: './img/bertilliAligned',
	bordone: './img/bordone',
	florimi: './img/florimi',
	florimiAligned: './img/florimiAligned',
	forlani: './img/forlani',
	forlaniAligned: './img/forlaniAligned',
	merlo: './img/merlo',
	none: 'no map',
}

//Georg Braun; Frans Hogenberg: Civitates Orbis Terrarum, Band 1, 1572 (Ausgabe Beschreibung vnd Contrafactur der vornembster Stät der Welt, Köln 1582; [VD16-B7188)

//Map of Venice contained in the Libro di Benedetto Bordone published in 1528

//Giacomo Frácho - Universitätsbibliothek Salzburg, G 66 III (aus dem ehemaligen Wolf-Dietrich-Klebeband Städtebilder; alte Signatur: V.4.A.14);

//carte de Venis au XVe siecle par Erhardum Reüwich de Trajecto et Bernhard von Breydenbach

const mapSites = [
// presuming auto start, just click to advance, update tour
	{
		id: 1,
		x: 8192, //set to center on full scale version - no map just
		y: 4096,
		r: 0,
		scale: 3,
		mapName: 'none',
		name: "Giovanni Merlo's 1676 View, An Introduction",
		type: 'map',
		cluster: null,
		clusterId: null,
		author: 'Giovanni Merlo',
		title: 'Vero e real disegno della inclita cita di Venetia',
		publisher: '[Venice] : Stefano Scolari forma in Venetia a S. Zulian',
		date: '1676',
		physical: '1 view : hand col. ; 780 x 1,594 mm. (neat line) on 3 composite sheets.',
		detail: '',
		src: './merlo-1.jpg',
		narrative: 'Giovanni Merlo’s 1676 view of Venice is one of ten large plans and views of Venice the Newberry possesses in its Franco Novacco map collection, acquired in 1967, several of which are featured in the resource. Merlo’s map is the only one among them that is colored. Maps were rarely printed in color before the nineteenth century. Sixteenth-century Italian publishers seemed to have preferred to sell their maps uncolored, but by the late seventeenth century maps and views were commonly (though not universally) hand colored throughout Europe to enhance their attractiveness and to help clarify many of their details. Here, for example, important buildings such as the Doge’s Palace, major churches and the famous campanile in the Piazza San Marco have blue colored roofs to distinguish them from a sea of red. The green color of gardens and other open spaces helps them stand out within an otherwise densely built-up urban landscape.'
	},
	{
		id: 2,
		x: 4184, //facade view
		y: 2336,	//near ghetto at nw
		r: 0,
		scale: 5,
		mapName: 'none',
		name: "Merlo's Bird's Eye Perspectives",
		type: 'map',
		cluster: null,
		clusterId: null,
		author: 'Giovanni Merlo',
		title: 'Vero e real disegno della inclita cita di Venetia',
		publisher: '[Venice] : Stefano Scolari forma in Venetia a S. Zulian',
		date: '1676',
		physical: '1 view : hand col. ; 780 x 1,594 mm. (neat line) on 3 composite sheets.',
		detail: '',
		src: './merlo-2.jpg',
		narrative: 'Merlo’s view emerged from ancient form of urban representation, the bird’s-eye or perspective view, which depicts a city as if seen from a height that neither the artist nor the viewer could have achieved bodily, but could only imagine. In contrast to an orthographic plan, which imagines a city as seen from directly overhead, the perspective view allows readers to see structures and other topographic features in simulated three dimensions. One sees the facades of buildings as someone walking Venice’s streets or floating on its canals would see them <*>. Simultaneously, the heightened perspective allows the viewer grasp the city in its entirety, and so to understand its geography and layout. All is achieved through the art of perspectival representation, which lends realism to the image. But close examination and comparison with earlier views of Venice shows that the image has been manipulated to promote specific ideas about the city and highlight specific detail. '
	},
	{
		id: 3,
		x: 8192, //set to center on full scale version - barbari
		y: 4096,
		r: 0,
		scale: 3,
		mapName: 'barbari',
		name: "Barbari's Woodcut of 1500",
		type: 'map',
		cluster: null,
		clusterId: null,
		author: "Jacopo de' Barbari",
		title: 'La Pianta di Venezia di Jacopo de’ Barbari',
		publisher: '[Venice : Anton Kolb?]',
		date: '1500',
		physical: '1 view on 6 sheets : woodcut ; 1,345 x 2,818 mm.',
		detail: '',
		src: './',
		narrative: 'The genealogy of Merlo’s view can be traced in a direct line from Jacopo de Barbari’s magnificent woodcut view of 1500. Barbari’s Venetie [at Venice] was in its time the largest printed plan of any European city yet printed, and is arguably among the most important urban images published in any century. It was printed on six large sheets, which when assembled made an image 52.3 × 109.3 in. The image recalls the Renaissance architectural fashion of fixing large plans of cities and maps of parts of the world into dedicated rooms and courtyards in palaces and public buildings, embodying the worldly and religious power and reach of their occupants. '
	},
	{
		id: 4,
		x: 7073, //mercury close
		y: 1599,
		r: 0,
		scale: 5,
		mapName: 'barbari',
		name: "Barbari's Symbols of Wealth & Power",
		type: 'map',
		cluster: null,
		clusterId: null,
		author: "Jacopo de' Barbari",
		title: 'La Pianta di Venezia di Jacopo de’ Barbari',
		publisher: '[Venice : Anton Kolb?]',
		date: '1500 ',
		physical: '1 view on 6 sheets : woodcut ; 1,345 x 2,818 mm.',
		detail: '',
		src: './',
		narrative: "One theory holds that the publisher Anton Kolb may have intended Barbari's view to be distributed to outlying Venetian territories as a reminder of Venice’s wealth and power, though any observer is certain to have gotten this message. An image of the Pagan god of commerce, Mercury, looks down upon the city with an inscription declaring his favor upon the great emporium."
	},
	{
		id: 5,
		x: 6773, //neptune close
		y: 5605,	//
		r: 0,
		scale: 5,
		mapName: 'barbari',
		name: "Barbari's Symbols of the Sea",
		type: 'map',
		cluster: null,
		clusterId: null,
		author: "Jacopo de' Barbari",
		title: 'La Pianta di Venezia di Jacopo de’ Barbari',
		publisher: '[Venice : Anton Kolb?]',
		date: '1500 ',
		physical: '1 view on 6 sheets : woodcut ; 1,345 x 2,818 mm.',
		detail: '',
		src: './',
		narrative: "At bottom center, Neptune rises from the waters of the harbor in testimony to its naval strength. The eight anthropomorphized winds blustering about the edge of the image underscore that Venice’s trade extends in all directions."
	},
	{
		id: 6,
		x: 6792, //san marco, close
		y: 4380,	//
		r: 0, //
		scale: 5,
		mapName: 'barbari',
		name: 'Common Iconic Focus on San Marco',
		type: 'map',
		cluster: null,
		clusterId: null,
		author: "Jacopo de' Barbari",
		title: 'La Pianta di Venezia di Jacopo de’ Barbari',
		publisher: '[Venice : Anton Kolb?]',
		date: '1500 ',
		physical: '1 view on 6 sheets : woodcut ; 1,345 x 2,818 mm.',
		detail: '',
		src: './',
		narrative: 'The Barbari and Merlo views share a common perspective typical of early modern images of Venice. The viewer approaches the city as most seafaring travelers would, from slightly east of south. The iconic Piazza San Marco, its campanile, the Doge’s palace, and the Basilica San Marco are the focal point of the image. '
	},
	{
		id: 7,
		x: 5792, //san marco, mid
		y: 4280,	//
		r: 0, //
		scale: 4,
		mapName: 'barbari',
		name: 'Following the Grand Canal',
		type: 'map',
		cluster: null,
		clusterId: null,
		author: "Jacopo de' Barbari",
		title: 'La Pianta di Venezia di Jacopo de’ Barbari',
		publisher: '[Venice : Anton Kolb?]',
		date: '1500 ',
		physical: '1 view on 6 sheets : woodcut ; 1,345 x 2,818 mm.',
		detail: '',
		src: './',
		narrative: 'The ancient commercial center of the Rialto (with its famous bridge) are slightly to the left of center, and the harbor, chock-a-block with oversized trading vessels and forming the entrance to the Grand Canal.'
	},
	{
		id: 8,
		x: 7373, //mercury far
		y: 2399,
		r: 0,
		scale: 4,
		mapName: 'barbari',
		name: 'Showing Earlier Extents of Venetian Territory',
		type: 'map',
		cluster: null,
		clusterId: null,
		author: "Jacopo de' Barbari",
		title: 'La Pianta di Venezia di Jacopo de’ Barbari',
		publisher: '[Venice : Anton Kolb?]',
		date: '1500 ',
		physical: '1 view on 6 sheets : woodcut ; 1,345 x 2,818 mm.',
		detail: '',
		src: './',
		narrative: 'This perspective allows the viewer to scan northward across the Venetian Lagoon to the outlying Venetian islands of Murano, Burano, and Torcello, as well as the Venetian controlled mainland, or Terraferma. Barbari’s vision stretches as far as the crest of the Julian Alps, the northern limit of the Republic’s territory.'
	},
	{
		id: 9,
		x: 3219, //Giudecca / Redentore... check this
		y: 5887,
		r: 0,
		scale: 4,
		mapName: 'barbari',
		name: 'And Shifted Focus on the Venetian Shores',
		type: 'map',
		cluster: null,
		clusterId: null,
		author: "Jacopo de' Barbari",
		title: 'La Pianta di Venezia di Jacopo de’ Barbari',
		publisher: '[Venice : Anton Kolb?]',
		date: '1500 ',
		physical: '1 view on 6 sheets : woodcut ; 1,345 x 2,818 mm.',
		detail: '',
		src: './',
		narrative: 'Subsequent images, including Merlo’s, however, narrow the focus to the shoreline. This shift enables Merlo’s view to bring into sharper focus the islands in the foreground: San Giorgio Maggiore, home of the powerful Benedictine Monastery of San Giorgio, and to its left, the connected islands of Giudecca. In contrast to Barbari, Merlo shows the full extent of Giudecca and in greater detail, reflecting the importance of the religious institutions and churches built there between 1500 and 1676, such as Palladio’s Il Redentore church.'
	},
	{
		id: 10,
		x: 6347, //rialto barbari
		y: 3248,
		r: 0,
		scale: 6,
		mapName: 'barbari',
		name: 'Evolving Urban Texture & Printing Technique',
		type: 'map',
		cluster: null,
		clusterId: null,
		author: "Jacopo de' Barbari",
		title: 'La Pianta di Venezia di Jacopo de’ Barbari',
		publisher: '[Venice : Anton Kolb?]',
		date: '1500 ',
		physical: '1 view on 6 sheets : woodcut ; 1,345 x 2,818 mm.',
		detail: '',
		src: './',
		narrative: 'Zooming in on both images in the vicinity of the Rialto brings the virtuosity and attention to detail of both authors into sharp focus. The arrangement of windows, rooftop details, wharfside activity, and the exertions of individual gondoliers may be discerned in both images. Though his image was smaller than Barbari’s, Merlo was able to match detail to detail, thanks to his use of copper engraving, rather than woodcut. At this level of focus, the realism of Merlo’s image is also somewhat superior, thanks to presence of color and Merlo’s greater mastery of the rules of perspectival drawing.'
	},
	{
		id: 11,
		x: 8192, //bordone general
		y: 4096,
		r: 0,
		scale: 3,
		mapName: 'bordone',
		name: "Bordone's Island Views",
		type: 'map',
		cluster: null,
		clusterId: null,
		author: "Benedetto Bordone",
		title: 'Isolario di Benedetto Bordone',
		publisher: 'Venice, N. Zoppoino',
		date: '1534',
		physical: '(fol.). 10 p.l., lxxiiii numb. l : ill. (maps, some double)',
		detail: '',
		src: './',
		narrative: 'Part of the fascination with to early modern publishers and readers—no less in the sixteenth and seventeenth centuries than now—lay in its both miraculous and precarious site on a complex of low-lying islands. Islands held a particular fascination to early modern travel writing and fiction, as exotic little worlds. Thomas More’s Utopia (1516) for example, created a fictitious island to set the scene for its social and political commentary. Books describing the islands of the Aegean Sea had been popular in Italy since the early fifteenth century. In 1528 the Venetian Benedetto Bordon expanded the concept to embrace islands to the east and west newly encountered by Europeans. The concept was capacious enough to include several maps of Venice and its outlying islands, as well as the island city of Tenochtitlan (modern Mexico City), which contemporaries compared to Venice. Though Bordon’s image of Venice was based on Barbari, it differs significantly from it. Structures on the main islands are greatly generalized, but Bordon offers a more expansive view of the entire lagoon. He depicts many small islands ignore by Barbari, identifying them with their most prominent structures, usually churches.'
	},
	{
		id: 12,
		x: 8192, //forlani general
		y: 4096,
		r: 0,
		scale: 3,
		mapName: 'forlani',
		name: "Venice's Prolific Map Production",
		type: 'map',
		cluster: null,
		clusterId: null,
		author: "Paolo Forlani",
		title: 'Venetia',
		publisher: '[Venice] : ex aeneis formis Bolognini Zalterii, M. D. XVI',
		date: '1566',
		physical: '	1 view ; 360 x 731 mm. (neat line), on sheet 444 x 744 mm.',
		detail: '',
		src: './',
		narrative: 'In the middle decades of the sixteenth Italy, and specifically publishers and cartographers based in Rome and Venice, were the preeminent producers of maps and views in Europe. Paolo Forlani was among the most prolific of the Roman publishers. Forlani’s 1566 plan is one of several derived from a large wall-sized plan published in Venice by Matteo Pagan in 1559. Forlani’s plan, first published in 1565, was sized to fit in a bound folio of maps (what we now call an atlas). Forlani’s version was widely copied by other publishers, including Donato Bertelli, whose version is the next in our sequence. Both plans adopted the practice initiated by Bordon of enclosing Venice within its barrier islands and the coast of Terraferma. The oval shape of this enclosure, however, is more concerned with closing the circle within the space of the page than with actual topography.'
	},
	{
		id: 13,
		x: 6347, //forlani rialto (alt on san marco)
		y: 3248,
		r: 0,
		scale: 5,
		mapName: 'forlaniAligned',
		name: "Forlani's Topographic Simplifications",
		type: 'map',
		cluster: null,
		clusterId: null,
		author: "Paolo Forlani",
		title: 'Venetia',
		publisher: '[Venice] : ex aeneis formis Bolognini Zalterii, M. D. XVI',
		date: '1566',
		physical: '	1 view ; 360 x 731 mm. (neat line), on sheet 444 x 744 mm.',
		detail: '',
		src: './',
		narrative: 'The overall image is more geographically expansive, but at the cost of greatly simplifying topographic details. Compare, for example the representation of the Rialto and the Piazza San Marco on either of these maps with those by Barbari and Merlo. As a consequence, the image of Venice that emerges is one dominated by its tallest towers, greatest churches and palaces, its largest piazzas, and its harbors.'
	},
	{
		id: 14,
		x: 8192, //bertelli lists - gen
		y: 4096,
		r: 0,
		scale: 3,
		mapName: 'bertilli',
		name: "Bertilli's Numbered Sites",
		type: 'map',
		cluster: null,
		clusterId: null,
		author: "Donato Bertelli",
		title: 'Venetia',
		publisher: '[Venice] : alla libraria del segno de S. Marco in merzaria Donato Bertelli',
		date: '1570',
		physical: '1 view ; 284 x 584 mm. (neat line), 376 x 585 mm.',
		detail: '',
		src: './',
		narrative: 'Forlani’s and Bertelli’s views both included extensive numbered lists of major sites and structures to be compared with the image, much like city plans in modern guidebooks. Many important places are also labeled on the plan.'
	},
	{
		id: 15,
		x: 8408, //bertelli focus on lido
		y: 6284,
		r: 0,
		scale: 4, //maybe 4
		mapName: 'bertilliAligned',
		name: "Bertilli's Lagoon Islands",
		type: 'map',
		cluster: null,
		clusterId: null,
		author: "Donato Bertelli",
		title: 'Venetia',
		publisher: '[Venice] : alla libraria del segno de S. Marco in merzaria Donato Bertelli',
		date: '1570',
		physical: '1 view ; 284 x 584 mm. (neat line), 376 x 585 mm.',
		detail: '',
		src: './',
		narrative: 'Here, as in Bordon, the minor islands in the lagoon are exaggerated in size. This is especially true of the small islands in the foreground between San Giorgio Maggiore and the Lido. These islands were ideal locations for religious orders, which valued isolation, and the hospital of Lazaretto Vecchio, a hospital for plague victims and lepers.'
	},
	{
		id: 16,
		x: 8192, //florimi gene
		y: 4096,
		r: 0,
		scale: 3,
		mapName: 'florimi',
		name: "Florimi's Procession Scenes",
		type: 'map',
		cluster: null,
		clusterId: null,
		author: "Matteo Florimi.",
		title: 'Venetia',
		publisher: '[Siena?] : Matteo Florimi formis,',
		date: '1597',
		physical: '1 view ; 291 x 508 mm. (neat line), on sheet remargined to 451 x 591 mm.',
		detail: '',
		src: './',
		narrative: 'Matteo Florimi’s view of Venice from the end of the sixteenth century is similar in composition to the Forlani and Bertelli plans, from which it derived. The most significant difference is its inclusion of three small images at the base of the map. At bottom left is the Piazza San Marco; at right, the Rialto Bridge. <procession>.'
	},
	{
		id: 17,
		x: 6400, //florimi plaza detail
		y: 4096,
		r: 0,
		scale: 5,
		mapName: 'florimiAligned',
		name: "Florimi's Urban Simplifications",
		type: 'map',
		cluster: null,
		clusterId: null,
		author: "Matteo Florimi.",
		title: 'Venetia',
		publisher: '[Siena?] : Matteo Florimi formis,',
		date: '1597',
		physical: '1 view ; 291 x 508 mm. (neat line), on sheet remargined to 451 x 591 mm.',
		detail: '',
		src: './',
		narrative: 'Despite the passage of time and the changes to the city they document, the Merlo and Barbari views seem more similar to each other than to any of the intermediate renderings of the city. The simplification present on the later sixteenth century plans, while making the city and its surroundings more legible, also made the city seem more open than it actually was (and is), diminishing the sense of density, vibrancy, and activity that impresses the reader of the Barbari and Merlo plans.'
	},


];

export default mapSites;
