import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import { setPanelSizing } from '../action-creators/panelActions.js';

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
  	let obj;
  	(this.props.panel.narrObj)? obj=this.props.panel.narrObj : obj={};
  	//console.log(this.props.panel.panelSize, this.props.panel.panelRatio);

  	return (
  	     <div className={this.props.baseClass} ref="sizeP" id="panelWin" onAnimationEnd = {e=> this.refSize(e)} style={{height:`${this.props.map.windowSize[1]}px`}}>
				    <h2 className="BornholmSandvig" >{this.props.panel.title}</h2>
				    <h4>{this.props.panel.subtitle}</h4>
				    <br/>
				    <h3 className="BornholmSandvig">{obj.title}</h3>
				    <div>
				    	<img src={obj.src} style={{width:`${this.props.panel.imageWidth}px`}}/>
				    </div>
				    <h5><span className="Trenda-Bold">Image: </span>{obj.caption}</h5>
				    <br/>
				    <p>{obj.text}</p>
				    <br/>
				    <p><span className="Trenda-Bold">Catalog Links: </span>{obj.catalog}</p>
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
