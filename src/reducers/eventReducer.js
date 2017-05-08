import {
  GET_QUERY_SEARCH,
  SFETCH_DATA_SUCCESS,
  SFETCH_DATA_FAILED,
  MFETCH_DATA_SUCCESS,
  MFETCH_DATA_FAILED,
  FETCH_DATA
} from '../commons/constants';
const initialState = {
  query: '',
  isLoadDone: false,
  spayload: [], // search
  mpayload: [] // me
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_QUERY_SEARCH:
      return {
        ...state,
        query: action.query
      }
    case FETCH_DATA:
      console.log(action)
      return {
        ...state,
        isLoadDone: false
      }
    // case ME_DATA:
    //   return {
    //     ...state,
    //     payload: action.payload
    //   }
    // case EVENTS_SEARCH_DATA:
    //   return {
    //     ...state,
    //     payload: action.payload
    //   }
    case MFETCH_DATA_SUCCESS:
      console.log(action)
      return {
        ...state,
        mpayload: action.payload,
        isLoadDone: true
      }
    case MFETCH_DATA_FAILED:
      console.log(action)
      return {
        ...state,
        isLoadDone: true
      }
    case SFETCH_DATA_SUCCESS:
      console.log(action)
      return {
        ...state,
        spayload: action.payload,
        isLoadDone: true
      }
    case SFETCH_DATA_FAILED:
      console.log(action)
      return {
        ...state,
        isLoadDone: true
      }
    default:
      return state;
  }
}