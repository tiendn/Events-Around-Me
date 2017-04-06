import React from 'react';
import {
  Modal, TouchableOpacity, Text, View, MapView, StyleSheet, Image, Dimensions
} from 'react-native';

const styles = StyleSheet.create({
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
  btnClose: {
    position: 'absolute',
    top: -Dimensions.get("window").height + 20,
    left: 10,
  },
})


export default class MapModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    }
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render() {
    const location = this.props.location;
    return (
      <View >
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
        >
          <MapView
            style={{ flex: 1 }}
            showsUserLocation={true}

            region={{
              latitude: location.latitude,
              latitudeDelta: 0.003,
              longitude: location.longitude,
              longitudeDelta: 0.003
            }}
            annotations={[{
              latitude: location.latitude,
              longitude: location.longitude,
              title: location.street,
            }]}
          />
          <TouchableOpacity
            onPress={() => this.setModalVisible(false)}
            activeOpacity={0.7}

          >
            <Image
              style={styles.btnClose}
              source={require('./img/close.png')}
            />
          </TouchableOpacity>
        </Modal>
        <TouchableOpacity style={styles.mapView} activeOpacity={0.7}
          onPress={() => this.setModalVisible(true)}>
          <MapView
            style={{ height: 200 }}
            showsUserLocation={true}
            zoomEnabled={false}
            scrollEnabled={false}
            region={{
              latitude: location.latitude,
              latitudeDelta: 0.003,
              longitude: location.longitude,
              longitudeDelta: 0.003
            }}
            annotations={[{
              latitude: location.latitude,
              longitude: location.longitude,
              title: location.street,
            }]}
          />
        </TouchableOpacity>
      </View>
    )
  }
}
