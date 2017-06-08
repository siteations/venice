import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import { editNarrative, addImage, resetSaved } from '../action-creators/siteActions.js';


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
          narrative: {},
          src: '',
          data_uri: '',
          filename: '',
          filetype: '',
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

  componentDidMount(){
    this.props.resetSaved();
  }

  save(e){
    e.preventDefault();
    var imageObj={
          src: '', //fills in later in request, temp view
          caption: this.state.caption,
          catalogSource: this.state.catalogSource,
          catalogLink: this.state.catalogLink,
          imageSeries: this.state.imageSeries,
    };

    var narrId = this.state.narrativeId;
    var narrObj = this.state.narrative;
      narrObj.imageSeries = this.state.imageSeries;


    var imgObj = { //actual photo
        data_uri: this.state.data_uri,
        filename: this.state.filename,
        filetype: this.state.filetype
    };

    this.props.addImage(imgObj, imageObj);
    this.props.editNarrative(narrObj, narrId);


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
          narrative: {},
          src: '',
          data_uri: '',
          filename: '',
          filetype: '',
          caption: '',
          catalogSource: '',
          catalogLink: '',
        }

    this.setState(obj);

  }

  uploadImg(e){
    e.preventDefault();

    //image series number...
      let images = this.props.sites.genImages.map(image=> +image.imageSeries);
      var seriesId = Math.max(...images);
      seriesId++;

      if (this.state.narrative.imageSeries>0){
          seriesId = this.state.narrative.imageSeries;
      }
      this.setState({imageSeries: seriesId});

      var reader = new FileReader();
      var file = e.target.files[0];

      reader.onload = (e) => {
        var the_url = e.target.result; //image as data
        this.setState({
          data_uri:the_url,
          src: the_url, //preview only
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

    this.setState(obj);
  }

  updateOptions(e){
    e.preventDefault();
    let id = document.getElementById('gadget').value;
    let narrative  = this.props.sites.genNarratives.filter(narr=> +narr.id === +id)[0];
    let obj = {
      narrativeId: id,
      narrative: narrative,
      coreId: narrative.coreId,
      minorId: narrative.minorId,
      clusterId: narrative.clusterId,
    }

    this.setState(obj);

  }

  render(){

  	return (
           <div>
            <p> select from list of existing site and detail narratives </p>
            <form>
            <label className='underline' for="type">Select Existing Narrative: </label>
                  <select onChange={e=>this.updateOptions(e)} id="gadget" style={{width:'80%'}} >
                  {this.props.sites.genNarratives &&
                    this.props.sites.genNarratives.map((layer,i)=>{
                      return (
                      <option value={layer.id} key={layer+i}>{layer.id} {layer.title}, for coreId: {layer.coreId}, clusterId: {layer.clusterId}, detailId: {layer.minorId}.</option>
                      )
                    })
                  }
                  </select><br/>
            </form>
            <h4 className="BornholmSandvig">Background Data on Selected Narrative</h4>
            <div className="editOps">
              <div>
                <ul>
                  <li><span className='underline'>Site Id:</span> {this.state.coreId}</li>
                  <li><span className='underline'>Cluster Id:</span> {this.state.clusterId}</li>
                  <li><span className='underline'>Detail Id:</span> {this.state.minorId}</li>
                  <p><span className='underline'>Narrative Title: </span><br/>{this.state.narrative.title}</p>
                </ul>
              </div>
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
            {this.props.sites.saved &&
              <h4 className="BornholmSandvig">Image Added to Narrative!</h4>
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
    addImage: (imgObj, imageObj) => {
      dispatch(addImage(imgObj, imageObj));
    },
    editNarrative: (editObj, id) => {
      dispatch(editNarrative(editObj, id));
    },
  }
}

const FormImage = connect(mapStateToProps, mapDispatchToProps)(FormImg);

export default FormImage;
