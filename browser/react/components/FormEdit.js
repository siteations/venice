import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import { resetSaved, addBibliography } from '../action-creators/siteActions.js';




class FormEd extends Component {
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
            <p> form to edit any database entry coming soon </p>
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
    // addBiblio: (biblioObj) => {
    //   dispatch(addBibliography(biblioObj));
    // },
    // editNarrative: (editObj, id) => {
    //   dispatch(editNarrative(editObj, id));
    // },
  }
}

const FormEdit = connect(mapStateToProps, mapDispatchToProps)(FormEd);

export default FormEdit;
