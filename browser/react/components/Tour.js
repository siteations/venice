import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import Contact from './Contact.js';
import {Tooltip} from 'react-lightweight-tooltip';

import mapSites from '../non-db/mapSites.js';

import { centerRescaled, tiling, scaleOps, sitesFiltered } from '../plug-ins/rawTiles.js';
import {updateSite} from '../action-creators/siteActions.js';
import {  setTitlesCore, setTitle, setNarr } from '../action-creators/panelActions.js';
import { togglePlay, updatePanelSmall } from '../action-creators/optionActions.js';
import {updateZoom, updateTile, updateOffsets, updateCenter, updateCenterScreen, updateWindow, updateWindowOffsets, updateOffsetsResidual, updatePanelOffset, setMapTours, setMapSiteOne} from '../action-creators/mapActions.js';

//connect later to store;

const toolstyles = {
    wrapper: {
      cursor: 'pointer'
    },
    content: {
    backgroundColor: '#d8d0ba',
    color: 'black',
  },
  tooltip: {
    backgroundColor: '#d8d0ba',
    borderRadius: '10px',
    position: 'absolute',
    zIndex: '99',
    background: '#000',
    bottom: '0%',
    left: '0%',
    padding: '5px',
    transform: 'translateX(0%) translateY(170%)',
  },
  arrow: {
    position: 'absolute',
    width: '0',
    height: '0',
    bottom: '25%',
    right: '203%',
    marginRight: '-6px',
    borderTop: 'solid transparent 8px',
    borderBottom: 'solid transparent 8px',
    borderLeft: 'solid transparent 8px',
  },
};

const toolstyles2 = {
    wrapper: toolstyles.wrapper,
    content: toolstyles.content,
    tooltip: {
        backgroundColor: '#d8d0ba',
        borderRadius: '10px',
        position: 'absolute',
        zIndex: '99',
        background: '#000',
        bottom: '0%',
        left: '0%',
        padding: '5px',
        transform: 'translateX(0%) translateY(140%)',
      },
    arrow: toolstyles.arrow,
};

const toolstyles3 = {
    wrapper: toolstyles.wrapper,
    content: {
        backgroundColor: '#e6e1d3',
        color: 'black',
    },
    tooltip: {
        backgroundColor: '#d8d0ba',
        borderRadius: '10px',
        position: 'absolute',
        zIndex: '99',
        background: '#000',
        bottom: '0%',
        left: '0%',
        padding: '5px',
        transform: 'translateX(0%) translateY(140%)',
      },
    arrow: toolstyles.arrow,
};

const toolstyles4 = {
    wrapper: toolstyles.wrapper,
    content: {
        backgroundColor: '#e6e1d3',
        color: 'black',
    },
    tooltip: toolstyles.tooltip,
    arrow: toolstyles.arrow,
};


