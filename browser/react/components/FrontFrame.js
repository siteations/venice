import React, {Component} from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import MapBar from './MapBar.js';
//connect later?

class Frame extends Component {
	constructor(props){
		super(props);
		this.state= {
			start: true,
			full: false,
			panel: false,
			intro: false,
			geo: false,
			button: 'navigate',
			select: false,
			selected: [],
		};
		this.hoverName=this.hoverName.bind(this);
		this.selectName=this.selectName.bind(this);
		this.nav=this.nav.bind(this);
	}

	hoverName(e){
		e.preventDefault();
		let val=e.target.attributes.value.value;
		this.setState({button: val});
	}

	nav(e){
		e.preventDefault();
		if (this.state.select===true && this.state.selected.length===1 ){
		this.setState({button: this.state.selected[0] });
		} else if (this.state.select===true && this.state.selected.length>1 ){
		this.setState({button: 'multiple'});
		}
		else if (this.state.select===false){
		this.setState({button: 'navigate'});
		}
	}

	selectName(e){ //rework local for all buttons to work with multiple selected
		e.preventDefault();
		let val=e.target.attributes.value.value;
		this.setState({button: val});
		let arr= this.state.selected;
		arr=arr.concat(val);
		this.setState({selected: arr});
		this.setState({select: true});

		//open and close sides
		if ((val==='panel' && this.state.start===true) ||(val==='panel' && this.state.full===true)){
			this.setState({full: false});
			this.setState({panel: true});
			this.setState({start: false});
		} else if (val==='panel' && this.state.full===false){
			this.setState({full: true});
			this.setState({panel: false});
			this.setState({start: false});
		}
	}


	render(){
		//full for conditional rendering of side panel

		return (
		        <div>
			        <Header />
			        <div className="row ">
			        {this.state.start &&
			        	<div className="flex between">
				        	<div className="mFullO">
				        		full map goes here
				        	</div>
				        	<MapBar text={this.state.button} hover={this.hoverName} out={this.nav} click={this.selectName} open={false}/>
				        	<div className="panelClose">
				        	</div>
			        	</div>
			        }
			        {this.state.full &&
			        	<div className="flex between">
				        	<div className="mFull">
				        		half map goes here
				        	</div>
				        	<MapBar text={this.state.button} hover={this.hoverName} out={this.nav} click={this.selectName} open={false}/>
				        	<div className="panelClose">
				        	</div>
			        	</div>
			        }

			        {this.state.panel &&
			        	<div className="flex between">
				        	<div className="mPart">
				        		half map goes here
				        	</div>
				        	<MapBar text={this.state.button} hover={this.hoverName} out={this.nav} click={this.selectName} open={true}/>
				        	<div className="panelOpen">
				        		panel here
				        	</div>
			        	</div>
			        }
			        </div>
			        <Footer />
			    </div>
		        )
	}
}

export default Frame;
