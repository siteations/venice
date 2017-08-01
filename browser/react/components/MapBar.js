import React, {Component} from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import {Tooltip} from 'react-lightweight-tooltip';
import IconButton from 'material-ui/IconButton';

import {updatePanelNone, updatePanelSmall, updatePanelLarge, updatePanelStart, updatePanelMid} from '../action-creators/optionActions.js';
import {updateColor, updateAnno, updateDetail} from '../action-creators/optionActions.js';
//connect later?
import {addSelectLayer, deleteSelectLayer, addAllLayers, addHoverSite, setSpecPanel, updateSite} from '../action-creators/siteActions.js';

import {updateOffsets, updateOffsetsResidual } from '../action-creators/mapActions.js';

import {setNarr, setTitlesCore} from '../action-creators/panelActions.js';

import {panelsOther} from '../non-db/panelsOther.js';

let mapButtons0=[
	{cn:"nIcon flex center middle", v:"intro", src:'/img/intro-01.svg' },
	{cn:"nIcon flex center middle", v:"prints", src:"/img/print-01.svg" },
	{cn:"nIcon flex center middle", v:"maps", src:"/img/maps-01.svg" }
	];
	// {cn:"nSpc", v:'navigate', src:" " },
	// {cn:"nIcon flex center middle", v:"panel", src:"/img/arrow1-01.svg" },
	// {cn:"nIcon flex center middle", v:"panel large", src:"/img/arrow2-01.svg" },
let mapButtons1=[
	{cn:"nIcon flex center middle", v:"all layers", src:"/img/all-layers-01.svg" },
	{cn:"nIcon flex center middle", v:"parish churches", src:"/img/parish-01.svg" },
	{cn:"nIcon flex center middle", v:"basilica", src:"/img/bascilica-01.svg" },
	{cn:"nIcon flex center middle", v:"plague churches", src:"/img/plague-01.svg" },
	{cn:"nIcon flex center middle", v:"monastery", src:"/img/culture-01.svg" },
	{cn:"nIcon flex center middle", v:"convent", src:"/img/convent-01.svg" },
	{cn:"nIcon flex center middle", v:"non-catholic communities", src:"/img/non-catholic-01.svg" },
	{cn:"nIcon flex center middle", v:"processions", src:"/img/ritual-01.svg" },
	{cn:"nIcon flex center middle", v:"printing", src:"/img/books-01.svg" },
	{cn:"nIcon flex center middle", v:"textual consumption", src:"/img/ephemera-01.svg" }
]

let mapButtons2=[
	{cn:"nIcon flex center middle", v:"bibliography", src:"/img/menu-01.svg" },
	{cn:"nIcon flex center middle", v:"credits", src:"/img/credits-01.svg" }
];

const toolstyles = {
	wrapper: {
	  cursor: 'pointer'
	},
	content: {
    backgroundColor: '#d8d0ba',
    color: 'black',
  },
  tooltip: {
    backgroundColor: '#d8d0ba',
    borderRadius: '10px',
    position: 'absolute',
    zIndex: '99',
    background: '#000',
    bottom: '-85%',
    left: '-10%',
    padding: '5px',
    transform: 'translateX(-110%)',
  },
  arrow: {
    position: 'absolute',
    width: '0',
    height: '0',
    bottom: '25%',
    left: '103%',
    marginLeft: '-6px',
    borderTop: 'solid transparent 8px',
    borderBottom: 'solid transparent 8px',
    borderLeft: 'solid transparent 8px',
    //borderLeft: 'solid #d8d0ba 8px',
  },
};

class MapBar extends Component{
	constructor(props){
		super(props);
		this.state={
			y:0,
		};
		this.layerPanel= this.layerPanel.bind(this);
		this.layerOver =this.layerOver.bind(this);
		this.layerOut = this.layerOut.bind(this);

	}

	layerOver(e){
		e.preventDefault();
		let val=e.target.attributes.value.value;
		if (val !=='navigate'){
			this.props.setHoverLabel(val);
		}
	}

