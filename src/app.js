import React, { Component, PropTypes } from 'react';
import {Provider} from 'react-redux';
import createStore from './createStore';
import Home from './components/home';
const store = createStore();
export default class EventsAroundMe extends Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}
