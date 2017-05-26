import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import { centerRescaled, tiling, scaleOps, sitesFiltered } from '../plug-ins/rawTiles.js';
import {updateSite} from '../action-creators/siteActions.js';
import {  setTitlesCore, setTitle, setNarr } from '../action-creators/panelActions.js';
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
        this.state = {};
        this.setSite=this.setSite.bind(this);
        this.flyToSingle=this.flyToSingle.bind(this);
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

        let offset = centerRescaled(zoom, newCenter, win);

        this.props.setOffsetsR([offset.x, offset.y]);
        this.props.setCurrOffsets([offset.x, offset.y]);
        this.props.setCurrZoom(+zoom);
        this.props.setCurrTilesize(128);
        //current zoom and tile size... allows for conversion
    }

    render(){

    //console.log(this.props.map);

	return (
	        <div className="row footer">
                  <div className="row flex center">
                        <div value=""><span value="" className="fa fa-chevron-left fa-2x white"></span></div>
                        {tour.map(site=>{
                            return <div className="bIcon" value={site.id+'-'+site.zoom} onClick={e=>this.setSite(e)}>{'test '+site.id}</div>
                        })}
                        <div value=""><span value="" className="fa fa-chevron-right fa-2x white"></span></div>
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
}}

const Footer = connect(mapStateToProps, mapDispatchToProps)(FooterSlides);

export default Footer;
