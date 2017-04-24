import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, TileLayer, ImageOverlay } from 'react-leaflet';
import Control from 'react-leaflet-control';
import Leaflet from 'leaflet';

const TonerTiles = '../../../layouts/color/{z}/map_{x}_{y}.jpg';
const GreyTiles = '../../../layouts/grey/{z}/map_{x}_{y}.jpg';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [-85,160];
const zoomLevel = 2;
const minZoom = 2;
const maxZoom = 6;

//currently window is 10% of total map size, so points are based on that conversion -85 = 850 pixels from upper left, 160 = 1600 pixels from left

//bounds set in css 16384 to 1638.4



export default class Maptest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentZoomLevel: zoomLevel,
            currentCenter: mapCenter,

        };

        // this.handleUpPanClick = this.handleUpPanClick.bind(this);
        // this.handleRightPanClick = this.handleRightPanClick.bind(this);
        // this.handleLeftPanClick = this.handleLeftPanClick.bind(this);
        // this.handleDownPanClick = this.handleDownPanClick.bind(this);
    }

    componentDidMount() {
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
    }

    handleZoomLevelChange(newZoomLevel) {
        this.setState({ currentZoomLevel: newZoomLevel });
    }

    handleCenterChange(newCenter){
        this.setState({ currentCenter: newCenter });
    }

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
            <div className="offset">
            <div>
                <Map
                    crs={ Leaflet.CRS.Simple }
                    ref={m => { this.leafletMap = m; }}
                    center={mapCenter}
                    zoom={zoomLevel}
                    minZoom={minZoom}
                    maxZoom={maxZoom}
                    layers =""
                >
                    <TileLayer
                        id="underlay"
                        attribution={stamenTonerAttr}
                        url={GreyTiles}
                        opacity='.5'
                    />
                    <TileLayer
                        id="color"
                        attribution={stamenTonerAttr}
                        url={TonerTiles}
                        opacity='1'
                    />
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


