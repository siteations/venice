import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

//---------------------------MAP OPTIONS & COMPONENTS---------------------------
import { tiling, scaleOps, sitesFiltered, centerRescaled, reverseCenter } from '../plug-ins/rawTiles.js';
import { spacingFrame } from '../plug-ins/rawDetails.js';
import { ClipTiles, BackgroundTiles, BackgroundMask, Underlay } from './TileVariants.js';
import DetailOver from './AnnoVariants.js';
import MapOptions from './MapOptions.js';
import Tour from './Tour.js';


//---------------------------PRE-DB / PRE-REDUX PLACEHOLDERS---------------------------
import {cirMain} from '../pre-db/cirTest.js';


//---------------------------ACTION for DISPATCH---------------------------
import {updateZoom, updateTile, updateOffsets, updateCenter, updateCenterScreen, updateWindow, updateWindowOffsets, updateOffsetsResidual, updatePanelOffset} from '../action-creators/mapActions.js';

import {updateColor, updateAnno, updateDetail, updatePanelSmall, updatePanelLarge} from '../action-creators/optionActions.js';

import {loadLayers, updateSite, overlayDetails, loadSites, addAllLayers, loadFiltered, getDetailsNarratives, setDetailId, addNewSiteCenter, addNewSiteRadius } from '../action-creators/siteActions.js';

