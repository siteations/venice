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
                //<MapSecondary height={1} width={1} />

    return (
         <div className={this.props.baseClass} id="panelWin" onAnimationEnd={e=> this.refSize(e)} style={{height:`${this.props.map.windowSize[1]+6}px`}}>
            {this.props.sites.specLayer==='maps' &&
              <div>
              <div className="whiteBackground">
                <MapSecondary height={.8} width={1} />
              </div>
              <h2 className="BornholmSandvig" >Cartographic comparisons</h2>
              <h4>details</h4>
              <p>elaborations</p>
              </div>
          }


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
