import React, { Component } from 'react';
import { render } from 'react-dom';
import * as d3 from 'd3';
import tiling from '../plug-ins/d3geotile.js';
import tilingRaw from '../plug-ins/rawTiles.js';

const TonerTiles = '../../../layouts/color/{z}/map_{x}_{y}.jpg';
const GreyTiles = '../../../layouts/grey/{z}/map_{x}_{y}.jpg';
const Attr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [16384/2,16384/4]; //locations should be in largest-scale, raw x,y... not projection

const contain = { // to match css for map container
    height: 1024,
    width: 2048,
}

//const tiles = tilingRaw(3, );


export default class MapSVG extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	mouseDivloc: [0,0],
        	mouseLast: [0,0],
            currentZoomLevel: 3,
            tilesize: 128,
            drag: '',
            xOff:0,
            yOff:0,
            xOffR:0,
            yOffR:0,
            trig: false,
            currentCenter: mapCenter,
            mouseCenter: [0,0],
            initialWidth: contain.width,
            initialHeight: contain.height,
            partWidth: 0,
            quarterWidth:0,
            greyOp: 1,
            colorOp: 1,

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
    	console.log('mouse position ', this.state.mouseDivloc, e.type);
    	(e.type === 'mousedown')? this.setState({drag: 'start'}) : this.setState({drag: ''})
    	if (e.type === 'mouseup') {this.setState({mouseLast: mousePos, xOffR : this.state.xOff, yOffR: this.state.yOff })};
    }

    drag(e) {
    	e.preventDefault;
    	console.log(e.type);
    	let lastX = this.state.xOffR, lastY = this.state.yOffR;
    	let sele = window.document.getElementById("mapWin").attributes[0].ownerElement;
    	let mousePos = [e.screenX-sele.offsetLeft, e.screenY-sele.offsetTop];
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
    	}
    }

    tempZoom(e) {
    	e.preventDefault;
    	console.log(e.deltaY);

    	let curr, pix;

    	if (e.deltaY>1) { //zoom in
    		curr = this.state.currentZoomLevel;
    		pix = this.state.tilesize + 2;
    	if (pix>=256){ curr++; pix=128 }
    	if (curr>6){ curr=6; pix=256};

    	} else if (e.deltaY<1) { //zoom out
    		curr = this.state.currentZoomLevel;
    		pix = this.state.tilesize - 2;
    	if (pix<=128){ curr--; pix=256 }
    	if (curr<2){ curr=2; pix=256};
    	}

    	this.setState({currentZoomLevel: curr, tilesize: pix });
    }

    render(){

    	const tiles = tilingRaw(this.state.currentZoomLevel, this.state.tilesize, [this.state.initialWidth, this.state.initialHeight], this.state.xOff, this.state.yOff );

    	return (
    	   <div className="mFullO mainMaps" ref="size" id="mapWin"  >
    	   <div className="offset" onDrag={e=> console.log('being dragged')} onMouseDown = {e=>this.mouseLoc(e)}  onMouseUp = {e=>this.mouseLoc(e)} onMouseMove = {e=>this.drag(e)} >
	    	   <svg width={this.state.initialWidth} height={this.state.initialHeight} onWheel ={e=>this.tempZoom(e)}  >
	    	   		<defs>
	    	   			<clipPath id="myClip">
					      	<circle stroke="#000000" cx="50" cy="50" r="40" />
				            <circle stroke="#000000" cx="193.949" cy="235" r="74.576"/>
				            <circle stroke="#000000" cx="426.576" cy="108.305" r="47.034"/>
				            <circle stroke="#000000" cx="346.915" cy="255.763" r="43.644"/>
				            <circle stroke="#000000" cx="255.39" cy="82.882" r="35.17"/>
					    </clipPath>
	    	   		</defs>
	    	   		{tiles &&
	    	   			tiles.map(tile=>{
	    	   			//this will become <Greyraster tiles={tiles} opacity={this.state.bkOpacity}/>

	    	   				if (tile.xpos<this.state.initialWidth && tile.xpos+256>=0 && tile.ypos<this.state.initialHeight && tile.ypos+256>=0 ){ // only show those on screen
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
	    	   		{tiles &&
	    	   			tiles.map(tile=>{

	    	   				if (tile.xpos<this.state.initialWidth && tile.xpos+256>=0 && tile.ypos<this.state.initialHeight && tile.ypos+256>=0 ){ // only show those on screen

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
	    	   		<circle stroke="#ffffff" fill="none" cx="50" cy="50" r="40" strokeWidth="4" />
		            <circle stroke="#ffffff" fill="none" cx="193.949" cy="235" r="74.576" strokeWidth="4" />
		            <circle stroke="#ffffff" fill="none" cx="426.576" cy="108.305" r="47.034" strokeWidth="4" />
		            <circle stroke="#ffffff"  fill="none" cx="346.915" cy="255.763" r="43.644" strokeWidth="4" />
		            <circle stroke="#ffffff"  fill="none" cx="255.39" cy="82.882" r="35.17"  strokeWidth="4" />

	    	   </svg>
    	   </div>
    	 </div>
    	)
    }
}
