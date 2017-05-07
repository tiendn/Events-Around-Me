import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
export default CardContent = (item) => {
  // Datetime
  return (
    <View style={styles.cardContent}>
      <Text style={[styles.startTime, styles.text]}>
        {item.start_time}
    </Text>
      <Text numberOfLines={1} style={[styles.title, styles.text]} >
        {item.name}
    </Text>
      <Text style={[styles.place, styles.text]} >
        {item.place == undefined ? '' : item.place.name}
    </Text>
    </View>
  )
};
export const styles = StyleSheet.create({
  cardContent: {
    position: 'relative',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  place: {
    fontSize: 14
  },
});