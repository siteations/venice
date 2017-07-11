import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
//import $ from 'jquery';

import Imagetrey from './ImageSlider.js';
import { setPanelSizing } from '../action-creators/panelActions.js';
//import { imageSeries } from '../pre-db/cirTest.js';
import { editSite, addDetail, resetSaved } from '../action-creators/siteActions.js';



class FormDe extends Component { // so this will be an update to site table, addition to detail table
	constructor(props) {
        super(props);
        this.state = {
          verify: false,
          coreId: 0,
          minorId: 0,
          clusterId: 0,
          nameH: '',
          srcThumb: '',
          data_uri: '',
          filename: '',
          filetype: '',
          name: '',
        }
        this.submission = this.submission.bind(this);
        this.update = this.update.bind(this);
        this.uploadImg = this.uploadImg.bind(this);
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
          nameH: '',
          srcThumb: '',
          name: '',
        }

    this.setState(obj);

  }

  submission(e){
    e.preventDefault();
    var obj={};
    obj['coreId']= +this.props.sites.currSite;
    obj['name'] = this.props.sites.allSites.filter(site=> +site.id === +obj['coreId'])[0].name;

    var clusterId = this.props.sites.allSites.filter(site=> +site.id === +obj['coreId'])[0].clusterId;
    let allCluster = this.props.sites.allSites.filter(site=> site.clusterId>0).map(site=>site.clusterId);
    let cluster = Math.max(...allCluster);
    if (!clusterId){ clusterId = cluster+1};
    obj['clusterId']= +clusterId;

    let details=this.props.sites.genDetails.filter(detail=> +detail.clusterId === +clusterId);
    let detailId = details.length + 1;
    obj['minorId'] = detailId;
    obj['verify'] = true;


    console.log('form submission', obj);
    this.setState(obj);
    // should open a verification panel
  }

  save(e){
    e.preventDefault();
    var detailObj={
      clusterId: this.state.clusterId,
      nameH: this.state.nameH,
      srcThumb: '', //fills in later in request, temp view
    };

    var siteObj = {
      id: this.state.coreId,
      cluster: true,
      clusterId: this.state.clusterId,
    };

    var imgObj = {
        data_uri: this.state.srcThumb,
        filename: this.state.filename,
        filetype: this.state.filetype
    };

    this.props.addDetail(imgObj, detailObj);
    this.props.editSite(this.state.coreId, siteObj);

  }


  uploadImg(e){
    e.preventDefault();
    var fileList = e.target.files;

    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = (e) => {
      var the_url = e.target.result; //image as data
      this.setState({
        data_uri:the_url,
        srcThumb: the_url,
        filename: file.name,
        filetype: file.type
      });
    };
      reader.readAsDataURL(file); //only first file, rework

  }

  update(e){
    e.preventDefault();
    let input = e.target.value;
    let type = e.target.attributes.id.value;
    let obj={}; obj[type]=input;

    obj['coreId']= +this.props.sites.currSite;
    obj['clusterId']= +this.props.sites.clusterId;
    obj['minorId']= +this.props.sites.minorId;

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
            <p> click on map to select site to add Detail</p>
            <h4 className="BornholmSandvig">Background Data</h4>
            <div className="editOps">
  				    <h4><span className='underline'>Site Type:</span> {this.props.panel.title}</h4>
  				    <h4><span className='underline'>Site Name:</span> {this.props.panel.subtitle}</h4>
            </div>
            <br/>
            <h4 className="BornholmSandvig">Add Detail (Thumbnail Image & Label)</h4>
            <div className="editOps">
              <form onSubmit={e=>this.submission(e)}>

                  <label className='underline' for="srcThumb">Detail Image Thumbnail: (max 600 x 600 pixels)</label>
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
                <label className='underline' >Detail Image Thumbnail: </label> <img src={this.state.srcThumb} style={{width:'100%'}} />
                <label className='underline' >Detail Label: </label> <p>{this.state.nameH}</p>
                <label className='underline' >Detail Cluster: </label> <p>{this.state.clusterId}</p>
                <label className='underline' >Detail Id: </label> <p>{this.state.minorId}</p>
                <label className='underline' >Original Site Id: </label> <p>{this.state.coreId}</p>
                <label className='underline' >Original Site Name: </label> <p>{this.state.name}</p>
                <p>You must click below to save edits to database</p>
                <button className="btn btn-default" onClick={e=>this.save(e)}>Save Thumbnail Detail</button> or <button className="btn btn-default" onClick={e=> this.reset(e)}>Reset</button>

                </div>
              </div>
            }
            {this.props.sites.saved &&
              <h4 className="BornholmSandvig">Detail Saved!</h4>
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
    editSite: (id, siteObj) => {
      dispatch(editSite(id, siteObj));
    },
    addDetail: (imgObj, detailObj) => {
      dispatch(addDetail(imgObj, detailObj));
    },
    resetSaved: () => {
      dispatch(resetSaved());
    },

  }
}

const FormDetail = connect(mapStateToProps, mapDispatchToProps)(FormDe);

export default FormDetail;
