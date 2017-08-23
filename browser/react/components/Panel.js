import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import Imagetrey from './ImageSlider.js';

import { setPanelSizing } from '../action-creators/panelActions.js';
import {imageSeries} from '../non-db/cirTest.js';

import { Intro, Credits, Biblio, About } from './Intro.js';

class PanelBase extends Component {
	constructor(props) {
        super(props);
        this.state = {
          site: this.props.sites.currSite,
          size: [430,703],
        }
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
    this.setState({size:[width, height]});
  }

  refImages(img){
  	let count = img.split(', ');
  }

  render(){
  	var obj, image;
    var other = true;
    if (this.props.sites.currSite === '0'){other=false};
  	(this.props.panel.narrObj)? obj=this.props.panel.narrObj : obj={};

    let images = this.props.sites.genImages.filter(images => +images.narrativeId === +obj.id);
    let biblio = this.props.sites.genBiblio.filter(bib => +bib.narrativeId === +obj.id);

    console.log(obj.type);

  	return (
  	     <div className={this.props.baseClass} ref="sizeP" id="panelWin" onAnimationEnd={e=> this.refSize(e)} style={{height:`${(this.props.sites.specLayer!=='prints')? this.props.map.windowSize[1]+6: this.props.map.windowSize[1]-40}px` }}>
				    <h3 className="BornholmSandvig" >{(this.props.panel.title && other)? this.props.panel.title : 'Introduction, Biblio, or Credits'}</h3>
				    <h5>{(this.props.panel.subtitle && other)? this.props.panel.subtitle : 'Secondary Elements'}</h5>
				    <h4 className="BornholmSandvig">{obj.title}</h4>
              {images.length > 0 &&
                <Imagetrey image={images} onAnimationEnd={e=> this.refSize(e)} width={this.state.size[0]} height={(this.props.map.windowSize[1]+6)*0.65} />
              }
              <p>
            {obj.text && typeof(obj.text)!=='object' && obj.type !== 'credits' && obj.type !== 'biblio' && obj.type !== 'intro' &&
              obj.text.split('/').map((item,i) =>{
                if (i%2===0){
                  return <span>{item}</span>
                } else {
                  return <span><em>{item}</em></span>
                }
              })
            }
            {obj.text && typeof(obj.text)==='object' && obj.type !== 'credits' && obj.type !== 'biblio' && obj.type !== 'intro' &&
              obj.text.map(lines=>{
                return <p>{lines}</p>
              })
            }</p>
				    <br/>
            <br/>
            {obj.researcherName &&
              <p><span className="Trenda-Bold"></span> {obj.researcherName}, {obj.researcherAffiliation}.</p>
            }
            {obj.type === 'intro' &&
              <Intro obj={obj} />
            }
            {obj.type === 'biblio' &&
              <Biblio obj={obj} />
            }
            {obj.type === 'credits' &&
              <div>
                <Credits obj={obj} />
              </div>
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
