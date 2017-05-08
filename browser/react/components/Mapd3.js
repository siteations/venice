import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

//---------------------------MAP OPTIONS & COMPONENTS---------------------------
import { tiling, scaleOps, sitesFiltered } from '../plug-ins/rawTiles.js';
import { ClipTiles, BackgroundTiles, BackgroundMask, Underlay } from './TileVariants.js';
import DetailOver from './AnnoVariants.js';
import MapOptions from './MapOptions.js';


//---------------------------PRE-DB / PRE-REDUX PLACEHOLDERS---------------------------
import {cirMain} from '../pre-db/cirTest.js';


//---------------------------ACTION for DISPATCH---------------------------
import {updateZoom, updateTile, updateOffsets, updateCenter, updateCenterScreen, updateWindow, updateWindowOffsets, updateOffsetsResidual, updatePanelOffset} from '../action-creators/mapActions.js';

import {updateColor, updateAnno, updateDetail, updatePanelSmall, updatePanelLarge} from '../action-creators/optionActions.js';

import {loadLayers, loadSites, addAllLayers, loadFiltered } from '../action-creators/siteActions.js';


class MapSVG extends Component {
	constructor(props) {
        super(props);
        this.state = { // more or less temporary var for map manipulation
        	mouseDivloc: [0,0],
        	mouseLast: [0,0],
        	mousePast: [0,0],
        	mousePos: [0,0],
            drag: '',
            trig: false,
            labelT:'',
            labelS:'',

        };
        this.mouseLoc=this.mouseLoc.bind(this);
        this.refSize=this.refSize.bind(this);
        this.zoom = this.zoom.bind(this);
        this.zoomTo = this.zoomTo.bind(this);
        //this.flyTo
        //this.other

    }

    componentDidMount() {
        window.addEventListener("resize", this.refSize);
        this.refSize();
        this.props.getLayers(this.props.sites.currLayers);
    }

    refSize(){
        let sele = window.document.getElementById("mapWin").attributes[0].ownerElement;
        let width = sele.clientWidth;
        let panelW = (this.props.map.windowSize[0]-width)/2;
        //if (panelW <= 0){ panelW = 0; } else { panelW *= 0.5; };

        if (width<this.props.map.windowSize[0]){
            width=this.props.map.windowSize[0];
        };
        let height = sele.clientHeight;
        let [xOff, yOff] = this.props.map.xyOffsets;
        let [xOffR, yOffR] = this.props.map.xyOffsetsR;

        this.props.setWindowOffsets([sele.offsetTop, sele.offsetLeft]);
        this.props.setWinSize([width, height]);
        this.props.setPanelOffset(panelW); // for recenter;
        // this.props.setOffsetsR([xOff - panelW, yOff]);
        // this.props.setCurrOffsets([xOffR - panelW, yOffR]);
        this.props.setCenterScreen([width/2, height/2]);

        if (this.props.map.xyOffsets[0]===0){
            let w=this.props.map.tileSize*(scaleOps[this.props.map.currZoom][0]+1), h =this.props.map.tileSize*(scaleOps[this.props.map.currZoom][1]+1);

            this.props.setCurrOffsets([(width-w)/-2,(height-h)/-2]);
            this.props.setOffsetsR([(width-w)/-2,(height-h)/-2]);
        }
    }

    mouseLoc(e) {
    	e.preventDefault();

    	let sele = window.document.getElementById("mapWin").attributes[0].ownerElement;
    	let mousePos = [e.screenX-sele.offsetLeft, e.screenY-sele.offsetTop];
    	this.setState({mouseDivloc: mousePos});

    	(e.type === 'mousedown')? this.setState({drag: 'start'}) : this.setState({drag: ''})
    	if (e.type === 'mouseup') {
            this.setState({mouseLast: mousePos});
            this.props.setOffsetsR(this.props.map.xyOffsets);
        };
    }

    drag(e) {
    	e.preventDefault();

    	let [lastX, lastY] = this.props.map.xyOffsetsR;
    	var sele = window.document.getElementById("mapWin").attributes[0].ownerElement;
    	var mousePos = [e.screenX-sele.offsetLeft, e.screenY-sele.offsetTop];
    	let offX = this.state.mouseDivloc[0] - mousePos[0] + lastX;
    	let offY = this.state.mouseDivloc[1] - mousePos[1] + lastY;

    	if (this.state.drag === 'start') {
    		this.setState({drag:'drag'});
            this.props.setCurrOffsets(this.props.map.xyOffsetsR);
    	}	else if (this.state.drag === 'drag'){
    		this.props.setCurrOffsets([offX, offY]);
    	}
    }

