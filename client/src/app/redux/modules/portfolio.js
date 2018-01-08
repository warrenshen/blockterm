// @flow weak

import { fromJS } from 'immutable';

/* -----------------------------------------
  constants
 ------------------------------------------*/
const APOLLO_QUERY_RESULT = 'APOLLO_QUERY_RESULT';
const CHANGE_TOKEN_USER_AMOUNT = 'CHANGE_TOKEN_USER_AMOUNT';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const initialState = {
  tokenUsers: [],
};

export default function(state = initialState, action)
{
  switch (action.type)
  {
    case APOLLO_QUERY_RESULT:
      switch (action.operationName)
      {
        case 'TokenUsersQuery':
          let data = action.result.data;
          let tokenUsers = data.user.tokenUsers;
          return {
            ...state,
            tokenUsers,
          };
        default:
          return state;
      }
    case CHANGE_TOKEN_USER_AMOUNT:
      let oldTokenUsers = fromJS(state.tokenUsers);
      let tokenUserIndex = oldTokenUsers.findIndex(
        (tokenUser) => tokenUser.get('id') === action.tokenUserId
      );
      let newTokenUsers = oldTokenUsers.setIn(
        [tokenUserIndex, 'amount'],
        action.amount,
      );
      return {
        ...state,
        tokenUsers: newTokenUsers.toJS(),
      };
    default:
      return state;
  }
}

export function changeTokenUserAmount(tokenUserId, amount)
{
  return {
    type: CHANGE_TOKEN_USER_AMOUNT,
    amount,
    tokenUserId,
  };
}
