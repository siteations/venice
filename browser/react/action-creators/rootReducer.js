//import { combineReducers } from 'redux-immutable';
import { combineReducers } from 'redux';
import { mapReducer } from './mapActions';
import { optionReducer } from './optionActions';
import { siteReducer } from './siteActions';
import { adminReducer } from './adminActions';
//just prepping for files, may or may not need immutable with db complexity


export default combineReducers({
  sites: siteReducer,
  map: mapReducer,
  options: optionReducer,
  admin: adminReducer,
  //adds: addsReducer,
});


