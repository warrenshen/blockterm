// @flow weak

import moment from 'moment-timezone';
import {
  AUTH_TOKEN_COOKIE,
  NIGHT_MODE_COOKIE,
  TIME_ZONE_COOKIE,
  clearItem,
  getItem,
  setItem,
} from '../../services/cookie';

/* -----------------------------------------
  constants
 ------------------------------------------*/
const APOLLO_QUERY_RESULT = 'APOLLO_QUERY_RESULT';
const APOLLO_MUTATION_RESULT = 'APOLLO_MUTATION_RESULT';
const CHANGE_IS_PAGE_LOADED = 'CHANGE_IS_PAGE_LOADED';
const CHANGE_SCROLL_ACTIVE = 'CHANGE_SCROLL_ACTIVE';
const TOGGLE_NIGHT_MODE = 'TOGGLE_NIGHT_MODE';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const cookieNightMode = getItem(NIGHT_MODE_COOKIE);
let cookieTimeZone = getItem(TIME_ZONE_COOKIE);
if (cookieTimeZone === null)
{
  cookieTimeZone = moment.tz.guess();
  setItem(TIME_ZONE_COOKIE, cookieTimeZone);
}

const initialState = {
  isPageLoaded: false,
  nightMode: cookieNightMode !== null ? cookieNightMode : true,
  scrollActive: false,
  timeZone: cookieTimeZone,
  user: null,
};
document.body.classList.toggle('darkClass', initialState.nightMode);

export default function(state = initialState, action)
{
  let data;
  switch (action.type)
  {
    case APOLLO_QUERY_RESULT:
      switch (action.operationName)
      {
        case 'UserQuery':
          data = action.result.data;
          if (data.user === null)
          {
            clearItem(AUTH_TOKEN_COOKIE);
          }
          return {
            ...state,
            user: data.user,
          };
        default:
          return state;
      }
    case APOLLO_MUTATION_RESULT:
      switch (action.operationName)
      {
        case 'CreateUserMutation':
          data = action.result.data;
          if (data && data.createUser.user === null)
          {
            clearItem(AUTH_TOKEN_COOKIE);
          }
          return {
            ...state,
            user: data.createUser.user,
          };
        case 'LogInMutation':
          data = action.result.data;
          if (data && data.logIn.user === null)
          {
            clearItem(AUTH_TOKEN_COOKIE);
          }
          return {
            ...state,
            user: data.logIn.user,
          };
        default:
          return state;
      }
    case CHANGE_IS_PAGE_LOADED:
      return {
        ...state,
        isPageLoaded: action.value,
      };
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

export function changeIsPageLoaded(value)
{
  return {
    type: CHANGE_IS_PAGE_LOADED,
    value: value,
  };
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
