import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Chip from 'material-ui/Chip';
import LayersList from './LayersList.js';


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
                                <a href=""><img className='logo' src="/img/the-newberry-small.png" /></a>
                                {/*<IconMenu
                                      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                      targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                    >
                                      <MenuItem primaryText="things" />
                                      <MenuItem primaryText="go here" />
                                      <MenuItem primaryText="for menu" />
                              </IconMenu>*/}
                        </div>
                        <div className="col-lg-4 bottom">
                                <h1 className="BornholmSandvig closerT">Merlo's Map</h1>
                                <h5  className="closerB "> The Religious Geography of Venice</h5>
                        </div>
	        	{/*<div className="col-lg-1">
        			<h4 className="BornholmSandvig closerT text-right ">Layers:</h4>
        			<p className="closerB text-right"> </p>
        		</div>*/}
                        <div className="col-lg-7">
                          <div className="row flex around" style={{marginBottom:'5px'}}>
                            <button className="btn btn-default ">Introduction</button>
                            <button className="btn btn-default ">Religious Practice, Situated</button>
                            <button className="btn btn-default ">Cartographic Context</button>
                            <button className="btn btn-default ">Bibliography</button>
                            <button className="btn btn-default ">About</button>
                            <button className="btn btn-default ">Religious Change</button>
                          </div>
                        <LayersList layers={props.sites.currLayers} type="span" />
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
