// @flow weak

import { fromJS } from 'immutable';

/* -----------------------------------------
  constants
 ------------------------------------------*/
const ADD_TOKEN_USER = 'ADD_TOKEN_USER';
const APOLLO_QUERY_RESULT = 'APOLLO_QUERY_RESULT';
const APOLLO_MUTATION_RESULT = 'APOLLO_MUTATION_RESULT';
const CHANGE_TOKEN_USER_AMOUNT = 'CHANGE_TOKEN_USER_AMOUNT';
const REMOVE_TOKEN_USER = 'REMOVE_TOKEN_USER';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const initialState = {
  changeActive: false,
  tokenUsers: [],
};

function getNewIdAndIndex(tokenUsers)
{
  let newId = 0;
  let newIndex = 0;

  tokenUsers.forEach((tokenUser) => {
    if (tokenUser.get('id').indexOf('t') === 0)
    {
      newId = Math.max(newId, parseInt(tokenUser.get('id').substring(1)) + 1);
    }
    newIndex = Math.max(newIndex, tokenUser.get('index') + 1);
  });

  return [`t${newId}`, newIndex];
}

export default function(state = initialState, action)
{
  let newTokenUsers;
  let oldTokenUsers;
  let tokenUserIndex;

  switch (action.type)
  {
    case ADD_TOKEN_USER:
      oldTokenUsers = fromJS(state.tokenUsers);
      let [newId, newIndex] = getNewIdAndIndex(oldTokenUsers);
      let newTokenUser = {
        id: newId,
        index: newIndex,
        amount: '0',
        token: action.token,
      };
      newTokenUsers = oldTokenUsers.push(newTokenUser);
      return {
        ...state,
        changeActive: true,
        tokenUsers: newTokenUsers.toJS(),
      };
    case APOLLO_QUERY_RESULT:
      switch (action.operationName)
      {
        case 'TokenUsersQuery':
          return {
            ...state,
            changeActive: initialState.changeActive,
            tokenUsers: action.result.data.user === null ?
                          initialState.tokenUsers :
                          action.result.data.user.tokenUsers,
          };
        default:
          return state;
      }
    case APOLLO_MUTATION_RESULT:
      switch (action.operationName)
      {
        case 'UpdateTokenUsersMutation':
          return {
            ...state,
            changeActive: initialState.changeActive,
            tokenUsers: action.result.data.updateTokenUsers.tokenUsers,
          };
        default:
          return state;
      }
    case CHANGE_TOKEN_USER_AMOUNT:
      oldTokenUsers = fromJS(state.tokenUsers);
      tokenUserIndex = oldTokenUsers.findIndex(
        (tokenUser) => tokenUser.get('id') === action.tokenUserId
      );
      newTokenUsers = oldTokenUsers.setIn(
        [tokenUserIndex, 'amount'],
        action.amount,
      );
      return {
        ...state,
        changeActive: true,
        tokenUsers: newTokenUsers.toJS(),
      };
    case REMOVE_TOKEN_USER:
      oldTokenUsers = fromJS(state.tokenUsers);
      tokenUserIndex = oldTokenUsers.findIndex(
        (tokenUser) => tokenUser.get('id') === action.tokenUserId
      );
      newTokenUsers = oldTokenUsers.remove(tokenUserIndex);
      newTokenUsers = newTokenUsers.map(
        (tokenUser, index) => tokenUser.set('index', index)
      );
      return {
        ...state,
        changeActive: true,
        tokenUsers: newTokenUsers.toJS(),
      };
    default:
      return state;
  }
}

export function addTokenUser(token)
{
  return {
    type: ADD_TOKEN_USER,
    token,
  };
}

export function changeTokenUserAmount(tokenUserId, amount)
{
  return {
    type: CHANGE_TOKEN_USER_AMOUNT,
    amount,
    tokenUserId,
  };
}

export function removeTokenUser(tokenUserId)
{
  return {
    type: REMOVE_TOKEN_USER,
    tokenUserId,
  };
}
