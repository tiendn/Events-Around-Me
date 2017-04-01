import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Container, Content, Tab, Tabs, Header } from 'native-base';

import Login from '../containers/Login';
import EventsAround from '../containers/EventsAround';

const TYPE_EVENT = {
  MyEvent : 1,
  Popular : 2
}
export default class Main extends Component {
  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
  };

  watchID: ?number = null;
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  constructor(){
    super();
  }
  render(){
    return (
            <Container>
            <Header hasTabs />
            <Tabs>
                <Tab heading="Login">
                    <Login />
                </Tab>
                <Tab heading="Popular">
                    <EventsAround type = {TYPE_EVENT.Popular}/>
                </Tab>
                <Tab heading="My Events">
                    <EventsAround type = {TYPE_EVENT.MyEvent}/>
                </Tab>
                
                
            </Tabs>
            </Container>
        );
  }
  
  /*render() {
    return (
      <View style={{marginTop: 70, alignSelf: 'center'}} >
        <Text>
          <Text >Initial position: </Text>
          {this.state.initialPosition}
        </Text>
        <Text>
          <Text >Current position: </Text>
          {this.state.lastPosition}
        </Text>
        <Login />
        { GlobalVars.getLogin() && <EventsAround />}
        <EventsAround />
      </View>
    );
  }*/
}




