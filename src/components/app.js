import React, { Component } from 'react';
import {
  Navigator, StyleSheet, TouchableOpacity, Platform, View, StatusBar, Text, NavigatorIOS
} from 'react-native';
import { AccessToken } from 'react-native-fbsdk';
import { connect } from 'react-redux';
import Tabs from './Tabs';
import Login from '../containers/Login';
import { LOGIN } from '../common/constants';
import { loginManager } from '../actions';



class App extends Component {
  constructor() {
    super();
    this.checkLogin();
    
  }
  checkLogin() {
    let $scope = this;
    // Check this app is login to facebook yett?
    AccessToken.getCurrentAccessToken().then(accessToken => {
      if (accessToken === null) return false;
      else {
        $scope.props.dispatch(loginManager(LOGIN));
      }
    }, reject => console.log(reject));
    return true;
  }
  // _handleNavigationRequest() {
  //   this.refs.nav.push({
  //     component: Tabs,
  //     title: 'Genius',
  //     passProps: { myProp: 'genius' },
  //   });
  // }
  render() {
    return (
      <NavigatorIOS
        ref='nav'
        initialRoute={{
          component: Tabs,
          title: 'Events Around Me',
          passProps: { ...this.refs },
          rightButtonTitle: 'Search',
          onRightButtonPress: () => this._handleNavigationRequest(),
        }}
        style={{ flex: 1, }}
        barTintColor='#ffffcc'
      />

    );
  }
  /*render() {
    
    const root = { title: "Events Around Me", component: Tabs };
    
    let $scope = this;
    var NavigationBarRouteMapper = {
      LeftButton(route, navigator, index, navState) {
        if (index > 0) {
          return (
            <TouchableOpacity
              underlayColor="transparent"
              onPress={() => { if (index > 0) { navigator.pop(); } }}>
              <Text style={StyleSheet.flatten([styles.navContent, styles.navButton])}>Back</Text>
            </TouchableOpacity>)
        }
        else {
          return (
            <TouchableOpacity
              underlayColor="transparent">
              <Text style={StyleSheet.flatten([styles.navContent, styles.navButton])}>Menu</Text>
            </TouchableOpacity>)
        }
      },
      RightButton(route, navigator, index, navState) {
        if (route.onPress) return (
          <TouchableOpacity
            onPress={() => route.onPress()}>
            <Text style={styles.navContent}>
              {route.rightText || 'Right Button'}
            </Text>
          </TouchableOpacity>)
      },
      Title(route, navigator, index, navState) {
        return <Text numberOfLines = {1} style={[styles.navContent,styles.navTitle]}>{route.title}</Text>
      }
    };
    return (
      <Navigator
        ref='nav'
        initialRoute={root}
        renderScene={(route, navigator) => {
          let RouteComponent = route.component;
          return (
            <View style={styles.container}>
              <StatusBar barStyle='light-content' />
              <RouteComponent navigator={navigator} {...route.props} />
            </View>
          )
        }}
        configureScene={(route, routeStack) => {
          if (Platform.OS === 'ios') {
            return {
              ...Navigator.SceneConfigs.PushFromRight,
            }
          }
          else return {
            ...Navigator.SceneConfigs.FloatFromBottomAndroid,
            gestures: {}
          }
        }}
        navigationBar={
          <Navigator.NavigationBar
            navigationStyles={
              Platform.OS === 'ios' ? Navigator.NavigationBar.StylesIOS
                : Navigator.NavigationBar.StylesAndroid
            }
            style={styles.navigator}
            routeMapper={NavigationBarRouteMapper} />
        }
      />
    );
  }*/
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigator: {
    backgroundColor: '#B3D749',
    height: 50
  },
  navButton: {
    paddingLeft: 10
  },
  navContent: {
    color: '#ffffff',
    fontSize: 16,
    
  },
  navTitle: {
    width: '60%'
  },
  statusBar: {
    height: 20
  },
});

export default connect(mapStateToProps)(App)



