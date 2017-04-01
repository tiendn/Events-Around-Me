import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight,
  NavigatorIOS
} from 'react-native';
export default class EventDetail extends Component{
  constructor(props){
    super(props);
    console.log(props);
  }
  render(){
    return (
      <View style = {{marginTop: 65}}>
        <Text>Current Scene: </Text>
        <TouchableHighlight >
          <Text>Tap me to load the next scene</Text>
        </TouchableHighlight>

        <TouchableHighlight >
          <Text>Tap me to go back</Text>
        </TouchableHighlight>
      </View>
  
      /**
       *  EventDetail
        Include: Image , title, start, end, place, description,
       */
    )
  }
}
EventDetail.propTypes = {
  
};
