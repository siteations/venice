import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import Imagetrey from './ImageSlider.js';

import { setPanelSizing } from '../action-creators/panelActions.js';
import { imageSeries } from '../pre-db/cirTest.js';

import FormNarrative from './FormNarrative.js';
import FormDetail from './FormDetail.js';
import FormImage from './FormImage.js';

class PanelEdit extends Component {
	constructor(props) {
        super(props);
        this.state = {
          panelform: 'narrative', //
        }
        this.changeForm=this.changeForm.bind(this);
  }

  changeForm(e){
    e.preventDefault();
    let choice = e.target.value;
    console.log(choice);
    this.setState({panelform: choice});
  }

  render(){

  	return (
         <div className={this.props.baseClass} ref="sizeP" id="panelWin" style={{height:`${this.props.map.windowSize[1]+6}px`}}>
         <div className="">
          <h4 className="BornholmSandvig">Add or Edit</h4>
          <button className="btn btn-default marg10" value="site" onClick={e=>this.changeForm(e)} >Site</button>
          <button className="btn btn-default marg10" value="detail" onClick={e=>this.changeForm(e)} >Site Detail</button>
          <button className="btn btn-default marg10" value="narrative" onClick={e=>this.changeForm(e)} >Narrative</button>
          <button className="btn btn-default marg10" value="image" onClick={e=>this.changeForm(e)} >Panel Image</button>
          <button className="btn btn-default marg10" value="tour" onClick={e=>this.changeForm(e)} >Tour</button>
         </div>
         <br/>
         {this.state.panelform === 'narrative' &&
          <div className="editOps">
          <h3 className="BornholmSandvig">Add/Edit Narrative </h3>
           <FormNarrative />
          </div>
         }
         {this.state.panelform === 'detail' &&
          <div className="editOps">
          <h3 className="BornholmSandvig">Add/Edit Site Detail </h3>
           <FormDetail />
          </div>
         }
         {this.state.panelform === 'image' &&
          <div className="editOps">
          <h3 className="BornholmSandvig">Add/Edit Panel Image </h3>
           <FormImage />
          </div>
         }
         {this.state.panelform === 'site' &&
          <div className="editOps">
          <h3 className="BornholmSandvig">Add Site </h3>
           component to come
          </div>
         }
         {this.state.panelform === 'tour' &&
          <div className="editOps">
          <h3 className="BornholmSandvig">Add Tour </h3>
           component to come
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
    updatePanelSize: (size,ratio) => {
      dispatch(setPanelSizing(size,ratio));
    },
  }
}

const PanelForm = connect(mapStateToProps, mapDispatchToProps)(PanelEdit);

export default PanelForm;
