import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import { resetSaved } from '../action-creators/siteActions.js';
//import { imageSeries } from '../pre-db/cirTest.js';


class FormT extends Component {
	constructor(props) {
        super(props);
        this.state = {
          verify: false,
          new: false,
          add: false,
          //id will be auto added
          tourId: 0,
          siteId: 0,
          zoom: 3,
          tourIdNew: 0,
          siteIdNew: 0,
          zoomNew: 3,
          tourName: '',
          siteRemove: 0,
        }
        this.submission = this.submission.bind(this);
        this.update = this.update.bind(this);
        this.updateOptions = this.updateOptions.bind(this);
        this.save = this.save.bind(this);
        this.reset = this.reset.bind(this);
  }

  reset(e){
    e.preventDefault();
    let obj = {
          verify: false,
          new: false,
          add: false,
          //id will be auto added
          tourId: 0,
          tourIdNew: 0,
          siteId: 0,
          zoom: 3,
          tourName: '',
          siteRemove: 0,
        }

    this.setState(obj);

  }

  submission(e, type){
    e.preventDefault();
    let obj = {};
    obj[type] = true;
    obj['verify']=true;
    this.setState(obj);
    console.log('as submitted, ', this.state);
    // should open a verification panel
  }

  save(e, type){
    e.preventDefault();
    console.log(this.state);
    //untangle the post/put options here:

    // let obj = {};
    // obj[type] = true;
    // obj['verify']=true;
    // this.setState(obj);
    // should open a verification panel
  }

  update(e){
    e.preventDefault();
    let input = e.target.value;
    let type = e.target.attributes.id.value;
    let obj={}; obj[type]=input;

    this.setState(obj);
  }

  updateOptions(e, id, exists){
    e.preventDefault();
    let input = document.getElementById(id).value;
    console.log('tourid?', id, input);
    var obj={}; obj[id]=input;
    this.setState(obj);

    if (obj.tourId){
      let tourCurrName = this.props.options.allTours[obj.tourId][0].tourName;
      console.log(tourCurrName);
      this.setState({tourName : tourCurrName});
    }
  }


