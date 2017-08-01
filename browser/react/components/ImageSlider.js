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
			<h5><span className="Trenda-Bold">Image: </span>{this.props.image[this.state.active].caption}.

			{biblio.length>0 &&
						<span className="small"> {biblio[0].author} <a href={biblio[0].link}><em>{biblio[0].title}</em></a> {biblio[0].published} {biblio[0].physical} {biblio[0].page}</span>
			}
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
