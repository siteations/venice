import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import Imagetrey from './ImageSlider.js';

import { setPanelSizing } from '../action-creators/panelActions.js';
import {imageSeries} from '../pre-db/cirTest.js';

class PanelBase extends Component {
	constructor(props) {
        super(props);
        this.state = {}
  }

  componentDidMount() {
      window.addEventListener("resize", this.refSizeP);
      this.refSize();
  }

  refSize(e){
  	if (e){e.preventDefault();};
  	let sele = window.document.getElementById("panelWin").attributes[0].ownerElement;
  	let width = sele.clientWidth;
  	let height = sele.clientHeight;
  	this.props.updatePanelSize([width, height], width/height);
  }

  refImages(img){
  	let count = img.split(', ');
  }



  render(){
  	let obj, image;
  	(this.props.panel.narrObj)? obj=this.props.panel.narrObj : obj={};
    (obj.imageSeries) ? image = this.props.sites.genImages.filter(images => +images.imageSeries === +obj.imageSeries) : image = [] ;
  	console.log(image);

  	return (
  	     <div className={this.props.baseClass} ref="sizeP" id="panelWin" onAnimationEnd = {e=> this.refSize(e)} style={{height:`${this.props.map.windowSize[1]+6}px`}}>
				    <h2 className="BornholmSandvig" >{this.props.panel.title}</h2>
				    <h4>{this.props.panel.subtitle}</h4>
				    <br/>
				    <h3 className="BornholmSandvig">{obj.title}</h3>
              {image.length > 0 &&
                <Imagetrey image={image} onAnimationEnd = {e=> this.refSize(e)} width={this.props.panel.imageWidth} height={(this.props.map.windowSize[1]+6)*0.65} />
              }
				    <br/>
				    <p>{obj.text}</p>
				    <br/>
				    <p><span className="Trenda-Bold">Catalog Links: </span><a href={obj.catalogLink}>{obj.source}</a></p>
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

const Panel = connect(mapStateToProps, mapDispatchToProps)(PanelBase);

export default Panel;
