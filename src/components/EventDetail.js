import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  MapView,
  ScrollView
} from 'react-native';

const styles = StyleSheet.create({
  textContent: {
    paddingHorizontal: 15,
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
  },
  image: {
    resizeMode: 'cover',
    height: 160,
    marginBottom: 15,
    // resizeMode: 'stretch'
  },
  startTime: {
    fontSize: 13,
    marginBottom: 5,
    alignSelf: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 2,
    shadowOpacity: 1.0
  },
  mapView: {
    height: 200,
    marginBottom: 10,
    borderColor: '#c0b2b2',
    shadowColor: '#c0b2b2',
    shadowOffset: {
      height: 0,
      width: 2
    },
    shadowRadius: 5,
    shadowOpacity: 2.0
  },
  location: {
    paddingHorizontal: 13,
    flex: 1,
    flexDirection: 'row'
  },
  placeContent:{
    flex: 3,
  },
  placeName: {
    fontWeight: 'bold',
    fontSize: 15,

  },
  placeDistance: {
    flex: 1
  }
})

export default class EventDetail extends Component {
  constructor(props) {
    super(props);
    console.log(props);

  }
  showMap() {
    alert("Open bigger map")
  }
  render() {
    const dataDetail = this.props;
    const cover = Object.assign({}, dataDetail.cover);
    return (
      <View >
        <ScrollView>
          <Image
            style={styles.image}
            source={{ uri: cover.source, cache: 'only-if-cached' }}
            defaultSource={require('./img/not-available.png')}
          />
          <View style={styles.textContent}>
            <Text style={styles.startTime}>{dataDetail.start_time}</Text>
            <Text style={styles.title} >{dataDetail.name} </Text>
            <TouchableOpacity
              onPress={() => alert('open modal description')}
              activeOpacity={0.7}
            >
              <Text style={styles.description} numberOfLines={7} >{dataDetail.description}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.mapView} activeOpacity={0.7} onPress={() => this.showMap()}>
            <MapView
              style={{ height: 200 }}
              showsUserLocation={true}
              zoomEnabled={false}
              scrollEnabled={false}
              region={{
                latitude: dataDetail.place.location.latitude,
                latitudeDelta: 0.003,
                longitude: dataDetail.place.location.longitude,
                longitudeDelta: 0.003
              }}
              annotations={[{
                latitude: dataDetail.place.location.latitude,
                longitude: dataDetail.place.location.longitude,
                title: dataDetail.place.location.street,
              }]}
            />
          </TouchableOpacity>


          <View style={styles.location}>
            <Text style={styles.placeContent}>
              <Text style = {styles.placeName}>{dataDetail.place.name} </Text>
              {"\n"} 
              {dataDetail.place.location.street.trim()}
            </Text>
            <Text style={styles.placeDistance}> ???? </Text>
          </View>
        </ScrollView>
      </View>
//  Thieesu cho hien thi cho phep tuong tac de goi tuong thay doi trang thai rsvp
      /**
       *  EventDetail
        Include: Image , title, start, end, place, description,
       */
    )
  }
}
EventDetail.propTypes = {

};
