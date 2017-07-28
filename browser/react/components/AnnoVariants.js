import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

//---------------------------PRE-DB / PRE-REDUX PLACEHOLDERS---------------------------
import { cirMain, cirMinor, clusterTest, narrativeTest } from '../non-db/cirTest.js';

//--------------------------ANNO FRAMEWORK GEOMETRY------------------------------------

import { spacingFrame } from '../plug-ins/rawDetails.js';

import { getDetailsNarratives } from '../action-creators/siteActions.js';


//-----------------------------------component---------------------------------

const Detail = (props)=>{

  	let clipDetails = props.clipDetails;
  	let details = props.details;
  	let action = props.action;

  	//console.log('here ', clipDetails, details, action);

  	return (
  	      <g>
  	      {details.map((d, i)=>{
  	      		return ( //add in correct syntax here. . .
  	      		<g key={`detail${i}`}>
	    	   				<image xlinkHref={d.srcThumb} x={d.x} y={d.y} width={d.width} height={d.height} clipPath={d.clip} />
					    		{/*<circle stroke="#ffffff" className="circHL" cx={clipDetails[i].cx} cy={clipDetails[i].cy} r={clipDetails[i].r} />*/}
					    		<rect stroke="#ffffff"
                  className="circHL"
                  x={clipDetails[i].x} y={clipDetails[i].y} rx={clipDetails[i].rx} ry={clipDetails[i].ry} width={clipDetails[i].width} height={clipDetails[i].height} id={d.id} onTouchTap={e=> action(e)} onClick={e=> action(e)} />
					    		<text x={d.x-10} y={clipDetails[i].cy} className="textSHLR" fontSize={12} >{d.nameH}</text>
  	      		</g>
  	      		)
  	      	})
  	      }

  				</g>
  				)

};

const mapStateToProps = (state, ownProps) => {
  return {
    map: state.map,
    options: state.options,
    sites: state.sites,
    panel: state.panel,
    }
}

//setZoom, setTile, setOffsets, setCenter, setCenterScreen, setWindowSize, setWindowOffset

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     getAllDetailsNarratives : () => {
//       dispatch(getDetailsNarratives ());
//     },
//   }
// }

const DetailOver = connect(mapStateToProps, null)(Detail);

export default DetailOver;
