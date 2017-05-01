import React, { Component } from 'react';
//import Immutable from 'immutable';
import {connect} from 'react-redux';
import Frame from './FrontFrame.js';
import {deepOrange400, deepOrange600, deepOrange800, deepOrange900, brown800, blueGrey800, grey600, grey300, grey900, darkBlack, white, fullBlack} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

//--------add actions here------------


//-----------add redux here------------

/*const mapStateToProps = (state =>{
	if immutable and extracting variables: Object.keys(state.get('boxes').toJS());
	return {
		thing: state.thing or for immutable state.get('thing'),
	}
})


const mapDispatchToProps = (dispatch) => {
	return {
		setThing(thing){
			dispatch(setThing(thing))
		},
	}
}
*/

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: grey600,
    primary2Color: grey900,
    primary3Color: grey300,
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

		return (
		    <MuiThemeProvider muiTheme={muiTheme} >
				<div className="container-fluid ">
					<Frame />
				</div>
				</MuiThemeProvider>
		)
	}
}

//export default connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
