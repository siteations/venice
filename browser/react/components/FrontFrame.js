import React, {Component} from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import MapBar from './MapBar.js';
//import Maptest from './Map.js';
import Mapd3 from './Mapd3.js';
//import Panel from './Panel.js';
//connect later?

class Frame extends Component {
	constructor(props){
		super(props);
		this.state= {
			start: true,
			full: false,
			panel: false,
			panelLarge : false,
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
		if (val==='panel' && (this.state.start===true || this.state.full===true)){
			this.setState({full: false});
			this.setState({panel: true});
			this.setState({panelLarge: false});
			this.setState({start: false});
		} else if (val==='panel' && this.state.panel===true){
			this.setState({full: true});
			this.setState({panelLarge: false});
			this.setState({panel: false});
			this.setState({start: false});
		}

		if (val==='panel large' && (this.state.start===true || this.state.full===true || this.state.panel=== true)){
			this.setState({full: false});
			this.setState({panel: false });
			this.setState({panelLarge: true});
			this.setState({start: false});
		} else if (val==='panel large' && this.state.panelLarge===true){
			this.setState({full: true});
			this.setState({panelLarge: false});
			this.setState({panel: false});
			this.setState({start: false});
		}
	}


	render(){
		//full for conditional rendering of side panel

		return (
		        <div>
			        <Header />
			        <div className="row">
			        <div id="container">
			        </div>
			        {this.state.start &&
			        	<div className="flex between">
				        	<Mapd3 />
				        	<MapBar text={this.state.button} hover={this.hoverName} out={this.nav} click={this.selectName} open={false}/>
				        	<div className="panelClose">
				        	</div>
			        	</div>
			        }
			        {this.state.full &&
			        	<div className="flex between">
				        	<div className="mFull mainMaps">
				        		<Maptest />
				        	</div>
				        	<MapBar text={this.state.button} hover={this.hoverName} out={this.nav} click={this.selectName} open={false}/>
				        	<div className="panelClose">
				        	</div>
			        	</div>
			        }

			        {this.state.panel &&
			        	<div className="flex between">
				        	<div className="mPart mainMaps">
				        		<Maptest />
				        	</div>
				        	<MapBar text={this.state.button} hover={this.hoverName} out={this.nav} click={this.selectName} open={true}/>
				        	<div className="panelOpen">
				        		panel here
				        	</div>
			        	</div>
			        }
			        {this.state.panelLarge &&
			        	<div className="flex between">
				        	<div className="mQuarter mainMaps">
				        		<Maptest />
				        	</div>
				        	<MapBar text={this.state.button} hover={this.hoverName} out={this.nav} click={this.selectName} large={true}/>
				        	<div className="panelLarge">
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
