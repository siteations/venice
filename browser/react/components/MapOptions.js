import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import {updateColor, updateAnno, updateDetail} from '../action-creators/optionActions.js';
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

class MapOps extends Component {
	constructor(props) {
        super(props);
        this.state = {};

        this.opacityAlt=this.opacityAlt.bind(this);
        this.opacityLayers=this.opacityLayers.bind(this);
        this.detailLayers=this.detailLayers.bind(this);
        this.zoom = this.zoom.bind(this);
        this.zoomReset = this.zoomReset.bind(this);
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
                <br/>
                <button className="btn btn-default btn-sm bIconSm" onTouchTap={e=>this.zoom(e, 'in')} onClick={e=>this.zoom(e, 'in')}><span className="glyphicon glyphicon-plus" onTouchTap={e=>this.zoom(e, 'in')} onClick={e=>this.zoom(e, 'in')} ></span></button>
                <br/>
                <button className="btn btn-default btn-sm bIconSm" onTouchTap={e=>this.zoom(e, 'out')} onClick={e=>this.zoom(e, 'out')} ><span className="glyphicon glyphicon-minus" onTouchTap={e=>this.zoom(e, 'out')} onClick={e=>this.zoom(e, 'out')}></span></button>
                <h5>zoom</h5>
                <button className="btn btn-default btn-sm bIconSm" onTouchTap={e=>this.zoomReset(e)} onClick={e=>this.zoomReset(e)} ><span className="glyphicon glyphicon-resize-small" onTouchTap={e=>this.zoomReset(e)} onClick={e=>this.zoomReset(e)}></span></button>
                <h5>fit in<br/>window</h5>
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
  }
}

const MapOptions = connect(mapStateToProps, mapDispatchToProps)(MapOps);

export default MapOptions;
