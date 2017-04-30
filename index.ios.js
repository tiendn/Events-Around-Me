import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
} from 'react-native';
import {Provider} from 'react-redux';
import createStore from './src/reducers/createStore';
import App from './src/components/app'
const store = createStore();
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
