// @flow weak

/* -----------------------------------------
  constants
 ------------------------------------------*/
const CHANGE_EMAIL = 'CHANGE_EMAIL';
const CHANGE_ERROR = 'CHANGE_ERROR';
const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const initialState = {
  email: '',
  error: null,
  password: '',
};

export default function(state = initialState, action)
{
  switch (action.type)
  {
    case CHANGE_EMAIL:
      return {
        ...state,
        email: action.value,
        error: null,
      };
    case CHANGE_ERROR:
      return {
        ...state,
        error: action.value,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        error: null,
        password: action.value,
      };
    default:
      return state;
  }
}

export function changeEmail(value)
{
  return {
    type: CHANGE_EMAIL,
    value: value,
  };
}

export function changeError(value)
{
  return {
    type: CHANGE_ERROR,
    value: value,
  };
}

export function changePassword(value)
{
  return {
    type: CHANGE_PASSWORD,
    value: value,
  };
}
