import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

//---------------------------PRE-DB / PRE-REDUX PLACEHOLDERS---------------------------
import { cirMain, cirMinor, clusterTest, narrativeTest } from '../pre-db/cirTest.js';

//--------------------------ANNO FRAMEWORK GEOMETRY------------------------------------

import { spacingFrame } from '../plug-ins/rawDetails.js';

import { getDetailsNarratives } from '../action-creators/siteActions.js';


//-----------------------------------component---------------------------------

class Detail extends Component{
	constructor(props) {
        super(props);
        this.state = {}
  }

  componentDidMount() {
        this.props.getAllDetailsNarratives();
  }



  render() {
  	//<DetailOver currSite={this.state.labelS} shownSites={cirNew} />
  	let {clipDetails, details} = spacingFrame(this.props.map.windowSize, this.props.currSite, this.props.sites.genDetails);

  	console.log('for zoom', details, clipDetails);

  	return (
  	      <g>
  	      {clipDetails.map(d=>{
  	      		return (
  	      		<def>
  	      			<clipPath id="d.id">
	    	   				<circle stroke="#000000" cx={d.cx} cy={d.cy} r={d.r} />
					    	</clipPath>
  	      		</def>
  	      		)
  	      	})
  	      }
  	      {details.map((d, i)=>{
  	      		return ( //add in correct syntax here. . .
  	      		<g>
	    	   				<image xlinkHref='' x={d.x} y={d.y} width={d.width} height={d.height} clipPath={d.clip} />
					    		<circle stroke="#ffffff" cx={clipDetails[i].cx} cy={clipDetails[i].cy} r={clipDetails[i].r} />
  	      		</g>
  	      		)
  	      	})
  	      }

  				</g>
  				)


  }

};

const mapStateToProps = (state, ownProps) => {
  return {
    map: state.map,
    options: state.options,
    sites: state.sites,
    }
}

//setZoom, setTile, setOffsets, setCenter, setCenterScreen, setWindowSize, setWindowOffset

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllDetailsNarratives : () => {
      dispatch(getDetailsNarratives ());
    },
  }
}

const DetailOver = connect(mapStateToProps, mapDispatchToProps)(Detail);

export default DetailOver;
