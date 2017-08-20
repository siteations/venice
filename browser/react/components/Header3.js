import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';


const styles = {
  chip: {
    margin: 2,

  },
};
//connect later?

class Header3 extends Component {
    constructor(props){
    super(props);
    this.state={
      y:0,
    };
  }

  render(){

  return (
	        <div className="row flex bottom header">
                        <div className="col-xs-8">
                                <h2 className="closerT"><span className="BornholmSandvig">Merlo's Map </span><span className="small texta" style={{color: '#352c1a'}}> The Religious Geography of Venice</span></h2>
                        </div>
                        <div className="col-xs-4">
                        </div>
	        	{/*<div className="col-lg-1">
        			<h4 className="BornholmSandvig closerT text-right ">Layers:</h4>
        			<p className="closerB text-right"> </p>
        		</div>*/}
	        </div>
	        )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sites: state.sites,
    options: state.options,
    map: state.map,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  }
}

const Header3a = connect(mapStateToProps, mapDispatchToProps)(Header3);

export default Header3a;
