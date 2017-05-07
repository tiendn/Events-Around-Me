import React, { Component } from 'react';
import { View, StyleSheet, Text, PanResponder, Platform } from 'react-native';
import { connect } from 'react-redux';
import { toggleMenu } from '../actions/appActions';
import { ME, SETTINGS, EVENTS_SEARCH } from '../commons/constants';
import EventsAround from '../containers/EventsAround';
import Settings from '../containers/Settings';

  class Main extends Component {
    constructor(props) {
      super(props);
      // PanRes
      this._panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (e, gestureState) => this._handleMoveShouldSetPanResponder(e, gestureState),
        onPanResponderMove: (e, gestureState) => this._handlePanResponderMove(e, gestureState),
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderRelease: (e, gestureState) => this._handlePanResponderEnd(e, gestureState),
      })
      this._handlePanResponderMove = this._handlePanResponderMove.bind(this);
    }
    _handleMoveShouldSetPanResponder(e: Object, gestureState: Object): boolean {
      // console.log(gestureState)
      let x0 = gestureState.x0;
      let y0 = gestureState.y0;
      if (Math.abs(gestureState.dx) > 5 && !this.props.isMenuOpened)
        return true;
      return false;
    }
    _handlePanResponderMove(e: Object, gestureState: Object) {
      // console.log("PanRespondermove ", gestureState);
      let x0 = gestureState.x0;
      let moveX = gestureState.moveX;
      let y0 = gestureState.y0;
      let moveY = gestureState.moveY;
      if (this.props.isMenuOpened) {
        // close left menu
        if (x0 - moveX >= 20 && Math.abs(moveY - y0) <= 10)
          // this.props.toggleMenu();
          this.props.dispatch(toggleMenu());
      }
      // Open leftmenu by swipe
      else if (Platform.OS === 'ios') {
        if (x0 <= 30 && moveX - x0 >= 20 && Math.abs(moveY - y0) <= 20
          || (moveX === 0 && moveY === 0)) {
          // this.props.toggleMenu();
          this.props.dispatch(toggleMenu());
        }
      }
    }
    // Click text home 
    _handlePanResponderEnd(e: Object, gestureState: Object) {
      // console.log("end", gestureState)
      let dx = gestureState.dx;
      let dy = gestureState.dy;
      if (this.props.isMenuOpened && dx === 0 && dy === 0) {
        // this.props.toggleMenu();
        this.props.dispatch(toggleMenu());
      }
    }
    _renderPage() {
      if (this.props.eventType === ME || this.props.eventType === EVENTS_SEARCH)
        return (
          <EventsAround navigator={this.props.navigator} />
        )
      else
        return (
          <Settings navigator={this.props.navigator} />
        )
    }
    _renderViewAbsolute() {
      if (this.props.isMenuOpened) {
        return (
          <View style={{ position: 'absolute', zIndex: 10000, top: 0, left: 0, width: '100%', height: '100%' }}></View>
        )
      }
    }
    render() {
      return (
        <View
          {...this._panResponder.panHandlers}
          style={styles.component}
          navigator={this.props.navigator}
        >
          {/*Events*/}
          {this._renderPage()}
          {this._renderViewAbsolute()}
        </View>
      );
    }

  }

const styles = StyleSheet.create({
  component: {
    // paddingTop: 100
    flex: 1,
    backgroundColor: 'white'
  },
  menunote: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    color: '#444444',
    fontSize: 12
  },
  footer: {
    fontSize: 10,
    textAlign: 'center'
  }
});
const mapDispatchToProps = dispatch => {
  bindActionCreators({
    toggleMenu
  }, dispatch)
}
const mapStateToProps = (state) => {
  return {
    isMenuOpened: state.appGlobalState.isMenuOpened,
    eventType: state.appGlobalState.eventType
  }
}
// export default connect(mapStateToProps,mapDispatchToProps)(Main);
export default connect(mapStateToProps)(Main);
