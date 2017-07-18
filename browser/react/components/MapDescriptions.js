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

    let obj = this.props.map.mapSite;

  	return (
  	     <div className="pad10" style={{overflowY:'scroll', overflowX:'hidden', height: `${this.props.map.windowSize[1]*.175}px`}}>
          <div className="row ">
            <div className="col-md-3">
				    <h5 className="BornholmSandvig pad10">
              {obj.name.split('.')[1]}
              </h5>
            </div>
            <div className="col-md-9">
              <h5>
                <span className="Trenda-Bold">{obj.author}, {obj.date}</span>,
                <span className=""> {obj.publisher} {obj.physical}
                </span>
              </h5>
            </div>
          </div>

            <div className="row">
              <div className="col-md-3 center-block text-center">
                <div className="bIcon text-center inlineBlock" ><img src={obj.src} style={{borderRadius: '5px'}}/></div>
                <span>{obj.detail}</span>
              </div>
              <div className="col-md-9">
    				    <p>{obj.narrative}</p>
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
