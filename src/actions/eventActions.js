import {  GET_QUERY_SEARCH} from '../commons/constants';

// export const 
export const getQuerySearch = (query) => {
  return {
    type: GET_QUERY_SEARCH,
    query
  }
}
