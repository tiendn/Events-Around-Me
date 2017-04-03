import React, { Component } from 'react';
import {
  Text,
  View,
  TabBarIOS,
  StyleSheet,
  NavigatorIOS
} from 'react-native';
// import { Container, Content, Tab, Tabs, Header } from 'native-base';
import Tabs from './Tabs';


export default class App extends Component {
  // state = {
  //   initialPosition: 'unknown',
  //   lastPosition: 'unknown',
  // };

  watchID: ?number = null;
  componentDidMount() {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     var initialPosition = JSON.stringify(position);
    //     this.setState({ initialPosition });
    //   },
    //   (error) => alert(JSON.stringify(error)),
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    // );
    // this.watchID = navigator.geolocation.watchPosition((position) => {
    //   var lastPosition = JSON.stringify(position);
    //   this.setState({ lastPosition });
    // });
  }

  componentWillUnmount() {
    // navigator.geolocation.clearWatch(this.watchID);
  }

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




