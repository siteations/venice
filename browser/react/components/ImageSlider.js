import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

class Image extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	active : 0,
        	widthOriginal: props.panel.imageWidth,
        	widthImg: props.width,
        	heightImg: props.height,
        }
  }

  getSize(e){
  	e.preventDefault();
  	var relH = e.target.attributes.src.ownerElement.clientHeight;
  	var relW = e.target.attributes.src.ownerElement.clientWidth;
  	var heightImg = this.props.panel.panelSize[1]*.75;
  	var widthImg = this.props.panel.panelSize[0]*.9;
  	this.setState({widthImg: widthImg});
  	var newH = widthImg/relW*relH;

  	if (newH>heightImg) { //in case too tall
  		var ratioDiff = heightImg/newH;
  		var newWidth = ratioDiff*widthImg;
  		this.setState({widthImg: newWidth});
  	}

  }

  switchImg(e){
    e.preventDefault();
  	let ind = +this.state.active;
  	let index = +e.target.id.split(' ')[1];

  		this.setState({active: index});
  }

	render() {

		var img = this.props.image[this.state.active];
    var imgId = (img!==undefined)? img.id : this.props.image[0].id;
    if (img===undefined){this.setState({active: 0});};
		let biblio = this.props.sites.genBiblio.filter(bib => +bib.imageId === +imgId);

	return (
		<div>
			<div className="text-center">
				<img src={this.props.image[this.state.active].src} style={{width:`${this.state.widthImg}px`}} onLoad={e=>this.getSize(e)} onChange={e=>this.getSize(e)}/>
			</div>
			<div className="row m10">
				<div className="col-xs-8 col-xs-offset-2 text-center">
					{this.props.image.length > 1 &&
						this.props.image.map((image, i)=>{
							if(i===this.state.active){
								return <span id={`slider ${i}`} className="fa fa-circle pad10" value="i" onTouchTap={e=>this.switchImg(e)} onClick={e=>this.switchImg(e)}></span>
							} else {
								return <span id={`slider ${i}`} className="fa fa-circle-o pad10" value="i" onTouchTap={e=>this.switchImg(e)} onClick={e=>this.switchImg(e)}></span>
							}
						})
					}
				</div>
			</div>
			<h5><span className="Trenda-Bold">Image: </span>
          { this.props.image[this.state.active].bibliography &&
            this.props.image[this.state.active].bibliography.split('/').map((text,i) =>{
                                  if (i%2===0){
                                    return <span>{text}</span>
                                  } else {
                                    return <span><em>{text}</em></span>
                                  }
                                })

          }
      </h5>
      <h5><span className="Trenda-Bold">View Online: </span>
                        <a href={this.props.image[this.state.active].link} className="bNav"  target="_blank" style={{fontWeight: 'normal'}}>Newberry Catalog</a><br/><br/>
                       </h5>
		</div>
		);
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


const Imagetrey = connect(mapStateToProps, null)(Image);

export default Imagetrey;
