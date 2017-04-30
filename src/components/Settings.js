import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Login from '../containers/Login';
class Settings extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style = {styles.container}>
        <Login style = {styles.login}/>
      </View>
    )
  }
}
const styles =  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ebee'
  },
  login: {
    paddingTop: 100,
  }
})
export default connect()(Settings)