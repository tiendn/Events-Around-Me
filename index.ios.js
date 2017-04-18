import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
} from 'react-native';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import eventApp from './src/reducers';
import App from './src/components/App'
const store = createStore(eventApp);
export default class EventsAroundMe extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
AppRegistry.registerComponent('EventsAroundMe', () => EventsAroundMe);
