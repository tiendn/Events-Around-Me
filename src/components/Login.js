import React , {Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  LoginManager,
} = FBSDK;
export default class Login extends Component{
  constructor(){
    super();
    // this.setState = ({
    //   isLogin: false
    // })
    // this.manageLoginPermissions = this.manageLoginPermissions.bind(this);
  }
  // componentWillUnmount(){
  //   console.log("HHHH")
  //   this.setState = ({
  //     isLogin: true
  //   })
  // }
  // manageLoginPermissions(){
  //   LoginManager.logInWithReadPermissions().then(
  //     function(result) {
  //       if (result.isCancelled) {
  //         console.log('Login manager was cancelled');
  //       } else {
  //         console.log('Login manager was successful with permissions: '
  //           + result.grantedPermissions.toString());
  //           var eventId = 10012401204120;
  //           var pathImage = eventId+'?fields=images';
  //       }
  //     },
  //     function(error) {
  //       console.log('Login failed with error: ' + error);
  //     }
  //   );
  // }
  render(){
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
                console.log("Login was successful");
              }
            }
          }
          onLogoutFinished={() => console.log("User logged out")}/>
      </View>
    );
  }

};
