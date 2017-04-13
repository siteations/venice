import React, {Component} from 'react';
import Header from './Header.js';
import MapBar from './MapBar.js';
//connect later?

class Frame extends Component {
	constructor(props){
		super(props);
		this.state= {
			full: true,
			side: false,
			intro: false,
			geo: false,
			button: 'navigate'
		};
		this.hoverName=this.hoverName.bind(this);
		this.nav=this.nav.bind(this);
	}

	hoverName(e){
		e.preventDefault();
		let val=e.target.attributes.value.value;
		this.setState({button: val});
	}

	nav(e){
		e.preventDefault();
		this.setState({button: 'navigate'});
	}


	render(){
		//full for conditional rendering of side panel

		return (
		        <div>
			        <Header />
			        <div className="row ">
			        {this.state.full &&
			        	<div className="flex between">
				        	<div className="mFull">
				        		map goes here
				        	</div>
				        	<MapBar text={this.state.button} hover={this.hoverName} out={this.nav} click={this.hoverName}/>
			        	</div>
			        }
			        </div>
			    </div>
		        )
	}
}

export default Frame;
