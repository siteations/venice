import React, { Component } from 'react';
import { render } from 'react-dom';

//---------------------------MATERIAL UI---------------------------
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Toggle, Slider, Chip } from 'material-ui';


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

const styles = {
  root: {
    display: 'flex',
    margin: 5,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  chip: {
    margin: 2,

  },
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
            winTop:0,
            winLeft:0,
            initialWidth: contain.width,
            initialHeight: contain.height,
            partWidth: 0,
            quarterWidth:0,
            colorOp: false,
            layerOp: true,
            labelT:'',
            labelS:'',

        };
        this.mouseLoc=this.mouseLoc.bind(this);
        this.refSize=this.refSize.bind(this);

    }

    componentDidMount() {
        window.addEventListener("resize", this.refSize);
        this.refSize();

    }

    refSize(){
        let sele = window.document.getElementById("mapWin");
        let width = sele.attributes[0].ownerElement.clientWidth;
        let height = sele.attributes[0].ownerElement.clientHeight;
        this.setState({ initialWidth: width, initialHeight: height, partWidth: Math.floor(width*0.7388), quarterWidth: Math.floor(width*0.4222), winTop:sele.offsetTop, winLeft: sele.offsetLeft });
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
    		//console.log('offsets start', offX, offY, lastX, lastY);
    	}	else if (this.state.drag === 'drag'){
    		this.setState({xOff: offX, yOff: offY }) ;
    		//console.log('offsets norm', offX, offY, lastX, lastY);
    	}
    }

    zoomScroll(e) {
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
    		pix = this.state.tilesize + 2;
    		oX = this.state.xOff + 2*resX;
    		oY = this.state.yOff + 2*resY;
    	if (pix>=256){ curr++; pix=128 }
    	if (curr>6){ curr=6; pix=256; oX = this.state.xOff; oY = this.state.yOff };

    	} else if (e.deltaY<1) { //zoom out
    		curr = this.state.currentZoomLevel;
    		pix = this.state.tilesize - 2;
    		oX = this.state.xOff - 2*resX;
    		oY = this.state.yOff - 2*resY;
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

    // opacityAlt(e,newValue){
    //     e.preventDefault;
    //     this.setState({colorOp:newValue});
    // }

    opacityAlt(e,isInputChecked){
        e.preventDefault;
        this.setState({colorOp:isInputChecked});
    }

    // opacityLayers(e,newValue){
    //     e.preventDefault;
    //     this.setState({layerOp:newValue});
    // }

    opacityLayers(e,isInputChecked){
        e.preventDefault;
        this.setState({layerOp:isInputChecked});
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

        console.log(cirLayers);
        // 1) segment into circle layers by type
        // 2) refactor to be particular components for import - rework state to have props/dispatch compatibility with zoom level & offsets or centers
        // 3) brainstorm a sample of overlay circles - each triggering panel interactions

    	return (

    	<div className={this.props.baseClass} ref="size" id="mapWin" onAnimationEnd = {e=> this.refSize(e) } >
    	   <div className="offset" onMouseDown = {e=>this.mouseLoc(e)}  onMouseUp = {e=>this.mouseLoc(e)} onMouseMove = {e=>this.drag(e)} onWheel = {e=>this.zoomScroll(e) } >
	    	   <svg width={this.state.initialWidth} height={this.state.initialHeight}  >
	    	   		<defs>
                        <filter id="greyscale">
                            <feColorMatrix type="saturate" values="0" />
                        </filter>
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

	    	   		<g className="allTiles" >
	    	   		{tiles &&
	    	   			tiles.map(tile=>{

	    	   				if (tile.xpos<this.state.initialWidth && tile.xpos+256>=0 && tile.ypos<this.state.initialHeight && tile.ypos+256>=0 ){ // only show those on screen

	    	   				return (
                                <g>
                                    {this.state.colorOp===false &&
                                    <image
                                    xlinkHref = {`../../../layouts/color/${tile.z}/map_${tile.x}_${tile.y}.jpg`}
                                        width={this.state.tilesize}
                                            height={this.state.tilesize}
                                            x = { tile.xpos }
                                            y = { tile.ypos }
                                            opacity = {0.5}
                                            filter="url(#greyscale)"
                                    />
                                    }
                                    {this.state.colorOp &&
                                    <image
                                    xlinkHref = {`../../../layouts/color/${tile.z}/map_${tile.x}_${tile.y}.jpg`}
                                        width={this.state.tilesize}
                                            height={this.state.tilesize}
                                            x = { tile.xpos }
                                            y = { tile.ypos }
                                            opacity = {1}
                                    />
                                    }
                                    {this.state.layerOp &&
    	    	   					<image
    	      						xlinkHref = {`../../../layouts/color/${tile.z}/map_${tile.x}_${tile.y}.jpg`}
    			     					width={this.state.tilesize}
    										height={this.state.tilesize}
    										x = { tile.xpos }
    										y = { tile.ypos }
    										clipPath = "url(#myClip)"
                                            opacity={1}
    	      						/>
                                    }
                                </g>
	    	   				        )
	    	   				}
	    	   			})
	    	   		}
	    	   		</g>
                    {this.state.layerOp &&
	    	   		<g className="allLabelCircs" >
	    	   		{cirNew &&
	   					cirNew.map(d=>{
                            //strokeWidth={Math.pow(this.state.currentZoomLevel,2)/2}
	   						return (
	   						   		<circle className="circHL" cx={d.cx} cy={d.cy} r={d.r} strokeWidth={Math.pow(this.state.currentZoomLevel,2)/3} value={d.name} onMouseOver = {e=>this.showLabel(e)} onMouseOut={e=>this.hideLabel(e)} />
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
                    }
	    	   </svg>
    	   </div>
           <div className="intPanel center-block text-center">
                <br/>
                <button className="btn btn-default btn-sm bIconSm"><span className="glyphicon glyphicon-plus"></span></button>
                <br/>
                <button className="btn btn-default btn-sm bIconSm"><span className="glyphicon glyphicon-minus"></span></button>
                <br/>
                <div style={styles.root}>
                    <Toggle onToggle={(e,isInputChecked)=>this.opacityAlt(e,isInputChecked)}/>
                </div>
                <p>color<br/>underlay</p>
                <div style={styles.root}>
                    <Toggle defaultToggled="true" onToggle={(e,isInputChecked)=>this.opacityLayers(e,isInputChecked)}/>
                    {/*<Slider style={{height: 60}} axis="y-reverse" defaultValue={1} onChange={(e,newValue)=>this.opacityLayers(e,newValue)}/>*/}
                </div>
                <p>highlight<br/>layers</p>
                <br/>
                <p>keys<br/>here</p>

           </div>
    	 </div>

    	)
    }
}