    zoomScroll(e) {
    	e.preventDefault();
    	var sele = window.document.getElementById("mapWin").attributes[0].ownerElement;
    	var mousePos = [e.screenX-sele.offsetLeft, e.screenY-sele.offsetTop];
    	/*
    	mouseposition + offsets => location on map
    	tile position = Math.floor(location/tilesize)
    	*/
    	let curX = mousePos[0]+this.props.map.xyOffsets[0], curY = mousePos[1]+this.props.map.xyOffsets[1];
    	let resX = curX/this.props.map.tileSize, resY = curY/this.props.map.tileSize;
    	let mosPos = mousePos;

    	let curr = this.props.map.currZoom, pix = this.props.map.tileSize, oX =this.props.map.xyOffsets[0], oY=this.props.map.xyOffsets[1];

    	if (e.deltaY>1) { //zoom in
    		pix += 2, oX += 2*resX, oY += 2*resY;
    	if (pix>=256){ curr++; pix=128 }
    	if (curr>6){ curr=6; pix=256; oX = this.props.map.xyOffsets[0]; oY = this.props.map.xyOffsets[1] };

    	} else if (e.deltaY<1) { //zoom out
    		pix -= 2, oX -= 2*resX, oY -= 2*resY;
    	if (pix<=128){ curr--; pix=256 }
    	if (curr<2){ curr=2; pix=128; oX = this.props.map.xyOffsets[0]; oY = this.props.map.xyOffsets[1] };
    	} else {
    		mosPos = mousePos;
    	}

    	this.setState({ mousePast: mousePos, mousePos:mosPos });
        this.props.setOffsetsR([oX, oY]);
        this.props.setCurrOffsets([oX, oY]);
        this.props.setCurrZoom(curr);
        this.props.setCurrTilesize(pix);

    }

