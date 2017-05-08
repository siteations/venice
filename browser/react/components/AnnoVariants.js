import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

//---------------------------PRE-DB / PRE-REDUX PLACEHOLDERS---------------------------
import { cirMain, cirMinor, clusterTest, narrativeTest } from '../pre-db/cirTest.js';

//--------------------------ANNO FRAMEWORK GEOMETRY------------------------------------

import { spacingFrame } from '../plug-ins/rawDetails.js';


//-----------------------------------component---------------------------------

class Detail extends Component{
	constructor(props) {
        super(props);
        this.state = {}
  }



  render() {
  	//<DetailOver currSite={this.state.labelS} shownSites={cirNew} />

  	return <div></div>;


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
    // setCurrZoom: (zoom) => {
    //   dispatch(updateZoom(zoom));
    // },
  }
}

const DetailOver = connect(mapStateToProps, mapDispatchToProps)(Detail);

export default DetailOver;
