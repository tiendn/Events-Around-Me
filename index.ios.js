/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AccessToken
} = FBSDK;
var Login = React.createClass({
  render: function() {
    return (
      <View>
        <LoginButton
          // publishPermissions={["publish_actions,user_birthday, user_religion_politics, user_relationships, user_relationship_details, user_hometown, user_location, user_likes, user_education_history, user_work_history, user_website, user_managed_groups, user_events, user_photos, user_videos, user_friends, user_about_me, user_status, user_games_activity, user_tagged_places, user_posts, user_actions.video, user_actions.news, user_actions.books, user_actions.music, user_actions.fitness, public_profile, basic_info"]}
          // publishPermissions={["publish_actions","user_events"]}
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                console.log("Login was successful");
                // Attempt a login using the Facebook login dialog,
                // asking for default permissions.

                // alert("Login was successful with permissions: " + result.grantedPermissions);
                // AccessToken.getCurrentAccessToken().then(
                //   (data) => {
                //     meow_accesstoken = data.accessToken;
                //     console.log(meow_accesstoken.toString())
                //   }
                // )

              }
            }
          }
          onLogoutFinished={() => console.log("User logged out")}/>
      </View>
    );
  },

});
LoginManager.logInWithReadPermissions(['public_profile','user_friends','user_events']).then(
  function(result) {
    if (result.isCancelled) {
      console.log('Login was cancelled');
    } else {
      console.log('Login was successful with permissions: '
        + result.grantedPermissions.toString());

        new GraphRequestManager().addRequest(new GraphRequest(
          // '/search?q=Hà Nội&type=event',
          // 'EAAaPsh5NSG4BAGUcJTWTZAoncMD8ixYEmlCjuoEAF28FRFGrrWOXlWyZAOFXOnvESQpXa97C95ifgtWaxzCbx3BYHKLEXjZCxjXguVByY8zqVmWY977ZC63lzYlIQKZCbG6ilTLkX2Ss5Hcwra1X6Ynm9AaLI5ZATKeujCMDnmvAbY4pakvZCySZCjafT8iYZBj8ZD',
          // '/me?metadata=1',
          // '/me/events',
          '/search',
          // 'GET',
          {"q":"Hà Nội","type":"event"},
          // null,
          function(error: ?Object, result: ?Object) {
            if (error) {
              console.log('Error fetching data: ' , error);
            } else {
              console.log('Success fetching ddata: ' , result);
            }
          },
        )).start()
    }
  },
  function(error) {
    console.log('Login failed with error: ' + error);
  }
);
// testRequestGraphAPI(meow_accesstoken){
// const infoRequest = new GraphRequest(
//   // '/search',
//   // 'EAAaPsh5NSG4BAGUcJTWTZAoncMD8ixYEmlCjuoEAF28FRFGrrWOXlWyZAOFXOnvESQpXa97C95ifgtWaxzCbx3BYHKLEXjZCxjXguVByY8zqVmWY977ZC63lzYlIQKZCbG6ilTLkX2Ss5Hcwra1X6Ynm9AaLI5ZATKeujCMDnmvAbY4pakvZCySZCjafT8iYZBj8ZD',
//   // '/me?metadata=1',
//   '/me/friends',
//   null,
//   function(error: ?Object, result: ?Object) {
//     if (error) {
//       console.log('Error fetching data: ' , error);
//     } else {
//       console.log('Success fetching data: ' , result);
//     }
//   },
// );
// new GraphRequestManager().addRequest(infoRequest).start();

// }
export default class EventsAroundMe extends Component {
 //

  render() {
    return (
      <View>
        <Text> Welcome to the Facebook SDK for React Native! </Text>
        <Login />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('EventsAroundMe', () => EventsAroundMe);
