import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from '../store';

//--------------------AXIOS & d3 & other libraries--------------------

import axios from 'axios';

//-------------------styles------------------------

// import '../../public/stylesheets/bootstrap.min.css';
// import '../../public/stylesheets/normalize.css';
// import '../../public/stylesheets/style.css';

//----------------components to come---------------

import App from './components/App';
/*import Templates from './components/Templates';
import About from './components/About';
import User from './components/User';
import Preview from './components/Preview';*/


//----------------actions for onLoad/onEnter to come----------
/*
const onIndexEnter = () => {

	const pVoyages = axios.get('/api/vessels')
					.then(responses => {
						return responses.data;
					})
				    .then((voyages) => {
				      	store.dispatch(loadVoyages(voyages));
				    });
};

const onVesselEnter = (nextRouterState) => {
	const voyageId = nextRouterState.params.id;

	const sVoyage = axios.get(`/api/vessels/${voyageId}`)
		.then(response => response.data)
	    .then((voyage) => {
	    	const duration =[voyage.Start, voyage.End];
	    	voyage.LogId= voyage.LogId.replace(' ', '_');
	      	store.dispatch(detailVoyage(voyage));

			const pVoyage = axios.get('/api/vessels');
			const sCrew = axios.get(`/api/crew/${voyage.LogId}`);
			const sContacts = axios.get(`/api/contact/${voyage.LogId}`);
			const sPlaces = axios.get(`/api/places/${voyage.LogId}`);
			const sAnimals = axios.get(`/api/animals/${voyage.LogId}`);
			const sAllAnimals = axios.get(`/api/allanimals/${voyage.LogId}`);
			const geography = axios.get('/geojson/110m_land.json');


			return Promise
			.all([pVoyage, sCrew, sContacts, sPlaces, sAnimals, sAllAnimals, geography])
			.then(responses => responses.map(r => r.data))
			.then(([voyages, crew, contacts, places, animals, allanimals, geography]) => {

				store.dispatch(filterCrew(crew));
				store.dispatch(selectContacts(contacts));
				store.dispatch(selectPlaces(places));
				store.dispatch(filterPlaces(places, duration));
				store.dispatch(selectAnimals(animals));
				store.dispatch(filterAnimals(allanimals, duration));
				store.dispatch(selectAllAnimals(allanimals));
				store.dispatch(setbaseGeo(geography));
				store.dispatch(loadVoyages(voyages));
			});
	});

};
*/

render(
   <Provider store={store}>
     <Router>
       <div>
  		<Route exact path="/Venice" component={App} />
  		<Route exact path="/Venice-Edit" component={App} />
		  {/* <Route path="/templates" component={Templates} />
		  <Route path="/about" component={About} /> {/* //about tabs should hold intro, directions, usecases
		  <Route path="/profile/:user" component={User} />
		  <Route path="/preview" component={Preview} /> {/* //about tabs should hold user's templates (created), user's templates (favorites), sidebar contact info/media preferences, other?
	       <Route path='/live' component={Live} /> //only holds the page preview w/ the top nav bar
	   		*/}
	     </div>
     </Router>
   </Provider>,
    document.getElementById('app'),
 );
