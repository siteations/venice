import React, {Component} from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import Header from './Header.js';
import Footer from './Footer.js';
import MapBar from './MapBar.js';
import MapSVG from './Mapd3.js';
import PanelForm from './Panelform.js';
import MapOptions from './MapOptions.js';

import {Preload} from 'react-preload';
//import {tilepreload} from '../plug-ins/rawTiles.js';

import {loadLayers, loadSites, addAllLayers, loadFiltered } from '../action-creators/siteActions.js';
import {getAllToursThemes} from '../action-creators/optionActions.js';


//var images = tilepreload();
//console.log(images);

var loadingIndicator = (<div>Loading...</div>);

class FrameEd extends Component {
	constructor(props){
		super(props);
		this.state= {
			start: true,
			intro: false,
			geo: false,
			button: 'navigate',
			select: false,
			selected: [],
			layers: ["monastery", "convent", "non-catholic"], // just for testing purposes, hook into actions
			//["ritual", "monastery", "convent", "bascilica", "non-catholic", "plague", "parish"]
			// need to set up redux and link layers together...
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
			        <Header />
			        <div className="row">
			        <div id="container">
			        </div>
			        	<div className="flex between">
			        		<MapOptions />
				        	<MapSVG baseClass="mPart mainMaps" />
				        	<MapBar text={this.state.button} hover={this.hoverName} out={this.nav} />
				        	<PanelForm baseClass="panelOpen" />
			        	</div>
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

const FrontEdit = connect(mapStateToProps, mapDispatchToProps)(FrameEd);


export default FrontEdit;

