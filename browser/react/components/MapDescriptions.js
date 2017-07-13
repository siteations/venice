import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';


import { setPanelSizing } from '../action-creators/panelActions.js';

class PanelMap extends Component {
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
  	     <div className="pad10" style={{overflowY:'scroll', overflowX:'hidden', height: `${this.props.map.windowSize[1]*.175}px`}}>
          <div className="row ">
            <div className="col-md-3">
				    <h5 className="BornholmSandvig pad10">
              Author/Map name
              </h5>
            </div>
            <div className="col-md-9">
              <h5>
                <span className="Trenda-Bold">Image: </span>,
                <span className="small"> author <a href=""><em>title</em></a> published, location, page, to be variables from JSON tour
                </span>
              </h5>
            </div>
          </div>

            <div className="row">
              <div className="col-md-3 center-block text-center">
                <div className="bIcon text-center inlineBlock" > grand canal </div>
                <span>site name</span>
              </div>
              <div className="col-md-9">
    				    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    				    <br/>
              </div>
            </div>
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

const MapDescriptions = connect(mapStateToProps, mapDispatchToProps)(PanelMap);

export default MapDescriptions;
