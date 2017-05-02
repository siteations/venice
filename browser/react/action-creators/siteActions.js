//-------------------CONSTANTS

//SITE REDUCER

//layers all & selected, sites all & selected
export const GET_ALL_SITES = 'GET_ALL_SITES';

export const GET_CURR_SITE = 'GET_CURR_SITE';
export const GET_CURR_SITEZOOM = 'GET_CURR_SITEZOOM';
export const GET_CURR_DETAIL = 'GET_CURR_DETAIL';
export const GET_CURR_NARR = 'GET_CURR_NARR';
export const GET_CURR_IMGS = 'GET_CURR_IMGS';

//layers all & selected for filteration
export const GET_All_LAYERS= 'GET_All_LAYERS';
export const GET_CURR_LAYERS= 'GET_CURR_LAYERS';

//-------------------ACTION CREATORS - vanilla loading of information
export const getAllSites = (sites) => {
	return {
		type: GET_All_SITES,
		sites: sites
	};
};

export const getCurrSite = (site) => {
	return {
		type: GET_CURR_SITE,
		site: site
	};
};

export const getCurrSiteZoom = (sites) => {
	return {
		type: GET_CURR_SITEZOOM,
		sites: sites
	};
};

export const getCurrDetail = (detailId) => {
	return {
		type: GET_CURR_DETAIL,
		detail: detailId
	};
};

export const getCurrNarr = (narrative) => {
	return {
		type: GET_CURR_NARR,
		narrative: narrative
	};
};

export const getCurrImgs = (images) => {
	return {
		type: GET_CURR_IMGS,
		imgs: images
	};
};

export const getAllLayers = (layers) => {
	return {
		type: GET_All_LAYERS,
		layers: layers
	};
};

export const getCurrLayers = (layers) => {
	return {
		type: GET_CURR_LAYERS,
		layers: layers
	};
};

//-------------------reducers && initial info
const initSites = {
	allSites:[], //array of objects

	currSite: {}, //row of data
	currSiteZoom: [], //secondary object arrays
	currDetail: 0, //main vs. peripheral detail for panel (id of site)
	currNarrative: {}, //narratives & captions
	currImages: {}, //links for panel images

	allLayers:[], //arr of strings
	currLayers: [], //arr of strings

};

export const siteReducer = (prevState = initSites, action) => {
	let newState = Object.assign({}, prevState);

	switch(action.type){

	case GET_ALL_SITES:
		newState.allSites = action.sites;
		break;

	case GET_CURR_SITE:
		newState.currSite = action.site;
		break;

	case GET_CURR_SITEZOOM:
		newState.currSiteZoom = action.sites;
		break;

	case GET_CURR_DETAIL:
		newState.currDetail = action.detail;
		break;

	case GET_CURR_NARR:
		newState.currNarrative = action.narrative;
		break;

	case GET_CURR_IMGS:
		newState.currImages = action.imgs;
		break;

	case GET_All_LAYERS:
		newState.allLayers = action.layers;
		break;

	case GET_CURR_LAYERS:
		newState.currLayers = action.layers;
		break;

	default:
		return prevState;
	}

	return newState;

};

//-------------------COMPLEX ACTION CALLS AND AXIOS INFO...
