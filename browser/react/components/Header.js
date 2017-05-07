import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Chip from 'material-ui/Chip';


const styles = {
  chip: {
    margin: 2,

  },
};
//connect later?

const Header = ((props) => {

	return (
	        <div className="row flex bottom header">
                        <div className="col-lg-1 flex">
                                <img className='logo' src="/img/the-newberry-small.png" />
                                <IconMenu
                                      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                      targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                    >
                                      <MenuItem primaryText="things" />
                                      <MenuItem primaryText="go here" />
                                      <MenuItem primaryText="for menu" />
                              </IconMenu>
                        </div>
                        <div className="col-lg-4 bottom">
                                <h1 className="BornholmSandvig closerT">Religious Life In Venice</h1>
                                <h5  className="closerB ">subtitle, dates, context</h5>
                        </div>
	        	<div className="col-lg-3">
        			<h4 className="BornholmSandvig closerT text-right "> {props.sites.hoverLayer}</h4>
        			<p className="closerB text-right">layer options for view</p>
        		</div>
                        <div className="col-lg-4">
                                <h5 className="BornholmSandvig closerT">{props.sites.currLayers.join(', ')}</h5>
                                <p className="closerB">layers active</p>
                        </div>
	        </div>
	        )
})

const mapStateToProps = (state, ownProps) => {
  return {
    sites: state.sites,
  }
}

const HeaderOptions = connect(mapStateToProps, null)(Header);

export default HeaderOptions;
