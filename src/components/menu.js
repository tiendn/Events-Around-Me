import React from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, PanResponder  } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openModule, toggleMenu } from '../actions/appActions';
import { ME, EVENTS_SEARCH, SETTINGS } from '../commons/constants';


class Menu extends React.Component {
  constructor(props) {
    super(props);
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gestureState) => this._handleMoveShouldSetPanResponder(e, gestureState),
      onPanResponderMove: (e, gestureState) => this._handlePanResponderMove(e, gestureState),
    })
  }
  _handleMoveShouldSetPanResponder(e: Object, gestureState: Object): boolean {
    return Math.abs(gestureState.dx) > 5;
  }
  _handlePanResponderMove(e: Object, gestureState: Object) {
    // console.log("PanRespondermove ", gestureState);
    let x0 = gestureState.x0;
    let moveX = gestureState.moveX;
    let y0 = gestureState.y0;
    let moveY = gestureState.moveY;
    if (this.props.isMenuOpened) {
      // close left menu
      if (x0 - moveX >= 20 && Math.abs(moveY - y0)<= 10)
        // this.setState({ isMenuOpened: false })
        this.props.dispatch(toggleMenu());
    }
    // else if (Platform.OS === 'ios') {
    //   if (x0 <= 30 && moveX - x0 >= 20 && Math.abs(moveY - y0) <= 20) {
    //     // this.setState({ isMenuOpened: true });
    //     this.props.dispatch(toggleMenu());
    //   }
    // }
  }
  render() {
    return (
      <View style={styles.leftMenuContainer} {...this._panResponder.panHandlers}>
        <TouchableOpacity
          style={[styles.menuItem, styles.eventSearch]}
          onPress={() => this.props.dispatch(openModule(ME))}
          activeOpacity = {1}
        >
          <Image
            style={styles.image}
            source={require('../../assets/img/events.jpg')}
          >
            <Text style = {styles.title}> Me </Text>
          </Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuItem, styles.me]}
          onPress={() => this.props.dispatch(openModule(EVENTS_SEARCH))}
          activeOpacity = {1}
        >
          <Image
            style={styles.image}
            source={require('../../assets/img/lights_events.jpg')}
          >
            <Text style = {styles.title}> Search Event </Text>
          </Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuItem, styles.setting]}
          onPress={() => this.props.dispatch(openModule(SETTINGS))}
          activeOpacity = {1}
        >
          <Image
            style={styles.image}
            source={require('../../assets/img/settings.jpg')}
          >
            <Text style = {styles.title}> Settings </Text>
          </Image>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  leftMenuContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#0077C0',
  },
  menuItem: {
    flex: 1
  },
  image: {
    flex: 1,
    resizeMode: 'repeat',
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  }
})

const mapStateToProps = (state) => {
  return {
    isMenuOpened: state.appGlobalState.isMenuOpened
  }
}

// const mapDispatchToProps = dispatch => (
//   bindActionCreators({
//     openModule
//   }, dispatch)
// )
// export default connect(mapStateToProps, mapDispatchToProps)(Menu);
export default connect(mapStateToProps)(Menu);