  render(){
  	//console.log(this.props);


    var tourIds = Object.keys(this.props.options.allTours);
    let newTourId = Math.max(...tourIds) + 1;
        tourIds.unshift('none');

        console.log(tourIds);
    //prep choices

    let siteName;
    if (this.state.siteId>0){
      siteName = this.props.sites.allSites[this.state.siteId-1].name;
    }

    let siteNameRemoved;
    if (this.state.siteRemove>0){
      siteNameRemoved = this.props.sites.allSites[this.state.siteRemove-1].name;
    }

  	return (
           <div>
            <p> either select a tour to add sites to or start a new tour</p>
            <h4 className="BornholmSandvig">Create New Tour</h4>
            <div className="editOps">
              <form onSubmit={e=>this.submission(e, 'new')}>
                <label className='underline'> New Tour Id: </label>
                  <select onChange={e=>this.updateOptions(e, 'tourIdNew')} id='tourIdNew' style={{width:'80%'}}>
                    <option value={newTourId}>none</option>
                    <option value={newTourId}>{newTourId}</option>
                  </select>
                <label className='underline' for="tourName">Add Tour Name: </label>
                  <input className="form-control" id='tourName' onChange={e=>this.update(e)} placeholder="Tour Name"></input>
                <label className='underline' for="siteId">Select Initial Site (with Details): </label>
                  <select onChange={e=>this.updateOptions(e, 'siteIdNew')} id='siteIdNew' style={{width:'80%'}}>
                  {this.props.sites.allSites &&
                    this.props.sites.allSites.map(layer=>{
                      return (
                      <option value={layer.id} >{layer.id +' '+ layer.name.replace('.', ', ')}</option>
                      )
                    })
                  }
                  </select>
                <label className='underline' for="zoom">Set Zoom level (3 = zoomed-out, 6 = zoomed-in): </label>
                  <select onChange={e=>this.updateOptions(e, 'zoomNew')} id='zoomNew' style={{width:'80%'}}>
                    <option value='3'>none</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                  </select>
                <p>Submit information (input results will appear at bottom)</p>
                <button className="btn btn-default" type="submit">Submit</button>
              </form>
            </div>

            <h4 className="BornholmSandvig">Or, Add Site to Exisiting Tour</h4>
            <div className="editOps">
              <form onSubmit={e=>this.submission(e, 'add')}>
                <label className='underline' for="type">Select Existing Tour: </label>
                  <select onChange={e=>this.updateOptions(e, 'tourId', true)} id='tourId' style={{width:'80%'}}>
                  {tourIds &&
                    tourIds.map(layer=>{
                      return (
                      <option value={layer}>{layer}</option>
                      )
                    })
                  }
                  </select>
                  {this.state.tourId !== 0 &&
                    <div>
                      <h4>Existing sites for tour {this.state.tourId}, {this.state.tourName}: </h4>
                      <ul>
                      {this.props.options.allTours[this.state.tourId] &&
                        this.props.options.allTours[this.state.tourId].map((site,i)=>{
                          site.name = this.props.sites.allSites[site.siteId-1].name;
                          return <li>{`id: ${site.siteId}, name: ${site.name.replace('.', ', ')}`}</li>
                        })

                      }
                      </ul>
                    </div>
                  }
                <label className='underline' for="siteId">Select Site to Add (with Details): </label>
                  <select onChange={e=>this.updateOptions(e, 'siteId')} id='siteId' style={{width:'80%'}}>
                  {this.props.sites.allSites &&
                    this.props.sites.allSites.map(layer=>{
                      return (
                      <option value={layer.id} >{layer.id +' '+ layer.name.replace('.', ', ')}</option>
                      )
                    })
                  }
                  </select>
                <label className='underline' for="zoom">Set Zoom level (3 = zoomed-out, 6 = zoomed-in): </label>
                  <select onChange={e=>this.updateOptions(e, 'zoom')} id='zoom' style={{width:'80%'}}>
                    <option value='3'>none</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                  </select>
                <label className='underline' for="siteRemove">Or Remove Site (and Details): </label>
                  <select onChange={e=>this.updateOptions(e, 'siteRemove')} id='siteRemove' style={{width:'80%'}}>
                  <option value={0} >{'none'}</option>
                  {this.props.sites.allSites &&
                    this.props.sites.allSites.map(layer=>{
                      return (
                      <option value={layer.id} >{layer.id +' '+ layer.name.replace('.', ', ')}</option>
                      )
                    })
                  }
                  </select>
                <p>Submit information (input results will appear below)</p>
                <button className="btn btn-default" type="submit">Submit</button>
              </form>
            </div>
            {this.state.verify === true && this.state.add === true &&
              <div>
              <h4 className="BornholmSandvig">Review Entries</h4>
              <p> either accept (below) or correct & review again</p>
                <div className="editOps">
                <label className='underline'>Choosen Tour:</label> <p>{this.state.tourId}, {this.state.tourName}</p>
                <ul>
                      {this.props.options.allTours[this.state.tourId] &&
                        this.props.options.allTours[this.state.tourId].map((site,i)=>{

                          if (+site.siteId !== +this.state.siteRemove) {
                            return <li>{`id: ${site.siteId}, name: ${site.name.replace('.', ', ')}`}</li>
                          }
                        })

                      }
                </ul>
                      <label className='underline'>added:</label><p> {`id: ${this.state.siteId}, name: ${siteName}`}</p>
                      <label className='underline'>removed:</label><p> {`id: ${this.state.siteRemove}, name: ${siteNameRemoved}`}</p>
                <p>You must click below to save edits to database</p>
                <button className="btn btn-default" onClick={e=>this.save(e,'add')}>Save</button> or <button className="btn btn-default" onClick={e=> this.reset(e)}>Reset</button>
                </div>
              </div>
            }
            {this.state.verify === true && this.state.new === true &&
              <div>
              <h4 className="BornholmSandvig">Review Entries</h4>
              <p> either accept (below) or correct & review again</p>
                <div className="editOps">
                <label className='underline'>New Tour:</label> <p>{this.state.tourId}, {this.state.tourName}</p>
                <label className='underline'>Initial Site:</label><p> {`id: ${this.state.siteId}, name: ${siteName}`}</p>

                <p>You must click below to save edits to database</p>
                <button className="btn btn-default" onClick={e=>this.save(e,'new')}>Save</button> or <button className="btn btn-default" onClick={e=> this.reset(e)}>Reset</button>

                </div>
              </div>
            }
            {this.props.sites.saved &&
              <h4 className="BornholmSandvig">Tour/Site successfully saved!</h4>
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    resetSaved: () => {
      dispatch(resetSaved());
    },
  }
}

const FormTour = connect(mapStateToProps, mapDispatchToProps)(FormT);

export default FormTour;
