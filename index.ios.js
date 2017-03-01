import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Login from './src/Login';
import EventsAround from './src/EventsAround';
export default class EventsAroundMe extends Component {
  constructor(){
    super();
  }
  render() {
    return (
      <View>
        <Text> Welcome to the Facebook SDK for React Native! </Text>
        <Login />
        <EventsAround />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('EventsAroundMe', () => EventsAroundMe);
