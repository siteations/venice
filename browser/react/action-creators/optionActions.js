//OPTIONS REDUCER

//layer view options
export const GET_COLOR = "GET_COLOR";
export const GET_ANNO = "GET_ANNO";
export const GET_ANNO_ZOOM = "GET_ANNO_ZOOM";
export const GET_KEY_LIST = "GET_KEY_LIST";
export const GET_KEY_FOCUS = "GET_KEY_FOCUS";

// //-------------------ACTION CREATORS - vanilla loading of information
export const getColor = (bool) => {
	return {
		type: GET_COLOR,
		color: bool
	};
};

export const getAnno = (bool) => {
	return {
		type: GET_ANNO,
		anno: bool
	};
};

export const getAnnoZoom = (bool) => {
	return {
		type: GET_ANNO_ZOOM,
		annoZoom: bool
	};
};

export const getKeyList = (keys) => {
	return {
		type: GET_KEY_LIST,
		keys: keys
	};
};

export const getKeyFocus = (keyId) => {
	return {
		type: GET_KEY_FOCUS,
		keyId
	};
};


const initOptions = {
	color: false,
	anno: true,
	annoZoom: true,
	currKeyList: [],
	currKeyFocus: 0, //id of open options
};


export const optionReducer = (prevState = initOptions, action) => {
	let newState = Object.assign({}, prevState);

	switch(action.type){

	case GET_COLOR:
		newState.color = action.color;
		break;

	case GET_ANNO:
		newState.anno = action.anno;
		break;

	case GET_ANNO_ZOOM:
		newState.annoZoom = action.annoZoom;
		break;

	case GET_KEY_LIST:
		newState.currKeyList = action.keys;
		break;

	case GET_KEY_FOCUS:
		newState.currKeyFocus = action.keyId;
		break;

	default:
		return prevState;
	}

	return newState;

};


//-------------------COMPLEX ACTION CALLS AND AXIOS INFO...
