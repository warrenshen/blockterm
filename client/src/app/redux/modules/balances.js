// @flow weak

/* -----------------------------------------
  constants
 ------------------------------------------*/
const APOLLO_QUERY_RESULT = 'APOLLO_QUERY_RESULT';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const initialState = {
  exchangeKeys: [],
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
    default:
      return state;
  }
}
