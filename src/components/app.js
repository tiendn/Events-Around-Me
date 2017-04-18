import React, { Component } from 'react';
import {
  NavigatorIOS
} from 'react-native';
import Tabs from './Tabs';


export default class App extends Component {
  constructor() {
    super();
  }
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
          component: Tabs,
          title: 'Events Around Me',
          passProps: { ...this.refs },
          rightButtonTitle: 'Add',
          onRightButtonPress: () => this._handleNavigationRequest(),
        }}
        style={{flex: 1}}
      />
      
    );
  }
}




