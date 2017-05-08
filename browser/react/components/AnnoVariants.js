import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

//---------------------------PRE-DB / PRE-REDUX PLACEHOLDERS---------------------------
import { cirMain, cirMinor, clusterTest, narrativeTest } from '../pre-db/cirTest.js';

//--------------------------ANNO FRAMEWORK GEOMETRY------------------------------------

import { spacingFrame } from '../plug-ins/rawDetails.js';

import { getDetailsNarratives } from '../action-creators/siteActions.js';


//-----------------------------------component---------------------------------

const Detail = (props)=>{

  	let clipDetails = props.clipDetails;
  	let details = props.details;

  	console.log('here ', clipDetails, details);

  	return (
  	      <g>
  	      {details.map((d, i)=>{
  	      		return ( //add in correct syntax here. . .
  	      		<g>
	    	   				<image xlinkHref={d.srcThumb} x={d.x} y={d.y} width={d.width} height={d.height} clipPath={d.clip} />
					    		<circle stroke="#ffffff" className="circHL" cx={clipDetails[i].cx} cy={clipDetails[i].cy} r={clipDetails[i].r} />
					    		<text x={d.x-10} y={clipDetails[i].cy} className="textSHLR" fontSize={12} >{d.nameH}</text>
  	      		</g>
  	      		)
  	      	})
  	      }

  				</g>
  				)

};

// const mapStateToProps = (state, ownProps) => {
//   return {
//     map: state.map,
//     options: state.options,
//     sites: state.sites,
//     }
// }

// //setZoom, setTile, setOffsets, setCenter, setCenterScreen, setWindowSize, setWindowOffset

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     getAllDetailsNarratives : () => {
//       dispatch(getDetailsNarratives ());
//     },
//   }
// }

// const DetailOver = connect(mapStateToProps, mapDispatchToProps)(Detail);

export default Detail;
