import React from 'react';
import {
  Animated,
  Dimensions,
  View,
  Navigator,
  StyleSheet,
  ActionSheetIOS,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { AccessToken } from 'react-native-fbsdk';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { login, toggleMenu } from '../actions/appActions';
import { ME, SETTINGS, EVENTS_SEARCH } from '../commons/constants';
import Menu from './menu';
import Main from './main'

const WIDTH = Dimensions.get('window').width;
const timeAnimateDuration = 500;
const BUTTONS = [
  'Sort by expired',
  'Sort by location',
  'Sort by popular',
  'Cancel',
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      menuAnimated: {
        left: new Animated.Value(0),
        scale: new Animated.Value(1)
      },
      fadeAnim: {
        value: new Animated.Value(0)
      },
    });

  }
  componentWillMount() {
    this.checkLogin();
  }
  checkLogin() {
    let $scope = this;
    // Check this app is login to facebook yett?
    AccessToken.getCurrentAccessToken().then(accessToken => {
      if (accessToken === null) return false;
      else {
        $scope.props.dispatch(login());
      }
    }, reject => console.log(reject));
    return true;
  }
  /**
   * Set animation
   */
  setAnimation() {
    if (this.props.isMenuOpened) {
      Animated.timing(
        this.state.fadeAnim.value,
        {
          toValue: 1,
          duration: timeAnimateDuration,
        }
      ).start();
      Animated.timing(
        this.state.menuAnimated.left,
        {
          toValue: WIDTH * 0.7,
          duration: timeAnimateDuration,
        }
      ).start();
      Animated.timing(
        this.state.menuAnimated.scale,
        {
          toValue: 0.7,
          duration: timeAnimateDuration,
        }
      ).start();
    }
    else {
      Animated.timing(
        this.state.fadeAnim.value,
        {
          toValue: 0,
          duration: timeAnimateDuration,
        }
      ).start();
      Animated.timing(
        this.state.menuAnimated.left,
        {
          toValue: 0,
          duration: timeAnimateDuration,
        }
      ).start();
      Animated.timing(
        this.state.menuAnimated.scale,
        {
          toValue: 1,
          duration: timeAnimateDuration,
        }
      ).start();
    }
  }
  openFilter() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
      title: "Filter",
      message: "Choose what event you need."
    },
      (buttonIndex) => {
        alert(BUTTONS[buttonIndex]);
      });
  }
  renderScene(route, navigator) {
    return React.createElement(route.component, { ...this.props, ...route.passProps, route, navigator })
  }
  render() {
    this.setAnimation();
    let title = this.props.eventType === ME
      ? 'My Events'
      : this.props.eventType === EVENTS_SEARCH
        ? 'Events Around Me'
        : 'Settings ';
    const root = { title: "My Events", component: Main };
    let $scope = this;
    let NavigationBarRouteMapper = {
      LeftButton(route, navigator, index, navState) {
        if (index > 0) {
          return (
            <TouchableOpacity
              underlayColor="transparent"
              onPress={() => { if (index > 0) { navigator.pop(); } }}>
              <Icon
                name="ios-arrow-back"
                size={20}
                color="white"
                style={styles.navButton}
              />
            </TouchableOpacity>)
        }
        else {
          return (
            <TouchableOpacity
              underlayColor="transparent"
              onPress={() => $scope.props.dispatch(toggleMenu())}
            >
              <Icon
                name="ios-menu"
                size={20}
                color="white"
                style={styles.menuIco}
              />
            </TouchableOpacity>

          )
        }
      },
      RightButton(route, navigator, index, navState) {
        if ($scope.props.eventType === EVENTS_SEARCH) return (
          <TouchableOpacity
            onPress={() => $scope.openFilter()}
            underlayColor="transparent"
          >
            <Icon
              name="ios-funnel-outline"
              size={20}
              color="white"
              style={styles.filterIco}
            />
          </TouchableOpacity>

        )
      },
      Title(route, navigator, index, navState) {
        if (index == 0)
          return <Text numberOfLines={1} style={[styles.navContent, styles.navTitle]}>{title}</Text>

        return <Text numberOfLines={1} style={[styles.navContent, styles.navTitle]}>{route.title}</Text>
      }
    };
    return (
      <View style={{ flex: 1 }} >

        <Animated.View style={[styles.menu, { opacity: this.state.fadeAnim.value }]} >
          <Menu />
        </Animated.View>

        <Animated.View style={[styles.container, styles.leftMenu,
        {
          left: this.state.menuAnimated.left,
          transform: [{
            scale: this.state.menuAnimated.scale
          }]
        }]
        }>
          {/**/}
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
          {/**/}
        </Animated.View>

      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigator: {
    backgroundColor: 'rgb(53,80,135)',
    height: 50
  },
  navButton: {
    paddingLeft: 10,
  },
  navContent: {
    color: '#ffffff',
    fontSize: 16,
    // alignSelf: 'center',
  },
  statusBar: {
    height: 20
  },
  menu: {
    height: '100%',
    width: '100%',
    zIndex: 10,
  },

  leftMenu: {
    position: 'absolute',
    zIndex: 9999,
    top: 0,
    height: '100%',
    width: '100%',
  },
  filterIco: {
    // marginTop: '-20%',
    marginRight: '15%'
  },
  menuIco: {
    marginLeft: '15%'
  }
});


// const mapDispatchToProps = dispatch => {
//   bindActionCreators({
//     login,
//     toggleMenu
//   }, dispatch);
// }

const mapStateToProps = (state) => {
  return {
    isLogin: state.appGlobalState.isLogin,
    isMenuOpened: state.appGlobalState.isMenuOpened,
    eventType: state.appGlobalState.eventType
  }
}
export default connect(mapStateToProps)(Home);