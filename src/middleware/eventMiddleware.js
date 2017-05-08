import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import {
    SFETCH_DATA_SUCCESS,
    SFETCH_DATA_FAILED,
    MFETCH_DATA_SUCCESS,
    MFETCH_DATA_FAILED,
    MFETCH_DATA,
    SFETCH_DATA,
    FETCH_DATA
} from '../commons/constants';
const fields = '&fields=id,name,place,start_time,end_time,rsvp_status,cover,category,attending_count,description,ticket_uri';
const limit = '&limit=5';
export function fetchData(type, path, request) {
    return dispatch => {
        console.log(path+fields)
        dispatch({
            type: FETCH_DATA
        })
        new GraphRequestManager().addRequest(new GraphRequest(
            path + fields + limit,
            null,
            // { httpMethod: 'GET', parameters: request },
            function (error: ?Object, responseData: ?Object) {
                if (error) {
                    if (type === MFETCH_DATA) {
                        dispatch({
                            type: MFETCH_DATA_FAILED
                        });
                    }
                    else if (type === SFETCH_DATA) {
                        dispatch({
                            type: SFETCH_DATA_FAILED
                        });
                    }

                }
                else {
                    // console.log(responseData)
                    if (type === MFETCH_DATA) {
                        dispatch({
                            type: MFETCH_DATA_SUCCESS,
                            payload: responseData,
                        });
                    }
                    else {
                        if (type === SFETCH_DATA) {
                            dispatch({
                                type: SFETCH_DATA_SUCCESS,
                                payload: responseData,
                            });
                        }
                    }
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
