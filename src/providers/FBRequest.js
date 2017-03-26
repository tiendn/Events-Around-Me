const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;
const graphRequestManager = new GraphRequestManager();

function getFbRequest(path,callback){
  graphRequestManager.addRequest(new GraphRequest(
    path,
    null,
    function(error: ?Object, responseData: ?Object) {
      if (typeof callback == "function")
        callback(error,responseData)
    },
  )).start();
}
function postFbRequest(path,callback){
  graphRequestManager.addRequest(new GraphRequest(
    path,
    "POST",
    function(error: ?Object, responseData: ?Object) {
      if (typeof callback == "function")
        callback(error,responseData)
    },
  )).start();
}
export {getFbRequest,postFbRequest};
