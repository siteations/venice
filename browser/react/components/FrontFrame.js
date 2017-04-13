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
		//this.state.action=this.state.action.bind(this);
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
				        	<MapBar text={this.state.button} />
			        	</div>
			        }
			        </div>
			    </div>
		        )
	}
}

export default Frame;
