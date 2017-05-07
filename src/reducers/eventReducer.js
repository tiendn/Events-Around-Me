import { ME_DATA, EVENTS_SEARCH_DATA, GET_QUERY_SEARCH, SFETCH_DATA, MFETCH_DATA} from '../commons/constants';
const initialState = {
  query : '',
  spayload : [], // search
  mpayload : [] // me
}

export default (state = initialState, action) => {
  switch(action.type){
    case GET_QUERY_SEARCH:
      return {
        ...state, 
        query: action.query
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
    case MFETCH_DATA.SUCCESS:
      console.log(action)
      return {
        ...state,
        mpayload: action.payload
      }
    case SFETCH_DATA.SUCCESS:
      return {
        ...state,
        spayload: action.payload
      }
    default: 
      return state;
  }
}