import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
export default CardContent = (content) => {
  // Datetime
  const data = content.rowData;
  let start_time;
  const options = {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    hour: 'numeric', minute: 'numeric'
  };
  options.timeZone = 'UTC';
  options.timeZoneName = 'short';
  if (data.startTime !== "")
    start_time = new Date(data.startTime).toLocaleDateString('en-US', options)
      .slice(0, -3).toUpperCase();
      
  return (
    <View style={styles.cardContent}>
      <Text style={[styles.startTime, styles.text]}>
        {start_time}
    </Text>
      <Text numberOfLines={1} style={[styles.title, styles.text]} >
        {data.name}
    </Text>
      <Text style={[styles.place, styles.text]} >
        {data.place == undefined ? '' : data.place.name}
    </Text>
    </View>
  )
};
export const styles = StyleSheet.create({
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
  icon: {
    height: 32,
    width: 32
  },
  interested: {
    flex: 1
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    height: 160,
    // resizeMode: 'stretch'
  },
  share: {
    flex: 1
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