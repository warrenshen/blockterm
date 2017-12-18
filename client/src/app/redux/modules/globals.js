// @flow weak

import {
  getToken,
  setToken,
} from '../../services/cookie';

/* -----------------------------------------
  constants
 ------------------------------------------*/
const TOGGLE_NIGHT_MODE = 'TOGGLE_NIGHT_MODE';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const cookieNightMode = getToken('nightMode');
const initialState = {
  nightMode: cookieNightMode !== null ? cookieNightMode : false,
};

export default function(state = initialState, action)
{
  switch (action.type)
  {
    case TOGGLE_NIGHT_MODE:
      const newNightMode = !state.nightMode;
      setToken('nightMode', newNightMode);

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
