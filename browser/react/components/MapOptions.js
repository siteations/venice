import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import {Tooltip} from 'react-lightweight-tooltip';

import {updateColor, updateAnno, updateDetail, setCurrTour} from '../action-creators/optionActions.js';
import { tiling, scaleOps, sitesFiltered, centerRescaled, reverseCenter } from '../plug-ins/rawTiles.js';

import {updateZoom, updateTile, updateOffsets, updateCenter, updateCenterScreen, updateWindow, updateWindowOffsets, updateOffsetsResidual, updatePanelOffset} from '../action-creators/mapActions.js';

//import { tiling, scaleOps, sitesFiltered, centerRescaled, reverseCenter } from '../plug-ins/rawTiles.js';

//---------------------------MATERIAL UI---------------------------
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Toggle, Slider, Chip } from 'material-ui';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

const styles = {
  root: {
    display: 'flex',
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  chip: {
    margin: 2,

  },
};

const toolstyles = {
    wrapper: {
      cursor: 'pointer'
    },
    content: {
    backgroundColor: '#d8d0ba',
    color: 'black',
    fontFamily: 'trenda',
    fontSize: '.75rem',
  },
  tooltip: {
    backgroundColor: '#d8d0ba',
    borderRadius: '10px',
    position: 'absolute',
    zIndex: '99',
    background: '#000',
    bottom: '-100%',
    left: '225%',
    padding: '5px',
    transform: 'translateX(0%)',
  },
  arrow: {
    position: 'absolute',
    width: '0',
    height: '0',
    bottom: '25%',
    right: '103%',
    marginLeft: '-6px',
    borderTop: 'solid transparent 8px',
    borderBottom: 'solid transparent 8px',
    borderRight: 'solid transparent 8px',
  },
};

class MapOps extends Component {
	constructor(props) {
        super(props);
        this.state = {};

        this.opacityAlt=this.opacityAlt.bind(this);
        this.opacityLayers=this.opacityLayers.bind(this);
        this.detailLayers=this.detailLayers.bind(this);
        this.zoom = this.zoom.bind(this);
        this.zoomReset = this.zoomReset.bind(this);
        this.setTour = this.setTour.bind(this);
    }

    zoom(e, type){
        e.preventDefault();
        var multiplier;
        if (type==='in'){
            multiplier=2;
        } else if (type==='out'){
            multiplier=0.5;
        }


        var [mouseX, mouseY]=this.props.map.xyCenter;
        var curX = (mouseX+this.props.map.xyOffsets[0]), curY = (mouseY+this.props.map.xyOffsets[1]);

        var resX = curX*multiplier, resY = curY*multiplier;
        var newOx = resX-mouseX, newOy = resY-mouseY;

        let curr = this.props.map.currZoom, pix = this.props.map.tileSize, oX =this.props.map.xyOffsets[0], oY=this.props.map.xyOffsets[1];

        if (curr<6 && type==='in') { //zoom in
            curr++, oX = newOx, oY = newOy;
        } else if (curr>2 && type==='out'){
            curr--, oX = newOx, oY = newOy;
        }

        this.props.setOffsetsR([oX, oY]);
        this.props.setCurrOffsets([oX, oY]);
        this.props.setCurrZoom(curr);
        this.props.setCurrTilesize(pix);
    }

    zoomReset(e){
        e.preventDefault();

        let sele = window.document.getElementById("mapWin").attributes[0].ownerElement;
        let width = sele.clientWidth;
        let panelW = (this.props.map.windowSize[0]-width)/2;
        let height = sele.clientHeight;
        let [xOff, yOff] = [0,0];
        let [xOffR, yOffR] = [0,0];

         var w=128*(scaleOps[3][0]+1), h =128*(scaleOps[3][1]+1);

        this.props.setCurrOffsets([(width-w)/-2,(height-h)/-2]);
        this.props.setOffsetsR([(width-w)/-2,(height-h)/-2]);
        this.props.setCurrZoom(3);
        this.props.setCurrTilesize(128);

    }

    setTour(e){
        e.preventDefault();
        var tourId=e.target.attributes.value.value;
        console.log(tourId);
        this.props.setCurrTour(tourId);

    }

    opacityAlt(e,isInputChecked){
        //e.preventDefault();
        this.props.setColor(isInputChecked);
    }

    opacityLayers(e,isInputChecked){
        //e.preventDefault();
        this.props.setAnno(isInputChecked);
        this.props.setDetail(isInputChecked);
    }

    detailLayers(e,isInputChecked){
        //e.preventDefault();
        this.props.setDetail(isInputChecked);
    }

  render(){
    //intPanel

	return (
	        <div className="mtypeFull center-block text-center">
                <h5 style={{fontWeight: 'bold'}}>map</h5>
                <button className="btn btn-default btn-sm bIconSm" onTouchTap={e=>this.zoom(e, 'in')} onClick={e=>this.zoom(e, 'in')}>
                    <Tooltip content={'zoom in'} styles={toolstyles}>
                        <span className="glyphicon glyphicon-plus" onTouchTap={e=>this.zoom(e, 'in')} onClick={e=>this.zoom(e, 'in')} ></span>
                    </Tooltip>
                </button>
                <br/>
                <button className="btn btn-default btn-sm bIconSm" onTouchTap={e=>this.zoom(e, 'out')} onClick={e=>this.zoom(e, 'out')} >
                    <Tooltip content={'zoom out'} styles={toolstyles}>
                        <span className="glyphicon glyphicon-minus" onTouchTap={e=>this.zoom(e, 'out')} onClick={e=>this.zoom(e, 'out')}></span>
                    </Tooltip>
                </button>
                <h5>zoom</h5>
                <button className="btn btn-default btn-sm bIconSm" onTouchTap={e=>this.zoomReset(e)} onClick={e=>this.zoomReset(e)} >
                    <Tooltip content={'reset position'} styles={toolstyles}>
                        <span className="glyphicon glyphicon-resize-small" onTouchTap={e=>this.zoomReset(e)} onClick={e=>this.zoomReset(e)}></span>
                    </Tooltip>
                </button>
                <h5>fit in<br/>window</h5>
                <h5 style={{fontWeight: 'bold'}}><em>reset<br/>view</em></h5>
                <br/>
                <div style={styles.root}>
                    <Toggle onToggle={(e,isInputChecked)=>this.opacityAlt(e,isInputChecked)}/>
                </div>
                <h5>color</h5>
                <div style={styles.root}>
                    <Toggle defaultToggled={this.props.options.anno} onToggle={(e,isInputChecked)=>this.opacityLayers(e,isInputChecked)}/>
                    {/* defaultToggled={true} <Slider style={{height: 60}} axis="y-reverse" defaultValue={1} onChange={(e,newValue)=>this.opacityLayers(e,newValue)}/>*/}
                </div>
                <h5>layers</h5>

                <div style={styles.root}>
                    <Toggle defaultToggled={this.props.options.anno} onToggle={(e,isInputChecked)=>this.detailLayers(e,isInputChecked)}/>
                    {/*<Slider style={{height: 60}} axis="y-reverse" defaultValue={1} onChange={(e,newValue)=>this.opacityLayers(e,newValue)}/>*/}
                </div>
                <h5>local<br/>details</h5>
                <br/>
                <h5 style={{fontWeight: 'bold'}}>tours</h5>
                <button className="btn btn-default btn-sm bIconSm" >
                    <Tooltip content={'tour all processions'} styles={toolstyles}>
                        <img src='/img/ritual-01.svg' className='bImg' value='1' onTouchTap={e=>this.setTour(e)} />
                    </Tooltip>
                </button>
                <br/>
                <button className="btn btn-default btn-sm bIconSm" onTouchTap="">
                    <Tooltip content={'tour all printing sites'} styles={toolstyles}>
                        <img src='/img/books-01.svg' className='bImg' value='2' onTouchTap={e=>this.setTour(e)} />
                    </Tooltip>
                </button>
                <br/>
                <button className="btn btn-default btn-sm bIconSm" onTouchTap="">
                    <Tooltip content={'tour all basilica'} styles={toolstyles}>
                        <img src='/img/bascilica-01.svg' className='bImg' value='3' onTouchTap={e=>this.setTour(e)} />
                    </Tooltip>
                </button>


                {/*

                <h5><span className="Trenda-Bold">maps</span><br/>
                alternates<br/>(no sites)</h5>
                <form>
                  <input type="radio" name="name1" /><br/>
                  Barbari Map<br/>
                  <input type="radio" name="name2" /><br/>
                  other <br/>
                  <input type="radio" name="name3" /><br/>
                  other <br/>
                </form>
                */}

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
    setColor: (bool) => {
      dispatch(updateColor(bool));
    },
    setAnno: (bool) => {
      dispatch(updateAnno(bool));
    },
    setDetail: (bool) => {
        dispatch(updateDetail(bool));
    },
    setCurrZoom: (zoom) => {
      dispatch(updateZoom(zoom));
    },
    setCurrOffsets: (offsets) => {
      dispatch(updateOffsets(offsets));
    },
    setOffsetsR: (offsets) => {
        dispatch(updateOffsetsResidual(offsets));
    },
    setCurrTilesize: (size) => {
        dispatch(updateTile(size));
    },
    setCenterScreen: (center) =>{
        dispatch(updateCenterScreen(center));
    },
    setCurrTour: (tourId) => {
        dispatch(setCurrTour(tourId));
    },
  }
}

const MapOptions = connect(mapStateToProps, mapDispatchToProps)(MapOps);

export default MapOptions;
