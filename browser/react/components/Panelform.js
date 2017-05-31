import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import Imagetrey from './ImageSlider.js';

import { setPanelSizing } from '../action-creators/panelActions.js';
import { imageSeries } from '../pre-db/cirTest.js';

class PanelEdit extends Component {
	constructor(props) {
        super(props);
        this.state = {

        }
  }




  render(){
  	let obj, image;
  	(this.props.panel.narrObj)? obj=this.props.panel.narrObj : obj={};
    (obj.imageSeries) ? image = this.props.sites.genImages.filter(images => +images.imageSeries === +obj.imageSeries) : image = [] ;
  	console.log(image);

  	return (
  	     <div className={this.props.baseClass} ref="sizeP" id="panelWin" onAnimationEnd = {e=> this.refSize(e)} style={{height:`${this.props.map.windowSize[1]+6}px`}}>
            <p> click on map to select site;<br/> add/edit its' narratives, captions, and other text below</p>
				    <h2 className="BornholmSandvig" >Site Type: {this.props.panel.title}</h2>
				    <h4>Site Name: {this.props.panel.subtitle}</h4>
				    <br/>
				    <h3 className="BornholmSandvig">Descriptive Title:{obj.title}</h3>
              {image.length > 0 &&
                <Imagetrey image={image} onAnimationEnd = {e=> this.refSize(e)} width={this.props.panel.imageWidth} height={(this.props.map.windowSize[1]+6)*0.65} />
              }
				    <br/>
				    <p>Core Text (50-90 words): {obj.text} </p>
				    <br/>
            <p>Catalog Source (Chicago Style Citation): </p>
				    <p>Catalog Link (at Newberry): </p>
            <p>Bibliography for Description (Chicago Style Citations): </p>
            <p>Text Credits (Name, Title, Affiliation): </p>
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

const PanelForm = connect(mapStateToProps, mapDispatchToProps)(PanelEdit);

export default PanelForm;
