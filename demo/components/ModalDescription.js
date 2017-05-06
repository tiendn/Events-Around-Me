import React from 'react';
import {
  Modal, TouchableOpacity, Text, View, ScrollView, StyleSheet, Image
} from 'react-native';

const styles = StyleSheet.create({
  description: {
    marginTop: 5,
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
  scrollViewDescription: {
    padding: 10,

  },
  header: {
    position: 'relative',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1
  },
  btnClose: {
    position: 'absolute',
    top: -24,
    left: 0,

  },
  title: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  }
})


export default class DetailModal extends React.Component {
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
    return (
      <View >
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={styles.header}>

            {/*Loi chua dua title vao giua*/}
            <Text style={styles.title}> Event Description </Text>
            <TouchableOpacity
              onPress={() => this.setModalVisible(false)}
              activeOpacity={0.7}
            >
              <Image
                style={styles.btnClose}
                source={require('./img/close.png')}
              />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollViewDescription}>
            <Text style={styles.description}>{this.props.content}</Text>
          </ScrollView>
        </Modal>
        <TouchableOpacity
          onPress={() => this.setModalVisible(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.description} numberOfLines={7} >{this.props.content}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
