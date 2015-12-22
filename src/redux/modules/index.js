import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import sheets from './sheets';

export default combineReducers({
  sheets,
  router: routeReducer
});
