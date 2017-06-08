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
(i.e. similar to [storyMap](https://storymap.knightlab.com/), but with animated/non-animated browsing options and customized clustering/highlights/symbols of info/imagery/markers)

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
+ largely resolved. refactoring in progress...
### Back End 
+ Due to Newberry Library's hosting set-up (a version on CentOS 6), the back-end is set up to work with MySQL 5.5... (i.e. an older version). Any revision of the code for independent use will simply include sample json/csv data and the ability to read from files vs. generic api calls.

# Under Active Construction! 

