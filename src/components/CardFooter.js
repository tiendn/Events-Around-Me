import { Text, View, StyleSheet, Share, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { RSVP_STATUS } from '../containers/common';
import RsvpButton from './RsvpButton';
/**
 * 
 * @param {*} rowData 
 */


// let isInterested = false;
export default CardFooter = (rowData) => {
  const data = rowData;


  function shareText(name) {
    Share.share({
      message: 'What do you think ?',
      url: 'http://facebook.github.io/react-native/',
      title: name
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

      <TouchableOpacity
        style={[styles.share, styles.button]}
        onPress={() => { shareText(data.name) }}
      >
        {/*https://facebook.github.io/react-native/docs/share.html*/}
        <Image
          style={styles.icon}
          source={require('./img/share-ic.png')}
        />
      </TouchableOpacity>
      <View style={[styles.interested, styles.button]}>
        <RsvpButton
          eventId={data.id}
          rsvp_status={RSVP_STATUS.Interested}
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  // attending: {
  //   position: 'absolute',
  //   top:10,
  //   right: 10,
  //   backgroundColor: '#4080ff',
  //   zIndex : 99,

  //   borderRadius : 20 
  //   // flex: 0.6
  // },
  body: {
    backgroundColor: '#dddddd'
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
  cardContent: {
    position: 'relative',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cardFooter: {

    flexDirection: 'row'
  },
  // icon: {
  //   height: 32,
  //   width: 32,
  // },
  // iconInterested:{
  //   // backgroundColor : isInterested == true ? 'red' : 'white' 

  // },

  image: {
    flex: 1,
    resizeMode: 'cover',
    height: 160,
    // resizeMode: 'stretch'
  },
  share: {
    flex: 2
  },
  startTime: {
    fontSize: 14
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  text: {
    paddingVertical: 2,
  },
  textFooter: {
    flex: 4,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  place: {
    fontSize: 14
  },


});