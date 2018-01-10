// @flow weak

import {
  AUTH_TOKEN_COOKIE,
  NIGHT_MODE_COOKIE,
  clearItem,
  getItem,
  setItem,
} from '../../services/cookie';

/* -----------------------------------------
  constants
 ------------------------------------------*/
const APOLLO_QUERY_RESULT = 'APOLLO_QUERY_RESULT';
const CHANGE_SCROLL_ACTIVE = 'CHANGE_SCROLL_ACTIVE';
const TOGGLE_NIGHT_MODE = 'TOGGLE_NIGHT_MODE';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const cookieNightMode = getItem(NIGHT_MODE_COOKIE);
const initialState = {
  scrollActive: false,
  nightMode: cookieNightMode !== null ? cookieNightMode : true,
};
document.body.classList.toggle('darkClass', initialState.nightMode);

export default function(state = initialState, action)
{
  switch (action.type)
  {
    case APOLLO_QUERY_RESULT:
      switch (action.operationName)
      {
        case 'UserQuery':
          let data = action.result.data;
          if (data && data.user === null)
          {
            clearItem(AUTH_TOKEN_COOKIE);
          }
          return state;
      }
      return state;
    case CHANGE_SCROLL_ACTIVE:
      return {
        ...state,
        scrollActive: action.value,
      };
    case TOGGLE_NIGHT_MODE:
      const newNightMode = !state.nightMode;
      setItem(NIGHT_MODE_COOKIE, newNightMode);
      document.body.classList.toggle('darkClass', newNightMode);

      return {
        ...state,
        nightMode: newNightMode,
      };
    default:
      return state;
  }
}

export function changeScrollActive(value)
{
  return {
    type: CHANGE_SCROLL_ACTIVE,
    value: value,
  };
}

export function toggleNightMode()
{
  return {
    type: TOGGLE_NIGHT_MODE,
  };
}
