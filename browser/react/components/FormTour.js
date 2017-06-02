import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import Imagetrey from './ImageSlider.js';
import { setPanelSizing } from '../action-creators/panelActions.js';
//import { imageSeries } from '../pre-db/cirTest.js';



class FormT extends Component {
	constructor(props) {
        super(props);
        this.state = {
          verify: false,
          //id will be auto added
          tourId: 0,
          siteId: 0,
          zoom: 3,
          tourName: '',
        }
        this.submission = this.submission.bind(this);
        this.update = this.update.bind(this);
  }

  submission(e){
    e.preventDefault();
    this.setState({verify: true});
    let sub = this.state;

    this.setState({entry: sub});
    console.log('form submission', this.state);
    // should open a verification panel
  }

  update(e){
    e.preventDefault();
    let input = e.target.value;
    let type = e.target.attributes.id.value;
    let obj={}; obj[type]=input;

    this.setState(obj);
  }

  render(){
  	//console.log(this.props);
    let tours={};
    this.props.options.allTours.forEach(site=>{
      if (tours[site.tourId]){
        var arr = tours[site.tourId];
        tours[site.tourId] = arr.concat([site]);
      } else {
        tours[site.tourId] = [site];
      }
    });
    let tourIds = Object.keys(tours);


  	return (
           <div>
            <p> either select a tour to add sites to or start a new tour</p>
            <h4 className="BornholmSandvig">Add Sites to Exisiting Tour</h4>
            <div className="editOps">
              <form onSubmit={e=>this.submission(e)} disabled={!this.state.cx}>
                <label className='underline' for="type">Select Existing Tour: </label>
                  <select onChange={e=>this.update(e)} style={{width:'80%'}}>
                  {this.props.sites.allSites &&
                    this.props.sites.allSites.map(layer=>{
                      return (
                      <option value={layer.name} >{layer.name.split('.')[1]},<br/> {layer.name.split('.')[0]}</option>
                      )
                    })
                  }
                  </select>
                  {this.state.tourId !== 0 &&
                    <div>
                      <h4>Existing sites for tour {this.state.tourId}: </h4>
                      map thru filtered sites later
                      <ul>
                      </ul>
                    </div>
                  }
                <label className='underline' for="type">Select Site to Add (with Details): </label>
                  <select onChange={e=>this.update(e)} style={{width:'80%'}}>
                  {this.props.sites.allSites &&
                    this.props.sites.allSites.map(layer=>{
                      return (
                      <option value={layer.name} >{layer.name.split('.')[1]},<br/> {layer.name.split('.')[0]}</option>
                      )
                    })
                  }
                  </select>
                <label className='underline' for="type">Or Remove Site (and Details): </label>
                  <select onChange={e=>this.update(e)} >
                  {this.props.sites.allSites &&
                    this.props.sites.allSites.map(layer=>{
                      return (
                      <option value={layer.name} >{layer.name.split('.')[1]},<br/> {layer.name.split('.')[0]}</option>
                      )
                    })
                  }
                  </select>
                <p>Submit information (input results will appear below)</p>
                <button className="btn btn-default" type="submit">Submit</button>
              </form>
            </div>
            {this.state.verify &&
              <div>
              <h4 className="BornholmSandvig">Review Entries</h4>
              <p> either accept (below) or correct & review again</p>
                <div className="editOps">
                <label className='underline'>Layer Classification:</label> <p>{this.state.tourId}</p>
                <p>Save information to database</p>
                <button className="btn btn-default" onClick="">Save</button>

                </div>
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

const FormTour = connect(mapStateToProps, mapDispatchToProps)(FormT);

export default FormTour;
