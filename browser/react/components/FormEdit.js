import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import {editSite, editDetail, editNarrative, editImages, editBiblio, resetSaved, addBibliography, loadSites, reloadDetails, reloadNarratives, reloadImages, reloadBiblio,  } from '../action-creators/siteActions.js';

import {getAllToursThemes, editTour } from '../action-creators/optionActions.js';


class FormEd extends Component {
constructor(props) {
        super(props);
        this.state = {
          verify: false,
          confirm: false,
          typeSelected: false,
          type: '',
          elementId: '',
          elementFull: [],
          elementAdjusted:{},

        }
        this.submit = this.submit.bind(this);
        this.update = this.update.bind(this);
        this.updateOptions = this.updateOptions.bind(this);
        this.updateImg = this.updateImg.bind(this);
        this.save = this.save.bind(this);
        this.reset = this.reset.bind(this);
        this.changeForm = this.changeForm.bind(this);
  }

  componentDidMount(){
    this.props.resetSaved();
  }



  save(e){
    e.preventDefault();
    let id = this.state.elementId;
    let choice = this.state.type;
    let obj = this.state.elementAdjusted;

    if (choice === 'site'){ this.props.editSite(id, obj) };
    if (choice === 'detail'){ this.props.editDetail(id, obj) };
    if (choice === 'narrative'){ this.props.editNarrative(id, obj) };
    if (choice === 'image'){ this.props.editImage(id, obj) };
    if (choice === 'tour'){ this.props.editTour(id, obj) };
    if (choice === 'biblio'){ this.props.editBiblio(id, obj) };

  }

  submit(e){
    e.preventDefault();
    this.setState({confirm: true});
    console.log('form submission', this.state);
    // should open a verification panel
  }

  reset(e){
    e.preventDefault();
    let obj = {
          verify: false,
          confirm: false,
          typeSelected: false,
          type: '',
          elementId: '',
          elementFull: [],
          elementAdjusted:{},
        }

    this.setState(obj);

  }

  update(e){
    e.preventDefault();

    let input = e.target.value;
    let type = e.target.attributes.id.value;
    let obj=this.state.elementAdjusted; obj[type]=input;

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
    var id=document.getElementById('delObj').value;
    this.setState({elementId:id});

    var choiceObj;
      if (this.state.type === 'site'){ choiceObj = this.props.sites.allSites };
      if (this.state.type === 'detail'){ choiceObj = this.props.sites.genDetails };
      if (this.state.type === 'narrative'){ choiceObj = this.props.sites.genNarratives };
      if (this.state.type === 'image'){ choiceObj = this.props.sites.genImages };
      if (this.state.type === 'biblio'){ choiceObj = this.props.sites.genBiblio };

    var selected = choiceObj.filter(item=>{
      return +item.id === +id;
    })[0];

    var elementKeys = Object.keys(selected);
    var selArr =[];

    elementKeys.forEach(key=>{
          selArr.push({key:key,value:selected[key]});
        })

    console.log(selArr);

      this.setState({elementFull:selArr, verify: true});


  }

  changeForm(e){
    e.preventDefault();
    let choice = e.target.value;
    this.setState({type: choice, typeSelected: true });
    if (choice === 'site'){ this.props.loadSites() };
    if (choice === 'detail'){ this.props.reloadDetails() };
    if (choice === 'narrative'){ this.props.reloadNarratives() };
    if (choice === 'image'){ this.props.reloadImages() };
    if (choice === 'tour'){ this.props.getAllTours() };
    if (choice === 'biblio'){ this.props.reloadBiblio() };

  }

