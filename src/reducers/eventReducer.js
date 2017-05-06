import { ME_DATA, EVENTS_SEARCH_DATA, GET_QUERY_SEARCH, GET_MODULE} from '../commons/constants';
const initialState = {
  query : '',
  payload : []
}

export default (state = initialState, action) => {
  switch(action.type){
    case GET_QUERY_SEARCH:
      return {
        ...state, 
        query: action.query
      }
    case ME_DATA:
      return {
        ...state,
        payload: action.payload
      }
    case EVENTS_SEARCH_DATA:
      return {
        ...state,
        payload: action.payload
      }
    default: 
      return state;
  }
}