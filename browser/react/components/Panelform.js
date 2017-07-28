import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import Imagetrey from './ImageSlider.js';

import { setPanelSizing } from '../action-creators/panelActions.js';
import { imageSeries } from '../non-db/cirTest.js';

import FormNarrative from './FormNarrative.js';
import FormDetail from './FormDetail.js';
import FormImage from './FormImage.js';
import FormSite from './FormSite.js';
import FormTour from './FormTour.js';
import FormLogin from './FormLogin.js';
import FormBiblio from './FormBiblio.js';
import FormEdit from './FormEdit.js';
import FormDelete from './FormDelete.js';

class PanelEdit extends Component {
	constructor(props) {
        super(props);
        this.state = {
          panelform: 'site', //
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
    //add user/sessions and showlogin panel here.

  	return (
         <div className={this.props.baseClass} ref="sizeP" id="panelWin" style={{height:`${this.props.map.windowSize[1]+6}px`}}>
         {this.props.user === null &&
            <FormLogin />
        }
        {this.props.user !== null && this.props.user.message &&
          <div>
            <p>{this.props.user.message}</p>
            <FormLogin />
          </div>
        }
        {this.props.user !== null && !this.props.user.message &&
        <div>
          <p>*web session are not persistent, refresh to log-out</p>
         <div className="">
          <h4 className="BornholmSandvig">Add or Edit</h4>
          <button className="btn btn-default marg10" value="site" onTouchTap={e=>this.changeForm(e)} >Site</button>
          <button className="btn btn-default marg10" value="detail" onTouchTap={e=>this.changeForm(e)} >Detail</button>
          <button className="btn btn-default marg10" value="narrative" onTouchTap={e=>this.changeForm(e)} >Narrative</button>
          <button className="btn btn-default marg10" value="image" onTouchTap={e=>this.changeForm(e)} >Image</button>
          <button className="btn btn-default marg10" value="tour" onTouchTap={e=>this.changeForm(e)} >Tour</button>
          <button className="btn btn-default marg10" value="biblio" onTouchTap={e=>this.changeForm(e)} >Bibliography</button>
          <button className="btn btn-default marg10" value="edit" onTouchTap={e=>this.changeForm(e)} >Edit Existing</button>
          <button className="btn btn-default marg10" value="delete" onTouchTap={e=>this.changeForm(e)} >Delete Existing</button>
         </div>
         <br/>
         {this.state.panelform === 'narrative' &&
          <div className="editOps">
          <h3 className="BornholmSandvig">Add Narrative </h3>
           <FormNarrative />
          </div>
         }
         {this.state.panelform === 'detail' &&
          <div className="editOps">
          <h3 className="BornholmSandvig">Add Site Detail </h3>
           <FormDetail />
          </div>
         }
         {this.state.panelform === 'image' &&
          <div className="editOps">
          <h3 className="BornholmSandvig">Add Panel Image </h3>
           <FormImage />
          </div>
         }
         {this.state.panelform === 'site' &&
          <div className="editOps">
          <h3 className="BornholmSandvig">Add Site</h3>
           <FormSite />
          </div>
         }
         {this.state.panelform === 'tour' &&
          <div className="editOps">
          <h3 className="BornholmSandvig">Add (to) Tour </h3>
           <FormTour />
          </div>
         }
         {this.state.panelform === 'biblio' &&
          <div className="editOps">
          <h3 className="BornholmSandvig">Add Bibliographic Source </h3>
           <FormBiblio />
          </div>
         }
         {this.state.panelform === 'edit' &&
          <div className="editOps">
          <h3 className="BornholmSandvig">Edit Existing Entry</h3>
           <FormEdit />
          </div>
         }
         {this.state.panelform === 'delete' &&
          <div className="editOps">
          <h3 className="BornholmSandvig">Delete Existing Entry</h3>
           <FormDelete />
          </div>
         }
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
    updatePanelSize: (size,ratio) => {
      dispatch(setPanelSizing(size,ratio));
    },
  }
}

const PanelForm = connect(mapStateToProps, mapDispatchToProps)(PanelEdit);

export default PanelForm;
