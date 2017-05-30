import React, { Component } from 'react';

class Imagetrey extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	active : 0,
        	widthOriginal: props.width,
        	width: props.width,
        	height: props.height,
        }
  }

  getSize(e){
  	e.preventDefault();
  	let relH = e.target.attributes.src.ownerElement.clientHeight;
  	if (relH>this.state.height) {
  		let ratioDiff = this.state.height/relH;
  		let newWidth = ratioDiff*this.state.widthOriginal;
  		this.setState({width: newWidth});
  	} else {
  		this.setState({width: this.state.widthOriginal});
  	}

  }

	render() {

	return (
		<div>
			<div className="text-center">
				<img src={this.props.image[this.state.active].src} style={{width:`${this.state.width}px`}} onLoad={e=>this.getSize(e)} onChange={e=>this.getSize(e)}/>
			</div>
			<div className="row m10">
				<div className="col-xs-4 col-xs-offset-4 text-center">
					{this.props.image.length > 1 &&
						this.props.image.map((image, i)=>{
							if(i===this.state.active){
								return <span id={`slider ${i}`} className="fa fa-circle pad10" value="i" onClick=""></span>
							} else {
								return <span id={`slider ${i}`} className="fa fa-circle-o pad10" value="i" onClick=""></span>
							}
						})
					}
				</div>
			</div>
			<h5><span className="Trenda-Bold">Image: </span>{this.props.image[this.state.active].caption}</h5>
		</div>
		);
	}
}

export default Imagetrey;
