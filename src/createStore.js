import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import appReducer from './reducers/appReducer';
import eventReducer from './reducers/eventReducer';
// import homeReducer  from './modules/home/reducers/reducer.home';
// import keyFinancialsReducers  from './modules/keyfinancials/reducers/keyfinancials.reducers';
// import compareTabReducers from './modules/sharegraph/comparetab/reducers/comparetab.reducer';
const middleware = applyMiddleware(thunk);

export default (data = {}) => {
    const rootReducer = combineReducers({
        appGlobalState: appReducer,
        eventState: eventReducer 
        // home: homeReducer,
        // compareTab: compareTabReducers,
        // keyFinancialsReducers
    });

    return createStore(rootReducer, data, middleware);
}