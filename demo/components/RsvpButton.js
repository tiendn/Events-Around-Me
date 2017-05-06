import React from 'react';
import {
  TouchableOpacity, Image, Text, View, StyleSheet, ActionSheetIOS
}
  from 'react-native';
import { RSVP_STATUS } from '../containers/common';
import { postFbRequest } from '../providers/FBRequest.js';

const BUTTONS = [
  'Option 0',
  'Option 1',
  'Option 2',
  'Delete',
  'Cancel',
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;
export default RsvpButton = (props) => {
  // console.log(props)
  /**
   * Change status in event
   * @param {*} eventId 
   * @param {*} param 
   */
  function onStatusPress(eventId, param) {
    if (props.rsvp_status === 'more') {
      ActionSheetIOS.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: "Action Sheet",
        message: "Hello, My name is Monkey."
      },
        (buttonIndex) => {
          alert(BUTTONS[buttonIndex]);
        });
    }
    else {
      let path = eventId + '/' + param;
      postFbRequest(path, (error, result) => {
        if (error) {
          console.log('Error fetching data: ', error);
          alert(error.message)
        } else {
          console.log('Success change RSVP status : ', result);
          alert(result.success)
        }
      });
    }

  }
  let iconPath = `./img/${props.rsvp_status}.png`;
  return (
    <TouchableOpacity
      onPress={() => onStatusPress(props.eventId, props.rsvp_status)}
      style={styles.rsvpBtnItem}
    >
      <ImageIcon name = {props.rsvp_status}/>
      {props.children && <Text style={styles.childenText}>
        {props.children}
      </Text>}
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  rsvpBtnItem: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1
  },
  childrenText: {
    // color: '#CCC'
  }
})

const ImageIcon = (props) => {
  switch (props.name) {
    case 'attending':
      return (
        <Image
          source={require('./img/attending.png')}
        />
      )
    case 'declined':
      return (
        <Image
          source={require('./img/declined.png')}
        />
      )
    case 'interested':
      return (
        <Image
          source={require('./img/interested.png')}
        />
      )
    case 'more':
      return (
        <Image
          source={require('./img/more.png')}
        />
      )
    default:
      return (
        <Image
          source={require('./img/interested-blank.png')}
        />
      )
      
  }
}