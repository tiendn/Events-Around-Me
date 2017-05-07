import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
export default CardContent = (rowData) => {
  // Datetime
  const data = rowData;
  return (
    <View style={styles.cardContent}>
      <Text style={[styles.startTime, styles.text]}>
        {data.start_time}
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