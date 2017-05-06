import React, {Component} from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';

import {updatePanelNone, updatePanelSmall, updatePanelLarge, updatePanelStart, updatePanelMid} from '../action-creators/optionActions.js';
//connect later?
import {addSelectLayer, deleteSelectLayer, addAllLayers} from '../action-creators/siteActions.js';

//

let mapButtons=[
	{cn:"nIcon flex center middle", v:"intro", src:'/img/intro-01.svg' },
	{cn:"nIcon flex center middle", v:"all layers", src:"/img/all-layers-01.svg" },
	{cn:"nSpc", v:'navigate', src:" " },
	{cn:"nIcon flex center middle", v:"panel", src:"/img/arrow1-01.svg" },
	{cn:"nIcon flex center middle", v:"panel large", src:"/img/arrow2-01.svg" },
	{cn:"nSpcSm", v:'navigate', src:" " },
	{cn:"nIcon flex center middle", v:"parish", src:"/img/parish-01.svg" },
	{cn:"nIcon flex center middle", v:"bascilica", src:"/img/bascilica-01.svg" },
	{cn:"nIcon flex center middle", v:"plague", src:"/img/plague-01.svg" },
	{cn:"nIcon flex center middle", v:"monastery, convent", src:"/img/convent-01.svg" },
	{cn:"nIcon flex center middle", v:"non-catholic", src:"/img/non-catholic-01.svg" },
	{cn:"nIcon flex center middle", v:"ritual", src:"/img/ritual-01.svg" },
	{cn:"nIcon flex center middle", v:"cultural", src:"/img/culture-01.svg" },
	{cn:"nIcon flex center middle", v:"symbolic views", src:"/img/maps-01.svg" },
	{cn:"nIcon flex center middle", v:"relig. prints", src:"/img/books-01.svg" },
	{cn:"nIcon flex center middle", v:"relig. ephemera", src:"/img/ephemera-01.svg" },
	{cn:"nSpcSm", v:'navigate', src:" " },
	{cn:"nIcon flex center middle", v:"biblio", src:"/img/books-01.svg" },
];

class MapBar extends Component{
	constructor(props){
		super(props);
		this.state={};
		this.layerPanel= this.layerPanel.bind(this);

	}

	layerPanel(e){
		e.preventDefault();
		let val=e.target.attributes.value.value;
		console.log(this.props);

		if (this.props.options.panelStart){
			this.props.panelStart();
		}

		//panel options
		if (val === 'panel' && this.props.options.panelNone){
			this.props.panelSmall();
		} else if (val === 'panel' && this.props.options.panelSmall){
			this.props.panelNone();
		} else if (val === 'panel' && this.props.options.panelLarge){
			this.props.panelMid();
		} else if (val === 'panel large' && (this.props.options.panelNone || this.props.options.panelSmall)){
			this.props.panelLarge();
		} else if (val === 'panel large' && this.props.options.panelLarge){
			this.props.panelNone();
		}

		//intro options

		//layer addition/subtractions dispatch
		if (val==='all layers' && this.props.sites.currLayers.length !== this.props.sites.allLayers.length){
			this.props.loadSelectAll('add');

		} else if (val==='all layers' && this.props.sites.currLayers.length === this.props.sites.allLayers.length){
			this.props.loadSelectAll('clear');
		} else if (val!=='panel' && val!=='panel large' && val!=='intro' && val!=='biblio'){ //individual layers
			if (this.props.sites.currLayers.indexOf(val.split(', ')[0])<0){ //not in add
					this.props.addSelectOne(val);
			} else { //in layers, so remove...
					this.props.deleteSelectOne(val);
			}
		}

	}


	render() {
			return (
		        	<div className="mtypeFull flexcol center">
		        		<p className="sButtons text-center">{this.props.text}</p>
		        		{mapButtons.map((each,i)=>{

		        			let imgClass='bImg';

		        			if (this.props.options.panelLarge && each.v ==='panel'){
		        				imgClass='bImg opacity25';
		        			} else if (this.props.options.panelLarge && each.v ==='panel large'){
		        				imgClass='bImg';
		        			} else if ((each.v ==='panel large' && !this.props.options.panelLarge)||(each.v ==='panel' && this.props.options.panelNone)) {
		        				imgClass='bImg rotate';
		        			};

		        			return (
										<div className={each.cn} key={i+'navbutton'} value={each.v} onMouseOver={this.props.hover} onMouseOut={this.props.out} onClick={this.layerPanel}>
											{each.src !== ' ' &&
												<img src={each.src} className={imgClass} value={each.v} />
											}
										</div>
		        			)
		        		})
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
    }
}

//setZoom, setTile, setOffsets, setCenter, setCenterScreen, setWindowSize, setWindowOffset

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  	panelStart: () => {
      dispatch(updatePanelStart());
    },
    panelMid: () => {
      dispatch(updatePanelMid());
    },
    panelNone: () => {
      dispatch(updatePanelNone());
    },
    panelSmall: () => {
      dispatch(updatePanelSmall());
    },
    panelLarge: () => {
        dispatch(updatePanelLarge());
    },
    loadSelectAll: (add) => {
        dispatch(addAllLayers(add));
    },
    addSelectOne: (layer) => {
        dispatch(addSelectLayer(layer));
    },
    deleteSelectOne: (layer) => {
        dispatch(deleteSelectLayer(layer));
    },

  }
}

const MapB = connect(mapStateToProps, mapDispatchToProps)(MapBar);

export default MapB;

