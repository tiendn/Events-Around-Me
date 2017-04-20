import { combineReducers } from 'redux';
import SearchBar from './search';

const eventApp = combineReducers({
  search: SearchBar
});

export default eventApp;
