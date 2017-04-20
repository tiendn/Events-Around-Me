import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { loginManager } from '../actions';
class Settings extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <View style = {styles.container}>
        <TouchableOpacity style = {[styles.btnBlock,styles.logout]}>
          <Text style = {styles.text}>Logout</Text>
        </TouchableOpacity>
      </View>
    )

  }
}
const styles =  StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    backgroundColor: '#e9ebee'
  },
  btnBlock:{
    backgroundColor: 'white',
    width: '100%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#dfe0e4',
    paddingVertical: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  logout:{
  },
  text: {
    color: '#5890ff'
  }
})
export default connect()(Settings)