import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import { setPanelSizing } from '../action-creators/panelActions.js';

import MapSecondary from './MapSecondary.js';

class PanelB extends Component {
	constructor(props) {
        super(props);
        this.state = {}
  }

  componentDidMount() {
      window.addEventListener("resize", this.refSizeP);
      this.refSize();
  }

  refSize(e){
  	if (e){e.preventDefault();};
  	let sele = window.document.getElementById("panelWin").attributes[0].ownerElement;
  	let width = sele.clientWidth;
  	let height = sele.clientHeight;
  	this.props.updatePanelSize([width, height], width/height);
  }

  refImages(img){
  	let count = img.split(', ');
  }

  render(){

  	return (
  	     <div className={this.props.baseClass} ref="sizeP" id="panelWin" onAnimationEnd={e=> this.refSize(e)} style={{height:`${this.props.map.windowSize[1]+6}px`}}>
				    <MapSecondary />

				</div>

  	)

  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    map: state.map,
    options: state.options,
    sites: state.sites,
    panel: state.panel,
    }
}

//setZoom, setTile, setOffsets, setCenter, setCenterScreen, setWindowSize, setWindowOffset

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updatePanelSize: (size,ratio) => {
      dispatch(setPanelSizing(size,ratio));
    },
  }
}

const PanelOps = connect(mapStateToProps, mapDispatchToProps)(PanelB);

export default PanelOps;
