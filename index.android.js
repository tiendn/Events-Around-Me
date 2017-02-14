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
  GraphRequest,
  GraphRequestManager,
  AccessToken
} = FBSDK;
var getAPI = React.createClass({

})
var Login = React.createClass({

  render: function() {
    return (
      <View>
        <LoginButton
          // publishPermissions={["publish_actions,user_birthday, user_religion_politics, user_relationships, user_relationship_details, user_hometown, user_location, user_likes, user_education_history, user_work_history, user_website, user_managed_groups, user_events, user_photos, user_videos, user_friends, user_about_me, user_status, user_games_activity, user_tagged_places, user_posts, user_actions.video, user_actions.news, user_actions.books, user_actions.music, user_actions.fitness, public_profile, basic_info"]}
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                console.log("Login was successful");
                // alert("Login was successful with permissions: " + result.grantedPermissions);
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    meow_accesstoken = data.accessToken;
                    this.testRequestGraphAPI(meow_accesstoken);
                    console.log(meow_accesstoken.toString())
                  }
                )

              }
            }
          }
          onLogoutFinished={() => console.log("User logged out")}/>

      </View>
    );
  },
  _responseInfoCallback: function(error: ?Object, result: ?Object) {
    // alert("meow response");
    if (error) {
      alert('Error fetching data: ' + error.toString());
      console.log(Object.keys(error));// print all enumerable
      console.log(error.errorMessage); // print error message
      // error.toString() will not work correctly in this case
      // so let use JSON.stringify()
      meow_json = JSON.stringify(error); // error object => json
      console.log(meow_json); // print JSON
    } else {
      console.log('Success fetching data: ' , result.toString());
      console.log(Object.keys(result));
      meow_json = JSON.stringify(result); // result => JSON
      console.log(meow_json); // print JSON
    }
  },
  testRequestGraphAPI(meow_accesstoken){
    const infoRequest = new GraphRequest(
      '/me',
      {
        parameters: {
          fields: {
            string: 'email,name,first_name,last_name' // what you want to get
          },
          access_token: {
            string: meow_accesstoken.toString() // put your accessToken here
          }
        }
      },
      this._responseInfoCallback // make sure you define _responseInfoCallback in same class
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  },
});

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
