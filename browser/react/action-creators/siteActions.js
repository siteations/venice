//---------------------------PRE-DB / PRE-REDUX PLACEHOLDERS---------------------------
import { cirMain, clusterTest, narrativeTest} from '../pre-db/cirTest.js';

//-------------------CONSTANTS

//SITE REDUCER

//layers all & selected, sites all & selected
export const GET_ALL_SITES = 'GET_ALL_SITES';
export const GET_FILTERED_SITES = 'GET_FILTERED_SITES'

export const GET_CURR_SITE = 'GET_CURR_SITE';
export const GET_CURR_SITEZOOM = 'GET_CURR_SITEZOOM';
export const GET_CURR_DETAIL = 'GET_CURR_DETAIL';
export const GET_CURR_NARR = 'GET_CURR_NARR';
export const GET_CURR_IMGS = 'GET_CURR_IMGS';

//layers all & selected for filteration
export const GET_All_LAYERS= 'GET_All_LAYERS';
export const GET_CURR_LAYERS= 'GET_CURR_LAYERS';
export const ADD_CURR_LAYERS='ADD_CURR_LAYERS';
export const RESET_CURR_LAYERS='RESET_CURR_LAYERS';
export const SET_HOVER_LAYER='SET_HOVER_LAYER';

//-------------------ACTION CREATORS - vanilla loading of information
export const getAllSites = (sites) => {
	return {
		type: GET_ALL_SITES,
		sites: sites
	};
};

export const getFilteredSites = (sites) => {
	return{
		type: GET_FILTERED_SITES,
		sites
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

export const addCurrLayers = (layer) => {
	return {
		type: ADD_CURR_LAYERS,
		layer: layer
	};
};

export const resetCurrLayers = (layer) => {
	return {
		type: RESET_CURR_LAYERS,
		layer: layer
	};
};

export const addHoverLayer = (layer) => {
	return {
		type: SET_HOVER_LAYER,
		layer: layer
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
	hoverLayer: ' ',

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

	case ADD_CURR_LAYERS:
		let add=action.layer.split(', ');
		let array = newState.currLayers.concat(add);
		newState.currLayers = array;
		break;

	case RESET_CURR_LAYERS:
		let arr = newState.currLayers;
		let layers = action.layer.split(', ');
		layers.forEach(layer=>{
			arr.splice(arr.indexOf(layer),1);
		})
		newState.currLayers = arr;
		break;

	case SET_HOVER_LAYER:
		newState.hoverLayer = action.layer;
		break;

	default:
		return prevState;
	}

	return newState;

};

//-------------------COMPLEX ACTION CALLS AND AXIOS INFO...

export const loadSites = () => dispatch => {
	//rework for axios later
	dispatch(getAllSites(cirMain));
}

export const loadFilteredSites = (layerArr) => dispatch => { //

	let selectSites = cirMain.filter(circle =>{
		return layerArr.indexOf(circle.type)>-1;
	})
	//rework for axios later
	dispatch(getFilteredSites(selectSites));
}

export const loadFiltered = (layers) => dispatch => {
	//set this up grab all on initial mount, but then work with addSelect below to grab pieces at a time...

	dispatch(getCurrLayers(layers));
}

export const loadLayers = () => dispatch => { //loading all

	let cirLayers = [];
	cirMain.forEach(circle=>{
    		if (cirLayers.indexOf(circle.type) === -1){cirLayers.push(circle.type)};
		})
	//rework for axios later
	dispatch(getAllLayers(cirLayers));
}

export const addHoverSite = (layer) => dispatch =>{
	dispatch(addHoverLayer(layer));
}

export const addSelectLayer = (layer) => dispatch => { //add and load
	dispatch(addCurrLayers(layer));
}

export const deleteSelectLayer = (layer) => dispatch => { //add and load
	dispatch(resetCurrLayers(layer));
}

export const addAllLayers = (layers) => dispatch => { //load all/clear all to select
	let cirLayers = [];

	if (layers==='add'){
		cirMain.forEach(circle=>{
    		if (cirLayers.indexOf(circle.type) === -1){cirLayers.push(circle.type)};
		})
	};

	dispatch(getCurrLayers(cirLayers));
}
