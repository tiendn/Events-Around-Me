import React from 'react';
import {GET_QUERY_SEARCH} from '../common/constants';

export default SearchBar = (state = {query : ''},action) => {
  switch (action.type){
    case GET_QUERY_SEARCH:
      // console.log(action)
      return {
        ...state,
        query: action.query
      }
    default:
      return state;
  }
}