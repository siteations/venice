import React, { Component } from 'react';
//import Immutable from 'immutable';
import {connect} from 'react-redux';
import Frame from './FrontFrame.js';
import FrameEdit from './FrameEdit.js';
import {deepOrange400, deepOrange600, deepOrange800, deepOrange900, brown800, blueGrey800, grey600, grey300, grey900, darkBlack, white, fullBlack} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();


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


class App extends Component {
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
				{this.props.location.pathname === '/Venice' &&
					<Frame />
				}
				{this.props.location.pathname === '/Venice-Edit' &&
					<FrameEdit />
				}
				</div>
				</MuiThemeProvider>
		)
	}
}

//export default connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
