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
import Main from './src/components/Main'

export default class EventsAroundMe extends Component {
  _handleNavigationRequest() {
    this.refs.nav.push({
      component: Main,
      title: 'Genius',
      passProps: { myProp: 'genius' },
    });
  }

  render() {
    return (
      <NavigatorIOS
        ref='nav'
        initialRoute={{
          component: Main,
          title: 'Events Around Me',
          passProps: { myProp: 'foo' },
          rightButtonTitle: 'Add',
          onRightButtonPress: () => this._handleNavigationRequest(),
        }}
        style={{flex: 1}}
      />
    );
  }
}


AppRegistry.registerComponent('EventsAroundMe', () => EventsAroundMe);
