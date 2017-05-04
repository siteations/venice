

// //-------------------CONSTANTS

//MAP REDUCER

//responding to resizing
export const SET_WINDOW = 'SET_WINDOW';
export const SET_WINOFFSET = 'SET_WINOFFSET';

//local up to global on mapbar clicks
export const SET_ZOOM = 'SET_ZOOM';
export const SET_TILESIZE = 'SET_TILESIZE';
export const SET_OFFSETS = 'SET_OFFSETS';
export const SET_OFFSETS_RESIDUAL ='SET_OFFSETS_RESIDUAL';
export const SET_CENTER = 'SET_CENTER'; // need to write

//navigate to site
//export const SET_CENTER_ZOOM = 'SET_CENTER_ZOOM';
export const SET_CENTER_SCREEN = 'SET_CENTER_SCREEN';


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


//-------------------reducers && initial info

const initMap = {
	windowSize: [2048,1024], //width, height
	windowOffsets: [0,0], //x, y

	currZoom: 3, //map zoom value
	tileSize: 128, //px size
	xyOffsets: [0,0], //x, y
	xyOffsetsR: [0,0], //x, y
	xyCenter: [0,0], //x, y
	focusCenter: [0,0], //x, y

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




