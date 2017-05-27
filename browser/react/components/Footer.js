import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import { centerRescaled, tiling, scaleOps, sitesFiltered } from '../plug-ins/rawTiles.js';
import {updateSite} from '../action-creators/siteActions.js';
import {  setTitlesCore, setTitle, setNarr } from '../action-creators/panelActions.js';
import { togglePlay } from '../action-creators/optionActions.js';
import {updateZoom, updateTile, updateOffsets, updateCenter, updateCenterScreen, updateWindow, updateWindowOffsets, updateOffsetsResidual, updatePanelOffset} from '../action-creators/mapActions.js';

//connect later to store;
const tour = [
    {
        id: 3,
        zoom: 5,
    },
    {
        id: 6,
        zoom: 5,
    },
    {   id: 9,
        zoom: 4,
    },
    {
        id: 21,
        zoom: 5,
    },
    {
        id: 17,
        zoom: 3,
    },
    {
        id: 13,
        zoom: 5,
    },
    {
        id: 15,
        zoom: 4,
    },
    {
        id: 23,
        zoom: 4,
    }


]; //transfer to store, onclick reset current site and zoomto that new site, but requires the percent/zoom numbers

class FooterSlides extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tourId: 0
        };
        this.setSite=this.setSite.bind(this);
        this.flyToSingle=this.flyToSingle.bind(this);
        this.animate = this.animate.bind(this);
    }

    setSite(e){
        e.preventDefault();
        let siteId = e.target.attributes.value.value.split('-')[0];
        let siteZoom = e.target.attributes.value.value.split('-')[1];
        this.props.updateSite(siteId);

        let site = this.props.sites.allSites.filter(site=>site.id === +siteId)[0];
        let siteCent = [site.cx, site.cy];
        this.props.setTitles(site.name.split('.'));

        let obj = this.props.sites.genNarratives.filter(narr => +narr.coreId===+siteId);
        this.props.updateNarrative(obj[0]);

        this.flyToSingle(siteZoom, siteCent);

    }

    flyToSingle(zoom, newCenter){
        let wind = this.props.map.windowSize;
        let panel = this.props.panel.panelSize;
        if (!this.props.options.panelNone){
            var win = [wind[0]-panel[0], wind[1]];
        } else {
            var win = wind;
        }

        let offset = centerRescaled(zoom, newCenter, win, 128);

        this.props.setOffsetsR([offset.x, offset.y]);
        this.props.setCurrOffsets([offset.x, offset.y]);
        this.props.setCurrZoom(+zoom);
        this.props.setCurrTilesize(128);
        //current zoom and tile size... allows for conversion
    }

    animate(e){
        e.preventDefault();

        if (e.target.attributes.value.value === 'play'){
            this.props.togglePlay(true);

        var idIndex = tour.map(sites=>sites.id), currIndex = idIndex.indexOf(this.props.sites.currSite);
        if (currIndex === -1 || currIndex >= idIndex.length-1) {currIndex = 0};

        const that = this.props;
        const action = this.flyToSingle;

        function updateElements(){

                console.log(tour[currIndex]);
                var {id, zoom} = tour[currIndex];
                let siteId = id, siteZoom = zoom;

                that.updateSite(siteId);

                let site = that.sites.allSites.filter(site=>site.id === +siteId)[0];
                let siteCent = [site.cx, site.cy];
                that.setTitles(site.name.split('.'));

                let obj = that.sites.genNarratives.filter(narr => +narr.coreId===+siteId);
                that.updateNarrative(obj[0]);

                action(siteZoom, siteCent);

                if (currIndex===idIndex.length-1){
                    currIndex = 0;
                } else {
                    currIndex ++;
                }

        }

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

    //console.log(this.props.map);

	return (
	        <div className="row footer">
                  <div className="row flex center">
                        {tour.map(site=>{
                            return <div className="bIcon" value={site.id+'-'+site.zoom} onClick={e=>this.setSite(e)}>{'test '+site.id}</div>
                        })}
                        {!this.props.options.playTour &&
                            <div className="nIcon flex center middle" value=""><span value="play" className="fa fa-play" onClick={(e)=>this.animate(e)}></span></div>
                        }
                        {this.props.options.playTour &&
                            <div className="nIcon flex center middle" value=""><span value="pause" className="fa fa-pause" onClick={(e)=>this.animate(e)}></span></div>
                        }
                        <div className="nIcon flex center middle" value=""><span value="backward" className="fa fa-backward opacity25"></span></div>
                        <div className="nIcon flex center middle" value=""><span value="stop" className="fa fa-stop opacity25" onClick={(e)=>this.animate(e)}></span></div>
                        <div className="nIcon flex center middle" value=""><span value="forward" className="fa fa-forward opacity25"></span></div>
                        <div className="l20">
                                <h4 className="BornholmSandvig closerT">tour of venice religious experience</h4>
                                <p className="closerB">click thumbnails for a guided sites & narratives</p>
                                <p className="sButtons">secondary options and images for fullscreen tablet view</p>
                        </div>
                  </div>
                <p className="closerB">copyright and institutional information here</p>
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
}}

const Footer = connect(mapStateToProps, mapDispatchToProps)(FooterSlides);

export default Footer;
