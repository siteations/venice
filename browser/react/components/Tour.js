import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import Contact from './Contact.js';

import mapSites from '../pre-db/mapSites.js';

import { centerRescaled, tiling, scaleOps, sitesFiltered } from '../plug-ins/rawTiles.js';
import {updateSite} from '../action-creators/siteActions.js';
import {  setTitlesCore, setTitle, setNarr } from '../action-creators/panelActions.js';
import { togglePlay, updatePanelSmall } from '../action-creators/optionActions.js';
import {updateZoom, updateTile, updateOffsets, updateCenter, updateCenterScreen, updateWindow, updateWindowOffsets, updateOffsetsResidual, updatePanelOffset, setMapTours, setMapSiteOne} from '../action-creators/mapActions.js';

//connect later to store;


class FooterSlides extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tourId: 0,
            siteId: 1,
            hiOff: 0,
        };
        this.setSite=this.setSite.bind(this);
        this.flyToSingle=this.flyToSingle.bind(this);
        this.animate = this.animate.bind(this);
        this.setPrior = this.setPrior.bind(this);
        this.setNext = this.setNext.bind(this);
    }

    componentDidMount(){

    }

    setPrior(e){
        e.preventDefault();
        var curr = this.props.map.mapSite.id;
        var before;

        if (+curr=== 1){
            before = this.props.map.mapTourAll.length-1;
        } else {
            before = +curr - 1;
        }

        let site = this.props.map.mapTourAll.filter(items=>{
            return items.id === before;
        })[0];

        console.log(site);
        (site===undefined)? site=this.props.map.mapTourAll[0]: site=site ;
        this.props.setMapSite(site);
        this.flyToSingle(site.scale, [site.x, site.y]);
    }

    setNext(e){
        e.preventDefault();
        let curr= this.props.map.mapSite.id;
        var before;

        if (+curr=== this.props.map.mapTourAll.length-1){
            before = 1;
        } else {
            before = +curr + 1;
        }

        let site = this.props.map.mapTourAll.filter(items=>{
            return items.id === before;
        })[0];

        (site===undefined)? site=this.props.map.mapTourAll[0]: site=site ;
        this.props.setMapSite(site);
        this.flyToSingle(site.scale, [site.x, site.y]);

    }

    setSite(e){
        e.preventDefault();
        var siteId = e.target.attributes.value.value;
        console.log(siteId, e.target);

        if (this.props.type !== 'maps'){
            this.props.updateSite(siteId);

            var site = this.props.sites.allSites.filter(site=> +site.id === +siteId)[0];
            var siteZoom = this.props.options.allTours[this.props.options.currTour].filter(item=>item.siteId===siteId)[0].zoom;
            var siteCent = [site.cx, site.cy];
            this.props.setTitles(site.name.split('.'));

            var obj = this.props.sites.genNarratives.filter(narr => +narr.coreId===+siteId);
            this.props.updateNarrative(obj[0]);
        } else {
            var site = this.props.map.mapTourAll.filter(site=> +site.id === +siteId)[0];
            var siteCent = [site.x, site.y];
            var siteZoom = site.scale;

        }

        this.props.setMapSite(site);
        this.flyToSingle(siteZoom, siteCent);

    }

    flyToSingle(zoom, newCenter){
        var win = this.props.map.windowSize;
        let panel = this.props.panel.panelSize;
        // if (!this.props.options.panelNone){
        //     win = [wind[0]-panel[0], wind[1]];
        //     //var win = wind;
        // };

        let offset = centerRescaled(zoom, newCenter, win, 128);
        //console.log('zooms: ', this.props.map.currZoom, zoom, 'pixels: ', this.props.map.tileSize, 128, 'offsets: ', this.props.map.xyOffsets, offset);
        let sele = window.document.getElementById("mapWin").attributes[0].ownerElement.childNodes[1].clientHeight;
        var number=sele*.2;

        this.props.setOffsetsR([offset.x, offset.y+number]);
        this.props.setCurrOffsets([offset.x, offset.y+number]);
        this.props.setCurrZoom(+zoom);
        this.props.setCurrTilesize(128);
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
                if (site.clusterId !== null){
                    var key = obj[0].clusterId;
                    var obj2 = that.sites.genNarratives.filter(narr => +narr.clusterId===+key);
                }


                if (site.cluster && iNarr<obj2.length) {

                    if (obj2[iNarr].coreId){
                        action(siteZoom, siteCent);
                    }

                    that.updateNarrative(obj2[iNarr]);

                    if (iNarr===obj2.length-1){
                        iNarr=0;
                        (currIndex===idIndex.length-1)? currIndex = 0 : currIndex ++ ;

                    } else {
                        iNarr++;
                    }


                } else if (!site.cluster) {

                    iNarr=0;
                    that.updateNarrative(obj[0]);
                    action(siteZoom, siteCent);
                    (currIndex===idIndex.length-1)? currIndex = 0 : currIndex ++ ;

                }

        }

        var myVar = setTimeout(updateElements, 500);
        this.timer = setInterval(updateElements, 3000);

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
    var tour = this.props.options.allTours[this.props.options.currTour];
    } else {
    var tour = this.props.map.mapTourAll;
    }

    //need to set up alternate/hardcoded tour...

	return (
                  <div className="flex center">
                       <div className="nIcon flex center middle" ><span value="play" className="glyphicon glyphicon-chevron-left" onTouchTap={(e)=>this.setPrior(e)} onClick={(e)=>this.setPrior(e)} ></span>
                        </div>
                        {tour && this.props.type === "bottom" &&
                            tour.map(site=>{
                            return <div className={(site.siteId===this.props.sites.currSite)? 'bIconSelected text-center' : 'bIcon  text-center'}
                                value={site.siteId}
                                key = {site.siteId}
                                onTouchTap={e=>this.setSite(e)}
                                onClick={e=>this.setSite(e)}>{site.siteId}
                                </div>
                        })}
                        {tour && this.props.type === "maps" &&
                            tour.map(site=>{
                            return <div className={(site.siteId===this.props.sites.currSite)? 'bIconSelected text-center' : 'bIcon  text-center'}
                                value={site.id}
                                key = {site.id}
                                onTouchTap={e=>this.setSite(e)}
                                onClick={e=>this.setSite(e)}>
                                <img src={site.src}
                                style={{borderRadius: '5px'}}
                                value={site.id} />
                                </div>
                        })}
                        <div className="nIcon flex center middle" ><span value="play" className="glyphicon glyphicon-chevron-right" onTouchTap={(e)=>this.setNext(e)} onClick={(e)=>this.setNext(e)} ></span>
                        </div>
                        {this.props.type === "bottom" &&
                        <div className="l20">
                                <h4 className="BornholmSandvig closerT">tour of venice religious experience</h4>
                                <p className="closerB">click thumbnails for a guided sites & narratives</p>
                                <p className="sButtons">secondary options and images for fullscreen tablet view</p>
                        </div>
                        }
                        {this.props.type === "bottom" &&
                        <Contact />
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
