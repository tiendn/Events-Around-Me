import { Text, View, StyleSheet, Share, TouchableOpacity, Image } from 'react-native';
import React from 'react';
// import { RSVP_STATUS } from '../containers/common';
import RsvpButton from './rsvpbutton';
/**
 * 
 * @param {*} rowData 
 */


// let isInterested = false;
export default CardFooter = (rowData) => {
  const data = rowData;


  function shareText(data) {
    Share.share({
      message: 'What do you think ?',
      url: 'http://facebook.com/'+data.id,
      title: data.name
    }, {
        dialogTitle: 'Share React Native website',
        // excludedActivityTypes: [
        //   'com.apple.UIKit.activity.PostToTwitter'
        // ],
        tintColor: 'green'
      })
      .then(() => { console.log("Share successful") })
      .catch((error) => { console.log("Share successful") });
  };
  return (
    <View style={styles.cardFooter}>
      <Text style={styles.textFooter} numberOfLines={1}>
        {data.attending_count == undefined ? '' : '#' + data.attending_count + ' '}
        {data.category == undefined ? '' : '#' + data.category}
      </Text>

      
      <View style={[styles.interested, styles.button]}>
        <RsvpButton
          name = 'ios-star-outline'
          color = 'rgb(175,174,175)'
        >
          {/*<Text style = {styles.text}>Interested</Text>*/}
        </RsvpButton>
      </View>
      <View style={[styles.share, styles.button]}>
        <RsvpButton
          name = 'ios-share-outline'
          color = 'rgb(175,174,175)'
        >
          {/*<Text style = {styles.text}>Interested</Text>*/}
        </RsvpButton>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  cardFooter: {
    flexDirection: 'row'
  },
  
  button: {
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center'
  },
  interested: {
    flex: 2
  },
  share: {
    flex: 2,
  },
  
  text: {
    paddingVertical: 2,
  },
  textFooter: {
    flex: 4,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },


});