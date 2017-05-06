import {
  LOGIN ,
  LOGOUT, 
  TOGGLE_MENU,
  ME,
  SETTINGS,
  EVENTS_SEARCH,
  OPEN_MODULE
} from '../commons/constants';
const initialState = {
  isLogin : false,
  eventType: ME,
  isMenuOpened: false
}

export default (state = initialState, action) => {
  switch(action.type){
    case TOGGLE_MENU:
      // console.log("current state", state)
      return {
        ...state, 
        isMenuOpened: !state.isMenuOpened
      }
    case OPEN_MODULE: 
      return {
        ...state,
        eventType: action.eventType,
        isMenuOpened: false
      }  
    case LOGIN:
      return {
        ...state,
        isLogin: true
      }
    case LOGOUT:
      return {
        ...state,
        isLogin: false
      }  
    default: 
      return state;
  }
}