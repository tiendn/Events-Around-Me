import { createStore, combineReducers , applyMiddleware} from 'redux';
import SearchBar from './search';
import appReducer from './appReducer';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk);

const rootReducer = combineReducers({
  search: SearchBar,
  appGlobalState : appReducer
});

export default (data = {}) => {
    return createStore(rootReducer, data, middleware);
};
