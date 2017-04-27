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

const cirTest = [ // this should be akin to json entries, minus name, etc.
	{ cx:9335, cy:5672, r:1380/2, name: 'test1' },
	{ cx:200, cy:250, r:75, name: 'test2'  },
	{ cx:450, cy:600, r:75, name: 'test3'  },
	{ cx:450, cy:100, r:40, name: 'test4'  },
	{ cx:900, cy:400, r:75, name: 'test5'  },
	{ cx:60, cy:100, r:75, name: 'test6'  },
];

const scaleOps = {
    '2': [3 , 1], //max in each set
    '3': [7 , 3],
    '4': [15 , 7],
    '5': [31 , 15],
    '6': [63 , 31],
  };

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
    	} else if (this.state.drag === ''){
    		this.tempZoom(e, mousePos);
    	}
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

    	console.log({currentZoomLevel: curr, tilesize: pix, xOff : oX, xOffR: oX, yOff: oY, yOffR: oY, mousePast: mousePos, mousePos:mosPos });
    	this.setState({currentZoomLevel: curr, tilesize: pix, xOff : oX, xOffR: oX, yOff: oY, yOffR: oY, mousePast: mousePos, mousePos:mosPos });

    }

    render(){

    	const tiles = tilingRaw(this.state.currentZoomLevel, this.state.tilesize, [this.state.initialWidth, this.state.initialHeight], this.state.xOff, this.state.yOff );
    	const percent = tiles[0].percent;

    	let cirNew = cirTest.map(circle=>{
    		let newCir = Object.assign({},circle);
    		newCir.cx = circle.cx*percent - this.state.xOff;
    		newCir.cy = circle.cy*percent - this.state.yOff;
    		newCir.r = circle.r*percent;
    		return newCir;
    	})

    	console.log('current scale', cirNew, percent);

    	return (
    	   <div className="mFullO mainMaps" ref="size" id="mapWin"  >
    	   <div className="offset" onDrag={e=> console.log('being dragged')} onMouseDown = {e=>this.mouseLoc(e)}  onMouseUp = {e=>this.mouseLoc(e)} onMouseMove = {e=>this.drag(e)} >
	    	   <svg width={this.state.initialWidth} height={this.state.initialHeight+300}  >
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
	    	   		{cirNew &&
	   					cirNew.map(d=>{
	   						return (
	   						   <circle stroke="#ffffff" fill="none" cx={d.cx} cy={d.cy} r={d.r} strokeWidth="4" />
	   						        )
	   					})
	   				}

	    	   </svg>
    	   </div>
    	 </div>
    	)
    }
}