  render(){

    var choiceObj;
    var elementKeys;
    var elementsNum;
    if (this.state.typeSelected === true){
      if (this.state.type === 'site'){ choiceObj = this.props.sites.allSites };
      if (this.state.type === 'detail'){ choiceObj = this.props.sites.genDetails };
      if (this.state.type === 'narrative'){ choiceObj = this.props.sites.genNarratives };
      if (this.state.type === 'image'){ choiceObj = this.props.sites.genImages };
      if (this.state.type === 'tour'){ choiceObj = this.props.options.allTours };
      if (this.state.type === 'biblio'){ choiceObj = this.props.sites.genBiblio };

        elementKeys = Object.keys(choiceObj[0]);

        choiceObj = choiceObj.map(item => {
        // var itemString='';
        //   elementKeys.forEach(key=>{
        //     itemString = itemString.concat(`${key}: ${item[key]}, `);
        //   })
           return {id:item.id, string:JSON.stringify(item)};
        })
      // } else if (this.state.type === 'tour' && choiceObj !== {} ){
      //   elementKeys = Object.keys(choiceObj);
      //   var elementKeys2 = Object.keys(choiceObj['1'][0]);

      //   var finalArr = elementKeys.map(key=>{
      //     var itemString='';
      //     choiceObj[key].forEach(elem=>{

      //       elementKeys2.forEach(spec=>{
      //         itemString = itemString.concat(`${spec}: ${elem[spec]}, `);
      //       })
      //       itemString +=' ; ';
      //     })
      //     return {id:key, string:itemString}
      //   })
      //   finalArr.unshift({id:null, string:'select a tour'});
      //   console.log(finalArr);
      // }
    }

    return (
          <div>
           <div>
          <h4 className="BornholmSandvig">Select Element Type To Load</h4>
          <button className="btn btn-default marg10" value="site" onClick={e=>this.changeForm(e)} >Site</button>
          <button className="btn btn-default marg10" value="detail" onClick={e=>this.changeForm(e)} >Detail</button>
          <button className="btn btn-default marg10" value="narrative" onClick={e=>this.changeForm(e)} >Narrative</button>
          <button className="btn btn-default marg10" value="image" onClick={e=>this.changeForm(e)} >Image</button>
          <button className="btn btn-default marg10" value="biblio" onClick={e=>this.changeForm(e)} >Bibliography</button>
          </div>

          {this.state.typeSelected &&
              <div>
              <br/>
                <p>Choose one {this.state.type} in the following drop-down</p>
            <form>
              <label className='underline' >Select for Editing: </label>
                  <select onChange={e=>this.updateOptions(e)} id="delObj" style={{width:'80%'}} >
                  {choiceObj &&
                    choiceObj.map((item,i)=>{
                      return (
                      <option value={item.id} key={'delete'+i}>{item.string}
                      </option>
                      )
                    })
                  }
                  </select><br/>
            </form>
              </div>
          }
          <br/>
          <br/>
          {this.state.verify &&
            <div>
              <h4 className="BornholmSandvig">Review Changes</h4>
              <p> either accept (below) or correct & review again</p>
                <div className="editOps">
                <form>
                {this.state.elementFull &&
                  this.state.elementFull.map(item=>{
                    return (
                    <div>
                    <label className='underline'>{item.key}:</label>
                    <input className="form-control" id={item.key} onChange={e=>this.update(e)} placeholder={item.value}></input><br/>
                    </div>
                    )
                })
                }
                </form>
                <p>You must click below to preview edits, for confirmation</p>
                <button className="btn btn-default" onClick={e=>this.submit(e)}>Submit</button> or <button className="btn btn-default" onClick={e=> this.reset(e)}>Reset</button>

                </div>
            </div>
            }
            {this.state.confirm &&
            <div>
              <h4 className="BornholmSandvig">Verify Before Updating Database</h4>
              <p> either accept (below) or correct & review again</p>
                <div className="editOps">
                {this.state.elementAdjusted &&
                    <div>
                    <p>{JSON.stringify(this.state.elementAdjusted)}</p>
                    </div>
                }
                <p>You must click below to process edits</p>
                <button className="btn btn-default" onClick={e=>this.save(e)}>Save Edits</button> or <button className="btn btn-default" onClick={e=> this.reset(e)}>Reset</button>

                </div>
            </div>
            }
          </div>
    )}

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
    //-----------loading values to delete---------------
    loadSites: () => {
      dispatch(loadSites());
    },
    reloadDetails: () => {
      dispatch(reloadDetails());
    },
    reloadNarratives: () => {
      dispatch(reloadNarratives());
    },
    reloadImages: () => {
      dispatch(reloadImages());
    },
    getAllTours: () => {
      dispatch(getAllToursThemes());
    },
    reloadBiblio: () => {
      dispatch(reloadBiblio());
    },
    //-----------dispatch delete actions---------------
    editSite: (id, obj) => {
      dispatch(editSite(id, obj));
    },
    editDetail: (id, obj) => {
      dispatch(editDetail(id, obj));
    },
    editNarrative: (id, obj) => {
      dispatch(editNarrative(id, obj));
    },
    editImages: (id, obj) => {
      dispatch(editImages(id, obj));
    },
    editBiblio: (id, obj) => {
      dispatch(editBiblio(id, obj));
    },
    editTour: (id, obj) => {
      dispatch(editTour(id, obj));
    },
  }
}


//import {editSite, deleteDetail, deleteNarrative, deleteImages, deleteBiblio,  resetSaved, addBibliography, loadSites, reloadDetails, reloadNarratives, reloadImages, reloadBiblio,  } from '../action-creators/siteActions.js';

//import {getAllToursThemes} from '../action-creators/optionActions.js';

const FormEdit = connect(mapStateToProps, mapDispatchToProps)(FormEd);

export default FormEdit;
