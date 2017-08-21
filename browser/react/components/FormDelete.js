import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import {deleteSite, deleteDetail, deleteNarrative, deleteImages, deleteBiblio, resetSaved, addBibliography, loadSites, reloadDetails, reloadNarratives, reloadImages, reloadBiblio,  } from '../action-creators/siteActions.js';

import {getAllToursThemes, deleteTour } from '../action-creators/optionActions.js';




class Forxs extends Component {
	constructor(props) {
        super(props);
        this.state = {
          verify: false,
          typeSelected: false,
          type: '',
          elementId: '',
          elementFull: [],

        }
        this.submission = this.submission.bind(this);
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

    if (choice === 'site'){ this.props.deleteSite(id) };
    if (choice === 'detail'){ this.props.deleteDetail(id) };
    if (choice === 'narrative'){ this.props.deleteNarrative(id) };
    if (choice === 'image'){ this.props.deleteImages(id) };
    if (choice === 'tour'){ this.props.deleteTour(id) };
    if (choice === 'biblio'){ this.props.deleteBiblio(id) };

    this.reset();

  }

  submission(e){
    e.preventDefault();
    this.setState({verify: true});
    console.log('form submission', this.state);
    // should open a verification panel
  }

  reset(){
    //e.preventDefault();
    let obj = {
          verify: false,
          typeSelected: false,
          type: '',
          elementId: '',
          elementFull: [],
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
    var id=document.getElementById('delObj').value;
    this.setState({elementId:id});

    var choiceObj;
      if (this.state.type === 'site'){ choiceObj = this.props.sites.allSites };
      if (this.state.type === 'detail'){ choiceObj = this.props.sites.genDetails };
      if (this.state.type === 'narrative'){ choiceObj = this.props.sites.genNarratives };
      if (this.state.type === 'image'){ choiceObj = this.props.sites.genImages };
      if (this.state.type === 'tour'){ choiceObj = this.props.options.allTours };
      if (this.state.type === 'biblio'){ choiceObj = this.props.sites.genBiblio };

      if (this.state.type !== 'tour'){
    var selected = choiceObj.filter(item=>{
      return +item.id === +id;
    })[0];

    var elementKeys = Object.keys(selected);
    var selArr =[];

    elementKeys.forEach(key=>{
          selArr.push(`${key}: ${selected[key]} `);
        })

    console.log(selArr);

      this.setState({elementFull:selArr, verify: true});
    } else {
      let stringArr = this.props.options.allTours[id].map(obj=>JSON.stringify(obj));
      this.setState({elementFull:stringArr, verify: true});
      console.log({elementFull:stringArr, verify: true});
    }

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

      if (this.state.type !== 'tour'){
        elementKeys = Object.keys(choiceObj[0]);

        choiceObj = choiceObj.map(item=>{
        var itemString='';
          elementKeys.forEach(key=>{
            itemString = itemString.concat(`${key}: ${item[key]}, `);
          })
           return {id:item.id, string:itemString};
        })
      } else if (this.state.type === 'tour' && choiceObj !== {} ){
        elementKeys = Object.keys(choiceObj);
        var elementKeys2 = Object.keys(choiceObj['1'][0]);

        var finalArr = elementKeys.map(key=>{
          var itemString='';
          choiceObj[key].forEach(elem=>{

            elementKeys2.forEach(spec=>{
              itemString = itemString.concat(`${spec}: ${elem[spec]}, `);
            })
            itemString +=' ; ';
          })
          return {id:key, string:itemString}
        })
        finalArr.unshift({id:null, string:'select a tour'});
        console.log(finalArr);
      }
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

          {this.state.typeSelected && this.state.type !== 'tour' &&
              <div>
              <br/>
                <p>Choose one {this.state.type} in the following drop-down</p>
            <form>
              <label className='underline' >Select for deletion: </label>
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
          {this.state.typeSelected && this.state.type === 'tour' && this.props.options.allTours !== {} &&
              <div>
              <br/>
                <p>Choose one {this.state.type} in the following drop-down</p>
            <form>
              <label className='underline' >Select for deletion: </label>
                  <select onChange={e=>this.updateOptions(e)} id="delObj" style={{width:'80%'}} >
                  {finalArr &&
                    finalArr.map((item, i)=>{
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
          {this.state.verify && this.state.type !== 'tour' &&
            <div>
              <h4 className="BornholmSandvig">Verify Before Deletion</h4>
              <p> either accept (below) or correct & review again</p>
                <div className="editOps">
                <ul>
                {this.state.elementFull &&
                  this.state.elementFull.map(item=><li><em>{item.split(':')[0]}</em>: {item.split(':')[1]}</li>)
                }
                </ul>
                <p>You must click below to save edits to database</p>
                <button className="btn btn-default" onClick={e=>this.save(e)}>Delete</button> or <button className="btn btn-default" onClick={e=> this.reset(e)}>Reset</button>
                <p>form automatically clears on successful delete</p>

                </div>
            </div>
            }
            {this.state.verify && this.state.type === 'tour' && this.props.options.allTours !== {} &&
            <div>
              <h4 className="BornholmSandvig">Verify Before Deletion</h4>
              <p> either accept (below) or correct & review again</p>
                <div className="editOps">
                The tour includes:
                {this.state.elementFull &&
                  this.state.elementFull.map(item=><p>{item}</p>)
                }
                <p>You must click below to save edits to database</p>
                <button className="btn btn-default" onClick={e=>this.save(e)}>Delete</button> or <button className="btn btn-default" onClick={e=> this.reset(e)}>Reset</button>
                <p><br/>form automatically clears on successful delete</p>

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
    deleteSite: (id) => {
      dispatch(deleteSite(id));
    },
    deleteDetail: (id) => {
      dispatch(deleteDetail(id));
    },
    deleteNarrative: (id) => {
      dispatch(deleteNarrative(id));
    },
    deleteImages: (id) => {
      dispatch(deleteImages(id));
    },
    deleteBiblio: (id) => {
      dispatch(deleteBiblio(id));
    },
    deleteTour: (id) => {
      console.log('got here in delete tour');
      dispatch(deleteTour(id));
    },

    editNarrative: (editObj, id) => {
      dispatch(editNarrative(editObj, id));
    },
  }
}


//import {deleteSite, deleteDetail, deleteNarrative, deleteImages, deleteBiblio,  resetSaved, addBibliography, loadSites, reloadDetails, reloadNarratives, reloadImages, reloadBiblio,  } from '../action-creators/siteActions.js';

//import {getAllToursThemes} from '../action-creators/optionActions.js';

const Forxselete = connect(mapStateToProps, mapDispatchToProps)(Forxs);

export default Forxselete;
