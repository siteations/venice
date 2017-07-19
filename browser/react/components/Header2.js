import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Chip from 'material-ui/Chip';
import LayersList from './LayersList.js';

import {panelsOther} from './MapBar.js';

import {updatePanelNone, updatePanelSmall, updatePanelLarge, updatePanelStart, updatePanelMid} from '../action-creators/optionActions.js';
import {updateColor, updateAnno, updateDetail} from '../action-creators/optionActions.js';
//connect later?
import {addSelectLayer, deleteSelectLayer, addAllLayers, addHoverSite, setSpecPanel, updateSite} from '../action-creators/siteActions.js';

import {updateOffsets, updateOffsetsResidual } from '../action-creators/mapActions.js';

import {setNarr, setTitlesCore} from '../action-creators/panelActions.js';


const styles = {
  chip: {
    margin: 2,

  },
};
//connect later?

class Header2 extends Component {
    constructor(props){
    super(props);
    this.changePanel= this.changePanel.bind(this);
  }

  changePanel(e){
    e.preventDefault();
   let val = (e.target.attributes.value.value);

   if ((val === 'intro' || val === 'bibliography'|| val === 'credits' || val === 'guide')){

      if (!this.props.options.panelSmall){this.props.panelSmall()};

      this.props.setSpecPanel(val);
      this.props.updateSite(0);
      this.props.setTitles(panelsOther[val].title);
      this.props.updateNarrative(panelsOther[val].obj);
    }



  }

  render(){

  return (
	        <div className="row flex bottom header">
                        <div className="col-xs-8">
                                <h2 className="closerT"><span className="BornholmSandvig">Religious Life in Venice </span><span className="small texta" style={{color: '#352c1a'}}> Mapping Early Modern Cosmopolitanism</span></h2>
                          <LayersList layers={this.props.sites.currLayers} type="span" />
                        </div>
                        <div className="col-xs-4">
                          <div className="row flex around" style={{marginTop:'5px'}}>
                            <span className="texta m10 bNav" value="intro" onTouchTap={this.changePanel} >An Introduction</span>
                            <span className="texta m10 bNav" value="sites" onTouchTap={this.changePanel}>Sited Practices</span>
                            <span className="texta m10 bNav" value="maps" onTouchTap={this.changePanel}>Cartographic Context</span>
                          </div>
                          <div className="row flex around" style={{marginBottom:'5px'}}>
                            <span className="texta m10 bNav" value="bibliography" onTouchTap={this.changePanel}>Bibliography</span>
                            <span className="texta m10 bNav" value="credits" onTouchTap={this.changePanel}>About This Site</span>
                            <span className="texta m10 bNav" value="guide" onTouchTap={this.changePanel}>Navigation Guide</span>
                          </div>
                        </div>
	        	{/*<div className="col-lg-1">
        			<h4 className="BornholmSandvig closerT text-right ">Layers:</h4>
        			<p className="closerB text-right"> </p>
        		</div>*/}
	        </div>
	        )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sites: state.sites,
    options: state.options,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    panelStart: () => {
      dispatch(updatePanelStart());
    },
    panelMid: () => {
      dispatch(updatePanelMid());
    },
    panelNone: () => {
      dispatch(updatePanelNone());
    },
    panelSmall: () => {
      dispatch(updatePanelSmall());
    },
    panelLarge: () => {
        dispatch(updatePanelLarge());
    },
    loadSelectAll: (add) => {
        dispatch(addAllLayers(add));
    },
    addSelectOne: (layer) => {
        dispatch(addSelectLayer(layer));
    },
    deleteSelectOne: (layer) => {
        dispatch(deleteSelectLayer(layer));
    },
    setHoverLabel: (layer) => {
      dispatch(addHoverSite(layer));
    },
    setSpecPanel: (type) => {
      dispatch(setSpecPanel(type));
    },
    setColor: (bool) => {
      dispatch(updateColor(bool));
    },
    setAnno: (bool) => {
      dispatch(updateAnno(bool));
    },
    setDetail: (bool) => {
        dispatch(updateDetail(bool));
    },
    setCurrOffsets: (offsets) => {
      dispatch(updateOffsets(offsets));
    },
    setOffsetsR: (offsets) => {
        dispatch(updateOffsetsResidual(offsets));
    },
    updateSite: (site) => {
      dispatch(updateSite(site));
    },
    setTitles: (name) => {
        dispatch(setTitlesCore(name));
    },
    updateNarrative: (obj) => {
        dispatch(setNarr(obj));
    },
  }
}

const HeaderOpt = connect(mapStateToProps, mapDispatchToProps)(Header2);

export default HeaderOpt;