	layerOut(e){
		e.preventDefault();
		this.props.setHoverLabel(' ');
	}

	layerPanel(e){
		e.preventDefault();
		let val=e.target.attributes.value.value;

		console.log('reading panel?', val);


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

		else if ((val === 'intro' || val === 'prints' || val === 'bibliography'|| val === 'credits') && (this.props.options.panelNone)){
			this.props.panelSmall();
			this.props.setSpecPanel(val);
			this.props.updateSite(0);
			this.props.setTitles(panelsOther[val].title);
			this.props.updateNarrative(panelsOther[val].obj);
		}
		else if ((val === 'intro' || val === 'prints' || val === 'bibliography'|| val === 'credits') && (this.props.options.panelLarge)){
			this.props.panelSmall();
			this.props.setSpecPanel(val);
			this.props.updateSite(0);
			this.props.setTitles(panelsOther[val].title);
			this.props.updateNarrative(panelsOther[val].obj);
		}

		else if ((val === 'intro' || val === 'prints' || val === 'bibliography'|| val === 'credits') && (this.props.options.panelSmall)){
			this.props.setSpecPanel(val);
			this.props.updateSite(0);
			this.props.setTitles(panelsOther[val].title);
			this.props.updateNarrative(panelsOther[val].obj);
		}

		//map/intro/biblio options
		else if ((val === 'maps') && (this.props.options.panelNone || this.props.options.panelSmall)){
			this.props.panelLarge();
			this.props.setSpecPanel(val);
			if (val === 'maps' ) {
				this.props.setColor(true);
				this.props.setAnno(false);
				this.props.setDetail(false);
				//really?
					var offs=this.props.map.xyOffsets;
					this.setState({y:offs[1]});
					if (offs[1]<0){ offs[1]=0 ; this.props.setOffsetsR(offs); this.props.setCurrOffsets(offs);}
					console.log(offs);
				//
			}

		} else if ((val === 'maps') && this.props.options.panelLarge){
			if (val !== this.props.sites.specLayer){
				this.props.setSpecPanel(val);
				if (val === 'maps' ) {
					this.props.setColor(true);
					this.props.setAnno(false);
					this.props.setDetail(false);
					//really?
					var offs=this.props.map.xyOffsets;
					this.setState({y:offs[1]});
					if (offs[1]<0){ offs[1]=0 ; this.props.setOffsetsR(offs); this.props.setCurrOffsets(offs);}
					console.log(offs);

					//
				}
			} else {
				this.props.panelSmall();
				this.props.setSpecPanel('');
					this.props.setColor(false);
					this.props.setAnno(true);
					this.props.setDetail(true);

					var offs=this.props.map.xyOffsets;
					var y = this.state.y;
					offs[1]=y ; this.props.setOffsetsR(offs); this.props.setCurrOffsets(offs);
					console.log(offs);
			}
		}

		//layer addition/subtractions dispatch
		else if (val==='all layers' && this.props.sites.currLayers.length === 0){
			this.props.loadSelectAll('add');
			this.props.setSpecPanel('');

		} else if (val==='all layers' && this.props.sites.currLayers.length > 0){
			this.props.loadSelectAll('clear');
			this.props.setSpecPanel('');
		} else if (val!=='panel' && val!=='panel large' && val!=='intro' && val !== 'prints' && val!=='biblio' && val!=='maps'&& val!=='credits'){ //individual layers
			if (this.props.sites.currLayers.indexOf(val)<0){ //not in add
					this.props.addSelectOne(val);
					this.props.setSpecPanel('');
			} else { //in layers, so remove...
					this.props.deleteSelectOne(val);
					this.props.setSpecPanel('');
			}
		}

	}


