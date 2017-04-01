import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TouchableHighlight
} from 'react-native';
// import Login from './src/components/Login';
// import EventsAround from './src/components/EventsAround';
// import GlobalVars from './src/commons/global-vars';
import App from './src/components/app'

export default class EventsAroundMe extends Component {
 

  render() {
    return (
      <App />
    );
  }
}


AppRegistry.registerComponent('EventsAroundMe', () => EventsAroundMe);
