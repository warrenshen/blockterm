 // @flow weak

/* -----------------------------------------
  constants
 ------------------------------------------*/
const APOLLO_MUTATION_RESULT = 'APOLLO_MUTATION_RESULT';
const APOLLO_QUERY_RESULT = 'APOLLO_QUERY_RESULT';
const CHANGE_CONDITION_VALUE = 'CHANGE_CONDITION_VALUE';
const CHANGE_EXPIRES_VALUE = 'CHANGE_EXPIRES_VALUE';
const CHANGE_PRICE_VALUE = 'CHANGE_PRICE_VALUE';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const initialState = {
  alerts: [],
  conditionValue: '',
  expiresValue: '',
  priceValue: '',
};

export default function(state = initialState, action)
{
  let data;
  switch (action.type)
  {
    case APOLLO_MUTATION_RESULT:
      switch (action.operationName)
      {
        case 'CreateAlertMutation':
          data = action.result.data;

          return {
            ...state,
            alerts: data.user.alerts,
          };
        default:
          return state;
      }
    case APOLLO_QUERY_RESULT:
    // case APOLLO_QUERY_RESULT_CLIENT:
      switch (action.operationName)
      {
        case 'AlertsQuery':
          data = action.result.data;
          return {
            ...state,
            alerts: data.user.alerts,
          };
        default:
          return state;
      }
    case CHANGE_CONDITION_VALUE:
      return {
        ...state,
        conditionValue: action.conditionValue,
      };
    case CHANGE_EXPIRES_VALUE:
      return {
        ...state,
        expiresValue: action.expiresValue,
      };
    case CHANGE_PRICE_VALUE:
      return {
        ...state,
        priceValue: action.priceValue,
      };
    default:
      return state;
  }
}

export function changeConditionValue(conditionValue)
{
  return {
    type: CHANGE_CONDITION_VALUE,
    conditionValue: conditionValue,
  };
}

export function changeExpiresValue(expiresValue)
{
  return {
    type: CHANGE_EXPIRES_VALUE,
    expiresValue: expiresValue,
  };
}

export function changePriceValue(priceValue)
{
  return {
    type: CHANGE_PRICE_VALUE,
    priceValue: priceValue,
  };
}
