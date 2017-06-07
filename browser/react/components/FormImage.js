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
          coreId: 0,
          minorId: 0,
          clusterId: 0,
          imageSeries: 0,
          narrativeId: 0,
          src: '',
          caption: '',
          catalogSource: '',
          catalogLink: '',
        }
        this.submission = this.submission.bind(this);
        this.update = this.update.bind(this);
        this.uploadImg = this.uploadImg.bind(this);
        this.save = this.save.bind(this);
        this.reset = this.reset.bind(this);
  }

  submission(e){
    e.preventDefault();
    this.setState({verify: true});
    console.log('form submission', this.state);
    // should open a verification panel
  }

  reset(e){
    e.preventDefault();
    let obj = {
          verify: false,
          coreId: 0,
          minorId: 0,
          clusterId: 0,
          imageSeries: 0,
          narrativeId: 0,
          src: '',
          caption: '',
          catalogSource: '',
          catalogLink: '',
        }

    this.setState(obj);

  }

  save(e){

  }

  uploadImg(e){
    e.preventDefault();
    var fileList = e.target.files;

    //check for max current imageSeries, set as plus 1
      let images = this.props.sites.genImages.map(image=> +image.imageSeries);
      var seriesId = Math.max(...images);
      seriesId++;

      var narrative;
      if (this.props.sites.currSite !== 0){
        narrative = this.props.sites.genNarratives.filter(narr => +narr.coreId === this.props.sites.currSite.siteId && (narr.minorId===0 || narr.minorId===null))[0];
        if (this.props.sites.minorId !== 0 && this.props.sites.minorId !== null){ narrative = this.props.sites.genNarratives.filter(narr => +narr.minorId === this.props.sites.minorId)[0] };
      }

      if (narrative){
        this.setState({narrativeId: narrative.id});

        if (narrative.imageSeries>0){
          seriesId = narrative.imageSeries;
        }
      }

      this.setState({imageSeries: seriesId});

    var reader = new FileReader();
    reader.onload = (e) => {
      var the_url = e.target.result; //image as data
      this.setState({src:the_url});
    };
      reader.readAsDataURL(e.target.files[0]); //only first file, rework
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
    var element, cluster, detail, narrative;
    let show = false, details = false;
    if (siteId !== 0){
      element = this.props.sites.allSites.filter(sites=> +sites.id === siteId)[0];
      narrative = this.props.sites.genNarratives.filter(narr => +narr.coreId === siteId && (narr.minorId===0 || narr.minorId===null))[0];
      if (this.props.sites.minorId !== 0 && this.props.sites.minorId !== null){ narrative = this.props.sites.genNarratives.filter(narr => +narr.minorId === this.props.sites.minorId)[0] };
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
              {narrative !== undefined &&
                <p><span className='underline'>Current Narrative: </span><br/>{narrative.text}</p>
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
                <p>You must click below to save edits to database</p>
                <button className="btn btn-default" onClick={e=> this.save(e)}>Save Panel Image</button> or <button className="btn btn-default" onClick={e=> this.reset(e)}>Reset</button>
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
    addImage: (imgObj) => {
      //dispatch(addImage(imgObj));
    },
    editNarrative: (editObj, id, fieldsArr) => {
      //dispatch(editNarrative(editObj, id, fieldsArr));
    },
  }
}

const FormImage = connect(mapStateToProps, mapDispatchToProps)(FormImg);

export default FormImage;
