import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import Imagetrey from './ImageSlider.js';
import { setPanelSizing } from '../action-creators/panelActions.js';
//import { imageSeries } from '../pre-db/cirTest.js';
import { addNarrative, resetSaved } from '../action-creators/siteActions.js';


class FormNarr extends Component {
	constructor(props) {
        super(props);
        this.state = {
          verify: false,
          coreId: 0,
          minorId: 0,
          clusterId: 0,
          title:'',
          text:'',
          researcherName: '',
          researcherTitle: '',
          researcherAffiliation: '',
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
          coreId: 0,
          minorId: 0,
          clusterId: 0,
          title:'',
          text:'',
          researcherName: '',
          researcherTitle: '',
          researcherAffiliation: '',
        };

    this.setState(obj);

  }

  submission(e){
    e.preventDefault();

    let obj= {
      verify: true,
      coreId: this.props.sites.currSite,
      minorId: this.props.sites.minorId,
      clusterId: this.props.sites.clusterId,
    };

    console.log('form submission', obj);

    this.setState(obj);
  }

  save(e){
    e.preventDefault();
    var obj = this.state;
    delete obj.verify;

    this.props.addNarrative(obj);
  }

  update(e){
    e.preventDefault();
    let input = e.target.value;
    let type = e.target.attributes.id.value;
    let obj={}; obj[type]=input;

    obj['coreId']= +this.props.sites.currSite;
    obj['minorId']= +this.props.sites.minorId;
    obj['clusterId']= +this.props.sites.clusterId;

    this.setState(obj);
  }

  render(){
  	//console.log(this.props);

    let siteId = +this.props.sites.currSite;
    let element, cluster, detail;
    let show = false, details = false;
    if (siteId !== 0){
      element = this.props.sites.allSites.filter(sites=> +sites.id === siteId)[0];
      show = true;
    }


  	return (
           <div>
            <p> click on map to select site or site detail</p>
            <h4 className="BornholmSandvig">Background Data</h4>
            <div className="editOps">
  				    <h4><span className='underline'>Site Type:</span> {this.props.panel.title}</h4>
  				    <h4><span className='underline'>Site Name:</span> {this.props.panel.subtitle}</h4>
              {show &&
              <div>
                <ul>
                  <li><span className='underline'>Layer Type:</span> {element.type} </li>
                  <li><span className='underline'>Site Id:</span> {element.id}</li>
                </ul>
              </div>
              }
              {show && element.clusterId &&
              <div>
                <p>Subsite Details</p>
                <ul>
                  <li><span className='underline'>Cluster Id:</span> {element.clusterId}</li>
                  <li><span className='underline'>Detail Id:</span> {this.props.sites.minorId}</li>
                </ul>
              </div>
              }
            </div>
            <br/>
            <h4 className="BornholmSandvig">Narrative Entries to Edit</h4>
            <div className="editOps">
              <form onSubmit={e=>this.submission(e)}>
    				    <label className='underline' for="title">Descriptive Title:</label> <input className="form-control" id='title' onChange={e=>this.update(e)} placeholder="Title input"></input>
    				    <label className='underline' for="text">Core Text (50-90 words):</label>
                  <textarea id='text' onChange={e=>this.update(e)} className="form-control col-xs-12" rows="3" placeholder="Text input" ></textarea><br/><br/>
                <p>Research Credits</p>
                <label className='underline' for="researcherName">Name:</label>
                  <input className="form-control" id='researcherName' onChange={e=>this.update(e)} placeholder="Reseacher Name" ></input><br/>
                <label className='underline' for="researcherTitle">Title:</label>
                  <input className="form-control" id='researcherTitle' onChange={e=>this.update(e)} placeholder="Reseacher Title" ></input><br/>
                <label className='underline' for="researcherAffiliation">Affiliation:</label>
                  <input className="form-control" id='researcherAffiliation' onChange={e=>this.update(e)} placeholder="Reseacher Affiliation" ></input><br/>
                <p>Submit information (input results will appear below)</p>
                <button className="btn btn-default" type="submit">Submit</button>
              </form>
            </div>
            {this.state.verify &&
              <div>
              <h4 className="BornholmSandvig">Review Entries</h4>
              <p> either accept (below) or correct & review again</p>
                <div className="editOps">
                <label className='underline'>Site:</label> <p>{this.props.panel.title}, {this.props.panel.subtitle}</p>
                <label className='underline'>Core/cluster/minor id: </label><p>{this.state.coreId}, {this.state.clusterId}, {this.state.minorId}</p>
                <label className='underline'>Descriptive Title:</label> <p>{this.state.title}</p>
                <label className='underline' for="text">Core Text (50-90 words):</label> <p>{this.state.text}</p>
                <p>Research Credits</p>
                <label className='underline' for="researcherName">Name:</label><p>{this.state.researcherName}</p>
                <label className='underline' for="researcherTitle">Title:</label><p>{this.state.researcherTitle}</p>
                <label className='underline' for="researcherAffiliation">Affiliation:</label><p>{this.state.researcherAffiliation}</p>
                <p>You must click below to save edits to database</p>
                <button className="btn btn-default" onClick={e=>this.save(e)} >Save</button> or <button className="btn btn-default" onClick={e=> this.reset(e)}>Reset</button>

                </div>
              </div>
            }
            {this.props.sites.saved &&
              <h4 className="BornholmSandvig">Narrative Saved!</h4>
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
    addNarrative: (narrObj) => {
      dispatch(addNarrative(narrObj));
    },
    resetSaved: () => {
      dispatch(resetSaved());
    },
  }
}

const FormNarrative = connect(mapStateToProps, mapDispatchToProps)(FormNarr);

export default FormNarrative;
