import React, { Component } from 'react';
import { render } from 'react-dom';

//---------------------------MAP OPTIONS---------------------------
//import * as d3 from 'd3';
//import { Map, TileLayer, ImageOverlay } from 'react-leaflet';
import tilingRaw, { scaleOps } from '../plug-ins/rawTiles.js';

//---------------------------PRE-DB / PRE-REDUX PLACEHOLDERS---------------------------
import {cirMain, clusterTest, narrativeTest} from '../pre-db/cirTest.js';


//---------------------------PRE DB / REDUX PLACEHOLDERS---------------------------
const TonerTiles = '../../../layouts/color/{z}/map_{x}_{y}.jpg';
const GreyTiles = '../../../layouts/grey/{z}/map_{x}_{y}.jpg';


const contain = { // to match css for initial map container
    height: 1024,
    width: 2048,
}


export default class MapSVG extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	mouseDivloc: [0,0],
        	mouseLast: [0,0],
        	mousePast: [0,0],
        	mousePos: [0,0],
            currentZoomLevel: 3,
            tilesize: 128,
            drag: '',
            xOff:0,
            yOff:0,
            xOffR:0,
            yOffR:0,
            trig: false,
            initialWidth: contain.width,
            initialHeight: contain.height,
            partWidth: 0,
            quarterWidth:0,
            greyOp: 1,
            colorOp: 1,
            labelT:'',
            labelS:'',

        };
        this.mouseLoc=this.mouseLoc.bind(this);

    }

    componentDidMount() {
        window.addEventListener("resize", this.refSize);
        this.refSize();

    }

    refSize(){
        let sele = window.document.getElementById("mapWin");
        let width = sele.attributes[0].ownerElement.clientWidth;
        let height = sele.attributes[0].ownerElement.clientHeight;
        this.setState({ initialWidth: width, initialHeight: height, partWidth: Math.floor(width*0.7388), quarterWidth: Math.floor(width*0.4222) });
    }

    mouseLoc(e) {
    	e.preventDefault;

    	let sele = window.document.getElementById("mapWin").attributes[0].ownerElement;
    	let mousePos = [e.screenX-sele.offsetLeft, e.screenY-sele.offsetTop];
    	this.setState({mouseDivloc: mousePos});

    	(e.type === 'mousedown')? this.setState({drag: 'start'}) : this.setState({drag: ''})
    	if (e.type === 'mouseup') {this.setState({mouseLast: mousePos, xOffR : this.state.xOff, yOffR: this.state.yOff })};
    }

    drag(e) {
    	e.preventDefault;

    	let lastX = this.state.xOffR, lastY = this.state.yOffR;
    	var sele = window.document.getElementById("mapWin").attributes[0].ownerElement;
    	var mousePos = [e.screenX-sele.offsetLeft, e.screenY-sele.offsetTop];
    	// let xJump = this.state.mouseDivloc[0] - mousePos[0] + this.state.mouseLast[0]-lastX;
    	// let yJump = this.state.mouseDivloc[1] - mousePos[1] + this.state.mouseLast[0]-lastX;
    	let offX = this.state.mouseDivloc[0] - mousePos[0] + lastX;
    	let offY = this.state.mouseDivloc[1] - mousePos[1] + lastY;
    	if (this.state.drag === 'start') {
    		this.setState({xOff: lastX, yOff: lastY, drag:'drag'}) ;
    		console.log('offsets start', offX, offY, lastX, lastY);
    	}	else if (this.state.drag === 'drag'){
    		this.setState({xOff: offX, yOff: offY }) ;
    		console.log('offsets norm', offX, offY, lastX, lastY);
    	} //else if (this.state.drag === ''){
    	// 	this.tempZoom(e, mousePos);
    	// }
    }

    tempZoom(e, mousePos) {
    	e.preventDefault;
    	/*
    	mouseposition + offsets => location on map
    	tile position = Math.floor(location/tilesize)
    	*/
    	let curX = this.state.mousePos[0]+this.state.xOff, curY =  this.state.mousePos[1]+this.state.yOff;
    	let resX = curX/this.state.tilesize, resY = curY/this.state.tilesize;
    	let mosPos = this.state.mousePos;

    	let xDif = Math.abs(mousePos[0]-this.state.mousePast[0]);
    	let curr, pix, oX, oY;

    	if (mousePos[1]>this.state.mousePast[1] && xDif <3) { //zoom in
    		curr = this.state.currentZoomLevel;
    		pix = this.state.tilesize + 2;
    		oX = this.state.xOff + 2*resX;
    		oY = this.state.yOff + 2*resY;
    	if (pix===256){ curr++; pix=128 }
    	if (curr>6){ curr=6; pix=256; oX = this.state.xOff; oY = this.state.yOff };

    	} else if (mousePos[1]<this.state.mousePast[1] && xDif <3) { //zoom out
    		curr = this.state.currentZoomLevel;
    		pix = this.state.tilesize - 2;
    		oX = this.state.xOff - 2*resX;
    		oY = this.state.yOff - 2*resY;
    	if (pix===128){ curr--; pix=256 }
    	if (curr<2){ curr=2; pix=128; oX = this.state.xOff; oY = this.state.yOff };
    	} else {
    		curr = this.state.currentZoomLevel;
    		pix = this.state.tilesize;
    		oX = this.state.xOff;
    		oY = this.state.yOff;
    		mosPos = mousePos;
    	}

    	this.setState({currentZoomLevel: curr, tilesize: pix, xOff : oX, xOffR: oX, yOff: oY, yOffR: oY, mousePast: mousePos, mousePos:mosPos });

    }

    tempZoomScroll(e) {
    	e.preventDefault;
    	var sele = window.document.getElementById("mapWin").attributes[0].ownerElement;
    	var mousePos = [e.screenX-sele.offsetLeft, e.screenY-sele.offsetTop];
    	/*
    	mouseposition + offsets => location on map
    	tile position = Math.floor(location/tilesize)
    	*/
    	let curX = mousePos[0]+this.state.xOff, curY = mousePos[1]+this.state.yOff;
    	let resX = curX/this.state.tilesize, resY = curY/this.state.tilesize;
    	let mosPos = mousePos;

    	let curr, pix, oX, oY;

    	if (e.deltaY>1) { //zoom in
    		curr = this.state.currentZoomLevel;
    		pix = this.state.tilesize + 4;
    		oX = this.state.xOff + 4*resX;
    		oY = this.state.yOff + 4*resY;
    	if (pix>=256){ curr++; pix=128 }
    	if (curr>6){ curr=6; pix=256; oX = this.state.xOff; oY = this.state.yOff };

    	} else if (e.deltaY<1) { //zoom out
    		curr = this.state.currentZoomLevel;
    		pix = this.state.tilesize - 4;
    		oX = this.state.xOff - 4*resX;
    		oY = this.state.yOff - 4*resY;
    	if (pix<=128){ curr--; pix=256 }
    	if (curr<2){ curr=2; pix=128; oX = this.state.xOff; oY = this.state.yOff };

    	} else {
    		curr = this.state.currentZoomLevel;
    		pix = this.state.tilesize;
    		oX = this.state.xOff;
    		oY = this.state.yOff;
    		mosPos = mousePos;
    	}

    	this.setState({currentZoomLevel: curr, tilesize: pix, xOff : oX, xOffR: oX, yOff: oY, yOffR: oY, mousePast: mousePos, mousePos:mosPos });

    }

    showLabel(e){
    	e.preventDefault;
    	let name = e.target.attributes.value.value.split('.');
    	this.setState({labelT:name[0], labelS: name[1]});
    }

    hideLabel(e){
    	e.preventDefault;
    	this.setState({labelT:'', labelS: ''});
    }

    render(){

    	const tiles = tilingRaw(this.state.currentZoomLevel, this.state.tilesize, [this.state.initialWidth, this.state.initialHeight], this.state.xOff, this.state.yOff );
    	const percent = tiles[0].percent;

    	let cirLayers = [];

    	let cirNew = cirMain.map(circle=>{
    		let newCir = Object.assign({},circle);
	    		newCir.cx = circle.cx*percent - this.state.xOff;
	    		newCir.cy = circle.cy*percent - this.state.yOff;
	    		newCir.r = circle.r*percent;
    		if (cirLayers.indexOf(circle.type) === -1){cirLayers.push(circle.type)};

    		return newCir;
    	})

    	return (
    	   <div className={this.props.baseClass} ref="size" id="mapWin"  >
    	   <div className="offset" onDrag={e=> console.log('being dragged')} onMouseDown = {e=>this.mouseLoc(e)}  onMouseUp = {e=>this.mouseLoc(e)} onMouseMove = {e=>this.drag(e)} onWheel = {e=>this.tempZoomScroll(e) } >
	    	   <svg width={this.state.initialWidth} height={this.state.initialHeight}  >
	    	   		<defs>
	    	   			<clipPath id="myClip">
	    	   				{cirNew &&
	    	   					cirNew.map(d=>{
	    	   						return (
	    	   						   <circle stroke="#000000" cx={d.cx} cy={d.cy} r={d.r} />
	    	   						        )
	    	   					})
	    	   				}
					    </clipPath>
	    	   		</defs>
	    	   		{/*<image
	      						xlinkHref = {`../../../layouts/novacco_grey_0402.jpg`}
	     						width={this.state.tilesize*(scaleOps[this.state.currentZoomLevel][0] + 1)}
								height={this.state.tilesize*(scaleOps[this.state.currentZoomLevel][1] + 1)}
								x = { -1 *this.state.xOff}
								y = { -1 *this.state.yOff }
								opacity = {.5}
	      						/>*/}
	      			<g className="grayscaleTiles">
	    	   		{tiles &&
	    	   			tiles.map(tile=>{
	    	   			//this will become <Greyraster tiles={tiles} opacity={this.state.bkOpacity}/>

	    	   				if (tile.xpos<this.state.initialWidth && tile.xpos+512>=0 && tile.ypos<this.state.initialHeight && tile.ypos+512>=0 ){ // only show those on screen
	    	   				return (
			    	   			<image
			      				xlinkHref = {`../../../layouts/grey/${tile.z}/map_${tile.x}_${tile.y}.jpg`}
			     					width={this.state.tilesize}
										height={this.state.tilesize}
										x = { tile.xpos }
										y = { tile.ypos }
										opacity = {.5}
	      						/>

	    	   				)
	    	   				}
	    	   			})
	    	   		}
	    	   		</g>
	    	   		<g className="allColorTiles">
	    	   		{tiles &&
	    	   			tiles.map(tile=>{

	    	   				if (tile.xpos<this.state.initialWidth && tile.xpos+512>=0 && tile.ypos<this.state.initialHeight && tile.ypos+512>=0 ){ // only show those on screen

	    	   				return (
	    	   					<image
	      						xlinkHref = {`../../../layouts/color/${tile.z}/map_${tile.x}_${tile.y}.jpg`}
			     					width={this.state.tilesize}
										height={this.state.tilesize}
										x = { tile.xpos }
										y = { tile.ypos }
										clipPath = "url(#myClip)"
	      						/>
	    	   				        )
	    	   				}
	    	   			})
	    	   		}
	    	   		</g>
	    	   		<g className="allLabelCircs">
	    	   		{cirNew &&
	   					cirNew.map(d=>{
	   						return (
	   						   		<circle className="circHL" cx={d.cx} cy={d.cy} r={d.r} strokeWidth={Math.pow(this.state.currentZoomLevel,2)/2} value={d.name} onMouseOver = {e=>this.showLabel(e)} onMouseOut={e=>this.hideLabel(e)} />
	   						    )
	   					})
	   				}
	   				{cirNew &&
	   					cirNew.map(d=>{
	   						if (d.name.split('.')[1] === this.state.labelS){
	   						return (
	   						   			<g>
			   						   		<text x={d.cx+d.r+14} y={d.cy} className="textHL" fontSize={Math.pow(this.state.currentZoomLevel,2)+ 6} >{this.state.labelT}</text>
			   						   		<text x={d.cx+d.r+14} y={d.cy+Math.pow(this.state.currentZoomLevel,2)*1.25} className="textSHL" fontSize={Math.pow(this.state.currentZoomLevel,2)} >{this.state.labelS}</text>
		   						   		</g>
	   						    )
	   						}
	   					})
	   				}
	   				</g>

	    	   </svg>
    	   </div>
    	 </div>
    	)
    }
}
