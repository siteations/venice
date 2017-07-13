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
  	var obj, image;
  	(this.props.panel.narrObj)? obj=this.props.panel.narrObj : obj={};

    let images = this.props.sites.genImages.filter(images => +images.narrativeId === +obj.id);
    let biblio = this.props.sites.genBiblio.filter(bib => +bib.narrativeId === +obj.id);
  	console.log(images, biblio, obj);

  	return (
  	     <div className={this.props.baseClass} ref="sizeP" id="panelWin" onAnimationEnd={e=> this.refSize(e)} style={{height:`${this.props.map.windowSize[1]+6}px`}}>
				    <h2 className="BornholmSandvig" >{(this.props.panel.title)? this.props.panel.title : 'Venice Title (Intro)'}</h2>
				    <h4>{(this.props.panel.subtitle)? this.props.panel.subtitle : 'Secondary Elements'}</h4>
				    <h3 className="BornholmSandvig">{(obj.title)? obj.title : 'intro remarks here'}</h3>
              {images.length > 0 &&
                <Imagetrey image={images} onAnimationEnd={e=> this.refSize(e)} width={this.props.panel.imageWidth} height={(this.props.map.windowSize[1]+6)*0.65} />
              }
				    <br/>
				    <p>{(obj.text)? obj.text : 'introductory paragraph, followed by interaction instructions (zoom, click, maps, etc.)'}</p>
				    <br/>
            {biblio.length > 0  &&
				    <p className="Trenda-Bold">Sources: </p>
            }
            <ul>
            {biblio.length > 0 &&
              biblio.map(bib=>{
                return <li>{bib.author} <a href={bib.link}><em>{bib.title}</em></a> {bib.published} {bib.physical} {bib.page}</li>
              })

            }
            </ul>
            <br/>
            {obj.researcherName &&
            <p><span className="Trenda-Bold">Narrative Credits: </span> {obj.researcherName}, {obj.researcherTitle}, {obj.researcherAffiliation}.</p>
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

const Panel = connect(mapStateToProps, mapDispatchToProps)(PanelBase);

export default Panel;
