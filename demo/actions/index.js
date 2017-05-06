//import { GET_LANG_DATA, GET_COMPANY_DATA } from '../common/constants';
import { GET_QUERY_SEARCH, LOGOUT, LOGIN } from '../common/constants';
// import { LoginManager } from 'react-native-fbsdk';

// function _login() {
//   // let permissions = ['publish_action','public_profile','user_friends','user_events','user_likes','rsvp_event'];
//   let permissions = ['public_profile', 'user_events', 'user_friends'];
//   try {
//     LoginManager.logInWithReadPermissions(permissions).then(
//     function (result) {
//       if (result.isCancelled) {
//         console.log('Login cancelled')
//       } else {
//         console.log('Login success with permissions: ' + result.grantedPermissions.toString());
//       }
//     },
//     function (error) {
//       console.log('Login fail with error: ' + error)
//     })
//   }
//   catch(ex){
//     console.log("Login error", ex)
//   }
// }
// function _logout() {
//   try{
//     LoginManager.logOut();
//     return true;
//   }
//   catch(ex){
//     console.log("Logout error", ex);
//     return false;
//   }
// }
export function getQuerySearch(query) {
  return {
    type: GET_QUERY_SEARCH,
    query
  };
}
export const loginManager = (type) => {
  return {
    type: type,
  }
}
