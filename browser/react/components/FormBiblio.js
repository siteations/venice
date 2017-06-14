import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import { resetSaved, addBibliography } from '../action-creators/siteActions.js';




class FormBib extends Component {
	constructor(props) {
        super(props);
        this.state = {
          verify: false,

          imageId: 0,
          narrativeId: 0,

          narrative: {},
          image: {},

          author: '',
          title: '',
          published: '',
          physical: '',
          page: '',
          link: '',
        }
        this.submission = this.submission.bind(this);
        this.update = this.update.bind(this);
        this.updateOptions = this.updateOptions.bind(this);
        this.updateImg = this.updateImg.bind(this);
        this.save = this.save.bind(this);
        this.reset = this.reset.bind(this);
  }

  componentDidMount(){
    this.props.resetSaved();
  }



  save(e){
    e.preventDefault();
    var biblioObj={
        imageId:this.state.imageId,
        narrativeId: this.state.narrativeId,
        author: this.state.author,
        title: this.state.title,
        published: this.state.published,
        physical: this.state.physical,
        page: this.state.page,
        link: this.state.link,
    };

    this.props.addBiblio(biblioObj);

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

          imageId: 0,
          narrativeId: 0,

          narrative: {},
          image: {},

          author: '',
          title: '',
          published: '',
          physical: '',
          page: '',
          link: '',
        }

    this.setState(obj);

  }

  update(e){
    e.preventDefault();

    let input = e.target.value;
    let type = e.target.attributes.id.value;
    let obj={}; obj[type]=input;

    this.setState(obj);
  }

  updateImg(e){
    e.preventDefault();

    let input = e.target.attributes.value.value;
    let obj={}; obj.imageId=input;

    obj.image = this.props.sites.genImages.filter(narr=> +narr.id === +input)[0];

    this.setState(obj);
  }

  updateOptions(e, type){
    e.preventDefault();
    var id=document.getElementById('narrOptions').value;
    var narrative = this.props.sites.genNarratives.filter(narr=> +narr.id === +id)[0];
    let obj = {
      narrativeId: id,
      narrative: narrative,
    }

    this.setState(obj);

  }

  render(){

  	return (
           <div>
            <p> select from list of existing narratives <em>or</em> images </p>
            <form>
            <label className='underline' for="type">Select Existing Narrative to Add Source Bibliography: </label>
                  <select onChange={e=>this.updateOptions(e, 'narr')} id="narrOptions" style={{width:'80%'}} >
                  {this.props.sites.genNarratives &&
                    this.props.sites.genNarratives.map((layer,i)=>{
                      return (
                      <option value={layer.id} key={layer+i}>{layer.id} {layer.title}, for coreId: {layer.coreId}, clusterId: {layer.clusterId}, detailId: {layer.minorId}.</option>
                      )
                    })
                  }
                  </select><br/>
            </form><br/>
            <label className='underline' for="type">Or, Select One Existing Image to Add Source Bibliography: </label>
                  {this.props.sites.genImages &&
                    this.props.sites.genImages.map((image,i)=>{
                      return (
                            <button className="btn btn-default marg10" onClick={e => this.updateImg(e)} id='imageId' value={image.id} >
                              <span value={image.id} > {image.id}) <img src={image.src} style={{width:'100px'}} value={image.id} /></span>
                            </button>

                      )
                    })
                  }
            <br/>
            <h4 className="BornholmSandvig">Upload/Add Images for Narrative Panel</h4>
            <div className="editOps">
              <form onSubmit={e=>this.submission(e)}>
                <label className='underline' >Author: </label>
                  <input className="form-control" type="text" id='author' placeholder="author" onChange={e=>this.update(e)} ></input>
                <label className='underline' >Title: </label>
                  <input className="form-control" type="text" id='title' placeholder="title" onChange={e=>this.update(e)} ></input>
                <label className='underline'>Published (publisher, site, date):</label>
                  <input className="form-control" type="text" id='published' onChange={e=>this.update(e)} placeholder="Published" ></input><br/>
                <label className='underline'>Physical Characteristics: </label>
                  <input className="form-control" type="text" id='physical' onChange={e=>this.update(e)} placeholder="Physical Description" ></input><br/>
                <label className='underline'>Page(s) (if specific location): </label>
                  <input className="form-control" type="text" id='page' onChange={e=>this.update(e)} placeholder="Page Numbers/Folio Numbers" ></input><br/>
                <label className='underline'>Link to Newberry Catalog Entry (if applicable): </label>
                  <input className="form-control" type="text" id='link' onChange={e=>this.update(e)} placeholder="Newberry Catalog Link" ></input><br/>

    				    <p>Submit information (input results will appear below)</p>
                <button className="btn btn-default" type="submit">Submit</button>
              </form>
            </div>
            {this.state.verify &&
              <div>
              <h4 className="BornholmSandvig">Review Entries</h4>
              <p> either accept (below) or correct & review again</p>
                <div className="editOps">
                <label className='underline' >Narrative: </label> <p>{this.state.narrative.text}</p>
                <label className='underline' >Narrative Id: </label> <p>{this.state.narrativeId}</p>
                <p> Or, </p>
                <label className='underline' >Image: </label> <img src={this.state.image.src} style={{width:'90%'}} />
                <label className='underline' >Image Id: </label> <p>{this.state.imageId}</p><br/>

                <label className='underline' >Author: </label><p>{this.state.author}</p>
                <label className='underline' >Title: </label><p>{this.state.title}</p>
                <label className='underline'>Published (publisher, site, date):</label><p>{this.state.published}</p>
                <label className='underline'>Physical Characteristics: </label><p>{this.state.physical}</p>
                <label className='underline'>Page(s) (if specific location): </label><p>{this.state.page}</p>
                <label className='underline'>Link to Newberry Catalog Entry (if applicable): </label><p>{this.state.link}</p>

                <p>You must click below to save edits to database</p>
                <button className="btn btn-default" onClick={e=> this.save(e)}>Save Entry</button> or <button className="btn btn-default" onClick={e=> this.reset(e)}>Reset</button>
                </div>
              </div>
            }
            {this.props.sites.saved &&
              <h4 className="BornholmSandvig">Entry Added to Bibliography!</h4>
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
    addBiblio: (biblioObj) => {
      dispatch(addBibliography(biblioObj));
    },
    // editNarrative: (editObj, id) => {
    //   dispatch(editNarrative(editObj, id));
    // },
  }
}

const FormBiblio = connect(mapStateToProps, mapDispatchToProps)(FormBib);

export default FormBiblio;
