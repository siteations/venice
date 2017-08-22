import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from '../store';

//--------------------AXIOS & d3 & other libraries--------------------

import axios from 'axios';

//----------------components to come---------------

import App from './components/App';
import Alternate from './components/Alternate';

console.log(window, window.innerWidth);
//		  		<Route exact path="/Venice-Edit" component={App} />
//<p className="text-center" style={{margin: '20px'}}>create a page to show when device with is less than 1200 (rotate or enlarge to view)</p>

// {/*window.innerWidth > 1199 &&
// 		  		<Route exact path="/Venice" component={App} />
//   			*/}
//   			{/*window.innerWidth < 1199 &&
//   				<Route path="/" component={Alternate} />
//   			*/}

render(
   <Provider store={store}>
     <Router>
       <div>
       {window.innerWidth >= 780 &&
		  		<Route exact path="/Venice" component={App} />
  			}
  			{window.innerWidth < 780 &&
  				<Route path="/" component={Alternate} />
  			}
       </div>
     </Router>
   </Provider>,
    document.getElementById('app'),
 );
