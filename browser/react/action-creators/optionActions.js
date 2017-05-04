//OPTIONS REDUCER

//layer view options
export const SET_COLOR = "SET_COLOR";
export const SET_ANNO = "SET_ANNO";
export const SET_ANNO_ZOOM = "SET_ANNO_ZOOM";
export const SET_KEY_LIST = "SET_KEY_LIST";
export const SET_KEY_FOCUS = "SET_KEY_FOCUS";

// //-------------------ACTION CREATORS - vanilla loading of information
export const setColor = (bool) => {
	return {
		type: SET_COLOR,
		color: bool
	};
};

export const setAnno = (bool) => {
	return {
		type: SET_ANNO,
		anno: bool
	};
};

export const setAnnoZoom = (bool) => {
	return {
		type: SET_ANNO_ZOOM,
		annoZoom: bool
	};
};

export const setKeyList = (keys) => {
	return {
		type: SET_KEY_LIST,
		keys: keys
	};
};

export const setKeyFocus = (keyId) => {
	return {
		type: SET_KEY_FOCUS,
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

	case SET_COLOR:
		newState.color = action.color;
		break;

	case SET_ANNO:
		newState.anno = action.anno;
		break;

	case SET_ANNO_ZOOM:
		newState.annoZoom = action.annoZoom;
		break;

	case SET_KEY_LIST:
		newState.currKeyList = action.keys;
		break;

	case SET_KEY_FOCUS:
		newState.currKeyFocus = action.keyId;
		break;

	default:
		return prevState;
	}

	return newState;

};


/* ------------       DISPATCHERS     ------------------ */

// optimistic
export const updateColor = bool => dispatch => {
  dispatch(setColor(bool));
};

export const updateAnno = bool => dispatch => {
  dispatch(setAnno(bool));
};

export const updateDetail = bool => dispatch => {
  dispatch(setAnnoZoom(bool));
};
