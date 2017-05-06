import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux';
import { loginManager } from '../actions';
import { LOGIN, LOGOUT } from '../common/constants';
import { LoginManager } from 'react-native-fbsdk';
const anotherStyles = require('../style/Styles');

// const FBSDK = require('react-native-fbsdk');
// const {
//   LoginButton,
//   LoginManager,
// } = FBSDK;
class Login extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = ({
      isLogin: false
    })
    // this._handleFacebookLogin = this._handleFacebookLogin.bind(this);
  }
  
  /**
   * Login facebook
   */
  _login() {
    let $scope = this;
    let permissions = ['public_profile', 'user_events', 'user_friends'];
    LoginManager.logInWithReadPermissions(permissions).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled')
        } else {
          $scope.props.dispatch(loginManager(LOGIN));
          console.log('Login success with information: ', result)
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error)
      })

  }
  // Logout
  _logout() {
    try {
      LoginManager.logOut();
      this.props.dispatch(loginManager(LOGOUT));
    }
    catch (ex) {
      console.log("Logout error", ex)
    }
  }
  // Render
  render() {
    if (!this.props.isLogin)
      return (
        <View style={styles.container}>
          <Text style={styles.title}>
            You need login with facebook before use app.
          </Text>
          <TouchableOpacity
            onPress={() => this._login()}
            style={styles.btnLogin}
          >
            <Text style={[styles.loginFbText, anotherStyles.loginFbText]}>
              Login with Facebook
              </Text>
          </TouchableOpacity>
        </View>
      )
    else {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={[styles.btnLogout, styles.logout]}
            onPress={() => this._logout()}
          >
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
  /*render(){
    var $scope = this;
    permissions = ['public_profile','user_friends','user_events','user_likes','rsvp_event'];
    return (
      <View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          readPermissions={permissions}
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("Get access permissions failed with error: " + result.error);
              } else if (result.isCancelled) {
                console.log("Login was cancelled");
              } else {
                GlobalVars.setLogin(true);
                console.log("Login was successful");
              }
            }
          }
          onLogoutFinished={() => {
            this.setState = ({
              isLogin : false
            })
            console.log("User logged out")}
          }
        />
      </View>
    );
  } */

};
const styles = StyleSheet.create({
  title: {
    marginBottom: 10
  },
  loginFbText: {
    color: '#f6f9ff',
    fontSize: 20,
    paddingVertical: 10,
    fontWeight: 'bold',
    textAlign: 'center',

  },
  btnLogout: {
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
  text: {
    color: '#5890ff'
  },
  btnLogin: {
    backgroundColor: '#4080ff',
    paddingHorizontal: '10%'
  },
  container: {
    flex: 1,
    paddingHorizontal: '2%',
    paddingVertical: '40%',
    borderRadius: 5,
    alignItems: 'center',
  }

});
mapStateToProps = (state) => {
  return {
    isLogin: state.appGlobalState.isLogin
  }
}
export default connect(mapStateToProps)(Login);
// loginFbText 
