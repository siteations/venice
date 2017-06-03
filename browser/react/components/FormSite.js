import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import Imagetrey from './ImageSlider.js';
import { setPanelSizing } from '../action-creators/panelActions.js';
//import { imageSeries } from '../pre-db/cirTest.js';



class FormSi extends Component {
	constructor(props) {
        super(props);
        this.state = {
          verify: false,
          //id will be auto added
          cx: 0,
          cy: 0,
          r: 0,
          generalName: '',
          properName: '',
          type: '',
          cluster: false,
          clusterId: 0,
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

  updateOptions(e){
    e.preventDefault();
    let input = document.getElementById('gadget').value;
    console.log(input);
    let obj={}; obj.type=input;

    this.setState(obj);

  }

  render(){
  	//console.log(this.props);


  	return (
           <div>
            <p> zoom in and double-click on map to add a new center, then click once again to add a radius</p>
            <p> once these have been added, you will be able to add additional info below</p>
            <h4 className="BornholmSandvig">Add a New Map Site</h4>
            <div className="editOps">
              {this.props.sites.newSite > 0 &&
                <div>
                  <h4 className="BornholmSandvig">Map-Based Additions: Center</h4>
                  <label className='underline'>New Id: </label>
                  <p>{this.props.sites.newSite}</p>
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
              <form onSubmit={e=>this.submission(e)} disabled={this.state.cx>0 && this.state.cy>0 && this.state.r>0 }>
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
                <label className='underline'>General Name (church affiliation, etc.):</label> <p>{this.state.generalName}</p>
                <label className='underline'>Specific Site Name: </label> <p>{this.state.properName}</p>
                <label className='underline'>Layer Classification:</label> <p>{this.state.type}</p>
                <p>You must click below to save edits to database</p>
                <button className="btn btn-default" onClick="">Save Site</button>

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

const FormSite = connect(mapStateToProps, mapDispatchToProps)(FormSi);

export default FormSite;
