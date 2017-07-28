//import { combineReducers } from 'redux-immutable';
import { combineReducers } from 'redux';
import { mapReducer } from './mapActions';
import { optionReducer } from './optionActionsNDB';
import { siteReducer } from './siteActionsNDB';
import { panelReducer } from './panelActions';
//import { userReducer } from './userActions';
//just prepping for files, may or may not need immutable with db complexity


export default combineReducers({
  sites: siteReducer,
  map: mapReducer,
  options: optionReducer,
  panel: panelReducer,
  //user: userReducer,
});


