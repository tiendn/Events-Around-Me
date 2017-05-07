import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { MFETCH_DATA } from '../commons/constants';
const fields = '&id,name,place,start_time,end_time,rsvp_status,cover,category,attending_count,description,ticket_uri';
// let pathLocationSearch = 'search?q=' + keyword + '&type=event&center=' + latitude + ',' + longtitude + '&distance=10000&fields=' + fields + '&limit=50';
// let pathEventsSearch = 'search?q=' + keyword + '&type=event&fields=' + fields + '&limit=50';
// let pathMyEvents = 'me/events?fields=' + fields + '&limit=50';
// Tach ra lam 3 fn tro? toi fn addRequest... 
// Request o dau thi goi o do, k nen cai dat o cho khac.
export function fetchData(path, request) {
    return dispatch => {
        new GraphRequestManager().addRequest(new GraphRequest(
            path+fields,
            null,
            // { httpMethod: 'GET', parameters: request },
            function (error: ?Object, responseData: ?Object) {
                if (error) {
                    dispatch({
                        type: MFETCH_DATA.FAILED
                    });
                }
                else{ 
                    console.log(responseData)
                    dispatch({
                        type: MFETCH_DATA.SUCCESS,
                        payload: responseData,
                    });
                }
                
            },
        )).start();
    };
}
export function getFbRequest(path, request, callback) {
    new GraphRequestManager().addRequest(new GraphRequest(
        path,
        { httpMethod: 'GET', parameters: request },
        function (error: ?Object, responseData: ?Object) {
            if (typeof callback == "function")
                callback(error, responseData)
        },
    )).start();
}
export function postFbRequest(path, callback) {
    new GraphRequestManager().addRequest(new GraphRequest(
        path,
        { httpMethod: 'POST' },
        function (error: ?Object, responseData: ?Object) {
            if (typeof callback == "function")
                callback(error, responseData)
        },
    )).start();
}
