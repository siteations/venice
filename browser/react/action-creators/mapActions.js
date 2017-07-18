import mapSites from '../pre-db/mapSites.js';

// //-------------------CONSTANTS

//MAP REDUCER

//responding to resizing
export const SET_WINDOW = 'SET_WINDOW';
export const SET_WINOFFSET = 'SET_WINOFFSET';
export const SET_PANELOFFSET = 'SET_PANELOFFSET';

//local up to global on mapbar clicks
export const SET_ZOOM = 'SET_ZOOM';
export const SET_TILESIZE = 'SET_TILESIZE';
export const SET_OFFSETS = 'SET_OFFSETS';
export const SET_OFFSETS_RESIDUAL ='SET_OFFSETS_RESIDUAL';
export const SET_CENTER = 'SET_CENTER'; // need to write

//navigate to site
//export const SET_CENTER_ZOOM = 'SET_CENTER_ZOOM';
export const SET_CENTER_SCREEN = 'SET_CENTER_SCREEN';

export const SET_MAPTOUR_ALL = 'SET_MAPTOUR_ALL';
export const SET_MAPSITE = 'SET_MAPSITE';


//PANEL REDUCER ? FOR OPEN/CLOSED

//NAVIGATION REDUCER ? FOR BOTTOM THUMBNAILS

//-------------------ACTION CREATORS - vanilla loading of information
export const setWindowSize = (windowSize) => {
	return {
		type: SET_WINDOW,
		windowSize
	};
};

export const setWindowOffsets = (windowOff) => {
	return {
		type: SET_WINOFFSET,
		windowOff
	};
};

export const setPanelOffset = (panelOff) => {
	return {
		type: SET_PANELOFFSET,
		panelOff
	};
};

export const setZoom = (zoom) => {
	return {
		type: SET_ZOOM,
		zoom
	};
};

export const setTile = (tilesize) => {
	return {
		type: SET_TILESIZE,
		tilesize
	};
};

export const setOffsets = (offsets) => {
	return {
		type: SET_OFFSETS,
		offsets
	};
};

export const setOffsetsR = (offsets) => {
	return {
		type: SET_OFFSETS_RESIDUAL,
		offsets
	};
};

export const setCenter = (center) => {
	return {
		type: SET_CENTER,
		center
	};
};

export const setCenterScreen = (centerScr) => {
	return {
		type: SET_CENTER_SCREEN,
		centerScr
	};
};

export const setMapTourAll = () => {
	return {
		type: SET_MAPTOUR_ALL,
		mapSites
	};
};

export const setMapSite = (site) => {
	return {
		type: SET_MAPSITE,
		site
	};
};


//-------------------reducers && initial info

const initMap = {
	windowSize: [1024,512], //width, height
	windowOffsets: [0,0], //x, y
	panelOffset:0,

	currZoom: 3, //map zoom value
	tileSize: 128, //px size
	xyOffsets: [0,0], //x, y
	xyOffsetsR: [0,0], //x, y
	xyCenter: [0,0], //x, y
	focusCenter: [0,0], //x, y

	mapTourAll: mapSites,
	mapSite: mapSites[0],

};



export const mapReducer = (prevState = initMap, action) => {
	let newState = Object.assign({}, prevState);

	switch(action.type){

	case SET_WINDOW:
		newState.windowSize = action.windowSize;
		break;

	case SET_WINOFFSET:
		newState.windowOffsets = action.windowOff;
		break;

	case SET_PANELOFFSET:
		newState.panelOffset = action.panelOff;
		break;

	case SET_ZOOM:
		newState.currZoom = action.zoom;
		break;

	case SET_TILESIZE:
		newState.tileSize = action.tilesize;
		break;

	case SET_OFFSETS:
		newState.xyOffsets = action.offsets ;
		break;

	case SET_OFFSETS_RESIDUAL:
		newState.xyOffsetsR = action.offsets ;
		break;

	case SET_CENTER:
		newState.focusCenter = action.center;
		break;

	case SET_CENTER_SCREEN:
		newState.xyCenter = action.centerScr;
		break;

	case SET_MAPSITE:
		console.log(action.site);
		newState.mapSite = action.site;
		break;

	case SET_MAPTOUR_ALL:
		newState.mapTourAll = action.mapSites;
		break;

	default:
		return prevState;
	}

	return newState;

};


/* ------------       DISPATCHERS     ------------------ */

// optimistic
export const updateZoom = zoom => dispatch => {
  dispatch(setZoom(zoom));
};

export const updateOffsets = offsets => dispatch => {
  dispatch(setOffsets(offsets));
};

export const updateOffsetsResidual = offsets => dispatch => {
  dispatch(setOffsetsR(offsets));
};

export const updatePanelOffset = offset => dispatch => {
  dispatch(setPanelOffset(offset));
};

export const updateTile = tiles => dispatch => {
  dispatch(setTile(tiles));
};

export const updateCenter = cent => dispatch => {
  dispatch(setCenter(cent));
};

export const updateCenterScreen = centScr => dispatch => {
  dispatch(setCenterScreen(centScr));
};

export const updateWindow = size => dispatch => {
  dispatch(setWindowSize(size));
};

export const updateWindowOffsets = offsets => dispatch => {
  dispatch(setWindowOffsets(offsets));
};

export const setMapTours = () => dispatch => {
	dispatch(setMapTourAll());
};

export const setMapSiteOne = (site) => dispatch => {
	dispatch(setMapSite(site));
};
