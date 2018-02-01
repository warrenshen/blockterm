// @flow weak

/* -----------------------------------------
  constants
 ------------------------------------------*/
const APOLLO_MUTATION_RESULT = 'APOLLO_MUTATION_RESULT';
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
  success: false,
};

export default function(state = initialState, action)
{
  let data;

  switch (action.type)
  {
    case APOLLO_MUTATION_RESULT:
      data = action.result.data;
      switch (action.operationName)
      {
        case 'ForgotPasswordMutation':
          return {
            ...state,
            success: true,
          };
        default:
          return state;
      }
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
