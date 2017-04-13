import React from 'react';
//connect later?

const Header = ((props) => {

	return (
	        <div className="row flex bottom header">
        		<div className="col-lg-1">
        			<p>logo/link</p>
        		</div>
        		<div className="col-lg-5 bottom">
	        		<h1 className="BornholmSandvig closerT">Religious Life In Venice</h1>
	        		<h5  className="closerB">subtitle, dates, context</h5>
        		</div>
	        	<div className="col-lg-2">
        			<h4 className="BornholmSandvig closerT">links here</h4>
        			<p className="closerB"> subtitle</p>
        		</div>
	        	<div className="col-lg-2">
        			<h4 className="BornholmSandvig closerT">links here</h4>
        			<p className="closerB"> subtitle</p>
        		</div>
	        	<div className="col-lg-2">
        			<h4 className="BornholmSandvig closerT">links here</h4>
        			<p className="closerB"> subtitle</p>
        		</div>
	        </div>
	        )
})

export default Header;