class FooterSlides extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tourId: 0,
            siteId: 1,
            hiOff: 0,
            tourSets: 7,
            tourSeries: 1,
            playing: false,
        };
        this.setSite=this.setSite.bind(this);
        this.flyToSingle=this.flyToSingle.bind(this);
        this.animate = this.animate.bind(this);
        this.setPrior = this.setPrior.bind(this);
        this.setNext = this.setNext.bind(this);
        this.resetStart = this.resetStart.bind(this);
    }

    componentDidMount(){ //don't over-ride position on main map
        if (this.props.type === "maps") {
        this.resetStart();
        }
    }

    resetStart(){
        if (this.props.type === "maps") {
            var site=this.props.map.mapTourAll[0];
            var siteCent = [site.x, site.y];
            var siteZoom = site.scale;
            var siteTile = site.tile;

        } else {
            var siteId=this.props.options.allTours[this.props.options.currTour][0].siteId;
            this.props.updateSite(siteId);

            var site = this.props.sites.allSites.filter(site=> +site.id === +siteId)[0];
            var siteZoom = this.props.options.allTours[this.props.options.currTour].filter(item=>+item.siteId===+siteId)[0].zoom;
            var siteTile =128;
            var siteCent = [site.cx, site.cy];
            this.props.setTitles(site.name.split('.'));

            var obj = this.props.sites.genNarratives.filter(narr => +narr.coreId===+siteId);
            this.props.updateNarrative(obj[0]);
        }

        this.props.setMapSite(site);
        this.flyToSingle(siteZoom, siteCent, siteTile);
        this.setState({tourSeries: 1});

    }

    // setNext(e){
    //     e.preventDefault();
    //     let curr= this.props.map.mapSite.id;
    //     var before;

    //     if (+curr=== this.props.map.mapTourAll.length-1){
    //         before = 1;
    //     } else {
    //         before = +curr + 1;
    //     }

    //     let site = this.props.map.mapTourAll.filter(items=>{
    //         return items.id === before;
    //     })[0];

    //     (site===undefined)? site=this.props.map.mapTourAll[0]: site=site ;
    //     this.props.setMapSite(site);
    //     this.flyToSingle(site.scale, [site.x, site.y]);

    // }

    setPrior(e){
        e.preventDefault();
        let currSet = this.state.tourSeries;
        var max = Math.ceil(this.props.map.mapTourAll.length / 7);

        currSet--;

        if (currSet >= 1){
            this.setState({tourSeries: currSet});
        } else {
            this.setState({tourSeries: max});
        }

        if (currSet===1){
            var site=this.props.map.mapTourAll[6];
        } else if (currSet===2){
            var site=this.props.map.mapTourAll[13];
        } else if (currSet===3){
            var site=this.props.map.mapTourAll[this.props.map.mapTourAll.length-1];
        }

        this.props.setMapSite(site);
        this.flyToSingle(site.scale, [site.x, site.y], site.tile);
    }

    setNext(e){
        e.preventDefault();
        let currSet = this.state.tourSeries;
        var max = Math.ceil(this.props.map.mapTourAll.length / 7);

        currSet++;

        if (currSet <= max){
            this.setState({tourSeries: currSet});
        } else {
            this.setState({tourSeries: 1});
        }

        if (currSet===1){
            var site=this.props.map.mapTourAll[0];
        } else if (currSet===2){
            var site=this.props.map.mapTourAll[7];
        } else if (currSet===3){
            var site=this.props.map.mapTourAll[14];
        }

        this.props.setMapSite(site);
        this.flyToSingle(site.scale, [site.x, site.y], site.tile);
    }

    setSite(e){
        e.preventDefault();
        var siteId = e.target.attributes.value.value;
        console.log(siteId, e.target);

        if (this.props.type !== 'maps'){
            this.props.updateSite(siteId);

            var site = this.props.sites.allSites.filter(site=> +site.id === +siteId)[0];
            var siteZoom = this.props.options.allTours[this.props.options.currTour].filter(item=>+item.siteId===+siteId)[0].zoom;
            var siteTile =128;
            var siteCent = [site.cx, site.cy];
            this.props.setTitles(site.name.split('.'));

            var obj = this.props.sites.genNarratives.filter(narr => +narr.coreId===+siteId);
            this.props.updateNarrative(obj[0]);
        } else { // if maps
            var site = this.props.map.mapTourAll.filter(site=> +site.id === +siteId)[0];
            var siteCent = [site.x, site.y];
            var siteZoom = site.scale;
            var siteTile = site.tile;

        }

        this.props.setMapSite(site);
        this.flyToSingle(siteZoom, siteCent, siteTile);

    }

    flyToSingle(zoom, newCenter, tile = 128){
        var win = this.props.map.windowSize;
        let panel = this.props.panel.panelSize;
        // if (!this.props.options.panelNone){
        //     win = [wind[0]-panel[0], wind[1]];
        //     //var win = wind;
        // };

        let offset = centerRescaled(zoom, newCenter, win, tile);
        //console.log('zooms: ', this.props.map.currZoom, zoom, 'pixels: ', this.props.map.tileSize, 128, 'offsets: ', this.props.map.xyOffsets, offset);
        if (this.props.type !== 'maps'){
        var sele = window.document.getElementById("mapWin").attributes[0].ownerElement.childNodes[0].clientHeight;
        } else {
        var sele = window.document.getElementById("mapWin").attributes[0].ownerElement.childNodes[1].clientHeight;
        }
        var number=sele*.2;

        this.props.setOffsetsR([offset.x, offset.y+number]);
        this.props.setCurrOffsets([offset.x, offset.y+number]);
        this.props.setCurrZoom(+zoom);
        this.props.setCurrTilesize(tile);
        //current zoom and tile size... allows for conversion
    }

    animate(e, out){
        e.preventDefault();

        if (e.target.attributes.value.value === 'play'){
            this.props.togglePlay(true);

        if (this.props.options.panelNone){
            this.props.panelSmall();
        };

        var tour = this.props.options.allTours[this.props.options.currTour];

        var idIndex = tour.map(sites=>sites.siteId), currIndex = idIndex.indexOf(this.props.sites.currSite);
        if (currIndex === -1 || currIndex >= idIndex.length-1) {currIndex = 0};
        var iNarr=0;

        const that = this.props;
        const action = this.flyToSingle;

        function updateElements(){

                var {siteId, zoom} = tour[currIndex];
                let siteZoom = zoom;
                if (out){siteZoom = 3};

                that.updateSite(siteId);

                let site = that.sites.allSites.filter(site=> +site.id === +siteId)[0];

                let siteCent = [site.cx, site.cy];
                that.setTitles(site.name.split('.'));

                let obj = that.sites.genNarratives.filter(narr => +narr.coreId===+siteId);
                // if (site.clusterId !== null){
                //     var key = obj[0].clusterId;
                //     var obj2 = that.sites.genNarratives.filter(narr => +narr.clusterId===+key);
                // }


                // if (site.cluster && iNarr<obj2.length) {

                //     if (obj2[iNarr].coreId){
                //         action(siteZoom, siteCent);
                //     }

                //     that.updateNarrative(obj2[iNarr]);

                //     if (iNarr===obj2.length-1){
                //         iNarr=0;
                //         (currIndex===idIndex.length-1)? currIndex = 0 : currIndex ++ ;

                //     } else {
                //         iNarr++;
                //     }


                // } else if (!site.cluster) {

                    iNarr=0;
                    that.updateNarrative(obj[0]);
                    action(siteZoom, siteCent);
                    (currIndex===idIndex.length-1)? currIndex = 0 : currIndex ++ ;

                // }

        }

        updateElements();
        this.timer = setInterval(updateElements, 5000);

        } else if (e.target.attributes.value.value === 'pause'){ //the pause setting...

            this.props.togglePlay(false);
            clearInterval(this.timer);

        } else if (e.target.attributes.value.value === 'stop'){ //should add another route or local state variable that

            this.props.togglePlay(false);
            this.setState({tourId:0});
            clearInterval(this.timer);

        };
    }

    render(){

    if (this.props.type !== 'maps'){
    var basetour = this.props.options.allTours[this.props.options.currTour];
    //var tour = basetour.slice(0,7);
    } else {
    var basetour = this.props.map.mapTourAll;
    //var tour = basetour.slice(0,7);
    }

    if ((basetour && basetour.length<=7) || (basetour && this.props.type !== 'maps')){
        var tour = basetour;
    } else if (basetour && basetour.length>7 && this.state.tourSeries===1){
        var tour = basetour.slice(0,7);
    } else if (basetour && basetour.length>7 && this.state.tourSeries===2){
        var tour = basetour.slice(7,14);
    } else if (basetour && basetour.length>7 && this.state.tourSeries===3){
        var tour = basetour.slice(14,21);
    }

    console.log(tour, basetour);


    //need to set up alternate/hardcoded tour...

	return (
                  <div className="flex center">

                       <div className="nIcon flex center middle" >
                        <Tooltip content='return to start' styles={(this.props.type === "maps")? toolstyles : toolstyles4 }>
                        <span value="reset" className="glyphicon glyphicon glyphicon-step-backward" onTouchTap={(e)=>this.resetStart(e)} ></span>
                        </Tooltip>
                        </div>
                        {this.props.type === "maps" &&
                        <div className="nIcon flex center middle" >
                        <Tooltip content='load last series' styles={(this.props.type === "maps")? toolstyles : toolstyles4 }>
                        <span value="back" className="glyphicon glyphicon glyphicon-chevron-left" style={{opacity:(this.state.tourSeries===1)? '.25' : '1'}} onTouchTap={(e)=>this.setPrior(e)} ></span>
                        </Tooltip>
                        </div>
                        }

                        {tour && this.props.type === "bottom" &&
                            tour.map(site=>{
                            return <div className={(site.siteId===this.props.sites.currSite)? 'bIconSelected text-center' : 'bIcon  text-center'}
                                value={site.siteId}
                                key = {site.siteId}
                                onTouchTap={e=>this.setSite(e)}
                                onClick={e=>this.setSite(e)}>
                                <Tooltip content='click to view' styles={toolstyles3}>
                                {site.siteId}
                                </Tooltip>
                                </div>
                        })}
                        {tour && this.props.type === "maps" &&
                            tour.map(site=>{
                            return <div className={(site.siteId===this.props.sites.currSite)? 'bIconSelected text-center' : 'bIcon  text-center'}
                                value={site.id}
                                key = {site.id}
                                onTouchTap={e=>this.setSite(e)} >
                                 <Tooltip content={`click for: ${site.name}`} styles={toolstyles2}>
                                <img src={(typeof(site.src)==='string')? site.src : site.src[+site.id-1]}
                                style={{borderRadius: '5px'}}
                                value={site.id} />
                                </Tooltip>
                                </div>
                        })}
                        {this.props.type === "maps" &&
                        <div className="nIcon flex center middle" >
                        <Tooltip content='load more sites' styles={(this.props.type === "maps")? toolstyles : toolstyles4 }>
                        <span value="forward" className="glyphicon glyphicon-chevron-right" style={{opacity:(this.state.tourSeries===3)? '.25' : '1'}} onTouchTap={(e)=>this.setNext(e)} ></span>
                        </Tooltip>
                        </div>
                        }
                        {this.props.type === "bottom" &&
                        <div className="nIcon flex center middle" >
                        <Tooltip content='play/pause' styles={ toolstyles4 }>
                        <span value={(this.props.options.playTour)? "pause" : "play" } className={(this.props.options.playTour)? "glyphicon glyphicon-pause" : "glyphicon glyphicon-play" } onTouchTap={(e)=>this.animate(e)} ></span>
                        </Tooltip>
                        </div>
                        }
                        {this.props.type === "bottom" &&
                        <div className="l20">
                                <h4 className="BornholmSandvig closerT">{(tour)? 'Tour of '+tour[0].tourName : 'Select Above, Left for Tours' }</h4>
                                <p className="closerB">click thumbnails or play for guided sites & narratives</p>
                                <p className="small">(play shifts sites every 5 seconds, timing/order/zoom tbd.)</p>
                        </div>
                        }
                        {/*this.props.type === "bottom" &&
                        <Contact />
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
    updateSite: (site) => {
        dispatch(updateSite(site));
    },
        setTitles: (name) => {
        dispatch(setTitlesCore(name));
    },
    updateNarrative: (obj) => {
        dispatch(setNarr(obj));
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
    togglePlay: (bool) => {
        dispatch(togglePlay(bool));
    },
    panelSmall: () => {
      dispatch(updatePanelSmall());
    },
    setMapSite: (site) => {
    dispatch(setMapSiteOne(site));
    },
}}

const Tour = connect(mapStateToProps, mapDispatchToProps)(FooterSlides);

export default Tour;
