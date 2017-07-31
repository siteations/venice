import React, {Component} from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import Header from './Header.js';
import Footer from './Footer.js';
import MapBar from './MapBar.js';
import MapSVG from './Mapd3.js';
import Panel from './Panel.js';
import PanelOps from './PanelOps.js';
import MapOptions from './MapOptions.js';
import Nav from './Nav.js';
import Header2 from './Header2.js';

import {Preload} from 'react-preload';
//import {tilepreload} from '../plug-ins/rawTiles.js';

import {loadLayers, loadSites, addAllLayers, loadFiltered } from '../action-creators/siteActions.js';
import {getAllToursThemes} from '../action-creators/optionActions.js';


//var images = tilepreload();
//console.log(images);

var loadingIndicator = (<div>Loading...</div>);

class Frame extends Component {
	constructor(props){
		super(props);
		this.state= {
			// start: false,
			// intro: false,
			// geo: false,
			button: 'navigate',
			// select: false,
			// selected: [],
		};
		this.hoverName=this.hoverName.bind(this);
		this.nav=this.nav.bind(this);
	}

	componentDidMount() {
    this.props.getLayers();
  }

	hoverName(e){
		e.preventDefault();
		let val=e.target.attributes.value.value;
		this.setState({button: val});
	}

	nav(e){
		e.preventDefault();
		if (this.state.select===true && this.state.selected.length===1 ){
		this.setState({button: this.state.selected[0] });
		} else if (this.state.select===true && this.state.selected.length>1 ){
		this.setState({button: 'multiple'});
		}
		else if (this.state.select===false){
		this.setState({button: 'navigate'});
		}
	}


	render(){
		//full for conditional rendering of side panel

		return (
		        <div>
		        	<Nav />
			        <Header2 />
			        <div className="row">
			        <div id="container">
			        </div>
			        {this.props.options.panelNone && this.props.options.panelStart &&
			        	<div className="flex between">
			        		<MapOptions />
				        	<MapSVG baseClass="mFullO mainMaps" />
				        	<MapBar text={this.state.button} hover={this.hoverName} out={this.nav} />
				        	<div className="panelClose">
				        	</div>
			        	</div>
			        }
			        {this.props.options.panelNone && !this.props.options.panelStart &&
			        	<div className="flex between">
			        		<MapOptions />
				        	<MapSVG baseClass="mFull mainMaps" />
				        	<MapBar text={this.state.button} hover={this.hoverName} out={this.nav} />
				        	<div className="panelClose">
				        	</div>
			        	</div>
			        }
			        {this.props.options.panelSmall && this.props.options.panelMid &&
			        	<div className="flex between">
			        		<MapOptions />
				        	<MapSVG baseClass="mPart mainMaps" />
				        	<MapBar text={this.state.button} hover={this.hoverName} out={this.nav} />
				        	<Panel baseClass="panelOpenPart" />
			        	</div>
			        }
			        {this.props.options.panelSmall && !this.props.options.panelMid &&
			        	<div className="flex between">
			        		<MapOptions />
				        	<MapSVG baseClass="mPart mainMaps" />
				        	<MapBar text={this.state.button} hover={this.hoverName} out={this.nav} />
				        	<Panel baseClass="panelOpen" />
			        	</div>
			        }
			        {this.props.options.panelLarge && this.props.options.panelMid &&
			        	<div className="flex between">
			        		<MapOptions />
				        	<MapSVG baseClass="mQuarter mainMaps" />
				        	<MapBar text={this.state.button} hover={this.hoverName} out={this.nav} />
				        	{this.props.sites.specLayer === '' &&
				        		<Panel baseClass="panelLargePart" />
				        	}
				        	{this.props.sites.specLayer !== '' &&
				        		<PanelOps baseClass="panelLargePart noPad" />
				        	}
			        	</div>
			        }
			        {this.props.options.panelLarge && !this.props.options.panelMid &&
			        	<div className="flex between">
			        		<MapOptions />
				        	<MapSVG baseClass="mQuarter mainMaps" />
				        	<MapBar text={this.state.button} hover={this.hoverName} out={this.nav} />
				        	{this.props.sites.specLayer === '' &&
				        		<Panel baseClass="panelLarge" />
				        	}
				        	{this.props.sites.specLayer !== '' &&
				        		<PanelOps baseClass="panelLarge noPad" />
				        	}
			        	</div>
			        }
			        {/*this.props.options.panelLarge && this.props.options.panelMid && this.props.sites.specLayer !== '' &&
			        	<div className="flex between">
			        		<MapOptions />
				        	<MapSVG baseClass="mQuarter mainMaps" />
				        	<MapBar text={this.state.button} hover={this.hoverName} out={this.nav} />
				        	<PanelOps baseClass="panelLargePart noPad" />
			        	</div>
			        }
			        {this.props.options.panelLarge && !this.props.options.panelMid && this.props.sites.specLayer !== '' &&
			        	<div className="flex between">
			        		<MapOptions />
				        	<MapSVG baseClass="mQuarter mainMaps" />
				        	<MapBar text={this.state.button} hover={this.hoverName} out={this.nav} />
				        	<PanelOps baseClass="panelLarge noPad" />
			        	</div>
			        */}
			        </div>
			        <Footer />
			    </div>
		        )
	}
}

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
  	getLayers: () => {
        dispatch(loadSites());
        dispatch(loadLayers());
        dispatch(addAllLayers('add'));
        dispatch(getAllToursThemes());
    },

  }
}

const FrontFrame = connect(mapStateToProps, mapDispatchToProps)(Frame);


export default FrontFrame;

