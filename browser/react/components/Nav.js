import React, { Component } from 'react';


class Nav extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	home: 1,
    	intro: 1,
    };
    this.handleChangeNewberry=this.handleChangeNewberry.bind(this);
    this.handleChangeReligious=this.handleChangeReligious.bind(this);
  }

  handleChangeNewberry(event, index, value){ this.setState({home:value})};
  handleChangeReligious(event, index, value){this.setState({intro:value})};


  render() {
    //console.log(this.props.location);
    //minimal approximation of newberry header - no jquery or additional css

	return (
	     <div className="navbarG navbar-fixed-top bshadowed hidden-print">
          <div className="row">
            <div className="col-xs-1">
            </div>
            <div className="col-md-1 hidden-xs hidden-sm" style={{maxWwidth: '768px', wordWrap: 'break-word'}}><span className="" style={{verticalAlign: 'baseline'}}>   <a href="https://www.newberry.org" target="_blank" style={{color: '#ffffff'}} ><img src="./newberry_logo_dark_small.png" style={{height:'40px', margin: '.5vh', float: 'right'}} /></a></span>
            </div>
            <div className="col-sm-5 col-xs-11"><a id="" href="" className="navbar-link text-uppercase" style={{color: '#ffffff', fontFamily: 'Lato', verticalAlign: 'baseline', lineHeight:'3em', letterSpacing: '1px' }}>Religious Life in Venice<span style={{textTransform: 'capitalize', fontFamily: 'texta', fontWeight: 'normal'}}></span></a>
            </div>
            <div className="" style={{backgroundColor: '#ae3a3e', float: 'right'}}><a href="https://www.newberry.org/religious-change&#10;" target="_blank"><img className="img-responsive hidden-xs hidden-sm" src="http://publications.newberry.org/dig/rcp/media/religious-change-new-header-5-12.jpg&#10;" /></a>
            </div>
          </div>
	      </div>
	        )
	}
};

export default Nav;
