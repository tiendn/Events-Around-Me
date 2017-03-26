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
  }
  render(){
    return (
      <View>
        <Text>Current Scene: {this.props.title}</Text>
        <Image source = {{uri : 'https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/12806034_1035599499833770_6658167923581042069_n.jpg?oh=2bfcae9c2a0843c89d1cd877ff6efd84&oe=59336C0F'}} />
        <TouchableHighlight onPress={this.props.onForward}>
          <Text>Tap me to load the next scene</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.props.onBack}>
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
  title: PropTypes.string.isRequired,
  onForward: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};
