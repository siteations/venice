import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import  mapSites  from '../non-db/mapSites.js';
import  printSites  from '../non-db/printSites.js';

import { setPanelSizing } from '../action-creators/panelActions.js';
import { setMapTours, setMapSiteOne } from '../action-creators/mapActions.js'

import MapSecondary from './MapSecondary.js';
import MapDescriptions from './MapDescriptions.js';
import Panel from './Panel.js';

class PanelB extends Component {
	constructor(props) {
        super(props);
        this.state = {

        };
  }

  componentDidMount() {
      window.addEventListener("resize", this.refSizeP);
      this.refSize();

      this.props.setMapTours(this.props.sites.specLayer);
      var site;
      (this.props.sites.specLayer==='maps')? site = mapSites[0] : site = printSites[0];
      this.props.setMapSiteOne(site);
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
         <div className={`whiteBackground ${this.props.baseClass}`} id="panelWin" onAnimationEnd={e=> this.refSize(e)} style={{height:`${this.props.map.windowSize[1]+6}px`, overflow: 'hidden' }}>
            {this.props.sites.specLayer==='maps' &&
            <div>
              <div style={{height: `${this.props.map.windowSize[1]*.06}px`}}>
              <h3 className="BornholmSandvig pad10" >{this.props.map.mapSite.name}</h3>
              </div>
              {this.props.map.mapSite.id > 2 && this.props.sites.specLayer==='maps' &&
              <div className="whiteBackground">
                <MapSecondary height={.7} width={1} />
              </div>
              }
              {this.props.map.mapSite.id > 2 && this.props.sites.specLayer==='maps' &&
                <MapDescriptions size="norm" />
              }
              {this.props.map.mapSite.id < 3 && this.props.sites.specLayer==='maps' &&
                <MapDescriptions size="full" />
              }
              </div>
          }
          {this.props.sites.specLayer==='prints' &&
            <div>
              <div style={{padding: '10px', overflowY: 'auto'}}>
              {this.props.map.mapSite.id > 2 &&
                <Panel />
              }
              {this.props.map.mapSite.id < 3 &&
                <p>intro here.</p>
              }
              </div>
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
    setMapTours: (type) =>{
      dispatch(setMapTours(type));
    },
    setMapSiteOne: (site) => {
      dispatch(setMapSiteOne(site));
    },

  }
}

const PanelOps = connect(mapStateToProps, mapDispatchToProps)(PanelB);

export default PanelOps;