	render() {
			return (
		        	<div className="mtypeFull flexcol center center-block text-center">
		        		<h5 style={{fontWeight: 'bold'}}>intros</h5>
		        		{mapButtons0.map((each,i)=>{

		        			let imgClass;

		        			if (this.props.options.panelLarge && each.v ==='panel'){
		        				imgClass='opacity25';
		        			} else if (each.v !== 'maps' && this.props.sites.specLayer === 'maps'){
		        				imgClass='opacity25';
		        			} else if ((each.v ==='panel large' && !this.props.options.panelLarge)||(each.v ==='panel' && this.props.options.panelNone)) {
		        				imgClass='rotate';
		        			};

		        			return (
										<div className={each.cn} key={i+'navbutton'} value={each.v} onMouseOver={this.layerOver} onMouseOut={this.layerOut} onTouchTap={this.layerPanel} >
											<Tooltip content={'toggle '+ each.v} styles={toolstyles}>
											{each.src !== ' ' &&
												<img src={each.src} className={`bImg ${imgClass}`} value={each.v} />
											}
											</Tooltip>
										</div>
		        			)
		        		})
		        		}
		        		<br/>
		        		<h5 style={{fontWeight: 'bold'}}>layers</h5>
		        		{mapButtons1.map((each,i)=>{

		        			let imgClass;

		        			if (this.props.options.panelLarge && each.v ==='panel'){
		        				imgClass='opacity25';
		        			} else if (each.v !== 'maps' && this.props.sites.specLayer === 'maps'){
		        				imgClass='opacity25';
		        			} else if ((each.v ==='panel large' && !this.props.options.panelLarge)||(each.v ==='panel' && this.props.options.panelNone)) {
		        				imgClass='rotate';
		        			};

		        			return (
										<div className={each.cn} key={i+'navbutton'} value={each.v} onMouseOver={this.layerOver} onMouseOut={this.layerOut} onTouchTap={this.layerPanel} >
											<Tooltip content={'toggle '+ each.v} styles={toolstyles}>
											{each.src !== ' ' &&
												<img src={each.src} className={`bImg ${imgClass}`} value={each.v} />
											}
											</Tooltip>
										</div>
		        			)
		        		})
		        		}
		        		<br/>
		        		<h5 style={{fontWeight: 'bold'}}>about</h5>
		        		{mapButtons2.map((each,i)=>{

		        			let imgClass;

		        			if (this.props.options.panelLarge && each.v ==='panel'){
		        				imgClass='opacity25';
		        			} else if (each.v !== 'maps' && this.props.sites.specLayer === 'maps'){
		        				imgClass='opacity25';
		        			} else if ((each.v ==='panel large' && !this.props.options.panelLarge)||(each.v ==='panel' && this.props.options.panelNone)) {
		        				imgClass='rotate';
		        			};

		        			return (
										<div className={each.cn} key={i+'navbutton'} value={each.v} onMouseOver={this.layerOver} onMouseOut={this.layerOut} onTouchTap={this.layerPanel} >
											<Tooltip content={'toggle '+ each.v} styles={toolstyles}>
											{each.src !== ' ' &&
												<img src={each.src} className={`bImg ${imgClass}`} value={each.v} />
											}
											</Tooltip>
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
    setHoverLabel: (layer) => {
    	dispatch(addHoverSite(layer));
    },
    setSpecPanel: (type) => {
    	dispatch(setSpecPanel(type));
    },
    setColor: (bool) => {
      dispatch(updateColor(bool));
    },
    setAnno: (bool) => {
      dispatch(updateAnno(bool));
    },
    setDetail: (bool) => {
        dispatch(updateDetail(bool));
    },
    setCurrOffsets: (offsets) => {
      dispatch(updateOffsets(offsets));
    },
    setOffsetsR: (offsets) => {
        dispatch(updateOffsetsResidual(offsets));
    },
    updateSite: (site) => {
    	dispatch(updateSite(site));
    },
    setTitles: (name) => {
        dispatch(setTitlesCore(name));
    },
    updateNarrative: (obj) => {
        dispatch(setNarr(obj));
    },

  }
}

const MapB = connect(mapStateToProps, mapDispatchToProps)(MapBar);

export default MapB;

