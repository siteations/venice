import React, { Component } from 'react';
//import Immutable from 'immutable';
import {connect} from 'react-redux';
import {deepOrange400, deepOrange600, deepOrange800, deepOrange900, brown800, blueGrey800, grey600, grey300, grey900, darkBlack, white, fullBlack} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import Footer from './Footer.js';
import Nav from './Nav.js';
import Header3 from './Header3.js';



const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#352c1a',
    primary2Color: grey900,
    primary3Color: '#d8d0ba',
    accent1Color:'#d8d0ba',
    accent2Color:'#f4f2ec',
    accent3Color:'#d8d0ba',
  },
});


class Alternate extends Component {
	constructor(props){
		super(props);
		this.state= {}
		this.localAction=this.localAction.bind(this);
	}

	localAction (e){
		let thing = e.target.attributes.value.value;
		this.props.setThing(thing);
	}


	render(){

		console.log('app props', this.props.location.pathname);

		return (
		    <MuiThemeProvider muiTheme={muiTheme} >
				<div className="container-fluid ">
					<div>
		        <Nav />
			      <Header3 />
			      <div className="row">
			        <div id="container">
			        <h4 className="text-center" style={{margin: '20px'}}>Given the rich detail of Merlo's map, this application has been optimized for screens of resolution 1024px wide or larger <br/>(laptop or desktop viewing is recommended).</h4>
			        <p style={{margin: '20px 100px'}}>
			        To view, either:
			        <ul>
			        <li>rotate your device into landscape, or </li>
			        <li>use 'cxs -' (mac) or 'cntl -' (pc) to reduce your browser scaling to 90% or 80% <br/>(adjusting the browser's inner width), or </li>
			        <li>visit again on a full scale desktop or laptop screen (> 1024px wide).</li>
			        </ul>
			        Then reload the page to detect altered resolution and explore Merlo's Map.
			        </p>
			        </div>

			      </div>
			      <div style={{position:'absolute', bottom: '0px', width: '95.825vw'}}>
			      	<Footer />
			      </div>
			    </div>

				</div>
				</MuiThemeProvider>
		)
	}
}

//export default connect(mapStateToProps, mapDispatchToProps)(App);

export default Alternate;
