import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

//---------------------------MAP OPTIONS & COMPONENTS---------------------------
import { tiling, scaleOps, sitesFiltered, centerRescaled, reverseCenter } from '../plug-ins/rawTiles.js';
import { ClipTiles, BackgroundTiles, BackgroundMask, Underlay } from './TileVariants.js';


//---------------------------PRE-DB / PRE-REDUX PLACEHOLDERS---------------------------
// import {cirMain} from '../pre-db/cirTest.js';


// //---------------------------ACTION for DISPATCH---------------------------
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

        this.zoom = this.zoom.bind(this);
        this.zoomTo = this.zoomTo.bind(this);

        this.setSite=this.setSite.bind(this);
        this.flyToSingle=this.flyToSingle.bind(this);
    }

    setSite(e){
        e.preventDefault();
        let siteId = e.target.attributes.value.value.split('-')[0];
        let siteZoom = e.target.attributes.value.value.split('-')[1];
        this.props.updateSite(siteId);

        let site = this.props.sites.allSites.filter(site=> +site.id === +siteId)[0];
        let siteCent = [site.cx, site.cy];
        this.props.setTitles(site.name.split('.'));

        let obj = this.props.sites.genNarratives.filter(narr => +narr.coreId===+siteId);
        this.props.updateNarrative(obj[0]);

        this.flyToSingle(siteZoom, siteCent);

    }

    flyToSingle(zoom, newCenter){
        var win = this.props.map.windowSize;
        let panel = this.props.panel.panelSize;

        let offset = centerRescaled(zoom, newCenter, win, 128);

        this.props.setOffsetsR([offset.x, offset.y]);
        this.props.setCurrOffsets([offset.x, offset.y]);
        this.props.setCurrZoom(+zoom);
        this.props.setCurrTilesize(128);
    }

    // componentDidMount() {
    //     // window.addEventListener("resize", this.refSize);
    //     // this.refSize();
    //     // this.props.getLayers(this.props.sites.currLayers);
    //     // this.props.getAllDetailsNarratives();
    // }

    // refSize(){
    //     let sele = window.document.getElementById("mapWin").attributes[0].ownerElement;
    //     let width = sele.clientWidth;
    //     let panelW = (this.props.map.windowSize[0]-width)/2;
    //     //if (panelW <= 0){ panelW = 0; } else { panelW *= 0.5; };

    //     // if (width<this.props.map.windowSize[0]){
    //     //     width=this.props.map.windowSize[0];
    //     // };
    //     let height = sele.clientHeight;
    //     let [xOff, yOff] = this.props.map.xyOffsets;
    //     let [xOffR, yOffR] = this.props.map.xyOffsetsR;

    //     this.props.setWindowOffsets([sele.offsetLeft, sele.offsetTop]);
    //     this.props.setWinSize([width, height]);
    //     this.props.setPanelOffset(panelW); // for recenter;

    //     // if (width<this.props.map.windowSize[0]){
    //     //     this.props.setOffsetsR([xOff + panelW , yOff]);
    //     //     this.props.setCurrOffsets([xOffR + panelW , yOffR]);
    //     // } else {
    //     this.props.setOffsetsR([xOff + panelW, yOff]);
    //     this.props.setCurrOffsets([xOffR + panelW , yOffR]);
    //     // }
    //     this.props.setCenterScreen([width/2, height/2]);

    //     if (this.props.map.xyOffsets[0]===0){
    //         let w=this.props.map.tileSize*(scaleOps[this.props.map.currZoom][0]+1), h =this.props.map.tileSize*(scaleOps[this.props.map.currZoom][1]+1);

    //         this.props.setCurrOffsets([(width-w)/-2,(height-h)/-2]);
    //         this.props.setOffsetsR([(width-w)/-2,(height-h)/-2]);
    //     }
    // }

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
        }   else if (this.state.drag === 'drag'){
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


    render(){

        //minor site/tile filtering at the top of the map... as is fairly often updated

    	const tiles = tiling(this.props.map.currZoom, this.props.map.tileSize, this.props.map.windowSize, this.props.map.xyOffsets);

        //this.props.map.mapSite.mapName

    	return (

    	<div className={this.props.baseClass} id="mapVarWin" >
    	   <div className="offset border3"

          //multi-touch for mobile device
           onTouchStart = {e=>this.mouseLoc(e)} //onMouseDown
           onTouchEnd = {e=>this.mouseLoc(e)} //onMouseUp
           onTouchMove = {e=>this.drag(e)} //onMouseMove
           //onScroll={e=>console.log(e.type, e.detail)}

           onMouseDown = {e=>this.mouseLoc(e)}
           onMouseUp = {e=>this.mouseLoc(e)}
           onMouseMove = {e=>this.drag(e)}
           onWheel = {e=>this.zoomScroll(e)}

           >

	    	   <svg width={this.props.map.windowSize[0]*this.props.width} height={this.props.map.windowSize[1]*this.props.height} xmlnsXlink='http://www.w3.org/1999/xlink' >
	    	   		<defs>
                        <filter id="greyscale">
                            <feColorMatrix type="saturate" values="0" />
                        </filter>
	    	   		</defs>

                    <Underlay tSize={this.props.map.tileSize} currZoom={this.props.map.currZoom} xyOffsets={this.props.map.xyOffsets} name={this.props.map.mapSite.mapName} color={this.props.options.color} />

	    	   		<g className="workingTiles" >
                        {tiles &&
                            <ClipTiles data={tiles} name={this.props.map.mapSite.mapName} wSize={this.props.map.windowSize} tSize={this.props.map.tileSize} clip="" opacity={1} action=""/>
    	    	   		}
	    	   		</g>
	    	   		<g className="allLabelGeneral" >
	   				</g>
	    	   </svg>
    	   </div>
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

const MapSecondary = connect(mapStateToProps, mapDispatchToProps)(MapSVG);

export default MapSecondary;
