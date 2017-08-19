import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';


import { setPanelSizing } from '../action-creators/panelActions.js';

class PanelMap extends Component {
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

    let obj = this.props.map.mapSite;
    var height = this.props.map.windowSize[1]*.21;
    if (this.props.size==='full') { height = this.props.map.windowSize[1]*.905};

  	return (
  	     <div className="pad10" style={{overflowY:'scroll', overflowX:'hidden', height: `${height}px`}}>
          <div className="row ">
            <div className="col-md-3">
				    <h5 className="BornholmSandvig pad10">
              {obj.author}, {obj.date}
              </h5>
            </div>
            <div className="col-md-9">
              <h5 className="small">
                <span className="Trenda-Bold">Image: </span>
                <span> {obj.author}. <em>{obj.title}</em>. </span>
                <span className=""> {obj.date}. {obj.publisher}. </span>
              </h5>
              <h5 className="small"><span className="Trenda-Bold">View Online: </span><a href={obj.cat} target="_blank" style={{fontWeight: 'normal'}}>Newberry Catalog</a></h5>
            </div>
          </div>
          {obj.id>2 &&
            <div className="row">
              <div className="col-md-3 center-block text-center">
                <div className="bIcon text-center inlineBlock" ><img src={obj.src} style={{borderRadius: '5px'}}/></div>
              </div>
              <div className="col-md-9">
    				    <p>{obj.narrative &&
                    obj.narrative.split('/').map((text,i) =>{
                      if (i%2===0){
                        return <span>{text}</span>
                      } else {
                        return <span><em>{text}</em></span>
                      }

                    })
                }</p>
    				    <br/>
              </div>
            </div>
          }
          {obj.id<3 &&
              obj.narrative.map((item, i)=>{
                return (
             <div className="row">
              <div className="col-md-3 center-block text-center">
                <div className="bIcon text-center inlineBlock" ><img src={obj.src[i]} style={{borderRadius: '5px'}}/></div>
              </div>
              <div className="col-md-9">
                <p>{item}</p>
                <br/>
              </div>
            </div>
              )
            })
          }
          {/*obj.id<3 &&
            <div className="row">
              <div className="col-md-9 col-md-offset-3">
              <h5>
                <span className="Trenda-Bold">Image: </span>
                <span> {obj.author}. <em>{obj.title}</em>. </span>
                <span className=""> {obj.date}. {obj.publisher}. </span>
              </h5>
              <h5><span className="Trenda-Bold">View Online: </span><a href={obj.src} target="_blank" style={{fontWeight: 'normal'}}>Newberry Catalog Link</a></h5>
              </div>
            </div>
          */}


            <div className="row">
              <div className="col-md-9 col-md-offset-3">
                <p><span className="Trenda-Bold">Narrative Credits: </span> James R. Akerman, Newberry Library.
                </p>
              </div>
            </div>

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

const MapDescriptions = connect(mapStateToProps, mapDispatchToProps)(PanelMap);

export default MapDescriptions;
