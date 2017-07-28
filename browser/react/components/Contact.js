import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import { centerRescaled, tiling, scaleOps, sitesFiltered } from '../plug-ins/rawTiles.js';
import {updateSite} from '../action-creators/siteActions.js';
import {  setTitlesCore, setTitle, setNarr } from '../action-creators/panelActions.js';
import { togglePlay, updatePanelSmall } from '../action-creators/optionActions.js';
import {updateZoom, updateTile, updateOffsets, updateCenter, updateCenterScreen, updateWindow, updateWindowOffsets, updateOffsetsResidual, updatePanelOffset} from '../action-creators/mapActions.js';

import Tour from './Tour.js';

//connect later to store;


const Contact = (props)=>{

	return (

          <footer id="footer" className="region region-footer" >
          {/*
          <div id="block-menu-block-2" className="block-block address last even" role="navigation">
            <div className="inner">


            <div className="content">
              <div className="menu-block-wrapper menu-block-2 menu-name-menu-footer-menu parent-mlid-0 menu-level-1">
                <ul className="menu"><li className="menu__item is-leaf first leaf menu-mlid-431"><a href="https://www.newberry.org/contact-us" className="menu__link">Contact Us</a></li>
                  <li className="menu__item is-leaf leaf menu-mlid-433"><a href="https://www.newberry.org/copyright" className="menu__link">Copyright</a></li>
                  <li className="menu__item is-leaf leaf menu-mlid-434"><a href="https://www.newberry.org/privacy" className="menu__link">Privacy</a></li>
                  <li className="menu__item is-leaf last leaf menu-mlid-435"><a href="https://www.newberry.org/site-credits" className="menu__link">Site Credits</a></li>
              </ul>
                </div>
              </div>
            </div>
        </div>
        */}
        <div id="block-block-62" className="block block-block address last even" style={{marginTop:'1em'}} >
            <div className="inner">
              <div className="content">
                <ul>
                    <li>The Newberry</li>
                    <li>60 West Walton Street</li>
                    <li>Chicago, Illinois 60610</li>
                    <li>(312) 943-9090</li>
                </ul>
              </div>
            </div>
        </div>
        </footer>
	        )
}


export default Contact;
