import React from 'react';
import {LOGOUT, LOGIN} from '../common/constants';
const initialState = {
  isLogin : false,
}

export default SearchBar = (state = initialState ,action) => {
      // console.log(action);
  
  switch (action.type){
    case LOGOUT:
      return {
        ...state,
        isLogin: false
      }
    case LOGIN:
      return {
        ...state,
        isLogin: true
      }
    default:
      return state;
  }
}