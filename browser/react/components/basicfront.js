import React from 'react';

const Frame = ((props) => {

	return (
	<div data-reactroot="" className="container full-height">
		<div>
			<div id="hamburger">

			</div>
		</div>
		<div className="row full-height">
			<div className="columns eight full-height">
				<header className="row u-full-width">
					<h1><span className="header-main">General Mock-up PreBootstrap</span><span className="header-sub">Redlining in New Deal America</span></h1>
					<h4 id="">Introduction</h4>
					<h4 id="bibliograph">Bibliographic Note &amp; Bibliography</h4>
					<h4 id="about">About</h4>
					<h4>Contact Us</h4>
				</header>
				<div className="row template-tile leaflet-container main-pane" >
					<div className="the_map leaflet-container leaflet-retina leaflet-fade-anim" id="map1" tabindex="0" >
						<button className="nationalView">
						</button>
						<div className="opacitySlider">
							<div className="rc-slider rc-slider-vertical">
								<div className="rc-slider-handle">
								</div>
								<div className="rc-slider-track">
								</div>
								<div className="rc-slider-step">
								</div>
								<div className="rc-slider-mark">
								</div>
							</div>
						</div>
					<div className="panorama legend">
						<ul>
							<li className="item selected" data-item="A &quot;Best&quot;"><span>A "Best"</span></li>
							<li className="item" data-item="B &quot;Still Desirable&quot;"><span>B "Still Desirable"</span></li>
							<li className="item" data-item="C &quot;Definitely Declining&quot;"><span>C "Definitely Declining"</span></li>
							<li className="item" data-item="D &quot;Hazardous&quot;"><span>D "Hazardous"</span></li>
						</ul>
					</div>
					<div className="leaflet-map-pane">
						<div className="leaflet-tile-pane">
							<div className="leaflet-layer">
								<div className="leaflet-tile-container">
								</div>
								<div className="leaflet-tile-container leaflet-zoom-animated">
									{/* <img className="leaflet-tile leaflet-tile-loaded" src="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/9/131/190@2x.png" style="height: 256px; width: 256px; left: 375px; top: 250px;"> */}
								</div>
							</div>
							<div className="leaflet-layer">
								<div className="leaflet-tile-container">
								</div>
								<div className="leaflet-tile-container leaflet-zoom-animated">
									{/*<img className="leaflet-tile leaflet-tile-loaded" src="//s3.amazonaws.com/holc/tiles_retina/IN/LakeCountyGary/1937/9/131/190.png" style="height: 256px; width: 256px; left: 375px; top: 250px;"><img className="leaflet-tile leaflet-tile-loaded" src="//s3.amazonaws.com/holc/tiles_retina/IN/LakeCountyGary/1937/9/132/190.png" style="height: 256px; width: 256px; left: 631px; top: 250px;">*/}
								</div>
							</div>
							<div className="leaflet-layer">
								<div className="leaflet-tile-container">
								</div>
								<div className="leaflet-tile-container leaflet-zoom-animated">
									{/*<img className="leaflet-tile leaflet-tile-loaded" src="//s3.amazonaws.com/holc/tiles_retina/IL/ChicagoSection1Inset/1940/9/130/190.png" style="height: 256px; width: 256px; left: 119px; top: 250px;">*/}
								</div>
							</div>
						</div>
						<div className="leaflet-objects-pane">
							<div className="leaflet-shadow-pane">
								{/*<img src="//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png" className="leaflet-marker-shadow leaflet-zoom-animated" style="margin-left: -12px; margin-top: -41px; width: 41px; height: 41px; transform: translate3d(455px, 265px, 0px);">*/}
							</div>
							<div className="leaflet-overlay-pane">
								<svg className="leaflet-zoom-animated" width="1231" height="817" viewBox="-172 -114 1231 817">
									<g>
										<path className="sortingPolygon leaflet-clickable" stroke-linejoin="round" stroke-linecap="round" fill-rule="evenodd" stroke="#0033ff" stroke-opacity="0" stroke-width="5" fill="#0033ff" fill-opacity="0" d="M371 227L463 224L533 224L534 353L374 355L371 256z">
										</path>
									</g>
									{/*<!--etc groups and paths-->*/}
								</svg>
							</div>
							<h1><a href="//dsl.richmond.edu/panorama/redlining/#city=lake-county-gary-in">Lake County Gary</a></h1>
							<div className="populationStats">
								<span className="catName">Population (1940):</span>
								<span className="subcatData">111,719</span>
							</div>
							<ul>

							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
)

});

export default Frame;
