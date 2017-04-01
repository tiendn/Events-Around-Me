import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native'
import { LoginManager } from 'react-native-fbsdk';
const anotherStyles = require('../style/Styles');

// const FBSDK = require('react-native-fbsdk');
// const {
//   LoginButton,
//   LoginManager,
// } = FBSDK;
export default class Login extends Component {
  constructor() {
    super();
    
    this.state = ({
      isLogin: false
    })
    this._handleFacebookLogin = this._handleFacebookLogin.bind(this);
  }
  /**
   * Login facebook
   */
  _login(){
    // let permissions = ['publish_action','public_profile','user_friends','user_events','user_likes','rsvp_event'];
    let permissions = ['public_profile', 'user_events', 'user_friends'];
    LoginManager.logInWithReadPermissions(permissions).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled')
        } else {
          this.setState = ({
            isLogin: true
          })
          console.log('Login success with permissions: ' + result.grantedPermissions.toString())
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error)
      })
  }
  _logout(){
    LoginManager.logOut();
  }
  _handleFacebookLogin() {
    if (this.state.isLogin){
      this._logout();
      this.setState({isLogin : false});
    }
    else {
      this._login();
      this.setState({isLogin : true});
    }
    
    
  }
  render() {
    // if this.state.isLogin = true push nav
    return (
      <View style={styles.loginFb}>
        <TouchableOpacity
          onPress={this._handleFacebookLogin}
        >
          
            <Text style={[styles.loginFbText,anotherStyles.loginFbText] }>
              { this.state.isLogin == false ? 'Login' : 'Logout' }
            </Text>
          
        </TouchableOpacity>
      </View>
    )
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
  loginFbText: {
    color: '#f6f9ff',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#4080ff',
    textAlign: 'center',

  },
  loginFb: {
    width: 100,
    padding: 8,
    borderRadius: 5
  }

});
// loginFbText 
