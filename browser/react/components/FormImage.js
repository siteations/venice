import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import Imagetrey from './ImageSlider.js';
import { setPanelSizing } from '../action-creators/panelActions.js';
//import { imageSeries } from '../pre-db/cirTest.js';



class FormImg extends Component {
	constructor(props) {
        super(props);
        this.state = {
          verify: false,
          added: false,
          entry : {},
          coreId: this.props.sites.currSite,
          minorId: this.props.sites.minorId,
          clusterId: this.props.sites.clusterId,
          imageSeries: 0,
          src: '',
          caption: '',
          catalogSource: '',
          catalogLink: '',
        }
        this.submission = this.submission.bind(this);
        this.update = this.update.bind(this);
        this.uploadImg = this.uploadImg.bind(this);
  }

  submission(e){
    e.preventDefault();
    this.setState({verify: true});
    let sub = this.state;

    this.setState({entry: sub});
    console.log('form submission', this.state);
    // should open a verification panel
  }

  uploadImg(e, type){
    e.preventDefault();
    var fileList = e.target.files;

    //check for max current imageSeries, set as plus 1
      let images = this.props.sites.genImages.map(image=> +image.imageSeries);
      let seriesId = Math.max(...images);
      seriesId++;
      this.setState({imageSeries: seriesId});

    var reader = new FileReader();
    reader.onload = (e) => {
      var the_url = e.target.result; //image as data
      this.setState({src:the_url});
    };
      reader.readAsDataURL(e.target.files[0]); //only first file, rework

  }

  // imgAdd(e){
  //   e.preventDefault();
  //   let count = this.state.imgCount;
  //   count.push(1);
  //   this.setState({imgCount: count});
  // }

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
            <p> click on map to select site or site detail </p>
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
            <h4 className="BornholmSandvig">Upload/Add Images for Narrative Panel</h4>
            <div className="editOps">
              <form onSubmit={e=>this.submission(e)}>
                <label className='underline' for="imageSeries">Image: </label>
                  <input className="form-control" type="file" id='image' onChange={e=>this.uploadImg(e)} ></input>
                <label className='underline' for="caption">Image Caption: </label>
                  <input className="form-control" type="text" id='caption' placeholder="Caption input" onChange={e=>this.update(e)} ></input>
                <label className='underline'>Image Catalog Source (Chicago Style Citation):</label>
                  <input className="form-control" id='catalogSource' onChange={e=>this.update(e)} placeholder="Source input" ></input><br/>
                <label className='underline' for="catalogLink">Catalog Link (at Newberry): </label>
                  <input className="form-control" id='catalogLink' onChange={e=>this.update(e)} placeholder="Link input" ></input><br/>

    				    <p>Submit information (input results will appear below)</p>
                <button className="btn btn-default" type="submit">Submit</button>
              </form>
            </div>
            {this.state.verify &&
              <div>
              <h4 className="BornholmSandvig">Review Entries</h4>
              <p> either accept (below) or correct & review again</p>
                <div className="editOps">
                <label className='underline' >Image: </label> <img src={this.state.src} style={{width:'100%'}} />
                <label className='underline' >Image Caption: </label> <p>{this.state.caption}</p><br/>
                <label className='underline'>Image Catalog Source (Chicago Style Citation):</label><p>{this.state.catalogSource}</p>
                <label className='underline' for="catalogLink">Catalog Link (at Newberry): </label><p>{this.state.catalogLink}</p>
                <p>Save information to database</p>
                <button className="btn btn-default" onClick="">Save Panel Image</button>
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

const FormImage = connect(mapStateToProps, mapDispatchToProps)(FormImg);

export default FormImage;
