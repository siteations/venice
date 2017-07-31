import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import { setPanelSizing } from '../action-creators/panelActions.js';

import MapSecondary from './MapSecondary.js';
import MapDescriptions from './MapDescriptions.js';

class PanelB extends Component {
	constructor(props) {
        super(props);
        this.state = {

        };
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
                console.log(this.props.map.mapSite);

    return (
         <div className={`whiteBackground ${this.props.baseClass}`} id="panelWin" onAnimationEnd={e=> this.refSize(e)} style={{height:`${this.props.map.windowSize[1]+6}px`, overflow: 'hidden' }}>
            {this.props.sites.specLayer==='maps' &&
            <div>
              <div style={{height: `${this.props.map.windowSize[1]*.06}px`}}>
              <h3 className="BornholmSandvig pad10" >{this.props.map.mapSite.name}</h3>
              </div>
              {this.props.map.mapSite.id > 2 &&
              <div className="whiteBackground">
                <MapSecondary height={.7} width={1} />
              </div>
              }
              {this.props.map.mapSite.id > 2 &&
                <MapDescriptions size="norm" />
              }
              {this.props.map.mapSite.id < 3 &&
                <MapDescriptions size="full" />
              }
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
