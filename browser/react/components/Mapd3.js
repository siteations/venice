import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';


//---------------------------MATERIAL UI---------------------------
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Toggle, Slider, Chip } from 'material-ui';


//---------------------------MAP OPTIONS---------------------------
//import * as d3 from 'd3';
//import { Map, TileLayer, ImageOverlay } from 'react-leaflet';
import tilingRaw, { scaleOps } from '../plug-ins/rawTiles.js';
import MapOptions from './MapOptions.js';

//---------------------------PRE-DB / PRE-REDUX PLACEHOLDERS---------------------------
import {cirMain, clusterTest, narrativeTest} from '../pre-db/cirTest.js';


//---------------------------ACTION for DISPATCH---------------------------
import {updateZoom, updateTile, updateOffsets, updateCenter, updateCenterScreen, updateWindow, updateWindowOffsets, updateOffsetsResidual} from '../action-creators/mapActions.js';
import {updateColor, updateAnno, updateDetail} from '../action-creators/optionActions.js';



//---------------------------PRE DB / REDUX PLACEHOLDERS---------------------------
const TonerTiles = '../../../layouts/color/{z}/map_{x}_{y}.jpg';
const GreyTiles = '../../../layouts/grey/{z}/map_{x}_{y}.jpg';


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

class MapSVG extends Component {
	constructor(props) {
        super(props);
        this.state = { // more or less temporary var for map manipulation
        	mouseDivloc: [0,0],
        	mouseLast: [0,0],
        	mousePast: [0,0],
        	mousePos: [0,0],
            xyOffR: [0,0],
            drag: '',
            trig: false,
            colorOp: false,
            layerOp: true,
            detailOp: true,
            labelT:'',
            labelS:'',
            //xyOff: this.props.map.xyOffsets,
            //currentZoomLevel: this.props.map.currZoom,
            //tilesize: this.props.map.tileSize,
            //winTopLeft: this.props.map.windowOffsets,
            //initialSize: this.props.map.windowSize,

        };
        this.mouseLoc=this.mouseLoc.bind(this);
        this.refSize=this.refSize.bind(this);
        this.zoomIn = this.zoomIn.bind(this);
        this.zoomOut = this.zoomOut.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.refSize);
        this.refSize();

    }

    refSize(){
        let sele = window.document.getElementById("mapWin").attributes[0].ownerElement;
        let width = sele.clientWidth;
        let height = sele.clientHeight;

        this.props.setWindowOffsets([sele.offsetTop, sele.offsetLeft]);
        this.props.setWinSize([width, height]);
        this.props.setCenterScreen([width/2, height/2]);

        if (this.props.map.xyOffsets[0]===0){
            let w=this.props.map.tileSize*(scaleOps[this.props.map.currZoom][0]+1), h =this.props.map.tileSize*(scaleOps[this.props.map.currZoom][1]+1);

            this.props.setCurrOffsets([(width-w)/-2,(height-h)/-2]);
            this.props.setOffsetsR([(width-w)/-2,(height-h)/-2]);
        }
    }

    mouseLoc(e) {
    	e.preventDefault;

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
    	e.preventDefault;

    	let [lastX, lastY] = this.props.map.xyOffsetsR;
    	var sele = window.document.getElementById("mapWin").attributes[0].ownerElement;
    	var mousePos = [e.screenX-sele.offsetLeft, e.screenY-sele.offsetTop];
    	let offX = this.state.mouseDivloc[0] - mousePos[0] + lastX;
    	let offY = this.state.mouseDivloc[1] - mousePos[1] + lastY;

        /*if (this.state.drag === 'start') {
            this.setState({xyOff: [lastX, lastY], drag:'drag'}) ;
        }   else if (this.state.drag === 'drag'){
            this.setState({xyOff: [offX, offY] });
        }*/

    	if (this.state.drag === 'start') {
    		this.setState({drag:'drag'});
            this.props.setCurrOffsets(this.props.map.xyOffsetsR);
    	}	else if (this.state.drag === 'drag'){
    		this.props.setCurrOffsets([offX, offY]);
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

    zoomIn(e){
        e.preventDefault;

        let [mouseX, mouseY]=this.props.map.xyCenter;
        let curX = (mouseX+this.props.map.xyOffsets[0]), curY = (mouseY+this.props.map.xyOffsets[1]);

        let resX = curX*2, resY = curY*2;
        let newOx = resX-mouseX, newOy = resY-mouseY;

        let curr = this.props.map.currZoom, pix = this.props.map.tileSize, oX =this.props.map.xyOffsets[0], oY=this.props.map.xyOffsets[1];

        if (curr<6) { //zoom in
            curr++, oX = newOx, oY = newOy;
        }

        this.props.setOffsetsR([oX, oY]);
        this.props.setCurrOffsets([oX, oY]);
        this.props.setCurrZoom(curr);
        this.props.setCurrTilesize(pix);

    }

    zoomOut(e){
        e.preventDefault;

        let [mouseX, mouseY]=this.props.map.xyCenter;
        let curX = (mouseX+this.props.map.xyOffsets[0]), curY = (mouseY+this.props.map.xyOffsets[1]);

        let resX = curX/2, resY = curY/2;
        let newOx = resX-mouseX, newOy = resY-mouseY;

        let curr = this.props.map.currZoom, pix = this.props.map.tileSize, oX =this.props.map.xyOffsets[0], oY=this.props.map.xyOffsets[1];

        if (curr>2) { //zoom in
            curr--, oX = newOx, oY = newOy;
        }

        this.props.setOffsetsR([oX, oY]);
        this.props.setCurrOffsets([oX, oY]);
        this.props.setCurrZoom(curr);
        this.props.setCurrTilesize(pix);
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

        //console.log('store to props', this.props);

    	const tiles = tilingRaw(this.props.map.currZoom, this.props.map.tileSize, [this.props.map.windowSize[0], this.props.map.windowSize[1]], this.props.map.xyOffsets[0], this.props.map.xyOffsets[1] );
    	const percent = tiles[0].percent;

    	let cirLayers = [];
        //["ritual", "monastery", "convent", "bascilica", "non-catholic", "plague", "parish"]
        //["monastery", "convent", "non-catholic"]



    	let cirNew = cirMain.map(circle=>{
    		let newCir = Object.assign({},circle);
	    		newCir.cx = circle.cx*percent - this.props.map.xyOffsets[0];
	    		newCir.cy = circle.cy*percent - this.props.map.xyOffsets[1];
	    		newCir.r = circle.r*percent;
    		if (cirLayers.indexOf(circle.type) === -1){cirLayers.push(circle.type)};

                return newCir;
            })
        .filter(circle=> (this.props.layers.indexOf(circle.type)>-1));

        // 2) refactor to be particular components for import - rework state to have props/dispatch compatibility with zoom level & offsets or centers
        // 3) brainstorm a sample of overlay circles - each triggering panel interactions

    	return (

    	<div className={this.props.baseClass} ref="size" id="mapWin" onAnimationEnd = {e=> this.refSize(e) } >
    	   <div className="offset" onMouseDown = {e=>this.mouseLoc(e)}  onMouseUp = {e=>this.mouseLoc(e)} onMouseMove = {e=>this.drag(e)} onWheel = {e=>this.zoomScroll(e) } >
	    	   <svg width={this.props.map.windowSize[0]} height={this.props.map.windowSize[1]}  >
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
                    <g className="lowResUnderlay">
                        <image
                                    xlinkHref = {`../../../layouts/novacco_color_0804.jpg`}
                                        width={this.props.map.tileSize*(scaleOps[this.props.map.currZoom][0]+1)}
                                            height={this.props.map.tileSize*(scaleOps[this.props.map.currZoom][1]+1)}
                                            x = { -1 * this.props.map.xyOffsets[0] }
                                            y = { -1 * this.props.map.xyOffsets[1] }
                                            opacity = {(this.props.options.color===false)? .5 : 1 }
                                            filter={(this.props.options.color===false)? "url(#greyscale)" : "" }
                        />

                    </g>
	    	   		<g className="underlayTiles" >
	    	   		{tiles &&
	    	   			tiles.map(tile=>{

	    	   				if (tile.xpos<this.props.map.windowSize[0] && tile.xpos+256>=0 && tile.ypos<this.props.map.windowSize[1] && tile.ypos+256>=0 ){ // only show those on screen

	    	   				return (
                                    <image
                                    xlinkHref = {`../../../layouts/color/${tile.z}/map_${tile.x}_${tile.y}.jpg`}
                                        width={this.props.map.tileSize}
                                            height={this.props.map.tileSize}
                                            x = { tile.xpos }
                                            y = { tile.ypos }
                                            opacity = {(this.props.options.color===false)? .75 : 1 }
                                            filter={(this.props.options.color===false)? "url(#greyscale)" : "" }
                                    />
                            )}
                        })
                    }
                    {this.props.options.anno && //black masking below

                                    <rect
                                        width={this.props.map.windowSize[0]}
                                        height={this.props.map.windowSize[1]}
                                            x = { 0 }
                                            y = { 0}
                                            fill="#21160b"
                                            opacity={(this.props.options.color===false)? .65 : .35 }
                                    />
                    }
                    {tiles && this.props.options.anno &&
                        tiles.map(tile=>{

                            if (tile.xpos<this.props.map.windowSize[0] && tile.xpos+256>=0 && tile.ypos<this.props.map.windowSize[1] && tile.ypos+256>=0 ){ // only show those on screen

                            return (
    	    	   					<image
    	      						xlinkHref = {`../../../layouts/color/${tile.z}/map_${tile.x}_${tile.y}.jpg`}
    			     					width={this.props.map.tileSize}
    										height={this.props.map.tileSize}
    										x = { tile.xpos }
    										y = { tile.ypos }
    										clipPath = "url(#myClip)"
                                            opacity={1}
    	      						/>
	    	   				        )
	    	   				}
	    	   			})
	    	   		}
	    	   		</g>
                    {this.props.options.anno &&
	    	   		<g className="allLabelCircs" >
	    	   		{cirNew &&
	   					cirNew.map(d=>{
                            //strokeWidth={Math.pow(this.state.currentZoomLevel,2)/2}
	   						return (
	   						   		<circle className="circHL" cx={d.cx} cy={d.cy} r={d.r} value={d.name} onMouseOver = {e=>this.showLabel(e)} onMouseOut={e=>this.hideLabel(e)} />
	   						    )
	   					})
	   				}
	   				{cirNew &&
	   					cirNew.map(d=>{
	   						if (d.name.split('.')[1] === this.state.labelS){
	   						return (
	   						   			<g>
			   						   		<text x={d.cx+d.r+14} y={d.cy} className="textHL" fontSize={Math.pow(this.props.map.currZoom,2)+ 6} >{this.state.labelT}</text>
			   						   		<text x={d.cx+d.r+14} y={d.cy+Math.pow(this.props.map.currZoom,2)*1.25} className="textSHL" fontSize={Math.pow(this.props.map.currZoom,2)} >{this.state.labelS}</text>
		   						   		</g>
	   						    )
	   						}
	   					})
	   				}
	   				</g>
                    }
	    	   </svg>
    	   </div>
           <MapOptions actions={{opacity:this.opacityAlt, layers: this.opacityLayers, details: this.detailLayers, in: this.zoomIn, out:this.zoomOut}} layerOp={this.state.layerOp} />
           {/*<div className="intPanel center-block text-center">
                <br/>
                <button className="btn btn-default btn-sm bIconSm"><span className="glyphicon glyphicon-plus"></span></button>
                <br/>
                <button className="btn btn-default btn-sm bIconSm"><span className="glyphicon glyphicon-minus"></span></button>
                <h5>zoom</h5>
                <br/>
                <div style={styles.root}>
                    <Toggle onToggle={(e,isInputChecked)=>this.opacityAlt(e,isInputChecked)}/>
                </div>
                <h5>color</h5>
                <div style={styles.root}>
                    <Toggle defaultToggled={true} onToggle={(e,isInputChecked)=>this.opacityLayers(e,isInputChecked)}/>
                    <Slider style={{height: 60}} axis="y-reverse" defaultValue={1} onChange={(e,newValue)=>this.opacityLayers(e,newValue)}/>
                </div>
                <h5>layers</h5>

                <div style={styles.root}>
                    <Toggle defaultToggled={this.state.layerOp} onToggle={(e,isInputChecked)=>this.detailLayers(e,isInputChecked)}/>
                   <Slider style={{height: 60}} axis="y-reverse" defaultValue={1} onChange={(e,newValue)=>this.opacityLayers(e,newValue)}/>
                </div>

                <h5>local<br/>details</h5>
                <br/>
           </div>
       */}
    	 </div>

    	)
    }
}


const mapStateToProps = (state, ownProps) => {
  return {
    map: state.map,
    options: state.options,
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
  }
}

const Map = connect(mapStateToProps, mapDispatchToProps)(MapSVG);

export default Map;
