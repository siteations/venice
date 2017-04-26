'use strict';


// @flow
import * as mask from '../plug-ins/leaflet-tilelayer-mask.js';
import { tileLayer } from 'leaflet';
import PropTypes from 'prop-types';

import { GridLayer, childrenType }  from 'react-leaflet';

const TonerTiles = '../../../layouts/color/{z}/map_{x}_{y}.jpg';


export default class TileMask extends GridLayer {
    constructor(props) {
        super(props);
        this.children = childrenType;
        this.opacity = PropTypes.number;
  	}

  // static propTypes {
  //   children: childrenType,
  //   opacity: PropTypes.number,
  //   url: PropTypes.string.isRequired,
  //   zIndex: PropTypes.number,
  // };

  createLeafletElement(props: Object) {
    const { url, options } = props;
    let tiles = tileLayer(url, this.getOptions(options));
    tiles.mask = mask(TonerTiles, {
				  maskUrl : 'star.png',
				  maskSize : 1024,
				  });
    return tiles;
  }

  updateLeafletElement(fromProps: Object, toProps: Object) {
    super.updateLeafletElement(fromProps, toProps);
    if (toProps.url !== fromProps.url) {
      this.leafletElement.setUrl(toProps.url);
    }
  }
}
