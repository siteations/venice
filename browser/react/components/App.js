import React, { Component } from 'react';
//import Immutable from 'immutable';
import {connect} from 'react-redux';
import Frame from './FrontFrame.js';

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
				<div className="container-fluid ">
					<Frame />
				</div>
		)
	}
}

//export default connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
