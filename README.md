# Religious Life in Venice (circ 1670)

### Exploring the geography and print culture of Venetian Religious Experience, in a tile-based mapping app.

[**PROJECT DEMO**] Coming Soon, see [here](https://vimeo.com/216934957) for prototype 1 (50% front-end interactions).  

# Project Team
### Development 

*Meg Studer* - of [Siteations Studios](www.siteations.com)

### Extended Curatorial/Research members @ [Newberry](https://www.newberry.org/staffdepartment-directory)

#### Exhibitions and Major Projects at the Newberry
*Diane Dillion* - Director,  
*Anne Champagne* - Program Assistant, 
*Christopher D. Fletcher* - Mellon Major Project Fellow

#### Northwestern University 
*Ed Muir* - Clarence L. Ver Steeg Professor of History and Italian

#### Hermon Dunlap Smith Center for the History of Cartography at the Newberry
*James Ackerman* - Director

#### Center for Renaissance Studies at the Newberry
*Lia Markey* - Director

# Core Features

## Customized 'clone' of [leaflet](http://leafletjs.com/)/[react-leaftlet](https://github.com/PaulLeCam/react-leaflet) for large scale, non-projected imagery 
(i.e. similar to [storyMap](https://storymap.knightlab.com/), but with animated/non-animated browsing options and customized clustering of info/imagery/markers)

### Combines svg, map-tiles, and db/redux-store filtering methods for:
+ advanced image filters, 
+ custom clipping masks/area highlights, 
+ and react driven data handling, to move beyond simple point-based site mapping, for non-projected maps.

### (Will include) Administrator-based point editing and addition (CMS) for:
+ scholarly updates/build-out of resource narratives
+ on-going use and/or adaptation for other projects with minimal maintenance time
+ streamlined contributions from the research, curatorial, and development team in the lead-up to fall 2017 exhibitions.

## Front End Overview
to come

## Back End Overview
to come

## Quirks
### Front End
+ The custom map-tiles clock in at about 500MB and are thus being git-ignored. Any attempt to run a clone or fork of this repository would require either that you a) contact me for copies or b) work with your own tiles from a 16384 x 8192 pixel image. 
+ I will likely clean and refine this react-tiling mechanism for independent adoption (and npm installation) in the fall of 2017. It's not for general mapping projects, but specific DH/mixed-artifact dives; some projects don't need to deal with geographic projection and, as a developer, it's a waste of time for all of us to re-build skeletal react adaptations and their plug-ins when tiling is pretty easy. 
+ The worst part of mapping is making your own tiles - I'll be posting a tutorial on some older-school strategies for tile development ([gdal](http://www.gdal.org/), [imagemagick](https://www.imagemagick.org/script/index.php), and [processing](https://processing.org/)) and 'quick start' instruction on installing/running those mechanisms. As a designer, I work in Illustrator when dealing with unprojected images, but anyone could develop a similar workflow for making/exporting custom svg in [Inkscape](https://inkscape.org/en/).
### Back End 
+ Due to Newberry Library's hosting set-up (a version on CentOS 6), the back-end is set up to work with MySQL 5.5... (i.e. an older version). Any revision of the code for independent use will simply include sample json/csv data and the ability to read from files vs. generic api calls.

# Under Active Construction! 

