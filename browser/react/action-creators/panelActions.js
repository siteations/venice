

// //-------------------CONSTANTS


//responding to resizing
export const SET_PANELSIZE = 'SET_PANELSIZE';
export const SET_PANELRATIO = 'SET_PANELRATIO';

export const SET_TITLE = 'SET_TITLE';
export const SET_SUBTITLE = 'SET_SUBTITLE';

export const SET_NARROBJ = 'SET_NARROBJ';
export const SET_IMAGESIZES = 'SET_IMAGESIZES';
//export const SET_BIBLIOALL ='SET_BIBLIOALL';


//-------------------ACTION CREATORS - vanilla loading of information
export const setPanelSize = (panelSize) => {
	return {
		type: SET_PANELSIZE,
		panelSize
	};
};

export const setPanelRatio = (panelRatio) => {
	return {
		type: SET_PANELRATIO,
		panelRatio
	};
};

export const setTitle = (title) => {
	return {
		type: SET_TITLE,
		title
	};
};

export const setSubtitle = (subtitle) => {
	return {
		type: SET_SUBTITLE,
		subtitle
	};
};

export const setNarrObj = (narrObj) => {
	return {
		type: SET_NARROBJ,
		narrObj
	};
};

export const setImageSizes = (sizes) => {
	return {
		type: SET_IMAGESIZES,
		sizes,
	};
};

// export const setBiblioAll = (biblio) => {
// 	return {
// 		type: SET_BIBLIOALL,
// 		biblio,
// 	}
// }


//-------------------reducers && initial info

const initPanel = {
	panelSize: [0,0], //width, height
	panelRatio: 1, // width/height

	title: '',
	subtitle: '',

	imageWidth: 0,
	narrObj: {},
	// biblioAll: [],
};


export const panelReducer = (prevState = initPanel, action) => {
	let newState = Object.assign({}, prevState);

	switch(action.type){

	case SET_PANELSIZE:
		newState.panelSize = action.panelSize;
		break;

	case SET_PANELRATIO:
		newState.panelRatio = action.panelRatio;
		break;

	case SET_TITLE:
		newState.title = action.title;
		break;

	case SET_SUBTITLE:
		newState.subtitle = action.subtitle;
		break;

	case SET_IMAGESIZES:
		newState.imageWidth = action.sizes;
		break;

	case SET_NARROBJ:
		newState.narrObj = action.narrObj;
		break;

	// case SET_BIBLIOALL:
	// 	newState.biblioAll = action.biblio;
	// 	break;

	default:
		return prevState;
	}

	return newState;

};


/* ------------       DISPATCHERS     ------------------ */

// optimistic
export const setTitlesCore = (titles) => dispatch => {
  dispatch(setTitle(titles[0]));
  dispatch(setSubtitle(titles[1]));
};

export const setNarr = (narr) => dispatch => {
	dispatch(setNarrObj(narr));;
}

export const setPanelSizing = (size, ratio) => dispatch => {
	dispatch(setPanelSize(size));
	dispatch(setPanelRatio(ratio));
	dispatch(setImageSizes(size[0]-20));
}

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




