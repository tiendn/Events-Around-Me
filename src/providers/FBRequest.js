const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

function getFbRequest(path,callback){
  new GraphRequestManager().addRequest(new GraphRequest(
    path,
    null,
    function(error: ?Object, responseData: ?Object) {
      if (typeof callback == "function")
        callback(error,responseData)
    },
  )).start();
}
function postFbRequest(path,callback){
  new GraphRequestManager().addRequest(new GraphRequest(
    path,
    { httpMethod: 'POST'},
    function(error: ?Object, responseData: ?Object) {
      if (typeof callback == "function")
        callback(error,responseData)
    },
  )).start();
}
export {getFbRequest,postFbRequest};
