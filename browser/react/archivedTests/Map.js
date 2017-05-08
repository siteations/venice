import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, TileLayer, ImageOverlay } from 'react-leaflet';
import  TileMask from './MapMask';
//import * as Mask from '../plug-ins/leaflet-tilelayer-mask.js';
import Control from 'react-leaflet-control';
import Leaflet from 'leaflet';

const TonerTiles = '../../../layouts/color/{z}/map_{x}_{y}.jpg';
const GreyTiles = '../../../layouts/grey/{z}/map_{x}_{y}.jpg';
const Attr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [-85,160];
const zoomLevel = 3;
const minZoom = 2;
const maxZoom = 6;

const contain = { // to match css for map container
    height: 1024,
    width: 2048,
}

//currently window is 10% of total map size, so points are based on that conversion -85 = 850 pixels from upper left, 160 = 1600 pixels from left
//bounds set in css 16384 to 1638.4
const convertXY = ([x,y],)=> { //pt on illustrator into local lat/long

}



export default class Maptest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentZoomLevel: zoomLevel,
            currentCenter: mapCenter,
            initialWidth: 0,
            initialHeight: 0,
            partWidth: 0,
            quarterWidth:0,
            greyOp: 1,
            colorOp: 1,

        };

    }

    componentDidMount() {
        window.addEventListener("resize", this.refSize);
        this.refSize();

        const leafletMap = this.leafletMap.leafletElement;
        window.console.log('map props ', leafletMap);
        leafletMap.on('zoomend', () => {
            const updatedZoomLevel = leafletMap.getZoom();
            this.handleZoomLevelChange(updatedZoomLevel);
        });
        leafletMap.on('moveend', () => {
            const updatedCenter = leafletMap.getCenter();
            this.handleCenterChange(updatedCenter);
        });

//         var fg = L.tileLayer.mask('http://www.finds.jp/ws/tmc/1.0.0/Kanto_Rapid-900913-L/{z}/{x}/{y}.png', {
//   maskUrl : 'star.png', // optional
//   maskSize : 1024  //optional
// ).addTo(map);
    }

    //local functions - attached to map on mounting

    refSize(){
        let sele = window.document.getElementById("mapWin");
        let width = sele.attributes[0].ownerElement.clientWidth;
        let height = sele.attributes[0].ownerElement.clientHeight;
        this.setState({ initialWidth: width, initialHeight: height, partWidth: Math.floor(width*0.7388), quarterWidth: Math.floor(width*0.4222) });
    }

    handleZoomLevelChange(newZoomLevel) {
        this.setState({ currentZoomLevel: newZoomLevel });
    }

    handleCenterChange(newCenter){
        this.setState({ currentCenter: newCenter });
    }

    //bound functions for customized functions

    // handleUpPanClick() {
    //     const leafletMap = this.leafletMap.leafletElement;
    //     leafletMap.panBy([0, -100]);
    //     window.console.log('Panning up');
    // }

    // handleRightPanClick() {
    //     const leafletMap = this.leafletMap.leafletElement;
    //     leafletMap.panBy([100, 0]);
    //     window.console.log('Panning right');
    // }

    // handleLeftPanClick() {
    //     const leafletMap = this.leafletMap.leafletElement;
    //     leafletMap.panBy([-100, 0]);
    //     window.console.log('Panning left');
    // }

    // handleDownPanClick() {
    //     const leafletMap = this.leafletMap.leafletElement;
    //     leafletMap.panBy([0, 100]);
    //     window.console.log('Panning down');
    // }

    render() {
        window.console.log('this.state ->', this.state);

        return (
            <div className="offset" ref="size" id="mapWin">
            <div>
                <Map
                    crs={ Leaflet.CRS.Simple }
                    ref={m => { this.leafletMap = m; }}
                    center={mapCenter}
                    zoom={zoomLevel}
                    minZoom={minZoom}
                    maxZoom={maxZoom}
                >
                    <TileLayer
                        id="underlay"
                        attribution={Attr}
                        url={GreyTiles}
                        opacity={this.state.greyOp}
                    />
                    <TileLayer
                        id="underlay"
                        attribution={Attr}
                        url={TonerTiles}
                        opacity={this.state.colorOp}
                        bounds={[]}
                    />
                    <TileMask url={TonerTiles} size={25} center={[-50,50]}/>
                    {/*<Control position="topright">
                        <div
                            style={{
                                backgroundColor: 'black',
                                padding: '5px',
                            }}
                        >
                            <div style={{ marginLeft: '37px' }}>
                                <button onClick={this.handleUpPanClick}>
                                    Pan up
                                </button>
                            </div>
                            <div>
                                <button onClick={this.handleLeftPanClick}>
                                    Pan left
                                </button>
                                <button onClick={this.handleRightPanClick}>
                                    Pan right
                                </button>
                            </div>
                            <div style={{ marginLeft: '30px' }}>
                                <button onClick={this.handleDownPanClick}>
                                    Pan down
                                </button>
                            </div>
                        </div>
                    </Control>*/}
                </Map>
            </div>
            </div>
        );
    }
}