    zoom(e, type){
        e.preventDefault();
        let multiplier;
        if (type==='in'){
            multiplier=2;
        } else if (type==='out'){
            multiplier=0.5;
        }

        let [mouseX, mouseY]=this.props.map.xyCenter;
        let curX = (mouseX+this.props.map.xyOffsets[0]), curY = (mouseY+this.props.map.xyOffsets[1]);

        let resX = curX*multiplier, resY = curY*multiplier;
        let newOx = resX-mouseX, newOy = resY-mouseY;

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

    zoomTo(e,site){ // rework to parallel basic scroll zoom...
        e.preventDefault();
        if (site.length===2){ //double click on circle with x,y array center passed in
            var [mouseX, mouseY] = site; //in scaled screen coordinates

        } else if (site ==='none') { //double click on general area, use mouse to center zoom
            var sele = window.document.getElementById("mapWin").attributes[0].ownerElement;
            var [mouseX, mouseY] = [e.screenX-sele.offsetLeft, e.screenY-sele.offsetTop]; //in scaled screen coordinates
        }

        //rework here to tweak panel offset...
        let curX = (mouseX+this.props.map.xyOffsets[0]), curY = (mouseY+this.props.map.xyOffsets[1]); //location on map
        let resX = curX*2+this.props.map.panelOffset, resY = curY*2-this.props.map.windowOffsets[1]-this.props.map.windowSize[1]/4; // zoom in one level
        let newOx = resX-this.props.map.windowSize[0]/2, newOy = resY-this.props.map.windowSize[1]/2;

        //back to basics here
        let curr = this.props.map.currZoom, pix = this.props.map.tileSize, oX =this.props.map.xyOffsets[0], oY=this.props.map.xyOffsets[1];

        if (curr<6) { //zoom in
            curr++, oX = newOx, oY = newOy;
        }

        this.props.setOffsetsR([oX, oY]);
        this.props.setCurrOffsets([oX, oY]);
        this.props.setCurrZoom(curr);
        this.props.setCurrTilesize(pix);
    }

    flyTo(e){
        e.preventDefault();

    }

    showLabel(e){
    	e.preventDefault();
    	let name = e.target.attributes.value.value.split('.');
    	this.setState({labelT:name[0], labelS: name[1]});
    }

    hideLabel(e){
    	e.preventDefault;
    	this.setState({labelT:'', labelS: ''});
    }

    selectShowPanel(e,site){
        e.preventDefault;
        this.zoomTo(e,site);
        if (this.props.options.panelNone){
            this.props.panelSmall();
        };
        //more mouse elements here...

    }


    render(){

        //minor site/tile filtering at the top of the map... as is fairly often updated

    	const tiles = tiling(this.props.map.currZoom, this.props.map.tileSize, this.props.map.windowSize, this.props.map.xyOffsets);
        const cirNew = sitesFiltered(this.props.map.xyOffsets, this.props.sites.allSites, this.props.sites.currLayers, tiles[0].percent);


    	return (

    	<div className={this.props.baseClass} ref="size" id="mapWin" onAnimationEnd = {e=> this.refSize(e) } >
    	   <div className="offset" onMouseDown = {e=>this.mouseLoc(e)}  onMouseUp = {e=>this.mouseLoc(e)} onMouseMove = {e=>this.drag(e)} onWheel = {e=>this.zoomScroll(e)} onDoubleClick={e=>this.zoomTo(e, 'none')} >

	    	   <svg width={this.props.map.windowSize[0]} height={this.props.map.windowSize[1]}  >
	    	   		<defs>
                        <filter id="greyscale">
                            <feColorMatrix type="saturate" values="0" />
                        </filter>
	    	   			<clipPath id="myClip">
	    	   				{cirNew &&
	    	   					cirNew.map(d => <circle stroke="#000000" cx={d.cx} cy={d.cy} r={d.r} />)
	    	   				}
					    </clipPath>
	    	   		</defs>

                    <Underlay tSize={this.props.map.tileSize} currZoom={this.props.map.currZoom} xyOffsets={this.props.map.xyOffsets} color={this.props.options.color} />

	    	   		<g className="workingTiles" >
    	    	   		{tiles &&
                            <BackgroundTiles data={tiles} wSize={this.props.map.windowSize} tSize={this.props.map.tileSize} color={this.props.options.color} />
                        }
                        {this.props.options.anno &&
                            <BackgroundMask wSize={this.props.map.windowSize} color={this.props.options.color} />
                        }
                        {tiles && this.props.options.anno &&
                            <ClipTiles data={tiles} wSize={this.props.map.windowSize} tSize={this.props.map.tileSize} clip="url(#myClip)" />
    	    	   		}
	    	   		</g>

	    	   		<g className="allLabelCircs" >
                    {this.props.options.anno && cirNew &&
	   					cirNew.map(d=>{
                            //strokeWidth={Math.pow(this.state.currentZoomLevel,2)/2}
	   						return (
	   						   		<circle className="circHL" cx={d.cx} cy={d.cy} r={d.r} value={d.name} onMouseOver = {e=>this.showLabel(e)} onMouseOut={e=>this.hideLabel(e)} onDoubleClick={e=>this.selectShowPanel(e,[d.cx, d.cy])} />

	   						    )
	   					})
                    }
                    {this.props.options.anno && cirNew &&

	   					cirNew.map(d=>{
	   						if (d.name.split('.')[1] === this.state.labelS){
	   						return (
	   						   			<g>
			   						   		<text x={d.cx+d.r+14} y={d.cy} className="textHL" fontSize={Math.pow(this.props.map.currZoom,2)+ 6} >{this.state.labelT}</text>
			   						   		<text x={d.cx+d.r+14} y={d.cy+Math.pow(this.props.map.currZoom,2)*1.25} className="textSHL" fontSize={Math.pow(this.props.map.currZoom,2)} >{this.state.labelS}</text>
		   						   		</g>
	   						    )}
	   					})
	   				}
                    {this.props.options.anno && cirNew &&
                        <DetailOver currSite={this.state.labelS} shownSites={cirNew} />
                    }
	   				</g>
	    	   </svg>
    	   </div>

           <MapOptions actions={{zoom: this.zoom }} />
           {/*<LayersOptions />*/}
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
    setCenter: (center) => {
        dispatch(updateCenter(center));
    },
    setCenterScreen: (center) =>{
        dispatch(updateCenterScreen(center));
    },
    setWinSize: (winSize) => {
        dispatch(updateWindow(winSize));
    },
    setWindowOffsets: (offsets) => {
        dispatch(updateWindowOffsets(offsets));
    },
    setPanelOffset: (offset) => {
        dispatch(updatePanelOffset(offset));
    },
    getLayers: (layers) => {
        dispatch(loadSites());
        dispatch(loadLayers());
        dispatch(loadFiltered(layers));
    },
    panelSmall: () => {
      dispatch(updatePanelSmall());
    },
    panelLarge: () => {
      dispatch(updatePanelLarge());
    },
  }
}

const Map = connect(mapStateToProps, mapDispatchToProps)(MapSVG);

export default Map;
