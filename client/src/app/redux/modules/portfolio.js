// @flow weak

import { fromJS } from 'immutable';
import {
  ONE_WEEK,
} from '../../constants/plots';

/* -----------------------------------------
  constants
 ------------------------------------------*/
const ADD_TOKEN_USER = 'ADD_TOKEN_USER';
const APOLLO_QUERY_RESULT = 'APOLLO_QUERY_RESULT';
const APOLLO_QUERY_RESULT_CLIENT = 'APOLLO_QUERY_RESULT_CLIENT';
const APOLLO_MUTATION_RESULT = 'APOLLO_MUTATION_RESULT';
const CHANGE_ADD_TOKEN_EXCHANGE_ID = 'CHANGE_ADD_TOKEN_EXCHANGE_ID';
const CHANGE_ADD_TOKEN_ID = 'CHANGE_ADD_TOKEN_ID';
const CHANGE_PORTFOLIO_HISTORY_PLOT_RANGE = 'CHANGE_PORTFOLIO_HISTORY_PLOT_RANGE';
const CHANGE_TOKEN_USER_AMOUNT = 'CHANGE_TOKEN_USER_AMOUNT';
const REMOVE_TOKEN_USER = 'REMOVE_TOKEN_USER';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const initialState = {
  addTokenExchangeId: null,
  addTokenId: null,
  changeActive: false,
  portfolioHistoryPlotRange: ONE_WEEK,
  tokenExchangesAll: [],
  tokensAll: [],
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
      const [newId, newIndex] = getNewIdAndIndex(oldTokenUsers);
      const tokenExchangesAll = fromJS(state.tokenExchangesAll);
      const tokensAll = fromJS(state.tokensAll);
      const newTokenExchangeIndex = tokenExchangesAll.findIndex(
        (tokenExchange) => tokenExchange.get('id') === state.addTokenExchangeId
      );
      const newTokenIndex = tokensAll.findIndex(
        (token) => token.get('id') === state.addTokenId
      );
      const newTokenUser = {
        id: newId,
        index: newIndex,
        amount: 0,
        tokenExchange: {
          id: state.addTokenExchangeId,
          exchange: tokenExchangesAll.get(newTokenExchangeIndex).get('exchange'),
          token: tokensAll.get(newTokenIndex).toJS(),
        },
      };
      newTokenUsers = oldTokenUsers.push(newTokenUser);
      return {
        ...state,
        addTokenExchangeId: initialState.addTokenExchangeId,
        addTokenId: initialState.addTokenId,
        changeActive: true,
        tokenUsers: newTokenUsers.toJS(),
      };
    case APOLLO_QUERY_RESULT:
    case APOLLO_QUERY_RESULT_CLIENT:
      switch (action.operationName)
      {
        case 'TokensAllQuery':
          return {
            ...state,
            tokenExchangesAll: action.result.data.tokenExchangesAll,
            tokensAll: action.result.data.tokensAll,
          };
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
    case CHANGE_ADD_TOKEN_EXCHANGE_ID:
      return {
        ...state,
        addTokenExchangeId: action.tokenExchangeId,
      };
    case CHANGE_ADD_TOKEN_ID:
      return {
        ...state,
        addTokenId: action.tokenId,
      };
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
    case CHANGE_PORTFOLIO_HISTORY_PLOT_RANGE:
      return {
        ...state,
        portfolioHistoryPlotRange: action.portfolioHistoryPlotRange,
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

export function addTokenUser()
{
  return {
    type: ADD_TOKEN_USER,
  };
}

export function changeAddTokenExchangeId(tokenExchangeId)
{
  return {
    tokenExchangeId,
    type: CHANGE_ADD_TOKEN_EXCHANGE_ID,
  };
}

export function changeAddTokenId(tokenId)
{
  return {
    tokenId,
    type: CHANGE_ADD_TOKEN_ID,
  };
}

export function changePortfolioHistoryPlotRange(portfolioHistoryPlotRange)
{
  return {
    type: CHANGE_PORTFOLIO_HISTORY_PLOT_RANGE,
    portfolioHistoryPlotRange,
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