import { setTitlesCore, setTitle, setNarr } from '../action-creators/panelActions.js';

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
            labelClick: false,
            labelT:'',
            labelS:'',

        };
        this.mouseLoc=this.mouseLoc.bind(this);
        this.refSize=this.refSize.bind(this);
        this.zoom = this.zoom.bind(this);
        this.zoomTo = this.zoomTo.bind(this);
        this.loadPanel = this.loadPanel.bind(this);
        this.addCenter = this.addCenter.bind(this);
        //this.flyTo
        //this.other

    }

    componentDidMount() {
        window.addEventListener("resize", this.refSize);
        this.refSize();
        this.props.getLayers(this.props.sites.currLayers);
        this.props.getAllDetailsNarratives();
    }

    refSize(){
        let sele = window.document.getElementById("mapWin").attributes[0].ownerElement;
        let width = sele.clientWidth;
        let panelW = (this.props.map.windowSize[0]-width)/2;
        //if (panelW <= 0){ panelW = 0; } else { panelW *= 0.5; };

        // if (width<this.props.map.windowSize[0]){
        //     width=this.props.map.windowSize[0];
        // };
        let height = sele.clientHeight;
        let [xOff, yOff] = this.props.map.xyOffsets;
        let [xOffR, yOffR] = this.props.map.xyOffsetsR;

        this.props.setWindowOffsets([sele.offsetLeft, sele.offsetTop]);
        this.props.setWinSize([width, height]);
        this.props.setPanelOffset(panelW); // for recenter;

        // if (width<this.props.map.windowSize[0]){
        //     this.props.setOffsetsR([xOff + panelW , yOff]);
        //     this.props.setCurrOffsets([xOffR + panelW , yOffR]);
        // } else {
            this.props.setOffsetsR([xOff + panelW, yOff]);
            this.props.setCurrOffsets([xOffR + panelW , yOffR]);
        // }
        this.props.setCenterScreen([width/2, height/2]);

        if (this.props.map.xyOffsets[0]===0){
            let w=this.props.map.tileSize*(scaleOps[this.props.map.currZoom][0]+1), h =this.props.map.tileSize*(scaleOps[this.props.map.currZoom][1]+1);

            this.props.setCurrOffsets([(width-w)/-2,(height-h)/-2]);
            this.props.setOffsetsR([(width-w)/-2,(height-h)/-2]);
        }
    }

    mouseLoc(e) {
    	e.preventDefault();
        var x, y;
        if (e.type==='mouseup' || e.type==="mousedown"){ x=e.clientX; y=e.clientY };
        if (e.type==='touchstart' || e.type==="touchend"){ x=e.changedTouches[0].clientX; y=e.changedTouches[0].clientY };

    	let sele = window.document.getElementById("mapWin").attributes[0].ownerElement;
    	var mousePos = [x-sele.offsetLeft, y-sele.offsetTop];
    	this.setState({mouseDivloc: mousePos});

    	(e.type === 'mousedown'|| e.type==='touchstart')? this.setState({drag: 'start'}) : this.setState({drag: ''});
    	if (e.type === 'mouseup'|| e.type==='touchend') {
            this.setState({mouseLast: mousePos});
            this.props.setOffsetsR(this.props.map.xyOffsets);
        };
    }

    drag(e) {
    	e.preventDefault();
        var x, y;
        if (e.type==='mousemove'){ x=e.clientX; y=e.clientY };
        if (e.type==='touchmove'){ x=e.targetTouches[0].clientX; y=e.targetTouches[0].clientY };

    	let [lastX, lastY] = this.props.map.xyOffsetsR;
    	var sele = window.document.getElementById("mapWin").attributes[0].ownerElement;
    	//var mousePos = [e.screenX-sele.offsetLeft, e.screenY-sele.offsetTop];
        var mousePos = [x-sele.offsetLeft, y-sele.offsetTop];
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
        var mousePos = [e.clientX-sele.offsetLeft, e.clientY-sele.offsetTop];
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

    zoomDC(e, type){
        e.preventDefault();
        let multiplier;
        if (type==='in'){
            multiplier=2;
        } else if (type==='out'){
            multiplier=0.5;
        }

        var sele = window.document.getElementById("mapWin").attributes[0].ownerElement;
        var mouseX = e.clientX-sele.offsetLeft, mouseY = e.clientY-sele.offsetTop;

        let curX = mouseX+this.props.map.xyOffsets[0], curY = mouseY+this.props.map.xyOffsets[1];

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

    zoomTo(e, id){ // rework to parallel basic scroll zoom...
        e.preventDefault();

        this.props.updateSite(id);
        let site = this.props.sites.allSites.filter(site=>site.id === +id)[0];
        if (site){
            let siteCent = [site.cx, site.cy];
        let obj = this.props.sites.genNarratives.filter(narr => +narr.coreId===+id);

        this.props.setTitles(site.name.split('.'));
        this.props.updateNarrative(obj[0]);

        let wind = this.props.map.windowSize, panel = this.props.panel.panelSize;
        if (!this.props.options.panelNone){
            var win = [wind[0]-panel[0], wind[1]];
        } else {
            var win = wind;
        }

        let zoom = (this.props.map.currZoom<6)? this.props.map.currZoom+1 : 6 ;
        //console.log(this.props.map.currZoom, zoom);
        //let tilesize = this.props.map.tileSize;

        let offset = centerRescaled(zoom, siteCent, win, 128);

        this.props.setOffsetsR([offset.x, offset.y]);
        this.props.setCurrOffsets([offset.x, offset.y]);
        this.props.setCurrZoom(+zoom);
        this.props.setCurrTilesize(128);

        } else {
            this.zoomDC(e, 'in');
            //let siteCent = [0, 0]; //rework this to accept current center
        }
    }

    flyTo(e){
        e.preventDefault();

    }

    showLabel(e){
    	e.preventDefault();
    	let name = e.target.attributes.value.value.split('.');
        let siteId = e.target.attributes.id.value;
        this.props.setTitles(name);

        this.props.updateSite(siteId);

        let obj = this.props.sites.genNarratives.filter(narr => +narr.coreId===+siteId);
        this.props.updateNarrative(obj[0]);


    }

    hideLabel(e){
    	e.preventDefault();
        if (this.props.sites.currSiteOn===false){
    	this.props.setTitles('', '');
        this.props.updateSite(0);
        }
    }

    setLabel(e){
        e.preventDefault();
        //if (this.state.labelClick===false){
        this.showLabel(e)
        this.props.overlayDetails(true);
        //} else {
            //this.setState({labelT:'', labelS: '', labelClick: false});
        //}
    }

    loadPanel(e, source){
        e.preventDefault();
        if (source ==='core') {
            let subsiteId = this.props.sites.currSite;
            let obj = this.props.sites.genNarratives.filter(narr => +narr.coreId===+subsiteId);
            let clustId = obj[0].clusterId;
            this.props.setDetailId( 0 , clustId);
        } else {
            let subsiteId = e.target.attributes.id.value;
            let clustId = this.props.sites.genDetails.filter(detail => +detail.id === +subsiteId)[0].clusterId;
            var obj = this.props.sites.genNarratives.filter(narr => +narr.minorId===+subsiteId && +narr.clusterId===+clustId)[0];
            if (obj===undefined) {obj={}};
            this.props.setDetailId(+subsiteId, clustId);
            this.props.updateNarrative(obj);
        }
    }

    selectShowPanel(e, id){
        e.preventDefault();

        if (this.props.options.panelNone){
            this.props.panelSmall();
        };

        this.zoomTo(e, id);

        this.showLabel(e)
        this.props.overlayDetails(true);
        this.loadPanel(e,'core');

        //more mouse elements here...

    }

    addCenter(e, type){
        e.preventDefault(); //reverse logic of top

        var mouseX = e.clientX-this.props.map.windowOffsets[0], mouseY = e.clientY-this.props.map.windowOffsets[1];

        let curX = mouseX+this.props.map.xyOffsets[0], curY = mouseY+this.props.map.xyOffsets[1]
        let zoom = this.props.map.currZoom, pix = this.props.map.tileSize;
        let {x,y} = reverseCenter(zoom, [curX, curY], pix);


        if (type==='center' && this.props.sites.newCx===0){
            this.props.addNewSiteCenter(Math.floor(x), Math.floor(y), Math.floor(mouseX), Math.floor(mouseY));
        } else if (type==='center' && this.props.sites.newCx!==0){
            this.props.addNewSiteCenter(0, 0, 0, 0);
            this.props.addNewSiteRadius(0, 0);
        } else if (type==='radius'){
            //get xDif, yDif and take roots
            let xDif = x-this.props.sites.newCx, yDif = y-this.props.sites.newCy;
            let x2 = Math.pow(xDif, 2), y2 = Math.pow(yDif, 2);

            let sx = Math.pow(mouseX-this.props.sites.newX, 2), sy = Math.pow(mouseY-this.props.sites.newY, 2);
            let radScreen = Math.pow((sx+sy), .5);
            let radius = Math.pow((x2+y2), .5);

            this.props.addNewSiteRadius(Math.floor(radius), Math.floor(radScreen));

        }
    }

    render(){

        //minor site/tile filtering at the top of the map... as is fairly often updated

    	const tiles = tiling(this.props.map.currZoom, this.props.map.tileSize, this.props.map.windowSize, this.props.map.xyOffsets);
        const cirNew = sitesFiltered(this.props.map.xyOffsets, this.props.sites.allSites, this.props.sites.currLayers, tiles[0].percent);

        let currentSite = {} ;
        if (this.props.sites.currSite){ currentSite = cirNew.filter(d=>d.id === +this.props.sites.currSite)[0] };


        const {clipDetails, details} = spacingFrame(this.props.map.windowSize, currentSite, this.props.sites.genDetails);

        //console.log('results?', this.props.map.windowSize, currentSite, clipDetails, details);
        //console.log('results?', currentSite);

    	return (

    	<div className={this.props.baseClass} ref="size" id="mapWin" onAnimationEnd = {e=> this.refSize(e) } >
        {this.props.sites.specLayer==='maps' &&
              <div style={{height: `${this.props.map.windowSize[1]*.1}px`}}>
              <h2 className="BornholmSandvig pad10" > Cartographic Elements: Murlano Map (1670)</h2>
              </div>
        }
    	   <div className="offset border3"
           //multi-touch for mobile device
           onTouchStart = {e=>this.mouseLoc(e)} //onMouseDown
           onTouchEnd = {e=>this.mouseLoc(e)} //onMouseUp
           onTouchMove = {e=>this.drag(e)} //onMouseMove
           //onScroll={e=>console.log(e.type, e.detail)}

           //regular mouse or touch as click
           onMouseDown = {e=>this.mouseLoc(e)}
           onMouseUp = {e=>this.mouseLoc(e)}
           onMouseMove = {e=>this.drag(e)}
           onWheel = {e=>this.zoomScroll(e)}
           //use buttons for zoom on surface or screen(?)


           //only for the form edits - leave on site -
           onDoubleClick={(this.props.user === null || this.props.user.message)? (e)=>this.selectShowPanel(e, 'none') : e => this.addCenter(e, 'center') }
           onClick={(this.props.sites.newCx)? e => this.addCenter(e, 'radius') : (e)=>e.preventDefault()}
           >

	    	   <svg width={this.props.map.windowSize[0]} height={(this.props.sites.specLayer==='maps')? this.props.map.windowSize[1]*.7 : this.props.map.windowSize[1]} xmlnsXlink='http://www.w3.org/1999/xlink' >
	    	   		<defs>
                        <filter id="greyscale">
                            <feColorMatrix type="saturate" values="0" />
                        </filter>
	    	   			<clipPath id="myClip">
	    	   				// {cirNew &&
	    	   					cirNew.map((d,i) => <circle stroke="#000000" cx={d.cx} cy={d.cy} r={d.r} key={`circClip${i}`}/>)
	    	   				}
					    </clipPath>
                        {clipDetails.map(d=>{
                            // return (
                            // <clipPath id={d.id}>
                            //     <circle stroke="#000000" cx={d.cx} cy={d.cy} r={d.r} />
                            // </clipPath>
                            // )
                            return (
                            <clipPath id={d.id} key={`clipping${d.id}`}>
                                <rect stroke="#000000" x={d.x} y={d.y} rx={d.rx} ry={d.ry} width={d.width} height={d.height} />
                            </clipPath>
                            )

                        })
                        }
	    	   		</defs>

                    <Underlay tSize={this.props.map.tileSize} currZoom={this.props.map.currZoom} xyOffsets={this.props.map.xyOffsets} name="novacco"color={this.props.options.color} />

	    	   		<g className="workingTiles" >
    	    	   		{tiles &&
                            <BackgroundTiles data={tiles} name='novacco' wSize={this.props.map.windowSize} tSize={this.props.map.tileSize} color={this.props.options.color} />
                        }
                        {this.props.options.anno &&
                            <BackgroundMask wSize={this.props.map.windowSize} color={this.props.options.color} />
                        }
                        {tiles && this.props.options.anno &&
                            <ClipTiles data={tiles} wSize={this.props.map.windowSize} name='novacco' tSize={this.props.map.tileSize} clip="url(#myClip)" opacity={1} action=""/>
    	    	   		}
	    	   		</g>

	    	   		<g className="allLabelCircs" >
                    {this.props.options.anno && cirNew &&
	   					cirNew.map(d=>{
                            //strokeWidth={Math.pow(this.state.currentZoomLevel,2)/2}
                            //console.log(d.id, currentSite)

	   						return (
	   						   		<circle className={(d.id===this.props.sites.currSite)? 'circHLThick' : 'circHL' }
                                    cx={d.cx}
                                    cy={d.cy}
                                    r={d.r}
                                    value={d.name}
                                    id={d.id}
                                    key={`site${d.id}`}
                                    stroke={(+this.props.sites.currSite === +d.id)? '#ffffff':'#d8d0ba'}
                                    //onMouseOver = {e=>this.showLabel(e)}
                                    //onMouseOut={''/*e=>this.hideLabel(e)*/}
                                    onTouchTap={ e=>this.setLabel(e)}
                                    onClick={ e=>this.setLabel(e)}
                                    onDoubleClick={(this.props.user === null || this.props.user.message)? (e)=>this.selectShowPanel(e, +d.id) : e=> e.preventDefault() }
                                    />

	   						    )
	   					})
                    }
                    {this.props.options.anno && cirNew &&

	   					cirNew.map(d=>{
	   						if (+this.props.sites.currSite === +d.id){
	   						return (
	   						   			<g key={`label${d.id}`}>
			   						   		<text x={d.cx+d.r+14} y={d.cy} className="textHL" fontSize={21} >{this.props.panel.title}</text>
			   						   		<text x={d.cx+d.r+14} y={d.cy+18} className="textSHL" fontSize={12} >{this.props.panel.subtitle}</text>
                                            {this.props.options.annoZoom &&
                                            <DetailOver clipDetails={clipDetails} details={details} action={this.loadPanel} />
                                            }
		   						   		</g>
	   						    )}
	   					})
	   				}
                    {this.props.sites.newCx &&

                                    <circle className='circHLThick'
                                    cx={this.props.sites.newX}
                                    cy={this.props.sites.newY}
                                    r={Math.max(15,this.props.sites.newRad)}
                                    stroke={'#ffffff'}
                                    strokeWidth = "10px"
                                    />

                    }
	   				</g>
	    	   </svg>
    	   </div>
           {this.props.sites.specLayer==='maps' &&
              <div className="">
              <h5 className="BornholmSandvig pad10" > Cartographic Tour: </h5>
              <Tour type="maps" />
              </div>
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
    panel: state.panel,
    user: state.user,
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
    getAllDetailsNarratives : () => {
      dispatch(getDetailsNarratives ());
    },
    setDetailId: (objId, clusterId) => {
       dispatch(setDetailId(objId, clusterId));
    },
    updateSite: (site) => {
        dispatch(updateSite(site));
    },
    overlayDetails: (bool) => {
        dispatch(overlayDetails(bool));
    },
    setTitles: (name) => {
        dispatch(setTitlesCore(name));
    },
    updateNarrative: (obj) => {
        dispatch(setNarr(obj));
    },
    addNewSiteCenter: (x,y, curX, curY) => {
        dispatch(addNewSiteCenter(x,y, curX, curY));
    },
    addNewSiteRadius: (radius, rad2) => {
        dispatch(addNewSiteRadius(radius, rad2));
    },
  }
}

const Map = connect(mapStateToProps, mapDispatchToProps)(MapSVG);

export default Map;
