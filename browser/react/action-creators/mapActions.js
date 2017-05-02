

// //-------------------CONSTANTS

//MAP REDUCER

//responding to resizing
export const GET_WINDOW = 'GET_WINDOW';
export const GET_WINOFFSET = 'GET_OFFSETS';

//local up to global on mapbar clicks
export const GET_ZOOM = 'GET_ZOOM';
export const GET_TILESIZE = 'GET_TILESIZE';
export const GET_OFFSETS = 'GET_OFFSETS';
export const GET_CENTER = 'GET_CENTER'; // need to write

//navigate to site
export const SET_CENTER_ZOOM = 'SET_CENTER_ZOOM';
export const SET_CENTER = 'SET_CENTER';


//PANEL REDUCER ? FOR OPEN/CLOSED

//NAVIGATION REDUCER ? FOR BOTTOM THUMBNAILS

//-------------------ACTION CREATORS - vanilla loading of information
export const getWindowSize = (windowSize) => {
	return {
		type: GET_WINDOW,
		windowSize
	};
};

export const getWindowOffset = (windowOff) => {
	return {
		type: GET_WINOFFSET,
		windowOff
	};
};

export const getZoom = (zoom) => {
	return {
		type: GET_ZOOM,
		zoom
	};
};

export const getTile = (tilesize) => {
	return {
		type: GET_TILESIZE,
		tilesize
	};
};

export const getOffsets = (offsets) => {
	return {
		type: GET_OFFSETS,
		offsets
	};
};

export const getCenter = (center) => {
	return {
		type: GET_CENTER,
		center
	};
};

export const setCenterZoom = () => {
	return {
		type: SET_CENTER_ZOOM,
		zoom: 5
	};
};

export const setCenter = (newCent) => {
	return {
		type: SET_CENTER,
		newCent
	};
};


//-------------------reducers && initial info

const initMap = {
	windowSize:[0,0], //width, height
	windowOffsets: [0,0], //x, y

	currZoom: 3, //map zoom value
	tileSize: 256, //px size
	xyOffset: [0,0], //x, y
	xyCenter: [0,0], //x, y
	focusCenter: [0,0], //x, y

};



export const mapReducer = (prevState = initMap, action) => {
	let newState = Object.assign({}, prevState);

	switch(action.type){

	case GET_WINDOW:
		newState.windowSize = action.windowSize;
		break;

	case GET_WINOFFSET:
		newState.windowOffsets = action.windowOff;
		break;

	case GET_ZOOM:
		newState.currZoom = action.zoom;
		break;

	case GET_TILESIZE:
		newState.tileSize = action.tilesize;
		break;

	case GET_OFFSETS:
		newState.xyOffset = action.offsets;
		break;

	case GET_CENTER:
		newState.xyCenter = action.center;
		break;

	case SET_CENTER_ZOOM:
		newState.currZoom = action.zoom;
		break;

	case SET_CENTER:
		newState.focusCenter = action.newCent;
		break;

	default:
		return prevState;
	}

	return newState;

};


//-------------------COMPLEX ACTION CALLS AND AXIOS INFO...

// export const detailVoyage = (voyage) => {

// 	  let start = voyage.Start;
// 	  let end = voyage.End;
// 	  var dates =[];
// 	  for (let i=+start; i<=+end+1; i++){dates.push(i);};

// 	voyage.Dates = dates;
// 	voyage.Length = dates.length;

// 	return dispatch => {
// 		//dispatch(selectVoyage(voyage));
// 	};
// };


// export const filterCrew = (crew) => { //filters crew into this voyage and other voyages

// 	//insert into selectCrew...
// 	let currentCnt=0;
// 	let years =[];

// 	crew.forEach(member=>{
// 		if (+member.Fstart === +member.Dyear){
// 			member.voyage = 'current';
// 			currentCnt++;
// 		} else {
// 		if (years.indexOf(+member.Dyear)===-1){
// 				years.push(+member.Dyear);
// 			};
// 			member.voyage = 'other';
// 		}

// 	})

// 	console.log(years, crew[0].Fstart);
// 	var diff;
// 	if (currentCnt===0 && years.length===1){
// 		crew.forEach(member=> { member.voyage = 'current'; });
// 	} else if (currentCnt===0 && years.length > 1){
// 		diff = years.map(year=> {
// 			return Math.abs(+year - +crew[0].Fstart);
// 		});
// 		var year = years[diff.indexOf(Math.min(...diff))];

// 		crew.forEach(member=>{ if (year === +member.Dyear){
// 			member.voyage = 'current';
// 			//console.log(member.Fstart, member.Dyear);
// 			};
// 		});
// 	};

// 	var crewC = crew.filter(member=> {return member.voyage === 'current';});
// 	var crewr = crew.filter(member=> {return member.voyage !== 'current';});

// 	return dispatch => {
// 		// dispatch(selectCrew(crewC));
// 		// dispatch(otherCrews(crewOther));
// 		// dispatch(extendVoyages(years));
// 	};
// };




