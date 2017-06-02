import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import Imagetrey from './ImageSlider.js';
import { setPanelSizing } from '../action-creators/panelActions.js';
//import { imageSeries } from '../pre-db/cirTest.js';



class FormDe extends Component { // so this will be an update to site table, addition to detail table
	constructor(props) {
        super(props);
        this.state = {
          verify: false,
          added: false,
          entry : {},
          coreId: 0,
          minorId: 0,
          clusterId: 0,
          nameH: '',
          srcThumb: '',
          name: '',
        }
        this.submission = this.submission.bind(this);
        this.update = this.update.bind(this);
        this.uploadImg = this.uploadImg.bind(this);
  }

  submission(e){
    e.preventDefault();
    let obj={};
    obj['coreId']= +this.props.sites.currSite;
    obj['name'] = this.props.sites.allSites.filter(site=> +site.id === +obj['coreId'])[0].name;

    let clusterId = this.props.sites.allSites.filter(site=> +site.id === +obj['coreId'])[0].clusterId;
    let allCluster = this.props.sites.allSites.map(site=>site.clusterId);
    let cluster = Math.max(...allCluster);
    if (clusterId===null){clusterId = cluster+1};
    obj['clusterId']= +clusterId;

    let details=this.props.sites.genDetails.filter(detail=> +detail.clusterId === +clusterId);
    let detailId = details.length + 1;
    obj['minorId'] = detailId;
    obj['verify'] = true;

    this.setState(obj);
    let sub = this.state;

    this.setState({entry: sub});
    console.log('form submission', this.state, obj);
    // should open a verification panel
  }

  uploadImg(e){
    e.preventDefault();
    var fileList = e.target.files;

    var reader = new FileReader();
    reader.onload = (e) => {
      var the_url = e.target.result; //image as data
      this.setState({srcThumb:the_url});
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
    let show = false;
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
            </div>
            <br/>
            <h4 className="BornholmSandvig">Add Detail (Image & Label)</h4>
            <div className="editOps">
              <form onSubmit={e=>this.submission(e)}>

                  <label className='underline' for="srcThumb">Detail Image Thumbnail: </label>
                    <input className="form-control" type="file" id='srcThumb' onChange={e=>this.uploadImg(e)} ></input>
                  <label className='underline' for="nameH">Detail Label: </label>
                    <input className="form-control" type="text" id='nameH' placeholder="Detail Label" onChange={e=>this.update(e)} ></input>

    				    <p>Submit information (input results will appear below)</p>
                <button className="btn btn-default" type="submit">Submit</button>
              </form>
            </div>
            {this.state.verify &&
              <div>
              <h4 className="BornholmSandvig">Review Entries</h4>
              <p> either accept (below) or correct & review again</p>
                <div className="editOps">
                <label className='underline' > Detail Image Thumbnail: </label> <img src={this.state.srcThumb} style={{width:'100%'}} />
                <label className='underline' >Detail Label: </label> <p>{this.state.nameH}</p>
                <label className='underline' >Detail Cluster: </label> <p>{this.state.clusterId}</p>
                <label className='underline' >Detail Id: </label> <p>{this.state.minorId}</p>
                <label className='underline' >Original Site Id: </label> <p>{this.state.coreId}</p>
                <label className='underline' >Original Site Name: </label> <p>{this.state.name}</p>
                <p>You must click below to save edits to database</p>
                <button className="btn btn-default" onClick="">Save Thumbnail Detail</button>

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

const FormDetail = connect(mapStateToProps, mapDispatchToProps)(FormDe);

export default FormDetail;
