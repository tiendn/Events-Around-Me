import React from 'react';
import {
    TouchableOpacity, Image, Text, View, StyleSheet, ActionSheetIOS
}
    from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
    return (
        <TouchableOpacity
            onPress={() => this.props.onPress}
            style={styles.rsvpBtnItem}
        >
            <Icon name= {props.name} color={props.color} size = {35}/>
            { props.children }
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

