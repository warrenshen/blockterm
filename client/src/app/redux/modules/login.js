// @flow weak

/* -----------------------------------------
  constants
 ------------------------------------------*/
const CHANGE_EMAIL = 'CHANGE_EMAIL';
const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const initialState = {
  email: '',
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
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
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

export function changePassword(value)
{
  return {
    type: CHANGE_PASSWORD,
    value: value,
  };
}
