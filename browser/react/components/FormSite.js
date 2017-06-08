import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import { addNewSite, addNewSiteCenter, addNewSiteRadius, resetSaved } from '../action-creators/siteActions.js';


class FormSi extends Component {
	constructor(props) {
        super(props);
        this.state = {
          verify: false,
          //id will be auto added
          generalName: '',
          properName: '',
          type: '',
          cluster: false,
          clusterId: 0,
        }
        this.submission = this.submission.bind(this);
        this.update = this.update.bind(this);
        this.save = this.save.bind(this);
        this.reset = this.reset.bind(this);
  }

  componentDidMount(){
    this.props.resetSaved();
  }

    reset(e){
    e.preventDefault();
    let obj = {
          verify: false,
          //id will be auto added
          generalName: '',
          properName: '',
          type: '',
          cluster: false,
          clusterId: 0,
        }

    this.setState(obj);

  }

  submission(e){
    e.preventDefault();
    this.setState({verify: true});
    console.log('form submission', this.state);
    // should open a verification panel
  }

  save(e){
    e.preventDefault();
    let obj=this.state;
    obj.name = this.state.generalName+'.'+this.state.properName;
    obj.cx = this.props.sites.newCx;
    obj.cy = this.props.sites.newCy;
    obj.r = this.props.sites.newRadius;
    //id auto generated
    delete obj.verify;
    delete obj.generalName;
    delete obj.properName;

    this.props.addNewSite(obj); //adds, reloads all, and sets site to current for editing
    this.props.clearTempSite();

  }

  update(e){
    e.preventDefault();
    let input = e.target.value;
    let type = e.target.attributes.id.value;
    let obj={}; obj[type]=input;

    this.setState(obj);
  }

  updateOptions(e){
    e.preventDefault();
    let input = document.getElementById('gadget').value;
    let obj={}; obj.type=input;

    this.setState(obj);

  }

  render(){

  	return (
           <div>
            <p> zoom in and double-click on map to add a new center, then click once again to add a radius</p>
            <p> double-click again to erase and start over. </p>
            <p> Once geometries have been added, you will be able to add additional info below</p>
            <h4 className="BornholmSandvig">Add a New Map Site</h4>
            <div className="editOps">
              {this.props.sites.newCx > 0 &&
                <div>
                  <h4 className="BornholmSandvig">Map-Based Additions: Geometry</h4>
                  <label className='underline'>New Center: </label>
                  <p>{this.props.sites.newCx}, {this.props.sites.newCy}<br/><br/>
                  with center placed, click to add radius.
                  </p>
                </div>
              }
              {this.props.sites.newRadius > 100 &&
                <div>
                  <label className='underline'>New Radius: </label>
                  <p>{this.props.sites.newRadius-100}<br/><br/>
                  with geometry placed, add labels/names below.
                  </p>
                </div>
              }
              <form onSubmit={e=>this.submission(e)}>
    				    <label className='underline' for="generalName">General Name (church affiliation, etc.):</label> <input className="form-control" id='generalName' onChange={e=>this.update(e)} placeholder="Title input"></input>
    				    <label className='underline' for="properName">Specific Site Name:</label>
                  <input className="form-control" id='properName' onChange={e=>this.update(e)} placeholder="Title input"></input><br/>
                <label className='underline' for="type">Select Layer Classification: </label>
                  <select onChange={e=>this.updateOptions(e)} id="gadget">
                  {this.props.sites.allLayers &&
                    this.props.sites.allLayers.map((layer,i)=>{
                      return (
                      <option value={layer} key={layer+i}>{layer}</option>
                      )
                    })
                  }
                  </select><br/>
                <p>Submit information (input results will appear below)</p>
                <button className="btn btn-default" type="submit">Submit</button>
              </form>
            </div>
            {this.state.verify &&
              <div>
              <h4 className="BornholmSandvig">Review Entries</h4>
              <p> either accept (below) or correct & review again</p>
                <div className="editOps">
                  <label className='underline'>New Geometry: </label>
                  <p>center: {this.props.sites.newCx}, {this.props.sites.newCy}, radius: {this.props.sites.newRadius}</p>
                <label className='underline'>General Name (church affiliation, etc.):</label> <p>{this.state.generalName}</p>
                <label className='underline'>Specific Site Name: </label> <p>{this.state.properName}</p>
                <label className='underline'>Layer Classification:</label> <p>{this.state.type}</p>
                <p>Details can be added later via the Detail form</p>
                <p>You must click below to save edits to database</p>
                <button className="btn btn-default" onClick={e=>this.save(e)}>Save Site</button> or <button className="btn btn-default" onClick={e=> this.reset(e)}>Reset</button>
                <p>Toggle all sites on to confirm/inspect new addition</p>

                </div>
              </div>
            }
            {this.props.sites.saved &&
              <h4 className="BornholmSandvig">Site Saved!</h4>
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
    addNewSite : (siteOb) => {
      dispatch(addNewSite(siteOb));
    },
    clearTempSite : () => {
      dispatch(addNewSiteCenter(0,0,0,0));
      dispatch(addNewSiteRadius(0,0));
    },
    resetSaved: () => {
      dispatch(resetSaved());
    },
  }
}

const FormSite = connect(mapStateToProps, mapDispatchToProps)(FormSi);

export default FormSite;
