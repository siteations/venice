import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import Contact from './Contact.js';

import { centerRescaled, tiling, scaleOps, sitesFiltered } from '../plug-ins/rawTiles.js';
import {updateSite} from '../action-creators/siteActions.js';
import {  setTitlesCore, setTitle, setNarr } from '../action-creators/panelActions.js';
import { togglePlay, updatePanelSmall } from '../action-creators/optionActions.js';
import {updateZoom, updateTile, updateOffsets, updateCenter, updateCenterScreen, updateWindow, updateWindowOffsets, updateOffsetsResidual, updatePanelOffset} from '../action-creators/mapActions.js';

import Tour from './Tour.js';

//connect later to store;


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
        // if (!this.props.options.panelNone){
        //     win = [wind[0]-panel[0], wind[1]];
        //     //var win = wind;
        // };

        let offset = centerRescaled(zoom, newCenter, win, 128);
        //console.log('zooms: ', this.props.map.currZoom, zoom, 'pixels: ', this.props.map.tileSize, 128, 'offsets: ', this.props.map.xyOffsets, offset);

        this.props.setOffsetsR([offset.x, offset.y]);
        this.props.setCurrOffsets([offset.x, offset.y]);
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

    var tour = this.props.options.allTours[this.props.options.currTour];

	return (
            <div className="row footer">
            {this.props.sites.specLayer !== 'maps' &&
                <div>
                <div className="row">
                    <Tour type="bottom" />
                </div>
                <div className="row" >
                    <div className="col-xs-8" style={{borderTop: '0.5px solid rgb(255, 255, 255)', paddingTop: '5px'}}>
                        <Contact />
                    </div>
                </div>
                </div>
            }
            {this.props.sites.specLayer === 'maps' &&
                <div className="row">
                    <Contact />
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
}}

const Footer = connect(mapStateToProps, mapDispatchToProps)(FooterSlides);

export default Footer;
