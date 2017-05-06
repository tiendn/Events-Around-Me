import { 
  ME,
  EVENTS_SEARCH,
  SETTINGS, 
  LOGIN, 
  LOGOUT, 
  TOGGLE_MENU,
  OPEN_MODULE
} from '../commons/constants';

export const toggleMenu = () => {
  // console.log("***********TOGGLE***********");
  return {
    type: TOGGLE_MENU,
  }
}

export const openModule = (eventType) => {
  return {
    type: OPEN_MODULE,
    eventType: eventType,
  }
}

export const login = () => {
  return {
    type: LOGIN,
  }
}
export const logout = () => {
  return {
    type: LOGOUT,
  }
}