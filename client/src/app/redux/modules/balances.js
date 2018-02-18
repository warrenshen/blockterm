// @flow weak

import { fromJS } from 'immutable';

/* -----------------------------------------
  constants
 ------------------------------------------*/
const APOLLO_QUERY_RESULT = 'APOLLO_QUERY_RESULT';
const APOLLO_MUTATION_RESULT = 'APOLLO_MUTATION_RESULT';
const CHANGE_API_KEY = 'CHANGE_API_KEY';
const CHANGE_EXCHANGE = 'CHANGE_EXCHANGE';
const CHANGE_SECRET_KEY = 'CHANGE_SECRET_KEY';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const initialState = {
  apiKey: '',
  error: null,
  exchange: null,
  exchangeKeys: [],
  secretKey: '',
};

export default function(state = initialState, action)
{
  switch (action.type)
  {
    case APOLLO_QUERY_RESULT:
      switch (action.operationName)
      {
        case 'ExchangeKeysQuery':
          return {
            ...state,
            exchangeKeys: action.result.data.user.exchangeKeys,
          };
        default:
          return state;
      }
    case APOLLO_MUTATION_RESULT:
      switch (action.operationName)
      {
        case 'CreateExchangeKeyMutation':
          const newExchangeKey = action.result.data.exchangeKey;
          const oldExchangeKeys = fromJS(state.exchangeKeys);
          const newExchangeKeys = oldExchangeKeys.push(newExchangeKey);
          return {
            ...state,
            apiKey: initialState.apiKey,
            exchange: initialState.exchange,
            exchangeKeys: newExchangeKeys.toJS(),
            secretKey: initialState.secretKey,
          };
        default:
          return state;
      }
    case CHANGE_API_KEY:
      return {
        ...state,
        apiKey: action.apiKey,
      };
    case CHANGE_EXCHANGE:
      return {
        ...state,
        exchange: action.exchange,
      };
    case CHANGE_SECRET_KEY:
      return {
        ...state,
        secretKey: action.secretKey,
      };
    default:
      return state;
  }
}

export function changeApiKey(apiKey)
{
  return {
    apiKey: apiKey,
    type: CHANGE_API_KEY,
  };
}

export function changeExchange(exchange)
{
  return {
    exchange: exchange,
    type: CHANGE_EXCHANGE,
  };
}

export function changeSecretKey(secretKey)
{
  return {
    secretKey: secretKey,
    type: CHANGE_SECRET_KEY,
  };
}
