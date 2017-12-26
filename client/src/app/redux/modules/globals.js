// @flow weak

import {
  NIGHT_MODE_COOKIE,
  getItem,
  setItem,
} from '../../services/cookie';

/* -----------------------------------------
  constants
 ------------------------------------------*/
 const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
const TOGGLE_NIGHT_MODE = 'TOGGLE_NIGHT_MODE';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const cookieNightMode = getItem(NIGHT_MODE_COOKIE);
const initialState = {
  nightMode: cookieNightMode !== null ? cookieNightMode : false,
  sidebarActive: false,
};

export default function(state = initialState, action)
{
  switch (action.type)
  {
    case TOGGLE_SIDEBAR:
      document.getElementById('widget_search').focus();
      return {
        ...state,
        sidebarActive: !state.sidebarActive,
      };
    case TOGGLE_NIGHT_MODE:
      const newNightMode = !state.nightMode;
      setItem(NIGHT_MODE_COOKIE, newNightMode);

      return {
        ...state,
        nightMode: newNightMode,
      };
    default:
      return state;
  }
}

export function toggleNightMode()
{
  return {
    type: TOGGLE_NIGHT_MODE,
  };
}

export function toggleSidebar()
{
  return {
    type: TOGGLE_SIDEBAR,
  };
}
